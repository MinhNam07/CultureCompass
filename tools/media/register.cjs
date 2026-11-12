/* Registers processed story media in assets/data/assets.json.
   A manifest (tools/media/manifests/<name>.json) lists one entry per picture or clip:
     { id, kind: "image"|"video", w, h, alt, author, title?, license, sourceUrl, year?, note? }
   Pictures are expected as assets/img/stories/<id>-640|1280|2560.webp plus <id>.jpg (made by process.mjs);
   clips as assets/video/stories/<id>.mp4 with <id>-poster.jpg and .webp.
   With --from <dir>, files are first copied from that folder (where process.mjs wrote them).
   Usage: node tools/media/register.cjs <manifest.json> [--from <dir>]   then   npm run build */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');

const args = process.argv.slice(2);
const manifest = args[0];
const fromI = args.indexOf('--from');
const from = fromI > -1 ? args[fromI + 1] : null;
if (!manifest) { console.error('Usage: node tools/media/register.cjs <manifest.json> [--from <dir>]'); process.exit(1); }

const LICENSES = {
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC0': 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Public domain': 'https://en.wikipedia.org/wiki/Public_domain',
  'Pexels License': 'https://www.pexels.com/license/',
  'Unsplash License': 'https://unsplash.com/license',
  'Pixabay Content License': 'https://pixabay.com/service/license-summary/'
};

const IMG = 'assets/img/stories/';
const VID = 'assets/video/stories/';
const filesFor = (e) => e.kind === 'video'
  ? [VID + e.id + '.mp4', VID + e.id + '-poster.jpg', VID + e.id + '-poster.webp']
  : [640, 1280, 2560].map((w) => IMG + e.id + '-' + w + '.webp').concat(IMG + e.id + '.jpg');

const list = JSON.parse(fs.readFileSync(manifest, 'utf8'));
const A = path.join(root, 'assets/data/assets.json');
const data = JSON.parse(fs.readFileSync(A, 'utf8'));
let added = 0, updated = 0;
const missing = [];

list.forEach((e) => {
  const files = filesFor(e);
  if (from) files.forEach((f) => {
    const src = path.join(from, path.basename(f));
    if (fs.existsSync(src)) { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.copyFileSync(src, path.join(root, f)); }
  });
  const gone = files.filter((f) => !fs.existsSync(path.join(root, f)));
  if (gone.length) { missing.push(e.id + ': ' + gone.join(', ')); return; }
  if (!LICENSES[e.license]) throw new Error(e.id + ': unknown licence “' + e.license + '”; add it to LICENSES');
  const a = {
    id: e.id,
    kind: e.kind,
    file: e.kind === 'video' ? VID + e.id + '.mp4' : IMG + e.id + '.jpg',
    width: e.w,
    height: e.h,
    alt: e.alt,
    credit: e.title ? e.author + ', “' + e.title + '”' : e.author,
    sourceUrl: e.sourceUrl,
    license: e.license,
    licenseUrl: LICENSES[e.license]
  };
  if (e.kind === 'video') a.poster = VID + e.id + '-poster.jpg';
  else a.srcBase = IMG + e.id;
  if (e.year) a.year = String(e.year);
  a.note = e.note || (e.kind === 'video' ? 'Clipped, sound removed, re-encoded at 1080p.' : 'Resized to 640, 1280 and 2560 px.');
  const i = data.assets.findIndex((x) => x.id === a.id);
  if (i > -1) { data.assets[i] = a; updated++; } else { data.assets.push(a); added++; }
});

fs.writeFileSync(A, JSON.stringify(data, null, 2) + '\n');
console.log(`assets: ${added} added, ${updated} updated` + (missing.length ? `\nmissing files (not registered):\n  ` + missing.join('\n  ') : ''));
