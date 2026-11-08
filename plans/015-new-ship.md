# 015 — Lắp tàu và lửa mới (Gemini) vào trang chủ

- **Status**: DONE (8/11), chưa commit
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–007
- **Thay cho**: 007 (lửa SVG vẽ lại trên ảnh cũ) và ảnh `cc-rocket.*` cũ
- **Scope**: `assets/js/rocket.js`, `assets/css/refinements.css`, `index.html:77` (`?v=…-rocket10`), 3 ảnh mới trong `assets/img/brand/`

## Ảnh

Từ `culturecompass-ship.zip` (Gemini vẽ, Claude chỉ tách nền và đổi cỡ; xem `logo-decision.md`).

| File | Cỡ | Dùng cho |
| --- | --- | --- |
| `ship-rocket-900.webp` | 349×900, 42 KB | Tên lửa bay và bóng của nó |
| `ship-flame-900.webp` | 292×900, 147 KB | Lửa đuôi (nền trong suốt thật, không cần `mix-blend-mode`) |
| `ship-rocket-256.webp` | 99×256 | Tên lửa nhỏ bay quanh logo |

Ảnh cũ `cc-rocket.png/.webp/-512.png` đã xoá (9/11). Mask và bản 64px của plan 004/007 cũng đã xoá.

## Hình học

- Tàu vẽ thẳng đứng, mũi lên, nên `PIC.nose = 0` (ảnh cũ chếch 45°). Logo vẫn có tên lửa chếch đông bắc, nên thêm `LOGO.head = 45` cho hướng xuất phát quanh logo.
- `PIC = { side: 2464, len: 2464, width: 956/2464 }`: tàu nằm giữa khung vuông 512px (`FLY_BASE`) bằng `object-fit: contain`, nên khung xoay quanh giữa thân tàu. Thân tàu trong khung: 198.65×512, lệch trái 156.68px.
- Lửa đặt theo phần trăm thân tàu (`FLAME = { left: 0.18, width: 0.646, top: 0.954 }`): trong khung 512 là left 192.43, top 488.45, rộng 128.33, cao 395.89. Đỉnh lửa giấu trong miệng ống phụt, sau thân.
- Lửa co giãn từ mép trên (`transform-origin: 50% 0`): `scale(0.85 + 0.15·f, f)`, `f` theo tốc độ trong `CFG.flame { min 0.45, max 1.0, full 1.2, flicker 0.05 }`, kẹp 0.3–1.1. Đỗ: khoảng 0.45, lập lòe nhẹ.
- Bóng vẫn là ảnh thân tàu với `brightness(0) blur(22px)`, lệch theo `CFG.shadow = 0.03` và luôn đổ thẳng xuống (plan 005).

## Đã kiểm (trình duyệt, 1100×800)

- Đỗ cạnh quả cầu: xoay −1° (mũi lên), khung thân 359px, lửa bắt đầu trong miệng ống phụt. Console sạch.
- Bay ngang (scrollY 900): xoay 94°, mũi đi trước, lửa kéo sau.
- Mạng: chỉ tải 3 ảnh mới.
- Tên lửa quanh logo: khung vuông 5.39px.
- Cất cánh (9/11): chỗ chuyển từ logo sang tàu bay khớp tuyệt đối (cùng vị trí, cỡ, góc). Cả đoạn: mỗi frame dịch tối đa 8.5px, xoay tối đa 3°.
- Bay về logo (9/11): trước đây tàu nhập vào logo khi đã đúng chỗ nhưng mũi còn lệch tới 40°, nên xoay giật trong một frame. Đã thêm điều kiện `Math.abs(angDiff(sp.h, l.head)) < 6` vào `home` trong `frame()`, `?v=…-rocket11`. Đo lại ở ba tốc độ cuộn: chỗ nhập lệch 0.3–0.7px, xoay 6–7° (bằng một frame bay thường).
- Điện thoại 375px: cất cánh và bay ngang mượt (tối đa 13px, 5° mỗi frame), mờ hết ở cuối phần mở đầu, không đỗ.
- Giảm chuyển động (cài đặt của site): tàu bay ẩn, logo về `cc-logo-128.png` có tên lửa vẽ sẵn, `rocket.js` không chạy frame nào; tắt đi thì tàu bay lại đúng chỗ.

## Số đo cho các plan sau (khung 512)

- Miệng ống phụt: `(256, 490)`, ngay trên trục thân (ảnh gốc: x 478, y ≈ 2360).
- Cổng RCS trên mặt nón khoang lái (ảnh gốc hàng y 560, mép ở x 264 và 692): trái `(211.5, 116.4)`, phải `(300.5, 116.4)`; pháp tuyến ra ngoài `(∓0.934, −0.356)`.
- Đổi từ ảnh gốc 956×2464 sang khung: `x = 156.68 + x_ảnh × 512/2464`, `y = y_ảnh × 512/2464`.
- Ảnh cũ `cc-rocket.png/.webp/-512.png` đã xoá (9/11), không còn file nào dùng. File gốc `src/cc-rocket-red-master.png` vẫn giữ.

008–012 và 014 đã được viết lại theo các số này (9/11).
