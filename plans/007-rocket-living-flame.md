# 007 — Lửa đuôi sống: dài ra khi tăng tốc, lập lòe khi đỗ (tuỳ chọn)

- **Status**: THAY BẰNG 015 (8/11, ảnh tàu và lửa mới của Gemini). Ghi chú cũ: không cần ảnh mới: lửa trong cc-rocket.webp được che bằng mask (assets/img/brand/cc-rocket-flame-mask.png, 9 KB, tách theo màu cam/vàng) và vẽ lại bằng SVG từ bao lồi của lửa gốc, có viền navy #111C49 13px. Đo được: đỗ 0.79–0.90, lao nhanh tới 1.6
- **Commit**: e48080b
- **Severity**: LOW (cơ hội thêm, không phải lỗi)
- **Category**: Missed opportunities
- **Depends on**: 003 (lớp `.cc-rocket-fade`), nên làm sau 004 và 005
- **Estimated scope**: 1 ảnh mới, `assets/js/rocket.js` (~25 dòng), `assets/css/refinements.css` (3 dòng)

## Problem

Ngọn lửa là một hình thoi cam/vàng vẽ cứng vào ảnh (`assets/img/brand/cc-rocket.png`, góc dưới trái). Tên lửa vọt lên trước khi cuộn nhanh (`surge`), bổ nhào, kéo lên, rồi lơ lửng khi đỗ, nhưng ngọn lửa lúc nào cũng y hệt. Đây là chi tiết duy nhất làm tên lửa trông như hình dán: mọi thứ khác đều phản ứng với chuyển động, riêng lửa thì không.

Thêm một điểm nhỏ: mọi mảng trong ảnh đều có viền xanh navy đậm, riêng ngọn lửa chỉ có viền hồng mảnh, nên trông lệch phong cách.

## Target

- **Thân** (ảnh không có lửa) và **lửa** (SVG vẽ trong code) là hai lớp riêng. Lửa nằm sau thân, xuất phát từ miệng ống phụt.
- Mỗi frame, lửa chỉ đổi chiều dài dọc theo trục tên lửa (một `transform` trên phần tử có `will-change: transform`). Không đổi layout, không vẽ lại.
- Hệ số chiều dài `f`, tính trong `frame()` từ vận tốc spring (`sp.vx`, `sp.vy`, px/giây):
  - `speed = Math.hypot(sp.vx, sp.vy) / m.vh` (số chiều cao màn hình mỗi giây)
  - `base = 0.85 + 0.65 * smoothstep(speed / 1.2)`: lửa ngắn (0.85) khi gần đứng yên, dài tới 1.5 khi bay nhanh
  - lập lòe: `flick = 1 + 0.05 * Math.sin(now / 1000 * 2π * 9) + 0.03 * Math.sin(now / 1000 * 2π * 13.7)`
  - `f = base * flick`, chặn trong `[0.7, 1.6]`
  - Lập lòe chỉ chạy khi rAF đang chạy (đang bay hoặc đang đỗ trên màn hình). Không mở thêm vòng lặp nào.
- Kéo dài dọc trục: trục từ miệng ống tới đuôi lửa hướng 135° trong khung ảnh (xuống-trái). Dùng `transform: rotate(135deg) scaleX(f) rotate(-135deg)` với `transform-origin` đặt tại miệng ống.
- Reduced motion: không cần xử lý thêm, vì khi đó tên lửa bay không tồn tại (rocket.js:352).

## Repo conventions to follow

- Số chỉnh tay đặt trong `CFG` (rocket.js:24-47): thêm `flame: { min: 0.85, max: 1.5, full: 1.2, flicker: 0.05 }`.
- Hàm `smoothstep` đã có ở rocket.js:74.
- Mỗi frame chỉ ghi `transform`/`opacity`; layout chỉ đọc trong `measure()`.

## Steps

0. **Ảnh (người làm: Henry, hoặc ai có công cụ sửa ảnh).** Từ `assets/img/brand/src/cc-rocket-red-master.png` hoặc `cc-rocket.png`, xuất `assets/img/brand/cc-rocket-body.png`:
   - **cùng khung 1024×1024 và cùng vị trí thân** (để `PIC.len`, `PIC.nose` vẫn đúng);
   - xóa ngọn lửa, đóng đáy ống phụt bằng viền navy như các mảng khác;
   - nền trong suốt.
   Sau đó: `cwebp -q 90 cc-rocket-body.png -o cc-rocket-body.webp` (hoặc giữ PNG nếu không có `cwebp`).
   **Nếu chưa có file này thì DỪNG plan tại đây.**
1. Đo miệng ống phụt: mở `cc-rocket-body.png` trong một công cụ có tọa độ pixel (Preview → Inspector, Figma). Ghi lại tâm đáy ống phụt `(nx, ny)` theo pixel của khung 1024. Ước lượng từ ảnh hiện tại là khoảng `(265, 745)`, nhưng phải đo lại. Thêm vào `PIC`: `nozzle: [nx, ny]`.
2. Vẽ lửa bằng SVG, cùng hệ tọa độ khung (`viewBox="0 0 1024 1024"`). Hình thoi dọc trục 135° từ miệng ống, dài khoảng 300px và rộng khoảng 150px ở f = 1, để ở f = 1 có cỡ gần bằng ngọn lửa cũ:
   - lớp ngoài: `fill` lấy mẫu từ màu cam của ngọn lửa cũ (khoảng `#F6A23C`), `stroke` lấy mẫu màu viền navy của thân (khoảng `#1F2A4D`), `stroke-width` bằng độ dày viền của thân (khoảng 10 đơn vị);
   - lớp trong: màu vàng nhạt (khoảng `#FBE59A`), không viền, nhỏ hơn khoảng 55%.
   Lấy màu thật bằng cách vẽ `cc-rocket.png` lên một `<canvas>` trong DevTools rồi đọc `getImageData`; không dùng các mã ước lượng ở trên nếu lệch nhiều.
3. `build()`: trong `.cc-rocket-fade`, đặt lửa **trước** ảnh thân (để nằm dưới):
   ```js
   '<svg class="cc-rocket-flame" viewBox="0 0 1024 1024" aria-hidden="true">…</svg>'
   ```
   Đổi `src` của ảnh thân thành `cc-rocket-body.webp`. Nếu plan 005 đã xong, ảnh bóng **vẫn dùng ảnh có lửa cũ** (`PIC.src`): bóng mờ nên không cần đổi.
   Lưu `els.flame = els.fly.querySelector('.cc-rocket-flame')`.
4. CSS:
   ```css
   .cc-rocket .cc-rocket-flame { position: absolute; inset: 0; width: 100%; height: 100%; will-change: transform; }
   .cc-rocket .cc-rocket-body { position: relative; }
   ```
   Đặt `transform-origin` cho lửa trong `build()` theo `PIC.nozzle`: `(nx / 1024 * 100)% (ny / 1024 * 100)%`.
5. `frame()`: sau khi tính `cur`, nếu đang vẽ tên lửa bay (`!home`), tính `f` theo phần **Target** rồi ghi
   `els.flame.style.transform = 'rotate(135deg) scaleX(' + f.toFixed(3) + ') rotate(-135deg)';`
6. Tăng `?v=` trong `index.html:77`.

## Boundaries

- KHÔNG thêm lửa cho tên lửa quanh logo.
- KHÔNG làm vòng rAF chạy thêm khi đang đứng yên: điều kiện `idle || moving` ở cuối `frame()` giữ nguyên.
- KHÔNG dùng `filter`/`blur` trên lửa (tốn paint).
- Nếu ở f = 1 ngọn lửa mới lệch khỏi miệng ống quá khoảng 1% khung, sửa số trong SVG cho khớp, không sửa `PIC.nose`/`PIC.len`.

## Verification

- **Mechanical**: `npm run build` chạy thành công, console sạch. Paint flashing không nháy ở tên lửa khi đang bay.
- **Feel check**:
  - Đặt ảnh cũ và ảnh mới chồng lên nhau ở f = 1 (tạm khoá `f = 1`): lửa mới nằm đúng chỗ lửa cũ, viền cùng độ dày với thân.
  - Cuộn chậm thì lửa ngắn và lập lòe nhẹ. Hất cuộn thật nhanh thì lửa dài ra cùng lúc tên lửa vọt lên, rồi co lại mượt khi chậm dần (lửa đi theo spring nên không giật).
  - Lúc đỗ, tên lửa lơ lửng với lửa lập lòe nhỏ. Lửa không được tắt hẳn.
  - Quay màn hình, xem 0.25×: lửa không nhảy cỡ giữa hai frame. Lập lòe đủ nhỏ để không gây chú ý khi đọc chữ bên cạnh. Nếu thấy rối mắt, giảm `flicker` xuống 0.03.
- **Done when**: chiều dài lửa phản ứng rõ với tốc độ cuộn, lửa có viền cùng phong cách với thân, và không có paint mỗi frame.
