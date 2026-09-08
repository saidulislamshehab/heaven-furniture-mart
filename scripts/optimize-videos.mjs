// Re-encodes every MP4 under public/videos for fast web playback:
//  - H.264 High profile, CRF-based, 1080p max, yuv420p, audio stripped (all videos are muted ambient)
//  - `+faststart` moves the moov atom to the front so playback starts before the download finishes
//  - a 720p companion (<name>-720.mp4) for small screens
// Idempotent: skips outputs newer than their source. Usage: node scripts/optimize-videos.mjs
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, renameSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const FFMPEG = process.env.FFMPEG ?? execFileSync('python3', ['-c', 'import imageio_ffmpeg as f; print(f.get_ffmpeg_exe())']).toString().trim()
const ROOT = 'public/videos'
const ORIG = '.video-originals' // kept out of public/ so they never ship

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

function encode(input, output, height) {
  execFileSync(FFMPEG, [
    '-y', '-i', input, '-an',
    '-vf', `scale=-2:'min(${height},ih)'`,
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', height > 720 ? '24' : '26',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output,
  ], { stdio: 'ignore' })
}

const sources = walk(ROOT).filter((p) => p.endsWith('.mp4') && !p.endsWith('-720.mp4'))
for (const src of sources) {
  const rel = src.slice(ROOT.length + 1)
  const backup = join(ORIG, rel)
  mkdirSync(join(ORIG, rel.split('/')[0]), { recursive: true })
  if (!existsSync(backup)) renameSync(src, backup)
  const before = statSync(backup).size
  if (!existsSync(src) || statSync(src).mtimeMs < statSync(backup).mtimeMs) encode(backup, src, 1080)
  const small = src.replace(/\.mp4$/, '-720.mp4')
  if (!existsSync(small) || statSync(small).mtimeMs < statSync(backup).mtimeMs) encode(backup, small, 720)
  console.log(rel.padEnd(42), `${(before / 1e6).toFixed(1)}MB → ${(statSync(src).size / 1e6).toFixed(1)}MB (720p ${(statSync(small).size / 1e6).toFixed(1)}MB)`)
}
