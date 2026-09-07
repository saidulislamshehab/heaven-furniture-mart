import { chromium } from '@playwright/test'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
p.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 140)) })

// Refresh test ×3: intro → hero → hero text animates after intro
for (let i = 0; i < 3; i++) {
  await p.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
  const t0 = Date.now()
  const introVisible = await p.locator('[data-curtain]').isVisible().catch(() => false)
  // heading letters should still be hidden while intro shows
  const earlyOpacity = await p.locator('h1 span span span').first().evaluate((el) => getComputedStyle(el).opacity).catch(() => 'n/a')
  await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 }).catch(() => {})
  const introMs = Date.now() - t0
  await p.waitForTimeout(1800)
  const heroOpacity = await p.locator('h1 span span span').first().evaluate((el) => getComputedStyle(el).opacity)
  const htmlOverflow = await p.evaluate(() => document.documentElement.style.overflow)
  const canScroll = await p.evaluate(() => { scrollTo(0, 400); return scrollY })
  console.log(`refresh#${i}: intro=${introVisible} earlyLetterOpacity=${earlyOpacity} introMs=${introMs} heroLetterOpacity=${heroOpacity} htmlOverflow="${htmlOverflow}" scrolledTo=${canScroll}`)
  await p.evaluate(() => scrollTo(0, 0))
}

// Route test via mobile menu
const go = async (label) => {
  await p.evaluate(() => scrollBy(0, -120)); await p.waitForTimeout(700)
  await p.getByRole('button', { name: 'Open menu' }).click()
  await p.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: label }).click()
  await p.waitForTimeout(1300)
  const url = new URL(p.url()).pathname
  const y = await p.evaluate(() => scrollY)
  const dialogs = await p.getByRole('dialog').count()
  const overlays = await p.locator('[data-radix-portal], [data-curtain]').count()
  const bodyOverflow = await p.evaluate(() => getComputedStyle(document.body).overflow + '|' + document.documentElement.className)
  const intro = await p.locator('[data-curtain]').count()
  console.log(`route → ${label}: path=${url} scrollY=${Math.round(y)} openDialogs=${dialogs} portals=${overlays} body=${bodyOverflow} introReplayed=${intro > 0}`)
}
await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300)
await go('Shop'); await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300)
await go('About'); await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300)
await go('Visit'); await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300)
await go('Home')

// Fast scroll test on home: nothing stuck hidden after
const total = await p.evaluate(() => document.documentElement.scrollHeight)
for (let y = 0; y < total; y += 1200) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(30) }
await p.waitForTimeout(600)
const stuck = new Set()
for (let y = 0; y < total; y += 420) {
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(650)
  const h = await p.evaluate(() => {
    const out = []
    for (const el of document.querySelectorAll('h1,h2,h3,p,li,img,video')) {
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight * 0.65 || r.width === 0) continue
      let a = el, op = 1
      while (a && a !== document.body) { const cs = getComputedStyle(a); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') op = 0; a = a.parentElement }
      if (op < 0.05) out.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 30)} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 25)}"`)
    }
    return out
  })
  h.forEach((x) => stuck.add(x))
}
console.log('fast-scroll stuck-hidden:', [...stuck])
console.log('overflowX:', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth))
console.log('errors:', [...new Set(errs)])
await b.close()
