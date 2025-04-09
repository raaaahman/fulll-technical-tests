import { test, expect } from "@playwright/test";

/**
 * This tests the home page components against ARIA snapshots.
 */
test("The home page", async ({ page }) => {
  await page.goto("/");

  await test.step("has title", async () => {
    await expect(page).toHaveTitle(/Github Search/);
  });

  await test.step("displays the App component", async () => {
    await expect(page.locator("body")).toMatchAriaSnapshot({
      name: "app.aria.yml",
    });
  });
});
