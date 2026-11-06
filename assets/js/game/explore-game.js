/* CultureCompass — Explore mode page (explore.html?zone=van-mieu | homestay).
   Walk around a place, unlock facts by looking at things and talking to people, and meet the moments of one or more
   practice scenarios (CC.scenarios) on the spot. Choices that don't fit show what happens, explain why, and let you
   choose again.
   Content: CC.exploreZones (assets/data/explore.json), CC.scenarios / CC.claims (scenarios.json), CC.maps (assets/game/maps).
   A moment is named "<sceneId>:<stepId>" (e.g. "sc01:s2"); map zones may use a bare step id for the zone's first scene.
   Progress: CC.store 'explore' → { zones: { <id>: { steps: { "sc01:s1": { choice, tried: [] } }, facts: { id: iso }, pos: { map, x, y }, done } } }. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  var zone, eng, state, frame, dialog, panel, mapId;
  var FB = {
    fit: { label: 'Fits this situation', icon: 'check', ok: true },
    alsoFit: { label: 'Another way that also fits', icon: 'swap', ok: true },
    needInfo: { label: 'Needs more context', icon: 'question', ok: false },
    seeGuide: { label: 'See the rules and guidance', icon: 'info', ok: false }
  };
  var SOUNDS = { chime: 'assets/game/audio/chime.mp3', wind: 'assets/game/audio/wind.mp3', water: 'assets/game/audio/water.mp3', open: 'assets/game/audio/open.mp3' };
  var PLAYER = { run: 'assets/game/vendor/limezu-interiors-free/Characters_free/Amelia_run_16x16.png', idle: 'assets/game/vendor/limezu-interiors-free/Characters_free/Amelia_idle_anim_16x16.png' };

  /* ---------- content helpers ---------- */
  function scenes() { return (zone.scenes || [zone.sceneId]).map(function (id) { return CC.byId(CC.scenarios, id); }).filter(Boolean); }
  function key(k) { return !k ? k : (k.indexOf(':') === -1 ? scenes()[0].id + ':' + k : k); }
  function moment(k) {
    k = key(k);
    var parts = k.split(':');
    var sc = CC.byId(CC.scenarios, parts[0]);
    var step = sc && sc.steps.filter(function (s) { return s.id === parts[1]; })[0];
    return step ? { key: k, sc: sc, step: step } : null;
  }
  function objectiveIndex(k) { var i = -1; zone.objectives.forEach(function (o, j) { if (key(o.step) === k) i = j; }); return i; }
  function encounter(k) { return zone.encounters[k] || {}; }
  function factById(id) { return zone.facts.filter(function (f) { return f.id === id; })[0]; }

  /* ---------- state ---------- */
  function load() {
    var all = CC.store.get('explore', {}) || {};
    all.zones = all.zones || {};
    state = all.zones[zone.id] || { steps: {}, facts: {} };
    state.steps = state.steps || {}; state.facts = state.facts || {};
    // older saves used bare step ids
    Object.keys(state.steps).forEach(function (k) { if (k.indexOf(':') === -1) { state.steps[key(k)] = state.steps[k]; delete state.steps[k]; } });
  }
  function save() {
    var all = CC.store.get('explore', {}) || {};
    all.zones = all.zones || {};
    all.zones[zone.id] = state;
    CC.store.set('explore', all);
  }
  function done(k) { k = key(k); return !!(state.steps[k] && state.steps[k].choice); }
  function currentObjective() { return zone.objectives.filter(function (o) { return !done(o.step); })[0] || null; }
  function doneCount() { return zone.objectives.filter(function (o) { return done(o.step); }).length; }

  /* ---------- sound ---------- */
  var music = null, started = false;
  function soundOn() { return CC.store.get('exploreSound', true) !== false; }
  function play(name) {
    if (!soundOn() || !SOUNDS[name]) return;
    try { var a = new Audio(SOUNDS[name]); a.volume = 0.55; var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) { /* no audio */ }
  }
  function startMusic() {
    if (!zone.music || !soundOn()) return;
    if (!music) { music = new Audio(zone.music); music.loop = true; music.volume = 0.28; }
    var p = music.play(); if (p && p.catch) p.catch(function () {});
  }
  function syncSound() {
    var b = CC.$('gx-sound');
    b.setAttribute('aria-pressed', soundOn() ? 'true' : 'false');
    b.querySelector('span').textContent = soundOn() ? 'Sound on' : 'Sound off';
    b.setAttribute('aria-label', soundOn() ? 'Sound on' : 'Sound off');
    if (!soundOn() && music) music.pause();
    else if (soundOn() && started) startMusic();
  }

  /* ---------- people who appear or leave as the story moves on ---------- */
  function syncPeople() {
    eng.npcs.forEach(function (n) {
      var p = n.props || {};
      n.hidden = !!((p.showAfter && !done(p.showAfter)) || (p.hideAfter && done(p.hideAfter)));
    });
  }

  /* ---------- HUD: goal + compass ---------- */
  function goalTarget(o) {
    // a target on another map: point at the door that leads there
    if (!o) return null;
    if (!o.map || o.map === mapId) return eng.targets[o.target] ? o.target : null;
    var d = eng.doors.filter(function (x) { return x.props.to === o.map; })[0];
    if (!d) return null;
    eng.targets['__door'] = { x: d.x + d.w / 2, y: d.y + d.h / 2 };
    return '__door';
  }
  function updateGoal() {
    var o = currentObjective();
    CC.$('gx-goal-count').textContent = doneCount() + ' of ' + zone.objectives.length + ' moments';
    var next = o ? null : nextZone();
    CC.$('gx-goal-text').textContent = o ? o.text : (next ? 'Place done — next: ' + next.title : 'Place done — choose another place');
    CC.$('gx-needle').style.opacity = o ? '1' : '0';
    syncNext(!o, next);
    syncPeople();
    eng.markers = {};
    zone.objectives.forEach(function (ob) {
      var enc = encounter(key(ob.step));
      if (enc.npc && !done(ob.step)) eng.markers[enc.npc] = 'quest';
    });
    eng.hotspots.forEach(function (h) { if (h.props.fact && !state.facts[h.props.fact]) eng.markers[h.id] = 'look'; });
    eng.npcs.forEach(function (n) { if (!eng.markers[n.id] && n.props.fact && !state.facts[n.props.fact]) eng.markers[n.id] = 'look'; });
    CC.$('gx-journal-count').textContent = Object.keys(state.facts).length;
  }
  /* ---------- place finished: the Map button blinks and points at the next place ---------- */
  function nextZone() {
    var all = (CC.store.get('explore', {}) || {}).zones || {};
    var list = (CC.exploreZones || []).filter(function (z) { return z.country === zone.country; });
    var i = list.indexOf(zone);
    var after = list.slice(i + 1).concat(list.slice(0, Math.max(i, 0)));
    return after.filter(function (z) { return !(all[z.id] && all[z.id].done); })[0] || null;
  }
  function syncNext(complete, next) {
    var btn = CC.$('gx-map'), goal = CC.$('gx-goal');
    btn.classList.toggle('is-next', complete);
    goal.classList.toggle('is-complete', complete);
    btn.querySelector('span').textContent = complete ? 'Next place' : 'Map';
    btn.href = 'explore.html#' + encodeURIComponent(complete && next ? next.id : zone.id);
    btn.setAttribute('aria-label', complete
      ? 'You finished this place. Map of Hà Nội: ' + (next ? 'next place is ' + next.title : 'choose another place')
      : 'Map of Hà Nội: choose another place');
  }

  function tickCompass() {
    var o = currentObjective();
    var needle = CC.$('gx-needle');
    var t = goalTarget(o);
    if (t && eng.player) {
      var a = eng.angleTo(t);
      var near = eng.distanceTo(t) < 40;
      needle.style.opacity = near ? '.35' : '1';
      if (a != null) needle.style.transform = 'rotate(' + (a * 180 / Math.PI).toFixed(1) + 'deg)';
      CC.$('gx-goal').classList.toggle('is-here', near);
    }
    requestAnimationFrame(tickCompass);
  }

  /* ---------- facts ---------- */
  function sourcesHtml(claimIds) {
    var srcs = CC.sourcesOf(CC.claimsOf(claimIds));
    return srcs.length ? '<p class="cc-src">' + CC.sourceLinks(srcs) + '</p>' : '';
  }
  function verify(claimIds) { return CC.unverified(CC.claimsOf(claimIds)) ? ' ' + CC.verifyTag() : ''; }
  function storyLink(id) {
    var st = id && CC.byId(CC.stories, id);
    if (!st) return '';
    var read = CC.reads.has(st.id);
    return '<a class="gx-link' + (read ? ' is-read' : '') + '" href="' + storyHref(st) + '">' + CC.icon(read ? 'check' : 'story') +
      (read ? 'Read again: ' : 'Read: ') + esc(st.title) + (read ? '<span class="visually-hidden"> (you have read this)</span>' : '') + '</a>';
  }
  /* stories open with a Back link to this place */
  function storyHref(st) { return 'story.html?id=' + esc(st.id) + (st.sceneId ? '&amp;from=scene:' + esc(st.sceneId) : ''); }
  /* stories you have already read that belong to this moment's scene */
  function readHint(m) {
    var sc = CC.byId(CC.scenarios, m.key.split(':')[0]);
    var read = ((sc && sc.storyIds) || []).map(function (id) { return CC.byId(CC.stories, id); }).filter(function (st) { return st && CC.reads.has(st.id); });
    if (!read.length) return '';
    return '<p class="gx-readhint">' + CC.icon('story') + 'You read “' + esc(read[0].title) + '”. It may help here.</p>';
  }
  function factCard(f) {
    return '<article class="gx-fact"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + verify(f.claimIds) + '</p>' +
      sourcesHtml(f.claimIds) + storyLink(f.storyId) + '</article>';
  }
  function unlock(id, opts) {
    var f = factById(id);
    if (!f) return false;
    var fresh = !state.facts[id];
    if (fresh) {
      state.facts[id] = new Date().toISOString();
      save();
      play(f.sound || 'chime');
      if (!(opts && opts.quiet)) toast(f);
      updateGoal();
    }
    return fresh;
  }
  var toastT;
  function toast(f) {
    var t = CC.$('gx-toast');
    t.innerHTML = '<span class="gx-toast-k">' + CC.icon('lightbulb') + 'New in your journal</span><b>' + esc(f.title) + '</b>' +
      '<button type="button" class="gx-toast-btn" data-fact="' + esc(f.id) + '">Open</button>';
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.hidden = true; }, 5200);
  }

  /* ---------- dialog (bottom of the frame) ---------- */
  var open = null, returnFocus = null;
  function showDialog(html, label) {
    eng.frozen = true; eng.releaseKeys();
    returnFocus = returnFocus || document.activeElement;
    dialog.innerHTML = html;
    dialog.setAttribute('aria-label', label || 'Conversation');
    dialog.hidden = false;
    var first = dialog.querySelector('[data-autofocus]') || dialog.querySelector('button:not([disabled]), a');
    if (first) first.focus({ preventScroll: true });
  }
  function closeDialog() {
    dialog.hidden = true;
    dialog.innerHTML = '';
    open = null;
    if (panel.hidden) eng.frozen = false;
    frame.focus({ preventScroll: true });
    returnFocus = null;
  }
  var continueKey = '<kbd class="gx-key" aria-hidden="true">E</kbd>';
  function continueBtn() { return '<button type="button" class="cc-btn cc-btn-sm" data-act="close" data-autofocus aria-keyshortcuts="E">Continue' + continueKey + '</button>'; }
  function say(speaker, line) {
    showDialog('<p class="gx-who">' + esc(speaker) + '</p><p class="gx-text">' + esc(line) + '</p><div class="gx-actions">' + continueBtn() + '</div>', speaker);
  }

  function promptHtml(m) {
    var idx = objectiveIndex(m.key);
    var tried = (state.steps[m.key] && state.steps[m.key].tried) || [];
    var enc = encounter(m.key);
    return '<p class="gx-who">Moment ' + (idx + 1) + ' of ' + zone.objectives.length + (enc.where ? ' · ' + esc(enc.where) : '') + '</p>' +
      '<p class="gx-text">' + esc(m.step.prompt) + '</p>' +
      (m.step.cue ? '<p class="gx-cue">' + CC.icon('lightbulb') + esc(m.step.cue) + '</p>' : '') +
      (tried.length ? '' : readHint(m)) +
      '<ol class="gx-choices">' + m.step.choices.map(function (ch, i) {
        var t = tried.indexOf(ch.id) !== -1;
        return '<li><button type="button" class="gx-choice" data-choice="' + esc(ch.id) + '"' + (t ? ' disabled' : '') + '>' +
          '<span class="gx-key" aria-hidden="true">' + (i + 1) + '</span><span>' + esc(ch.label) + '</span>' +
          (t ? '<span class="gx-tried">Tried</span>' : '') + '</button></li>';
      }).join('') + '</ol>';
  }
  function startEncounter(k) {
    var m = moment(k);
    if (!m || done(m.key) || open || !dialog.hidden || !panel.hidden) return;
    open = m;
    var enc = encounter(m.key);
    if (enc.npc) eng.emote(enc.npc, '!', 1.2);
    play('open');
    showDialog(promptHtml(m), 'Moment: ' + m.step.prompt);
  }
  function feedbackHtml(ch) {
    var meta = FB[ch.type] || FB.seeGuide;
    var phrases = (ch.phraseIds || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    return '<div class="fb fb-' + ch.type + '"><div class="fb-head"><span class="fb-icon">' + CC.icon(meta.icon) + '</span><span>' + meta.label + '</span></div>' +
      '<p>' + esc(ch.feedback) + verify(ch.claimIds) + '</p>' + sourcesHtml(ch.claimIds) + '</div>' +
      (phrases.length ? '<div class="gx-phrases"><p class="gx-who">Words you can use</p>' + phrases.map(function (p) { return CC.phraseHtml(p, { compact: true }); }).join('') + '</div>' : '');
  }
  function choose(chId) {
    var m = open;
    if (!m) return;
    var ch = m.step.choices.filter(function (c) { return c.id === chId; })[0];
    if (!ch) return;
    var meta = FB[ch.type] || FB.seeGuide;
    var st = state.steps[m.key] = state.steps[m.key] || { tried: [] };
    if (meta.ok) {
      st.choice = ch.id;
      save();
      play('chime');
      showDialog('<p class="gx-who">You chose</p><p class="gx-text gx-chosen">' + esc(ch.label) + '</p>' + feedbackHtml(ch) +
        '<div class="gx-actions">' + (ch.openStory ? storyLink(ch.openStory) : '') + '<button type="button" class="cc-btn cc-btn-sm" data-act="done" data-autofocus aria-keyshortcuts="E">Continue' + continueKey + '</button></div>', meta.label);
    } else {
      if (st.tried.indexOf(ch.id) === -1) st.tried.push(ch.id);
      save();
      var con = (encounter(m.key).consequences || {})[ch.id];
      if (con && con.npc) eng.emote(con.npc, '!', 2.2);
      eng.emote('player', '…', 1.6);
      if (!eng.reduce) { frame.classList.remove('is-shake'); void frame.offsetWidth; frame.classList.add('is-shake'); }
      showDialog((con ? '<p class="gx-who">' + esc(con.speaker) + '</p><p class="gx-text">' + esc(con.line) + '</p>' : '<p class="gx-who">You chose</p><p class="gx-text gx-chosen">' + esc(ch.label) + '</p>') +
        feedbackHtml(ch) +
        '<div class="gx-actions"><button type="button" class="cc-btn cc-btn-sm" data-act="retry" data-autofocus>' + CC.icon('swap') + 'Try another way</button></div>', 'What happens');
    }
  }
  function finishStep() {
    var m = open;
    closeDialog();
    if (!m) return;
    (zone.stepFacts[m.key] || []).forEach(function (id) { unlock(id); });
    updateGoal();
    var go = encounter(m.key).thenGo;   // e.g. the host invites you in
    if (go) {
      if (go.line) say(go.speaker || '', go.line);
      goMap(go.map, go.spawn);
      return;
    }
    if (!currentObjective()) { setTimeout(summary, 700); return; }
    // moments that follow straight on (the player is still standing in their zone)
    var next = zone.objectives.filter(function (o) { return !done(o.step); })[0];
    var enc = next && encounter(key(next.step));
    if (enc && enc.chain && (!next.map || next.map === mapId)) setTimeout(function () { startEncounter(next.step); }, 450);
  }

  /* ---------- interacting ---------- */
  function interact(it) {
    if (open || !dialog.hidden) return;
    var p = it.props || {};
    if (it.kind === 'npc') {
      var k = zone.objectives.map(function (o) { return key(o.step); }).filter(function (x) { return encounter(x).npc === it.id && !done(x); })[0];
      if (k) return startEncounter(k);
      if (p.fact) {
        var f = factById(p.fact);
        unlock(p.fact, { quiet: true });
        return showDialog('<p class="gx-who">' + esc(p.speaker || 'Someone') + '</p>' + (p.line ? '<p class="gx-text">' + esc(p.line) + '</p>' : '') +
          (f ? factCard(f) : '') + '<div class="gx-actions">' + continueBtn() + '</div>', p.speaker);
      }
      if (p.line) return say(p.speaker || 'Someone', p.line);
    } else if (p.fact) {
      var f2 = factById(p.fact);
      unlock(p.fact, { quiet: true });
      showDialog('<p class="gx-who">' + CC.icon('pin') + esc(p.label || it.name) + '</p>' + (f2 ? factCard(f2) : '') +
        '<div class="gx-actions">' + continueBtn() + '</div>', p.label || it.name);
    }
  }
  function onZone(z) {
    var k = z.props && z.props.step && key(z.props.step);
    if (k && !done(k)) {
      // only the first moment not yet done in this zone (several moments can share one place)
      var first = zone.objectives.map(function (o) { return key(o.step); }).filter(function (x) { return !done(x) && (encounter(x).zone === z.id); })[0] || k;
      var enc = encounter(first);
      if (enc.after && !done(enc.after)) { if (enc.notYet) say(enc.notYetSpeaker || 'Not yet', enc.notYet); return; }
      startEncounter(first);
    }
  }
  var switching = false;
  function onDoor(d) {
    if (switching || !d.props.to) return;
    if (d.props.after && !done(d.props.after)) {
      var m = moment(d.props.after);
      eng.teleport(eng.player.x, eng.player.y + 10, 'down');
      return say('Not yet', d.props.notYet || ('First: ' + (m ? m.step.prompt : '')));
    }
    goMap(d.props.to, d.props.spawn);
  }
  function goMap(id, spawnName, pos) {
    var map = CC.maps[id];
    if (!map) return Promise.resolve();
    switching = true;
    frame.classList.add('is-switching');
    return eng.setMap(map).then(function () {
      mapId = id;
      var s = pos || eng.spawns[spawnName] || eng.spawn || { x: 32, y: 32 };
      eng.resize();
      eng.teleport(s.x, s.y, s.dir || 'up');
      updateGoal();
      savePos();
      setTimeout(function () { frame.classList.remove('is-switching'); switching = false; }, 120);
    });
  }

  /* ---------- panels: journal, go to, help, summary ---------- */
  function openPanel(title, body, id) {
    eng.frozen = true; eng.releaseKeys();
    returnFocus = document.activeElement;
    panel.innerHTML = '<div class="gx-panel-in" role="dialog" aria-modal="true" aria-labelledby="gx-panel-title">' +
      '<div class="gx-panel-head"><h2 id="gx-panel-title">' + title + '</h2>' +
      '<button type="button" class="cc-close" data-act="panel-close" aria-label="Close">' + CC.icon('close') + '</button></div>' +
      '<div class="gx-panel-body" tabindex="0">' + body + '</div></div>';
    panel.dataset.kind = id || '';
    panel.hidden = false;
    var b = panel.querySelector('.gx-panel-body [data-autofocus]') || panel.querySelector('.gx-panel-body');
    b.focus({ preventScroll: true });
    if (CC.syncSaveButtons) CC.syncSaveButtons();
  }
  function closePanel() {
    panel.hidden = true; panel.innerHTML = '';
    if (dialog.hidden) eng.frozen = false;
    (returnFocus && document.body.contains(returnFocus) ? returnFocus : frame).focus({ preventScroll: true });
    returnFocus = null;
  }
  function journal(focusId) {
    var got = zone.facts.filter(function (f) { return state.facts[f.id]; });
    var left = zone.facts.length - got.length;
    var stamps = zone.objectives.map(function (o) {
      return '<li class="' + (done(o.step) ? 'is-done' : '') + '">' + CC.icon(done(o.step) ? 'check' : 'compass') + '<span>' + esc(o.text) + '</span></li>';
    }).join('');
    openPanel('Your journal · ' + esc(zone.title),
      '<ul class="gx-stamps">' + stamps + '</ul>' +
      (got.length ? got.map(function (f) { return '<div id="gx-f-' + esc(f.id) + '"' + (f.id === focusId ? ' class="is-new"' : '') + '>' + factCard(f) + '</div>'; }).join('') :
        '<p class="gx-empty">Nothing yet. Look around: objects with <b>?</b> and people with <b>!</b> have something to tell you.</p>') +
      (left ? '<p class="cc-meta">' + CC.plural(left, 'more thing') + ' to find here.</p>' : '<p class="cc-meta">You found everything in this place.</p>'),
      'journal');
    if (focusId) { var el = CC.$('gx-f-' + focusId); if (el) el.scrollIntoView({ block: 'nearest' }); }
  }
  function goTo() {
    var items = [];
    zone.objectives.forEach(function (o) {
      items.push({ label: o.text, sub: done(o.step) ? 'Done' : 'Moment', target: o.target, map: o.map || mapId, step: key(o.step) });
    });
    eng.hotspots.forEach(function (h) { items.push({ label: h.props.label || h.name, sub: state.facts[h.props.fact] ? 'Looked at' : 'Something to look at', it: h }); });
    eng.npcs.forEach(function (n) { if (!n.hidden) items.push({ label: n.props.speaker || n.name, sub: 'Person here', it: n }); });
    var seen = {};
    items = items.filter(function (x) { var k = x.label + x.sub; if (seen[k]) return false; seen[k] = 1; return true; });
    openPanel('Go to…', '<p class="cc-meta">Jump straight to a place or a person instead of walking.</p><ul class="gx-goto">' +
      items.map(function (x, i) { return '<li><button type="button" data-goto="' + i + '"' + (i === 0 ? ' data-autofocus' : '') + '><b>' + esc(x.label) + '</b><span>' + esc(x.sub) + '</span></button></li>'; }).join('') + '</ul>', 'goto');
    panel._goto = items;
  }
  function doGoTo(i) {
    var x = panel._goto[i];
    closePanel();
    if (x.target) {
      var arrive = function () {
        var t = eng.targets[x.target];
        if (!t) return;
        eng.teleport(t.x, t.y, 'up');
        updateGoal();
        if (!done(x.step)) startEncounter(x.step);
      };
      if (x.map !== mapId) goMap(x.map).then(arrive); else arrive();
    } else {
      var s = eng.spotNear(x.it);
      eng.teleport(s.x, s.y, 'up');
      setTimeout(function () { interact(x.it); }, 120);
    }
    savePos();
  }
  function help() {
    openPanel('How to play',
      '<ul class="gx-help"><li><b>Move</b> arrow keys or W A S D, or click where you want to go.</li>' +
      '<li><b>Talk or look</b> walk up to a person or object and press E, Space or Enter, or click it. Press E again to continue.</li>' +
      '<li><b>!</b> a moment is waiting with this person. <b>?</b> something to look at.</li>' +
      '<li><b>Doors</b> walk into a doorway to go inside or out.</li>' +
      '<li><b>Choices</b> press 1, 2 or 3. If a choice doesn’t fit, you’ll see what happens and can try another way.</li>' +
      '<li><b>G</b> or <b>Go to…</b> jumps to any place or person without walking, so you can play with the keyboard only.</li>' +
      '<li><b>J</b> opens your journal. <b>Esc</b> closes a window.</li></ul>' +
      scenes().map(function (sc) { return '<p class="cc-meta">' + esc(sc.scope || '') + '</p>'; }).join(''), 'help');
  }
  function summary() {
    var list = scenes();
    list.forEach(function (sc) { CC.progress.set(sc.id, 'done'); });
    state.done = true; save();
    var lines = [], stories = [], keeps = '';
    list.forEach(function (sc) {
      (sc.summary || []).forEach(function (s) { lines.push('<li>' + CC.icon('check') + '<span>' + esc(s.text) + verify(s.claimIds) + '</span></li>'); });
      (sc.storyIds || []).forEach(function (id) { if (stories.indexOf(id) === -1) stories.push(id); });
      if (sc.reminder) keeps += '<div class="gx-keep"><div><b>' + esc(sc.reminder.title || 'Keep a reminder card') + '</b><p class="cc-meta">' + esc(sc.reminder.action) + '</p></div>' + CC.saveButton('reminder', sc.reminder.id, { country: zone.country }) + '</div>';
    });
    var all = CC.exploreZones || [], at = all.indexOf(zone);
    var others = all.slice(at + 1).concat(all.slice(0, at)).filter(function (z) { var s = (CC.store.get('explore', {}) || {}).zones || {}; return !(s[z.id] && s[z.id].done); });
    openPanel('You visited ' + esc(zone.title),
      '<div class="gx-stamp" aria-hidden="true"><span>' + esc(zone.stamp || zone.title) + '</span><small>' + esc(zone.place) + '</small></div>' +
      '<ul class="gx-summary">' + lines.join('') + '</ul>' + keeps +
      (stories.length ? '<h3 class="gx-sub">' + (stories.some(function (id) { return !CC.reads.has(id); }) ? 'Read more about what you just did' : 'Stories you have read for this place') + '</h3>' +
        '<div class="gx-links">' + stories.slice().sort(function (a, b) { return CC.reads.has(a) - CC.reads.has(b); }).map(storyLink).join('') + '</div>' : '') +
      '<div class="gx-actions"><button type="button" class="cc-btn cc-btn-quiet cc-btn-sm" data-act="journal">Open journal</button>' +
      (others.length ? '<a class="cc-btn cc-btn-sm" href="explore.html?zone=' + esc(others[0].id) + '" data-autofocus>Next: ' + esc(others[0].title) + '</a>' : '<a class="cc-btn cc-btn-sm" href="vietnam.html" data-autofocus>You’ve visited every place · Back to Vietnam</a>') +
      '</div>', 'summary');
  }

  /* ---------- wiring ---------- */
  function savePos() { if (eng && eng.player && mapId) { state.pos = { map: mapId, x: Math.round(eng.player.x), y: Math.round(eng.player.y) }; save(); } }

  function bind() {
    frame.addEventListener('keydown', function (e) {
      if (!started) return;
      var inUi = e.target.closest && e.target.closest('.gx-dialog, .gx-panel');
      if (e.key === 'Escape') {
        if (!panel.hidden) { closePanel(); e.preventDefault(); }
        else if (!dialog.hidden && !open) { closeDialog(); e.preventDefault(); }
        return;
      }
      // E continues an open dialog. Ignore a held key, so the press that opened it can't also close it.
      if ((e.key === 'e' || e.key === 'E') && !dialog.hidden) {
        var go = dialog.querySelector('[data-act="close"], [data-act="done"]');
        if (go && !e.repeat) go.click();
        e.preventDefault();
        return;
      }
      if (!dialog.hidden && open && /^[1-9]$/.test(e.key)) {
        var b = dialog.querySelectorAll('.gx-choice')[+e.key - 1];
        if (b && !b.disabled) { b.click(); e.preventDefault(); }
        return;
      }
      if (inUi || !panel.hidden) return;   // let the open panel scroll with the arrow keys
      if ((e.key === 'j' || e.key === 'J') && panel.hidden && dialog.hidden) { journal(); e.preventDefault(); return; }
      if ((e.key === 'g' || e.key === 'G') && panel.hidden && dialog.hidden) { goTo(); e.preventDefault(); return; }
      if (eng.setKey(e.key, true)) { e.preventDefault(); return; }
      if ((e.key === 'e' || e.key === 'E' || e.key === ' ' || e.key === 'Enter') && e.target === frame) { eng.interact(); e.preventDefault(); }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = [].slice.call(panel.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
    frame.addEventListener('keyup', function (e) { eng.setKey(e.key, false); });
    frame.addEventListener('blur', function () { eng.releaseKeys(); }, true);
    CC.$('gx-canvas').addEventListener('pointerdown', function (e) {
      if (!started) return;
      frame.focus({ preventScroll: true });
      eng.click(e.clientX, e.clientY);
    });
    frame.addEventListener('click', function (e) {
      var t = e.target.closest('button, a');
      if (!t) return;
      if (t.dataset.choice) choose(t.dataset.choice);
      else if (t.dataset.act === 'close') closeDialog();
      else if (t.dataset.act === 'done') finishStep();
      else if (t.dataset.act === 'retry') { var m = open; showDialog(promptHtml(m), 'Moment: ' + m.step.prompt); }
      else if (t.dataset.act === 'panel-close') closePanel();
      else if (t.dataset.act === 'journal') { closePanel(); journal(); }
      else if (t.dataset.goto != null) doGoTo(+t.dataset.goto);
      else if (t.dataset.fact) { CC.$('gx-toast').hidden = true; journal(t.dataset.fact); }
      else if (t.id === 'gx-start-btn') begin();
      else if (t.id === 'gx-restart') {
        state = { steps: {}, facts: {} }; save();
        goMap(zone.map, 'spawn').then(begin);
      }
    });
    CC.$('gx-journal').addEventListener('click', function () { journal(); });
    CC.$('gx-goto').addEventListener('click', goTo);
    CC.$('gx-goal').addEventListener('click', function () { if (this.classList.contains('is-complete')) location.href = CC.$('gx-map').href; });
    CC.$('gx-help').addEventListener('click', help);
    CC.$('gx-sound').addEventListener('click', function () { CC.store.set('exploreSound', !soundOn()); syncSound(); });
    window.addEventListener('pagehide', savePos);
    setInterval(savePos, 4000);
    document.addEventListener('visibilitychange', function () { if (document.hidden && music) music.pause(); else if (!document.hidden && started) startMusic(); });
  }

  function begin() {
    CC.$('gx-start').hidden = true;
    var hud = document.querySelector('.gx-hud'); if (hud) hud.removeAttribute('inert');
    started = true;
    frame.focus({ preventScroll: true });
    startMusic();
    updateGoal();
    if (!state.introSeen) { state.introSeen = true; save(); setTimeout(function () { say(zone.title, zone.intro); }, 250); }
  }

  function startScreen() {
    var hud = document.querySelector('.gx-hud'); if (hud) hud.setAttribute('inert', '');   // the start card comes first for keyboard users
    var any = Object.keys(state.steps).length || Object.keys(state.facts).length;
    var others = (CC.exploreZones || []).filter(function (z) { return z.id !== zone.id; });
    CC.$('gx-start').innerHTML =
      '<div class="gx-start-card">' +
        '<p class="gx-who">' + CC.icon('pin') + esc(zone.place) + ' · about ' + zone.minutes + ' minutes · ' + zone.objectives.length + ' moments</p>' +
        '<h2>' + esc(zone.title) + '</h2>' +
        '<p>' + esc(zone.intro) + '</p>' +
        '<p class="cc-meta">Move with the arrow keys or W A S D, or click where you want to go. Press E to talk or look.</p>' +
        '<div class="gx-actions"><button type="button" class="cc-btn" id="gx-start-btn">' + (any ? (state.done ? 'Walk around again' : 'Continue') : 'Start exploring') + CC.arrow() + '</button>' +
        (any ? '<button type="button" class="cc-btn cc-btn-quiet" id="gx-restart">Start over</button>' : '') + '</div>' +
        (others.length ? '<p class="gx-other">Other places: ' + others.map(function (z) { return '<a href="explore.html?zone=' + esc(z.id) + '">' + esc(z.title) + '</a>'; }).join(' · ') + '</p>' : '') +
      '</div>';
  }

  function init() {
    if (CC.exploreHub) return;   // explore.html with no ?zone= shows the map of places (explore-hub.js)
    var id = CC.qs('zone') || ((CC.exploreZones || [])[0] || {}).id;
    zone = CC.byId(CC.exploreZones || [], id) || (CC.exploreZones || [])[0];
    CC.renderShell({ section: 'destinations', country: zone ? zone.country : 'vietnam', sub: 'practice' });
    var maps = zone ? (zone.maps || [zone.map]) : [];
    if (!zone || !CC.maps || maps.some(function (m) { return !CC.maps[m]; })) { CC.$('gx-frame').innerHTML = '<p class="gx-empty">This place isn’t ready yet.</p>'; return; }
    document.title = zone.title + ' · Play Vietnam — CultureCompass';
    CC.$('gx-title').textContent = 'Play: ' + zone.title;
    CC.$('gx-map').href = 'explore.html#' + encodeURIComponent(zone.id);
    CC.$('gx-map').setAttribute('aria-label', 'Map of Hà Nội: choose another place');
    CC.$('gx-frame').setAttribute('aria-label', 'Game: ' + zone.title + '. Press Tab to reach the buttons.');
    frame = CC.$('gx-frame'); dialog = CC.$('gx-dialog'); panel = CC.$('gx-panel');
    load();
    eng = new CC.Engine({ canvas: CC.$('gx-canvas'), container: CC.$('gx-viewport'), reduceMotion: CC.motion.reduce() });
    eng.on('interact', interact);
    eng.on('zone', onZone);
    eng.on('door', onDoor);
    CC.explore = { engine: eng, map: function () { return mapId; } };   // handy in the browser console
    /* the map of places is the start screen now: arriving here means "travel here", so the walk starts at once.
       Browsers only allow music after a gesture on this page, so the first key or click starts it. */
    var hud = document.querySelector('.gx-hud'); if (hud) hud.setAttribute('inert', '');
    var wake = function () { if (started) startMusic(); frame.removeEventListener('keydown', wake); frame.removeEventListener('pointerdown', wake); };
    frame.addEventListener('keydown', wake);
    frame.addEventListener('pointerdown', wake);
    bind();
    syncSound();
    var startMap = (state.pos && CC.maps[state.pos.map]) ? state.pos.map : zone.map;
    eng.loadPlayer(PLAYER).then(function () {
      return goMap(startMap, 'spawn', state.pos && state.pos.map === startMap ? state.pos : null);
    }).then(function () {
      eng.start();
      tickCompass();
      frame.classList.add('is-ready');
      begin();
    });
    var stories = [];
    scenes().forEach(function (sc) { (sc.storyIds || []).forEach(function (s) { if (stories.indexOf(s) === -1) stories.push(s); }); });
    CC.$('gx-read-lead').textContent = stories.length ? '. For this place:' : '.';
    CC.$('gx-read').innerHTML = stories.map(function (sid) {
      var st = CC.byId(CC.stories, sid);
      return st ? '<li><a href="' + storyHref(st) + '">' + esc(st.title) + '</a>' + (CC.reads.has(st.id) ? ' <span class="cc-meta">· read</span>' : '') + '</li>' : '';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
