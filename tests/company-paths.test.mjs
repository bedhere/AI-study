import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../public/slides/', import.meta.url);
function load(name) { return fs.readFileSync(new URL(name, root), 'utf8'); }
function model() { const context = { URLSearchParams }; vm.runInNewContext(load('company-paths.js'), context); return context.FangpianPaths; }
function storage(initial = '"all"') {
  const values = new Map([['ai_build_route_v1', initial], ['ai_course_progress_v1', '{"zero-0.html":1}']]);
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}
test('three employee roles have distinct starts that actually belong to their learning routes', () => {
  const paths = model();
  assert.equal(paths.roles.length, 3);
  assert.equal(new Set(paths.roles.map(role => role.start)).size, 3);
  for (const lang of ['zh', 'en', 'ko', 'tw', 'hk']) {
    const suffix = lang === 'zh' ? '' : '.' + lang;
    const context = { window: {} }; vm.runInNewContext(load('course-data' + suffix + '.js'), context);
    for (const role of paths.roles) {
      const part = context.window.COURSE.parts.find(part => part.topics.some(topic => topic.lessons.some(lesson => lesson.file === role.start)));
      assert.ok(part, role.start);
      const topic = part.topics.find(topic => topic.lessons.some(lesson => lesson.file === role.start));
      assert.ok((topic.routes || part.routes || ['use', 'pro', 'pm', 'build']).includes(role.id));
      assert.ok(fs.existsSync(new URL(role.start.replace('.html', suffix + '.html'), root)));
    }
  }
});
test('explicit role links override a saved route without changing course progress', () => {
  const paths = model(), saved = storage('"build"');
  assert.equal(paths.choice('?route=use', saved), 'use');
  assert.equal(saved.getItem(paths.key), '"use"');
  assert.equal(saved.getItem('ai_course_progress_v1'), '{"zero-0.html":1}');
  assert.equal(paths.choice('?route=pro', saved), 'pro');
  assert.equal(paths.choice('?route=all', saved), 'all');
});
test('legacy roles, invalid URLs and unavailable storage have defined fallbacks', () => {
  const paths = model();
  assert.equal(paths.choice('', storage('"pm"')), 'build');
  assert.equal(paths.choice('?route=unknown', storage('"pro"')), 'pro');
  assert.equal(paths.choice('', storage('{broken')), 'all');
  assert.equal(paths.choice('?route=build', null), 'build');
  assert.equal(paths.choice('', null), 'all');
});
test('all homepages and route pages expose the same three actionable role links', () => {
  for (const lang of ['zh', 'en', 'ko', 'tw', 'hk']) {
    const suffix = lang === 'zh' ? '' : '.' + lang;
    for (const base of ['home', 'roadmap']) {
      const source = load(base + suffix + '.html');
      assert.equal((source.match(/data-company-role=/g) || []).length, 3);
      for (const role of model().roles) {
        assert.ok(source.includes('learn' + suffix + '.html?route=' + role.id + '#' + role.start.replace('.html', suffix + '.html')));
      }
      assert.ok(source.includes('company-paths.css'));
    }
    const reader = load('learn' + suffix + '.html');
    assert.ok(reader.includes('company-paths.js'));
    assert.ok(reader.includes('FangpianPaths.choice'));
    assert.ok(reader.includes('roleURL.searchParams.set'));
  }
});
test('the old assistant lesson now describes the source-reading lesson it actually opens', () => {
  const context = { window: {} }; vm.runInNewContext(load('course-data.js'), context);
  const lesson = context.window.COURSE_FLAT.find(lesson => lesson.file === 'learn-11.html');
  assert.equal(lesson.title, '让 AI 只根据我贴出的原文回答');
  assert.equal(lesson.navTitle, lesson.title);
  assert.ok(!lesson.desc.includes('站上就有一个助教'));
  assert.ok(load('nav-inject.js').includes(lesson.title));
});
test('product history and unavailable assistant features have explicit replacement content', () => {
  const source = load('9-0.html');
  assert.ok(source.includes('虚构的内容生产助手'));
  assert.ok(!source.includes('我开发 AI Agent'));
  assert.ok(!source.includes('500,000'));
  for (const name of ['learn-30.html', 'learn-31.html', 'learn-32.html']) {
    const source = load(name);
    assert.ok(source.includes('未接入聊天'));
    assert.ok(!source.includes('问问 Alice'));
  }
  assert.ok(load('redesign-preview.html').includes('旧版设计预览已归档'));
  assert.ok(load('10-7.html').includes('Alice')); // ordinary JSON example assignee is retained
});
test('the external-link guard tolerates a document being replaced during navigation', () => {
  for (const root of [null, { nodeType: 1 }]) {
    let observed = null;
    const context = {
      URL, location: { href: 'http://localhost/slides/home.html', origin: 'http://localhost' },
      document: { readyState: 'complete', documentElement: root, addEventListener() {}, querySelectorAll() { return []; } },
      MutationObserver: class { observe(node) { assert.ok(node); observed = node; } }
    };
    assert.doesNotThrow(() => vm.runInNewContext(load('external-platform-policy.js'), context));
    assert.equal(observed, root);
  }
});
