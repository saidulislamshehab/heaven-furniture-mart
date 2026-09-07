import { chromium } from '@playwright/test'
const b = await chromium.launch()
// 1) Intro mid-animation at 320 and landscape
for (const [name, w, h] of [['m320', 320, 568], ['land844', 844, 390]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5173/', { waitUntil: 'commit' })
  await p.waitForSelector('[data-mart]', { timeout: 10000 }).catch(() => {})
  await p.waitForTimeout(1900)
  await p.screenshot({ path: `/tmp/hfm-audit/x-${name}-intro.jpg`, quality: 60 })
  const heaven = await p.locator('[data-heaven]').evaluate((el) => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), sw: el.scrollWidth, cw: el.clientWidth, left: Math.round(r.left), right: Math.round(innerWidth - r.right) } }).catch(() => null)
  console.log(name, 'HEAVEN box', heaven)
  await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 }).catch(() => {})
  await p.waitForTimeout(2600)
  await p.screenshot({ path: `/tmp/hfm-audit/x-${name}-hero.jpg`, quality: 60 })
  if (name === 'land844') {
    await p.getByRole('button', { name: 'Open menu' }).click(); await p.waitForTimeout(1000)
    await p.screenshot({ path: `/tmp/hfm-audit/x-${name}-menu.jpg`, quality: 60 })
    await p.keyboard.press('Escape'); await p.waitForTimeout(600)
  }
  await ctx.close()
}
// 2) Laptop bespoke roll + collections pin at 1024x768 and 1280x720
for (const [name, w, h] of [['l1024', 1024, 768], ['l1280', 1280, 720]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 }).catch(() => {})
  const sec = p.locator('#bespoke')
  const top = await sec.evaluate((el) => el.getBoundingClientRect().top + scrollY)
  const roll = await sec.locator('.relative.hidden.h-screen').first().evaluate((el) => el.getBoundingClientRect().top + scrollY).catch(() => top)
  let y = 0
  for (const target of [roll, roll + h * 1.9]) {
    while (y < target) { y = Math.min(target, y + h * 0.6); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(80) }
    await p.waitForTimeout(900)
    await p.screenshot({ path: `/tmp/hfm-audit/x-${name}-bespoke${target === roll ? 0 : 1}.jpg`, quality: 60 })
  }
  await ctx.close()
}
// 3) Reduced motion mobile: everything visible
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 }).catch(() => {})
  await p.waitForTimeout(500)
  const total = await p.evaluate(() => document.documentElement.scrollHeight)
  const stuck = new Set()
  for (let y = 0; y < total; y += 500) {
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250)
    const h = await p.evaluate(() => {
      const out = []
      for (const el of document.querySelectorAll('h1,h2,h3,p,li,img,video')) {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > innerHeight * 0.8 || r.width === 0) continue
        let a = el, op = 1
        while (a && a !== document.body) { const cs = getComputedStyle(a); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') op = 0; a = a.parentElement }
        if (op < 0.05) out.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 30)} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 25)}"`)
      }
      return out
    })
    h.forEach((x) => stuck.add(x))
  }
  console.log('reduced-motion mobile hidden:', [...stuck], 'height', total)
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300)
  await p.screenshot({ path: '/tmp/hfm-audit/x-m390-reduce-full.jpg', fullPage: true, quality: 40 })
  await ctx.close()
}
await b.close()
