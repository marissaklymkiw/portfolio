/**
 * Work index — the card-level summary of every study, shared by the home page's
 * <SelectedWork> grid and the /work landing page so the two never drift. This is
 * the ONE place to add a study: append here and it appears in both grids. The
 * richer per-study case-study content type lives beside this in ./types.ts.
 *
 * Published studies (`slug` set) link to /work/[slug] and render their photo.
 * Placeholders (no `slug`) render the generative canvas and are NOT clickable —
 * no dead routes.
 */
export type Study = {
  slug?: string;
  title: string;
  /** optional — a card is title-only unless a summary earns its place */
  summary?: string;
  /** business model — kept on ONE axis so the tags read as the same kind of
      label (mixing "Enterprise", a software-type, with "B2B", a business model,
      looked inconsistent side by side). Every study is B2B enterprise except
      Guest Access, which serves consumers (students/parents) → B2C. The Category
      field does the differentiating; this column just states who's served. */
  model?: string;
  category: string;
  status: string;
  live?: boolean;
  thumb?: string;
  thumbAlt?: string;
};

export const studies: Study[] = [
  {
    slug: "device-registration",
    /* Must match the study's own h1, same as the other cards: the card and the
       page headline are the same promise seen twice, so a reader who clicks
       lands on the sentence they clicked. */
    title:
      "Transforming wait times from 2–3 business days to less than 24 hours: registering campus devices",
    model: "B2B",
    category: "Platform Design",
    status: "In progress",
    thumb: "/work/device-registration/lab-researcher.jpg",
    thumbAlt:
      "A researcher at a microscope, its readings streaming to the monitor beside her.",
  },
  {
    slug: "indeed-vision",
    title: "Every team was shipping analytics. Nobody was shipping a direction.",
    model: "B2B",
    category: "Vision Design",
    status: "Shipped · 2024",
    live: true,
    // Betty, not the JTBD board. The card wants the image that carries the
    // problem — same reason DRP leads with the lab photo rather than the portal
    // screenshot. The board is dense evidence; at card size it would be mush.
    thumb: "/work/indeed-vision/betty-coherence.png",
    thumbAlt:
      "A person at the center holding together scattered, disconnected charts in separate colour families on either side.",
  },
  {
    slug: "sourcing-analytics",
    /* Must match the study's own h1. The card and the page headline are the
       same promise seen twice, so a reader who clicks lands on the sentence
       they clicked. */
    title: "The team was doing the work. Managers couldn’t see what was working.",
    model: "B2B",
    category: "Product Design",
    status: "Shipped · 2024",
    live: true,
    // The problem, as a face: a recruiter mid-effort, wondering whether it's
    // working. Same reason DRP leads with the lab photo — the card wants the
    // image that carries the problem, not a screenshot of the solution.
    thumb: "/work/sourcing-analytics/intense-focus.jpg",
    thumbAlt:
      "A recruiter at her desk, hand to her chin and brow slightly furrowed, studying a spreadsheet on her monitor with a laptop and open notebook in front of her.",
  },
  /* USC Guest Access is held back from the first launch. Its component and its
     images are still on disk and its card entry is recoverable from git, so
     republishing is a matter of restoring this entry and its route in
     app/work/[slug]/page.tsx. It is omitted rather than left as a slug-less
     placeholder because the study is finished, and a placeholder card would
     present finished work as unfinished. */
];
