/* CultureCompass — Explore mode: a small top-down pixel engine on a 2D canvas (no libraries).
   Draws a Tiled map built by tools/build-maps.js (CC.maps[id]), moves the player with the keyboard or by clicking,
   depth-sorts buildings and characters, and reports what the player can interact with.
   Works from file://: images are plain <img> drawn on a 2D canvas (never read back), so nothing is blocked.
   The game logic (encounters, facts, journal) lives in explore-game.js and talks to this through CC.Engine's API. */
(function () {
  'use strict';
  var CC = window.CC = window.CC || {};

  var DIRS = { right: 0, up: 1, left: 2, down: 3 };
  var SPEED = 72;          // px per second (logical pixels; one tile = 16)
  var REACH = 22;          // how close the player must be to interact
  var VIEW_TILES = 24;     // aim for about this many tiles across

  function loadImage(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { console.warn('Explore: could not load ' + src); resolve(null); };
      img.src = src;
    });
  }

  var cache = {};
  function cachedImage(src) { return cache[src] || (cache[src] = loadImage(src)); }

  function Engine(opts) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.box = opts.container;
    this.listeners = {};
    this.keys = {};
    this.frozen = false;
    this.time = 0;
    this.emotes = [];
    this.markers = {};       // entity id → 'look' | 'quest'
    this.reduce = !!opts.reduceMotion;
    this.player = { x: 0, y: 0, dir: 'down', moving: false, anim: 0, w: 10, h: 5 };
  }

  Engine.prototype.on = function (ev, fn) { (this.listeners[ev] = this.listeners[ev] || []).push(fn); };
  Engine.prototype.emit = function (ev, data) { (this.listeners[ev] || []).forEach(function (fn) { fn(data); }); };

  /* ---------- loading ---------- */
  Engine.prototype.loadPlayer = function (playerSprites) {
    var self = this;
    return Promise.all([
      cachedImage(playerSprites.run).then(function (img) { self.player.run = img; }),
      cachedImage(playerSprites.idle).then(function (img) { self.player.idle = img; })
    ]);
  };

  /* switch to another map (a zone can have several: a street and the inside of a house) */
  Engine.prototype.setMap = function (map) {
    var self = this, jobs = [];
    this.map = map;
    this.T = map.tile;
    this.npcs = []; this.hotspots = []; this.zones = []; this.doors = []; this.movers = [];
    this.targets = {}; this.spawns = {}; this.spawn = null; this.props = [];
    this.inZones = {}; this.inDoors = {};
    this.moveTarget = null; this.pendingInteract = null;
    this.objectsOrder = null;
    this.guidePath = null; this.guideKey = '';
    map.tilesets.forEach(function (ts) {
      if (ts.image) jobs.push(cachedImage(ts.image).then(function (img) { ts.img = img; }));
      else Object.keys(ts.tiles).forEach(function (id) {
        var t = ts.tiles[id];
        jobs.push(cachedImage(t.image).then(function (img) { t.img = img; }));
        if (t.frames) {
          t.frameImgs = [];
          t.frames.forEach(function (src, i) { jobs.push(cachedImage(src).then(function (img) { t.frameImgs[i] = img; })); });
        }
      });
    });
    this.tileLayers = [];
    this.collision = new Uint8Array(map.w * map.h);
    map.layers.forEach(function (l, order) {
      if (l.type === 'tiles') {
        if (l.collision) l.data.forEach(function (g, i) { if (g) self.collision[i] = 1; });
        else if (l.visible) self.tileLayers.push({ data: l.data, ysort: l.ysort, order: order });
      } else if (l.name === 'points') {
        l.objects.forEach(function (o) { self.addPoint(o, jobs); });
      } else {
        l.objects.forEach(function (o) {
          if (!o.gid) return;
          var t = self.tileFor(o.gid);
          if (t && t.tile) self.props.push({ x: o.x, y: o.y, tile: t.tile, name: o.name, order: order });
        });
        self.objectsOrder = order;
      }
    });
    this.snapCamera = true;
    return Promise.all(jobs);
  };

  Engine.prototype.addPoint = function (o, jobs) {
    var p = o.props || {};
    var cls = o.cls;
    if (cls === 'spawn') { this.spawns[o.name || 'spawn'] = { x: o.x, y: o.y, dir: p.dir }; if (!this.spawn || o.name === 'spawn') this.spawn = this.spawns[o.name || 'spawn']; return; }
    if (cls === 'target') { this.targets[o.name] = { x: o.x, y: o.y }; return; }
    if (cls === 'zone') { this.zones.push({ id: o.name, x: o.x, y: o.y, w: o.w, h: o.h, props: p }); return; }
    if (cls === 'door') { this.doors.push({ id: o.name, x: o.x, y: o.y, w: o.w, h: o.h, props: p }); return; }
    if (cls === 'hotspot') { this.hotspots.push({ id: 'hs-' + o.id, kind: 'hotspot', x: o.x, y: o.y, w: o.w || 16, h: o.h || 16, props: p, name: o.name }); return; }
    if (cls === 'mover') {
      var mv = { x: o.x, y: o.y, w: o.w, h: o.h, dir: p.dir || 'right', speed: +p.speed || 40, frames: [], offset: +p.offset || 0 };
      var mb = 'assets/game/sprites/' + p.sprite + '-' + mv.dir + '-';
      [0, 1].forEach(function (i) { jobs.push(cachedImage(mb + i + '.png').then(function (img) { mv.frames[i] = img; })); });
      this.movers.push(mv);
      return;
    }
    if (cls === 'npc') {
      var npc = { id: o.name, kind: 'npc', x: o.x, y: o.y, props: p, frames: [], w: 8, h: 5, name: o.name, hidden: false };
      var base = 'assets/game/sprites/npc/' + (p.sprite || 'nhan-vien');
      [0, 1].forEach(function (i) { jobs.push(cachedImage(base + '-' + i + '.png').then(function (img) { npc.frames[i] = img; })); });
      this.npcs.push(npc);
    }
  };

  Engine.prototype.tileFor = function (gid) {
    var ts = null;
    this.map.tilesets.forEach(function (t) { if (gid >= t.firstgid && (!ts || t.firstgid > ts.firstgid)) ts = t; });
    if (!ts) return null;
    var id = gid - ts.firstgid;
    if (ts.image) return { ts: ts, id: id };
    return { ts: ts, tile: ts.tiles[id] };
  };

  /* ---------- size: integer pixel scale, about VIEW_TILES tiles across ---------- */
  Engine.prototype.resize = function () {
    if (!this.map) return;
    var cw = Math.max(240, this.box.clientWidth);
    var ch = Math.max(200, this.box.clientHeight);
    var view = (this.map && this.map.props && +this.map.props.viewTiles) || VIEW_TILES;
    var across = cw < 640 ? Math.min(13, view) : view;
    var scale = Math.max(1, Math.round(cw / (across * this.T)));
    if (window.devicePixelRatio > 1 && scale < 2 && cw > 400) scale = 2;
    this.scale = scale;
    this.vw = Math.ceil(cw / scale);
    this.vh = Math.ceil(ch / scale);
    this.canvas.width = this.vw;
    this.canvas.height = this.vh;
    this.canvas.style.width = (this.vw * scale) + 'px';
    this.canvas.style.height = (this.vh * scale) + 'px';
    this.ctx.imageSmoothingEnabled = false;
  };

  /* ---------- movement and collision ---------- */
  Engine.prototype.blockedAt = function (x, y, w, h, self) {
    var T = this.T, m = this.map;
    var x0 = Math.floor((x - w / 2) / T), x1 = Math.floor((x + w / 2 - 0.01) / T);
    var y0 = Math.floor((y - h) / T), y1 = Math.floor((y - 0.01) / T);
    for (var ty = y0; ty <= y1; ty++) {
      for (var tx = x0; tx <= x1; tx++) {
        if (tx < 0 || ty < 0 || tx >= m.w || ty >= m.h) return true;
        if (this.collision[ty * m.w + tx]) return true;
      }
    }
    for (var i = 0; i < this.npcs.length; i++) {
      var n = this.npcs[i];
      if (n === self || n.hidden) continue;
      if (Math.abs(n.x - x) < (n.w + w) / 2 && y > n.y - n.h - h + 1 && y - h < n.y) return true;
    }
    return false;
  };

  Engine.prototype.step = function (dt) {
    var p = this.player;
    var dx = 0, dy = 0;
    if (!this.frozen) {
      if (this.keys.left) dx -= 1;
      if (this.keys.right) dx += 1;
      if (this.keys.up) dy -= 1;
      if (this.keys.down) dy += 1;
      if (dx || dy) this.moveTarget = null;
      else if (this.moveTarget) {
        var tx = this.moveTarget.x - p.x, ty = this.moveTarget.y - p.y;
        var d = Math.sqrt(tx * tx + ty * ty);
        if (d < 2) { this.moveTarget = null; this.arrived(); }
        else { dx = tx / d; dy = ty / d; }
      }
    }
    var len = Math.sqrt(dx * dx + dy * dy);
    p.moving = len > 0;
    if (p.moving) {
      dx /= len; dy /= len;
      if (Math.abs(dx) > Math.abs(dy) + 0.1) p.dir = dx > 0 ? 'right' : 'left';
      else p.dir = dy > 0 ? 'down' : 'up';
      var sx = dx * SPEED * dt, sy = dy * SPEED * dt;
      var moved = false;
      if (!this.blockedAt(p.x + sx, p.y, p.w, p.h, p)) { p.x += sx; moved = moved || Math.abs(sx) > 0.01; }
      if (!this.blockedAt(p.x, p.y + sy, p.w, p.h, p)) { p.y += sy; moved = moved || Math.abs(sy) > 0.01; }
      if (!moved && this.moveTarget) { this.moveTarget = null; this.arrived(); }
      p.anim += dt;
      this.checkZones();
    } else {
      p.anim += dt * 0.6;
    }
    this.near = this.frozen ? null : this.nearest();
    this.updateGuide(dt);
    this.emotes = this.emotes.filter(function (e) { e.t -= dt; return e.t > 0; });
  };

  Engine.prototype.arrived = function () {
    if (this.pendingInteract) {
      var it = this.pendingInteract;
      this.pendingInteract = null;
      if (this.distTo(it) <= REACH + 6) this.emit('interact', it);
    }
  };

  Engine.prototype.checkZones = function () {
    var p = this.player, self = this;
    this.doors.forEach(function (d) {
      var inside = p.x >= d.x && p.x <= d.x + d.w && p.y >= d.y && p.y <= d.y + d.h;
      if (inside && !self.inDoors[d.id]) self.emit('door', d);
      self.inDoors[d.id] = inside;
    });
    this.zones.forEach(function (z) {
      var inside = p.x >= z.x && p.x <= z.x + z.w && p.y >= z.y && p.y <= z.y + z.h;
      if (inside && !self.inZones[z.id]) self.emit('zone', z);
      self.inZones[z.id] = inside;
    });
  };

  Engine.prototype.distTo = function (it) {
    var p = this.player;
    if (it.kind === 'npc') { var dx = it.x - p.x, dy = (it.y - 3) - (p.y - 3); return Math.sqrt(dx * dx + dy * dy); }
    var cx = Math.max(it.x, Math.min(p.x, it.x + it.w)), cy = Math.max(it.y, Math.min(p.y - 3, it.y + it.h));
    return Math.sqrt((cx - p.x) * (cx - p.x) + (cy - p.y + 3) * (cy - p.y + 3));
  };

  Engine.prototype.interactables = function () { return this.npcs.filter(function (n) { return !n.hidden; }).concat(this.hotspots); };

  Engine.prototype.nearest = function () {
    var best = null, bd = REACH, self = this;
    this.interactables().forEach(function (it) {
      var d = self.distTo(it);
      if (d <= bd) { bd = d; best = it; }
    });
    return best;
  };

  Engine.prototype.interact = function () {
    if (this.frozen) return;
    if (this.near) this.emit('interact', this.near);
  };

  /* click / tap: walk there; if it was a person or object, talk to it on arrival */
  Engine.prototype.click = function (clientX, clientY) {
    if (this.frozen) return;
    var r = this.canvas.getBoundingClientRect();
    var wx = (clientX - r.left) / this.scale + this.cam.x;
    var wy = (clientY - r.top) / this.scale + this.cam.y;
    var hit = null;
    this.npcs.forEach(function (n) { if (!n.hidden && Math.abs(wx - n.x) < 9 && wy > n.y - 30 && wy < n.y + 3) hit = n; });
    if (!hit) this.hotspots.forEach(function (h) { if (wx >= h.x - 4 && wx <= h.x + h.w + 4 && wy >= h.y - 12 && wy <= h.y + h.h + 4) hit = h; });
    if (hit) {
      if (this.distTo(hit) <= REACH) { this.emit('interact', hit); return; }
      this.pendingInteract = hit;
      this.moveTarget = hit.kind === 'npc' ? { x: hit.x, y: hit.y + 10 } : { x: hit.x + hit.w / 2, y: hit.y + hit.h + 8 };
      return;
    }
    this.pendingInteract = null;
    this.moveTarget = { x: wx, y: wy };
  };

  Engine.prototype.teleport = function (x, y, dir) {
    var p = this.player;
    p.x = x; p.y = y; if (dir) p.dir = dir;
    this.moveTarget = null;
    this.inZones = {}; this.inDoors = {};
    var self = this;
    this.zones.forEach(function (z) { self.inZones[z.id] = p.x >= z.x && p.x <= z.x + z.w && p.y >= z.y && p.y <= z.y + z.h; });
    this.doors.forEach(function (d) { self.inDoors[d.id] = p.x >= d.x && p.x <= d.x + d.w && p.y >= d.y && p.y <= d.y + d.h; });
    this.snapCamera = true;
  };

  /* a free spot just south of a person or object, for "Go to…" */
  Engine.prototype.spotNear = function (it) {
    var cands = it.kind === 'npc' ? [[0, 14], [-14, 4], [14, 4], [0, -10]] : [[it.w / 2, it.h + 10], [-8, it.h / 2], [it.w + 8, it.h / 2]];
    for (var i = 0; i < cands.length; i++) {
      var x = (it.kind === 'npc' ? it.x : it.x) + cands[i][0], y = (it.kind === 'npc' ? it.y : it.y) + cands[i][1];
      if (!this.blockedAt(x, y, this.player.w, this.player.h, this.player)) return { x: x, y: y };
    }
    return { x: it.x, y: it.y + 16 };
  };

  Engine.prototype.emote = function (id, text, secs) {
    this.emotes.push({ id: id, text: text, t: secs || 1.6 });
  };

  /* angle from the player to a target point, in radians (0 = up/north, clockwise) */
  Engine.prototype.angleTo = function (name) {
    var t = this.targets[name];
    if (!t) return null;
    return Math.atan2(t.x - this.player.x, -(t.y - this.player.y));
  };
  Engine.prototype.distanceTo = function (name) {
    var t = this.targets[name];
    if (!t) return Infinity;
    return Math.sqrt(Math.pow(t.x - this.player.x, 2) + Math.pow(t.y - this.player.y, 2));
  };

  /* ---------- guide arrows: a trail on the ground from the player to the current goal ---------- */
  /* name = a key in this.targets, or null to hide */
  Engine.prototype.setGuide = function (name) {
    if (name === this.guideName) return;
    this.guideName = name;
    this.guideKey = '';
  };

  /* shortest walkable route over the tile grid (8 directions, no corner cutting).
     Ends on the reachable tile closest to the goal, so goals inside counters or doorways still work. */
  Engine.prototype.findPath = function (sx, sy, gx, gy) {
    var m = this.map, T = this.T, W = m.w, H = m.h, col = this.collision;
    var start = Math.floor(sy / T) * W + Math.floor(sx / T);
    if (start < 0 || start >= W * H) return null;
    var prev = new Int32Array(W * H).fill(-1);
    prev[start] = start;
    var queue = [start], best = start, bestD = Infinity, head = 0;
    var gtx = gx / T - 0.5, gty = gy / T - 0.5;
    while (head < queue.length) {
      var c = queue[head++], cx = c % W, cy = (c - cx) / W;
      var d = (cx - gtx) * (cx - gtx) + (cy - gty) * (cy - gty);
      if (d < bestD) { bestD = d; best = c; if (d < 0.6) break; }
      for (var oy = -1; oy <= 1; oy++) for (var ox = -1; ox <= 1; ox++) {
        if (!ox && !oy) continue;
        var nx = cx + ox, ny = cy + oy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        var n = ny * W + nx;
        if (prev[n] !== -1 || col[n]) continue;
        if (ox && oy && (col[cy * W + nx] || col[ny * W + cx])) continue;
        prev[n] = c;
        queue.push(n);
      }
    }
    var cells = [];
    for (var k = best; k !== start; k = prev[k]) cells.push(k);
    cells.reverse();
    var pts = cells.map(function (i) { return { x: (i % W) * T + T / 2, y: Math.floor(i / W) * T + T / 2 + 2 }; });
    // finish on the goal itself when it is close to the last free tile
    var last = pts.length ? pts[pts.length - 1] : { x: sx, y: sy };
    if (Math.abs(last.x - gx) < T && Math.abs(last.y - gy) < T && !this.blockedAt(gx, gy, 4, 2)) pts.push({ x: gx, y: gy });
    return this.smoothPath(sx, sy, pts);
  };

  /* drop corners the player could walk straight past, so the trail runs in clean lines, not tile steps */
  Engine.prototype.smoothPath = function (sx, sy, pts) {
    var self = this, p = this.player;
    var clear = function (a, b) {
      var n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 3);
      for (var i = 1; i <= n; i++) {
        var f = i / n;
        if (self.blockedAt(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, p.w, p.h, p)) return false;
      }
      return true;
    };
    var out = [], from = { x: sx, y: sy }, i = 0;
    while (i < pts.length) {
      var j = pts.length - 1;
      while (j > i && !clear(from, pts[j])) j--;
      out.push(pts[j]);
      from = pts[j];
      i = j + 1;
    }
    return out;
  };

  Engine.prototype.updateGuide = function (dt) {
    var t = this.guideName && this.targets[this.guideName], p = this.player;
    if (!t) { this.guidePath = null; return; }
    var T = this.T;
    var k = this.guideName + ':' + t.x + ',' + t.y + ':' + Math.floor(p.x / T) + ',' + Math.floor(p.y / T);
    this.guideAge = (this.guideAge || 0) + dt;
    if (k !== this.guideKey || this.guideAge > 1) {
      this.guideKey = k; this.guideAge = 0;
      this.guidePath = this.findPath(p.x, p.y, t.x, t.y);
    }
  };

  /* one pixel chevron pointing along (dx, dy), each -1, 0 or 1 */
  Engine.prototype.chevron = function (x, y, dx, dy, alpha) {
    var ctx = this.ctx, px = [];
    if (dx && dy) {           // diagonal: an L whose corner points the way
      for (var k = -2; k <= 2; k++) { px.push([dx * 2, dy * k], [dx * k, dy * 2]); }
      for (k = -2; k <= 1; k++) { px.push([dx * 1, dy * k], [dx * k, dy * 1]); }
    } else {                  // straight: a > shape two pixels thick
      [[0, -3], [1, -2], [2, -1], [3, 0], [2, 1], [1, 2], [0, 3],
       [-1, -3], [0, -2], [1, -1], [2, 0], [1, 1], [0, 2], [-1, 3]].forEach(function (q) {
        px.push([q[0] * dx - q[1] * dy, q[0] * dy + q[1] * dx]);
      });
    }
    x = Math.round(x); y = Math.round(y);
    // a dark outline (heavier underneath) keeps it readable on light floors and dark brick alike
    ctx.globalAlpha = alpha * 0.45;
    ctx.fillStyle = '#3a3a50';
    px.forEach(function (q) { ctx.fillRect(x + q[0] - 1, y + q[1], 3, 1); ctx.fillRect(x + q[0], y + q[1] - 1, 1, 3); });
    ctx.globalAlpha = alpha * 0.5;
    px.forEach(function (q) { ctx.fillRect(x + q[0], y + q[1] + 1, 1, 1); });
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#f1ce8e';
    px.forEach(function (q) { ctx.fillRect(x + q[0], y + q[1], 1, 1); });
    ctx.globalAlpha = 1;
  };

  Engine.prototype.drawGuide = function () {
    var path = this.guidePath, p = this.player;
    this.guideEnd = null;
    if (this.frozen || !path || !path.length) return;
    var pts = [{ x: p.x, y: p.y - 2 }].concat(path);
    var end = pts[pts.length - 1];
    var total = 0, i;
    for (i = 1; i < pts.length; i++) total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (total < 26) return;   // already there

    var GAP = 14, START = 14, STOP = 10;
    var phase = this.reduce ? 0 : (this.time * 18) % GAP;
    var at = START + phase, walked = 0, seg = 1;
    while (at < total - STOP && seg < pts.length) {
      var a = pts[seg - 1], b = pts[seg], len = Math.hypot(b.x - a.x, b.y - a.y);
      if (walked + len < at) { walked += len; seg++; continue; }
      var f = len ? (at - walked) / len : 0;
      var oct = Math.round(Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI / 4));
      var sx = Math.round(Math.cos(oct * Math.PI / 4)), sy = Math.round(Math.sin(oct * Math.PI / 4));
      // fade in near the player and out near the goal, so the trail has soft ends
      var alpha = Math.min(1, (at - START + 4) / 16, (total - STOP - at) / 16);
      if (len) this.chevron(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, sx, sy, Math.max(0, alpha) * 0.95);
      at += GAP;
    }
    this.guideEnd = end;
  };

  /* where the trail ends: a pulsing ring on the floor and a bouncing arrow pointing down at it.
     Drawn on top so doorways and walls don't hide it. */
  Engine.prototype.drawGuideEnd = function () {
    var end = this.guideEnd;
    if (!end) return;
    var ctx = this.ctx, wave = this.reduce ? 0.5 : (Math.sin(this.time * 4) + 1) / 2;
    var ex = Math.round(end.x), ey = Math.round(end.y);
    var ring = function (r, color, dy) {
      ctx.fillStyle = color;
      ctx.fillRect(ex - r + 2, ey - 3 + dy, 2 * r - 3, 1); ctx.fillRect(ex - r + 2, ey + 3 + dy, 2 * r - 3, 1);
      ctx.fillRect(ex - r + 1, ey - 2 + dy, 1, 1); ctx.fillRect(ex + r - 1, ey - 2 + dy, 1, 1);
      ctx.fillRect(ex - r + 1, ey + 2 + dy, 1, 1); ctx.fillRect(ex + r - 1, ey + 2 + dy, 1, 1);
      ctx.fillRect(ex - r, ey - 1 + dy, 1, 3); ctx.fillRect(ex + r, ey - 1 + dy, 1, 3);
    };
    var r = 6 + Math.round(wave * 2);
    ctx.globalAlpha = 0.5; ring(r, '#3a3a50', 1);
    ctx.globalAlpha = 0.65 + wave * 0.35; ring(r, '#f1ce8e', 0);
    ctx.globalAlpha = 1;
    // bouncing arrow above the ring
    var ay = ey - 14 - Math.round(wave * 3);
    this.chevron(ex, ay, 0, 1, 1);
  };

  /* ---------- drawing ---------- */
  Engine.prototype.drawTile = function (gid, x, y) {
    var t = this.tileFor(gid);
    if (!t) return;
    var ctx = this.ctx, T = this.T;
    if (t.ts.image) {
      if (!t.ts.img) return;
      ctx.drawImage(t.ts.img, (t.id % t.ts.columns) * T, Math.floor(t.id / t.ts.columns) * T, T, T, x, y, T, T);
    } else if (t.tile && t.tile.img) {
      ctx.drawImage(t.tile.img, x, y + T - t.tile.h);
    }
  };

  Engine.prototype.drawLayerRows = function (layer, r0, r1, c0, c1) {
    var m = this.map, T = this.T;
    for (var ty = r0; ty <= r1; ty++) {
      for (var tx = c0; tx <= c1; tx++) {
        var g = layer.data[ty * m.w + tx];
        if (g) this.drawTile(g, tx * T, ty * T);
      }
    }
  };

  Engine.prototype.render = function () {
    var ctx = this.ctx, T = this.T, m = this.map, p = this.player, self = this;
    // camera
    var target = { x: p.x - this.vw / 2, y: p.y - 12 - this.vh / 2 };
    target.x = Math.max(0, Math.min(m.w * T - this.vw, target.x));
    target.y = Math.max(0, Math.min(m.h * T - this.vh, target.y));
    if (m.w * T < this.vw) target.x = (m.w * T - this.vw) / 2;
    if (m.h * T < this.vh) target.y = (m.h * T - this.vh) / 2;
    if (!this.cam || this.snapCamera || this.reduce) { this.cam = { x: target.x, y: target.y }; this.snapCamera = false; }
    else { this.cam.x += (target.x - this.cam.x) * 0.18; this.cam.y += (target.y - this.cam.y) * 0.18; }
    var cx = Math.round(this.cam.x), cy = Math.round(this.cam.y);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#3a3a50';
    ctx.fillRect(0, 0, this.vw, this.vh);
    ctx.setTransform(1, 0, 0, 1, -cx, -cy);

    var c0 = Math.max(0, Math.floor(cx / T)), c1 = Math.min(m.w - 1, Math.floor((cx + this.vw) / T));
    var r0 = Math.max(0, Math.floor(cy / T)), r1 = Math.min(m.h - 1, Math.floor((cy + this.vh) / T));
    var sortOrder = this.objectsOrder == null ? 1e9 : this.objectsOrder;

    // background layers: unsorted layers that sit below the objects layer
    this.tileLayers.forEach(function (l) { if (!l.ysort && l.order < sortOrder) self.drawLayerRows(l, r0, r1, c0, c1); });

    // flat props (tree pits, drains, mats) lie on the ground, so they go under everything that stands
    var viewL = cx - 200, viewR = cx + this.vw + 200, viewT = cy - 20, viewB = cy + this.vh + 220;
    this.props.forEach(function (o) { if (o.tile.flat && o.x < viewR && o.x + o.tile.w > viewL && o.y > viewT && o.y - o.tile.h < viewB) self.drawProp(o); });

    // the guide trail is painted on the ground, under people and buildings
    this.drawGuide();

    // depth-sorted: sorted tile rows, props, people
    var list = [];
    this.tileLayers.forEach(function (l) {
      if (!l.ysort) return;
      for (var ty = r0; ty <= Math.min(m.h - 1, r1 + 1); ty++) list.push({ y: (ty + 1) * T, row: ty, layer: l });
    });
    this.props.forEach(function (o) { if (!o.tile.flat && o.x < viewR && o.x + o.tile.w > viewL && o.y > viewT && o.y - o.tile.h < viewB) list.push({ y: o.y, prop: o }); });
    this.npcs.forEach(function (n) { if (!n.hidden) list.push({ y: n.y, npc: n }); });
    this.movers.forEach(function (m) { list.push({ y: m.y + m.h, mover: m }); });
    list.push({ y: p.y, player: true });
    list.sort(function (a, b) { return a.y - b.y; });
    list.forEach(function (d) {
      if (d.layer) self.drawLayerRows(d.layer, d.row, d.row, c0, c1);
      else if (d.prop) self.drawProp(d.prop);
      else if (d.npc) self.drawNpc(d.npc);
      else if (d.mover) self.drawMover(d.mover);
      else self.drawPlayer();
    });

    // overlays: unsorted layers above the objects layer (e.g. tree tops)
    this.tileLayers.forEach(function (l) { if (!l.ysort && l.order > sortOrder) self.drawLayerRows(l, r0, r1, c0, c1); });

    this.drawGuideEnd();
    this.drawMarkers();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  Engine.prototype.drawProp = function (o) {
    var t = o.tile, img = t.img;
    if (t.frameImgs && t.frameImgs.length) img = t.frameImgs[Math.floor(this.time * t.fps) % t.frameImgs.length] || img;
    if (img) this.ctx.drawImage(img, Math.round(o.x), Math.round(o.y - t.h));
  };

  /* traffic: loops across its lane, never blocks the player (the road itself is blocked) */
  Engine.prototype.drawMover = function (m) {
    var span = m.w + 64;
    var t = (this.time * m.speed + m.offset) % span;
    var x = m.dir === 'right' ? m.x - 32 + t : m.x + m.w + 32 - t;
    var f = m.frames[Math.floor(this.time * 6) % 2] || m.frames[0];
    if (f) this.ctx.drawImage(f, Math.round(x - f.width / 2), Math.round(m.y + m.h - f.height));
  };

  Engine.prototype.drawShadow = function (x, y, w) {
    var ctx = this.ctx;
    ctx.fillStyle = 'rgba(58,58,80,.28)';
    ctx.fillRect(Math.round(x - w / 2) + 1, Math.round(y) - 1, w - 2, 2);
    ctx.fillRect(Math.round(x - w / 2), Math.round(y) - 2, w, 1);
  };

  Engine.prototype.drawNpc = function (n) {
    var f = n.frames[Math.floor(this.time * 1.6 + n.x) % 2] || n.frames[0];
    this.drawShadow(n.x, n.y, 10);
    if (f) this.ctx.drawImage(f, Math.round(n.x - f.width / 2), Math.round(n.y - f.height));
  };

  Engine.prototype.drawPlayer = function () {
    var p = this.player;
    var sheet = p.moving ? p.run : p.idle;
    this.drawShadow(p.x, p.y, 10);
    if (!sheet) return;
    var frame = DIRS[p.dir] * 6 + (Math.floor(p.anim * (p.moving ? 10 : 6)) % 6);
    this.ctx.drawImage(sheet, frame * 16, 0, 16, 32, Math.round(p.x - 8), Math.round(p.y - 30), 16, 32);
  };

  /* little pixel bubbles: ! for a moment waiting, ? for something to look at, and the "press E" hint */
  Engine.prototype.bubble = function (x, y, glyph, bg, fg) {
    var ctx = this.ctx;
    var bob = this.reduce ? 0 : Math.round(Math.sin(this.time * 4) * 1);
    x = Math.round(x); y = Math.round(y) + bob;
    ctx.fillStyle = '#3a3a50';
    ctx.fillRect(x - 5, y - 9, 11, 9); ctx.fillRect(x - 4, y - 10, 9, 11); ctx.fillRect(x, y + 1, 1, 2);
    ctx.fillStyle = bg;
    ctx.fillRect(x - 4, y - 9, 9, 9);
    ctx.fillStyle = fg;
    var G = {
      '!': ['0010', '0010', '0010', '0000', '0010'],
      '?': ['0110', '0001', '0010', '0000', '0010'],
      'E': ['0111', '0100', '0110', '0100', '0111'],
      '…': ['0000', '0000', '0000', '0000', '1011']
    }[glyph] || [];
    G.forEach(function (row, ry) { for (var rx = 0; rx < 4; rx++) if (row[rx] === '1') ctx.fillRect(x - 2 + rx, y - 7 + ry, 1, 1); });
  };

  Engine.prototype.drawMarkers = function () {
    var self = this;
    var pos = function (it) { return it.kind === 'npc' ? { x: it.x, y: it.y - 33 } : { x: it.x + it.w / 2, y: it.y - 4 }; };
    this.interactables().forEach(function (it) {
      var m = self.markers[it.id];
      if (!m || it === self.near) return;
      var q = pos(it);
      if (m === 'quest') self.bubble(q.x, q.y, '!', '#fc5c46', '#fbf3e4');
      else if (m === 'look') self.bubble(q.x, q.y, '?', '#f1ce8e', '#3a3a50');
    });
    if (this.near) { var q = pos(this.near); this.bubble(q.x, q.y, 'E', '#fbf3e4', '#3a3a50'); }
    this.emotes.forEach(function (e) {
      var it = e.id === 'player' ? { kind: 'npc', x: self.player.x, y: self.player.y } : self.npcs.filter(function (n) { return n.id === e.id; })[0];
      if (it) { var q = pos(it); self.bubble(q.x, q.y - 2, e.text, '#fbf3e4', '#ba2d2f'); }
    });
  };

  /* ---------- loop and input ---------- */
  Engine.prototype.start = function () {
    var self = this, last = performance.now();
    this.resize();
    var frame = function (now) {
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      self.time += dt;
      self.step(dt);
      self.render();
      self.raf = requestAnimationFrame(frame);
    };
    this.raf = requestAnimationFrame(frame);
    window.addEventListener('resize', function () { self.resize(); self.snapCamera = true; });
  };

  Engine.prototype.setKey = function (key, down) {
    var k = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right',
      ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down' }[key];
    if (!k) return false;
    this.keys[k] = down;
    return true;
  };
  Engine.prototype.releaseKeys = function () { this.keys = {}; };

  CC.Engine = Engine;
})();
