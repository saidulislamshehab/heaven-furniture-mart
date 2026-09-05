import { test, expect } from '@playwright/test';

const routes = ['/', '/shop', '/about', '/visit'];

for (const route of routes) {
  test(`${route} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(/Heaven Furniture Mart/i);
    await expect(page.locator('#main')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBeFalsy();
  });
}

test('primary CTA opens the consultation dialog and validates', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /request a consultation/i }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: /tell us about your room/i })).toBeVisible();
  await dialog.getByRole('button', { name: /continue on whatsapp/i }).click();
  await expect(dialog.getByRole('alert').first()).toBeVisible();
});

test('shop filters by category via URL', async ({ page }) => {
  await page.goto('/shop?category=bedroom');
  await expect(page.getByRole('heading', { level: 1, name: /bedroom/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bedroom', pressed: true })).toBeVisible();
});

test('unknown routes show the 404 page', async ({ page }) => {
  await page.goto('/nowhere');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/hasn't been built yet/i);
});
