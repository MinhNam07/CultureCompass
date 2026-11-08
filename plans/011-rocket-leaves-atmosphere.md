# 011 — Động cơ phát sáng: lõi nóng, quầng sáng và luồng lửa loe theo lực đẩy

- **Status**: DONE (9/11, `?v=…-rocket16`). Đo 1100×800 (opacity lõi / quầng): bay ngang 0.15 / 0.20; hất cuộn 0.63 / 0.54; kéo lên 0.85 / 0.69; đỗ 0.15 / 0.20. Ảnh chụp lúc đốt mạnh: gốc lõi nằm khuất trong miệng ống
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006, 015 và 008
- **Severity**: LOW (thêm mới)
- **Category**: Missed opportunities
- **Depends on**: 008 (dùng `thr`, `flameLen` và `drawFlame` bản mới)
- **Estimated scope**: `assets/js/rocket.js` (~15 dòng), `assets/css/refinements.css` (2 dòng), `index.html` (`?v=`)

## Problem

Bản cũ của plan này cho tên lửa "thoát khỏi khí quyển" khi đi từ phần mở đầu sang phần quả cầu. Đo trên trang thật (9/11) thì cả `#hero` lẫn `#destinations` đều nền đen `rgb(0,0,0)` có sao, ảnh chỉ là các thẻ trôi qua. Không có ranh giới "mặt đất / vũ trụ" nào để kể chuyện, nên bản đó đã bị bỏ.

Vấn đề còn lại thì có thật: trên nền đen, lửa là thứ sáng nhất trên tàu mà không hề toả sáng ra xung quanh. Khi động cơ đốt mạnh (plan 008), lửa chỉ dài ra; gốc lửa không nóng trắng lên và không có ánh sáng hắt quanh đuôi. Trên nền đen, quầng sáng là tín hiệu "đang đốt mạnh" dễ thấy nhất.

## Target

- **Lõi nóng** (phần tử mới): elip trắng xanh ở gốc lửa, co giãn cùng lửa. Opacity `0.15 + 0.85·thr`: lúc bay trôi chỉ hơi sáng, lúc đốt mạnh trắng rõ.
- **Quầng sáng** (phần tử mới): vùng sáng ấm tròn quanh miệng ống. Opacity `0.2 + 0.6·thr`.
- **Luồng lửa loe**: khi đốt mạnh, lửa rộng thêm tới 25%: hệ số rộng `(0.85 + 0.15·flameLen)·(1 + 0.25·thr)`.
- Lõi và quầng tắt cùng lửa (`flameLen < 0.05`: opacity 0).
- Mọi phần tử mới chỉ đổi `transform` và `opacity`. Không dùng blend mode, filter hay blur.
- Bóng (`.cc-rocket-shadow`) giữ nguyên.

## Hình học (khung 512, xem `plans/015-new-ship.md`)

- Miệng ống phụt: `(256, 490)`.
- Ảnh lửa: left 192.43, top 488.45, rộng 128.33, cao 395.89 (đặt trong `build()`, rocket.js:372-376), co giãn từ mép trên (`transform-origin: 50% 0`).
- Lõi nóng: rộng 70, cao 160, mép trên trùng mép trên của lửa: `left = 256.6 − 35 = 221.6`, `top = 488.45`.
- Quầng sáng: tròn 300, tâm ở miệng ống: `left = 256 − 150 = 106`, `top = 490 − 150 = 340`.

## Repo conventions to follow

- Mọi phần tử con của tên lửa bay nằm trong `.cc-rocket-fade` (đơn vị khung 512), nên tự xoay, co giãn và mờ đi cùng thân khi mở thẻ quốc gia.
- Thứ tự lớp trong `.cc-rocket-fade` hiện tại: bóng → lửa → thân. Quầng sáng chèn **trước** lửa, lõi nóng chèn **ngay sau** lửa (trước thân, để mép ống che gốc lõi).

## Steps

1. `build()`: đổi chuỗi `els.fly.innerHTML` thành (thêm hai thẻ `<i>`):
   ```js
   els.fly.innerHTML = '<div class="cc-rocket-fade"><img class="cc-rocket-shadow" src="' + PIC.src + '" alt="" decoding="async">' +
     '<i class="cc-rocket-glow"></i>' +
     '<img class="cc-rocket-flame" src="' + FLAME.src + '" alt="" decoding="async">' +
     '<i class="cc-rocket-core"></i>' +
     '<img class="cc-rocket-body" src="' + PIC.src + '" alt="" decoding="async"></div>';
   ```
   và ngay dưới dòng `els.flame = ...` thêm
   `els.glow = els.fly.querySelector('.cc-rocket-glow'); els.core = els.fly.querySelector('.cc-rocket-core');`.
2. CSS (`assets/css/refinements.css`, ngay sau dòng `.cc-rocket .cc-rocket-flame {...}`):
   ```css
   .cc-rocket .cc-rocket-glow { position: absolute; left: 106px; top: 340px; width: 300px; height: 300px; border-radius: 50%; opacity: 0; will-change: opacity; background: radial-gradient(circle, rgba(255,190,110,.55) 0%, rgba(255,150,70,.18) 40%, rgba(255,150,70,0) 70%); }
   .cc-rocket .cc-rocket-core { position: absolute; left: 221.6px; top: 488.45px; width: 70px; height: 160px; opacity: 0; transform-origin: 50% 0; will-change: transform, opacity; background: radial-gradient(ellipse at 50% 0%, rgba(234,244,255,.95) 0%, rgba(200,225,255,.45) 35%, rgba(200,225,255,0) 70%); }
   ```
3. `drawFlame` (bản của 008):
   - ngay **trước** dòng `els.flame.style.opacity = ...`, thêm (để lõi và quầng cũng tắt khi lửa tắt):
     ```js
     /* hotter and brighter the harder it burns */
     var lit = flameLen < 0.05 ? 0 : 1;
     els.core.style.opacity = (lit * (0.15 + 0.85 * thr)).toFixed(3);
     els.glow.style.opacity = (lit * (0.2 + 0.6 * thr)).toFixed(3);
     ```
   - đổi dòng transform cuối hàm thành
     ```js
     var wide = (0.85 + 0.15 * flameLen) * (1 + 0.25 * thr);
     els.flame.style.transform = 'scale(' + wide.toFixed(3) + ',' + flameLen.toFixed(3) + ')';
     els.core.style.transform = 'scale(' + (1 + 0.25 * thr).toFixed(3) + ',' + flameLen.toFixed(3) + ')';
     ```
4. `index.html:77`: tăng `?v=`.

## Boundaries

- KHÔNG dùng `mix-blend-mode`, `filter` hay `backdrop-filter` cho quầng sáng hay lõi.
- KHÔNG đổi màu nền trang, bóng, hay thêm phần tử ngoài tên lửa.
- KHÔNG đổi ảnh lửa hay vị trí/cỡ của nó trong `build()`.
- Nếu `flameLen` chưa tồn tại (plan 008 chưa xong) thì DỪNG.

## Verification

- **Mechanical**: `node --check`; `npm run build`; console sạch.
- **Feel check**:
  - Bay ngang, cuộn đều: quầng sáng rất nhẹ, gần như không thấy.
  - Hất cuộn, và lúc kéo lên trong cú lượn: gốc lửa trắng lên, quầng ấm hiện quanh đuôi, lửa loe rộng hơn; rồi tất cả dịu lại cùng lửa.
  - Gốc lõi nóng nằm khuất trong miệng ống (mép ống che), không lòi lên trên thân.
  - Lúc đỗ cạnh quả cầu: quầng sáng nhẹ, không chói hơn đoạn chữ "Let curiosity lead the way." bên cạnh.
  - Mở thẻ quốc gia: quầng sáng và lõi mờ đi cùng tên lửa.
  - DevTools → Performance: không có Paint lớn mỗi frame từ quầng sáng (chỉ đổi opacity).
- **Done when**: nhìn quầng sáng và gốc lửa là biết động cơ đang đốt mạnh hay đang trôi, và lúc đỗ không làm phân tâm.
