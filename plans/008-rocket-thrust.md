# 008 — Động cơ đốt theo gia tốc: đánh lửa, tăng tốc, trôi, tắt máy

- **Status**: TODO (viết lại 9/11 cho tàu và lửa mới của plan 015; số liệu đã đo trên trang thật, xem "Số đo")
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006 và 015 (rocket.js có `FLAME` dạng ảnh, `drawFlame`, `CFG.flame`, `?v=…-rocket11`)
- **Severity**: MEDIUM (cảm giác "tàu vũ trụ" quan trọng nhất)
- **Category**: Purpose / Cohesion
- **Estimated scope**: `assets/js/rocket.js` (~35 dòng), `index.html` (`?v=`)
- **Cần cho**: 009 (vệt khói dùng `thr` và `flameLen`), 011 (dùng `thr` và `flameLen`)

## Problem

1. Lửa dài theo **vận tốc**:
   ```js
   /* assets/js/rocket.js:280-287 — hiện tại */
   function drawFlame(now) {
     var fc = CFG.flame, speed = Math.hypot(sp.vx, sp.vy) / m.vh, ts = now / 1000;
     var f = (fc.min + (fc.max - fc.min) * smoothstep(speed / fc.full)) *
       (1 + fc.flicker * Math.sin(ts * 2 * Math.PI * 9) + fc.flicker * 0.6 * Math.sin(ts * 2 * Math.PI * 13.7));
     f = clamp(f, 0.3, 1.1);
     /* longer from the nozzle down, and a touch wider as it grows */
     els.flame.style.transform = 'scale(' + (0.85 + 0.15 * f).toFixed(3) + ',' + f.toFixed(3) + ')';
   }
   ```
   Trong chân không, tàu bay đều không cần đốt; động cơ chỉ đốt khi **tăng tốc hoặc rẽ**. Hiện tại lúc bổ nhào (đang rơi nhanh) lửa dài nhất, còn lúc kéo lên (cần lực nhất) lửa không mạnh hơn. Ngược với trực giác về tên lửa.
2. Không có **đánh lửa** khi rời logo và **tắt máy** khi về logo: lửa có sẵn ở mức 0.45 từ frame đầu.

## Số đo (trang thật, khung 1100×800, đo 9/11)

Gia tốc tính bằng chiều cao màn hình/giây² (vh/s²), từ vị trí tên lửa mỗi frame:

| Tình huống | Dọc mũi p90 | Dọc mũi max | Ngang mũi p90 | Ngang mũi max |
| --- | --- | --- | --- | --- |
| Cuộn chậm đều trong phần mở đầu | 0.11 | 0.23 | 0.12 | 0.20 |
| Hất cuộn 350px mỗi 0.7s | 0.92 | 3.94 | 0.24 | 0.82 |
| Cú lượn vào chỗ đỗ | 0.68 | 11.1 | 3.04 | 7.03 |

Kết luận cho thiết kế:
- `full = 2` (không phải 6): một cú hất cuộn đốt tới mức 1, cuộn đều chỉ còn lửa mồi.
- Cú kéo lên trong cú lượn chủ yếu là gia tốc **ngang** mũi (hướng tâm), nên trọng số ngang phải lớn (0.8). Với 0.35 thì lúc kéo lên lửa không dài hơn lúc hất cuộn.
- Lúc rời logo, tên lửa chỉ dài khoảng 5px, và chỉ lớn lên khi đã ra khỏi header (theo cuộn trang, không theo thời gian). Đánh lửa và tắt máy tính theo **thời gian** thì sẽ xong khi tên lửa còn bé tí, không ai thấy. Vì vậy chúng được tính theo **độ lớn của tên lửa** trong lúc cất cánh.

## Target

- **Lực đẩy `thr` (0..1)** từ gia tốc của spring:
  - `aAlong` = gia tốc dọc mũi (chỉ lấy phần dương), `aLat` = độ lớn gia tốc ngang mũi, đơn vị vh/s²;
  - `thrTarget = clamp(smoothstep(aAlong / A) + 0.8 * smoothstep(aLat / A), 0, 1)`, với `A = CFG.thrust.full = 2`;
  - khi đỗ: `thrTarget = 0`;
  - làm mượt **bất đối xứng**: tăng nhanh (`tau = 60ms`), giảm chậm (`tau = 280ms`, lửa tắt dần).
- **Độ lớn khi cất cánh `grow` (0..1)**: `grow = clamp((t.len − logoLen) / (m.full − logoLen), 0, 1)`, với `logoLen = LOGO.rocketLen * m.mark.w / LOGO.size` (chiều dài tên lửa ở logo). Bay ngang, lượn, đỗ: `grow = 1`.
- **Bật/tắt máy**: `cut = smoothstep(grow / 0.15)`. Lửa mọc ra khi tên lửa bắt đầu lớn, và tắt hẳn trước khi tên lửa thu về cỡ logo. Không cần làm mượt thêm vì `t.len` đã đi theo cuộn đã làm mượt.
- **Đánh lửa**: `ign = 1.15 * sin(π · clamp((grow − 0.1) / 0.6, 0, 1))`, đỉnh ở `grow = 0.4`, về 0 khi `grow ≥ 0.7`. Khi bay ngược về logo, cú bùng này chạy ngược lại, như động cơ đốt hãm. Chấp nhận được.
- **Chiều dài lửa** (tỉ lệ so với ảnh lửa, kéo từ mép trên là miệng ống):
  - `level = max(thr, ign)`;
  - `flameLen = cut * (pilot + (max − pilot) * level) * flicker`, với `pilot = 0.45` (bằng mức đỗ hiện nay), `max = 1.0`;
  - `flicker = 1 + q·sin(2π·9t) + 0.6·q·sin(2π·13.7t)`, với `q = 0.05·(0.5 + 0.5·level)`;
  - kẹp `flameLen` trong `[0, 1.2]`;
  - transform giữ dạng hiện có: `scale(0.85 + 0.15·flameLen, flameLen)`;
  - `flameLen < 0.05` thì ẩn lửa bằng `opacity: 0`.
- Lửa là ảnh có viền mảnh và quầng mờ, nên kéo bằng `scale` là được.

## Repo conventions to follow

- Số chỉnh tay nằm trong `CFG` (rocket.js:24-49), có comment tiếng Anh ngắn ở cuối dòng.
- Hướng mũi theo `headingOf` (rocket.js:80): 0 = mũi lên, 90 = sang phải. Vector đơn vị của hướng `h` (độ) là `hx = sin(h)`, `hy = −cos(h)`.
- Vận tốc spring `sp.vx`, `sp.vy` có đơn vị px/giây (`springStep`, rocket.js:86).
- `t.len` (từ `target()`) là chiều dài tên lửa: cỡ logo lúc ở logo, lớn dần trong lúc cất cánh (`takeoffLen`), `m.full` khi bay ngang, `m.station.len` khi đỗ.
- Lửa: `.cc-rocket-flame` là một `<img>` trong `.cc-rocket-fade`, `transform-origin: 50% 0` (refinements.css:146). Vị trí và cỡ đặt một lần trong `build()` (rocket.js:372-376).
- Mỗi frame chỉ đổi `transform` và `opacity`.

## Steps

1. `CFG` (rocket.js:47): thay dòng `flame: {...}` bằng
   ```js
   flame: { pilot: 0.45, max: 1.0, flicker: 0.05 },        // flame length (share of its picture) coasting / at full burn, flicker share
   thrust: { full: 2, side: 0.8, up: 60, down: 280 },       // acceleration for full burn (viewport heights per s^2), weight of turning, smoothing ms (rise, fall)
   ```
2. Biến trạng thái, đặt ngay dưới dòng `var sm = 0, prevScroll = 0, ...` (rocket.js:72):
   ```js
   var thr = 0, grow = 0, flameLen = 0, pvx = 0, pvy = 0;   // engine: thrust 0..1, take-off growth 0..1, last flame length, last spring speed
   ```
3. Trong `frame()`, ngay sau dòng `r = springAng(sp.h, sp.vh, ...)` (rocket.js:329):
   ```js
   /* the engine burns when the rocket speeds up or turns, not when it merely moves */
   var sec = dt / 1000, ax = (sp.vx - pvx) / sec, ay = (sp.vy - pvy) / sec, hr = sp.h * Math.PI / 180;
   pvx = sp.vx; pvy = sp.vy;
   var hx = Math.sin(hr), hy = -Math.cos(hr), A = CFG.thrust.full;
   var aAlong = (ax * hx + ay * hy) / m.vh, aLat = Math.abs(ax * hy - ay * hx) / m.vh;
   var thrTarget = t.phase === 'parked' ? 0 : clamp(smoothstep(Math.max(0, aAlong) / A) + CFG.thrust.side * smoothstep(aLat / A), 0, 1);
   thr += (thrTarget - thr) * (1 - Math.exp(-dt / (thrTarget > thr ? CFG.thrust.up : CFG.thrust.down)));
   /* lights as it grows out of the logo, goes out before it shrinks back in */
   var logoLen = LOGO.rocketLen * m.mark.w / LOGO.size;
   grow = clamp((t.len - logoLen) / Math.max(1, m.full - logoLen), 0, 1);
   ```
4. Ngay sau dòng `if (home) { ... }` (rocket.js:336), thêm `if (home) { thr = 0; pvx = pvy = 0; }` để lần cất cánh sau bắt đầu từ động cơ nguội.
5. Viết lại `drawFlame(now)` (rocket.js:279-287, kể cả dòng comment phía trên):
   ```js
   /* thrust sets the length; it lights with a burst as the rocket grows out of the logo and goes out before it docks */
   function drawFlame(now) {
     var fc = CFG.flame, ts = now / 1000;
     var cut = smoothstep(grow / 0.15), ign = 1.15 * Math.sin(Math.PI * clamp((grow - 0.1) / 0.6, 0, 1));
     var level = Math.max(thr, ign), q = fc.flicker * (0.5 + 0.5 * level);
     flameLen = clamp(cut * (fc.pilot + (fc.max - fc.pilot) * level) *
       (1 + q * Math.sin(ts * 2 * Math.PI * 9) + q * 0.6 * Math.sin(ts * 2 * Math.PI * 13.7)), 0, 1.2);
     els.flame.style.opacity = flameLen < 0.05 ? '0' : '1';
     if (flameLen < 0.05) return;
     /* longer from the nozzle down, and a touch wider as it grows */
     els.flame.style.transform = 'scale(' + (0.85 + 0.15 * flameLen).toFixed(3) + ',' + flameLen.toFixed(3) + ')';
   }
   ```
6. `frame()`: vòng rAF phải chạy tiếp khi lửa đang tắt dần. Trong biểu thức `var moving = ...` (rocket.js:343), thêm `|| Math.abs(thrTarget - thr) > 0.01`.
7. **Kiểm lại `CFG.thrust.full`** (tạm thời, xóa sau khi xong): giá trị 2 đã đo ở khung 1100×800. Nếu muốn kiểm trên máy khác:
   - thêm `window.__acc = (window.__acc || []); window.__acc.push(Math.max(0, aAlong), aLat);` ngay sau bước 3;
   - cuộn hết trang chủ vài lần ở các tốc độ khác nhau (cửa sổ rộng hơn 760px), rồi trong console chạy `a = __acc.filter(v => v > 0.05).sort((x, y) => x - y); a[Math.floor(a.length * 0.9)]`;
   - nếu p90 nằm ngoài khoảng 1–3, đặt `CFG.thrust.full` bằng p90 làm tròn tới 0.5. **Xóa dòng log.**
8. `index.html:77`: tăng `?v=` của `rocket.js` (hiện là `20261108-rocket11`).

## Boundaries

- KHÔNG đổi đường bay, spring, `CFG.follow`, `CFG.turn`, điều kiện `home`.
- KHÔNG đổi ảnh, vị trí hay cỡ của lửa trong `build()`; chỉ đổi transform và opacity mỗi frame.
- Không đọc layout trong `frame()`.
- Nếu `drawFlame` hoặc `CFG.flame` không khớp đoạn trích (code đã đổi) thì DỪNG và báo lại.

## Verification

- **Mechanical**: `node --check assets/js/rocket.js`; `npm run build` chạy thành công; console sạch.
- **Số đo** (ghi `flameLen` mỗi frame bằng log tạm, xóa sau khi xong):
  - Cuộn chậm đều trong phần mở đầu: `flameLen` quanh 0.45 (mồi).
  - Hất cuộn: `flameLen` lên trên 0.8 rồi về mồi trong khoảng 0.5 giây.
  - Cú lượn: `flameLen` lớn nhất ở đoạn kéo lên (vòng cung cuối), không phải lúc bổ nhào.
  - Cất cánh từ logo (cuộn chậm): `flameLen` bằng 0 khi tên lửa còn cỡ logo, vượt 0.9 khi tên lửa dài khoảng 40% cỡ bay, rồi về mồi.
  - Cuộn về đầu trang: `flameLen` về 0 trước khi tên lửa nhập vào logo.
- **Feel check** (cửa sổ rộng hơn 760px, quay màn hình xem 0.25×):
  - Rời logo: lửa mọc ra từ miệng ống và bùng lên trong lúc tên lửa lớn dần.
  - Hất cuộn mạnh: lửa dài ngay rồi thu lại từ từ.
  - Cú lượn: lúc kéo lên lửa dài nhất.
  - Đỗ: lửa mồi lập lòe nhẹ.
  - Đỉnh lửa luôn nằm trong miệng ống.
  - DevTools → Performance, cuộn 3 giây: không có Layout mỗi frame.
- **Done when**: lửa dài theo gia tốc chứ không theo vận tốc, có đánh lửa và tắt máy nhìn thấy được.
