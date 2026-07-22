"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import ArrowBack from "@/components/ui/ArrowBack";

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
export type RailStage = {
  id: string;
  num: string;
  name: string;
  /* an abbreviated label for the rail only. The rail column is 180px wide and
     the label sits in ~120px of it after the number and rule, so a name longer
     than roughly 20 characters wraps to three lines and breaks the even rhythm
     of the index. Set this when the stage heading is a phrase rather than a
     word ("From Context to Working Code" → "System"). The <Stage> heading is
     unaffected — it keeps the full name. */
  short?: string;
};

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

  // Custom eased scroll on rail clicks. The browser's native `scroll-behavior:
  // smooth` scales its duration with distance (a jump three stages down feels
  // very different from one stage down); this animates every jump over the same
  // ~640ms with an ease-in-out curve, so the motion reads as one consistent
  // gesture regardless of distance. The <a href> stays intact, so with JS off it
  // still jumps natively, and reduced-motion callers get an instant jump.
  const rafRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  function scrollToStage(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    history.replaceState(null, "", `#${id}`);

    // offset the target by the section's own scroll-margin-top so it lands below
    // the sticky header, exactly where a native anchor jump would put it.
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const target = el.getBoundingClientRect().top + window.scrollY - offset;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      window.scrollTo(0, target);
      return;
    }

    // neutralise CSS smooth-scroll for the duration of our own animation, or the
    // browser fights the per-frame scrollTo calls.
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const startY = window.scrollY;
    const change = target - startY;
    const duration = 640;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let startTime: number | null = null;
    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, startY + change * easeInOutCubic(t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        root.style.scrollBehavior = prevBehavior;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    // let modifier clicks (open in new tab, etc.) do their native thing
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    scrollToStage(id);
  }

  return (
    /* top offset clears the sticky header (--hh) plus a little air */
    <nav
      aria-label="Case study stages"
      className="sticky top-[calc(var(--hh)+32px)] self-start"
    >
      <Link
        href="/work"
        className="lab lab--ink inline-flex items-center gap-xs hover:text-rich-hover"
      >
        <ArrowBack />
        Go back
      </Link>

      <ul className="mt-xl list-none p-0 m-0 flex flex-col">
        {stages.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              {/* Inter, sentence case, NOT the mono uppercase the nav uses.
                  Letterspaced all-caps Inter is the "screams Claude Code UI"
                  look to avoid; sentence-case Inter is Debo Biswas's rail idiom.
                  Size stays text-label so it matches the top nav and the section
                  eyebrows. "Go back" above keeps its mono .lab treatment. */}
              <a
                href={`#${s.id}`}
                onClick={(e) => handleNavClick(e, s.id)}
                aria-current={isActive ? "true" : undefined}
                className={`grid grid-cols-[auto_1fr] gap-md py-sm font-body text-small transition-colors ${
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
                  {s.short ?? s.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
