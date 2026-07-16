import Image from "next/image";
import Link from "next/link";

/**
 * SelectedWork — the Swiss work grid.
 *
 * Card structure per design.md §4: image box FIRST (16:10, hairline border,
 * mono ## top-left, status top-right, hover arrow bottom-right), title BELOW
 * the image. Tight 4px column gutter, generous row gap — so each title breathes
 * before the next image rather than crowding its neighbour.
 *
 * Cards are TITLE-ONLY, which matches the mk-swiss prototype: the image, the
 * mono number, the status and the title carry it. `summary` remains as an
 * optional escape hatch, currently unused on every card — if you reach for it,
 * the bar is that the line says something the title can't.
 *
 * Status is monochrome, never colour-coded: "Live" is rich, "In progress" is
 * muted. Hierarchy comes from weight and size, not hue (design.md §1).
 *
 * Data-driven, unchanged from the previous system: published studies (`slug`
 * set) link to /work/[slug] and render their photo. Placeholders (no `slug`)
 * render the generative canvas and are NOT clickable — no dead routes.
 */

type Study = {
  slug?: string;
  title: string;
  /** optional — a card is title-only unless a summary earns its place */
  summary?: string;
  category: string;
  status: string;
  live?: boolean;
  thumb?: string;
  thumbAlt?: string;
};

const studies: Study[] = [
  {
    slug: "device-registration",
    title: "One front door for every device that can’t log in for itself",
    category: "Platform Design",
    status: "In progress",
    thumb: "/work/device-registration/lab-researcher.jpg",
    thumbAlt:
      "A researcher at a microscope, its readings streaming to the monitor beside her.",
  },
  {
    title: "The Design System",
    category: "Design Systems",
    status: "In progress",
  },
  {
    title: "AI Workflows",
    category: "AI Workflows",
    status: "In progress",
  },
  {
    title: "Platform Design",
    category: "Platform Design",
    status: "In progress",
  },
];

function CardInner({ study, index }: { study: Study; index: number }) {
  const isPlaceholder = !study.slug;
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      {/* image box — number, status and hover arrow live ON it */}
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        <span className="absolute top-md left-md font-mono text-label tracking-label text-muted">
          {num}
        </span>
        <span
          className={`absolute top-md right-md font-mono text-status uppercase ${
            study.live ? "text-rich" : "text-muted"
          }`}
        >
          {study.status}
        </span>
        {!isPlaceholder && (
          <span
            aria-hidden="true"
            className="absolute bottom-md right-md font-mono text-ink opacity-0 -translate-x-[6px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          >
            &rarr;
          </span>
        )}
      </span>

      {/* caption sits BELOW the image */}
      <span className="block">
        <h3
          className={`mt-md mb-xs font-display text-h3 transition-colors duration-150 ${
            isPlaceholder ? "text-muted" : "text-ink group-hover:text-rich"
          }`}
        >
          {study.title}
        </h3>
        {study.summary && (
          <p className="text-small text-muted max-w-[46ch]">{study.summary}</p>
        )}
      </span>
    </>
  );
}

export default function SelectedWork() {
  return (
    <>
      {/* meta stripe — the section rule, with the scaffolding on it */}
      <div className="canvas">
        <div className="flex flex-wrap justify-between gap-lg border-t border-ink pt-md">
          <span className="lab">
            Design Systems &middot; Platform Design &middot; AI Workflows
            &middot; Governance
          </span>
          <span className="lab">Selected work ({studies.length})</span>
        </div>
      </div>

      <section id="work" aria-labelledby="selected-work" className="canvas pt-lg pb-3xl">
        <h2 id="selected-work" className="sr-only">
          Selected work
        </h2>

        <ul className="grid grid-cols-1 min-[620px]:grid-cols-2 gap-x-xs gap-y-[clamp(44px,5.5vw,72px)] list-none p-0 m-0">
          {studies.map((study, i) => (
            <li key={study.slug ?? `placeholder-${i}`}>
              {study.slug ? (
                <Link
                  href={`/work/${study.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2"
                >
                  <CardInner study={study} index={i} />
                </Link>
              ) : (
                <div aria-disabled="true" className="group block">
                  <CardInner study={study} index={i} />
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-md flex justify-end">
          <Link
            href="/work"
            className="font-display text-h2 text-ink hover:text-rich transition-colors"
          >
            View all projects &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
