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
      if (sc) return { href: 'scene.html?id=' + sc.id, label: 'Back to the scene: ' + sc.title, topic: t };
    }
    if (from === 'index') return { href: 'vietnam.html#stories', label: 'Back to every story', topic: t };
    if (from === 'overview') return { href: 'vietnam.html#overview', label: 'Back to Vietnam', topic: t };
    if (from === 'collection') return { href: 'collection.html', label: 'Back to My collection', topic: t };
    if (t) return { href: 'vietnam.html#' + t.id, label: 'Back to ' + t.label, topic: t };
    return { href: 'vietnam.html', label: 'Back to Vietnam', topic: null };
  }

  function figure(st) {
    var img = st.imageId ? CC.byId(CC.assets, st.imageId) : null;
    if (img) {
      return '<figure class="story-figure"><div class="frame"><img src="' + esc(img.file) + '" alt="' + esc(img.alt) + '" decoding="async"></div>' +
        '<figcaption>' + esc(img.alt) + ' Photo: ' + esc(img.credit) + ', <a href="' + esc(img.licenseUrl) + '" target="_blank" rel="noopener">' + esc(img.license) + '</a>, via <a href="' + esc(img.sourceUrl) + '" target="_blank" rel="noopener">Wikimedia Commons</a>' + (img.note ? ' (' + esc(img.note.replace(/\.$/, '')) + ')' : '') + '.</figcaption></figure>';
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
    var srcOrder = [];
    function fn(claimIds) {
      var out = '';
      CC.sourcesOf(CC.claimsOf(claimIds)).forEach(function (sid) {
        if (srcOrder.indexOf(sid) === -1) srcOrder.push(sid);
        var n = srcOrder.indexOf(sid) + 1, s = CC.byId(CC.sources, sid);
        out += '<a class="fn" href="#src-' + n + '" aria-label="Source ' + n + ': ' + esc(s ? s.short : sid) + '">' + n + '</a>';
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

    var topicsHtml = CC.storyTopics(st).map(function (t) { return '<a href="vietnam.html#' + t.id + '">' + esc(t.label) + '</a>'; }).join(', ');

    var html =
      '<header class="story-head story-enter">' +
        '<ol class="cc-crumb" aria-label="Breadcrumb"><li><a href="index.html#destinations">Destinations</a></li><li><a href="vietnam.html">Vietnam</a></li>' +
          (back.topic ? '<li><a href="vietnam.html#' + back.topic.id + '">' + esc(back.topic.label) + '</a></li>' : '') +
          '<li><span aria-current="page">Story</span></li></ol>' +
        '<h1 id="story-title" tabindex="-1">' + esc(st.title) + '</h1>' +
        '<p class="story-dek">' + esc(st.dek) + '</p>' +
        '<div class="story-byline">' +
          '<span>' + CC.icon('pin') + esc(st.place) + '</span>' +
          '<span>' + CC.icon('clock') + CC.storyMinutes(st) + ' min read</span>' +
          '<span>' + CC.icon('source') + CC.plural(CC.sourcesOf(claims).length, 'source') + '</span>' +
          (CC.unverified(claims) ? CC.verifyTag() : '<span class="cc-tag">' + CC.icon('check') + 'Every point has a checked source</span>') +
          (topicsHtml ? '<span>In ' + topicsHtml + '</span>' : '') +
        '</div>' +
        '<div class="story-actions">' + CC.saveButton('story', st.id, { cls: '' }) +
          (sc ? '<a class="cc-btn cc-btn-quiet" href="' + entry.href + '">' + CC.icon('scene') + (entry.state === 'started' ? esc(entry.label) : 'Practise this moment') + '</a>' : '') +
        '</div>' +
      '</header>' +
      figure(st) +
      '<div class="story-layout">' +
        '<article class="story-body" aria-labelledby="story-title">' + body + '</article>' +
        '<aside class="story-aside" aria-label="About this story">' +
          '<div class="story-box"><h2>' + CC.icon('pin') + 'Where this applies</h2><p>' + esc(st.appliesTo) + '</p></div>' +
          '<div class="story-box"><h2>' + CC.icon('globe') + 'How it varies</h2><p>' + esc(st.varies) + '</p></div>' +
          (phrases.length ? '<div class="story-box"><h2>' + CC.icon('phrase') + 'Words you can use</h2><div style="display:grid;gap:10px">' +
            phrases.map(function (p) { return CC.phraseHtml(p, { compact: true }); }).join('') + '</div></div>' : '') +
        '</aside>' +
      '</div>' +
      '<section class="cc-section-tight story-sources" aria-labelledby="src-title" style="max-width:var(--measure)">' +
        '<div class="cc-rule cc-rule-left" aria-hidden="true"><i></i></div>' +
        '<h2 id="src-title" class="h3">Sources</h2>' +
        '<ol>' + srcOrder.map(function (sid, k) {
          var s = CC.byId(CC.sources, sid);
          return '<li id="src-' + (k + 1) + '"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '<span class="visually-hidden"> (opens in a new tab)</span></a>' +
            '<div class="cc-meta">' + esc(s.org) + '. Checked ' + esc(s.checked) + '.</div><div class="cc-meta"><b>Limits:</b> ' + esc(s.limits) + '</div></li>';
        }).join('') + '</ol>' +
        (claims.some(function (c) { return c.kind === 'projectNote'; }) ? '<p class="cc-meta" style="margin-top:16px">Points marked “CultureCompass tip” are our own suggestions, not cultural claims, so they have no source.</p>' : '') +
      '</section>' +
      (sc ? '<section class="story-practice" aria-labelledby="practice-title">' +
        '<div class="scene-pic">' + CC.sceneThumb(sc.id) + '</div>' +
        '<div><h2 id="practice-title">Try it in a scene</h2><p>Optional: ' + esc(sc.title) + '. ' + esc(sc.goal) + ' About ' + sc.minutes + ' minutes, no score.</p></div>' +
        '<a class="cc-btn" href="' + entry.href + '">' + esc(entry.label) + ' ' + CC.arrow() + '</a>' +
      '</section>' : '') +
      (prev || next ? '<nav class="story-pager cc-section-tight" aria-label="More in ' + esc(back.topic ? back.topic.label : 'Vietnam') + '">' +
        (prev ? '<a class="prev" href="story.html?id=' + prev.id + keepFrom + '"><span>' + CC.icon('arrowLeft') + 'Previous</span><b>' + esc(prev.title) + '</b></a>' : '<span></span>') +
        (next ? '<a class="next" href="story.html?id=' + next.id + keepFrom + '"><span>Next' + CC.icon('arrowRight') + '</span><b>' + esc(next.title) + '</b></a>' : '') +
      '</nav>' : '') +
      (related.length ? '<section class="cc-section-tight" aria-labelledby="rel-title"><h2 id="rel-title" class="h3">Related stories</h2><ul class="story-grid">' +
        related.map(function (r) { return CC.storyCard(r, from, 3); }).join('') + '</ul></section>' : '') +
      '<p><a class="cc-back" href="' + back.href + '">' + CC.arrow('left') + esc(back.label) + '</a></p>';

    document.getElementById('story-root').innerHTML = html;
    document.title = st.title + ' — CultureCompass';
    CC.reads.mark(st.id);
  }

  function notFound(id) {
    document.title = 'Story not found — CultureCompass';
    document.getElementById('story-root').innerHTML =
      '<div class="cc-section-tight"><div class="cc-empty"><svg class="cc-empty-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5.5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6.5v13"/></svg>' +
      '<h1 class="h2" id="story-title" tabindex="-1">We couldn’t find that story</h1>' +
      '<p>' + (id ? 'There is no story called “' + esc(id) + '”. The link may be out of date.' : 'The link doesn’t say which story to open.') + '</p>' +
      '<p><a class="cc-btn" href="vietnam.html#stories">See every story ' + CC.arrow() + '</a></p></div></div>';
  }

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
