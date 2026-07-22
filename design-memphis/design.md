# Design System: **SUNDAE** — a Memphis-Group direction

> **This is an alternate direction, not a replacement.** The live portfolio runs the Swiss system in `../design.md`. Nothing in this folder is wired into the build, and nothing outside this folder was changed to create it. If you are building the site, read `../design.md`. Read *this* file only when explicitly building something in the Memphis direction.

**Direction:** Memphis Group / Memphis Milano (Ettore Sottsass, Milan, 1981) — post-modern, anti-rational, decorative on purpose.
**Feeling:** Loud, funny, confident, a little bratty. Someone should smile in the first half-second and *then* notice the craft.
**Reference:** memphis.it — Memphis Milano's own house style: hard black keylines, flat saturated blocks, squiggles and terrazzo, shapes that carry no function whatsoever.

---

## 0. The premise (read this before the tokens)

The Swiss system asks *what can I remove?* This one asks **what can I get away with?** Sottsass's whole argument was against the Modernist claim that ornament is dishonest: a laminate covered in confetti isn't lying about being laminate — it's just enjoying itself. Memphis is decoration promoted to structure.

So the two systems are not a spectrum with a tasteful middle. Do not blend them. A Memphis page with Swiss restraint is a colorful page that failed; a Swiss page with a squiggle is a rigorous page that got vandalized. Pick one per surface and commit.

**What Memphis keeps from Swiss, though:** the grid is still real, and access is still structural. Memphis breaks a grid *knowingly*; the shapes only read as jokes because there's an order to interrupt. And the astigmatism rule doesn't care what the aesthetic is — see §9.

**The five moves.** Everything below is a way of doing one of these:
1. **Flat saturated blocks** — no gradients, no soft shadows, no depth-realism. Color arrives in slabs.
2. **The black keyline** — an ink outline around nearly everything. It's the grout between the tiles; it's also what makes bright-on-white legible (§1).
3. **A shape that does nothing** — a squiggle, an arc, a stray circle, confetti. It is not an icon, it does not indicate, it is there because it is fun. This is the load-bearing idea of the whole system.
4. **Pattern as material** — terrazzo, stripes, dots, checkers, used the way another system would use a surface color.
5. **Deliberate wrongness** — a 3° tilt, a legend off its axis, a column that doesn't line up. Wrong on purpose, once or twice per screen, never everywhere.

---

## 1. Color

Bright is easy. Bright *and* readable is the whole problem, and it has exactly one answer:

> ### The governing rule: **Play hues are surfaces. Voice hues are text. They never swap jobs.**
>
> Every bright hue in this palette fails as text on white — cyan is 2.16:1, yellow is 1.43:1. Those same hues carry ink type at 4.67–12.57:1. So bright color goes *behind* type, never *is* type. When a hue must be type, use its deepened Voice sibling. There is no exception for "just a small label."

### Play hues — fills, blocks, shapes, patterns. Never text.

| Token | Value | Ink on it | Usage |
|---|---|---|---|
| Yellow | `#FFD400` | **12.57:1** | The house color. Big fills, the hero slab, highlight bars |
| Cyan | `#12C2D6` | **8.32:1** | Second fill, arcs, columns, pattern grounds |
| Mint | `#3FD9A4` | **10.00:1** | Cool relief; card fills, confetti |
| Tomato | `#FF5233` | **5.58:1** | Heat. Accents, squiggles, small blocks |
| Pink | `#F5257F` | **4.67:1** | The loudest. Use sparingly and never under body copy — see the warning |
| Grape | `#6B3FD4` | 2.82 ✗ | **The white-type fill.** Ink fails on grape; white sits at **6.39:1** |

> **Two warnings that are easy to get wrong.**
> **Pink `#F5257F` clears AA body by 0.17.** It's legal and it's tight. Use it for headings, chips, and short labels on pink; if a paragraph must sit on pink, move it to Pink tint. Never lighten the ink to "soften" it.
> **Grape is inverted.** It is the only hue that takes white type, and the only one that must never take ink. Getting this backwards is the most likely bug in the system.

### Voice hues — the only hues permitted as text on white or a tint

| Token | Value | On white | Usage |
|---|---|---|---|
| Grape deep | `#5B2FC2` | **7.98:1** | Primary link, the one colored-text workhorse |
| Yellow deep | `#7A5A00` | **6.38:1** | Text form of yellow (yellow itself is unreadable at 1.43) |
| Pink deep | `#C2185B` | **5.87:1** | Emphasis, active states |
| Mint deep | `#0F7A55` | **5.34:1** | Success |
| Tomato deep | `#C43A18` | **5.30:1** | Warning, and hover on links |
| Cyan deep | `#0E7A87` | **5.06:1** | Info, meta text |

### Foundation

| Token | Value | Contrast | Usage |
|---|---|---|---|
| Ink | `#17161B` | **17.99:1** on white | All body text, every keyline, every hard shadow. Never `#000` |
| Paper | `#FFFFFF` | — | Page background. True white, same as the Swiss system |
| Bone | `#FBF9F4` | ink **17.10:1** | Barely-warm alternate band. Use to break a run of white, not as a theme |
| Error | `#C4123A` | **6.31:1** | Form validation only |

### Tints — brights at 12% strength, for surfaces that sit *under* body copy

| Token | Value | Ink on it |
|---|---|---|
| Yellow tint | `#FFF2C2` | **16.05:1** |
| Mint tint | `#DBF8EC` | **15.98:1** |
| Cyan tint | `#DAF6FA` | **15.89:1** |
| Pink tint | `#FFE4EF` | **15.08:1** |
| Grape tint | `#ECE4FF` | **14.66:1** |

All five clear AAA with ink. Tints are how you get long-form reading onto color without an argument.

### The 3:1 boundary problem — and why the keyline is not decorative

WCAG 2.2 §1.4.11 wants 3:1 for a boundary that identifies a component or conveys meaning. Against white:

- Pink **3.85** ✓ · Grape **6.39** ✓ · Tomato **3.23** ✓
- Cyan **2.16** ✗ · Mint **1.80** ✗ · Yellow **1.43** ✗

So a yellow card floating on white has, in accessibility terms, **no edge at all**. The fix is already the aesthetic: **a 2–3px ink keyline around every filled shape, chip, card, button, and input.** Move 2 of §0 is the compliance mechanism. That coincidence is the reason this direction can be this loud and still pass — and the reason you may never "clean up" the outlines.

**Hard rules:**
- **Single light theme. No dark mode.** Medical requirement (astigmatism), unchanged from the Swiss system. Do not author a `prefers-color-scheme: dark` block.
- **Color is never the only signal.** Six hues is decoration, not information. Status, state, and meaning must also carry a shape, an icon, or a word.
- **No gradients, no blurred shadows, no glow.** Flat or nothing.
- Focus: `3px solid` Ink, `outline-offset: 3px`. On an ink-heavy area, switch to Yellow at 12.57:1.

---

## 2. Typography

Three faces, three jobs — same discipline as the Swiss system, opposite personalities.

| Face | Weights | Role |
|---|---|---|
| **Bricolage Grotesque** | 800 (700 available) | **Display only.** Hero, section titles, big numbers. A variable grotesque that is deliberately imperfect — odd terminals, uneven rhythm — with an **optical-size axis** that redraws it as it scales |
| **Poppins** | 400 / 500 / 600 | Body, UI, buttons. A geometric sans with real 1980s in it, and unlike Bricolage it's readable for 400 words |
| **Space Mono** | 400 / 700 | Labels, eyebrows, captions, tags, numbers. Carried over from the Swiss system on purpose — it's the one thread between the two directions |

**Division of labor:** Bricolage *shouts*. Poppins *explains*. Space Mono *files it under something*. Never set body copy in Bricolage — it's a display face and it will fight the reader. Never set a hero in Poppins — it'll look like a SaaS landing page.

**Use the optical-size axis.** Bricolage Grotesque ships an `opsz` axis (12–96); the browser applies it automatically from `font-size` as long as `font-optical-sizing: auto` is set (it's the default — just don't disable it, and request the axis in the Google Fonts URL, not a static weight). This means the face is genuinely *drawn differently* at 9rem than at 1.75rem: tighter spacing and finer joins up top, more open and sturdier down small. It's the one thing this face does that a static display font can't, and it's why the H3 still holds together.

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&display=swap" rel="stylesheet">
```

**Scale — ratio 1.333 (perfect fourth), aggressive on purpose.** Swiss uses 1.25; the bigger interval is why the hierarchy reads as *shouting* rather than *organized*.

| Token | Size | Face / weight | Line height | Tracking |
|---|---|---|---|---|
| Display | `clamp(3.5rem, 11vw, 9rem)` | Bricolage 800 | 0.86 | -0.04em |
| H1 | `clamp(2.6rem, 6vw, 4.2rem)` | Bricolage 800 | 0.95 | -0.03em |
| H2 | `clamp(2rem, 4vw, 3.1rem)` | Bricolage 800 | 1.0 | -0.02em |
| H3 | `1.75rem` | Bricolage 800 | 1.1 | -0.01em |
| Lede | `clamp(1.25rem, 2.2vw, 1.6rem)` | Poppins 500 | 1.45 | 0 |
| Body | `1.0625rem` | Poppins 400 | 1.65 | 0 |
| Small | `0.9375rem` | Poppins 400 | 1.55 | 0 |
| Label | `0.75rem` | Space Mono 700 | 1.2 | **0.14em**, uppercase |

**Body copy stays on a straight baseline and a sane measure (62–70ch).** Tilt the slabs, tilt the chips, tilt the headings — never tilt a paragraph. Rotated body text is a legibility failure wearing a costume, and it's especially punishing with astigmatism.

---

## 3. Space, radius, shadow

**Spacing — Fibonacci: `4 · 8 · 12 · 20 · 32 · 52 · 84 · 136`.** Swiss doubles (4/8/16/32); this one *adds*. Same discipline, wonkier rhythm — steps get irregular exactly where the page gets loud.

**Radius — three states, no in-between.** Memphis geometry is hard edges *or* pure circles; the tasteful 8px rounded rectangle is the one shape this system has no use for.

| Token | Value | Usage |
|---|---|---|
| `--r-none` | `0` | The default. Cards, blocks, slabs, inputs |
| `--r-chip` | `6px` | Chips and small tags only |
| `--r-full` | `999px` | Pills, dots, circles, buttons |
| `--r-blob` | `62% 38% 55% 45% / 48% 55% 45% 52%` | Amoeba shapes. Decorative only — never a container for text |

**Shadow — hard offsets, zero blur.** Solid ink, or a Play hue for a chromatic-aberration effect. A blurred shadow imitates a light source; Memphis has no light source.

| Token | Value |
|---|---|
| `--pop` | `4px 4px 0 var(--ink)` |
| `--pop-lg` | `8px 8px 0 var(--ink)` |
| `--pop-color` | `6px 6px 0 var(--cyan)` (swap hue per section) |
| Pressed | `translate(3px, 3px)` + `--pop` → `1px 1px 0` |

**Keyline:** `--line: 2px solid var(--ink)` default, `--line-thick: 3px` for hero-scale objects. Nothing filled goes un-outlined (§1).

---

## 4. Shapes & patterns — the actual vocabulary

These are components. Treat them with the same rigor as a button.

| Name | Form | Rules |
|---|---|---|
| **Squiggle** | 3-crest sine, 4px ink or Play-hue stroke, round caps | Section divider. Replaces the Swiss rule. Max **one per section** |
| **Arc** | Half-disc, flat side down, keylined | Corner anchors, list bullets, tops of columns |
| **Terrazzo** | 20–40 confetti specks, 3 hues + ink, random rotation | Band backgrounds and card fills. Body copy goes on a **tint**, not on terrazzo |
| **Stripes** | 45°, 12px bands, two hues | Bars, footers, progress. Never full-viewport (it shimmers) |
| **Checker** | 16px ink/paper grid | Small accents and shadows. Never behind text |
| **Dot grid** | 4px dots, 20px pitch | The quietest pattern; safe as a page ground |
| **Zigzag** | 6-tooth, 4px stroke | Emphasis under a heading; the "underline" of this system |
| **Stray circle** | Outlined ring, 40–120px, no fill | Overlaps a corner and breaks the grid. This is Move 5 |
| **Tilt** | `rotate(-3deg)` / `rotate(2deg)` | Chips, small slabs, images. **Never** a paragraph, never a form control |

**The decoration budget: three per viewport.** Memphis is maximal, not infinite — Sottsass's rooms are loud objects on a *plain floor*. Past three, the shapes stop being jokes and become noise, and the page loses the white space that makes them land. Count before you add a fourth.

All decorative shapes: `aria-hidden="true"` and `pointer-events: none`. They mean nothing, so they must announce nothing.

---

## 5. Components

**Button (primary)** — Grape fill, white 600 Poppins, 2px ink keyline, `--r-full`, `--pop`. Hover: translate(-2px,-2px), shadow to `6px 6px`. Active: pressed (§3). Focus: 3px ink ring, offset 3.
**Button (secondary)** — Paper fill, ink text, 2px keyline, `--r-full`, `--pop`. Hover: fill Yellow.
**Button (disabled)** — Paper fill, `#6B6873` text (4.9:1 — still legible, not a ghost), 2px `#B9B6C0` keyline, no shadow, `cursor: not-allowed`. Never signal disabled with opacity alone.
**Card** — Paper or tint fill, 3px ink keyline, `--r-none`, `--pop-lg`, optional 2° tilt. Optional Play-hue slab across the top (20px). Body copy on tint or paper only.
**Input** — Paper fill, 2px ink keyline, `--r-none`, 12/20 padding. Focus: keyline to 3px + 3px Cyan ring outside it. Error: Error keyline + Error text + an icon (color is never the only signal).
**Link** — Grape deep, underlined at 2px with 4px offset. Hover: Tomato deep, underline thickens to 4px. The underline is permanent — a link that only differs by hue is a color-only signal.
**Chip / tag** — Play-hue fill, ink text, `--r-chip`, 2px keyline, alternating ±3° tilt down a row.
**Section head** — Space Mono uppercase eyebrow → Bricolage 800 title → zigzag underline in a rotating Play hue.
**Nav** — Paper, 3px ink bottom keyline, Space Mono uppercase items. Active: Yellow slab behind, ink text.

**Motion.** Bouncy: `cubic-bezier(0.34, 1.56, 0.64, 1)`, 180–320ms. Hovers pop and shift; nothing fades. Ambient wiggle on decorative shapes only.
`prefers-reduced-motion: reduce` → **all** transform/loop animation off, opacity/color changes only, and every ambient wiggle stops. This system's motion is decorative by definition, which means it is 100% safe to remove — so remove all of it.

---

## 6. Voice

First person, short sentences, dry. The *page* is loud; the *copy* is deadpan — that contrast is the joke, and it's also what keeps a portfolio credible. Confetti plus exclamation marks reads as a children's app; confetti plus "Fifteen years. Mostly design systems." reads as someone who knows exactly what they're doing.

Concrete over clever. Name the work, the constraint, the result. No "delightful," no "magic," no em-dash-heavy throat-clearing. Labels are nouns. Buttons are verbs.

---

## 7. Tokens — CSS custom properties

```css
:root {
  /* Foundation */
  --ink: #17161B;
  --paper: #FFFFFF;
  --bone: #FBF9F4;

  /* Play hues — FILLS AND SHAPES ONLY, never text */
  --yellow: #FFD400;
  --cyan:   #12C2D6;
  --mint:   #3FD9A4;
  --tomato: #FF5233;
  --pink:   #F5257F;
  --grape:  #6B3FD4;   /* white type only — ink fails at 2.82:1 */

  /* Voice hues — the only hues allowed as text */
  --grape-deep:  #5B2FC2;  /* 7.98:1 */
  --yellow-deep: #7A5A00;  /* 6.38:1 */
  --pink-deep:   #C2185B;  /* 5.87:1 */
  --mint-deep:   #0F7A55;  /* 5.34:1 */
  --tomato-deep: #C43A18;  /* 5.30:1 */
  --cyan-deep:   #0E7A87;  /* 5.06:1 */

  /* Tints — surfaces under body copy */
  --yellow-tint: #FFF2C2;
  --mint-tint:   #DBF8EC;
  --cyan-tint:   #DAF6FA;
  --pink-tint:   #FFE4EF;
  --grape-tint:  #ECE4FF;

  /* Semantic */
  --text:        var(--ink);
  --text-muted:  #56535E;   /* 8.36:1 */
  --link:        var(--grape-deep);
  --link-hover:  var(--tomato-deep);
  --success:     var(--mint-deep);
  --warning:     var(--tomato-deep);
  --info:        var(--cyan-deep);
  --error:       #C4123A;   /* 6.31:1 — form validation only */
  --disabled-text:   #6B6873;
  --disabled-border: #B9B6C0;

  /* Type */
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body:    'Poppins', system-ui, sans-serif;
  --font-mono:    'Space Mono', ui-monospace, monospace;

  --size-display: clamp(3.5rem, 11vw, 9rem);
  --size-h1:      clamp(2.6rem, 6vw, 4.2rem);
  --size-h2:      clamp(2rem, 4vw, 3.1rem);
  --size-h3:      1.75rem;
  --size-lede:    clamp(1.25rem, 2.2vw, 1.6rem);
  --size-body:    1.0625rem;
  --size-small:   0.9375rem;
  --size-label:   0.75rem;

  /* Space — Fibonacci */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 20px;
  --s-5: 32px; --s-6: 52px; --s-7: 84px; --s-8: 136px;

  /* Radius */
  --r-none: 0;
  --r-chip: 6px;
  --r-full: 999px;
  --r-blob: 62% 38% 55% 45% / 48% 55% 45% 52%;

  /* Keyline + hard shadow */
  --line:       2px solid var(--ink);
  --line-thick: 3px solid var(--ink);
  --pop:       4px 4px 0 var(--ink);
  --pop-lg:    8px 8px 0 var(--ink);
  --pop-press: 1px 1px 0 var(--ink);

  /* Motion */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast: 180ms;
  --dur-base: 240ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition-property: opacity, color, background-color, border-color !important;
    transition-duration: 120ms !important;
  }
}
```

## 8. Tokens — Tailwind theme

Tailwind v4, CSS-first (matches the main project's setup — an `@theme` block, **no** `tailwind.config.js`):

```css
@theme {
  --color-ink: #17161B;
  --color-paper: #FFFFFF;
  --color-bone: #FBF9F4;

  --color-yellow: #FFD400;
  --color-cyan: #12C2D6;
  --color-mint: #3FD9A4;
  --color-tomato: #FF5233;
  --color-pink: #F5257F;
  --color-grape: #6B3FD4;

  --color-grape-deep: #5B2FC2;
  --color-yellow-deep: #7A5A00;
  --color-pink-deep: #C2185B;
  --color-mint-deep: #0F7A55;
  --color-tomato-deep: #C43A18;
  --color-cyan-deep: #0E7A87;

  --color-yellow-tint: #FFF2C2;
  --color-mint-tint: #DBF8EC;
  --color-cyan-tint: #DAF6FA;
  --color-pink-tint: #FFE4EF;
  --color-grape-tint: #ECE4FF;

  --color-muted: #56535E;
  --color-error: #C4123A;

  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'Poppins', system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;

  --spacing-1: 4px;  --spacing-2: 8px;  --spacing-3: 12px; --spacing-4: 20px;
  --spacing-5: 32px; --spacing-6: 52px; --spacing-7: 84px; --spacing-8: 136px;

  --radius-chip: 6px;
  --radius-full: 999px;

  --shadow-pop: 4px 4px 0 #17161B;
  --shadow-pop-lg: 8px 8px 0 #17161B;

  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

> **Namespace warning.** The main project already defines `--spacing-*` (the Swiss 4/8/16/24/32/48/64 scale) and `--space-*` (a retired 12/16/24/40/64/96/160 scale). This file's `--spacing-*` is the Fibonacci scale and is **incompatible with both**. If this system is ever merged into the live app, prefix everything (`--mem-*`) rather than redefining — dropping this `@theme` block into `app/globals.css` as-is would silently rescale the entire site.

---

## 9. Access — the part that doesn't get to be playful

Principle 07 from the Swiss system carries over unchanged and unnegotiated: **clear to everyone, or it isn't clear.** A maximal aesthetic raises the stakes rather than lowering the bar — there are simply more ways to fail.

- **WCAG 2.2 AA floor.** Every ratio in §1 is computed, not estimated. The tightest is ink-on-pink at **4.67:1**; nothing else is below 5.
- **Single light theme.** No dark mode, ever. Not an aesthetic call.
- **Color is never the only carrier.** Six hues is a decoration budget, not an information channel. Pair with shape, icon, or word.
- **Keylines are compliance.** Cyan/mint/yellow have no perceptible edge on white (1.43–2.16:1). The ink outline is what makes a filled control an identifiable component under 1.4.11. Never remove it for cleanliness.
- **Motion is fully removable.** All of it is decorative, so `prefers-reduced-motion` turns off 100% of it, including ambient wiggle.
- **No rotated running text, ever.** Tilt slabs and chips; never paragraphs, never labels on form controls.
- **No text on terrazzo, checker, or stripes.** Patterned grounds destroy the contrast the ratio table promised. Text goes on paper, bone, or a tint.
- **Targets ≥ 44×44px** including the tilted ones — a rotated chip's hit area rotates with it; verify, don't assume.
- **Decorative shapes are `aria-hidden` and `pointer-events: none`.** They mean nothing; a screen reader should not find them.

---

## 10. Relationship to the Swiss system

| | Swiss (`../design.md`) | Memphis (this file) |
|---|---|---|
| Question | What can I remove? | What can I get away with? |
| Color | Mono + one signal red | Six Play hues + six Voice hues |
| Hierarchy from | Weight, size, space | Color, shape, scale-jump |
| Divider | 1px / 2px rule | Squiggle, zigzag |
| Shadow | None | Hard offset, zero blur |
| Ratio | 1.25 | 1.333 |
| Space | Doubling (4/8/16/32) | Fibonacci (4/8/12/20/32) |
| Decoration | Has to justify itself | *Is* the argument |
| Shared | True white · single light theme · Space Mono · WCAG 2.2 AA · a real grid | |

They share a spine and disagree about everything built on it — which is the point of having both. **Do not merge them.**
