/* CultureCompass — Explore hub (explore.html with no ?zone=).
   A map of Vietnam drawn from Natural Earth (Vietnam point of view, with Hoàng Sa and Trường Sa), the places you
   can walk in Hà Nội with your progress in each, and the cities that are coming later.
   explore-game.js does nothing on this view; with ?zone=… this file does nothing. */
(function () {
  'use strict';
  if (CC.qs('zone')) return;
  CC.exploreHub = true;

  var esc = CC.esc;
  var M = CC.vnMap;
  function xy(lon, lat) { return [(lon - M.lon0) * M.k * M.c, (M.lat1 - lat) * M.k]; }

  /* cities on the map: only Hà Nội has places today */
  var CITIES = [
    { id: 'hanoi', name: 'Hà Nội', lon: 105.85, lat: 21.03, ready: true, dx: -12, anchor: 'end' },
    { id: 'danang', name: 'Đà Nẵng', lon: 108.21, lat: 16.06, ready: false, dx: 12, anchor: 'start', dy: -9 },
    { id: 'hoian', name: 'Hội An', lon: 108.33, lat: 15.88, ready: false, dx: 12, anchor: 'start', dy: 14 }
  ];

  function zoneProgress(z) {
    var all = CC.store.get('explore', {}) || {};
    var s = (all.zones || {})[z.id];
    var n = (z.objectives || []).length;
    if (!s) return { k: 0, n: n, done: false, facts: 0 };
    var k = (z.objectives || []).filter(function (o) { var st = s.steps && s.steps[o.step]; return st && st.choice; }).length;
    return { k: k, n: n, done: !!s.done || (n && k >= n), facts: Object.keys(s.facts || {}).length };
  }

  function mapSvg() {
    var hn = xy(105.85, 21.03);
    var labels = [
      { t: 'Quần đảo Hoàng Sa', s: 'Hoàng Sa archipelago', lon: 112.0, lat: 17.45 },
      { t: 'Quần đảo Trường Sa', s: 'Trường Sa archipelago', lon: 114.75, lat: 11.75 },
      { t: 'Biển Đông', s: 'East Sea', lon: 112.6, lat: 14.1, sea: true },
      { t: 'Vịnh Bắc Bộ', s: 'Gulf of Tonkin', lon: 107.75, lat: 19.75, sea: true, small: true }
    ];
    var lands = [
      { t: 'China', lon: 104.2, lat: 23.6 }, { t: 'Laos', lon: 102.6, lat: 19.6 }, { t: 'Thailand', lon: 101.0, lat: 15.6 },
      { t: 'Cambodia', lon: 104.6, lat: 12.9 }
    ];
    return '<svg class="gxh-map" viewBox="0 0 ' + M.w + ' ' + M.h + '" role="img" aria-labelledby="gxh-map-title gxh-map-desc">' +
      '<title id="gxh-map-title">Map of Vietnam</title>' +
      '<desc id="gxh-map-desc">Vietnam with the Hoàng Sa and Trường Sa archipelagos. Hà Nội, in the north, has five places to explore. Đà Nẵng and Hội An, in the centre, are coming later.</desc>' +
      '<rect class="gxh-sea" width="' + M.w + '" height="' + M.h + '"/>' +
      M.neighbours.map(function (n) { return '<path class="gxh-nb" d="' + n.d + '"/>'; }).join('') +
      '<path class="gxh-vn" d="' + M.vn + '"/>' +
      M.islets.map(function (p) { return '<circle class="gxh-islet" cx="' + p[0] + '" cy="' + p[1] + '" r="2.2"/>'; }).join('') +
      lands.map(function (l) { var p = xy(l.lon, l.lat); return '<text class="gxh-land" x="' + p[0].toFixed(0) + '" y="' + p[1].toFixed(0) + '" text-anchor="middle">' + l.t + '</text>'; }).join('') +
      labels.map(function (l) {
        var p = xy(l.lon, l.lat);
        return '<text class="' + (l.sea ? 'gxh-sea-label' : 'gxh-isl-label') + (l.small ? ' is-small' : '') + '" x="' + p[0].toFixed(0) + '" y="' + p[1].toFixed(0) + '" text-anchor="middle">' +
          '<tspan x="' + p[0].toFixed(0) + '">' + l.t + '</tspan><tspan class="gxh-sub" x="' + p[0].toFixed(0) + '" dy="1.25em">' + l.s + '</tspan></text>';
      }).join('') +
      CITIES.map(function (c) {
        var p = xy(c.lon, c.lat), x = p[0].toFixed(1), y = p[1].toFixed(1);
        var dot = '<circle class="gxh-pin-halo" cx="' + x + '" cy="' + y + '" r="' + (c.ready ? 15 : 0) + '"/>' +
          '<circle class="gxh-pin" cx="' + x + '" cy="' + y + '" r="' + (c.ready ? 8 : 6) + '"/>' +
          '<text class="gxh-city" x="' + (p[0] + c.dx).toFixed(0) + '" y="' + (p[1] + 5 + (c.dy || 0)).toFixed(0) + '" text-anchor="' + c.anchor + '">' + c.name + (c.ready ? '' : ' · soon') + '</text>';
        return c.ready
          ? '<a class="gxh-city-link is-ready" href="#gxh-hanoi" aria-label="Hà Nội: 5 places to explore">' + dot + '</a>'
          : '<g class="gxh-city-link is-soon" aria-hidden="true">' + dot + '</g>';
      }).join('') +
    '</svg>';
  }

  function zoneCard(z) {
    var pr = zoneProgress(z);
    var status = pr.done ? 'Explored · stamp collected' : pr.k ? pr.k + ' of ' + pr.n + ' moments' : 'Not started';
    var cta = pr.done ? 'Walk around again' : pr.k || pr.facts ? 'Continue' : 'Start';
    return '<li class="gxh-zone' + (pr.done ? ' is-done' : '') + '">' +
      '<a href="explore.html?zone=' + esc(z.id) + '">' +
        '<span class="gxh-stamp" aria-hidden="true">' + esc(z.stamp || z.title) + '</span>' +
        '<span class="gxh-zone-txt"><b>' + esc(z.title) + '</b>' +
          '<span class="cc-meta">About ' + z.minutes + ' min · ' + pr.n + ' moments · <span class="gxh-status">' + status + '</span></span>' +
          '<span class="gxh-intro">' + esc(firstSentence(z.intro)) + '</span></span>' +
        '<span class="gxh-go">' + cta + '<span class="visually-hidden">: ' + esc(z.title) + '</span>' + CC.arrow() + '</span>' +
      '</a></li>';
  }
  function firstSentence(t) { var m = String(t || '').match(/^.*?[.!?](\s|$)/); return m ? m[0].trim() : t; }

  function render() {
    var zones = (CC.exploreZones || []).filter(function (z) { return z.country === 'vietnam'; });
    var done = zones.filter(function (z) { return zoneProgress(z).done; }).length;
    document.title = 'Explore Vietnam — CultureCompass';
    CC.$('gx-title').textContent = 'Explore Vietnam';
    var crumb = CC.$('gx-crumb'); crumb.textContent = 'Explore';
    var prev = crumb.parentNode.previousElementSibling; if (prev) prev.parentNode.removeChild(prev);
    CC.$('gx-game').hidden = true;
    var hub = CC.$('gx-hub');
    hub.hidden = false;
    hub.innerHTML =
      '<p class="gxh-lede">Walk around real places in a small pixel-art game. Talk to people, look at what is there, and choose what to do in everyday moments. If a choice doesn’t fit, you see what happens and try again. No score.</p>' +
      '<div class="gxh-grid">' +
        '<figure class="gxh-map-wrap">' + mapSvg() +
          '<figcaption class="cc-meta">Map data: <a href="https://www.naturalearthdata.com/" rel="noopener">Natural Earth</a> (public domain), Vietnam point of view; simplified. Not to scale for navigation.</figcaption></figure>' +
        '<div class="gxh-list">' +
          '<section id="gxh-hanoi" tabindex="-1" aria-labelledby="gxh-hn-title">' +
            '<h2 id="gxh-hn-title">Hà Nội <span class="cc-meta">' + zones.length + ' places · ' + done + ' explored</span></h2>' +
            '<ol class="gxh-zones">' + zones.map(zoneCard).join('') + '</ol>' +
          '</section>' +
          '<section class="gxh-soon" aria-labelledby="gxh-soon-title">' +
            '<h2 id="gxh-soon-title">Coming later</h2>' +
            '<ul><li><b>Đà Nẵng</b><span class="cc-meta">Beach mornings, a seafood market</span></li>' +
                '<li><b>Hội An</b><span class="cc-meta">The old town, lanterns, a tailor’s shop</span></li></ul>' +
          '</section>' +
        '</div>' +
      '</div>';
    var link = hub.querySelector('.gxh-city-link.is-ready');
    if (link) link.addEventListener('click', function (e) {
      e.preventDefault();
      var t = CC.$('gxh-hanoi'); t.scrollIntoView({ behavior: CC.motion.reduce() ? 'auto' : 'smooth', block: 'start' }); t.focus({ preventScroll: true });
    });
  }

  function init() {
    CC.renderShell({ section: 'destinations', country: 'vietnam', sub: 'practice' });
    if (!M) { CC.$('gx-hub').innerHTML = '<p>The map could not load.</p>'; return; }
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
