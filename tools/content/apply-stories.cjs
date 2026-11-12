/* Merges the rewritten stories (tools/content/stories/*.cjs) into assets/data/*.json.
   Each module exports any of: sources, claims, glossary, stories (each story is merged into the entry with its id,
   so fields it leaves out, such as country or sceneId, are kept), topics ({ id, storyIds, status?, blurb? }).
   Claims are written as given: the module is where a claim's status is decided after checking its sources.
   Safe to run more than once.  Usage: node tools/content/apply-stories.cjs [name ...]   then   npm run build */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const dir = path.join(__dirname, 'stories');

const P = (f) => path.join(root, 'assets/data', f + '.json');
const load = (f) => JSON.parse(fs.readFileSync(P(f), 'utf8'));
const save = (f, o) => fs.writeFileSync(P(f), JSON.stringify(o, null, 2) + '\n');
function upsert(list, items, merge) {
  items.forEach((it) => {
    const i = list.findIndex((x) => x.id === it.id);
    if (i < 0) list.push(it); else list[i] = merge ? Object.assign({}, list[i], it) : it;
  });
}

const only = process.argv.slice(2);
const mods = fs.readdirSync(dir).filter((f) => f.endsWith('.cjs')).filter((f) => !only.length || only.includes(f.replace(/\.cjs$/, '')));
const src = load('sources'), sc = load('scenarios'), st = load('stories'), tp = load('topics'), gl = load('glossary');
const log = [];
mods.forEach((f) => {
  const M = require(path.join(dir, f));
  if (M.sources) upsert(src.sources, M.sources, true);
  if (M.claims) upsert(sc.claims, M.claims, false);
  if (M.glossary) upsert(gl.glossary, M.glossary, false);
  if (M.stories) upsert(st.stories, M.stories, true);
  (M.topics || []).forEach((t) => {
    const T = tp.topics.find((x) => x.id === t.id); if (!T) return;
    (t.storyIds || []).forEach((id) => T.storyIds.includes(id) || T.storyIds.push(id));
    if (t.status) T.status = t.status;
    if (t.blurb) T.blurb = t.blurb;
  });
  log.push(`${f}: ${(M.sources || []).length} sources, ${(M.claims || []).length} claims, ${(M.stories || []).length} stories`);
});
save('sources', src); save('scenarios', sc); save('stories', st); save('topics', tp); save('glossary', gl);
console.log(log.join('\n'));
