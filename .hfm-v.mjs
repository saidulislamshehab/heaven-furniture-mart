import { chromium } from '@playwright/test'
const b = await chromium.launch()
for (const [name, w, h, mobile] of [['m390', 390, 844, true], ['m320', 320, 568, true], ['t768', 768, 1024, false], ['d1440', 1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile })
  const p = await ctx.newPage()
  const errs = []
  p.on('pageerror', (e) => errs.push(e.message))
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForSelector('.fixed.inset-0.z-\\[100\\]', { state: 'detached', timeout: 15000 }).catch(() => {})
  await p.waitForTimeout(500)
  await p.screenshot({ path: `/tmp/hfm-audit/v-${name}-hero.jpg`, quality: 60 })
  const why = p.locator('#why')
  const top = await why.evaluate((el) => el.getBoundingClientRect().top + window.scrollY)
  const shots = mobile ? [0, 0.45, 0.9] : [0, 0.5, 0.95]
  const secH = await why.evaluate((el) => el.getBoundingClientRect().height)
  for (const [i, f] of shots.entries()) {
    // walk gradually so scroll-driven pieces update
    const target = top + f * (secH - h * 0.6)
    let y = await p.evaluate(() => scrollY)
    while (y < target) { y = Math.min(target, y + h * 0.5); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(90) }
    await p.waitForTimeout(1000)
    await p.screenshot({ path: `/tmp/hfm-audit/v-${name}-why${i}.jpg`, quality: 60 })
  }
  console.log(name, 'why height', Math.round(secH), 'errors', errs)
  await ctx.close()
}
await b.close()
