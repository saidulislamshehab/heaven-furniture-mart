import { test, expect } from '@playwright/test';

test.describe('Landing Page Smoke & Responsiveness', () => {
  test('should load the page and render the main container without horizontal overflow', async ({ page }) => {
    await page.goto('/');

    // Check document title
    await expect(page).toHaveTitle(/Heaven Furniture Mart|Vite/i);

    // Verify root container is visible
    const root = page.locator('#root');
    await expect(root).toBeVisible();

    // Check no horizontal scroll overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();
  });
});
