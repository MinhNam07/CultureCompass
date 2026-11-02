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

  /* four chapter colours only; a theme without its own chapter borrows the nearest one */
  var THEME_BG = { people: 'teal', language: 'teal', food: 'peach', beliefs: 'jade', arts: 'jade', history: 'ember' };
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

  CC.ex = { MOTIF: MOTIF, chapterFor: chapterFor, chapterForScene: chapterForScene, heroFoot: heroFoot, decorate: decorate };

  /* ink ripple: pills, chips, icon buttons and the site's buttons */
  document.addEventListener('pointerdown', function (e) {
    if (!document.body.classList.contains('ex')) return;
    var el = e.target.closest && e.target.closest('.ex-ripple, .cc-btn, .cc-listen');
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

  /* static page heads become chapter bands before the page script fills them */
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('ex')) return;
    var page = document.body.getAttribute('data-page');
    if (PAGE_BG[page]) decorate(document.querySelector('.page-head'), PAGE_BG[page]);
    if (page === 'scene') decorate(document.querySelector('.scene-head'), chapterForScene(CC.qs('id')));
    /* the paper returns to night above the footer (a sibling, so the footer's own render cannot remove it) */
    var foot = document.getElementById('cc-footer');
    if (foot && !document.querySelector('.ex-foot-join')) foot.insertAdjacentHTML('beforebegin', '<div class="ex-foot-join" aria-hidden="true">' + MOTIF.horizon('up') + '</div>');
  });
})();
