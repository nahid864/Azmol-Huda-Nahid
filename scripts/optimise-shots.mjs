/**
 * Turns the captured JPEG screenshots into WebP, plus a small thumbnail for the
 * grid. The grid renders each shot at roughly 400px wide, so shipping the full
 * 1600px file there was costing visitors megabytes for nothing.
 *
 *   node scripts/optimise-shots.mjs [--clean]
 *
 * --clean removes the source JPEGs once every WebP exists.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readdir, stat, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'

const run = promisify(execFile)
const FFMPEG =
  process.env.FFMPEG_PATH ||
  'C:/Users/User/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin/ffmpeg.exe'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'images', 'projects')
const clean = process.argv.includes('--clean')

const walk = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(p)))
    else if (extname(entry.name) === '.jpg' && !entry.name.endsWith('.thumb.jpg')) out.push(p)
  }
  return out
}

const encode = (src, dest, width, quality) =>
  run(FFMPEG, ['-loglevel', 'error', '-y', '-i', src,
    '-vf', `scale='min(${width},iw)':-2:flags=lanczos`,
    '-c:v', 'libwebp', '-quality', String(quality), '-compression_level', '6', dest])

const files = await walk(ROOT)
let before = 0, after = 0

for (const src of files) {
  const full = src.replace(/\.jpg$/, '.webp')
  const thumb = src.replace(/\.jpg$/, '.thumb.webp')
  await encode(src, full, 1600, 82)
  await encode(src, thumb, 700, 76)
  before += (await stat(src)).size
  after += (await stat(full)).size + (await stat(thumb)).size
  if (clean) await unlink(src)
}

const mb = (n) => (n / 1048576).toFixed(1) + ' MB'
console.log(`${files.length} shots: ${mb(before)} of JPEG -> ${mb(after)} of WebP (full + thumb)`)
if (!clean) console.log('source JPEGs kept; re-run with --clean to drop them')
