// Builds public/og-image.png (1200×630) — brand mark + wordmark on ivory — for link previews.
// Usage: node scripts/make-og-image.mjs
import sharp from 'sharp'

const W = 1200
const H = 630
const IVORY = '#F5F0EB'
const BROWN = '#4A3728'
const GOLD = '#B8865A'

const mark = await sharp('public/logo.png').resize({ height: 300 }).toBuffer()
const { width: markW } = await sharp(mark).metadata()

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="455" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="${BROWN}" letter-spacing="-1">Heaven Furniture Mart</text>
  <text x="600" y="520" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="${GOLD}" letter-spacing="6" font-weight="600">DESIGNED · CRAFTED · CUSTOMIZED</text>
  <text x="600" y="575" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="${BROWN}" fill-opacity="0.55" letter-spacing="2">BESPOKE FURNITURE · CHATTOGRAM</text>
</svg>`)

await sharp({ create: { width: W, height: H, channels: 4, background: IVORY } })
  .composite([
    { input: mark, top: 70, left: Math.round((W - markW) / 2) },
    { input: text, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png')

console.log('wrote public/og-image.png')
