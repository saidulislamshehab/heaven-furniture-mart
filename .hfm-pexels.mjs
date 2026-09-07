import { chromium } from '@playwright/test'
import { writeFileSync, readFileSync } from 'node:fs'
const Q = { design: 'fabric swatches', craft: 'woodworking hands', deliver: 'furniture delivery', install: 'luxury living room sofa' }
const prev = JSON.parse(readFileSync('/tmp/hfm-proc/ids.json', 'utf8'))
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36' })
const p = await ctx.newPage(); const out = { ...prev }
for (const [step, q] of Object.entries(Q)) {
  await p.waitForTimeout(6000)
  try {
    const r = await p.goto(`https://www.pexels.com/search/${encodeURIComponent(q)}/`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await p.waitForSelector('img[src*="images.pexels.com/photos/"]', { timeout: 30000 })
    await p.mouse.wheel(0, 1200); await p.waitForTimeout(2000)
    out[step] = await p.evaluate(() => [...document.querySelectorAll('img[src*="images.pexels.com/photos/"]')].map(i => ({ id: i.src.match(/photos\/(\d+)\//)?.[1], alt: i.alt })).filter(x => x.id).filter((v, i, a) => a.findIndex(x => x.id === v.id) === i).slice(0, 16))
    console.log(step, r.status(), out[step].length)
  } catch (e) { console.log(step, 'FAIL', (await p.title()).slice(0, 60), e.message.slice(0, 50)) }
}
writeFileSync('/tmp/hfm-proc/ids.json', JSON.stringify(out, null, 1))
await b.close()
