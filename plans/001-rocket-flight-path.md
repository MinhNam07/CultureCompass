# 001 — Làm lại đường bay tên lửa trên homepage: bay ngang giữa màn hình, bổ nhào, lộn ngược, đỗ

- **Status**: DONE — chờ Henry xem trên Chrome + Safari
- **Commit**: de08819 (code tên lửa chưa commit; plan viết trên working tree ngày 8/11/2026 02:20)
- **Severity**: HIGH
- **Category**: Purpose & frequency · Easing & duration · Physicality · Missed opportunity (signature move)
- **Estimated scope**: 2 file (`assets/js/rocket.js` viết lại phần đường bay ~200 dòng, `assets/css/refinements.css` ~10 dòng)

Skill dùng để viết plan: `design-taste-frontend` (`.claude/skills/design-taste-frontend/references/motion.md`) và
`improve-animations` (`AUDIT.md`, `PLAN-TEMPLATE.md`). Người thực hiện nên chạy thêm `impeccable` (critique/review)
và `review-animations` trên diff trước khi báo xong.

## Bối cảnh (đọc trước)

CultureCompass, homepage `index.html`. Tên lửa là "signature move" của trang: nó rời logo ở header, bay qua phần mở
đầu (`#hero`, ảnh văn hoá trôi phải → trái theo scroll, sân khấu sticky, cao ~7.380px ở 1440×900) rồi đỗ cạnh quả
địa cầu trong `#destinations` (iframe `globe.html?embed=1`, địa cầu 3D bên trái, cột chữ "Let curiosity lead the way."
bên phải). Mọi thứ đã có trong `assets/js/rocket.js` (bản 1, cùng ngày). Plan này thay phần **đường bay** của bản 1.

Tài sản đã có, không cần làm lại:
- `assets/img/brand/cc-rocket.png` — tên lửa trắng đỏ của Gemini, nền trong suốt, 1024×1024, mũi chếch 45° (Đông Bắc),
  tâm ảnh ≈ tâm tên lửa. Hằng số đã đo, đã nằm trong `rocket.js`:
  `PIC = { side: 1024, len: 1316.6, width: 0.481, nose: 45 }` (len = dài mũi→lửa theo px ảnh; width = bề ngang khi dựng
  đứng / chiều dài). Bản gốc 2048px: `assets/img/brand/src/cc-rocket-red-master.png`.
- `assets/img/brand/cc-logo-no-rocket-{128,256,1024}.png` — logo đã bỏ tên lửa (header dùng khi JS chạy).
- Iframe gửi `postMessage` `{ type: "culturecompass-rocket", globe: {x,y,r}, textLeft, hover, hud }` (toạ độ trong iframe)
  từ `components/3d-globe-demo.tsx`. **Phải chạy `npm run build` một lần** để bundle `assets/globe/globe.js` có đoạn này;
  trước đó tên lửa dùng vị trí địa cầu đoán.

## Problem

Henry xem bản 1 trên Chrome 1440 và phản hồi (8/11, 02:17): "bị che", "ở chỗ không đẹp, phải căn giữa màn hình",
"tại sao đoạn kia tên lửa lại lộn một vòng", "bay ngang … nhưng khi kết thúc section đầu tiên thì bay thẳng xuống rồi
lộn ngược thẳng lại lên". Nguyên nhân trong code hiện tại:

1. **Bị header che (và làm mờ).** Tên lửa chỉ nằm trên header khi còn nhỏ:
   ```js
   // assets/js/rocket.js:237 — current
   els.fly.classList.toggle('is-over-header', s < m.sA * 0.5 && cur.len < 60);
   ```
   Khi đã to mà vẫn ở dải header (đầu đoạn bay ngang), nó nằm dưới header (`.cc-header` z-index 40, có
   `backdrop-filter: blur(18px)` trên home) → bị cắt và nhoè.
2. **Đường bay sát mép trên, không cân.** Đoạn bay ngang ở `y = headerBottom + max(0.32·L, 0.16·vh)` (≈200px ở 900px
   cao) rồi một Bézier lớn quẹo ra mép phải (`x` tới 0,9 vw) và quay về. Tên lửa lúc nào cũng lệch lên trên/ra mép.
3. **"Lộn một vòng" vô cớ** đến từ ba chỗ cộng lại:
   ```js
   // rocket.js:142-146 — vòng lượn tự động mỗi 7 giây, quay mũi ±22°
   var q = (tsec % CFG.loop.every) / CFG.loop.duration;
   if (!pointing && q < 1) { … head += 22 * Math.sin(a); }
   // rocket.js:172 — nắn mũi về 0° bằng đường ngắn nhất, có lúc quay ngược chiều đang bay
   if (pb > 0.72) h = lerpAng(h, 0, easeIO((pb - 0.72) / 0.28));
   // rocket.js:~228 — nghiêng theo độ trễ, tới ±12°
   head += clamp((t.y - cur.y) * 0.08, -12, 12);
   ```
4. **Độ trễ 16%/khung** (`CFG.follow`) làm tên lửa lê lết sau thanh cuộn rồi trượt tiếp khi đã dừng tay — cảm giác
   "lởm". `motion.md` §2: scroll-linked motion khoá vào thanh cuộn hoặc làm mượt 0,1–0,3 s, không hơn.
5. Ảnh cũ 136px phóng lên ~420px (đã thay bằng ảnh 1024px — xong, không thuộc plan này).

## Target

Đường bay mới, đúng ý Henry: **bay ngang ngược chiều ảnh ngay giữa màn hình → hết phần mở đầu thì bổ nhào thẳng
xuống → lộn ngược (mũi lên) → bay thẳng lên lại chính giữa màn hình, đỗ cạnh quả địa cầu.** Một chuyển động có chủ ý
duy nhất (cú lộn khi hạ cánh); không có vòng lượn ngẫu nhiên nào khác.

Toạ độ màn hình (fixed layer). `vw`, `vh` = viewport; `L` = chiều dài tên lửa khi bay (bằng chiều dài lúc đỗ, xem
dưới); `S = (Sx, SyDoc)` = điểm đỗ (toạ độ trang). Heading: 0° = mũi thẳng lên, tăng theo chiều kim đồng hồ.

| Pha | Khoảng scroll | Vị trí | Mũi (heading) | Cỡ |
| --- | --- | --- | --- | --- |
| 0. Bay vòng logo | `scrollY = 0` | quỹ đạo logo (giữ nguyên code bản 1) | theo tiếp tuyến quỹ đạo | ~5px |
| 1. Cất cánh | `0 → s1`, `s1 = 0.06·heroRun` | Bézier từ điểm hiện tại trên quỹ đạo logo tới `P1 = (0.12·vw, 0.5·vh)`; điểm điều khiển `c1 = P0 + (0.06·vw, 0.10·vh)`, `c2 = P1 − (0.10·vw, 0)` | từ heading quỹ đạo → 90° (Đông) | 5px → `L`, `ease-out` cubic trên tiến độ pha |
| 2. Bay ngang | `s1 → s2`, `s2 = min(heroRun, sLand − 0.9·vh)` | đường thẳng `y = 0.5·vh`, `x` từ `0.12·vw` → `Sx − rTurn` (`rTurn = 0.10·vh`), tuyến tính theo scroll | 90° cố định, ±1,5° rung nhẹ | `L` |
| 3. Bổ nhào | `s2 → s3`, `s3 = s2 + 0.40·(sLand − s2)` | cung ¼ đường tròn bán kính `rTurn` (tâm `(Sx − rTurn, 0.5·vh + rTurn)`) rồi thẳng xuống tại `x = Sx` tới `y = 0.74·vh` | 90° → 180° (theo tiếp tuyến cung), rồi 180° | `L` |
| 4. Lộn ngược | `s3 → s4`, `s4 = s2 + 0.65·(sLand − s2)` | đứng gần yên tại `x = Sx`, `y` 0.74·vh → 0.76·vh (quán tính) | 180° → 0° **giảm dần qua 90°** (mũi quét sang phải, xa quả địa cầu), `ease-in-out` quart `(0.76, 0, 0.24, 1)` | `L` |
| 5. Bay lên đỗ | `s4 → sLand`, `sLand = SyDoc − 0.5·vh` | thẳng lên tại `x = Sx`, `y` 0.76·vh → 0.5·vh, `ease-out` `(0.22, 1, 0.36, 1)` | 0° | `L` |
| 6. Đỗ | `scrollY ≥ sLand` | gắn vào trang: `(Sx, SyDoc − scrollY)` + nhấp nhô | 0° ± lắc nhẹ; chỉ hướng cờ khi rê chuột | `L` |

Ghi chú tính toán:
- Lúc `scrollY = sLand`, điểm đỗ nằm đúng giữa màn hình theo chiều dọc (`0.5·vh`), nên pha 5 kết thúc liền mạch với
  pha 6. Nếu `sLand − s2 < 0.6·vh` thì đặt `s2 = sLand − 0.6·vh`.
- Bay ngang có `x` tăng (trái → phải) trong khi ảnh hero trôi phải → trái: đúng "ngược chiều".
- Pha 3–5 diễn ra khi `#destinations` đang trượt vào: tên lửa bổ nhào trong lúc địa cầu đi lên, lộn, rồi gặp địa cầu ở
  giữa màn hình.

**Điểm đỗ** (giữ công thức bản 1 trong `measure()`, chỉ đổi `PIC.width` đã cập nhật):
`L = 1.05·D`, thu lại cho vừa khoảng trống giữa mép phải địa cầu và `textLeft − 16px` nếu `fitGap: true`, tối thiểu
`0.6·D`; `Sx` = giữa khoảng trống đó; `SyDoc` = tâm địa cầu (toạ độ trang). Với 1440×900 và `PIC.width = 0.481` ra
khoảng `L ≈ 0.8·D ≈ 330px`.

**Làm mượt:** bỏ `follow: 0.16`. Vị trí và mũi theo đích với hằng số thời gian 120 ms:
`k = 1 − Math.exp(−dt / 120)`. Riêng pha 0 (bay vòng logo) và pha 6 (nhấp nhô) vẽ thẳng, không làm mượt.

**Bỏ hẳn:** vòng lượn 7 giây (`CFG.loop` và đoạn `rocket.js:142-146`); `lerpAng(h, 0, …)` của bản 1 (thay bằng pha 4
có chiều quay cố định); nghiêng theo độ trễ ±12°.

**Giữ, nhỏ lại:** nhấp nhô ở pha 6 `±0.012·D`, chu kỳ 3,2 s; lắc `±2°`, lệch pha 1 rad. Khi trang cuộn qua lúc đang
đỗ: nghiêng `clamp(vScroll · 0.02, −6, 6)` độ, `vScroll` = px/khung của `scrollY` đã làm mượt 120 ms.

**Lớp (z-index):** `.cc-rocket` nằm **trên** header (`z-index: 41`) bất cứ khi nào hình của nó chạm dải header:
`cur.y − 0.6·cur.len < headerBottom`; còn lại `z-index: 39`. Không còn điều kiện `cur.len < 60`.

**Bóng:** thay quầng amber mờ bằng bóng đổ gọn, để hình nét:
```css
/* target — assets/css/refinements.css */
.cc-rocket img { display:block; width:100%; height:100%;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, .45)); }
```

**Nút "Skip to destinations" / "Explore destinations" / "Find your first destination":** giữ cơ chế `force` của bản 1
(bay thẳng tới điểm đỗ trong lúc trang cuộn mượt), nhưng mũi theo vector vận tốc và tới nơi thì chạy pha 4 rút gọn
(lộn 180° → 0° trong 420 ms, quart in-out) nếu nó đang chúc xuống.

**Điện thoại (`vw ≤ 760`):** pha 1–3 như trên với `L = min(0.45·vw, L)`; ở pha 3 tên lửa mờ dần (opacity 1 → 0 trong
nửa sau pha 3) rồi ẩn; không có pha 4–6.

**Giảm chuyển động:** giữ như bản 1 (không có tên lửa riêng, logo nguyên vẹn).

## Repo conventions to follow

- Một vòng `requestAnimationFrame` duy nhất, chỉ `transform` + `opacity`; đo layout trong `measure()` (resize, load,
  fonts, tin nhắn iframe, `ResizeObserver` trên iframe), không đo trong frame. Mẫu: `assets/js/home.js` (`tick`,
  `layout`, `relayout`).
- Tham số chỉnh tay để trong `CFG` ở đầu `rocket.js` (Henry sẽ căn lại vị trí đỗ). Thêm vào `CFG`:
  `cruiseY: 0.5, cruiseStartX: 0.12, turnR: 0.10, diveTo: 0.74, takeoffEnd: 0.06, smoothMs: 120`.
- Easing dùng đúng các token của `motion.md` §4: `--ease-out (0.22,1,0.36,1)`, `--ease-in-out (0.76,0,0.24,1)`.
  Viết hàm cubic-bezier JS một lần (Newton/bisection) và dùng lại; không dùng `easeIO` tự chế cho pha 4–5.
- Comment đầu file mô tả đường bay bằng lời, như bản 1.

## Steps

1. Đọc `assets/js/rocket.js` hiện tại và plan `ke-hoach-motion-ten-lua-homepage.md` (bản 3) nếu có trong repo.
2. Thêm hàm `cubicBezier(x1,y1,x2,y2)` trả về `t → y`; tạo `EASE_OUT` và `EASE_IN_OUT` từ hai token trên.
3. Trong `measure()`: tính `s1, s2, s3, s4, sLand`, `rTurn`, `P1` theo bảng Target; xoá `pathB`, `m.sA`, `m.sB` cũ.
4. Viết lại `target(now)` thành 7 nhánh theo pha 0–6, trả `{x, y, len, head, op}`; heading pha 3 lấy từ tiếp tuyến cung
   (`90° + 90°·u`, `u` = tiến độ trên cung), pha 4 nội suy **tuyến tính trên số đo độ** `180 → 0` (không qua
   `lerpAng`), để luôn quay qua 90°.
5. Xoá vòng lượn tự động và nghiêng ±12°; thay `attached()` bằng bản chỉ có nhấp nhô ±0.012·D, lắc ±2°, chỉ hướng cờ.
6. Thay làm mượt 16%/khung bằng `k = 1 − exp(−dt/120)`; mũi làm mượt bằng `lerpAng(cur.head, target, k)` **trừ pha 4**
   (gán thẳng để không đi đường ngắn ngược chiều).
7. Sửa điều kiện `is-over-header` như Target. Cập nhật CSS bóng như Target.
8. Pha `force` và điện thoại như Target.
9. Chạy `npm run build`.

## Boundaries

- Không đụng `assets/js/home.js`, phần hero ảnh, HUD, `components/ui/3d-globe.tsx`.
- Không đổi ảnh tên lửa hay logo (đã xong).
- Không thêm thư viện (không ScrollTrigger/MotionPath; GSAP core có sẵn nhưng không cần).
- Không làm giai đoạn 2 (bay vào nước khi chọn cờ).
- Nếu code khác với đoạn trích ở Problem (đã sửa sau commit stamp), DỪNG và báo lại.

## Verification

- **Mechanical**: `npm run build` sạch (typecheck, check-content, check-dist). Console không lỗi khi cuộn hết trang.
- **Feel check** (Chrome 1440×900, `npm run dev`, mở `localhost:8765/index.html`):
  - Ở đầu trang: tên lửa trắng đỏ bay vòng logo, đi sau ngôi sao ở nửa trên. Không có tên lửa thứ hai.
  - Cuộn chậm: tên lửa rời logo, **không bao giờ bị header che hay làm mờ**, tới giữa màn hình theo chiều dọc rồi bay
    ngang sang phải, ngược chiều ảnh. Dừng tay thì tên lửa dừng trong ≤ 0,2 s, không trượt tiếp.
  - Hết phần ảnh: mũi cong xuống, bổ nhào thẳng, **lộn đúng một lần** (mũi quét qua phía phải, xa địa cầu), bay thẳng
    lên và đứng ở giữa màn hình cạnh địa cầu, không đè chữ.
  - Đứng yên cạnh địa cầu ≥ 30 giây: chỉ nhấp nhô nhẹ, **không có vòng lượn hay lộn nào**.
  - Rê chuột lên cờ Việt Nam: mũi quay về phía cờ trong ~250 ms; rời chuột thì về thẳng đứng.
  - Cuộn ngược lên tận đầu: tên lửa đi lại đúng đường (lộn ngược chiều), về chui vào logo.
  - Bấm "Skip to destinations" từ đầu trang: tên lửa bay thẳng tới, tới nơi thì dựng mũi lên.
  - DevTools → Performance, cuộn hết trang: không có layout/recalc style trong frame của `rocket.js`; ≥ 55 fps.
  - Rendering → `prefers-reduced-motion: reduce`, tải lại: không có tên lửa riêng, logo đầy đủ.
  - Chạy `npm run dev` ở 390×844 (DevTools): tên lửa bay qua hero rồi mờ dần, không đỗ.
  - Nếu chạy được: `node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:8765/index.html`
    để quay phim cả trang và xem từng khung.
- **Done when**: tất cả mục feel check đạt, Henry xem trên Chrome và Safari.
