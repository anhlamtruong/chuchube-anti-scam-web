// Adapted from living-ui-skills (living-ui-effects, MIT).
// Readiness gate shared by every effect. This page has no build engine, so
// html never carries data-build="on" and everything counts as built; the gate
// stays so a future intro animation can opt in without touching the effects:
//   html[data-build="on"]  an intro is running
//   [data-build-item] / [data-build-section]  regions it reveals
//   [data-built]  set once a region has settled
// html[data-fx-freeze] pauses pointer effects for tools that read real rects.

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const buildActive = (): boolean => document.documentElement.getAttribute("data-build") === "on";

/** The element's build item and section are finished (or no build is running). */
export const isBuilt = (el: Element): boolean => {
  if (!buildActive()) return true;
  const item = el.closest("[data-build-item]");
  if (item && !item.hasAttribute("data-built")) return false;
  const section = el.closest("[data-build-section]");
  return !section || section.hasAttribute("data-built");
};

export const frozen = (): boolean => document.documentElement.hasAttribute("data-fx-freeze");

/** Small seeded PRNG (xorshift32), [0, 1). Same seed, same sequence. */
export const seeded = (seed: number): (() => number) => {
  let state = seed >>> 0 || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
};

/** Removes an empty style attribute left behind after clearing inline styles. */
export const tidyStyle = (el: HTMLElement): void => {
  if (el.getAttribute("style") === "") el.removeAttribute("style");
};
