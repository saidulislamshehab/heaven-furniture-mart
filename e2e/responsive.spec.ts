import { test, expect } from '@playwright/test';

const targetViewports = [
  // Mobile
  { name: 'Mobile 320x568 (iPhone SE 1st gen)', width: 320, height: 568 },
  { name: 'Mobile 360x800 (Android compact)', width: 360, height: 800 },
  { name: 'Mobile 375x812 (iPhone Mini)', width: 375, height: 812 },
  { name: 'Mobile 390x844 (iPhone 14)', width: 390, height: 844 },
  { name: 'Mobile 412x915 (Pixel 7)', width: 412, height: 915 },
  { name: 'Mobile 430x932 (iPhone Pro Max)', width: 430, height: 932 },
  // Landscape Mobile
  { name: 'Landscape 568x320', width: 568, height: 320 },
  // Tablet
  { name: 'Tablet 768x1024 (iPad)', width: 768, height: 1024 },
  { name: 'Tablet 820x1180 (iPad Air)', width: 820, height: 1180 },
  // Laptop & Desktop
  { name: 'Laptop 1024x768', width: 1024, height: 768 },
  { name: 'Laptop 1280x720', width: 1280, height: 720 },
  { name: 'Laptop 1366x768', width: 1366, height: 768 },
  { name: 'Desktop 1440x900', width: 1440, height: 900 },
  { name: 'Desktop 1600x900', width: 1600, height: 900 },
  { name: 'Large Desktop 1920x1080', width: 1920, height: 1080 },
];

for (const vp of targetViewports) {
  test.describe(`${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test('no horizontal overflow on homepage', async ({ page }) => {
      await page.goto('/');
      // Wait for page to load
      await expect(page.locator('#main')).toBeVisible();

      // Check for horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(overflow, `Page horizontally overflowed viewport width ${vp.width}px`).toBeFalsy();
    });

    test('hero headline and CTA are visible', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('button', { name: /start your design/i })).toBeVisible();
    });

    test('fast scroll through entire page without errors or layout breaks', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto('/');
      await expect(page.locator('#main')).toBeVisible();

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      await page.waitForTimeout(300);

      // Verify no horizontal overflow at the bottom
      const overflowBottom = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflowBottom).toBeFalsy();

      // Scroll back to top
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(200);

      // Verify no critical JavaScript uncaught exceptions
      const criticalErrors = consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('rate limit'));
      expect(criticalErrors).toHaveLength(0);
    });

    if (vp.width < 1024) {
      test('mobile navigation drawer opens, locks scroll, and closes cleanly', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#main')).toBeVisible();

        const menuBtn = page.getByRole('button', { name: /open menu/i });
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();

        const closeBtn = page.getByRole('button', { name: /close menu/i });
        await expect(closeBtn).toBeVisible();

        // Verify body scroll is locked
        const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
        expect(bodyOverflow).toBe('hidden');

        // Verify mobile nav links are displayed
        const shopLink = page.getByRole('link', { name: /shop/i }).first();
        await expect(shopLink).toBeVisible();

        // Close menu
        await closeBtn.click();
        await expect(closeBtn).not.toBeVisible();

        // Verify body scroll is restored
        const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
        expect(restoredOverflow).toBe('');
      });
    }

    test('consultation modal opens and is contained', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: /start your design/i }).first().click();

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: /tell us about your room/i })).toBeVisible();

      // Ensure dialog does not horizontally overflow viewport
      const dialogBox = await dialog.boundingBox();
      expect(dialogBox).not.toBeNull();
      if (dialogBox) {
        expect(dialogBox.width).toBeLessThanOrEqual(vp.width);
      }
    });
  });
}
