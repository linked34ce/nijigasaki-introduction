import { test, expect } from '@playwright/test';
import playwright from 'playwright';

test('Icons get unclickable after one of them clicked', async ({ page }) => {
  await page.goto('/');
  const yu = page.getByRole('img', { name: 'icon-yu' });
  const ayumu = page.getByRole('img', { name: 'icon-ayumu' });
  const kasumi = page.getByRole('img', { name: 'icon-kasumi' });
  await expect(yu).toBeVisible();
  await expect(ayumu).toBeVisible();
  await expect(kasumi).toBeVisible();
  await yu.click();
  try {
    await yu.click({
      timeout: 1000,
    });
    ayumu.click({
      timeout: 1000,
    });
    kasumi.click({
      timeout: 1000,
    });
  } catch (e) {
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (e instanceof playwright.errors.TimeoutError) {
      console.log('The icons are not clickable.');
    } else {
      throw new Error('One or more icons are clickable.');
    }
  }
  // Icons are still there although they cannot be seen
  await expect(yu).toBeVisible();
  await expect(ayumu).toBeVisible();
  await expect(kasumi).toBeVisible();
});
