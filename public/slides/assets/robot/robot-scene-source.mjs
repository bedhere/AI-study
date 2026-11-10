/* Original Fangpian robot geometry; Three.js MIT library is bundled separately at build time. */
import {
  ACESFilmicToneMapping, CanvasTexture, CylinderGeometry, DirectionalLight,
  ExtrudeGeometry, Group, HemisphereLight, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry,
  Scene, Shape, SphereGeometry, SRGBColorSpace, TextureLoader, TubeGeometry,
  CatmullRomCurve3, Vector3, WebGLRenderer
} from 'three';
import { RoundedBoxGeometry } from './RoundedBoxGeometry.mjs';

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, Number.isFinite(value) ? value : 0));
const mix = (a, b, progress) => a + (b - a) * progress;
export const HEAD_ROTATION_ORDER = 'YXZ';

function setHeadRotation(head, follow) {
  // Yaw first in parent space, then pitch in the turned head's local space.
  // XYZ would multiply vertical facing by cos(localYaw), weakening right corners.
  head.rotation.set(follow.headPitch, follow.headYaw, follow.headRoll, HEAD_ROTATION_ORDER);
}
function readHeadFacing(head, direction, result) {
  head.getWorldDirection(direction);
  result.x = direction.x; result.y = direction.y; result.z = direction.z;
  result.azimuth = Math.atan2(direction.x, direction.z);
  result.elevation = Math.asin(clamp(direction.y, -1, 1));
  return result;
}
let facingProbe;
export function sampleHeadFacing(follow, result) {
  // Reuse Three's real scene graph and the production rotation setter in tests;
  // do not infer facing from Euler angle sums or a separately assumed order.
  if (!facingProbe) {
    const body = new Group(), head = new Group(); body.add(head);
    facingProbe = { body, head, direction: new Vector3() };
  }
  facingProbe.body.rotation.y = follow.bodyYaw;
  setHeadRotation(facingProbe.head, follow);
  return readHeadFacing(facingProbe.head, facingProbe.direction, result || {});
}
export function smoothingAlpha(dt, stiffness = 8) {
  return 1 - Math.exp(-Math.max(0, Number.isFinite(dt) ? dt : 0) * stiffness);
}
export function samplePose(progress, aspect = 1, result) {
  const p = clamp(progress, 0, 2), phase = Math.min(1, p);
  const narrow = aspect < .85 ? 1.25 : 1;
  const pose = result || { camera: [0, 0, 0], target: [0, 0, 0] };
  pose.camera[0] = 0; pose.camera[1] = mix(1.1, 1.95, phase); pose.camera[2] = mix(11.6, 6.9, phase) * narrow;
  pose.target[0] = 0; pose.target[1] = mix(.55, 1.72, phase); pose.target[2] = .03;
  pose.headRoll = mix(.22, 0, phase); pose.headYaw = mix(-.6, -.06, phase); pose.headPitch = mix(.16, .04, phase);
  pose.bodyYaw = mix(-.42, -.2, phase); pose.fov = 30; pose.zoom = mix(1, 1.22, phase);
  pose.quote = clamp((p - 1.55) / .18);
  return pose;
}
export function renderQuality(width, height, devicePixelRatio = 1) {
  const w = Math.max(1, Number.isFinite(width) ? width : 1), h = Math.max(1, Number.isFinite(height) ? height : 1);
  const mobile = w < 760;
  return {
    pixelRatio: Math.min(Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1, mobile ? 1 : 1.5, Math.sqrt(2500000 / (w * h))),
    shadowSize: mobile ? 256 : 512
  };
}
export function resolvePointerInput(state, finePointer = true, result) {
  const input = result || {};
  const enabled = finePointer && !state.reducedMotion;
  const x = clamp(state.pointerX, -1, 1), y = clamp(state.pointerY, -1, 1);
  input.enabled = enabled;
  input.active = enabled && (typeof state.pointerActive === 'boolean' ? state.pointerActive : Math.abs(x) + Math.abs(y) > .0001);
  input.x = input.active ? x : 0; input.y = input.active ? y : 0;
  return input;
}
export function sampleHeadFollow(pose, pointerX, pointerY, blend, result) {
  const follow = result || {};
  const weight = clamp(blend), x = clamp(pointerX, -1, 1), y = clamp(pointerY, -1, 1);
  follow.bodyYaw = pose.bodyYaw + x * .10 * weight;
  // Blend toward a world-facing look target. Adding a large local angle to the
  // intro's already-angled head would otherwise turn the face away completely.
  const idleWorldYaw = pose.bodyYaw + pose.headYaw;
  const worldYaw = clamp(mix(idleWorldYaw, x * .95, weight), -1.08, 1.08);
  follow.headYaw = clamp(worldYaw - follow.bodyYaw, -1.35, 1.35);
  follow.worldYaw = follow.bodyYaw + follow.headYaw;
  follow.headPitch = clamp(mix(pose.headPitch, y * .42, weight), -.44, .44);
  follow.headRoll = pose.headRoll - x * .05 * weight;
  return follow;
}
export function shouldRenderFrame(current, previous, elapsed, force = false) {
  if (force || !previous || current.reduced !== previous.reduced) return true;
  // Entry at the exact screen centre changes the follow blend without changing
  // pointer coordinates. Actual pose deltas must bypass the idle 30fps gate.
  if (current.pointerActive !== previous.pointerActive
    || Math.abs((current.headYaw ?? 0) - (previous.headYaw ?? 0)) > .00035
    || Math.abs((current.headPitch ?? 0) - (previous.headPitch ?? 0)) > .00035
    || Math.abs((current.headRoll ?? 0) - (previous.headRoll ?? 0)) > .00035
    || Math.abs((current.bodyYaw ?? 0) - (previous.bodyYaw ?? 0)) > .00035) return true;
  if (Math.abs(current.phase - previous.phase) > .0001 || Math.abs(current.pointerX - previous.pointerX) > .0006 || Math.abs(current.pointerY - previous.pointerY) > .0006 || Math.abs(current.quote - previous.quote) > .001 || Math.abs(current.blink - previous.blink) > .015) return true;
  return !current.reduced && elapsed + 1e-8 >= 1 / 30;
}
export function shouldRefreshShadow(phase, cachedPhase, elapsed, force = false, angularChange = 0) {
  if (force || !Number.isFinite(cachedPhase)) return true;
  const change = Math.abs(clamp(phase) - clamp(cachedPhase));
  const angle = Number.isFinite(angularChange) ? Math.abs(angularChange) : 0;
  return ((change >= .075 || angle >= .16) && elapsed >= .12) || ((change > .005 || angle > .025) && elapsed >= .4);
}
export function blinkScale(time) {
  const intervals = [3.4, 4.7, 2.9, 5.1];
  let phase = Math.max(0, Number.isFinite(time) ? time : 0) % 16.1;
  for (const interval of intervals) {
    if (phase < interval) return phase < interval - .18 ? 1 : .1 + .9 * Math.abs((phase - interval + .09) / .09);
    phase -= interval;
  }
  return 1;
}

function roundedRect(width, height, radius, depth, bevel = .018) {
  const x = -width / 2, y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const geometry = new ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 10 });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

export function mount(canvas, options = {}) {
  if (!canvas || typeof canvas.getContext !== 'function') return null;
  let context;
  try { context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: false }); } catch { return null; }
  if (!context) { canvas.dataset.robotStatus = 'unavailable'; return null; }

  let renderer;
  try { renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { canvas.dataset.robotStatus = 'unavailable'; return null; }
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, .1, 60);
  const resources = new Set();
  const geometryCache = new Map();
  function own(value) { resources.add(value); return value; }
  function material(color, roughness = .35, metalness = .06) { return own(new MeshStandardMaterial({ color, roughness, metalness })); }
  const white = material(0xf7f6f1, .27, .1);
  const cream = material(0xfffbef, .32, .04);
  const black = material(0x171819, .43, .14);
  const screen = material(0x050607, .2, .05);
  const gold = material(0xffd85f, .28, .17);
  const orange = material(0xf7b249, .29, .12);
  const pink = material(0xe99398, .32, .08);
  const plinthMaterial = material(0x30302e, .7, .08);
  const plinthTop = material(0x3c3b37, .62, .09);
  const ledMaterials = [0xffc84e, 0xfba16c, 0xed829b].map(color => own(new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .22, roughness: .26 })));
  const eyeMaterial = own(new MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false }));
  const eyeHalo = own(new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .07, depthWrite: false }));
  function box(w, h, d, radius = .08) {
    const key = [w, h, d, radius].join(':');
    if (!geometryCache.has(key)) geometryCache.set(key, own(new RoundedBoxGeometry(w, h, d, 4, radius)));
    return geometryCache.get(key);
  }
  function sphere(radius, segments = 24) {
    const key = 'sphere:' + radius + ':' + segments;
    if (!geometryCache.has(key)) geometryCache.set(key, own(new SphereGeometry(radius, segments, Math.ceil(segments / 2))));
    return geometryCache.get(key);
  }
  function part(parent, geometry, mat, x, y, z, shadows = true) {
    const mesh = new Mesh(geometry, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = shadows;
    mesh.receiveShadow = shadows;
    parent.add(mesh);
    return mesh;
  }

  const rig = new Group(); scene.add(rig);
  const robot = new Group(); rig.add(robot);
  const body = new Group(); robot.add(body);
  const head = new Group(); head.position.set(0, .78, 0); robot.add(head);
  const headCase = new Group(); headCase.position.y = .78; head.add(headCase);

  // Thick, smoothly bevelled monitor housing and independently rounded face layers.
  part(headCase, box(1.5, 1.42, 1.3, .2), white, 0, 0, 0);
  part(headCase, own(roundedRect(1.5, 1.44, .23, .10, .018)), orange, 0, -.008, .64);
  part(headCase, own(roundedRect(1.47, 1.41, .22, .075, .014)), gold, .012, -.002, .71);
  // A restrained seam on the left edge references the warm split bezel without a rainbow wash.
  const seam = part(headCase, own(roundedRect(.038, .96, .018, .016, .005)), pink, -.688, .015, .76, false);
  seam.rotation.z = -.025;
  part(headCase, own(roundedRect(1.08, 1.02, .18, .06, .018)), cream, 0, .014, .755);
  part(headCase, own(roundedRect(.9, .84, .13, .045, .012)), screen, 0, .022, .8);

  const eyes = new Group(); eyes.position.set(0, .015, .835); headCase.add(eyes);
  const pupils = [];
  for (const x of [-.14, .14]) {
    const glow = part(eyes, sphere(.105), eyeHalo, x, 0, -.006, false);
    glow.scale.set(1.03, 1.12, .16);
    const eye = part(eyes, sphere(.064), eyeMaterial, x, 0, .008, false);
    eye.scale.set(.86, 1.1, .26);
    pupils.push(eye);
  }
  const quoteGroup = new Group(); quoteGroup.position.set(0, .01, .844); headCase.add(quoteGroup);
  const quoteMaterial = own(new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
  const quoteGlow = own(new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
  const quoteShape = new Shape();
  quoteShape.moveTo(-.07, .16); quoteShape.lineTo(.075, .16); quoteShape.lineTo(.075, .015);
  quoteShape.quadraticCurveTo(.075, -.12, -.06, -.17); quoteShape.lineTo(-.095, -.10);
  quoteShape.quadraticCurveTo(-.015, -.06, -.015, 0); quoteShape.lineTo(-.07, 0); quoteShape.closePath();
  const quoteGeometry = own(new ExtrudeGeometry(quoteShape, { depth: .007, steps: 1, bevelEnabled: false, curveSegments: 12 }));
  for (const x of [-.14, .14]) {
    part(quoteGroup, quoteGeometry, quoteMaterial, x, 0, .003, false);
    const glow = part(quoteGroup, quoteGeometry, quoteGlow, x, 0, 0, false); glow.scale.set(1.12, 1.12, 1);
  }

  const earOuterGeometry = own(new CylinderGeometry(.22, .22, .10, 36));
  const earInnerGeometry = own(new CylinderGeometry(.16, .16, .12, 32));
  const earHubGeometry = own(new CylinderGeometry(.085, .085, .13, 28));
  for (const side of [-1, 1]) {
    const outer = part(headCase, earOuterGeometry, black, side * .77, -.025, .02); outer.rotation.z = Math.PI / 2;
    const inner = part(headCase, earInnerGeometry, cream, side * .81, -.025, .02); inner.rotation.z = Math.PI / 2;
    const hub = part(headCase, earHubGeometry, black, side * .85, -.025, .02); hub.rotation.z = Math.PI / 2;
  }
  const cable = own(new TubeGeometry(new CatmullRomCurve3([
    new Vector3(.85, -.16, .045), new Vector3(.89, -.33, .09), new Vector3(.85, -.42, .19), new Vector3(.76, -.43, .245)
  ]), 14, .032, 8, false));
  part(headCase, cable, black, 0, 0, 0);

  part(body, own(new CylinderGeometry(.18, .20, .22, 32)), black, 0, .74, 0);
  part(body, box(1.22, 1.12, .92, .15), white, 0, .11, 0);
  part(body, box(.94, .19, .055, .022), cream, 0, .45, .462);
  for (const [i, x] of [-.14, 0, .14].entries()) part(body, sphere(.036, 18), ledMaterials[i], x, .455, .503, false);
  // Use the same official company artwork as the navigation, not a substitute symbol.
  part(body, box(.28, .28, .035, .035), gold, 0, .05, .473);
  const logoMaterial = own(new MeshBasicMaterial({ toneMapped: false }));
  const logoBadge = part(body, own(new PlaneGeometry(.25, .25)), logoMaterial, 0, .05, .494, false);
  logoBadge.visible = false;
  const logoTexture = own(new TextureLoader().load(new URL('assets/fangpian/logo-yellow-square.webp', document.baseURI).href, texture => {
    if (disposed) { texture.dispose(); return; }
    logoBadge.visible = true;
    forceRender = true;
    canvas.dispatchEvent(new Event('fangpian:robot-asset'));
  }));
  logoTexture.colorSpace = SRGBColorSpace;
  logoMaterial.map = logoTexture;
  for (const x of [-.31, .31]) part(body, box(.052, .18, .026, .024), black, x, -.13, .468, false);

  const arms = [];
  for (const side of [-1, 1]) {
    const arm = new Group(); arm.position.set(side * .71, .47, 0); arm.rotation.z = side * .1;
    body.add(arm); arms.push(arm);
    part(arm, sphere(.175), black, 0, 0, 0);
    part(arm, box(.30, .4, .375, .07), white, side * .024, -.21, .015);
    part(arm, sphere(.10, 20), black, side * .033, -.43, .025);
    part(arm, box(.31, .36, .38, .07), white, side * .043, -.62, .065);
    part(arm, box(.31, .21, .32, .052), cream, side * .045, -.85, .09);
    for (const x of [-.095, 0, .095]) part(arm, box(.085, .14, .17, .03), white, side * .045 + x, -.845, .22);
  }
  for (const side of [-1, 1]) {
    const x = side * .27;
    part(body, own(new CylinderGeometry(.13, .13, .18, 24)), black, x, -.50, 0);
    part(body, box(.36, .43, .47, .06), white, x, -.755, .012);
    part(body, own(new CylinderGeometry(.12, .12, .14, 24)), black, x, -1.0, .024);
    part(body, box(.44, .20, .65, .05), cream, x, -1.095, .125);
  }

  part(rig, box(1.7, 1.6, 1.7, .035), plinthMaterial, 0, -1.995, .04);
  part(rig, box(1.705, .025, 1.705, .015), plinthTop, 0, -1.183, .04);
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = 128; shadowCanvas.height = 128;
  const shadowContext = shadowCanvas.getContext('2d');
  if (shadowContext) {
    const gradient = shadowContext.createRadialGradient(64, 64, 12, 64, 64, 63);
    gradient.addColorStop(0, 'rgba(35,30,19,.25)'); gradient.addColorStop(.45, 'rgba(35,30,19,.13)'); gradient.addColorStop(1, 'rgba(35,30,19,0)');
    shadowContext.fillStyle = gradient; shadowContext.fillRect(0, 0, 128, 128);
    const texture = own(new CanvasTexture(shadowCanvas));
    const mat = own(new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false }));
    const shadow = part(scene, own(new PlaneGeometry(4.5, 3.9)), mat, .15, -2.80, .17, false);
    shadow.rotation.x = -Math.PI / 2; shadow.renderOrder = -1;
  }

  scene.add(new HemisphereLight(0xfffcf3, 0xd3c9b7, 2.45));
  const keyLight = new DirectionalLight(0xfffbef, 3.9); keyLight.position.set(-3.5, 7, 7); keyLight.castShadow = true;
  keyLight.shadow.autoUpdate = false;
  keyLight.shadow.mapSize.set(512, 512); keyLight.shadow.camera.left = -3; keyLight.shadow.camera.right = 3;
  keyLight.shadow.camera.top = 4; keyLight.shadow.camera.bottom = -3; keyLight.shadow.camera.near = .5; keyLight.shadow.camera.far = 20;
  keyLight.shadow.camera.updateProjectionMatrix(); keyLight.shadow.normalBias = .025; keyLight.shadow.bias = -.00015;
  scene.add(keyLight);
  const fill = new DirectionalLight(0xfff3d4, 1.5); fill.position.set(4, 3.4, 3); scene.add(fill);
  const rim = new DirectionalLight(0xffffff, 2.5); rim.position.set(1.6, 5, -4); scene.add(rim);

  let disposed = false, lost = false, lastTime = 0, clock = 0;
  let pointerX = 0, pointerY = 0, pointerBlend = 0, aspect = 1;
  let lastRenderAt = -Infinity, lastShadowAt = -Infinity, lastShadowPhase = Number.NaN, forceRender = true, shadowDirty = true;
  let shadowWorldYaw = Number.NaN, shadowPitch = Number.NaN;
  let viewWidth = 0, viewHeight = 0, viewPixelRatio = 0, lastDrawn = null;
  const lastState = { progress: 0, pointerX: 0, pointerY: 0, active: true, reducedMotion: !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches };
  const poseBuffer = { camera: [0, 0, 0], target: [0, 0, 0] };
  const followBuffer = {}, pointerInput = {};
  const pointerMedia = window.matchMedia?.('(hover: hover) and (pointer: fine)');
  const frameState = { phase: 0, pointerX: 0, pointerY: 0, pointerActive: false, headYaw: 0, headPitch: 0, headRoll: 0, bodyYaw: 0, quote: 0, blink: 1, reduced: false };
  const statistics = { meshes: 0, triangles: 0, renderedFrames: 0, skippedFrames: 0, shadowPasses: 0, pixelRatio: 0, shadowSize: 0 };
  const target = new Vector3(), facingDirection = new Vector3();
  const facing = {};
  function notify(status) {
    canvas.dataset.robotStatus = status;
    canvas.dispatchEvent(new CustomEvent('fangpian:robot-context', { detail: { status } }));
  }
  function diagnostic(name, value) {
    const text = typeof value === 'number' ? Math.abs(value) < .0005 ? '0.000' : value.toFixed(3) : String(value);
    if (canvas.dataset[name] !== text) canvas.dataset[name] = text;
  }
  function update(state = {}) {
    if (disposed || lost) return;
    Object.assign(lastState, state);
    if (lastState.active === false) { lastTime = 0; forceRender = true; return; }
    const now = performance.now();
    const dt = clamp(Number.isFinite(state.dt) ? state.dt : lastTime ? (now - lastTime) / 1000 : 1 / 60, 0, 1 / 15);
    lastTime = now;
    const reduced = !!lastState.reducedMotion;
    const pose = samplePose(reduced ? 0 : lastState.progress, aspect, poseBuffer);
    const input = resolvePointerInput(lastState, pointerMedia ? pointerMedia.matches : true, pointerInput);
    const alpha = smoothingAlpha(dt, 8);
    pointerX = input.enabled ? mix(pointerX, input.x, alpha) : 0;
    pointerY = input.enabled ? mix(pointerY, input.y, alpha) : 0;
    pointerBlend = input.enabled ? mix(pointerBlend, input.active ? 1 : 0, smoothingAlpha(dt, 7)) : 0;
    if (Math.abs(pointerX - input.x) < .00005) pointerX = input.x;
    if (Math.abs(pointerY - input.y) < .00005) pointerY = input.y;
    if (pointerBlend < .00005 && !input.active) pointerBlend = 0;
    if (pointerBlend > .99995 && input.active) pointerBlend = 1;
    const follow = sampleHeadFollow(pose, pointerX, pointerY, pointerBlend, followBuffer);
    if (!reduced) clock += dt;
    const blink = reduced ? 1 : blinkScale(clock);
    const quote = reduced ? (lastState.progress > 1.55 ? 1 : 0) : pose.quote;
    frameState.phase = reduced ? 0 : clamp(lastState.progress);
    frameState.pointerX = pointerX; frameState.pointerY = pointerY;
    frameState.pointerActive = input.active; frameState.headYaw = follow.headYaw; frameState.headPitch = follow.headPitch;
    frameState.headRoll = follow.headRoll; frameState.bodyYaw = follow.bodyYaw;
    frameState.quote = quote; frameState.blink = quote >= 1 ? 1 : blink; frameState.reduced = reduced;
    if (!shouldRenderFrame(frameState, lastDrawn, (now - lastRenderAt) / 1000, forceRender)) { statistics.skippedFrames++; return; }
    const bob = reduced ? 0 : Math.sin(clock * 1.05) * .009;
    head.position.y = .78 + bob;
    setHeadRotation(head, follow);
    rig.rotation.y = pose.bodyYaw; robot.rotation.y = follow.bodyYaw - pose.bodyYaw;
    eyes.position.x = pointerX * .048 * pointerBlend; eyes.position.y = .015 - pointerY * .038 * pointerBlend;
    for (const eye of pupils) eye.scale.y = 1.1 * blink;
    quoteGroup.visible = quote > 0; eyes.visible = quote < 1;
    quoteMaterial.opacity = quote; quoteGlow.opacity = quote * .13;
    eyeMaterial.opacity = 1 - quote; eyeHalo.opacity = .07 * (1 - quote);
    for (let i = 0; i < arms.length; i++) arms[i].rotation.z = (i ? 1 : -1) * .1 + (reduced ? 0 : Math.sin(clock * .9 + i * 1.5) * .008);
    camera.position.set(pose.camera[0] + pointerX * .08, pose.camera[1] - pointerY * .055, pose.camera[2]);
    const zoom = pose.zoom * clamp(options.scale ?? 1, .75, 1.1);
    if (camera.zoom !== zoom) { camera.zoom = zoom; camera.updateProjectionMatrix(); }
    target.set(pose.target[0], pose.target[1], pose.target[2]); camera.lookAt(target);
    const angularChange = Math.max(Number.isFinite(shadowWorldYaw) ? Math.abs(follow.worldYaw - shadowWorldYaw) : 0, Number.isFinite(shadowPitch) ? Math.abs(follow.headPitch - shadowPitch) : 0);
    const refreshShadow = shouldRefreshShadow(frameState.phase, lastShadowPhase, (now - lastShadowAt) / 1000, shadowDirty, angularChange);
    if (refreshShadow) { renderer.shadowMap.needsUpdate = true; keyLight.shadow.needsUpdate = true; }
    renderer.render(scene, camera);
    if (refreshShadow) { lastShadowAt = now; lastShadowPhase = frameState.phase; shadowWorldYaw = follow.worldYaw; shadowPitch = follow.headPitch; shadowDirty = false; statistics.shadowPasses++; }
    lastRenderAt = now; forceRender = false;
    if (!lastDrawn) lastDrawn = {};
    Object.assign(lastDrawn, frameState);
    statistics.renderedFrames++;
    if (canvas.dataset.robotStatus !== 'ready') canvas.dataset.robotStatus = 'ready';
    diagnostic('robotPointerX', pointerX); diagnostic('robotPointerY', pointerY);
    diagnostic('robotPointerActive', input.active); diagnostic('robotFollowBlend', pointerBlend);
    diagnostic('robotHeadYaw', follow.headYaw); diagnostic('robotHeadPitch', follow.headPitch);
    diagnostic('robotHeadRoll', follow.headRoll); diagnostic('robotWorldYaw', follow.worldYaw);
    readHeadFacing(head, facingDirection, facing);
    diagnostic('robotFacingX', facing.x); diagnostic('robotFacingY', facing.y); diagnostic('robotFacingZ', facing.z);
    diagnostic('robotFacingAzimuth', facing.azimuth); diagnostic('robotFacingElevation', facing.elevation);
  }
  function resize() {
    if (disposed) return;
    const width = Math.max(1, canvas.clientWidth || canvas.parentElement?.clientWidth || 1);
    const height = Math.max(1, canvas.clientHeight || canvas.parentElement?.clientHeight || 1);
    const quality = renderQuality(width, height, window.devicePixelRatio || 1);
    if (width === viewWidth && height === viewHeight && quality.pixelRatio === viewPixelRatio) return;
    viewWidth = width; viewHeight = height; viewPixelRatio = quality.pixelRatio;
    aspect = width / height;
    renderer.setDrawingBufferSize(width, height, quality.pixelRatio); camera.aspect = aspect;
    const anchor = width < 760 ? .5 : clamp(options.anchorX ?? .62, .5, .72);
    camera.setViewOffset(width, height, (.5 - anchor) * width, 0, width, height);
    camera.updateProjectionMatrix();
    if (keyLight.shadow.mapSize.x !== quality.shadowSize) {
      keyLight.shadow.map?.dispose(); keyLight.shadow.map = null;
      keyLight.shadow.mapSize.set(quality.shadowSize, quality.shadowSize); shadowDirty = true;
    }
    statistics.pixelRatio = quality.pixelRatio; statistics.shadowSize = quality.shadowSize;
    forceRender = true;
    lastTime = 0;
    update({ ...lastState, dt: 0 });
  }
  function contextLost(event) { event.preventDefault(); lost = true; lastTime = 0; notify('lost'); }
  function contextRestored() { if (disposed) return; lost = false; lastTime = 0; viewWidth = 0; shadowDirty = true; forceRender = true; resize(); notify('ready'); }
  canvas.addEventListener('webglcontextlost', contextLost, false);
  canvas.addEventListener('webglcontextrestored', contextRestored, false);
  function dispose() {
    if (disposed) return;
    disposed = true;
    canvas.removeEventListener('webglcontextlost', contextLost, false);
    canvas.removeEventListener('webglcontextrestored', contextRestored, false);
    resources.forEach(resource => resource.dispose());
    keyLight.shadow.map?.dispose();
    scene.clear(); renderer.dispose(); renderer.forceContextLoss();
    notify('disposed');
  }
  canvas.style.pointerEvents = 'none';
  canvas.setAttribute('aria-hidden', 'true');
  resize();
  scene.traverse(object => { if (object.isMesh) { statistics.meshes++; statistics.triangles += object.geometry.index ? object.geometry.index.count / 3 : object.geometry.attributes.position.count / 3; } });
  return { update, resize, dispose, get status() { return disposed ? 'disposed' : lost ? 'lost' : 'ready'; }, statistics };
}

window.FangpianRobot = { mount, samplePose, sampleHeadFollow, sampleHeadFacing, HEAD_ROTATION_ORDER, resolvePointerInput, smoothingAlpha, blinkScale, renderQuality, shouldRenderFrame, shouldRefreshShadow, version: 4 };
