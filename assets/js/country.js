/* CultureCompass — country page (vietnam.html).
   The cover (title, scope, the Hà Nội clip) and the contents of three places (countries.json → contexts) open the page.
   The atlas: six themes stand around a compass. Hover or focus turns the needle toward a theme and shows its
   question; choosing one draws its line, pops the medallion and opens its stories in the panel.
   - Every theme is a real button (aria-pressed). Planned themes open an honest "not written yet" note.
   - The URL follows the choice (vietnam.html#food), pushed to history, so Back closes the theme.
   - Old links still work: #topic-greetings, #street, #heritage … map through each theme's aliases.
   - Coming back from a story restores the theme, the scroll position and focus on the story you opened.
   Animations never gate input: a new choice interrupts the previous one. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  var COUNTRY = 'vietnam';
  var topics = [], openId = null, needle = -90, pushed = false;
  var $map, $panel, $status;

  function $(id) { return document.getElementById(id); }
  function storiesOf(t) { return (t.storyIds || []).map(function (id) { return CC.byId(CC.stories, id); }).filter(Boolean); }
  function scenesOf(t) { return (t.sceneIds || []).map(function (id) { return CC.byId(CC.scenarios, id); }).filter(Boolean); }
  function findTopic(key) {
    if (!key) return null;
    key = key.replace(/^#/, '').replace(/^topic-/, '');
    return CC.byId(topics, key) || topics.filter(function (t) { return (t.aliases || []).indexOf(key) !== -1; })[0] || null;
  }
  function anim() { return !CC.motion.reduce() && !!window.gsap; }

  /* ---------------- overview ---------------- */
  function initOverview() {
    var ready = topics.filter(function (t) { return t.status === 'ready'; }).length;
    var stories = (CC.stories || []).filter(function (s) { return s.country === COUNTRY; });
    var counts = [[ready, 'themes'], [stories.length, 'stories'], [CC.scenarios.length, 'practice scenes'], [CC.phrases.length, 'phrases']];
    $('country-counts').innerHTML = counts.map(function (c) { return '<li><b>' + c[0] + '</b>' + c[1] + '</li>'; }).join('');

    var first = CC.byId(CC.stories, 'st-family-words') || stories[0];
    $('country-actions').innerHTML =
      '<a class="cc-btn" href="story.html?id=' + first.id + '&from=overview" data-story-link="' + first.id + '">Begin with a story ' + CC.arrow() + '</a>' +
      '<a class="cc-btn cc-btn-quiet" href="#themes" id="go-themes">Browse the themes</a>';
    $('go-themes').addEventListener('click', function (e) { e.preventDefault(); var t = $('themes'); CC.motion.scrollTo(t); t.focus({ preventScroll: true }); });

    /* resume: the most recent scene left part-way, named honestly */
    var inProgress = CC.scenarios.map(function (sc) { return { sc: sc, st: CC.sceneState.get(sc.id) }; })
      .filter(function (x) { return x.st && typeof x.st.step === 'number'; })
      .sort(function (a, b) { return (b.st.at || '').localeCompare(a.st.at || ''); })[0];
    if (inProgress) {
      var e = CC.sceneEntry(inProgress.sc);
      $('country-resume').innerHTML = '<div class="country-resume">' + CC.icon('scene', 'cc-icon-lg') +
        '<p>You were practising <b>' + esc(inProgress.sc.title) + '</b>.</p><a class="cc-btn cc-btn-sm" href="' + e.href + '">' + esc(e.label) + '</a></div>';
    }

    /* the Hà Nội clip: muted, paused when off screen, never autoplays with reduced motion */
    var v = $('country-video'), btn = $('country-video-btn');
    var a = CC.byId(CC.assets, 'vid-train-street');
    if (!a) { v.parentNode.parentNode.hidden = true; return; }
    $('country-video-cap').innerHTML = 'Train Street, Hà Nội: a train passes between houses and shops. Clip: ' + esc(a.credit.split(',')[0]) +
      ', <a href="' + esc(a.licenseUrl) + '" target="_blank" rel="noopener">' + esc(a.license) + '<span class="visually-hidden"> (opens in a new tab)</span></a>.';
    var userPaused = false, visible = true, loaded = false;
    try { userPaused = window.sessionStorage.getItem('cc.countryPaused') === '1'; } catch (err) { /* ignore */ }
    function label(playing) { btn.innerHTML = CC.icon(playing ? 'pause' : 'play') + '<span>' + (playing ? 'Pause' : 'Play') + '</span>'; btn.setAttribute('aria-label', (playing ? 'Pause' : 'Play') + ' the Hà Nội video'); }
    function play() {
      if (!loaded) { v.src = a.file; loaded = true; }
      var p = v.play();
      label(true);
      if (p && p.catch) p.catch(function () { label(false); });
    }
    v.addEventListener('error', function () { label(false); btn.disabled = true; btn.innerHTML = '<span>Video unavailable</span>'; });
    var auto = !CC.motion.reduce() && !CC.motion.lowData() && !userPaused;
    label(false);
    if (auto) play();
    btn.addEventListener('click', function () {
      if (!v.paused) { v.pause(); userPaused = true; label(false); try { window.sessionStorage.setItem('cc.countryPaused', '1'); } catch (err) { /* ignore */ } }
      else { userPaused = false; try { window.sessionStorage.setItem('cc.countryPaused', '0'); } catch (err) { /* ignore */ } play(); }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (!visible) v.pause(); else if (!userPaused && loaded && !CC.motion.reduce()) v.play().catch(function () {}); }, { threshold: 0.2 }).observe(v);
    document.addEventListener('visibilitychange', function () { if (document.hidden) v.pause(); else if (visible && !userPaused && loaded && !CC.motion.reduce()) v.play().catch(function () {}); });
    document.addEventListener('cc:settings', function () { if (CC.motion.reduce() && !v.paused) { v.pause(); label(false); } });
  }

  /* ---------------- contents: three places ---------------- */
  var wide = window.matchMedia('(min-width: 961px) and (hover: hover) and (pointer: fine)');

  function placeHtml(x, i) {
    var img = CC.byId(CC.assets, x.imageId);
    var ph = CC.byId(CC.phrases, x.phraseId);
    var sc = x.sceneId ? CC.byId(CC.scenarios, x.sceneId) : null;
    var id = 'place-' + esc(x.id);
    return '<li class="place" data-place="' + esc(x.id) + '" style="--i:' + i + '">' +
      '<div class="place-head">' +
        '<h3 class="place-title"><button type="button" class="place-pick" id="' + id + '-btn" aria-expanded="true" aria-controls="' + id + '-body ' + id + '-media">' +
          '<span class="place-name">' + esc(x.title) + '</span><span class="visually-hidden">, </span>' +
          '<span class="place-local" lang="vi">' + esc(x.local) + '</span>' +
          '<span class="place-mark" aria-hidden="true">' + CC.icon('arrowRight') + '</span>' +
        '</button></h3>' +
        '<div class="place-body" id="' + id + '-body"><div>' +
          '<p>' + esc(x.line) + '</p>' +
          '<p class="place-links"><a href="' + esc(x.href.replace(/^[^#]*(?=#)/, '')) + '" data-theme-link>Read the stories' + CC.arrow() + '</a>' +
            (sc ? '<a href="' + esc(CC.sceneEntry(sc).href) + '">Practise this moment<span class="visually-hidden">: ' + esc(sc.title) + '</span></a>' : '') + '</p>' +
        '</div></div>' +
      '</div>' +
      '<div class="place-media" id="' + id + '-media" role="group" aria-labelledby="' + id + '-btn">' +
        (img ? '<figure class="place-figure"><div class="place-frame"><img src="' + esc(img.file) + '" alt="' + esc(img.alt) + '" loading="lazy" decoding="async"></div>' +
          '<figcaption class="cc-meta">' + esc(x.caption) + '. Photo: ' + esc(img.credit.split(',')[0]) + ', <a href="' + esc(img.licenseUrl) + '" target="_blank" rel="noopener">' + esc(img.license) + '<span class="visually-hidden"> (opens in a new tab)</span></a>.</figcaption></figure>' : '') +
        (ph ? CC.phraseHtml(ph) : '') +
      '</div>' +
    '</li>';
  }

  function initPlaces() {
    var c = CC.byId(CC.countries, COUNTRY);
    var list = (c && c.contexts) || [];
    var $grid = $('places-grid');
    if (!list.length) { $('places').hidden = true; return; }
    $grid.insertAdjacentHTML('beforeend', '<ol class="places-list" id="places-list">' + list.map(placeHtml).join('') + '</ol>');
    var $list = CC.$('places-list');
    var items = Array.prototype.slice.call($list.querySelectorAll('.place'));
    var active = list[0].id, leaveT = null;

    function open(id) {
      clearTimeout(leaveT);
      if (!wide.matches) return;
      active = id;
      items.forEach(function (li) {
        var on = li.getAttribute('data-place') === id;
        li.classList.toggle('is-open', on);
        li.querySelector('.place-pick').setAttribute('aria-expanded', on ? 'true' : 'false');
        /* closed places keep their links out of the tab order until opened */
        Array.prototype.forEach.call(li.querySelectorAll('.place-body a, .place-media a, .place-media button'), function (el) {
          if (on) el.removeAttribute('tabindex'); else el.setAttribute('tabindex', '-1');
        });
      });
    }
    function sync() {
      $grid.classList.toggle('is-contents', wide.matches);
      if (wide.matches) { open(active); return; }
      items.forEach(function (li) {
        li.classList.add('is-open');
        li.querySelector('.place-pick').setAttribute('aria-expanded', 'true');
        Array.prototype.forEach.call(li.querySelectorAll('[tabindex="-1"]'), function (el) { el.removeAttribute('tabindex'); });
      });
    }
    if (wide.addEventListener) wide.addEventListener('change', sync); else if (wide.addListener) wide.addListener(sync);
    sync();

    /* hover opens after a short pause, so sweeping the pointer across the list doesn't flicker */
    $list.addEventListener('mouseover', function (e) {
      var li = e.target.closest('.place-head') && e.target.closest('.place');
      if (!li || li.getAttribute('data-place') === active) return;
      clearTimeout(leaveT);
      leaveT = setTimeout(function () { open(li.getAttribute('data-place')); }, 90);
    });
    $list.addEventListener('mouseleave', function () { clearTimeout(leaveT); });
    $list.addEventListener('click', function (e) {
      var b = e.target.closest('.place-pick');
      if (b) open(b.closest('.place').getAttribute('data-place'));
    });
    $list.addEventListener('focusin', function (e) {
      var b = e.target.closest('.place-pick');
      if (b) open(b.closest('.place').getAttribute('data-place'));
    });
    /* arrow keys move between the three places */
    $list.addEventListener('keydown', function (e) {
      var b = e.target.closest('.place-pick');
      if (!b || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      var i = items.indexOf(b.closest('.place')) + (e.key === 'ArrowDown' ? 1 : -1);
      if (i < 0 || i >= items.length) return;
      e.preventDefault();
      items[i].querySelector('.place-pick').focus();
    });
  }

  /* ---------------- atlas ---------------- */
  var R = 40;
  function angleOf(i, n) { return -90 + i * (360 / n); }
  function pos(i, n) { var a = angleOf(i, n) * Math.PI / 180; return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }; }

  function turnNeedle(deg) {
    var d = ((deg - needle) % 360 + 540) % 360 - 180; // shortest way round
    needle += d;
    $map.style.setProperty('--needle', needle + 'deg');
  }

  function buildMap() {
    var n = topics.length;
    var lines = topics.map(function (t, i) { var p = pos(i, n); return '<line x1="50" y1="50" x2="' + p.x.toFixed(2) + '" y2="' + p.y.toFixed(2) + '" data-line="' + t.id + '"/>'; }).join('');
    var rays = topics.map(function (t, i) { var p = pos(i, n); return '<line class="atlas-ray" pathLength="100" x1="50" y1="50" x2="' + p.x.toFixed(2) + '" y2="' + p.y.toFixed(2) + '" data-ray="' + t.id + '"/>'; }).join('');
    var c = CC.byId(CC.countries, COUNTRY);
    $map.innerHTML =
      '<svg class="atlas-lines" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="' + R + '" stroke-dasharray="0.6 1.4"/>' + lines + rays + '</svg>' +
      '<div class="atlas-centre" aria-hidden="true"><span class="atlas-needle"></span><span class="atlas-centre-text">' +
        '<span class="atlas-centre-name" lang="vi">' + esc(c.local) + '</span>' +
        '<span class="atlas-centre-q" id="atlas-q">Six ways in. Choose a theme.</span></span></div>' +
      topics.map(function (t, i) {
        var p = pos(i, n);
        var nS = (t.storyIds || []).length;
        var sub = t.status === 'ready' ? CC.plural(nS, 'story', 'stories') : 'Not written yet';
        return '<button type="button" class="atlas-node' + (t.status !== 'ready' ? ' is-planned' : '') + (p.y < 20 ? ' is-top' : '') + '" style="--x:' + p.x.toFixed(2) + '%;--y:' + p.y.toFixed(2) + '%"' +
          ' data-topic="' + t.id + '" data-angle="' + angleOf(i, n) + '" aria-pressed="false" aria-controls="atlas-panel" aria-describedby="atlas-qd-' + t.id + '">' +
          '<span class="atlas-medal">' + ((CC.icons || {})[t.icon] || '') + '</span>' +
          '<span><span class="atlas-label">' + esc(t.label) + '</span><span class="atlas-sub">' + sub + '</span></span>' +
          '<span class="visually-hidden" id="atlas-qd-' + t.id + '">' + esc(t.question) + '</span>' +
        '</button>';
      }).join('');
  }

  var qTimer = null;
  function setQuestion(text) {
    var q = $('atlas-q');
    if (!q || q.textContent === text) return;
    clearTimeout(qTimer);
    if (CC.motion.reduce()) { q.textContent = text; return; }
    q.classList.add('is-swapping');
    qTimer = setTimeout(function () { q.textContent = text; q.classList.remove('is-swapping'); }, 140);
  }
  function hover(t) {
    if (t) { turnNeedle(+$map.querySelector('[data-topic="' + t.id + '"]').getAttribute('data-angle')); setQuestion(t.question); }
    else {
      var o = openId && CC.byId(topics, openId);
      if (o) { turnNeedle(+$map.querySelector('[data-topic="' + o.id + '"]').getAttribute('data-angle')); setQuestion(o.question); }
      else { setQuestion('Six ways in. Choose a theme.'); }
    }
    Array.prototype.forEach.call($map.querySelectorAll('[data-line]'), function (l) { l.classList.toggle('is-hot', !!t && l.getAttribute('data-line') === t.id); });
  }

  function panelDefault() {
    var first = CC.byId(CC.stories, 'st-family-words');
    $panel.innerHTML = '<div class="atlas-panel-in">' +
      '<h3>Where to begin</h3>' +
      '<p class="atlas-panel-q">If you are not sure, start with how people address each other: it shapes almost every encounter.</p>' +
      '<ul class="story-list">' + CC.storyRow(first, 0, 'theme:language') + '</ul>' +
      '<p class="atlas-hint">' + CC.icon('compass') + '<span>Choose a theme on the compass to open its stories. With a keyboard, Tab moves between themes and Enter opens one.</span></p>' +
    '</div>';
  }

  function panelFor(t, animate) {
    var stories = storiesOf(t), scenes = scenesOf(t);
    if (t.status !== 'ready') {
      $panel.innerHTML = '<div class="atlas-panel-in"><div class="atlas-panel-head"><div>' +
        '<h3 id="panel-title" tabindex="-1">' + esc(t.label) + '</h3><span class="cc-vi" lang="vi">' + esc(t.vi) + '</span></div>' +
        '<button type="button" class="cc-close" data-close aria-label="Close ' + esc(t.label) + '">' + CC.icon('close') + '</button></div>' +
        '<p class="atlas-panel-q">' + esc(t.question) + '</p>' +
        '<div class="cc-empty"><svg class="cc-empty-art" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' + ((CC.icons[t.icon] || '').replace(/^<svg[^>]*>|<\/svg>$/g, '')) + '</svg>' +
          '<h4>Not written yet</h4><p>' + esc(t.blurb) + '</p><p class="cc-meta">We only publish stories we can link to a reliable source.</p></div>' +
      '</div>';
      return;
    }
    var from = 'theme:' + t.id;
    $panel.innerHTML = '<div class="atlas-panel-in">' +
      '<div class="atlas-panel-head"><div>' +
        '<h3 id="panel-title" tabindex="-1">' + esc(t.label) + '</h3><span class="cc-vi" lang="vi">' + esc(t.vi) + '</span></div>' +
        '<button type="button" class="cc-close" data-close aria-label="Close ' + esc(t.label) + '">' + CC.icon('close') + '</button></div>' +
      '<p class="atlas-panel-q">' + esc(t.question) + '</p>' +
      '<p class="atlas-panel-stats">' + esc(t.blurb) + '</p>' +
      '<ul class="story-list">' + stories.map(function (s, i) { return CC.storyRow(s, i, from).replace('class="story-row"', 'class="story-row' + (animate ? ' is-reveal' : '') + '"'); }).join('') + '</ul>' +
      '<div class="atlas-panel-foot">' +
        scenes.map(function (sc) { var e = CC.sceneEntry(sc); return '<a class="cc-link" href="' + e.href + '">' + CC.icon('scene') + 'Practise: ' + esc(sc.title) + '</a>'; }).join('') +
        ((t.phraseIds || []).length ? '<a class="cc-link" href="phrases.html?topic=' + t.id + '">' + CC.icon('phrase') + CC.plural(t.phraseIds.length, 'phrase') + ' for this theme</a>' : '') +
      '</div>' +
    '</div>';
  }

  function select(id, opts) {
    opts = opts || {};
    var t = CC.byId(topics, id);
    if (!t) return;
    var same = openId === id;
    openId = id;
    Array.prototype.forEach.call($map.querySelectorAll('.atlas-node'), function (b) {
      var on = b.getAttribute('data-topic') === id;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && opts.animate && anim()) { b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); }
    });
    Array.prototype.forEach.call($map.querySelectorAll('[data-ray]'), function (l) { l.classList.toggle('is-on', l.getAttribute('data-ray') === id); });
    hover(null);
    if (!same || opts.force) panelFor(t, opts.animate && anim());
    if (window.gsap && opts.animate && anim()) {
      window.gsap.fromTo($panel.querySelector('.atlas-panel-in'), { opacity: 0.4, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', overwrite: true });
    }
    $status.textContent = t.status === 'ready' ? t.label + ' opened: ' + CC.plural((t.storyIds || []).length, 'story', 'stories') + '.' : t.label + ': not written yet.';
    if (opts.push) {
      var url = location.pathname + location.search + '#' + id;
      if (history.state && history.state.ccTopic) history.replaceState({ ccTopic: id }, '', url);
      else { history.pushState({ ccTopic: id }, '', url); pushed = true; }
    }
    /* phones: the panel sits below the tiles, so bring it into view */
    if (opts.reveal && window.matchMedia('(max-width: 960px)').matches) CC.motion.scrollTo($panel, 'start');
  }

  function close(opts) {
    opts = opts || {};
    var was = openId;
    openId = null;
    Array.prototype.forEach.call($map.querySelectorAll('.atlas-node'), function (b) { b.setAttribute('aria-pressed', 'false'); });
    Array.prototype.forEach.call($map.querySelectorAll('[data-ray]'), function (l) { l.classList.remove('is-on'); });
    turnNeedle(-90);
    hover(null);
    panelDefault();
    $status.textContent = 'Theme closed.';
    if (opts.history) {
      if (pushed && history.state && history.state.ccTopic) { pushed = false; history.back(); return; }
      history.replaceState(null, '', location.pathname + location.search + '#themes');
    }
    if (opts.focus && was) { var b = $map.querySelector('[data-topic="' + was + '"]'); if (b) b.focus(); }
  }

  function initAtlas() {
    $map = $('atlas-map'); $panel = $('atlas-panel');
    $status = document.createElement('p');
    $status.className = 'visually-hidden'; $status.setAttribute('role', 'status');
    $map.parentNode.appendChild($status);
    $panel.setAttribute('aria-live', 'off');
    buildMap();
    panelDefault();

    $map.addEventListener('mouseover', function (e) { var b = e.target.closest('.atlas-node'); if (b) hover(CC.byId(topics, b.getAttribute('data-topic'))); });
    $map.addEventListener('mouseleave', function () { hover(null); });
    $map.addEventListener('focusin', function (e) { var b = e.target.closest('.atlas-node'); if (b) hover(CC.byId(topics, b.getAttribute('data-topic'))); });
    $map.addEventListener('focusout', function () { setTimeout(function () { if (!$map.contains(document.activeElement)) hover(null); }, 0); });
    $map.addEventListener('click', function (e) {
      var b = e.target.closest('.atlas-node');
      if (!b) return;
      var id = b.getAttribute('data-topic');
      if (openId === id) { close({ history: true }); return; }
      select(id, { push: true, animate: true, reveal: true });
    });
    $panel.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close({ history: true, focus: true }); });
    $('atlas').addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openId) { e.preventDefault(); close({ history: true, focus: true }); }
      /* arrow keys walk around the compass */
      var b = e.target.closest && e.target.closest('.atlas-node');
      if (b && (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp')) {
        e.preventDefault();
        var all = Array.prototype.slice.call($map.querySelectorAll('.atlas-node'));
        var i = all.indexOf(b), d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
        all[(i + d + all.length) % all.length].focus();
      }
    });
    window.addEventListener('popstate', function () {
      var t = findTopic(location.hash);
      if (t) select(t.id, {}); else if (openId) close({});
    });
    /* "Read the stories" in the three places: open that theme on the compass and bring it into view */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-theme-link]');
      var t = a && findTopic(a.getAttribute('href'));
      if (!t || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (history.pushState) history.pushState(null, '', '#' + t.id);
      select(t.id, { animate: true });
      var sec = $('themes');
      CC.motion.scrollTo(sec);
      sec.focus({ preventScroll: true });
    });

    /* first sight of the atlas: themes open out from the compass (once, skipped with reduced motion) */
    if (anim() && 'IntersectionObserver' in window && !findTopic(location.hash)) {
      var medals = $map.querySelectorAll('.atlas-medal, .atlas-node > span:nth-child(2)');
      window.gsap.set(medals, { opacity: 0.25 });
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        window.gsap.fromTo(medals, { opacity: 0.25, scale: 0.7 }, {
          opacity: 1, scale: 1, duration: 0.42, ease: 'back.out(1.6)', stagger: 0.03, clearProps: 'opacity,transform'
        });
      }, { threshold: 0.25 });
      io.observe($map);
      // never leave themes invisible
      setTimeout(function () { window.gsap.set(medals, { clearProps: 'opacity' }); }, 2500);
    }
  }

  /* ---------------- indexes ---------------- */
  function initIndexes() {
    var stories = (CC.stories || []).filter(function (s) { return s.country === COUNTRY; });
    $('story-index').innerHTML = stories.map(function (s) { return CC.storyCard(s, 'index'); }).join('');
    $('stories-sub').textContent = CC.plural(stories.length, 'story', 'stories') + ' in one list, if you prefer to browse. Each is set in Hà Nội and links its sources.';
    $('scene-list').innerHTML = CC.scenarios.slice().sort(function (a, b) { return a.order - b.order; }).map(function (sc) {
      var e = CC.sceneEntry(sc);
      return '<li class="scene-card"><div class="scene-pic">' + CC.sceneThumb(sc.id) + '</div><div class="scene-card-body">' +
        '<div class="scene-card-status"><span class="cc-meta">' + esc(sc.place) + ' · about ' + sc.minutes + ' min</span>' +
          '<span class="cc-tag' + (e.state === 'done' ? ' cc-tag-done' : '') + '">' + (e.state === 'done' ? CC.icon('check') : e.state === 'started' ? CC.icon('clock') : '') + esc(e.status) + '</span></div>' +
        '<h3>' + esc(sc.title) + '</h3><p>' + esc(sc.goal) + '</p>' +
        '<a class="cc-btn cc-btn-sm' + (e.state === 'new' ? ' cc-btn-quiet' : '') + '" href="' + e.href + '">' + esc(e.label) + '<span class="visually-hidden">: ' + esc(sc.title) + '</span> ' + CC.arrow() + '</a>' +
      '</div></li>';
    }).join('');
    var teaser = ['ph-banoi', 'ph-camon', 'ph-no'].map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    $('phrase-teaser').innerHTML = teaser.map(function (p) { return CC.phraseHtml(p, { tag: 'li', compact: true }); }).join('');
    $('phrase-total').textContent = '(' + CC.phrases.length + ')';
  }

  /* remember where a story was opened from, so Back lands on it */
  function trackStoryLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-story-link]');
      if (!a) return;
      var holder = a.closest('[id]');
      CC.returnTo.save({ page: 'vietnam', topic: openId, focus: holder ? holder.id : null, y: window.scrollY });
    });
  }
  function restore() {
    /* the old Hà Nội page anchor */
    if (location.hash === '#scenes' && history.replaceState) { history.replaceState(null, '', location.pathname + '#practice'); document.getElementById('practice').scrollIntoView(); }
    var t = findTopic(location.hash);
    if (t) select(t.id, { force: true });
    var r = CC.returnTo.take('vietnam');
    if (r) {
      if (r.topic && !t) select(r.topic, {});
      var el = r.focus && document.getElementById(r.focus);
      var link = el && el.querySelector('[data-story-link]');
      if (typeof r.y === 'number') window.scrollTo(0, r.y);
      if (link) { link.focus({ preventScroll: true }); if (typeof r.y !== 'number') link.scrollIntoView({ block: 'center' }); }
    } else if (t) {
      document.getElementById('themes').scrollIntoView({ block: 'start' });
    }
  }

  /* entrance: CSS keyframes (they always finish, even when animation frames are throttled) */
  function entrance() {
    if (CC.motion.reduce()) return;
    document.getElementById('overview').classList.add('is-entering');
  }

  document.addEventListener('DOMContentLoaded', function () {
    topics = (CC.topics || []).filter(function (t) { return t.country === COUNTRY; });
    CC.renderShell({ section: 'destinations', country: COUNTRY, sub: 'overview' });
    initOverview();
    initPlaces();
    initAtlas();
    initIndexes();
    function openDirectory() { if (location.hash === '#stories') { var d = document.querySelector('.story-directory'); if (d) d.open = true; } }
    openDirectory();
    window.addEventListener('hashchange', openDirectory);
    trackStoryLinks();
    restore();
    entrance();
    document.addEventListener('cc:cleared', function () { initIndexes(); if (openId) panelFor(CC.byId(topics, openId), false); else panelDefault(); $('country-resume').innerHTML = ''; });
    window.addEventListener('pageshow', function (e) { if (e.persisted) { CC.syncSaveButtons(); } });
  });
})();
