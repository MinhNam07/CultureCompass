/* CultureCompass: stories built from blocks (stories.json "layout", "hero", "blocks").
   CC.storyBlocks.render(st, ctx) returns the page's opening and article; story.js adds the shared ending.
   CC.storyBlocks.init(root) runs the behaviour: source and glossary popovers, lightbox, sliders, videos, map, motion.
   Layouts: longform | essay | timeline | guide | compare. Any block works in any layout; the layout sets the opening.
   Inline text: **bold**, *italic*, ~Vietnamese words~, [[glossaryId|label]], [label](url or story:st-id).
   Motion starts from a visible state and stops under Reduce motion (site setting or OS). */
(function () {
  'use strict';
  var CC = window.CC;
  var esc = CC.esc, icon = CC.icon;
  var reduce = function () { return CC.motion.reduce() || matchMedia('(prefers-reduced-motion: reduce)').matches; };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var asset = function (id) { return CC.byId(CC.assets, id); };
  var term = function (id) { return CC.byId(CC.glossary || [], id); };

  /* ---------- inline text ---------- */
  function md(s) {
    var out = esc(s || '');
    out = out.replace(/\[\[([\w-]+)(?:\|([^\]]+))?\]\]/g, function (m, id, label) {
      var t = term(id);
      return '<button type="button" class="lx-term" data-t="' + id + '" lang="vi">' + (label || (t ? esc(t.vi) : id)) + '</button>';
    });
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, url) {
      var href = url.replace(/&amp;/g, '&');
      if (/^story:/.test(href)) return '<a href="story.html?id=' + esc(href.slice(6)) + '">' + label + '</a>';
      return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + label + '<span class="visually-hidden"> (opens in a new tab)</span></a>';
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    out = out.replace(/~([^~]+)~/g, '<i lang="vi">$1</i>');
    return out;
  }

  /* ---------- pictures ---------- */
  function credit(id) {
    var a = asset(id);
    return a ? '<span class="lx-credit">' + CC.creditHtml(a) + '</span>' : '';
  }
  function img(id, opts) {
    opts = opts || {};
    var a = asset(id); if (!a) return '';
    var alt = esc(opts.alt != null ? opts.alt : a.alt);
    var load = opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
    var cls = 'lx-img' + (opts.cls ? ' ' + opts.cls : '');
    var size = a.width ? ' width="' + a.width + '" height="' + a.height + '"' : '';
    if (!a.srcBase) return '<img class="' + cls + '" src="' + esc(a.file) + '"' + size + ' alt="' + alt + '"' + load + ' decoding="async">';
    var b = esc(a.srcBase);
    return '<img class="' + cls + '" src="' + b + '-1280.webp" srcset="' + b + '-640.webp 640w, ' + b + '-1280.webp 1280w, ' + b + '-2560.webp 2560w" sizes="' + (opts.sizes || '(min-width: 760px) 720px, 100vw') + '"' +
      size + ' alt="' + alt + '"' + load + ' decoding="async">';
  }
  var SIZES = { inline: '(min-width: 760px) 720px, 100vw', wide: '(min-width: 1200px) 1100px, 100vw', bleed: '100vw', half: '(min-width: 900px) 560px, 100vw' };
  function fig(id, cap, size, opts) {
    opts = opts || {};
    var a = asset(id); if (!a) return '';
    var cls = 'lx-fig' + (size === 'wide' ? ' lx-wide' : size === 'bleed' ? ' lx-bleed' : '');
    var zoom = opts.zoom !== false && a.kind === 'image';
    return '<figure class="' + cls + '" data-pic="' + esc(id) + '"' + (cap ? ' data-cap="' + esc(cap) + '"' : '') + (zoom ? ' data-zoom' : '') + (size === 'bleed' ? '' : ' data-wipe') + '>' +
      '<div class="lx-frame">' + img(id, { sizes: SIZES[opts.sizes || size] || SIZES.inline }) +
      (zoom ? '<button type="button" class="lx-zoom-btn" aria-label="Open the picture larger: ' + esc(cap || a.alt) + '"></button>' : '') + '</div>' +
      (opts.nocap ? '' : '<figcaption>' + (cap ? '<span>' + md(cap) + '</span>' : '') + credit(id) + '</figcaption>') + '</figure>';
  }
  function videoTag(id, preload, hidden) {
    var a = asset(id); if (!a) return '';
    return '<video muted playsinline loop preload="' + preload + '" poster="' + esc(a.poster || '') + '"' + (hidden ? ' aria-hidden="true"' : ' aria-label="' + esc(a.alt) + '"') + '><source src="' + esc(a.file) + '" type="video/mp4"></video>';
  }

  /* ---------- sources: one cluster per paragraph, numbered in reading order ---------- */
  function Sources() {
    var order = [], first = {};
    return {
      order: order,
      cluster: function (claimIds) {
        var cl = CC.claimsOf(claimIds);
        if (!cl.length) return '';
        var ids = CC.sourcesOf(cl);
        if (!ids.length) {
          return cl.every(function (c) { return c.kind === 'projectNote'; })
            ? '<span class="lx-tip" title="CultureCompass’s own advice, not a cultural claim">' + icon('lightbulb') + 'CultureCompass tip</span>' : '';
        }
        ids.forEach(function (id) { if (order.indexOf(id) === -1) order.push(id); });
        var nums = ids.map(function (id) { return order.indexOf(id) + 1; });
        var anchor = nums.filter(function (n) { if (first[n]) return false; first[n] = true; return true; })[0];
        var check = CC.unverified(cl);
        return '<span class="lx-src" data-s="' + ids.join(',') + '"' + (check ? ' data-check' : '') + (anchor ? ' id="fn-' + anchor + '"' : '') + '>' +
          '<button type="button" class="' + (check ? 'is-checking' : '') + '" aria-expanded="false" aria-label="' + (ids.length === 1 ? 'Source ' : 'Sources ') + nums.join(' and ') + (check ? ', still being verified' : '') + '">' +
          icon(check ? 'verify' : 'source') + nums.join(' · ') + '</button></span>';
      },
      has: function (n) { return !!first[n]; }
    };
  }

  /* ---------- blocks ---------- */
  function slug(s) { return 'h-' + String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40); }

  function paras(list, S, opts) {
    opts = opts || {};
    return (list || []).map(function (p, i) {
      if (typeof p === 'string') p = { text: p };
      if (p.h3) return '<h3' + (opts.rise ? ' data-rise' : '') + '>' + md(p.h3) + '</h3>';
      var rise = opts.rise === false ? '' : ' data-rise';
      if (p.list) return '<ul class="lx-list"' + rise + '>' + p.list.map(function (li) { return '<li>' + md(li) + '</li>'; }).join('') + '</ul>' + S.cluster(p.claimIds);
      var cls = opts.lede && i === 0 ? ' class="lx-lede"' : '';
      return '<p' + cls + rise + '>' + md(p.text) + S.cluster(p.claimIds) + '</p>';
    }).join('');
  }
  function dl(items) {
    return '<dl>' + (items || []).map(function (it) { return '<dt' + (it.vi ? ' lang="vi"' : '') + '>' + md(it.term) + '</dt><dd>' + md(it.text) + '</dd>'; }).join('') + '</dl>';
  }

  var R = {
    text: function (b, S) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') + paras(b.paras, S, { lede: b.lede });
    },
    figure: function (b) { return fig(b.image, b.caption, b.size || 'inline', { zoom: b.zoom }); },
    pair: function (b) {
      return '<div class="lx-pair-wrap lx-wide"><div class="lx-pair">' + b.items.map(function (it) { return fig(it.image, it.caption, 'inline', { sizes: 'half' }); }).join('') + '</div></div>';
    },
    gallery: function (b) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') +
        (b.intro ? '<p data-rise>' + md(b.intro) + '</p>' : '') +
        '<div class="lx-gallery lx-wide">' + b.items.map(function (it) { return fig(it.image, it.caption, 'inline', { sizes: 'half' }); }).join('') + '</div>';
    },
    video: function (b) {
      var a = asset(b.video); if (!a) return '';
      var size = b.size || 'wide';
      return '<figure class="lx-fig lx-video' + (size === 'bleed' ? ' lx-bleed' : size === 'wide' ? ' lx-wide' : '') + '" data-vid="' + esc(b.video) + '">' +
        '<div class="lx-frame">' + videoTag(b.video, 'none') + '<button type="button" class="lx-pause"></button></div>' +
        '<figcaption><span>' + md(b.caption || '') + '</span>' + credit(b.video) + '</figcaption></figure>';
    },
    quote: function (b, S) {
      return '<blockquote class="lx-quote" data-rise><p>' + md(b.text) + '</p>' + (b.by ? '<footer>' + md(b.by) + S.cluster(b.claimIds) + '</footer>' : '') + '</blockquote>';
    },
    facts: function (b, S) {
      return '<aside class="lx-facts' + (b.size === 'wide' ? ' lx-wide' : '') + '" data-rise aria-label="' + esc(b.title || 'Facts') + '">' + (b.title ? '<h3>' + md(b.title) + '</h3>' : '') + dl(b.items) +
        (b.claimIds ? '<p class="lx-meta" style="margin:12px 0 0">Sources' + S.cluster(b.claimIds) + '</p>' : '') + '</aside>';
    },
    note: function (b, S) { return '<aside class="lx-note" data-rise>' + icon('lightbulb') + '<p>' + md(b.text) + S.cluster(b.claimIds) + '</p></aside>'; },
    beforeAfter: function (b) {
      var A = asset(b.before), B = asset(b.after); if (!A || !B) return '';
      var lb = esc(b.labelBefore), la = esc(b.labelAfter);
      return '<figure class="lx-ba lx-wide" data-rise data-lb="' + lb + '">' +
        '<div class="lx-ba-stage" style="--pos:50%">' +
          img(b.after, { sizes: SIZES.wide, cls: 'lx-ba-bottom' }) + img(b.before, { sizes: SIZES.wide, cls: 'lx-ba-top' }) +
          '<span class="lx-ba-tag is-l">' + lb + '</span><span class="lx-ba-tag is-r">' + la + '</span>' +
          '<span class="lx-ba-line"></span><span class="lx-ba-knob">' + icon('swap') + '</span>' +
          '<input type="range" min="0" max="100" value="50" aria-label="Move between ' + lb + ' and ' + la + '" aria-valuetext="50% ' + lb + '">' +
        '</div><figcaption>' + md(b.caption || '') + ' ' + credit(b.before) + ' · ' + credit(b.after) + '</figcaption></figure>';
    },
    timeline: function (b, S) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') +
        '<ol class="lx-tl lx-full" aria-label="' + esc(b.label || 'Timeline') + '"><li class="lx-tl-line" aria-hidden="true"><i></i></li>' +
        b.items.map(function (it) {
          if (it.era) return '<li class="lx-tl-era"><span>' + md(it.era) + '</span></li>';
          return '<li class="lx-tl-item' + (it.image ? '' : ' is-bare') + '"><span class="lx-tl-dot" aria-hidden="true"></span>' +
            '<div class="lx-tl-text" data-rise><span class="lx-tl-year">' + esc(it.year) + '</span><h3>' + md(it.title) + '</h3>' +
              paras(it.paras || [{ text: it.text, claimIds: it.claimIds }], S, { rise: false }) + '</div>' +
            '<div class="lx-tl-pic">' + (it.image ? fig(it.image, it.caption, 'inline', { sizes: 'half' }) : '') + '</div></li>';
        }).join('') + '</ol>';
    },
    steps: function (b, S) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') +
        '<ol class="lx-how">' + b.items.map(function (it) {
          return '<li data-rise><h3>' + md(it.title) + '</h3>' + paras(it.paras || [{ text: it.text, claimIds: it.claimIds }], S, { rise: false }) +
            (it.image ? fig(it.image, it.caption, 'inline') : '') +
            (it.phraseIds ? '<ul class="lx-phrases">' + phraseList(it.phraseIds) + '</ul>' : '') + '</li>';
        }).join('') + '</ol>';
    },
    dodont: function (b, S) {
      var col = function (c, cls, ic, def) {
        return '<div class="' + cls + '" data-rise><h3>' + icon(ic) + md(c.title || def) + '</h3><ul>' + c.items.map(function (li) {
          if (typeof li === 'string') li = { text: li };
          return '<li>' + md(li.text) + S.cluster(li.claimIds) + '</li>';
        }).join('') + '</ul></div>';
      };
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') +
        '<div class="lx-dd' + (b.size === 'wide' ? ' lx-wide' : '') + '" data-rise-group>' + col(b.do, 'is-do', 'check', 'Usually welcome') + col(b.think, 'is-think', 'question', 'Think twice') + '</div>';
    },
    quiz: function (b, S, k) {
      var id = 'quiz-' + k;
      return '<section class="lx-quiz' + (b.size === 'wide' ? ' lx-wide' : '') + '" data-rise aria-labelledby="' + id + '" data-fit-label="' + esc(b.fitLabel || 'That fits') + '" data-other-label="' + esc(b.otherLabel || 'Not quite') + '"><div class="lx-quiz-in">' +
        (b.image ? '<div class="lx-frame">' + img(b.image, { sizes: SIZES.half }) + '</div>' : '') +
        '<div class="lx-quiz-b"><h3 id="' + id + '">' + md(b.question) + '</h3>' + (b.prompt ? '<p>' + md(b.prompt) + '</p>' : '') +
        '<div class="lx-quiz-opts">' + b.options.map(function (o) {
          return '<button type="button" aria-pressed="false" data-fit="' + (o.fit ? 'yes' : 'no') + '" data-fb="' + esc(o.feedback) + '"><span' + (o.vi ? ' class="lx-vi" lang="vi"' : '') + '>' + md(o.label) + '</span></button>';
        }).join('') + '</div><div class="lx-quiz-fb" role="status" aria-live="polite"></div>' +
        (b.image ? '<p class="lx-meta" style="margin:12px 0 0">' + CC.creditHtml(asset(b.image)) + '</p>' : '') + '</div></div></section>';
    },
    keep: function (b, S, k, st) {
      return '<section class="lx-keep" data-rise aria-labelledby="keep-' + k + '"><div><h2 id="keep-' + k + '">' + md(b.title || 'Take it with you') + '</h2>' + dl(b.items) + '</div>' +
        CC.saveButton('story', st.id, { cls: ' ' }) + '</section>';
    },
    tabs: function (b, S, k) {
      var cell = function (c) {
        if (c && typeof c === 'object') {
          if (c.match) return '<span class="lx-match is-' + c.match + '">' + icon({ yes: 'check', part: 'swap', no: 'close' }[c.match]) + md(c.text) + '</span>';
          return '<span' + (c.vi ? ' lang="vi"' : '') + '>' + md(c.text) + '</span>' + S.cluster(c.claimIds);
        }
        return md(c);
      };
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') + (b.intro ? '<p data-rise>' + md(b.intro) + '</p>' : '') +
        '<section class="lx-wide" data-rise>' +
        (b.tabs.length > 1 ? '<div class="lx-tabs" role="tablist" aria-label="' + esc(b.label || b.heading || 'Compare') + '">' + b.tabs.map(function (t, i) {
          return '<button type="button" role="tab" id="t' + k + '-' + i + '" aria-controls="p' + k + '-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + md(t.label) + '</button>';
        }).join('') + '</div>' : '') +
        b.tabs.map(function (t, i) {
          return '<div id="p' + k + '-' + i + '"' + (b.tabs.length > 1 ? ' role="tabpanel" aria-labelledby="t' + k + '-' + i + '"' : '') + ' class="lx-table-wrap"' + (i ? ' hidden' : '') + '><table class="lx-table">' +
            (t.caption ? '<caption class="visually-hidden">' + esc(t.caption) + '</caption>' : '') +
            '<thead><tr>' + t.columns.map(function (c) { return '<th scope="col">' + md(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
            t.rows.map(function (r) {
              return '<tr>' + r.map(function (c, j) {
                return j === 0 ? '<th scope="row"' + (t.viFirst ? ' lang="vi"' : '') + '>' + cell(c) + '</th>' : '<td data-h="' + esc(t.columns[j]) + '">' + cell(c) + '</td>';
              }).join('') + '</tr>';
            }).join('') + '</tbody></table></div>';
        }).join('') +
        (b.claimIds ? '<p class="lx-meta" style="margin-top:12px">Sources for this table' + S.cluster(b.claimIds) + '</p>' : '') + '</section>';
    },
    map: function (b, S, k) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') + (b.intro ? '<p data-rise>' + md(b.intro) + S.cluster(b.claimIds) + '</p>' : '') +
        '<section class="lx-wide" aria-label="' + esc(b.label || 'Map') + '" style="margin-top:24px">' +
        '<div class="lx-map" data-rise data-map="' + esc(b.map) + '" data-k="' + k + '">' +
          '<div class="lx-map-svg"><p class="lx-map-legend">Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors</p></div>' +
          '<div class="lx-map-panel"><p id="map-pick-' + k + '" class="lx-meta" style="margin:0">' + esc(b.pick || 'Choose a street') + '</p>' +
          '<ul class="lx-map-list" aria-labelledby="map-pick-' + k + '"></ul><div class="lx-map-card" aria-live="polite"></div></div>' +
        '</div></section>';
    },
    cards: function (b) {
      return '<section class="lx-row-wrap lx-full" aria-label="' + esc(b.heading || 'Cards') + '">' +
        '<div class="lx-row-head">' + (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '<span></span>') +
        '<div class="lx-row-btns"><button type="button" data-prev aria-label="Previous cards">' + icon('arrowLeft') + '</button><button type="button" data-next aria-label="More cards">' + icon('arrowRight') + '</button></div></div>' +
        '<div class="lx-row" tabindex="0" aria-label="' + esc(b.heading || 'Cards') + ', scroll sideways">' + b.items.map(function (it) {
          var inner = (it.image ? '<div class="lx-frame">' + img(it.image, { sizes: '(min-width: 760px) 380px, 82vw' }) + '</div>' : '') +
            '<div class="lx-card-b"><h3' + (it.vi ? ' lang="vi"' : '') + '>' + md(it.title) + '</h3>' + (it.means ? '<p class="lx-card-means">' + md(it.means) + '</p>' : '') + '<p>' + md(it.text) + '</p></div>';
          return '<article class="lx-card">' + inner + '</article>';
        }).join('') + '</div></section>';
    },
    phrases: function (b) {
      return (b.heading ? '<h2 id="' + (b.id || slug(b.heading)) + '">' + md(b.heading) + '</h2>' : '') + '<ul class="lx-phrases lx-wide">' + phraseList(b.ids) + '</ul>';
    },
    essay: function (b, S, k, st, title) {
      var pics = b.steps.map(function (s) { return s.image; });
      var steps = (title ? '<div class="lx-step is-title" data-i="0">' + title + '</div>' : '') + b.steps.map(function (s, i) {
        return '<div class="lx-step" data-i="' + i + '"><div>' + (s.label ? '<span class="lx-step-n">' + md(s.label) + '</span>' : '') +
          (s.heading ? '<h2>' + md(s.heading) + '</h2>' : '') + paras(s.paras || [{ text: s.text, claimIds: s.claimIds }], S, { rise: false }) + '</div></div>';
      }).join('');
      return '<section class="lx-scrolly lx-full' + (title ? ' lx-hero-essay story-head' : '') + '" data-pics="' + pics.join(',') + '" aria-label="' + esc(b.label || 'Photo essay') + '">' +
        '<div class="lx-scrolly-stage' + (title ? ' story-head-media' : '') + '" aria-hidden="true">' +
        pics.map(function (id, j) { return '<figure' + (j === 0 ? ' class="is-on"' : '') + '>' + img(id, { sizes: '100vw', alt: '', eager: j === 0 && !!title }) + '</figure>'; }).join('') +
        '<p class="lx-scrolly-credit"></p></div><div class="lx-steps-over">' + steps + '</div></section>';
    }
  };
  function phraseList(ids) {
    return (ids || []).map(function (id) { var p = CC.byId(CC.phrases, id); return p ? CC.phraseHtml(p, { tag: 'li', compact: true }) : ''; }).join('');
  }

  /* ---------- the opening ---------- */
  function opening(st, ctx, S) {
    var back = ctx.back, claims = CC.storyClaims(st);
    var nCheck = claims.filter(function (c) { return CC.unverified([c]); }).length;
    var nSrc = CC.sourcesOf(claims).length;
    var crumb = '<ol class="lx-crumb" aria-label="Breadcrumb"><li><a href="index.html#destinations">Destinations</a></li><li><a href="vietnam.html">Vietnam</a></li>' +
      (back.chapter ? '<li><a href="vietnam.html#' + back.chapter.anchor + '">' + esc(back.chapter.name) + '</a></li>' :
        back.topic ? '<li><a href="vietnam.html#' + back.topic.id + '">' + esc(back.topic.label) + '</a></li>' : '') +
      '<li><span aria-current="page">Story</span></li></ol>';
    var head = crumb +
      '<h1 id="story-title" tabindex="-1">' + esc(st.title) + '</h1>' +
      '<p class="lx-dek">' + esc(st.dek) + '</p>' +
      '<p class="lx-byline"><span>' + icon('pin') + esc(st.place) + '</span><span>' + icon('clock') + CC.storyMinutes(st) + ' min read</span>' +
        (nSrc ? '<span>' + icon('source') + '<a href="#src-title" style="color:inherit">' + CC.plural(nSrc, 'source') + '</a></span>' : '') +
        (nCheck ? '<span class="is-check">' + icon('verify') + CC.plural(nCheck, 'point') + ' still being verified</span>' : '') + '</p>' +
      '<div class="lx-actions">' +
        (ctx.sc ? '<a class="cc-btn" href="' + ctx.entry.href + '">' + (ctx.entry.state === 'started' ? esc(ctx.entry.label) : 'Play this moment') + ' ' + CC.arrow() + '</a>' : '') +
        CC.saveButton('story', st.id, { cls: 'cc-btn-quiet' }) + '</div>';
    if (st.layout === 'essay') {
      var first = (st.blocks || []).filter(function (b) { return b.type === 'essay'; })[0];
      if (first) return { html: R.essay(first, S, 0, st, '<div class="lx-essay-title">' + head + '</div>'), used: first };
    }
    var h = st.hero || {}, pic = h.image || st.imageId, vid = h.video;
    return {
      html: '<header class="lx-hero story-head"' + (vid ? ' data-video="' + esc(vid) + '"' : '') + '>' +
        '<div class="lx-hero-media story-head-media">' + (vid ? videoTag(vid, 'metadata', true) : pic ? img(pic, { eager: true, sizes: '100vw', alt: '' }) : '') + '</div>' +
        '<div class="lx-hero-in">' + head + '</div>' +
        '<p class="lx-hero-credit">' + credit(vid || pic) + '</p>' +
        (st.layout === 'longform' ? '<span class="lx-scroll-cue" aria-hidden="true"></span>' : '') + '</header>'
    };
  }

  function render(st, ctx) {
    var S = Sources();
    var open = opening(st, ctx, S);
    var body = (st.blocks || []).map(function (b, k) {
      if (b === open.used) return '';
      var fn = R[b.type];
      return fn ? fn(b, S, k, st) : '';
    }).join('');
    var scope = '<section class="lx-scope" aria-label="About this story" data-rise-group>' +
      '<div data-rise><h2>' + icon('pin') + 'Where this applies</h2><p>' + esc(st.appliesTo) + '</p></div>' +
      '<div data-rise><h2>' + icon('globe') + 'How it varies</h2><p>' + esc(st.varies) + '</p></div></section>';
    var html = open.html +
      (st.layout === 'longform' ? '<nav class="lx-toc" aria-label="In this story"></nav>' : '') +
      '<article class="lx-grid lx-body story-body" aria-labelledby="story-title">' + scope + body + '</article>';
    return { html: html, sources: S };
  }

  /* the end list, numbered as the clusters are */
  function sourcesList(S, claims) {
    return '<section class="lx-end" aria-labelledby="src-title"><h2 id="src-title">Sources</h2><ol>' + S.order.map(function (sid, k) {
      var s = CC.byId(CC.sources, sid); if (!s) return '';
      return '<li id="src-' + (k + 1) + '"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) + '<span class="visually-hidden"> (opens in a new tab)</span></a>' +
        '<span class="lx-meta">' + esc(s.org) + '. Checked ' + esc(s.checked) + '. <b>Limits:</b> ' + esc(s.limits) + '</span>' +
        (S.has(k + 1) ? '<a class="src-back" href="#fn-' + (k + 1) + '">' + icon('arrowUp') + 'Back to the text<span class="visually-hidden"> where source ' + (k + 1) + ' is cited</span></a>' : '') + '</li>';
    }).join('') + '</ol>' +
      (claims.some(function (c) { return c.kind === 'projectNote'; }) ? '<p class="lx-meta lx-end-note">Points marked “CultureCompass tip” are our own suggestions, not cultural claims, so they have no source.</p>' : '') +
      (claims.some(function (c) { return CC.unverified([c]); }) ? '<p class="lx-meta lx-end-note">' + icon('verify') + ' A gold source mark means the point is still being checked against that source.</p>' : '') +
      '</section>';
  }

  /* =================== behaviour =================== */
  var pop = null, popFor = null;
  function closePop(focusBack) {
    if (!pop) return;
    pop.classList.remove('is-open');
    if (popFor) { popFor.setAttribute('aria-expanded', 'false'); if (focusBack) popFor.focus(); }
    popFor = null;
  }
  function openPop(btn, html) {
    if (popFor === btn) { closePop(); return; }
    closePop();
    if (!pop) { pop = document.createElement('div'); pop.className = 'lx-pop'; pop.id = 'lx-pop'; pop.setAttribute('role', 'dialog'); document.body.appendChild(pop); }
    pop.innerHTML = html;
    var r = btn.getBoundingClientRect(), w = Math.min(360, innerWidth - 32);
    var left = Math.max(16, Math.min(innerWidth - w - 16, r.left + r.width / 2 - w / 2));
    pop.style.left = left + scrollX + 'px';
    pop.style.top = r.bottom + scrollY + 10 + 'px';
    pop.style.setProperty('--ox', (r.left + r.width / 2 - left) + 'px');
    pop.setAttribute('aria-label', btn.getAttribute('aria-label') || '');
    btn.setAttribute('aria-expanded', 'true'); btn.setAttribute('aria-controls', 'lx-pop');
    popFor = btn;
    requestAnimationFrame(function () { pop.classList.add('is-open'); });
  }
  var wired = false;
  function wireOnce() {
    if (wired) return; wired = true;
    document.addEventListener('click', function (e) {
      var s = e.target.closest && e.target.closest('.lx-src > button');
      if (s) {
        e.stopPropagation();
        var span = s.parentNode, ids = span.getAttribute('data-s').split(','), check = span.hasAttribute('data-check');
        var nums = s.textContent.split(' · ');
        openPop(s, '<h3>' + (ids.length === 1 ? 'Source' : 'Sources') + ' for this point</h3><ol>' + ids.map(function (id, i) {
          var src = CC.byId(CC.sources, id);
          return '<li value="' + (parseInt(nums[i], 10) || i + 1) + '">' + (src ? '<a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(src.title) + '</a><div class="lx-meta">' + esc(src.org) + ' · <a href="#src-' + (parseInt(nums[i], 10) || 1) + '" style="color:inherit">in the list</a></div>' : esc(id)) + '</li>';
        }).join('') + '</ol>' + (check ? '<p class="lx-pop-note">' + icon('verify') + 'Still being checked against ' + (ids.length === 1 ? 'this source' : 'these sources') + '.</p>' : ''));
        return;
      }
      var t = e.target.closest && e.target.closest('.lx-term[data-t]');
      if (t) {
        e.stopPropagation();
        var g = term(t.getAttribute('data-t')); if (!g) return;
        openPop(t, '<p class="lx-term-vi" lang="vi">' + esc(g.vi) + '</p><p class="lx-term-say">Say it: ' + esc(g.say) + '</p><p>' + esc(g.en) + '</p>');
        return;
      }
      if (pop && popFor && !pop.contains(e.target)) closePop();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && popFor) closePop(true); });
    addEventListener('resize', function () { closePop(); });
  }
  function terms(root) {
    $$('.lx-term[data-t]', root).forEach(function (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', b.textContent + ': what it means'); });
  }

  function hero(root) {
    var h = root.querySelector('.lx-hero[data-video]'); if (!h) return;
    var v = h.querySelector('video'); if (!v) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'lx-pause';
    h.appendChild(btn);
    var sync = function () { var on = !v.paused; btn.innerHTML = icon(on ? 'pause' : 'play'); btn.setAttribute('aria-label', on ? 'Pause the background video' : 'Play the background video'); };
    btn.addEventListener('click', function () { if (v.paused) { v.play(); h.dataset.user = 'play'; } else { v.pause(); h.dataset.user = 'pause'; } });
    v.addEventListener('play', sync); v.addEventListener('pause', sync); sync();
    if (!reduce() && !CC.motion.lowData()) v.play().catch(sync);
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (h.dataset.user === 'pause' || (reduce() && h.dataset.user !== 'play')) return; if (e.isIntersecting) v.play().catch(function () {}); else v.pause(); }); }).observe(h);
  }
  function videos(root) {
    $$('figure[data-vid]', root).forEach(function (f) {
      var v = f.querySelector('video'), b = f.querySelector('.lx-pause'), user = null;
      var sync = function () { b.innerHTML = icon(v.paused ? 'play' : 'pause'); b.setAttribute('aria-label', v.paused ? 'Play the video' : 'Pause the video'); };
      b.addEventListener('click', function () { if (v.paused) { user = 'play'; v.play(); } else { user = 'pause'; v.pause(); } });
      v.addEventListener('play', sync); v.addEventListener('pause', sync); sync();
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (user === 'pause' || (reduce() && user !== 'play') || CC.motion.lowData() && user !== 'play') return; if (e.isIntersecting) v.play().catch(function () {}); else v.pause(); }); }, { threshold: .4 }).observe(f);
    });
  }

  function reveal(root) {
    var all = $$('[data-rise],[data-wipe],.lx-body > h2,.lx-how > li', root);
    if (reduce()) { all.forEach(function (el) { el.classList.add('is-in'); }); return; }
    document.documentElement.classList.add('lx-anim');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    $$('[data-rise-group]', root).forEach(function (g) { $$('[data-rise]', g).slice(0, 6).forEach(function (el, i) { el.style.setProperty('--d', i * 60 + 'ms'); }); });
    all.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); else io.observe(el);
    });
  }

  function toc(root) {
    var nav = root.querySelector('.lx-toc'), body = root.querySelector('.lx-body'); if (!nav || !body) return;
    var heads = $$('.lx-body > h2[id]', root);
    if (heads.length < 3) { nav.remove(); return; }
    nav.innerHTML = '<p>In this story</p><ol>' + heads.map(function (h) { return '<li><a href="#' + h.id + '">' + esc(h.textContent) + '</a></li>'; }).join('') + '</ol>';
    var mark = document.createElement('span'); mark.className = 'lx-toc-mark'; nav.querySelector('ol').appendChild(mark);
    var links = $$('a', nav), raf = 0;
    links.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); CC.motion.scrollTo(document.getElementById(a.hash.slice(1))); history.replaceState(null, '', a.hash); }); });
    var wide = $$('.lx-bleed, .lx-scrolly, .lx-wide, .lx-full', root);
    var draw = function () {
      raf = 0;
      var r = body.getBoundingClientRect();
      nav.classList.toggle('is-on', r.top < innerHeight * .4 && r.bottom > innerHeight * .5);
      var y = 200, under = wide.some(function (b) { var q = b.getBoundingClientRect(); return q.top < y + 320 && q.bottom > y; });
      nav.classList.toggle('is-under', under);
      var cur = 0; heads.forEach(function (h, i) { if (h.getBoundingClientRect().top < innerHeight * .35) cur = i; });
      links.forEach(function (a, i) { a.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
      var a = links[cur]; if (a) { mark.style.top = a.offsetTop + 'px'; mark.style.height = a.offsetHeight + 'px'; }
    };
    addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
    addEventListener('resize', draw); draw();
  }

  function parallax(root) {
    if (reduce() || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    var h = root.querySelector('.lx-hero');
    if (h) {
      gsap.to(h.querySelector('.lx-hero-media'), { yPercent: 14, scale: 1.06, ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to(h.querySelector('.lx-hero-in'), { y: -60, opacity: .2, ease: 'none', scrollTrigger: { trigger: h, start: 'center center', end: 'bottom top', scrub: true } });
    }
    $$('.lx-bleed .lx-img', root).forEach(function (im) {
      gsap.fromTo(im, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: im.closest('.lx-frame'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.lx-tl', root).forEach(function (tl) {
      ScrollTrigger.create({ trigger: tl, start: 'top 60%', end: 'bottom 60%', scrub: true, onUpdate: function (s) { tl.querySelector('.lx-tl-line').style.setProperty('--p', s.progress.toFixed(4)); } });
    });
    /* pictures load late on a long page: measure again once they have */
    addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  function timelines(root) {
    $$('.lx-tl', root).forEach(function (tl) {
      var items = $$('.lx-tl-item', tl), line = tl.querySelector('.lx-tl-line');
      items.forEach(function (it, i) { it.classList.toggle('is-flip', i % 2 === 1); });
      var tick = function () {
        var y = innerHeight * .6;
        items.forEach(function (it) { var d = it.querySelector('.lx-tl-dot').getBoundingClientRect(); it.classList.toggle('is-passed', d.top < y); });
        if (reduce() || !window.ScrollTrigger) { var r = tl.getBoundingClientRect(); line.style.setProperty('--p', Math.max(0, Math.min(1, (y - r.top) / r.height)).toFixed(4)); }
      };
      var raf = 0;
      addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; tick(); }); }, { passive: true }); tick();
    });
  }

  function lightbox(root) {
    var figs = $$('figure[data-zoom]', root); if (!figs.length) return;
    var dlg = document.createElement('dialog'); dlg.className = 'lx-lightbox'; dlg.setAttribute('aria-label', 'Picture viewer');
    dlg.innerHTML = '<div class="lx-lb-stage"><span class="lx-lb-count"></span><button type="button" class="lx-lb-btn lx-lb-close" aria-label="Close the viewer">' + icon('close') + '</button>' +
      '<button type="button" class="lx-lb-btn lx-lb-prev" aria-label="Previous picture">' + icon('arrowLeft') + '</button><button type="button" class="lx-lb-btn lx-lb-next" aria-label="Next picture">' + icon('arrowRight') + '</button></div><div class="lx-lb-cap"></div>';
    document.body.appendChild(dlg);
    var i = 0, opener = null, im = new Image();
    im.decoding = 'async';
    dlg.querySelector('.lx-lb-stage').insertBefore(im, dlg.querySelector('.lx-lb-close'));
    var show = function (k) {
      i = (k + figs.length) % figs.length;
      var id = figs[i].getAttribute('data-pic'), a = asset(id);
      im.src = a.srcBase ? a.srcBase + '-2560.webp' : a.file; im.alt = a.alt;
      dlg.querySelector('.lx-lb-count').textContent = (i + 1) + ' of ' + figs.length;
      dlg.querySelector('.lx-lb-cap').innerHTML = '<span>' + md(figs[i].getAttribute('data-cap') || a.alt) + '</span>' + credit(id);
      if (!reduce() && im.animate) im.animate([{ opacity: .3, transform: 'scale(.985)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.19,1,.22,1)' });
    };
    figs.forEach(function (f, k) { var b = f.querySelector('.lx-zoom-btn'); if (b) b.addEventListener('click', function () { opener = b; show(k); dlg.showModal(); }); });
    dlg.querySelector('.lx-lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lx-lb-prev').addEventListener('click', function () { show(i - 1); });
    dlg.querySelector('.lx-lb-next').addEventListener('click', function () { show(i + 1); });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lx-lb-stage')) dlg.close(); });
    dlg.addEventListener('close', function () { if (opener) opener.focus(); });
    var sx = 0; dlg.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); });
  }

  function beforeAfter(root) {
    $$('figure.lx-ba', root).forEach(function (f) {
      var st = f.querySelector('.lx-ba-stage'), inp = f.querySelector('input'), lb = f.getAttribute('data-lb');
      var set = function (v) { st.style.setProperty('--pos', v + '%'); inp.setAttribute('aria-valuetext', Math.round(v) + '% ' + lb); };
      inp.addEventListener('input', function () { set(inp.value); });
      inp.addEventListener('pointerdown', function () { st.classList.add('is-drag'); });
      addEventListener('pointerup', function () { st.classList.remove('is-drag'); });
      /* a hint the first time it arrives: the line sweeps once, then rests in the middle */
      if (!reduce()) new IntersectionObserver(function (es, o) {
        if (!es[0].isIntersecting) return; o.disconnect();
        var t0 = performance.now();
        (function step(t) { var k = Math.min(1, (t - t0) / 1400), v = 50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k); set(v); inp.value = v; if (k < 1) requestAnimationFrame(step); })(t0);
      }, { threshold: .6 }).observe(st);
    });
  }

  function scrolly(root) {
    $$('.lx-scrolly', root).forEach(function (s) {
      var pics = s.getAttribute('data-pics').split(',');
      var stage = s.querySelector('.lx-scrolly-stage');
      var figs = $$('figure', stage), steps = $$('.lx-step', s), cr = stage.querySelector('.lx-scrolly-credit');
      var dots = document.createElement('ol'); dots.className = 'lx-essay-dots'; dots.setAttribute('aria-label', 'Steps of the photo essay');
      dots.innerHTML = steps.map(function (st, k) { var h = st.querySelector('h2, h1'); return '<li><button type="button" aria-label="Go to: ' + esc(h ? h.textContent : 'step ' + (k + 1)) + '"></button></li>'; }).join('');
      document.body.appendChild(dots);
      var db = $$('button', dots);
      db.forEach(function (b, k) { b.addEventListener('click', function () { CC.motion.scrollTo(steps[k], 'center'); }); });
      var go = function (k) {
        var p = +(steps[k].getAttribute('data-i') || 0);
        figs.forEach(function (f, j) { f.classList.toggle('is-on', j === p); });
        steps.forEach(function (st, j) { st.classList.toggle('is-active', j === k); });
        db.forEach(function (b, j) { b.setAttribute('aria-current', j === k ? 'true' : 'false'); });
        cr.innerHTML = credit(pics[p]);
      };
      /* the step whose card is nearest the middle of the screen is the current one */
      var cur = -1, raf = 0;
      var pick = function () {
        raf = 0;
        var mid = innerHeight / 2, best = 0, d = Infinity;
        steps.forEach(function (st, j) { var r = st.firstElementChild.getBoundingClientRect(), dd = Math.abs((r.top + r.bottom) / 2 - mid); if (dd < d) { d = dd; best = j; } });
        if (best !== cur) { cur = best; go(best); }
      };
      addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(pick); }, { passive: true });
      addEventListener('resize', pick);
      new IntersectionObserver(function (es) { dots.classList.toggle('is-on', es[0].isIntersecting); }).observe(s);
      pick();
    });
  }

  function rows(root) {
    $$('.lx-row-wrap', root).forEach(function (w) {
      var row = w.querySelector('.lx-row'), p = w.querySelector('[data-prev]'), n = w.querySelector('[data-next]');
      var sync = function () { p.disabled = row.scrollLeft < 8; n.disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 8; };
      p.addEventListener('click', function () { row.scrollBy({ left: -row.clientWidth * .8, behavior: reduce() ? 'auto' : 'smooth' }); });
      n.addEventListener('click', function () { row.scrollBy({ left: row.clientWidth * .8, behavior: reduce() ? 'auto' : 'smooth' }); });
      row.addEventListener('scroll', sync, { passive: true }); sync();
    });
  }

  function quiz(root) {
    $$('.lx-quiz', root).forEach(function (q) {
      var fb = q.querySelector('.lx-quiz-fb');
      $$('.lx-quiz-opts button', q).forEach(function (b, k, all) {
        b.addEventListener('click', function () {
          all.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); o.classList.remove('is-fit', 'is-other'); });
          var fit = b.getAttribute('data-fit') === 'yes';
          b.classList.add(fit ? 'is-fit' : 'is-other');
          fb.innerHTML = '<b>' + icon(fit ? 'check' : 'question') + esc(q.getAttribute(fit ? 'data-fit-label' : 'data-other-label')) + '</b>' + md(b.getAttribute('data-fb'));
          fb.classList.remove('is-on'); void fb.offsetWidth; fb.classList.add('is-on');
        });
      });
    });
  }

  function tabs(root) {
    $$('[role="tablist"]', root).forEach(function (tl) {
      var tb = $$('[role="tab"]', tl);
      var sel = function (t, focus) {
        tb.forEach(function (x) { var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
        if (focus) t.focus();
      };
      tb.forEach(function (t, i) {
        t.addEventListener('click', function () { sel(t); });
        t.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); sel(tb[(i + d + tb.length) % tb.length], true); } });
      });
    });
  }

  /* maps: assets/data/maps/<id>.js (OpenStreetMap geometry, tools/media/osm-to-svg.mjs), loaded only when a story has one */
  function maps(root, st) {
    $$('.lx-map[data-map]', root).forEach(function (box) {
      var id = box.getAttribute('data-map'), b = st.blocks[+box.getAttribute('data-k')];
      var go = function () { drawMap(box, window.CC_MAPS[id], b); };
      if (window.CC_MAPS && window.CC_MAPS[id]) { go(); return; }
      var s = document.createElement('script'); s.src = 'assets/data/maps/' + id + '.js'; s.onload = go;
      s.onerror = function () { box.querySelector('.lx-map-svg').insertAdjacentHTML('afterbegin', '<p class="lx-meta" style="padding:24px">The map could not be loaded.</p>'); };
      document.body.appendChild(s);
    });
  }
  function drawMap(box, data, b) {
    var places = b.places || [];
    var svgBox = box.querySelector('.lx-map-svg');
    svgBox.insertAdjacentHTML('afterbegin', data.svg);
    var svg = svgBox.querySelector('svg');
    svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', b.label || 'Map');
    $$('path', svg).forEach(function (p, i) { p.setAttribute('pathLength', '1'); p.style.setProperty('--d', (i % 40) * 30 + 'ms'); });
    var NS = 'http://www.w3.org/2000/svg';
    var label = function (txt, x, y, cls) { var t = document.createElementNS(NS, 'text'); t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('class', cls); t.setAttribute('text-anchor', 'middle'); t.textContent = txt; svg.appendChild(t); return t; };
    if (b.water) {
      var lake = $$('.m-water', svg).map(function (p) { var bb = p.getBBox(); return { b: bb, a: bb.width * bb.height * (Math.min(bb.width, bb.height) / Math.max(bb.width, bb.height, 1) > .3 ? 1 : 0) }; }).sort(function (x, y) { return y.a - x.a; })[0];
      if (lake) label(b.water, lake.b.x + lake.b.width / 2, Math.min(data.h - 16, lake.b.y + lake.b.height * .55), 'm-label-quiet');
    }
    var pin = document.createElementNS(NS, 'circle'); pin.setAttribute('r', '9'); pin.setAttribute('class', 'm-pin'); pin.style.display = 'none'; svg.appendChild(pin);
    var lab = label('', 0, 0, 'm-label');
    var list = box.querySelector('.lx-map-list'), card = box.querySelector('.lx-map-card');
    var byName = {}; places.forEach(function (p) { byName[p.name] = p; });
    list.innerHTML = places.map(function (p) { return '<li><button type="button" aria-pressed="false" data-n="' + esc(p.name) + '" lang="vi">' + esc(p.name) + '</button></li>'; }).join('');
    var select = function (n) {
      $$('.m-trade', svg).forEach(function (p) { p.classList.toggle('is-sel', p.getAttribute('data-street') === n); });
      $$('button', list).forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-n') === n ? 'true' : 'false'); });
      var s = data.streets[n], it = byName[n];
      if (s) { pin.setAttribute('cx', s.x); pin.setAttribute('cy', s.y); pin.style.display = ''; lab.setAttribute('x', s.x); lab.setAttribute('y', s.y - 18); lab.textContent = n; }
      if (it) card.innerHTML = (it.image ? '<div class="lx-frame">' + img(it.image, { sizes: '400px' }) + '</div>' : '') +
        '<div class="lx-map-card-b"><h3 lang="vi">' + esc(n) + '</h3>' + (it.means ? '<p class="lx-card-means">' + md(it.means) + '</p>' : '') + '<p>' + md(it.text) + '</p>' + (it.image ? credit(it.image) : '') + '</div>';
    };
    list.addEventListener('click', function (e) { var x = e.target.closest('button'); if (x) select(x.getAttribute('data-n')); });
    svg.addEventListener('click', function (e) { var p = e.target.closest('.m-trade'); if (p && byName[p.getAttribute('data-street')]) select(p.getAttribute('data-street')); });
    if (places[0]) select(places[0].name);
    if (reduce()) svgBox.classList.add('is-drawn');
    else new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { svgBox.classList.add('is-drawn'); o.disconnect(); } }, { threshold: .3 }).observe(svgBox);
  }

  function init(root, st) {
    wireOnce();
    terms(root); hero(root); videos(root); beforeAfter(root); scrolly(root); rows(root); quiz(root); tabs(root); maps(root, st); lightbox(root);
    toc(root); timelines(root); reveal(root); parallax(root);
  }

  CC.storyBlocks = { render: render, sourcesList: sourcesList, init: init, md: md, img: img };
})();
