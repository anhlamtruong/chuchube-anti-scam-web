type LetterAvatarProps = {
  letter: string;
  tone: "official" | "fake";
};

const toneClass: Record<LetterAvatarProps["tone"], string> = {
  official: "bg-ink text-paper",
  fake: "bg-graphite text-paper",
};

/** A letter avatar for invented accounts: never a photo or a logo. */
export const LetterAvatar = ({ letter, tone }: LetterAvatarProps) => (
  <span
    aria-hidden="true"
    className={`grid size-12 shrink-0 place-items-center rounded-full text-xl font-extrabold ${toneClass[tone]}`}
  >
    {letter}
  </span>
);
