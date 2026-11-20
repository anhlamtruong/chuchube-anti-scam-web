// Adapted from living-ui-skills (living-ui-effects, MIT).
// One requestAnimationFrame loop shared by every effect. It only runs while an
// effect asks for frames, so an idle page schedules nothing. A frame callback
// gets (now in ms, dt in s) and returns true to keep receiving frames, false to
// sleep. dt is clamped so a background tab or a long task never makes springs jump.

export type FrameFn = (now: number, dt: number) => boolean;

const subscribers = new Set<FrameFn>();
let rafId = 0;
let lastTime = 0;

const frame = (now: number): void => {
  rafId = 0;
  const dt = lastTime ? Math.min(Math.max((now - lastTime) / 1000, 0), 1 / 20) : 1 / 60;
  lastTime = now;
  subscribers.forEach((fn) => {
    let keep = false;
    try {
      keep = fn(now, dt);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.error("[fx]", error);
    }
    if (!keep) subscribers.delete(fn);
  });
  if (subscribers.size) rafId = requestAnimationFrame(frame);
  else lastTime = 0;
};

/** Asks for frames until `fn` returns false. Calling it again is a no-op. */
export const wake = (fn: FrameFn): void => {
  subscribers.add(fn);
  if (!rafId) rafId = requestAnimationFrame(frame);
};

/** Stops sending frames to `fn`. */
export const sleep = (fn: FrameFn): void => {
  subscribers.delete(fn);
  if (!subscribers.size && rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
    lastTime = 0;
  }
};

/** Frame-rate independent lerp factor for a rate in 1/s. */
export const ease = (dt: number, rate: number): number => 1 - Math.exp(-dt * rate);

export const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
