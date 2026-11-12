#!/usr/bin/env node
/* Content checker: run `node tools/check-content.js` from the project root.
   Reads the JSON content in assets/data/*.json.
   Errors = invalid JSON, broken links between data, or generated .js files out of date;
   warnings = items still being verified. */
'use strict';
const fs = require('fs');
const path = require('path');
const data = require('./build-data');

const root = path.join(__dirname, '..');
let CC;
try {
  CC = data.loadAll();
} catch (e) {
  console.log('✗ ' + e.message);
  process.exit(1);
}
const errors = [];
const warns = [];

for (const name of data.staleFiles()) {
  errors.push(`assets/data/${name}.js is out of date: run node tools/build-data.js`);
}
const missing = ['sources', 'claims', 'phrases', 'intents', 'assets', 'scenarios', 'stories', 'topics', 'countries'].filter((k) => !Array.isArray(CC[k]));
if (missing.length) {
  console.log(`✗ Missing list(s) in the JSON files: ${missing.join(', ')}`);
  process.exit(1);
}
const ids = (list) => new Set(list.map((x) => x.id));
for (const g of CC.glossary || []) if (!g.id || !g.vi || !g.say || !g.en) errors.push(`Glossary ${g.id || '?'} needs id, vi, say and en`);
const sourceIds = ids(CC.sources), claimIds = ids(CC.claims), phraseIds = ids(CC.phrases), assetIds = ids(CC.assets);

for (const s of CC.sources) if (!s.url || !s.checked) errors.push(`Source ${s.id} needs url and checked date`);

for (const c of CC.claims) {
  (c.sourceIds || []).forEach((s) => sourceIds.has(s) || errors.push(`Claim ${c.id}: unknown source ${s}`));
  if (c.kind !== 'projectNote' && !(c.sourceIds || []).length) errors.push(`Claim ${c.id} has no source`);
  if (c.status === 'needs_verification' || c.status === 'draft') warns.push(`Claim ${c.id} is ${c.status}`);
}
for (const p of CC.phrases) {
  (p.sourceIds || []).forEach((s) => sourceIds.has(s) || errors.push(`Phrase ${p.id}: unknown source ${s}`));
  if (!assetIds.has(p.audioId)) errors.push(`Phrase ${p.id}: unknown audio ${p.audioId}`);
  if (p.status !== 'published' && p.status !== 'reviewed') warns.push(`Phrase ${p.id} "${p.vi}" is ${p.status} (needs a native-speaker check)`);
}
for (const a of CC.assets) {
  if (!a.credit || !a.license) errors.push(`Asset ${a.id} needs credit and license`);
  if (a.kind === 'image' && !a.alt) errors.push(`Asset ${a.id} needs alt text`);
  if (a.file && !fs.existsSync(path.join(root, a.file))) errors.push(`Asset ${a.id}: file missing ${a.file}`);
  if (a.srcBase) [640, 1280, 2560].forEach((w) => { const f = `${a.srcBase}-${w}.webp`; if (!fs.existsSync(path.join(root, f))) errors.push(`Asset ${a.id}: file missing ${f}`); });
  if (a.srcBase && !(a.width && a.height)) errors.push(`Asset ${a.id}: a picture with sizes needs width and height`);
  if (a.synthetic) warns.push(`Asset ${a.id} is a synthetic placeholder voice`);
}
// Landing page: every video must exist and be credited; ready countries need a page.
const imageIds0 = new Set(CC.assets.filter((a) => a.kind === 'image').map((a) => a.id));
const videoIds = new Set(CC.assets.filter((a) => a.kind === 'video').map((a) => a.id));
for (const a of CC.assets.filter((x) => x.kind === 'video')) {
  if (!a.alt) errors.push(`Asset ${a.id} needs alt text`);
  if (a.poster && !fs.existsSync(path.join(root, a.poster))) errors.push(`Asset ${a.id}: poster missing ${a.poster}`);
}
// Home opening gallery: every photo credited, with alt text, a place from its file page, and both AVIF and WebP sizes on disk.
if (!(CC.heroGallery || []).length) errors.push('heroGallery is empty: the home opening needs its photos');
const galleryIds = new Set();
for (const h of CC.heroGallery || []) {
  const a = CC.assets.find((x) => x.id === h.assetId);
  if (!a || a.kind !== 'image') { errors.push(`Home gallery: unknown image ${h.assetId}`); continue; }
  if (galleryIds.has(h.assetId)) errors.push(`Home gallery: ${h.assetId} is listed twice`);
  galleryIds.add(h.assetId);
  if (!h.place) errors.push(`Home gallery ${h.assetId} needs a place`);
  if (!h.what) errors.push(`Home gallery ${h.assetId} needs a short caption (what)`);
  if (!a.sourceUrl || !a.width || !a.height) errors.push(`Asset ${a.id} needs sourceUrl, width and height`);
  for (const size of ['s', 'l']) for (const ext of ['avif', 'webp']) {
    const f = `${(a.sizes || {})[size]}.${ext}`;
    if (!fs.existsSync(path.join(root, f))) errors.push(`Asset ${a.id}: file missing ${f}`);
  }
}
for (const c of CC.countries || []) {
  const pv = c.preview || {};
  if (pv.imageId && !imageIds0.has(pv.imageId)) errors.push(`Country ${c.id}: unknown preview image ${pv.imageId}`);
  if (pv.videoId && !videoIds.has(pv.videoId)) errors.push(`Country ${c.id}: unknown preview video ${pv.videoId}`);
  for (const x of c.contexts || []) {
    const w = `Country ${c.id} context ${x.id}`;
    if (!x.title || !x.line) errors.push(`${w}: needs a title and a line`);
    if (!imageIds0.has(x.imageId)) errors.push(`${w}: unknown image ${x.imageId}`);
    if (!x.caption) errors.push(`${w}: needs a caption naming the place`);
    if (!(CC.phrases || []).some((p) => p.id === x.phraseId)) errors.push(`${w}: unknown phrase ${x.phraseId}`);
    if (x.sceneId && !(CC.scenarios || []).some((s) => s.id === x.sceneId)) errors.push(`${w}: unknown scene ${x.sceneId}`);
    if (!(x.href && fs.existsSync(path.join(root, x.href.split(/[?#]/)[0])))) errors.push(`${w}: page missing ${x.href}`);
  }
  if (c.status === 'ready' && !(c.href && fs.existsSync(path.join(root, c.href.split(/[?#]/)[0])))) errors.push(`Country ${c.id}: page missing ${c.href}`);
}
const checkRefs = (where, cl = [], ph = []) => {
  (cl || []).forEach((c) => claimIds.has(c) || errors.push(`${where}: unknown claim ${c}`));
  (ph || []).forEach((p) => phraseIds.has(p) || errors.push(`${where}: unknown phrase ${p}`));
};
for (const sc of CC.scenarios) {
  const hs = ids(sc.hotspots);
  sc.hotspots.forEach((h) => checkRefs(`${sc.id}/${h.id}`, h.claimIds));
  sc.steps.forEach((st) => {
    (st.highlight || []).forEach((h) => hs.has(h) || errors.push(`${sc.id}/${st.id}: unknown hotspot ${h}`));
    if (st.choices.length < 2) errors.push(`${sc.id}/${st.id}: needs at least two choices`);
    st.choices.forEach((ch) => {
      const where = `${sc.id}/${st.id}/${ch.id}`;
      checkRefs(where, ch.claimIds, ch.phraseIds);
      if (!['fit', 'alsoFit', 'needInfo', 'seeGuide'].includes(ch.type)) errors.push(`${where}: bad type ${ch.type}`);
      if (!ch.claimIds || !ch.claimIds.length) errors.push(`${where}: feedback has no claim`);
      if (!ch.stills || !ch.stills.length) errors.push(`${where}: needs still steps for reduced motion`);
    });
  });
    sc.summary.forEach((s, i) => checkRefs(`${sc.id}/summary${i}`, s.claimIds));
  checkRefs(`${sc.id}/reminder`, sc.reminder.claimIds, sc.reminder.phraseIds);
}

/* Stories, themes and icons. Every id must point at existing content; every icon must exist in svgs.js. */
const vm = require('vm');
const svgCtx = { window: { CC: {} } };
vm.createContext(svgCtx);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/data/svgs.js'), 'utf8'), svgCtx, { filename: 'svgs.js' });
const icons = svgCtx.window.CC.icons || {};
const sceneIds = ids(CC.scenarios);
const countryIds = ids(CC.countries || []);
const storyIds = ids(CC.stories || []);
const imageIds = new Set(CC.assets.filter((a) => a.kind === 'image').map((a) => a.id));
const storyCount = {};
for (const st of CC.stories || []) {
  const where = `Story ${st.id}`;
  storyCount[st.id] = (storyCount[st.id] || 0) + 1;
  if (storyCount[st.id] > 1) errors.push(`${where}: duplicate id`);
  if (!st.title || !st.dek || !st.place || !st.appliesTo || !st.varies) errors.push(`${where} needs title, dek, place, appliesTo and varies`);
  if (!countryIds.has(st.country)) errors.push(`${where}: unknown country ${st.country}`);
  if (st.imageId && !imageIds.has(st.imageId)) errors.push(`${where}: unknown image ${st.imageId}`);
  if (st.sceneId && !sceneIds.has(st.sceneId)) errors.push(`${where}: unknown scene ${st.sceneId}`);
  if (!(st.sections || []).length) errors.push(`${where} has no sections`);
  (st.sections || []).forEach((sec, i) => {
    const w = `${where} section ${i + 1}`;
    if (!sec.text) errors.push(`${w} has no text`);
    if (!sec.editorial && !(sec.claimIds || []).length) errors.push(`${w} makes a claim without claimIds (mark editorial: true if it only frames scope)`);
    checkRefs(w, sec.claimIds);
    (sec.claimIds || []).forEach((c) => {
      const cl = CC.claims.find((x) => x.id === c);
      if (cl && (cl.status === 'needs_verification' || cl.status === 'draft')) warns.push(`${w} uses ${c}, still ${cl.status}`);
    });
  });
  checkRefs(where, [], st.phraseIds);
  if (st.blocks) checkBlocks(st, where);
  if (!(CC.topics || []).some((t) => (t.storyIds || []).includes(st.id))) errors.push(`${where} is not in any theme, so nobody can find it`);
}
/* stories in blocks (assets/js/story-blocks.js): every picture, clip, claim, phrase, glossary word and map must exist */
function checkBlocks(st, where) {
  const LAYOUTS = ['longform', 'essay', 'timeline', 'guide', 'compare'];
  const TYPES = ['text', 'figure', 'pair', 'gallery', 'video', 'quote', 'facts', 'note', 'beforeAfter', 'timeline', 'steps', 'dodont', 'quiz', 'keep', 'tabs', 'map', 'cards', 'phrases', 'essay'];
  const glossary = new Set((CC.glossary || []).map((g) => g.id));
  if (!LAYOUTS.includes(st.layout)) errors.push(`${where}: layout must be one of ${LAYOUTS.join(', ')}`);
  const hero = st.hero || {};
  if (st.layout !== 'essay' && !hero.image && !hero.video && !st.imageId) errors.push(`${where}: a block story needs hero.image, hero.video or imageId`);
  if (hero.image && !imageIds.has(hero.image)) errors.push(`${where}: unknown hero image ${hero.image}`);
  if (hero.video && !videoIds.has(hero.video)) errors.push(`${where}: unknown hero video ${hero.video}`);
  if (st.layout === 'essay' && !st.blocks.some((b) => b.type === 'essay')) errors.push(`${where}: the essay layout opens with an essay block`);
  let claimsSeen = 0, unsourced = 0;
  const pic = (w, id) => { if (!id) errors.push(`${w}: missing picture`); else if (!imageIds.has(id)) errors.push(`${w}: unknown picture ${id}`); };
  const text = (w, s) => {
    if (typeof s !== 'string') return;
    (s.match(/\[\[([\w-]+)/g) || []).forEach((m) => { const g = m.slice(2); if (!glossary.has(g)) errors.push(`${w}: unknown glossary word ${g}`); });
    (s.match(/\(story:([\w-]+)\)/g) || []).forEach((m) => { const id = m.slice(7, -1); if (!storyIds.has(id)) errors.push(`${w}: link to unknown story ${id}`); });
  };
  const claims = (w, list) => {
    if (!list) return;
    claimsSeen += list.length;
    checkRefs(w, list);
    list.forEach((c) => { const cl = CC.claims.find((x) => x.id === c); if (cl && (cl.status === 'needs_verification' || cl.status === 'draft')) warns.push(`${w} uses ${c}, still ${cl.status}`); });
  };
  const para = (w, p) => {
    if (typeof p === 'string') { text(w, p); unsourced++; return; }
    if (p.h3) return text(w, p.h3);
    if (p.list) p.list.forEach((li) => text(w, li)); else { if (!p.text) errors.push(`${w}: paragraph without text`); text(w, p.text); }
    if (!p.claimIds && !p.editorial) unsourced++;
    claims(w, p.claimIds);
  };
  st.blocks.forEach((b, i) => {
    const w = `${where} block ${i + 1} (${b.type})`;
    if (!TYPES.includes(b.type)) { errors.push(`${w}: unknown block type`); return; }
    text(w, b.heading); text(w, b.caption); text(w, b.intro);
    claims(w, b.claimIds);
    switch (b.type) {
      case 'text': if (!(b.paras || []).length) errors.push(`${w}: no paragraphs`); (b.paras || []).forEach((p) => para(w, p)); break;
      case 'figure': pic(w, b.image); if (b.size && !['inline', 'wide', 'bleed'].includes(b.size)) errors.push(`${w}: size must be inline, wide or bleed`); break;
      case 'pair': if ((b.items || []).length !== 2) errors.push(`${w}: a pair has two pictures`); (b.items || []).forEach((it) => pic(w, it.image)); break;
      case 'gallery': if ((b.items || []).length < 3) errors.push(`${w}: a gallery needs at least three pictures`); (b.items || []).forEach((it) => pic(w, it.image)); break;
      case 'video': if (!videoIds.has(b.video)) errors.push(`${w}: unknown video ${b.video}`); break;
      case 'quote': if (!b.text) errors.push(`${w}: no text`); break;
      case 'facts': case 'keep': if (!(b.items || []).length) errors.push(`${w}: no items`); (b.items || []).forEach((it) => { if (!it.term || !it.text) errors.push(`${w}: each item needs term and text`); }); break;
      case 'note': if (!b.text) errors.push(`${w}: no text`); text(w, b.text); break;
      case 'beforeAfter': pic(w, b.before); pic(w, b.after); if (!b.labelBefore || !b.labelAfter) errors.push(`${w}: needs labelBefore and labelAfter`); break;
      case 'timeline': (b.items || []).forEach((it, k) => {
        if (it.era) return;
        if (!it.year || !it.title) errors.push(`${w} item ${k + 1}: needs year and title`);
        if (it.image) pic(w, it.image);
        (it.paras || [{ text: it.text, claimIds: it.claimIds }]).forEach((p) => para(`${w} item ${k + 1}`, p));
      }); break;
      case 'steps': (b.items || []).forEach((it, k) => {
        if (!it.title) errors.push(`${w} step ${k + 1}: no title`);
        if (it.image) pic(w, it.image);
        checkRefs(w, [], it.phraseIds);
        (it.paras || [{ text: it.text, claimIds: it.claimIds }]).forEach((p) => para(`${w} step ${k + 1}`, p));
      }); break;
      case 'dodont': ['do', 'think'].forEach((k) => { if (!b[k] || !(b[k].items || []).length) errors.push(`${w}: needs ${k}.items`); else b[k].items.forEach((li) => { if (typeof li === 'object') claims(w, li.claimIds); }); }); break;
      case 'quiz':
        if (b.image) pic(w, b.image);
        if (!b.question || (b.options || []).length < 2) errors.push(`${w}: needs a question and at least two options`);
        if (!(b.options || []).some((o) => o.fit)) errors.push(`${w}: no option fits`);
        (b.options || []).forEach((o) => { if (!o.label || !o.feedback) errors.push(`${w}: each option needs label and feedback`); });
        break;
      case 'tabs': (b.tabs || []).forEach((t) => {
        if (!t.label || !(t.columns || []).length) errors.push(`${w}: each table needs label and columns`);
        (t.rows || []).forEach((r) => { if (r.length !== t.columns.length) errors.push(`${w}: row “${typeof r[0] === 'string' ? r[0] : r[0].text}” has ${r.length} cells for ${t.columns.length} columns`); r.forEach((c) => { if (c && c.claimIds) claims(w, c.claimIds); }); });
      }); break;
      case 'map':
        if (!fs.existsSync(path.join(root, 'assets/data/maps', b.map + '.js'))) errors.push(`${w}: map file missing assets/data/maps/${b.map}.js`);
        (b.places || []).forEach((p) => { if (!p.name || !p.text) errors.push(`${w}: each place needs name and text`); if (p.image) pic(w, p.image); });
        break;
      case 'cards': (b.items || []).forEach((it) => { if (!it.title || !it.text) errors.push(`${w}: each card needs title and text`); if (it.image) pic(w, it.image); }); break;
      case 'phrases': checkRefs(w, [], b.ids); break;
      case 'essay': (b.steps || []).forEach((s, k) => { pic(`${w} step ${k + 1}`, s.image); (s.paras || [{ text: s.text, claimIds: s.claimIds }]).forEach((p) => para(`${w} step ${k + 1}`, p)); }); break;
    }
  });
  if (!claimsSeen) errors.push(`${where}: no block cites a claim`);
  if (unsourced) warns.push(`${where}: ${unsourced} paragraph(s) with no claimIds (fine for framing; mark editorial: true to silence)`);
}
for (const sc of CC.scenarios) {
  (sc.storyIds || []).forEach((s) => storyIds.has(s) || errors.push(`${sc.id}: unknown story ${s}`));
  sc.steps.forEach((step) => step.choices.forEach((ch) => {
    if (ch.openStory && !(sc.storyIds || []).includes(ch.openStory)) errors.push(`${sc.id}/${step.id}/${ch.id}: openStory ${ch.openStory} is not one of the scene's stories`);
  }));
}
const topicIds = new Set();
const aliasIds = new Set();
for (const t of CC.topics || []) {
  const where = `Theme ${t.id}`;
  if (topicIds.has(t.id)) errors.push(`${where}: duplicate id`);
  topicIds.add(t.id);
  (t.aliases || []).forEach((a) => { if (aliasIds.has(a)) errors.push(`${where}: alias ${a} used twice`); aliasIds.add(a); });
  if (!t.label || !t.vi || !t.blurb || !t.question) errors.push(`${where} needs label, vi, question and blurb`);
  if (!countryIds.has(t.country)) errors.push(`${where}: unknown country ${t.country}`);
  if (!icons[t.icon]) errors.push(`${where}: unknown icon ${t.icon}`);
  if (!['ready', 'planned'].includes(t.status)) errors.push(`${where}: bad status ${t.status}`);
  const n = (t.storyIds || []).length + (t.sceneIds || []).length + (t.phraseIds || []).length;
  if (t.status === 'ready' && !(t.storyIds || []).length) errors.push(`${where} is ready but has no stories`);
  if (t.status === 'planned' && n) errors.push(`${where} is planned but lists content`);
  (t.storyIds || []).forEach((s) => storyIds.has(s) || errors.push(`${where}: unknown story ${s}`));
  (t.sceneIds || []).forEach((s) => sceneIds.has(s) || errors.push(`${where}: unknown scene ${s}`));
  checkRefs(where, [], t.phraseIds);
}
for (const a of aliasIds) if (topicIds.has(a)) errors.push(`Alias ${a} clashes with a theme id`);
['play', 'know', 'say', 'compass'].forEach((k) => icons[k] || errors.push(`svgs.js: missing icon ${k}`));

console.log(`Checked ${CC.sources.length} sources, ${CC.claims.length} claims, ${CC.phrases.length} phrases, ${CC.assets.length} assets, ${CC.scenarios.length} scenes, ${CC.stories.length} stories, ${CC.topics.length} themes.`);
if (warns.length) { console.log(`\n${warns.length} item(s) still being verified:`); warns.forEach((w) => console.log('  - ' + w)); }
if (errors.length) { console.log(`\n${errors.length} error(s):`); errors.forEach((e) => console.log('  ✗ ' + e)); process.exit(1); }
console.log('\nNo errors.');
