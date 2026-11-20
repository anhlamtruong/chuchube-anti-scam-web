"use client";

// Adapted from living-ui-skills (living-ui-effects, MIT).
// Mounts the page's light effects once: hologram tilt on the verified sheet,
// glitch on the fake page's name, scramble on link labels. Everything is event
// driven and attaches to markup that is already server-rendered. Visitors who
// ask for reduced motion get none of it (and lose nothing: the text is real).

import { useEffect } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { setupGlitch } from "./glitch";
import { setupHolo } from "./holo";
import { setupScramble } from "./scramble";
import "./fx.css";

const effects: ReadonlyArray<() => () => void> = [setupHolo, setupGlitch, setupScramble];

export const FxRoot = () => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const cleanups: Array<() => void> = [];
    effects.forEach((setup) => {
      try {
        cleanups.push(setup());
      } catch (error) {
        if (process.env.NODE_ENV !== "production") console.error("[fx]", error);
      }
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion]);

  return null;
};
