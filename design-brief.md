# Design brief — 2026 portfolio (Swiss / monochrome)

Input brief for the `design-system-generator` skill. These are **locked decisions** from a long
exploration (July 2026). Codify them into `design.md` tokens — do **not** propose a new direction.
The realized reference is the self-contained prototype `mk-swiss.html` (a Swiss homepage); pull exact
values from the token block below, which mirrors it.

## What this is
Personal portfolio for **Marissa Klymkiw — Staff Product Designer, currently at UCLA**. Focus:
design systems, AI-native workflows, and governance. 15+ years. Next.js + Tailwind.

## Direction
- **Swiss / International Typographic style**, display-led. Type does the work; hierarchy from
  **weight + size, not color or variety**. Reduction and clarity over decoration.
- **True white background** (`#ffffff`). The old warm paper `#F6F3EE` is **retired** — do not reintroduce.
- **Monochrome.** Black + white carry everything. Violet/indigo are **retired**; the single accent is a
  **rich near-black `#121118`** (deep, faint cool cast — never straight `#000`).
- **Single light theme only.** No dark backgrounds (accessibility: astigmatism). Don't generate a dark mode.

## Feeling
Rigor leads; warmth is texture. Calm, precise, serious, crafted. Someone should trust the structure.

## Color tokens (use as-is)
```
--white:        #ffffff;   /* background */
--ink:          #14121a;   /* body text + the big hero name (cool near-black) */
--rich:         #121118;   /* the ONE accent — links, labels, rules, arrows, hovers, focus */
--muted:        #6f6b77;   /* secondary text, captions, mono unit labels */
--line:         #e6e4ea;   /* hairline borders */
--line-strong:  #cfcbd6;   /* stronger borders, de-emphasized large display text */
/* retired — do not use: violet #6a3fb5, indigo #27075a, yellow highlighter, warm paper #F6F3EE */
```
Semantic status stays monochrome: "Live" = rich, "In progress" = muted (no color coding).

## Typography
- **Inter** — body copy AND the big hero name. Weights 400 / 700.
- **Hanken Grotesk (800)** — the **logo only** (top-left brand). Nowhere else.
- **Space Mono** — mono scaffolding: eyebrows, status pills, tags, section labels, unit labels.
- Big display (name / stat numbers): `font-weight:700; line-height:~0.82; letter-spacing:-0.04em`,
  size on a `clamp()`. Balance headings (`text-wrap:balance`). Uppercase only on small mono labels,
  never on large display phrases.

## Spacing & grid
- Spacing scale, use only: **4 / 8 / 16 / 24 / 32 / 48 / 64 px**.
- **12-column grid** every section answers to; break it deliberately (full-bleed name, oversized number).
- `--maxw: 1440px; --pad: clamp(20px, 4.5vw, 64px); --hh: 52px` (sticky header height).

## Components (existing patterns to tokenize)
- **Header** — sticky, no bottom rule, `1fr auto 1fr` grid (brand / nav / meta stay put while the logo
  collapses `marissa—klymkiw → m—k` on scroll). Nav + meta in Space Mono.
- **Hero name** — two treatments (deciding between them): **masthead** (interlock staircase: marissa
  upper-left steps to klymkiw lower-right + full-width ink rule + mono discipline line) and **editorial
  zigzag** (marissa hard-left, a bold solid ↘ arrowhead, klymkiw hard-right). Both monochrome.
- **Work cards** — image box (16:10, generative monochrome canvas art, mono `##` + status + hover arrow),
  title **below** the image. Tight 4px column gutter, generous row gap.
- **Pills / tags** — large Space Mono, pill radius `999px`, `1.5px` border; hover darkens border + text.
- **Stat block** — oversized number (e.g. `15+`) with a small mono unit (`years`) beneath.
- Radii: pills fully round (`999px`); image/containers square (no rounded corners on cards).

## Voice
Plain, precise, systems-minded. First person. Name things by what they do. Signature line:
*"The structure has to be right. So does the screen that sits on top of it."*

## Design philosophy
The six Swiss principles are the stated system philosophy: Grid systems · Typography as the interface ·
White space by subtraction · Objectivity · Reduction · Clarity. Interrogate every animation/gradient/icon —
does it aid understanding, or just prove a designer was here? If the latter, cut it.
