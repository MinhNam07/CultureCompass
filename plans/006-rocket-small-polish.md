# 006 — Hai chỉnh nhỏ: về logo không giật, không chỉ cờ khi chạm trên cảm ứng

- **Status**: DONE (8/11) — 5 lần về logo đều được (0.7–1.4 s), khoảng nhảy khoảng 0.9 px; hover vẫn chạy với chuột, media query trả về false khi giả lập cảm ứng. Chưa thử trên tablet thật
- **Commit**: e48080b
- **Severity**: LOW
- **Category**: Physicality / Accessibility
- **Estimated scope**: `assets/js/rocket.js` (2 dòng), `components/3d-globe-demo.tsx` (1 dòng), `index.html` (`?v=`)

## Problem

1. **Về logo bị nhảy.** Tên lửa bay về và được "gắn" vào logo khi còn cách dưới 4px:
   ```js
   /* assets/js/rocket.js:315 — hiện tại */
   var home = atTop && Math.hypot(l.x - sp.x, l.y - sp.y) < 4;
   ```
   Ở cỡ logo, tên lửa chỉ dài khoảng 5.4px, nên nhảy 4px gần bằng cả thân. Theo comment ở dòng 312-313, không chờ về đúng 0px được vì quỹ đạo vẫn đang chạy. Ngưỡng nên tính theo cỡ tên lửa.
2. **Chạm trên màn cảm ứng làm tên lửa chỉ cờ mãi.** Iframe gửi `hover` bất kể loại con trỏ:
   ```tsx
   /* components/3d-globe-demo.tsx:138 — hiện tại */
   hover: hovered && pointer.current ? pointer.current : null,
   ```
   Trên tablet rộng hơn 760px (không bị coi là điện thoại), chạm vào một lá cờ sẽ đặt `hovered`. Tên lửa xoay chỉ về điểm chạm và đứng yên như vậy, vì không có sự kiện rời chuột.

## Target

1. Ngưỡng về logo: `Math.max(0.5, 0.15 * l.len)` px. Với logo 40px là khoảng 0.8px.
2. Chỉ gửi `hover` khi thiết bị có chuột thật: `window.matchMedia('(hover: hover) and (pointer: fine)').matches`.

## Repo conventions to follow

- `logoState()` (rocket.js:99-102) trả về `len` là chiều dài tên lửa ở cỡ logo, đơn vị px màn hình.
- Iframe đã dùng `window.matchMedia` cho reduced-motion ở `components/3d-globe-demo.tsx:149`.

## Steps

1. `assets/js/rocket.js:315`: đổi `< 4` thành `< Math.max(0.5, 0.15 * l.len)`. Chỉ sửa dòng này. `l` đã là `logoState()` ở dòng 314.
2. `components/3d-globe-demo.tsx:138`: đổi thành
   ```tsx
   hover: hovered && pointer.current && window.matchMedia("(hover: hover) and (pointer: fine)").matches ? pointer.current : null,
   ```
3. `index.html:77`: tăng `?v=` của `rocket.js`.

## Boundaries

- KHÔNG đổi logic khác trong `frame()`.
- KHÔNG đổi cách quả cầu xử lý hover và chạm (chỉ đổi dữ liệu gửi cho tên lửa).
- Nếu sau bước 1 tên lửa không bao giờ về được logo (cứ lơ lửng gần logo), đổi `0.15` thành `0.3` rồi thử lại. Vẫn không được thì DỪNG và báo lại.

## Verification

- **Mechanical**: `npm run build` chạy thành công (có `typecheck`).
- **Feel check**:
  - Cuộn xuống khoảng nửa phần mở đầu, rồi bấm Home để về đầu trang. Xem vùng logo ở playback chậm (quay màn hình rồi xem từng frame): tên lửa trượt vào quỹ đạo, không có frame nào nhảy.
  - Thử 5 lần ở các thời điểm khác nhau của vòng quỹ đạo: lần nào cũng về được logo trong khoảng 1-2 giây.
  - DevTools → Device toolbar, chọn iPad (1024px, touch): cuộn tới quả cầu, chạm một lá cờ, thì tên lửa **không** quay chỉ vào điểm chạm.
  - Trên máy tính có chuột: rê qua cờ thì tên lửa vẫn chỉ cờ như cũ.
- **Done when**: không thấy nhảy khi về logo, và tablet cảm ứng không làm tên lửa chỉ cờ.
