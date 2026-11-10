import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('../public/slides/', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
function model() { const context = {}; vm.runInNewContext(read('home-motion.js'), context); return context.FangpianHomeMotion; }

test('the short scroll path fades the robot continuously without an empty pinned slide', () => {
  const motion = model();
  assert.equal(motion.stateAt(0).robot, 1);
  assert.equal(motion.stateAt(1).robot, 0);
  assert.equal(motion.stateAt(0).camera, 0);
  assert.equal(motion.stateAt(1).camera, 1);
  let previous = 1;
  for (let p = 0; p <= 1; p += .005) {
    const state = motion.stateAt(p);
    assert.ok(state.robot <= previous && state.robot >= 0);
    assert.ok(state.camera >= 0 && state.camera <= 1);
    previous = state.robot;
  }
  assert.equal(motion.stateAt(-10).progress, 0);
  assert.equal(motion.stateAt(10).progress, 1);
});
test('the actual camera filter has equal response at 30 and 120 fps', () => {
  const motion = model();
  let a = 0, b = 0;
  for (let i = 0; i < 30; i++) a = motion.smooth(a, 1, 16, 1 / 30);
  for (let i = 0; i < 120; i++) b = motion.smooth(b, 1, 16, 1 / 120);
  assert.ok(Math.abs(a - b) < .000001);
  assert.match(read('home-motion.js'), /visual = reduce.matches \? target : smooth\(visual, target, 16, dt\)/);
});
test('five language homepages preserve learning controls and all three real employee routes', () => {
  for (const lang of ['', '.en', '.ko', '.tw', '.hk']) {
    const html = read('home' + lang + '.html');
    for (const id of ['fpStory','fpRobotCanvas','heroStart','heroStartTxt','heroVisual','hvList','hvRing','tigerTestEntry','topicsGrid','who','fpBrowseCourses','fpStartAiti','aiPersonality','fpQuotePrevious','fpQuoteNext','fpDeclarationTitle','fpDeclarationTags']) {
      assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, id + lang);
    }
    assert.equal((html.match(/data-company-role=/g) || []).length, 3);
    assert.ok(html.includes('href="aiti.html#quiz"') && html.includes('href="aiti.html#gallery"'));
    assert.ok(!html.includes('href="disc.html"'));
    assert.ok(!html.includes('href="mbti.html"') && !html.includes('personality-data.js'));
    assert.ok(!html.includes('fp-panel-product') && !html.includes('fp-panel-quotes') && !html.includes('fpTabsTrack'));
    assert.ok(!html.includes('fp-announcement') && !html.includes('NOVA AGENT'));
    assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html));
    assert.ok(html.indexOf('id="fpBrowseCourses"') < html.indexOf('id="heroStart"'));
  }
});
test('homepage preview uses the original AITI collection and leaves scoring to the existing test', () => {
  const context = {}; vm.runInNewContext(read('aiti-data.js'), context);
  const model = context.FangpianAITI;
  assert.equal(model.questions.length,16); assert.equal(model.profiles.length,16);
  for (const profile of model.profiles) {
    assert.ok(fs.existsSync(new URL(profile.image, root)) && profile.tags.length === 4 && profile.title && profile.quote);
  }
  const html = read('home.html');
  assert.ok(html.includes('方片 AI 人格测试') && html.includes('16道题') && !html.includes('32道题'));
  for (const dim of ['AI认可度','AI使用度','AI了解度','正向价值度']) assert.ok(html.includes(dim));
  const js = read('home-motion.js');
  assert.ok(js.includes('root.FangpianAITI') && !js.includes('FangpianPersonality'));
  assert.ok(!js.includes('localStorage') && !js.includes('.score(') && !js.includes('.save('));
});
test('scroll handlers avoid layout reads, wheel interception and recurring accessibility writes', () => {
  const js = read('home-motion.js');
  const tick = js.slice(js.indexOf('function tick('), js.indexOf('function wake('));
  assert.ok(!/getBoundingClientRect|getComputedStyle|setAttribute|inert/.test(tick));
  assert.ok(!js.includes("addEventListener('wheel'") && !js.includes('preventDefault'));
  assert.ok(!js.includes('setInterval') && !js.includes('noticeHidden'));
});
test('normal-flow content stays available without motion or a WebGL renderer', () => {
  const js = read('home-motion.js'), css = read('home-motion.css');
  assert.ok(js.includes('visibilitychange') && js.includes('webglcontextlost'));
  assert.match(css, /\.fp-panel \{ position: relative/);
  assert.match(css, /\.fp-panel-personality \{ display: grid/);
  assert.ok(!css.includes('300svh') && !css.includes('aria-hidden=true'));
  assert.ok(css.includes('prefers-reduced-motion:reduce') && css.includes('scroll-behavior: auto!important'));
  assert.match(css, /\.fp-robot-fallback \{[^}]*visibility: hidden/);
  assert.match(css, /\.fp-story\[data-renderer="fallback"\] \.fp-robot-fallback \{ visibility: visible/);
  assert.ok(!read('aiti.js').includes('href="disc.html"') && !read('aiti.html').includes('href="disc.html"'));
  assert.ok(fs.existsSync(new URL('assets/robot/robot-poster.svg', root)));
});
