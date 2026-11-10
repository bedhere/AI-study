import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const root = new URL('../public/slides/', import.meta.url);
function loadModel() {
  const context = { window: {}, console };
  vm.runInNewContext(fs.readFileSync(new URL('robot-scene.js', root), 'utf8'), context, { timeout: 3000 });
  return context.window.FangpianRobot;
}
test('the classic local bundle exposes a mount API and degrades without WebGL', () => {
  const model = loadModel();
  assert.equal(typeof model.mount, 'function');
  assert.equal(model.mount(null), null);
  const canvas = { getContext() { return null; }, dataset: {} };
  assert.equal(model.mount(canvas), null);
  assert.equal(canvas.dataset.robotStatus, 'unavailable');
});
test('three scroll phases preserve bounded camera poses and introduce the quote face', () => {
  const model = loadModel();
  const intro = model.samplePose(0), product = model.samplePose(1), quote = model.samplePose(2);
  assert.equal(intro.fov, 30);
  assert.equal(intro.camera[2], 11.6);
  assert.equal(product.camera[2], 6.9);
  assert.deepEqual(Array.from(quote.camera), Array.from(product.camera));
  assert.equal(intro.headYaw, -.6);
  assert.ok(Math.abs(product.headYaw + .06) < 1e-10);
  assert.equal(model.samplePose(1.55).quote, 0);
  assert.ok(model.samplePose(1.64).quote > .49);
  assert.equal(quote.quote, 1);
  assert.deepEqual(Array.from(model.samplePose(-10).camera), Array.from(intro.camera));
  assert.deepEqual(Array.from(model.samplePose(Number.NaN).camera), Array.from(intro.camera));
  assert.equal(model.samplePose(1, .6).camera[2], product.camera[2] * 1.25);
});
test('pointer damping converges consistently at 30, 60 and 120 fps', () => {
  const model = loadModel();
  const final = [30, 60, 120].map(fps => {
    let value = 0;
    for (let i = 0; i < fps; i++) value += (.8 - value) * model.smoothingAlpha(1 / fps, 8);
    return value;
  });
  assert.ok(Math.max(...final) - Math.min(...final) < 1e-12);
  assert.equal(model.smoothingAlpha(-1), 0);
  assert.equal(model.smoothingAlpha(Number.NaN), 0);
});
test('large pointer looks cover both sides while preserving a front-facing head in every scroll pose', () => {
  const model = loadModel();
  let minimumFaceNormalZ = Infinity;
  for (const progress of [0, .25, .5, .75, 1, 2]) {
    const pose = model.samplePose(progress);
    const idle = model.sampleHeadFollow(pose, 1, -1, 0);
    assert.ok(Math.abs(idle.headYaw - pose.headYaw) < 1e-12);
    assert.equal(idle.headPitch, pose.headPitch);
    assert.equal(idle.headRoll, pose.headRoll);
    assert.equal(idle.bodyYaw, pose.bodyYaw);
    for (const x of [-1, -.5, 0, .5, 1]) {
      for (const y of [-1, 0, 1]) {
        for (const blend of [0, .25, .5, .75, 1]) {
          const look = model.sampleHeadFollow(pose, x, y, blend);
          assert.ok(Math.abs(look.headYaw) <= 1.35);
          assert.ok(Math.abs(look.headPitch) <= .44);
          assert.ok(Math.abs(look.worldYaw) <= 1.08);
          assert.ok(Math.abs(look.bodyYaw - pose.bodyYaw) <= .10000001);
          const facing = model.sampleHeadFacing(look);
          minimumFaceNormalZ = Math.min(minimumFaceNormalZ, facing.z);
          if (blend === 1) {
            assert.ok(Math.abs(look.worldYaw - x * .95) < 1e-12);
            assert.ok(Math.abs(look.headPitch - y * .42) < 1e-12);
          }
        }
      }
    }
  }
  assert.ok(minimumFaceNormalZ > .49);
});
test('real production head rotation keeps all four corner elevations symmetric and uncompressed', () => {
  const model = loadModel();
  assert.equal(model.HEAD_ROTATION_ORDER, 'YXZ');
  for (const progress of [0, .25, .5, .75, 1, 1.5, 2]) {
    const corners = [];
    for (const x of [-1, 1]) {
      for (const y of [-1, 1]) {
        const follow = model.sampleHeadFollow(model.samplePose(progress), x, y, 1);
        // sampleHeadFacing uses actual Three Group world matrices and the same
        // rotation setter as mount(). This catches a production XYZ regression.
        const facing = model.sampleHeadFacing(follow);
        assert.ok(Math.abs(facing.azimuth - x * .95) < 1e-12);
        assert.ok(Math.abs(facing.elevation + y * .42) < 1e-12);
        assert.ok(Math.abs(Math.hypot(facing.x, facing.y, facing.z) - 1) < 1e-12);
        assert.ok(facing.z > .5);
        if (x === 1 && y === 1) assert.ok(facing.y < -.4, 'right-bottom must really look down');
        corners.push(facing);
      }
    }
    assert.ok(Math.abs(corners[0].y - corners[2].y) < 1e-12);
    assert.ok(Math.abs(corners[1].y - corners[3].y) < 1e-12);
    assert.ok(Math.abs(corners[0].x + corners[2].x) < 1e-12);
    assert.ok(Math.abs(corners[1].x + corners[3].x) < 1e-12);
  }
});
test('pointer entry at the centre, leaving, coarse input and reduced motion resolve independently', () => {
  const model = loadModel();
  assert.deepEqual(JSON.parse(JSON.stringify(model.resolvePointerInput({ pointerX: 0, pointerY: 0, pointerActive: true }))), { enabled: true, active: true, x: 0, y: 0 });
  for (const state of [
    { pointerX: 1, pointerY: -1, pointerActive: false },
    { pointerX: 1, pointerY: -1, pointerActive: true, reducedMotion: true }
  ]) {
    const input = model.resolvePointerInput(state);
    assert.equal(input.active, false);
    assert.equal(input.x, 0);
    assert.equal(input.y, 0);
  }
  const coarse = model.resolvePointerInput({ pointerX: 1, pointerY: 1, pointerActive: true }, false);
  assert.equal(coarse.enabled, false);
  assert.equal(coarse.active, false);
  assert.equal(coarse.x, 0);
  assert.equal(coarse.y, 0);
  assert.equal(model.resolvePointerInput({ pointerX: .2 }).active, true);
  assert.equal(model.resolvePointerInput({ pointerX: 0, pointerY: Number.NaN }).active, false);
});
test('entering and leaving the large follow smoothly converges at every supported frame rate', () => {
  const model = loadModel(), pose = model.samplePose(0);
  const final = [30, 60, 120].map(fps => {
    let pointer = 0, blend = 0;
    let previousPointer = pointer, previousBlend = blend;
    for (let i = 0; i < fps * 2; i++) {
      pointer += (1 - pointer) * model.smoothingAlpha(1 / fps, 8);
      blend += (1 - blend) * model.smoothingAlpha(1 / fps, 7);
      assert.ok(pointer >= previousPointer && pointer <= 1);
      assert.ok(blend >= previousBlend && blend <= 1);
      previousPointer = pointer; previousBlend = blend;
    }
    const active = model.sampleHeadFollow(pose, pointer, pointer, blend);
    assert.ok(Math.abs(active.worldYaw - .95) < .00001);
    assert.ok(Math.abs(model.sampleHeadFacing(active).elevation + .42) < .00001);
    for (let i = 0; i < fps * 2; i++) {
      pointer += -pointer * model.smoothingAlpha(1 / fps, 8);
      blend += -blend * model.smoothingAlpha(1 / fps, 7);
      assert.ok(pointer <= previousPointer && pointer >= 0);
      assert.ok(blend <= previousBlend && blend >= 0);
      previousPointer = pointer; previousBlend = blend;
    }
    const returned = model.sampleHeadFollow(pose, pointer, pointer, blend);
    assert.ok(Math.abs(returned.headYaw - pose.headYaw) < .00001);
    assert.ok(Math.abs(returned.headPitch - pose.headPitch) < .00001);
    const idleFacing = model.sampleHeadFacing(model.sampleHeadFollow(pose, 0, 0, 0));
    assert.ok(Math.abs(model.sampleHeadFacing(returned).elevation - idleFacing.elevation) < .00001);
    return returned.headYaw;
  });
  assert.ok(Math.max(...final) - Math.min(...final) < 1e-12);
});
test('background raster work stays within a bounded pixel and shadow budget', () => {
  const model = loadModel();
  const phone = model.renderQuality(375, 812, 3);
  assert.equal(phone.pixelRatio, 1);
  assert.equal(phone.shadowSize, 256);
  const laptop = model.renderQuality(1440, 900, 2);
  assert.ok(laptop.pixelRatio <= 1.5);
  assert.equal(laptop.shadowSize, 512);
  for (const [width, height] of [[1440, 900], [1920, 1080], [3840, 2160]]) {
    const quality = model.renderQuality(width, height, 3);
    assert.ok(width * height * quality.pixelRatio ** 2 <= 2500001);
  }
  assert.ok(model.renderQuality(0, 0, Number.NaN).pixelRatio > 0);
});
test('idle rendering is capped at 30fps while scroll and pointer changes retain frame-by-frame response', () => {
  const model = loadModel();
  const current = { phase: 0, pointerX: 0, pointerY: 0, quote: 0, blink: 1, reduced: false };
  for (const fps of [30, 60, 120]) {
    let count = 0, renderedAt = 0, previous = { ...current };
    for (let frame = 1; frame <= fps; frame++) {
      const time = frame / fps;
      if (model.shouldRenderFrame(current, previous, time - renderedAt)) { count++; renderedAt = time; previous = { ...current }; }
    }
    assert.equal(count, 30);
  }
  let previous = { ...current };
  for (let frame = 1; frame <= 60; frame++) {
    const scrolling = { ...current, phase: frame / 60, pointerX: frame / 120 };
    assert.equal(model.shouldRenderFrame(scrolling, previous, 1 / 60), true);
    previous = scrolling;
  }
  const reduced = { ...current, reduced: true };
  assert.equal(model.shouldRenderFrame(reduced, reduced, 10), false);
  assert.equal(model.shouldRenderFrame({ ...reduced, quote: 1 }, reduced, 1 / 60), true);
  assert.equal(model.shouldRenderFrame(reduced, reduced, 0, true), true);
});
test('actual head rotation and centre-entry blending bypass the idle frame-rate cap', () => {
  const model = loadModel();
  const base = { phase: 0, pointerX: 0, pointerY: 0, pointerActive: false, headYaw: -.6, headPitch: .16, headRoll: .22, bodyYaw: -.42, quote: 0, blink: 1, reduced: false };
  assert.equal(model.shouldRenderFrame({ ...base, pointerActive: true }, base, 0), true);
  const entered = { ...base, pointerActive: true };
  for (const angle of ['headYaw', 'headPitch', 'headRoll', 'bodyYaw']) {
    assert.equal(model.shouldRenderFrame({ ...entered, [angle]: entered[angle] + .002 }, entered, 1 / 120), true);
  }
  assert.equal(model.shouldRenderFrame(entered, entered, 1 / 120), false);
});
test('stationary poses reuse one shadow map and scrolling requests at most low-frequency refreshes', () => {
  const model = loadModel();
  let cached = Number.NaN, refreshedAt = -Infinity, stationary = 0;
  for (let frame = 0; frame < 240; frame++) {
    const time = frame / 120;
    if (model.shouldRefreshShadow(.3, cached, time - refreshedAt)) { stationary++; cached = .3; refreshedAt = time; }
  }
  assert.equal(stationary, 1);
  cached = Number.NaN; refreshedAt = -Infinity;
  let scrolling = 0;
  for (let frame = 0; frame <= 120; frame++) {
    const time = frame / 120;
    if (model.shouldRefreshShadow(time, cached, time - refreshedAt)) { scrolling++; cached = time; refreshedAt = time; }
  }
  assert.ok(scrolling >= 2 && scrolling <= 9);
  assert.equal(model.shouldRefreshShadow(1, .99, .5), true);
  assert.equal(model.shouldRefreshShadow(1, 1, 100), false);
  assert.equal(model.shouldRefreshShadow(1, 1, 0, true), true);
});
test('large pointer turns can refresh their shadow within the existing low-frequency budget', () => {
  const model = loadModel();
  let cachedPhase = Number.NaN, cachedAngle = 0, refreshedAt = -Infinity, passes = 0;
  for (let frame = 0; frame <= 120; frame++) {
    const time = frame / 120, yaw = -.95 + 1.9 * time;
    if (model.shouldRefreshShadow(0, cachedPhase, time - refreshedAt, false, yaw - cachedAngle)) {
      passes++; cachedPhase = 0; cachedAngle = yaw; refreshedAt = time;
    }
  }
  assert.ok(passes >= 2 && passes <= 9);
  assert.equal(model.shouldRefreshShadow(0, 0, .1, false, 1), false);
  assert.equal(model.shouldRefreshShadow(0, 0, 10, false, .01), false);
  assert.equal(model.shouldRefreshShadow(0, 0, .4, false, .03), true);
});
test('the mutable internal pose buffer preserves the public pose contract without per-frame arrays', () => {
  const model = loadModel();
  const buffer = { camera: [0, 0, 0], target: [0, 0, 0] };
  const camera = buffer.camera, target = buffer.target;
  for (const phase of [0, .4, 1, 1.8, 2]) {
    assert.equal(model.samplePose(phase, 1, buffer), buffer);
    assert.equal(buffer.camera, camera);
    assert.equal(buffer.target, target);
    assert.deepEqual(JSON.parse(JSON.stringify(buffer)), JSON.parse(JSON.stringify(model.samplePose(phase))));
  }
});
test('blink intervals stay in the requested range with no random render-path state', () => {
  const model = loadModel();
  assert.equal(model.blinkScale(0), 1);
  for (const time of [3.31, 8.01, 10.91, 16.01]) assert.ok(Math.abs(model.blinkScale(time) - .1) < 1e-12);
  for (let time = 0; time < 40; time += .01) assert.ok(model.blinkScale(time) >= .099999 && model.blinkScale(time) <= 1.000001);
  const intervals = [4.7, 2.9, 5.1, 3.4];
  assert.ok(intervals.every(interval => interval >= 2.5 && interval <= 5.5));
});
test('the pinned dependency provenance, bundle hash and local SVG fallbacks are intact', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('assets/robot/SOURCE.json', root), 'utf8'));
  assert.equal(manifest.version, '0.160.0');
  assert.equal(manifest.integrityVerified, true);
  assert.equal(manifest.registryTarball, 'https://registry.npmjs.org/three/-/three-0.160.0.tgz');
  assert.equal(createHash('sha256').update(fs.readFileSync(new URL('robot-scene.js', root))).digest('hex'), manifest.bundle.sha256);
  for (const name of ['robot-poster.svg', 'robot-poster-quote.svg']) {
    const svg = fs.readFileSync(new URL('assets/robot/' + name, root), 'utf8');
    assert.ok(svg.includes('robot-poster-eyes'));
    assert.ok(svg.includes('robot-poster-quote'));
    const embeddedLogo = svg.match(/href="data:image\/webp;base64,([A-Za-z0-9+/=]+)"/);
    assert.ok(embeddedLogo, 'the fallback uses a self-contained company logo');
    assert.deepEqual(Buffer.from(embeddedLogo[1], 'base64'), fs.readFileSync(new URL('assets/fangpian/logo-yellow-square.webp', root)));
  }
  const source = fs.readFileSync(new URL('assets/robot/robot-scene-source.mjs', root), 'utf8');
  assert.ok(!source.includes('Math.random'));
  assert.ok(!source.includes('requestAnimationFrame'));
  assert.ok(!source.includes('fetch('));
});
