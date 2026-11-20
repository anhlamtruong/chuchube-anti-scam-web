// Adapted from living-ui-skills (living-ui-effects, MIT).
// Glitch on [data-fx-glitch] wrappers (see GlitchCopies): a 560 ms RGB-split
// and slice when the element comes into view, then a 260 ms micro-glitch on a
// visible one every 8-14 s (seeded). Pure CSS keyframes toggled by
// [data-glitch]; nothing here runs per frame. On this page only the invented
// fake page's name glitches: it is the forgery.

import { buildActive, seeded, tidyStyle } from "./built";

const IN_MS = 560;
const MICRO_MS = 260;
const REPLAY_GAP = 2500;

type Head = {
  el: HTMLElement;
  item: HTMLElement | null;
  section: HTMLElement | null;
  visible: boolean;
  built: boolean;
  lastAt: number;
  endTimer: number;
  queued: number;
};

type GlitchKind = "in" | "m1" | "m2";

const toHead = (el: HTMLElement): Head => {
  const base = el.querySelector<HTMLElement>(".fx-glitch__base") ?? el;
  return {
    el,
    item: base.closest<HTMLElement>("[data-build-item]"),
    section: base.closest<HTMLElement>("[data-build-section]"),
    visible: false,
    built: false,
    lastAt: -1e9,
    endTimer: 0,
    queued: 0,
  };
};

const builtNow = (h: Head): boolean =>
  !buildActive() ||
  ((!h.item || h.item.hasAttribute("data-built")) && (!h.section || h.section.hasAttribute("data-built")));

const stop = (h: Head): void => {
  window.clearTimeout(h.endTimer);
  h.endTimer = 0;
  if (h.el.hasAttribute("data-glitch")) h.el.removeAttribute("data-glitch");
  h.el.style.removeProperty("--fx-gi");
  tidyStyle(h.el);
};

const cancelQueued = (h: Head): void => {
  window.clearTimeout(h.queued);
  h.queued = 0;
};

export const setupGlitch = (): (() => void) => {
  const wraps = Array.from(document.querySelectorAll<HTMLElement>("[data-fx-glitch]"));
  if (!wraps.length || typeof IntersectionObserver === "undefined") return () => {};

  const rand = seeded(0xe5482d);
  const heads = wraps.map(toHead);
  const byEl = new Map<Element, Head>(heads.map((h) => [h.el, h]));
  let busyUntil = 0;
  let microTimer = 0;
  let alive = true;

  const play = (h: Head, kind: GlitchKind): void => {
    if (!alive || document.hidden || !h.built) return;
    const now = performance.now();
    const duration = kind === "in" ? IN_MS : MICRO_MS;
    stop(h);
    h.el.style.setProperty("--fx-gi", kind === "in" ? "1" : (0.55 + rand() * 0.35).toFixed(2));
    h.el.setAttribute("data-glitch", kind);
    h.lastAt = now;
    busyUntil = Math.max(busyUntil, now + duration);
    h.endTimer = window.setTimeout(() => stop(h), duration + 40);
  };

  const entrance = (h: Head): void => {
    if (h.queued || h.endTimer) return;
    const now = performance.now();
    if (now - h.lastAt < REPLAY_GAP) return;
    const wait = Math.max(140, busyUntil - now + 120);
    busyUntil = now + wait + IN_MS;
    h.queued = window.setTimeout(() => {
      h.queued = 0;
      if (h.visible && h.built) play(h, "in");
    }, wait);
  };

  const micro = (): void => {
    microTimer = 0;
    if (!alive) return;
    const now = performance.now();
    const pool = heads.filter((h) => h.visible && h.built && !h.endTimer && !h.queued && now - h.lastAt > 4000);
    const pick = pool[Math.floor(rand() * pool.length)];
    if (pick && now >= busyUntil && !document.hidden) play(pick, rand() < 0.5 ? "m1" : "m2");
    scheduleMicro();
  };

  const scheduleMicro = (): void => {
    if (microTimer || !alive) return;
    if (!heads.some((h) => h.visible && h.built)) return;
    microTimer = window.setTimeout(micro, 8000 + rand() * 6000);
  };

  const refresh = (): void => {
    heads.forEach((h) => {
      const was = h.built;
      h.built = builtNow(h);
      if (!h.built) {
        cancelQueued(h);
        stop(h);
      } else if (!was && h.visible) entrance(h);
    });
    scheduleMicro();
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const h = byEl.get(entry.target);
        if (!h) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (visible === h.visible) return;
        h.visible = visible;
        if (visible && h.built) entrance(h);
        else if (!visible) cancelQueued(h);
      });
      scheduleMicro();
    },
    { threshold: [0, 0.5, 1] },
  );

  const mo = new MutationObserver(refresh);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-build"] });
  heads.forEach((h) => {
    if (h.item) mo.observe(h.item, { attributes: true, attributeFilter: ["data-built"] });
    if (h.section && h.section !== h.item) mo.observe(h.section, { attributes: true, attributeFilter: ["data-built"] });
    h.built = builtNow(h);
    io.observe(h.el);
  });

  const onVisibility = () => {
    if (document.hidden) heads.forEach(stop);
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    alive = false;
    io.disconnect();
    mo.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.clearTimeout(microTimer);
    heads.forEach((h) => {
      cancelQueued(h);
      stop(h);
    });
  };
};
