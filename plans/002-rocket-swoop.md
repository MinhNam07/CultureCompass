# 002 — Tên lửa bản 3: bay có đà, hạ cánh bằng cú lượn (thay cú lộn)

- **Status**: DONE — chờ Henry xem trên Chrome + Safari
- **Thay cho**: đường bay của 001 (bản 2). Các điều đã chốt trong 001 vẫn giữ.
- **File**: `assets/js/rocket.js` (viết lại đường bay), `index.html` (đổi `?v=` của script)

## Vì sao làm lại
Henry chưa ưng 4 điểm của bản 2: bay cứng như trên ray, cú lộn giật, cỡ lúc đỗ chưa đúng, cất cánh rời logo chưa đẹp.
Đã thử 3 phương án trên trang thử riêng (Lướt, Hạ cánh thật, Có đà). Henry chọn phương án 4 "Tối ưu", ghép từ cả ba.

## Đường bay bây giờ
1. **Cất cánh** (12% phần mở đầu, bản 2 là 6%): x và y đi cùng một đường cong nên mũi chỉ đúng hướng đang bay.
   Tên lửa chỉ to dần khi đã rời header.
2. **Bay ngang** (từ phương án 2 + 1): nhanh/chậm theo ảnh trôi (sine in-out, bám 320 ms như `home.js`),
   lượn sóng nhẹ 2 lần (0,03 chiều cao màn hình). Cuộn nhanh thì vọt lên trước (tối đa 0,05 chiều rộng) và
   ngóc mũi, chậm lại thì trôi về. Mũi tính theo dòng ảnh trôi, kiểu game cuộn ngang.
3. **Hạ cánh** (từ phương án 1): một cú lượn liền gồm cung bẻ xuống, đoạn bổ nhào, cung kéo lên rộng, rồi leo
   thẳng vào chỗ đỗ. Chỉ có cung và đoạn thẳng nên mũi quay đều. Quãng đường được nắn để tên lửa rời đoạn bay
   ngang đúng tốc độ cũ và tới chỗ đỗ đúng tốc độ trang (1 px mỗi px cuộn), nên lúc đỗ không bị khựng.
4. **Đỗ**: dài đúng 1 đường kính địa cầu. Nếu chật, nó đè lên mép địa cầu tối đa 35% bề ngang trước khi thu nhỏ,
   không nhỏ hơn 0,85 lần, và không đè lên chữ. Khi đỗ nó nhấp nhô nhẹ và chỉ mũi về lá cờ dưới con trỏ.
5. **Lò xo nhẹ** (từ phương án 3): một spring 0,15 s (damping 0,8) cho vị trí và 0,2 s cho mũi, phủ lên cả
   đường bay để có chút quán tính. Khi đỗ, spring đi theo trang (page-glue).

Đã đỗ xong muộn nhất tại vị trí cuộn mà "Skip to destinations" dừng lại (`#destinations` trừ scroll-padding và
scroll-margin). Nếu chỗ đỗ nằm thấp trên màn hình, đoạn bổ nhào tự dài ra.

Mọi số chỉnh tay nằm trong `CFG` ở đầu `rocket.js`: `station`, `takeoffEnd`, `weave`, `waves`, `surge`, `swoop`,
`follow`, `turn`, `hover`.

## Đã kiểm tra (Chrome headless, 8/11/2026)
- 1440×900, 1024×768 và 390×844: cuộn đều từ đầu tới cuối và ngược lại. Trace đạt 60 fps; ngoài lúc tên lửa còn
  nằm trong logo (5 px), không frame nào mũi quay quá 12°.
- Chỉ đổi `transform` và `opacity`; layout chỉ đọc trong `measure()`.
- "Skip to destinations": tên lửa đỗ xong, mũi dựng, đúng chỗ trang dừng.
- Lăn chuột thật nhanh tới cuối trang: tên lửa đỗ rồi trôi theo trang.
- Đổi cỡ cửa sổ giữa lúc bay (1440 → 1024 → 390 → 1440): không lỗi, đỗ đúng.
- Cuộn về đầu trang: tên lửa vào lại logo sau khoảng 0,9 s.
- `prefers-reduced-motion`: không có tên lửa riêng, logo giữ nguyên.
- Chạy được từ file://. `npm run build` sạch.
- **Chưa kiểm tra**: Safari, máy thật.
