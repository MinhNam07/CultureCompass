/* CultureCompass — the map of places (explore.html with no ?zone=). The game's own start screen:
   a pixel map of Hà Nội with a pin for each place, the moments of the selected place, and every place in a list.
   Choosing "Travel here" opens explore.html?zone=<id>, where explore-game.js takes over; with ?zone= this file does nothing.
   The selected place is kept in the hash (explore.html#pho-co), so the game's Map button and the Read page can point at one. */
(function () {
  'use strict';
  if (CC.qs('zone')) return;
  CC.exploreHub = true;

  var esc = CC.esc;
  var COUNTRY = 'vietnam';
  var DESTS = [
    { id: 'hanoi', name: 'Hà Nội', ready: true },
    { id: 'hoian', name: 'Hội An', ready: false, hook: 'The old town at dusk, lanterns, and a tailor’s shop.' },
    { id: 'danang', name: 'Đà Nẵng', ready: false, hook: 'Beach mornings and a seafood market.' }
  ];
  /* where each place sits on the map image (hanoi-map.png, 600×448), in %. Each point is on open ground
     next to the landmark (a doorstep, a street, a plaza) so the pin doesn't hide the building.
     side: which way the label opens (default: right, or left near the right edge). */
  var PINS = {
    'cho-dong-xuan': { x: 64.2, y: 14.5 },                 // on the roof of the main market hall
    'homestay': { x: 48.8, y: 52.0 },                     // doorstep of the tube house with the plants
    'pho-co': { x: 73.3, y: 84.4, side: 'right' },         // street in front of the old shophouse row by the lake
    'quan-an': { x: 49.2, y: 91.5 },                      // the street-food corner (stools and grill)
    'van-mieu': { x: 20.0, y: 96.9 }                      // on the open path, straight below the main gate
  };
  var dest = 'hanoi', picked = null, zones = [];

  /* ---------- progress, read from the game's own save ---------- */
  function saves() { return ((CC.store.get('explore', {}) || {}).zones) || {}; }
  function sceneKey(z, k) { return k.indexOf(':') === -1 ? (z.scenes ? z.scenes[0] : z.sceneId) + ':' + k : k; }
  function progress(z) {
    var s = saves()[z.id];
    var list = (z.objectives || []).map(function (o) {
      var st = s && s.steps && (s.steps[sceneKey(z, o.step)] || s.steps[o.step]);
      return { text: o.text, done: !!(st && st.choice) };
    });
    var k = list.filter(function (m) { return m.done; }).length;
    var done = !!(s && s.done) || (list.length > 0 && k === list.length);
    var started = !!s && (k > 0 || Object.keys(s.facts || {}).length > 0 || !!s.pos);
    return { moments: list, k: k, n: list.length, done: done, started: started, facts: s ? Object.keys(s.facts || {}).length : 0,
      status: done ? 'Stamped' : k ? k + ' of ' + list.length + ' moments' : started ? 'Started' : 'Not started',
      tone: done ? 'done' : started ? 'going' : 'new' };
  }

  /* ---------- the pixel map: a 600×448 pixel-art image of central Hà Nội, scaled up without smoothing.
     Geography is compressed but follows the real directions (West Lake NW, Đồng Xuân + Long Biên NE,
     Hoàn Kiếm right of centre, Văn Miếu SW, Red River E; railway from Long Biên west, then south). ---------- */
  var MAP_IMG = 'assets/img/explore/hanoi-map.png';

  function drawMap(canvas) {
    var W = 600, H = 448;   // the image's own pixels; CSS scales it up with image-rendering: pixelated
    canvas.width = W; canvas.height = H;
    var img = new Image();
    img.onload = function () {
      var c = canvas.getContext('2d');
      c.imageSmoothingEnabled = false;
      c.drawImage(img, 0, 0, W, H);
      canvas.classList.add('is-drawn');
    };
    img.src = MAP_IMG;
  }


  /* ---------- icons ---------- */
  var IC = {
    back: '<svg class="cc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    passport: '<svg class="cc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M9 17h6"/></svg>',
    book: '<svg class="cc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6.5v13"/></svg>',
    stamp: '<svg class="cc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5" stroke-dasharray="2 2.4"/></svg>',
    check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>'
  };

  /* a first visit: nothing started anywhere, so the first place is offered as "Start here" */
  function isFresh() { return !zones.some(function (z) { return progress(z).started || progress(z).done; }); }
  function travel(id) { location.href = 'explore.html?zone=' + encodeURIComponent(id); }
  var PLAY = '<svg class="cc-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="currentColor"/></svg>';

  /* ---------- render ---------- */
  function readHref(z) {
    var sc = CC.byId(CC.scenarios || [], z.scenes ? z.scenes[0] : z.sceneId);
    var st = sc && (sc.storyIds || []).map(function (id) { return CC.byId(CC.stories || [], id); }).filter(Boolean)[0];
    return st ? 'story.html?id=' + encodeURIComponent(st.id) + '&from=overview' : 'vietnam.html#places';
  }

  function shell() {
    return '<div class="gxs-win">' +
      '<div class="gxs-bar">' +
        '<a class="gxs-btn" href="index.html">' + IC.back + '<span>Globe</span></a>' +
        '<div class="gxs-dests" role="group" aria-label="Destination">' + DESTS.map(function (d) {
          return '<button type="button" class="gxs-dest" data-dest="' + d.id + '" aria-pressed="false">' + esc(d.name) + (d.ready ? '' : '<small> · soon</small>') + '</button>';
        }).join('') + '</div>' +
        '<div class="gxs-bar-end">' +
          '<a class="gxs-btn" href="vietnam.html">' + IC.book + '<span>Read</span></a>' +
          '<a class="gxs-btn" href="collection.html">' + IC.passport + '<span>Passport</span></a>' +
        '</div>' +
      '</div>' +
      '<div class="gxs-body">' +
        '<div class="gxs-map" id="gxs-map"></div>' +
        '<aside class="gxs-side" id="gxs-side" aria-live="polite"></aside>' +
      '</div>' +
      '<div class="gxs-foot" id="gxs-foot"></div>' +
    '</div>';
  }

  function mapHtml() {
    if (dest !== 'hanoi') {
      var d = CC.byId(DESTS, dest);
      return '<div class="gxs-soon"><div class="gxs-soon-frame"><p class="gxs-soon-k">Under construction</p><p>' + esc(d.name) + ' is being drawn. Hà Nội is ready to play now.</p>' +
        '<button type="button" class="gxs-cta" data-dest="hanoi">Back to Hà Nội</button></div></div>';
    }
    var fresh = isFresh();
    return '<canvas class="gxs-canvas" id="gxs-canvas" role="img" aria-label="Pixel map of central Hà Nội: West Lake, the Red River, the Old Quarter, Hoàn Kiếm Lake and Văn Miếu"></canvas>' +
      '<span class="gxs-compass" aria-hidden="true"><i></i></span>' +
      '<p class="gxs-map-label" aria-hidden="true">Hà Nội</p>' +
      zones.map(function (z) {
        var p = PINS[z.id] || { x: 50, y: 50 }, pr = progress(z), start = fresh && z.id === zones[0].id;
        return '<button type="button" class="gxs-pin is-' + pr.tone + (z.id === picked ? ' is-on' : '') + ((p.side ? p.side === 'left' : p.x > 72) ? ' is-left' : '') + '" data-zone="' + esc(z.id) + '" style="left:' + p.x + '%;top:' + p.y + '%" aria-pressed="' + (z.id === picked) + '" aria-label="' + esc(z.title) + ', ' + pr.status + '">' +
          '<span class="gxs-dot" aria-hidden="true"></span><span class="gxs-pin-label" aria-hidden="true">' + (start ? '<b class="gxs-pin-start">Start here</b> ' : '') + esc(z.stamp || z.title) + '</span></button>';
      }).join('');
  }

  function sideHtml() {
    if (dest !== 'hanoi') {
      var d = CC.byId(DESTS, dest);
      return '<div class="gxs-detail"><h2 class="gxs-name">' + esc(d.name) + '</h2><p class="gxs-meta">Coming later</p><p class="gxs-hook">' + esc(d.hook) + '</p></div>';
    }
    var z = CC.byId(zones, picked), pr = progress(z);
    var cta = pr.done ? 'Play again' : pr.started ? 'Continue' : isFresh() && z.id === zones[0].id ? 'Start here: ' + (z.stamp || z.title) : 'Travel here';
    return '<div class="gxs-detail">' +
        '<div class="gxs-detail-head"><div><h2 class="gxs-name">' + esc(z.title) + '</h2>' +
          '<p class="gxs-meta">About ' + z.minutes + ' min · ' + pr.n + ' moments</p></div>' +
          '<span class="gxs-badge is-' + pr.tone + '">' + pr.status + '</span></div>' +
        '<p class="gxs-hook">' + esc(firstSentence(z.intro)) + '</p>' +
        '<p class="gxs-k" id="gxs-moments-k">Moments</p>' +
        '<ul class="gxs-moments" aria-labelledby="gxs-moments-k">' + pr.moments.map(function (m) {
          return '<li class="' + (m.done ? 'is-done' : '') + '"><span class="gxs-box" aria-hidden="true">' + (m.done ? IC.check : '') + '</span><span>' + esc(m.text) + '<span class="visually-hidden">' + (m.done ? ', done' : '') + '</span></span></li>';
        }).join('') + '</ul>' +
        '<p class="gxs-stamp">' + IC.stamp + (pr.done ? 'Passport stamp collected' : 'Stamp after every moment (' + pr.k + ' of ' + pr.n + ')') + '</p>' +
        '<div class="gxs-actions">' +
          '<a class="gxs-cta gxs-cta-go" href="explore.html?zone=' + encodeURIComponent(z.id) + '">' + PLAY + esc(cta) + '</a>' +
          '<a class="gxs-btn" href="' + readHref(z) + '">Read about it</a>' +
          (pr.started ? '<button type="button" class="gxs-link" data-restart="' + esc(z.id) + '">Start over</button>' : '') +
        '</div>' +
      '</div>' +
      '<div class="gxs-list"><p class="gxs-k" id="gxs-all-k">All places</p><ul aria-labelledby="gxs-all-k">' + zones.map(function (o) {
        var p = progress(o);
        return '<li><button type="button" class="gxs-row' + (o.id === picked ? ' is-on' : '') + '" data-zone="' + esc(o.id) + '" aria-pressed="' + (o.id === picked) + '">' +
          '<span>' + esc(o.title) + '</span><span class="gxs-row-st is-' + p.tone + '">' + p.status + '</span></button></li>';
      }).join('') + '</ul></div>';
  }

  function footHtml() {
    var all = zones.map(progress);
    var stamps = all.filter(function (p) { return p.done; }).length;
    var facts = all.reduce(function (n, p) { return n + p.facts; }, 0);
    var kept = CC.collection ? CC.collection.list().length : 0;
    return '<span class="gxs-k">Journey</span>' +
      '<span class="gxs-segs" aria-hidden="true">' + all.map(function (p) { return '<i class="is-' + p.tone + '"></i>'; }).join('') + '</span>' +
      '<span>' + stamps + ' of ' + zones.length + ' places stamped</span>' +
      '<span>' + CC.plural(facts, 'fact') + ' found</span>' +
      '<span>' + kept + ' kept in your passport</span>' +
      '<span class="gxs-keys">Click a pin to choose it, click it again to travel</span>';
  }

  function firstSentence(t) { var m = String(t || '').match(/^.*?[.!?](\s|$)/); return m ? m[0].trim() : t; }

  function paint(focusSel) {
    var map = CC.$('gxs-map');
    map.innerHTML = mapHtml();
    map.classList.toggle('is-soon', dest !== 'hanoi');
    if (dest === 'hanoi') drawMap(CC.$('gxs-canvas'));
    CC.$('gxs-side').innerHTML = sideHtml();
    CC.$('gxs-foot').innerHTML = footHtml();
    [].forEach.call(document.querySelectorAll('.gxs-dest'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-dest') === dest ? 'true' : 'false'); });
    if (focusSel) { var f = document.querySelector(focusSel); if (f) f.focus({ preventScroll: true }); }
  }

  function pick(id, from) {
    if (!CC.byId(zones, id)) return;
    picked = id; dest = 'hanoi';
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// in some browsers */ }
    paint(from === 'pin' ? '.gxs-pin[data-zone="' + id + '"]' : from === 'row' ? '.gxs-row[data-zone="' + id + '"]' : null);
  }

  function firstPick() {
    var h = decodeURIComponent((location.hash || '').slice(1));
    if (CC.byId(zones, h)) return h;
    var going = zones.filter(function (z) { var p = progress(z); return p.started && !p.done; })[0];
    var fresh = zones.filter(function (z) { return !progress(z).done; })[0];
    return (going || fresh || zones[0]).id;
  }

  function init() {
    CC.renderShell({ section: 'destinations', country: COUNTRY, sub: 'practice' });
    document.title = 'Play Vietnam — CultureCompass';
    zones = (CC.exploreZones || []).filter(function (z) { return z.country === COUNTRY; });
    CC.$('gx-game').hidden = true;
    ['gx-how', 'gx-read-alt'].forEach(function (id) { var el = CC.$(id); if (el) el.hidden = true; });
    var hub = CC.$('gx-hub');
    hub.hidden = false;
    if (!zones.length) { hub.innerHTML = '<p class="gx-empty">No places are ready yet.</p>'; return; }
    hub.innerHTML = shell();
    picked = firstPick();
    paint();

    hub.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t) return;
      /* choosing the place that is already chosen (a second click, a double click, Enter again) travels there */
      if (t.dataset.zone && t.dataset.zone === picked && t.classList.contains('gxs-pin')) travel(picked);
      else if (t.dataset.zone) pick(t.dataset.zone, t.classList.contains('gxs-pin') ? 'pin' : 'row');
      else if (t.dataset.dest) { dest = t.dataset.dest; paint('.gxs-dest[data-dest="' + dest + '"]'); }
      else if (t.dataset.restart) {
        var z = CC.byId(zones, t.dataset.restart);
        if (!window.confirm('Start ' + z.title + ' again from the beginning? Your moments and facts in this place will be cleared.')) return;
        var all = CC.store.get('explore', {}) || {};
        if (all.zones) delete all.zones[z.id];
        CC.store.set('explore', all);
        paint('.gxs-cta');
      }
    });
    window.addEventListener('hashchange', function () { var h = decodeURIComponent(location.hash.slice(1)); if (CC.byId(zones, h) && h !== picked) pick(h); });
    document.addEventListener('cc:cleared', function () { paint(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
