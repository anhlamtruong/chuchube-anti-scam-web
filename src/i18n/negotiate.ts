import { defaultLocale, type Locale } from "./locales";

type LanguageRange = {
  tag: string;
  quality: number;
};

const parseQuality = (params: string[]): number => {
  const qParam = params.find((param) => param.trim().toLowerCase().startsWith("q="));
  if (!qParam) return 1;
  const quality = Number.parseFloat(qParam.trim().slice(2));
  return Number.isFinite(quality) ? quality : 0;
};

const parseAcceptLanguage = (header: string): LanguageRange[] =>
  header
    .split(",")
    .map((part) => {
      const [rawTag = "", ...params] = part.split(";");
      return { tag: rawTag.trim().toLowerCase(), quality: parseQuality(params) };
    })
    .filter((range) => range.tag.length > 0 && range.quality > 0);

const qualityFor = (ranges: LanguageRange[], primary: string): number =>
  ranges.reduce((best, range) => {
    const matches = range.tag === primary || range.tag.startsWith(`${primary}-`);
    return matches ? Math.max(best, range.quality) : best;
  }, 0);

/**
 * Vietnamese unless the visitor prefers English over Vietnamese.
 * A missing or unparseable header falls back to Vietnamese.
 */
export const negotiateLocale = (acceptLanguage: string | null): Locale => {
  if (!acceptLanguage) return defaultLocale;
  const ranges = parseAcceptLanguage(acceptLanguage);
  const english = qualityFor(ranges, "en");
  const vietnamese = qualityFor(ranges, "vi");
  return english > vietnamese ? "en" : defaultLocale;
};
