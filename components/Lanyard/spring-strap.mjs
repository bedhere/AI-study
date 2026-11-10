// Analytic damped spring: stable across frame rates without a per-frame decay factor.
export function stepStrapSpring(state, target, dt, frequency = 8, damping = .72) {
  const t = Math.max(0, Math.min(.1, dt));
  if (!t) return state;
  const omega = Math.max(.01, frequency), ratio = Math.max(.01, Math.min(.99, damping));
  const rate = omega * ratio, damped = omega * Math.sqrt(1 - ratio * ratio);
  const x = state.value - target, v = state.velocity;
  const decay = Math.exp(-rate * t), cos = Math.cos(damped * t), sin = Math.sin(damped * t);
  state.value = target + decay * (x * cos + (v + rate * x) / damped * sin);
  state.velocity = decay * (v * cos - (rate * v + omega * omega * x) / damped * sin);
  return state;
}

// A supported shallow bow, with a small bend response to extension/recoil velocity.
export function strapSag(span, cardHeight, velocity = 0) {
  const h = Math.max(.01, cardHeight);
  const bow = Math.min(Math.max(0, span) * .045, h * .11);
  return Math.max(h * .012, Math.min(h * .14, bow + Math.tanh(velocity) * h * .025));
}
