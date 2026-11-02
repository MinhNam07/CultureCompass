#!/usr/bin/env node
/* Builds the Explore mode maps: assets/game/maps/<id>.tmj (Tiled JSON) → assets/game/maps/<id>.js.
   Run from the project root (also part of `npm run build`).

   Why: like the content data, maps are loaded with <script> tags so the game works when the site is
   opened straight from disk (browsers block fetch() on file://).
   Editing maps: open the .tmj in Tiled, keep tilesets EMBEDDED in the map (not external .tsx), save as JSON (.tmj),
   then rebuild. Layers the game reads:
     tile layers  – drawn in order; a layer with the bool property "ysort" is depth-sorted with characters;
                    a layer named "collision" is never drawn: any tile in it blocks movement.
     "objects"    – tile objects (buildings, trees, props) from the image-collection tileset, depth-sorted by their bottom edge.
                    A props tile may have the bool property "flat" (drawn under standing things; automatic for any sprite inside a tiles/ folder),
                    and properties "frames" (comma list of sprite paths) and "fps" for animation.
     "points"     – class/type: spawn, target (compass goal), npc (sprite, speaker, fact | line), hotspot (fact, label), zone (step). */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mapsDir = path.join(root, 'assets', 'game', 'maps');

function props(list) {
  const out = {};
  (list || []).forEach((p) => { out[p.name] = p.value; });
  return out;
}
function rel(fromDir, p) {
  return path.relative(root, path.resolve(fromDir, p)).split(path.sep).join('/');
}

function convert(file) {
  const tmj = JSON.parse(fs.readFileSync(file, 'utf8'));
  const dir = path.dirname(file);
  const name = path.basename(file, '.tmj');
  if (tmj.infinite) throw new Error(`${name}: infinite maps are not supported (Map › Map Properties › untick Infinite)`);
  const tilesets = tmj.tilesets.map((ts) => {
    if (ts.source) throw new Error(`${name}: tileset ${ts.source} is external; embed it in the map (Tilesets panel › Embed tileset)`);
    const out = { firstgid: ts.firstgid, name: ts.name, tw: ts.tilewidth, th: ts.tileheight };
    if (ts.image) Object.assign(out, { image: rel(dir, ts.image), columns: ts.columns, count: ts.tilecount });
    else {
      out.tiles = {};
      (ts.tiles || []).forEach((t) => {
        const p = props(t.properties);
        const tile = { image: rel(dir, t.image), w: t.imagewidth, h: t.imageheight };
        // sprites inside a tiles/ folder (or with a "flat" property) lie on the ground: drawn under everything that stands
        if (p.flat || /\/tiles\//.test(t.image)) tile.flat = true;
        if (p.frames) {
          tile.frames = String(p.frames).split(',').map((s) => 'assets/game/sprites/' + s.trim() + '.png');
          tile.fps = p.fps || 4;
        }
        out.tiles[t.id] = tile;
      });
    }
    return out;
  });
  const layers = [];
  const walk = (list) => list.forEach((l) => {
    if (l.type === 'group') return walk(l.layers || []);
    if (l.type === 'tilelayer') {
      layers.push({ type: 'tiles', name: l.name, data: l.data.map((g) => g & 0x1fffffff), visible: l.visible !== false,
        ysort: !!props(l.properties).ysort, collision: l.name.toLowerCase() === 'collision' });
    } else if (l.type === 'objectgroup') {
      layers.push({ type: 'objects', name: l.name, objects: (l.objects || []).map((o) => {
        const out = { id: o.id, name: o.name || '', cls: o.type || o.class || '', x: o.x, y: o.y, w: o.width || 0, h: o.height || 0 };
        if (o.gid) out.gid = o.gid & 0x1fffffff;
        if (o.point) out.point = true;
        const p = props(o.properties);
        if (Object.keys(p).length) out.props = p;
        return out;
      }) });
    }
  });
  walk(tmj.layers);
  const map = { id: name, w: tmj.width, h: tmj.height, tile: tmj.tilewidth, props: props(tmj.properties), tilesets, layers };
  const js = `/* GENERATED from ${name}.tmj by tools/build-maps.js. Do not edit: edit the map in Tiled and rebuild. */\n` +
    'window.CC = window.CC || {};\nwindow.CC.maps = window.CC.maps || {};\n' +
    `window.CC.maps[${JSON.stringify(name)}] = ${JSON.stringify(map)};\n`;
  fs.writeFileSync(path.join(mapsDir, name + '.js'), js);
  return `assets/game/maps/${name}.js`;
}

if (require.main === module) {
  try {
    const files = fs.existsSync(mapsDir) ? fs.readdirSync(mapsDir).filter((f) => f.endsWith('.tmj')) : [];
    const written = files.map((f) => convert(path.join(mapsDir, f)));
    console.log(written.length ? 'Wrote ' + written.join(', ') : 'No maps to build');
  } catch (e) {
    console.error('✗ ' + e.message);
    process.exit(1);
  }
}
module.exports = { convert };
