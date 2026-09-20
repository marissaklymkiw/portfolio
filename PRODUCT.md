# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and design leaders** at product companies, evaluating
candidates for Senior and Staff Product Designer roles. They scan several
portfolios in a sitting, already know what a design system is, and are looking
for evidence of systems thinking, cross-functional influence, and craft. They
want to see how the work was done and what it changed, not only what it looked
like.

**Secondary: design recruiters** sourcing and screening for the same roles. They
move faster, often deciding in under two minutes whether to pass a profile along,
and may not have a design background. They are confirming seniority signals
(years, companies, titles, a visible body of work) before reading any prose.

Both arrive cold, usually from a link, and are deciding whether to keep reading.

## Product Purpose

The personal portfolio of Marissa Klymkiw, Staff Product Designer, currently at
UCLA. It exists to make a credible, scannable case for Staff-level hire across
design systems, AI-native workflows, and governance, backed by real case studies
rather than screenshots.

Success is a hiring manager reading at least one complete case study end to end
without leaving the site, and a recruiter confirming seniority within the first
screen.

## Positioning

Design-systems and governance depth, executed through an AI-native practice. The
combination is the claim: neither the systems experience alone nor the AI
workflow alone is the differentiator. The site itself is built with that
workflow, so it functions as evidence of the method it describes.

Supporting truth: 15+ years of experience; the work spans enterprise design
systems and their governance and adoption models, not only component libraries.

## Operating Context

Visitors arrive from a shared link (LinkedIn, email, recruiter outreach), often
on desktop but frequently on phone, and often mid-triage across a stack of other
candidates. Reading is short and interruptible. Link previews matter, because the
first impression is frequently the unfurled card rather than the page.

The site is also the working artifact of an AI-assisted build practice, so it is
edited far more often than a typical portfolio and must stay coherent under
frequent revision.

## Capabilities and Constraints

Shipped surfaces: home, about, work index and case studies, library, writing,
resume, contact.

`/ethos` was deleted 2026-09-20 at MK's direction. Its values material now lives
in the "How I work" band on /about; the route was hidden from the nav, still on
pre-Swiss tokens, and duplicated that band once About carried it.

- Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript.
- Notion API (`@notionhq/client`) backs the library; book covers are self-hosted.
- Resend (`resend`) sends the contact form, through the site's one route
  handler at `/api/contact`. It needs `RESEND_API_KEY`, `CONTACT_TO`, and
  `CONTACT_FROM` in the environment; without them the route answers 503 and the
  form tells the sender to email directly rather than dropping the message.
- Case studies are authored as React components under `app/work/[slug]/`, not
  MDX, despite what older docs describe.
- Deploys to Vercel. Env vars: `NOTION_API_KEY`, `NOTION_LIBRARY_DB_ID`,
  `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- `next build` must pass with zero errors before every deploy.
- Desktop-primary, fully responsive down to 375px.
- US, English only.
- Copy contains no em dashes. Use commas, colons, and periods instead.
- A card without a `slug` is a placeholder: it is not clickable and must not be
  presented as finished work.

The resume is a static PDF in `public/`, served at its descriptive filename so
it downloads under that name. `/resume` is the stable URL and 307s to it via
`redirects()` in `next.config.ts`; Nav and Footer both link `/resume` and open
it in a new tab. Updating next year means replacing the file and the one
redirect line, not the links.

Undecided, do not invent: the open graph image strategy.

## Brand Commitments

Name and byline: Marissa Klymkiw, Staff Product Designer, currently at UCLA.

Voice is plain, precise, systems-minded, first person. Things are named by what
they do. Signature line: *"The structure has to be right. So does the screen that
sits on top of it."*

The stated design philosophy is seven principles: the six Swiss canon (grid
systems, typography as the interface, white space by subtraction, objectivity,
reduction, clarity) plus a seventh, access is structural. Every animation,
gradient, and icon is interrogated against whether it aids understanding. See
DESIGN.md for the full argument.

## Evidence on Hand

Four case studies are real and launching:

| Study | Slug | Status |
|---|---|---|
| Device Registration (DRP) | `device-registration` | In progress |
| Indeed Vision | `indeed-vision` | Shipped, 2024 |
| Sourcing Analytics | `sourcing-analytics` | Shipped, 2024 |
| USC Guest Access | `usc-guest-access` | Shipped, 2021 |

Device Registration was cut from five competing arcs down to one. Option C is
the promoted study and is the only one routed, at `/work/device-registration`.
The other four component files (base, Trimmed, Impact, Anchor) remain in
`app/work/[slug]/` unreferenced, as a record of the options considered.

**Confidentiality: metrics are restricted.** Real internal figures, unreleased
work, and internal screens cannot be published as-is. Case-study numbers must be
directional or scrubbed. Never fabricate a metric to fill the gap, and never
sharpen a directional figure into a precise one.

Not on hand, and must not be invented: testimonials, named customers, benchmarks,
pricing, awards, or press.

## Product Principles

1. **Evidence over assertion.** Every seniority claim is backed by a case study a
   reader can open. If it cannot be shown, it is not claimed.
2. **Scannable first, readable second.** A recruiter deciding in two minutes and a
   hiring manager reading end to end are both first-class; the page must serve the
   scan without hollowing out the read.
3. **The method is part of the argument.** The site is built the way the practice
   works, so its own craft and coherence are load-bearing evidence.
4. **Restraint is the position.** Reduction and clarity are the stated philosophy;
   decoration that does not aid understanding undercuts the claim it decorates.
5. **Truth survives editing.** Under frequent AI-assisted revision, confirmed
   product facts, real metrics, and confidentiality limits hold. Placeholders stay
   visibly unfinished rather than quietly becoming claims.

## Accessibility & Inclusion

- WCAG 2.2 AA on all text and UI pairs.
- **Single light theme, no dark mode, ever.** Light reading surfaces are a medical
  requirement (astigmatism), not a preference. Do not author a
  `prefers-color-scheme: dark` block.
- `prefers-reduced-motion` respected.
- Visible focus ring on every interactive element; skip link in the root layout.
