/* CultureCompass — Phrasebook, My collection and About. Each page sets <body data-page="…">. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  function scenes() { return CC.scenarios.slice().sort(function (a, b) { return a.order - b.order; }); }

  /* ---------------- Phrasebook ---------------- */
  function phrases() {
    var intentWrap = CC.$('f-intent');
    var opts = [{ id: 'all', label: 'All' }].concat(CC.intents.filter(function (i) {
      return CC.phrases.some(function (p) { return p.intent === i.id; });
    }));
    intentWrap.insertAdjacentHTML('beforeend', opts.map(function (o) {
      return '<label class="cc-chip"><input type="radio" name="intent" value="' + o.id + '"' + (o.id === 'all' ? ' checked' : '') + '><span>' + CC.icon('check') + esc(o.label) + '</span></label>';
    }).join(''));
    var sel = CC.$('f-where');
    var themes = (CC.topics || []).filter(function (t) { return t.status === 'ready' && (t.phraseIds || []).length; });
    sel.innerHTML = '<option value="all">All themes and scenes</option>' +
      '<optgroup label="Themes">' + themes.map(function (t) { return '<option value="topic:' + t.id + '">' + esc(t.label) + '</option>'; }).join('') + '</optgroup>' +
      '<optgroup label="Practice scenes">' + scenes().map(function (s) { return '<option value="scene:' + s.id + '">' + esc(s.title) + '</option>'; }).join('') + '</optgroup>';

    /* deep links: ?scene=sc01 (old links) and ?topic=food; ?intent=thank */
    var qScene = CC.qs('scene'), qTopic = CC.qs('topic'), qIntent = CC.qs('intent');
    if (qScene && CC.byId(CC.scenarios, qScene)) sel.value = 'scene:' + qScene;
    else if (qTopic && CC.byId(themes, qTopic)) sel.value = 'topic:' + qTopic;
    if (qIntent) { var r = intentWrap.querySelector('input[value="' + qIntent + '"]'); if (r) r.checked = true; }

    function draw(fromUser) {
      var intent = (intentWrap.querySelector('input:checked') || {}).value || 'all';
      var where = sel.value;
      var topic = /^topic:/.test(where) ? CC.byId(CC.topics, where.slice(6)) : null;
      var scene = /^scene:/.test(where) ? where.slice(6) : null;
      var list = CC.phrases.filter(function (p) {
        return (intent === 'all' || p.intent === intent) &&
          (!topic || (topic.phraseIds || []).indexOf(p.id) !== -1) &&
          (!scene || p.scenes.indexOf(scene) !== -1);
      });
      var out = CC.$('phrase-list');
      CC.$('phrase-count').textContent = list.length === CC.phrases.length ? 'All ' + list.length + ' phrases' : CC.plural(list.length, 'phrase') + ' of ' + CC.phrases.length;
      if (fromUser && history.replaceState) {
        var q = [];
        if (intent !== 'all') q.push('intent=' + intent);
        if (topic) q.push('topic=' + topic.id);
        if (scene) q.push('scene=' + scene);
        history.replaceState(null, '', location.pathname + (q.length ? '?' + q.join('&') : ''));
      }
      if (!list.length) {
        out.innerHTML = '<li class="cc-empty" style="grid-column:1/-1"><h2 class="h3">No phrase matches both filters</h2><p>Try “All”, or another theme or scene.</p>' +
          '<button type="button" class="cc-btn cc-btn-quiet cc-btn-sm" id="f-reset">Show all phrases</button></li>';
        CC.$('f-reset').addEventListener('click', function () { intentWrap.querySelector('input[value="all"]').checked = true; sel.value = 'all'; draw(true); intentWrap.querySelector('input').focus(); });
        return;
      }
      out.innerHTML = list.map(function (p) { return CC.phraseHtml(p, { tag: 'li', showIntent: true }); }).join('');
    }
    intentWrap.addEventListener('change', function () { draw(true); });
    sel.addEventListener('change', function () { draw(true); });
    document.addEventListener('cc:cleared', function () { CC.syncSaveButtons(); });
    draw(false);
  }

  /* ---------------- My collection ---------------- */
  function collection() {
    var root = CC.$('coll-root');
    var TYPES = [
      ['story', 'Stories', 'story'],
      ['phrase', 'Phrases', 'phrase'],
      ['reminder', 'Reminder cards', 'bookmark']
    ];
    function reminderOf(id) { var sc = CC.scenarios.filter(function (s) { return s.reminder.id === id; })[0]; return sc ? { sc: sc, r: sc.reminder } : null; }
    function removeBtn(it, name) {
      return '<button type="button" class="cc-btn cc-btn-quiet cc-btn-sm" data-remove-type="' + it.type + '" data-remove-id="' + esc(it.id) + '">' + CC.icon('close') + 'Remove<span class="visually-hidden">: ' + esc(name) + '</span></button>';
    }
    function itemHtml(it) {
      if (it.type === 'story') {
        var st = CC.byId(CC.stories, it.id);
        if (!st) return null;
        return '<div class="coll-story"><div class="story-thumb">' + CC.storyPic(st) + '</div><div>' +
          '<h4><a href="story.html?id=' + st.id + '&from=collection">' + esc(st.title) + '</a></h4><p class="cc-small" style="margin:0">' + esc(st.dek) + '</p>' +
          '<div class="cc-meta" style="display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:6px">' + CC.storyMeta(st) + '</div>' +
          '<div class="coll-actions">' + removeBtn(it, st.title) + '</div></div></div>';
      }
      if (it.type === 'phrase') {
        var ph = CC.byId(CC.phrases, it.id);
        if (!ph) return null;
        return CC.phraseHtml(ph, { noSave: true }).replace(/<\/div>$/, '<div class="coll-actions">' + removeBtn(it, ph.vi) + '</div></div>');
      }
      if (it.type === 'reminder') {
        var x = reminderOf(it.id);
        if (!x) return null;
        var r = x.r;
        var ph2 = (r.phraseIds || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
        return '<article class="reminder"><h3>' + esc(r.title) + '</h3>' +
          '<dl><dt>Do</dt><dd>' + esc(r.action) + '</dd>' +
          '<dt>Say</dt><dd>' + ph2.map(function (p) { return '<span lang="vi"><strong>' + esc(p.vi) + '</strong></span> — ' + esc(p.meaning); }).join('<br>') + '</dd>' +
          '<dt>Applies to</dt><dd>' + esc(r.note) + '</dd></dl>' +
          '<p class="cc-meta">' + CC.sourceLinks(CC.sourcesOf(CC.claimsOf(r.claimIds))) + '</p>' +
          '<div class="coll-actions"><a class="cc-btn cc-btn-quiet cc-btn-sm" href="scene.html?id=' + x.sc.id + '">' + CC.icon('scene') + 'Open the scene<span class="visually-hidden">: ' + esc(x.sc.title) + '</span></a>' + removeBtn(it, r.title) + '</div></article>';
      }
      return null;
    }
    function draw() {
      var items = CC.collection.list();
      CC.$('coll-print').hidden = !items.length;
      if (!CC.store.ok) CC.$('coll-storage').textContent = 'This browser is blocking storage, so anything you save lasts only until you leave this page.';
      if (!items.length) {
        root.innerHTML = '<div class="cc-empty"><svg class="cc-empty-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>' +
          '<h2 class="h3">Nothing saved yet</h2><p>Use the bookmark on any story, phrase or reminder card to keep it here for your trip. You can print it all before you go.</p>' +
          '<div class="scene-actions"><a class="cc-btn" href="vietnam.html#themes">Explore Vietnam’s themes ' + CC.arrow() + '</a><a class="cc-btn cc-btn-quiet" href="phrases.html">Open the phrasebook</a></div></div>';
        return;
      }
      var byCountry = {};
      items.forEach(function (it) { var c = it.country || 'vietnam'; (byCountry[c] = byCountry[c] || []).push(it); });
      root.innerHTML = Object.keys(byCountry).map(function (cid) {
        var c = CC.byId(CC.countries, cid) || { name: cid, local: '', start: '' };
        var list = byCountry[cid];
        return '<section class="coll-dest" aria-labelledby="coll-' + esc(cid) + '">' +
          '<div class="coll-dest-head"><h2 id="coll-' + esc(cid) + '">' + esc(c.name) + '</h2><p class="cc-meta"><span lang="vi">' + esc(c.local) + '</span> · ' + esc(c.start) + '</p><p class="cc-meta">' + CC.plural(list.length, 'item') + ' saved</p></div>' +
          '<div>' + TYPES.map(function (T) {
            var of = list.filter(function (x) { return x.type === T[0]; });
            if (!of.length) return '';
            var rows = of.map(function (it) {
              var h = itemHtml(it);
              return '<li class="coll-item" data-key="' + it.type + ':' + esc(it.id) + '">' + (h || '<div class="coll-missing"><p>This saved ' + T[0] + ' (“' + esc(it.id) + '”) is no longer in the content. It may have been renamed.</p><div class="coll-actions">' + removeBtn(it, it.id) + '</div></div>') + '</li>';
            }).join('');
            return '<div class="coll-group"><h3>' + CC.icon(T[2]) + T[1] + ' <span class="cc-count">' + of.length + '</span></h3><ul class="coll-list">' + rows + '</ul></div>';
          }).join('') + '</div></section>';
      }).join('');
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-remove-type]');
      if (!b) return;
      var type = b.getAttribute('data-remove-type'), id = b.getAttribute('data-remove-id');
      var li = b.closest('.coll-item');
      var all = Array.prototype.slice.call(root.querySelectorAll('.coll-item'));
      var nextLi = all[all.indexOf(li) + 1] || all[all.indexOf(li) - 1];
      var nextKey = nextLi ? nextLi.getAttribute('data-key') : null;
      CC.collection.toggle(type, id);
      CC.$('coll-msg').textContent = 'Removed from My collection.';
      var finish = function () {
        draw();
        var target = nextKey && root.querySelector('.coll-item[data-key="' + nextKey + '"] [data-remove-type]');
        (target || CC.$('coll-title')).focus();
      };
      if (CC.motion.reduce()) finish(); else { li.classList.add('is-removing'); setTimeout(finish, 260); }
    });
    CC.$('coll-print').addEventListener('click', function () { window.print(); });
    document.addEventListener('cc:cleared', draw);
    document.addEventListener('cc:collection', function (e) { if (!e.detail) draw(); });
    draw();
  }

  /* ---------------- About ---------------- */
  function about() {
    var typeLabel = { official: 'Official', site: 'Site management', press: 'Press', secondary: 'Secondary', reference: 'Reference' };
    var pendingClaims = CC.claims.filter(function (c) { return c.status === 'needs_verification'; }).length;
    var pendingPhrases = CC.phrases.filter(function (p) { return p.status === 'needs_verification'; }).length;
    var synthetic = CC.assets.filter(function (a) { return a.synthetic; }).length;
    var ready = CC.topics.filter(function (t) { return t.status === 'ready'; });
    var planned = CC.topics.filter(function (t) { return t.status !== 'ready'; });
    var rows = [
      ['Destinations', (CC.countries || []).length + ' (Vietnam, starting in Hà Nội)'],
      ['Themes with stories', ready.length + ' of ' + CC.topics.length + (planned.length ? ' (not written yet: ' + planned.map(function (t) { return t.label; }).join(', ') + ')' : '')],
      ['Stories', CC.stories.length],
      ['Practice scenes', CC.scenarios.length],
      ['Cultural points with sources', CC.claims.filter(function (c) { return c.kind !== 'projectNote'; }).length + ' (' + pendingClaims + ' still being verified)'],
      ['Phrases', CC.phrases.length + ' (' + pendingPhrases + ' waiting for a native-speaker check)'],
      ['Audio recordings', synthetic + ' computer voice, 0 recorded by a person'],
      ['Sources', CC.sources.length]
    ];
    CC.$('status-table').querySelector('tbody').innerHTML = rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('');

    var FB = [['fit', 'check', 'Fits this situation', 'a good choice here, with the reason.'], ['alsoFit', 'swap', 'Another way that also fits', 'there is often more than one good way.'],
      ['needInfo', 'question', 'Needs more context', 'worth rethinking; here is why.'], ['seeGuide', 'info', 'See the rules and guidance', 'a law, a place’s written rule or official guidance says what to do.']];
    CC.$('fb-legend').innerHTML = FB.map(function (f) { return '<li class="fb-' + f[0] + '"><span class="fb-icon">' + CC.icon(f[1]) + '</span><span><b>' + f[2] + '</b>: ' + f[3] + '</span></li>'; }).join('');

    CC.$('src-list').innerHTML = CC.sources.map(function (s) {
      return '<li class="src-item"><div><h3><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '<span class="visually-hidden"> (opens in a new tab)</span></a></h3><p class="cc-meta">' + esc(s.org) + '</p><span class="src-type">' + esc(typeLabel[s.type] || s.type) + '</span></div>' +
        '<dl><dt>Used for</dt><dd>' + esc(s.used) + '</dd></dl><dl><dt>Limits</dt><dd>' + esc(s.limits) + '</dd></dl><dl><dt>Checked</dt><dd>' + esc(s.checked) + '</dd></dl></li>';
    }).join('');

    var media = CC.assets.filter(function (a) { return a.kind !== 'audio'; });
    var audio = CC.assets.filter(function (a) { return a.kind === 'audio'; });
    CC.$('credits-list').innerHTML = media.map(function (a) {
      return '<li>' + esc(a.credit) + (a.sourceUrl ? ', <a href="' + esc(a.sourceUrl) + '" target="_blank" rel="noopener">source</a>' : '') +
        (a.licenseUrl ? ', <a href="' + esc(a.licenseUrl) + '" target="_blank" rel="noopener">' + esc(a.license) + '</a>' : ', ' + esc(a.license)) +
        (a.note ? ' <span class="cc-meta">(' + esc(a.note.replace(/\.$/, '')) + ')</span>' : '') + '</li>';
    }).join('') + (audio.length ? '<li>Audio (' + audio.length + ' phrases): ' + esc(audio[0].credit) + '. ' + esc(audio[0].license) + '</li>' : '');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'phrases') { CC.renderShell({ section: 'destinations', country: 'vietnam', sub: 'phrases' }); phrases(); }
    else if (page === 'collection') { CC.renderShell({ current: 'collection' }); collection(); }
    else if (page === 'about') { CC.renderShell({ current: 'about' }); about(); }
  });
})();
