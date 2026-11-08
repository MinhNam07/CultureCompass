# 010 — Tia chỉnh hướng (RCS) ở mũi khi tên lửa xoay

- **Status**: DONE (9/11, `?v=…-rocket13`). Đo: bay ngang 0 lần phụt; cú lượn 7 lần, đúng bên (bẻ xuống: trái rồi phải; kéo lên: phải rồi trái); mỗi bên cách nhau ≥ 183ms. Vị trí cổng kiểm bằng cách vẽ lên ảnh gốc: nằm đúng mép nón dưới hai cửa sổ. Chưa đo lúc chỉ cờ (không giả lập được con trỏ trong iframe)
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006 và 015
- **Severity**: LOW (thêm mới)
- **Category**: Missed opportunities
- **Estimated scope**: `assets/js/rocket.js` (~35 dòng), `assets/css/refinements.css` (3 dòng), `index.html` (`?v=`)
- **Cần cho**: 012 (giữ vị trí dùng `rcs()`)

## Problem

Tên lửa xoay mũi (đổi hướng trong cú lượn, chỉ vào lá cờ dưới con trỏ) mà không có lực nào gây ra, như được xoay bằng tay. Tàu vũ trụ thật xoay bằng các tia khí nhỏ ở hai bên mũi (RCS). Đây là chi tiết dễ nhận ra nhất của một con tàu vũ trụ.

## Target

- Hai cổng phụt nằm trên mặt nón của khoang lái, ngang hàng với hai vạch cyan ngay dưới hai cửa sổ tròn. Tàu vẽ mũi lên, nên "trái" và "phải" là trái/phải của khung khi mũi hướng lên. Tọa độ trong **khung 512** (đã đổi từ `ship-rocket.png` 956×2464, hàng y = 560: mép nón ở x 264 và 692):
  - cổng **trái**: `(211.5, 116.4)`, phụt ra theo pháp tuyến của mặt nón `(−0.934, −0.356)` (sang trái, hơi chếch lên);
  - cổng **phải**: `(300.5, 116.4)`, phụt ra theo `(0.934, −0.356)`.
  - Cách đổi: `x_khung = 156.68 + x_ảnh × 512/2464`, `y_khung = y_ảnh × 512/2464` (tàu rộng 198.65px, nằm giữa khung).
- Mỗi tia là một phần tử con của `.cc-rocket-fade`, nên tự xoay và co giãn theo thân. Không cần tính vị trí mỗi frame.
- Hình tia: elip trắng mờ 70×26 px (đơn vị khung 512), gốc ở cổng, trục dài theo hướng phụt.
  Gradient: `radial-gradient(ellipse at 0% 50%, rgba(255,255,255,.95) 0%, rgba(220,235,255,.5) 40%, rgba(220,235,255,0) 75%)`.
- Hoạt ảnh bằng **WAAPI** (chuyển động định sẵn, không cần JS mỗi frame), 160ms:
  - keyframes `[{ opacity: 0.95, transform: 'rotate(θ) scaleX(0.4)' }, { opacity: 0, transform: 'rotate(θ) scaleX(1.2)' }]`, easing `cubic-bezier(.22, 1, .36, 1)` (`--ease-out` của site).
- **Khi nào phụt** (trong `frame()`, dùng vận tốc xoay của spring `sp.vh`, đơn vị độ/giây):
  - `|sp.vh| > 70` và `|sp.vh|` đang **tăng** (bắt đầu xoay): phụt cổng đẩy mũi theo chiều xoay. `sp.vh > 0` (xoay theo chiều kim đồng hồ) thì phụt cổng **trái**; `sp.vh < 0` thì cổng **phải**.
  - `|sp.vh| > 70` và đang **giảm mạnh** (`|sp.vh|` giảm hơn 25 độ/giây trong frame này, tức đang hãm xoay): phụt cổng ngược lại.
  - Mỗi cổng phụt tối đa một lần mỗi 180ms.
  - Không phụt khi tên lửa ở logo hay đang ẩn (`hidden`).

## Số đo (trang thật, khung 1100×800, đo 9/11)

Tốc độ xoay mũi (độ/giây): cuộn chậm trong phần mở đầu tối đa 12; hất cuộn p90 40, tối đa 81; cú lượn p90 278, tối đa 372. Lúc thôi xoay trong cú lượn, tốc độ xoay giảm 56–115 độ/giây mỗi frame. Vì vậy ngưỡng `minRate 70` và `brake 25` dưới đây cho kết quả: không phụt khi bay ngang, thỉnh thoảng phụt khi hất cuộn mạnh, phụt ở cú lượn và khi chỉ cờ.

## Repo conventions to follow

- `.cc-rocket-fade` là lớp bọc bên trong khung 512px đã xoay (xem `build()` và CSS `.cc-rocket-fade`). Con của nó dùng đơn vị khung 512, giống lửa (`build()`, rocket.js:372-376).
- Easing của site: `--ease-out: cubic-bezier(.22, 1, .36, 1)` (`assets/css/cc.css:38`). WAAPI không đọc biến CSS nên phải ghi thẳng cubic-bezier.

## Steps

1. **Kiểm vị trí cổng** (không cần sửa nếu đúng): sau bước 3, trong DevTools đặt tạm `opacity: 1` cho hai `.cc-rocket-rcs` khi tên lửa đỗ. Gốc mỗi tia phải nằm **ngay trên mép nón khoang lái**, dưới hai cửa sổ tròn, một ở mỗi bên. Nếu lệch, sửa số trong `RCS` theo cách đổi ở phần Target.
2. `CFG`: thêm
   ```js
   rcs: { minRate: 70, brake: 25, gap: 180, ms: 160 },   // nose jets: deg/s to fire, deg/s drop that counts as braking, ms between puffs per side, puff ms
   ```
   và hằng số:
   ```js
   var RCS = { left: { at: [211.5, 116.4], dir: [-0.934, -0.356] }, right: { at: [300.5, 116.4], dir: [0.934, -0.356] } };   // 512-box px on the capsule cone; dir = which way the gas leaves
   ```
3. `build()`: thêm hai phần tử vào `.cc-rocket-fade`, **sau** ảnh thân (để nằm trên):
   ```js
   ['left', 'right'].forEach(function (side) {
     var j = document.createElement('i');
     j.className = 'cc-rocket-rcs';
     var r = RCS[side], ang = Math.atan2(r.dir[1], r.dir[0]) * 180 / Math.PI;
     j.style.left = r.at[0] + 'px';
     j.style.top = (r.at[1] - 13) + 'px';
     r.el = j; r.ang = ang; r.lastAt = -1e9;
     els.fly.querySelector('.cc-rocket-fade').appendChild(j);
   });
   ```
4. CSS:
   ```css
   .cc-rocket .cc-rocket-rcs { position: absolute; width: 70px; height: 26px; transform-origin: 0 50%; opacity: 0; pointer-events: none; background: radial-gradient(ellipse at 0% 50%, rgba(255,255,255,.95) 0%, rgba(220,235,255,.5) 40%, rgba(220,235,255,0) 75%); }
   ```
5. Hàm phụt:
   ```js
   function rcs(side, now) {
     var r = RCS[side];
     if (!r.el || now - r.lastAt < CFG.rcs.gap) return;
     r.lastAt = now;
     r.el.animate([{ opacity: 0.95, transform: 'rotate(' + r.ang + 'deg) scaleX(0.4)' }, { opacity: 0, transform: 'rotate(' + r.ang + 'deg) scaleX(1.2)' }],
       { duration: CFG.rcs.ms, easing: 'cubic-bezier(.22, 1, .36, 1)' });
   }
   ```
6. `frame()`: khai báo `var pvh = 0;` cạnh các biến trạng thái. Ngay sau dòng `springAng`:
   ```js
   var rate = Math.abs(sp.vh), prevRate = Math.abs(pvh);
   if (!home && !hidden && t.phase !== 'logo' && rate > CFG.rcs.minRate) {
     if (rate > prevRate) rcs(sp.vh > 0 ? 'left' : 'right', now);
     else if (prevRate - rate > CFG.rcs.brake * dt / 16.67) rcs(sp.vh > 0 ? 'right' : 'left', now);
   }
   pvh = sp.vh;
   ```
   Lưu ý: `home` được tính sau dòng `springAng`. Hoặc đặt khối này sau dòng `var home = ...`, hoặc dùng `atTop` thay cho `home`.
7. `index.html:77`: tăng `?v=`.

## Boundaries

- KHÔNG làm tia cho tên lửa quanh logo.
- KHÔNG dùng CSS keyframes cho tia (cần gọi theo sự kiện; WAAPI là đúng).
- Mỗi lần phụt chỉ là một hoạt ảnh WAAPI 160ms. Không tạo phần tử mới khi chạy.

## Verification

- **Mechanical**: `node --check`; `npm run build`; console sạch.
- **Feel check**:
  - Cú lượn (cuộn chậm qua đoạn bẻ xuống và kéo lên): có tia trắng nhỏ ở mũi lúc bắt đầu xoay, và tia phía bên kia lúc thôi xoay.
  - Khi đỗ, rê chuột từ lá cờ này sang lá cờ khác: mỗi lần mũi quay có một tia ngắn. Rê qua lại liên tục cũng không thành tia liên tục (tối đa mỗi 180ms).
  - Xem 0.25×: tia phụt ra **từ mép nón khoang lái**, hướng ra ngoài (sang ngang, hơi chếch về phía mũi), không phụt vào trong thân.
  - Bay đều theo đường thẳng: không có tia.
- **Done when**: mỗi lần mũi bắt đầu hoặc thôi xoay đều có một tia ngắn đúng phía, và không có tia nào khi mũi đứng yên.
