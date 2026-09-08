// One-off: capture a poster frame from each video via headless Chromium (no ffmpeg available).
// Usage: node scripts/make-posters.mjs   (dev server must be running on :5173)
import { chromium } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const videos = [
  ['videos/hero/hero-egg-chair.mp4', 'images/posters/hero-egg-chair.jpg', 1.5],
  ['videos/hero/hero-penthouse.mp4', 'images/posters/hero-penthouse.jpg', 1.5],
  ['videos/hero/hero-dining-cabinet.mp4', 'images/posters/hero-dining-cabinet.jpg', 1.5],
  ['videos/hero/hero-penthouse2.mp4', 'images/posters/hero-penthouse2.jpg', 1.5],
  ['videos/hero/hero-sofa.mp4', 'images/posters/hero-sofa.jpg', 1.5],
  ['videos/workshop/form-cnc-cut.mp4', 'images/posters/form-cnc-cut.jpg', 2],
  ['videos/workshop/craft-carving.mp4', 'images/posters/craft-carving.jpg', 3],
  ['videos/workshop/finish-gilded-detail.mp4', 'images/posters/finish-gilded-detail.jpg', 3],
  ['videos/showroom/showroom-walkthrough.mp4', 'images/posters/showroom-walkthrough.jpg', 6],
  ['videos/showroom/showroom-blue-chairs.mp4', 'images/posters/showroom-blue-chairs.jpg', 3],
  ['videos/showroom/detail-sofa-fabric.mp4', 'images/posters/detail-sofa-fabric.jpg', 2],
  ['videos/showroom/detail-olive-sofa.mp4', 'images/posters/detail-olive-sofa.jpg', 4],
  ['videos/showroom/reel-luxurious-modern.mp4', 'images/posters/reel-luxurious-modern.jpg', 2],
  ['videos/showroom/commercial-1.mp4', 'images/posters/commercial-1.jpg', 2],
]

mkdirSync('public/images/posters', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(BASE)

for (const [src, out, t] of videos) {
  const dataUrl = await page.evaluate(
    ([src, t]) =>
      new Promise((resolve, reject) => {
        const v = document.createElement('video')
        v.muted = true
        v.preload = 'auto'
        v.src = '/' + src
        v.onloadedmetadata = () => {
          v.currentTime = Math.min(t, v.duration - 0.1)
        }
        v.onseeked = () => {
          const c = document.createElement('canvas')
          const scale = Math.min(1, 1280 / v.videoWidth)
          c.width = Math.round(v.videoWidth * scale)
          c.height = Math.round(v.videoHeight * scale)
          c.getContext('2d').drawImage(v, 0, 0, c.width, c.height)
          resolve(c.toDataURL('image/jpeg', 0.78))
        }
        v.onerror = () => reject(new Error('video error ' + src))
      }),
    [src, t]
  )
  writeFileSync('public/' + out, Buffer.from(dataUrl.split(',')[1], 'base64'))
  console.log('wrote', out)
}
await browser.close()
