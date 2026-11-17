/* Ground finishing for Explore maps, run once per map on the baked ground picture (engine.js bake()).
   - Paths that meet a lawn get a stone kerb, with the grass lapping over it unevenly (so the edge stops following
     the 16 px grid).
   - Hedge tiles (hn-tiles hedge-0/1) are redrawn as one clipped hedge per run: darker leaves than the lawn, a bumpy
     top, rounded ends and a shadow on the grass.
   Everything is decided from the map's tiles, and the noise is keyed to world pixels, so the same map always looks
   the same. Maps with no lawn (streets, interiors) are left untouched.
   docs/game/edge-options/ shows the options this came from. */
(function () {
  var CC = window.CC = window.CC || {};

  var LAWN_GROUND = { 'serene-village': [61, 3, 4, 5] };
  var LAWN_DECALS = { 'hn-tiles': [29, 30, 31, 32] };              // leaves, moss, flowers, grass tufts
  var HEDGE = { 'hn-tiles': [27, 28] };
  var PATH = { 'hn-tiles': [8, 9], 'chung-tiles': [4, 5] };      // stone paving, grey pavement
  var PATH_RANGE = { 'van-mieu-tiles': [0, 16] };                // courtyard brick, rows 0-1

  var OUT = [58, 58, 80];
  var ST = [178, 170, 158], ST_L = [206, 198, 182], ST_D = [140, 130, 122];
  var GR_D = [86, 141, 97], GR_S = [101, 168, 92];
  var HG_TOP = [78, 160, 76], HG_HI = [110, 186, 88], HG_RIM = [104, 182, 86], HG_DK = [60, 128, 66];
  var HG_FACE = [60, 116, 72], HG_FACE_DK = [48, 96, 64], HG_LIP = [70, 132, 76], HG_FOOT = [46, 84, 72];

  function hash(x, y, s) {
    var h = (x * 374761393 + y * 668265263 + (s || 0) * 2246822519) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  function vnoise(x, y, sc, s) {
    var fx = x / sc, fy = y / sc, ix = Math.floor(fx), iy = Math.floor(fy), tx = fx - ix, ty = fy - iy;
    tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
    var a = hash(ix, iy, s), b = hash(ix + 1, iy, s), c = hash(ix, iy + 1, s), d = hash(ix + 1, iy + 1, s);
    return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
  }

  /* gid → { set: tileset name, id: local id } */
  function lookup(map) {
    var sets = map.tilesets.slice().sort(function (a, b) { return a.firstgid - b.firstgid; });
    return function (gid) {
      gid &= 0x1fffffff; if (!gid) return null;
      var ts = null; for (var i = 0; i < sets.length; i++) if (gid >= sets[i].firstgid) ts = sets[i];
      return ts ? { set: ts.name, id: gid - ts.firstgid } : null;
    };
  }
  function inList(t, table) { return !!(t && table[t.set] && table[t.set].indexOf(t.id) !== -1); }
  function inRange(t, table) { var r = t && table[t.set]; return !!(r && t.id >= r[0] && t.id < r[1]); }

  /* per tile: 0 other, 1 lawn, 2 path, 3 hedge */
  function classify(map) {
    var of = lookup(map), n = map.w * map.h, kind = new Uint8Array(n);
    var ground = map.layers.filter(function (l) { return l.name === 'ground'; })[0];
    var floor = map.layers.filter(function (l) { return l.name === 'floor'; })[0];
    if (!ground || !floor) return null;
    for (var i = 0; i < n; i++) {
      var f = of(floor.data[i]), g = of(ground.data[i]);
      if (inRange(f, PATH_RANGE) || inList(f, PATH)) kind[i] = 2;
      else if (inList(f, HEDGE)) kind[i] = 3;
      else if ((!f || inList(f, LAWN_DECALS)) && inList(g, LAWN_GROUND)) kind[i] = 1;
    }
    return kind;
  }

  /* Chebyshev distance (capped) to the nearest pixel where src is set: two chamfer passes */
  function distance(src, W, H, cap) {
    var d = new Uint8Array(W * H), x, y, k, v;
    for (k = 0; k < W * H; k++) d[k] = src[k] ? 0 : cap;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      k = y * W + x; v = d[k]; if (!v) continue;
      if (x > 0 && d[k - 1] + 1 < v) v = d[k - 1] + 1;
      if (y > 0) {
        if (d[k - W] + 1 < v) v = d[k - W] + 1;
        if (x > 0 && d[k - W - 1] + 1 < v) v = d[k - W - 1] + 1;
        if (x < W - 1 && d[k - W + 1] + 1 < v) v = d[k - W + 1] + 1;
      }
      d[k] = v;
    }
    for (y = H - 1; y >= 0; y--) for (x = W - 1; x >= 0; x--) {
      k = y * W + x; v = d[k]; if (!v) continue;
      if (x < W - 1 && d[k + 1] + 1 < v) v = d[k + 1] + 1;
      if (y < H - 1) {
        if (d[k + W] + 1 < v) v = d[k + W] + 1;
        if (x < W - 1 && d[k + W + 1] + 1 < v) v = d[k + W + 1] + 1;
        if (x > 0 && d[k + W - 1] + 1 < v) v = d[k + W - 1] + 1;
      }
      d[k] = v;
    }
    return d;
  }

  /* ctx: the whole map's ground and floor at 1 px per pixel. lawnData: ImageData of the ground layer alone. */
  function apply(ctx, lawnData, map) {
    var kind = classify(map); if (!kind) return false;
    var T = map.tile, MW = map.w, MH = map.h, any = false;
    for (var i = 0; i < kind.length && !any; i++) {
      if (kind[i] === 3) any = true;
      else if (kind[i] === 2) {
        var x = i % MW, y = (i / MW) | 0;
        any = (x > 0 && kind[i - 1] === 1) || (x < MW - 1 && kind[i + 1] === 1) || (y > 0 && kind[i - MW] === 1) || (y < MH - 1 && kind[i + MW] === 1);
      }
    }
    if (!any) return false;

    var W = MW * T, H = MH * T;
    var img = ctx.getImageData(0, 0, W, H), p = img.data, lawn = lawnData.data;
    var lawnPx = new Uint8Array(W * H), pathPx = new Uint8Array(W * H);
    for (var py = 0; py < H; py++) for (var px = 0; px < W; px++) {
      var kk = kind[((py / T) | 0) * MW + ((px / T) | 0)];
      if (kk === 1) lawnPx[py * W + px] = 1; else if (kk === 2) pathPx[py * W + px] = 1;
    }
    var dIn = distance(lawnPx, W, H, 8), dOut = distance(pathPx, W, H, 8);
    function set(x, y, c) { var o = (y * W + x) * 4; p[o] = c[0]; p[o + 1] = c[1]; p[o + 2] = c[2]; p[o + 3] = 255; }
    function get(x, y) { var o = (y * W + x) * 4; return [p[o], p[o + 1], p[o + 2]]; }
    function under(x, y) { var o = (y * W + x) * 4; return [lawn[o], lawn[o + 1], lawn[o + 2]]; }
    function mul(c, k) { return [c[0] * k | 0, c[1] * k | 0, c[2] * k | 0]; }
    function bare(x, y) { var c = get(x, y); return c[1] > c[0] + 40 && c[1] > 150; }   // plain grass, not a tuft
    function lawnAt(x, y) { return x >= 0 && y >= 0 && x < W && y < H && lawnPx[y * W + x]; }
    function side(x, y) {   // which way the nearest lawn lies, to orient kerb joints and the lit face
      for (var r = 1; r <= 4; r++) {
        if (lawnAt(x, y - r)) return { h: true, lit: true };
        if (lawnAt(x, y + r)) return { h: true, lit: false };
        if (lawnAt(x - r, y)) return { h: false, lit: true };
        if (lawnAt(x + r, y)) return { h: false, lit: false };
      }
      return null;
    }

    // 1. kerb, then grass lapping over it
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
      var k = y * W + x;
      if (pathPx[k]) {
        var di = dIn[k]; if (di > 5) continue;
        if (di <= 3) {
          var sd = side(x, y), seam = sd && (sd.h ? x % 8 === 0 : y % 8 === 0);
          var c = di === 1 ? OUT : di === 3 ? ST_D : (sd && sd.lit ? ST_L : ST);
          if (di === 2 && hash(x, y, 3) < .12) c = mul(ST, .93);
          if (seam && di > 1) c = ST_D;
          set(x, y, c);
        }
        var reach = vnoise(x, y, 3, 1) * 2 + vnoise(x, y, 9, 2) * 2 - .6;
        if (di <= reach) set(x, y, hash(x, y, 5) < .12 ? GR_D : under(x, y));
        else if (di <= reach + 1) set(x, y, GR_D);
      } else if (lawnPx[k] && dOut[k] === 1 && bare(x, y)) set(x, y, GR_S);
    }

    // 2. hedges, one run of tiles at a time
    for (var ty = 0; ty < MH; ty++) {
      var tx = 0;
      while (tx < MW) {
        if (kind[ty * MW + tx] !== 3) { tx++; continue; }
        var t0 = tx; while (tx < MW && kind[ty * MW + tx] === 3) tx++;
        hedge(t0 * T, (tx * T) - 1, ty * T);
      }
    }
    function hedge(x0, x1, y0) {
      var top = [], bot = [];
      for (var x = x0; x <= x1; x++) {
        var e = Math.min(x - x0, x1 - x);
        top[x] = y0 + 2 + Math.round(vnoise(x, y0, 3, 7) * 2) + (e === 0 ? 3 : e === 1 ? 1 : 0);
        bot[x] = y0 + 14 - (e === 0 ? 1 : 0);
      }
      var inside = function (x, y) { return x >= x0 && x <= x1 && y >= top[x] && y <= bot[x]; };
      // the lawn back under the old tile art, and a soft shadow below and to the right
      for (var y = y0; y < y0 + T; y++) for (var x = x0; x <= x1; x++) set(x, y, under(x, y));
      for (var y2 = y0 + 13; y2 <= y0 + 17 && y2 < H; y2++) for (var x2 = x0 + 2; x2 <= Math.min(W - 1, x1 + 2); x2++) {
        if (inside(x2, y2) || !bare(x2, y2)) continue;
        set(x2, y2, mul(get(x2, y2), y2 <= y0 + 15 ? .78 : .88));
      }
      for (var y3 = y0; y3 < y0 + T; y3++) for (var x3 = x0; x3 <= x1; x3++) {
        if (!inside(x3, y3)) continue;
        var edge = !inside(x3 - 1, y3) || !inside(x3 + 1, y3) || !inside(x3, y3 - 1) || !inside(x3, y3 + 1);
        var c;
        if (edge) c = OUT;
        else if (y3 >= y0 + 9) {
          c = y3 === y0 + 13 ? HG_FOOT : y3 === y0 + 9 ? HG_LIP : hash(x3, y3, 11) < .2 ? HG_FACE_DK : HG_FACE;
        } else {
          c = y3 === top[x3] + 1 ? HG_RIM : vnoise(x3, y3, 2, 13) > .64 ? HG_HI : hash(x3, y3, 17) < .1 ? HG_DK : HG_TOP;
        }
        set(x3, y3, c);
      }
    }

    ctx.putImageData(img, 0, 0);
    return true;
  }

  CC.groundFx = { apply: apply };
})();
