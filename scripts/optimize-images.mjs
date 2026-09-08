// Generates responsive WebP variants for every JPG/PNG under public/images (excluding posters
// used as <video poster>, which stay JPG). Idempotent: skips outputs newer than their source.
// Also writes src/data/image-variants.json so srcSetFor() only advertises widths that exist
// (sources narrower than a step get no variant at that width).
// Usage: node scripts/optimize-images.mjs
import { readdirSync, statSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { join, extname, basename, dirname, relative } from 'node:path'
import sharp from 'sharp'

const ROOT = 'public/images'
const MANIFEST = 'src/data/image-variants.json'
const WIDTHS = [480, 768, 1200, 1600]
const QUALITY = 78

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const sources = walk(ROOT).filter((p) => /\.(jpe?g|png)$/i.test(p) && !p.includes('/posters/') && !p.includes('/brand/heaven-wordmark') && !/icon|favicon|apple-touch/.test(p))

let made = 0
const manifest = {}
for (const src of sources) {
  const outDir = join(dirname(src), 'w')
  mkdirSync(outDir, { recursive: true })
  const meta = await sharp(src).metadata()
  const name = basename(src, extname(src))
  const widths = []
  for (const w of WIDTHS) {
    if (w > meta.width) continue
    widths.push(w)
    const out = join(outDir, `${name}-${w}.webp`)
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(out)
    made++
  }
  // Full-size fallback at the largest width that exists
  const fullWidth = Math.min(meta.width, 2048)
  const full = join(outDir, `${name}-full.webp`)
  if (!existsSync(full) || statSync(full).mtimeMs < statSync(src).mtimeMs) {
    await sharp(src).resize({ width: fullWidth, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5 }).toFile(full)
    made++
  }
  // Keyed by public URL sans extension, e.g. "/images/process/craft"
  manifest[`/${relative('public', join(dirname(src), name)).split('\\').join('/')}`] = { w: widths, full: fullWidth }
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 0) + '\n')
console.log(`processed ${sources.length} sources, wrote ${made} files, manifest → ${MANIFEST}`)
