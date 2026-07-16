"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Nav — the Swiss topbar. Sticky, true white, NO bottom rule (the sections own
 * the rules; a bar rule would compete with them).
 *
 * A 1fr auto 1fr grid so the nav stays optically centred and the meta stays put
 * while the brand collapses marissa—klymkiw → m—k on scroll (design.md §4).
 *
 * The logo is the one place the mark speaks. It differentiates by FORM — the
 * m—k construction, the 2px rule, the collapse — not by an exclusive typeface,
 * since Hanken now sets headings too. See design.md §2.
 */
/* Writing and Library are hidden from the nav for now — the ROUTES still exist
   and still build (/writing, /library, /library/[slug]); they are simply not
   linked. Re-add the entries here to bring them back; nothing else is needed. */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/ethos", label: "Ethos" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  /* collapse the wordmark once the hero name has scrolled under the bar */
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="canvas grid grid-cols-[1fr_auto_1fr] items-baseline gap-lg py-[14px]">
        {/* brand */}
        <Link
          href="/"
          aria-label="Marissa Klymkiw — home"
          onClick={() => setOpen(false)}
          className={`brand justify-self-start ${shrunk ? "shrunk" : ""}`}
        >
          <span className="bword">
            <span>m</span>
            <span className="brest">arissa</span>
          </span>
          <span className="brule" aria-hidden="true" />
          <span className="bword">
            <span>k</span>
            <span className="brest">lymkiw</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav aria-label="Sections" className="justify-self-center max-[860px]:hidden">
          <ul className="flex gap-[22px] list-none p-0 m-0">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`font-mono text-label uppercase tracking-[0.06em] transition-colors hover:text-rich ${
                    isActive(l.href) ? "text-rich font-bold" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* meta */}
        <div className="justify-self-end font-mono text-label tracking-[0.04em] text-muted max-[860px]:hidden">
          Staff Product Design
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="hidden max-[860px]:flex flex-col gap-[5px] p-2 -mr-2 justify-self-end"
        >
          <span
            className={`block w-6 h-[2px] bg-ink transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-ink transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="hidden max-[860px]:block border-t border-line bg-paper">
          <ul className="canvas flex flex-col list-none py-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block py-md font-mono text-label uppercase tracking-label ${
                    isActive(l.href) ? "text-rich font-bold" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
