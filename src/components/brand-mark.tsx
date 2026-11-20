type BrandMarkProps = {
  className?: string;
};

/** The stamped "!" mark, also used as the favicon. Decorative: the word next to it names the brand. */
export const BrandMark = ({ className = "" }: BrandMarkProps) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
    <g transform="rotate(-8 32 32)">
      <rect x="9" y="9" width="46" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="5.5" />
      <rect x="28.25" y="18" width="7.5" height="20" rx="3.75" fill="currentColor" />
      <circle cx="32" cy="45.5" r="4.25" fill="currentColor" />
    </g>
  </svg>
);
