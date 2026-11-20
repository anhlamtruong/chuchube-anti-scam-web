import { notFound } from "next/navigation";
import { Audiences } from "@/components/audiences";
import { ContactCta } from "@/components/contact-cta";
import { FxRoot } from "@/components/fx/fx-root";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Privacy } from "@/components/privacy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale } from "@/i18n/locales";
import { sectionIds } from "@/lib/site";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <>
      <a
        href={`#${sectionIds.main}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
      >
        {dictionary.nav.skipToContent}
      </a>
      <SiteHeader locale={locale} nav={dictionary.nav} />
      <main id={sectionIds.main}>
        <Hero hero={dictionary.hero} evidence={dictionary.evidence} />
        <HowItWorks locale={locale} content={dictionary.howItWorks} />
        <Audiences content={dictionary.audiences} />
        <Privacy content={dictionary.privacy} />
        <ContactCta content={dictionary.contact} />
      </main>
      <SiteFooter locale={locale} footer={dictionary.footer} languagesLabel={dictionary.nav.languages} />
      <FxRoot />
    </>
  );
};

export default HomePage;
