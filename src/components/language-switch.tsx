import type { Locale } from "@/i18n/locales";

const languageNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

const languageOrder: readonly Locale[] = ["vi", "en"];

type LanguageSwitchProps = {
  current: Locale;
  label: string;
  /** The header copy is the navigation landmark; the footer copy is a plain labelled list. */
  landmark?: boolean;
  className?: string;
};

/** Plain links, so switching language works without JavaScript. */
export const LanguageSwitch = ({ current, label, landmark = true, className = "" }: LanguageSwitchProps) => {
  const list = (
    <ul aria-label={landmark ? undefined : label} className="flex items-center gap-0.5 text-sm sm:gap-1 sm:text-[0.9375rem]">
      {languageOrder.map((locale) => {
        const isCurrent = locale === current;
        return (
          <li key={locale}>
            <a
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              aria-current={isCurrent ? "page" : undefined}
              className={
                isCurrent
                  ? "inline-flex min-h-11 items-center rounded-full bg-ink px-3 font-semibold text-paper sm:px-3.5"
                  : "inline-flex min-h-11 items-center rounded-full px-3 font-semibold text-graphite underline-offset-4 hover:text-ink hover:underline sm:px-3.5"
              }
            >
              {languageNames[locale]}
            </a>
          </li>
        );
      })}
    </ul>
  );
  return landmark ? (
    <nav aria-label={label} className={className}>
      {list}
    </nav>
  ) : (
    <div className={className}>{list}</div>
  );
};
