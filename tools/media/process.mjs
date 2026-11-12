// CultureCompass media tool: turns downloaded originals into the sizes the site serves.
//   node tools/media/process.mjs photo <in.jpg> <out-dir> <name>          -> <name>-1280.webp, <name>-2560.webp, <name>-640.webp (+ .jpg 1600 fallback)
//   node tools/media/process.mjs video <in> <out-dir> <name> <start> <len>  -> <name>.mp4 (H.264 1080p, muted) + <name>-poster.webp
// Install once with:  (cd tools/media && npm ci)
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const ffmpeg = require('ffmpeg-static');

const [mode, input, outDir, name, ...rest] = process.argv.slice(2);
if (!mode || !input || !outDir || !name) {
  console.error('usage: process.mjs photo|video <in> <out-dir> <name> [start len]');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
const kb = (f) => Math.round(statSync(f).size / 1024) + 'KB';

if (mode === 'photo') {
  const meta = await sharp(input).metadata();
  for (const w of [640, 1280, 2560]) {
    const out = path.join(outDir, `${name}-${w}.webp`);
    await sharp(input).rotate().resize({ width: Math.min(w, meta.width), withoutEnlargement: true }).webp({ quality: w > 1300 ? 80 : 78 }).toFile(out);
    console.log(out, kb(out));
  }
  const jpg = path.join(outDir, `${name}.jpg`);
  await sharp(input).rotate().resize({ width: Math.min(1600, meta.width) }).jpeg({ quality: 82, mozjpeg: true }).toFile(jpg);
  console.log(jpg, kb(jpg), `${meta.width}x${meta.height}`);
} else if (mode === 'video') {
  const [start = '0', len = '15'] = rest;
  const out = path.join(outDir, `${name}.mp4`);
  execFileSync(ffmpeg, ['-loglevel', 'error', '-y', '-ss', start, '-t', len, '-i', input, '-an',
    '-vf', 'scale=1920:-2:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '21',
    '-movflags', '+faststart', out]);
  const poster = path.join(outDir, `${name}-poster.jpg`);
  execFileSync(ffmpeg, ['-loglevel', 'error', '-y', '-i', out, '-frames:v', '1', '-q:v', '3', poster]);
  const webp = poster.replace(/\.jpg$/, '.webp');
  await sharp(poster).webp({ quality: 78 }).toFile(webp);
  console.log(out, kb(out), webp, kb(webp));
} else {
  console.error('unknown mode ' + mode);
  process.exit(1);
}
