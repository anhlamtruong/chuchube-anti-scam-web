export type Locale = "vi" | "en";

export const locales: readonly Locale[] = ["vi", "en"];

export const defaultLocale: Locale = "vi";

export const isLocale = (value: string): value is Locale => value === "vi" || value === "en";

export const htmlLang: Record<Locale, string> = {
  vi: "vi",
  en: "en",
};

export const openGraphLocale: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};
