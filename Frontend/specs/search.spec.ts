/* eslint-disable jest/no-mocks-import */
import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

import {
  BASE_URL,
  HEADER_RATE_LIMIT_REMAINING,
  HEADER_RATE_LIMIT_RESET,
  PATH_SEARCH_USERS,
} from "../src/queries";
import { MESSAGE_RATE_LIMIT_EXCEEDED } from "../src/components/Feed/consts";
import users from "../src/__mocks__/github-users_q=mic.json";

test("Search feature finds results", async ({ page }) => {
  page.route(`${BASE_URL}${PATH_SEARCH_USERS}*`, (route) => {
    route.fulfill({
      status: 200,
      json: users,
      headers: {
        server: "playwright",
      },
    });
  });

  const avatarMock = await fs.readFile(
    path.resolve(__dirname, "../src/__mocks__/avatar.svg"),
    { encoding: "utf-8" }
  );

  console.log(avatarMock);

  page.route("https://avatars.githubusercontent.com/u/*", async (route) => {
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: avatarMock,
    });
  });

  await page.goto("/");

  await test.step("page has title", async () => {
    await expect(page).toHaveTitle(/Github Search/);
  });

  await test.step("page displays the App component", async () => {
    await expect(page.locator("body")).toMatchAriaSnapshot({
      name: "app.aria.yml",
    });
  });

  await test.step("page displays a message for no results", async () => {
    await expect(
      page.getByText("Type into the search bar to search for Github users.")
    ).toBeVisible();
  });

  await test.step("page displays a Card component for an individual user", async () => {
    const searchbox = await page.getByRole("searchbox");

    await searchbox.fill("mic");

    await expect(page.getByRole("article").first()).toMatchAriaSnapshot({
      name: "user-card.aria.yml",
    });
  });
});

test("Search feature hits API rate limit", async ({ page }) => {
  let apiCalls = 0;
  page.clock.install({ time: new Date("2025-04-14T14:00:00") });

  page.route(`${BASE_URL}${PATH_SEARCH_USERS}*`, (route) => {
    apiCalls++;
    route.fulfill({
      status: 403,
      headers: {
        "access-control-expose-headers": `${HEADER_RATE_LIMIT_REMAINING}, ${HEADER_RATE_LIMIT_RESET}`,
        [`${HEADER_RATE_LIMIT_REMAINING}`]: "0",
        [`${HEADER_RATE_LIMIT_RESET}`]: (2000).toString(),
        server: "playwright",
      },
    });
  });

  await page.goto("/");
  const searchbox = page.getByRole("searchbox");

  await test.step("page displays a message whenAPI rate limit is exceeded", async () => {
    await searchbox.fill("fulll");

    await expect(page.getByText(MESSAGE_RATE_LIMIT_EXCEEDED)).toBeVisible();
  });

  await test.step("page should not send additionnal request after API rate limit has been exceeded", async () => {
    await searchbox.fill("mic");

    // FIXME: Find a better way to assert that request hasNOT been sent.
    await page.waitForTimeout(1000);

    expect(apiCalls).toEqual(1);
  });

  await test.step("page be allowed to send request again after the API rate limit has been reset", async () => {
    page.clock.fastForward(3000);

    await searchbox.fill("goo");

    await page.waitForResponse((response) =>
      response.url().startsWith(BASE_URL)
    );

    expect(apiCalls).toEqual(2);
  });
});
