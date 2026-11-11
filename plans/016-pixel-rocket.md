# 016 — Tên lửa pixel (#4 + #16)

- **Trạng thái:** xong 11/11. Henry chọn tàu pixel, giờ là mặc định; `index.html?rocket=classic` xem tàu cũ. Henry giao Claude tự làm: tàu vẽ bằng code (`tools/pixel-rocket/ship.py`, không qua Gemini), hiệu ứng bằng beanfx (`tools/pixel-rocket/fx.py`). Ảnh nằm trong `assets/img/brand/pixel/`. Mục 3 (prompt Gemini) giữ lại phòng khi muốn vẽ lại tàu bằng Gemini.
- **Chạy lại:** `.venv/bin/python tools/pixel-rocket/ship.py && .venv/bin/python tools/pixel-rocket/fx.py` (cần chạy setup beanfx trước), rồi copy `tools/pixel-rocket/out/ship.png` và `out/pixel-*.{png,json}` vào `assets/img/brand/pixel/`.
- **Phạm vi:** `assets/js/rocket.js` (chế độ pixel sau cờ), ảnh mới trong `assets/img/brand/pixel/`.
- **So sánh:** `index.html` là bản pixel, `index.html?rocket=classic` là tàu cũ.

## 1. Đánh giá tàu hiện tại (`ship-rocket-900.webp`, 349×900)

- Đây là tranh minh họa nét mịn: có gradient, có bóng loáng kim loại, viền đen mảnh. Kiểu vẽ này khác hẳn game pixel (khối phẳng, viền `#3a3a50`, không khử răng cưa).
- Hình dáng đọc tốt ở mọi cỡ: mũi tròn có ăng-ten, thân trắng có sọc xanh navy và cyan, 3 cánh navy, ống phụt xám. Giữ nguyên hình dáng này cho bản pixel.
- Ảnh không có lửa (lửa là ảnh riêng), đúng với cách làm pixel: lửa và khói do beanfx làm.
- Cỡ hiện ra: khoảng 5px quanh logo, khoảng 180–320px khi bay và khi đỗ. Bản pixel 26×64 px phóng ×3 đến ×5 là vừa.

## 2. Cách xoay (đã quyết, không cần Gemini vẽ nhiều hướng)

Gemini không vẽ được 8 hay 16 hướng giống hệt nhau. Code sẽ xoay ngay trên lưới pixel nhỏ:
1. Vẽ tàu vào một canvas nhỏ (khoảng 72×72 px), xoay ở đó, tắt làm mịn.
2. Phóng to canvas đó lên màn hình bằng `image-rendering: pixelated`.

Kết quả: ở góc nào pixel cũng vuông và cùng cỡ, không bị nhòe. Góc xoay được làm tròn theo nấc 15° để cạnh không lắc lư từng khung.

## 3. Prompt Gemini cho con tàu

Lưu ảnh Gemini trả về vào `assets/game/raw/brand/pixel-rocket-<A|B>.png`. Mỗi lần chỉ tạo một tàu, nền hồng phẳng.

### Bản A — hợp với game (khuyên dùng)

```
Pixel art sprite of a small retro space rocket, for a cozy top-down RPG in the style of LimeZu "Serene Village".
The rocket stands perfectly vertical, nose pointing straight up, seen from the side, centred, filling about 85% of the image height.
Sprite grid: exactly 26 pixels wide and 64 pixels tall. Draw every sprite pixel as one large, perfectly square, flat-coloured block of the same size, aligned to a strict grid.
Shape: rounded capsule nose with a thin antenna on top, two round portholes and a tiny hatch on the nose; a long white cylindrical body; a dark navy band below the nose and a thin cyan stripe; three swept-back navy fins at the bottom (left, right, and one in front, centred); a short grey engine nozzle at the bottom centre. No flame, no smoke, no exhaust.
Colours (flat, no gradients): white body #EEEEEE with light grey shading #A9C6E8 and #8A8A96; navy #406AC5 and dark navy #565972 for the fins and bands; one thin cyan accent #5EC8FC; nozzle grey #67798D and #5A5A6A; a single warm amber pixel inside the nozzle #E8B84A.
Light from the top-left: 3 to 4 shades per material, short 1-pixel highlight streaks, no dithering.
A 1-pixel outline in #3A3A50 around the whole rocket and between parts. Never pure black.
No anti-aliasing, no blur, no glow, no soft shadow, no ground, no text, no logos, no flags, no numbers.
Background: one flat solid #FF00FF magenta, no magenta or pink anywhere on the rocket.
Aspect ratio 1:2, high resolution.
```

### Bản B — giữ màu thương hiệu hiện tại

Giống bản A, chỉ thay đoạn màu bằng:

```
Colours (flat, no gradients): white body #CFFAFD with shading #9BB8C8 and #6F8AA0; navy #1C3A5E for the fins and bands; a thin cyan stripe #4FE3F0; nozzle grey #5A5A6A; one amber pixel inside the nozzle #FFB547. Outline #070D1A at 1 pixel.
```

Bản B giống tàu hiện tại hơn nhưng lệch màu so với game. T khuyên **A**, vì lý do làm pixel là để trang chủ liền mạch với game.

### Nếu Gemini vẽ sai

- Pixel không đều cỡ, hoặc có viền mờ: không sao, `tools/pixelize.py` sẽ dò lưới, thu về đúng 26×64 và ép về bảng màu game.
- Có lửa dưới đuôi: tạo lại, nhắc thêm "the nozzle is empty and dark, the engine is off".
- Cánh trước che mất ống phụt: chấp nhận được. Lửa sẽ được gắn vào đáy giữa của ảnh.

## 4. beanfx: lửa, khói, tia RCS

### Cài (Henry chạy trong terminal `claude`, tại thư mục project)

```
/plugin marketplace add baenv/beanfx
/plugin install beanfx@beanfx
```

`.gitignore` đã có `.venv/`, `drafts/`, `out/`. Lần đầu chạy, beanfx tạo `.venv/` với numpy và pillow. `tools/pixelize.py` cũng dùng chung venv này.

### Hiệu ứng cần tạo (mỗi cái một sprite sheet PNG + JSON)

| Tên file | Mô tả cho beanfx | Cỡ khung | Số khung |
|---|---|---|---|
| `pixel-flame` | Lửa động cơ tên lửa phụt thẳng xuống, nhìn ngang, lõi vàng nhạt `#F1CE8E`, giữa cam `#FC5C46`, ngoài đỏ `#BA2D2F`, mép lập lòe. Vòng lặp liền mạch. | 16×32 | 6 |
| `pixel-ignite` | Đánh lửa: từ một đốm sáng nhỏ bùng ra thành ngọn lửa như trên. | 16×32 | 5 |
| `pixel-puff` | Một cụm khói tròn xám nhạt `#A5907B` → `#D0BE9C`, nở ra rồi tan. | 12×12 | 6 |
| `pixel-rcs` | Tia khí nhỏ màu trắng xanh `#A9C6E8` phụt ngang sang phải rồi tắt. | 8×6 | 4 |

Nền trong suốt, viền không dùng (lửa và khói không viền). Đầu ra copy vào `assets/img/brand/pixel/`.

Chú ý: beanfx tự viết rồi chạy file Python. Xem lại file `.py` trước khi cho chạy.

## 5. Gắn vào trang (đã làm, trừ bóng tàu)

1. Chạy `pixelize.py` cho ảnh tàu: tách nền hồng, thu về 26×64, ép bảng màu, thêm viền. Xuất `assets/img/brand/pixel/ship.png`.
2. Trong `rocket.js`, chế độ `?rocket=pixel`:
   - Thay ảnh tàu bằng canvas nhỏ.
   - Xoay theo nấc 15°.
   - Lửa: chọn khung `pixel-flame` theo thời gian, dài ngắn theo lực đẩy (theo nấc nguyên).
   - Khói và RCS dùng hai sheet còn lại.
   - Bóng tàu: chưa làm (bản pixel đang ẩn bóng).
   - Tia RCS vẽ trong cùng canvas, ở hai bên mũi. Khói thải đổi khung theo tuổi, không phóng to.
3. Logo quanh header giữ tàu nhỏ hiện tại (5px thì pixel không đọc được).
4. Chụp so sánh hai bản ở 3 vị trí: cất cánh, bay ngang, đỗ. Henry chốt.

## 6. Sau khi chọn (11/11)

- Lửa luôn chạy khi tàu đang hiện trên màn hình, kể cả lúc trang đứng yên. Trước đây vòng vẽ dừng khi hết cuộn nên lửa đứng hình. Canvas chỉ vẽ lại 12 lần/giây nên lúc đứng yên tốn rất ít.
- Lơ lửng: tàu nhún lên xuống đúng 1 pixel sprite, mỗi vòng 2.4 giây (`CFG.bob`). Đi từng nấc như sprite trong game, không trôi mượt.
- Rung: khi lực đẩy trên 0.7, mỗi khung (12 lần/giây) tàu nhích 1 pixel theo một hướng ngẫu nhiên trên màn hình (`PX_SHAKE`).
- Đốm lửa: khi lực đẩy trên 0.5, đốm lửa 1 pixel bắn ra từ mép ngọn lửa rồi rơi lại phía sau. Màu đổi dần từ vàng nhạt sang đỏ, mỗi đốm sống 4–6 khung, tối đa 10 đốm (`PX_EMBER`).
- Có thể thêm sau:
  - Bóng tàu pixel.
  - Đổi vòng la bàn lúc tải trang thành tên lửa pixel (#15).
