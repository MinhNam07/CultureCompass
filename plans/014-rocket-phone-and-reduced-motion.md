# 014 — Điện thoại: đốt máy bay vụt đi; giảm chuyển động: tên lửa đứng yên cạnh quả cầu

- **Status**: DONE (9/11, `?v=…-rocket18`). Điện thoại 375×812: tên lửa đốt máy bay chếch lên 20° rồi bay ra khỏi mép phải, quay về đúng đường cũ; bước nhảy lớn nhất 18 px/khung; bắt đầu mờ khi đuôi ở x=365, tắt hẳn ở x=402. Giảm chuyển động: tên lửa đứng yên cạnh quả cầu, logo dùng `cc-logo-128.png`, `rocket.js` không gọi rAF; mở thẻ quốc gia thì tên lửa mờ về 0, đóng thẻ thì hiện lại; tắt giảm chuyển động ngay trên trang thì tên lửa đứng yên ẩn đi và tên lửa bay quay lại
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006 và 015
- **Severity**: LOW
- **Category**: Cohesion / Accessibility
- **Estimated scope**: `assets/js/rocket.js` (~40 dòng), `assets/css/refinements.css` (2 dòng), `index.html` (`?v=`)

## Problem

1. **Điện thoại** (`vw ≤ 760`): sau phần mở đầu, tên lửa đứng yên và mờ dần tại chỗ:
   ```js
   /* rocket.js:241, pathPos — hiện tại */
   if (s < m.s2 || m.phone) return cruisePos(Math.min(s, m.s2));
   /* rocket.js:266, target — hiện tại */
   var op = m.phone ? 1 - smoothstep((s - m.s2) / (0.3 * m.vh)) : 1;
   ```
   Một tên lửa đứng yên rồi mờ đi trông như bị hỏng. Rời khỏi màn hình bằng cách bay đi thì hợp lý hơn.
2. **Giảm chuyển động**: tên lửa bay biến mất hẳn (`enable()`: `if (on || reduce()) return;`). Như vậy là đúng tinh thần reduced motion, nhưng khu quả cầu mất luôn hình ảnh thương hiệu. Reduced motion nghĩa là bỏ **chuyển động**, không nhất thiết bỏ **hình ảnh**.

## Target

1. **Điện thoại**: sau `s2`, tên lửa tiếp tục bay theo hướng chếch lên 20° so với phương ngang, nhanh dần:
   - `d = (s − s2) · (1 + (s − s2) / (0.5·vh)) · 1.2` (px);
   - `x = cruise.x + d·cos(20°)`, `y = cruise.y − d·sin(20°)`;
   - mũi tự hướng theo đường bay (`target` đã tính hướng từ `pathPos`);
   - opacity về 0 khi tên lửa đã ra khỏi mép phải: `op = 1 − smoothstep((x − vw) / (0.3·len))`;
   - nếu đã có plan 008, lực đẩy sẽ tự lên cao vì tên lửa đang tăng tốc.
2. **Giảm chuyển động**: một tên lửa **đứng yên**, mũi chúc thẳng lên, đặt ở chỗ đỗ cạnh quả cầu, dùng `position: absolute` theo tọa độ trang nên cuộn trang không cần JS.
   - Không bay quanh logo; logo giữ nguyên tên lửa vẽ sẵn của nó.
   - Không lửa động, không bóng: ảnh thân `ship-rocket-900.webp` cộng ảnh lửa `ship-flame-900.webp` đứng yên ở mức mồi (`scale(0.9175, 0.45)`, giống lửa khi đỗ của tên lửa bay).
   - Chỉ hiện trên màn hình rộng hơn 760px.
   - Khi mở thẻ quốc gia, nó mờ đi bằng opacity (đổi opacity vẫn hợp lệ trong reduced motion).

## Repo conventions to follow

- `measure()` tính `m.station = { x, y, len }` theo tọa độ trang: `x`, `y` là tâm, `len` là chiều dài tên lửa.
- Chuyển đổi giữa chế độ thường và reduced motion đi qua sự kiện `cc:settings` (rocket.js, `init()`): `if (reduce()) disable(); else enable();`.
- `.cc-rocket-fade` và `.is-away` (plan 003) lo việc mờ đi khi mở thẻ.

## Steps

1. **Điện thoại, `pathPos`**: đổi dòng `if (s < m.s2 || m.phone) return cruisePos(Math.min(s, m.s2));` thành
   ```js
   if (s < m.s2) return cruisePos(s);
   if (m.phone) {
     var c = cruisePos(m.s2), e = s - m.s2, d = e * (1 + e / (0.5 * m.vh)) * 1.2, A = 20 * Math.PI / 180;
     return { x: c.x + d * Math.cos(A), y: c.y - d * Math.sin(A) };
   }
   ```
2. **Điện thoại, `target`**: đổi dòng `var op = ...` thành
   `var op = m.phone ? 1 - smoothstep((p.x - m.vw) / (0.3 * m.full)) : 1;`
   Đặt dòng này **trước** `p.x += surge * k;`, hoặc dùng giá trị `p.x` sau surge; cả hai đều được, miễn nhất quán.
3. **Giảm chuyển động**: thêm hàm
   ```js
   /* reduced motion: one still rocket beside the globe, nose up; it scrolls with the page, so no script runs */
   function placeStill() {
     if (!els.still) {
       els.still = document.createElement('div');
       els.still.className = 'cc-rocket-still';
       els.still.setAttribute('aria-hidden', 'true');
       els.still.innerHTML = '<div class="cc-rocket-fade"><img class="cc-rocket-still-flame" src="' + FLAME.src + '" alt="" decoding="async">' +
         '<img class="cc-rocket-still-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
       document.body.appendChild(els.still);
     }
     if (!els.mark) { var brand = document.querySelector('#cc-header .cc-brand'); els.mark = brand && brand.querySelector('.cc-mark'); }
     els.frame = els.frame || CC.$('destination-globe');
     if (!els.mark || !els.frame) return;
     measure();
     var side = m.station.len * PIC.side / PIC.len;
     els.still.hidden = m.phone;
     els.still.style.cssText = 'width:' + side.toFixed(1) + 'px;height:' + side.toFixed(1) + 'px;left:' + (m.station.x - side / 2).toFixed(1) + 'px;top:' + (m.station.y - side / 2).toFixed(1) + 'px';   // the ship is drawn nose up: no rotation
   }
   ```
   Lưu ý: `measure()` đang ghi vào `els.markRocket` (rocket.js:122-124, ba dòng `els.markRocket.style.*`). Hãy bọc ba dòng đó trong `if (els.markRocket) { ... }` để `measure()` chạy được khi chưa `build()`.
4. CSS:
   ```css
   .cc-rocket-still { position: absolute; z-index: 39; pointer-events: none; }
   .cc-rocket-still .cc-rocket-fade { position: relative; width: 100%; height: 100%; }
   .cc-rocket-still-body { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; }
   .cc-rocket-still-flame { position: absolute; left: 37.58%; top: 95.4%; width: 25.06%; height: 77.32%; transform: scale(0.9175, 0.45); transform-origin: 50% 0; }
   ```
   (Vị trí lửa là số của khung 512 trong `build()` chia cho 512: left 192.43, top 488.45, rộng 128.33, cao 395.89. `0.9175 = 0.85 + 0.15 × 0.45`.)
   Thêm `.cc-rocket-still` vào dòng `@media print` có sẵn.
5. Nối vào vòng đời:
   - `init()`: sau `enable();` thêm `if (reduce()) placeStill();`.
   - Sự kiện `cc:settings`: `if (reduce()) { disable(); placeStill(); } else { if (els.still) els.still.hidden = true; enable(); }`.
   - Các listener `resize`, `load`, `fonts.ready`, `ResizeObserver` và tin nhắn từ iframe: thêm nhánh `else if (reduce()) placeStill();` bên cạnh `if (on) { measure(); kick(); }`.
   - Trong listener tin nhắn từ iframe, khi reduce: `if (els.still) els.still.classList.toggle('is-away', !!(globe && globe.hud));`. Thêm CSS `.cc-rocket-still.is-away .cc-rocket-fade { opacity: 0; transition-duration: 150ms; }`.
6. `index.html:77`: tăng `?v=`.

## Boundaries

- Ở chế độ reduced motion: KHÔNG có `requestAnimationFrame`, KHÔNG bay quanh logo, KHÔNG transform nào thay đổi theo thời gian.
- KHÔNG đổi logo (ở reduced motion, logo giữ nguyên ảnh có tên lửa).
- KHÔNG đổi đường bay trên máy tính (chỉ nhánh `m.phone`).

## Verification

- **Mechanical**: `node --check`; `npm run build`; console sạch.
- **Feel check, điện thoại** (DevTools → Device toolbar, 375px):
  - Cuộn hết phần mở đầu: tên lửa không đứng lại mà tăng tốc chếch lên sang phải rồi ra khỏi màn hình. Không có lúc nào nó đứng yên mờ dần.
  - Cuộn ngược lên: nó bay trở lại đúng đường cũ.
- **Feel check, giảm chuyển động** (DevTools → Rendering → `prefers-reduced-motion: reduce`, hoặc cài đặt của site):
  - Đầu trang: logo đứng yên, có tên lửa vẽ sẵn; không có gì bay.
  - Khu quả cầu: một tên lửa đứng yên, mũi chúc lên, đúng chỗ đỗ cạnh quả cầu. Cuộn thì nó đi cùng trang.
  - DevTools → Performance, cuộn 3 giây: không có frame nào từ `rocket.js`.
  - Mở thẻ quốc gia: tên lửa đứng yên mờ đi; đóng thẻ: hiện lại.
  - Tắt reduced motion: tên lửa đứng yên biến mất và tên lửa bay trở lại bình thường.
- **Done when**: điện thoại có lối ra bằng cú bay đi, và reduced motion vẫn có tên lửa nhưng không có chuyển động nào.
