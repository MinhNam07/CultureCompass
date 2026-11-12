/* CultureCompass — Arvy, the player from Explore, wanders along the bottom edge of the screen and invites you to play.
   She is one link to the game (explore.html), reachable by keyboard and read out by screen readers.
   On arrival she stands and talks, so the line can be read; then she wanders on her own: walks a while, stops and
   looks around, walks on, sometimes turns back, and off one edge comes in at the other. Her line and a small Play tag
   take turns every few seconds. She stops while you point at her or focus her. With reduced motion she stands still.
   Styles: assets/css/companion.css. Sprites: LimeZu "Amelia" sheet, named Arvy here (16 x 32 frames; rows right, up, left, down). */
(function () {
  'use strict';
  var CC = window.CC || {};
  var LINE = ['Hi, I’m Arvy!', 'Click me to explore Hà Nội by playing'];
  var TAG = 'Explore by playing';
  var HREF = 'explore.html';
  var ROW = { right: 0, up: 6, left: 12, down: 18 }, LOOK = ['down', 'left', 'right', 'down', 'up'];
  var SPEED = 62, TALK = 7, QUIET = 10;

  function reduce() {
    if (CC.motion && CC.motion.reduce) return CC.motion.reduce();
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    var a = document.createElement('a');
    a.className = 'cc-pal';
    a.href = HREF;
    a.setAttribute('aria-label', LINE[0] + ' ' + LINE[1]);
    a.innerHTML =
      '<span class="cc-pal-say" aria-hidden="true"><span class="cc-pal-l1"></span><span class="cc-pal-l2"></span><span class="cc-pal-more">▼</span></span>' +
      '<span class="cc-pal-tag" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>Play<span class="cc-pal-long"> · ' + TAG + '</span></span>' +
      '<span class="cc-pal-sprite"></span><span class="cc-pal-shadow"></span>';
    document.body.appendChild(a);
    return a;
  }

  function init() {
    if (document.querySelector('.cc-pal')) return;
    var pal = build();
    var spr = pal.querySelector('.cc-pal-sprite'), say = pal.querySelector('.cc-pal-say');
    var l1 = say.querySelector('.cc-pal-l1'), l2 = say.querySelector('.cc-pal-l2');
    var typing = null;
    var s = { x: 0, dir: 1, mode: 'rest', left: 6.5, lookAt: null, face: 'down', t: 0, held: false, talking: true, talkLeft: TALK, last: performance.now() };

    /* her line types on like the game's dialogue; a ▼ blinks when it has finished */
    function speak() {
      clearTimeout(typing);
      var a = LINE[0], b = LINE[1], i = 0;
      say.classList.remove('is-done');
      if (reduce()) { l1.textContent = a; l2.innerHTML = b + ' <b>▶</b>'; say.classList.add('is-done'); return; }
      l1.textContent = ''; l2.textContent = '';
      (function step() {
        i++;
        if (i <= a.length) l1.textContent = a.slice(0, i);
        else if (i <= a.length + b.length) l2.textContent = b.slice(0, i - a.length);
        else { l2.innerHTML = b + ' <b>▶</b>'; say.classList.add('is-done'); return; }
        typing = setTimeout(step, i === a.length ? 260 : 28);
      })();
    }
    function talk(on) {
      s.talking = on; s.talkLeft = on ? TALK : QUIET;
      pal.classList.toggle('is-quiet', !on);
      if (on) setTimeout(speak, 200);
    }
    function walk(dir) { s.mode = 'walk'; s.dir = dir; s.left = rnd(1.2, 4.5); }
    function rest() { s.mode = 'rest'; s.left = rnd(1.4, 4); s.face = 'down'; s.lookAt = s.left - rnd(.6, 1.2); }

    var hold = function () { s.held = true; }, free = function () { s.held = pal.matches(':hover') || document.activeElement === pal; };
    pal.addEventListener('pointerenter', hold);
    pal.addEventListener('pointerleave', function () { s.held = document.activeElement === pal; });
    pal.addEventListener('focus', hold);
    pal.addEventListener('blur', free);

    /* she arrives standing about two thirds across, already talking, and waits to be read */
    s.x = Math.min(innerWidth * 0.66, innerWidth - 180);
    talk(true);

    function frame(now) {
      var dt = Math.min(0.05, (now - s.last) / 1000), W = innerWidth, moving = false;
      s.last = now; s.t += dt;
      if (!s.held) { s.talkLeft -= dt; if (s.talkLeft <= 0) talk(!s.talking); }
      if (!reduce() && !s.held) {
        if (s.mode === 'walk') {
          moving = true; s.x += s.dir * SPEED * dt; s.left -= dt;
          if (s.x > W + 40) s.x = -40;
          if (s.x < -40) s.x = W + 40;
          if (s.left <= 0) { if (Math.random() < 0.7) rest(); else walk(-s.dir); }
        } else {
          s.left -= dt;
          if (s.lookAt != null && s.left < s.lookAt) { s.face = LOOK[Math.floor(Math.random() * LOOK.length)]; s.lookAt = s.left - rnd(0.8, 1.6); }
          if (s.left <= 0) walk(Math.random() < 0.55 ? s.dir : -s.dir);
        }
      }
      if (s.x > W + 40) s.x = W * 0.66;   /* after the window narrows */
      var row = moving ? (s.dir > 0 ? ROW.right : ROW.left) : ROW[s.face];
      var fw = spr.offsetWidth;
      spr.classList.toggle('is-idle', !moving);
      spr.style.backgroundPosition = (-(row + Math.floor(s.t * (moving ? 10 : 6)) % 6) * fw) + 'px 0';
      pal.style.transform = 'translate(' + Math.round(s.x - pal.offsetWidth / 2) + 'px,' + Math.round(innerHeight - 6 - pal.offsetHeight) + 'px)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
