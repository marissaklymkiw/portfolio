# Project Context Document
**Project:** Marissa Klymkiw — 2026 Portfolio
**Date:** 2026-06-19
**Source:** Approved portfolio build plan
**Version:** 1.0

---

## 1. Problem Statement

Marissa needs a portfolio site that demonstrates her expertise as a Senior/Staff Product Designer specializing in design systems — one that can be shared with hiring managers evaluating her for senior and staff-level roles. The current site has a coherent design system and live pages for home, about, and ethos, but the work section is a placeholder, the library is a static text list, and several pages are unfinished. The site is not yet ready to share professionally.

## 2. ICP (Ideal Customer Profile)

**Hiring managers and design leaders** at product companies evaluating candidates for Senior or Staff Product Designer roles. They are scanning multiple portfolios quickly, looking for evidence of systems thinking, cross-functional influence, and craft. They already know what a design system is and don't need it defined. They want to see how Marissa worked, what she built, and what impact it had — not just what it looked like.

**Design recruiters** sourcing and screening candidates for senior and staff design roles. They are moving faster than hiring managers, often deciding in under two minutes whether to pass a profile along. They need to quickly confirm seniority signals — years of experience, company names, role titles, and a visible body of work — before reading any case study prose. They may not have a deep design background themselves, so clarity and scanability matter more than nuance.

## 3. Pain Points

- The `/work` section is a placeholder — there is nothing to evaluate.
- The library is a plain text list with no visual interest, making it hard to skim and easy to overlook.
- The resume page goes nowhere.
- A hiring manager landing on the site today would have to leave before seeing any case study work.

## 4. Proposed Solution

- **Work section:** 3–4 case studies at `/work/[slug]` following a consistent structure (problem → approach → outcome → metrics). An index page at `/work` shows cards with cover image, company, title, and tags.
- **Library rework:** Replace the static text list with a cover-art grid powered by Notion as a CMS. Books are browsable by category or curated picks. Cover images sourced from Open Library by ISBN, with a color tile fallback.
- **Resume redirect:** `/resume` redirects to a hosted PDF.
- **Writing:** Remains a placeholder for now.

## 5. Success Metrics

- A hiring manager can read at least one complete case study end-to-end without leaving the site.
- The library displays all books with covers at launch; cover load failure rate is below 10%.
- `next build` passes with zero errors before every deploy.
- All pages pass WCAG 2.1 AA (verified via `/design:accessibility-review`).
- The site deploys to Vercel with no manual intervention beyond env var setup.

## 6. Design Constraints

**Platform:** Web (desktop-primary, fully responsive to 375px)
**Geography:** US, English only
**Accessibility:** WCAG 2.2 AA on all text and UI pairs. `prefers-reduced-motion` respected. Focus ring present on all interactive elements. Skip link in root layout.
**Technical:**
- Next.js 15 / React 19 / Tailwind CSS v4 / TypeScript
- Notion API (`@notionhq/client`) for library CMS
- Open Library Covers API for book cover images (no Supabase at launch; can be added later)
- MDX (`@next/mdx`, `@mdx-js/react`, `gray-matter`) for case study content
- Vercel deployment; env vars `NOTION_API_KEY`, `NOTION_LIBRARY_DB_ID`, `NEXT_PUBLIC_SITE_URL`
- No dark mode (intentional; astigmatism)
**Other:**
- No em dashes in any user-facing copy (commas and periods only)
- Hero treatment (graph background, marker highlight) is home-only — interior pages use a plainer header
- Yellow is used as punctuation (one or two instances per screen), never as a dominant fill

## 7. Open Questions

1. Which PDF hosting URL will the resume redirect point to? (Dropbox, Google Drive, or `/public/resume.pdf` in the repo)
2. Which 3–4 case studies are launching? Are there existing write-ups from the old portfolio site to pull from, or are all being written fresh?
3. Should the `/work` index show all case studies, or should one be featured/highlighted above the rest?
4. What happens when a book's ISBN is not found in Open Library? Is the color tile fallback enough, or should there be a way to supply a manual cover URL without Supabase?
5. Should the view switcher on `/library` be client-side (instant filter, no reload) or server-side?

## 8. Gaps

1. **Case study content** — No prose, images, or metrics have been drafted yet for any case study. This is the largest gap and will block the `/work` section entirely until resolved.
2. **Resume PDF** — No hosted PDF URL exists yet. The resume redirect cannot be wired until this is available.
3. **Notion database** — The database has not been created yet. The library Notion integration cannot begin until the DB is set up and the API key is obtained.
4. **Cover image fallback strategy** — The color tile fallback is noted but the color values per book have not been defined. Need to decide whether to hardcode a palette, derive from category, or leave as a neutral.
5. **OG images** — No open graph image strategy is defined. Needed before the site is shared publicly so links preview correctly on LinkedIn and in messages.

---

*Generated by /project-context skill. Add to this document as decisions are made and questions are resolved.*
