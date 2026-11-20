"use client";

// Adapted from living-ui-skills (living-ui-effects, MIT).
// The two colored layers the glitch slices. They render only after hydration,
// so the static HTML (search engines, find-in-page, screen readers, JS-off
// visitors) sees the text once. Give them the base element's typography classes
// so the copies wrap exactly like the real text.

import { useEffect, useState, type ReactNode } from "react";

type GlitchCopiesProps = {
  className?: string;
  children: ReactNode;
};

export const GlitchCopies = ({ className = "", children }: GlitchCopiesProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <span aria-hidden="true" className={`fx-glitch__copy fx-glitch__copy--a ${className}`}>
        {children}
      </span>
      <span aria-hidden="true" className={`fx-glitch__copy fx-glitch__copy--b ${className}`}>
        {children}
      </span>
    </>
  );
};
