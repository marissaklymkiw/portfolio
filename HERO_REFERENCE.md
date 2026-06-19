# Homepage hero — content & animation reference

The homepage (`/`) hero uses a **typewriter** headline that cycles through a list
of phrases, plus a static subheading.

## Headline

Pattern: a fixed `"I "` followed by a cycling verb-phrase.

**Cycling phrases (in order):**

1. `build AI design systems`
2. `scale AI design`
3. `enable teams`
4. `shape standards`

So the headline reads, in turn:

- I build AI design systems
- I scale AI design
- I enable teams
- I shape standards

**Color:** "I" and the trailing words are indigo (`#27075A`); the leading verb
(**build / scale / enable / shape**) is violet (`#6A3FB5`).

## Animation — typewriter

- The whole line, **including the "I"**, types in one character at a time.
- It holds on the full line, then **erases** it character by character, and the
  next line types in.
- A **blinking caret** (violet vertical bar) sits at the end of the typed text.
- **Timing:** ~55ms per character typing, ~30ms per character erasing, ~1.8s
  hold on the full line, ~0.4s pause before the next line types.
- A hidden sizer pins the container to the **longest line** ("I build AI design
  systems") so the layout never shifts as characters change.
- **Pauses on hover / focus.**
- **Reduced motion** (`prefers-reduced-motion: reduce`): no typing — whole lines
  swap every 3s, with a steady (non-blinking) caret.

## Subheading (static, below the headline)

> I work across every layer, research to architecture to interaction, which is
> why I design the structure, and the screen follows.

---

_Implementation: `components/ui/CyclingHero.tsx` (logic) and the `.cyc*` /
`@keyframes cyc-caret` rules in `app/globals.css` (styling)._
