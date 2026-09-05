// One-off: scroll through the Bespoke section and capture frames.
import { chromium } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'node:fs'

const [w, h] = (process.env.VIEWPORT ?? '1440x900').split('x').map(Number)
const out = process.argv[2] ?? '.tmp-intro/roll'
mkdirSync('.tmp-intro', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: 'no-preference' })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(4500)
const top = await page.evaluate(() => document.querySelector('#bespoke').getBoundingClientRect().top + scrollY)
const steps = Number(process.argv[3] ?? 8)
for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), top + 420 + i * 560)
  await page.waitForTimeout(900)
  writeFileSync(`${out}_${String(i).padStart(2, '0')}.jpg`, await page.screenshot({ type: 'jpeg', quality: 55 }))
}
await browser.close()
