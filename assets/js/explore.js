/* CultureCompass — country reading page (vietnam.html). The earlier compass page lives on as vietnam-classic.html.
   Layout "Field Atlas": a cover, a contents list, then one chapter per theme. On wide screens each chapter keeps a
   picture (the plate) still on the left while the reading column scrolls on the right; the plate changes with the
   section you are reading. Styles: assets/css/read.css (loaded last on this page).
   The page is the SECTIONS config below; each module is one render function. Every picture comes from CC.assets
   (photo or video), a scene painting, or the pixel art of an Explore zone, and is credited at the foot of the page.
   Plain script, no modules, so the page also works from file://. */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc;
  var COUNTRY = 'vietnam';

  /* ---------------- icons (same 24-grid, 1.75 stroke as core.js) ---------------- */
  var P = {
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
    share: '<circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="6" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6"/>',
    pause: '<path d="M8.5 5.5v13M15.5 5.5v13"/>',
    play: '<path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none"/>',
    chevronDown: '<path d="M6 9.5l6 6 6-6"/>',
    flip: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>'
  };
  function ic(name, cls) {
    if (!P[name]) return CC.icon(name, cls);
    return '<svg class="cc-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + P[name] + '</svg>';
  }
  var GO = ic('arrowRight', 'rd-go');

  /* ---------------- data helpers ---------------- */
  function story(id) { return CC.byId(CC.stories, id); }
  function topic(id) { return CC.byId(CC.topics, id); }
  function phrase(id) { return CC.byId(CC.phrases, id); }
  function asset(id) { return id ? CC.byId(CC.assets, id) : null; }
  var CUR = null;   // the chapter being rendered: a story opened from it comes back to it
  function storyHref(st) { return 'story.html?id=' + st.id + '&from=' + (CUR ? 'vn:' + CUR : 'overview'); }
  function country() { return CC.byId(CC.countries, COUNTRY) || {}; }
  function ctx(id) { return CC.byId(country().contexts, id); }

  /* ---------------- pictures ----------------
     pic() resolves one picture from an asset id, a story or a scene, in this order: credited photo or video,
     scene painting, pixel art of the Explore zone. Every picture used is recorded for the credits list. */
  var USED = [];
  function credit(p) {
    if (!p || !p.credit) return;
    for (var i = 0; i < USED.length; i++) if (USED[i].key === p.key) return;
    USED.push(p);
  }
  function fromAsset(a) {
    if (!a) return null;
    var video = a.kind === 'video';
    return { key: a.id, src: video ? a.poster : a.file, video: video ? a.file : null, alt: a.alt || '', credit: a.credit, license: a.license, licenseUrl: a.licenseUrl, sourceUrl: a.sourceUrl, kind: video ? 'video' : (/^art-/.test(a.id) ? 'art' : 'photo') };
  }
  function fromScene(sceneId, small) {
    var art = CC.sceneArt && CC.sceneArt[sceneId];
    if (art) {
      var a = (CC.assets || []).filter(function (x) { return x.file === art.src; })[0] || {};
      return { key: a.id || 'art-' + sceneId, src: small ? 'assets/img/scenes/' + art.file + '-thumb.jpg' : art.src, alt: art.alt, credit: a.credit || 'Painting made for CultureCompass', license: a.license, licenseUrl: a.licenseUrl, kind: 'art', pins: art.pins };
    }
    var z = CC.zoneForScene && CC.zoneForScene(sceneId);
    if (z) return zonePic(z);
    return null;
  }
  function zonePic(z) {
    return { key: 'zone-' + z.id, src: 'assets/img/explore/' + z.id + '.jpg', alt: 'Pixel-art view of ' + z.title + ' in the Explore game', credit: 'Pixel art from the CultureCompass Explore game', kind: 'pixel' };
  }
  function pic(o) {
    o = o || {};
    var p = null;
    if (o.imageId) p = fromAsset(asset(o.imageId));
    if (!p && o.story) p = o.story.imageId ? fromAsset(asset(o.story.imageId)) : null;
    if (!p && o.story && o.story.sceneId) p = fromScene(o.story.sceneId, o.small);
    if (!p && o.sceneId) p = fromScene(o.sceneId, o.small);
    return p;
  }
  /* zoom into one painted detail: a pin of the scene painting (800 x 450 space) */
  function focusOn(p, pinId, zoom) {
    if (!p || !p.pins) return p;
    var pin = p.pins.filter(function (x) { return x[0] === pinId; })[0];
    if (!pin) return p;
    var q = {}; for (var k in p) q[k] = p[k];
    q.focus = [Math.round(pin[1] / 8), Math.round(pin[2] / 4.5)]; q.zoom = zoom || 1.7;
    return q;
  }
  /* one picture as <img>, or a muted looping <video> with its poster */
  function media(p, o) {
    o = o || {};
    if (!p) return '';
    credit(p);
    var style = '';
    if (p.focus) style = ' style="object-position:' + p.focus[0] + '% ' + p.focus[1] + '%;transform-origin:' + p.focus[0] + '% ' + p.focus[1] + '%;transform:scale(' + p.zoom + ')"';
    else if (o.pos) style = ' style="object-position:' + o.pos + '"';
    var cls = 'rd-media' + (p.kind === 'pixel' ? ' is-pixel' : '') + (o.cls ? ' ' + o.cls : '');
    var alt = o.decorative ? '' : p.alt;
    if (p.video && o.video) {
      return '<video class="' + cls + '" data-autoplay muted loop playsinline preload="none" poster="' + esc(p.src) + '"' + (alt ? ' aria-label="' + esc(alt) + '"' : ' aria-hidden="true"') + style + '><source src="' + esc(p.video) + '"></video>';
    }
    return '<img class="' + cls + '" src="' + esc(p.src) + '" alt="' + esc(alt) + '" loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async"' + style + '>';
  }
  function creditLine(p) {
    if (!p || !p.credit) return '';
    return '<span class="rd-credit">' + esc(p.credit) + (p.license && p.license.length < 40 ? ', ' + esc(p.license) : '') + '</span>';
  }
  function videoToggle(label) {
    return '<button type="button" class="rd-vbtn" data-vtoggle aria-pressed="false">' + ic('pause') + '<span class="visually-hidden">Pause ' + esc(label) + '</span></button>';
  }

  /* ---------------- shared bits ---------------- */
  function head(level, title, sub, id) {
    return '<header class="rd-head rd-rise"><h' + level + (id ? ' id="' + id + '"' : '') + '>' + title + '</h' + level + '>' + (sub ? '<p>' + sub + '</p>' : '') + '</header>';
  }
  function link(href, label, cls) {
    return '<a class="rd-link' + (cls ? ' ' + cls : '') + '" href="' + href + '">' + label + GO + '</a>';
  }
  /* Where a link goes is always visible before you press it:
     a story says "N min read →", the game says "▶ Play · about N min", a jump on this page points down,
     and a phrase is not a link at all (it plays and saves where it is). */
  function playTag(sceneId) {
    var z = CC.zoneForScene && CC.zoneForScene(sceneId);
    return '<span class="rd-play">' + ic('play') + 'Play' + (z && z.minutes ? ' · about ' + z.minutes + ' min' : '') + '</span>';
  }
  function jump(id, label, cls) {
    return '<a class="rd-link' + (cls ? ' ' + cls : '') + '" href="#' + id + '" data-jump>' + label + ic('arrowDown', 'rd-go') + '</a>';
  }

  /* ================================================================
     CHAPTERS — what each theme is called and which picture stands beside it
     ================================================================ */
  var LEADS = {"everyday":"Hà Nội life spills onto the street: tea on the pavement, prices agreed at the market, a word for “you” chosen with care. These stories start at the door of a family home and end by the lake.","food":"Most meals here are shared, and many are eaten on a low stool by the road. Start with how a family table works, then try the city’s best-known bowls and cups.","beliefs":"A thousand years as a capital have left temples, stone stelae and legends all over the city, and most homes keep an altar of their own."};
  var CHAPTERS = [
    { anchor: 'everyday', topic: 'people', name: 'Everyday life', tone: 'cyan', imageId: 'img-old-quarter' },
    { anchor: 'food', topic: 'food', name: 'Food & the table', tone: 'gold', imageId: 'img-pho-ga' },
    { anchor: 'beliefs', topic: 'beliefs', name: 'Temples, beliefs & history', tone: 'jade', imageId: 'img-garden',
      q: 'What do people believe, remember and honour together?', vi: 'Tín ngưỡng & lịch sử' }
  ];
  function chQ(ch) { var t = topic(ch.topic) || {}; return ch.q || t.question || ''; }
  function chVi(ch) { var t = topic(ch.topic) || {}; return ch.vi || t.vi || ''; }

  /* ================================================================
     MODULES — each returns HTML for one section
     ================================================================ */
  var R = {};

  R.hero = function (s, c) {
    var p = pic({ imageId: 'vid-train-street' });
    return '<section class="rd-cover" id="top" aria-labelledby="ex-title">' +
      '<div class="rd-cover-media">' + media(p, { video: true, eager: true }) + '</div>' +
      '<div class="rd-cover-in">' +
        '<h1 id="ex-title" lang="vi">Việt Nam</h1>' +
        '<p class="rd-cover-tag">' + esc(c.name) + ', ' + esc(c.start.replace(/^Starting/, 'starting')) + '. ' + esc(c.intro) + '</p>' +
        '<div class="rd-cover-actions">' +
          '<a class="rd-btn" href="#contents" data-jump>Start reading' + ic('arrowDown') + '</a>' +
          '<a class="rd-btn rd-btn-quiet" href="explore.html">' + ic('play') + 'Play in Hà Nội</a>' +
          '<button type="button" class="rd-round ex-heart" id="ex-heart" aria-pressed="false" aria-label="Like Vietnam">' + ic('heart') + '</button>' +
          '<button type="button" class="rd-round" data-share="vietnam.html" data-share-title="Vietnam on CultureCompass" aria-label="Share this page">' + ic('share') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="rd-cover-foot">' + creditLine(p) + videoToggle('the train street video') + '</div>' +
    '</section>';
  };

  R.toc = function () {
    var src = CC.sources || [];
    var names = [src[0], src[1], src[2], src[4]].filter(Boolean);
    return '<section class="rd-sec rd-contents" id="contents" aria-labelledby="toc-title" tabindex="-1"><div class="rd-wrap rd-grid">' +
      '<div class="rd-contents-side">' + head(2, 'Three ways into Vietnam', 'Pick a chapter, or keep scrolling and let the page carry you.', 'toc-title') + '</div>' +
      '<ol class="rd-toc">' + CHAPTERS.map(function (ch) {
        return '<li class="rd-rise"><a href="#' + ch.anchor + '" data-jump>' +
          '<span class="rd-toc-pic">' + media(pic({ imageId: ch.imageId }), { decorative: true }) + '</span>' +
          '<span class="rd-toc-txt"><span class="rd-toc-name">' + esc(ch.name) + '</span>' +
            '<span class="rd-toc-q">' + esc(chQ(ch)) + '</span>' +
            '<span class="rd-link" aria-hidden="true">Read the chapter' + ic('arrowDown', 'rd-go') + '</span></span></a></li>';
      }).join('') + '</ol>' +
      '<p class="rd-sources rd-rise" id="sources">Built from sources such as ' + names.map(function (s) { return esc(s.org || s.title); }).join(', ') +
        ' <a href="about.html#sources">and ' + Math.max(0, src.length - names.length) + ' more sources</a></p></div></section>';
  };

  R.banner = function () {
    var p = pic({ imageId: 'img-hangma' });
    return '<section class="rd-sec rd-start" aria-labelledby="banner-title"><div class="rd-wrap rd-grid">' +
      '<figure class="rd-start-fig rd-rise">' + media(p) + '<figcaption>' + creditLine(p) + '</figcaption></figure>' +
      '<div class="rd-start-txt rd-rise"><h2 id="banner-title">Start in Hà Nội</h2>' +
        '<p>Our stories are set in the capital. Customs differ between regions, families and places, and each story says where it applies.</p>' +
        '<a class="rd-btn" href="#everyday" data-jump>Take me there' + GO + '</a></div>' +
    '</div></section>';
  };

  /* the chapter bar: every chapter, the one you are reading, and how far down the page you are */
  R.chbar = function () {
    var items = CHAPTERS.map(function (ch) { return [ch.anchor, ch.name]; }).concat([['places', 'Places in the game']]);
    return '<nav class="rd-chbar" aria-label="Chapters"><div class="rd-wrap">' +
      '<ul class="rd-chbar-list">' + items.map(function (x) { return '<li><a href="#' + x[0] + '" data-jump data-chlink="' + x[0] + '">' + esc(x[1]) + '</a></li>'; }).join('') + '</ul>' +
      '<label class="rd-chbar-pick"><span class="visually-hidden">Go to a chapter</span><select data-chpick>' +
        '<option value="contents">Contents</option>' + items.map(function (x) { return '<option value="' + x[0] + '">' + esc(x[1]) + '</option>'; }).join('') +
      '</select>' + ic('chevronDown') + '</label>' +
    '</div><span class="rd-progress" aria-hidden="true"><i></i></span></nav>';
  };

  R.chapterOpen = function (ch) {
    return '<header class="rd-open">' +
      '<h2 id="' + ch.anchor + '-title" class="rd-rise">' + esc(ch.name) + '</h2>' +
      '<p class="rd-open-vi rd-rise" lang="vi">' + esc(chVi(ch)) + '</p>' +
      '<p class="rd-open-q rd-rise">' + esc(chQ(ch)) + '</p>' +
      (LEADS[ch.anchor] ? '<p class="rd-open-lead rd-rise">' + esc(LEADS[ch.anchor]) + '</p>' : '') +
    '</header>';
  };

  /* moments: a strip of pictures; the open one shows its words. Hover previews, focus or a click opens. */
  R.accordion = function () {
    var items = [];
    var c = ctx('street');
    if (c) items.push({ title: c.title, text: c.line, href: CC.sceneHref(c.sceneId), play: c.sceneId, p: pic({ imageId: c.imageId }), pos: '30% 50%' });
    var crops = { 'st-arrive-home': 'hs-shoes', 'st-family-words': 'hs-family' };
    ['st-arrive-home', 'st-hand', 'st-photo-ask', 'st-keep-cool', 'st-family-words', 'st-market'].forEach(function (id) {
      var st = story(id); if (!st) return;
      var p = pic({ story: st });
      if (crops[id]) p = focusOn(p, crops[id], 1.6);
      items.push({ title: st.title, text: st.dek, href: storyHref(st), min: CC.storyMinutes(st), p: p, pos: id === 'st-hand' ? '75% 50%' : null });
    });
    return '<section class="rd-sec rd-moments" aria-labelledby="acc-title">' +
      head(3, 'Moments on the street and at home', 'Hover or tab through. Each strip opens one moment you might meet in Hà Nội.', 'acc-title') +
      '<ul class="rd-acc rd-rise" data-acc>' + items.map(function (it, i) {
        return '<li class="rd-acc-item' + (i === 0 ? ' is-open' : '') + '">' +
          '<a href="' + esc(it.href) + '" class="rd-acc-link">' +
            '<span class="rd-acc-win">' + media(it.p, { pos: it.pos, decorative: true }) + '</span>' +
            '<span class="rd-acc-short" aria-hidden="true">' + esc(it.title) + '</span>' +
            '<span class="rd-acc-text"><span class="rd-acc-title">' + esc(it.title) + '</span>' +
              '<span class="rd-acc-desc">' + esc(it.text) + '</span>' +
              (it.play ? playTag(it.play) : '<span class="rd-acc-read">' + esc(it.min) + ' min read' + GO + '</span>') + '</span>' +
          '</a></li>';
      }).join('') + '</ul></section>';
  };

  /* story list: the reading-page standard. Title, the whole standfirst, where and how long. */
  R.list = function (s) {
    s = s || {};
    var hid = s.id || 'list-title';
    return '<section class="rd-sec" aria-labelledby="' + hid + '">' + head(3, s.title, s.sub, hid) +
      '<ul class="rd-list">' + (s.ids || []).map(story).filter(Boolean).map(function (st) {
        return '<li class="rd-rise"><a class="rd-row" href="' + storyHref(st) + '">' +
          '<span class="rd-row-title">' + esc(st.title) + '</span>' +
          '<span class="rd-row-dek">' + esc(st.dek) + '</span>' +
          '<span class="rd-row-meta">' + esc(st.place) + ' · ' + CC.storyMinutes(st) + ' min read' + GO + '</span>' +
        '</a></li>';
      }).join('') + '</ul></section>';
  };

  /* around one table: the table, three of its customs, the stall and one phrase */
  R.clusters = function () {
    var c = ctx('table');
    var no = phrase('ph-no');
    var tiles = [
      { cls: 'is-wide', title: c.title, text: c.line, href: CC.sceneHref(c.sceneId), play: c.sceneId, p: pic({ imageId: c.imageId }) },
      { st: 'st-shared-table', pin: 'hs-dish', zoom: 1.5 },
      { st: 'st-host', pin: 'hs-bowl', zoom: 1.9 },
      { st: 'st-chop', pin: 'hs-chop', zoom: 2.6 }
    ].map(function (x) {
      if (x.st) { var s = story(x.st); x.title = s.title; x.text = s.dek; x.href = storyHref(s); x.min = CC.storyMinutes(s); x.p = pic({ story: s, small: !x.pin }); if (x.pin) x.p = focusOn(pic({ story: s }), x.pin, x.zoom); }
      return x;
    });
    return '<section class="rd-sec" aria-labelledby="cl-title">' +
      head(3, 'Around one table', 'Shared dishes, a host who keeps filling your bowl, and what to do with your chopsticks.', 'cl-title') +
      '<ul class="rd-table">' + tiles.map(function (x) {
        return '<li class="rd-tile rd-rise ' + (x.cls || '') + '"><a href="' + esc(x.href) + '">' +
          '<span class="rd-tile-pic">' + media(x.p, { decorative: true }) + '</span>' +
          '<span class="rd-tile-title">' + esc(x.title) + '</span>' +
          '<span class="rd-tile-dek">' + esc(x.text) + '</span>' +
          (x.play ? playTag(x.play) : '<span class="rd-row-meta">' + x.min + ' min read' + GO + '</span>') + '</a></li>';
      }).join('') + (no ? phraseTile(no) : '') +
      '</ul></section>';
  };

  /* a phrase is something to say, not a place to go: hear it and keep it, right here */
  function phraseTile(ph) {
    var a = asset(ph.audioId);
    return '<li class="rd-tile rd-phrase rd-rise"><div class="phrase">' +
      '<p class="rd-phrase-vi" lang="vi">' + esc(ph.vi) + '</p>' +
      '<p class="rd-phrase-mean">“' + esc(ph.meaning) + '”</p>' +
      (ph.useWith ? '<p class="rd-phrase-use">' + esc(ph.useWith) + '</p>' : '') +
      '<div class="rd-phrase-foot">' +
        '<button type="button" class="rd-btn rd-btn-quiet rd-listen" data-audio="' + esc(ph.audioId) + '" aria-pressed="false"' + (a && a.file ? '' : ' aria-disabled="true"') + '>' +
          ic('listen') + 'Listen<span class="visually-hidden">: ' + esc(ph.vi) + '</span></button>' +
        CC.saveButton('phrase', ph.id, { mini: true, name: ph.vi }) +
        (a && a.synthetic ? '<span class="rd-phrase-voice">Computer voice</span>' : '') +
      '</div>' +
      '<p class="cc-audio-msg rd-phrase-msg" role="status" aria-live="polite"></p>' +
    '</div></li>';
  }

  /* walk through Văn Miếu: a drawn plan of the five courtyards on their axis, and one stop open at a time */
  R.inline = function () {
    var pins = [
      { x: 2, name: 'Văn Miếu Gate', vi: 'Văn Miếu Môn' },
      { x: 40, name: 'Constellation of Literature pavilion', vi: 'Khuê Văn Các' },
      { x: 52.4, name: 'Well of Heavenly Clarity and the stelae', vi: 'Thiên Quang Tỉnh' },
      { x: 77.5, name: 'Great Success courtyard', vi: 'Đại Thành' },
      { x: 92.7, name: 'National Academy', vi: 'Thái Học' }
    ];
    var STOPS = [{"text":"The walk starts at a two-storey gate with three arches and the words Văn Miếu Môn above the middle one. Stone dragons guard it: Lê-period ones outside, Nguyễn-period ones inside. Straight ahead, Đại Trung gate leads on, with two small side gates named Thành Đức (“becoming virtuous”) and Đạt Tài (“reaching talent”)."},{"text":"Built in 1805, this little two-storey pavilion has eight roofs and a round window on each side whose spokes stand for the rays of Khuê, the star of literature. Scholars’ best poems were once read aloud here. Today it is the symbol of Hà Nội."},{"text":"A square pond sits at the centre of the third courtyard. On either side stand the 82 stone stelae, each on a stone turtle, erected between 1484 and 1780 with the names and home villages of the doctoral laureates of 82 examinations. The site asks visitors not to touch them."},{"text":"Through Đại Thành gate is a wide brick courtyard. Its side halls once held tablets for Confucius’s 72 disciples and Vietnamese scholars; at the end are the Đại Bái hall and the sanctuary of Confucius. A bronze bell cast in 1768 hangs on the left, a stone chime on the right. This is a place of worship, so keep your voice down."},{"text":"The last courtyard stands on the site of the old academy. It became a temple when the Nguyễn moved the school to Huế, burned in 1946–1947, and was rebuilt as Thái Học house in 2000. Upstairs are altars to the three kings who built and grew the school, Lý Thánh Tông, Lý Nhân Tông and Lê Thánh Tông; downstairs honours the teacher Chu Văn An."}];
    /* plan, gate on the left (south), north to the right; not to scale. Drawn as a site plan in ivory hairlines:
       a double outer wall, five courtyards (each one a [data-yard] group that lights up with its stop), and the
       features a visitor recognises: the three-way gate, old trees, Khuê Văn Các's round window, the square well
       with the 82 stelae in rows beside it, the halls of the temple and the academy with its bell and drum towers. */
    var r = function (x, y, w, h, c) { return '<rect' + (c ? ' class="' + c + '"' : '') + ' x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '"/>'; };
    var hall = function (x, y, w, h) {   // a building in plan: a block with its roof ridge along the long side
      var ridge = w > h ? '<line class="ridge" x1="' + (x + 6) + '" y1="' + (y + h / 2) + '" x2="' + (x + w - 6) + '" y2="' + (y + h / 2) + '"/>'
        : '<line class="ridge" x1="' + (x + w / 2) + '" y1="' + (y + 6) + '" x2="' + (x + w / 2) + '" y2="' + (y + h - 6) + '"/>';
      return r(x, y, w, h, 'hall') + ridge;
    };
    var trees = function (pts) { return pts.map(function (q) { return '<circle class="tree" cx="' + q[0] + '" cy="' + q[1] + '" r="' + (q[2] || 7) + '"/>'; }).join(''); };
    var stelae = '';
    [[70, 21], [90, 20], [210, 21], [230, 20]].forEach(function (row) {   // 82 stelae, as on the site
      for (var k = 0; k < row[1]; k++) stelae += r(422 + k * 9.9 + (row[1] === 20 ? 5 : 0), row[0] - 5, 4, 10, 'stela');
    });
    var yard = function (n, x, w, inner) { return '<g class="yard' + (n === 0 ? ' is-on' : '') + '" data-yard="' + n + '">' + r(x + 2, 38, w - 4, 224, 'court') +
      '<line class="axis" x1="' + (x - 8) + '" y1="150" x2="' + (x + w) + '" y2="150"/>' + inner + '</g>'; };   // the path runs through the gates
    var plan = '<svg class="rd-plan-svg" viewBox="0 0 1000 300" aria-hidden="true" focusable="false">' +
      '<rect class="wall" x="16" y="30" width="972" height="240"/><rect class="wall wall-in" x="22" y="36" width="960" height="228"/>' +
      yard(0, 22, 206, r(48, 62, 160, 62, 'lawn') + r(48, 176, 160, 62, 'lawn') + trees([[60, 50], [120, 50, 8], [186, 50], [70, 250, 8], [140, 250], [200, 250, 6]]) +
        hall(8, 116, 26, 68) + '<line class="arch" x1="21" y1="128" x2="21" y2="138"/><line class="arch" x1="21" y1="145" x2="21" y2="155"/><line class="arch" x1="21" y1="162" x2="21" y2="172"/>') +
      yard(1, 236, 162, r(256, 62, 118, 62, 'lawn') + r(256, 176, 118, 62, 'lawn') + trees([[268, 50, 6], [330, 50, 8], [290, 250, 8], [360, 250, 6]]) +
        hall(222, 128, 20, 44) + r(386, 60, 22, 22, 'hall') + r(386, 218, 22, 22, 'hall') +
        r(383, 133, 34, 34, 'hall') + '<circle class="window" cx="400" cy="150" r="9.5"/>') +
      yard(2, 406, 232, stelae + r(489, 114, 70, 72, 'well') + '<path class="ripple" d="M503 138h42M497 150h54M503 162h42"/>') +
      yard(3, 646, 182, hall(630, 128, 22, 44) + hall(664, 52, 110, 24) + hall(664, 224, 110, 24) + hall(782, 96, 34, 108)) +
      yard(4, 836, 146, hall(820, 134, 20, 32) + hall(896, 80, 62, 140) + hall(852, 54, 26, 26) + hall(852, 220, 26, 26)) +
            '<text x="988" y="296" text-anchor="end">North →</text></svg>';
    return '<section class="rd-sec rd-walk" aria-labelledby="inl-title">' +
      head(3, 'Walk through Văn Miếu', 'Five courtyards from the gate to the academy. Choose a number to read about that stop.', 'inl-title') +
      '<div data-inline>' +
      '<figure class="rd-plan rd-rise">' +
        '<div class="rd-plan-scroll"><div class="rd-plan-box">' + plan +
          pins.map(function (p, i) {
            return '<button type="button" class="rd-pin" style="--x:' + p.x + '" data-pin="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Stop ' + (i + 1) + ': ' + esc(p.name) + '">' + (i + 1) + '</button>';
          }).join('') + '</div></div>' +
        '<figcaption>Illustrated plan, not to scale · Văn Miếu – Quốc Tử Giám</figcaption></figure>' +
      '<ol class="rd-stops">' + pins.map(function (p, i) {
        return '<li class="' + (i === 0 ? 'is-on' : '') + '" data-pin-item="' + i + '">' +
          '<button type="button" data-pin="' + i + '" aria-expanded="' + (i === 0) + '" aria-controls="pin-body-' + i + '"><span class="rd-stop-n" aria-hidden="true">' + (i + 1) + '</span><span><b>' + esc(p.name) + '</b> <i lang="vi">' + esc(p.vi) + '</i></span></button>' +
          '<div class="rd-stop-body" id="pin-body-' + i + '"><p>' + esc(STOPS[i].text) + '</p>' +
          /* walk on without going back up to the plan */
          (i < pins.length - 1 ? '<button type="button" class="rd-stop-next" data-pin="' + (i + 1) + '" data-pin-next>Next stop: ' + esc(pins[i + 1].name) + GO + '</button>' : '') +
          '</div></li>';
      }).join('') + '</ol>' +
      '<p class="rd-after">' + link(esc(storyHref({ id: 'st-van-mieu-university' })), 'Read the full story of Văn Miếu, with sources') + '</p></div></section>';
  };

  /* a thousand years: the stories on a line of their own years (each year is the one the story itself gives) */
  var YEARS = { 'st-thang-long': 1010, 'st-van-mieu-university': 1070, 'st-sword-lake': 1428, 'st-stelae': 1484 };
  R.timeline = function (s) {
    var list = s.ids.map(story).filter(Boolean).sort(function (a, b) { return (YEARS[a.id] || 0) - (YEARS[b.id] || 0); });
    return '<section class="rd-sec" aria-labelledby="' + s.id + '">' + head(3, s.title, s.sub, s.id) +
      '<ol class="rd-time">' + list.map(function (st) {
        return '<li class="rd-rise"><span class="rd-year">' + (YEARS[st.id] || '') + '</span>' +
          '<a class="rd-row" href="' + storyHref(st) + '"><span class="rd-row-title">' + esc(st.title) + '</span>' +
          '<span class="rd-row-dek">' + esc(st.dek) + '</span>' +
          '<span class="rd-row-meta">' + esc(st.place) + ' · ' + CC.storyMinutes(st) + ' min read' + GO + '</span></a></li>';
      }).join('') + '</ol></section>';
  };

  R.quote = function () {
    return '<section class="rd-sec rd-quote" aria-labelledby="quote-title"><h3 id="quote-title" class="visually-hidden">Quotation</h3><figure class="rd-rise">' +
      '<blockquote><p lang="vi">Hiền tài là nguyên khí của quốc gia.</p><p>People of talent and virtue are the life-breath of the nation.</p></blockquote>' +
      '<figcaption>Thân Nhân Trung, inscription for the examination of 1442, carved on the first doctoral stele at Văn Miếu in 1484. Translation ours.</figcaption>' +
    '</figure></section>';
  };

  R.game = function () {
    var a = { name: 'The Temple of Literature is founded', year: '1070', p: pic({ imageId: 'img-garden' }), first: true };
    var b = { name: 'The first doctoral stelae are carved', year: '1484', p: pic({ imageId: 'img-stelae' }) };
    function card(x) {
      return '<li><button type="button" class="rd-qcard" data-game="' + (x.first ? 'first' : 'later') + '" aria-pressed="false">' +
        '<span class="rd-qcard-in">' +
          '<span class="rd-qcard-face">' + media(x.p, { decorative: true }) + '<span class="rd-qcard-name">' + esc(x.name) + '</span></span>' +
          '<span class="rd-qcard-back"><span class="rd-qcard-year">' + x.year + '</span><span class="rd-qcard-name">' + esc(x.name) + '</span></span>' +
        '</span></button></li>';
    }
    /* the older one is not always on the left */
    var pair = Math.random() < 0.5 ? [a, b] : [b, a];
    return '<section class="rd-sec rd-quiz" aria-labelledby="game-title">' +
      head(3, 'Which came first?', 'Choose the one you think is older. Both cards turn over.', 'game-title') +
      '<div data-game-wrap><ul class="rd-qcards rd-rise">' + card(pair[0]) + '<li class="rd-or" aria-hidden="true">or</li>' + card(pair[1]) + '</ul>' +
        '<p class="rd-qmsg" role="status" aria-live="polite"></p>' +
        '<p class="rd-after"><button type="button" class="rd-btn rd-btn-quiet" data-game-reset hidden>' + ic('flip') + ' Play again</button></p>' +
        '<p class="rd-note">Dates from Tuổi Trẻ and the UNESCO Memory of the World record. <a href="' + esc(storyHref({ id: 'st-stelae' })) + '">Read about the stelae</a></p>' +
      '</div></section>';
  };

  /* the five places of the game, with the player's progress in each: a piece of the game's own screen */
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
    return '<section class="rd-sec rd-places" id="places" aria-labelledby="places-title" tabindex="-1"><div class="rd-wrap">' +
      head(2, 'Places in the game', 'Each place is a short episode of three to six moments. Play one when you have five minutes.', 'places-title') +
      '<div class="rd-hud" data-ui><i class="rd-hud-c is-tl"></i><i class="rd-hud-c is-tr"></i><i class="rd-hud-c is-bl"></i><i class="rd-hud-c is-br"></i>' +
      '<ul class="rd-zones">' + zones.map(function (z) {
        var st = status(z);
        return '<li class="rd-zone rd-rise' + st.cls + '"><a href="explore.html?zone=' + encodeURIComponent(z.id) + '">' +
          '<span class="rd-zone-pic">' + media(zonePic(z), { decorative: true }) + '<span class="rd-zone-stamp" aria-hidden="true">' + esc(z.stamp || z.title) + '</span></span>' +
          '<span class="rd-zone-title">' + esc(z.title) + '</span>' +
          '<span class="rd-zone-meta">About ' + z.minutes + ' min · ' + (z.objectives || []).length + ' moments · <b>' + st.label + '</b></span>' +
          '<span class="rd-zone-go">' + (st.cls ? (st.cls === ' is-done' ? 'Play again' : 'Continue') : 'Play') + GO + '</span></a></li>';
      }).join('') + '</ul></div></div></section>';
  };

  /* keep it: once, inline, never over the text; dismissal is remembered */
  R.keep = function () {
    if (CC.store.get('exploreToast.' + COUNTRY, false)) return '';
    return '<aside class="rd-sec rd-keep" aria-labelledby="keep-title"><div class="rd-wrap"><div class="rd-keep-in rd-rise">' +
      '<div><h2 class="rd-keep-title" id="keep-title">Keep Vietnam for your trip</h2><p>Save stories and phrases with the bookmark. They stay in this browser, ready to print.</p></div>' +
      '<div class="rd-keep-act"><button type="button" class="rd-btn rd-btn-quiet" data-keep-no>No, thanks</button><a class="rd-btn" href="collection.html">Show me' + GO + '</a></div>' +
    '</div></div></aside>';
  };

  R.nav = function () {
    var links = [
      ['explore.html', 'Play Hà Nội', 'Walk through five places in a small pixel-art game and collect a passport stamp in each.'],
      ['collection.html', 'Your passport', 'Stamps, facts, phrases and stories you have kept, ready to print.'],
      ['about.html', 'Method & sources', 'How we write, what we leave out, and every source we cite.'],
      ['index.html', 'Other destinations', 'Turn the globe. Vietnam is the only one with sourced stories so far.']
    ];
    return '<section class="rd-sec rd-more" aria-labelledby="nav-title"><div class="rd-wrap rd-grid">' +
      '<div class="rd-more-side">' + head(2, 'Keep exploring', null, 'nav-title') + '</div>' +
      '<ul class="rd-more-list">' + links.map(function (l) {
        return '<li class="rd-rise"><a href="' + l[0] + '"><span class="rd-row-title">' + esc(l[1]) + GO + '</span><span class="rd-row-dek">' + esc(l[2]) + '</span></a></li>';
      }).join('') + '</ul></div></section>';
  };

  R.before = function () {
    var ext = '<span class="visually-hidden"> (opens in a new tab)</span>';
    return '<section class="rd-sec rd-before" aria-labelledby="before-title"><div class="rd-wrap rd-grid">' +
      '<h2 id="before-title" class="rd-before-h rd-rise">Before you go</h2>' +
      '<p class="rd-before-p rd-rise">Visas, health, safety and money are not culture, so CultureCompass leaves them out. Check official advice: ' +
      '<a href="https://vietnam.travel/plan-your-trip/health-safety" target="_blank" rel="noopener">health and safety tips from the Vietnam National Authority of Tourism' + ext + '</a>, its ' +
      '<a href="https://vietnam.travel/faqs" target="_blank" rel="noopener">travel FAQs' + ext + '</a>, and your own government’s travel advice.</p>' +
    '</div></section>';
  };

  /* every picture on the page, with its maker, licence and source; rendered last, after every module has run */
  R.credits = function () {
    return '<section class="rd-sec rd-credits" id="picture-credits" aria-labelledby="credits-title"><div class="rd-wrap rd-grid">' +
      '<h2 id="credits-title" class="rd-credits-h">Picture credits</h2>' +
      '<ul class="rd-credits-list">' + USED.map(function (p) {
        var lic = p.license ? (p.licenseUrl ? '<a href="' + esc(p.licenseUrl) + '">' + esc(p.license) + '</a>' : esc(p.license)) : '';
        return '<li>' + (p.sourceUrl ? '<a href="' + esc(p.sourceUrl) + '">' + esc(p.credit) + '</a>' : esc(p.credit)) + (lic ? '. ' + lic : '') + '</li>';
      }).join('') + '</ul>' +
      '<p class="rd-credits-more"><a href="about.html#credits">All media credits</a></p>' +
    '</div></section>';
  };

  /* ================================================================
     PAGE CONFIG — editors reorder or remove entries here.
     A module's `plate` is the picture beside it on wide screens (default: the chapter's).
     ================================================================ */
  var SECTIONS = [
    { type: 'hero' },
    { type: 'toc' },
    { type: 'banner' },
    { type: 'chbar' },
    { type: 'chapter', ch: 0, modules: [
      { type: 'accordion' },
      { type: 'list', plate: 'img-vendor-pottery', id: 'oq-title', title: 'Around the Old Quarter', sub: 'Trade streets, tea on the pavement, and the lake at dawn and at the weekend.', ids: ['st-old-quarter', 'st-pavement', 'st-hoan-kiem-days'] }
    ] },
    { type: 'chapter', ch: 1, modules: [
      { type: 'clusters' },
      { type: 'list', id: 'eat-title', title: 'What Hà Nội eats and drinks', sub: 'Three dishes the city is known for, and how to order at a pavement stall.', ids: ['st-pho', 'st-bun-cha', 'st-egg-coffee', 'st-street-stall'] }
    ] },
    { type: 'chapter', ch: 2, modules: [
      { type: 'game' },
      { type: 'quote', plate: 'img-stelae' },
      { type: 'inline' },
      { type: 'timeline', plate: 'img-stelae', id: 'past-title', title: 'A thousand years in Hà Nội', sub: 'A capital since 1010, a university since 1076, and a lake named after a legend.', ids: ['st-thang-long', 'st-van-mieu-university', 'st-stelae', 'st-sword-lake'] },
      { type: 'list', plate: 'vid-incense', id: 'belief-title', title: 'Altars, temples and festivals', sub: 'What you will see in homes, on Hàng Mã and at the pagoda, and what a temple asks of visitors.', ids: ['st-temple-visit', 'st-sacred-places', 'st-family-altar', 'st-paper-offerings', 'st-tet', 'st-mother-goddess'] }
    ] },
    { type: 'places' },
    { type: 'keep' },
    { type: 'nav' },
    { type: 'before' },
    { type: 'credits' }
  ];

  /* the plate: one figure per distinct picture in the chapter, the active one shown */
  function plateFor(ch, mods) {
    var ids = [ch.imageId];
    mods.forEach(function (m) { if (m.plate && ids.indexOf(m.plate) === -1) ids.push(m.plate); });
    return '<div class="rd-plate" data-plate aria-hidden="false">' + ids.map(function (id, i) {
      var p = pic({ imageId: id });
      if (!p) return '';
      return '<figure class="rd-plate-fig' + (i === 0 ? ' is-on' : '') + '" data-plate-id="' + esc(id) + '">' +
        '<div class="rd-plate-pic">' + media(p, { video: true, eager: i === 0 }) + (p.video ? videoToggle('the video beside this chapter') : '') + '</div>' +
        '<figcaption><span class="rd-plate-cap">' + esc(p.alt) + '</span>' + creditLine(p) + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  function render() {
    var c = country();
    var out = SECTIONS.filter(function (s) { return s.type !== 'credits'; }).map(function (s) {
      if (s.type === 'chapter') {
        var ch = CHAPTERS[s.ch], nx = CHAPTERS[s.ch + 1];
        CUR = ch.anchor;
        var html = '<div class="rd-ch" id="' + ch.anchor + '" data-anchor="' + ch.anchor + '" data-tone="' + ch.tone + '" role="region" aria-labelledby="' + ch.anchor + '-title" tabindex="-1">' +
          '<div class="rd-wrap rd-grid">' + plateFor(ch, s.modules) +
          '<div class="rd-col">' + R.chapterOpen(ch) + s.modules.map(function (m) {
            return '<div class="rd-mod" data-plate-for="' + esc(m.plate || ch.imageId) + '">' + R[m.type](m, c) + '</div>';
          }).join('') +
          '<p class="rd-next">' + (nx ? jump(nx.anchor, 'Next chapter: ' + esc(nx.name)) : jump('places', 'Next: play these places in the game')) + '</p>' +
          '</div></div></div>';
        CUR = null;
        return html;
      }
      return R[s.type](s, c);
    }).join('');
    return out + R.credits();
  }

  /* ================================================================
     BEHAVIOUR
     ================================================================ */
  function reduce() { return CC.motion.reduce(); }
  function each(sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); }

  /* entrances: each block rises once as it arrives (never again on the way back up). Blocks that arrive together
     follow each other by 50ms. Content is never hidden without script, and with reduced motion nothing moves
     (read.css keeps the hidden start inside prefers-reduced-motion: no-preference). */
  function initRise() {
    var els = document.querySelectorAll('.rd-rise');
    if (reduce() || !('IntersectionObserver' in window)) { each('.rd-rise', function (e) { e.classList.add('is-in'); }); return; }
    document.documentElement.classList.add('rd-motion');
    var io = new IntersectionObserver(function (es) {
      var n = 0;
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.style.setProperty('--i', Math.min(n++, 6));
        e.target.classList.add('is-in');
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    Array.prototype.forEach.call(els, function (e) { io.observe(e); });
  }

  /* story.js reads each chapter's stories from CC.ex.reading (ex-kit.js) for Back, previous/next and the breadcrumb.
     If this page's SECTIONS change, say so here, so the two never disagree in silence. */
  function checkReadingOrder() {
    var want = (CC.ex && CC.ex.reading && CC.ex.reading[COUNTRY]) || [];
    want.forEach(function (ch) {
      var box = document.getElementById(ch.anchor), got = [];
      if (!box) return;
      each('a[href^="story.html?id="]', function (a) { var id = /id=([\w-]+)/.exec(a.getAttribute('href'))[1]; if (got.indexOf(id) === -1) got.push(id); }, box);
      /* same stories, not the same order: the reading order follows the timeline's years, while the quiz and the plan link a few of them earlier */
      if (got.slice().sort().join() !== ch.stories.slice().sort().join()) console.warn('CultureCompass: the ' + ch.anchor + ' chapter shows ' + got.join(', ') + ' but CC.ex.reading has ' + ch.stories.join(', ') + '. Update ex-kit.js READING.');
    });
  }

  /* a jump (chapter bar, contents, a link with a #hash) lands the reader on blocks that have not risen yet:
     show everything in the first screen of the destination at once, so they never read a faded block */
  function settle(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + scrollY, bottom = top + innerHeight;
    each('.rd-rise:not(.is-in)', function (r) {
      var y = r.getBoundingClientRect().top + scrollY;
      if (y >= top - 40 && y < bottom) { r.classList.add('is-now', 'is-in'); }
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { each('.rd-rise.is-now', function (r) { r.classList.remove('is-now'); }); }); });
  }

  /* videos: play muted while on screen, unless motion is reduced; every one has a pause button */
  function initVideos() {
    var vids = document.querySelectorAll('video[data-autoplay]');
    var setBtn = function (btn, playing) {
      if (!btn) return;
      btn.setAttribute('aria-pressed', playing ? 'false' : 'true');
      btn.innerHTML = ic(playing ? 'pause' : 'play') + '<span class="visually-hidden">' + (playing ? 'Pause' : 'Play') + ' video</span>';
    };
    Array.prototype.forEach.call(vids, function (v) {
      var btn = v.parentNode.querySelector('[data-vtoggle]') || (v.closest('.rd-cover') && v.closest('.rd-cover').querySelector('[data-vtoggle]'));
      v.cc = { user: null };
      v.addEventListener('play', function () { setBtn(btn, true); });
      v.addEventListener('pause', function () { setBtn(btn, false); });
      setBtn(btn, false);
      if (btn) btn.addEventListener('click', function () {
        if (v.paused) { v.cc.user = 'play'; v.play().catch(function () {}); } else { v.cc.user = 'pause'; v.pause(); }
      });
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduce() && v.cc.user !== 'pause' && !v.closest('.rd-plate-fig:not(.is-on)')) v.play().catch(function () {});
        else if (!e.isIntersecting) v.pause();
      });
    }, { threshold: 0.2 });
    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
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
  }

  /* moments strip: hover previews; focus or a click on a closed strip opens it; a click on the open one follows it.
     Arrow keys walk the strips. On phones it is a plain list with every moment open. */
  function initAccordion() {
    each('[data-acc]', function (acc) {
      var items = Array.prototype.slice.call(acc.children);
      var wide = function () { return matchMedia('(min-width: 761px)').matches; };
      var open = function (li) { items.forEach(function (x) { x.classList.toggle('is-open', x === li); }); };
      items.forEach(function (li, i) {
        var a = li.querySelector('a');
        li.addEventListener('mouseenter', function () { if (wide() && matchMedia('(hover: hover)').matches) open(li); });
        a.addEventListener('focus', function () { open(li); });
        a.addEventListener('click', function (e) { if (wide() && !li.classList.contains('is-open')) { e.preventDefault(); open(li); } });
        a.addEventListener('keydown', function (e) {
          var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
          if (!k) return;
          e.preventDefault();
          items[(i + k + items.length) % items.length].querySelector('a').focus();
        });
      });
    });
  }

  /* numbered pins on the plan ⇄ list beside it */
  function initInline() {
    each('[data-inline]', function (box) {
      var set = function (n) {
        var open = null;
        each('.rd-pin', function (p) { p.setAttribute('aria-pressed', String(Number(p.getAttribute('data-pin')) === n)); }, box);
        each('[data-yard]', function (g) { g.classList.toggle('is-on', Number(g.getAttribute('data-yard')) === n); }, box);
        var sc = box.querySelector('.rd-plan-scroll'), pin = box.querySelector('.rd-pin[data-pin="' + n + '"]');
        if (sc && pin && sc.scrollWidth > sc.clientWidth + 1) {   // phones: the plan scrolls sideways; bring the stop to the middle
          sc.scrollTo({ left: pin.offsetLeft - sc.clientWidth / 2, behavior: reduce() ? 'auto' : 'smooth' });
        }
        each('[data-pin-item]', function (li) {
          var on = Number(li.getAttribute('data-pin-item')) === n;
          li.classList.toggle('is-on', on);
          li.querySelector('button').setAttribute('aria-expanded', String(on));
          if (on) open = li;
        }, box);
        return open;
      };
      /* the open stop can land off screen (below the plan on a phone, or above once a long stop closes): bring it into view */
      var reveal = function (li) {
        var top = 0;
        each('.cc-header, .rd-chbar', function (bar) { var r = bar.getBoundingClientRect(); if (r.top >= 0 && r.top < 160 && r.bottom > top) top = r.bottom; /* bars stuck to the top */ }, document);
        var r = li.getBoundingClientRect();
        if (r.top >= top && r.bottom <= window.innerHeight) return;
        if (r.top >= top && r.top < window.innerHeight * 0.55) return; /* its start is in view: let the reader scroll on */
        window.scrollTo({ top: window.scrollY + r.top - top - 12, behavior: reduce() ? 'auto' : 'smooth' });
      };
      box.addEventListener('click', function (e) {
        var b = e.target.closest('[data-pin]');
        if (!b) return;
        var li = set(Number(b.getAttribute('data-pin')));
        if (li) {
          reveal(li);
          if (b.hasAttribute('data-pin-next')) li.querySelector('button').focus({ preventScroll: true });
        }
      });
    });
  }

  /* which came first: choose one, both turn over */
  function initGame() {
    each('[data-game-wrap]', function (g) {
      var msg = g.querySelector('.rd-qmsg'), reset = g.querySelector('[data-game-reset]');
      var cards = g.querySelectorAll('[data-game]');
      g.addEventListener('click', function (e) {
        var c = e.target.closest('[data-game]');
        if (!c || g.classList.contains('is-done')) return;
        g.classList.add('is-done');
        c.setAttribute('aria-pressed', 'true');
        var right = c.getAttribute('data-game') === 'first';
        msg.innerHTML = (right ? '<b>Yes.</b> ' : '<b>Not quite.</b> ') + 'The temple came first, in 1070. The first stelae were carved more than four centuries later, in 1484.';
        reset.hidden = false;
      });
      reset.addEventListener('click', function () {
        g.classList.remove('is-done'); msg.textContent = ''; reset.hidden = true;
        Array.prototype.forEach.call(cards, function (c) { c.setAttribute('aria-pressed', 'false'); });
        /* deal the pair again, so the older card is not always where it was */
        var ul = g.querySelector('.rd-qcards'), lis = ul.querySelectorAll('li');
        if (Math.random() < 0.5) { ul.insertBefore(lis[2], lis[0]); ul.insertBefore(lis[1], lis[0]); }
        ul.querySelector('[data-game]').focus();
      });
    });
  }

  function initKeep() {
    var box = document.querySelector('.rd-keep');
    if (!box) return;
    box.querySelector('[data-keep-no]').addEventListener('click', function () {
      CC.store.set('exploreToast.' + COUNTRY, true);
      var next = box.nextElementSibling;
      box.remove();
      var h = next && next.querySelector('h2');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    });
  }

  /* chapters: jump links scroll smoothly; the bar marks the chapter you are reading and how far you are;
     the plate follows the section you are reading; the URL follows the chapter. */
  function initChapters() {
    var chapters = Array.prototype.slice.call(document.querySelectorAll('[data-anchor]'));
    var bar = document.querySelector('.rd-chbar');
    var pick = document.querySelector('[data-chpick]');
    var go = function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      settle(el);
      CC.motion.scrollTo(el);
      history.replaceState(null, '', el.hasAttribute('data-anchor') || id === 'places' ? '#' + id : location.pathname + location.search);
      el.focus({ preventScroll: true });
    };
    /* remember which story was opened from here, so its Back link can return to this exact spot (story.js) */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="story.html"]');
      if (!a) return;
      try { sessionStorage.setItem('cc.readingOpened', a.getAttribute('href').replace(/^story\.html/, '').replace(/&amp;/g, '&')); } catch (x) { /* storage blocked */ }
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[data-jump]');
      if (!a) return;
      e.preventDefault();
      go(a.getAttribute('href').slice(1));
    });
    if (pick) pick.addEventListener('change', function () { go(pick.value); });

    var mark = function (id) {
      each('[data-chlink]', function (a) {
        if (a.getAttribute('data-chlink') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      if (pick && id) pick.value = id;
      if (pick && !id) pick.value = 'contents';
    };
    /* progress: from the first chapter to the end of the places */
    var fill = bar && bar.querySelector('.rd-progress i');
    var first = chapters[0], last = document.getElementById('places');
    var raf = 0;
    var onScroll = function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        if (!fill || !first || !last) return;
        var top = first.getBoundingClientRect().top + scrollY, end = last.getBoundingClientRect().bottom + scrollY - innerHeight;
        var p = Math.max(0, Math.min(1, (scrollY - top + innerHeight * .3) / Math.max(1, end - top)));
        fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
        /* wide screens: how far you are through the chapter you are in fills that chapter's own underline
           (one mark for "where" and "how far", so it can never run into another line) */
        each('[data-chlink]', function (a) {
          var sec = document.getElementById(a.getAttribute('data-chlink'));
          if (!sec) return;
          var r = sec.getBoundingClientRect();
          var q = Math.max(0, Math.min(1, (innerHeight * .3 - r.top) / Math.max(1, r.height - innerHeight * .7)));
          a.style.setProperty('--p', q.toFixed(4));
        });
        if (bar) bar.classList.toggle('is-stuck', bar.getBoundingClientRect().top <= parseFloat(getComputedStyle(bar).top) + 1);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    if (!('IntersectionObserver' in window)) return;
    var current = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var id = e.target.getAttribute('data-anchor') || e.target.id;
        if (e.isIntersecting) { current = id; mark(id); if (e.target.hasAttribute('data-anchor')) history.replaceState(null, '', '#' + id); }
        else if (current === id) { current = null; mark(null); if (e.target.hasAttribute('data-anchor')) history.replaceState(null, '', location.pathname + location.search); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    chapters.concat(last ? [last] : []).forEach(function (c) { io.observe(c); });

    /* plate: show the picture of the section in the middle of the screen */
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var ch = e.target.closest('.rd-ch'), id = e.target.getAttribute('data-plate-for');
        each('.rd-plate-fig', function (f) {
          var on = f.getAttribute('data-plate-id') === id;
          f.classList.toggle('is-on', on);
          var v = f.querySelector('video');
          if (v) { if (on && !reduce() && v.cc && v.cc.user !== 'pause') v.play().catch(function () {}); else if (!on) v.pause(); }
        }, ch);
      });
    }, { rootMargin: '-55% 0px -40% 0px' });
    each('.rd-open, .rd-mod', function (m) {
      if (m.classList.contains('rd-open')) m.setAttribute('data-plate-for', (m.closest('.rd-ch').querySelector('.rd-plate-fig') || {}).getAttribute ? m.closest('.rd-ch').querySelector('.rd-plate-fig').getAttribute('data-plate-id') : '');
      io2.observe(m);
    });
  }

  /* Links written for the earlier compass page (story back links, sub-navigation, hanoi.html, countries.json)
     still arrive with its anchors: #overview, #themes, #practice, a theme id or one of its old aliases.
     Each one lands on the nearest section here. */
  var HASH_ALIAS = { overview: 'top', themes: 'contents', practice: 'places', practise: 'places', scenes: 'places', stories: 'contents', words: 'contents', history: 'beliefs' };
  var TOPIC_ANCHOR = { people: 'everyday', food: 'food', beliefs: 'beliefs', history: 'beliefs', language: 'contents', arts: 'contents' };
  function resolveHash(raw) {
    var key = String(raw || '').replace(/^#/, '');
    if (!key) return null;
    if (HASH_ALIAS[key]) return document.getElementById(HASH_ALIAS[key]);
    if (document.getElementById(key)) return document.getElementById(key);
    var bare = key.replace(/^topic-/, '');
    var t = (CC.topics || []).filter(function (x) { return x.id === bare || (x.aliases || []).indexOf(bare) !== -1; })[0];
    return t && TOPIC_ANCHOR[t.id] ? document.getElementById(TOPIC_ANCHOR[t.id]) : null;
  }
  function goToHash(smooth) {
    var el = resolveHash(location.hash);
    if (!el) return;
    if (location.hash.slice(1) !== el.id) history.replaceState(null, '', el.id === 'top' ? location.pathname + location.search : '#' + el.id);
    settle(el);
    if (smooth) CC.motion.scrollTo(el); else el.scrollIntoView({ behavior: 'instant', block: 'start' });
    if (el.hasAttribute('tabindex')) el.focus({ preventScroll: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    CC.renderShell({ section: 'destinations', country: COUNTRY, sub: 'overview' });
    var main = document.getElementById('explore');
    main.innerHTML = render();
    checkReadingOrder();
    initRise();
    initVideos();
    initHeroActions();
    initAccordion();
    initInline();
    initGame();
    initKeep();
    initChapters();
    /* jump once the DOM exists, and again after load, when the browser's own fragment handling has run.
       Coming back (Back from a story) the browser puts you where you were, so the hash is left alone. */
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (!(nav && nav.type === 'back_forward')) {
      goToHash(false);
      window.addEventListener('load', function () { requestAnimationFrame(function () { goToHash(false); }); });
    }
    window.addEventListener('hashchange', function () { goToHash(true); });
  });
})();
