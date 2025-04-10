import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

// eslint-disable-next-line jest/no-mocks-import
import users from "../src/__mocks__/github-users_q=mic.json";

// These tests use a mock API response to avoid hitting the Github API rate limits in development.
test.beforeEach(async ({ page }) => {
  const avatar = await fs.readFile(
    path.resolve(__dirname, "assets/avatar.svg")
  );

  page.route(/^http(s):\/\/api.github.com/, async (route) => {
    await route.fulfill({ status: 200, json: users });
  });

  page.route(/^http(s):\/\/avatars.githubusercontent.com/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: avatar,
    });
  });
});

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
