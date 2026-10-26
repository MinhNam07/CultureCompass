/* CultureCompass — Home: the opening photographs and the destination chooser.
   Opening: photographs of cultural life around the world enter from the right and flow left as the visitor scrolls
   (pinned with CSS sticky; scrolling stays native). Reduced motion or no GSAP: a still column instead.
   Destinations: hover or keyboard focus previews the country's picture behind the list; only a click or
   Enter navigates. Previews are tokened, so fast moves never show an older choice. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;

  /* ---------------- opening: photographs that flow with the scroll ----------------
     The section is made tall in CSS and its stage is sticky, so the browser does all the scrolling.
     This code only turns "how far through the section" (0–1) into one paused GSAP timeline:
       0–0.2   the opening copy fades in place; the photos start to move left
       0–0.9   the photos travel right to left (slow in, slow out), new ones entering from the right edge
       0.88–1  the closing line and its link appear in the space the photos leave behind
     Positions are measured once per layout (load, resize, orientation), never inside a frame.
     With reduced motion, no GSAP or a failure, the section stays a plain column: copy, photos, link. */
  var flow = { on: false, items: [], tiles: [], tl: null, D: 0, run: 1, top: 0, W: 0, H: 0,
    cur: 0, target: 0, raf: 0, last: 0, vel: 0, lastX: null, loadedAll: false };

  function canFlow() { return !!window.gsap && !CC.motion.reduce(); }

  function galleryItems() {
    return (CC.heroGallery || []).map(function (g) {
      var a = CC.byId(CC.assets, g.assetId);
      return a && a.sizes ? { a: a, place: g.place, ratio: a.width / a.height } : null;
    }).filter(Boolean);
  }

  function srcset(a, ext) {
    var small = a.width > a.height * 1.1 || a.width === a.height ? 640 : 480;
    var large = Math.round(a.width);
    return a.sizes.s + '.' + ext + ' ' + small + 'w, ' + a.sizes.l + '.' + ext + ' ' + large + 'w';
  }

  /* every photo is in the markup from the start (alt text included); in flow mode its files are attached only
     when it is about to be needed, so nothing loads that the visitor will not reach soon */
  function renderTiles($list, deferred) {
    $list.innerHTML = flow.items.map(function (it, i) {
      var a = it.a, att = deferred ? 'data-srcset' : 'srcset';
      return '<li data-i="' + i + '"><picture>' +
        '<source type="image/avif" ' + att + '="' + esc(srcset(a, 'avif')) + '" sizes="(max-width: 760px) 50vw, 33vw">' +
        '<source type="image/webp" ' + att + '="' + esc(srcset(a, 'webp')) + '" sizes="(max-width: 760px) 50vw, 33vw">' +
        '<img ' + (deferred ? 'data-src' : 'src') + '="' + esc(a.sizes.s + '.webp') + '" alt="' + esc(a.alt + ' ' + it.place + '.') + '" width="' + a.width + '" height="' + a.height + '" decoding="async"' +
        (deferred ? '' : ' loading="lazy"') + '>' +
      '</picture><span class="hero-photo-place">' + esc(it.place) + '</span></li>';
    }).join('');
    flow.tiles = Array.prototype.slice.call($list.children);
    flow.tiles.forEach(function (li) {
      var img = li.querySelector('img');
      img.addEventListener('error', function () { li.classList.add('is-failed'); });
    });
  }

  function loadTile(i, urgent) {
    var li = flow.tiles[i];
    if (!li || li.getAttribute('data-loaded')) return;
    li.setAttribute('data-loaded', '1');
    var img = li.querySelector('img');
    if (urgent) img.setAttribute('fetchpriority', 'high');
    Array.prototype.forEach.call(li.querySelectorAll('source[data-srcset]'), function (s) { s.srcset = s.getAttribute('data-srcset'); s.removeAttribute('data-srcset'); });
    if (img.getAttribute('data-src')) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
  }

  /* --- layout: two interlocking lanes of photos, laid from the left edge rightwards (the first photos seen are on
         the left, the rest wait off to the right), with uneven sizes, offsets and gaps. Wherever a photo would pass the opening copy while it
         is still visible, or rest beside the closing line, it only uses the space above the text. --- */
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  function textBox($el, stageRect) {
    var r = null;
    Array.prototype.forEach.call($el.children, function (c) {
      var b = c.getBoundingClientRect();
      if (!b.width) return;
      r = r ? { l: Math.min(r.l, b.left), t: Math.min(r.t, b.top), r: Math.max(r.r, b.right), b: Math.max(r.b, b.bottom) } : { l: b.left, t: b.top, r: b.right, b: b.bottom };
    });
    r = r || { l: 0, t: stageRect.height, r: 0, b: stageRect.height };
    return { l: r.l - stageRect.left, t: r.t - stageRect.top, r: r.r - stageRect.left, b: r.b - stageRect.top };
  }

  function ease(p) { return (1 - Math.cos(Math.PI * p)) / 2; } // sine.inOut, as in the timeline

  function layout() {
    var $stage = CC.$('hero-stage');
    var sr = $stage.getBoundingClientRect();
    var W = sr.width, H = sr.height, phone = W <= 760;
    var header = document.getElementById('cc-header');
    var hh = header ? header.offsetHeight : 68;
    var top = hh + (phone ? 14 : 22), bottom = H - (phone ? 18 : 30), band = bottom - top;
    var pad = phone ? 18 : 36, gapY = phone ? 12 : 22;
    /* the closing line is hidden but keeps its size, so both texts can be measured */
    var copy = textBox(CC.$('hero-copy'), sr), end = textBox(CC.$('hero-end'), sr);
    var count = phone ? Math.min(20, flow.items.length) : flow.items.length;
    var laneH = (band - gapY) / 2;
    var lanes = [{ y0: top, y1: top + laneH }, { y0: bottom - laneH, y1: bottom }];
    /* small prints scattered at uneven heights, like a contact sheet spread on a table */
    var maxW = W * (phone ? 0.46 : 0.19);
    var scales = phone ? [0.78, 0.62, 0.7, 0.56] : [0.74, 0.56, 0.66, 0.5, 0.62];
    var rand, placed, D = W * (phone ? 4 : 3.5);

    function sizeFor(i, h) {
      var r = flow.items[i].ratio, w = h * r;
      if (w > maxW) { w = maxW; h = w / r; }
      return { w: w, h: h };
    }
    function gap() { return W * (phone ? 0.06 + 0.06 * rand() : 0.03 + 0.05 * rand()); }
    /* a lane is blocked where its tiles would cross a text block while that text is visible.
       `zone` = screen range [l, r] at the moment the strip is placed, `y` = the text's top */
    function fits(lane, zone, x, w) {
      if (!zone || x >= zone.r || x + w <= zone.l) return { ok: true };
      if (lane.y1 <= zone.y) return { ok: true };
      var room = zone.y - lane.y0;
      return room >= band * 0.18 ? { ok: true, maxH: room } : { ok: false };
    }

    /* Lay tiles into two lanes, each with its own cursor, always filling the lane that is further behind,
       so the photos interlock without forming a grid. dir = -1 builds leftwards from `start`
       (the closing group, measured from the far right end), dir = +1 builds rightwards (the opening). */
    function lay(from, to, dir, start, zone) {
      var cur = [start, start + dir * W * (phone ? 0.22 : 0.09)], out = [], k = 0, guard = 0;
      for (var i = from; i < to && guard < 400; guard++) {
        var li = dir < 0 ? (cur[0] >= cur[1] ? 0 : 1) : (cur[0] <= cur[1] ? 0 : 1);
        var lane = lanes[li];
        var s = sizeFor(i, laneH * scales[k % scales.length] * (0.94 + 0.06 * rand()));
        var x = dir < 0 ? cur[li] - s.w : cur[li];
        var f = fits(lane, zone, x, s.w);
        if (f.ok && f.maxH && s.h > f.maxH) { s = sizeFor(i, f.maxH); x = dir < 0 ? cur[li] - s.w : cur[li]; }
        if (!f.ok) {
          /* jump this lane past the text */
          cur[li] = dir < 0 ? Math.min(cur[li], zone.l) - gap() * 0.5 : Math.max(cur[li], zone.r) + gap() * 0.5;
          continue;
        }
        var slack = (lane.y1 - lane.y0) - s.h;
        var y = li === 0 ? lane.y0 + slack * (0.15 + 0.85 * rand()) : lane.y0 + slack * 0.85 * rand();
        if (f.maxH) y = lane.y0 + Math.max(0, Math.min(slack, f.maxH - s.h)) * rand();
        out.push({ i: i, x: x, y: y, w: s.w, h: s.h, tight: !!f.maxH });
        /* above the text, leave more air between photos */
        var g = gap() * (f.maxH ? 2.2 : 1);
        cur[li] = x + (dir < 0 ? -g : s.w + g);
        i++; k++;
      }
      return { tiles: out, edge: dir < 0 ? Math.min(cur[0], cur[1]) : Math.max(cur[0], cur[1]) };
    }

    var endCount = phone ? 4 : 7;
    var land = phone ? W * 0.05 : W * 0.03;   // gap between the far (right) end of the strip and the screen edge at rest
    var mainCount = count - endCount;
    for (var pass = 0; pass < 3; pass++) {
      rand = rng(phone ? 7 : 11);
      /* the opening copy fades over 0–0.2; anything that would cross it while it is still above 40% avoids it.
         The strip moves left, so tiles that start up to t15 to the right of the copy will pass over it. */
      var t15 = D * ease(0.12 / 0.9);
      var openZone = { l: copy.l - pad, r: copy.r + pad + t15, y: copy.t - pad };
      var main = lay(0, mainCount, 1, -W * 0.01, openZone);
      /* closing group: positions measured from the far right end (u = 0), which rests at W - land */
      var rest = W - land;
      var endZone = { l: end.l - pad - rest, r: end.r + pad - rest, y: end.t - pad };
      var grp = lay(mainCount, count, -1, 0, endZone);
      var rightEnd = main.edge - grp.edge;
      grp.tiles.forEach(function (t) { t.x += rightEnd; t.end = true; });
      placed = main.tiles.concat(grp.tiles);
      var newD = rightEnd - rest;
      var done = Math.abs(newD - D) < W * 0.05;
      D = newD;
      if (done) break;
    }

    flow.tiles.forEach(function (li) { li.hidden = true; li.style.transform = ''; });
    flow.geo = [];
    var pr = rng(29);
    placed.forEach(function (t) {
      t.phase = pr() * Math.PI * 2;
      /* how this photo is tilted while it is still arriving or already leaving: 9–17° in the plane, 28–44° in depth */
      t.rot = (pr() < 0.5 ? -1 : 1) * (9 + 8 * pr());
      t.ry = 28 + 16 * pr();
    });
    placed.forEach(function (t) {
      var li = flow.tiles[t.i];
      li.hidden = false;
      li.style.left = Math.round(t.x) + 'px';
      li.style.top = Math.round(t.y) + 'px';
      li.style.width = Math.round(t.w) + 'px';
      li.style.height = Math.round(t.h) + 'px';
      Array.prototype.forEach.call(li.querySelectorAll('source'), function (s) { s.sizes = Math.round(t.w) + 'px'; });
      flow.geo[t.i] = { x: t.x, w: t.w, phase: t.phase, rot: t.rot, ry: t.ry, shown: null,
        img: li.querySelector('img'), pic: li.querySelector('picture') };
    });
    flow.lastX = null;
    flow.D = D; flow.W = W; flow.H = H;

    var hero = CC.$('hero');
    flow.top = hero.getBoundingClientRect().top + window.scrollY;
    flow.run = Math.max(1, hero.offsetHeight - H);
  }

  /* photos on screen now, or within about one screen of entering from the left, get their files */
  function stripX(progress) { return -flow.D * ease(Math.min(progress, 0.9) / 0.9); }

  /* photos on screen now, or within about one screen of entering from the right, get their files */
  function loadAhead(progress) {
    var t = stripX(progress);
    flow.geo.forEach(function (g, i) {
      if (!g) return;
      var x = g.x + t;
      if (x + g.w > -flow.W * 0.05 && x < flow.W * 2.2) loadTile(i, progress === 0 && x + g.w > 0 && x < flow.W);
    });
  }

  /* --- each photo's own motion, on top of the strip's travel ---
     Appear and leave (the focal moment): a photo is dealt onto the table as it crosses into the screen. It
     arrives small, tilted and turned away in depth, then settles flat and full size; near the left edge it
     folds away the same way. These play as short timed tweens, so a photo always finishes arriving even if
     the visitor stops scrolling, and they retarget from wherever they are when the direction changes.
     Underneath: a gentle wave in height, a window-like parallax of the picture inside its frame, and a slight
     lean with the scroll speed that settles back to straight. Transforms and opacity only. */
  var IN = { duration: 1.05, ease: 'expo.out' };
  var OUT = { duration: 0.6, ease: 'power2.in' };
  function hiddenState(g, side) {
    /* side +1: waiting beyond the right edge; side -1: gone past the left edge */
    return { scale: 0.42, rotation: g.rot, rotationY: side * g.ry, yPercent: 8, opacity: 0, transformPerspective: 900 };
  }
  function setShown(g, show, side, instant) {
    if (g.shown === show) return;
    g.shown = show;
    var gs = window.gsap;
    var target = show ? { scale: 1, rotation: 0, rotationY: 0, yPercent: 0, opacity: 1, transformPerspective: 900 } : hiddenState(g, side);
    if (instant) { gs.killTweensOf(g.pic); gs.set(g.pic, target); return; }
    if (show) {
      /* arriving from the side it was waiting on */
      if (!gs.isTweening(g.pic) && gs.getProperty(g.pic, 'opacity') < 0.05) gs.set(g.pic, hiddenState(g, side));
      /* shape settles slowly; opacity arrives quickly so the photo is readable while it is still settling */
      var shape = Object.assign({}, target, IN, { overwrite: true, delay: g.delay || 0 });
      delete shape.opacity;
      gs.to(g.pic, shape);
      gs.to(g.pic, { opacity: 1, duration: 0.35, ease: 'power1.out', delay: g.delay || 0, overwrite: false });
    } else {
      gs.to(g.pic, Object.assign({}, target, OUT, { overwrite: true }));
    }
    g.delay = 0;
  }

  function paint(now, dt, quiet) {
    var x0 = stripX(flow.cur), W = flow.W;
    /* speed of the strip in px per ms, smoothed so a wheel's steps do not flicker the lean */
    var v = flow.lastX == null || !dt ? 0 : (x0 - flow.lastX) / dt;
    flow.lastX = x0;
    var k = dt ? 1 - Math.exp(-dt / 160) : 1;
    flow.vel += (v - flow.vel) * k;
    if (Math.abs(flow.vel) < 0.002) flow.vel = 0;
    var lean = Math.max(-1, Math.min(1, flow.vel / 1.6));   // -1 … 1, negative while moving left
    var skew = lean * 3;
    flow.geo.forEach(function (g, i) {
      if (!g) return;
      var x = g.x + x0, cx = x + g.w / 2;
      /* appear once a photo is a little way onto the screen; leave just before it reaches the left edge.
         The two thresholds differ slightly so a photo resting on one never flickers. */
      if (!g.shown) {
        if (x < W * 0.97 && cx > W * 0.07) setShown(g, true, cx > W / 2 ? 1 : -1, quiet);
        else if (g.shown === null) setShown(g, false, cx > W / 2 ? 1 : -1, true);
      } else if (x > W * 0.995) setShown(g, false, 1, quiet);
      else if (cx < W * 0.035) setShown(g, false, -1, quiet);
      if (x + g.w < -60 || x > W + 60) return;   // off screen: leave it alone
      var p = cx / W;                             // 0 = left edge, 1 = right edge
      var pc = Math.max(-0.2, Math.min(1.2, p));
      var y = Math.sin(g.phase + pc * Math.PI * 1.4) * 8;
      flow.tiles[i].style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) skewX(' + skew.toFixed(2) + 'deg)';
      g.img.style.transform = 'translate3d(' + ((0.5 - pc) * 2 * 5).toFixed(2) + '%,0,0) scale(1.14)';
    });
  }

  /* the first screen deals its photos in one after another, right to left, as the page opens */
  function dealOpening() {
    var gs = window.gsap;
    var first = flow.geo.filter(function (g) { return g && g.shown; })
      .sort(function (a, b) { return (b.x + b.w) - (a.x + a.w); });
    first.forEach(function (g, n) {
      gs.set(g.pic, hiddenState(g, 1));
      g.shown = false;
      g.delay = 0.15 + n * 0.07;
      setShown(g, true, 1, false);
    });
  }

  function loadRest() {
    if (flow.loadedAll || CC.motion.lowData()) return;
    flow.loadedAll = true;
    var order = flow.geo.map(function (g, i) { return g ? i : -1; }).filter(function (i) { return i >= 0; });
    var step = function () {
      var next = order.shift();
      if (next == null) return;
      loadTile(next);
      (window.requestIdleCallback || function (f) { setTimeout(f, 120); })(step);
    };
    step();
  }

  function progressNow() {
    return Math.min(1, Math.max(0, (window.scrollY - flow.top) / flow.run));
  }

  function tick(now) {
    var dt = Math.min(64, now - (flow.last || now));
    flow.last = now;
    /* a soft follow (about a third of a second) turns wheel steps into one gliding flow; it never runs ahead of the scroll */
    var k = 1 - Math.exp(-dt / 320);
    flow.cur += (flow.target - flow.cur) * k;
    if (Math.abs(flow.target - flow.cur) < 0.00015) flow.cur = flow.target;
    flow.tl.progress(flow.cur);
    loadAhead(flow.cur);
    paint(now, dt, false);
    /* keep running until the strip has stopped and its lean has settled back to straight */
    if (flow.cur !== flow.target || flow.vel !== 0) flow.raf = requestAnimationFrame(tick);
    else { flow.raf = 0; flow.last = 0; }
  }
  function onScroll() {
    if (!flow.on) return;
    flow.target = progressNow();
    if (!flow.raf) flow.raf = requestAnimationFrame(tick);
  }

  function buildTimeline() {
    var g = window.gsap, $copy = CC.$('hero-copy'), $end = CC.$('hero-end'), $list = CC.$('hero-flow');
    if (flow.tl) flow.tl.kill();
    flow.tl = g.timeline({ paused: true })
      /* opacity only: the page title stays in the accessibility tree; the copy holds nothing to click or focus */
      .fromTo($copy, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'none' }, 0)
      .fromTo($list, { x: 0 }, { x: function () { return -flow.D; }, duration: 0.9, ease: 'sine.inOut' }, 0)
      /* autoAlpha: while hidden the closing link is out of the tab order and cannot be clicked */
      .fromTo($end, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.09, ease: 'none' }, 0.88)
      .set({}, {}, 1);
  }

  function relayout() {
    layout();
    flow.tl.invalidate();
    flow.cur = flow.target = progressNow();
    flow.tl.progress(flow.cur);
    loadAhead(flow.cur);
    flow.vel = 0;
    paint(0, 0, true);
  }

  function startFlow() {
    var $hero = CC.$('hero');
    $hero.classList.add('is-flow');
    renderTiles(CC.$('hero-flow'), true);
    buildTimeline();
    flow.on = true;
    relayout();
    if (!flow.dealt) { flow.dealt = true; dealOpening(); }
    if (document.readyState === 'complete') loadRest(); else window.addEventListener('load', loadRest, { once: true });
  }

  function stopFlow() {
    flow.on = false;
    if (flow.raf) cancelAnimationFrame(flow.raf);
    flow.raf = 0;
    if (flow.tl) { flow.tl.kill(); flow.tl = null; }
    (flow.geo || []).forEach(function (g) { if (g) window.gsap.killTweensOf(g.pic); });
    flow.dealt = false;
    var $hero = CC.$('hero'), $list = CC.$('hero-flow');
    $hero.classList.remove('is-flow');
    if (window.gsap) window.gsap.set([CC.$('hero-copy'), CC.$('hero-end'), $list], { clearProps: 'all' });
    renderTiles($list, false);
  }

  function initFlow() {
    flow.items = galleryItems();
    if (!flow.items.length) return;
    if (canFlow()) startFlow(); else renderTiles(CC.$('hero-flow'), false);

    window.addEventListener('scroll', onScroll, { passive: true });
    /* re-measure on real size changes only: a phone's address bar showing or hiding changes the height a
       little and must not rebuild the strip */
    var rt = null;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        if (!flow.on) return;
        var s = CC.$('hero-stage');
        if (Math.abs(s.clientWidth - flow.W) < 2 && Math.abs(s.clientHeight - flow.H) < 120) { flow.top = CC.$('hero').getBoundingClientRect().top + window.scrollY; onScroll(); return; }
        relayout();
      }, 160);
    });
    window.addEventListener('orientationchange', function () { setTimeout(function () { if (flow.on) relayout(); }, 250); });
    /* the site's own Reduce motion setting, or the device's, can change while the page is open */
    document.addEventListener('cc:settings', function () {
      if (canFlow() && !flow.on) startFlow();
      else if (!canFlow() && flow.on) stopFlow();
    });
    /* fonts change the size of the text the layout avoids */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (flow.on) relayout(); });
  }

  /* ---------------- destinations ---------------- */
  var token = 0, leaveT = null;
  function countsFor(id) {
    var stories = (CC.stories || []).filter(function (s) { return s.country === id; }).length;
    var topics = (CC.topics || []).filter(function (t) { return t.country === id && t.status === 'ready'; }).length;
    var scenes = (CC.scenarios || []).length; // every scene today is in Vietnam (Hà Nội)
    var phrases = (CC.phrases || []).length;
    return CC.plural(topics, 'theme') + ' · ' + CC.plural(stories, 'story', 'stories') + ' · ' + CC.plural(scenes, 'practice scene') + ' · ' + CC.plural(phrases, 'phrase');
  }

  function initDestinations() {
    var globe = CC.$('destination-globe');
    if (globe) {
      var destinationSection = CC.$('destinations');
      var destinationHeader = CC.$('cc-header');
      var headerFrame = 0;
      function updateDestinationHeader() {
        headerFrame = 0;
        if (!destinationSection || !destinationHeader) return;
        var bounds = destinationSection.getBoundingClientRect();
        var edge = destinationHeader.getBoundingClientRect().bottom;
        // The night surface continues through the guide and homepage footer.
        destinationHeader.classList.toggle('is-over-destinations', bounds.top <= edge + 24);
      }
      function scheduleDestinationHeader() {
        if (!headerFrame) headerFrame = requestAnimationFrame(updateDestinationHeader);
      }
      window.addEventListener('scroll', scheduleDestinationHeader, { passive: true });
      window.addEventListener('resize', scheduleDestinationHeader);
      new ResizeObserver(scheduleDestinationHeader).observe(destinationSection);
      updateDestinationHeader();
      window.addEventListener('message' , function (event) {
        if (event.source !== globe.contentWindow || event.origin !== window.location.origin) return;
        var data = event.data;
        if (!data || data.type !== 'culturecompass-globe-height' || typeof data.height !== 'number' || !isFinite(data.height)) return;
        globe.style.height = Math.max(500, Math.min(1600, data.height)) + 'px';
      });
      return;
    }

    var list = (CC.countries || []).filter(function (c) { return c.status === 'ready'; });
    var $list = CC.$('dest-list'), $stage = CC.$('dest-stage'), $sec = CC.$('destinations'), $credit = CC.$('dest-credit');
    if (!list.length) {
      $list.innerHTML = '<li class="cc-empty"><h3>No destinations yet</h3><p>Content is still being researched.</p></li>';
      return;
    }
    $list.innerHTML = list.map(function (c) {
      return '<li class="dest-item"><a class="dest-name" href="' + esc(c.href) + '" data-country="' + esc(c.id) + '" aria-label="' + esc(c.name + ', ' + c.start.toLowerCase()) + '" aria-describedby="dest-intro-' + esc(c.id) + '">' +
        '<span class="dest-word">' + esc(c.name) + '</span>' +
        '<span class="dest-local"><span lang="vi">' + esc(c.local) + '</span> <span class="dest-start">— ' + esc(c.start.charAt(0).toLowerCase() + c.start.slice(1)) + '</span></span>' +
        '<span class="dest-go">' + CC.icon('arrowRight') + '</span>' +
        '<span class="dest-intro" id="dest-intro-' + esc(c.id) + '"><p>' + esc(c.intro) + '</p><span class="cc-meta">' + esc(countsFor(c.id)) + '</span></span>' +
      '</a></li>';
    }).join('');
    CC.$('dest-note').innerHTML = CC.icon('globe') + '<span>Vietnam is the only destination so far. Other countries will appear here once their stories are researched and sourced; we don’t list them before that.</span>';

    /* one picture per country, stacked; only the active one is visible */
    $stage.innerHTML = list.map(function (c) {
      var img = CC.byId(CC.assets, (c.preview || {}).imageId);
      return img ? '<img data-for="' + esc(c.id) + '" src="' + esc(img.file) + '" alt="" loading="lazy" decoding="async" style="opacity:0">' : '';
    }).join('') + '<span class="dest-stage-cap"></span>';

    function credit(c) {
      var img = CC.byId(CC.assets, (c.preview || {}).imageId);
      if (!img) return '';
      return esc((c.preview || {}).caption || '') + '. Photo: ' + esc(img.credit.split(',')[0]) + ', <a href="' + esc(img.licenseUrl) + '" target="_blank" rel="noopener" tabindex="-1">' + esc(img.license) + '</a>, via Wikimedia Commons.';
    }

    function preview(id) {
      var my = ++token;
      clearTimeout(leaveT);
      var c = CC.byId(list, id);
      Array.prototype.forEach.call($stage.querySelectorAll('img'), function (im) { im.style.opacity = im.getAttribute('data-for') === id ? '1' : '0'; });
      Array.prototype.forEach.call($list.querySelectorAll('.dest-name'), function (a) { a.classList.toggle('is-active', a.getAttribute('data-country') === id); });
      if (my !== token) return;
      $sec.classList.add('is-previewing');
      $credit.innerHTML = credit(c);
      $stage.querySelector('.dest-stage-cap').textContent = (c.preview || {}).caption || '';
    }
    function clear() {
      var my = ++token;
      leaveT = setTimeout(function () {
        if (my !== token) return;
        $sec.classList.remove('is-previewing');
        Array.prototype.forEach.call($list.querySelectorAll('.dest-name'), function (a) { a.classList.remove('is-active'); });
      }, 140);
    }
    var narrow = window.matchMedia('(hover: none), (max-width: 760px)');
    function syncNarrow() { if (narrow.matches) preview(list[0].id); }
    if (narrow.addEventListener) narrow.addEventListener('change', syncNarrow);
    syncNarrow();

    $list.addEventListener('mouseover', function (e) { var a = e.target.closest('.dest-name'); if (a && !narrow.matches) preview(a.getAttribute('data-country')); });
    $list.addEventListener('mouseleave', function () { if (!narrow.matches && !$list.contains(document.activeElement)) clear(); });
    $list.addEventListener('focusin', function (e) { var a = e.target.closest('.dest-name'); if (a) preview(a.getAttribute('data-country')); });
    $list.addEventListener('focusout', function () { if (!narrow.matches) setTimeout(function () { if (!$list.contains(document.activeElement) && !$list.matches(':hover')) clear(); }, 0); });

    /* choosing: keep the name as the bridge, widen the picture, then go. A second click goes at once. */
    var leaving = false;
    $list.addEventListener('click', function (e) {
      var a = e.target.closest('.dest-name');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      if (CC.motion.reduce() || !window.gsap) return;
      e.preventDefault();
      if (leaving) { window.location.href = a.href; return; }
      leaving = true;
      preview(a.getAttribute('data-country'));
      a.classList.add('is-leaving');
      var go = function () { if (go.done) return; go.done = true; window.location.href = a.href; };
      setTimeout(go, 650); // never let the animation hold the visitor back
      var tl = window.gsap.timeline({ onComplete: go });
      tl.to($sec.querySelectorAll('.dest-head, .dest-note, .dest-intro'), { opacity: 0, y: -8, duration: 0.22, ease: 'power2.out' }, 0)
        .to($stage.querySelector('img[data-for="' + a.getAttribute('data-country') + '"]'), { scale: 1.08, duration: 0.42, ease: 'power3.inOut' }, 0)
        .to(a.querySelector('.dest-word'), { x: 0, scale: 1.06, duration: 0.4, ease: 'power3.out' }, 0.05);
    });
    window.addEventListener('pageshow', function (e) {
      /* coming back with the browser's Back button: undo the exit animation */
      if (!e.persisted) return;
      leaving = false;
      if (window.gsap) window.gsap.set($sec.querySelectorAll('.dest-head, .dest-note, .dest-intro, .dest-word, .dest-stage img'), { clearProps: 'all' });
      Array.prototype.forEach.call($list.querySelectorAll('.is-leaving'), function (a) { a.classList.remove('is-leaving'); });
      if (!narrow.matches) clear();
      Array.prototype.forEach.call($stage.querySelectorAll('img'), function (im) { im.style.opacity = narrow.matches ? '1' : '0'; });
    });
  }

  /* the closing link: scroll to the chooser and move keyboard focus there */
  function initExplore() {
    CC.$('hero-explore').addEventListener('click', function (e) {
      e.preventDefault();
      var t = CC.$('destinations');
      CC.motion.scrollTo(t);
      t.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, '', '#destinations');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    CC.renderShell({ current: location.hash === '#destinations' ? 'destinations' : null, section: 'destinations', overMedia: '#hero' });
    initFlow();
    initDestinations();
    initExplore();
    /* arriving at index.html#destinations: the opening has just changed height, so land on the chooser again */
    if (location.hash === '#destinations') {
      var t = CC.$('destinations');
      requestAnimationFrame(function () { window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0), behavior: 'instant' }); });
    }
  });
})();
