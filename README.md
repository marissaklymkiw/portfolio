# Marissa Klymkiw — Portfolio

The personal portfolio + design system, as a Next.js app. Ported from the
single-file source of truth, `MK_Design_System.html`, with every design
decision preserved deliberately — see [`DESIGN_NOTES.md`](./DESIGN_NOTES.md)
for the *why* behind each one.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — design tokens are ported into the theme as CSS-first
  `@theme` variables in [`app/globals.css`](./app/globals.css) (no Tailwind
  defaults substituted for MK's values)
- Fonts via `next/font` (Archivo, Inter, JetBrains Mono, Permanent Marker)
- Deploys to **Vercel** with zero extra config

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/
  layout.tsx        root layout: fonts, metadata, skip link, shared Nav + Footer
  page.tsx          home / landing (HomeHero + HowIWorkLayers)
  about/            origin + timeline page
  ethos/            how-I-work: the facilitation cluster + metric pattern
  library/          books / reading list
  globals.css       tokens (@theme) + the preserved signature CSS
  work/             scaffold for future /work/[slug] case studies (no pages yet)
components/
  svg/              inline SVGs as recolorable components (Logo, CircleMark)
  ui/               design-system components (Nav, MarkerHighlight, StickyNote, …)
lib/
  library.ts        reading-list data for the /library route
  work/types.ts     case-study type for the future /work route
```

## Design guardrails (don't regress)

- **Surfaces:** Paper is the page; White is for raised, grouped containers only;
  Indigo is the single inversion moment (footer).
- **Yellow** is punctuation — one or two uses per screen, always a fill with
  dark text on it.
- **WCAG 2.2 AA** on all text/UI pairs.
- The signature pieces (marker highlight, circle-mark, sticky cluster + its
  860px reflow, grid background) are kept as authored CSS in `globals.css` —
  they're hand-tuned; edit with care.
