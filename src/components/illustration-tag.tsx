import type { ReactNode } from "react";

type IllustrationTagProps = {
  children: ReactNode;
  className?: string;
};

/** The "Minh hoạ" / "Illustration" label every invented example carries. */
export const IllustrationTag = ({ children, className = "" }: IllustrationTagProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-paper px-3 py-1 text-[0.8125rem] font-semibold text-ink ${className}`}
  >
    <svg viewBox="0 0 16 16" className="size-3.5 text-graphite" aria-hidden="true" focusable="false">
      <path
        d="M2.5 3.5h11v9h-11z M2.5 10.5l3.2-3.2 2.6 2.6 1.7-1.7 3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
    {children}
  </span>
);
