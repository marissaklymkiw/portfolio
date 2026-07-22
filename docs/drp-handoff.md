# DRP case study — hand-off

Written 21 July 2026, end of session. Everything below is verified unless it
says otherwise.

**Nothing is committed.** Branch is `feature/library-covers` with ~21 modified
and 29 untracked files. Commit before you start tomorrow so today's work is
recoverable if a change goes wrong.

---

## Where things stand

The case study passes all nine criteria in `docs/case-study-test-plan.md`, on
desktop (1440×900) and mobile (390×844).

| | Criterion | Status |
| --- | --- | --- |
| C1 | Alt text ≤ 100 chars | PASS — 22 images, longest 95 |
| C2 | Legible at mobile width | PASS |
| C3 | Design tokens | PASS — 3 documented exceptions |
| S1 | Contrast | PASS — zero failures |
| S2 | Image resolution ≥ 2× | PASS — minimum 2.05× |
| S3 | Touch targets ≥ 44px | PASS — 0 of 22 under |
| S4 | No unpublished content | PASS |
| S5 | No real personal data | PASS |
| S6 | Heading order | PASS |

Dev server: `npm run dev` → `/work/device-registration`.

---

## Open — needs you

### 1. Favicon: the thicker mark is still not in

Installed today is the **thinner** mark, built from `mk-logo.svg` at
`app/icon.png` (512) and `app/apple-icon.png` (180). Next generates the link
tags from those filenames; there is no hand-written `<link>` to update.

The three SVGs you exported at 20:01 are **fragments, not an icon**:

| File | What it actually is |
| --- | --- |
| `path1.svg` | the circle only, 150×150 |
| `path3.svg` | the "m" only, 54×44 |
| `path5.svg` | the "k" only, 29×43 |

Each has its own viewBox and no placement data, so composing them means guessing
where the glyphs sit inside the circle. **Export the thicker mark as one SVG**
and it drops straight in.

Note the mark knocks the letters out of the path rather than filling them, so
whatever you export needs a white disc behind it or the glyphs vanish on a dark
browser tab. `scripts/drp/` has no icon script — it was one-off — but the
approach is a `<div>` with `background:#fff; border-radius:50%` behind the SVG,
rendered headless at 512 and 180.

### 2. Adoption still has no quote

Section 04 argues that engineers built from the specs with confidence, and then
does not evidence it. The `UNRESOLVED — DO NOT PUBLISH` placeholder is gone (it
was failing the test plan), but **the gap it marked is still there**. The ask
was a build-confidence quote — something like "the edge cases were already
thought through, so we didn't hit surprises" — from Alex, Bean, or a pod lead.

### 3. Three factual claims I could not verify

These are in the live copy now. I flagged them earlier and they were never
resolved:

- **"8.81:1"** in the accessibility paragraph. That figure does not exist in the
  DRP repo. The nearest real value is 8.82:1, and that is for **Rejected**, not
  Quarantined. The 11.6:1 end value does check out.
- **"35 components"** is correct against the live Storybook (25 composed + 10
  elements), but its label still reads *"counted in engineering audit"* — the
  number's actual source is the Storybook library, not an audit.
- **"14 device paths"** and **"12+ edge cases"** come from the provenance
  comment above the StatBand, not from anything re-checked this session.

### 4. Your local DRP repo is behind the deployed build

Local Storybook had 99 entries, the deployed phase2 build has 148. The counts in
the copy come from the **deployed** build. `git pull` on `wpit-drp-ux-pilot`
before you cite anything new from it.

### 5. Notion is now behind the site

`Case study copy: Device Registration (UCLA)` still holds the green/red markup
and was restored to that state deliberately. Everything since — the Mobbin
analysis, the Google round-trip direction, concept testing, stakeholder
interviews — exists **only in the TSX**. If Notion is your editing surface, it
needs re-syncing from the component.

---

## What changed today

**Content**
- Applied your green/red Notion edits to the component (not to Notion, which was
  reverted back to marked-up)
- Section 03 renamed *From Context to Working Code*; four layers
- Phase 2: Mobbin analysis (20 products, 43 flows, 6 dimensions), the
  "import never deletes" finding, Google Workspace round-trip direction,
  concept testing
- Stakeholder interviews added in two places
- Stage eyebrows are now selling phrases; numbers moved back inline

**Components built**
- `BeforeAfterSlider` — native range input, so drag/touch/arrows/Home/End and
  the slider role come from the platform. Callouts are DOM, not baked in.
- `FigureTabs` — full APG tabs pattern, roving tabindex, panels open in the
  lightbox
- `MediaNote` — framed still on the new `surface` token

**Design system**
- New tokens: `surface`, `title`, `stat`. `title`/`stat` took their exact
  previous values, so tokenising them changed nothing visually.
- **Mobile type ladder rebuilt**: 40 / 32 / 24 / 18 (was 32 / 25.6 / 24 / 18).
  h2 and h3 were 6% apart and read as one size. Desktop is untouched — these are
  clamp *floors*, desktop is governed by the caps.
- All four mirrors updated each time: `globals.css`, `tailwind.config.js`,
  `lib/tokens.ts`, `design.md`

**Imagery**
- 7 carousel screenshots recaptured as lossless PNG at 2732×1708 (2×). They were
  JPEG re-encoded to WebP — two lossy passes, which is what you were seeing as
  artefacts.
- `quality={90}` on screenshot images; default 75 rings small text
- Surname redaction: `Seelam` → `S.` across 5 captures and the hero. Logon IDs
  (`kseelam`) intentionally untouched — the redaction matches capitalised only.
- Stakeholder photo blur is **baked into the asset**, not a CSS filter. A filter
  still ships the original file.
- Favicon added, 404 cleared

---

## Gotchas worth knowing

- **`naturalWidth` lies.** It reads 0 for lazy images and races during decode. I
  chased phantom resolution failures for a while. Measure the served `w=` in the
  URL, or `curl` the `/_next/image` endpoint.
- **The desktop browser will not resize below ~528px.** Any "mobile" check in it
  silently tests the wrong breakpoint. Use `scripts/drp/audit-mobile.mjs`, which
  drives real device emulation at 390.
- **The rail's scrollspy hijacks programmatic scrolling.** Screenshotting a
  specific section usually needs two or three `scrollTo` calls with waits.
- **Restart the dev server after touching `tailwind.config.js` or
  `next.config.ts`.** It serves a stale bundle otherwise, and after a syntax
  error it can keep serving the pre-error build — which looks exactly like your
  edit not working.

---

## Scripts

Copied into `scripts/drp/` because they lived in a session temp folder that gets
cleaned up. Delete if you don't want them tracked.

| Script | What it does |
| --- | --- |
| `capture-drp.mjs` | Recaptures all 7 carousel screenshots from the live phase2 build. Logs in per role and **asserts** the role and the redaction, so it fails loudly rather than silently producing wrong screens. Run: `node scripts/drp/capture-drp.mjs <outdir>` |
| `audit-mobile.mjs` | The mobile test-plan pass at a true 390×844 |
| `console-check.mjs` | Console errors and warnings on load |
| `net404.mjs` | Any 4xx/5xx the page requests |
| `alpha.mjs` | Transparency and content percentage of a PNG — this is what found the 51% transparent layer image |

Two things `capture-drp.mjs` already caught that were invisible otherwise: the
app skips its role picker when a session exists (so every screen captured as
Basic User), and the Edit menu item renders as `edit\nEdit` with a Material
ligature, so an exact-text match never clicked.

---

## Suggested next

1. Commit today's work
2. Export the favicon as one SVG
3. Resolve the 8.81:1 figure and the "engineering audit" label
4. Chase the Adoption quote
5. Decide whether Notion stays a source of truth

The test plan is designed to be re-run: say *"test the DRP case study"* and every
criterion comes back pass or fail with the measured value.
