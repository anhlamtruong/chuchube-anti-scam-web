import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { locales, openGraphLocale, type Locale } from "@/i18n/locales";
import { siteUrl } from "./site";

const languageAlternates = (): Record<string, string> => {
  const entries = locales.map((locale): [string, string] => [locale, `/${locale}`]);
  return { ...Object.fromEntries(entries), "x-default": "/" };
};

export const buildMetadata = (locale: Locale): Metadata => {
  const dictionary = getDictionary(locale);
  const { title, description, siteName } = dictionary.meta;
  const otherLocales = locales.filter((other) => other !== locale);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: siteName,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName,
      title,
      description,
      locale: openGraphLocale[locale],
      alternateLocale: otherLocales.map((other) => openGraphLocale[other]),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
};
