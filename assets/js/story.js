/* CultureCompass — story reader (story.html?id=st-…&from=theme:food).
   Every paragraph carries numbered notes to its sources; unverified points are labelled in place.
   "from" decides where Back goes (the theme, the full index, the overview or a scene) and the reading order. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;

  function backFor(st, from) {
    from = from || '';
    var m = /^theme:([\w-]+)$/.exec(from);
    var topics = CC.storyTopics(st);
    var t = (m && CC.byId(CC.topics, m[1])) || topics[0];
    if (/^scene:/.test(from)) {
      var sc = CC.byId(CC.scenarios, from.slice(6));
      if (sc) return { href: CC.sceneHref(sc.id), label: 'Back to Explore: ' + sc.title, topic: t };
    }
    /* from the reading page: back to the chapter the story was opened from (vietnam.html, explore.js CHAPTERS) */
    var VN = { everyday: 'Everyday life', food: 'Food & the table', beliefs: 'Temples, beliefs & history', places: 'Places in the game' };
    var ch = /^vn:(\w+)$/.exec(from);
    if (ch && VN[ch[1]]) return { href: 'vietnam.html#' + ch[1], label: 'Back to ' + VN[ch[1]], topic: t, page: true };
    if (from === 'index') return { href: 'vietnam.html#contents', label: 'Back to Vietnam', topic: t, page: true };
    if (from === 'overview') return { href: 'vietnam.html#contents', label: 'Back to Vietnam', topic: t, page: true };
    if (from === 'collection') return { href: 'collection.html', label: 'Back to your passport', topic: t };
    if (t) return { href: 'vietnam.html#' + t.id, label: 'Back to ' + t.label, topic: t };
    return { href: 'vietnam.html', label: 'Back to Vietnam', topic: null };
  }

  function figure(st) {
    var img = st.imageId ? CC.byId(CC.assets, st.imageId) : null;
    if (img) {
      return '<figure class="story-figure"><div class="frame"><img src="' + esc(img.file) + '" alt="' + esc(img.alt) + '" decoding="async"></div>' +
        '<figcaption>' + esc(img.alt) + ' ' + CC.creditHtml(img) + '</figcaption></figure>';
    }
    var sc = CC.byId(CC.scenarios, st.sceneId);
    if (!sc || !CC.svgs[sc.id]) return '';
    var svg = CC.svgs[sc.id].replace(/ id="[^"]*"/g, '').replace('class="cc-stage"', 'class="cc-stage cc-thumb-svg"');
    return '<figure class="story-figure"><div class="frame frame-illus">' + svg + '</div>' +
      '<figcaption>AI-generated illustration for CultureCompass; an imagined scene, not a documentary photograph: ' + esc(sc.place) + '.</figcaption></figure>';
  }

  function render(st, from) {
    var back = backFor(st, from);
    var claims = CC.storyClaims(st);
    var srcOrder = [], marked = [];
    function fn(claimIds) {
      var out = '';
      CC.sourcesOf(CC.claimsOf(claimIds)).forEach(function (sid) {
        if (srcOrder.indexOf(sid) === -1) srcOrder.push(sid);
        var n = srcOrder.indexOf(sid) + 1, s = CC.byId(CC.sources, sid);
        /* the first mention of each source is where "Back to the text" returns to */
        var first = marked.indexOf(n) === -1; if (first) marked.push(n);
        out += '<a class="fn" href="#src-' + n + '"' + (first ? ' id="fn-' + n + '"' : '') + ' aria-label="Source ' + n + ': ' + esc(s ? s.short : sid) + '">' + n + '</a>';
      });
      return out;
    }
    var body = st.sections.map(function (sec) {
      var cl = CC.claimsOf(sec.claimIds);
      var tip = !sec.editorial && cl.length && cl.every(function (c) { return c.kind === 'projectNote'; });
      if (sec.editorial) {
        return '<section>' + (sec.heading ? '<h2>' + esc(sec.heading) + '</h2>' : '') +
          '<p class="story-editorial">' + CC.icon('lightbulb') + '<span>' + esc(sec.text) + '</span></p></section>';
      }
      return '<section>' + (sec.heading ? '<h2>' + esc(sec.heading) + '</h2>' : '') +
        '<p>' + esc(sec.text) + fn(sec.claimIds) +
          (CC.unverified(cl) ? CC.verifyTag() : '') +
          (tip ? ' <span class="cc-tag" title="CultureCompass’s own advice, not a cultural claim">' + CC.icon('lightbulb') + 'CultureCompass tip</span>' : '') +
        '</p></section>';
    }).join('');

    var phrases = (st.phraseIds || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    var sc = st.sceneId ? CC.byId(CC.scenarios, st.sceneId) : null;
    var entry = sc ? CC.sceneEntry(sc) : null;

    /* reading order: inside the theme it came from */
    var list = back.topic ? (back.topic.storyIds || []) : (CC.stories || []).map(function (s) { return s.id; });
    var i = list.indexOf(st.id);
    var prev = i > 0 ? CC.byId(CC.stories, list[i - 1]) : null;
    var next = i !== -1 && i < list.length - 1 ? CC.byId(CC.stories, list[i + 1]) : null;
    var keepFrom = from ? '&from=' + encodeURIComponent(from) : '';

    var related = [];
    CC.storyTopics(st).forEach(function (t) { (t.storyIds || []).forEach(function (id) { if (id !== st.id && related.indexOf(id) === -1 && (!next || id !== next.id) && (!prev || id !== prev.id)) related.push(id); }); });
    related = related.slice(0, 3).map(function (id) { return CC.byId(CC.stories, id); }).filter(Boolean);

    /* the story takes its chapter colour from the theme it is read in */
    var bg = CC.ex ? CC.ex.chapterFor(back.topic ? back.topic.id : (CC.storyTopics(st)[0] || {}).id) : 'teal';
    /* [disc fill, glyph on it, ink on the night ground]: the same tones as the chapter on vietnam.html */
    var CH_INK = { teal: ['var(--cyan)', 'var(--cyan-ink)', 'var(--cyan)'], peach: ['var(--gold)', '#2A1E05', 'var(--gold)'], jade: ['#5DCAA5', '#06231B', '#5DCAA5'], ember: ['var(--lacquer)', '#FFF6EE', '#FF8A73'] }[bg] || ['var(--cyan)', 'var(--cyan-ink)', 'var(--cyan)'];
    var root = document.getElementById('story-root');
    root.style.setProperty('--story-bg', CH_INK[0]);
    root.style.setProperty('--story-on', CH_INK[1]);
    root.style.setProperty('--story-ink', CH_INK[2]);
    /* the story's own photograph is the backdrop of its opening; without one, a plain night ground */
    var photo = st.imageId ? CC.byId(CC.assets, st.imageId) : null;
    var nSrc = CC.sourcesOf(claims).length;
    var credit = photo ? '<p class="story-credit">' + CC.creditHtml(photo) + '</p>' : '';

    var html =
      '<header class="story-head story-enter' + (photo ? ' has-photo' : '') + '" data-bg="' + bg + '">' +
        (photo ? '<div class="story-head-media"><img src="' + esc(photo.file) + '" alt="' + esc(photo.alt) + '" decoding="async" fetchpriority="high"></div>' : '') +
        '<ol class="cc-crumb" aria-label="Breadcrumb"><li><a href="index.html#destinations">Destinations</a></li><li><a href="vietnam.html">Vietnam</a></li>' +
          (back.topic ? '<li><a href="vietnam.html#' + back.topic.id + '">' + esc(back.topic.label) + '</a></li>' : '') +
          '<li><span aria-current="page">Story</span></li></ol>' +
        '<h1 id="story-title" tabindex="-1">' + esc(st.title) + '</h1>' +
        '<p class="story-dek">' + esc(st.dek) + '</p>' +
        '<p class="story-byline">' + esc(st.place) + '<span aria-hidden="true"> · </span>' + CC.storyMinutes(st) + ' min read<span aria-hidden="true"> · </span>' +
          '<a href="#src-title">' + CC.plural(nSrc, 'source') + '</a>' + (CC.unverified(claims) ? ' ' + CC.verifyTag() : '') + '</p>' +
        '<div class="story-actions">' +
          (sc ? '<a class="cc-btn" href="' + entry.href + '">' + (entry.state === 'started' ? esc(entry.label) : 'Walk through this moment') + ' ' + CC.arrow() + '</a>' : '') +
          CC.saveButton('story', st.id, { cls: 'cc-btn-quiet' }) +
        '</div>' +
        credit +
      '</header>' +
      (photo ? '' : figure(st)) +
      '<div class="story-layout">' +
        '<article class="story-body" aria-labelledby="story-title">' + body + '</article>' +
        '<aside class="story-aside" aria-label="About this story">' +
          '<div class="story-box"><h2>' + CC.icon('pin') + 'Where this applies</h2><p>' + esc(st.appliesTo) + '</p></div>' +
          '<div class="story-box"><h2>' + CC.icon('globe') + 'How it varies</h2><p>' + esc(st.varies) + '</p></div>' +
        '</aside>' +
      '</div>' +
      (phrases.length ? '<section class="story-words cc-section-tight" aria-labelledby="words-title">' +
        '<h2 id="words-title">' + CC.icon('phrase') + 'Words you can use</h2>' +
        '<ul class="phrase-grid">' + phrases.map(function (p) { return CC.phraseHtml(p, { tag: 'li', compact: true }); }).join('') + '</ul></section>' : '') +
      '<div class="story-close cc-section-tight">' +
      '<section class="story-sources" aria-labelledby="src-title">' +
        '<div class="cc-rule cc-rule-left" aria-hidden="true"><i></i></div>' +
        '<h2 id="src-title" class="h3">Sources</h2>' +
        '<ol>' + srcOrder.map(function (sid, k) {
          var s = CC.byId(CC.sources, sid);
          return '<li id="src-' + (k + 1) + '"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '<span class="visually-hidden"> (opens in a new tab)</span></a>' +
            '<div class="cc-meta">' + esc(s.org) + '. Checked ' + esc(s.checked) + '.</div><div class="cc-meta"><b>Limits:</b> ' + esc(s.limits) + '</div>' +
            (marked.indexOf(k + 1) !== -1 ? '<a class="src-back" href="#fn-' + (k + 1) + '">' + CC.icon('arrowUp') + 'Back to the text<span class="visually-hidden"> where source ' + (k + 1) + ' is cited</span></a>' : '') + '</li>';
        }).join('') + '</ol>' +
        (claims.some(function (c) { return c.kind === 'projectNote'; }) ? '<p class="cc-meta" style="margin-top:16px">Points marked “CultureCompass tip” are our own suggestions, not cultural claims, so they have no source.</p>' : '') +
      '</section>' +
      (sc ? '<section class="story-practice" data-bg="' + bg + '" aria-labelledby="practice-title">' +
        '<div class="scene-pic">' + CC.sceneThumb(sc.id) + '</div>' +
        '<div><h2 id="practice-title">Walk through it in Explore</h2><p>Optional: this moment is part of <b>' + esc((CC.zoneForScene(sc.id) || sc).title) + '</b>, a small pixel-art walk in Hà Nội. ' + esc(sc.goal) + ' About ' + ((CC.zoneForScene(sc.id) || sc).minutes) + ' minutes, no score.</p></div>' +
        '<a class="cc-btn" href="' + entry.href + '">' + esc(entry.label) + ' ' + CC.arrow() + '</a>' +
      '</section>' : '') +
      '</div>' +
      (prev || next ? '<nav class="story-pager cc-section-tight" aria-label="More in ' + esc(back.topic ? back.topic.label : 'Vietnam') + '">' +
        (prev ? '<a class="prev" href="story.html?id=' + prev.id + keepFrom + '"><span>' + CC.icon('arrowLeft') + 'Previous</span><b>' + esc(prev.title) + '</b></a>' : '<span></span>') +
        (next ? '<a class="next" href="story.html?id=' + next.id + keepFrom + '"><span>Next' + CC.icon('arrowRight') + '</span><b>' + esc(next.title) + '</b></a>' : '') +
      '</nav>' : '') +
      (related.length ? '<section class="cc-section-tight" aria-labelledby="rel-title"><h2 id="rel-title" class="h3">Related stories</h2><ul class="story-grid">' +
        related.map(function (r) { return CC.storyCard(r, from, 3); }).join('') + '</ul></section>' : '') +
      '<p><a class="cc-back" href="' + back.href + '"' + (back.page ? ' data-back-page' : '') + '>' + CC.arrow('left') + esc(back.label) + '</a></p>';

    root.innerHTML = html;
    var head = root.querySelector('.story-head');
    if (head) head.classList.add('ex-page-hero');
    document.title = st.title + ' — CultureCompass';
    CC.reads.mark(st.id);
  }

  function notFound(id) {
    document.title = 'Story not found — CultureCompass';
    document.getElementById('story-root').innerHTML =
      '<div class="cc-section-tight"><div class="cc-empty"><svg class="cc-empty-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5.5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6.5v13"/></svg>' +
      '<h1 class="h2" id="story-title" tabindex="-1">We couldn’t find that story</h1>' +
      '<p>' + (id ? 'There is no story called “' + esc(id) + '”. The link may be out of date.' : 'The link doesn’t say which story to open.') + '</p>' +
      '<p><a class="cc-btn" href="vietnam.html#contents">See every story ' + CC.arrow() + '</a></p></div></div>';
  }

  /* Back to the reading page: when you came straight from it, go back in history, so the page opens where you were
     (the same card, not the top of the chapter). Otherwise the link's own chapter address is used. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-back-page]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    var came = null;
    try { came = sessionStorage.getItem('cc.readingOpened'); } catch (x) { /* storage blocked: use the link */ }
    if (came && came === location.search && history.length > 1) { e.preventDefault(); history.back(); }
  });

  document.addEventListener('DOMContentLoaded', function () {
    CC.renderShell({ section: 'destinations', country: 'vietnam', sub: 'themes' });
    var id = CC.qs('id');
    var st = id && CC.byId(CC.stories, id);
    if (!st) { notFound(id); return; }
    var from = CC.qs('from');
    render(st, from);
    /* leaving for another story or a scene: remember to come back to the top of this one */
    if (CC.motion.reduce()) Array.prototype.forEach.call(document.querySelectorAll('.story-enter > *'), function (el) { el.style.animation = 'none'; });
    document.addEventListener('cc:cleared', function () { render(st, from); });
  });
})();
