// Tiles the previews made by `commons.mjs peek <name>` into one numbered sheet: tools/media/.cache/peek/<name>-sheet.jpg
//   node tools/media/contact.mjs <name> [columns=3]
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '.cache/peek');
const [name, colsArg] = process.argv.slice(2);
const files = readdirSync(dir).filter((f) => new RegExp('^' + name + '-\\d+\\.jpg$').test(f)).sort((a, b) => parseInt(a.split('-').pop()) - parseInt(b.split('-').pop()));
const cols = +(colsArg || 3), W = 420, H = 300, rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(files.map(async (f, i) => {
  const img = await sharp(path.join(dir, f)).resize(W, H, { fit: 'contain', background: '#111' }).toBuffer();
  const n = f.match(/-(\d+)\.jpg$/)[1];
  const label = Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="54" height="40" fill="#000" opacity=".75"/><text x="12" y="29" font-size="26" font-family="sans-serif" fill="#fff">${n}</text></svg>`);
  return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % cols) * (W + 6), top: Math.floor(i / cols) * (H + 6) };
}));
const out = path.join(dir, name + '-sheet.jpg');
await sharp({ create: { width: cols * (W + 6), height: rows * (H + 6), channels: 3, background: '#222' } }).composite(tiles).jpeg({ quality: 80 }).toFile(out);
console.log(out);
