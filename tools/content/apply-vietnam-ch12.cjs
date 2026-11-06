/* Merges chapter 1–2 content (tools/content/vietnam-ch12.cjs) into assets/data/*.json
   and adds the new sections and chapter leads to the Vietnam page (assets/js/explore.js).
   Safe to run more than once. Photos are registered only once their file is in assets/img/
   (run tools/fetch-photos.sh).
   Usage: node tools/content/apply-vietnam-ch12.cjs   then   npm run build */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const C = require('./vietnam-ch12.cjs');

const P = (f) => path.join(root, 'assets/data', f + '.json');
const load = (f) => JSON.parse(fs.readFileSync(P(f), 'utf8'));
const save = (f, o) => fs.writeFileSync(P(f), JSON.stringify(o, null, 2) + '\n');
function upsert(list, items) {
  items.forEach((it) => { const i = list.findIndex((x) => x.id === it.id); if (i >= 0) list[i] = Object.assign({}, list[i], it); else list.push(it); });
}
const log = [];

const src = load('sources'); upsert(src.sources, C.sources); save('sources', src); log.push(`sources: +${C.sources.length}`);

const sc = load('scenarios');
C.claims.forEach((c) => { const old = sc.claims.find((x) => x.id === c.id); if (old && old.status) c.status = old.status; });
upsert(sc.claims, C.claims); save('scenarios', sc); log.push(`claims: +${C.claims.length}`);

const as = load('assets');
const onDisk = C.photos.filter((p) => fs.existsSync(path.join(root, p.file)));
upsert(as.assets, onDisk.map((p) => { const o = Object.assign({}, p); delete o.commonsFile; return o; }));
save('assets', as);
const have = new Set(as.assets.filter((a) => a.kind === 'image').map((a) => a.id));
const missing = C.photos.length - onDisk.length;
log.push(`photos: ${onDisk.length} registered` + (missing ? `, ${missing} not downloaded yet (run tools/fetch-photos.sh)` : ''));

const st = load('stories');
const stories = C.stories.map((s) => { const o = JSON.parse(JSON.stringify(s)); if (o.imageId && !have.has(o.imageId)) delete o.imageId; return o; });
upsert(st.stories, stories);
Object.entries(C.storyImages).forEach(([sid, img]) => { const s = st.stories.find((x) => x.id === sid); if (s && !s.imageId && have.has(img)) s.imageId = img; });
save('stories', st); log.push(`stories: +${stories.length}`);

const tp = load('topics');
const add = (id, ids, blurb) => { const t = tp.topics.find((x) => x.id === id); if (!t) return; ids.forEach((s) => t.storyIds.includes(s) || t.storyIds.push(s)); if (blurb) t.blurb = blurb; };
add('people', ['st-old-quarter', 'st-pavement', 'st-hoan-kiem-days'],
  'Arriving at a home, crossing the street, asking before a photo, the Old Quarter’s trade streets, tea on the pavement and weekends by the lake.');
add('food', ['st-pho', 'st-bun-cha', 'st-egg-coffee'],
  'A family dinner: shared dishes, a host who serves you, saying you are full; then phở, bún chả and egg coffee.');
save('topics', tp); log.push('themes: people and food updated');

const ef = path.join(root, 'assets/js/explore.js');
let js = fs.readFileSync(ef, 'utf8');
function swap(label, from, to) {
  if (js.includes(to)) return log.push(`page: ${label} already done`);
  if (!js.includes(from)) return log.push(`page: ${label} NOT FOUND, skipped`);
  js = js.replace(from, to); log.push(`page: ${label}`);
}
swap('chapter leads data',
  '  var CHAPTERS = [',
  '  var LEADS = ' + JSON.stringify(C.leads) + ';\n  var CHAPTERS = [');
swap('chapter lead paragraph',
  "      '<p class=\"ex-ch-vi\" lang=\"vi\">' + esc(ch.vi || t.vi || '') + '</p>' +",
  "      '<p class=\"ex-ch-vi\" lang=\"vi\">' + esc(ch.vi || t.vi || '') + '</p>' +\n      (LEADS[ch.anchor] ? '<p class=\"ex-ch-lead\">' + esc(LEADS[ch.anchor]) + '</p>' : '') +");
swap('accordion keeps its six moments',
  "    t.storyIds.forEach(function (id) {\n      var st = story(id); if (!st) return;\n      items.push({ kind: 'Story'",
  "    ['st-arrive-home', 'st-hand', 'st-photo-ask', 'st-keep-cool', 'st-family-words', 'st-market'].forEach(function (id) {\n      var st = story(id); if (!st) return;\n      items.push({ kind: 'Story'");
swap('chapter 1 section',
  "{ type: 'chapter', ch: 0, modules: [{ type: 'accordion' }] },",
  "{ type: 'chapter', ch: 0, modules: [\n      { type: 'accordion' },\n      { type: 'large', id: 'oq-title', title: 'Around the Old Quarter', sub: 'Trade streets, tea on the pavement, and the lake at dawn and at the weekend.', ids: ['st-old-quarter', 'st-pavement', 'st-hoan-kiem-days'] }\n    ] },");
swap('chapter 2 section',
  "{ type: 'chapter', ch: 1, modules: [{ type: 'clusters' }] },",
  "{ type: 'chapter', ch: 1, modules: [\n      { type: 'clusters' },\n      { type: 'large', id: 'eat-title', title: 'What Hà Nội eats and drinks', sub: 'Three dishes the city is known for, and how to order at a pavement stall.', ids: ['st-pho', 'st-bun-cha', 'st-egg-coffee', 'st-street-stall'] }\n    ] },");
fs.writeFileSync(ef, js);

const cf = path.join(root, 'assets/css/explore.css');
let css = fs.readFileSync(cf, 'utf8');
if (!css.includes('.ex-ch-lead')) {
  css += '\n/* chapter lead paragraph (added with the chapter 1–2 content) */\n.ex-ch-lead { max-width: 52ch; margin: 14px auto 0; font-size: 1.05rem; line-height: 1.65; opacity: .86; text-align: center; text-wrap: pretty; }\n';
  fs.writeFileSync(cf, css); log.push('css: chapter lead style');
}
console.log(log.join('\n'));
