import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync('public/slides/certificate-data.js', 'utf8');
const context = {};
vm.runInNewContext(source, context);
const api = context.FangpianCertificate;
const lessons = [{ file: 'one.html' }, { file: 'two.html' }, { file: 'one.en.html' }];
const allDone = { 'one.html': 1, 'two.html': 1 };
function setup({ blocked = false, quota = false, backing = new Map() } = {}) {
  const storage = { getItem(key) { if (blocked) throw Error('blocked'); return backing.get(key) ?? null; }, setItem(key, value) { if (blocked || quota) throw Error('quota'); backing.set(key, value); } };
  return { backing, store: api.createStore(storage, { now: () => new Date('2026-11-10T06:00:00Z'), nonce: () => '1234ABCD' }) };
}
test('certificate eligibility counts only real unique lessons, including legacy language aliases', () => {
  const progress = { 'one.en.html': true, 'one.html': 1, 'outside.html': 1, 'two.html': 0, __last: 'two.html' };
  const result = api.completion(lessons, progress);
  assert.equal(result.total, 2); assert.equal(result.done, 1); assert.equal(result.eligible, false);
  assert.equal(api.completion(lessons, allDone).eligible, true);
  assert.equal(api.completion([], allDone).eligible, false);
  assert.equal(api.completion(lessons, ['one.html', 'two.html']).done, 0);
});
test('incomplete learning cannot issue a certificate and never writes a completion record', () => {
  const { store, backing } = setup();
  assert.throws(() => store.claim(lessons, { 'one.html': 1 }, '测试同学'), /学完全部课程/);
  assert.equal(backing.size, 0); assert.equal(store.status(lessons, {}).record, null);
  assert.throws(() => store.claim([], {}, '测试同学'), /学完全部课程/);
});
test('claiming persists a named certificate and repeat claims keep its identifier and date', () => {
  const { store, backing } = setup();
  const first = store.claim(lessons, allDone, '  测试同学  ');
  assert.match(first.id, /^FP-\d{8}-1234ABCD$/); assert.equal(first.name, '测试同学'); assert.equal(first.lessonCount, 2);
  const reloaded = setup({ backing }).store;
  assert.equal(reloaded.status(lessons, allDone).record.id, first.id);
  const renamed = reloaded.claim(lessons, {}, '新的名字');
  assert.equal(renamed.id, first.id); assert.equal(renamed.issuedAt, first.issuedAt); assert.equal(renamed.name, '新的名字');
  assert.equal(reloaded.status(lessons, {}).eligible, false); // The saved certificate is a completion snapshot.
  assert.equal(allDone['one.html'], 1); assert.equal(Object.keys(allDone).length, 2);
});
test('course versions and languages do not inherit an unrelated certificate', () => {
  const { store } = setup();
  const first = store.claim(lessons, allDone, '测试同学');
  assert.equal(store.status([...lessons, { file: 'new.html' }], allDone).record, null);
  assert.equal(store.status(lessons, allDone, 'en').record, null);
  assert.equal(store.status([...lessons].reverse(), allDone).record.id, first.id);
});
test('blocked and quota-exhausted storage retain a usable this-page certificate without claiming persistence', () => {
  for (const options of [{ blocked: true }, { quota: true }]) {
    const { store } = setup(options);
    store.claim(lessons, allDone, '验收示例');
    assert.equal(store.persistent, false); assert.equal(store.status(lessons, allDone).record.name, '验收示例');
  }
});
test('invalid names and malformed saved certificates do not become issued records', () => {
  const { store } = setup();
  for (const name of ['', '  ', '\n测试', 'a'.repeat(25), null]) assert.throws(() => store.claim(lessons, allDone, name), /姓名/);
  assert.equal(api.cleanName('虎'.repeat(24)), '虎'.repeat(24));
  for (const raw of ['broken-json', '[]', '{"version":1,"records":[]}']) {
    assert.equal(setup({ backing: new Map([[api.key, raw]]) }).store.status(lessons, allDone).record, null);
  }
  const scope = api.courseKey(lessons);
  const invalid = { version: 1, records: { [scope]: { version: 1, courseKey: scope, id: 'FP-20261110-1234ABCD', name: '', issuedAt: '2026-11-10', lessonCount: 2 } } };
  assert.equal(setup({ backing: new Map([[api.key, JSON.stringify(invalid)]]) }).store.status(lessons, allDone).record, null);
});
test('five home and certificate pages load the shared runtime and their own real course catalog', () => {
  for (const suffix of ['', '.en', '.ko', '.tw', '.hk']) {
    const home = fs.readFileSync('public/slides/home' + suffix + '.html', 'utf8');
    const page = fs.readFileSync('public/slides/certificate' + suffix + '.html', 'utf8');
    assert.equal((home.match(/id="fpCertificateMount"/g) || []).length, 1);
    assert.ok(page.includes('data-fangpian-certificate') && page.includes('course-data' + suffix + '.js'));
    for (const html of [home, page]) {
      assert.ok(html.includes('three-shared.js') && html.includes('certificate-experience.js'));
      assert.ok(!html.includes('/auth/certificate') && !html.includes('cert-preview.webp'));
    }
  }
});
