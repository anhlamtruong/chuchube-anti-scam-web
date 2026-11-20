"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void): (() => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

const getSnapshot = (): boolean => window.matchMedia(QUERY).matches;

/** On the server (and with JS off) motion counts as reduced: nothing plays. */
const getServerSnapshot = (): boolean => true;

export const useReducedMotion = (): boolean => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
