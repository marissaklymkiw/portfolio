"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/svg/Logo";

/**
 * Nav — sticky portfolio header: logo + name (home link) on the left, the
 * section links + a Resume pill on the right. Collapses to a hamburger menu
 * below 860px. The current section is highlighted via the pathname.
 */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/ethos", label: "Ethos" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-20 bg-paper border-b border-line">
      <nav className="flex items-center justify-between max-w-[var(--maxw)] mx-auto px-[var(--space-md)] py-[var(--space-sm)]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 min-w-0 no-underline font-display font-extrabold text-md tracking-[-.02em] text-indigo max-[760px]:text-base"
        >
          <Logo className="block shrink-0 w-[80px] h-[80px]" />
          {"Marissa Klymkiw"}
        </Link>

        {/* desktop links */}
        <div className="flex items-center gap-[var(--space-md)] max-[860px]:hidden">
          <ul className="flex items-center gap-[var(--space-md)]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`font-body text-md no-underline transition-colors ${
                    isActive(l.href)
                      ? "text-indigo font-semibold"
                      : "text-bark hover:text-indigo"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/resume"
            aria-current={isActive("/resume") ? "page" : undefined}
            className={`font-body font-semibold text-md no-underline rounded-full border px-4 py-1.5 transition-colors ${
              isActive("/resume")
                ? "bg-indigo text-paper border-indigo"
                : "border-indigo text-indigo hover:bg-indigo/6"
            }`}
          >
            Resume
          </Link>
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="hidden max-[860px]:flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-6 h-[2px] bg-indigo transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-indigo transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-indigo transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* mobile menu panel */}
      {open && (
        <div className="hidden max-[860px]:block border-t border-line bg-paper">
          <ul className="flex flex-col px-[var(--space-md)] py-[var(--space-xs)]">
            {[...LINKS, { href: "/resume", label: "Resume" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block py-[var(--space-sm)] font-body text-base no-underline ${
                    isActive(l.href) ? "text-indigo font-semibold" : "text-bark"
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
