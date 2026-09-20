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
/* Ethos, Writing, and Library are hidden from the nav for now: the ROUTES still
   exist and still build (/writing, /library, /library/[slug]); they are
   simply not linked. Re-add the entries here to bring them back; nothing else
   is needed. */
/* `doc: true` means the href leaves the app for a file rather than a route.
   /resume 307s to the PDF (see next.config.ts), so it opens in a new tab:
   sending someone into a PDF viewer in the same tab drops them out of the site
   with only the back button to return, and this is the one link in the bar
   that is not a page. It also never takes aria-current, because you never come
   to rest on it. */
const LINKS: { href: string; label: string; doc?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume", doc: true },
];

/* Contact is NOT in LINKS: on desktop it is the ghost button on the right, and
   repeating it in the centred nav would state the same destination twice. The
   button is hidden under 860px though, so the mobile panel renders LINKS plus
   this one, and Contact stays reachable on a phone. */
const CONTACT: { href: string; label: string; doc?: boolean } = {
  href: "/contact",
  label: "Contact",
};

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  /* A doc link opens a file in a new tab, so it is never the current page and
     must not be styled as one. */
  const docProps = (doc?: boolean) =>
    doc ? { target: "_blank" as const, rel: "noreferrer" } : {};

  /* collapse the wordmark once the hero name has scrolled under the bar */
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      {/* Two different bars, one grid.

          DESKTOP (>860px): 1fr auto 1fr — brand left, nav optically centred,
          Contact right. The toggle is `hidden` there, so it leaves the grid
          entirely and the three remaining children auto-place 1, 2, 3.

          MOBILE (<=860px): auto 1fr — the toggle takes column 1 and the brand
          column 2, so the hamburger sits LEFT of the wordmark. The nav and
          Contact are hidden here, so only those two children remain.

          The toggle is also FIRST IN THE DOM, not just first visually. Placing
          it visually while leaving the brand ahead of it in source would put
          focus order out of step with reading order (WCAG 2.4.3). */}
      <div className="canvas grid grid-cols-[1fr_auto_1fr] max-[860px]:grid-cols-[auto_1fr] items-baseline gap-lg py-[14px]">
        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          /* p-md with -ml-md takes the hit box from 40x32 to 56x48 while leaving
             the bars optically flush with the gutter. The negative margin pulls
             LEFT now, not right, because the button moved to the leading edge:
             the padding grows the target, the negative margin cancels its effect
             on where the bars actually sit. This is the primary navigation
             control on a phone and it was the smallest target on the page; 32px
             cleared WCAG 2.2 AA (24x24) but not the 44px touch guideline. Both
             values are on the spacing scale.

             self-center, because the row is baseline-aligned and three bars have
             no text baseline to align to. */
          className="hidden max-[860px]:flex flex-col gap-[5px] p-md -ml-md justify-self-start self-center"
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

        {/* brand */}
        <Link
          href="/"
          aria-label="Marissa Klymkiw — home"
          onClick={() => setOpen(false)}
          /* py-sm/-my-sm lifts the hit box from 25px to ~41px without changing
             the bar: the padding grows the target, the negative margin keeps the
             baseline where it was. Kept at sm rather than md because the header
             is 52px tall and a 57px target would spill out of it.

             self-center on MOBILE ONLY. The row is items-baseline, which is
             right on desktop where the wordmark, the nav links, and Contact all
             share a baseline. On mobile the only thing beside it is the
             hamburger, which has no text baseline to sit on, so baseline
             alignment left the wordmark riding high against it. Centring both
             lines up their middles. Desktop keeps the baseline. */
          className={`brand justify-self-start self-baseline max-[860px]:self-center py-sm -my-sm ${shrunk ? "shrunk" : ""}`}
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
                  {...docProps(l.doc)}
                  aria-current={
                    !l.doc && isActive(l.href) ? "page" : undefined
                  }
                  className={`font-mono text-label uppercase tracking-[0.06em] transition-colors hover:text-signal ${
                    !l.doc && isActive(l.href)
                      ? "text-rich font-bold"
                      : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact CTA — the one action in the bar. Routes to /contact (the
            form plus the direct addresses); it used to jump to #contact, the
            footer block, which is still there and still global but is now the
            site-wide exit rather than the destination of this button.

            Ghost button: gray on a gray hairline, both `muted` (#6f6b77,
            5.19:1 on paper) — text clears AA (4.5:1) and the border clears
            WCAG 1.4.11 (3:1) for an interactive boundary; the lighter `line`
            tokens would fail that 3:1. Darkens to `rich` on hover;
            focus-visible ring for keyboard. self-center so the box sits
            centered in the baseline-aligned bar rather than dipping below it.

            Now a real route, so it takes aria-current like the nav links do,
            and darkens to `rich` when it is the current page. Hidden under
            860px, where the toggle takes over — /contact is in the mobile
            panel's LINKS list instead. */}
        <Link
          href="/contact"
          aria-current={isActive("/contact") ? "page" : undefined}
          className={`justify-self-end self-center inline-flex items-center rounded-button border px-md py-[7px] font-mono text-label uppercase tracking-[0.06em] transition-colors hover:border-rich hover:text-rich focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rich max-[860px]:hidden ${
            isActive("/contact")
              ? "border-rich text-rich font-bold"
              : "border-muted text-muted"
          }`}
        >
          Contact
        </Link>

      </div>

      {/* mobile panel */}
      {open && (
        <div className="hidden max-[860px]:block border-t border-line bg-paper">
          <ul className="canvas flex flex-col list-none py-sm">
            {[...LINKS, CONTACT].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  {...docProps(l.doc)}
                  onClick={() => setOpen(false)}
                  aria-current={
                    !l.doc && isActive(l.href) ? "page" : undefined
                  }
                  className={`block py-md font-mono text-label uppercase tracking-label transition-colors hover:text-signal ${
                    !l.doc && isActive(l.href)
                      ? "text-rich font-bold"
                      : "text-ink"
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
