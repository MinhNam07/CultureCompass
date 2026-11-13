/* CultureCompass — the player characters, one list for the game (explore-game.js) and the walking invitation (companion.js).
   Sheets: assets/game/characters/<id>/run.png and idle.png, built by tools/recolor-character.py from LimeZu Modern Interiors
   (384 x 32: 24 frames of 16 x 32; rows right, up, left, down, 6 frames each). To add a character, add it to
   assets/game/characters/recolor.json, run the tool, and add a line here.
   The choice is kept in CC.store 'character'. chosen() is false until the player has picked one; get() falls back to the first.
   cardsHtml() / select() / onKey() are the traveller cards (styles: game.css, "traveller cards"). */
(function () {
  'use strict';
  var CC = window.CC = window.CC || {};
  var DIR = 'assets/game/characters/';
  var LIST = [{ id: 'arvy', kind: 'Woman' }, { id: 'henry', kind: 'Man' }].map(function (c) {
    return { id: c.id, kind: c.kind, name: c.id.charAt(0).toUpperCase() + c.id.slice(1), run: DIR + c.id + '/run.png', idle: DIR + c.id + '/idle.png' };
  });

  function byId(id) { return LIST.filter(function (c) { return c.id === id; })[0] || null; }
  function read() {
    if (CC.store) return CC.store.get('character', null);
    try { return JSON.parse(localStorage.getItem('cc.character')); } catch (e) { return null; }
  }

  CC.character = {
    list: LIST,
    byId: byId,
    /* a sheet as a CSS url(), made absolute: a url() inside a custom property resolves against the stylesheet that uses it */
    cssUrl: function (path) { return 'url("' + new URL(path, document.baseURI).href + '")'; },
    chosen: function () { return !!byId(read()); },
    get: function () { return byId(read()) || LIST[0]; },
    set: function (id) { if (byId(id) && CC.store) CC.store.set('character', id); },
    /* the one after the current one: with two travellers, the other one */
    next: function () { var i = LIST.indexOf(this.get()); return LIST[(i + 1) % LIST.length]; },
    /* Traveller cards (map of places, first-walk chooser): a radio group of pixel cards. The chosen one wears the
       game's cyan corner brackets (.tc-cursor), which slide to the card you pick; hover or focus makes that traveller walk.
       opts: { selected: id, labelledby: id, large: bool }. Cards carry data-traveller. */
    cardsHtml: function (opts) {
      opts = opts || {};
      var sel = byId(opts.selected) || this.get(), self = this, esc = CC.esc || String;
      var check = '<svg class="cc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
      return '<div class="tc-group' + (opts.large ? ' is-lg' : '') + '" role="radiogroup"' + (opts.labelledby ? ' aria-labelledby="' + esc(opts.labelledby) + '"' : ' aria-label="Traveller"') + ' data-sel="' + LIST.indexOf(sel) + '">' +
        '<span class="tc-cursor" aria-hidden="true"></span>' + LIST.map(function (c) {
          var on = c === sel;
          return '<button type="button" class="tc" role="radio" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-traveller="' + c.id + '"' +
            ' style="' + esc('--tc-idle:' + self.cssUrl(c.idle) + ';--tc-run:' + self.cssUrl(c.run)) + '">' +
            '<span class="tc-stage" aria-hidden="true"><span class="tc-sprite"></span></span>' +
            '<span class="tc-txt"><span class="tc-name">' + esc(c.name) + '</span>' +
            '<span class="tc-kind">' + esc(c.kind) + '<span class="tc-now">' + check + 'Playing</span></span></span></button>';
        }).join('') + '</div>';
    },
    /* show id as chosen in a card group without re-rendering it, so the brackets slide and the traveller hops */
    select: function (group, id) {
      var i = LIST.indexOf(byId(id));
      if (!group || i < 0) return;
      var changed = String(i) !== group.dataset.sel;
      group.dataset.sel = i;
      [].forEach.call(group.querySelectorAll('.tc'), function (b) {
        var on = b.dataset.traveller === id;
        b.setAttribute('aria-checked', on);
        b.tabIndex = on ? 0 : -1;
        if (on && changed) { b.classList.remove('is-hop'); void b.offsetWidth; b.classList.add('is-hop'); }
      });
    },
    /* arrow keys inside a card group (radio pattern): moves the choice and focus; returns the new id, or null */
    onKey: function (e) {
      var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      var card = d && e.target.closest && e.target.closest('.tc');
      if (!card) return null;
      e.preventDefault();
      var group = card.closest('.tc-group'), c = LIST[(LIST.indexOf(byId(card.dataset.traveller)) + d + LIST.length) % LIST.length];
      this.select(group, c.id);
      group.querySelector('[data-traveller="' + c.id + '"]').focus();
      return c.id;
    }
  };
})();
