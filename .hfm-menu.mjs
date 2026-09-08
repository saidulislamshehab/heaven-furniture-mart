import { chromium } from '@playwright/test'
const b = await chromium.launch()
for (const [w,h,name] of [[320,568,'iPhoneSE1'],[375,667,'iPhoneSE'],[360,640,'android-s'],[390,844,'iPhone14'],[667,375,'landscape'],[768,1024,'ipad']]) {
  const p = await b.newPage({ viewport:{width:w,height:h}, isMobile:true, hasTouch:true })
  await p.goto('http://localhost:5187/about', { waitUntil:'load' }); await p.waitForTimeout(800)
  await p.getByRole('button', { name: 'Open menu' }).click(); await p.waitForTimeout(1200)
  const r = await p.evaluate(()=>{ const d=document.querySelector('[role="dialog"]'); const btn=[...d.querySelectorAll('button')].find(b=>/consultation/i.test(b.textContent)); const rb=btn.getBoundingClientRect(); return { scrollable: d.scrollHeight>d.clientHeight+1, extra: d.scrollHeight-d.clientHeight, ctaBottom: Math.round(rb.bottom), vh: innerHeight } })
  console.log(name.padEnd(10), `${w}x${h}`, r.scrollable ? `SCROLLS (+${r.extra}px)` : 'fits', `cta bottom ${r.ctaBottom}/${r.vh}`)
  await p.screenshot({ path:`/tmp/hfm-menu-${name}.png` }); await p.close()
}
await b.close()
