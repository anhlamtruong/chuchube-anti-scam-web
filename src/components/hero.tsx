import type { Dictionary } from "@/i18n/dictionary";
import { contactHref, sectionIds } from "@/lib/site";
import { EvidencePair } from "./evidence-pair";
import { ScrambleText } from "./fx/scramble-text";

type HeroProps = {
  hero: Dictionary["hero"];
  evidence: Dictionary["evidence"];
};

export const Hero = ({ hero, evidence }: HeroProps) => (
  <section
    aria-labelledby="hero-title"
    className="mx-auto grid w-full max-w-[76rem] gap-14 px-5 pt-14 pb-20 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-28"
  >
    <div className="lg:col-span-7">
      <h1 id="hero-title" className="text-display font-extrabold">
        <span className="block">{hero.titleLead}</span>
        <span className="stamp stamp--press mt-2 sm:mt-3">{hero.titleCry}</span>
      </h1>

      <p className="mt-10 max-w-[34rem] text-[1.3125rem] leading-[1.5] font-semibold tracking-[-0.01em] sm:text-2xl sm:leading-[1.45]">
        {hero.problem}
      </p>
      <p className="mt-4 max-w-[34rem] text-lg text-graphite">{hero.answer}</p>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={contactHref} className="action-primary">
          <ScrambleText quiet>{hero.primaryCta}</ScrambleText>
        </a>
        <a href={`#${sectionIds.howItWorks}`} className="action-secondary">
          <ScrambleText>{hero.secondaryCta}</ScrambleText>
        </a>
      </div>

      <p className="mt-12 max-w-[30rem] border-l-[3px] border-signal pl-4 text-[0.9375rem] leading-relaxed text-graphite">
        {hero.cryMeaning}
      </p>
    </div>

    <div className="lg:col-span-5 lg:pt-4">
      <EvidencePair evidence={evidence} />
    </div>
  </section>
);
