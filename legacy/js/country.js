/* CultureCompass — Vietnam page: the compass as a street junction.
   Nine topic shops stand around the crossroads tile. Opening a shop (a real button with aria-expanded)
   fills the board below with what is inside: the scene, the points to know with their sources, and the words to use.
   Deep links: vietnam.html#topic-food opens that shop. Escape closes it and returns focus to the shop. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;

  var SIGNS = ['st-sign-red', 'st-sign-yellow', 'st-sign-green', 'st-sign-white', 'st-sign-ink'];
  /* ring order around the 4 x 3 board, clockwise from the top left; the left middle cell is "Before you go" */
  var SLOTS = [[1, 1], [1, 2], [1, 3], [1, 4], [2, 4], [3, 4], [3, 3], [3, 2], [3, 1]];
  /* the same ring on the 3 x 4 tablet board, centre in the middle column */
  var SLOTS_MID = [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [4, 3], [4, 2], [4, 1], [3, 1]];
  var WORDS_STATUS = { done: 'Done', started: 'In progress', 'new': 'Not started' };
  /* real street photographs for the shops that have an honest one; decorative, the shop's words carry the meaning */
  var PHOTOS = { food: 'img-pho-ga', sacred: 'img-garden', street: 'img-vendor-pottery', heritage: 'img-stelae', language: 'img-hangma' };

  var topics, openId = null;

  function $(id) { return document.getElementById(id); }
  function scenes() { return (CC.scenarios || []).slice().sort(function (a, b) { return a.order - b.order; }); }
  function resolve(it) {
    if (it.type === 'scene') return CC.byId(CC.scenarios, it.id);
    if (it.type === 'claim') return CC.byId(CC.claims, it.id);
    if (it.type === 'phrase') return CC.byId(CC.phrases, it.id);
    return null;
  }
  function count(t, type) { return t.items.filter(function (it) { return it.type === type && resolve(it); }).length; }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function explored(t) { return t.items.some(function (it) { return it.type === 'scene' && CC.progress.get(it.id) === 'done'; }); }
  function related(t) {
    var keys = t.items.map(function (it) { return it.type + ':' + it.id; });
    return topics.filter(function (o) {
      return o !== t && o.status === 'ready' && o.items.some(function (it) { return keys.indexOf(it.type + ':' + it.id) !== -1; });
    });
  }

  /* ---------- progress tile ---------- */
  function initProgress() {
    var list = scenes();
    var done = list.filter(function (s) { return CC.progress.get(s.id) === 'done'; }).length;
    var next = list.filter(function (s) { return CC.progress.get(s.id) !== 'done'; })[0];
    $('vn-progress-big').textContent = done ? done + ' of ' + list.length + ' scenes done' : list.length + ' scenes to rehearse';
    var btn = $('vn-continue');
    if (next) {
      btn.setAttribute('href', 'scene.html?id=' + next.id);
      btn.innerHTML = esc(done || CC.progress.get(next.id) === 'started' ? 'Continue: ' + next.title : 'Start the first scene') + ' <span class="st-arrow" aria-hidden="true"></span>';
    } else {
      btn.setAttribute('href', '#scenes');
      btn.innerHTML = 'Every scene done. Replay one <span class="st-arrow" aria-hidden="true"></span>';
    }
  }

  /* ---------- the junction ---------- */
  function shopHtml(t, i) {
    var slot = SLOTS[i] || [4, (i % 4) + 1], mid = SLOTS_MID[i] || [5, (i % 3) + 1];
    var place = '--r:' + slot[0] + ';--c:' + slot[1] + ';--mr:' + mid[0] + ';--mc:' + mid[1];
    if (t.status !== 'ready') {
      return '<div class="vn-topic is-closed" style="' + place + '">' +
        '<span class="vn-topic-sign">' + esc(t.label) + '</span>' +
        '<span class="vn-topic-vi" lang="vi">' + esc(t.vi) + '</span>' +
        '<span class="vn-topic-foot">Not written yet</span></div>';
    }
    var sc = count(t, 'scene'), cl = count(t, 'claim'), ph = count(t, 'phrase');
    var bits = [];
    if (sc) bits.push(plural(sc, 'scene', 'scenes'));
    if (cl) bits.push(plural(cl, 'point', 'points'));
    if (ph) bits.push(plural(ph, 'phrase', 'phrases'));
    var ph = PHOTOS[t.id] && CC.byId(CC.assets, PHOTOS[t.id]);
    return '<button type="button" class="vn-topic ' + SIGNS[i % SIGNS.length] + (ph ? ' has-photo' : '') + '" style="' + place + '" id="topic-' + t.id + '"' +
      ' aria-expanded="false" aria-controls="vn-shop" data-topic="' + t.id + '" data-k="' + i + '">' +
      (ph ? '<span class="vn-topic-pic"><img class="vn-topic-photo" src="' + esc(ph.file) + '" alt="" loading="lazy"><i class="vn-topic-shutter" aria-hidden="true"></i></span>' : '') +
      '<span class="vn-topic-sign">' + esc(t.label) + '</span>' +
      '<span class="vn-topic-vi" lang="vi">' + esc(t.vi) + '</span>' +
      '<span class="vn-topic-blurb">' + esc(t.blurb) + '</span>' +
      '<span class="vn-topic-foot">' + bits.map(function (b) { return '<span>' + b + '</span>'; }).join(' · ') + (explored(t) ? ' · <b>Explored</b>' : '') + '</span>' +
      '<span class="vn-topic-open">Open below</span>' +
      '</button>';
  }

  function initJunction() {
    var board = $('vn-junction');
    board.insertAdjacentHTML('beforeend', topics.map(shopHtml).join(''));
    board.addEventListener('click', function (e) {
      var b = e.target.closest('[data-topic]');
      if (b) toggle(b.getAttribute('data-topic'));
    });
  }

  /* ---------- inside the shop ---------- */
  function sceneBlock(s) {
    var st = CC.progress.get(s.id);
    return '<div class="st-shopfront vn-shop-scene">' +
        '<p class="st-shopfront-sign">Rehearse it <span>· ' + s.minutes + ' min</span></p>' +
        '<div class="st-shopfront-art">' + CC.street.sceneArt(s.id) + '<div class="st-shutter" aria-hidden="true"></div></div>' +
        '<div class="st-shopfront-meta"><h4>' + esc(s.title) + '</h4><p>' + esc(s.context) + '</p>' +
        '<a class="st-btn" href="scene.html?id=' + s.id + '">' + (st === 'done' ? 'Play again' : st === 'started' ? 'Continue' : 'Step inside') +
        '<span class="visually-hidden">: ' + esc(s.title) + '</span></a></div>' +
      '</div>';
  }
  function claimBlock(it) {
    var c = resolve(it);
    var note = c.kind === 'projectNote' ? '<span class="cc-src">Our own advice, not a cultural claim</span>' : '';
    var src = note + ((c.sourceIds || []).length ? CC.sourceLinks(c.sourceIds) : (note ? '' : '<span class="cc-src">No source linked yet</span>'));
    return '<li><b>' + esc(it.label || '') + '</b>' + (c.status === 'needs_verification' ? ' <span class="vn-verify">Being verified</span>' : '') +
      '<p>' + esc(c.text) + '</p>' + src + '</li>';
  }
  function phraseBlock(it) {
    var p = resolve(it);
    var a = CC.byId(CC.assets, p.audioId);
    var audio = a && a.file;
    return '<li><p class="vn-say-vi" lang="vi">' + esc(p.vi) + '</p>' +
      '<p class="vn-say-en">' + esc(p.meaning) + '</p>' +
      (p.status === 'needs_verification' ? '<p><span class="vn-verify">Being verified</span></p>' : '') +
      (audio ? '<button type="button" class="st-listen" data-audio="' + esc(p.audioId) + '" aria-pressed="false" aria-label="Listen: ' + esc(p.vi) + '">' +
        '<span class="st-play" aria-hidden="true"></span>Listen</button>' +
        (a.synthetic ? '<span class="vn-say-voice-inline">Computer voice</span>' : '') +
        '<p class="cc-audio-msg vn-say-note" role="status" aria-live="polite"></p>' : '') +
      '</li>';
  }

  function shopInterior(t, i) {
    var sc = t.items.filter(function (it) { return it.type === 'scene' && resolve(it); }).map(function (it) { return resolve(it); });
    var cl = t.items.filter(function (it) { return it.type === 'claim' && resolve(it); });
    var ph = t.items.filter(function (it) { return it.type === 'phrase' && resolve(it); });
    var rel = related(t);
    var anySynthetic = ph.some(function (it) { var a = CC.byId(CC.assets, resolve(it).audioId); return a && a.synthetic; });
    return '<div class="st-tile ' + SIGNS[i % SIGNS.length] + ' vn-shop-head">' +
        '<div><h2 class="st-h2" id="vn-shop-title" tabindex="-1">' + esc(t.label) + '</h2>' +
        '<p class="vn-shop-vi" lang="vi">' + esc(t.vi) + '</p><p class="vn-shop-blurb">' + esc(t.blurb) + '</p></div>' +
        '<button type="button" class="vn-close" data-close>Close<span class="visually-hidden"> ' + esc(t.label) + '</span></button>' +
      '</div>' +
      (sc.length ? '<div class="vn-shop-col vn-col-scene">' + sc.map(sceneBlock).join('') + '</div>' : '') +
      (cl.length ? '<div class="st-tile st-sign-white vn-shop-col vn-col-know"><h3>Good to know</h3><ul class="vn-know">' + cl.map(claimBlock).join('') + '</ul></div>' : '') +
      (ph.length ? '<div class="st-tile st-sign-yellow vn-shop-col vn-col-say"><h3>Words to use</h3><ul class="vn-say">' + ph.map(phraseBlock).join('') + '</ul>' +
        (anySynthetic ? '<p class="vn-say-voice">A recorded speaker will replace the computer voice.</p>' : '') + '</div>' : '') +
      (rel.length ? '<div class="st-tile st-sign-ink vn-shop-rel"><h3>Shares points with</h3><div>' + rel.map(function (o) {
        return '<button type="button" class="vn-rel" data-topic="' + o.id + '">' + esc(o.label) + '</button>';
      }).join('') + '</div></div>' : '');
  }

  function open(id, opts) {
    opts = opts || {};
    var i = -1;
    topics.forEach(function (t, k) { if (t.id === id) i = k; });
    var t = topics[i];
    if (!t || t.status !== 'ready') return;
    openId = id;
    var shop = $('vn-shop');
    shop.className = 'st-board vn-shop' + (t.items.some(function (it) { return it.type === 'scene'; }) ? '' : ' no-scene');
    shop.innerHTML = shopInterior(t, i);
    shop.hidden = false;
    Array.prototype.forEach.call(document.querySelectorAll('.vn-topic[data-topic]'), function (b) {
      var on = b.getAttribute('data-topic') === id;
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      b.classList.toggle('is-open', on);
    });
    if (history.replaceState) history.replaceState(null, '', '#topic-' + id);
    var reduce = CC.settings.reduce();
    if (!opts.quiet) {
      shop.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      $('vn-shop-title').focus({ preventScroll: true });
    }
    CC.street.rollShutter(shop.querySelector('.st-shutter'));
  }

  function close() {
    if (!openId) return;
    var back = $('topic-' + openId);
    openId = null;
    var shop = $('vn-shop');
    shop.hidden = true;
    shop.innerHTML = '';
    Array.prototype.forEach.call(document.querySelectorAll('.vn-topic[data-topic]'), function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.classList.remove('is-open');
    });
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    if (back) back.focus();
  }

  function toggle(id) { if (openId === id) close(); else open(id); }

  /* ---------- scenes in Hà Nội ---------- */
  function initScenes() {
    var list = scenes();
    $('vn-scene-list').innerHTML = list.map(function (s, k) {
      var st = CC.progress.get(s.id);
      return '<li class="vn-scene ' + SIGNS[(k + 2) % SIGNS.length] + '" data-k="' + k + '">' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p class="vn-scene-meta">' + esc(s.topic) + ' · ' + esc(s.place) + ' · about ' + s.minutes + ' min</p>' +
        '<p class="vn-scene-state">' + WORDS_STATUS[st] + '</p>' +
        '<a class="vn-scene-go" href="scene.html?id=' + s.id + '">' + (st === 'done' ? 'Play again' : st === 'started' ? 'Continue' : 'Open scene') +
        ' <span class="st-arrow" aria-hidden="true"></span><span class="visually-hidden">: ' + esc(s.title) + '</span></a>' +
      '</li>';
    }).join('');
  }

  /* the one authored moment: each shop opens its shutter as it comes into view, round the ring;
     the shutter covers only the photo, never the words. Reduced motion: shutters stay up. */
  function openShops() {
    var shutters = document.querySelectorAll('.vn-topic-shutter');
    if (CC.settings.reduce() || !Element.prototype.animate || !('IntersectionObserver' in window)) return;
    Array.prototype.forEach.call(shutters, function (el) { el.style.transform = 'translateY(0)'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target.querySelector('.vn-topic-shutter');
        var k = +(e.target.closest('[data-k]').getAttribute('data-k') || 0);
        el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
          { duration: 650, delay: 150 + (k % 5) * 80, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      });
    }, { threshold: 0.35 });
    Array.prototype.forEach.call(shutters, function (el) { io.observe(el.parentNode); });
  }

  /* the moving picture at the crossroads: muted, paused under reduced motion, with a pause button */
  var clip = { choice: null, inView: true };
  function clipPlaying() { return clip.choice ? clip.choice === 'play' : !CC.settings.reduce(); }
  function syncClip() {
    var v = $('vn-clip'), b = $('vn-clip-btn');
    if (!v || !b) return;
    var on = clipPlaying();
    if (on && clip.inView) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
    /* the visible label names the action; no aria-pressed, so state and label never contradict */
    b.setAttribute('data-paused', on ? 'false' : 'true');
    b.querySelector('.st-clip-btn-text').textContent = on ? 'Pause video' : 'Play video';
  }
  function initClip() {
    var v = $('vn-clip'), b = $('vn-clip-btn');
    if (!v || !b) return;
    var a = CC.byId(CC.assets, 'vid-train-street');
    if (a) v.setAttribute('aria-label', a.alt);
    b.addEventListener('click', function () { clip.choice = clipPlaying() ? 'pause' : 'play'; syncClip(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { clip.inView = e[0].isIntersecting; syncClip(); }, { threshold: 0.2 }).observe(v);
    }
    document.addEventListener('cc:settings', syncClip);
    syncClip();
  }

  function init() {
    topics = CC.topics || [];
    initProgress();
    initJunction();
    initScenes();
    openShops();
    initClip();
    CC.street.footMark($('st-foot-mark'));
    CC.street.credits($('st-foot-credits'), ['vid-train-street', 'img-pho-ga', 'img-garden', 'img-vendor-pottery', 'img-stelae', 'img-hangma'], 'Scene drawings: original artwork. ');
    CC.bindAudio(document);

    $('vn-shop').addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) { close(); return; }
      var r = e.target.closest('.vn-rel');
      if (r) open(r.getAttribute('data-topic'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openId && !document.querySelector('.offcanvas.show')) close();
    });
    /* a deep link opens its shop; scroll once layout and fonts have settled, or the jump lands short */
    var m = /^#topic-([\w-]+)$/.exec(location.hash);
    if (m) {
      open(m[1], { quiet: true });
      var go = function () {
        var shop = $('vn-shop');
        if (shop.hidden) return;
        shop.scrollIntoView({ block: 'start' });
        $('vn-shop-title').focus({ preventScroll: true });
      };
      if (document.readyState === 'complete') requestAnimationFrame(go); else window.addEventListener('load', function () { requestAnimationFrame(go); });
    }
  }

  CC.country = { init: init, open: open, close: close };
})();
