// Tiles registered story pictures into one labelled sheet, to check alt texts by eye.
//   node tools/media/sheet.mjs <out.jpg> <id> [id ...]
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const [out, ...ids] = process.argv.slice(2);
const cols = 3, W = 420, H = 300, rows = Math.ceil(ids.length / cols);
const tiles = await Promise.all(ids.map(async (id, i) => {
  const img = await sharp(path.join(root, 'assets/img/stories', id + '-640.webp')).resize(W, H, { fit: 'contain', background: '#111' }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="28"><rect width="100%" height="100%" fill="#000" opacity=".7"/><text x="8" y="20" font-size="18" fill="#fff" font-family="sans-serif">${i + 1} ${id}</text></svg>`);
  return [{ input: img, left: (i % cols) * W, top: Math.floor(i / cols) * H }, { input: label, left: (i % cols) * W, top: Math.floor(i / cols) * H }];
}));
await sharp({ create: { width: cols * W, height: rows * H, channels: 3, background: '#111' } }).composite(tiles.flat()).jpeg({ quality: 80 }).toFile(out);
console.log(out);
