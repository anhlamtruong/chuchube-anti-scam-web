import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { siteUrl } from "@/lib/site";

const lastModified = new Date("2026-11-19");

const languages = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}`]));

const sitemap = (): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "vi" ? 1 : 0.9,
    alternates: { languages },
  }));

export default sitemap;
