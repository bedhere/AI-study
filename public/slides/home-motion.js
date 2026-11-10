(function (root) {
  'use strict';
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const smooth = (from, to, rate, dt) => to + (from - to) * Math.exp(-rate * clamp(dt, 0, .1));
  const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  function stateAt(progress) {
    const p = clamp(progress);
    return { progress: p, camera: Math.min(p * 1.2, 1), robot: 1 - ease((p - .08) / .68), phase: p < .5 ? 0 : 1 };
  }
  root.FangpianHomeMotion = { clamp, smooth, stateAt };
  if (!root.document) return;
  const story = document.getElementById('fpStory');
  const canvas = document.getElementById('fpRobotCanvas');
  if (!story || !canvas) return;
  const stage = story.querySelector('.fp-stage');
  const intro = story.querySelector('.fp-panel-intro');
  const reduce = matchMedia('(prefers-reduced-motion: reduce), (max-height: 600px)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const poster = story.querySelector('.fp-robot-fallback');
  const scene = story.querySelector('.fp-scene');
  let robot = null, frame = 0, previous = 0, active = true, disposed = false, contextLost = false;
  const robotLayout = { anchorX: .62, scale: 1 };
  let px = 0, py = 0, pointerActive = false, target = 0, visual = 0, lastOpacity = '', lastPhase = -1;
  let layout = { start: 0, distance: 1, width: 1, height: 1, top: 64 };
  let previewIndex = 0, resizeFrame = 0;
  const model = root.FangpianAITI;
  const previews = (model?.profiles || []);
  const previewImage = document.getElementById('fpDeclarationImage');
  const previewName = document.getElementById('fpDeclarationName');
  const previewType = document.getElementById('fpDeclarationNumber');
  const previewQuote = document.getElementById('fpDeclarationQuote');
  const previewTitle = document.getElementById('fpDeclarationTitle');
  const previewTags = document.getElementById('fpDeclarationTags');
  function setPreview(index) {
    if (!previews.length) return;
    previewIndex = (index + previews.length) % previews.length;
    const profile = previews[previewIndex];
    previewImage.src = profile.image;
    previewImage.alt = profile.name + ' · 方片 AI 人格';
    previewName.textContent = profile.name; previewType.textContent = profile.id + ' / 16';
    previewQuote.textContent = '“' + profile.quote + '”';
    previewTitle.textContent = '「' + profile.title + '」';
    previewTags.replaceChildren(...profile.tags.map(tag => {
      const node = document.createElement('span'); node.textContent = tag; return node;
    }));
  }
  document.getElementById('fpQuotePrevious')?.addEventListener('click', () => setPreview(previewIndex - 1));
  document.getElementById('fpQuoteNext')?.addEventListener('click', () => setPreview(previewIndex + 1));
  setPreview(1);
  function updateTarget() { target = clamp((scrollY - layout.start) / layout.distance); }
  function measure() {
    resizeFrame = 0;
    const headerHeight = document.querySelector('.nav')?.offsetHeight || 64;
    const box = story.getBoundingClientRect();
    layout = { start: box.top + scrollY - headerHeight, distance: Math.max(1, intro.offsetHeight), width: stage.clientWidth, height: stage.clientHeight, top: headerHeight };
    const wide = window.innerWidth >= 1440;
    robotLayout.anchorX = wide ? .59 : .62;
    robotLayout.scale = wide ? .9 : 1;
    updateTarget(); robot?.resize(); wake();
  }
  function queueMeasure() { if (!resizeFrame && !disposed) resizeFrame = requestAnimationFrame(measure); }
  function paint(state) {
    const opacity = (reduce.matches ? 1 : state.robot).toFixed(3);
    if (opacity !== lastOpacity) { scene.style.opacity = opacity; lastOpacity = opacity; }
    if (state.phase !== lastPhase) { story.dataset.scene = String(state.phase); lastPhase = state.phase; }
  }
  function tick(time) {
    frame = 0;
    if (disposed || document.hidden) return;
    const dt = previous ? clamp((time - previous) / 1000, 0, .1) : 1 / 60;
    previous = time;
    visual = reduce.matches ? target : smooth(visual, target, 16, dt);
    if (Math.abs(visual - target) < .0001) visual = target;
    const state = stateAt(visual); paint(state);
    const visible = active && (reduce.matches || state.robot > .002);
    if (robot && !contextLost && visible) {
      try {
        robot.update({ progress: reduce.matches ? 0 : state.camera, pointerX: fine.matches && !reduce.matches ? px : 0, pointerY: fine.matches && !reduce.matches ? py : 0, pointerActive: pointerActive && fine.matches && !reduce.matches, active: true, reducedMotion: reduce.matches, dt, time: time / 1000 });
        if (!story.classList.contains('fp-robot-ready')) { story.classList.add('fp-robot-ready'); story.dataset.renderer = 'webgl'; }
      } catch {
        story.classList.remove('fp-robot-ready'); story.dataset.renderer = 'fallback'; robot.dispose(); robot = null;
      }
    }
    if (active && !reduce.matches && ((visible && robot && !contextLost) || visual !== target)) frame = requestAnimationFrame(tick);
  }
  function wake() { if (!frame && !disposed && !document.hidden && active) frame = requestAnimationFrame(tick); }
  intro.addEventListener('pointerenter', () => { pointerActive = fine.matches && !reduce.matches; wake(); });
  intro.addEventListener('pointermove', event => {
    if (!fine.matches || reduce.matches) return;
    pointerActive = true;
    px = clamp(event.clientX / layout.width * 2 - 1, -1, 1);
    py = clamp((event.clientY - layout.top) / layout.height * 2 - 1, -1, 1);
    wake();
  }, { passive: true });
  intro.addEventListener('pointerleave', () => { px = py = 0; pointerActive = false; wake(); });
  addEventListener('scroll', () => { updateTarget(); wake(); }, { passive: true });
  addEventListener('resize', queueMeasure, { passive: true });
  addEventListener('pageshow', () => { previous = 0; queueMeasure(); });
  document.addEventListener('visibilitychange', () => {
    previous = 0;
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else { queueMeasure(); wake(); }
  });
  const observer = new IntersectionObserver(entries => {
    active = entries.some(entry => entry.isIntersecting); previous = 0;
    story.dataset.active = String(active);
    if (active) { updateTarget(); wake(); }
    else { cancelAnimationFrame(frame); frame = 0; }
  }, { threshold: 0 });
  observer.observe(story);
  const sizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(queueMeasure) : null;
  sizeObserver?.observe(stage); sizeObserver?.observe(intro);
  reduce.addEventListener('change', () => { previous = 0; queueMeasure(); });
  fine.addEventListener('change', () => { px = py = 0; pointerActive = false; wake(); });
  canvas.addEventListener('webglcontextlost', () => {
    contextLost = true; story.classList.remove('fp-robot-ready'); story.dataset.renderer = 'fallback';
    cancelAnimationFrame(frame); frame = 0; paint(stateAt(target));
  });
  canvas.addEventListener('webglcontextrestored', () => { contextLost = false; robot?.resize(); wake(); });
  canvas.addEventListener('fangpian:robot-asset', wake);
  import('./robot-scene.js?v=20261110space3').then(() => {
    if (disposed) return;
    robot = root.FangpianRobot?.mount(canvas, robotLayout) || null;
    if (robot) { canvas.dataset.meshes = String(robot.statistics.meshes); canvas.dataset.triangles = String(robot.statistics.triangles); }
    story.dataset.renderer = robot ? 'webgl' : 'fallback'; measure();
  }).catch(() => { story.dataset.renderer = 'fallback'; poster.hidden = false; });
  addEventListener('pagehide', event => {
    if (event.persisted) return;
    disposed = true; cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame);
    observer.disconnect(); sizeObserver?.disconnect(); robot?.dispose();
  });
  measure();
})(typeof window === 'undefined' ? globalThis : window);
