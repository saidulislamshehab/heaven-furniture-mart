import { chromium } from '@playwright/test'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const p = await ctx.newPage()
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.waitForSelector('.fixed.inset-0.z-\\[100\\]', { state: 'detached', timeout: 15000 }).catch(() => {})
console.log('hero ol display:', await p.locator('ol[aria-label="Hero films"]').evaluate((el) => getComputedStyle(el).display + ' classes=' + el.className))
// hidden utility present?
console.log('hidden rule present:', await p.evaluate(() => [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((r) => r.cssText.startsWith('.hidden')) } catch { return false } })))
await p.screenshot({ path: '/tmp/hfm-audit/m390-hero.jpg', quality: 60 })
// mobile menu
await p.getByRole('button', { name: 'Open menu' }).click(); await p.waitForTimeout(900)
await p.screenshot({ path: '/tmp/hfm-audit/m390-menu.jpg', quality: 60 })
await p.keyboard.press('Escape'); await p.waitForTimeout(800)
console.log('menu after esc:', await p.getByRole('dialog').count())
// assistant
await p.evaluate(() => scrollTo(0, 1200)); await p.waitForTimeout(800)
await p.getByRole('button', { name: /open assistant/ }).click(); await p.waitForTimeout(600)
await p.screenshot({ path: '/tmp/hfm-audit/m390-assistant.jpg', quality: 60 })
await p.getByRole('button', { name: 'Close assistant' }).click(); await p.waitForTimeout(400)
// why heaven pinned region on mobile: scroll to it and screenshot mid-way
const why = p.locator('#why')
const top = await why.evaluate((el) => el.getBoundingClientRect().top + window.scrollY)
for (const [i, f] of [[0, 0], [1, 0.25], [2, 0.5], [3, 0.8]]) {
  await p.evaluate((y) => scrollTo(0, y), top + f * 844 * 3.4); await p.waitForTimeout(1200)
  await p.screenshot({ path: `/tmp/hfm-audit/m390-why${i}.jpg`, quality: 60 })
}
// founder
const f = p.locator('#founder'); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200)
await p.evaluate(() => scrollBy(0, 500)); await p.waitForTimeout(1200)
await p.screenshot({ path: '/tmp/hfm-audit/m390-founder.jpg', quality: 60 })
await b.close()
