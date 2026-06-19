# /work — case studies (scaffold only)

This folder is reserved for the case-study route. **No pages are built yet.**

When ready, add a dynamic route at `app/work/[slug]/page.tsx`. It will inherit
all design tokens (`globals.css` `@theme`) and every component in
`components/ui` and `components/svg` — no restyling needed.

The case-study data shape is already defined in
[`lib/work/types.ts`](../../lib/work/types.ts), following the five-stage spine
from `DESIGN_NOTES.md`:

> Problem → Approach → System Built (phased) → Adoption → Impact

…plus an optional downstream engineer/stakeholder quote, the key social-proof
slot. The `<Metrics>` component is built to drop straight into the Impact
stage.
