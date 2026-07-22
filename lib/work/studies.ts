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
    title: "One front door for every device that can’t log in for itself",
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
    title: "Recruiters were doing the work. They couldn’t see if it was working.",
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
  {
    slug: "usc-guest-access",
    title: "Redesigning guest access so students stop sharing their passwords",
    model: "B2C",
    category: "Enterprise UX",
    status: "Shipped · 2021",
    live: true,
    // The guests themselves — USC parents at orientation. Carries the human
    // problem the way the lab (DRP) and recruiter (Sourcing) photos do, rather
    // than a UI screenshot. Swap if a dedicated banner/composite gets exported.
    thumb: "/work/usc-guest-access/university-parent-orientation.jpg",
    thumbAlt:
      "Parents at a university orientation session — a Latino father in a cardinal 'PARENT' t-shirt with a 'Tony' name tag smiles at the front, among a diverse group of parents taking notes — the guests students needed a safe way to grant access to.",
  },
];
