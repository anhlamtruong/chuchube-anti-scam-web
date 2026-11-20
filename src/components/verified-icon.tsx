type VerifiedIconProps = {
  className?: string;
};

export const VerifiedIcon = ({ className = "" }: VerifiedIconProps) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="9" fill="currentColor" />
    <path
      d="M6 10.4l2.6 2.6L14.2 7.4"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
