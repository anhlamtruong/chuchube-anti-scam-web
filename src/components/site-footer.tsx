import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { BrandMark } from "./brand-mark";
import { LanguageSwitch } from "./language-switch";

type SiteFooterProps = {
  locale: Locale;
  footer: Dictionary["footer"];
  languagesLabel: string;
};

export const SiteFooter = ({ locale, footer, languagesLabel }: SiteFooterProps) => (
  <footer className="border-t border-ink">
    <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
          <BrandMark className="size-7 text-signal" />
          {footer.cry}
        </p>
        <p className="mt-3 max-w-[30rem] text-sm text-graphite">{footer.note}</p>
        <p className="mt-1 text-sm text-graphite">{footer.copyright}</p>
      </div>
      <LanguageSwitch current={locale} label={languagesLabel} landmark={false} />
    </div>
  </footer>
);
