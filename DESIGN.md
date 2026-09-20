---
name: Marissa Klymkiw — 2026 Portfolio
description: Swiss / International Typographic, display-led and monochrome. Type does the work; rules do the separating.
colors:
  paper: "#ffffff"
  ink: "#14121a"
  rich: "#121118"
  rich-hover: "#000000"
  muted: "#6f6b77"
  surface: "#e6e4ea"
  line: "#e6e4ea"
  line-strong: "#cfcbd6"
  display-mute: "#8e8a99"
  signal: "#e5322d"
  error: "#a4232f"
typography:
  wordmark:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 10.5vw, 8.5rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  bignum:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(4rem, 13vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.05em"
  marker:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 5.4vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Hanken Grotesk, Inter, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  stat:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 4vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  lede:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2.4vw, 2.1rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  section:
    fontFamily: "Hanken Grotesk, Inter, sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.4rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Hanken Grotesk, Inter, sans-serif"
    fontSize: "clamp(1.2rem, 2.2vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Hanken Grotesk, Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  intro:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.35vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.42
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  prose:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Inter, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Space Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
  eyebrow:
    fontFamily: "Space Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "clamp(0.72rem, 0.95vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.rich}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.rich-hover}"
    textColor: "{colors.paper}"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  button-disabled:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  tag:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  tag-hover:
    backgroundColor: "{colors.rich}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "13px 26px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.signal}"
  work-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

# Design System: Marissa Klymkiw — 2026 Portfolio

> This file is the source of truth for the visual direction of this project. When building, read this file and apply these tokens. Do not introduce colors, fonts, spacing, or radii that are not defined here.

**Supersedes `DESIGN_NOTES.md`**, which documents the retired warm/indigo system. The reasoning worth keeping is carried into the Overview below; everything else in that document is dead. Build from this file.

## Overview

**Creative North Star: "The Load-Bearing Page"**

Rules, grid, and type carry this system the way a frame carries a building. Nothing decorative is structural, and nothing structural is decorative. There are no shadows, no gradients, no rounded cards, and no icon garnish, so separation has to come from somewhere real: a 1px rule above a section, a hairline around an image box, a column that holds. When a page here looks composed, it is because the structure is doing the composing, not because something was placed on top to suggest it.

The direction is Swiss / International Typographic, display-led. Hierarchy comes from weight, size, and space, never from color or variety. Monochrome is the constraint that makes it Swiss: if you find yourself reaching for a hue to solve a hierarchy problem, the hierarchy is wrong. Fix the hierarchy. The palette allows exactly one break from that, a red reserved for interaction, and it earns its place by never appearing at rest.

Rigor leads; warmth is texture. The feeling to aim for is calm, precise, serious, and crafted: someone should trust the structure. The system carries seven principles, six of them Swiss-canonical from the Müller-Brockmann lineage, plus a seventh the print tradition never had to answer for. A poster has a single reader at a fixed size in fixed light. A web page has an unknown reader at an unknown size, zoomed, inverted, read aloud, or driven from a keyboard. So access is not a compliance pass bolted on at the end; it is load-bearing structure, and it is what objectivity and clarity already mean once the medium stops being able to assume its reader.

Confirmed anti-references: the retired warm-paper and indigo system this replaces, and anything that reads as templated or machine-generated. The old notes rejected boxed metric cards with accent stripes for exactly that reason. Same instinct here, sharper tool.

**The Swiss test**, applied to every animation, gradient, icon, and flourish: *does it aid understanding, or just prove a designer was here?* If the latter, cut it.

**Key Characteristics:**
- Monochrome, with a single interaction-only red
- Display-led: type is the interface, not dressing on it
- Zero elevation. Rules, hairlines, and space do all separating
- Three radii: round (999px), button (4px), sharp (0). Nothing between
- Lowercase display, uppercase only on small mono labels
- Measured contrast, not estimated. Most pairs sit near 18:1
- Single light theme. No dark mode, ever

## Colors

A monochrome palette in which black and white carry the entire system, with one red admitted for interaction and one crimson quarantined to form validation.

### Primary

- **Rich Black** (`#121118`): The one accent. Links, mono labels, structural rules, arrows, hover fills, and the focus ring. Deliberately not `#000`, it carries a faint cool cast that keeps it from going flat against the near-black body text. 18.77:1 on white (AAA).
- **Rich Black Deepened** (`#000000`): The hover state of the accent, and the only place true black is permitted in the system. Hover deepens rather than shifts hue, because there is nowhere darker to go.

### Secondary

- **Signal Red** (`#e5322d`): The one deliberate break from monochrome, and it marks interaction and only interaction: the cursor follower, and the hover state of interactive text such as nav links. It is never a resting color. It must not touch resting text, status, borders, structure, or hierarchy, all of which stay mono. It is named `signal` rather than `accent` because the rich black already holds that job. The cursor half is decorative and motion-based, so it self-disables on touch pointers and under `prefers-reduced-motion`.

### Tertiary

- **Error Crimson** (`#a4232f`): Form validation only, on the contact form, where failing to signal an error is a usability failure rather than a stylistic choice. Never decorative, never a status color. 7.34:1 on white (AAA). If you are about to use it for anything other than a field a user got wrong, don't.

### Neutral

- **True White** (`#ffffff`): Page background and primary surface. Not off-white, not warm.
- **Cool Near-Black** (`#14121a`): Body text and the big hero name. A near-black with a faint violet bias, which is what keeps it from reading as printer black. 18.56:1 on white (AAA).
- **Warm Grey-Violet** (`#6f6b77`): Secondary text, captions, and mono unit labels. 5.19:1 on white, which clears body AA but not AAA. The tightest margin in the system.
- **Tinted Fill** (`#e6e4ea`): The one tinted fill, backing cards that hold process artefacts. Shares a value with Hairline Grey today, but they are separate roles, fill versus hairline, and may diverge. Cool Near-Black on it is 14.72:1; Warm Grey-Violet on it is 4.12:1 and fails AA.
- **Hairline Grey** (`#e6e4ea`): Separator hairlines, image-box borders, type-specimen dividers. 1.26:1, deliberately near-invisible. It groups without announcing.
- **Border Grey** (`#cfcbd6`): The hover state of a hairline, such as a card border darkening. 1.59:1. Borders only.
- **Display Grey** (`#8e8a99`): De-emphasized large display text only, such as the marker phrase. 3.36:1, which clears AA for large text and nothing else.

### Named Rules

**The One Accent Rule.** Rich Black is the only accent. Status reads through mono type, weight, and rich-versus-muted, not through color coding. "Live" is Rich Black; "In progress" is Warm Grey-Violet. There is no success color, no warning color, and no info color, and their absence is a decision rather than an omission.

**The Pointer Rule.** If Signal Red appears anywhere the user is not hovering or moving the pointer, it is a bug.

**The Border-Never-Text Rule.** Border Grey (`#cfcbd6`) is a border token at 1.59:1 and may never be used for text. Two separate bugs in this project were both this exact mistake: a disabled button label and an absent-card ×, each since fixed. The astigmatism requirement makes low-contrast text a real barrier for this site's own author.

**The Measured Ratio Rule.** Every color token ships with its measured ratio. Measure in-browser; do not estimate. If a choice cannot meet the floor, the choice is wrong, not the standard. WCAG 2.2 Level AA is the floor, specifically 1.4.3: 4.5:1 for body text, 3:1 for large text at 24px or 18.66px bold. Level A sets no contrast requirement at all and is vacuously satisfied by white on white, so do not adopt it as a target.

### Retired, do not reintroduce

`#6a3fb5` violet · `#27075a` indigo · `#fff64d` yellow highlighter · `#f6f3ee` warm paper · terracotta / sage · any dark background. These belonged to the previous system. Listed here so nobody rediscovers them in git and assumes they were lost by accident.

## Typography

**Display Font:** Hanken Grotesk 800 (with Inter, sans-serif)
**Body Font:** Inter 400 / 600 / 700 (with Helvetica Neue, Arial)
**Label/Mono Font:** Space Mono 400 / 700 (with ui-monospace, SF Mono, Menlo)

**Character:** Three faces, three jobs. Hanken Grotesk is a true grotesk with the Swiss lineage the system is built on, and a firmer, more engineered voice than Inter at heading weight. Inter carries body copy and, separately, the big hero name, which is a display object rather than a heading. Space Mono is scaffolding: it labels, numbers, and tags, and it never carries reading text.

An earlier brief locked Hanken to the logo alone, to protect the wordmark's exclusivity. That lock is superseded. The concern it protected is answered differently: the logo now differentiates by form rather than by face, through the rule between the words, the scroll collapse from `marissa—klymkiw` to `m—k`, and the 2px bar. That is stronger than typographic exclusivity anyway. A logo that is distinctive only because nothing else may use its font is borrowing its identity from a prohibition.

### Hierarchy

- **Wordmark** (Inter 700, `clamp(2rem, 10.5vw, 8.5rem)`, 0.82, `-0.04em`): The hero name. Lowercase.
- **Big Number** (Inter 700, `clamp(4rem, 13vw, 12rem)`, 0.82, `-0.05em`): The stat block figure, such as `15+`.
- **Marker** (Inter 700, `clamp(1.8rem, 5.4vw, 4.6rem)`, 0.95, `-0.03em`): The de-emphasized display phrase, in Display Grey.
- **Title** (Hanken 800, `clamp(2.5rem, 5.5vw, 4.5rem)`, 0.95, `-0.04em`): The case-study h1.
- **Stat** (Inter 700, `clamp(1.8rem, 4vw, 3.2rem)`, 0.9, `-0.05em`): The outcome figures in a stat band. Smaller than Big Number, which is a single hero figure; this one sits three-up and has to hold its own line at every width.
- **Lede** (Inter 700, `clamp(1.3rem, 2.4vw, 2.1rem)`, 1.25, `-0.02em`): The case-study lede. A paragraph-length statement, so it sits below Marker, which is sized for a three-word phrase and turns a forty-word lede into a wall.
- **Section** (Hanken 800, `clamp(2rem, 3vw, 2.4rem)`, 1.1, `-0.02em`): Band headings.
- **H2** (Hanken 800, `clamp(1.2rem, 2.2vw, 1.75rem)`, 1.1, `-0.02em`)
- **H3** (Hanken 800, `1.5rem` fixed, 1.25, `-0.02em`): Work-card titles. Deliberately not a clamp. An earlier clamp floored h3 at 16.8px on mobile, smaller than the 1.125rem prose beneath it. Pinning it to the desktop cap gives a 1.33 ratio against body at every width.
- **Intro** (Inter 400, `clamp(1.05rem, 1.35vw, 1.35rem)`, 1.42): Hero intro and statements. Measure 62ch.
- **Body** (Inter 400, `1rem`, 1.5): Paragraphs.
- **Prose** (Inter 400, `1.125rem`, 1.6): Long-form case-study reading. Larger than Body so a wider column stays comfortable. Measure 88ch, which is roughly 125 real characters, chosen deliberately against a 1312px canvas.
- **Small** (Inter 400, `0.95rem`, 1.4): Card captions.
- **Label** (Space Mono, `0.72rem`, 1.2, `+0.08em`, uppercase): Mono scaffolding.
- **Eyebrow** (Space Mono, `clamp(0.72rem, 0.95vw, 1rem)`, 1.2, `+0.14em`, uppercase): Section and hero eyebrows.

### Named Rules

**The Hanken Names, Inter Says Rule.** Hanken names things: headings and the brand. Inter says things: body copy, plus the hero name as a display object. Do not blur it. No Hanken in body copy, no Inter in section titles.

**The Lowercase Display Rule.** Uppercase appears only on small mono labels, never on large display phrases. The name is lowercase. That is the system.

**The Tightening Rule.** Letter-spacing tightens as size grows, from `-0.02em` at H3 to `-0.05em` at the big number, and opens on mono labels, from `+0.08em` to `+0.14em`. The negative tracking on display is what makes it read as Swiss rather than merely large. Apply `text-wrap: balance` to display phrases.

**The Mono Floor Rule.** Space Mono carries all the small scaffolding, which makes it the highest-risk face in the system. Every mono usage was audited in-browser across sixteen distinct color and size pairs and every one now passes AA. Warm Grey-Violet at 5.19:1 is the tightest margin, so do not take it lighter and do not use it below 10.6px.

## Layout

A 12-column grid with a `24px` gutter, a `1440px` canvas, and a fluid page pad of `clamp(20px, 4.5vw, 64px)`. The sticky header is `52px`, and that value drives where the hero name pins. Every section answers to the grid, then breaks it deliberately: the full-bleed name, the oversized number. An unintentional break is just misalignment.

**Spacing scale, use only these:** `4 · 8 · 16 · 24 · 32 · 48 · 64` px. Nothing between.

Measure tokens are separate from the canvas: `62ch` for the home page's short lead-in, `61ch` for long-form case-study reading. Note that `ch` is the width of the zero glyph and much wider than an average letter, so at 18px Inter one `ch` measures 11.29px and `61ch` renders roughly 80 characters, not 61. Eighty is the target: past the classic 45 to 75 guideline, chosen deliberately because a tighter column reads as cramped against this canvas. If you change it, measure the rendered line rather than trusting the unit.

**The measure caps the text, not the column.** Figures, heroes, and carousels keep the full track width. Narrowing a whole column to fix its prose shrinks the screenshots with it, and on a case study those screenshots are the evidence.

Responsive behavior turns at two breakpoints, `860px` and `520px`, plus the fluid clamps that carry most of the scaling. The mobile type ladder is set by the floors on Title and Section rather than by desktop, which is governed by the caps. At 390px the ladder steps 40 / 32 / 24 / 18, a consistent 1.25 to 1.33 at every rung. Check the whole ladder, not one token, before changing either floor.

### Named Rules

**The Off-Scale Rule.** A spacing value not on the scale is a bug, not a nuance.

**The Deliberate Break Rule.** The grid may be broken, but only on purpose and only at full-bleed scale. If a break could be mistaken for misalignment, it is misalignment.

## Elevation & Depth

**This system has no shadows.** There is no elevation scale, and `box-shadow` appears nowhere. Depth is not simulated; separation is constructed. Rules, hairlines, and space do all of the work that elevation would do in a softer system. If something needs to feel raised, it does not. Give it space instead.

Because there are no shadows and no rounded cards, the rule carries the entire structural load. That is why there are only two weights and one ink. Rules are the thing to align on, and everything else hangs off them.

### Rule Vocabulary

- **Section rule** (`1px`, Cool Near-Black, 18.56:1, structural): Sits above every section with the title below it, paired with `padding-top: 16px`. Declares a section without a heading having to shout.
- **Masthead rule** (`2px`, Cool Near-Black, 18.56:1, structural): The hero's bar. Double weight because it carries the discipline line and closes the name. `flex: 1 1 auto`, filling what the mono line leaves. The only rule that shares its row with type.
- **Brand rule** (`2px`, Cool Near-Black, 18.56:1, structural): Between `m` and `k` in the logo. The only rule with a fixed width, `clamp(15px, 1.6vw, 24px)`, because it is a glyph rather than a divider. Sharing the masthead's weight is what ties the mark to the hero.
- **Hairline** (`1px`, Hairline Grey, 1.26:1, separator): Type-specimen dividers, face cards, image-box borders.
- **Hairline strong** (`1px`, Border Grey, 1.59:1, separator): The hover state of a hairline. Never text.

### Named Rules

**The 3:1 Boundary Rule.** WCAG 1.4.11 requires 3:1 for a boundary needed to identify an interactive component, such as an input's border, a button's outline, or a tag's edge. It requires nothing of a purely decorative separator. So structural-versus-separator is a compliance distinction, not a stylistic one: **structural rules and interactive boundaries owe 3:1; separators owe nothing.** A hairline dividing two paragraphs at 1.26:1 is correct. The same hairline as the sole outline of a button is a defect.

**Open item, half settled (2026-09-19).** The INPUT is done: the contact form's fields take Warm Grey-Violet (`#6f6b77`, 5.19:1) as their border, not the Hairline Grey they were specified with, because an input's box IS the boundary that identifies it as an interactive component and 1.26:1 does not clear 1.4.11. Measured in-browser at all four fields. **The secondary button is still open** and still sits on Hairline Grey as its only boundary. It should take the same treatment when something on the site next uses one.

## Shapes

The form language is three fixed values, and only three. Pills, tags, chips, and the badge focus ring are fully round at `999px`. **Buttons are `4px`** (`rounded-button`). Image boxes, cards, containers, and inputs are square at `0`. There is still no `sm` / `md` / `lg` scale: these are three named jobs, not a ramp, and a fourth value is a bug.

Borders are hairlines at `1px`, or `1.5px` on pills and tags where the edge identifies an interactive component. The recurring silhouette is the horizontal rule: a full-width or column-width line that declares a boundary without enclosing anything. Nothing in this system is boxed in on four sides unless it is an image.

### Named Rules

**The Three Radii Rule** (amended 2026-09-19, was the Binary Radius Rule). Round at `999px`, button at `4px`, or sharp at `0`. Nothing else.

This rule used to read "fully round, or sharp; a value between the two is not a refinement, it is a third system." It was amended rather than quietly broken. The nav's CONTACT button had carried a bare `rounded-[4px]` since the Swiss migration, in violation of the rule as written, and nobody noticed until `/contact` shipped a Send button built to spec as a pill and the two buttons visibly disagreed. Presented with the conflict, MK chose `4px` for both.

So the old rule had already lost, in the header, on every page. What changed here is that the third value is now named, tokenized as `rounded-button`, and written down, instead of living as an arbitrary utility in one component. **A rule the codebase does not follow is not a rule, it is a wish.**

Still true, and the part worth keeping: radius is a set of named jobs, not a scale to interpolate along. Do not add a `2px` or an `8px` because something looks almost right.

**Not yet migrated:** `components/ui/Buttons.tsx` (the retired indigo/violet button, used only by `Placeholder.tsx`) still renders `rounded-full`. It belongs to the deprecated layer and moves to `rounded-button` when that layer is removed, or sooner if a Swiss page ever uses it.

## Components

### Buttons

- **Shape:** `4px` radius (`rounded-button`), padding `13px 26px`. NOT a pill: buttons are the one thing at `4px`, and tags and chips keep `999px`. See the Three Radii Rule under Shapes for why.
- **Primary:** Rich Black fill, white label. Hover deepens the fill to true black.
- **Secondary:** Transparent, `1.5px` Hairline Grey border, Cool Near-Black label. Hover darkens the border to Border Grey. See the open item under Elevation & Depth.
- **Disabled:** Label to Warm Grey-Violet (5.19:1), border to Border Grey, `cursor: not-allowed`, no hover transition. Disabled reads through the muted label, the border, and the cursor, never through unreadable text and never a blanket opacity fade. WCAG exempts inactive controls from 1.4.3, but legally exempt is not legible.
- **Motion:** `transform .08s, background .15s`, with a `1px` downward nudge on `:active`.

### Chips

- **Style:** Large Space Mono, `999px` radius, `1.5px` border, `13px 26px` padding. One style only: Cool Near-Black text on a Cool Near-Black border.
- **State:** Hover inverts to solid, white text on a Rich Black fill, since there is nowhere darker to go. There is no muted tag variant and no active state. An earlier muted default sat at Hairline Grey, 1.26:1 at the border, below what 1.4.11 requires of a boundary identifying an interactive component. Uniform clears the bar.

### Cards / Containers

- **Corner Style:** Square (`0`).
- **Background:** True White, or Tinted Fill for cards holding process artefacts.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** `1px` Hairline Grey, darkening to Border Grey on hover.
- **Internal Padding:** From the spacing scale, typically `24px` or `32px`.

### Inputs / Fields

- **Style:** White background, `1px` Warm Grey-Violet (`#6f6b77`, 5.19:1) border, radius `0`. Inputs are containers, so they are square. NOT Hairline Grey: at 1.26:1 that fails WCAG 1.4.11, which asks 3:1 of a boundary identifying an interactive component, and an input has no other boundary.
- **Focus:** `2px solid` Rich Black outline at `2px` offset, inherited from the global `:focus-visible`. Fields need no focus styling of their own.
- **Error:** Border and message in Error Crimson (7.34:1), plus a text message prefixed with `↳`. Never color alone (WCAG 1.4.1). The message renders directly under the field, ABOVE any standing hint: what is wrong comes before what the rule is.
- **Validation timing:** a field validates on blur, then re-checks on every keystroke once it has been marked wrong. Never during first entry, which would call an email address invalid while it is three characters in.
- **Counters:** a capped field shows a live `n/limit` in mono, Warm Grey-Violet, turning Error Crimson past the cap. The counter is `aria-hidden`; the same limit is stated once in an announced hint, because a counter firing on every keystroke is noise in a screen reader.
- **No placeholders. Ever.** Placeholder text disappears the moment someone starts typing, which is the moment they may want to re-read it; it is routinely read as a value already filled in; and it cannot carry real guidance without either failing contrast or looking like content. Every field's guidance goes in a **persistent hint below the input**, in the mono label style at Warm Grey-Violet, wired through `aria-describedby` so it is announced and not merely visible. This applies to search, filters, and any field added later, not only the contact form.
- **Optional fields say so in the label**, in Warm Grey-Violet: `Message (optional)`. Required-ness is needed BEFORE the decision to fill a field, so it belongs in the label rather than in a hint underneath. Required fields carry no marker: when most of a short form is required, naming the exception is quieter than starring the rule.

Live at `/contact`, which is the only form on the site. See `components/ui/ContactForm.tsx`, with the rules themselves in `lib/contact.ts` so the route handler can enforce the identical set.

### Navigation

Sticky header at `52px`, white, with **no bottom rule**. A `1fr auto 1fr` grid of brand / nav / meta, so the nav stays optically centered and the meta stays put while the brand collapses from `marissa—klymkiw` to `m—k` on scroll. Nav and meta are Space Mono uppercase. Nav links are not underlined and shift color on hover to Signal Red. Body-copy links are underlined at `1px` thickness with `3px` offset, in Rich Black.

### Work Card

Image box first (`aspect-ratio: 16/10`, hairline border), title below the image. Mono `##` top-left, status top-right, arrow bottom-right revealed on hover (`opacity 0→1`, `translateX(-6px)→0`). Column gutter is a tight `4px`; row gap is generous at `clamp(44px, 5.5vw, 72px)`, so each title breathes before the next image. Hover darkens the border to Border Grey and shifts the title to Rich Black.

> **Photographs render in full colour.** Never apply `grayscale` or any other desaturating filter to content imagery unless explicitly asked. The monochrome rule governs the system: type, rules, labels, chrome. It does not govern the work. A photograph is content, and draining it is an aesthetic imposition on the evidence rather than a system decision. The generative placeholder art is monochrome because it *is* chrome; a real case-study photo is not.

### Hero Name (signature)

Two switchable treatments, toggled by `data-hero` on the stage element. Both are canonical, both monochrome, both Inter and never Hanken.

- **A, `masthead`** (default): an interlock staircase. `marissa` upper-left steps to `klymkiw` lower-right at a `3.4em` left offset, a loosened corner kiss. Below it, a full-width `2px` ink rule carrying a mono discipline line.
- **B, `zigzag`** (editorial): `marissa` hard-left, a bold solid ↘ arrowhead, `klymkiw` hard-right, with `(01)` / `(02)` mono eyebrows. Reads as a full-canvas editorial spread, and is also viable as a secondary section rather than the hero.

### Cursor Follower (signature)

A Signal Red follower that trails the pointer, easing on `cubic-bezier(0.22, 1, 0.36, 1)` at `0.5s`. Decorative and motion-based, so it self-disables on touch pointers and under `prefers-reduced-motion`. This and interactive text hover are the only two places red is permitted.

### Migration state

**Not everything below the token layer has moved to this system yet**, and the deprecated block in `app/globals.css` exists specifically to keep the remainder rendering.

**Migrated (2026-09-19):** `/about`, along with `Timeline.tsx` and `NamePronunciation.tsx`, which only that route used. `Footer.tsx` and the nav moved earlier; `/contact` was built on this system from the start.

**Still un-migrated:** the `/library`, `/writing`, and `/resume` routes, plus the shared components `Buttons.tsx` (ships `bg-indigo` with a `yellow` variant), `Label.tsx` (ships `text-violet`), `SectionHeader.tsx` (violet numerals, indigo titles), `StickyNote.tsx`, `MarkerHighlight.tsx`, and `Metrics.tsx`. `MoonSticker.tsx` is now unreferenced: `/about` was its only consumer, and it is a decorative element with no place in the Swiss system. It is kept on disk rather than deleted, as MK's call to make.

The deprecated block cannot be removed until that list is empty.

The component specs above are **normative**: they describe what to build and what to migrate toward. They do not all describe what currently renders. When you touch one of those files, migrate it rather than matching the retired system it currently uses. Delete the deprecated block once the set is empty.

## Do's and Don'ts

### Do:
- **Do** solve hierarchy with weight, size, and space. Reaching for a hue means the hierarchy is wrong.
- **Do** measure contrast in-browser and record the ratio. Do not estimate.
- **Do** keep spacing on `4 · 8 · 16 · 24 · 32 · 48 · 64`. A value between them is a bug.
- **Do** use `999px` or `0` for radius, and nothing else.
- **Do** put a `1px` section rule above a section with the title below it, rather than making a heading shout.
- **Do** give every interactive element a visible focus state: `2px solid` Rich Black at `2px` offset.
- **Do** carry status through mono type and weight. "Live" is Rich Black, "In progress" is Warm Grey-Violet.
- **Do** render content photographs in full colour.
- **Do** migrate a file off the retired tokens when you touch it.
- **Do** apply the Swiss test to every flourish: does it aid understanding, or just prove a designer was here?

### Don't:
- **Don't** author a `prefers-color-scheme: dark` block, or add a dark mode later. Light reading surfaces are a medical requirement here, not a preference.
- **Don't** use Border Grey (`#cfcbd6`) for text. It is 1.59:1 and it is a border token.
- **Don't** use Warm Grey-Violet below 10.6px, or take it any lighter than `#6f6b77`.
- **Don't** let Signal Red appear anywhere a pointer is not hovering or moving.
- **Don't** use Error Crimson for anything but a form field a user got wrong.
- **Don't** add `box-shadow`. There is no elevation scale, and a raised surface is a spacing problem in disguise.
- **Don't** round a card. Image boxes, cards, and containers are square.
- **Don't** set large display phrases in uppercase. Uppercase belongs to small mono labels.
- **Don't** put Hanken in body copy or Inter in section titles.
- **Don't** reintroduce violet, indigo, yellow, warm paper, terracotta, sage, or any dark background.
- **Don't** reach for an arbitrary value (`text-[#6a3fb5]`, `rounded-[8px]`, `shadow-lg`) when a utility does not exist. A missing utility is the system saying no.
- **Don't** apply a desaturating filter to content imagery.
