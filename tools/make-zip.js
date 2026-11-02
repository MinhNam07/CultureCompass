#!/usr/bin/env node
/* Make the submission zip: node tools/make-zip.js [out.zip]   (npm run zip)
   Packs only what the site needs and leaves out raw footage, source art packs, node_modules and hidden folders.
   No dependencies: a small ZIP writer on top of Node's zlib (deflate, CRC-32, UTF-8 names). */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const NAME = path.basename(ROOT);
const OUT = path.resolve(process.argv[2] || path.join(ROOT, '..', NAME + '-submission.zip'));

/* folders and files never packed (paths relative to the project root) */
const SKIP = [
  'node_modules', 'background-vietnam', 'assets/game/raw', 'assets/game/vendor', '_to_delete',
  'docs/qa/2026-10-25/shots'
];
const SKIP_NAMES = new Set(['.DS_Store', 'Thumbs.db', '__pycache__']);
/* …except these files the game loads from the art packs, and their licences */
const KEEP = [
  'assets/game/vendor/serene-village/Serene_Village_16x16.png',
  'assets/game/vendor/limezu-interiors-free/Characters_free/Amelia_idle_anim_16x16.png',
  'assets/game/vendor/limezu-interiors-free/Characters_free/Amelia_run_16x16.png',
  'assets/game/vendor/limezu-interiors-free/LICENSE.txt',
  'assets/game/vendor/ninja-adventure/LICENSE.txt',
  'assets/game/vendor/ninja-adventure/README.md'
];

function skipped(rel) {
  if (rel.split('/').some((p) => p.startsWith('.') || SKIP_NAMES.has(p))) return true;   // hidden folders, .env, editor caches
  return SKIP.some((s) => rel === s || rel.startsWith(s + '/'));
}
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join('/');
    if (skipped(rel)) continue;
    if (e.isDirectory()) walk(abs, out);
    else if (e.isFile() && abs !== OUT) out.push(rel);
  }
  return out;
}

const CRC = new Uint32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function dosTime(d) {
  return { time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
           date: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate() };
}

const files = walk(ROOT, []).concat(KEEP.filter((f) => fs.existsSync(path.join(ROOT, f)))).sort();
const missing = KEEP.filter((f) => !/LICENSE|README/.test(f) && !fs.existsSync(path.join(ROOT, f)));
if (missing.length) console.warn('Warning: the game needs these files but they are missing:\n  ' + missing.join('\n  '));
const fd = fs.openSync(OUT, 'w');
let offset = 0;
const central = [];
const STORE = /\.(jpe?g|png|webp|gif|mp4|webm|mp3|m4a|woff2?|zip)$/i;   // already compressed
let total = 0;
for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const data = fs.readFileSync(abs);
  const st = fs.statSync(abs);
  const method = STORE.test(rel) ? 0 : 8;
  const body = method ? zlib.deflateRawSync(data, { level: 9 }) : data;
  const name = Buffer.from(NAME + '/' + rel, 'utf8');
  const crc = crc32(data);
  const { time, date } = dosTime(st.mtime);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); local.writeUInt16LE(method, 8);
  local.writeUInt16LE(time, 10); local.writeUInt16LE(date, 12); local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
  fs.writeSync(fd, local); fs.writeSync(fd, name); fs.writeSync(fd, body);
  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8); cen.writeUInt16LE(method, 10);
  cen.writeUInt16LE(time, 12); cen.writeUInt16LE(date, 14); cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(body.length, 20); cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(name.length, 28); cen.writeUInt32LE(offset, 42);
  central.push(Buffer.concat([cen, name]));
  offset += 30 + name.length + body.length;
  total += data.length;
}
const cdir = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(cdir.length, 12); end.writeUInt32LE(offset, 16);
fs.writeSync(fd, cdir); fs.writeSync(fd, end); fs.closeSync(fd);
const mb = (n) => (n / 1048576).toFixed(1) + ' MB';
console.log(`Wrote ${OUT}\n${files.length} files, ${mb(total)} → ${mb(offset + cdir.length + 22)}`);
console.log('Left out: ' + SKIP.join(', ') + ', hidden files and folders.');
