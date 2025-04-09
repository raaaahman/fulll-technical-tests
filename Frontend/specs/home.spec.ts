import { test, expect } from '@playwright/test';

test('The home page', async ({ page }) => {
  await page.goto('/');

  await test.step('has title', async () => {
    await expect(page).toHaveTitle(/Github Search/);
  })
});