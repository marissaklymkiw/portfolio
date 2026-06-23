import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints/common";
import type { Book, BookCategory } from "./library";
import { books as staticBooks } from "./library";

// In @notionhq/client v5, queries go through dataSources.query with the
// collection ID (data source ID), not databases.query + database ID.
const DS_ID = process.env.NOTION_LIBRARY_DS_ID;
const API_KEY = process.env.NOTION_API_KEY;

function getText(page: PageObjectResponse, name: string): string {
  const prop = page.properties[name];
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
  return "";
}

function getSelect(page: PageObjectResponse, name: string): string | undefined {
  const prop = page.properties[name];
  if (!prop || prop.type !== "select") return undefined;
  return prop.select?.name ?? undefined;
}

function getNumber(page: PageObjectResponse, name: string): number | undefined {
  const prop = page.properties[name];
  if (!prop || prop.type !== "number") return undefined;
  return prop.number ?? undefined;
}

function getCheckbox(page: PageObjectResponse, name: string): boolean | undefined {
  const prop = page.properties[name];
  if (!prop || prop.type !== "checkbox") return undefined;
  return prop.checkbox || undefined;
}

async function resolveCoverUrl(isbn: string): Promise<string | undefined> {
  // Apple Books first — consistently sharp, high-res art (we upscale the
  // 100×100 thumbnail URL to 600×600, which Apple serves at full quality)
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${isbn}&entity=ebook`,
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data = await res.json();
      const art: string | undefined = data.results?.[0]?.artworkUrl100;
      if (art) return art.replace("100x100bb", "600x600bb");
    }
  } catch { /* fall through */ }

  // Google Books next — publisher-supplied images are higher quality
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&fields=items(volumeInfo(imageLinks))`,
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data = await res.json();
      const thumb: string | undefined =
        data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      if (thumb) {
        return thumb
          .replace("http://", "https://")
          .replace("&edge=curl", "")
          .replace("zoom=1", "zoom=0");
      }
    }
  } catch { /* fall through */ }

  // Open Library as fallback
  const olUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  try {
    const res = await fetch(olUrl, {
      method: "HEAD",
      next: { revalidate: 86400 },
    });
    const len = Number(res.headers.get("content-length") ?? 0);
    // Open Library's "no cover" placeholder is a 43-byte 1×1 GIF
    if (len > 1000) return olUrl;
  } catch { /* fall through */ }

  return undefined;
}

export async function getLibraryBooks(): Promise<Book[]> {
  if (!API_KEY || API_KEY.startsWith("your_") || !DS_ID) {
    return staticBooks;
  }

  try {
    const notion = new Client({ auth: API_KEY });
    const response = await notion.dataSources.query({
      data_source_id: DS_ID,
      sorts: [{ property: "Title", direction: "ascending" }],
    });

    const raw = response.results.filter(isFullPage).map((page) => ({
      title: getText(page, "Title"),
      author: getText(page, "Author"),
      category: (getSelect(page, "Category") ?? "Design") as BookCategory,
      note: getText(page, "Note") || undefined,
      published: getText(page, "Published") || undefined,
      status: getSelect(page, "Status") as Book["status"] | undefined,
      isbn: getText(page, "ISBN") || undefined,
      coverUrl: getText(page, "Cover URL") || undefined,
      publisher: getText(page, "Publisher") || undefined,
      format: getSelect(page, "Format") as Book["format"] | undefined,
      pages: getNumber(page, "Pages"),
      rating: getNumber(page, "Rating"),
      signed: getCheckbox(page, "Signed"),
    }));

    return Promise.all(
      raw.map(async (book) => {
        if (!book.coverUrl && book.isbn) {
          const resolved = await resolveCoverUrl(book.isbn);
          return { ...book, coverUrl: resolved };
        }
        return book;
      })
    );
  } catch {
    return staticBooks;
  }
}
