# 009 — Vệt khói/tia lửa bị bỏ lại phía sau

- **Status**: TODO (sửa 9/11 cho tàu mới của plan 015)
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006, 015 và 008
- **Severity**: LOW (thêm mới)
- **Category**: Missed opportunities
- **Depends on**: 008 (dùng biến `thr` và `flameLen`)
- **Estimated scope**: `assets/js/rocket.js` (~60 dòng), `assets/css/refinements.css` (3 dòng), `index.html` (`?v=`)

## Problem

Tên lửa không để lại dấu vết gì. Dấu hiệu "đang di chuyển trong không gian" mạnh nhất là các hạt khói/tia lửa **phụt ra rồi đứng yên tại chỗ**, để tên lửa bay bỏ lại chúng. Hiện không có.

## Target

- Một lớp `position: fixed` (`.cc-rocket-trail`, z-index 38, nằm ngay dưới tên lửa có z-index 39) chứa **18 hạt** dựng sẵn, dùng lại liên tục (pool). Không tạo phần tử mới khi chạy.
- Mỗi hạt là một `div` tròn có gradient ấm. Chỉ đổi `transform` (translate và scale) và `opacity`.
- **Tốc độ phát hạt** tỉ lệ với lực đẩy: `rate = 40 * thr` hạt/giây. Khi `thr < 0.08` thì không phát. Khi đỗ không phát. (Theo số đo của 008: bay ngang `thr` 0.01–0.05 nên không có hạt; bẻ xuống 0.35–0.58 và kéo lên 0.73–0.84 nên có vệt; hất cuộn mạnh có vệt ngắn.)
- **Vị trí phát**: gần đuôi lửa, tức miệng ống lùi thêm `0.8 × chiều dài lửa hiện tại` theo trục thân (lửa mới là ảnh dài gần 400px trong khung, nên hạt phụt ngay miệng ống sẽ bị lửa che hết). **Vận tốc ban đầu**: ngược hướng mũi, `0.35 * m.vh` px/giây, cộng lệch ngẫu nhiên ±12° và ±25% tốc độ.
- **Đứng yên theo nền**: hạt trôi cùng nền chứ không theo tên lửa.
  - Trong phần mở đầu (hero dính màn hình, `sy <= m.heroRun`): mỗi frame dịch hạt sang trái `flowAt(sm) * (sm − smPrev)` px, giống ảnh trôi.
  - Sau đó: dịch lên `dRaw` px, giống trang cuộn.
- **Vòng đời**: 700ms (±150ms ngẫu nhiên). Theo tiến độ `p = tuổi / vòng đời`:
  - scale từ `0.5·k` lên `1.8·k` (`k` là tỉ lệ tên lửa, giống `drawFly`);
  - opacity `0.75 · (1 − p)²` (ease-out: tắt nhanh lúc đầu, kéo đuôi mờ);
  - vận tốc giảm dần: nhân với `exp(−dt / 400)` mỗi frame.
- Kích thước gốc của hạt: 48px.
- Gradient: `radial-gradient(circle, rgba(255,236,200,.95) 0%, rgba(255,173,74,.55) 35%, rgba(255,173,74,0) 70%)`.

## Repo conventions to follow

- Một vòng rAF duy nhất (`frame()`, rocket.js:298). Không mở vòng lặp mới; vòng rAF phải chạy tiếp khi còn hạt sống.
- Tên lửa bay nằm trong khung vuông `FLY_BASE = 512` px. Tàu (mũi lên) cao đúng 512 và nằm giữa khung; **miệng ống phụt ở `(256, 490)` trong khung** (đo trên `ship-rocket.png` 956×2464: tâm miệng ống ở x 478, y ≈ 2360; xem `plans/015-new-ship.md`).
- `drawFly` (rocket.js:271) đặt `translate3d(x − 256, y − 256) rotate(a) scale(k)`, với `a = head − PIC.nose` (độ) và `k = side / FLY_BASE`, `side = len * PIC.side / PIC.len`.

## Steps

1. `CFG`: thêm
   ```js
   trail: { count: 18, rate: 40, life: 700, speed: 0.35, size: 48 },   // exhaust puffs: pool size, per s at full burn, ms, viewport heights per s, px
   ```
2. `build()`: tạo lớp chứa và các hạt:
   ```js
   els.trail = document.createElement('div');
   els.trail.className = 'cc-rocket-trail';
   els.trail.setAttribute('aria-hidden', 'true');
   puffs = [];
   for (var i = 0; i < CFG.trail.count; i++) {
     var d = document.createElement('i');
     els.trail.appendChild(d);
     puffs.push({ el: d, alive: false, x: 0, y: 0, vx: 0, vy: 0, age: 0, life: 1, k: 1 });
   }
   document.body.appendChild(els.trail);
   ```
   Khai báo `var puffs = [], emitAcc = 0, smPrev = 0, flameH = 0;` cạnh các biến trạng thái khác. Trong `build()`, ngay sau dòng `els.flame.style.height = ...`, thêm `flameH = flameW * FLAME.aspect;` (chiều cao ảnh lửa trong khung, khoảng 396px). `flameLen` là biến của plan 008.
3. CSS (`assets/css/refinements.css`, ngay sau khối `.cc-rocket`):
   ```css
   .cc-rocket-trail { position: fixed; left: 0; top: 0; width: 0; height: 0; z-index: 38; pointer-events: none; }
   .cc-rocket-trail i { position: absolute; left: -24px; top: -24px; width: 48px; height: 48px; border-radius: 50%; opacity: 0; will-change: transform, opacity; background: radial-gradient(circle, rgba(255,236,200,.95) 0%, rgba(255,173,74,.55) 35%, rgba(255,173,74,0) 70%); }
   ```
   Thêm `.cc-rocket-trail` vào dòng `@media print { ... display: none }` có sẵn.
4. Hằng số và hàm tính vị trí miệng ống trên màn hình. Đặt `NOZZLE` ngay dưới dòng `var FLAME = ...` (rocket.js:60):
   ```js
   var NOZZLE = [256, 490];   // nozzle exit in the 512 box (plans/015-new-ship.md)
   ```
   và hàm, đặt ngay trên `drawFly`:
   ```js
   /* where the nozzle is on screen: the box is turned about its centre and scaled by k */
   function nozzleScreen(st, back) {   // back: box px behind the nozzle, along the hull
     var side = st.len * PIC.side / PIC.len, k = side / FLY_BASE, a = (st.head - PIC.nose) * Math.PI / 180;
     var lx = (NOZZLE[0] - FLY_BASE / 2) * k, ly = (NOZZLE[1] + back - FLY_BASE / 2) * k;
     return { x: st.x + lx * Math.cos(a) - ly * Math.sin(a), y: st.y + lx * Math.sin(a) + ly * Math.cos(a), k: k };
   }
   ```
5. Hàm cập nhật hạt, gọi trong `frame()` ngay sau `drawFlame(now)` khi đang vẽ tên lửa bay; khi `home` thì vẫn gọi để các hạt còn lại tắt nốt. Trả về số hạt còn sống.
   ```js
   function stepTrail(dt, sy, dRaw, emit) {
     var tc = CFG.trail, driftX = sy <= m.heroRun ? flowAt(sm) * (sm - smPrev) : 0, driftY = sy <= m.heroRun ? 0 : dRaw, alive = 0;
     smPrev = sm;
     if (emit) {
       emitAcc += tc.rate * thr * dt / 1000;
       var n = nozzleScreen(cur, 0.8 * flameH * flameLen), hr = cur.head * Math.PI / 180;
       while (emitAcc >= 1) {
         emitAcc -= 1;
         var p = null;
         for (var i = 0; i < puffs.length; i++) if (!puffs[i].alive) { p = puffs[i]; break; }
         if (!p) break;
         var dev = (Math.random() - 0.5) * 24 * Math.PI / 180, sp0 = tc.speed * m.vh * (0.75 + Math.random() * 0.5);
         p.alive = true; p.age = 0; p.life = tc.life * (0.8 + Math.random() * 0.4); p.k = n.k;
         p.x = n.x; p.y = n.y; p.vx = -Math.sin(hr + dev) * sp0; p.vy = Math.cos(hr + dev) * sp0;
       }
     } else emitAcc = 0;
     var damp = Math.exp(-dt / 400);
     for (var j = 0; j < puffs.length; j++) {
       var q = puffs[j];
       if (!q.alive) continue;
       q.age += dt;
       var u = q.age / q.life;
       if (u >= 1) { q.alive = false; q.el.style.opacity = '0'; continue; }
       q.vx *= damp; q.vy *= damp;
       q.x += q.vx * dt / 1000 - driftX; q.y += q.vy * dt / 1000 - driftY;
       q.el.style.transform = 'translate3d(' + q.x.toFixed(1) + 'px,' + q.y.toFixed(1) + 'px,0) scale(' + (q.k * lerp(0.5, 1.8, u)).toFixed(3) + ')';
       q.el.style.opacity = (0.75 * (1 - u) * (1 - u)).toFixed(3);
       alive++;
     }
     return alive;
   }
   ```
   Lưu ý: hạt 48px tính theo đơn vị khung 512, nên `p.k = n.k`. Miệng ống rộng khoảng 65px trong khung, nên lúc mới phụt (`scale 0.5`) hạt bằng nửa miệng ống. Nếu hạt trông quá to hoặc quá nhỏ cạnh tên lửa, chỉnh `CFG.trail.size` và cỡ trong CSS cùng lúc, không sửa công thức.
6. `frame()`:
   - Gọi `var puffsAlive = stepTrail(dt, sy, dRaw, !home && t.phase !== 'parked' && thr >= 0.08 && !hidden);` sau phần vẽ.
   - Thêm `|| puffsAlive > 0` vào biểu thức `moving`.
7. `disable()`: thêm `if (els.trail) els.trail.hidden = true;`. `enable()`: thêm `if (els.trail) els.trail.hidden = false;`.
8. `index.html:77`: tăng `?v=`.

## Boundaries

- KHÔNG dùng `<canvas>` vẽ lại cả màn hình. Chỉ dùng pool 18 phần tử, transform/opacity.
- KHÔNG dùng `filter`/`blur` trên hạt.
- KHÔNG phát hạt khi đỗ, khi đang mở thẻ quốc gia (`hidden`), hay khi tên lửa ở logo.
- Nếu plan 008 chưa xong (không có biến `thr` và `flameLen`) thì DỪNG.

## Verification

- **Mechanical**: `node --check`; `npm run build`; console sạch.
- **Feel check**:
  - Hất cuộn mạnh trong phần mở đầu: một vệt hạt ấm phụt ra từ đuôi, **trôi cùng ảnh** sang trái và tan trong khoảng 0.7 giây. Hạt không bị tên lửa kéo theo.
  - Cuộn chậm đều: gần như không có hạt (động cơ đang trôi).
  - Lúc kéo lên trong cú lượn: vệt dày nhất. Khi trang cuộn dọc, hạt đi lên cùng trang.
  - Đỗ: không có hạt mới; các hạt cũ tan hết.
  - Đọc chữ cạnh quả cầu trong lúc tên lửa đỗ: không có gì nhấp nháy gây phân tâm.
  - DevTools → Performance, hất cuộn 3 giây: không có Layout mỗi frame; Paint chỉ thoáng qua lúc hạt hiện lần đầu.
- **Done when**: hạt chỉ xuất hiện khi động cơ đốt mạnh, đứng yên theo nền, tan hết sau khoảng 1 giây, và vòng rAF dừng khi không còn hạt nào và tên lửa đứng yên.
