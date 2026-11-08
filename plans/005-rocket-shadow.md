# 005 — Bóng tên lửa luôn đổ xuống dưới, không xoay theo thân

- **Status**: DONE (8/11) — đo ở 7 điểm cuộn, góc xoay từ −43° tới 105°: tâm bóng luôn lệch (0, +15.36·k) px trên màn hình
- **Commit**: e48080b
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Depends on**: 003 (dùng lớp `.cc-rocket-fade` mà 003 tạo ra)
- **Estimated scope**: `assets/js/rocket.js` (~10 dòng), `assets/css/refinements.css` (3 dòng), `index.html` (`?v=`)

## Problem

Bóng đổ được gắn lên chính tấm ảnh nằm trong phần tử bị xoay:

```css
/* assets/css/refinements.css:143 — hiện tại */
.cc-rocket img { display: block; width: 100%; height: 100%; filter: drop-shadow(0 10px 22px rgba(0, 0, 0, .45)); }
```

```js
/* assets/js/rocket.js:265 — hiện tại: lớp ngoài xoay theo hướng mũi */
els.fly.style.transform = 'translate3d(' + … + 'px,0) rotate(' + (st.head - PIC.nose).toFixed(2) + 'deg) scale(' + k.toFixed(4) + ')';
```

`drop-shadow(0 10px …)` tính theo hệ trục **của ảnh**, nên khi tên lửa xoay thì bóng cũng xoay theo. Ví dụ:
- Lúc bổ nhào (mũi khoảng 150°), bóng lệch sang bên.
- Lúc đỗ mũi chúc lên (0°), bóng lệch chéo lên trái.
- Lúc chỉ vào lá cờ, bóng quay vòng quanh thân.

Nguồn sáng như đang quay theo tên lửa. Mắt người thấy được sự sai này dù không gọi được tên, và tên lửa trông giống miếng dán hơn là vật thể bay.

## Target

Tách bóng thành một tấm ảnh riêng: hình bóng đen làm mờ, nằm sau thân. Tấm này có lớp composite riêng nên filter chỉ vẽ một lần. Mỗi frame chỉ dịch nó một đoạn **tính theo màn hình**, luôn hướng xuống dưới.

- Độ lệch trên màn hình: hướng xuống, bằng 3% cạnh khung (`0.03 × FLY_BASE = 15.36px` trong hệ trục của khung, tự co giãn theo `scale`).
- Đổi độ lệch đó sang hệ trục đã xoay của khung: với góc xoay `a = head − PIC.nose` (độ), độ lệch cục bộ là `(s·sin a, s·cos a)` với `s = 15.36`.
- Độ mờ và độ đậm giữ như cũ: blur 22px, alpha .45. Bóng chỉ là hình đen nên dùng `brightness(0)` rồi `blur`.

```css
/* target — assets/css/refinements.css */
.cc-rocket img { display: block; width: 100%; height: 100%; }
.cc-rocket .cc-rocket-shadow { position: absolute; inset: 0; opacity: .45; filter: brightness(0) blur(22px); will-change: transform; }
.cc-rocket-fade { position: relative; }   /* gộp vào khai báo .cc-rocket-fade đã có từ plan 003 */
```

## Repo conventions to follow

- Mọi số chỉnh tay của tên lửa nằm trong `CFG` ở đầu `rocket.js` (dòng 24-47). Thêm `shadow: 0.03` vào đó, có comment ngắn bằng tiếng Anh như các dòng khác.
- Chỉ ghi `transform` mỗi frame, không đọc layout trong `frame()`/`drawFly()`. Xem comment đầu file, dòng 15-17.

## Steps

1. Kiểm tra plan 003 đã xong: trong `build()` có `'<div class="cc-rocket-fade">…'`. Nếu chưa có thì DỪNG.
2. `CFG` (rocket.js): thêm dòng `shadow: 0.03,        // shadow drop below the rocket, in box sides; always straight down on screen` ngay trước `phone: 760`.
3. `build()`: đổi chuỗi `els.fly.innerHTML` thành:
   ```js
   els.fly.innerHTML = '<div class="cc-rocket-fade"><img class="cc-rocket-shadow" src="' + PIC.src + '" alt="" decoding="async"><img class="cc-rocket-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
   els.shadow = els.fly.querySelector('.cc-rocket-shadow');
   ```
   Thứ tự giữ nguyên như trên: bóng đứng trước thì nằm dưới thân. Thêm `position: relative` cho `.cc-rocket-body` nếu thân bị bóng che.
4. `drawFly(st)`: sau dòng gán `els.fly.style.transform`, thêm:
   ```js
   var a = (st.head - PIC.nose) * Math.PI / 180, s = CFG.shadow * FLY_BASE;
   els.shadow.style.transform = 'translate3d(' + (s * Math.sin(a)).toFixed(1) + 'px,' + (s * Math.cos(a)).toFixed(1) + 'px,0)';
   ```
5. CSS: thay dòng `.cc-rocket img { … }` bằng ba dòng trong phần **Target**, và gộp `position: relative` vào khai báo `.cc-rocket-fade`.
6. `index.html:77`: tăng `?v=` của `rocket.js`.

## Boundaries

- KHÔNG thêm bóng cho tên lửa quanh logo (`.cc-mark-rocket`): nó chỉ rộng 4px.
- KHÔNG dùng `filter` trên lớp ngoài `.cc-rocket` hay `.cc-rocket-fade`. Filter ở lớp cha sẽ bị vẽ lại mỗi frame.
- KHÔNG đổi đường bay hay spring.
- Nếu `els.fly.style.transform` ở `drawFly` không còn dạng `translate3d(...) rotate(...) scale(...)` thì DỪNG và báo lại.

## Verification

- **Mechanical**: `npm run build` chạy thành công, console sạch.
- **Feel check**:
  - Cuộn chậm qua phần mở đầu và cú lượn: bóng **luôn nằm ngay dưới** thân, kể cả lúc bổ nhào và lúc kéo lên thẳng đứng.
  - Lúc đỗ, rê chuột qua vài lá cờ: tên lửa xoay chỉ về cờ, còn bóng vẫn đổ thẳng xuống.
  - Bấm một quốc gia: bóng và thân mờ đi cùng nhau (cả hai nằm trong `.cc-rocket-fade`).
  - DevTools → Rendering → Paint flashing khi đang cuộn: tên lửa **không** nháy xanh mỗi frame. Nếu nháy, kiểm tra lại `will-change: transform` trên `.cc-rocket-shadow`.
  - DevTools → Performance, cuộn 3 giây: không có khối "Paint" lớn lặp lại mỗi frame.
- **Done when**: ở mọi góc xoay, bóng nằm dưới thân trên màn hình, và không có paint mỗi frame.
