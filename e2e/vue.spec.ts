import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(await page.locator('.circle').all()).toHaveLength(10);
});
