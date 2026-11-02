/* CultureCompass — home page in the "Shopfront street" world.
   Everything that counts or lists content is read from the data files, so the page stays true when content changes.
   With Reduce motion / Text-first on, nothing moves by itself: the clip shows its poster, the marquee stands still,
   shutters open without rolling, and sections appear without travel. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;

  function reduce() { return CC.settings.reduce(); }
  function $(id) { return document.getElementById(id); }
  function scenes() { return (CC.scenarios || []).slice().sort(function (a, b) { return a.order - b.order; }); }
  function shortPlace(p) { return String(p || '').replace(/,\s*Hanoi$/i, ''); }
  function shortMeaning(m) { return String(m || '').replace(/\s*\(.*?\)\s*/g, ' ').trim(); }
  function svgFor(id) {
    var s = (CC.svgs && CC.svgs[id]) || '';
    /* scene art still carries the old cream walls; on this page they sit on sign white */
    return s.replace(/ id="[^"]*"/g, '').replace('role="img"', 'aria-hidden="true" focusable="false"').replace(/ aria-label="[^"]*"/, '')
      .replace(/#f4eadb|#efe3cf|#e6efe9/gi, '#f2f3f1');
  }
  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* ---------- the moving picture in the left rail ---------- */
  var clip = { choice: null, inView: true };
  function clipPlaying() { return clip.choice ? clip.choice === 'play' : !reduce(); }
  function syncClip() {
    var v = $('st-clip'), b = $('st-clip-btn');
    if (!v || !b) return;
    var on = clipPlaying();
    if (on && clip.inView) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
    /* the visible label names the action; no aria-pressed, so state and label never contradict */
    b.setAttribute('data-paused', on ? 'false' : 'true');
    b.querySelector('.st-clip-btn-text').textContent = on ? 'Pause video' : 'Play video';
  }
  function initClip() {
    var v = $('st-clip'), b = $('st-clip-btn');
    if (!v || !b) return;
    var a = CC.byId(CC.assets, 'vid-train-street');
    if (a && a.alt) v.setAttribute('aria-label', a.alt);
    b.addEventListener('click', function () { clip.choice = clipPlaying() ? 'pause' : 'play'; syncClip(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { clip.inView = e[0].isIntersecting; syncClip(); }, { threshold: 0.2 }).observe(v);
    }
    syncClip();
  }

  /* ---------- first screen: facts and the start tile ---------- */
  function initFront() {
    var list = scenes();
    var minutes = list.reduce(function (n, s) { return n + (s.minutes || 0); }, 0);
    var withAudio = (CC.phrases || []).filter(function (p) { var a = CC.byId(CC.assets, p.audioId); return a && a.file; }).length;
    var facts = $('st-facts');
    if (facts && list.length) {
      facts.innerHTML =
        '<li><strong>' + list.length + '</strong> everyday scenes in Hà&nbsp;Nội</li>' +
        '<li>About <strong>' + minutes + '</strong> minutes in all</li>' +
        '<li><strong>' + withAudio + '</strong> phrases with audio</li>' +
        '<li>Sources dated, open points labelled</li>' +
        '<li>No timer, no score</li>' +
        '<li>No sign-up, nothing tracked</li>';
    }
    var next = list.filter(function (s) { return CC.progress.get(s.id) !== 'done'; })[0] || list[0];
    if (next) {
      $('st-start').setAttribute('href', 'scene.html?id=' + next.id);
      $('st-start-sub').textContent = next.title + ' · ' + next.minutes + ' min';
      if (CC.progress.get(list[0].id) !== 'new') $('st-start-word').textContent = 'Continue';
    }
    var vn = CC.byId(CC.countries, 'vietnam');
    if (vn && $('st-where')) $('st-where').innerHTML = '<a href="' + esc(vn.href) + '">' + esc(vn.name) + '</a>, ' + esc(vn.start.replace(/^Starting/, 'starting')) + '.';
  }

  /* ---------- one photograph cut across a board of squares ---------- */
  function initMosaic() {
    var board = $('st-mosaic');
    if (!board) return;
    var head = board.querySelector('.st-m-head');
    var list = scenes();
    var colours = ['st-sign-yellow', 'st-sign-green', 'st-sign-white', 'st-sign-ink'];
    /* colour squares never touch side by side: index → content */
    var slots = { 4: 0, 8: 1, 13: 2, 17: 3, 22: 'act' };
    var html = '';
    /* the heading tile takes the first two squares */
    for (var i = 2; i < 24; i++) {
      var col = i % 6, row = Math.floor(i / 6);
      var pc = i % 3, pr = Math.floor(i / 3);
      var slot = slots[i];
      if (slot === 'act') {
        html += '<a class="st-m st-m-act st-sign-red" href="vietnam.html"><b>Open the compass</b><span>Vietnam: topics, scenes and phrases</span></a>';
      } else if (slot !== undefined && list[slot]) {
        var s = list[slot];
        html += '<div class="st-m st-m-fact ' + colours[slot % colours.length] + '"><b>' + esc(s.topic) + '</b><span>' + esc(shortPlace(s.place)) + '</span></div>';
      } else {
        html += '<div class="st-m st-m-photo" style="--c:' + col + ';--r:' + row + ';--pc:' + pc + ';--pr:' + pr + '"><span></span><i></i></div>';
      }
    }
    head.insertAdjacentHTML('afterend', html);
    openMosaic(board);
  }

  /* the one scroll moment: the photo squares open like a row of shutters, left to right */
  function openMosaic(board) {
    if (reduce() || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    var shutters = board.querySelectorAll('.st-m-photo > i');
    Array.prototype.forEach.call(shutters, function (el) { el.style.transform = 'translateY(0)'; });
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      Array.prototype.forEach.call(shutters, function (el) {
        var tile = el.parentNode;
        var c = +tile.style.getPropertyValue('--c'), r = +tile.style.getPropertyValue('--r');
        el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
          { duration: 700, delay: c * 90 + r * 45, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      });
    }, { threshold: 0.25 });
    io.observe(board);
  }

  /* ---------- where are you going: countries not yet open stay shuttered ---------- */
  function initCountries() {
    var wrap = $('st-countries-list');
    if (!wrap) return;
    var planned = (CC.countries || []).filter(function (c) { return c.status !== 'ready'; });
    var closed = planned.length ? planned.slice(0, 2).map(function (c) {
      return '<div class="st-shop-closed"><span class="st-shop-sign">' + esc(c.name) + '</span><span class="st-shop-foot">Not yet open</span></div>';
    }) : ['<div class="st-shop-closed"><span class="st-shop-sign">More soon</span><span class="st-shop-foot">Not yet open</span></div>',
          '<div class="st-shop-closed" aria-hidden="true"></div>'];
    wrap.insertAdjacentHTML('beforeend', closed.join(''));
    var vn = CC.byId(CC.countries, 'vietnam');
    if (vn) wrap.querySelector('.st-shop-open').setAttribute('href', vn.href);
  }

  /* ---------- how a scene works: one real moment, its choices and its reminder card ---------- */
  function initHow() {
    var sc = CC.byId(CC.scenarios || [], 'sc02');
    if (!sc) return;
    var step = sc.steps[0];
    $('st-how-prompt').textContent = step.prompt;
    $('st-how-choices').innerHTML = step.choices.map(function (c) { return '<li>' + esc(c.label) + '</li>'; }).join('');
    var r = sc.reminder;
    var phrases = (r.phraseIds || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    $('st-how-card').innerHTML = '<b>' + esc(r.title) + '</b><p>' + esc(r.action) + '</p>' +
      '<ul>' + phrases.map(function (p) {
        return '<li><span lang="vi">' + esc(p.vi) + '</span>' + (p.status === 'needs_verification' ? ' <small>being verified</small>' : '') + '</li>';
      }).join('') + '</ul>' +
      '<p class="st-card-note">' + esc(r.note) + '</p>';
  }

  /* ---------- words you will use: only phrases already checked ---------- */
  var marquee = { choice: null };
  function initMarquee() {
    var run = $('st-marquee-run'), list = $('st-marquee-list'), wrap = document.querySelector('.st-marquee');
    if (!run) return;
    var ok = (CC.phrases || []).filter(function (p) { return p.status === 'published'; });
    if (!ok.length) { wrap.hidden = true; return; }
    list.innerHTML = ok.map(function (p) { return '<li><span lang="vi">' + esc(p.vi) + '</span> means “' + esc(shortMeaning(p.meaning)) + '”</li>'; }).join('');
    var once = ok.map(function (p) { return '<span lang="vi">' + esc(p.vi) + '<i lang="en">' + esc(shortMeaning(p.meaning)) + '</i></span>'; }).join('');
    run.innerHTML = once + once + once + once;
    var btn = $('st-marquee-btn');
    function sync() {
      var paused = marquee.choice ? marquee.choice === 'pause' : reduce();
      wrap.classList.toggle('is-paused', paused);
      btn.textContent = paused ? 'Play' : 'Pause';
      btn.setAttribute('aria-label', paused ? 'Play the moving phrases' : 'Pause the moving phrases');
    }
    btn.addEventListener('click', function () {
      var paused = wrap.classList.contains('is-paused');
      marquee.choice = paused ? 'play' : 'pause';
      if (marquee.choice === 'play') document.documentElement.classList.remove('cc-reduce-motion');
      sync();
    });
    document.addEventListener('cc:settings', sync);
    sync();
  }

  /* ---------- the scenes as shops: tabs, shutters, moments ---------- */
  var WORDS = ['First', 'Next', 'Then', 'Last'];
  function initShops() {
    var tabs = $('st-tabs'), panel = $('st-panel');
    if (!tabs || !panel) return;
    var list = scenes();
    tabs.innerHTML = list.map(function (s, k) {
      var done = CC.progress.get(s.id) === 'done';
      return '<button type="button" class="st-tab" role="tab" id="st-tab-' + s.id + '" aria-controls="st-panel" aria-selected="' + (k === 0) + '" tabindex="' + (k === 0 ? 0 : -1) + '" data-id="' + s.id + '">' +
        '<b>' + esc(s.topic) + '</b><span>' + s.steps.length + ' moments · ' + s.minutes + ' min</span>' +
        (done ? '<span class="st-tab-done">Done</span>' : '') + '</button>';
    }).join('');

    function select(id, focus) {
      var s = CC.byId(list, id);
      Array.prototype.forEach.call(tabs.children, function (t) {
        var on = t.getAttribute('data-id') === id;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panel.setAttribute('aria-labelledby', 'st-tab-' + id);
      var moments = s.steps.map(function (st, k) {
        var word = k === s.steps.length - 1 ? WORDS[3] : WORDS[Math.min(k, 2)];
        return '<li class="st-moment"><b>' + word + '</b><p>' + esc(st.prompt) + '</p></li>';
      }).join('');
      panel.innerHTML =
        '<div class="st-shopfront">' +
          '<p class="st-shopfront-sign">' + esc(s.topic) + ' <span>· ' + esc(shortPlace(s.place)) + '</span></p>' +
          '<div class="st-shopfront-art">' + svgFor(s.id) + '<div class="st-shutter" aria-hidden="true"></div></div>' +
          '<div class="st-shopfront-meta"><p>' + esc(s.context) + '</p><p>' + esc(s.scope) + '</p></div>' +
        '</div>' +
        '<ol class="st-moments" aria-label="What happens in this scene">' + moments +
          '<li><a class="st-btn" href="scene.html?id=' + s.id + '">' + (CC.progress.get(s.id) === 'done' ? 'Play again' : 'Step inside') +
          '<span class="visually-hidden">: ' + esc(s.title) + '</span></a></li>' +
        '</ol>';
      var open = $('st-shops-open');
      open.setAttribute('href', 'scene.html?id=' + s.id);
      open.innerHTML = 'Open this scene<span class="visually-hidden">: ' + esc(s.title) + '</span>';
      rollShutter(panel.querySelector('.st-shutter'));
    }

    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('[role="tab"]');
      if (t) select(t.getAttribute('data-id'));
    });
    tabs.addEventListener('keydown', function (e) {
      var keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      var all = Array.prototype.slice.call(tabs.children);
      var i = all.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key in keys) n = (i + keys[e.key] + all.length) % all.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = all.length - 1;
      if (n === null) return;
      e.preventDefault();
      select(all[n].getAttribute('data-id'), true);
    });
    if (list.length) select(list[0].id);
  }

  /* the shutter starts down and rolls up into the signboard, like a shop opening */
  function rollShutter(el) {
    if (!el) return;
    if (reduce() || !el.animate) { el.style.transform = 'translateY(-100%)'; return; }
    el.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(0)', offset: 0.15 }, { transform: 'translateY(-100%)' }],
      { duration: 900, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }
    );
  }

  /* ---------- checked, or labelled: numbers read from the data ---------- */
  function initNumbers() {
    var dl = $('st-numbers');
    if (!dl) return;
    var src = CC.sources || [];
    var latest = src.map(function (s) { return s.checked; }).filter(Boolean).sort().pop();
    var pending = (CC.claims || []).filter(function (c) { return c.status === 'needs_verification'; }).length +
      (CC.phrases || []).filter(function (p) { return p.status === 'needs_verification'; }).length;
    var dds = dl.querySelectorAll('dd');
    dds[0].textContent = src.length + ' sources';
    dds[1].textContent = latest ? fmtDate(latest) : 'Not yet';
    dds[2].textContent = pending ? pending + ' points, labelled' : 'None';
  }

  /* ---------- footer: the name as a row of signboards, and photo credits ---------- */
  function initFoot() {
    var mark = $('st-foot-mark');
    if (mark) {
      var heights = [100, 78, 92, 64, 86, 100, 70, 96, 82, 60, 100, 74, 90, 84];
      mark.innerHTML = 'CultureCompass'.split('').map(function (ch, k) {
        return '<span style="height:' + heights[k % heights.length] + '%" data-l="' + ch + '"></span>';
      }).join('');
    }
    var credits = $('st-foot-credits');
    if (credits) {
      var ids = ['img-hangma', 'vid-train-street', 'img-old-quarter', 'img-vendor-blossom', 'img-pho-ga', 'img-stelae', 'img-street-central', 'img-garden'];
      var parts = ids.map(function (id) { return CC.byId(CC.assets, id); }).filter(Boolean).map(function (a) {
        return esc(a.credit) + ', <a href="' + esc(a.licenseUrl) + '" target="_blank" rel="noopener">' + esc(a.license) + '<span class="visually-hidden"> (opens in new tab)</span></a>';
      });
      credits.innerHTML = 'On this page: ' + parts.join('; ') + '. Map: original artwork. Full credits on the <a href="about.html">About page</a>.';
    }
  }

  function init() {
    initFront();
    initClip();
    initCountries();
    initMosaic();
    initMarquee();
    initShops();
    initHow();
    initNumbers();
    initFoot();
    CC.bindAudio(document);
    document.addEventListener('cc:settings', syncClip);
  }

  CC.landing = { init: init };
})();
