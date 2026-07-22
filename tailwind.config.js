/**
 * Tailwind theme — Marissa Klymkiw 2026 Portfolio
 * Swiss / International Typographic, display-led.
 *
 * SOURCE OF TRUTH: design.md. Every value here is copied from it exactly —
 * no rounding, no substitutions. If you want to change a value, change design.md
 * first, then mirror it here and in lib/tokens.ts.
 *
 * NOTE ON TAILWIND VERSION: this project runs Tailwind v4, which is CSS-first
 * and does not auto-load a JS config. This file is loaded explicitly by the
 * `@config` directive at the top of app/globals.css. Without that line, nothing
 * in this file has any effect.
 *
 * Token names match design.md §7 exactly, so `--color-rich` in the spec is
 * `rich` here and `text-rich` in markup.
 */

/* CommonJS on purpose: package.json declares no "type": "module", so Node parses
   .js as CJS. Using `export default` here works but makes Node re-parse the file
   as ESM and warn on every build. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      // ---- Color -------------------------------------------------------
      // Monochrome. Black + white carry everything. If you reach for a hue to
      // solve a hierarchy problem, the hierarchy is wrong — fix it with weight,
      // size, or space. Ratios are measured against #ffffff, not estimated.
      colors: {
        paper: "#ffffff", // background + surface. True white
        ink: "#14121a", // body text + the big hero name — 18.56:1 (AAA)
        muted: "#6f6b77", // secondary text, captions, mono labels — 5.19:1 (AA)
        rich: {
          DEFAULT: "#121118", // THE accent: links, labels, rules, arrows, focus — 18.77:1 (AAA)
          hover: "#000000", // the only place #000 is permitted
        },
        // the one tinted FILL. Same value as `line` today, different ROLE:
        // this one backs a card, `line` draws a hairline. They may diverge.
        // ink on surface is 14.72:1; muted is 4.12:1 and FAILS AA — check
        // before putting anything other than ink on it.
        surface: "#e6e4ea",
        line: {
          DEFAULT: "#e6e4ea", // hairline separators — 1.26:1, SEPARATOR ONLY
          strong: "#cfcbd6", // hover borders — 1.59:1, BORDERS ONLY, never text
        },
        "display-mute": "#8e8a99", // de-emphasized LARGE display text only — 3.36:1 (AA large)
        error: "#a4232f", // form validation ONLY. Never decorative, never status — 7.34:1 (AAA)
        // THE INTERACTION ACCENT — the one documented break from monochrome
        // (design.md §1). Interaction only: cursor follower + interactive hover
        // (nav links). Never resting text/status/structure. Named `signal`, not
        // `accent` — §1 calls the rich-black the "accent".
        signal: "#e5322d",

        // ---- DEPRECATED — transition only. Do not use in new work. --------
        // Retired by the Swiss direction (design.md §1). These exist solely so
        // the not-yet-migrated routes keep rendering. Delete once /about,
        // /ethos, /resume, /library, /writing and /work/[slug] are migrated.
        indigo: { DEFAULT: "#27075a", deep: "#1b0540" },
        violet: "#6a3fb5",
        yellow: { DEFAULT: "#fff64d", deep: "#f2e83a" },
        panel: "#ffffff",
        bark: "#6e665b",
        "logo-fg": "#e4e5e6",
        "paper-warm": "#f6f3ee",
      },

      // ---- Type --------------------------------------------------------
      // Three faces, three jobs. Hanken NAMES things (headings + logo).
      // Inter SAYS things (body) and carries the hero name — a display object,
      // not a heading. Space Mono is the scaffolding.
      // Bound to the next/font variables declared in app/layout.tsx.
      fontFamily: {
        display: ["var(--font-hanken)", "var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: [
          "var(--font-space-mono)",
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "monospace",
        ],
        // DEPRECATED — Permanent Marker, for the retired facilitation layer
        marker: ["var(--font-permanent-marker)", "cursive"],
      },

      fontSize: {
        // Display sizes are fluid clamps, not steps on a ratio.
        wordmark: [
          "clamp(2rem, 10.5vw, 8.5rem)",
          { lineHeight: "0.82", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        bignum: [
          "clamp(4rem, 13vw, 12rem)",
          { lineHeight: "0.82", letterSpacing: "-0.05em", fontWeight: "700" },
        ],
        marker: [
          "clamp(1.8rem, 5.4vw, 4.6rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        // the case-study lede: a paragraph-length statement, so it sits BELOW
        // `marker` (which is sized for a 3-word phrase and turns a 40-word lede
        // into a wall) and ABOVE `intro`. Inter 700, not Hanken — it's a
        // statement, not a heading.
        lede: [
          "clamp(1.3rem, 2.4vw, 2.1rem)",
          { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        // the case-study h1 and the StatBand figures. Both values are lifted
        // verbatim from the arbitrary `text-[...]` classes they replace, so
        // adopting them is a token-ising change with no visual delta.
        title: [
          "clamp(2.5rem, 5.5vw, 4.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "800" },
        ],
        stat: [
          "clamp(1.8rem, 4vw, 3.2rem)",
          { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "700" },
        ],
        section: [
          "clamp(2rem, 3vw, 2.4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        h2: [
          "clamp(1.2rem, 2.2vw, 1.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        h3: [
          "1.5rem",
          { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        intro: [
          "clamp(1.05rem, 1.35vw, 1.35rem)",
          { lineHeight: "1.42", letterSpacing: "-0.005em" },
        ],
        body: ["1rem", { lineHeight: "1.5" }],
        // long-form reading size — case-study prose. Larger than `body` so a
        // wider column stays comfortable: more px per character means the line
        // can fill more of the canvas at the SAME character count.
        prose: ["1.125rem", { lineHeight: "1.6" }],
        small: ["0.95rem", { lineHeight: "1.4" }],
        label: ["0.72rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
        eyebrow: [
          "clamp(0.72rem, 0.95vw, 1rem)",
          { lineHeight: "1.2", letterSpacing: "0.14em" },
        ],
        // mono scaffolding at three fixed jobs — named so components never
        // reach for an arbitrary clamp (design.md §4)
        tag: ["clamp(0.95rem, 1.15vw, 1.3rem)", { lineHeight: "1.1" }],
        unit: [
          "clamp(0.82rem, 1.1vw, 1.15rem)",
          { lineHeight: "1.2", letterSpacing: "0.1em" },
        ],
        status: ["0.66rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],

        // ---- DEPRECATED — the retired perfect-fourth-ish scale ------------
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        md: "1.25rem",
        lg: "1.563rem",
        xl: "2.441rem",
        "2xl": "3.815rem",
        "3xl": "5.96rem",
        hero: ["clamp(2.8rem, 8vw, 5rem)", { lineHeight: "1" }],
      },

      letterSpacing: {
        display: "-0.04em",
        bignum: "-0.05em",
        tight: "-0.02em",
        label: "0.08em",
        eyebrow: "0.14em",
      },

      // ---- Spacing -----------------------------------------------------
      // 4 / 8 / 16 / 24 / 32 / 48 / 64 ONLY. A value off this scale is a bug.
      // NOTE: these are deliberately NOT named --space-*, because the retired
      // scale already owns those names at different values (--space-3xl is
      // 160px there, 64px here). Redefining them would silently collapse the
      // spacing on every un-migrated page. Tailwind's `spacing` key emits
      // --spacing-* (design.md §7), so the two scales coexist without collision.
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      // ---- Radius ------------------------------------------------------
      // Binary: fully round, or sharp. There is no sm/md/lg scale.
      borderRadius: {
        none: "0",
        full: "999px",
        // DEPRECATED — the retired rounded-card / rounded-panel
        card: "10px",
        panel: "16px",
      },

      // ---- Elevation ---------------------------------------------------
      // Intentionally empty. This system HAS NO SHADOWS — separation comes from
      // rules, space, and hairlines, never depth (design.md §3). `shadow-none`
      // exists only so the intent is greppable; if something needs to feel
      // raised, it doesn't — give it space instead.
      boxShadow: {
        none: "none",
      },

      // ---- Layout ------------------------------------------------------
      maxWidth: {
        canvas: "1440px", // --maxw
        measure: "62ch", // intro measure — the home page's short lead-in
        // Long-form reading measure for case studies.
        //
        // NOTE: `ch` is the width of the "0" glyph, which is much wider than an
        // average letter — so this does NOT mean 88 characters. Measured in
        // Chrome, 88ch at 18px Inter renders ~990px and ~125 real characters
        // per line. That is past the classic 45–75 guideline, chosen
        // deliberately: the canvas is 1312px and a narrower column read as
        // cramped against it. If you tighten this, measure the RESULT rather
        // than trusting the unit.
        reading: "88ch",
      },
    },
  },
  plugins: [],
};
