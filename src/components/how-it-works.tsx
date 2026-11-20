import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { sectionIds } from "@/lib/site";
import { IllustrationTag } from "./illustration-tag";
import { LoopVideo } from "./video/loop-video";

type HowItWorksProps = {
  locale: Locale;
  content: Dictionary["howItWorks"];
};

type StepKey = keyof Dictionary["howItWorks"]["steps"];

const stepOrder: readonly StepKey[] = ["check", "compare", "report"];

export const HowItWorks = ({ locale, content }: HowItWorksProps) => (
  <section
    id={sectionIds.howItWorks}
    aria-labelledby="how-title"
    className="border-t border-rule bg-sheet/60"
  >
    <div className="mx-auto grid w-full max-w-[76rem] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-28">
      <div className="lg:col-span-6">
        <h2 id="how-title" className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 max-w-[30rem] text-lg text-graphite">{content.intro}</p>

        <ol className="mt-12 grid gap-10">
          {stepOrder.map((key, index) => {
            const step = content.steps[key];
            const isCry = key === "report";
            return (
              <li key={key} className="grid grid-cols-[3.25rem_1fr] gap-x-5 sm:grid-cols-[4rem_1fr]">
                <span
                  aria-hidden="true"
                  className="grid size-13 place-items-center rounded-full border-2 border-ink text-xl font-extrabold tabular-nums sm:size-16 sm:text-2xl"
                >
                  {index + 1}
                </span>
                <div className="pt-1.5 sm:pt-3">
                  <h3
                    className={
                      isCry
                        ? "text-2xl font-extrabold tracking-[-0.02em] text-signal-ink"
                        : "text-2xl font-extrabold tracking-[-0.02em]"
                    }
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[30rem] text-graphite">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <div className="relative mx-auto max-w-[26rem] lg:mr-0">
          <div className="overflow-hidden rounded-[1.75rem] border border-rule bg-paper">
            <LoopVideo
              name={`check-flow-${locale}`}
              label={content.video.description}
              pauseLabel={content.video.pause}
              playLabel={content.video.play}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full"
            />
          </div>
          <IllustrationTag className="absolute -top-3 left-5 z-[2]">{content.video.label}</IllustrationTag>
        </div>
      </div>
    </div>
  </section>
);
