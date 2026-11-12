/* CultureCompass — the player characters, one list for the game (explore-game.js) and the walking invitation (companion.js).
   Sheets: assets/game/characters/<id>/run.png and idle.png, built by tools/recolor-character.py from LimeZu Modern Interiors
   (384 x 32: 24 frames of 16 x 32; rows right, up, left, down, 6 frames each). To add a character, add it to
   assets/game/characters/recolor.json, run the tool, and add a line here.
   The choice is kept in CC.store 'character'. chosen() is false until the player has picked one; get() falls back to the first. */
(function () {
  'use strict';
  var CC = window.CC = window.CC || {};
  var DIR = 'assets/game/characters/';
  var LIST = ['arvy', 'henry'].map(function (id) {
    return { id: id, name: id.charAt(0).toUpperCase() + id.slice(1), run: DIR + id + '/run.png', idle: DIR + id + '/idle.png' };
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
    set: function (id) { if (byId(id) && CC.store) CC.store.set('character', id); }
  };
})();
