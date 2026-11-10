import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('public/slides/aiti-collection.js', 'utf8');
function model() {
  let randomCalls = 0;
  const context = { crypto: { getRandomValues(bytes) {
    bytes.set([0, 1, 2, randomCalls++ + 3]); return bytes;
  } } };
  vm.runInNewContext(source, context);
  return context.FangpianAITICollection;
}
function storage(values = new Map()) {
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}
const native = value => JSON.parse(JSON.stringify(value));

test('new visitors have sixteen locked personalities and no generated own result or code', () => {
  const m = model(), backing = storage(), store = m.createStore(backing);
  assert.deepEqual(native(store.load()), { ownProfileId: null, cardCode: null, unlocked: [], redeemedCodes: [] });
  assert.equal(store.persistent, true);
  assert.equal(backing.values.size, 0);
  assert.deepEqual(native(m.cleanState({ unlocked: ['02'] })), { ownProfileId: null, cardCode: null, unlocked: ['02'], redeemedCodes: [] });
});
test('reference-site card codes decode without translating their public profile IDs', () => {
  const m = model();
  for (const [code, id] of [['AITI-01-ABCD-L', '01'], ['AITI-02-ABCD-M', '02'], ['AITI-08-ABCD-T', '08'], ['AITI-09-ABCD-U', '09'], ['AITI-16-ABCD-Q', '16']]) {
    assert.deepEqual(native(m.decodeCode(code)), { code, profileId: id });
  }
  // Deterministic secure-random stub uses the same four bytes as the source site's algorithm.
  assert.equal(m.createCode('08'), 'AITI-08-ABCD-T');
  assert.equal(m.normalizeCode(' \taiti — 08 – abcd − t\n'), 'AITI-08-ABCD-T');
  assert.equal(m.decodeCode('ａｉｔｉ－０８－ａｂｃｄ－ｔ').profileId, '08');
});
test('completing a result unlocks only the own tiger and preserves its code across reload and rerender', () => {
  const m = model(), backing = storage(), first = m.createStore(backing);
  const own = first.rememberResult('09');
  assert.equal(own.ownProfileId, '09'); assert.deepEqual(Array.from(own.unlocked), ['09']);
  assert.equal(m.decodeCode(own.cardCode).profileId, '09');
  assert.equal(first.rememberResult('09').cardCode, own.cardCode);
  const reloaded = m.createStore(backing);
  assert.deepEqual(native(reloaded.load()), native(own));
  assert.equal(reloaded.rememberResult('09').cardCode, own.cardCode);
});
test('a changed quiz result creates the new own code without losing previously met tigers', () => {
  const m = model(), store = m.createStore(storage());
  const before = store.rememberResult('09');
  assert.equal(store.redeem('AITI-08-ABCD-T').changed, true);
  const after = store.rememberResult('02');
  assert.equal(after.ownProfileId, '02'); assert.notEqual(after.cardCode, before.cardCode);
  assert.equal(m.decodeCode(after.cardCode).profileId, '02');
  assert.deepEqual(Array.from(after.unlocked), ['09', '08', '02']);
});
test('a valid friend code unlocks one tiger, while duplicate, own, and same-profile codes do not increase count', () => {
  const m = model(), backing = storage(), store = m.createStore(backing);
  const own = store.rememberResult('09');
  assert.equal(store.redeem(own.cardCode).changed, false);
  assert.deepEqual(native(store.redeem(' aiti-08-abcd-t ')), { changed: true, profileId: '08' });
  const saved = backing.values.get(m.storageKey);
  assert.equal(store.redeem('AITI-08-ABCD-T').changed, false);
  assert.equal(store.redeem(m.createCode('08')).changed, false);
  assert.equal(backing.values.get(m.storageKey), saved);
  assert.equal(store.load().unlocked.length, 2);
  assert.deepEqual(Array.from(store.load().redeemedCodes), ['AITI-08-ABCD-T']);
});
test('invalid checksums, nonexistent IDs, and ambiguous letters never mutate saved collection', () => {
  const m = model(), backing = storage(), store = m.createStore(backing);
  store.rememberResult('02');
  const before = backing.values.get(m.storageKey);
  for (const code of [null, 42, '', 'AITI-08-ABCD-X', 'AITI-00-ABCD-K', 'AITI-17-ABCD-R', 'AITI-08-ABCI-T', 'AITI-08-ABC0-T', 'AITI-08-ABCD-T-other']) {
    assert.throws(() => store.redeem(code), /卡片码/);
    assert.equal(backing.values.get(m.storageKey), before);
    assert.deepEqual(Array.from(store.load().unlocked), ['02']);
  }
  for (const id of ['00', '17', 2, '2', null]) assert.throws(() => store.rememberResult(id), /小老虎/);
  assert.equal(backing.values.get(m.storageKey), before);
});
test('malformed and unknown-version state cannot manufacture a result or damage the original quiz record', () => {
  const m = model();
  for (const raw of ['invalid-json', 'null', '[]', '{"version":99,"state":{"ownProfileId":"02","unlocked":["02"]}}', '{"version":1,"state":[]}']) {
    const answers = '{"version":1,"record":{"answers":[5,4],"cursor":2}}';
    const backing = storage(new Map([[m.storageKey, raw], ['fangpian_aiti_v1', answers]]));
    const store = m.createStore(backing);
    assert.deepEqual(native(store.load()), { ownProfileId: null, cardCode: null, unlocked: [], redeemedCodes: [] });
    store.redeem('AITI-08-ABCD-T');
    assert.equal(backing.values.get('fangpian_aiti_v1'), answers);
    assert.equal(store.persistent, true);
  }
  const clean = m.cleanState({ ownProfileId: '02', cardCode: 'AITI-09-ABCD-U', unlocked: ['02', '02', '99', 1, '09'], redeemedCodes: ['AITI-08-ABCD-T', 'bad'] });
  assert.equal(clean.cardCode, null);
  assert.deepEqual(Array.from(clean.unlocked), ['02', '09', '08']);
  assert.equal(m.cleanState({ ownProfileId: '99', cardCode: 'AITI-02-ABCD-M' }).ownProfileId, null);
});
test('the collection remains bounded to sixteen profiles and returned state is isolated from caller mutation', () => {
  const m = model(), store = m.createStore(storage());
  for (let n = 1; n <= 16; n++) store.redeem(m.createCode(String(n).padStart(2, '0')));
  const value = store.load();
  assert.equal(value.unlocked.length, 16); assert.equal(value.redeemedCodes.length, 16);
  value.unlocked.length = 0; value.redeemedCodes.push('broken'); value.ownProfileId = '09';
  assert.equal(store.load().unlocked.length, 16); assert.equal(store.load().redeemedCodes.length, 16);
  assert.equal(store.load().ownProfileId, null);
});
test('blocked and quota-exhausted storage retain this-page collection and notify only once', () => {
  const m = model(); let failures = 0;
  const blocked = m.createStore({ getItem() { throw new Error('blocked'); } }, () => failures++);
  assert.equal(blocked.persistent, false); blocked.rememberResult('02'); blocked.redeem('AITI-08-ABCD-T');
  assert.deepEqual(Array.from(blocked.load().unlocked), ['02', '08']); assert.equal(failures, 1);
  const backing = storage(), quota = m.createStore(backing, () => failures++);
  backing.setItem = () => { throw new Error('quota'); };
  const own = quota.rememberResult('09');
  assert.equal(quota.persistent, false); assert.equal(quota.load().cardCode, own.cardCode);
  quota.redeem('AITI-08-ABCD-T'); assert.equal(quota.load().unlocked.length, 2); assert.equal(failures, 2);
});
