# Marissa Klymkiw — Portfolio Design System
## Design notes & rationale

This file captures the *why* behind the design decisions, so the reasoning travels with the code. When in doubt about a styling choice, this is the source of intent. The visual source of truth is `MK_Design_System.html`.

---

## Origin (why these choices are non-arbitrary)

Almost every element traces to the person's own history, not invention. This matters: it's what makes the brand ownable and consistent. Don't "modernize" these away.

- **Logo (`mk` mark):** a monogram originally drawn in 2010 — rounded `m` + chevron `k` (the `k` reads as a `<` bracket, a quiet nod to systems/technical work). Current version is the 2026 redraw (`mklogo-2026.svg`), with the letterforms properly weighted. Use the real vector; don't reconstruct it.
- **Indigo `#27075A`:** pulled from the 2010 logo's circle.
- **Yellow `#FFF64D`:** pulled from a 2010 student resume, where it was used as a highlighter on section labels.
- **Headline "I think in systems":** sourced from a real moment — a senior director said "I like the way you think." The brand line is the compressed version of that. (Hero currently uses "I think in **systems** that scale past me" — the back half does the platform/adoption claim.)

---

## Positioning

- **Spine:** Architect + Platformer (systems thinker who builds patterns other teams depend on, with no authority over them). The headline makes the *thinking* claim; the case studies (later) prove the *platform* claim with adoption evidence.
- **Voice:** confident, builder-not-enabler. Rigor leads; warmth is texture.

---

## Color rules

| Token | Hex | Role |
|---|---|---|
| Indigo | `#27075A` | brand |
| Yellow | `#FFF64D` | highlighter |
| Violet | `#6A3FB5` | accent / small text on light (AA-safe) |
| Ink | `#1F1B16` | body text |
| Paper | `#F6F3EE` | page surface |
| White | `#FFFFFF` | raised containers only |

**Surface rule:** Paper is the page. White is reserved for raised, grouped containers — a card, panel, or frame around related content. Indigo is the inversion moment, used once (footer). White is never a general background; it always means "this is a contained module." If every section were a white card, "white card" would stop signaling anything.

**Yellow rule:** the highlighter is *punctuation*, not paint. One or two uses per screen, max. Always a fill with dark (ink or indigo) text on it — never yellow text on a light background (it fails contrast and reads as invisible). The discipline keeps it meaningful.

**Accessibility:** all text/UI pairs currently pass WCAG 2.2 AA (most 14–16:1). Don't regress contrast when refactoring.

---

## Typography

- **Archivo** — display (headlines at weight 800). An engineered grotesk; confident, structural.
- **Inter** — body.
- **JetBrains Mono** — data, labels, captions. The "native language of systems."
- **Permanent Marker** — facilitation accents ONLY (the marker annotations and sticky-note text). Never body or UI text. It's a guest font.

---

## The marker highlight (signature element)

The yellow highlight on the hero keyword and the footer keyword is meant to read as a *real hand-swiped highlighter* — the human/facilitation quality, made visible.

- The good implementation is the footer `.hl-swipe`: a **CSS background-image** (inline SVG with `feTurbulence`) sized to the text box. This is what makes it (a) auto-fit any word at any width, and (b) clear descenders. Earlier attempts used absolutely-positioned SVG rectangles — those broke across screen sizes. **Use the background-image approach.**
- It should have subtle inky qualities: slightly ragged edges, gentle tonal pooling (darker in spots, lighter at lifted ends). Restrained, not noisy grain.
- Reference for the *feel*: a real marker-script movie title — ink pooling, translucent lifts, natural edges.

---

## Facilitation layer ("How I work" section)

This is the one place the facilitation personality shows loudly — everywhere else stays restrained. The person does heavy facilitation in their real job; this surfaces it as a named strength.

Elements: marker-script annotations, a circled-text mark (hand-drawn ellipse around a word), and a sticky-note cluster (yellow / indigo / white, tilted, soft shadow, each with a tack).

- **Discipline:** facilitation lives in ONE loud room. Don't spread stickies/marker across other sections — it would undercut the rigor. The person is a *facilitator who thinks in systems*; the systems stay visually dominant.
- **Sticky notes:** flat, slightly rotated, soft shadow. Read as Post-its through shape/color/tilt — NO fake paper texture, NO skeuomorphic curling corners.
- **Responsive caution:** the cluster must reflow WITHOUT overlapping body text. The current file switches it from absolute-positioned (desktop) to a row below the text at 1024px, then to a tidy row on mobile. The tacks must stay anchored to their stickies in every layout (sticky stays `position:relative` so the absolutely-positioned tack anchors correctly).

---

## Metric pattern

Big numbers separated by thin vertical rules, inside a bounded white box. NO individual cards-with-accent-stripe (that reads as AI-generated/templated). Stays 3-across on mobile (smaller numbers), doesn't single-stack.

---

## Things that were explicitly rejected (don't reintroduce)

- Terracotta/sage earthy palette (an earlier direction, fully retired).
- Dark-mode / black backgrounds — the person has astigmatism; light reading surfaces are a hard requirement, not a preference. Light text on dark strains their eyes.
- Boxed metric cards with a top accent stripe ("looks very AI").
- Speech-bubble / chat-bubble shapes for the highlight or stickies.
- Handwriting fonts as reading text; all-over noise/grain on the highlight.
- Outline-stroke logo fattening (distorts the chevron `k`) — weight was fixed by redrawing letterforms instead.

---

## Roadmap (not in scope yet)

- Case-study pages at `/work/[slug]`, inheriting all tokens/components. 5-stage spine: Problem → Approach → System Built (phased) → Adoption → Impact, with a downstream engineer/stakeholder quote slot as key evidence.
- Final headline decision (currently "I think in systems that scale past me").
- One real downstream quote (from an engineer or pod lead who built on the person's work) — high-leverage social proof for the abstract "thinking" claim.
