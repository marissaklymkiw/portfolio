import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config.
 *
 * Runs against a PRODUCTION build (`next build && next start`), not `next dev`.
 * The gate depends on cookies and dynamic rendering, and dev and prod differ in
 * how they cache and render those, so testing dev would be testing something
 * other than what deploys. It is slower to boot and worth it.
 *
 * Port 3100 so a `next dev` on 3000 can stay running while these execute.
 *
 * NOTE: these tests need WORK_PASSWORD to match `PASSWORD` in
 * tests/e2e/gate.spec.ts. Both read from .env.local via next start.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"]],

  use: {
    baseURL: "http://localhost:3100",
    /* Artifacts only on failure: a green run should leave nothing behind. */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    /* The mobile project earns its place: the nav collapses to a hamburger at
       860px, the case-study rail disappears, and the metadata grid drops from
       four columns to two. Those are different layouts, not a narrower one. */
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],

  webServer: {
    command: "npm run build && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
