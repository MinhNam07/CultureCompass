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
      '<optgroup label="Moments in Explore">' + scenes().map(function (s) { return '<option value="scene:' + s.id + '">' + esc(s.title) + '</option>'; }).join('') + '</optgroup>';

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
      out.classList.toggle('is-grouped', intent === 'all');
      if (intent !== 'all') {
        out.innerHTML = list.map(function (p) { return CC.phraseHtml(p, { tag: 'li', sources: false }); }).join('');
        return;
      }
      /* "All" reads as a phrasebook: one group per thing you want to do */
      out.innerHTML = CC.intents.map(function (it) {
        var of = list.filter(function (p) { return p.intent === it.id; });
        if (!of.length) return '';
        return '<li class="phrase-group" style="--n:' + of.length + '"><h2 class="phrase-group-title">' + esc(it.label) + ' <span class="cc-count">' + of.length + '</span></h2>' +
          '<ul class="phrase-grid">' + of.map(function (p) { return CC.phraseHtml(p, { tag: 'li', sources: false }); }).join('') + '</ul></li>';
      }).join('');
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
    /* Explore progress, read from the game's own save (cc.explore): a stamp for every place where each moment is done,
       and the facts found there. Shown here so the passport holds the stamps and journal facts the game promises.
       They are cleared with Settings › Clear my collection and progress, not one by one. */
    function sceneKey(z, k) { return k.indexOf(':') === -1 ? (z.scenes ? z.scenes[0] : z.sceneId) + ':' + k : k; }
    function exploreByCountry() {
      var saves = ((CC.store.get('explore', {}) || {}).zones) || {};
      var out = {};
      (CC.exploreZones || []).forEach(function (z) {
        var s = saves[z.id] || null;
        var objs = z.objectives || [];
        var k = objs.filter(function (o) { var st = s && s.steps && (s.steps[sceneKey(z, o.step)] || s.steps[o.step]); return !!(st && st.choice); }).length;
        var found = s ? Object.keys(s.facts || {}) : [];
        var facts = (z.facts || []).filter(function (f) { return found.indexOf(f.id) !== -1; });
        var c = z.country || 'vietnam';
        var e = out[c] = out[c] || { zones: [], stamps: 0, facts: 0 };
        var done = !!(s && s.done) || (objs.length > 0 && k === objs.length);
        e.zones.push({ z: z, done: done, k: k, n: objs.length, facts: facts });
        if (done) e.stamps++;
        e.facts += facts.length;
      });
      Object.keys(out).forEach(function (c) { if (!out[c].stamps && !out[c].facts) delete out[c]; });
      return out;
    }
    function exploreHtml(e) {
      var stamps = e.zones.map(function (x) {
        var state = x.done ? 'Stamped' : x.k ? x.k + ' of ' + x.n + ' moments' : x.facts.length ? 'Started' : 'Not visited yet';
        return '<li class="coll-stamp' + (x.done ? ' is-done' : '') + '">' +
          '<span class="coll-stamp-mark" aria-hidden="true"><span>' + esc(x.z.stamp || x.z.title) + '</span><small>' + esc(x.z.place) + '</small></span>' +
          '<span class="coll-stamp-text"><a href="explore.html?zone=' + esc(x.z.id) + '">' + esc(x.z.title) + '</a><span class="cc-meta">' + state + '</span></span></li>';
      }).join('');
      var facts = e.zones.filter(function (x) { return x.facts.length; }).map(function (x) {
        return '<div class="coll-facts-place"><h4>' + esc(x.z.title) + ' <span class="cc-meta">' + CC.plural(x.facts.length, 'fact') + '</span></h4><ul class="coll-facts">' +
          x.facts.map(function (f) {
            var st = f.storyId && CC.byId(CC.stories, f.storyId);
            return '<li class="coll-fact"><h5>' + esc(f.title) + '</h5><p>' + esc(f.text) + '</p>' +
              (st ? '<p class="coll-fact-link"><a href="story.html?id=' + esc(st.id) + '&amp;from=collection">Read the story: ' + esc(st.title) + '</a></p>' : '') + '</li>';
          }).join('') + '</ul></div>';
      }).join('');
      return '<div class="coll-group" data-type="stamp"><h3>' + CC.icon('compass') + 'Passport stamps <span class="cc-count">' + e.stamps + ' of ' + e.zones.length + '</span></h3>' +
          '<p class="cc-meta coll-group-note">One stamp for each place in Explore where you finish every moment.</p><ul class="coll-stamps">' + stamps + '</ul></div>' +
        (e.facts ? '<div class="coll-group" data-type="fact"><h3>' + CC.icon('lightbulb') + 'Facts from your journal <span class="cc-count">' + e.facts + '</span></h3>' +
          '<p class="cc-meta coll-group-note">Everything you found while walking. To start again, use Settings › Clear my collection and progress.</p>' + facts + '</div>' : '');
    }
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
        return CC.phraseHtml(ph, { noSave: true, sources: false }).replace(/<\/div>$/, '<div class="coll-actions">' + removeBtn(it, ph.vi) + '</div></div>');
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
          '<div class="coll-actions"><a class="cc-btn cc-btn-quiet cc-btn-sm" href="' + CC.sceneHref(x.sc.id) + '">' + CC.icon('scene') + 'Explore this place<span class="visually-hidden">: ' + esc(x.sc.title) + '</span></a>' + removeBtn(it, r.title) + '</div></article>';
      }
      return null;
    }
    function draw() {
      var items = CC.collection.list();
      var explore = exploreByCountry();
      var any = items.length || Object.keys(explore).length;
      CC.$('coll-print').hidden = !any;
      if (!CC.store.ok) CC.$('coll-storage').textContent = 'This browser is blocking storage, so anything you save lasts only until you leave this page.';
      if (!any) {
        root.innerHTML = '<div class="cc-empty"><svg class="cc-empty-art" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>' +
          '<h2 class="h3">Nothing here yet</h2><p>Walk through a place in Explore to collect its stamp and journal facts, or use the bookmark on any story, phrase or reminder card to keep it here for your trip. You can print it all before you go.</p>' +
          '<div class="scene-actions"><a class="cc-btn" href="explore.html">Play Vietnam ' + CC.arrow() + '</a><a class="cc-btn cc-btn-quiet" href="vietnam.html">Read about Vietnam</a></div></div>';
        return;
      }
      var byCountry = {};
      items.forEach(function (it) { var c = it.country || 'vietnam'; (byCountry[c] = byCountry[c] || []).push(it); });
      Object.keys(explore).forEach(function (c) { byCountry[c] = byCountry[c] || []; });
      root.innerHTML = Object.keys(byCountry).map(function (cid) {
        var c = CC.byId(CC.countries, cid) || { name: cid, local: '', start: '' };
        var list = byCountry[cid];
        var ex = explore[cid];
        return '<section class="coll-dest" aria-labelledby="coll-' + esc(cid) + '">' +
          '<div class="coll-dest-head"><h2 id="coll-' + esc(cid) + '">' + esc(c.name) + '</h2><p class="cc-meta"><span lang="vi">' + esc(c.local) + '</span> · ' + esc(c.start) + '</p><p class="cc-meta">' + (ex ? CC.plural(ex.stamps, 'stamp') + ' · ' : '') + CC.plural(list.length, 'item') + ' saved</p></div>' +
          '<div>' + (ex ? exploreHtml(ex) : '') + TYPES.map(function (T) {
            var of = list.filter(function (x) { return x.type === T[0]; });
            if (!of.length) return '';
            var rows = of.map(function (it) {
              var h = itemHtml(it);
              return '<li class="coll-item" data-key="' + it.type + ':' + esc(it.id) + '">' + (h || '<div class="coll-missing"><p>This saved ' + T[0] + ' (“' + esc(it.id) + '”) is no longer in the content. It may have been renamed.</p><div class="coll-actions">' + removeBtn(it, it.id) + '</div></div>') + '</li>';
            }).join('');
            return '<div class="coll-group" data-type="' + T[0] + '"><h3>' + CC.icon(T[2]) + T[1] + ' <span class="cc-count">' + of.length + '</span></h3><ul class="coll-list">' + rows + '</ul></div>';
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
      CC.$('coll-msg').textContent = 'Removed from your passport.';
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
    var pendingPhrases = CC.phrases.filter(function (p) { return p.status === 'needs_verification'; }).length;
    var synthetic = CC.assets.filter(function (a) { return a.synthetic; }).length;
    var ready = CC.topics.filter(function (t) { return t.status === 'ready'; });
    var planned = CC.topics.filter(function (t) { return t.status !== 'ready'; });
    var rows = [
      ['Destinations', (CC.countries || []).length + ' (Vietnam, starting in Hà Nội)'],
      ['Themes with stories', ready.length + ' of ' + CC.topics.length + (planned.length ? ' (not written yet: ' + planned.map(function (t) { return t.label; }).join(', ') + ')' : '')],
      ['Stories', CC.stories.length],
      ['Places to explore', (CC.exploreZones || []).length],
      ['Phrases', CC.phrases.length + ' (' + pendingPhrases + ' waiting for a native-speaker check)'],
      ['Audio recordings', synthetic + ' computer voice, 0 recorded by a person']
    ];
    CC.$('status-table').querySelector('tbody').innerHTML = rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('');

    var FB = [['fit', 'check', 'Fits this situation', 'a good choice here, with the reason.'], ['alsoFit', 'swap', 'Another way that also fits', 'there is often more than one good way.'],
      ['needInfo', 'question', 'Needs more context', 'worth rethinking; here is why.'], ['seeGuide', 'info', 'See the rules and guidance', 'a law, a place’s written rule or official guidance says what to do.']];
    CC.$('fb-legend').innerHTML = FB.map(function (f) { return '<li class="fb-' + f[0] + '"><span class="fb-icon">' + CC.icon(f[1]) + '</span><span><b>' + f[2] + '</b>: ' + f[3] + '</span></li>'; }).join('');



    /* the contents rail marks the section you are reading */
    var links = Array.prototype.slice.call(document.querySelectorAll('.doc-toc a'));
    if (links.length && 'IntersectionObserver' in window) {
      var seen = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { seen[en.target.id] = en.isIntersecting; });
        var first = links.filter(function (a) { return seen[a.hash.slice(1)]; })[0];
        if (!first) return;
        links.forEach(function (a) { if (a === first) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      }, { rootMargin: '-20% 0px -55% 0px' });
      links.forEach(function (a) { var t = document.getElementById(a.hash.slice(1)); if (t) io.observe(t); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'phrases') { CC.renderShell({ section: 'destinations', country: 'vietnam', sub: 'phrases' }); phrases(); }
    else if (page === 'collection') { CC.renderShell({ current: 'collection' }); collection(); }
    else if (page === 'about') { CC.renderShell({ current: 'about' }); about(); }
  });
})();
