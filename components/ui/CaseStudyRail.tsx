"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * CaseStudyRail — the sticky stage index, with the back link above it.
 *
 * The one client component in the case study; everything else is a server
 * component. It exists only because scroll position can't be observed on the
 * server.
 *
 * Scrollspy uses IntersectionObserver with a tight rootMargin band across the
 * middle of the viewport, so the active stage is whichever one is actually being
 * READ rather than whichever merely touches the edge of the screen.
 *
 * Accessibility: it's a real <nav> of anchors, so it works with JS disabled —
 * the scrollspy highlight is the only thing that degrades, and the links still
 * jump. aria-current marks the active stage for screen readers rather than
 * relying on colour alone (principle 07: nothing is signalled by colour alone).
 */
export type RailStage = { id: string; num: string; name: string };

export default function CaseStudyRail({ stages }: { stages: RailStage[] }) {
  const [active, setActive] = useState(stages[0]?.id ?? "");

  useEffect(() => {
    const sections = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [stages]);

  return (
    /* top offset clears the sticky header (--hh) plus a little air */
    <nav
      aria-label="Case study stages"
      className="sticky top-[calc(var(--hh)+32px)] self-start"
    >
      <Link
        href="/work"
        className="lab lab--ink inline-block hover:text-rich-hover"
      >
        &larr; Go back
      </Link>

      <ul className="mt-xl list-none p-0 m-0 flex flex-col">
        {stages.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`grid grid-cols-[auto_1fr] gap-md py-sm font-mono text-label uppercase tracking-label transition-colors ${
                  isActive ? "text-rich" : "text-muted hover:text-ink"
                }`}
              >
                <span className="tabular-nums">{s.num}</span>
                {/* the active stage is marked by weight AND a rule, not colour
                    alone — the border is transparent when inactive so the label
                    never shifts position */}
                <span
                  className={`border-l-2 pl-md ${
                    isActive
                      ? "border-ink font-bold"
                      : "border-transparent"
                  }`}
                >
                  {s.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
