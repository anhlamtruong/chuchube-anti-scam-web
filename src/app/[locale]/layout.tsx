import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { htmlLang, isLocale, locales } from "@/i18n/locales";
import { beVietnamPro } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params }: LocaleLayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale);
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={htmlLang[locale]} className={beVietnamPro.variable}>
      <body className="min-h-dvh bg-paper text-ink">{children}</body>
    </html>
  );
};

export default LocaleLayout;
