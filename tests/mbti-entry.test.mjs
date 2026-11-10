import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = path.resolve('public/slides');
const page = fs.readFileSync(path.join(root, 'mbti.html'), 'utf8');
const script = id => page.match(new RegExp('<script id="' + id + '">([\\s\\S]*?)<\\/script>'))[1];

function entryRoute(hash = '', search = '') {
  const listeners = [];
  const location = { hash, pathname: '/slides/mbti.html', search, replaced: null, replace(value) { this.replaced = value; } };
  const context = { location, window: { addEventListener(type, callback, capture) { listeners.push({ type, callback, capture }); } }, history: { replaceState(_state, _title, value) { location.hash = value.slice(value.indexOf('#')); location.historyValue = value; } } };
  vm.runInNewContext(script('mbtiEntryRoute'), context);
  return { location, listeners };
}

function renderPersonality(hash, initialRecords) {
  const nodes = new Map();
  const app = { innerHTML: '', focus() {}, querySelectorAll() { return []; } };
  const node = id => nodes.get(id) || (nodes.set(id, { textContent: '', hidden: true }), nodes.get(id));
  const saved = new Map(initialRecords || []);
  const location = { hash };
  const context = {
    location,
    document: { title: '', body: { dataset: { test: 'mbti' } }, getElementById(id) { return id === 'assessmentApp' ? app : node(id); }, querySelector() { return null; } },
    localStorage: { getItem(key) { return saved.get(key) ?? null; }, setItem(key, value) { saved.set(key, value); }, removeItem(key) { saved.delete(key); } },
    window: { addEventListener() {}, scrollTo() {} }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, 'personality-data.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'personality.js'), 'utf8'), context);
  return { app, location, nodes, document: context.document, saved };
}

test('the independent MBTI entry defaults to MBTI without redirecting to AITI', () => {
  const { location, listeners } = entryRoute('', '?from=home');
  assert.equal(location.hash, '#mbti');
  assert.equal(location.historyValue, '/slides/mbti.html?from=home#mbti');
  assert.equal(location.replaced, null);
  assert.ok(listeners.some(listener => listener.type === 'hashchange' && listener.capture === true));
  assert.ok(page.includes('MBTI 趣味性格测试'));
  assert.ok(page.includes('方片趣味体验，非官方标准测评'));
  assert.ok(!page.includes('aiti.html'));
});

test('valid MBTI result hashes are retained and DISC hashes use the independent DISC page', () => {
  for (const hash of ['#mbti', '#mbti-result']) {
    const { location } = entryRoute(hash);
    assert.equal(location.hash, hash);
    assert.equal(location.replaced, null);
  }
  for (const hash of ['#disc', '#disc-result']) assert.equal(entryRoute(hash).location.replaced, 'disc.html' + hash);
  assert.equal(entryRoute('#quiz').location.hash, '#mbti');
});

test('the entry loads the original 32-question MBTI renderer rather than the AITI questionnaire', () => {
  const { app, document } = renderPersonality('#mbti');
  assert.match(app.innerHTML, /第 1 \/ 32 题/);
  assert.match(app.innerHTML, /一个新选题刚出现时/);
  assert.match(app.innerHTML, /左边的你/);
  assert.match(document.title, /MBTI/);
  assert.ok(!app.innerHTML.includes('16 道题'));
});

test('completed original MBTI answers open their existing tiger result and unfinished result links return to the quiz', () => {
  const empty = renderPersonality('#mbti-result');
  assert.equal(empty.location.hash, '#mbti');
  const context = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'personality-data.js'), 'utf8'), context);
  const record = { answers: Array(32).fill(3), cursor: 31, completed: true };
  const payload = JSON.stringify({ version: context.FangpianPersonality.version, records: { mbti: record } });
  const completed = renderPersonality('#mbti-result', [['fangpian_personality_v1', payload]]);
  assert.match(completed.app.innerHTML, /多面虎/);
  assert.match(completed.app.innerHTML, /XXXX/);
  assert.match(completed.app.innerHTML, /你的四维偏好/);
  assert.match(completed.app.innerHTML, /assets\/fangpian\//);
});

test('new page navigation returns to school or the independent DISC page', () => {
  const listeners = new Map();
  const location = { href: '/slides/mbti.html#mbti' };
  vm.runInNewContext(script('mbtiEntryUi'), { location, document: { addEventListener(type, callback) { listeners.set(type, callback); } } });
  for (const [id, destination] of [['backHub', 'home.html'], ['otherTest', 'disc.html']]) {
    let prevented = false, stopped = false;
    listeners.get('click')({ target: { closest() { return { id }; } }, preventDefault() { prevented = true; }, stopImmediatePropagation() { stopped = true; } });
    assert.equal(location.href, destination);
    assert.ok(prevented && stopped);
  }
});

test('the page keeps its MBTI label as the shared renderer replaces questions and results', () => {
  const listeners = new Map();
  const heading = { textContent: 'MBTI 风格探索' }, back = { textContent: '‹ 返回测试中心' }, app = {};
  let observerCallback;
  const document = {
    title: '多面虎 · XXXX · 方片虎格测试',
    addEventListener(type, callback) { listeners.set(type, callback); },
    querySelector() { return heading; },
    getElementById(id) { return id === 'backHub' ? back : app; }
  };
  vm.runInNewContext(script('mbtiEntryUi'), {
    document,
    MutationObserver: class { constructor(callback) { observerCallback = callback; } observe(target) { assert.equal(target, app); } }
  });
  listeners.get('DOMContentLoaded')();
  assert.equal(heading.textContent, 'MBTI 趣味性格测试');
  assert.equal(back.textContent, '‹ 返回学堂');
  assert.match(document.title, /^MBTI 趣味性格测试 · 多面虎/);
  heading.textContent = 'MBTI 风格探索';
  document.title = 'MBTI 风格探索 · 第 2 题 · 方片虎格测试';
  observerCallback();
  assert.equal(heading.textContent, 'MBTI 趣味性格测试');
  assert.equal(document.title, 'MBTI 趣味性格测试 · 第 2 题 · 方片 AI 学堂');
  observerCallback();
  assert.equal((document.title.match(/MBTI 趣味性格测试/g) || []).length, 1);
});

test('entry resources are local and present, while existing AITI and legacy routing remain separate', () => {
  for (const match of page.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const value = match[1];
    if (/^https?:/.test(value)) continue;
    assert.ok(fs.existsSync(path.join(root, value.split('?')[0])), value);
  }
  assert.match(page, /src="personality-data\.js/);
  assert.match(page, /src="personality\.js/);
  assert.match(page, /href="personality\.css/);
  assert.ok(!/splash\.js|track\.js|reviews\.js|\/jd\//.test(page));
  const legacy = fs.readFileSync(path.join(root, 'personality.html'), 'utf8');
  assert.match(legacy, /aiti\.html/);
  assert.ok(fs.existsSync(path.join(root, 'aiti.html')));
});
