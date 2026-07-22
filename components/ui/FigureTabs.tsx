"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

export type FigureTab = {
  /** short label on the tab itself, e.g. "Layer 1" */
  label: string;
  src: string;
  alt: string;
  /** the asset's TRUE intrinsic pixels — a wrong pair causes layout shift */
  width: number;
  height: number;
  /** optional line under the figure, same treatment as Caption */
  caption?: string;
};

/**
 * FigureTabs — one figure at a time, switched by a segmented control.
 *
 * Built for the DRP case study's four layers, but written to be generic: any
 * set of figures that are alternatives to each other (iterations, states,
 * before/after/final) rather than a sequence you scroll through.
 *
 * ---- Accessibility ----
 * The full ARIA tabs pattern, not buttons that swap a src:
 *  - role="tablist" / "tab" / "tabpanel", wired with aria-controls +
 *    aria-labelledby so the panel is announced as belonging to its tab.
 *  - ROVING TABINDEX: exactly one tab is in the tab order (tabIndex 0), the
 *    rest are -1. Tab moves you past the whole control; arrows move between
 *    tabs. This is the behaviour screen-reader users expect from a tablist,
 *    and it's why the tabs are <button>s inside a div rather than links.
 *  - ArrowLeft/ArrowRight wrap around; Home/End jump to the ends.
 *  - Activation is AUTOMATIC (selecting on arrow, not requiring Enter), which
 *    APG allows when switching panels is cheap. It is here: the images are
 *    already in the DOM.
 *  - The panel itself is NOT focusable. It holds only an image and a caption,
 *    no interactive content, so a tabIndex={0} there would add a stop that
 *    announces nothing useful.
 *
 * ---- Design system ----
 *  - The OUTER container is square (radius 0) — the frame is structure, not
 *    content. The FIGURE inside is rounded-2xl, matching every other content
 *    image in the study (see the radius note in CaseStudy.tsx). The segmented
 *    control is a full pill.
 *  - Monochrome. The active tab is ink-on-paper inverted (18.56:1 both ways);
 *    inactive tabs are muted (5.19:1) and go ink on hover.
 *  - The active tab is marked by FILL, not colour alone — it also carries
 *    aria-selected, so the state survives forced-colors and greyscale.
 *  - Focus is the site-wide 2px rich ring, offset 2px.
 */
export default function FigureTabs({
  tabs,
  label,
}: {
  tabs: FigureTab[];
  /** names the tablist for screen readers, e.g. "Layers" */
  label: string;
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = (i: number) => `${uid}-panel-${i}`;

  function focusTab(i: number) {
    setActive(i);
    refs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab(active === last ? 0 : active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab(active === 0 ? last : active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTab(last);
    }
  }

  return (
    /* NO frame and no padding: the control and the figure sit directly on the
       page, aligned to the same left edge as the prose around them. A box was
       tried and removed — in a system that carries structure with rules and
       whitespace rather than surfaces, a bordered card reads as a foreign
       object. The segmented control is the only thing that needs an edge. */
    <div className="my-2xl">
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="grid rounded-full border border-line-strong"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId(i)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-full px-md py-md text-small transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rich ${
                isActive
                  ? "bg-ink text-paper font-bold"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Every panel stays mounted and inactive ones are `hidden`, so the
          images are already decoded when you switch and the control doesn't
          flash. `hidden` also removes them from the a11y tree, so only the
          active figure is announced. */}
      {tabs.map((t, i) => (
        <div
          key={t.label}
          id={panelId(i)}
          role="tabpanel"
          aria-labelledby={tabId(i)}
          hidden={i !== active}
        >
          <figure className="m-0 mt-lg">
            {/* the figure spans the full content column — no container padding
                to subtract, so sizes matches the column measure exactly. The
                hairline is on the IMAGE, not a wrapper: these are light-ground
                graphics that would otherwise bleed into the page.

                quality 90, not the default 75 — these are dense UI graphics and
                75 bands the flat fills and rings the small type.

                It is a GALLERY TRIGGER (same data-gallery-* contract as
                LightboxImage) because at 390px these graphics render about
                350px wide and the interface inside them is unreadable. Tapping
                opens the full-screen dialog, which supports 1:1 zoom and pan —
                that is the only way the detail is reachable on a phone. */}
            <button
              type="button"
              data-gallery-src={t.src}
              data-gallery-alt={t.alt}
              data-gallery-w={t.width}
              data-gallery-h={t.height}
              onClick={(e) =>
                window.dispatchEvent(
                  new CustomEvent("gallery:open", {
                    detail: { el: e.currentTarget },
                  }),
                )
              }
              aria-label={`Open larger: ${t.alt.slice(0, 80)}`}
              className="group block w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rich"
            >
              <Image
                src={t.src}
                alt={t.alt}
                width={t.width}
                height={t.height}
                quality={90}
                sizes="(max-width: 1000px) 100vw, 1000px"
                className="block w-full h-auto rounded-2xl border border-line transition-colors group-hover:border-line-strong"
              />
            </button>
            {t.caption && (
              <figcaption className="mt-md text-small text-muted">
                {t.caption}
              </figcaption>
            )}
          </figure>
        </div>
      ))}
    </div>
  );
}
