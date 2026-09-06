import { chromium } from '@playwright/test'
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('http://localhost:5180/', { waitUntil: 'networkidle' }); await p.waitForSelector('[data-curtain]', { state: 'detached', timeout: 15000 })
console.log(await p.evaluate(() => ({ heroVideos: [...document.querySelectorAll('section:first-of-type video')].map(v => (v.currentSrc || v.src || '').split('/').pop()), dots: document.querySelectorAll('[aria-label="Hero films"] button').length, counter: document.querySelector('[aria-label="Hero films"] li:last-child')?.textContent })))
await p.locator('[aria-label="Switch to film 5"]').click(); await p.waitForTimeout(2500)
console.log(await p.evaluate(() => { const v = document.querySelectorAll('section:first-of-type video')[4]; return { counter: document.querySelector('[aria-label="Hero films"] li:last-child')?.textContent, fifth: { src: (v.currentSrc||'').split('/').pop(), playing: !v.paused, ready: v.readyState, opacity: getComputedStyle(v).opacity } } }))
await b.close()
