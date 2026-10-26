/* CultureCompass — shared helpers: storage, settings, collection, resume state, icons, page shell, audio.
   Plain script (no modules) so the site also works when opened from file://. */
(function () {
  'use strict';
  var CC = (window.CC = window.CC || {});

  /* ---------- small utils ---------- */
  CC.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  CC.byId = function (list, id) {
    for (var i = 0; i < (list || []).length; i++) if (list[i].id === id) return list[i];
    return null;
  };
  CC.qs = function (name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  };
  CC.plural = function (n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); };
  CC.$ = function (id) { return document.getElementById(id); };

  /* ---------- icons: one authored stroke set (24 grid, 1.75 stroke) ---------- */
  var P = {
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    bookmark: '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
    bookmarkFill: '<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" fill="currentColor"/>',
    play: '<path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
    listen: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    swap: '<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>',
    question: '<path d="M9.2 9.2a2.9 2.9 0 1 1 4 2.7c-.8.4-1.2 1-1.2 1.9v.7"/><path d="M12 17.6v.4" stroke-width="2.4"/>',
    info: '<path d="M12 10.5v6.5"/><path d="M12 7v.4" stroke-width="2.4"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/>',
    print: '<path d="M7 9V4h10v5M7 17H4v-7h16v7h-3"/><path d="M7 14h10v6H7z"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    source: '<path d="M6 4h9l3 3v13H6z"/><path d="M9 11h6M9 15h6"/>',
    verify: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none"/>',
    voice: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5"/>',
    alert: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5"/><path d="M12 17.3v.3" stroke-width="2.4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    scene: '<rect x="3.5" y="5" width="17" height="12" rx="1.5"/><path d="M8 21h8M12 17v4"/><path d="M10.5 9v4l3.5-2z" fill="currentColor"/>',
    story: '<path d="M4 5.5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6.5v13"/>',
    phrase: '<path d="M4 5h16v11H11l-5 4v-4H4z"/>',
    lightbulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>'
  };
  CC.icon = function (name, cls) {
    return '<svg class="cc-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>';
  };
  CC.arrow = function (dir) { return CC.icon(dir === 'left' ? 'arrowLeft' : dir === 'down' ? 'arrowDown' : 'arrowRight', 'cc-arrow'); };
  CC.MARK = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="16" cy="16" r="13.5"/><circle cx="16" cy="16" r="9.5" stroke-dasharray="1.4 2.6"/><path d="M16 5.5l3 10.5-3 10.5-3-10.5z" fill="currentColor" stroke="none" opacity=".25"/><path d="M16 5.5l3 10.5h-6z" fill="currentColor" stroke="none"/></svg>';

  /* ---------- motion ---------- */
  CC.motion = {
    reduce: function () { return CC.settings ? CC.settings.reduce() : false; },
    /* smooth scroll unless reduced */
    scrollTo: function (el, block) {
      if (!el) return;
      el.scrollIntoView({ behavior: CC.motion.reduce() ? 'auto' : 'smooth', block: block || 'start' });
    },
    /* data-saving or slow connection: prefer stills to video */
    lowData: function () {
      var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || '')));
    }
  };

  /* ---------- storage ----------
     Device only, may be blocked or corrupted. Blocked: keep working in memory and say so.
     Corrupted: keep a copy under cc.backup.<key>, start that key fresh and say so. */
  var PREFIX = 'cc.';
  var memory = {};
  var available = (function () {
    try { var k = PREFIX + '__probe'; window.localStorage.setItem(k, '1'); window.localStorage.removeItem(k); return true; } catch (e) { return false; }
  })();
  CC.store = {
    ok: available,
    problems: [],
    get: function (key, fallback) {
      if (!available) return key in memory ? memory[key] : fallback;
      var raw;
      try { raw = window.localStorage.getItem(PREFIX + key); } catch (e) { return key in memory ? memory[key] : fallback; }
      if (raw == null) return fallback;
      try { return JSON.parse(raw); } catch (e) {
        try { window.localStorage.setItem(PREFIX + 'backup.' + key, raw); window.localStorage.removeItem(PREFIX + key); } catch (e2) { /* ignore */ }
        if (CC.store.problems.indexOf(key) === -1) CC.store.problems.push(key);
        return fallback;
      }
    },
    set: function (key, value) {
      memory[key] = value;
      if (!available) return false;
      try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; } catch (e) {
        CC.toast("Couldn’t save on this browser (storage may be full or blocked). Nothing in the content is lost.", 'alert');
        return false;
      }
    },
    remove: function (key) { delete memory[key]; try { window.localStorage.removeItem(PREFIX + key); } catch (e) { /* ignore */ } },
    clearUserData: function () {
      ['progress', 'scenes', 'collection', 'saved', 'read', 'migrations'].forEach(function (k) { CC.store.remove(k); });
      return available;
    }
  };

  /* Schema v2 (October 2026 redesign): saved reminder cards ('saved': ["rc-sc01", …]) become items in
     'collection' (stories, reminders and phrases). The old key is left in place, never deleted silently. */
  function migrate() {
    var m = CC.store.get('migrations', {});
    if (m.collectionV2) return;
    var coll = CC.store.get('collection', null);
    var old = CC.store.get('saved', null);
    if (!coll) {
      coll = [];
      if (Array.isArray(old)) old.forEach(function (id) { if (typeof id === 'string') coll.push({ type: 'reminder', id: id, country: 'vietnam', at: null }); });
      CC.store.set('collection', coll);
    }
    m.collectionV2 = { at: new Date().toISOString(), moved: Array.isArray(old) ? old.length : 0 };
    CC.store.set('migrations', m);
    if (Array.isArray(old) && old.length) CC._migratedCount = old.length;
  }

  /* ---------- settings ---------- */
  var DEFAULTS = { sound: true, reduceMotion: null, textOnly: false };
  CC.settings = {
    get: function () {
      var s = CC.store.get('settings', {});
      if (!s || typeof s !== 'object') s = {};
      var out = {};
      Object.keys(DEFAULTS).forEach(function (k) { out[k] = k in s ? s[k] : DEFAULTS[k]; });
      return out;
    },
    set: function (patch) {
      var s = CC.settings.get();
      Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
      CC.store.set('settings', s);
      CC.settings.apply();
      document.dispatchEvent(new CustomEvent('cc:settings', { detail: s }));
    },
    systemReduce: function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); },
    reduce: function () {
      var s = CC.settings.get();
      if (s.textOnly) return true;
      return s.reduceMotion == null ? CC.settings.systemReduce() : !!s.reduceMotion;
    },
    apply: function () {
      document.documentElement.classList.toggle('cc-reduce-motion', CC.settings.reduce());
      document.documentElement.classList.toggle('cc-text-only', CC.settings.get().textOnly);
    }
  };
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    var onMq = function () { CC.settings.apply(); document.dispatchEvent(new CustomEvent('cc:settings')); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  /* ---------- scene progress + resume state ---------- */
  CC.progress = {
    get: function (id) { var p = CC.store.get('progress', {}) || {}; return p[id] || 'new'; },
    set: function (id, state) {
      var p = CC.store.get('progress', {}) || {};
      if (p[id] === 'done' && state === 'started') return; // never downgrade
      p[id] = state;
      CC.store.set('progress', p);
    }
  };
  /* where the visitor is inside a scene: { step, phase: 'choosing'|'feedback', choice, at } */
  CC.sceneState = {
    get: function (id) { var all = CC.store.get('scenes', {}) || {}; return all[id] || null; },
    set: function (id, st) { var all = CC.store.get('scenes', {}) || {}; st.at = new Date().toISOString(); all[id] = st; CC.store.set('scenes', all); },
    clear: function (id) { var all = CC.store.get('scenes', {}) || {}; delete all[id]; CC.store.set('scenes', all); }
  };
  /* honest label + link for a scene, used on every page that lists scenes */
  CC.sceneEntry = function (sc) {
    var p = CC.progress.get(sc.id);
    var st = CC.sceneState.get(sc.id);
    var n = sc.steps.length;
    if (st && typeof st.step === 'number' && st.step >= 0 && st.step < n) {
      return { state: 'started', label: 'Continue at step ' + (st.step + 1) + ' of ' + n, status: 'In progress: step ' + (st.step + 1) + ' of ' + n, href: 'scene.html?id=' + sc.id };
    }
    if (p === 'done') return { state: 'done', label: 'Practise again', status: 'Practised', href: 'scene.html?id=' + sc.id };
    return { state: 'new', label: 'Start this scene', status: 'Not started', href: 'scene.html?id=' + sc.id };
  };

  /* ---------- reading log (opened, not "understood") ---------- */
  CC.reads = {
    has: function (id) { var r = CC.store.get('read', {}) || {}; return !!r[id]; },
    mark: function (id) { var r = CC.store.get('read', {}) || {}; if (!r[id]) { r[id] = new Date().toISOString(); CC.store.set('read', r); } }
  };

  /* ---------- collection ---------- */
  CC.collection = {
    list: function () { var l = CC.store.get('collection', []); return Array.isArray(l) ? l.filter(function (x) { return x && x.type && x.id; }) : []; },
    has: function (type, id) { return CC.collection.list().some(function (x) { return x.type === type && x.id === id; }); },
    toggle: function (type, id, country) {
      var list = CC.collection.list();
      var i = -1;
      list.forEach(function (x, k) { if (x.type === type && x.id === id) i = k; });
      if (i === -1) list.push({ type: type, id: id, country: country || 'vietnam', at: new Date().toISOString() });
      else list.splice(i, 1);
      var ok = CC.store.set('collection', list);
      CC.updateCount(i === -1);
      document.dispatchEvent(new CustomEvent('cc:collection', { detail: { type: type, id: id, saved: i === -1 } }));
      return { saved: i === -1, ok: ok };
    }
  };
  /* one save control for stories, reminders and phrases */
  var SAVE_NAMES = { story: 'story', reminder: 'reminder card', phrase: 'phrase' };
  CC.saveButton = function (type, id, opts) {
    opts = opts || {};
    var on = CC.collection.has(type, id);
    var name = opts.name || '';
    if (opts.mini) {
      return '<button type="button" class="cc-save-mini" data-save-type="' + type + '" data-save-id="' + CC.esc(id) + '" aria-pressed="' + on + '" aria-label="Save ' + SAVE_NAMES[type] + (name ? ': ' + CC.esc(name) : '') + '" title="Save to My collection">' +
        CC.icon('bookmark', 'cc-icon-line') + CC.icon('bookmarkFill', 'cc-icon-fill') + '</button>';
    }
    return '<button type="button" class="cc-btn ' + (opts.cls || 'cc-btn-quiet') + ' cc-save" data-save-type="' + type + '" data-save-id="' + CC.esc(id) + '" aria-pressed="' + on + '">' +
      CC.icon('bookmark', 'cc-icon-line') + CC.icon('bookmarkFill', 'cc-icon-fill') +
      '<span class="cc-save-label">' + (on ? 'Saved to My collection' : 'Save ' + SAVE_NAMES[type]) + '</span></button>';
  };
  function syncSaveButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-save-type]'), function (b) {
      var on = CC.collection.has(b.getAttribute('data-save-type'), b.getAttribute('data-save-id'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var lab = b.querySelector('.cc-save-label');
      if (lab) lab.textContent = on ? 'Saved to My collection' : 'Save ' + SAVE_NAMES[b.getAttribute('data-save-type')];
    });
  }
  CC.syncSaveButtons = syncSaveButtons;
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-save-type]');
    if (!b) return;
    var type = b.getAttribute('data-save-type'), id = b.getAttribute('data-save-id');
    var r = CC.collection.toggle(type, id, b.getAttribute('data-save-country'));
    syncSaveButtons();
    if (r.saved && !CC.motion.reduce()) {
      b.classList.remove('is-popping'); void b.offsetWidth; b.classList.add('is-popping');
    }
    if (!r.ok) CC.toast('This browser isn’t letting us save, so it will be forgotten when you close the tab.', 'alert');
    else CC.toast(r.saved ? 'Saved to <a href="collection.html">My collection</a>.' : 'Removed from My collection.', r.saved ? 'bookmarkFill' : 'bookmark', true);
  });

  /* ---------- content helpers ---------- */
  CC.claimsOf = function (ids) { return (ids || []).map(function (id) { return CC.byId(CC.claims, id); }).filter(Boolean); };
  CC.unverified = function (claims) { return claims.some(function (c) { return c.status === 'needs_verification' || c.status === 'draft'; }); };
  CC.sourcesOf = function (claims) {
    var out = [];
    claims.forEach(function (c) { (c.sourceIds || []).forEach(function (s) { if (out.indexOf(s) === -1) out.push(s); }); });
    return out;
  };
  CC.sourceLinks = function (ids, label) {
    ids = (ids || []).filter(Boolean);
    if (!ids.length) return '';
    var parts = ids.map(function (id) {
      var s = CC.byId(CC.sources, id);
      if (!s) return CC.esc(id);
      return '<a href="' + CC.esc(s.url) + '" target="_blank" rel="noopener">' + CC.esc(s.short || s.title) + '<span class="visually-hidden"> (opens in a new tab)</span></a>';
    });
    return '<span class="cc-src">' + (label || 'Source') + ': ' + parts.join('; ') + '</span>';
  };
  CC.verifyTag = function () {
    return '<span class="cc-tag cc-tag-verify" title="Still being checked against a reliable source.">' + CC.icon('verify') + 'Being verified</span>';
  };
  CC.verifyBadge = function (status) { return status === 'needs_verification' || status === 'draft' ? ' ' + CC.verifyTag() : ''; };

  /* stories */
  CC.storyClaims = function (st) {
    var ids = [];
    (st.sections || []).forEach(function (s) { (s.claimIds || []).forEach(function (c) { if (ids.indexOf(c) === -1) ids.push(c); }); });
    return CC.claimsOf(ids);
  };
  CC.storyMinutes = function (st) {
    var words = (st.dek + ' ' + (st.sections || []).map(function (s) { return (s.heading || '') + ' ' + s.text; }).join(' ')).split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  };
  CC.storyTopics = function (st) { return (CC.topics || []).filter(function (t) { return (t.storyIds || []).indexOf(st.id) !== -1; }); };
  /* picture for a story: its credited photo, else the related scene illustration (decorative here) */
  CC.storyPic = function (st) {
    var img = st.imageId ? CC.byId(CC.assets, st.imageId) : null;
    if (img) return '<img src="' + CC.esc(img.file) + '" alt="" loading="lazy" decoding="async">';
    return CC.sceneThumb(st.sceneId);
  };
  CC.sceneThumb = function (id) {
    var art = CC.sceneArt && CC.sceneArt[id];
    if (art) return '<img src="assets/img/scenes/' + art.file + '-thumb.jpg" alt="' + CC.esc(art.alt) + '" loading="lazy" decoding="async" width="640" height="360">';
    var s = (CC.svgs && CC.svgs[id]) || '';
    return s.replace(/ id="[^"]*"/g, '').replace('role="img"', 'aria-hidden="true" focusable="false"').replace(/ aria-label="[^"]*"/, '').replace('class="cc-stage"', 'class="cc-thumb-svg" preserveAspectRatio="xMidYMid slice"');
  };
  CC.storyMeta = function (st) {
    var cl = CC.storyClaims(st);
    var n = CC.sourcesOf(cl).length;
    return '<span>' + CC.icon('pin') + ' ' + CC.esc(st.place) + '</span>' +
      '<span>' + CC.storyMinutes(st) + ' min read</span>' +
      (n ? '<span>' + CC.plural(n, 'source') + '</span>' : '') +
      (CC.unverified(cl) ? CC.verifyTag() : '') +
      (CC.reads.has(st.id) ? '<span class="cc-tag cc-tag-done">' + CC.icon('check') + 'Read before</span>' : '');
  };
  CC.storyRow = function (st, i, from) {
    var href = 'story.html?id=' + st.id + (from ? '&from=' + encodeURIComponent(from) : '');
    return '<li class="story-row" id="row-' + st.id + '" style="--i:' + (i || 0) + '">' +
      '<div class="story-thumb">' + CC.storyPic(st) + '</div>' +
      '<div><h4><a href="' + href + '" data-story-link="' + st.id + '">' + CC.esc(st.title) + '</a></h4><p>' + CC.esc(st.dek) + '</p>' +
      '<div class="cc-meta">' + CC.storyMeta(st) + '</div></div>' +
      CC.saveButton('story', st.id, { mini: true, name: st.title }) +
    '</li>';
  };
  CC.storyCard = function (st, from, headingLevel) {
    var h = headingLevel || 3;
    var href = 'story.html?id=' + st.id + (from ? '&from=' + encodeURIComponent(from) : '');
    var topics = CC.storyTopics(st).map(function (t) { return CC.esc(t.label); }).join(' · ');
    return '<li class="story-card" id="card-' + st.id + '">' +
      '<div class="story-pic">' + CC.storyPic(st) + '</div>' +
      '<h' + h + '><a href="' + href + '" data-story-link="' + st.id + '">' + CC.esc(st.title) + '</a></h' + h + '>' +
      '<p>' + CC.esc(st.dek) + '</p>' + (topics ? '<span class="story-topics">' + topics + '</span>' : '') + '<div class="cc-meta">' + CC.storyMeta(st) + '</div>' +
      CC.saveButton('story', st.id, { mini: true, name: st.title }) +
    '</li>';
  };

  /* ---------- audio ---------- */
  var current = null, currentBtn = null;
  function stopCurrent() { if (current) { current.pause(); current = null; } if (currentBtn) { currentBtn.setAttribute('aria-pressed', 'false'); currentBtn = null; } }
  CC.audio = {
    play: function (audioId, btn) {
      var msgEl = btn && btn.closest('.phrase') ? btn.closest('.phrase').querySelector('.cc-audio-msg') : null;
      var say = function (t) { if (msgEl) msgEl.textContent = t; };
      if (btn && btn.getAttribute('aria-pressed') === 'true') { stopCurrent(); say(''); return; }
      if (!CC.settings.get().sound) { say('Sound is off in Settings. The words and meaning are written above.'); return; }
      var asset = CC.byId(CC.assets, audioId);
      if (!asset || !asset.file) { say('No recording yet. Read the words above.'); return; }
      stopCurrent();
      var a = new Audio(asset.file);
      current = a; currentBtn = btn;
      say('');
      if (btn) btn.setAttribute('aria-pressed', 'true');
      a.addEventListener('ended', function () { if (btn) btn.setAttribute('aria-pressed', 'false'); current = null; currentBtn = null; });
      a.addEventListener('error', function () { if (btn) btn.setAttribute('aria-pressed', 'false'); say('Couldn’t play the audio. The words are written above.'); });
      var p = a.play();
      if (p && p.catch) p.catch(function () { if (btn) btn.setAttribute('aria-pressed', 'false'); say('Couldn’t play the audio. The words are written above.'); });
    }
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-audio]');
    if (b) CC.audio.play(b.getAttribute('data-audio'), b);
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stopCurrent(); });

  /* phrase card (phrasebook, stories, scenes, collection) */
  CC.phraseHtml = function (ph, opts) {
    opts = opts || {};
    var asset = CC.byId(CC.assets, ph.audioId);
    var hasAudio = !!(asset && asset.file);
    var intent = (CC.byId(CC.intents, ph.intent) || {}).label;
    var tag = opts.tag || 'div';
    return '<' + tag + ' class="phrase' + (opts.compact ? ' phrase-compact' : '') + '">' +
      '<div class="phrase-top"><div>' +
        '<p class="phrase-vi" lang="vi">' + CC.esc(ph.vi) + '</p></div>' +
        (opts.noSave ? '' : CC.saveButton('phrase', ph.id, { mini: true, name: ph.vi })) +
      '</div>' +
      '<p class="phrase-meaning">“' + CC.esc(ph.meaning) + '”</p>' +
      (ph.say ? '<p class="phrase-say">Pronounced: ' + CC.esc(ph.say) + '</p>' : '') +
      (opts.compact ? '' : '<p class="phrase-use"><b>Use with:</b> ' + CC.esc(ph.useWith) + '</p>') +
      '<div class="phrase-foot">' +
        (opts.showIntent && intent ? '<span class="phrase-intent">' + CC.esc(intent) + '</span>' : '') +
        '<button type="button" class="cc-listen" data-audio="' + CC.esc(ph.audioId) + '"' + (hasAudio ? '' : ' aria-disabled="true"') + ' aria-pressed="false">' +
          CC.icon('listen') + '<span>Listen</span><span class="visually-hidden">: ' + CC.esc(ph.vi) + '</span></button>' +
        (asset && asset.synthetic ? '<span class="cc-tag cc-tag-voice" title="' + CC.esc(asset.credit) + '">' + CC.icon('voice') + 'Computer voice</span>' : '') +
        (ph.status === 'needs_verification' || ph.status === 'draft' ? CC.verifyTag() : '<span class="cc-tag">' + CC.icon('check') + 'Wording from a cited source</span>') +
        (opts.compact ? '' : (ph.sourceIds && ph.sourceIds.length ? '<span class="phrase-src">' + CC.sourceLinks(ph.sourceIds) + '</span>' : '<span class="phrase-src">Written for CultureCompass; waiting for a native-speaker check.</span>')) +
        '<span class="cc-audio-msg" role="status" aria-live="polite"></span>' +
      '</div>' +
    '</' + tag + '>';
  };
  CC.bindAudio = function () { /* delegated globally above; kept for older callers */ };

  /* ---------- toast ---------- */
  CC.toast = function (msg, icon, html) {
    var wrap = document.getElementById('cc-toast');
    if (!wrap) return;
    wrap.innerHTML = '<div class="cc-toast">' + CC.icon(icon || 'info') + '<span class="cc-toast-msg">' + (html ? msg : CC.esc(msg)) + '</span>' +
      '<button type="button" aria-label="Dismiss message">' + CC.icon('close') + '</button></div>';
    wrap.querySelector('button').addEventListener('click', function () { wrap.innerHTML = ''; });
    clearTimeout(CC._toastT);
    CC._toastT = setTimeout(function () { wrap.innerHTML = ''; }, 5000);
  };

  /* ---------- return position (story ↔ theme, scene ↔ country) ---------- */
  CC.returnTo = {
    save: function (data) { try { window.sessionStorage.setItem('cc.return', JSON.stringify(data)); } catch (e) { CC._ret = data; } },
    take: function (page) {
      var d = null;
      try { d = JSON.parse(window.sessionStorage.getItem('cc.return') || 'null'); window.sessionStorage.removeItem('cc.return'); } catch (e) { d = CC._ret || null; CC._ret = null; }
      return d && d.page === page ? d : null;
    }
  };

  /* backups made by any tab (another open tab may repair corrupted data first) that nobody was told about */
  function unseenBackups() {
    var seen = CC.store.get('backupsSeen', []) || [];
    try {
      return Object.keys(window.localStorage).filter(function (k) { return k.indexOf(PREFIX + 'backup.') === 0; })
        .map(function (k) { return k.slice((PREFIX + 'backup.').length); })
        .filter(function (k) { return seen.indexOf(k) === -1; });
    } catch (e) { return []; }
  }

  /* ---------- page shell ---------- */
  CC.updateCount = function (bump) {
    var n = CC.collection.list().length;
    Array.prototype.forEach.call(document.querySelectorAll('[data-coll-count]'), function (el) {
      el.textContent = n;
      el.hidden = n === 0;
      el.setAttribute('aria-label', CC.plural(n, 'saved item'));
      if (bump && !CC.motion.reduce()) { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    });
  };

  /* section: 'destinations' | 'collection' | 'about'; current: exact page key for aria-current */
  CC.renderShell = function (opts) {
    opts = opts || {};
    var links = [
      ['index.html#destinations', 'Destinations', 'destinations'],
      ['collection.html', 'My collection', 'collection'],
      ['about.html', 'About', 'about']
    ];
    var nav = links.map(function (l) {
      var cur = opts.current === l[2];
      var sec = !cur && opts.section === l[2];
      var extra = l[2] === 'collection' ? ' <span class="cc-count" data-coll-count hidden></span>' : '';
      return '<li><a href="' + l[0] + '"' + (cur ? ' aria-current="page"' : '') + (sec ? ' class="is-section"' : '') + '>' + l[1] + extra + '</a></li>';
    }).join('') +
      '<li><button type="button" data-bs-toggle="offcanvas" data-bs-target="#cc-settings" aria-controls="cc-settings">' + CC.icon('sliders') + 'Settings</button></li>';

    var header = document.getElementById('cc-header');
    if (header) {
      header.className = 'cc-header' + (opts.overMedia ? ' is-fixed is-over-media' : '');
      header.innerHTML =
        '<a class="cc-skip" href="#main">Skip to content</a>' +
        '<div class="cc-wrap cc-header-in">' +
          '<a class="cc-brand" href="index.html">' + CC.MARK + '<span>CultureCompass</span></a>' +
          '<button type="button" class="cc-menu-btn" aria-expanded="false" aria-controls="cc-navwrap">' + CC.icon('menu') + 'Menu <span class="cc-count" data-coll-count hidden></span></button>' +
          '<nav class="cc-navwrap" id="cc-navwrap" aria-label="Main"><ul class="cc-nav">' + nav + '</ul></nav>' +
        '</div>';
      var mb = header.querySelector('.cc-menu-btn'), nw = header.querySelector('.cc-navwrap');
      var setMenu = function (open) { mb.setAttribute('aria-expanded', open ? 'true' : 'false'); nw.classList.toggle('is-open', open); };
      mb.addEventListener('click', function () { setMenu(mb.getAttribute('aria-expanded') !== 'true'); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nw.classList.contains('is-open')) { setMenu(false); mb.focus(); } });
      document.addEventListener('click', function (e) { if (nw.classList.contains('is-open') && !header.contains(e.target)) setMenu(false); });
      nw.addEventListener('click', function (e) { if (e.target.closest('a, button')) setMenu(false); });
      if (opts.overMedia) {
        var hero = document.querySelector(opts.overMedia);
        var onScroll = function () {
          /* see-through at the top, and while a pinned opening (.is-flow) still fills the screen behind it;
             solid once anything could scroll under it */
          var over = hero && (window.scrollY < 24 ? hero.getBoundingClientRect().bottom > 200 : hero.classList.contains('is-flow') && hero.getBoundingClientRect().bottom >= window.innerHeight - 2);
          header.classList.toggle('is-over-media', !!over);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      }
    }

    /* country sub-navigation: the same four routes inside every destination */
    var sub = document.getElementById('cc-subnav');
    if (sub && opts.country) {
      var c = CC.byId(CC.countries, opts.country) || { name: opts.country, href: '#' };
      var items = [
        ['vietnam.html#overview', 'Overview', 'overview'],
        ['vietnam.html#themes', 'Themes', 'themes'],
        ['vietnam.html#practice', 'Practise a moment', 'practice'],
        ['phrases.html', 'Phrasebook', 'phrases']
      ];
      sub.className = 'cc-subnav';
      sub.innerHTML = '<nav class="cc-wrap cc-subnav-in" aria-label="' + CC.esc(c.name) + '">' +
        '<a class="cc-subnav-name" href="' + CC.esc(c.href) + '">' + CC.esc(c.name) + '</a><span class="cc-subnav-sep" aria-hidden="true"></span>' +
        '<ul>' + items.map(function (it) {
          return '<li><a href="' + it[0] + '"' + (opts.sub === it[2] ? ' aria-current="' + (it[2] === 'phrases' ? 'page' : 'true') + '"' : '') + '>' + it[1] + '</a></li>';
        }).join('') + '</ul></nav>';
    }

    var footer = document.getElementById('cc-footer');
    if (footer) {
      footer.innerHTML =
        '<footer class="cc-footer"><div class="cc-wrap">' +
          '<div class="cc-footer-grid">' +
            '<div class="cc-footer-about"><p class="cc-footer-mark">' + CC.MARK + 'CultureCompass</p>' +
              '<p>Understand the place before you arrive. A student UX prototype: stories and practice are set in Hà Nội, and customs vary between regions, families and places.</p></div>' +
            '<div><h2>Destinations</h2><ul><li><a href="vietnam.html">Vietnam</a></li><li><a href="vietnam.html#themes">Themes</a></li><li><a href="vietnam.html#practice">Practise a moment</a></li><li><a href="phrases.html">Phrasebook</a></li></ul></div>' +
            '<div><h2>Your trip</h2><ul><li><a href="collection.html">My collection</a></li><li><button type="button" class="cc-footer-btn" data-bs-toggle="offcanvas" data-bs-target="#cc-settings" aria-controls="cc-settings">Sound, motion and text</button></li></ul></div>' +
            '<div><h2>About</h2><ul><li><a href="about.html">Method &amp; scope</a></li><li><a href="about.html#sources">Sources</a></li><li><a href="about.html#credits">Media credits</a></li><li><a href="about.html#access">Accessibility</a></li></ul></div>' +
          '</div>' +
          '<div class="cc-footer-last"><span>© 2026 CultureCompass · student prototype, not a commercial service</span><a href="#main">Back to top</a></div>' +
        '</div></footer>';
    }

    var s = CC.settings.get();
    var reduceState = s.reduceMotion == null ? CC.settings.systemReduce() : s.reduceMotion;
    var oc = document.createElement('div');
    oc.innerHTML =
      '<div class="offcanvas offcanvas-end cc-drawer" tabindex="-1" id="cc-settings" aria-labelledby="cc-settings-title">' +
        '<div class="offcanvas-header"><h2 class="offcanvas-title" id="cc-settings-title">Settings</h2>' +
        '<button type="button" class="cc-close" data-bs-dismiss="offcanvas" aria-label="Close settings">' + CC.icon('close') + '</button></div>' +
        '<div class="offcanvas-body">' +
          '<label class="cc-switch"><strong>Sound</strong><input type="checkbox" role="switch" id="set-sound"' + (s.sound ? ' checked' : '') + '>' +
            '<span class="cc-meta">Phrases play only when you press Listen. Videos are always silent.</span></label>' +
          '<label class="cc-switch"><strong>Reduce motion</strong><input type="checkbox" role="switch" id="set-motion"' + (reduceState ? ' checked' : '') + '>' +
            '<span class="cc-meta" id="set-motion-note">Videos stay still until you press Play; scenes show each action as still steps. ' + (s.reduceMotion == null ? 'Now following your device setting.' : '') + '</span></label>' +
          '<label class="cc-switch"><strong>Text-first scenes</strong><input type="checkbox" role="switch" id="set-text"' + (s.textOnly ? ' checked' : '') + '>' +
            '<span class="cc-meta">The same choices and explanations, with no animation at all.</span></label>' +
          '<h3 class="h4" style="margin-top:28px">Your data</h3>' +
          '<p class="cc-meta" id="set-data-note">Your collection, reading log, scene progress and these settings stay in this browser on this device. Nothing is sent anywhere.</p>' +
          '<button type="button" class="cc-btn cc-btn-quiet cc-btn-sm" id="set-clear">Clear my collection and progress</button>' +
          '<p class="cc-meta" id="set-msg" role="status" aria-live="polite" style="margin-top:10px"></p>' +
        '</div></div>' +
      '<div id="cc-toast" class="cc-toast-wrap" role="status" aria-live="polite"></div>';
    while (oc.firstChild) document.body.appendChild(oc.firstChild);

    CC.$('set-sound').addEventListener('change', function (e) { CC.settings.set({ sound: e.target.checked }); });
    CC.$('set-motion').addEventListener('change', function (e) { CC.settings.set({ reduceMotion: e.target.checked }); CC.$('set-motion-note').textContent = 'Videos stay still until you press Play; scenes show each action as still steps.'; });
    CC.$('set-text').addEventListener('change', function (e) { CC.settings.set({ textOnly: e.target.checked }); });
    CC.$('set-clear').addEventListener('click', function () {
      if (!window.confirm('Remove your collection, reading log and scene progress from this browser? Settings are kept.')) return;
      var ok = CC.store.clearUserData();
      CC.store.set('migrations', { collectionV2: { at: new Date().toISOString(), moved: 0, cleared: true } });
      CC.updateCount();
      syncSaveButtons();
      CC.$('set-msg').textContent = ok ? 'Cleared. Your settings were kept.' : 'Nothing was stored on this browser.';
      document.dispatchEvent(new CustomEvent('cc:cleared'));
    });

    CC.settings.apply();
    CC.updateCount();
    window.addEventListener('storage', function (e) { if (e.key && e.key.indexOf(PREFIX) === 0) { CC.updateCount(); syncSaveButtons(); document.dispatchEvent(new CustomEvent('cc:collection')); } });
    window.addEventListener('pageshow', function (e) { if (e.persisted) { CC.updateCount(); syncSaveButtons(); } });

    setTimeout(function () {
      if (!CC.store.ok) {
        CC.toast('This browser isn’t letting us save. Everything still works, but your collection and progress won’t be remembered after you leave.', 'alert');
        var n = CC.$('set-data-note'); if (n) n.textContent = 'This browser is blocking storage, so nothing can be kept after you leave this page.';
      } else if (CC.store.problems.length || unseenBackups().length) {
        var keys = CC.store.problems.concat(unseenBackups()).filter(function (k, i, a) { return a.indexOf(k) === i; });
        CC.store.set('backupsSeen', (CC.store.get('backupsSeen', []) || []).concat(keys));
        CC.toast('Some saved data on this browser could not be read (' + keys.join(', ') + '). A copy was kept and that part started fresh.', 'alert');
      } else if (CC._migratedCount) {
        CC.toast('Your ' + CC.plural(CC._migratedCount, 'saved card') + ' moved into <a href="collection.html">My collection</a>.', 'bookmarkFill', true);
      }
    }, 500);
  };

  CC.settings.apply();
  migrate();
})();
