/* CultureCompass — Vietnam country page (vietnam.html). The earlier compass page lives on as vietnam-classic.html.
   A long editorial page built from a config of modules (SECTIONS below). Each module is one render function;
   behaviour (accordion, cover-stack, ribbons, pins, game, toast, chapter anchors) is wired after render.
   Photos are not chosen yet: every picture is a designed frame that names the shot it will hold. Set PHOTOS = true
   and each frame loads its imageId (CC.assets) or src, fading in when it arrives.
   Plain script, no modules, so the page also works from file://. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  var COUNTRY = 'vietnam';
  var PHOTOS = true;

  /* ---------------- icons (same 24-grid, 1.75 stroke as core.js) ---------------- */
  var P = {
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
    share: '<circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="6" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6"/>',
    camera: '<path d="M4 8.5h3l1.8-2.5h6.4L17 8.5h3V19H4z"/><circle cx="12" cy="13.3" r="3.3"/>',
    video: '<rect x="3.5" y="6.5" width="12" height="11" rx="1.5"/><path d="M15.5 10.5l5-3v9l-5-3"/>',
    plan: '<path d="M4 5l5-1.5 6 2 5-1.5v15l-5 1.5-6-2-5 1.5z"/><path d="M9 3.5v15M15 5.5v15"/>',
    look: '<circle cx="12" cy="12" r="3"/><path d="M2.8 12C4.9 7.9 8.2 6 12 6s7.1 1.9 9.2 6c-2.1 4.1-5.4 6-9.2 6s-7.1-1.9-9.2-6z"/>',
    chevDown: '<path d="M6 9.5l6 6 6-6"/>',
    flip: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>'
  };
  function ic(name, cls) {
    if (!P[name]) return CC.icon(name, cls);
    return '<svg class="cc-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + P[name] + '</svg>';
  }

  /* ---------------- motifs: shared with the other editorial pages (assets/js/ex-kit.js) ---------------- */
  var MOTIF = CC.ex.MOTIF;

  /* ---------------- frame: the picture slot ---------------- */
  var TONES = ['#7A5038', '#2F5F63', '#5E6136', '#8E4537', '#2E4356', '#94703F', '#4F3B52'];
  var toneI = 0;
  function frame(o) {
    o = o || {};
    var tone = o.tone || TONES[toneI++ % TONES.length];
    var src = null;
    if (PHOTOS) {
      var a = o.imageId ? CC.byId(CC.assets, o.imageId) : null;
      src = o.src || (a ? (a.poster || a.file) : null);
    }
    var kind = o.kind || 'camera';
    return '<div class="fr' + (o.round ? ' fr-round' : '') + (o.cls ? ' ' + o.cls : '') + '" style="--tone:' + tone + (o.ratio ? ';--ratio:' + o.ratio : '') + '" aria-hidden="true">' +
      '<div class="fr-zoom"><div class="fr-ph"></div>' + (src ? '<img class="fr-img" data-src="' + esc(src) + '" alt="" decoding="async">' : '') + '</div>' +
      (o.label && !src ? '<span class="fr-tag">' + ic(kind) + '<span>' + esc(o.label) + '</span></span>' : '') +
    '</div>';
  }
  function ph() { return '<span class="ex-ph-note">' + ic('info') + 'Placeholder copy</span>'; }
  function head(title, sub, id) {
    return '<header class="ex-head"><h2' + (id ? ' id="' + id + '"' : '') + '>' + title + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + '</header>';
  }
  function pill(href, label, cls) {
    return '<a class="ex-pill ex-ripple' + (cls ? ' ' + cls : '') + '" href="' + href + '">' + label + '</a>';
  }
  function arrowBtns() {
    return '<button type="button" class="ex-arrow ex-arrow-prev" data-dir="-1" aria-label="Scroll back" hidden>' + ic('arrowLeft') + '</button>' +
      '<button type="button" class="ex-arrow ex-arrow-next" data-dir="1" aria-label="Scroll forward" hidden>' + ic('arrowRight') + '</button>';
  }

  /* ---------------- data helpers ---------------- */
  function story(id) { return CC.byId(CC.stories, id); }
  function scene(id) { return CC.byId(CC.scenarios, id); }
  function topic(id) { return CC.byId(CC.topics, id); }
  function phrase(id) { return CC.byId(CC.phrases, id); }
  function storyHref(st) { return 'story.html?id=' + st.id + '&from=' + 'overview'; }
  function topicOf(st) { var t = CC.storyTopics(st)[0]; return t ? t.label : 'Story'; }
  function firstSentence(s) { var m = String(s || '').match(/^[^.?!]+[.?!]/); return m ? m[0] : s; }

  /* ================================================================
     MODULES — each returns HTML for one section
     ================================================================ */
  var R = {};

  R.hero = function (s, c) {
    var word = '<svg class="ex-wordmark" viewBox="0 0 1000 300" aria-hidden="true" focusable="false">' +
      ['l3', 'l2', 'l1', 'l0'].map(function (cls, i) {
        var off = (3 - i) * 7;
        return '<text class="' + cls + '" x="500" y="' + (222 + off) + '" dx="' + off + '" text-anchor="middle" lang="vi">Việt Nam</text>';
      }).join('') + '</svg>';
    return '<section class="ex-hero" id="top" aria-labelledby="ex-title">' +
      frame({ cls: 'ex-hero-fr', tone: '#24302F', kind: 'video', label: 'Video · Hà Nội street life at dusk (vid-train-street)', imageId: 'vid-train-street' }) +
      '<div class="ex-hero-scrim"></div>' +
      '<div class="ex-hero-in">' +
        '<h1 id="ex-title"><span class="visually-hidden">Việt Nam</span>' + word + '</h1>' +
        '<p class="ex-hero-tag">' + esc(c.name) + ', ' + esc(c.start.replace(/^Starting/, 'starting')) + '. ' + esc(c.intro) + '</p>' +
        '<div class="ex-hero-actions">' +
          '<button type="button" class="ex-icon-btn ex-heart ex-ripple" id="ex-heart" aria-pressed="false" aria-label="Like Vietnam">' + ic('heart') + '</button>' +
          '<button type="button" class="ex-icon-btn ex-ripple" data-share="vietnam.html" data-share-title="Vietnam on CultureCompass" aria-label="Share this page">' + ic('share') + '</button>' +
        '</div>' +
      '</div>' +
      '<a class="ex-hero-down" href="#sources" aria-label="Scroll to the contents">' + ic('chevDown') + '</a>' +
      '<div class="ex-hero-foot">' + MOTIF.band('ex-band-hero') + MOTIF.arcs('ex-arcs-hero') + '</div>' +
    '</section>';
  };

  R.partners = function () {
    var src = CC.sources || [];
    var names = [src[0], src[1], src[2], src[4]].filter(Boolean);
    return '<section class="ex-sec ex-partners" id="sources" aria-labelledby="sources-title">' +
      '<div class="ex-wrap">' +
        '<p class="ex-partners-lead" id="sources-title">Built from sources such as</p>' +
        '<ul class="ex-logos">' + names.map(function (s) {
          return '<li><div class="ex-logo">' + MOTIF.drum('ex-logo-mark') + '<span>' + esc(s.org || s.title) + '</span></div></li>';
        }).join('') + '</ul>' +
        '<p class="ex-partners-more"><a href="about.html#sources">and ' + Math.max(0, src.length - names.length) + ' more sources</a></p>' +
      '</div></section>';
  };

  var LEADS = {"everyday":"Hà Nội life spills onto the street: tea on the pavement, prices agreed at the market, a word for “you” chosen with care. These stories start at the door of a family home and end by the lake.","food":"Most meals here are shared, and many are eaten on a low stool by the road. Start with how a family table works, then try the city’s best-known bowls and cups.","beliefs":"A thousand years as a capital have left temples, stone stelae and legends all over the city, and most homes keep an altar of their own."};
  var CHAPTERS = [
    { anchor: 'everyday', topic: 'people', name: 'Everyday life', bg: 'teal', label: 'Photo · a lane in the Old Quarter', imageId: 'img-old-quarter' },
    { anchor: 'food', topic: 'food', name: 'Food & the table', bg: 'peach', label: 'Photo · a pavement phở gà stall', imageId: 'img-pho-ga' },
    { anchor: 'beliefs', topic: 'beliefs', name: 'Temples, beliefs & history', bg: 'jade', label: 'Photo · Văn Miếu garden', imageId: 'img-garden',
      q: 'What do people believe, remember and honour together?', vi: 'Tín ngưỡng & lịch sử' }
  ];

  R.toc = function () {
    return '<section class="ex-sec" id="contents" aria-labelledby="toc-title"><div class="ex-wrap">' +
      head('Three ways into Vietnam', 'Pick a chapter, or keep scrolling and let the page carry you.', 'toc-title') +
      '<ol class="ex-toc">' + CHAPTERS.map(function (ch, i) {
        var t = topic(ch.topic) || {};
        return '<li class="ex-toc-tile ex-zoomable" data-bg="' + ch.bg + '">' +
          '<div class="ex-toc-pic">' + frame({ ratio: '4/5', label: ch.label, imageId: ch.imageId }) + MOTIF.ribbon() + '</div>' +
          '<p class="ex-num">' + (i + 1) + '<i></i></p>' +
          '<h3>' + esc(ch.name) + '</h3>' +
          '<p>' + esc(ch.q || t.question || '') + '</p>' +
          '<a class="ex-pill ex-ripple ex-jump" href="#' + ch.anchor + '">Explore<span class="visually-hidden"> ' + esc(ch.name) + '</span></a>' +
        '</li>';
      }).join('') + '</ol></div></section>';
  };

  R.banner = function () {
    return '<section class="ex-sec ex-banner-sec" aria-labelledby="banner-title">' + MOTIF.band('ex-band-behind') +
      '<div class="ex-wrap"><div class="ex-banner ex-zoomable">' +
        frame({ ratio: '21/8', tone: '#2B3F45', label: 'Photo · Train Street, Hà Nội', imageId: 'img-hangma', cls: 'ex-banner-fr' }) +
        '<div class="ex-scrim"></div>' +
        '<div class="ex-banner-in"><h2 id="banner-title">Start in Hà Nội</h2>' +
          '<p>Our stories are set in the capital. Customs differ between regions, families and places, and each story says where it applies.</p>' +
          pill('#everyday', 'Take me there', 'ex-pill-light ex-jump') + '</div>' +
      '</div></div></section>';
  };

  R.chapterOpen = function (ch, i) {
    var t = topic(ch.topic) || {};
    return '<header class="ex-ch-open">' +
      '<p class="ex-num">' + (i + 1) + '<i></i></p>' +
      '<h2 id="' + ch.anchor + '-title">' + esc(ch.name) + '</h2>' +
      '<p class="ex-ch-q">' + esc(ch.q || t.question || '') + '</p>' +
      '<p class="ex-ch-vi" lang="vi">' + esc(ch.vi || t.vi || '') + '</p>' +
      (LEADS[ch.anchor] ? '<p class="ex-ch-lead">' + esc(LEADS[ch.anchor]) + '</p>' : '') +
      MOTIF.ribbon() +
    '</header>';
  };

  R.accordion = function () {
    var t = topic('people');
    var items = [];
    var ctx = CC.byId((CC.byId(CC.countries, COUNTRY) || {}).contexts, 'street');
    if (ctx) items.push({ kind: 'Place', title: ctx.title, text: ctx.line, href: CC.sceneHref(ctx.sceneId), label: ctx.caption, imageId: ctx.imageId, vi: ctx.local });
    ['st-arrive-home', 'st-hand', 'st-photo-ask', 'st-keep-cool', 'st-family-words', 'st-market'].forEach(function (id) {
      var st = story(id); if (!st) return;
      items.push({ kind: 'Story', title: st.title, text: st.dek, href: storyHref(st), label: 'Photo · ' + st.title, imageId: st.imageId });
    });
    return '<section class="ex-sec ex-acc-sec" aria-labelledby="acc-title">' + MOTIF.band('ex-band-behind') +
      '<div class="ex-wrap">' + head('Moments on the street and at home', 'Hover or tab through. Each strip opens one moment you might meet in Hà Nội.', 'acc-title') +
      '<ul class="ex-acc" data-acc>' + items.map(function (it, i) {
        return '<li class="ex-acc-item' + (i === 0 ? ' is-open' : '') + '">' +
          '<a href="' + esc(it.href) + '" class="ex-acc-link">' +
            '<div class="ex-acc-win">' + frame({ cls: 'ex-acc-fr', label: it.label, imageId: it.imageId }) + '<div class="ex-scrim"></div></div>' +
            '<span class="ex-acc-short" aria-hidden="true">' + esc(it.title) + '</span>' +
            '<span class="ex-acc-text"><span class="ex-eyebrow">' + esc(it.kind) + '</span>' +
              '<span class="ex-acc-title">' + esc(it.title) + '</span>' +
              '<span class="ex-acc-desc">' + esc(firstSentence(it.text)) + '</span></span>' +
          '</a></li>';
      }).join('') + '</ul></div></section>';
  };

  R.chips = function (s) {
    return '<nav class="ex-sec ex-chips-sec" aria-label="' + esc(s.label || 'Themes') + '"><div class="ex-wrap">' +
      (s.title ? '<p class="ex-chips-title">' + esc(s.title) + '</p>' : '') +
      '<ul class="ex-chips">' + (CC.topics || []).filter(function (t) { return t.country === COUNTRY; }).map(function (t) {
        var planned = t.status !== 'ready';
        return '<li><a class="ex-chip ex-ripple" href="vietnam-classic.html#' + t.id + '"' + (planned ? ' aria-describedby="chip-planned"' : '') + '>' + esc(t.label) + (planned ? ' <small>not written yet</small>' : '') + '</a></li>';
      }).join('') + '</ul><span class="visually-hidden" id="chip-planned">This theme has no stories yet.</span></div></nav>';
  };


  R.clusters = function () {
    var ctx = CC.byId((CC.byId(CC.countries, COUNTRY) || {}).contexts, 'table');
    var no = phrase('ph-no');
    var tiles = [
      { area: 'a', eyebrow: 'Hà Nội', title: ctx.title, text: ctx.line, href: CC.sceneHref(ctx.sceneId), label: ctx.caption, imageId: ctx.imageId, vi: ctx.local },
      { area: 'b', eyebrow: 'Story', st: 'st-shared-table' },
      { area: 'c', eyebrow: 'Story', st: 'st-host' },
      { area: 'd', eyebrow: 'Story', st: 'st-street-stall' },
      { area: 'e', eyebrow: 'Story', st: 'st-chop' },
      { area: 'f', eyebrow: 'Phrase', title: no.vi, text: no.meaning, href: 'explore.html', label: 'Graphic · phrase card', vi: true }
    ].map(function (x) {
      if (x.st) { var s = story(x.st); x.title = s.title; x.text = s.dek; x.href = storyHref(s); x.label = 'Photo · ' + s.title; x.imageId = s.imageId; }
      return x;
    });
    return '<section class="ex-sec" aria-labelledby="cl-title"><div class="ex-wrap">' +
      head('Around one table', 'Shared dishes, a host who keeps filling your bowl, and what to do with your chopsticks.', 'cl-title') +
      '<ul class="ex-clusters">' + tiles.map(function (x) {
        return '<li class="ex-cl ex-zoomable" style="grid-area:' + x.area + '"><a href="' + esc(x.href) + '">' +
          frame({ label: x.label, imageId: x.imageId }) + '<div class="ex-scrim"></div>' +
          '<span class="ex-cl-text"><span class="ex-eyebrow">' + esc(x.eyebrow) + '</span>' +
          '<span class="ex-cl-title"' + (x.vi === true ? ' lang="vi"' : '') + '>' + esc(x.title) + '</span>' +
          '<span class="ex-cl-desc">' + esc(firstSentence(x.text)) + '</span></span></a></li>';
      }).join('') + '</ul>' +
      '<p class="ex-center">' + pill('vietnam-classic.html#food', 'Explore food &amp; dining') + '</p></div></section>';
  };



  R.inline = function () {
    var pins = [
      { x: 50, y: 88, name: 'Văn Miếu Gate', vi: 'Văn Miếu Môn' },
      { x: 50, y: 66, name: 'Constellation of Literature pavilion', vi: 'Khuê Văn Các' },
      { x: 50, y: 50, name: 'Well of Heavenly Clarity and the stelae', vi: 'Thiên Quang Tỉnh' },
      { x: 50, y: 32, name: 'Great Success courtyard', vi: 'Đại Thành' },
      { x: 50, y: 14, name: 'National Academy', vi: 'Thái Học' }
    ];
    var STOPS = [{"text":"The walk starts at a two-storey gate with three arches and the words Văn Miếu Môn above the middle one. Stone dragons guard it: Lê-period ones outside, Nguyễn-period ones inside. Straight ahead, Đại Trung gate leads on, with two small side gates named Thành Đức (“becoming virtuous”) and Đạt Tài (“reaching talent”).","imageId":"img-vm-gate"},{"text":"Built in 1805, this little two-storey pavilion has eight roofs and a round window on each side whose spokes stand for the rays of Khuê, the star of literature. Scholars’ best poems were once read aloud here. Today it is the symbol of Hà Nội.","imageId":"img-vm-khuevan"},{"text":"A square pond sits at the centre of the third courtyard. On either side stand the 82 stone stelae, each on a stone turtle, erected between 1484 and 1780 with the names and home villages of the doctoral laureates of 82 examinations. The site asks visitors not to touch them.","imageId":"img-vm-well"},{"text":"Through Đại Thành gate is a wide brick courtyard. Its side halls once held tablets for Confucius’s 72 disciples and Vietnamese scholars; at the end are the Đại Bái hall and the sanctuary of Confucius. A bronze bell cast in 1768 hangs on the left, a stone chime on the right. This is a place of worship, so keep your voice down.","imageId":"img-vm-daithanh"},{"text":"The last courtyard stands on the site of the old academy. It became a temple when the Nguyễn moved the school to Huế, burned in 1946–1947, and was rebuilt as Thái Học house in 2000. Upstairs are altars to the three kings who built and grew the school, Lý Thánh Tông, Lý Nhân Tông and Lê Thánh Tông; downstairs honours the teacher Chu Văn An.","imageId":"img-vm-thaihoc"}];
    pins.forEach(function (p, i) { p.text = STOPS[i].text; });
    return '<section class="ex-sec" aria-labelledby="inl-title"><div class="ex-wrap">' +
      head('Walk through Văn Miếu', 'Five courtyards from the gate to the academy. Choose a number to read about that stop.', 'inl-title') +
      '<div class="ex-inline" data-inline>' +
        '<div class="ex-inline-map">' + frame({ ratio: '3/4', tone: '#3D5B55', kind: 'plan', label: 'Illustrated plan · Văn Miếu – Quốc Tử Giám' }) +
          '<svg class="ex-inline-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 92 V 10"/></svg>' +
          pins.map(function (p, i) {
            return '<button type="button" class="ex-pin" style="left:' + p.x + '%;top:' + p.y + '%" data-pin="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Stop ' + (i + 1) + ': ' + esc(p.name) + '"><span>' + (i + 1) + '</span></button>';
          }).join('') + '</div>' +
        '<ol class="ex-inline-list">' + pins.map(function (p, i) {
          return '<li class="' + (i === 0 ? 'is-on' : '') + '" data-pin-item="' + i + '">' +
            '<button type="button" data-pin="' + i + '" aria-expanded="' + (i === 0) + '" aria-controls="pin-body-' + i + '"><span class="ex-pin-n">' + (i + 1) + '</span><span><b>' + esc(p.name) + '</b> <i lang="vi">' + esc(p.vi) + '</i></span></button>' +
            '<div class="ex-pin-body" id="pin-body-' + i + '"><p>' + esc(p.text) + '</p><p class="ex-pin-src"><a href="story.html?id=st-van-mieu-university&amp;from=overview">Sources and more on Văn Miếu</a></p></div></li>';
        }).join('') + '</ol>' +
      '</div></div></section>';
  };

  R.large = function (s) {
    s = s || {};
    var ids = s.ids || (topic('beliefs') || {}).storyIds || [];
    var hid = s.id || 'large-title';
    return '<section class="ex-sec" aria-labelledby="' + hid + '"><div class="ex-wrap">' +
      head(s.title || 'Read before you visit', s.sub || '', hid) +
      '<ul class="ex-large">' + ids.map(story).filter(Boolean).map(function (st) {
        return '<li class="ex-large-card ex-zoomable"><a href="' + storyHref(st) + '">' + frame({ ratio: '16/11', label: 'Photo · ' + st.place, imageId: st.imageId }) + '<div class="ex-scrim"></div>' +
          '<span class="ex-large-text"><span class="ex-eyebrow">' + esc(st.place.split(',')[0]) + '</span><span class="ex-large-title">' + esc(st.title) + '</span><span class="ex-large-desc">' + esc(st.dek) + '</span>' +
          '<span class="ex-large-go">Read the story ' + ic('arrowRight') + '</span></span></a></li>';
      }).join('') + '</ul></div></section>';
  };

  R.quote = function () {
    return '<section class="ex-sec ex-quote-sec" aria-label="Quotation">' + MOTIF.drum('ex-quote-drum') +
      '<div class="ex-wrap"><figure class="ex-quote">' +
        '<blockquote><p lang="vi">Hiền tài là nguyên khí của quốc gia.</p><p>People of talent and virtue are the life-breath of the nation.</p></blockquote>' +
        '<figcaption>Thân Nhân Trung, inscription for the examination of 1442, carved on the first doctoral stele at Văn Miếu in 1484. Translation ours.</figcaption>' +
      '</figure></div></section>';
  };

  R.game = function () {
    var a = { name: 'The Temple of Literature is founded', year: '1070', label: 'Photo · Văn Miếu gate', imageId: 'img-vm-gate' };
    var b = { name: 'The first doctoral stelae are carved', year: '1484', label: 'Photo · a stele on its tortoise', imageId: 'img-stelae' };
    function card(x, which) {
      return '<li><button type="button" class="ex-game-card ex-zoomable" data-game="' + which + '" aria-pressed="false">' +
        '<span class="ex-game-inner">' +
          '<span class="ex-game-face">' + frame({ ratio: '4/5', label: x.label, imageId: x.imageId }) + '<div class="ex-scrim"></div><span class="ex-game-name">' + esc(x.name) + '</span></span>' +
          '<span class="ex-game-back"><span class="ex-game-year">' + x.year + '</span><span class="ex-game-name">' + esc(x.name) + '</span></span>' +
        '</span></button></li>';
    }
    return '<section class="ex-sec" aria-labelledby="game-title"><div class="ex-wrap">' +
      head('Which came first?', 'Choose the one you think is older. Both cards turn over.', 'game-title') +
      '<div class="ex-game" data-game-wrap><ul>' + card(a, 'a') + '<li class="ex-game-or" aria-hidden="true">or</li>' + card(b, 'b') + '</ul>' +
        '<p class="ex-game-msg" role="status" aria-live="polite"></p>' +
        '<p class="ex-center"><button type="button" class="ex-pill ex-ripple" data-game-reset hidden>' + ic('flip') + ' Play again</button></p>' +
        '<p class="ex-center ex-game-note">Dates from Tuổi Trẻ and the UNESCO Memory of the World record. <a href="story.html?id=st-stelae&amp;from=overview">Read about the stelae</a></p>' +
      '</div></div></section>';
  };

  R.tiles = function () {
    var list = CC.phrases || [];
    return '<section class="ex-sec" id="words" aria-labelledby="tiles-title" tabindex="-1"><div class="ex-wrap">' +
      head('Words to carry', 'Every phrase in the phrasebook. Press the circle to hear it (a computer voice for now, labelled as such).', 'tiles-title') +
      '<div class="ex-rib" data-ribbon><ul class="ex-rib-track ex-tiles">' + list.map(function (p, i) {
        var a = CC.byId(CC.assets, p.audioId);
        return '<li class="ex-tile" style="--tone:' + TONES[i % TONES.length] + '">' +
          '<p class="ex-tile-vi" lang="vi">' + esc(p.vi) + '</p>' +
          '<button type="button" class="ex-tile-play ex-ripple" data-audio="' + esc(p.audioId) + '" aria-pressed="false"' + (a && a.file ? '' : ' aria-disabled="true"') + ' aria-label="Listen: ' + esc(p.vi) + '">' + ic('listen') + '</button>' +
          '<p class="ex-tile-en">' + esc(p.meaning) + '</p></li>';
      }).join('') + '</ul>' + arrowBtns() + '</div>' +
      '<p class="ex-center">' + pill('phrases.html', 'Open the phrasebook') + '</p></div></section>';
  };

  /* the five places of the game, with the player's progress in each; every card opens the game on that place */
  R.places = function () {
    var all = ((CC.store.get('explore', {}) || {}).zones) || {};
    var zones = (CC.exploreZones || []).filter(function (z) { return z.country === COUNTRY; });
    function status(z) {
      var s = all[z.id], n = (z.objectives || []).length;
      if (!s) return { label: 'Not started', cls: '' };
      var k = (z.objectives || []).filter(function (o) { var st = s.steps && (s.steps[o.step] || s.steps[(z.sceneId || '') + ':' + o.step]); return st && st.choice; }).length;
      if (s.done || (n && k >= n)) return { label: 'Stamp collected', cls: ' is-done' };
      return { label: k ? k + ' of ' + n + ' moments' : 'Started', cls: ' is-going' };
    }
    return '<section class="ex-sec ex-places-sec" id="places" aria-labelledby="places-title" tabindex="-1"><div class="ex-wrap">' +
      head('Places in the game', 'Each place is a short episode of three to six moments. Play one when you have five minutes.', 'places-title') +
      '<ul class="ex-places">' + zones.map(function (z) {
        var st = status(z);
        return '<li class="ex-place' + st.cls + '"><a href="explore.html#' + esc(z.id) + '">' +
          '<span class="ex-place-stamp" aria-hidden="true">' + esc(z.stamp || z.title) + '</span>' +
          '<span class="ex-place-txt"><span class="ex-place-title">' + esc(z.title) + '</span>' +
          '<span class="ex-place-meta">About ' + z.minutes + ' min · ' + (z.objectives || []).length + ' moments · <b>' + st.label + '</b></span></span>' +
          '<span class="ex-place-go">Play' + ic('arrowRight') + '</span></a></li>';
      }).join('') + '</ul></div></section>';
  };

  R.nav = function () {
    var links = [
      ['explore.html', 'Play Hà Nội', 'Walk through five places in a small pixel-art game and collect a passport stamp in each.', 'scene'],
      ['collection.html', 'Your passport', 'Stamps, facts, phrases and stories you have kept, ready to print.', 'bookmark'],
      ['about.html', 'Method & sources', 'How we write, what we leave out, and every source we cite.', 'source'],
      ['index.html', 'Other destinations', 'Turn the globe. Vietnam is the only one with sourced stories so far.', 'globe']
    ];
    return '<section class="ex-sec ex-nav-sec" aria-labelledby="nav-title"><div class="ex-wrap">' + head('Keep exploring', null, 'nav-title') +
      '<ul class="ex-navcards">' + links.map(function (l) {
        return '<li class="ex-zoomable"><a href="' + l[0] + '">' + frame({ ratio: '1/1', label: '', cls: 'ex-nav-fr' }) +
          '<span class="ex-nav-ic">' + CC.icon(l[3]) + '</span>' +
          '<span class="ex-nav-text"><span class="ex-nav-title">' + esc(l[1]) + '</span><span class="ex-nav-desc">' + esc(l[2]) + '</span></span>' +
          '<span class="ex-nav-go">' + ic('arrowRight') + '</span></a></li>';
      }).join('') + '</ul></div></section>';
  };

  R.before = function () {
    var ext = '<span class="visually-hidden"> (opens in a new tab)</span>';
    return '<section class="ex-sec ex-before-sec" aria-labelledby="before-title"><div class="ex-wrap"><div class="ex-before">' +
      '<span class="ex-before-ic">' + CC.icon('info') + '</span>' +
      '<div><h2 id="before-title">Before you go</h2>' +
      '<p>Visas, health, safety and money are not culture, so CultureCompass leaves them out. Check official advice: ' +
      '<a href="https://vietnam.travel/plan-your-trip/health-safety" target="_blank" rel="noopener">health and safety tips from the Vietnam National Authority of Tourism' + ext + '</a>, its ' +
      '<a href="https://vietnam.travel/faqs" target="_blank" rel="noopener">travel FAQs' + ext + '</a>, and your own government’s travel advice.</p></div>' +
    '</div></div></section>';
  };

  /* ================================================================
     PAGE CONFIG — editors reorder or remove entries here
     ================================================================ */
  var SECTIONS = [
    { type: 'hero' },
    { type: 'partners' },
    { type: 'toc' },
    { type: 'banner' },
    { type: 'chapter', ch: 0, modules: [
      { type: 'accordion' },
      { type: 'large', id: 'oq-title', title: 'Around the Old Quarter', sub: 'Trade streets, tea on the pavement, and the lake at dawn and at the weekend.', ids: ['st-old-quarter', 'st-pavement', 'st-hoan-kiem-days'] }
    ] },
    { type: 'chapter', ch: 1, modules: [
      { type: 'clusters' },
      { type: 'large', id: 'eat-title', title: 'What Hà Nội eats and drinks', sub: 'Three dishes the city is known for, and how to order at a pavement stall.', ids: ['st-pho', 'st-bun-cha', 'st-egg-coffee', 'st-street-stall'] }
    ] },
    { type: 'chapter', ch: 2, modules: [
      { type: 'quote' },
      { type: 'inline' },
      { type: 'large', id: 'past-title', title: 'A thousand years in Hà Nội', sub: 'A capital since 1010, a university since 1076, and a lake named after a legend.', ids: ['st-thang-long', 'st-van-mieu-university', 'st-stelae', 'st-sword-lake'] },
      { type: 'game' },
      { type: 'large', id: 'belief-title', title: 'Altars, temples and festivals', sub: 'What you will see in homes, on Hàng Mã and at the pagoda, and what a temple asks of visitors.', ids: ['st-temple-visit', 'st-sacred-places', 'st-family-altar', 'st-paper-offerings', 'st-tet', 'st-mother-goddess'] }
    ] },
    { type: 'places' },
    { type: 'nav' },
    { type: 'before' }
  ];

  function render() {
    var c = CC.byId(CC.countries, COUNTRY);
    return SECTIONS.map(function (s) {
      if (s.type === 'chapter') {
        var ch = CHAPTERS[s.ch];
        return '<div class="ex-chapter" id="' + ch.anchor + '" data-anchor="' + ch.anchor + '" data-bg="' + ch.bg + '" role="region" aria-labelledby="' + ch.anchor + '-title" tabindex="-1">' +
          R.chapterOpen(ch, s.ch) + s.modules.map(function (m) { return R[m.type](m, c); }).join('') + '</div>';
      }
      return R[s.type](s, c);
    }).join('');
  }

  /* ================================================================
     BEHAVIOUR
     ================================================================ */
  function reduce() { return CC.motion.reduce(); }
  function each(sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); }

  /* image reveal: load when near, fade in when decoded */
  function initFrames() {
    var imgs = document.querySelectorAll('.fr-img[data-src]');
    if (!imgs.length) return;
    var load = function (img) {
      img.addEventListener('load', function () { img.closest('.fr').classList.add('is-loaded'); }, { once: true });
      img.src = img.getAttribute('data-src'); img.removeAttribute('data-src');
    };
    if (!('IntersectionObserver' in window)) { Array.prototype.forEach.call(imgs, load); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } });
    }, { rootMargin: '200px' });
    Array.prototype.forEach.call(imgs, function (i) { io.observe(i); });
  }

  /* heart + share */
  function initHeroActions() {
    var heart = document.getElementById('ex-heart');
    var liked = !!CC.store.get('exploreLiked.' + COUNTRY, false);
    var set = function (on) { heart.setAttribute('aria-pressed', on ? 'true' : 'false'); };
    set(liked);
    heart.addEventListener('click', function () {
      liked = !liked; set(liked);
      CC.store.set('exploreLiked.' + COUNTRY, liked);
      if (liked && !reduce()) { heart.classList.remove('is-pop'); void heart.offsetWidth; heart.classList.add('is-pop'); }
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-share]');
      if (!b) return;
      var url = new URL(b.getAttribute('data-share'), location.href).href;
      var title = b.getAttribute('data-share-title') || document.title;
      if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { CC.toast('Link copied.', 'check'); }, function () { CC.toast('Couldn’t copy the link. Copy it from the address bar.', 'alert'); });
      } else CC.toast('Copy the link from the address bar to share it.', 'info');
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-soon]');
      if (b) CC.toast('No 360° view or story for ' + b.getAttribute('data-soon') + ' yet.', 'info');
    });
  }

  /* accordion strip: hover or focus opens one, arrow keys walk; on phones it is a swipe row */
  function initAccordion() {
    each('[data-acc]', function (acc) {
      var items = Array.prototype.slice.call(acc.children);
      var open = function (li) {
        if (li.classList.contains('is-open')) return;
        items.forEach(function (x) { x.classList.toggle('is-open', x === li); });
      };
      items.forEach(function (li, i) {
        var a = li.querySelector('a');
        li.addEventListener('mouseenter', function () { if (matchMedia('(hover: hover) and (min-width: 769px)').matches) open(li); });
        a.addEventListener('focus', function () { open(li); });
        a.addEventListener('keydown', function (e) {
          var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (!k) return;
          e.preventDefault();
          var n = items[(i + k + items.length) % items.length];
          n.querySelector('a').focus();
          if (!matchMedia('(min-width: 769px)').matches) n.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
        });
      });
      /* phones: the card nearest the middle of the row is the open one */
      var raf = 0;
      acc.addEventListener('scroll', function () {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          if (matchMedia('(min-width: 769px)').matches) return;
          var mid = acc.getBoundingClientRect().left + acc.clientWidth / 2, best = null, bd = 1e9;
          items.forEach(function (x) { var r = x.getBoundingClientRect(); var d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = x; } });
          if (best) open(best);
        });
      }, { passive: true });
    });
  }

  /* horizontal ribbons: arrows appear only when there is more to see */
  function initRibbons() {
    each('[data-ribbon]', function (rib) {
      var track = rib.querySelector('.ex-rib-track');
      var prev = rib.querySelector('.ex-arrow-prev'), next = rib.querySelector('.ex-arrow-next');
      var sync = function () {
        var max = track.scrollWidth - track.clientWidth - 2;
        prev.hidden = track.scrollLeft <= 2;
        next.hidden = track.scrollLeft >= max;
      };
      [prev, next].forEach(function (b) {
        b.addEventListener('click', function () {
          track.scrollBy({ left: Number(b.getAttribute('data-dir')) * track.clientWidth * 0.86, behavior: reduce() ? 'auto' : 'smooth' });
        });
      });
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });
  }

  /* cover-stack: scale and z-index by distance from the centre card (prompt §4.2) */
  var SCALE = [1, 0.861, 0.78, 0.723, 0.678, 0.642, 0.611, 0.584];
  function initStack() {
    each('[data-stack]', function (stack) {
      var cards = Array.prototype.slice.call(stack.querySelectorAll('.ex-stack-card'));
      var count = stack.querySelector('.ex-stack-count');
      var active = Math.floor(cards.length / 2);
      var layout = function () {
        var w = cards[0].offsetWidth;
        var pos = [0];
        for (var k = 1; k < SCALE.length; k++) pos[k] = pos[k - 1] + w * (SCALE[k - 1] + SCALE[k]) / 2 * 0.42;
        cards.forEach(function (c, i) {
          var d = i - active, s = Math.min(Math.abs(d), SCALE.length - 1);
          var x = (d < 0 ? -1 : 1) * pos[s];
          c.style.transform = 'translateX(calc(-50% + ' + x.toFixed(1) + 'px)) scale(' + SCALE[s] + ')';
          c.style.zIndex = 10 - s;
          c.classList.toggle('is-center', d === 0);
          c.querySelector('a').setAttribute('tabindex', d === 0 ? '0' : '-1');
          c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        });
        count.textContent = (active + 1) + ' of ' + cards.length;
      };
      var go = function (i, focus) {
        active = Math.max(0, Math.min(cards.length - 1, i));
        layout();
        if (focus) cards[active].querySelector('a').focus({ preventScroll: true });
      };
      cards.forEach(function (c, i) {
        c.addEventListener('mouseenter', function () { if (matchMedia('(hover: hover)').matches && i !== active) go(i); });
        c.addEventListener('click', function (e) { if (i !== active) { e.preventDefault(); go(i); } });
      });
      stack.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1, true); }
      });
      each('[data-stack-dir]', function (b) { b.addEventListener('click', function () { go(active + Number(b.getAttribute('data-stack-dir'))); }); }, stack);
      var x0 = null;
      stack.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      stack.addEventListener('touchend', function (e) {
        if (x0 == null) return;
        var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      });
      window.addEventListener('resize', layout);
      layout();
    });
  }

  /* numbered pins on the plan ⇄ list beside it */
  function initInline() {
    each('[data-inline]', function (box) {
      var set = function (n) {
        each('.ex-pin', function (p) { p.setAttribute('aria-pressed', String(Number(p.getAttribute('data-pin')) === n)); }, box);
        each('[data-pin-item]', function (li) {
          var on = Number(li.getAttribute('data-pin-item')) === n;
          li.classList.toggle('is-on', on);
          li.querySelector('button').setAttribute('aria-expanded', String(on));
        }, box);
      };
      box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-pin]');
        if (b) set(Number(b.getAttribute('data-pin')));
      });
    });
  }

  /* which came first: choose one, both turn over */
  function initGame() {
    each('[data-game-wrap]', function (g) {
      var msg = g.querySelector('.ex-game-msg'), reset = g.querySelector('[data-game-reset]');
      var cards = g.querySelectorAll('[data-game]');
      g.addEventListener('click', function (e) {
        var c = e.target.closest('[data-game]');
        if (!c || g.classList.contains('is-done')) return;
        g.classList.add('is-done');
        c.setAttribute('aria-pressed', 'true');
        var right = c.getAttribute('data-game') === 'a';
        msg.innerHTML = (right ? '<b>Yes.</b> ' : '<b>Not quite.</b> ') + 'The temple came first, in 1070. The first stelae were carved more than four centuries later, in 1484.';
        reset.hidden = false;
      });
      reset.addEventListener('click', function () {
        g.classList.remove('is-done'); msg.textContent = ''; reset.hidden = true;
        Array.prototype.forEach.call(cards, function (c) { c.setAttribute('aria-pressed', 'false'); });
        cards[0].focus();
      });
    });
  }

  /* chapters: jump links scroll smoothly, the URL follows the chapter you are reading */
  function initChapters() {
    var chapters = document.querySelectorAll('[data-anchor]');
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.ex-jump, .ex-hero-down');
      if (!a) return;
      var id = a.getAttribute('href').slice(1), el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      CC.motion.scrollTo(el);
      if (el.hasAttribute('data-anchor')) history.replaceState(null, '', '#' + id);
      el.focus({ preventScroll: true });
    });
    if (!('IntersectionObserver' in window)) return;
    var current = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var id = e.target.getAttribute('data-anchor');
        if (e.isIntersecting) { current = id; history.replaceState(null, '', '#' + id); }
        else if (current === id) { current = null; history.replaceState(null, '', location.pathname + location.search); }
        if (e.isIntersecting && !reduce()) e.target.classList.add('is-drawn');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(chapters, function (c) { io.observe(c); });
    /* draw each chapter's ribbon the first time it comes into view */
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-drawn'); io2.unobserve(e.target); } });
    }, { threshold: 0.25 });
    each('.ex-ch-open, .ex-toc-tile', function (el) { io2.observe(el); });
  }

  /* Links written for the earlier compass page (story back links, sub-navigation, hanoi.html, countries.json)
     still arrive with its anchors: #overview, #themes, #practice, a theme id or one of its old aliases.
     Each one lands on the nearest section here. */
  var HASH_ALIAS = { overview: 'top', themes: 'contents', practice: 'practise', scenes: 'practise', places: 'everyday' };
  var TOPIC_ANCHOR = { people: 'everyday', food: 'food', beliefs: 'beliefs', history: 'history', language: 'words', arts: 'contents' };
  function resolveHash(raw) {
    var key = String(raw || '').replace(/^#/, '');
    if (!key || document.getElementById(key)) return key ? document.getElementById(key) : null;
    if (HASH_ALIAS[key]) return document.getElementById(HASH_ALIAS[key]);
    var bare = key.replace(/^topic-/, '');
    var t = (CC.topics || []).filter(function (x) { return x.id === bare || (x.aliases || []).indexOf(bare) !== -1; })[0];
    return t && TOPIC_ANCHOR[t.id] ? document.getElementById(TOPIC_ANCHOR[t.id]) : null;
  }
  function goToHash(smooth) {
    var el = resolveHash(location.hash);
    if (!el) return;
    if (location.hash.slice(1) !== el.id) history.replaceState(null, '', el.id === 'top' ? location.pathname + location.search : '#' + el.id);
    if (smooth) CC.motion.scrollTo(el); else el.scrollIntoView({ behavior: 'instant', block: 'start' });
    if (el.hasAttribute('tabindex')) el.focus({ preventScroll: true });
  }

  /* the "keep it" toast after you have read a while; dismissal is remembered */
  function initToast() {
    var key = 'exploreToast.' + COUNTRY;
    if (CC.store.get(key, false)) return;
    var t = document.createElement('aside');
    t.className = 'ex-toast';
    t.setAttribute('aria-label', 'Keep Vietnam for your trip');
    t.innerHTML = '<div class="ex-toast-pic">' + frame({ ratio: '1/1', tone: '#94703F', label: 'Illustration' }) + '</div>' +
      '<div class="ex-toast-text"><p class="ex-toast-title">Keep Vietnam for your trip</p><p>Save stories and phrases with the bookmark. They stay in this browser, ready to print.</p></div>' +
      '<div class="ex-toast-act"><button type="button" class="ex-toast-no">No, thanks</button><a class="ex-pill ex-pill-light ex-ripple" href="#stories">Show me</a></div>';
    document.body.appendChild(t);
    var shown = false;
    var close = function () { t.classList.remove('is-in'); CC.store.set(key, true); setTimeout(function () { t.remove(); }, 320); window.removeEventListener('scroll', onScroll); };
    var onScroll = function () {
      var p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      if (!shown && p > 0.4) { shown = true; t.classList.add('is-in'); }
    };
    t.querySelector('.ex-toast-no').addEventListener('click', close);
    t.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault(); close(); var s = document.getElementById('stories'); CC.motion.scrollTo(s);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    CC.renderShell({ section: 'destinations', country: COUNTRY, sub: 'overview' });
    var main = document.getElementById('explore');
    main.innerHTML = render();
    initFrames();
    initHeroActions();
    initAccordion();
    initRibbons();
    initStack();
    initInline();
    initGame();
    initChapters();
    initToast();
    /* jump once the DOM exists, and again after load, when the browser's own fragment handling has run */
    goToHash(false);
    window.addEventListener('load', function () { requestAnimationFrame(function () { goToHash(false); }); });
    window.addEventListener('hashchange', function () { goToHash(true); });
  });
})();
