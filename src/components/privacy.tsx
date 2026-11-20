import type { Dictionary } from "@/i18n/dictionary";
import { sectionIds } from "@/lib/site";

type PrivacyProps = {
  content: Dictionary["privacy"];
};

type PointKey = keyof Dictionary["privacy"]["points"];

const pointOrder: readonly PointKey[] = ["screenshots", "noSale", "site"];

export const Privacy = ({ content }: PrivacyProps) => (
  <section id={sectionIds.privacy} aria-labelledby="privacy-title" className="border-t border-rule">
    <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
      <div className="lg:col-span-5">
        <h2 id="privacy-title" className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 max-w-[26rem] text-lg text-graphite">{content.intro}</p>
      </div>

      <ul className="grid border-t-2 border-ink lg:col-span-7">
        {pointOrder.map((key) => {
          const point = content.points[key];
          return (
            <li key={key} className="grid gap-2 border-b border-rule py-7 sm:grid-cols-[2.25rem_1fr] sm:gap-x-4">
              <svg
                viewBox="0 0 24 24"
                className="hidden size-6 text-verified sm:block"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 2.5l7.5 3v6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10v-6z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.4 12.2l2.5 2.5 4.8-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h3 className="text-xl font-extrabold tracking-[-0.015em]">{point.title}</h3>
                <p className="mt-1.5 max-w-[34rem] text-graphite">{point.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
