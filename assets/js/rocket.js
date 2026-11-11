/* CultureCompass — Home: the rocket from the logo.
   Before the visitor scrolls, the logo's rocket circles the logo's own orbit (behind the star on the top half,
   in front on the bottom half). Scrolling drops it out of the logo; it only grows once it has left the header,
   and settles in the middle of the screen at its parked size. Through the opening it cruises left to right,
   against the pictures drifting right to left: it speeds up and slows down with them (same sine in-out, same
   320 ms follow), weaves gently twice, and answers the hand (it surges ahead and lifts its nose when the page is
   scrolled fast, drifts back when the scroll slows). When the opening ends it swoops: bends down, dips below the
   parking spot and pulls up through a wide arc into it, nose up, arriving at exactly the speed the page moves,
   so it docks without a bump. Parked beside the globe in "Choose a destination" it holds station (a slow drift,
   a puff now and then) and points at the flag under the pointer. A light spring (0.15 s) over the whole flight
   gives it a little weight. The engine burns when it speeds up or turns (longer, brighter flame, a trail of
   puffs) and coasts on a pilot flame otherwise; nose jets on the capsule start and stop each turn.
   Scroll back and it turns round under itself (nose down) and flies nose first back into the logo; scroll on and
   it turns back. On phones it crosses the opening and then burns
   away up and to the right; it does not park.

   Decoration only: aria-hidden, never focusable, nothing depends on it. With reduced motion (system or the
   site's setting) nothing flies: the logo stays whole and one still rocket stands beside the globe (wider
   screens only). Transforms and opacity only, one requestAnimationFrame loop that stops when nothing moves;
   layout is read in measure(), never per frame. The
   globe lives in an iframe, which reports where the globe is (components/3d-globe-demo.tsx, message
   "culturecompass-rocket"). Plans: plans/002-rocket-swoop.md (flight), plans/015-new-ship.md (ship art). */
(function () {
  'use strict';
  var CC = window.CC;

  /* ---- tuning: change these to place the rocket ---- */
  var CFG = {
    station: {
      length: 1.0,      // rocket length when parked, in globe diameters
      minLength: 0.85,  // it shrinks down to this if the gap beside the globe is too narrow
      gap: 0.12,        // gap between the globe's right edge and the rocket, in globe radii
      overlap: 0.35,    // share of its width it may overlap the globe's edge before it shrinks
      offsetY: 0        // 0 = rocket centre level with the globe centre; negative = higher (in radii)
    },
    orbitSeconds: 8,    // one turn around the logo
    orbitDelay: 1.5,    // seconds before it starts circling
    takeoffEnd: 0.12,   // share of the opening's scroll spent leaving the logo
    cruiseY: 0.5,       // height of the cruise, in viewport heights
    cruiseFrom: 0.06,   // earliest cruise start, in viewport widths (also kept clear of the logo)
    flow: 0.6,          // the pictures' speed (px per px scrolled): the nose is read against them
    smoothMs: 320,      // how far the rocket trails the scroll; same as the pictures (home.js)
    weave: 0.03,        // cruise weave height, in viewport heights
    waves: 2,           // weaves across the opening
    surge: 0.05,        // furthest it surges ahead when scrolled fast, in viewport widths
    reverse: { speed: 1.5, ms: 520 },   // scrolling back faster than this (px per frame) turns it round, over this long
    swoop: { bend: 0.09, drop: 0.08, pull: 0.11 },     // bend-down radius, descent, pull-up radius (viewport heights)
    follow: { response: 0.15, damping: 0.8 },          // spring on position (seconds, damping ratio)
    turn: { response: 0.2, damping: 0.85 },            // spring on the nose
    keep: { ax: 0.010, ay: 0.008, px: 9.0, py: 7.0, tilt: 1.5, pt: 11.0, puffMin: 4, puffMax: 7 },   // parked drift (diameters), periods (s), nose drift (deg), seconds between trim puffs
    bob: { amp: 1, period: 2.4 },   // pixel ship hover: up and down by whole sprite pixels (amp), one cycle every period s
    shadow: 0.03,       // shadow drop below the rocket, in box sides; always straight down on screen
    flame: { pilot: 0.45, max: 1.0, flicker: 0.05 },        // flame length (share of its picture) coasting / at full burn, flicker share
    thrust: { full: 2, side: 0.8, up: 60, down: 280 },       // acceleration for full burn (viewport heights per s^2), weight of turning, smoothing ms (rise, fall)
    rcs: { minRate: 70, brake: 25, gap: 180, ms: 160 },   // nose jets: deg/s to fire, deg/s drop that counts as braking, ms between puffs per side, puff ms
    trail: { count: 18, rate: 40, life: 700, speed: 0.35, size: 48 },   // exhaust puffs: pool size, per s at full burn, ms, viewport heights per s, px
    phone: 760
  };

  /* measured once from assets/img/brand/cc-logo-1024.png (the ring is an ellipse; t = 0 is its upper-right end) */
  var LOGO = { size: 1024, cx: 511.17, cy: 509.62, a: 478.78, b: 136.62, ux: 0.78853222, uy: -0.61499345, t0: -0.066, rocketLen: 137.9, head: 45 };   // head: the logo's own rocket points north-east
  /* the ship (Gemini, 08/11; plans/015-new-ship.md): drawn nose up, cropped tight, 956 x 2464 at full size.
     It sits in a square box as tall as the picture, centred, so the box turns about the middle of the ship.
     side = box side in picture px, len = nose-to-tail length, width = width / length, nose = heading of the picture */
  var PIC = { src: 'assets/img/brand/ship-rocket-900.webp', side: 2464, len: 2464, width: 956 / 2464, nose: 0 };
  var PIC_SMALL = 'assets/img/brand/ship-rocket-256.webp';   // the logo's rocket is ~5px long; a small source keeps it from shimmering
  /* the flame is its own picture (753 x 2323), tucked into the nozzle behind the hull. Placement in shares of the
     ship picture: left 18%, width 64.6%, top 95.4%. It stretches from its top edge (the nozzle). */
  var FLAME = { src: 'assets/img/brand/ship-flame-900.webp', left: 0.18, width: 0.646, top: 0.954, aspect: 2323 / 753 };
  /* nose jets on the capsule cone, below the two round windows (plans/010-rocket-rcs.md) */
  var RCS = { left: { at: [211.5, 116.4], dir: [-0.934, -0.356] }, right: { at: [300.5, 116.4], dir: [0.934, -0.356] } };   // 512-box px on the capsule cone; dir = which way the gas leaves
  var NOZZLE = [256, 490];   // nozzle exit in the 512 box (plans/015-new-ship.md)
  var LOGO_NO_ROCKET = 'assets/img/brand/cc-logo-no-rocket-128.png';
  var LOGO_NO_ROCKET_2X = 'assets/img/brand/cc-logo-no-rocket-256.png';
  var FLY_BASE = 512;      // the flying rocket's box, scaled to size

  var on = false, raf = 0, last = 0, startedAt = 0;
  var els = {};            // mark, markRocket, fly, frame
  var m = {};              // measurements
  var globe = null;        // from the iframe: { x, y, r } in iframe px, textLeft, hud, hover
  var cur = null;          // displayed state { x, y, len, head, op }
  var sp = null;           // spring state { x, y, vx, vy, h, vh }
  var orbitT = LOGO.t0, orbitRamp = 0;
  var sm = 0, prevScroll = 0, vScroll = 0, surge = 0;   // smoothed scroll, last raw scroll, px/frame, surge px
  var back = false, flip = 0;   // scrolled back: it turns round (through nose down) and flies nose first the other way
  var thr = 0, grow = 0, flameLen = 0, pvx = 0, pvy = 0;   // engine: thrust 0..1, take-off growth 0..1, last flame length, last spring speed

  /* ---------- pixel rocket (plans/016-pixel-rocket.md), the default since 11/11; index.html?rocket=classic shows
     the painted ship for comparison ----------
     The ship, its flame and its nose jets are drawn into a small canvas (G x G sprite pixels), rotated there in 15°
     steps with smoothing off, and that canvas is scaled up with image-rendering: pixelated. So pixels stay square at
     every angle and the box itself is never rotated. Ship: tools/pixel-rocket/ship.py; effects: beanfx sheets from
     tools/pixel-rocket/fx.py (4 frames per row). */
  var PIXEL = !/[?&]rocket=classic\b/.test(window.location.search);
  var PXDIR = 'assets/img/brand/pixel/';
  var PX = { w: 26, h: 64, G: 128, step: 15, fps: 12, cols: 4,
    nozzle: [13, 61],                        // where the flame hangs, sprite px
    jets: { left: [5, 14], right: [21, 14] }, // nose jet roots, sprite px
    sheets: { ship: 'ship.png?v=3', flame: 'pixel-flame.png', ignite: 'pixel-ignite.png', puff: 'pixel-puff.png', rcs: 'pixel-rcs.png' },
    size: { flame: [16, 32, 6], ignite: [16, 32, 5], puff: [12, 12, 6], rcs: [8, 6, 4] } };
  var px = { img: {}, ctx: null, key: '', frame: 0, lastFrameAt: 0, litAt: -1e9, wasLit: false, jetAt: { left: -1e9, right: -1e9 },
    shake: [0, 0], embers: [] };
  var PX_SHAKE = { from: 0.7, steps: [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]] };   // thrust that starts the shake; 1 px nudges
  var PX_EMBER = { from: 0.5, max: 10, colours: ['#F1CE8E', '#E8B84A', '#FC5C46', '#BA2D2F'] };   // thrust that sheds embers, pool, hot to cool
  /* once per 12 fps tick: pick the shake nudge, shed and move the embers (sprite px, in the ship's own axes) */
  function pxTick(rows) {
    px.shake = thr > PX_SHAKE.from ? PX_SHAKE.steps[Math.floor(Math.random() * PX_SHAKE.steps.length)] : [0, 0];
    var e = px.embers;
    for (var i = e.length - 1; i >= 0; i--) {
      e[i].x += e[i].vx; e[i].y += e[i].vy; e[i].age++;
      if (e[i].age >= e[i].life) e.splice(i, 1);
    }
    /* born at the flame's edge where it tapers, then thrown out sideways and left behind */
    var n = thr > PX_EMBER.from ? 1 + (Math.random() < (thr - PX_EMBER.from) * 2 ? 1 : 0) : 0;
    for (var k = 0; k < n && e.length < PX_EMBER.max; k++) {
      var side = Math.random() < 0.5 ? -1 : 1, at = 0.45 + Math.random() * 0.4;
      e.push({ x: PX.nozzle[0] - 1 + side * Math.round(1 + 4 * (1 - at)), y: PX.nozzle[1] + Math.floor(rows * at),
        vx: side, vy: 1 + (Math.random() < 0.6 ? 1 : 0), age: 0, life: 4 + Math.floor(Math.random() * 3) });
    }
  }
  function pxLoad() {
    Object.keys(PX.sheets).forEach(function (k) {
      var img = new Image();
      img.onload = function () { px.img[k] = img; px.key = ''; };
      img.src = PXDIR + PX.sheets[k];
    });
  }
  /* frame f of a sheet, drawn with its pivot at (x, y); rows clips it to its top rows; flip mirrors it */
  function pxCell(x, name, f, dx, dy, rows, flip) {
    var img = px.img[name], sz = PX.size[name];
    if (!img) return;
    var w = sz[0], h = Math.min(sz[1], rows || sz[1]), sx = (f % PX.cols) * w, sy = Math.floor(f / PX.cols) * sz[1];
    if (flip) { x.save(); x.scale(-1, 1); x.drawImage(img, sx, sy, w, h, -dx, dy, w, h); x.restore(); }
    else x.drawImage(img, sx, sy, w, h, dx, dy, w, h);
  }
  function drawPixel(st, now) {
    if (!px.ctx || !px.img.ship) return;
    var ang = Math.round((st.head - PIC.nose) / PX.step) * PX.step;
    var ticked = false;
    if (now - px.lastFrameAt > 1000 / PX.fps) { px.frame++; px.lastFrameAt = now; ticked = true; }
    /* flame: a short pilot uses the small ignition shapes, a burn the looping sheet cut to length; it lights with
       the whole ignition run */
    var lit = flameLen >= 0.05, fl = '', ff = 0, rows = 0;
    if (lit && !px.wasLit) px.litAt = now;
    px.wasLit = lit;
    if (lit) {
      var since = Math.floor((now - px.litAt) * PX.fps / 1000);
      if (since < PX.size.ignite[2]) { fl = 'ignite'; ff = since; }
      else if (flameLen < 0.3) { fl = 'ignite'; ff = flameLen < 0.15 ? 1 : 2; }
      else { fl = 'flame'; ff = px.frame % PX.size.flame[2]; rows = Math.max(12, Math.round(Math.min(1, flameLen) * 32)); }
    }
    if (ticked) pxTick(rows || 12);
    var jl = Math.floor((now - px.jetAt.left) * 15 / 1000), jr = Math.floor((now - px.jetAt.right) * 15 / 1000);
    jl = jl < PX.size.rcs[2] ? jl : -1; jr = jr < PX.size.rcs[2] ? jr : -1;
    var key = ang + '|' + fl + ff + '|' + rows + '|' + jl + '|' + jr + '|' + px.shake + '|' + (px.embers.length ? px.frame : 0);
    if (key === px.key) return;
    px.key = key;
    var x = px.ctx, G = PX.G;
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.clearRect(0, 0, G, G);
    x.imageSmoothingEnabled = false;
    x.translate(G / 2 + px.shake[0], G / 2 + px.shake[1]);   // the shake is on screen, whatever way the ship faces
    x.rotate(ang * Math.PI / 180);
    x.translate(-PX.w / 2, -PX.h / 2);
    if (fl) pxCell(x, fl, ff, PX.nozzle[0] - 8, PX.nozzle[1], rows);
    for (var i = 0; i < px.embers.length; i++) {
      var em = px.embers[i];
      x.fillStyle = PX_EMBER.colours[Math.min(PX_EMBER.colours.length - 1, Math.floor(em.age / em.life * PX_EMBER.colours.length))];
      x.fillRect(em.x, em.y, 1, 1);
    }
    x.drawImage(px.img.ship, 0, 0);
    if (jl >= 0) pxCell(x, 'rcs', jl, PX.jets.left[0], PX.jets.left[1] - 3, 0, true);
    if (jr >= 0) pxCell(x, 'rcs', jr, PX.jets.right[0], PX.jets.right[1] - 3);
  }
  var pvh = 0, nextTrim = 0;   // last turn rate (deg/s), for the nose jets; when the next parked trim puff is due
  var puffs = [], emitAcc = 0, smPrev = 0, flameH = 0;   // exhaust pool, puffs owed, last smoothed scroll, flame picture height in the box
  var lastStarMsg = 0;     // when the iframe's stars were last told how the ship moves

  function reduce() { return CC.motion.reduce(); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function angDiff(a, b) { var d = (b - a) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; }
  function lerpAng(a, b, t) { return a + angDiff(a, b) * t; }
  /* 0 = nose up, 90 = right; standing still counts as level */
  function headingOf(dx, dy) { return Math.abs(dx) + Math.abs(dy) < 1e-6 ? 90 : Math.atan2(dx, -dy) * 180 / Math.PI; }
  function smoothstep(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function smootherstep(t) { t = clamp(t, 0, 1); return t * t * t * (t * (t * 6 - 15) + 10); }
  function sineInOut(t) { return -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2; }

  /* a damped spring toward a target, Apple-style: response (s) and damping ratio; 8 ms substeps */
  function springStep(x, v, target, cfg, dt) {
    var w = 2 * Math.PI / cfg.response, k = w * w, c = 2 * cfg.damping * w;
    var n = Math.ceil(dt / 8), h = dt / 1000 / n;
    for (var i = 0; i < n; i++) { v += (-k * (x - target) - c * v) * h; x += v * h; }
    return [x, v];
  }
  function springAng(a, v, target, cfg, dt) {
    var r = springStep(0, v, angDiff(a, target), cfg, dt);   // the short way round
    return [a + r[0], r[1]];
  }

  /* ---- the logo's orbit ---- */
  function orbitPoint(t) {
    var c = Math.cos(t), s = Math.sin(t);
    return { x: LOGO.cx + c * LOGO.a * LOGO.ux + s * LOGO.b * -LOGO.uy, y: LOGO.cy + c * LOGO.a * LOGO.uy + s * LOGO.b * LOGO.ux, front: s > 0 };
  }
  function orbitHead(t) {
    var c = Math.cos(t), s = Math.sin(t);
    return headingOf(-s * LOGO.a * LOGO.ux + c * LOGO.b * -LOGO.uy, -s * LOGO.a * LOGO.uy + c * LOGO.b * LOGO.ux);
  }
  function logoState() {
    var p = orbitPoint(orbitT), k = m.mark.w / LOGO.size;
    return { x: m.mark.x + p.x * k, y: m.mark.y + p.y * k, len: LOGO.rocketLen * k, head: lerpAng(LOGO.head, orbitHead(orbitT), orbitRamp), front: p.front };
  }

  /* ---- measuring (the only place layout is read) ---- */
  function measure() {
    var vw = window.innerWidth, vh = window.innerHeight;
    var mr = els.mark.getBoundingClientRect();
    var header = document.getElementById('cc-header');
    var hero = CC.$('hero'), fr = els.frame.getBoundingClientRect(), sy = window.scrollY, sx = window.scrollX;
    m = { vw: vw, vh: vh, phone: vw <= CFG.phone,
      mark: { x: mr.left, y: mr.top, w: mr.width || 40 },
      headerBottom: header ? header.getBoundingClientRect().bottom : 68,
      heroRun: Math.max(1, hero.offsetHeight - vh),
      frame: { x: fr.left + sx, y: fr.top + sy, w: fr.width, h: fr.height } };
    if (els.markRocket) {   // not built under reduced motion
      els.markRocket.style.left = els.mark.offsetLeft + 'px';
      els.markRocket.style.top = els.mark.offsetTop + 'px';
      els.markRocket.style.width = els.markRocket.style.height = (LOGO.rocketLen * (mr.width || 40) / LOGO.size * PIC.side / PIC.len).toFixed(2) + 'px';
    }

    /* parking spot: one globe long; overlap the globe's edge before shrinking; never cover the text */
    var g = globe && globe.globe && globe.globe.r > 0 ? globe.globe : { x: fr.width * 0.27, y: 520, r: Math.min(220, fr.width * 0.14) };
    var R = g.r, D = 2 * R, gx = m.frame.x + g.x, gy = m.frame.y + g.y, gr = gx + R;
    var L = CFG.station.length * D, w = L * PIC.width;
    var left = gr + CFG.station.gap * R;
    if (globe && globe.textLeft != null) {
      var rightBound = m.frame.x + globe.textLeft - 16;
      if (left + w > rightBound) {
        left = Math.max(rightBound - w, gr - CFG.station.overlap * w);
        if (left + w > rightBound) {
          w = Math.max(CFG.station.minLength * D * PIC.width, (rightBound - gr) / (1 - CFG.station.overlap));
          L = w / PIC.width;
          left = rightBound - w;
        }
      }
    }
    m.D = D;
    m.full = m.phone ? Math.min(vw * 0.45, L) : L;
    m.station = { x: left + w / 2, y: gy + CFG.station.offsetY * R, len: L };

    /* scroll marks: s1 end of take-off, s2 end of the cruise, sLand parked: with the spot level with mid-screen,
       or earlier, where "Skip to destinations" stops the page, so it is always parked by then */
    var sLand = m.station.y - vh * 0.5;
    var dest = CC.$('destinations');
    if (dest && !m.phone) {
      var pad = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + (parseFloat(getComputedStyle(dest).scrollMarginTop) || 0);
      sLand = Math.min(sLand, dest.getBoundingClientRect().top + sy - pad);
    }
    m.parkY = m.station.y - sLand;    // where it parks on screen
    var s1 = CFG.takeoffEnd * m.heroRun;
    var s2 = Math.min(m.heroRun, sLand - vh * 0.9);
    if (sLand - s2 < vh * 0.6) s2 = sLand - vh * 0.6;
    s2 = Math.max(s2, s1 + 1);
    if (sLand <= s2) sLand = s2 + 1;
    m.s1 = s1; m.s2 = s2; m.sLand = sLand;
    m.cy = CFG.cruiseY * vh;
    m.Sx = m.phone ? vw * 0.75 : m.station.x;
    /* the cruise starts clear of the logo and with the whole rocket on screen */
    m.x0 = Math.max(CFG.cruiseFrom * vw, m.mark.x + m.mark.w + 0.04 * vw, m.full / 2 + 24);
    m.x1 = m.phone ? vw * 0.62 : m.Sx;
    if (!m.phone) buildSwoop();

    /* the opening's words: the first title and the closing line sit low in the pinned stage; the flight keeps
       above them while they show (plans/ROADMAP-expert-review.md #3). Boxes are relative to the stage top. */
    var stage = CC.$('hero-stage'), stTop = stage ? stage.getBoundingClientRect().top : 0;
    function box(sel) {   // the ink, not the boxes: a heading's box runs the full width of the page
      var b = null;
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        var range = document.createRange(); range.selectNodeContents(el);
        var r = /^(H1|H2|P)$/.test(el.tagName) ? range.getBoundingClientRect() : el.getBoundingClientRect();
        if (!r.width) return;
        b = b ? { l: Math.min(b.l, r.left), t: Math.min(b.t, r.top), r: Math.max(b.r, r.right), b: Math.max(b.b, r.bottom) } : { l: r.left, t: r.top, r: r.right, b: r.bottom };
      });
      return b && { l: b.l, r: b.r, t: b.t - stTop, b: b.b - stTop };
    }
    /* the closing line: the flight keeps to its right, where the pictures have left room (phones: above it).
       The first title is left alone: holding the take-off up there made it drop late and hard. */
    m.words = [
      { box: box('#hero-end h2, #hero-end .hero-cta'), side: m.phone ? 'up' : 'right',
        show: function (u) { return smoothstep((u - 0.78) / 0.1); } }         // clear before it fades in (0.88)
    ].filter(function (w) { return w.box; });
  }

  /* moves the flight off the opening's words while they show: a smooth push, zero away from the words and
     gone before parking, so the path (and the nose read from it) stays continuous */
  function clearWords(p, s) {
    if (!m.words || !m.words.length) return p;
    var u = s / m.heroRun, len = s < m.s1 ? takeoffLen(p.y) : m.full;
    var stageTop = Math.min(0, m.heroRun - s);                      // pinned, then scrolls away with the page
    var away = m.phone ? 1 : 1 - smoothstep((s - (m.sLand - 0.3 * m.vh)) / (0.3 * m.vh));
    var x = p.x, y = p.y;
    m.words.forEach(function (w) {
      var k = w.show(u) * away; if (k <= 0) return;
      var b = w.box, t = stageTop + b.t, bt = stageTop + b.b;
      if (w.side === 'up') {
        var rad = 0.45 * len, f = rad;
        var kx = smoothstep((x - (b.l - rad - f)) / f) * smoothstep(((b.r + rad + f) - x) / f);
        var under = clamp((bt + rad - y) / rad, 0, 1);              // one well under the words is left alone
        var lift = Math.max(0, y - (t - rad)) * kx * under * k;
        y = Math.max(Math.min(y, m.headerBottom + 0.3 * len), y - lift);   // never up under the header
      } else {
        var rx = 0.4 * len, ry = 0.45 * len, g = ry;
        var ky = smoothstep((y - (t - ry - g)) / g) * smoothstep(((bt + ry + g) - y) / g);
        var push = Math.max(0, (b.r + rx) - x) * ky * k;
        x = Math.max(x, Math.min(x + push, m.vw - 0.6 * rx));         // not off the right edge
      }
    });
    return x === p.x && y === p.y ? p : { x: x, y: y };
  }
  /* ---- the path (screen px, as a function of scroll) ---- */
  function cruiseX(s) {
    var u = clamp(s / m.s2, 0, 1);
    return lerp(m.x0, m.x1, 0.85 * sineInOut(u) + 0.15 * u);   // with the pictures, never quite stopping
  }
  function cruiseSpeed(s) {   // d(cruiseX)/ds
    var u = clamp(s / m.s2, 0, 1);
    return (m.x1 - m.x0) / m.s2 * (0.85 * Math.PI / 2 * Math.sin(Math.PI * u) + 0.15);
  }
  /* how fast the pictures pass: the nose is read against them, until the swoop */
  function flowAt(s) { return CFG.flow * (1 - smoothstep((s - (m.s2 - 0.3 * m.vh)) / (0.3 * m.vh))); }
  function weave(s) {
    var v = (s - m.s1) / (m.s2 - m.s1);
    if (v <= 0 || v >= 1) return 0;
    return CFG.weave * m.vh * Math.sin(2 * Math.PI * CFG.waves * v) * smoothstep(v / 0.12) * smoothstep((1 - v) / 0.15);
  }
  function cruisePos(s) { return { x: cruiseX(s), y: m.cy + weave(s) }; }
  /* out of the logo: x and y on the same curve, so the nose follows where it goes */
  function takeoffPos(s) {
    var l = logoState(), c = cruisePos(s), e = smootherstep(s / m.s1);
    return { x: lerp(l.x, c.x, e), y: lerp(l.y, c.y, e) };
  }
  /* it only grows once clear of the header */
  function takeoffLen(y) {
    var u = (y - m.headerBottom) / Math.max(1, m.cy - m.headerBottom);
    return lerp(logoState().len, m.full, smoothstep(u));
  }

  /* the swoop: from level flight it bends down (to 150°), descends, rounds out at the bottom and pulls up
     through a wide arc to vertical, then climbs straight into the spot. Arcs and lines only, so the nose
     turns at an even rate; the cruise ends wherever the swoop must start to finish at the spot. When the spot
     sits low on screen, the descent is longer so the pull-up still ends at or below it. */
  function buildSwoop() {
    var vh = m.vh, r1 = CFG.swoop.bend * vh, r2 = CFG.swoop.pull * vh, hB = 150, cos30 = Math.cos(Math.PI / 6);
    function trace(scale, line) {
      var pts = [{ x: 0, y: 0 }], x = 0, y = 0, h, step = 0.5;
      function go(h1, len) { x += Math.sin(h1 * Math.PI / 180) * len; y -= Math.cos(h1 * Math.PI / 180) * len; pts.push({ x: x, y: y }); }
      for (h = 90; h < hB; h += step) go(h + step / 2, r1 * scale * step * Math.PI / 180);
      for (var i = 0; i < 20; i++) go(hB, line / 20);
      for (h = hB; h > 0; h -= step) go(h - step / 2, r2 * scale * step * Math.PI / 180);
      return pts;
    }
    var room = m.Sx - m.x0, scale = 1, line = CFG.swoop.drop * vh, pts, end;
    for (var it = 0; it < 4; it++) {
      pts = trace(scale, line); end = pts[pts.length - 1];
      var short = m.parkY - (m.cy + end.y);                       // > 0: the pull-up ends above the spot
      if (short > 0.5) { line += short / cos30; continue; }
      if (end.x > room + 0.5) { scale *= room / end.x; line *= room / end.x; continue; }
      break;
    }
    m.x1 = m.Sx - end.x;
    var ox = m.x1, oy = m.cy;
    pts = pts.map(function (p) { return { x: p.x + ox, y: p.y + oy }; });
    var climbTo = m.parkY, lastPt = pts[pts.length - 1];
    for (var k = 1; k <= 20 && lastPt.y > climbTo; k++) pts.push({ x: lastPt.x, y: lastPt.y - (lastPt.y - climbTo) * k / 20 });
    var acc = [0];
    for (var j = 1; j < pts.length; j++) acc.push(acc[j - 1] + Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y));
    m.swoop = { pts: pts, acc: acc, len: acc[acc.length - 1], ds: m.sLand - m.s2 };
  }
  function swoopPos(s) {
    var sw = m.swoop, u = clamp((s - m.s2) / sw.ds, 0, 1);
    /* distance along the curve: leaves at the cruise's speed, arrives at the page's speed (1 px per px) */
    var v0 = cruiseSpeed(m.s2) * sw.ds, v1 = sw.ds, L = sw.len;
    var u2 = u * u, u3 = u2 * u;
    var d = clamp((u3 - 2 * u2 + u) * v0 + (-2 * u3 + 3 * u2) * L + (u3 - u2) * v1, 0, L);
    var acc = sw.acc, lo = 0, hi = acc.length - 1;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (acc[mid] < d) lo = mid; else hi = mid; }
    var f = (d - acc[lo]) / Math.max(1e-6, acc[hi] - acc[lo]), a = sw.pts[lo], b = sw.pts[hi];
    return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f) };
  }
  function pathPos(s) { return clearWords(rawPath(s), s); }
  function rawPath(s) {
    if (s < m.s1) return takeoffPos(s);
    if (s < m.s2) return cruisePos(s);
    /* phones: no parking; it burns away up and to the right, faster and faster */
    if (m.phone) {
      var c = cruisePos(m.s2), e = s - m.s2, d = e * (1 + e / (0.5 * m.vh)) * 1.2, A = 20 * Math.PI / 180;
      return { x: c.x + d * Math.cos(A), y: c.y - d * Math.sin(A) };
    }
    return swoopPos(s);
  }

  /* parked: hold station, point at the flag under the pointer */
  function attached(now, sy) {
    /* station keeping: a slow drift on two axes at two rates (no "down", so no bob), the nose wandering a little */
    var st = m.station, k = CFG.keep, ts = (now - startedAt) / 1000, TAU = 2 * Math.PI;
    var x = st.x + k.ax * m.D * Math.sin(TAU * ts / k.px);
    var y = st.y - sy + k.ay * m.D * Math.sin(TAU * ts / k.py + 1.3);
    var head = k.tilt * Math.sin(TAU * ts / k.pt + 0.4), pointing = false;
    if (globe && globe.hover && !m.phone) { head = headingOf(m.frame.x - window.scrollX + globe.hover.x - x, m.frame.y - sy + globe.hover.y - y); pointing = true; }
    return { x: x, y: y, len: st.len, head: head, op: 1, phase: 'parked', pointing: pointing };
  }

  /* where the rocket should be for scroll s; phases: logo, takeoff, cruise, swoop, parked */
  function target(now, s) {
    if (s <= 0.5) { var l = logoState(); return { x: l.x, y: l.y, len: l.len, head: l.head, op: 1, phase: 'logo' }; }
    if (s >= m.sLand && !m.phone) return attached(now, s);
    var p = pathPos(s), d = 2;
    var p0 = pathPos(Math.max(0, s - d)), p1 = pathPos(s + d);
    var head = headingOf(p1.x - p0.x + flowAt(s) * 2 * d, p1.y - p0.y);
    /* answers the hand during the cruise only: fades in after take-off, out before the swoop */
    var k = smoothstep(s / m.s1) * (1 - smoothstep((s - (m.s2 - 0.4 * m.vh)) / (0.4 * m.vh)));
    p.x += surge * k;
    head -= clamp(vScroll * 0.35, -5, 7) * k;
    /* scrolled back: turned round. Always add, so the turn dips under (nose down), both ways */
    head += 180 * smoothstep(flip);
    if (s < m.s1) head = lerpAng(logoState().head, head, smoothstep(s / m.s1 / 0.2));
    /* phones: fades only once the tail has crossed the right edge, so it flies off rather than vanishing */
    var op = m.phone ? 1 - smoothstep((p.x - m.vw - 0.5 * m.full) / (0.3 * m.full)) : 1;
    return { x: p.x, y: p.y, len: s < m.s1 ? takeoffLen(p.y) : m.full, head: head, op: op, phase: s < m.s1 ? 'takeoff' : s < m.s2 ? 'cruise' : 'swoop' };
  }

  /* ---- drawing ---- */
  /* where the nozzle is on screen: the box is turned about its centre and scaled by k */
  function nozzleScreen(st, back) {   // back: box px behind the nozzle, along the hull
    var side = st.len * PIC.side / PIC.len, k = side / FLY_BASE, a = (st.head - PIC.nose) * Math.PI / 180;
    var lx = (NOZZLE[0] - FLY_BASE / 2) * k, ly = (NOZZLE[1] + back - FLY_BASE / 2) * k;
    return { x: st.x + lx * Math.cos(a) - ly * Math.sin(a), y: st.y + lx * Math.sin(a) + ly * Math.cos(a), k: k };
  }
  /* exhaust puffs: born near the flame's tail, then left behind where they are (they drift with the pictures in
     the opening, with the page after it), growing and fading out; returns how many are still alive */
  function stepTrail(dt, sy, dRaw, emit) {
    var tc = CFG.trail, driftX = sy <= m.heroRun ? flowAt(sm) * (sm - smPrev) : 0, driftY = sy <= m.heroRun ? 0 : dRaw, alive = 0;
    smPrev = sm;
    if (emit) {
      emitAcc += tc.rate * thr * dt / 1000;
      var n = nozzleScreen(cur, 0.8 * flameH * flameLen), hr = cur.head * Math.PI / 180;
      while (emitAcc >= 1) {
        emitAcc -= 1;
        var p = null;
        for (var i = 0; i < puffs.length; i++) if (!puffs[i].alive) { p = puffs[i]; break; }
        if (!p) break;
        var dev = (Math.random() - 0.5) * 24 * Math.PI / 180, sp0 = tc.speed * m.vh * (0.75 + Math.random() * 0.5);
        p.alive = true; p.age = 0; p.life = tc.life * (0.8 + Math.random() * 0.4); p.k = n.k;
        p.x = n.x; p.y = n.y; p.vx = -Math.sin(hr + dev) * sp0; p.vy = Math.cos(hr + dev) * sp0;
      }
    } else emitAcc = 0;
    var damp = Math.exp(-dt / 400);
    for (var j = 0; j < puffs.length; j++) {
      var q = puffs[j];
      if (!q.alive) continue;
      q.age += dt;
      var u = q.age / q.life;
      if (u >= 1) { q.alive = false; q.el.style.opacity = '0'; continue; }
      q.vx *= damp; q.vy *= damp;
      q.x += q.vx * dt / 1000 - driftX; q.y += q.vy * dt / 1000 - driftY;
      if (PIXEL) {
        /* the sheet already grows and thins out, so only the frame changes */
        var pf = Math.min(PX.size.puff[2] - 1, Math.floor(u * PX.size.puff[2]));
        q.el.style.transform = 'translate3d(' + Math.round(q.x) + 'px,' + Math.round(q.y) + 'px,0) scale(' + q.k.toFixed(3) + ')';
        q.el.style.backgroundPosition = (-(pf % PX.cols) * 48) + 'px ' + (-Math.floor(pf / PX.cols) * 48) + 'px';   // 48 px cells (CSS)
        q.el.style.opacity = u < 0.85 ? '1' : '0.6';
      } else {
        q.el.style.transform = 'translate3d(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px,0) scale(' + (q.k * lerp(0.5, 1.8, u)).toFixed(3) + ')';
        q.el.style.opacity = (0.75 * (1 - u) * (1 - u)).toFixed(3);
      }
      alive++;
    }
    return alive;
  }
  function drawFly(st) {
    var side = st.len * PIC.side / PIC.len, k = side / FLY_BASE;
    els.fly.style.transform = 'translate3d(' + (st.x - FLY_BASE / 2).toFixed(1) + 'px,' + (st.y - FLY_BASE / 2).toFixed(1) + 'px,0)' + (PIXEL ? '' : ' rotate(' + (st.head - PIC.nose).toFixed(2) + 'deg)') + ' scale(' + k.toFixed(4) + ')';
    /* the box is rotated, so turn "straight down on screen" into its own axes */
    var a = (st.head - PIC.nose) * Math.PI / 180, s = CFG.shadow * FLY_BASE;
    if (els.shadow) els.shadow.style.transform = 'translate3d(' + (s * Math.sin(a)).toFixed(1) + 'px,' + (s * Math.cos(a)).toFixed(1) + 'px,0)';
    els.fly.style.opacity = st.op.toFixed(3);
  }
  /* thrust sets the length; it lights with a burst as the rocket grows out of the logo and goes out before it docks */
  function drawFlame(now) {
    var fc = CFG.flame, ts = now / 1000;
    var cut = smoothstep(grow / 0.15), ign = 1.15 * Math.sin(Math.PI * clamp((grow - 0.1) / 0.6, 0, 1));
    var level = Math.max(thr, ign), q = fc.flicker * (0.5 + 0.5 * level);
    flameLen = clamp(cut * (fc.pilot + (fc.max - fc.pilot) * level) *
      (1 + q * Math.sin(ts * 2 * Math.PI * 9) + q * 0.6 * Math.sin(ts * 2 * Math.PI * 13.7)), 0, 1.2);
    /* hotter and brighter the harder it burns */
    var lit = flameLen < 0.05 ? 0 : 1;
    if (PIXEL) return;   // the pixel canvas draws its own flame from flameLen
    els.core.style.opacity = (lit * (0.15 + 0.85 * thr)).toFixed(3);
    els.glow.style.opacity = (lit * (0.2 + 0.6 * thr)).toFixed(3);
    els.flame.style.opacity = flameLen < 0.05 ? '0' : '1';
    if (flameLen < 0.05) return;
    /* longer from the nozzle down, a touch wider as it grows, and the plume opens up at full burn */
    var wide = (0.85 + 0.15 * flameLen) * (1 + 0.25 * thr);
    els.flame.style.transform = 'scale(' + wide.toFixed(3) + ',' + flameLen.toFixed(3) + ')';
    els.core.style.transform = 'scale(' + (1 + 0.25 * thr).toFixed(3) + ',' + flameLen.toFixed(3) + ')';
  }
  /* one short puff from a nose jet; WAAPI, so nothing runs per frame */
  function rcs(side, now) {
    var r = RCS[side];
    if (!r.el || now - r.lastAt < CFG.rcs.gap) return;
    r.lastAt = now;
    if (PIXEL) { px.jetAt[side] = now; return; }
    r.el.animate([{ opacity: 0.95, transform: 'rotate(' + r.ang + 'deg) scaleX(0.4)' }, { opacity: 0, transform: 'rotate(' + r.ang + 'deg) scaleX(1.2)' }],
      { duration: CFG.rcs.ms, easing: 'cubic-bezier(.22, 1, .36, 1)' });
  }
  function drawMarkRocket(l) {
    var k = m.mark.w / LOGO.size, side = LOGO.rocketLen * k * PIC.side / PIC.len, p = orbitPoint(orbitT);
    els.markRocket.style.transform = 'translate3d(' + (p.x * k - side / 2).toFixed(2) + 'px,' + (p.y * k - side / 2).toFixed(2) + 'px,0) rotate(' + (l.head - PIC.nose).toFixed(2) + 'deg)';
    els.markRocket.classList.toggle('is-behind', !l.front);
  }
  function showHome(home) {
    if (els.markRocket.hidden !== !home) els.markRocket.hidden = !home;
    els.fly.classList.toggle('is-hidden', home);
  }

  function frame(now) {
    raf = 0;
    if (!on) return;
    var dt = last ? clamp(now - last, 1, 64) : 16.67;
    last = now;
    var sy = window.scrollY, dRaw = sy - prevScroll;
    prevScroll = sy;
    var hidden = globe && globe.hud;
    els.fly.classList.toggle('is-away', !!hidden);

    /* scroll speed (px per frame) drives the surge */
    vScroll += (dRaw * 16.67 / dt - vScroll) * (1 - Math.exp(-dt / 160));
    if (Math.abs(vScroll) < 0.01) vScroll = 0;
    surge += (clamp(vScroll * 2.2, -0.03 * m.vw, CFG.surge * m.vw) - surge) * (1 - Math.exp(-dt / 260));
    if (Math.abs(surge) < 0.05) surge = 0;
    /* which way it faces: set by a clear scroll back or on, kept while the page rests; never turned at the top */
    if (vScroll < -CFG.reverse.speed) back = true; else if (vScroll > CFG.reverse.speed) back = false;
    if (sm <= 0.5) back = false;   // only once it is home: on the way in it keeps flying nose first
    flip = clamp(flip + (back ? 1 : -1) * dt / CFG.reverse.ms, 0, 1);
    /* the scroll as the rocket reads it: same follow as the pictures */
    sm += (sy - sm) * (1 - Math.exp(-dt / CFG.smoothMs));
    if (Math.abs(sy - sm) < 0.3) sm = sy;

    /* circling the logo only while the page is at the very top */
    var atTop = sy <= 0.5;
    if (atTop && (now - startedAt) / 1000 > CFG.orbitDelay) {
      orbitRamp = Math.min(1, orbitRamp + dt / 800);
      orbitT += (dt / 1000) * (2 * Math.PI / CFG.orbitSeconds) * smoothstep(orbitRamp);
    }

    var t = target(now, sm), r;
    if (!sp) sp = { x: t.x, y: t.y, vx: 0, vy: 0, h: t.head, vh: 0 };
    if (t.phase === 'parked') sp.y -= dRaw;          // parked: carried by the page, the spring only settles
    r = springStep(sp.x, sp.vx, t.x, CFG.follow, dt); sp.x = r[0]; sp.vx = r[1];
    r = springStep(sp.y, sp.vy, t.y, CFG.follow, dt); sp.y = r[0]; sp.vy = r[1];
    r = springAng(sp.h, sp.vh, t.head, CFG.turn, dt); sp.h = r[0]; sp.vh = r[1];
    /* the engine burns when the rocket speeds up or turns, not when it merely moves */
    var sec = dt / 1000, ax = (sp.vx - pvx) / sec, ay = (sp.vy - pvy) / sec, hr = sp.h * Math.PI / 180;
    pvx = sp.vx; pvy = sp.vy;
    var hx = Math.sin(hr), hy = -Math.cos(hr), A = CFG.thrust.full;
    var aAlong = (ax * hx + ay * hy) / m.vh, aLat = Math.abs(ax * hy - ay * hx) / m.vh;
    var thrTarget = t.phase === 'parked' ? 0 : clamp(smoothstep(Math.max(0, aAlong) / A) + CFG.thrust.side * smoothstep(aLat / A), 0, 1);
    thr += (thrTarget - thr) * (1 - Math.exp(-dt / (thrTarget > thr ? CFG.thrust.up : CFG.thrust.down)));
    /* lights as it grows out of the logo, goes out before it shrinks back in */
    var logoLen = LOGO.rocketLen * m.mark.w / LOGO.size;
    grow = clamp((t.len - logoLen) / Math.max(1, m.full - logoLen), 0, 1);

    /* back in the logo once the page is at the top and the rocket is close (the smoothed scroll's last few
       pixels take seconds, and the orbit keeps moving, so neither may be waited for); the nose must line up too,
       or it snaps round as it docks */
    var l = atTop ? logoState() : null;
    var home = atTop && Math.hypot(l.x - sp.x, l.y - sp.y) < Math.max(0.5, 0.15 * l.len) && Math.abs(angDiff(sp.h, l.head)) < 6;
    if (home) { sm = sy; t = target(now, sm); sp.x = t.x; sp.y = t.y; sp.vx = sp.vy = 0; sp.h = t.head; sp.vh = 0; }
    if (home) { thr = 0; pvx = pvy = 0; }
    /* nose jets: one side starts a turn, the other side stops it */
    var rate = Math.abs(sp.vh), prevRate = Math.abs(pvh);
    if (!home && !hidden && t.phase !== 'logo' && rate > CFG.rcs.minRate) {
      if (rate > prevRate) rcs(sp.vh > 0 ? 'left' : 'right', now);
      else if (prevRate - rate > CFG.rcs.brake * dt / 16.67) rcs(sp.vh > 0 ? 'right' : 'left', now);
    }
    pvh = sp.vh;
    /* parked: now and then a small puff on the side the nose is drifting towards, as if holding station */
    if (t.phase === 'parked' && !t.pointing && !hidden && !m.phone) {
      if (!nextTrim) nextTrim = now + 1000 * lerp(CFG.keep.puffMin, CFG.keep.puffMax, Math.random());
      else if (now >= nextTrim) {
        var drift = Math.cos(2 * Math.PI * (now - startedAt) / 1000 / CFG.keep.pt + 0.4);   // sign of the nose's drift
        rcs(drift > 0 ? 'right' : 'left', now);
        nextTrim = 0;
      }
    } else nextTrim = 0;
    cur = { x: sp.x, y: sp.y, len: t.len, head: sp.h, op: t.op };
    showHome(home);
    if (home) drawMarkRocket(logoState());
    else {
      /* pixel ship: it hovers, stepping up and down one whole sprite pixel at a time like a sprite in the game */
      var shown = cur;
      if (PIXEL) {
        var bob = Math.round(Math.sin(2 * Math.PI * (now - startedAt) / 1000 / CFG.bob.period) * CFG.bob.amp);
        shown = { x: cur.x, y: cur.y + bob * cur.len / PX.h, len: cur.len, head: cur.head, op: cur.op };
      }
      drawFly(shown); drawFlame(now); if (PIXEL) drawPixel(cur, now);
    }
    /* above the header whenever any of it reaches the header band (otherwise the header's blur covers it) */
    els.fly.classList.toggle('is-over-header', cur.y - 0.6 * cur.len < m.headerBottom);
    var puffsAlive = stepTrail(dt, sy, dRaw, !home && t.phase !== 'parked' && thr >= 0.08 && !hidden);

    var moving = surge !== 0 || vScroll !== 0 || sy !== sm || Math.abs(sp.vx) + Math.abs(sp.vy) > 2 ||
      Math.abs(sp.vh) > 2 || Math.hypot(t.x - sp.x, t.y - sp.y) > 0.4 || Math.abs(angDiff(sp.h, t.head)) > 0.3 ||
      Math.abs(thrTarget - thr) > 0.01 || puffsAlive > 0 || (flip > 0 && flip < 1);
    var onScreen = cur.y > -cur.len && cur.y < m.vh + cur.len;
    /* near the globe, the iframe's stars slide against the ship (at most 20 messages a second) */
    if ((t.phase === 'parked' || t.phase === 'swoop') && !m.phone && !hidden && onScreen && now - lastStarMsg > 50 && els.frame && els.frame.contentWindow) {
      lastStarMsg = now;
      els.frame.contentWindow.postMessage({ type: 'culturecompass-stars', vx: sp.vx / m.vh, vy: sp.vy / m.vh, head: sp.h, parked: t.phase === 'parked' }, window.location.origin);
    }
    var idle = (atTop && !document.hidden) || (t.phase === 'parked' && onScreen && !hidden && !m.phone);
    /* the pixel flame and the hover keep going while the ship is in view, even when the page rests
       (drawPixel only repaints at 12 fps, so a resting frame costs little) */
    var alive = PIXEL && !home && onScreen && !hidden;
    if (idle || moving || alive) raf = requestAnimationFrame(frame);
    else last = 0;
  }
  function kick() { if (on && !raf && !document.hidden) raf = requestAnimationFrame(frame); }

  /* ---- setup ---- */
  function build() {
    var brand = document.querySelector('#cc-header .cc-brand');
    els.mark = brand && brand.querySelector('.cc-mark');
    els.frame = CC.$('destination-globe');
    if (!els.mark || !els.frame || !CC.$('hero')) return false;
    els.markRocket = document.createElement('span');
    els.markRocket.className = 'cc-mark-rocket';
    els.markRocket.setAttribute('aria-hidden', 'true');
    els.markRocket.innerHTML = '<img src="' + PIC_SMALL + '" alt="" decoding="async">';
    brand.insertBefore(els.markRocket, els.mark.nextSibling);
    els.fly = document.createElement('div');
    els.fly.className = 'cc-rocket is-hidden';
    els.fly.setAttribute('aria-hidden', 'true');
    els.fly.innerHTML = PIXEL ? '<div class="cc-rocket-fade"></div>' : '<div class="cc-rocket-fade"><img class="cc-rocket-shadow" src="' + PIC.src + '" alt="" decoding="async">' +
      '<i class="cc-rocket-glow"></i>' +
      '<img class="cc-rocket-flame" src="' + FLAME.src + '" alt="" decoding="async">' +
      '<i class="cc-rocket-core"></i>' +
      '<img class="cc-rocket-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
    if (PIXEL) {
      els.fly.classList.add('is-pixel');
      var cv = document.createElement('canvas');
      cv.className = 'cc-rocket-px'; cv.width = cv.height = PX.G;
      /* the ship is FLY_BASE tall in the box, so one sprite pixel is FLY_BASE / PX.h box pixels */
      var cs = FLY_BASE * PX.G / PX.h;
      cv.style.width = cv.style.height = cs + 'px';
      cv.style.left = cv.style.top = ((FLY_BASE - cs) / 2) + 'px';
      els.fly.querySelector('.cc-rocket-fade').appendChild(cv);
      px.ctx = cv.getContext('2d');
      pxLoad();
    }
    els.shadow = els.fly.querySelector('.cc-rocket-shadow');
    els.flame = els.fly.querySelector('.cc-rocket-flame');
    els.glow = els.fly.querySelector('.cc-rocket-glow'); els.core = els.fly.querySelector('.cc-rocket-core');
    /* the ship fills the box's height and is centred across it; the flame is placed in shares of the ship */
    var shipW = FLY_BASE * PIC.width, shipX = (FLY_BASE - shipW) / 2, flameW = FLAME.width * shipW;
    if (els.flame) {
      els.flame.style.left = (shipX + FLAME.left * shipW).toFixed(2) + 'px';
      els.flame.style.top = (FLAME.top * FLY_BASE).toFixed(2) + 'px';
      els.flame.style.width = flameW.toFixed(2) + 'px';
      els.flame.style.height = (flameW * FLAME.aspect).toFixed(2) + 'px';
    }
    flameH = flameW * FLAME.aspect;
    /* the nose jets sit above the hull, in the box's own units */
    ['left', 'right'].forEach(function (side) {
      var j = document.createElement('i');
      j.className = 'cc-rocket-rcs';
      var r = RCS[side], ang = Math.atan2(r.dir[1], r.dir[0]) * 180 / Math.PI;
      j.style.left = r.at[0] + 'px';
      j.style.top = (r.at[1] - 13) + 'px';
      r.el = j; r.ang = ang; r.lastAt = -1e9;
      els.fly.querySelector('.cc-rocket-fade').appendChild(j);
    });
    /* the exhaust: a fixed pool, reused; it sits just under the rocket */
    els.trail = document.createElement('div');
    els.trail.className = 'cc-rocket-trail' + (PIXEL ? ' is-pixel' : '');
    els.trail.setAttribute('aria-hidden', 'true');
    puffs = [];
    for (var i = 0; i < CFG.trail.count; i++) {
      var d = document.createElement('i');
      els.trail.appendChild(d);
      puffs.push({ el: d, alive: false, x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1, k: 1 });
    }
    document.body.appendChild(els.trail);
    document.body.appendChild(els.fly);
    return true;
  }

  function enable() {
    if (on || reduce()) return;
    if (!els.fly && !build()) return;
    on = true;
    document.documentElement.classList.add('has-rocket');
    els.mark.dataset.src = els.mark.getAttribute('src');
    els.mark.dataset.srcset = els.mark.getAttribute('srcset') || '';
    els.mark.src = LOGO_NO_ROCKET;
    els.mark.srcset = LOGO_NO_ROCKET + ' 1x, ' + LOGO_NO_ROCKET_2X + ' 2x';
    els.fly.hidden = false; els.markRocket.hidden = false; els.trail.hidden = false;
    els.fly.style.width = els.fly.style.height = FLY_BASE + 'px';
    startedAt = performance.now();
    sm = smPrev = prevScroll = window.scrollY; vScroll = 0; surge = 0; sp = null; back = false; flip = 0;
    puffs.forEach(function (q) { q.alive = false; q.el.style.opacity = '0'; });
    measure();
    kick();
  }
  function disable() {
    if (!on) return;
    on = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0; last = 0;
    document.documentElement.classList.remove('has-rocket');
    els.mark.src = els.mark.dataset.src;
    if (els.mark.dataset.srcset) els.mark.srcset = els.mark.dataset.srcset;
    els.fly.hidden = true; els.markRocket.hidden = true; els.trail.hidden = true;
  }

  /* reduced motion: one still rocket beside the globe, nose up; it scrolls with the page, so no script runs */
  function placeStill() {
    if (!els.still) {
      els.still = document.createElement('div');
      els.still.className = 'cc-rocket-still';
      els.still.setAttribute('aria-hidden', 'true');
      els.still.innerHTML = PIXEL
        ? '<div class="cc-rocket-fade is-pixel"><i class="cc-rocket-still-px-flame"></i>' +
          '<img class="cc-rocket-still-body" src="' + PXDIR + PX.sheets.ship + '" alt="" decoding="async"></div>'
        : '<div class="cc-rocket-fade"><img class="cc-rocket-still-flame" src="' + FLAME.src + '" alt="" decoding="async">' +
          '<img class="cc-rocket-still-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
      document.body.appendChild(els.still);
    }
    if (!els.mark) { var brand = document.querySelector('#cc-header .cc-brand'); els.mark = brand && brand.querySelector('.cc-mark'); }
    els.frame = els.frame || CC.$('destination-globe');
    if (!els.mark || !els.frame) return;
    measure();
    var side = m.station.len * PIC.side / PIC.len;
    els.still.hidden = m.phone;
    els.still.style.cssText = 'width:' + side.toFixed(1) + 'px;height:' + side.toFixed(1) + 'px;left:' + (m.station.x - side / 2).toFixed(1) + 'px;top:' + (m.station.y - side / 2).toFixed(1) + 'px';   // the ship is drawn nose up: no rotation
  }
  /* after a layout change: re-measure the flight, or re-place the still rocket */
  function relayout() {
    if (on) { measure(); kick(); }
    else if (reduce()) placeStill();
  }

  function init() {
    if (!CC || !CC.$('hero') || !CC.$('destination-globe')) return;
    els.frame = els.frame || CC.$('destination-globe');   // the iframe's messages are checked against it, in either mode
    enable();
    if (reduce()) placeStill();
    window.addEventListener('scroll', kick, { passive: true });
    var rt = 0;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(relayout, 120); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
    window.addEventListener('load', relayout);
    if (window.ResizeObserver) new ResizeObserver(relayout).observe(els.frame);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { last = 0; kick(); } });
    document.addEventListener('cc:settings', function () {
      if (reduce()) { disable(); placeStill(); }
      else { if (els.still) els.still.hidden = true; enable(); }
    });
    /* the iframe reports where the globe is, which flag the pointer is on, and whether a country is open */
    window.addEventListener('message', function (e) {
      if (!els.frame || e.source !== els.frame.contentWindow || e.origin !== window.location.origin) return;
      var d = e.data;
      if (!d || d.type !== 'culturecompass-rocket') return;
      globe = d;
      if (!on && els.still) els.still.classList.toggle('is-away', !!(globe && globe.hud));
      relayout();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  else init();
})();
