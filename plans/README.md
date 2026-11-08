# Plans

**Kế hoạch tổng cho 008–014 (thứ tự, skill, prompt):** [ROADMAP-rocket-space.md](ROADMAP-rocket-space.md)

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Đường bay tên lửa: bay ngang giữa màn hình, bổ nhào, lộn ngược, đỗ](001-rocket-flight-path.md) | HIGH | Thay bằng 002 |
| 002 | [Tên lửa bản 3: bay có đà, hạ cánh bằng cú lượn](002-rocket-swoop.md) | HIGH | DONE |
| 003 | [Tên lửa mờ đi và hiện lại mượt khi mở/đóng thẻ quốc gia](003-rocket-fade-back.md) | HIGH | DONE |
| 004 | [Ảnh tên lửa: WebP cho tên lửa bay, bản nhỏ cho tên lửa quanh logo](004-rocket-images.md) | MEDIUM | DONE |
| 005 | [Bóng tên lửa luôn đổ xuống dưới, không xoay theo thân](005-rocket-shadow.md) | MEDIUM | DONE |
| 006 | [Về logo không giật, không chỉ cờ khi chạm trên cảm ứng](006-rocket-small-polish.md) | LOW | DONE |
| 007 | [Lửa đuôi sống: dài ra khi tăng tốc, lập lòe khi đỗ (tuỳ chọn)](007-rocket-living-flame.md) | LOW | Thay bằng 015 |
| 008 | [Động cơ đốt theo gia tốc: đánh lửa, tăng tốc, trôi, tắt máy](008-rocket-thrust.md) | MEDIUM | TODO |
| 009 | [Vệt khói/tia lửa bị bỏ lại phía sau](009-rocket-exhaust-trail.md) | LOW | TODO |
| 010 | [Tia chỉnh hướng (RCS) ở mũi khi tên lửa xoay](010-rocket-rcs.md) | LOW | TODO |
| 011 | [Động cơ phát sáng: lõi nóng, quầng sáng, lửa loe theo lực đẩy](011-rocket-leaves-atmosphere.md) | LOW | TODO |
| 012 | [Khi đỗ: giữ vị trí kiểu tàu vũ trụ thay cho nhấp nhô](012-rocket-station-keeping.md) | LOW | TODO |
| 013 | [Nền sao trôi nhẹ theo tên lửa (tuỳ chọn)](013-starfield-parallax.md) | LOW | TODO |
| 014 | [Điện thoại: đốt máy bay vụt đi; giảm chuyển động: tên lửa đứng yên](014-rocket-phone-and-reduced-motion.md) | LOW | TODO |
| 015 | [Lắp tàu và lửa mới (Gemini) vào trang chủ](015-new-ship.md) | HIGH | DONE |

Trước khi làm, chạy `npm run build` một lần để iframe quả địa cầu gửi vị trí cho tên lửa.

## Thứ tự làm (003–007)

1. **003** trước: tạo lớp `.cc-rocket-fade` mà 005 và 007 cần.
2. **004** và **006**: độc lập, làm lúc nào cũng được.
3. **005** sau 003.
4. **007** cuối cùng (đã làm, sau đó được 015 thay bằng ảnh lửa riêng).

Plan nào cũng sửa `?v=` của `rocket.js` trong `index.html:77`: mỗi plan tăng số lên, đừng ghi đè số của plan trước.

Vòng bay quanh logo được giữ nguyên (Henry chốt 8/11): mỗi frame chỉ vài phép lượng giác và một lần ghi transform lên phần tử 4px. 004 chỉ làm cho nó nét hơn và khỏi vẽ lại header.

## Thứ tự làm (008–014): "tên lửa du hành vũ trụ"

**Sau 015 (đã sửa 9/11):** 008–012 và 014 đã được viết lại theo tàu mới (mũi lên, lửa là ảnh co giãn bằng `scale`). Số đo của tàu nằm trong `015-new-ship.md`.

**Đã soát lại 9/11 trên trang thật:** mọi đoạn code trích khớp code hiện tại. Gia tốc và tốc độ xoay đã đo; ngưỡng trong 008 và 010 được đặt theo số đo (xem mục "Số đo" trong từng plan). 008: đánh lửa và tắt máy tính theo độ lớn của tên lửa lúc cất cánh, không theo thời gian (theo thời gian thì xong lúc tên lửa còn dài 5px). 011: bỏ ý "thoát khỏi khí quyển" vì cả phần mở đầu lẫn phần quả cầu đều nền đen; thay bằng động cơ phát sáng theo lực đẩy.

1. **008** trước: lực đẩy `thr` và chiều dài lửa `flameLen` là nền cho 009 và 011.
2. **010** (độc lập), rồi **012** (dùng `rcs()` của 010).
3. **009** sau 008.
4. **011** sau 008.
5. **014** độc lập, làm lúc nào cũng được (phần điện thoại đẹp hơn nếu đã có 008).
6. **013** cuối cùng và chỉ khi vẫn thấy thiếu chiều sâu. Plan này sửa iframe nên cần `npm run build:globe`.

Sau mỗi plan, xem chậm (quay màn hình, 0.25×) cạnh phần chữ: vệt khói, tia RCS và lập lòe cộng lại dễ thành rối mắt. Nếu rối, giảm biên độ trong `CFG`, đừng thêm hiệu ứng mới.
