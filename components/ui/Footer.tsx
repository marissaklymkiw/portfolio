"use client";

import { usePathname } from "next/navigation";
import { SELF_FOOTER_ROUTES } from "@/lib/work/self-footer";
import ArrowForward from "./ArrowForward";

/**
 * Footer — closes the page on a section rule, like every other band.
 *
 * The retired system made this the one inversion moment: a dark indigo band with
 * yellow links. The Swiss direction has no inversion moment — black and white
 * carry everything, and the rule does the separating. See design.md §8.
 *
 * Everything about Marissa lives in the LEFT column — the email, the elsewhere
 * links, the place — and the RIGHT column carries only chrome: back-to-top on
 * top, the copyright on the bottom. Both columns anchor top AND bottom
 * (justify-between) and stretch to a shared height, so the two tops align on one
 * line and the two bottoms on another. The year lives in the copyright, so the
 * place label drops its year to avoid stating 2026 twice.
 */
const linkBase = "font-mono text-label uppercase tracking-label transition-colors";

export default function Footer() {
  /* Client only so it can read the route: the root layout renders this on every
     page, and a page that renders its own footer needs this one gone rather than
     hidden. See lib/work/self-footer.ts for why hiding it was a bug. */
  const pathname = usePathname();
  if (pathname && SELF_FOOTER_ROUTES.has(pathname)) return null;

  return (
    <footer id="contact" className="canvas border-t border-ink pt-lg pb-2xl">
      <div className="flex flex-wrap justify-between gap-lg">
        {/* left — contact + about, on the canvas gutter */}
        <div className="flex flex-col justify-between gap-md">
          <div className="flex flex-col gap-sm">
            <a
              href="mailto:marissa.klymkiw@gmail.com"
              className="font-display text-h2 text-ink hover:text-rich transition-colors"
            >
              marissa.klymkiw@gmail.com
            </a>
            <nav aria-label="Elsewhere" className="flex flex-wrap gap-lg">
              <a
                href="https://www.linkedin.com/in/marissak/"
                target="_blank"
                rel="noreferrer"
                className={`${linkBase} text-ink hover:text-rich`}
              >
                LinkedIn
              </a>
              <a href="/resume" className={`${linkBase} text-ink hover:text-rich`}>
                Resume
              </a>
            </nav>
          </div>
          <span className={`${linkBase} text-muted`}>Made in Los Angeles</span>
        </div>

        {/* right — chrome only: back-to-top (top), copyright (bottom) */}
        <div className="flex flex-col items-end justify-between gap-md text-right">
          {/* targets #main (the global <main>) — that id exists on every page,
              unlike #wordmark (home-only + position:sticky, which browsers treat
              as already in view and won't scroll to). Arrow is the shared
              ArrowForward rotated -90° to point up. */}
          {/* py-md with -my-md grows the tap target from 14px to ~46px without
              moving anything: the padding expands the hit box, the negative
              margin cancels its effect on the column rhythm. Both values are on
              the spacing scale. */}
          <a
            href="#main"
            className={`${linkBase} inline-flex items-center gap-1.5 py-md -my-md text-muted hover:text-ink`}
          >
            Back to top <ArrowForward className="-rotate-90" />
          </a>
          <span className={`${linkBase} text-muted`}>
            &copy; 2026 Marissa Klymkiw
          </span>
        </div>
      </div>
    </footer>
  );
}
