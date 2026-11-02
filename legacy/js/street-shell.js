/* CultureCompass — shared parts of the "Shopfront street" pages: the signboard footer mark and photo credits. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;

  /* the name built as a row of signboards; letters come from data-l so the row reads as one image */
  function footMark(el) {
    if (!el) return;
    var heights = [100, 78, 92, 64, 86, 100, 70, 96, 82, 60, 100, 74, 90, 84];
    el.innerHTML = 'CultureCompass'.split('').map(function (ch, k) {
      return '<span style="height:' + heights[k % heights.length] + '%" data-l="' + ch + '"></span>';
    }).join('');
  }

  /* credit line for the pictures on this page, read from assets.json */
  function credits(el, ids, extra) {
    if (!el) return;
    var parts = ids.map(function (id) { return CC.byId(CC.assets, id); }).filter(Boolean).map(function (a) {
      return esc(a.credit) + ', <a href="' + esc(a.licenseUrl) + '" target="_blank" rel="noopener">' + esc(a.license) +
        '<span class="visually-hidden"> (opens in new tab)</span></a>';
    });
    el.innerHTML = 'On this page: ' + parts.join('; ') + '. ' + (extra || '') + 'Full credits on the <a href="about.html">About page</a>.';
  }

  /* recolour the old cream walls in scene art to sign white, and hide its hotspots */
  function sceneArt(id) {
    var s = (CC.svgs && CC.svgs[id]) || '';
    return s.replace(/ id="[^"]*"/g, '').replace('role="img"', 'aria-hidden="true" focusable="false"').replace(/ aria-label="[^"]*"/, '')
      .replace(/#f4eadb|#efe3cf|#e6efe9/gi, '#f2f3f1');
  }

  /* a slatted shutter rolls up out of sight, like a shop opening */
  function rollShutter(el) {
    if (!el) return;
    if (CC.settings.reduce() || !el.animate) { el.style.transform = 'translateY(-100%)'; return; }
    el.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(0)', offset: 0.15 }, { transform: 'translateY(-100%)' }],
      { duration: 900, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    );
  }

  CC.street = { footMark: footMark, credits: credits, sceneArt: sceneArt, rollShutter: rollShutter };
})();
