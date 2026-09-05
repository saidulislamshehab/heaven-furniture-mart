// One-off: record the first seconds of a URL as a frame strip for animation analysis.
// Usage: node scripts/capture-intro.mjs <url> <outPrefix> [frames=12] [intervalMs=350]
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'

const [url, out, framesArg = '12', intervalArg = '350'] = process.argv.slice(2)
const frames = Number(framesArg)
const interval = Number(intervalArg)
const browser = await chromium.launch()
const [w, h] = (process.env.VIEWPORT ?? '1440x900').split('x').map(Number)
const page = await browser.newPage({ viewport: { width: w, height: h } })
await page.goto(url, { waitUntil: 'domcontentloaded' })
const t0 = Date.now()
for (let i = 0; i < frames; i++) {
  const buf = await page.screenshot({ type: 'jpeg', quality: 45, timeout: 3000 }).catch(() => null)
  if (buf) writeFileSync(`${out}_${String(i).padStart(2, '0')}_${Date.now() - t0}ms.jpg`, buf)
  await page.waitForTimeout(interval)
}
await browser.close()
