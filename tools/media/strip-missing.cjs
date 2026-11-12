/* Drop pictures that are not in assets.json yet from assets/data/stories.json,
   so the site builds while some photos are still to be downloaded.
   The story modules in tools/content/stories keep the full picture list:
   re-running apply-stories.cjs puts them back once the photos are registered.
   Usage: node tools/media/strip-missing.cjs  (then node tools/build-data.js) */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const assetsFile = path.join(root, 'assets/data/assets.json');
const storiesFile = path.join(root, 'assets/data/stories.json');
const A = JSON.parse(fs.readFileSync(assetsFile, 'utf8'));
const have = new Set((A.assets || A).map((a) => a.id));
const raw = JSON.parse(fs.readFileSync(storiesFile, 'utf8'));
const stories = raw.stories || raw;
const SUB = { 'ar-tube-street': 'oq-tube-houses', 'ar-wp-show': 'ar-wp-finale' };
/* stand-in cover photos, already on the site, for stories whose own cover is not downloaded yet */
const HERO = { 'st-shared-table': 'ev-home-meal', 'st-ca-tru': 'oq-hang-bac-2', 'st-folk-paintings': 'oq-hang-ma', 'st-bat-trang': 'ev-ceramics-bike' };
const ok = (id) => id && have.has(id);
let dropped = 0;
const fix = (id) => (id && !have.has(id) && SUB[id] && have.has(SUB[id]) ? SUB[id] : id);

for (const st of stories) {
  if (st.hero && st.hero.image) { st.hero.image = fix(st.hero.image); if (!ok(st.hero.image)) { delete st.hero.image; dropped++; } }
  if (st.imageId) { st.imageId = fix(st.imageId); if (!ok(st.imageId)) { if (st.hero && st.hero.image) st.imageId = st.hero.image; else delete st.imageId; dropped++; } }
  if (!(st.hero && (st.hero.image || st.hero.video)) && !st.imageId && HERO[st.id] && have.has(HERO[st.id])) {
    st.hero = Object.assign(st.hero || {}, { image: HERO[st.id] }); st.imageId = HERO[st.id];
  }
  const out = [];
  for (const b of st.blocks || []) {
    const clean = (o, key = 'image') => { if (o && o[key]) { o[key] = fix(o[key]); if (!ok(o[key])) { delete o[key]; dropped++; } } };
    if (b.type === 'essay') {
      b.steps.forEach((s) => clean(s));
      /* a step without a picture joins the step before it */
      const steps = [];
      for (const s of b.steps) {
        if (s.image || !steps.length) { steps.push(s); continue; }
        const prev = steps[steps.length - 1];
        const paras = (x) => x.paras || [{ text: x.text, claimIds: x.claimIds }];
        prev.paras = paras(prev).concat(paras(s)); delete prev.text; delete prev.claimIds;
      }
      b.steps = steps;
      if (!b.steps[0].image) continue;
    }
    if (b.type === 'figure') { clean(b); if (!b.image) continue; }
    if (b.type === 'pair' || b.type === 'gallery') {
      (b.items || []).forEach((it) => clean(it));
      b.items = (b.items || []).filter((it) => it.image);
      if (b.type === 'gallery' && b.items.length === 2) b.type = 'pair';
      if (b.items.length === 1) { const it = b.items[0]; out.push({ type: 'figure', image: it.image, caption: it.caption, size: 'wide' }); continue; }
      if (!b.items.length) continue;
    }
    if (b.type === 'beforeAfter') { clean(b, 'before'); clean(b, 'after'); if (!b.before || !b.after) continue; }
    clean(b);
    for (const k of ['items', 'places', 'steps']) if (Array.isArray(b[k])) b[k].forEach((it) => clean(it));
    out.push(b);
  }
  st.blocks = out;
}
fs.writeFileSync(storiesFile, JSON.stringify(raw, null, 2) + '\n');
console.log('pictures dropped or moved:', dropped);
