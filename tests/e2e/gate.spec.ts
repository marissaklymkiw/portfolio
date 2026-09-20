import { expect, test, type Page } from "@playwright/test";

/**
 * The case-study gate, end to end.
 *
 * This is the one feature on the site that a curl check cannot fully verify.
 * Unlocking is a client-side fetch followed by router.refresh(), so the
 * content appears through a React re-render rather than a page load, and the
 * cookie has to survive that. Only a real browser exercises that path.
 *
 * WHAT THESE ASSERT, in order of what actually matters:
 *   1. Locked pages do not SEND the protected content, not merely hide it.
 *   2. A wrong password fails without leaking whether it was close.
 *   3. The right password unlocks, and the unlock persists across navigation.
 *
 * Point 1 is checked against the raw response body, not the rendered DOM. A
 * DOM assertion would pass just as happily on a CSS-hidden page, which is the
 * exact failure mode this feature exists to avoid.
 */

const PASSWORD = process.env.WORK_PASSWORD ?? "marissa-2026";

const GATED = [
  "/work/device-registration",
  "/work/indeed-vision",
  "/work/sourcing-analytics",
] as const;

/** Text that only ever appears INSIDE a protected study. */
const SECRETS: Record<(typeof GATED)[number], string> = {
  "/work/device-registration": "62% of the backlog",
  "/work/indeed-vision": "31 overlapping customer jobs",
  "/work/sourcing-analytics": "rebuilding the story by hand",
};

async function unlock(page: Page, path: string) {
  await page.goto(path);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Unlock" }).click();
}

test.describe("locked", () => {
  for (const path of GATED) {
    test(`${path} sends no study content`, async ({ page, request }) => {
      /* The RAW BODY, deliberately. If this were page.content() it would also
         pass on a page that merely hid the content with CSS. */
      const body = await (await request.get(path)).text();
      expect(body).not.toContain(SECRETS[path]);
      expect(body).not.toContain("</article>");

      await page.goto(path);
      await expect(
        page.getByRole("heading", { name: "Shared on request" }),
      ).toBeVisible();
      await expect(page.getByLabel("Password")).toBeVisible();
    });
  }

  test("title and robots do not leak the real headline", async ({ request }) => {
    const res = await request.get("/work/device-registration");
    const body = await res.text();
    expect(await (await request.get("/work/device-registration")).text()).toContain(
      "Protected case study",
    );
    /* The real title carries the delta; that is the thing not to publish in a
       tab, a search result, or an unfurled link card. */
    expect(body).not.toContain("2–3 business days");
    expect(body).toContain("noindex");
  });

  test("the stage index is not rendered", async ({ page }) => {
    await page.goto("/work/indeed-vision");
    /* An index of sections the reader cannot open is a list of closed doors,
       and every anchor would point at an id absent from the document. */
    await expect(
      page.getByRole("navigation", { name: "Case study stages" }),
    ).toHaveCount(0);
  });

  test("a wrong password is rejected and stays rejected", async ({ page }) => {
    await page.goto("/work/indeed-vision");
    await page.getByLabel("Password").fill("definitely-not-it");
    await page.getByRole("button", { name: "Unlock" }).click();

    await expect(page.getByText("That password did not work.")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByText("31 overlapping customer jobs")).toHaveCount(0);
  });

  test("a forged cookie does not unlock", async ({ page, context }) => {
    await context.addCookies([
      {
        name: "mk_work",
        value: "deadbeefdeadbeef",
        url: "http://localhost:3100",
      },
    ]);
    await page.goto("/work/indeed-vision");
    await expect(
      page.getByRole("heading", { name: "Shared on request" }),
    ).toBeVisible();
  });
});

test.describe("unlocked", () => {
  test("the right password reveals the study without a reload", async ({
    page,
  }) => {
    await unlock(page, "/work/indeed-vision");

    /* No waitForNavigation: router.refresh() re-renders in place, so this is
       asserting the content arrives WITHOUT a document load. */
    await expect(page.getByText("31 overlapping customer jobs")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Shared on request" }),
    ).toHaveCount(0);
  });

  test("the unlock carries across studies", async ({ page }) => {
    await unlock(page, "/work/indeed-vision");
    await expect(page.getByText("31 overlapping customer jobs")).toBeVisible();

    /* One password, all three. A reader who unlocks one should not be asked
       again when they follow the next-study link. */
    for (const path of GATED) {
      await page.goto(path);
      await expect(
        page.getByRole("heading", { name: "Shared on request" }),
      ).toHaveCount(0);
    }
  });

  test("the stage index returns on desktop and stays away on mobile", async ({
    page,
  }, testInfo) => {
    await unlock(page, "/work/indeed-vision");
    await expect(page.getByText("31 overlapping customer jobs")).toBeVisible();

    /* Asserted per project rather than skipped on mobile, because the absence
       IS the intended behaviour there: a sticky index that eats a third of a
       phone viewport is worse than no index. The rail is `hidden md:block`, so
       under md it is display:none and therefore out of the accessibility tree,
       which is why a role locator finds nothing. The mobile "Go back" link is
       what keeps a long study from being a one-way trip. */
    const rail = page.getByRole("navigation", { name: "Case study stages" });
    const onMobile = testInfo.project.name === "mobile";

    await expect(rail).toHaveCount(onMobile ? 0 : 1);
    if (onMobile) {
      await expect(page.getByRole("link", { name: "Go back" })).toBeVisible();
    }
  });
});
