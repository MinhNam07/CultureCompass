// Wikimedia Commons helper for story photos.
//   node tools/media/commons.mjs search "<words>" [minWidth=2400]   -> candidate files: size, licence, author, title
//   node tools/media/commons.mjs cat "Category:..." [minWidth=2400] -> files in a category and its first subcategories
//   node tools/media/commons.mjs peek <name> "File:A.jpg" ["File:B.jpg" ...] -> 900px previews in tools/media/.cache/peek/<name>-N.jpg, to look at before choosing
//   node tools/media/commons.mjs fetch <plan.json> <manifest.json>     -> downloads, makes the web sizes, appends manifest entries
// A plan is a list of { id, file: "File:Name.jpg", alt, note? } (or { id, file, kind: "video", start, len, alt }).
// Credits and licences come from the file's own Commons metadata. Pictures go to assets/img/stories/, clips to assets/video/stories/.
// Then: node tools/media/register.cjs <manifest.json>
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, readFileSync, writeFileSync, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..', '..');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = { 'User-Agent': 'CultureCompass-coursework/1.0 (student project; media credits tool)' };
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const LIC = (s) => {
  s = strip(s);
  if (/^public domain|^pd/i.test(s)) return 'Public domain';
  if (/^cc0/i.test(s)) return 'CC0';
  const m = /^cc[ -](by(?:-sa)?)[ -]([\d.]+)/i.exec(s);
  return m ? `CC ${m[1].toUpperCase()} ${m[2]}` : s;
};
async function api(params) {
  const u = API + '?' + new URLSearchParams({ format: 'json', formatversion: '2', origin: '*', ...params });
  for (let i = 0; i < 4; i++) {
    const r = await fetch(u, { headers: UA });
    if (r.status === 429) { await new Promise((ok) => setTimeout(ok, 2000 * (i + 1))); continue; }
    return r.json();
  }
  throw new Error('Commons API rate limit');
}
async function info(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 40) {
    const j = await api({ action: 'query', prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime', titles: titles.slice(i, i + 40).join('|') });
    (j.query.pages || []).forEach((p) => {
      const ii = p.imageinfo && p.imageinfo[0]; if (!ii) return;
      const m = ii.extmetadata || {};
      out[p.title] = { url: ii.url, w: ii.width, h: ii.height, mime: ii.mime, page: ii.descriptionurl, author: strip(m.Artist && m.Artist.value), license: LIC(m.LicenseShortName && m.LicenseShortName.value), date: (/(1[89]|20)\d\d/.exec(strip(m.DateTimeOriginal && m.DateTimeOriginal.value)) || [''])[0], desc: strip(m.ImageDescription && m.ImageDescription.value).slice(0, 160) };
    });
  }
  return out;
}

const [cmd, a, b] = process.argv.slice(2);
if (cmd === 'search') {
  const min = +(b || 2400);
  const j = await api({ action: 'query', list: 'search', srsearch: a + ' filetype:bitmap|video', srnamespace: '6', srlimit: '50' });
  const titles = (j.query.search || []).map((s) => s.title);
  const I = await info(titles);
  titles.map((t) => [t, I[t]]).filter(([, x]) => x && (x.w >= min || /video/.test(x.mime))).forEach(([t, x]) => {
    console.log(`${x.w}x${x.h}  ${x.license.padEnd(14)} ${x.date || '----'}  ${t}\n      by ${x.author.slice(0, 60)} | ${x.desc}`);
  });
} else if (cmd === 'cat') {
  // node tools/media/commons.mjs cat "Category:Street vendors in Hanoi" [minWidth]  -> files in the category (and one level of subcategories)
  const min = +(b || 2400);
  const list = async (c) => { const j = await api({ action: 'query', list: 'categorymembers', cmtitle: c, cmlimit: '200', cmtype: 'file|subcat' }); return j.query ? j.query.categorymembers : []; };
  const top = await list(a);
  let titles = top.filter((m) => m.ns === 6).map((m) => m.title);
  for (const sc of top.filter((m) => m.ns === 14).slice(0, 12)) { console.log('  (sub)', sc.title); titles = titles.concat((await list(sc.title)).filter((m) => m.ns === 6).map((m) => m.title)); }
  const I = await info(titles);
  titles.map((t) => [t, I[t]]).filter(([, x]) => x && (x.w >= min || /video/.test(x.mime))).forEach(([t, x]) => console.log(`${x.w}x${x.h}  ${x.license.padEnd(14)} ${x.date || '----'}  ${t}  | ${x.author.slice(0, 40)}`));
} else if (cmd === 'peek') {
  const files = process.argv.slice(4);
  const dir = path.join(root, 'tools/media/.cache/peek'); mkdirSync(dir, { recursive: true });
  const j = await api({ action: 'query', prop: 'imageinfo', iiprop: 'url', iiurlwidth: '900', titles: files.join('|') });
  const byTitle = {}; (j.query.pages || []).forEach((p) => { if (p.imageinfo) byTitle[p.title] = p.imageinfo[0].thumburl; });
  for (let i = 0; i < files.length; i++) {
    const t = (j.query.normalized || []).reduce((s, n) => (n.from === files[i] ? n.to : s), files[i]);
    const u = byTitle[t]; if (!u) { console.log('no preview', files[i]); continue; }
    const out = path.join(dir, a + '-' + (i + 1) + '.jpg');
    const r = await fetch(u, { headers: UA }); await pipeline(Readable.fromWeb(r.body), createWriteStream(out));
    console.log(out, '<-', files[i]);
  }
} else if (cmd === 'fetch') {
  const plan = JSON.parse(readFileSync(a, 'utf8'));
  const manifest = existsSync(b) ? JSON.parse(readFileSync(b, 'utf8')) : [];
  const I = await info(plan.map((p) => p.file));
  const tmp = path.join(root, 'tools/media/.cache'); mkdirSync(tmp, { recursive: true });
  for (const p of plan) {
    const x = I[p.file]; if (!x) { console.log('not found:', p.file); continue; }
    const ext = path.extname(new URL(x.url).pathname) || '.jpg';
    const orig = path.join(tmp, p.id + ext);
    if (!existsSync(orig)) {
      // upload.wikimedia.org answers 429 to quick bursts: wait and try again
      let r;
      for (let k = 0; k < 6; k++) {
        r = await fetch(x.url, { headers: UA });
        if (r.status !== 429) break;
        await new Promise((ok) => setTimeout(ok, 8000 * (k + 1)));
      }
      if (!r.ok) { console.log('download failed', r.status, p.file); continue; }
      await new Promise((ok) => setTimeout(ok, 3000));
      await pipeline(Readable.fromWeb(r.body), createWriteStream(orig));
    }
    const video = p.kind === 'video';
    const out = path.join(root, video ? 'assets/video/stories' : 'assets/img/stories');
    const args = video ? ['video', orig, out, p.id, String(p.start || 0), String(p.len || 10)] : ['photo', orig, out, p.id];
    execFileSync(process.execPath, [path.join(here, 'process.mjs'), ...args], { stdio: 'inherit' });
    const e = { id: p.id, kind: video ? 'video' : 'image', w: video ? 1920 : Math.min(2560, x.w), h: video ? 1080 : Math.round(Math.min(2560, x.w) * x.h / x.w), alt: p.alt, author: p.author || x.author || 'Unknown', title: p.title, license: p.license || x.license, sourceUrl: x.page, year: p.year || x.date || undefined, note: p.note };
    const i = manifest.findIndex((m) => m.id === e.id);
    if (i > -1) manifest[i] = e; else manifest.push(e);
    console.log('ok', p.id, e.w + 'x' + e.h, e.license, e.author);
  }
  writeFileSync(b, JSON.stringify(manifest, null, 1) + '\n');
} else {
  console.log('usage: commons.mjs search "<words>" [minWidth] | fetch <plan.json> <manifest.json>');
}
