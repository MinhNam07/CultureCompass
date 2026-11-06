/* Merges the chapter-3 content (tools/content/vietnam-ch3.cjs) into assets/data/*.json
   and wires it into the Vietnam page (assets/js/explore.js).
   Safe to run more than once: entries are replaced by id, page edits are skipped once applied.
   A photo is only registered once its file is in assets/img/ (run tools/fetch-photos.sh first),
   because check-content.js fails on missing files.
   Usage: node tools/content/apply-vietnam-ch3.cjs   then   npm run build */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const C = require('./vietnam-ch3.cjs');

const P = (f) => path.join(root, 'assets/data', f + '.json');
const load = (f) => JSON.parse(fs.readFileSync(P(f), 'utf8'));
const save = (f, o) => fs.writeFileSync(P(f), JSON.stringify(o, null, 2) + '\n');
function upsert(list, items) {
  items.forEach((it) => {
    const i = list.findIndex((x) => x.id === it.id);
    if (i >= 0) list[i] = Object.assign({}, list[i], it); else list.push(it);
  });
}
const log = [];

/* sources */
const src = load('sources'); upsert(src.sources, C.sources); save('sources', src); log.push(`sources: +${C.sources.length}`);

/* claims (keep a status Henry has already changed) */
const sc = load('scenarios');
C.claims.forEach((c) => { const old = sc.claims.find((x) => x.id === c.id); if (old && old.status) c.status = old.status; });
upsert(sc.claims, C.claims); save('scenarios', sc); log.push(`claims: +${C.claims.length}`);

/* photos that are on disk */
const as = load('assets');
const onDisk = C.photos.filter((p) => fs.existsSync(path.join(root, p.file)));
const have = new Set(onDisk.map((p) => p.id).concat(as.assets.map((a) => a.id)));
upsert(as.assets, onDisk.map((p) => { const o = Object.assign({}, p); delete o.commonsFile; return o; }));
save('assets', as);
const missing = C.photos.filter((p) => !fs.existsSync(path.join(root, p.file))).map((p) => p.file);
log.push(`photos: ${onDisk.length} registered` + (missing.length ? `, ${missing.length} not downloaded yet (run tools/fetch-photos.sh)` : ''));

/* stories */
const st = load('stories');
const stories = C.stories.map((s) => { const o = JSON.parse(JSON.stringify(s)); if (o.imageId && !have.has(o.imageId)) delete o.imageId; return o; });
upsert(st.stories, stories);
Object.entries(C.storyImages).forEach(([sid, img]) => { const s = st.stories.find((x) => x.id === sid); if (s && have.has(img)) s.imageId = img; });
save('stories', st); log.push(`stories: +${stories.length}`);

/* themes */
const tp = load('topics');
const add = (id, ids, blurb) => { const t = tp.topics.find((x) => x.id === id); if (!t) return; ids.forEach((s) => t.storyIds.includes(s) || t.storyIds.push(s)); if (blurb) t.blurb = blurb; };
add('beliefs', ['st-family-altar', 'st-sacred-places', 'st-paper-offerings', 'st-tet', 'st-mother-goddess'],
  'Family altars, pagodas and temples, paper offerings, Tết and the Mother Goddesses, plus what a temple asks of visitors.');
add('history', ['st-van-mieu-university', 'st-sword-lake', 'st-thang-long'],
  'Thăng Long as a capital since 1010, the Temple of Literature and its stelae, and the legend of the returned sword.');
save('topics', tp); log.push('themes: beliefs and history updated');

/* page: assets/js/explore.js */
const ef = path.join(root, 'assets/js/explore.js');
let js = fs.readFileSync(ef, 'utf8');
function swap(label, from, to) {
  if (js.includes(to)) return log.push(`page: ${label} already done`);
  if (!js.includes(from)) return log.push(`page: ${label} NOT FOUND, skipped`);
  js = js.replace(from, to); log.push(`page: ${label}`);
}
swap('photos on', 'var PHOTOS = false;', 'var PHOTOS = true;');

const stopsJson = JSON.stringify(C.stops.map((s) => ({ text: s.text, imageId: s.imageId })));
swap('Văn Miếu stop texts',
  "    return '<section class=\"ex-sec\" aria-labelledby=\"inl-title\"><div class=\"ex-wrap\">' +",
  "    var STOPS = " + stopsJson + ";\n    pins.forEach(function (p, i) { p.text = STOPS[i].text; });\n    return '<section class=\"ex-sec\" aria-labelledby=\"inl-title\"><div class=\"ex-wrap\">' +");
swap('Văn Miếu stop body',
  "'<div class=\"ex-pin-body\" id=\"pin-body-' + i + '\"><p>A short paragraph about this stop will sit here, written from the Văn Miếu – Quốc Tử Giám Centre source: what visitors see and what it asks of them.</p>' + ph() + '</div></li>';",
  "'<div class=\"ex-pin-body\" id=\"pin-body-' + i + '\"><p>' + esc(p.text) + '</p><p class=\"ex-pin-src\"><a href=\"story.html?id=st-van-mieu-university&amp;from=overview\">Sources and more on Văn Miếu</a></p></div></li>';");

swap('quote',
  "'<blockquote><p>A line from one of our cited sources will sit here, set large, so the chapter opens with a voice rather than a summary.</p></blockquote>' +\n        '<figcaption>Author, source title · ' + ph() + '</figcaption>' +",
  "'<blockquote><p lang=\"vi\">Hiền tài là nguyên khí của quốc gia.</p><p>People of talent and virtue are the life-breath of the nation.</p></blockquote>' +\n        '<figcaption>Thân Nhân Trung, inscription for the examination of 1442, carved on the first doctoral stele at Văn Miếu in 1484. Translation ours.</figcaption>' +");

swap('quiz pictures A',
  "var a = { name: 'The Temple of Literature is founded', year: '1070', label: 'Photo · Văn Miếu gate' };",
  "var a = { name: 'The Temple of Literature is founded', year: '1070', label: 'Photo · Văn Miếu gate', imageId: 'img-vm-gate' };");
swap('quiz pictures B',
  "var b = { name: 'The first doctoral stelae are carved', year: '1484', label: 'Photo · a stele on its tortoise' };",
  "var b = { name: 'The first doctoral stelae are carved', year: '1484', label: 'Photo · a stele on its tortoise', imageId: 'img-stelae' };");
swap('quiz frame', "frame({ ratio: '4/5', label: x.label })", "frame({ ratio: '4/5', label: x.label, imageId: x.imageId })");
swap('quiz note',
  "'<p class=\"ex-center ex-game-note\">' + ph() + ' Dates to be checked against the UNESCO stelae record before this ships.</p>' +",
  "'<p class=\"ex-center ex-game-note\">Dates from Tuổi Trẻ and the UNESCO Memory of the World record. <a href=\"story.html?id=st-stelae&amp;from=overview\">Read about the stelae</a></p>' +");

/* R.large takes a list, title and intro from the page config */
swap('story lists',
  "  R.large = function () {\n    var ids = (topic('beliefs') || {}).storyIds || [];\n    return '<section class=\"ex-sec\" aria-labelledby=\"large-title\"><div class=\"ex-wrap\">' +\n      head('Read before you visit', 'What a temple or heritage site asks of visitors, and a table habit linked to remembering the dead.', 'large-title') +",
  "  R.large = function (s) {\n    s = s || {};\n    var ids = s.ids || (topic('beliefs') || {}).storyIds || [];\n    var hid = s.id || 'large-title';\n    return '<section class=\"ex-sec\" aria-labelledby=\"' + hid + '\"><div class=\"ex-wrap\">' +\n      head(s.title || 'Read before you visit', s.sub || '', hid) +");
swap('chapter 3 layout',
  "{ type: 'chapter', ch: 2, modules: [{ type: 'quote' }, { type: 'inline' }, { type: 'large' }, { type: 'game' }] },",
  "{ type: 'chapter', ch: 2, modules: [\n      { type: 'quote' },\n      { type: 'inline' },\n      { type: 'large', id: 'past-title', title: 'A thousand years in Hà Nội', sub: 'A capital since 1010, a university since 1076, and a lake named after a legend.', ids: ['st-thang-long', 'st-van-mieu-university', 'st-stelae', 'st-sword-lake'] },\n      { type: 'game' },\n      { type: 'large', id: 'belief-title', title: 'Altars, temples and festivals', sub: 'What you will see in homes, on Hàng Mã and at the pagoda, and what a temple asks of visitors.', ids: ['st-temple-visit', 'st-sacred-places', 'st-family-altar', 'st-paper-offerings', 'st-tet', 'st-mother-goddess'] }\n    ] },");
fs.writeFileSync(ef, js);

console.log(log.join('\n'));
