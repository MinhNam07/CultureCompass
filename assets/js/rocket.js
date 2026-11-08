/* CultureCompass — Home: the rocket from the logo.
   Before the visitor scrolls, the logo's rocket circles the logo's own orbit (behind the star on the top half,
   in front on the bottom half). Scrolling drops it out of the logo; it only grows once it has left the header,
   and settles in the middle of the screen at its parked size. Through the opening it cruises left to right,
   against the pictures drifting right to left: it speeds up and slows down with them (same sine in-out, same
   320 ms follow), weaves gently twice, and answers the hand (it surges ahead and lifts its nose when the page is
   scrolled fast, drifts back when the scroll slows). When the opening ends it swoops: bends down, dips below the
   parking spot and pulls up through a wide arc into it, nose up, arriving at exactly the speed the page moves,
   so it docks without a bump. Parked beside the globe in "Choose a destination" it bobs a little and points at
   the flag under the pointer. A light spring (0.15 s) over the whole flight gives it a little weight.
   Scroll back and it flies the same way back into the logo. On phones it crosses the opening and fades out; it
   does not park.

   Decoration only: aria-hidden, never focusable, nothing depends on it. With reduced motion (system or the
   site's setting) there is no separate rocket and the logo stays whole. Transforms and opacity only, one
   requestAnimationFrame loop that stops when nothing moves; layout is read in measure(), never per frame. The
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
    swoop: { bend: 0.09, drop: 0.08, pull: 0.11 },     // bend-down radius, descent, pull-up radius (viewport heights)
    follow: { response: 0.15, damping: 0.8 },          // spring on position (seconds, damping ratio)
    turn: { response: 0.2, damping: 0.85 },            // spring on the nose
    hover: { amp: 0.012, tilt: 2, period: 3.2 },       // parked: bob (diameters), sway (deg), seconds
    shadow: 0.03,       // shadow drop below the rocket, in box sides; always straight down on screen
    flame: { min: 0.45, max: 1.0, full: 1.2, flicker: 0.05 },   // flame length (share of its picture) at rest / flat out, speed for flat out (viewport heights per s), flicker share
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
    els.markRocket.style.left = els.mark.offsetLeft + 'px';
    els.markRocket.style.top = els.mark.offsetTop + 'px';
    els.markRocket.style.width = els.markRocket.style.height = (LOGO.rocketLen * (mr.width || 40) / LOGO.size * PIC.side / PIC.len).toFixed(2) + 'px';

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
  function pathPos(s) {
    if (s < m.s1) return takeoffPos(s);
    if (s < m.s2 || m.phone) return cruisePos(Math.min(s, m.s2));
    return swoopPos(s);
  }

  /* parked: bob, sway, point at the flag under the pointer */
  function attached(now, sy) {
    var st = m.station, tsec = (now - startedAt) / 1000, w = 2 * Math.PI / CFG.hover.period;
    var x = st.x, y = st.y - sy + Math.sin(tsec * w) * CFG.hover.amp * m.D;
    var head = Math.sin(tsec * w + 1) * CFG.hover.tilt;
    if (globe && globe.hover && !m.phone) head = headingOf(m.frame.x - window.scrollX + globe.hover.x - x, m.frame.y - sy + globe.hover.y - y);
    return { x: x, y: y, len: st.len, head: head, op: 1, phase: 'parked' };
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
    if (s < m.s1) head = lerpAng(logoState().head, head, smoothstep(s / m.s1 / 0.2));
    var op = m.phone ? 1 - smoothstep((s - m.s2) / (0.3 * m.vh)) : 1;
    return { x: p.x, y: p.y, len: s < m.s1 ? takeoffLen(p.y) : m.full, head: head, op: op, phase: s < m.s1 ? 'takeoff' : s < m.s2 ? 'cruise' : 'swoop' };
  }

  /* ---- drawing ---- */
  function drawFly(st) {
    var side = st.len * PIC.side / PIC.len, k = side / FLY_BASE;
    els.fly.style.transform = 'translate3d(' + (st.x - FLY_BASE / 2).toFixed(1) + 'px,' + (st.y - FLY_BASE / 2).toFixed(1) + 'px,0) rotate(' + (st.head - PIC.nose).toFixed(2) + 'deg) scale(' + k.toFixed(4) + ')';
    /* the box is rotated, so turn "straight down on screen" into its own axes */
    var a = (st.head - PIC.nose) * Math.PI / 180, s = CFG.shadow * FLY_BASE;
    els.shadow.style.transform = 'translate3d(' + (s * Math.sin(a)).toFixed(1) + 'px,' + (s * Math.cos(a)).toFixed(1) + 'px,0)';
    els.fly.style.opacity = st.op.toFixed(3);
  }
  /* longer the faster it flies (the spring's speed, so it eases in and out), with a small flicker */
  function drawFlame(now) {
    var fc = CFG.flame, speed = Math.hypot(sp.vx, sp.vy) / m.vh, ts = now / 1000;
    var f = (fc.min + (fc.max - fc.min) * smoothstep(speed / fc.full)) *
      (1 + fc.flicker * Math.sin(ts * 2 * Math.PI * 9) + fc.flicker * 0.6 * Math.sin(ts * 2 * Math.PI * 13.7));
    f = clamp(f, 0.3, 1.1);
    /* longer from the nozzle down, and a touch wider as it grows */
    els.flame.style.transform = 'scale(' + (0.85 + 0.15 * f).toFixed(3) + ',' + f.toFixed(3) + ')';
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

    /* back in the logo once the page is at the top and the rocket is close (the smoothed scroll's last few
       pixels take seconds, and the orbit keeps moving, so neither may be waited for); the nose must line up too,
       or it snaps round as it docks */
    var l = atTop ? logoState() : null;
    var home = atTop && Math.hypot(l.x - sp.x, l.y - sp.y) < Math.max(0.5, 0.15 * l.len) && Math.abs(angDiff(sp.h, l.head)) < 6;
    if (home) { sm = sy; t = target(now, sm); sp.x = t.x; sp.y = t.y; sp.vx = sp.vy = 0; sp.h = t.head; sp.vh = 0; }
    cur = { x: sp.x, y: sp.y, len: t.len, head: sp.h, op: t.op };
    showHome(home);
    if (home) drawMarkRocket(logoState()); else { drawFly(cur); drawFlame(now); }
    /* above the header whenever any of it reaches the header band (otherwise the header's blur covers it) */
    els.fly.classList.toggle('is-over-header', cur.y - 0.6 * cur.len < m.headerBottom);

    var moving = surge !== 0 || vScroll !== 0 || sy !== sm || Math.abs(sp.vx) + Math.abs(sp.vy) > 2 ||
      Math.abs(sp.vh) > 2 || Math.hypot(t.x - sp.x, t.y - sp.y) > 0.4 || Math.abs(angDiff(sp.h, t.head)) > 0.3;
    var onScreen = cur.y > -cur.len && cur.y < m.vh + cur.len;
    var idle = (atTop && !document.hidden) || (t.phase === 'parked' && onScreen && !hidden && !m.phone);
    if (idle || moving) raf = requestAnimationFrame(frame);
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
    els.fly.innerHTML = '<div class="cc-rocket-fade"><img class="cc-rocket-shadow" src="' + PIC.src + '" alt="" decoding="async">' +
      '<img class="cc-rocket-flame" src="' + FLAME.src + '" alt="" decoding="async">' +
      '<img class="cc-rocket-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
    els.shadow = els.fly.querySelector('.cc-rocket-shadow');
    els.flame = els.fly.querySelector('.cc-rocket-flame');
    /* the ship fills the box's height and is centred across it; the flame is placed in shares of the ship */
    var shipW = FLY_BASE * PIC.width, shipX = (FLY_BASE - shipW) / 2, flameW = FLAME.width * shipW;
    els.flame.style.left = (shipX + FLAME.left * shipW).toFixed(2) + 'px';
    els.flame.style.top = (FLAME.top * FLY_BASE).toFixed(2) + 'px';
    els.flame.style.width = flameW.toFixed(2) + 'px';
    els.flame.style.height = (flameW * FLAME.aspect).toFixed(2) + 'px';
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
    els.fly.hidden = false; els.markRocket.hidden = false;
    els.fly.style.width = els.fly.style.height = FLY_BASE + 'px';
    startedAt = performance.now();
    sm = prevScroll = window.scrollY; vScroll = 0; surge = 0; sp = null;
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
    els.fly.hidden = true; els.markRocket.hidden = true;
  }

  function init() {
    if (!CC || !CC.$('hero') || !CC.$('destination-globe')) return;
    enable();
    window.addEventListener('scroll', kick, { passive: true });
    var rt = 0;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (on) { measure(); kick(); } }, 120); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (on) { measure(); kick(); } });
    window.addEventListener('load', function () { if (on) { measure(); kick(); } });
    if (window.ResizeObserver) new ResizeObserver(function () { if (on) { measure(); kick(); } }).observe(els.frame || CC.$('destination-globe'));
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { last = 0; kick(); } });
    document.addEventListener('cc:settings', function () { if (reduce()) disable(); else enable(); });
    /* the iframe reports where the globe is, which flag the pointer is on, and whether a country is open */
    window.addEventListener('message', function (e) {
      if (!els.frame || e.source !== els.frame.contentWindow || e.origin !== window.location.origin) return;
      var d = e.data;
      if (!d || d.type !== 'culturecompass-rocket') return;
      globe = d;
      if (on) { measure(); kick(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  else init();
})();
