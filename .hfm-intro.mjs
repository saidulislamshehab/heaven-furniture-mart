import { chromium } from '@playwright/test'
const b = await chromium.launch()
for (const [w,h] of [[1440,900],[390,844]]) {
  const p = await b.newPage({ viewport:{width:w,height:h} })
  await p.goto('http://localhost:5180/', { waitUntil:'commit' })
  await p.waitForSelector('[data-heaven]'); await p.waitForTimeout(3000)
  console.log(w, await p.evaluate(()=>{ const hv=document.querySelector('[data-heaven]'); return { font:getComputedStyle(hv).fontFamily.split(',')[0], loaded:[...document.fonts].some(f=>f.family==='Mileast'&&f.status==='loaded'), hw:Math.round(hv.getBoundingClientRect().width), overflow: document.documentElement.scrollWidth>innerWidth } }))
  await p.screenshot({ path:`/tmp/hfm-shots/intro4-${w}.jpg`, type:'jpeg', quality:60, clip:{x:0,y:h*0.28,width:w,height:h*0.44} })
  await p.close()
}
await b.close()
