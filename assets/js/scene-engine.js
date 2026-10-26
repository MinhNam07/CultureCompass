/* CultureCompass — interactive scene engine (practice, optional).
   States: ready → choosing → animating → feedback → (next step | summary).
   Resume: every step and choice is saved (CC.sceneState), so a reload or a later visit offers
   "Continue at step N" and restores the feedback if a choice had been made. */
(function () {
  'use strict';
  var CC = window.CC;
  var sc, svg, tl = null;
  var stepIdx = -1;
  var state = 'ready';
  var picked = null;

  var FB = {
    fit: { label: 'Fits this situation' },
    alsoFit: { label: 'Another way that also fits' },
    needInfo: { label: 'Needs more context' },
    seeGuide: { label: 'See the rules and guidance' }
  };

  /* Paintings carry the scene; the SVG camera and numbered pins guide attention.
     Caption beats use the existing authored stills, not invented reactions. */
  var choiceFocus = {
    sc01: { bow: 'hs-host', wave: 'hs-host', ask: 'hs-host', shoes: 'hs-shoes', nod: 'hs-shoes', greetElder: 'hs-family', greetSon: 'hs-family' },
    sc02: { passBoth: 'hs-dish', passRight: 'hs-dish', passLeft: 'hs-dish', hostServe: 'hs-bowl', decline: 'hs-bowl', leave: 'hs-bowl', toast: 'hs-glass' },
    sc03: { dress: 'hs-sign', askStaff: 'hs-staff', photoNoTouch: 'hs-stelae', touch: 'hs-stelae', read: 'hs-stelae', watch: 'hs-hall', photoPeople: 'hs-hall' },
    sc04: { crossAtLight: 'hs-crossing', crossHere: 'hs-traffic', crossSteady: 'hs-traffic', run: 'hs-traffic', withLocals: 'hs-traffic', zigzag: 'hs-traffic', callChi: 'hs-shop', callBan: 'hs-shop', pointExcuse: 'hs-shop', askPhoto: 'hs-vendor', gesturePhoto: 'hs-vendor', snapPhoto: 'hs-vendor' }
  };
  function sceneImage(choice) {
    var locationNote = CC.$('stage-location');
    if (locationNote) locationNote.hidden = !(sc.id === 'sc04' && stepIdx === 1);
    if (!svg || sc.id !== 'sc03') return;
    var img = svg.querySelector('image');
    if (img) img.setAttribute('href', stepIdx <= 0 && (!choice || choice.anim !== 'dress') ? 'assets/img/scenes/temple-arrival.jpg' : CC.sceneArt.sc03.src);
  }
  function animateChoice(t, ch) {
    var camera = svg && svg.querySelector('.scene-camera');
    var beats = ch.stills || [];
    var caption = CC.$('stage-caption');
    var focusId = (choiceFocus[sc.id] || {})[ch.anim];
    var pin = (CC.sceneArt[sc.id].pins || []).filter(function (p) { return p[0] === focusId; })[0];
    if (focusId) setActiveHotspots([focusId]);
    if (camera) t.fromTo(camera, { scale: 1, transformOrigin: pin ? (pin[1] / 8) + '% ' + (pin[2] / 4.5) + '%' : '50% 50%' },
      { scale: 1.055, duration: Math.max(0.8, beats.length * 0.6), ease: 'sine.inOut' }, 0);
    beats.forEach(function (line, i) {
      t.call(function () {
        if (caption) caption.textContent = (i + 1) + ' / ' + beats.length + ' · ' + line;
        if (i === beats.length - 1) sceneImage(ch);
      }, null, i * 0.6);
    });
  }

  /* ---------- rendering helpers ---------- */
  var esc = CC.esc;
  function claimsOf(ids) { return CC.claimsOf(ids); }
  function needsVerify(claims) { return CC.unverified(claims); }
  function evidenceHtml(claimIds) {
    var claims = claimsOf(claimIds);
    var srcs = CC.sourcesOf(claims);
    var notes = claims.filter(function (c) { return c.kind === 'projectNote'; });
    var html = '';
    if (srcs.length) html += '<p class="cc-src">' + CC.sourceLinks(srcs) + '</p>';
    if (notes.length && !srcs.length) html += '<p class="cc-src">' + CC.icon('lightbulb') + ' CultureCompass tip: general advice, not a local rule.</p>';
    return html;
  }
  function phrasesHtml(ids) {
    var list = (ids || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    if (!list.length) return '';
    return '<div style="margin-top:18px"><h3 class="h4" style="margin-bottom:10px">Words you can use</h3><div style="display:grid;gap:10px">' +
      list.map(function (p) { return CC.phraseHtml(p, { compact: true }); }).join('') + '</div></div>';
  }
  function fbIcon(type) { return CC.icon({ fit: 'check', alsoFit: 'swap', needInfo: 'question', seeGuide: 'info' }[type] || 'info'); }
  function storyLinks(title) {
    var list = (sc.storyIds || []).map(function (id) { return CC.byId(CC.stories, id); }).filter(Boolean);
    if (!list.length) return '';
    return '<div class="scene-related"><h3>' + esc(title) + '</h3><ul>' + list.map(function (s) {
      return '<li><a href="story.html?id=' + s.id + '&from=scene:' + sc.id + '">' + CC.icon('story') + esc(s.title) + '</a></li>';
    }).join('') + '</ul></div>';
  }

  var $panel, $detail, $skip, $hsList;

  function setPhase(phase) {
    $panel.dataset.phase = phase;
    $panel.closest('.scene-grid-page').classList.toggle('is-summary', phase === 'summary');
  }

  function setActiveHotspots(ids) {
    if (!svg) return;
    Array.prototype.forEach.call(svg.querySelectorAll('[data-hotspot]'), function (g) {
      g.classList.toggle('is-active', ids.indexOf(g.getAttribute('data-hotspot')) !== -1);
    });
  }

  function showHotspot(id) {
    var h = CC.byId(sc.hotspots, id);
    if (!h) return;
    Array.prototype.forEach.call($hsList.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-hs') === id ? 'true' : 'false');
    });
    setActiveHotspots([id]);
    if (state !== 'animating') CC.$('stage-caption').textContent = h.label + ': ' + h.text;
    var claims = claimsOf(h.claimIds);
    $detail.innerHTML = '<div class="scene-hs-card"><h3>' + esc(h.label) + '</h3><p>' + esc(h.text) +
      (needsVerify(claims) ? ' ' + CC.verifyTag() : '') + '</p>' + evidenceHtml(h.claimIds) + '</div>';
  }

  /* ---------- panel states ---------- */
  function renderIntro(opts) {
    opts = opts || {};
    resetAnim();
    state = 'ready';
    setPhase('ready');
    CC.$('stage-caption').textContent = 'Look closer: select a numbered detail in the painting.';
    stepIdx = -1;
    sceneImage();
    var saved = CC.sceneState.get(sc.id);
    var resumable = saved && typeof saved.step === 'number' && saved.step >= 0 && saved.step < sc.steps.length;
    var done = CC.progress.get(sc.id) === 'done';
    $panel.innerHTML =
      '<p class="cc-meta" style="margin-bottom:6px">About ' + sc.minutes + ' minutes · ' + sc.steps.length + ' steps · no timer, no score</p>' +
      '<h2 tabindex="-1" id="panel-title">' + (resumable ? 'Welcome back' : 'Before you start') + '</h2>' +
      '<p>' + esc(sc.context) + '</p>' +
      '<p><strong>Your goal:</strong> ' + esc(sc.goal) + '</p>' +
      (resumable
        ? '<div class="scene-resume"><p>You stopped at <b>step ' + (saved.step + 1) + ' of ' + sc.steps.length + '</b>' + (saved.phase === 'feedback' ? ', after making a choice' : '') + '.</p>' +
            '<div class="scene-actions" style="margin-top:0"><button type="button" class="cc-btn" id="btn-resume">Continue at step ' + (saved.step + 1) + ' ' + CC.arrow() + '</button>' +
            '<button type="button" class="cc-btn cc-btn-quiet" id="btn-start">Start over</button></div></div>'
        : '<div class="scene-actions"><button type="button" class="cc-btn" id="btn-start">' + (done ? 'Practise again' : 'Start the scene') + ' ' + CC.arrow() + '</button>' +
            '<button type="button" class="cc-btn cc-btn-quiet" data-bs-toggle="offcanvas" data-bs-target="#story-oc" aria-controls="story-oc">' + CC.icon('story') + 'Background</button></div>') +
      '<p class="cc-meta" style="margin-top:14px">Look around the picture first if you like: select an object, or use the buttons under it.</p>' +
      storyLinks('Read the stories behind this scene');
    CC.$('btn-start').addEventListener('click', function () {
      CC.sceneState.clear(sc.id);
      CC.progress.set(sc.id, 'started');
      goStep(0);
    });
    var rb = CC.$('btn-resume');
    if (rb) rb.addEventListener('click', function () { resumeAt(saved); });
    setActiveHotspots([]);
    if (opts.focus) focusTitle();
  }

  function resumeAt(saved) {
    goStep(saved.step);
    if (saved.phase === 'feedback' && saved.choice) {
      var ch = CC.byId(sc.steps[saved.step].choices, saved.choice);
      if (ch) { markPicked(saved.choice); CC.$('stage-caption').textContent = ch.stills.join(' · '); showFeedback(ch); }
    }
  }

  function progressDots(i) {
    var n = sc.steps.length, out = '';
    for (var k = 0; k < n; k++) out += '<span class="' + (k < i ? 'done' : k === i ? 'current' : '') + '"></span>';
    return '<div class="scene-dots" aria-hidden="true">' + out + '</div>';
  }

  function resetAnim() {
    if (tl) { tl.progress(0); tl.kill(); tl = null; }
    if ($skip) $skip.hidden = true;
  }

  function goStep(i) {
    resetAnim();
    stepIdx = i;
    sceneImage();
    state = 'choosing';
    setPhase('choosing');
    CC.$('stage-caption').textContent = 'Look for the details that matter in this moment.';
    picked = null;
    CC.sceneState.set(sc.id, { step: i, phase: 'choosing' });
    CC.progress.set(sc.id, 'started');
    var st = sc.steps[i];
    setActiveHotspots(st.highlight || []);
    var letters = 'ABCDE';
    $panel.innerHTML =
      '<div class="scene-progress">' + progressDots(i) + '<span>Step ' + (i + 1) + ' of ' + sc.steps.length + '</span></div>' +
      '<h2 class="scene-prompt" tabindex="-1" id="panel-title">' + esc(st.prompt) + '</h2>' +
      (sc.id === 'sc04' && i === 1 ? '<p class="cc-meta">The painting shows the earlier street. This new moment has no crossing or light.</p>' : '') +
      (st.cue ? '<p class="scene-cue">' + CC.icon('lightbulb') + '<span>' + esc(st.cue) + '</span></p>' : '') +
      '<div class="scene-choices" role="group" aria-labelledby="panel-title" id="choices">' +
        st.choices.map(function (c, k) {
          return '<button type="button" class="scene-choice" data-choice="' + c.id + '" aria-pressed="false"><span class="key" aria-hidden="true">' + letters[k] + '</span><span>' + esc(c.label) + '</span></button>';
        }).join('') +
      '</div>' +
      '<div id="stills"></div><div id="fb"></div>';
    Array.prototype.forEach.call($panel.querySelectorAll('[data-choice]'), function (b) {
      b.addEventListener('click', function () { choose(b.getAttribute('data-choice')); });
    });
    focusTitle();
  }

  function focusTitle() {
    var t = CC.$('panel-title');
    if (t) t.focus({ preventScroll: true });
    /* phones: the panel is under the picture; keep the question in view */
    if (window.matchMedia('(max-width: 960px)').matches && $panel.getBoundingClientRect().top < 0) CC.motion.scrollTo($panel, 'start');
  }

  function markPicked(choiceId) {
    Array.prototype.forEach.call($panel.querySelectorAll('[data-choice]'), function (b) {
      var on = b.getAttribute('data-choice') === choiceId;
      b.disabled = true;
      b.classList.toggle('is-picked', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function choose(choiceId) {
    if (state === 'animating') return;
    var st = sc.steps[stepIdx];
    var ch = CC.byId(st.choices, choiceId);
    picked = ch;
    resetAnim();
    state = 'animating';
    markPicked(choiceId);
    CC.$('fb').innerHTML = '';
    /* save the choice now, so a reload shows this feedback rather than the start */
    CC.sceneState.set(sc.id, { step: stepIdx, phase: 'feedback', choice: choiceId });

    var fn = animateChoice;
    var reduce = CC.settings.reduce() || typeof window.gsap === 'undefined';

    if (reduce || !fn) {
      CC.$('stage-caption').textContent = (ch.stills || []).join(' · ');
      showFeedback(ch);
      return;
    }
    tl = window.gsap.timeline({ onComplete: function () { $skip.hidden = true; showFeedback(ch); } });
    fn(tl, ch);
    $skip.hidden = false;
    $skip.focus({ preventScroll: true });
    CC.$('anim-status').textContent = 'Showing: ' + ch.label + '. Press Skip animation to see the feedback now.';
  }

  function showFeedback(ch) {
    state = 'feedback';
    var meta = FB[ch.type];
    var last = stepIdx === sc.steps.length - 1;
    var claims = claimsOf(ch.claimIds);
    var story = ch.openStory ? CC.byId(CC.stories, ch.openStory) : null;
    var fb = CC.$('fb');
    setPhase('feedback');
    sceneImage(ch);
    var focusId = (choiceFocus[sc.id] || {})[ch.anim];
    if (focusId) setActiveHotspots([focusId]);
    CC.$('choices').hidden = true;
    var prompt = CC.$('panel-title');
    prompt.classList.add('is-answered');
    var cue = $panel.querySelector('.scene-cue');
    if (cue) cue.hidden = true;
    fb.innerHTML =
      '<p class="scene-picked"><span>You chose</span><strong>' + esc(ch.label) + '</strong></p>' +
      '<div class="fb fb-' + ch.type + '" tabindex="-1" id="fb-box">' +
        '<div class="fb-head"><span class="fb-icon">' + fbIcon(ch.type) + '</span><span>' + meta.label + '</span></div>' +
        '<p>' + esc(ch.feedback) + (needsVerify(claims) ? ' ' + CC.verifyTag() : '') + '</p>' +
      '</div>' +
      '<div class="scene-actions scene-next-actions">' +
        '<button type="button" class="cc-btn" id="btn-next">' + (last ? 'What to take with you' : 'Next moment') + ' ' + CC.arrow() + '</button>' +
        '<button type="button" class="cc-btn cc-btn-quiet" id="btn-retry">Try another option</button>' +
      '</div>' +
      '<details class="scene-explanation"><summary>Explore the context & sources</summary>' +
        '<ol class="scene-beats">' + (ch.stills || []).map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('') + '</ol>' +
        evidenceHtml(ch.claimIds) +
        (story ? '<button type="button" class="cc-btn cc-btn-quiet cc-btn-sm" data-open-story="' + story.id + '">Read: ' + esc(story.title) + '</button>' : '') +
      '</details>' + phrasesHtml(ch.phraseIds);
    CC.$('anim-status').textContent = '';
    CC.$('btn-retry').addEventListener('click', function () { goStep(stepIdx); });
    CC.$('btn-next').addEventListener('click', function () { if (last) renderSummary(); else goStep(stepIdx + 1); });
    var sb = fb.querySelector('[data-open-story]');
    if (sb) sb.addEventListener('click', function () { openStory(sb.getAttribute('data-open-story')); });
    CC.$('fb-box').focus({ preventScroll: true });
    CC.$('fb-box').scrollIntoView({ block: 'nearest', behavior: CC.motion.reduce() ? 'auto' : 'smooth' });
  }

  function reminderHtml(r) {
    var phrases = (r.phraseIds || []).map(function (id) { return CC.byId(CC.phrases, id); }).filter(Boolean);
    return '<article class="reminder" aria-labelledby="rem-title">' +
      '<h3 id="rem-title">' + esc(r.title) + '</h3>' +
      '<dl><dt>Do</dt><dd>' + esc(r.action) + '</dd>' +
      '<dt>Say</dt><dd>' + phrases.map(function (p) { return '<span lang="vi"><strong>' + esc(p.vi) + '</strong></span> — ' + esc(p.meaning); }).join('<br>') + '</dd>' +
      '<dt>Applies to</dt><dd>' + esc(r.note) + '</dd></dl>' +
      '<p class="cc-meta">' + CC.sourceLinks(CC.sourcesOf(claimsOf(r.claimIds))) + '</p>' +
    '</article>';
  }

  function renderSummary() {
    resetAnim();
    state = 'summary';
    setPhase('summary');
    CC.progress.set(sc.id, 'done');
    CC.sceneState.clear(sc.id);
    setActiveHotspots([]);
    var list = CC.scenarios.slice().sort(function (a, b) { return a.order - b.order; });
    var next = list[list.indexOf(sc) + 1];
    $panel.innerHTML =
      '<div class="scene-progress">' + progressDots(sc.steps.length) + '<span>All ' + sc.steps.length + ' moments explored</span></div>' +
      '<h2 tabindex="-1" id="panel-title">A little understanding to take with you.</h2>' +
      '<p class="summary-intro">You have tried one situation. Real ones vary; use this as a starting point and follow local cues.</p>' +
      '<div class="summary-layout"><div class="summary-reflection">' +
        '<img class="summary-art" src="' + CC.sceneArt[sc.id].src + '" alt="' + esc(CC.sceneArt[sc.id].alt) + '">' +
        '<h3>Remember the context</h3><ul class="about-list">' + sc.summary.map(function (s) {
          return '<li>' + esc(s.text) + (needsVerify(claimsOf(s.claimIds)) ? ' ' + CC.verifyTag() : '') + '</li>';
        }).join('') + '</ul></div>' +
        '<div class="summary-keep"><div class="scene-actions">' + CC.saveButton('reminder', sc.reminder.id, { cls: '' }) + '</div>' +
          '<p class="cc-meta">Keep this reminder in My collection, in this browser.</p>' + reminderHtml(sc.reminder) +
        '</div></div>' +
      '<div class="summary-footer"><div class="scene-actions">' +
        (next ? '<a class="cc-btn cc-btn-quiet" href="scene.html?id=' + next.id + '">Next scene: ' + esc(next.title) + '</a>' : '<a class="cc-btn cc-btn-quiet" href="vietnam.html#practice">All scenes</a>') +
        '<button type="button" class="cc-btn cc-btn-quiet" id="btn-replay">Practise again</button>' +
      '</div>' + storyLinks('Keep exploring') + '</div>';
    CC.$('btn-replay').addEventListener('click', function () { CC.sceneState.clear(sc.id); renderIntro({ focus: true }); });
    focusTitle();
    requestAnimationFrame(function () {
      var header = CC.$('cc-header');
      window.scrollTo({ top: Math.max(0, window.scrollY + $panel.getBoundingClientRect().top - (header ? header.offsetHeight : 68) - 16), behavior: 'instant' });
    });
  }

  /* ---------- Background drawer: the same stories as story.html, one copy of the data ---------- */
  function renderStory() {
    var body = CC.$('story-body');
    var list = (sc.storyIds || []).map(function (id) { return CC.byId(CC.stories, id); }).filter(Boolean);
    body.innerHTML = list.map(function (s) {
      var cl = CC.storyClaims(s);
      return '<section class="story-mini" id="oc-' + s.id + '" tabindex="-1">' +
        '<h3>' + esc(s.title) + '</h3>' +
        s.sections.slice(0, 2).map(function (sec) { return '<p>' + esc(sec.text) + '</p>'; }).join('') +
        '<p class="cc-meta">' + (needsVerify(cl) ? CC.verifyTag() + ' ' : '') + CC.sourceLinks(CC.sourcesOf(cl)) + '</p>' +
        '<a class="cc-link" href="story.html?id=' + s.id + '&from=scene:' + sc.id + '">Read the full story ' + CC.arrow() + '</a>' +
      '</section>';
    }).join('') || '<p>No background stories for this scene yet.</p>';
  }
  function openStory(id) {
    var el = CC.$('story-oc');
    var oc = window.bootstrap.Offcanvas.getOrCreateInstance(el);
    el.addEventListener('shown.bs.offcanvas', function once() {
      el.removeEventListener('shown.bs.offcanvas', once);
      var t = CC.$('oc-' + id);
      if (t) { t.scrollIntoView({ block: 'start' }); t.focus({ preventScroll: true }); }
    });
    oc.show();
  }

  /* ---------- init ---------- */
  function init() {
    CC.renderShell({ section: 'destinations', country: 'vietnam', sub: 'practice' });
    var id = CC.qs('id');
    sc = id ? CC.byId(CC.scenarios, id) : null;
    var main = CC.$('scene-root');
    if (!sc) {
      document.title = 'Scene not found — CultureCompass';
      main.innerHTML = '<div class="cc-section-tight"><div class="cc-empty"><h1 class="h2" tabindex="-1">We couldn’t find that scene</h1>' +
        '<p>' + (id ? 'There is no scene called “' + esc(id) + '”. The link may be out of date.' : 'The link doesn’t say which scene to open.') + '</p>' +
        '<p><a class="cc-btn" href="vietnam.html#practice">See all practice scenes ' + CC.arrow() + '</a></p></div></div>';
      return;
    }
    document.title = sc.title + ' — practise — CultureCompass';
    CC.$('scene-title').textContent = sc.title;
    CC.$('scene-place').innerHTML = CC.icon('pin') + ' ' + esc(sc.place);
    CC.$('scene-crumb').textContent = sc.title;
    CC.$('scene-scope').innerHTML = '<strong>Applies to:</strong> ' + esc(sc.scope);
    if (CC.progress.get(sc.id) === 'done') CC.$('scene-status').hidden = false;

    var host = CC.$('stage');
    host.innerHTML = '<p class="stage-caption" id="stage-location" hidden><strong>A different street.</strong> This moment happens later, on a smaller street with no crossing or light. The painting shows the earlier location.</p>' + (CC.svgs[sc.id] || '') + '<p class="stage-caption" id="stage-caption" aria-live="polite"></p><p class="scene-art-credit">AI-generated illustration · an imagined scene, not a documentary image. <a href="about.html#credits">About the artwork</a></p>';
    svg = host.querySelector('svg');
    $panel = CC.$('panel');
    $detail = CC.$('hs-detail');
    $skip = CC.$('btn-skip');
    $hsList = CC.$('hs-list');

    $hsList.innerHTML = sc.hotspots.map(function (h) {
      return '<button type="button" data-hs="' + h.id + '" aria-pressed="false"><span class="hs-index" aria-hidden="true">' + (sc.hotspots.indexOf(h) + 1) + '</span>' + esc(h.label) + '</button>';
    }).join('');
    $hsList.addEventListener('click', function (e) {
      var b = e.target.closest('[data-hs]');
      if (b) showHotspot(b.getAttribute('data-hs'));
    });
    if (svg) svg.addEventListener('click', function (e) {
      var g = e.target.closest('[data-hotspot]');
      if (g) showHotspot(g.getAttribute('data-hotspot'));
    });

    $skip.addEventListener('click', function () { if (tl) tl.progress(1); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state === 'animating' && tl) tl.progress(1); });
    document.addEventListener('cc:settings', function () { if (tl && state === 'animating' && CC.settings.reduce()) tl.progress(1); });
    document.addEventListener('cc:cleared', function () { if (state === 'ready') renderIntro(); CC.$('scene-status').hidden = true; });

    renderStory();
    renderIntro();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
