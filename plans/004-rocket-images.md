# 004 — Ảnh tên lửa: WebP cho tên lửa bay, bản nhỏ cho tên lửa quanh logo

- **Status**: DONE (8/11) — trang chủ tải cc-rocket.webp (77 KB) và cc-rocket-64.png (6.5 KB), không còn cc-rocket.png. Chưa xem độ lấp lánh bằng mắt hoặc Paint flashing
- **Commit**: e48080b
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file ảnh mới, `assets/js/rocket.js` (~5 dòng), `assets/css/refinements.css` (1 dòng), `index.html` (`?v=`)

## Problem

1. Cả hai tên lửa đều dùng `assets/img/brand/cc-rocket.png`: **601 KB**, 1024×1024.
   ```js
   /* assets/js/rocket.js:53 — hiện tại */
   var PIC = { src: 'assets/img/brand/cc-rocket.png', side: 1024, len: 1316.6, width: 0.481, nose: 45 };
   ```
   Trong repo đã có `assets/img/brand/cc-rocket.webp`: cùng hình, cùng khung 1024×1024, chỉ **76 KB**, nhưng chưa được dùng. Tên lửa xuất hiện ngay ở đầu trang chủ, nên ảnh nặng gấp 8 lần sẽ làm tên lửa hiện muộn trên mạng chậm.
2. Tên lửa quanh logo (`.cc-mark-rocket`) chỉ rộng khoảng 4px (logo 40px; `LOGO.rocketLen 137.9 × 40/1024 ≈ 5.4px` chiều dài). Nó được vẽ thu nhỏ từ ảnh 1024px, khoảng 200 lần. Khi đang xoay, trình duyệt thu nhỏ bằng bộ lọc nhanh nên hình **lấp lánh/răng cưa** qua từng frame.
3. `.cc-mark-rocket` đổi `transform` mỗi frame nhưng không có lớp composite riêng, nên mỗi frame phải vẽ lại một mảng nhỏ của header:
   ```css
   /* assets/css/refinements.css:136 — hiện tại */
   .cc-mark-rocket { position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none; line-height: 0; transform-origin: 50% 50%; }
   ```
4. `drawMarkRocket` đặt `width` mỗi frame dù giá trị không đổi (rocket.js:271).

Việc bay quanh logo **được giữ nguyên** (Henry đã chốt). Mỗi frame nó chỉ tốn vài phép lượng giác và một lần ghi transform lên một phần tử 4px, rất rẻ. Plan này chỉ làm cho nó nét hơn và rẻ hơn nữa.

## Target

- Tên lửa bay: `assets/img/brand/cc-rocket.webp`.
- Tên lửa quanh logo: ảnh mới `assets/img/brand/cc-rocket-64.png` (64×64, cùng khung và cùng góc mũi 45° như bản 1024). 64px là đủ cho phần tử 4px trên màn hình 3x (4 × 3 = 12px) mà vẫn thu nhỏ ít.
- `.cc-mark-rocket` có `will-change: transform`.
- `width` của `.cc-mark-rocket` chỉ đặt trong `measure()`.

## Repo conventions to follow

- Ảnh thương hiệu nằm ở `assets/img/brand/`, đặt tên theo cỡ: `cc-logo-128.png`, `cc-logo-256.png`, `cc-rocket-512.png`.
- Số liệu ảnh nằm trong `PIC` ở đầu `rocket.js`. `PIC.side`, `PIC.len`, `PIC.nose` tính theo khung 1024, và vẫn đúng với mọi bản thu nhỏ có cùng khung, vì code chỉ dùng tỉ lệ `PIC.side / PIC.len`.

## Steps

1. Tạo ảnh nhỏ (macOS có sẵn `sips`):
   ```bash
   sips -Z 64 assets/img/brand/cc-rocket.png --out assets/img/brand/cc-rocket-64.png
   ```
   Kiểm tra: `sips -g pixelWidth -g pixelHeight assets/img/brand/cc-rocket-64.png` phải ra 64 và 64.
2. `assets/js/rocket.js:53`: đổi `src: 'assets/img/brand/cc-rocket.png'` thành `src: 'assets/img/brand/cc-rocket.webp'`, và thêm dòng ngay dưới:
   ```js
   var PIC_SMALL = 'assets/img/brand/cc-rocket-64.png';   // the logo's rocket is ~4px wide; a small source keeps it from shimmering
   ```
3. `build()` (rocket.js:341): đổi `'<img src="' + PIC.src + '"` của `els.markRocket` thành `'<img src="' + PIC_SMALL + '"`. Tên lửa bay (`els.fly`) vẫn dùng `PIC.src`.
4. Chuyển việc đặt width ra khỏi vòng frame:
   - Trong `drawMarkRocket` (rocket.js:271), xóa dòng `els.markRocket.style.width = side.toFixed(2) + 'px';`.
   - Trong `measure()`, ngay sau dòng `els.markRocket.style.top = els.mark.offsetTop + 'px';` (dòng 116), thêm:
     ```js
     els.markRocket.style.width = (LOGO.rocketLen * (mr.width || 40) / LOGO.size * PIC.side / PIC.len).toFixed(2) + 'px';
     ```
5. `assets/css/refinements.css:136`: thêm `will-change: transform;` vào cuối khai báo `.cc-mark-rocket`.
6. `index.html:77`: tăng `?v=` của `rocket.js` (ví dụ `20261108-rocket6`, lớn hơn số mà plan 003 dùng).

## Boundaries

- KHÔNG xóa hoặc sửa `cc-rocket.png` (ảnh gốc cho các bản sau).
- KHÔNG đổi số trong `PIC` ngoài `src`, và KHÔNG đổi `LOGO`.
- KHÔNG đổi tốc độ hay độ trễ của vòng bay quanh logo (`orbitSeconds`, `orbitDelay`).
- Nếu code không khớp các đoạn trích (đã thay đổi sau e48080b) thì DỪNG và báo lại.

## Verification

- **Mechanical**: `npm run build` chạy thành công. Trong DevTools → Network, trang chủ tải `cc-rocket.webp` (khoảng 76 KB) và `cc-rocket-64.png`, **không** tải `cc-rocket.png`.
- **Feel check**:
  - Mở trang chủ, ở yên đầu trang 3 giây. Phóng to vùng logo bằng DevTools zoom hoặc chụp màn hình rồi phóng to: tên lửa nhỏ quay quanh logo không lấp lánh, vẫn đúng vị trí trên quỹ đạo, vẫn khuất sau ngôi sao ở nửa trên.
  - Cuộn xuống rồi về đầu trang: tên lửa bay về logo, đổi sang tên lửa nhỏ không nhảy cỡ.
  - DevTools → Rendering → Paint flashing: khi trang để yên ở đầu, vùng logo **không** nháy xanh mỗi frame.
  - Tên lửa bay lúc đỗ cạnh quả cầu vẫn nét như bản PNG (WebP có nén; so sánh hai bản cạnh nhau).
- **Done when**: không còn request tới `cc-rocket.png` trên trang chủ, và Paint flashing không nháy ở logo khi tên lửa đang bay vòng.
