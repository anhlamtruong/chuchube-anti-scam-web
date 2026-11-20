import type { Dictionary } from "@/i18n/dictionary";
import { GlitchCopies } from "./fx/glitch-copies";
import { IllustrationTag } from "./illustration-tag";
import { LetterAvatar } from "./letter-avatar";
import { VerifiedIcon } from "./verified-icon";

type EvidencePairProps = {
  evidence: Dictionary["evidence"];
};

const nameClass = "text-lg leading-snug font-extrabold tracking-[-0.01em]";

/**
 * The hero illustration: an invented fake page, stamped, above the invented
 * official page it imitates. Only the official sheet carries the hologram
 * tilt (data-holo), the way real documents carry one and forgeries don't.
 */
export const EvidencePair = ({ evidence }: EvidencePairProps) => {
  const { fake, official } = evidence;

  return (
    <figure aria-labelledby="evidence-caption" className="relative mx-auto max-w-[28rem] lg:mx-0 lg:ml-auto">
      <IllustrationTag className="absolute -top-3 left-5 z-[4]">{evidence.label}</IllustrationTag>

      <div className="-rotate-[1.4deg]">
        <article className="evidence-sheet evidence-sheet--fake overflow-hidden p-5 pt-7 sm:p-6 sm:pt-8">
          <div className="flex items-start gap-3.5">
            <LetterAvatar letter={fake.initial} tone="fake" />
            <div className="min-w-0">
              <div className="fx-glitch" data-fx-glitch="">
                <p className={`fx-glitch__base ${nameClass}`}>{fake.name}</p>
                <GlitchCopies className={nameClass}>{fake.name}</GlitchCopies>
              </div>
              <p className="mt-0.5 text-sm text-graphite">{fake.followers}</p>
              <p className="text-sm text-graphite">{fake.since}</p>
            </div>
          </div>

          <p className="mt-4 inline-flex rounded-full bg-signal/10 px-2.5 py-1 text-[0.8125rem] font-semibold text-signal-ink">
            {fake.status}
          </p>

          <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[0.9375rem] leading-relaxed">{fake.post}</p>

          <div className="mt-5">
            <p className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-signal-ink">{fake.verdictValue}</span>
              <span className="font-semibold">{fake.verdictLabel}</span>
            </p>
            <div className="meter mt-2">
              <span style={{ width: fake.verdictValue }} />
            </div>
          </div>

          <span className="stamp-ink" aria-hidden="true" />
          <span className="stamp stamp--card stamp--press" aria-hidden="true">
            {evidence.stamp}
          </span>
        </article>
      </div>

      <div className="relative mt-5 ml-6 sm:ml-10">
        <article data-holo="" className="evidence-sheet p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <LetterAvatar letter={official.initial} tone="official" />
            <div className="min-w-0">
              <p className={`flex items-center gap-1.5 ${nameClass}`}>
                {official.name}
                <VerifiedIcon className="size-5 shrink-0 text-verified" />
              </p>
              <p className="mt-0.5 text-sm font-semibold text-verified">{official.status}</p>
              <p className="text-sm text-graphite">{official.followers}</p>
              <p className="text-sm text-graphite">{official.since}</p>
            </div>
          </div>
        </article>
      </div>

      <figcaption id="evidence-caption" className="mt-5 ml-6 text-sm text-graphite sm:ml-10">
        {evidence.caption}
      </figcaption>
    </figure>
  );
};
