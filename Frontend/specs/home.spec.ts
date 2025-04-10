import { test, expect } from "@playwright/test";

// eslint-disable-next-line jest/no-mocks-import
import users from "../src/__mocks__/github-users_q=mic.json";

// These tests use a mock API response to avoid hitting the Github API rate limits in development.
test.beforeEach(({ page }) => {
  page.route(/^http(s):\/\/api.github.com/, (route) => {
    route.fulfill({ json: users });
  });
});

/**
 * This tests the App component against ARIA snapshot.
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

  await test.step("displays a Card component for an individual user", async () => {
    const searchbox = await page.getByRole("searchbox");

    await searchbox.fill("mic");

    await expect(page.getByRole("article").first()).toMatchAriaSnapshot({
      name: "user-card.aria.yml",
    });
  });
});
