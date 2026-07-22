import Image from "next/image";
import Link from "next/link";
import ArrowForward from "./ArrowForward";
import type { Study } from "@/lib/work/studies";

/**
 * WorkCard — one study, as a Swiss card. Shared by the home <SelectedWork> grid
 * and the /work landing page so both render identical cards.
 *
 * Card structure per design.md §4: image box FIRST (16:10, hairline border,
 * hover arrow bottom-right), title BELOW the image, then the mono meta line
 * (model · category · status). Published studies (`slug`) wrap in a Link and
 * render their photo; placeholders render the generative canvas and are not
 * clickable — no dead routes.
 *
 * Status is monochrome, never colour-coded: "live" is rich, everything else is
 * muted. Hierarchy comes from weight and size, not hue (design.md §1).
 */
function CardInner({ study }: { study: Study }) {
  const isPlaceholder = !study.slug;

  return (
    <>
      {/* image box — the hover arrow lives ON it */}
      <span className="relative block aspect-[16/10] overflow-hidden bg-paper border border-line transition-colors duration-200 group-hover:border-line-strong">
        {isPlaceholder ? (
          /* monochrome hairline weave — the generative canvas, as CSS. No
             colour, no gradient: it reads as structure, not decoration. */
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(18,17,24,0.05) 0 14px, rgba(18,17,24,0.09) 14px 28px)",
            }}
          />
        ) : (
          <Image
            src={study.thumb!}
            alt={study.thumbAlt ?? ""}
            fill
            sizes="(max-width: 620px) 100vw, 50vw"
            // cinematic slow-zoom on hover: a slow ~1.05 push over 700ms with a
            // soft ease-out — the image drifts in rather than snapping. Disabled
            // under prefers-reduced-motion by the global transition-off rule.
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        )}

        {/* the shared ArrowForward shape, sized to 2.25rem via font-size (the
            icon is 1em). text-white + mix-blend-difference paints the fill as
            the photographic negative of the image behind it (255 − backdrop),
            so it reads on any photo without a contrast floor. Same arrow shape
            as every inline link arrow — just filled by the inverse blend. */}
        {!isPlaceholder && (
          <span
            aria-hidden="true"
            className="absolute bottom-md right-md text-[2.25rem] leading-none text-white opacity-0 -translate-x-[6px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 mix-blend-difference"
          >
            <ArrowForward />
          </span>
        )}
      </span>

      {/* caption sits BELOW the image */}
      <span className="block">
        {/* text-balance evens the two lines so no lone word is stranded on the
            last line (a widow) — same treatment as the case-study headings. */}
        <h3
          className={`mt-md mb-xs font-display text-h3 text-balance transition-colors duration-150 ${
            isPlaceholder ? "text-muted" : "text-ink group-hover:text-rich"
          }`}
        >
          {study.title}
        </h3>
        {/* meta line — MODEL · CATEGORY · STATUS. Status keeps its live=rich /
            else=muted weighting — the one place hue-free emphasis still marks a
            shipped study; the system is monochrome, so "live" reads as ink. */}
        <span className="font-mono text-small uppercase tracking-label text-muted">
          {study.model && <>{study.model} &middot; </>}
          {study.category}
          {study.status && (
            <>
              {" "}
              &middot;{" "}
              <span className={study.live ? "text-rich" : "text-muted"}>
                {study.status}
              </span>
            </>
          )}
        </span>
        {study.summary && (
          <p className="mt-xs text-small text-muted max-w-[46ch]">
            {study.summary}
          </p>
        )}
      </span>
    </>
  );
}

export default function WorkCard({ study }: { study: Study }) {
  return study.slug ? (
    <Link
      href={`/work/${study.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2"
    >
      <CardInner study={study} />
    </Link>
  ) : (
    <div aria-disabled="true" className="group block">
      <CardInner study={study} />
    </div>
  );
}
