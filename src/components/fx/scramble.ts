// Adapted from living-ui-skills (living-ui-effects, MIT).
// Scramble text: hovering (mouse/pen) or keyboard-focusing a link or button
// that contains <ScrambleText> decodes its label left to right in ~350-500 ms.
// The real text never changes: it keeps its box (no width jump) and stays the
// accessible name; an aria-hidden overlay shows the resolved prefix plus a
// tail of glyphs. The overlay is always emptied at the end.

import { isBuilt } from "./built";
import { sleep, wake } from "./ticker";

const LOWER = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";
const DIGIT = "0123456789";
const GLYPH_MS = 55; // tail glyphs change at ~18 Hz, not every frame

type Job = {
  el: HTMLElement;
  done: HTMLElement;
  tail: HTMLElement;
  chars: string[];
  at: number[];
  t0: number;
  duration: number;
  shown: number;
  glyphAt: number;
  timer: number;
};

const pick = (pool: string): string => pool.charAt(Math.floor(Math.random() * pool.length));

const glyphFor = (char: string): string => {
  if (char === " " || char === " ") return char;
  if (/[a-z]/.test(char)) return pick(LOWER);
  if (/[A-Z]/.test(char)) return pick(UPPER);
  if (/[0-9]/.test(char)) return pick(DIGIT);
  if (/[@./:\-_·()]/.test(char)) return char; // keep emails and paths readable
  return pick(LOWER);
};

const resolveTimes = (count: number, duration: number): number[] => {
  const times: number[] = [];
  let prev = 0;
  for (let i = 0; i < count; i++) {
    const base = duration * (0.2 + (0.72 * (i + 1)) / count);
    const value = Math.min(duration * 0.94, Math.max(prev, base + (Math.random() - 0.5) * duration * 0.08));
    times.push(value);
    prev = value;
  }
  return times;
};

export const setupScramble = (): (() => void) => {
  const jobs = new Map<HTMLElement, Job>();

  const finish = (job: Job): void => {
    window.clearTimeout(job.timer);
    job.done.textContent = "";
    job.tail.textContent = "";
    job.el.removeAttribute("data-on");
    jobs.delete(job.el);
  };

  const render = (job: Job, now: number): void => {
    const elapsed = now - job.t0;
    let resolved = 0;
    while (resolved < job.chars.length && (job.at[resolved] ?? Number.POSITIVE_INFINITY) <= elapsed) resolved++;
    if (resolved === job.shown && now - job.glyphAt < GLYPH_MS) return;
    if (resolved !== job.shown) job.done.textContent = job.chars.slice(0, resolved).join("");
    job.tail.textContent = job.chars.slice(resolved).map(glyphFor).join("");
    job.shown = resolved;
    job.glyphAt = now;
  };

  const frame = (now: number): boolean => {
    jobs.forEach((job) => {
      if (now - job.t0 >= job.duration) finish(job);
      else render(job, now);
    });
    return jobs.size > 0;
  };

  const start = (el: HTMLElement): void => {
    if (jobs.has(el) || !isBuilt(el)) return;
    const txt = el.querySelector<HTMLElement>(":scope > .fx-scr__txt");
    const done = el.querySelector<HTMLElement>(".fx-scr__done");
    const tail = el.querySelector<HTMLElement>(".fx-scr__tail");
    const text = txt?.textContent ?? "";
    if (!txt || !done || !tail || !text.trim()) return;
    const chars = Array.from(text);
    const duration = Math.min(520, Math.max(360, 300 + chars.length * 14));
    const now = performance.now();
    const job: Job = {
      el, done, tail, chars, at: resolveTimes(chars.length, duration),
      t0: now, duration, shown: -1, glyphAt: 0, timer: 0,
    };
    job.timer = window.setTimeout(() => finish(job), duration + 250);
    jobs.set(el, job);
    render(job, now); // fill the overlay before the real text turns transparent
    el.setAttribute("data-on", "");
    wake(frame);
  };

  const hostOf = (target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof Element)) return null;
    const host = target.closest<HTMLElement>("a, button, [data-fx-scr-host]");
    return host && host.querySelector("[data-fx-scr]") ? host : null;
  };
  const run = (host: HTMLElement): void => {
    host.querySelectorAll<HTMLElement>("[data-fx-scr]").forEach(start);
  };

  const onOver = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const host = hostOf(e.target);
    if (!host) return;
    const from = e.relatedTarget;
    if (from instanceof Node && host.contains(from)) return; // moving inside the same link
    run(host);
  };
  const onFocus = (e: FocusEvent) => {
    const host = hostOf(e.target);
    if (host?.matches(":focus-visible")) run(host);
  };
  const onVisibility = () => {
    if (document.hidden) jobs.forEach(finish);
  };

  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("focusin", onFocus);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("focusin", onFocus);
    document.removeEventListener("visibilitychange", onVisibility);
    jobs.forEach(finish);
    sleep(frame);
  };
};
