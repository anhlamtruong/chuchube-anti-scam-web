import type { Dictionary } from "@/i18n/dictionary";
import { contactEmail, contactHref, sectionIds } from "@/lib/site";
import { ScrambleText } from "./fx/scramble-text";

type ContactCtaProps = {
  content: Dictionary["contact"];
};

export const ContactCta = ({ content }: ContactCtaProps) => (
  <section id={sectionIds.contact} aria-labelledby="contact-title" className="border-t border-rule bg-sheet/60">
    <div className="mx-auto w-full max-w-[76rem] px-5 py-20 sm:px-8 lg:py-28">
      <h2
        id="contact-title"
        className="max-w-[46rem] text-4xl leading-[1.12] font-extrabold tracking-[-0.03em] sm:text-6xl"
      >
        {content.title}
      </h2>
      <p className="mt-6 max-w-[36rem] text-lg text-graphite">{content.body}</p>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a href={contactHref} className="action-primary min-h-14 px-8 text-xl">
          <ScrambleText quiet>{content.cta}</ScrambleText>
        </a>
        <p className="text-graphite">
          {content.emailLead}{" "}
          <a
            href={contactHref}
            className="font-semibold text-ink underline decoration-rule-strong decoration-2 underline-offset-[0.3em] hover:decoration-ink"
          >
            <ScrambleText inline>{contactEmail}</ScrambleText>
          </a>
        </p>
      </div>
    </div>
  </section>
);
