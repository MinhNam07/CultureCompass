/* CultureCompass — home "compass": culture topics arranged around a centre, like a map you explore.
   - Topics are real <button>s in an HTML layer (keyboard, screen readers, labels always visible).
   - Curved links and "shares points with" lines are drawn in an SVG layer behind them.
   - Opening a topic turns the ring so that topic sits on the left, fans out its items
     (scenes, things to know, phrases) and shows the detail panel. On narrow screens
     items are listed in the panel below the compass instead of fanning out.
   Uses GSAP when available and motion is allowed; otherwise jumps straight to the end state. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  var SVGNS = 'http://www.w3.org/2000/svg';

  var topics, stage, linkLayer, nodeLayer, panel, centre;
  var topicEls = [], itemEls = [];
  var state = { open: null, offset: 0, grow: 0, hover: null, wide: false };
  var tweens = { turn: null, grow: null };

  function reduce() { return CC.settings.reduce() || !window.gsap; }
  function isWide() { return window.matchMedia('(min-width: 992px)').matches; }
  function mod(a, n) { return ((a % n) + n) % n; }

  /* ---------- data helpers ---------- */
  function resolve(item) {
    if (item.type === 'scene') return CC.byId(CC.scenarios, item.id);
    if (item.type === 'claim') return CC.byId(CC.claims, item.id);
    if (item.type === 'phrase') return CC.byId(CC.phrases, item.id);
    return null;
  }
  function itemLabel(item) {
    var d = resolve(item);
    if (!d) return item.id;
    if (item.type === 'scene') return d.title;
    if (item.type === 'phrase') return d.vi;
    return item.label || d.id;
  }
  function itemKey(item) { return item.type + ':' + item.id; }

  /* Topics that share at least one item with topic t (the "tag lines" idea from the research). */
  function relatedTo(t) {
    var keys = t.items.map(itemKey);
    return topics.filter(function (o) {
      return o !== t && o.items.some(function (it) { return keys.indexOf(itemKey(it)) !== -1; });
    });
  }
  function explored(t) {
    return t.items.some(function (it) { return it.type === 'scene' && CC.progress.get(it.id) === 'done'; });
  }

  /* ---------- geometry ---------- */
  function geometry() {
    var w = stage.clientWidth, h = stage.clientHeight;
    var wide = isWide();
    var g = { w: w, h: h, wide: wide };
    if (wide) {
      var panelW = Math.min(440, w * 0.38);
      var openShift = state.open ? 1 : 0;
      g.cx = w / 2 - openShift * (w / 2 - (w - panelW) * 0.5);
      g.cy = h / 2;
      /* when open, the ring shrinks (smaller discs, see .has-open) to leave room for labels beside the panel */
      g.R = Math.min(h * 0.34, 260, state.open ? (w - panelW) * 0.2 : w * 0.3);
      /* keep at least 70px left of the fanned items for their labels */
      g.itemR = g.R + Math.max(80, Math.min(140, h * 0.2, g.cx - g.R - 70));
    } else {
      /* narrow: a tall ellipse, labels always under the discs */
      g.cx = w / 2;
      g.cy = h / 2 - 12;
      g.R = Math.min(w / 2 - 46, w * 0.37);
      g.squash = Math.min(h / 2 - 64, h * 0.38) / g.R;
      g.itemR = 0;
    }
    return g;
  }
  function topicAngle(i) { return -90 + (360 / topics.length) * i + state.offset; }
  /* Labels sit on the outer side of the ring so they never collide with neighbouring discs. */
  function side(angle) {
    var a = angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    if (Math.abs(s) >= 0.8) return s < 0 ? 'top' : 'bottom';
    return c < 0 ? 'left' : 'right';
  }
  function polar(g, angle, r) {
    var a = angle * Math.PI / 180;
    return { x: g.cx + Math.cos(a) * r, y: g.cy + Math.sin(a) * r * (g.squash || 1) };
  }
  /* Cubic link like a branch: leaves the source horizontally, reaches the target horizontally. */
  function branch(a, b) {
    var mx = (a.x + b.x) / 2;
    return 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + 'C' + mx.toFixed(1) + ' ' + a.y.toFixed(1) + ' ' +
      mx.toFixed(1) + ' ' + b.y.toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1);
  }
  /* Curve between two topics, bending toward the centre. */
  function bow(g, a, b) {
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    var qx = mx + (g.cx - mx) * 0.55, qy = my + (g.cy - my) * 0.55;
    return 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) + 'Q' + qx.toFixed(1) + ' ' + qy.toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1);
  }

  /* Position by left/top; CSS `translate` centres the element, so GSAP can still scale it. */
  function place(el, x, y) {
    el.style.left = x.toFixed(1) + 'px';
    el.style.top = y.toFixed(1) + 'px';
  }

  /* ---------- render (called on every animation frame while moving) ---------- */
  function render() {
    var g = geometry();
    var paths = [];
    place(centre, g.cx, g.cy);
    var pos = topics.map(function (t, i) { return polar(g, topicAngle(i), g.R * state.grow); });
    var c = { x: g.cx, y: g.cy };

    topics.forEach(function (t, i) {
      var p = pos[i];
      place(topicEls[i], p.x, p.y);
      /* the open topic's label goes below it: its items fan out on the outer side */
      topicEls[i].setAttribute('data-side', !g.wide || state.open === t ? 'bottom' : side(topicAngle(i)));
      var cls = 'hub-link' + (state.open === t ? ' is-open' : '') + (t.status === 'planned' ? ' is-planned' : '');
      paths.push('<path class="' + cls + '" d="' + branch(c, p) + '"/>');
    });

    /* dashed lines to topics that share points with the hovered (or open) topic */
    var focusT = state.hover || state.open;
    if (focusT && state.grow > 0.98) {
      var fi = topics.indexOf(focusT);
      relatedTo(focusT).forEach(function (o) {
        paths.push('<path class="hub-tag" d="' + bow(g, pos[fi], pos[topics.indexOf(o)]) + '"/>');
      });
    }

    /* items fanned out around the open topic (wide screens only) */
    if (state.open && g.wide && itemEls.length) {
      var oi = topics.indexOf(state.open);
      var base = topicAngle(oi);
      var n = itemEls.length;
      var step = Math.min(24, 120 / Math.max(n - 1, 1));
      itemEls.forEach(function (el, k) {
        var ang = base + ((n - 1) / 2 - k) * step; /* first item (usually the scene) at the top */
        var p = polar(g, ang, g.itemR);
        place(el, p.x, p.y);
        paths.push('<path class="hub-link is-item" d="' + branch(pos[oi], p) + '"/>');
      });
    }
    linkLayer.innerHTML = paths.join('');
  }

  /* ---------- building ---------- */
  function topicButton(t, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'hub-node hub-topic' + (t.status === 'planned' ? ' is-planned' : '') + (explored(t) ? ' is-explored' : '');
    b.id = 'hub-topic-' + t.id;
    b.setAttribute('data-topic', t.id);
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-controls', 'hub-panel');
    b.innerHTML =
      '<span class="hub-disc">' + (CC.icons[t.icon] || '') +
        (explored(t) ? '<span class="hub-check" aria-hidden="true">✓</span>' : '') + '</span>' +
      '<span class="hub-label"><span class="hub-en">' + esc(t.label) + '</span>' +
        '<span class="hub-vi" lang="vi">' + esc(t.vi) + '</span></span>' +
      '<span class="visually-hidden">' + (t.status === 'planned' ? ', not written yet' : ', ' + t.items.length + ' items') +
        (explored(t) ? ', explored' : '') + '</span>';
    b.addEventListener('click', function () { toggle(t); });
    b.addEventListener('mouseenter', function () { hover(t, b, true); });
    b.addEventListener('mouseleave', function () { hover(t, b, false); });
    b.addEventListener('focus', function () { hover(t, b, true); });
    b.addEventListener('blur', function () { hover(t, b, false); });
    b.addEventListener('keydown', function (e) { arrowKeys(e, i); });
    return b;
  }

  function hover(t, b, on) {
    state.hover = on ? t : (state.hover === t ? null : state.hover);
    var disc = b.querySelector('.hub-disc');
    if (window.gsap && !reduce()) {
      window.gsap.to(disc, { scale: on ? 1.12 : 1, duration: 0.15, ease: 'power2.out', overwrite: 'auto' });
    }
    render();
  }

  function arrowKeys(e, i) {
    var n = topics.length, to = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = mod(i + 1, n);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = mod(i - 1, n);
    else if (e.key === 'Home') to = 0;
    else if (e.key === 'End') to = n - 1;
    if (to === null) return;
    e.preventDefault();
    topicEls[to].focus();
  }

  function itemNode(item, k) {
    var d = resolve(item);
    var label = itemLabel(item);
    var el;
    if (item.type === 'scene') {
      el = document.createElement('a');
      el.href = 'scene.html?id=' + item.id;
    } else {
      el = document.createElement('button');
      el.type = 'button';
      el.addEventListener('click', function () { highlight(k); });
    }
    el.className = 'hub-node hub-item hub-item-' + item.type;
    el.tabIndex = -1; /* the panel holds the same items in reading order; this is a visual shortcut */
    el.setAttribute('aria-hidden', 'true');
    var art = item.type === 'scene' && CC.svgs[item.id] ? '<span class="hub-thumb">' + thumb(item.id) + '</span>'
      : (CC.icons[item.type === 'claim' ? 'know' : 'say'] || '');
    el.innerHTML = '<span class="hub-disc">' + art + '</span><span class="hub-label"><span class="hub-en"' +
      (item.type === 'phrase' ? ' lang="vi"' : '') + '>' + esc(label) + '</span></span>';
    if (!d) el.classList.add('is-missing');
    return el;
  }
  function thumb(id) {
    return (CC.svgs[id] || '').replace(/ id="[^"]*"/g, '').replace('role="img"', 'aria-hidden="true" focusable="false"').replace(/ aria-label="[^"]*"/, '');
  }

  /* ---------- panel ---------- */
  function panelHtml(t) {
    var i = topics.indexOf(t);
    var scenes = t.items.filter(function (it) { return it.type === 'scene'; });
    var claims = t.items.filter(function (it) { return it.type === 'claim'; });
    var phrases = t.items.filter(function (it) { return it.type === 'phrase'; });
    var idx = function (it) { return t.items.indexOf(it); };
    var h = '<div class="d-flex justify-content-between align-items-start gap-2">' +
      '<div><p class="cc-kicker mb-1">Topic ' + (i + 1) + ' of ' + topics.length + '</p>' +
      '<h2 class="h4 mb-0" id="hub-panel-title" tabindex="-1">' + esc(t.label) + '</h2>' +
      '<p class="hub-panel-vi mb-0" lang="vi">' + esc(t.vi) + '</p></div>' +
      '<button type="button" class="btn-close mt-1" data-hub-close aria-label="Close ' + esc(t.label) + '"></button></div>' +
      '<p class="mt-3">' + esc(t.blurb) + '</p>';

    if (t.status === 'planned') {
      h += '<div class="cc-scope">This topic is on the map so you can see where CultureCompass is going. ' +
        'Nothing is published here until it has a source. <a href="about.html">How content is checked</a></div>';
      return h;
    }
    if (scenes.length) {
      h += '<h3 class="hub-panel-h">Rehearse it</h3>' + scenes.map(function (it) {
        var sc = resolve(it);
        if (!sc) return '';
        var done = CC.progress.get(sc.id) === 'done';
        return '<div class="hub-scene" id="hub-item-' + idx(it) + '"><span class="hub-scene-thumb">' + thumb(sc.id) + '</span>' +
          '<div class="flex-grow-1"><div class="fw-semibold">' + esc(sc.title) + '</div>' +
          '<div class="small text-soft">' + esc(sc.place) + ' · about ' + sc.minutes + ' min' + (done ? ' · ✓ explored' : '') + '</div>' +
          '<a class="btn btn-cc btn-sm mt-2" href="scene.html?id=' + sc.id + '">' + (done ? 'Explore again' : 'Open scene') +
          '<span class="visually-hidden">: ' + esc(sc.title) + '</span></a></div></div>';
      }).join('');
    }
    if (claims.length) {
      h += '<h3 class="hub-panel-h">Good to know</h3><ul class="hub-facts">' + claims.map(function (it) {
        var c = resolve(it);
        if (!c) return '';
        var tip = c.kind === 'projectNote';
        return '<li id="hub-item-' + idx(it) + '"><span class="hub-fact-label">' + esc(it.label || '') + '</span> ' +
          esc(c.text) + CC.verifyBadge(c.status) +
          '<div>' + (tip ? '<span class="cc-src">CultureCompass tip, not a cultural rule</span>' : CC.sourceLinks(c.sourceIds)) + '</div></li>';
      }).join('') + '</ul>';
    }
    if (phrases.length) {
      h += '<h3 class="hub-panel-h">Words to use</h3><div class="d-grid gap-2">' + phrases.map(function (it) {
        var ph = resolve(it);
        return ph ? '<div id="hub-item-' + idx(it) + '">' + CC.phraseHtml(ph, { compact: true }) +
          '<div class="small text-soft mt-1">Use with: ' + esc(ph.useWith) + '</div></div>' : '';
      }).join('') + '</div><p class="small mt-2 mb-0"><a href="phrases.html">All phrases</a></p>';
    }
    var rel = relatedTo(t);
    if (rel.length) {
      h += '<h3 class="hub-panel-h">Shares points with</h3><div class="d-flex flex-wrap gap-2">' + rel.map(function (o) {
        return '<button type="button" class="btn btn-cc-ghost btn-sm" data-hub-open="' + o.id + '">' + esc(o.label) + '</button>';
      }).join('') + '</div>';
    }
    h += '<p class="small text-soft mt-3 mb-0">Points apply to Hanoi and can differ by family, region and place.</p>';
    return h;
  }

  function highlight(k) {
    var el = document.getElementById('hub-item-' + k);
    if (!el) return;
    el.scrollIntoView({ block: 'nearest', behavior: reduce() ? 'auto' : 'smooth' });
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
    var f = el.querySelector('a, button');
    if (f) f.focus({ preventScroll: true });
  }

  /* ---------- open / close ---------- */
  function clearItems() {
    itemEls.forEach(function (el) { el.remove(); });
    itemEls = [];
  }

  function shortestTurn(from, to) {
    var d = mod(to - from + 180, 360) - 180;
    return from + d;
  }

  function open(t, opts) {
    opts = opts || {};
    var wasOpen = state.open;
    state.open = t;
    topicEls.forEach(function (b) {
      var on = b.getAttribute('data-topic') === t.id;
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      b.classList.toggle('is-open', on);
    });
    stage.classList.add('has-open');
    clearItems();
    if (isWide()) {
      t.items.forEach(function (it, k) {
        var el = itemNode(it, k);
        nodeLayer.appendChild(el);
        itemEls.push(el);
      });
    }

    panel.innerHTML = panelHtml(t);
    panel.hidden = false;
    if (history.replaceState) history.replaceState(null, '', '#' + t.id);

    /* turn the ring so this topic sits on the left (wide screens) */
    var i = topics.indexOf(t);
    var target = isWide() ? shortestTurn(state.offset, 180 - (360 / topics.length) * i + 90) : 0;
    if (tweens.turn) tweens.turn.kill();
    var animate = !reduce() && !opts.instant;
    if (animate) {
      var gsap = window.gsap;
      tweens.turn = gsap.to(state, { offset: target, duration: wasOpen ? 0.6 : 0.7, ease: 'power2.inOut', onUpdate: render });
      if (itemEls.length) {
        gsap.fromTo(itemEls, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.6)', stagger: 0.05, delay: 0.45 });
      }
      /* opacity, not autoAlpha: the panel must stay focusable while it fades in */
      gsap.fromTo(panel, { opacity: 0, x: isWide() ? 24 : 0, y: isWide() ? 0 : 12 }, { opacity: 1, x: 0, y: 0, duration: 0.3, ease: 'power3.out', delay: isWide() ? 0.25 : 0 });
    } else {
      state.offset = target;
      render();
    }
    if (!opts.keepFocus) {
      var title = document.getElementById('hub-panel-title');
      if (!isWide()) panel.scrollIntoView({ block: 'start', behavior: animate ? 'smooth' : 'auto' });
      if (title) title.focus({ preventScroll: isWide() });
    }
  }

  function close(opts) {
    opts = opts || {};
    var t = state.open;
    if (!t) return;
    state.open = null;
    topicEls.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); b.classList.remove('is-open'); });
    stage.classList.remove('has-open');
    clearItems();
    panel.hidden = true;
    panel.innerHTML = '';
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (tweens.turn) tweens.turn.kill();
    if (!reduce()) tweens.turn = window.gsap.to(state, { offset: 0, duration: 0.6, ease: 'power2.inOut', onUpdate: render });
    else { state.offset = 0; render(); }
    if (!opts.noFocus) document.getElementById('hub-topic-' + t.id).focus();
  }

  function toggle(t) {
    if (state.open === t) close(); else open(t);
  }

  /* ---------- quick list (same topics, no map) ---------- */
  function renderList() {
    var list = document.getElementById('hub-list');
    if (!list) return;
    list.innerHTML = topics.map(function (t) {
      var count = t.status === 'planned' ? 'Coming later' :
        t.items.length + ' items' + (explored(t) ? ' · ✓ explored' : '');
      return '<li class="col-sm-6 col-lg-4"><button type="button" class="hub-list-btn' + (t.status === 'planned' ? ' is-planned' : '') +
        '" data-hub-open="' + t.id + '"><span class="hub-list-icon">' + (CC.icons[t.icon] || '') + '</span>' +
        '<span><span class="d-block fw-semibold">' + esc(t.label) + '</span><span class="d-block small" lang="vi">' + esc(t.vi) + '</span>' +
        '<span class="d-block small text-soft">' + count + '</span></span></button></li>';
    }).join('');
  }

  /* ---------- intro: the ring grows out of the centre ---------- */
  function intro() {
    if (reduce()) { state.grow = 1; render(); return; }
    var gsap = window.gsap;
    state.grow = 0;
    render();
    gsap.fromTo(centre, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
    tweens.grow = gsap.to(state, { grow: 1, duration: 0.9, ease: 'power3.out', delay: 0.15, onUpdate: render });
    gsap.fromTo(topicEls, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.04, delay: 0.2 });
  }

  function init() {
    topics = CC.topics || [];
    stage = document.getElementById('hub-stage');
    if (!stage || !topics.length) return;
    linkLayer = stage.querySelector('.hub-links');
    nodeLayer = stage.querySelector('.hub-nodes');
    panel = document.getElementById('hub-panel');
    centre = stage.querySelector('.hub-centre');
    centre.querySelector('.hub-centre-icon').innerHTML = CC.icons.compass;

    topics.forEach(function (t, i) {
      var b = topicButton(t, i);
      nodeLayer.appendChild(b);
      topicEls.push(b);
    });
    renderList();
    CC.bindAudio(panel);

    document.addEventListener('click', function (e) {
      var o = e.target.closest && e.target.closest('[data-hub-open]');
      if (o) {
        var t = CC.byId(topics, o.getAttribute('data-hub-open'));
        if (t) {
          if (o.closest('#hub-list')) stage.scrollIntoView({ block: 'start', behavior: reduce() ? 'auto' : 'smooth' });
          open(t);
        }
        return;
      }
      if (e.target.closest && e.target.closest('[data-hub-close]')) close();
    });
    /* clicking empty map closes the open topic */
    stage.addEventListener('click', function (e) {
      if (e.target === stage || e.target === nodeLayer || e.target.classList.contains('hub-bg')) close({ noFocus: true });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.open) close();
    });

    var lastWide = isWide();
    window.addEventListener('resize', function () {
      var w = isWide();
      if (w !== lastWide && state.open) { lastWide = w; open(state.open, { instant: true, keepFocus: true }); return; }
      lastWide = w;
      render();
    });
    document.addEventListener('cc:settings', function () { if (reduce()) { state.grow = 1; render(); } });

    var fromHash = CC.byId(topics, (location.hash || '').slice(1));
    if (fromHash) {
      state.grow = 1;
      open(fromHash, { instant: true, keepFocus: true });
    } else {
      intro();
    }
  }

  CC.hub = { init: init, open: function (id) { var t = CC.byId(topics, id); if (t) open(t); }, close: close };
})();
