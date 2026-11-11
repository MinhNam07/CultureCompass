/* CultureCompass — shared pieces of the editorial system (body.ex pages; never the home page).
   - CC.ex.MOTIF: our own SVG motifs (horizon, wave band, half rings, ribbon, bronze-drum sun ring), coloured from CSS.
     Inner pages use only the horizon in their frame; the band and rings stay on vietnam.html's own modules.
   - CC.ex.chapterFor(): the chapter colour for a theme or scene (teal, peach, jade, ember).
   - CC.ex.decorate(): turns a page head into a chapter band with the wave foot.
   - Ink ripple on pills and buttons.
   Plain script, loaded after core.js and before the page script. */
(function () {
  'use strict';
  var CC = window.CC;
  if (!CC) return;

  var MOTIF = {
    /* four parallel wavy ribbons running the full width; colours come from CSS (--m1..--m4) */
    band: function (cls) {
      var d = 'M-20 40 C 120 0, 240 0, 380 40 S 640 80, 780 40 S 1040 0, 1220 40';
      /* the ground below the stripes follows the wave (colour from --band-below; transparent unless a page sets it) */
      return '<svg class="ex-band' + (cls ? ' ' + cls : '') + '" viewBox="0 -6 1200 136" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
        '<path class="ex-band-fill" d="' + d + ' L1220 400 L-20 400 Z" transform="translate(0 21)"/>' +
        [0, 1, 2, 3].map(function (i) { return '<path class="m' + (i + 1) + '" vector-effect="non-scaling-stroke" d="' + d + '" transform="translate(0 ' + (i * 14) + ')"/>'; }).join('') + '</svg>';
    },
    /* concentric half rings sitting on a baseline, like a retro rainbow */
    arcs: function (cls) {
      var out = '';
      for (var i = 0; i < 5; i++) {
        var r = 150 - i * 26;
        out += '<path class="m' + ((i % 4) + 1) + '" d="M' + (160 - r) + ' 160 A ' + r + ' ' + r + ' 0 0 1 ' + (160 + r) + ' 160"/>';
      }
      return '<svg class="ex-arcs' + (cls ? ' ' + cls : '') + '" viewBox="0 0 320 162" aria-hidden="true" focusable="false">' + out + '</svg>';
    },
    /* the horizon where the night frame meets the paper: one long, low wave, ground cut along it,
       a chapter-coloured rim on the edge and two fading inlay lines on the night side (the stripes, in one colour).
       side 'down' = night above, paper below (page head); 'up' = paper above, night below (footer). */
    horizon: function (side) {
      var d = 'M0 44 C 240 70, 480 70, 720 44 S 1200 18, 1440 44';
      var inlay = side === 'up' ? 8 : -8;
      return '<svg class="ex-horizon ex-horizon-' + (side || 'down') + '" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
        '<path class="ex-horizon-ground" d="' + d + ' L1440 96 L0 96 Z"/>' +
        '<path class="ex-horizon-inlay2" vector-effect="non-scaling-stroke" d="' + d + '" transform="translate(0 ' + inlay * 2 + ')"/>' +
        '<path class="ex-horizon-inlay" vector-effect="non-scaling-stroke" d="' + d + '" transform="translate(0 ' + inlay + ')"/>' +
        '<path class="ex-horizon-rim" vector-effect="non-scaling-stroke" d="' + d + '"/></svg>';
    },
    /* one wavy ribbon crossing a picture, drawn in the chapter colour */
    ribbon: function () {
      return '<svg class="ex-ribbon" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
        '<path pathLength="1" d="M-10 52 C 40 10, 90 10, 140 42 S 240 78, 310 30"/></svg>';
    },
    /* a sun ring with fourteen rays, after the bronze-drum face */
    drum: function (cls) {
      var rays = '';
      for (var i = 0; i < 14; i++) {
        var a = (i / 14) * Math.PI * 2;
        var x1 = 100 + 18 * Math.cos(a - .12), y1 = 100 + 18 * Math.sin(a - .12);
        var x2 = 100 + 18 * Math.cos(a + .12), y2 = 100 + 18 * Math.sin(a + .12);
        var xt = 100 + 46 * Math.cos(a), yt = 100 + 46 * Math.sin(a);
        rays += '<path d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'L' + xt.toFixed(1) + ' ' + yt.toFixed(1) + 'L' + x2.toFixed(1) + ' ' + y2.toFixed(1) + 'z"/>';
      }
      return '<svg class="ex-drum' + (cls ? ' ' + cls : '') + '" viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
        '<circle cx="100" cy="100" r="16"/>' + rays +
        [56, 66, 80, 92].map(function (r, k) { return '<circle class="ring" cx="100" cy="100" r="' + r + '"' + (k === 2 ? ' stroke-dasharray="2 6"' : '') + '/>'; }).join('') + '</svg>';
    }
  };

  /* the chapter colour of a theme, as on vietnam.html: everyday = teal (cyan at night), food = peach (gold),
     beliefs and history = jade. A theme without its own chapter borrows the nearest one. */
  var THEME_BG = { people: 'teal', language: 'teal', food: 'peach', beliefs: 'jade', arts: 'jade', history: 'jade' };
  var PAGE_BG = { phrases: 'teal', collection: 'peach', about: 'jade' };

  function chapterFor(topicId) { return THEME_BG[topicId] || 'teal'; }
  function chapterForScene(sceneId) {
    var t = (CC.topics || []).filter(function (x) { return (x.sceneIds || []).indexOf(sceneId) !== -1; })[0];
    return t ? chapterFor(t.id) : 'teal';
  }
  function heroFoot() {
    return '<div class="ex-page-foot" aria-hidden="true">' + MOTIF.horizon('down') + '</div>';
  }
  function decorate(el, bg) {
    if (!el) return;
    el.classList.add('ex-page-hero');
    el.setAttribute('data-bg', bg || 'teal');
    if (!el.querySelector(':scope > .ex-page-foot')) el.insertAdjacentHTML('beforeend', heroFoot());
  }

  /* The reading page's chapters (vietnam.html, explore.js CHAPTERS + SECTIONS) and their stories in the order the
     page shows them. story.js uses it for the breadcrumb, Back, previous/next and the chapter colour, so a story
     always belongs to the chapter you read it in. explore.js warns in the console if the page drifts from it. */
  var READING = {
    vietnam: [
      { anchor: 'everyday', name: 'Everyday life', tone: 'teal', stories: ['st-arrive-home', 'st-hand', 'st-photo-ask', 'st-keep-cool', 'st-family-words', 'st-market', 'st-old-quarter', 'st-pavement', 'st-hoan-kiem-days'] },
      { anchor: 'food', name: 'Food & the table', tone: 'peach', stories: ['st-shared-table', 'st-host', 'st-chop', 'st-pho', 'st-bun-cha', 'st-egg-coffee', 'st-street-stall'] },
      { anchor: 'beliefs', name: 'Temples, beliefs & history', tone: 'jade', stories: ['st-thang-long', 'st-van-mieu-university', 'st-sword-lake', 'st-stelae', 'st-temple-visit', 'st-sacred-places', 'st-family-altar', 'st-paper-offerings', 'st-tet', 'st-mother-goddess'] }
    ]
  };
  function readingChapter(storyId, anchor, country) {
    var list = READING[country || 'vietnam'] || [];
    var byAnchor = list.filter(function (c) { return c.anchor === anchor && c.stories.indexOf(storyId) !== -1; })[0];
    return byAnchor || list.filter(function (c) { return c.stories.indexOf(storyId) !== -1; })[0] || null;
  }

  CC.ex = { MOTIF: MOTIF, reading: READING, readingChapter: readingChapter, chapterFor: chapterFor, chapterForScene: chapterForScene, heroFoot: heroFoot, decorate: decorate };

  /* ink ripple: pills, chips and Listen buttons. Not on .cc-btn, which already presses down: one press, one response */
  document.addEventListener('pointerdown', function (e) {
    if (!document.body.classList.contains('ex')) return;
    var el = e.target.closest && e.target.closest('.ex-ripple, .cc-listen');
    if (!el || CC.motion.reduce()) return;
    var r = el.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var dot = document.createElement('span');
    dot.className = 'ex-ink';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - r.left - size / 2) + 'px;top:' + (e.clientY - r.top - size / 2) + 'px';
    el.appendChild(dot);
    dot.addEventListener('animationend', function () { dot.remove(); });
  });

  /* reading progress on the story, passport and about pages: a 3px line under the header, in the page's colour.
     On a story it measures the article only (not the related stories or the footer); elsewhere, the page.
     It follows the scroll, so it stays under reduced motion, and it hides when there is less than a screen to read.
     Replaces the React "tracing beam" (a 359 KB bundle for the same line). */
  function readProgress() {
    var page = document.body.getAttribute('data-page');
    if (['story', 'about', 'collection'].indexOf(page) === -1) return;
    var bar = document.createElement('div');
    bar.className = 'cc-read-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<i></i>';
    document.body.appendChild(bar);
    var fill = bar.firstChild, raf = 0, top = 0, span = 1;
    var target = function () { return page === 'story' ? document.querySelector('.story-body') : document.getElementById('main'); };
    var measure = function () {
      var el = target(); if (!el) { bar.hidden = true; return; }
      var r = el.getBoundingClientRect(), head = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
      top = r.top + scrollY - head; span = Math.max(1, r.height - (innerHeight - head));
      bar.hidden = r.height < innerHeight * .9;
      draw();
    };
    var draw = function () { raf = 0; fill.style.transform = 'scaleX(' + Math.max(0, Math.min(1, (scrollY - top) / span)).toFixed(4) + ')'; };
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
    addEventListener('resize', measure);
    addEventListener('load', measure);
    document.addEventListener('cc:rendered', measure);
    setTimeout(measure, 0);
  }

  /* static page heads become chapter bands before the page script fills them */
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('ex')) return;
    var page = document.body.getAttribute('data-page');
    if (PAGE_BG[page]) decorate(document.querySelector('.page-head'), PAGE_BG[page]);
    if (page === 'scene') decorate(document.querySelector('.scene-head'), chapterForScene(CC.qs('id')));
    readProgress();
    /* the paper returns to night above the footer (a sibling, so the footer's own render cannot remove it) */
    var foot = document.getElementById('cc-footer');
    if (foot && !document.querySelector('.ex-foot-join')) foot.insertAdjacentHTML('beforebegin', '<div class="ex-foot-join" aria-hidden="true">' + MOTIF.horizon('up') + '</div>');
  });

  /* ---------- page transitions (cross-document View Transitions; night.css opts the pages in) ----------
     Opening a story from vietnam.html, the picture you pressed grows into the story's opening photograph, and
     Back shrinks it into its card again. Only the picture morphs (a title would smear between 22px and 76px);
     everything else cross-fades. It runs only where the browser supports it and only over http(s): from file://
     or in an older browser the page simply loads. Reduced motion (the OS or the site setting) skips it. */
  var HERO = 'story-hero';
  function storyPhoto(id) {
    var st = CC.byId(CC.stories, id), a = st && st.imageId ? CC.byId(CC.assets, st.imageId) : null;
    return a && a.file && a.kind === 'image' ? a.file : null;
  }
  function storyIdOf(url) { var m = /story\.html\?(?:[^#]*&)?id=([\w-]+)/.exec(url || ''); return m ? m[1] : null; }
  function samePicture(img, file) {
    if (!img || !file || /scale\(/.test(img.getAttribute('style') || '')) return false;   // a zoomed detail is not the same picture
    try { return new URL(img.currentSrc || img.src, location.href).pathname.replace(/^\//, '') === new URL(file, location.href).pathname.replace(/^\//, ''); } catch (e) { return false; }
  }
  function onScreen(el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; }
  function clearHero() { Array.prototype.forEach.call(document.querySelectorAll('[data-vt-hero]'), function (el) { el.style.viewTransitionName = ''; el.removeAttribute('data-vt-hero'); }); }
  function name(el) { if (!el) return; clearHero(); el.style.viewTransitionName = HERO; el.setAttribute('data-vt-hero', ''); }
  /* the card's picture for a story on this page, if it shows the story's own photograph and is on screen */
  function cardPicture(id, link) {
    var file = storyPhoto(id); if (!file) return null;
    var links = link ? [link] : Array.prototype.slice.call(document.querySelectorAll('a[href*="id=' + id + '"]'));
    for (var i = 0; i < links.length; i++) {
      var img = links[i].querySelector('img');
      if (samePicture(img, file) && onScreen(img)) return img;
    }
    return null;
  }
  var pressed = null;
  document.addEventListener('click', function (e) { pressed = e.target.closest && e.target.closest('a[href]'); }, true);

  window.addEventListener('pageswap', function (e) {
    if (!e.viewTransition) return;
    if (CC.motion.reduce()) { e.viewTransition.skipTransition(); return; }
    var to = e.activation && e.activation.entry ? e.activation.entry.url : '';
    var page = document.body.getAttribute('data-page');
    if (page === 'vietnam' && storyIdOf(to)) name(cardPicture(storyIdOf(to), pressed && pressed.closest('a')));
    else if (page === 'story' && /vietnam\.html/.test(to)) name(document.querySelector('.story-head-media img'));
  });
  window.addEventListener('pagereveal', function (e) {
    clearHero();
    if (!e.viewTransition) return;
    if (CC.motion.reduce()) { e.viewTransition.skipTransition(); return; }
    document.documentElement.classList.add('vt-arrived');   // the transition is the entrance: the story head does not also rise
    var nav = window.navigation, from = nav && nav.activation && nav.activation.from ? nav.activation.from.url : "";
    var page = document.body.getAttribute('data-page');
    if (page === 'story' && /vietnam\.html/.test(from)) name(document.querySelector('.story-head-media img'));
    else if (page === 'vietnam' && storyIdOf(from)) name(cardPicture(storyIdOf(from)));
    e.viewTransition.finished.then(clearHero, clearHero);
  });
})();
