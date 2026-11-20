import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { contactHref } from "@/lib/site";
import { BrandMark } from "./brand-mark";
import { ScrambleText } from "./fx/scramble-text";
import { LanguageSwitch } from "./language-switch";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export const SiteHeader = ({ locale, nav }: SiteHeaderProps) => (
  <header className="mx-auto flex w-full max-w-[76rem] items-center justify-between gap-x-3 px-5 pt-5 sm:px-8 sm:pt-7">
    <a
      href={`/${locale}`}
      aria-label={nav.home}
      className="inline-flex min-h-11 shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight sm:gap-2.5 sm:text-xl"
    >
      <BrandMark className="size-7 text-signal sm:size-8" />
      <span>Chuchube</span>
    </a>
    <div className="flex items-center gap-2 sm:gap-5">
      <a
        href={contactHref}
        className="hidden min-h-11 items-center font-semibold underline decoration-rule-strong decoration-2 underline-offset-[0.3em] hover:decoration-ink md:inline-flex"
      >
        <ScrambleText>{nav.contact}</ScrambleText>
      </a>
      <LanguageSwitch current={locale} label={nav.languages} />
    </div>
  </header>
);
