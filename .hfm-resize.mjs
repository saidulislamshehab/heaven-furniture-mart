import { chromium } from '@playwright/test'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1024, height: 768 } })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push(e.message))
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 }).catch(() => {})
const state = async (label) => {
  const r = await p.evaluate(() => {
    const why = document.querySelector('#why')
    const pinSpacers = document.querySelectorAll('.pin-spacer').length
    const frame = why?.querySelector('[data-frame]')
    return { whyH: Math.round(why.getBoundingClientRect().height), pinSpacers, frame: !!frame, docW: document.documentElement.scrollWidth, vw: innerWidth }
  })
  console.log(label, JSON.stringify(r))
}
await state('1024 initial')
await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(800)
await state('→390')
// scroll to why and confirm content visible in flow
await p.locator('#why h3').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(1200)
console.log('390 first h3 opacity', await p.locator('#why h3').first().evaluate((el) => { let a = el, op = 1; while (a && a !== document.body) { op *= parseFloat(getComputedStyle(a).opacity); a = a.parentElement } return op.toFixed(2) }))
await p.setViewportSize({ width: 844, height: 390 }); await p.waitForTimeout(800)
await state('→844x390 landscape')
await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(1000)
await state('→1440')
// scroll through pinned why at 1440 and make sure content reveals
const why = p.locator('#why')
const top = await why.evaluate((el) => el.getBoundingClientRect().top + scrollY)
let y = await p.evaluate(() => scrollY)
const target = top + 900 * 3.2
while (y < target) { y = Math.min(target, y + 450); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60) }
await p.waitForTimeout(1500)
console.log('1440 last h3 opacity', await p.locator('#why h3').last().evaluate((el) => { let a = el, op = 1; while (a && a !== document.body) { op *= parseFloat(getComputedStyle(a).opacity); a = a.parentElement } return op.toFixed(2) }))
console.log('errors', errs)
await b.close()
