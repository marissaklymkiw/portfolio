/**
 * Library content — the books I read and return to, design first.
 *
 * NOTE: the entries below are PLACEHOLDER examples so the page renders and the
 * layout can be reviewed. Replace `books` with the real list when ready — the
 * page reads from this array and groups by `category`, showing Design first and
 * most prominently (see app/library/page.tsx). If `books` is empty, each
 * section degrades to a quiet empty state.
 */

export type BookCategory = "Design" | "Systems" | "Craft & career" | "Adjacent";

/** Section order on the page. "Design" leads; everything after is secondary. */
export const categoryOrder: BookCategory[] = [
  "Design",
  "Systems",
  "Craft & career",
  "Adjacent",
];

export type Book = {
  title: string;
  author: string;
  category: BookCategory;
  /** one-line why it matters / what it changed */
  note?: string;
  /** year read, or first read */
  year?: string;
  /** optional reading state, shown as a small mono tag */
  status?: "Now reading" | "Re-reading";
};

export const books: Book[] = [
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Design",
    note: "Affordances and signifiers — the vocabulary I still use to explain why something feels broken.",
    year: "2014",
  },
  {
    title: "Articulating Design Decisions",
    author: "Tom Greever",
    category: "Design",
    note: "Influence without authority, in book form. The closest thing to my actual job.",
    year: "2021",
    status: "Now reading",
  },
  {
    title: "Refactoring UI",
    author: "Adam Wathan & Steve Schoger",
    category: "Design",
    note: "The fastest gap-closer between a systems brain and a surface that actually looks finished.",
    year: "2019",
    status: "Re-reading",
  },
  {
    title: "Atomic Design",
    author: "Brad Frost",
    category: "Design",
    note: "The mental model under every component library I've built since.",
    year: "2016",
  },
  {
    title: "Thinking with Type",
    author: "Ellen Lupton",
    category: "Design",
    note: "Type as a system with rules, not decoration applied at the end.",
    year: "2018",
  },
  {
    title: "Thinking in Systems",
    author: "Donella Meadows",
    category: "Systems",
    note: "Stocks, flows, and leverage points — the literal source of how I frame a problem.",
    year: "2017",
  },
  {
    title: "Team Topologies",
    author: "Matthew Skelton & Manuel Pais",
    category: "Systems",
    note: "Why org structure ends up encoded in the product, whether you meant it to or not.",
    year: "2021",
  },
  {
    title: "Inspired",
    author: "Marty Cagan",
    category: "Craft & career",
    note: "The product-team operating model I argue from when I push past the spec.",
    year: "2019",
  },
  {
    title: "Range",
    author: "David Epstein",
    category: "Adjacent",
    note: "Why generalists compound — permission to keep working across every layer.",
    year: "2020",
  },
];
