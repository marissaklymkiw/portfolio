# Case study test plan

The checks every portfolio case study must pass before it ships.

**How to invoke:** say _"test the DRP case study"_ (or any page). Every criterion
below is reported individually as **PASS** or **FAIL**, with the measured value
— never a bare assertion. A criterion with no evidence behind it is reported as
**UNVERIFIED**, not as a pass.

**Scope:** two runs per page.

| Run | Viewport | Why |
| --- | --- | --- |
| Desktop | 1440 × 900 | the canvas the layout is designed against (`--canvas: 1440px`) |
| Mobile | 390 × 844 | iPhone 15/16 logical size; the narrowest realistic reading width |

Currently applied to: `/work/device-registration`.

---

## Core criteria

These three are the standing bar.

### C1 · Alt text present and under 100 characters

Every `<img>` that carries meaning has alt text of **1–100 characters**.
Decorative images are exempt but must be explicitly marked `alt=""` or
`aria-hidden` — a missing `alt` attribute is a FAIL, not a decoration.

Reported as: a table of every image on the page, its character count, and its
verdict. Also flags alt text that starts with "image of"/"screenshot of", or
that reads like a filename, since those pass a length check while failing a
human one.

> Note: 100 characters is tight for a dense product screenshot. Where a longer
> description genuinely helps, the right fix is a short `alt` plus the detail in
> a visible caption — not a 300-character `alt`.

### C2 · Legible at mobile width

At 390px, checked per element:

- **No horizontal scroll.** `documentElement.scrollWidth <= 390`.
- **Body text ≥ 16px.** Below that, iOS zooms on focus and reading degrades.
- **Labels/captions ≥ 12px.** The mono label size is 0.72rem ≈ 11.5px, which is
  the known edge case — it is reported with its measured value each run.
- **Headings scale down.** No heading rendering at its desktop clamp maximum.
- **Images fit.** No image wider than its container; no letterboxing where
  `object-cover` was intended.
- **Touch targets ≥ 44 × 44px.** Every interactive element: the carousel
  buttons, the tab control, the comparison handle, the accordion summaries.

### C3 · Styling uses design tokens

No hard-coded values where a token exists. Scans the page's components for:

- hex colours outside the palette in `tailwind.config.js`
- `px` spacing off the 4 / 8 / 16 / 24 / 32 / 48 / 64 scale
- font sizes not drawn from the type scale
- `rounded-*` values other than the documented radii

Deliberate exceptions are allowed but must carry a comment saying why, in the
component itself. An undocumented off-scale value is a FAIL; a documented one is
a PASS with a note.

---

## Suggested additions

Proposed, not yet agreed. Each earns its place by having already caught a real
defect in this project.

### S1 · Contrast

Every text/background pair computed against WCAG: **4.5:1** normal, **3:1**
large. Caught `muted` on the new `surface` token at 4.12:1, which would have
shipped as a quiet AA failure.

### S2 · Image resolution and encoding

For each image: served pixel width ÷ rendered CSS width ≥ **2** on a 2× display,
and no double-lossy encoding (a JPEG source re-encoded to WebP). Caught the
carousel serving a 640px source into a 684px slot, and JPEG screenshots being
re-compressed to WebP.

### S3 · Keyboard operability

Every interactive element reachable by Tab, with a visible focus ring, and
composite widgets following their APG pattern. Caught nothing yet because the
components were built to it — which is the point of keeping it as a gate.

### S4 · No unpublished content

No `<Todo>` blocks, no "CONFIRM", "TBD", "INSERT VISUAL", no placeholder alt.
The study currently has one open `Todo` (the Adoption quote slot), so this
correctly FAILS today.

### S5 · No real personal data in imagery

No real surnames, email addresses, or identifiable faces in screenshots. Caught
"Seelam" across the hero and five captures, and the un-blurred stakeholder photo.

### S6 · Heading order

Exactly one `h1`; no skipped levels. The study runs h1 → h2 (stage) → h3 (Beat)
→ h4, so a regression here is a real signal.

### S7 · Factual claims are sourced

Every number in the copy traces to something checkable, recorded in a comment at
the call site. Caught "8.81:1" (not in the repo), "2px focus rings" (actually
3px gold), and "40 components" (Storybook says 35).

---

## Reporting format

```
DRP case study — desktop 1440×900 / mobile 390×844

C1  Alt text ≤ 100 chars        FAIL   3 of 14 over (longest 214)
C2  Mobile legibility           PASS   min body 16px, no h-scroll, targets ≥44px
C3  Design tokens               PASS   1 documented exception (surface fill)
...
```

Failures list the specific element and the measured value, so each one is
actionable without a second pass.
