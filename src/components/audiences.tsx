import type { Dictionary } from "@/i18n/dictionary";
import { sectionIds } from "@/lib/site";

type AudiencesProps = {
  content: Dictionary["audiences"];
};

/** Two columns, one promise each: the paper side for people, the ink side for page owners. */
export const Audiences = ({ content }: AudiencesProps) => (
  <section id={sectionIds.audiences} aria-labelledby="audiences-title" className="border-t border-rule">
    <div className="mx-auto w-full max-w-[76rem] px-5 py-20 sm:px-8 lg:py-28">
      <h2 id="audiences-title" className="max-w-[40rem] text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
        {content.title}
      </h2>

      <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-ink md:grid-cols-2">
        <article aria-labelledby="audience-users" className="flex flex-col p-7 sm:p-10 lg:p-12">
          <h3 id="audience-users" className="text-base font-semibold text-graphite">
            {content.users.name}
          </h3>
          <p className="mt-5 text-[1.75rem] leading-[1.25] font-extrabold tracking-[-0.025em] sm:text-[2.125rem]">
            {content.users.promise}
          </p>
          <p className="mt-6 max-w-[28rem] text-graphite">{content.users.detail}</p>
        </article>

        <article aria-labelledby="audience-businesses" className="flex flex-col bg-ink p-7 text-paper sm:p-10 lg:p-12">
          <h3 id="audience-businesses" className="text-base font-semibold text-paper/75">
            {content.businesses.name}
          </h3>
          <p className="mt-5 text-[1.75rem] leading-[1.25] font-extrabold tracking-[-0.025em] sm:text-[2.125rem]">
            {content.businesses.promise}
          </p>
          <p className="mt-6 max-w-[28rem] text-paper/75">{content.businesses.detail}</p>
        </article>
      </div>
    </div>
  </section>
);
