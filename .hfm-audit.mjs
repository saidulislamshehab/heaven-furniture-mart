import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:5173'
const OUT = '/tmp/hfm-audit'
mkdirSync(OUT, { recursive: true })

const viewports = [
  ['m320', 320, 568], ['m360', 360, 800], ['m390', 390, 844], ['m430', 430, 932],
  ['t768', 768, 1024], ['t820', 820, 1180], ['l1024', 1024, 768], ['l1280', 1280, 720],
  ['d1440', 1440, 900], ['d1920', 1920, 1080], ['land844', 844, 390],
]
const routes = ['/', '/shop', '/visit', '/about']
const only = process.env.ONLY

const b = await chromium.launch()
for (const [name, width, height] of viewports) {
  if (only && !name.startsWith(only)) continue
  const isMobile = width < 768
  const ctx = await b.newContext({ viewport: { width, height }, isMobile, hasTouch: isMobile, deviceScaleFactor: 1 })
  for (const route of routes) {
    const p = await ctx.newPage()
    const errs = []
    p.on('pageerror', (e) => errs.push('pageerror: ' + e.message))
    p.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 160)) })
    await p.goto(BASE + route, { waitUntil: 'networkidle' })
    await p.waitForSelector('.fixed.inset-0.z-\\[100\\]', { state: 'detached', timeout: 15000 }).catch(() => {})
    await p.waitForTimeout(400)

    // Fast scroll to bottom in big jumps, then back to top slowly-ish
    const total = await p.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < total + height; y += Math.round(height * 0.9)) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60) }
    await p.waitForTimeout(900)

    const report = await p.evaluate(({ width }) => {
      const de = document.documentElement
      const overflowX = de.scrollWidth - de.clientWidth
      const offenders = []
      const hidden = []
      const smallTargets = []
      const vw = de.clientWidth
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) continue
        const cs = getComputedStyle(el)
        if (cs.position === 'fixed') continue
        // horizontal overflow contributors: right edge past viewport, and no clipping ancestor
        if (r.right > vw + 1 && r.left < vw) {
          let clipped = false
          let a = el.parentElement
          while (a && a !== document.body) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break } a = a.parentElement }
          if (!clipped) offenders.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 50)} right=${Math.round(r.right)}`)
        }
        // touch targets
        if (el.matches('a,button,[role=button]') && cs.visibility !== 'hidden' && cs.display !== 'none' && r.width > 0) {
          if (r.height < 40 && r.width < 40) smallTargets.push(`${el.tagName} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`)
        }
      }
      // text content stuck invisible (opacity 0 with text) after full scroll
      for (const el of document.querySelectorAll('h1,h2,h3,p,li,a,button,span')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || !el.textContent?.trim()) continue
        if (r.top > window.innerHeight * 2) continue // way below current view — still fine to check? we're at bottom; skip
        let a = el
        let op = 1
        while (a && a !== document.body) { op *= parseFloat(getComputedStyle(a).opacity); a = a.parentElement }
        if (op < 0.05) hidden.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 40)} "${el.textContent.trim().slice(0, 30)}"`)
      }
      const videos = [...document.querySelectorAll('video')].map((v) => ({ src: !!v.currentSrc, paused: v.paused, muted: v.muted, inline: v.playsInline, w: Math.round(v.getBoundingClientRect().width) }))
      return { overflowX, offenders: [...new Set(offenders)].slice(0, 12), hidden: [...new Set(hidden)].slice(0, 12), smallTargets: [...new Set(smallTargets)].slice(0, 12), videos, scrollH: de.scrollHeight }
    }, { width })

    // Now check hidden content across the page by sampling positions
    const stuck = new Set()
    for (let y = 0; y < total; y += Math.round(height * 0.5)) {
      await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(350)
      const h = await p.evaluate(() => {
        const out = []
        for (const el of document.querySelectorAll('h1,h2,h3,p,li,blockquote,figure,img,video')) {
          const r = el.getBoundingClientRect()
          if (r.bottom < 0 || r.top > innerHeight || r.width === 0) continue
          if (r.top > innerHeight * 0.6) continue
          let a = el, op = 1
          while (a && a !== document.body) { const cs = getComputedStyle(a); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') op = 0; a = a.parentElement }
          if (op < 0.05) out.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 40)} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 30)}"`)
        }
        return out
      })
      h.forEach((x) => stuck.add(x))
    }
    await p.waitForTimeout(500)
    const stuck2 = new Set()
    // second pass: after waiting, which are still hidden?
    for (let y = 0; y < total; y += Math.round(height * 0.5)) {
      await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700)
      const h = await p.evaluate(() => {
        const out = []
        for (const el of document.querySelectorAll('h1,h2,h3,p,li,blockquote,figure,img,video')) {
          const r = el.getBoundingClientRect()
          if (r.bottom < 0 || r.top > innerHeight * 0.7 || r.width === 0) continue
          let a = el, op = 1
          while (a && a !== document.body) { const cs = getComputedStyle(a); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') op = 0; a = a.parentElement }
          if (op < 0.05) out.push(`${el.tagName}.${(el.className?.toString() || '').slice(0, 40)} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 30)}"`)
        }
        return out
      })
      h.forEach((x) => stuck2.add(x))
    }

    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400)
    await p.screenshot({ path: `${OUT}/${name}${route.replace('/', '_') || '_home'}-full.jpg`, fullPage: true, quality: 45 }).catch(() => {})

    const flag = report.overflowX > 0 || report.offenders.length || stuck2.size || errs.length
    console.log(`${flag ? '!!' : 'ok'} ${name} ${route} ox=${report.overflowX} h=${report.scrollH}` +
      (report.offenders.length ? `\n   offenders: ${report.offenders.join(' | ')}` : '') +
      (stuck2.size ? `\n   stuck-hidden: ${[...stuck2].slice(0, 10).join(' | ')}` : '') +
      (report.smallTargets.length ? `\n   small: ${report.smallTargets.join(' | ')}` : '') +
      (errs.length ? `\n   errors: ${[...new Set(errs)].slice(0, 5).join(' | ')}` : '') +
      (report.videos.length ? `\n   videos: ${JSON.stringify(report.videos)}` : ''))
    await p.close()
  }
  await ctx.close()
}
await b.close()
