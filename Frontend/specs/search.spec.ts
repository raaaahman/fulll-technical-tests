import { test, expect } from "@playwright/test";

/**
 * This tests a nominal case for the search feature.
 */
test("The search feature", async ({ page }) => {
  await page.goto("/");

  await test.step("has title", async () => {
    await expect(page).toHaveTitle(/Github Search/);
  });

  await test.step("displays the App component", async () => {
    await expect(page.locator("body")).toMatchAriaSnapshot({
      name: "app.aria.yml",
    });
  });

  await test.step("displays a message for no results", async () => {
    await expect(
      page.getByText("Type into the search bar to search for Github users.")
    ).toBeVisible();
  });

  await test.step("displays a Card component for an individual user", async () => {
    const searchbox = await page.getByRole("searchbox");

    await searchbox.fill("mic");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("article").first()).toMatchAriaSnapshot({
      name: "user-card.aria.yml",
    });
  });
});
