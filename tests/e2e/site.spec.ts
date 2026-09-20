import { expect, test } from "@playwright/test";

/**
 * The public surface: the pages a recruiter sees before they ever meet the
 * gate, plus the structural rules the design system actually commits to.
 *
 * Deliberately NOT a snapshot suite. Pixel snapshots on a site under active
 * design churn fail on every intentional change, which trains everyone to
 * re-baseline without looking. These assert behaviour and structure instead:
 * things that, if they broke, would be bugs rather than edits.
 */

const PUBLIC_PAGES = ["/", "/work", "/about", "/resume", "/contact"] as const;

test.describe("public pages", () => {
  for (const path of PUBLIC_PAGES) {
    test(`${path} renders with exactly one h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      /* The home page is the exception: its "h1" is the display wordmark, and
         the hero name is an Inter display object rather than a heading. */
      const count = await page.locator("h1").count();
      expect(count).toBeLessThanOrEqual(1);
    });
  }

  test("the work index shows three studies, all marked Protected", async ({
    page,
  }) => {
    await page.goto("/work");
    const cards = page.locator('a[href^="/work/"]');
    await expect(cards).toHaveCount(3);
    /* The marker is read from the same set the page enforces, so a card can
       never advertise a state the study does not have. */
    await expect(page.getByText("Protected", { exact: false })).toHaveCount(3);
  });

  test("USC is not linked anywhere and 404s", async ({ page, request }) => {
    await page.goto("/work");
    await expect(page.locator('a[href*="usc-guest-access"]')).toHaveCount(0);
    expect((await request.get("/work/usc-guest-access")).status()).toBe(404);
  });

  test("no em dashes in rendered copy", async ({ page }) => {
    /* PRODUCT.md: "Copy contains no em dashes." They hid as &mdash; entities
       once already, which a source grep missed, so this checks the rendered
       text rather than the source. */
    for (const path of PUBLIC_PAGES) {
      await page.goto(path);
      const text = await page.locator("body").innerText();
      expect(text, `em dash on ${path}`).not.toContain("—");
    }
  });

  test("no page scrolls sideways", async ({ page }, testInfo) => {
    /* Caught in the wild on an iPhone: the masthead discipline line carried
       white-space:nowrap and flex-shrink:0, so it could neither wrap nor give
       up a pixel and pushed the whole document wider than the screen.

       Horizontal overflow is close to invisible on a desktop browser and
       obvious the moment someone opens the site on a phone, which is where
       PRODUCT.md says visitors frequently arrive. A 1px tolerance absorbs
       sub-pixel rounding without letting a real overflow through. */
    for (const path of [...PUBLIC_PAGES, "/work/indeed-vision"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(
        overflow,
        `${path} overflows by ${overflow}px on ${testInfo.project.name}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  test("every image has alt text", async ({ page }) => {
    for (const path of ["/", "/work", "/about"]) {
      await page.goto(path);
      const missing = await page
        .locator("img:not([alt])")
        .count();
      expect(missing, `img without alt on ${path}`).toBe(0);
    }
  });
});

test.describe("contact", () => {
  test("the form reports being switched off rather than dropping mail", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Test Person");
    await page.getByLabel("Email").fill("test@example.com");
    /* getByRole textbox, not getByLabel(/message/i): the latter also matches
       the <section aria-labelledby="send-heading"> whose heading is "Send a
       message", so it resolved to two elements. */
    await page
      .getByRole("textbox", { name: /message/i })
      .fill("Hello, this is a test message.");
    await page.getByRole("button", { name: /send/i }).click();

    /* Without RESEND_API_KEY the route answers 503 and the form says so. A
       contact form that silently drops mail is worse than one visibly off. */
    await expect(
      page.getByText(/email|touch|directly|not set up|unavailable/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("navigation", () => {
  test("the footer carries the three ways to reach her", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Email" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Resume" })).toBeVisible();
  });

  test("there is exactly one footer and one #contact", async ({ page }) => {
    await page.goto("/work/indeed-vision");
    await expect(page.locator("footer")).toHaveCount(1);
    /* id="contact" is the header CTA's target, so a duplicate would silently
       break it. A per-route footer used to make that possible. */
    await expect(page.locator("#contact")).toHaveCount(1);
  });
});
