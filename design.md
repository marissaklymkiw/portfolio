# Design System: Marissa Klymkiw — 2026 Portfolio

> This file is the source of truth for the visual direction of this project. When building, read this file and apply these tokens. Do not introduce colors, fonts, spacing, or radii that are not defined here.

**Direction:** Swiss / International Typographic, display-led — type does the work, hierarchy comes from weight and size, never from color or variety.
**Feeling:** Rigor leads; warmth is texture. Calm, precise, serious, crafted. Someone should trust the structure.
**Generated for:** Personal portfolio — Staff Product Designer, currently at UCLA. Design systems, AI-native workflows, governance. 15+ years.

**Supersedes `DESIGN_NOTES.md`**, which documents the retired warm/indigo system. The rationale worth keeping has been carried into §8 of this file; everything else in that document is dead. Build from this file.

**Stack note:** Next.js 15 + React 19 + **Tailwind v4** (CSS-first). There is no `tailwind.config.js` — the theme is declared with `@theme` in `app/globals.css`. See §7.

---

## 1. Color

Monochrome. Black and white carry the entire system. This is the constraint that makes it Swiss — if you find yourself reaching for a hue to solve a hierarchy problem, the hierarchy is wrong. Fix it with weight, size, or space.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#ffffff` | Page background, primary surface. True white |
| Surface | `#ffffff` | Same as background — this system has no raised surfaces |
| Text primary | `#14121a` | Body text and the big hero name. Cool near-black, faint violet bias |
| Text muted | `#6f6b77` | Secondary text, captions, mono unit labels |
| Accent | `#121118` | The ONE accent — links, labels, rules, arrows, hovers, focus. Rich black, never `#000` |
| Accent hover | `#000000` | Hover deepens toward true black. The only place `#000` is permitted |
| Border | `#e6e4ea` | Hairline dividers, image-box borders |
| Border strong | `#cfcbd6` | Stronger borders, hover borders. **Never text** — see the warning below |
| Display mute | `#8e8a99` | De-emphasized large display text only (the marker phrase) |
| Success | — | Not defined. "Live" = Accent, "In progress" = Text muted |
| Warning | — | Not defined |
| Error | `#a4232f` | **Form validation only.** Never decorative, never a status color |
| Info | — | Not defined |

**Why there's no functional palette.** Status in this system reads through mono type, weight, and rich-vs-muted — not color coding. The single exception is `Error`, reserved strictly for genuine form validation on the contact form, where failing to signal an error is a usability failure, not a stylistic one. If you are about to use `Error` for anything other than a field that a user got wrong, don't.

**The interaction accent — `Signal` `#e5322d`.** A deliberate, single break from monochrome that marks **interaction, and only interaction**: the red cursor-follower, and the hover state of interactive text (nav links). It is not a system color for anything at rest — it must never touch resting text, status, borders/structure, or hierarchy (those stay mono; reach for weight/size/space). Named `signal`, not `accent`, because §1 already calls the rich-black the "accent." The cursor half is decorative and motion-based, so it self-disables on touch pointers and under `prefers-reduced-motion`. The rule of thumb: if red appears anywhere a user is **not** hovering or moving the pointer, it's a bug.

### Contrast check (WCAG 2.2)

Computed, not estimated:

| Pair | Ratio | Verdict |
|---|---|---|
| Text primary `#14121a` on white | **18.56:1** | AAA |
| Accent `#121118` on white | **18.77:1** | AAA |
| Text muted `#6f6b77` on white | **5.19:1** | AA body (4.5:1) — not AAA. Do not use below 16px |
| Display mute `#8e8a99` on white | **3.36:1** | AA large text (3:1) only. Never body |
| Error `#a4232f` on white | **7.34:1** | AAA |
| White on Text primary | **18.56:1** | AAA (the hero-toggle active state) |

> **Corrected from the prototype.** `mk-swiss.html` colors the big marker phrase ("Designing the structure under the screen") with `--line-strong` `#cfcbd6`, which is **1.59:1 on white and fails the 3:1 large-text minimum** — it is a border token doing a text job. This system adds a dedicated `--display-mute` `#8e8a99` (3.36:1) for that role. `--line-strong` is now borders-only. Do not regress this: the astigmatism requirement below makes low-contrast text a real barrier for the site's own author.

**Hard accessibility rules:**
- **Single light theme. No dark mode.** Light reading surfaces are a medical requirement (astigmatism), not a preference. Do not author a `prefers-color-scheme: dark` block, and do not "helpfully" add one later.
- All text/UI pairs must hold AA. Most sit at 18:1 — there is no reason to design near the line.
- Focus is always visible: `2px solid var(--color-accent)`, `outline-offset: 2px`.

### Retired — do not reintroduce

`#6a3fb5` violet · `#27075a` indigo · `#fff64d` yellow highlighter · `#f6f3ee` warm paper · terracotta/sage · any dark background. These belonged to the previous system. Their absence is a decision, not an oversight.

---

## 2. Typography

Three faces, three jobs.

| Face | Source | Role |
|---|---|---|
| **Hanken Grotesk** (800) | Google Fonts | **Headings** (section titles, H2, H3) **and the logo** |
| **Inter** (400/600/700) | Google Fonts | Body copy **and** the big hero name |
| **Space Mono** (400/700) | Google Fonts | Mono scaffolding: eyebrows, status pills, tags, section labels, unit labels |

**Note — this supersedes the brief's "Hanken = logo only" lock.** That rule was written to protect the wordmark's exclusivity, but Hanken Grotesk 800 was chosen as the heading face on sight, and it earns the role: a true grotesk with the Swiss lineage the system is built on, and a firmer, more engineered voice than Inter at heading weight.

The lock's underlying concern still stands and is answered differently: **the logo now differentiates by form, not by face.** The `m—k` construction — the rule between the words, the scroll collapse `marissa—klymkiw → m—k`, the 2px bar — is what makes the mark a mark. That's stronger than typographic exclusivity anyway; a logo that is only distinctive because nothing else may use its font is borrowing its identity from a prohibition.

**The division of labor that matters is Hanken vs Inter:** Hanken *names* things (headings, the brand). Inter *says* things (body copy) — and carries the hero name, which is a display object rather than a heading. Don't blur that: no Hanken in body copy, no Inter in section titles.

Type scale (base 16px, ratio ~1.25 — but display sizes are fluid `clamp()`, not steps):

| Token | Face | Size | Line height | Weight | Usage |
|-------|------|------|-------------|--------|-------|
| Wordmark | Inter | `clamp(2rem, 10.5vw, 8.5rem)` | 0.82 | 700 | The hero name |
| Big number | Inter | `clamp(4rem, 13vw, 12rem)` | 0.82 | 700 | Stat block (`15+`) |
| Marker | Inter | `clamp(1.8rem, 5.4vw, 4.6rem)` | 0.95 | 700 | The de-emphasized display phrase |
| Section title | **Hanken** | `clamp(2rem, 3vw, 2.4rem)` | 1.1 | 800 | Band headings |
| H2 | **Hanken** | `clamp(1.2rem, 2.2vw, 1.75rem)` | 1.1 | 800 | "View all projects →", email |
| H3 | **Hanken** | `1.5rem` | 1.25 | 800 | Work-card title |
| Intro | Inter | `clamp(1.05rem, 1.35vw, 1.35rem)` | 1.42 | 400 | Hero intro, statement |
| Body | Inter | 16px / 1rem | 1.5 | 400 | Paragraphs |
| Small | Inter | 0.95rem | 1.4 | 400 | Card captions |
| Label (mono) | Space Mono | 0.72rem | 1.2 | 400–500 | Uppercase mono scaffolding |

Hanken headings take `letter-spacing: -0.02em` (the value from the `mk-hero-options` heading). The hero name keeps `-0.04em` — it's a display object, not a heading.

**Display rules:**
- Big display (name, stat numbers): `font-weight: 700; line-height: 0.82; letter-spacing: -0.04em`. The negative tracking is what makes it read as Swiss rather than merely large.
- `text-wrap: balance` on display phrases.
- **Uppercase only on small mono labels — never on large display phrases.** The name is lowercase. That's the system.
- Letter-spacing tightens as size grows (`-0.02em` at H3 → `-0.05em` at the big number) and opens on mono labels (`+0.06em` to `+0.14em`).

---

## 3. Spacing, radius, elevation

**Spacing scale — use only these:** `4 · 8 · 16 · 24 · 32 · 48 · 64` px. Nothing between. A value not on the scale is a bug.

**Grid:** 12 columns, `24px` gutter, `--maxw: 1440px`, `--pad: clamp(20px, 4.5vw, 64px)`. Every section answers to the grid — then breaks it *deliberately* (the full-bleed name, the oversized number). An unintentional break is just misalignment.

**Radius:**
- Pills / tags / the badge focus ring: `999px` (fully round)
- Image boxes, cards, containers: `0`. **Square. No rounded corners on cards.**
- There is no `sm`/`md`/`lg` radius scale — the system is binary: fully round, or sharp.

**Shadow: none.** There is no elevation scale. This system separates with rules, space, and hairlines — not depth. `box-shadow` appears nowhere. If something needs to feel raised, it doesn't; give it space instead.

### Rules — the structural device

This system has no shadows and no rounded cards, so **the rule does all the separating**. That makes it structure, not decoration — which is why there are only **two weights and one ink**. Rules are the thing to align on; everything else hangs off them.

| Rule | Weight | Color | Ratio | Role | Usage |
|---|---|---|---|---|---|
| **Section rule** | `1px` | `--color-text` `#14121a` | 18.56:1 | structural | Sits **above** every section, title below it. Declares a section without a heading having to shout. Paired with `padding-top: 16px` |
| **Masthead rule** | `2px` | `--color-text` `#14121a` | 18.56:1 | structural | The hero's bar. Double weight because it carries the discipline line and closes the name. `flex: 1 1 auto` — fills what the mono line leaves. The only rule sharing its row with type |
| **Brand rule** | `2px` | `--color-text` `#14121a` | 18.56:1 | structural | Between `m` and `k` in the logo. The only rule with a **fixed width** (`clamp(15px, 1.6vw, 24px)`) — it's a glyph, not a divider. Same weight as the masthead, which is what ties the mark to the hero |
| **Hairline** | `1px` | `--color-line` `#e6e4ea` | 1.26:1 | separator | Type-specimen dividers, face cards, image-box borders. Deliberately near-invisible — it groups without announcing |
| **Hairline strong** | `1px` | `--color-line-strong` `#cfcbd6` | 1.59:1 | separator | The hover state of a hairline (card border darkening). Never text |

**The contrast rule for rules.** WCAG 1.4.11 (Non-text Contrast, AA) requires **3:1** for a boundary *needed to identify an interactive component* — an input's border, a button's outline, a tag's edge. It requires **nothing** of a purely decorative separator. So structural-vs-separator above is not a style distinction, it's a compliance one:

> **Structural rules and interactive boundaries owe 3:1. Separators owe nothing.**

A hairline dividing two paragraphs at 1.26:1 is correct. The same hairline as the sole outline of a button is a defect — which is why the tags are ink (18.56:1 on both text and border). **Open item:** the secondary button and the input still use `--color-line` as their only boundary at 1.26:1; by this rule they should move to a 3:1-or-better border. Flagged, not yet changed.

---

## 4. Components

**Header** — sticky, `--hh: 52px`, white, **no bottom rule**. A `1fr auto 1fr` grid (brand / nav / meta) so the nav stays optically centered and the meta stays put while the brand collapses `marissa—klymkiw → m—k` on scroll. Nav and meta in Space Mono uppercase.

**Hero name** — two switchable treatments, toggled by `data-hero` on the stage element. Both are canonical; both monochrome. See §9.

**Work card** — image box first (`aspect-ratio: 16/10`, hairline border, generative monochrome canvas art for placeholders), title **below** the image.

> **Photographs render in full colour. Never apply `grayscale` (or any other desaturating filter) to content imagery unless explicitly asked.** The monochrome rule governs the *system* — type, rules, labels, chrome. It does not govern the work. A photograph is content, and draining it is an aesthetic imposition on the evidence, not a system decision. The generative placeholder art is monochrome because it *is* chrome; a real case-study photo is not. Mono `##` top-left, status top-right, arrow bottom-right revealed on hover (`opacity 0→1`, `translateX(-6px)→0`). Column gutter is a tight `4px`; row gap is generous (`clamp(44px, 5.5vw, 72px)`) so each title breathes before the next image. Hover: border → `--color-line-strong`, title → accent.

**Pills / tags** — large Space Mono, `999px` radius, `1.5px` border, `13px 26px` padding. **One style only: ink text (`--color-text`) on an ink border.** Hover inverts to solid — white text on an `--color-accent` fill — since there is no darker left to go. There is **no muted tag variant and no `--on` active state**; the prototype's muted default sat at `--color-line` `#e6e4ea` = **1.26:1** at the border, below the 3:1 WCAG 1.4.11 requires of a boundary that identifies an interactive component. Uniform, and it clears the bar.

**Stat block** — oversized number (`15+`) with a small uppercase mono unit (`years`) beneath, `0.5em` gap.

**Button — primary:** background `--color-accent`, text white, radius `999px`, padding `13px 26px`, hover → `--color-accent-hover`.
**Button — secondary:** transparent background, `1.5px solid var(--color-line)` border, text `--color-text`; hover darkens border to `--color-line-strong`.
**Button — disabled:** label → `--color-text-muted` (5.19:1), border → `--color-line-strong`, `cursor: not-allowed`, no hover transition. Disabled reads through the muted label, the border, and the cursor — never through unreadable text, and never a blanket opacity fade. WCAG exempts inactive controls from 1.4.3, but "legally exempt" is not "legible," and this site's own author needs it readable.
**Input:** white background, `1px solid var(--color-line)`, radius `0` (square — inputs are containers), focus → `2px solid var(--color-accent)` outline at `2px` offset. Error state: border and message in `--color-error`, plus a text message — never color alone.
**Link:** color `--color-accent`, `underline`, `text-decoration-thickness: 1px`, `text-underline-offset: 3px`. In body copy links are underlined; in nav they are not, and hover shifts color instead.

---

## 5. Voice

**Person:** First. "I think in systems." Never third-person about yourself.
**Rhythm:** Plain, precise, systems-minded. Short declaratives that land. Name things by what they do, not by what they're called — "one front door for every device that can't log in for itself," not "Device Registration Portal."
**Tone:** Confident, builder-not-enabler. State the claim, then let evidence carry it; don't hedge and don't oversell. Rigor leads; warmth is texture. Em-dashes for the aside that sharpens a point.

**Signature line:** *"The structure has to be right. So does the screen that sits on top of it."*

---

## 6. Tokens — CSS custom properties

```css
:root {
  color-scheme: light;   /* light only — a hard accessibility requirement */

  /* color */
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-text: #14121a;
  --color-text-muted: #6f6b77;
  --color-accent: #121118;
  --color-accent-hover: #000000;
  --color-surface: #e6e4ea;
  --color-line: #e6e4ea;
  --color-line-strong: #cfcbd6;   /* borders only — never text */
  --color-display-mute: #8e8a99;  /* large display text only (3.36:1) */
  --color-error: #a4232f;         /* form validation only */

  /* typography */
  --font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-display: "Hanken Grotesk", "Inter", sans-serif;  /* headings + logo */
  --font-mono: "Space Mono", ui-monospace, "SF Mono", Menlo, monospace;

  --text-title: clamp(2.5rem, 5.5vw, 4.5rem);
  --text-stat: clamp(1.8rem, 4vw, 3.2rem);
  --text-section: clamp(2rem, 3vw, 2.4rem);
  --text-wordmark: clamp(2rem, 10.5vw, 8.5rem);
  --text-bignum: clamp(4rem, 13vw, 12rem);
  --text-marker: clamp(1.8rem, 5.4vw, 4.6rem);
  --text-h2: clamp(1.2rem, 2.2vw, 1.75rem);
  --text-h3: 1.5rem;
  --text-intro: clamp(1.05rem, 1.35vw, 1.35rem);
  --text-body: 1rem;
  --text-small: 0.95rem;
  --text-label: 0.72rem;

  --leading-display: 0.82;
  --leading-tight: 1.1;
  --leading-normal: 1.42;
  --leading-body: 1.5;

  --tracking-display: -0.04em;
  --tracking-bignum: -0.05em;
  --tracking-tight: -0.02em;
  --tracking-label: 0.08em;
  --tracking-eyebrow: 0.14em;

  /* spacing — 4/8/16/24/32/48/64 only */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* radius — binary: round or sharp */
  --radius-none: 0;
  --radius-full: 999px;

  /* layout */
  --maxw: 1440px;
  --pad: clamp(20px, 4.5vw, 64px);
  --hh: 52px;          /* sticky header height; drives where the name pins */
  --gutter: 24px;
  --rule: 1px;
  --rule-strong: 2px;

  /* elevation: intentionally none — this system has no shadows */
}
```

---

## 7. Tokens — Tailwind theme

This project runs **Tailwind v4**, which is CSS-first: there is no `tailwind.config.js`. Declare the theme with `@theme` in `app/globals.css`. Tailwind generates the utilities (`text-ink`, `bg-paper`, `font-mono`, `p-lg`, …) from these names automatically.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* color */
  --color-paper: #ffffff;
  --color-ink: #14121a;
  --color-muted: #6f6b77;
  --color-rich: #121118;
  --color-rich-hover: #000000;
  --color-surface: #e6e4ea;
  --color-line: #e6e4ea;
  --color-line-strong: #cfcbd6;
  --color-display-mute: #8e8a99;
  --color-error: #a4232f;

  /* type */
  --font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-display: "Hanken Grotesk", "Inter", sans-serif;  /* headings + logo */
  --font-mono: "Space Mono", ui-monospace, "SF Mono", Menlo, monospace;

  --text-title: clamp(2.5rem, 5.5vw, 4.5rem);
  --text-stat: clamp(1.8rem, 4vw, 3.2rem);
  --text-section: clamp(2rem, 3vw, 2.4rem);
  --text-section--line-height: 1.1;
  --text-section--letter-spacing: -0.02em;
  --text-wordmark: clamp(2rem, 10.5vw, 8.5rem);
  --text-wordmark--line-height: 0.82;
  --text-wordmark--letter-spacing: -0.04em;
  --text-bignum: clamp(4rem, 13vw, 12rem);
  --text-bignum--line-height: 0.82;
  --text-bignum--letter-spacing: -0.05em;
  --text-marker: clamp(1.8rem, 5.4vw, 4.6rem);
  --text-marker--line-height: 0.95;
  --text-h2: clamp(1.2rem, 2.2vw, 1.75rem);
  --text-h3: 1.5rem;
  --text-intro: clamp(1.05rem, 1.35vw, 1.35rem);
  --text-intro--line-height: 1.42;
  --text-label: 0.72rem;
  --text-label--letter-spacing: 0.08em;

  /* spacing — 4/8/16/24/32/48/64 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* radius — binary */
  --radius-none: 0;
  --radius-full: 999px;

  /* no --shadow-* by design */
}
```

**If a Tailwind utility you want doesn't exist, that is the system saying no.** Don't reach for an arbitrary value (`text-[#6a3fb5]`, `rounded-[8px]`, `shadow-lg`) to get around it.

---

## 8. Rationale carried forward

From the retired system, the reasoning that still governs:

- **Ownable, not invented.** The old palette came from a real 2010 monogram and a student resume. The Swiss direction retires those *colors* but keeps the principle: choices should trace to something real. The lowercase name, the `m—k` collapse, and the interlock all come from the wordmark itself, not from a moodboard.
- **Light surfaces are non-negotiable.** Astigmatism. This was true of the old system and is true of this one. It is the reason there is no dark mode and the reason `--display-mute` had to be fixed.
- **The anti-"looks AI" instinct.** The old notes rejected boxed metric cards with accent stripes for reading as templated. Same instinct, sharper tool: no shadows, no gradients, no rounded cards, no icon garnish.
- **Discipline over spread.** The old system confined facilitation to one loud room so rigor stayed dominant. The Swiss system has no loud room at all — the discipline is now total, and the restraint *is* the personality.
- **Retired loudly, not quietly.** Indigo, yellow, warm paper, the marker highlight, the sticky-note cluster, Archivo, JetBrains Mono, Permanent Marker — all gone. Listed here so nobody rediscovers them in git and assumes they were lost by accident.

**The Swiss test**, applied to every animation, gradient, icon, and flourish: *does it aid understanding, or just prove a designer was here?* If the latter, cut it.

---

## 9. Design philosophy — the seven principles

The stated philosophy of the system:

1. **Grid systems** — structure is visible and answerable. 12 columns, always.
2. **Typography as the interface** — type isn't dressing the content, it *is* the content.
3. **White space by subtraction** — space is made by removing, not by padding.
4. **Objectivity** — the design serves the message, not the designer's signature.
5. **Reduction** — every element must justify existing.
6. **Clarity** — if it needs explaining, it failed.
7. **Access is structural** — clear to *everyone*, or it isn't clear. Contrast, focus, target size, and motion are load-bearing structure, not a compliance pass bolted on at the end.

**Why seven and not six.** The first six are Swiss-canonical — the Müller-Brockmann lineage, formed in print. The seventh is the one print never had to answer. A poster has a single reader, at a fixed size, in fixed light. A web page has an unknown reader at an unknown size — zoomed, inverted, read aloud, or driven from the keyboard. Objectivity (04) that only holds for readers with unimpaired sight isn't objectivity; it's an assumption wearing objectivity's clothes. Clarity (06) that a screen reader can't convey isn't clarity. So 07 isn't an addendum bolted onto the six — it's what 04 and 06 already mean once the medium stops being able to assume its reader.

### The accessibility floor

**WCAG 2.2 Level AA is the floor**, specifically 1.4.3 Contrast (Minimum): 4.5:1 for body text, 3:1 for large text (≥24px, or ≥18.66px bold).

> **On Level A:** WCAG 2.2 Level A sets **no contrast requirement whatsoever** — contrast enters the standard at AA (1.4.3), with 1.4.6 Enhanced at AAA. A "Level A contrast target" is vacuously satisfied by any two colors, including white on white, and so guarantees nothing. Do not adopt it as a goal. AA is the real floor; most of this system sits at 18:1.

Binding rules:
- Every color token in §1 ships with its **measured** ratio. Measure, don't estimate.
- If a choice can't meet the floor, the choice is wrong — not the standard.
- **Nothing is signaled by color alone** (1.4.1). Status uses mono type and weight; errors carry a message.
- **Every interactive element has a visible focus state** (2.4.7): `2px solid var(--color-accent)`, offset `2px`.
- `--color-line-strong` is a **border token**. It is 1.59:1 and may never be used for text — the two bugs found in the prototype and in the first draft of `design-system.html` were both this exact mistake.

### Space Mono contrast audit

Space Mono carries all the small scaffolding, which makes it the highest-risk face in the system — small type, low-emphasis colors. Audited in-browser across every rendered mono element (16 distinct color/size pairs):

| Mono usage | Color | Size | Ratio | Verdict |
|---|---|---|---|---|
| Labels, eyebrows, `##`, units, tags, captions | `--color-text-muted` `#6f6b77` | 10.6–18.1px | **5.19:1** | AA (needs 4.5:1) |
| Status "Live", section labels, arrows | `--color-accent` `#121118` | 10.6–24px | **18.77:1** | AAA |
| Masthead discipline line, nav | `--color-text` `#14121a` | 12.9–24px | **16.79–18.56:1** | AAA |
| Field error message | `--color-error` `#a4232f` | 10.6px | **7.34:1** | AAA |
| ~~Disabled button label~~ | ~~`--color-line-strong`~~ → `--color-text-muted` | 15.2px | ~~1.59:1~~ → **5.19:1** | **fixed** |
| ~~Absent-card ×~~ | ~~`--color-line-strong`~~ → `--color-display-mute` | 32px | ~~1.59:1~~ → **3.36:1** | **fixed** |

**Every Space Mono usage now passes AA.** The muted grey at 5.19:1 is the tightest margin in the system; it clears body-text AA but not AAA, so **do not take `--color-text-muted` any lighter**, and do not use it below the sizes above.

### The two hero treatments

Both are canonical and switchable via `data-hero` on the stage element. Both monochrome; both use Inter (never Hanken).

**A — `masthead`** (the prototype default): an interlock staircase. `marissa` upper-left steps to `klymkiw` lower-right at a `3.4em` left offset — a loosened corner kiss, deliberately not a copy of Pizzolato's bar. Below it, a full-width `2px` ink rule with a mono discipline line: *"Staff Product Design. Currently at UCLA."*

**B — `zigzag`** (editorial): `marissa` hard-left, a bold solid ↘ arrowhead, `klymkiw` hard-right, with `(01)` / `(02)` mono eyebrows. Reads as a full-canvas editorial spread; also viable as a secondary section rather than the hero.

**References** (feel, not to copy): Julia Pizzolato (display + image grid), Tatiana Egoshina (hairline-ruled year|title|desc index), Studio Pratiksha (mono pill tags, playful-brutalist marks).
