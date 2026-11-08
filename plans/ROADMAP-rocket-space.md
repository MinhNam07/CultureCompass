# Tên lửa du hành vũ trụ — kế hoạch tổng (008–014)

Cập nhật 9/11/2026. Gộp các plan 008–014 thành một lộ trình: thứ tự chạy, skill cần dùng, prompt dán vào là chạy được, và bạn cần xem gì sau mỗi bước. Chi tiết kỹ thuật (đoạn code, số dòng, công thức) nằm trong từng file plan; agent chạy plan sẽ đọc các file đó.

## Mục tiêu

Tên lửa ở trang chủ hiện bay đẹp nhưng chưa giống tàu vũ trụ: lửa dài theo tốc độ, mũi tự xoay mà không có lực nào, khi đỗ thì nhấp nhô như có trọng lực. Sau lộ trình này:

- động cơ chỉ đốt khi tăng tốc hoặc rẽ, có đánh lửa khi rời logo và tắt máy khi về;
- mũi xoay bằng các tia khí nhỏ ở khoang lái;
- khi đốt mạnh có vệt khói bị bỏ lại và động cơ sáng rực trên nền đen;
- khi đỗ, tàu giữ vị trí kiểu vũ trụ;
- trên điện thoại tàu bay vụt đi, ở chế độ giảm chuyển động vẫn có một tàu đứng yên;
- (tuỳ chọn) nền sao trôi nhẹ theo tàu.

## Trước khi bắt đầu

1. **Commit phần đang làm** (plan 003–006, tàu mới 015). `/improve-animations execute` làm trong worktree mới tạo từ commit gần nhất, nên không thấy thay đổi chưa commit. Trả `.claude/launch.json` về như cũ trước khi commit.
2. Chạy `npm run build` một lần trên Mac để iframe quả cầu được build và gửi vị trí cho tên lửa.
3. Server ở port 8765 và 8766 là của bạn; agent phải chạy trang thử ở port khác (`python3 tools/dev-server.py 8771`).

## Cách chạy mỗi plan

- **Cách A (khuyên dùng):** `/improve-animations execute plans/<file>.md`. Skill giao plan cho một agent làm trong worktree riêng, rồi tự review lại theo chuẩn `review-animations` và cho kết luận Approve/Block.
- **Cách B:** dán prompt của plan đó (bên dưới) vào một session mở trong repo này. Xong thì chạy `/review-animations` để review.

Mỗi plan làm xong mới chạy plan sau. Plan nào cũng tăng `?v=` của `rocket.js` trong `index.html` (hiện là `20261108-rocket11`): tăng tiếp, đừng ghi đè số của plan trước.

## Thứ tự và skill

| Bước | Plan | Cần làm trước | Skill thực hiện | Skill review |
| --- | --- | --- | --- | --- |
| 1 | [008 Lực đẩy theo gia tốc](008-rocket-thrust.md) | — | `animate` | `review-animations` |
| 2 | [010 Tia chỉnh hướng (RCS)](010-rocket-rcs.md) | — | `animate` | `review-animations` |
| 3 | [012 Giữ vị trí khi đỗ](012-rocket-station-keeping.md) | 010 | `apple-design` | `review-animations` |
| 4 | [009 Vệt khói](009-rocket-exhaust-trail.md) | 008 | `animation-performance` | `review-animations` |
| 5 | [011 Động cơ phát sáng](011-rocket-leaves-atmosphere.md) | 008 | `animate` | `review-animations` |
| 6 | [014 Điện thoại + giảm chuyển động](014-rocket-phone-and-reduced-motion.md) | — | `animate` + `mobile-native` | `review-animations` |
| 7 | [013 Nền sao trôi (tuỳ chọn)](013-starfield-parallax.md) | sau cùng | `animation-performance` | `review-animations` |

Vì sao các skill này:
- `animate`: dựng chuyển động mới theo đúng thứ tự quyết định (mục đích, thuộc tính, đường cong, cách ngắt).
- `apple-design`: chuyển động "trôi" và spring có cảm giác vật lý, hợp với giữ vị trí.
- `animation-performance`: nhiều phần tử chạy mỗi frame (vệt khói) hoặc chạy trong iframe (nền sao) dễ tụt frame.
- `mobile-native`: soát cảm giác trên điện thoại.
- `review-animations`: chấm lại theo chuẩn của Emil Kowalski sau mỗi bước.
- Khi gom nhiều hiệu ứng mà thấy rối mắt: `remove-animations` để bớt, `emil-design-eng` để soát độ tinh tế.

---

## Bước 1 — 008 Động cơ đốt theo gia tốc

**Làm gì:** lửa dài theo gia tốc (tăng tốc và rẽ) thay vì tốc độ. Lửa bùng lên khi tên lửa lớn dần lúc rời logo, tắt trước khi nó thu về logo. Đây là nền cho 009 và 011.

**Số đã đo trên trang thật** (khung 1100×800):

| Đoạn bay | Lực đẩy (0–1) |
| --- | --- |
| Bay ngang, cuộn đều | 0.01–0.05 (chỉ lửa mồi) |
| Bẻ xuống trong cú lượn | 0.35–0.58 |
| Bổ nhào | giảm về 0.17 |
| Kéo lên vào chỗ đỗ | 0.73–0.84 (mạnh nhất) |

```text
/animate Thực hiện plans/008-rocket-thrust.md trong repo CultureCompass (homepage rocket, assets/js/rocket.js).
Đọc hết plan trước. Làm đúng thứ tự Steps, giữ nguyên Boundaries. Nếu đoạn code trích trong plan không khớp code hiện tại thì DỪNG và báo lại, đừng tự đoán.
Kiểm: node --check assets/js/rocket.js; npm run build; mở trang chủ bằng python3 tools/dev-server.py ở một port trống (đừng tắt server ở 8765/8766); console sạch. Ghi flameLen mỗi frame bằng log tạm (xóa sau khi xong) và báo số theo mục "Số đo" của phần Verification: cuộn đều, hất cuộn, cú lượn (bẻ xuống / bổ nhào / kéo lên), cất cánh từ logo, quay về logo.
Tăng ?v= của rocket.js trong index.html. Không commit.
```

**Bạn xem:** quay màn hình, xem 0.25×. Rời logo: lửa mọc ra rồi bùng lên. Hất cuộn: lửa dài rồi thu lại từ từ. Cú lượn: lúc kéo lên lửa dài nhất. Về logo: lửa tắt trước khi tàu nhập vào.

## Bước 2 — 010 Tia chỉnh hướng ở khoang lái

**Làm gì:** khi mũi bắt đầu hoặc thôi xoay, một cổng trên mặt nón khoang lái (dưới hai cửa sổ tròn) phụt một tia khí trắng 160ms.

**Số đã đo:** bay ngang mũi xoay tối đa 12°/giây (không phụt); cú lượn tới 372°/giây (có phụt). Ngưỡng 70°/giây là đúng.

```text
/animate Thực hiện plans/010-rocket-rcs.md trong repo CultureCompass (assets/js/rocket.js, assets/css/refinements.css).
Đọc hết plan. Làm đúng Steps và Boundaries; tia dùng WAAPI, không dùng CSS keyframes, không tạo phần tử mới khi chạy. Nếu code trích không khớp thì DỪNG và báo.
Bước 1 của plan: kiểm gốc mỗi tia nằm đúng trên mép nón khoang lái, dưới hai cửa sổ tròn (tạm đặt opacity 1 lúc tên lửa đỗ, chụp màn hình phóng to). Lệch thì sửa số trong RCS theo công thức đổi toạ độ trong plan.
Kiểm: node --check; npm run build; console sạch; cuộn qua cú lượn và đếm số lần phụt mỗi bên; rê chuột qua các lá cờ khi tên lửa đỗ và xác nhận mỗi bên phụt tối đa một lần mỗi 180ms; chụp một khung có tia.
Tăng ?v=. Không commit.
```

**Bạn xem:** tia phụt ra từ mép khoang lái, hướng ra ngoài, không phụt vào thân. Bay thẳng thì không có tia. Rê chuột qua cờ: mỗi lần mũi quay có một tia ngắn.

## Bước 3 — 012 Giữ vị trí khi đỗ

**Làm gì:** bỏ nhấp nhô lên xuống. Tàu trôi rất chậm theo hai trục với hai nhịp khác nhau (9 giây và 7 giây), mũi lệch nhẹ ±1.5°, mỗi 4–7 giây phụt một tia RCS để chỉnh lại. Chỉ cờ dưới con trỏ giữ nguyên.

```text
/apple-design Thực hiện plans/012-rocket-station-keeping.md trong repo CultureCompass (assets/js/rocket.js).
Plan này dùng hàm rcs() của plan 010: nếu 010 chưa có thì bỏ bước tia chỉnh như plan ghi.
Đọc hết plan, làm đúng Steps và Boundaries. Việc chỉ mũi vào lá cờ dưới con trỏ phải giữ nguyên. Nếu code trích không khớp thì DỪNG và báo.
Kiểm: node --check; npm run build; console sạch; để tên lửa đỗ 30 giây và ghi lại biên độ x/y, góc mũi, số lần phụt tia (kỳ vọng mỗi 4–7 giây một lần, không phụt khi đang chỉ cờ).
Tăng ?v=. Không commit.
```

**Bạn xem:** nhìn 30 giây, không còn nhịp lên-xuống. Đọc đoạn "Let curiosity lead the way." bên cạnh mà mắt không bị kéo đi.

## Bước 4 — 009 Vệt khói bị bỏ lại

**Làm gì:** khi lực đẩy trên 0.08, các hạt khói ấm phụt ra gần đuôi lửa rồi đứng yên theo nền (trôi cùng ảnh trong phần mở đầu, đi lên cùng trang sau đó), tan sau khoảng 0.7 giây. Dùng 18 phần tử tái sử dụng, chỉ đổi transform/opacity.

```text
/animation-performance Thực hiện plans/009-rocket-exhaust-trail.md trong repo CultureCompass (assets/js/rocket.js, assets/css/refinements.css).
Cần plan 008 đã xong (biến thr và flameLen); thiếu thì DỪNG.
Đọc hết plan. Làm đúng Steps và Boundaries: pool 18 phần tử, chỉ đổi transform/opacity, không canvas, không filter/blur, một vòng rAF duy nhất, và vòng rAF phải dừng khi hết hạt và tên lửa đứng yên. Nếu code trích không khớp thì DỪNG và báo.
Kiểm: node --check; npm run build; console sạch; hất cuộn mạnh trong phần mở đầu và xác nhận hạt trôi cùng ảnh chứ không theo tên lửa; cuộn qua cú lượn và báo số hạt sống lớn nhất; DevTools Performance 3 giây không có Layout mỗi frame; xác nhận vòng rAF dừng khi tên lửa đứng yên và hết hạt.
Tăng ?v=. Không commit.
```

**Bạn xem:** cuộn đều thì không có khói. Hất cuộn và kéo lên trong cú lượn thì có vệt; hạt không bị tàu kéo theo.

## Bước 5 — 011 Động cơ phát sáng

**Làm gì:** khi đốt mạnh, gốc lửa trắng lên (lõi nóng), quanh đuôi có quầng ấm, lửa loe rộng thêm tới 25%. Lúc trôi chỉ hơi sáng.

Bản cũ của plan này ("thoát khỏi khí quyển") đã bỏ, vì phần mở đầu và phần quả cầu đều nền đen.

```text
/animate Thực hiện plans/011-rocket-leaves-atmosphere.md trong repo CultureCompass (assets/js/rocket.js, assets/css/refinements.css).
Cần plan 008 đã xong (thr, flameLen, drawFlame bản mới); thiếu thì DỪNG.
Đọc hết plan. Làm đúng Steps và Boundaries: không mix-blend-mode, filter hay backdrop-filter; chỉ đổi transform/opacity. Nếu code trích không khớp thì DỪNG và báo.
Kiểm: node --check; npm run build; console sạch; ghi opacity của lõi và quầng lúc bay ngang, lúc hất cuộn và lúc kéo lên trong cú lượn; chụp một khung lúc đốt mạnh; xác nhận gốc lõi nóng nằm khuất trong miệng ống.
Tăng ?v=. Không commit.
```

**Bạn xem:** đốt mạnh thì đuôi sáng rực, trôi thì dịu. Lúc đỗ quầng sáng không chói hơn chữ bên cạnh.

## Bước 6 — 014 Điện thoại và giảm chuyển động

**Làm gì:**
- **Điện thoại (≤ 760px):** hết phần mở đầu, tàu tăng tốc bay chếch lên 20° rồi ra khỏi mép phải, thay vì đứng yên mờ dần.
- **Giảm chuyển động:** một tàu đứng yên cạnh quả cầu (thân tàu + lửa mồi tĩnh), cuộn theo trang mà không cần JS; mở thẻ quốc gia thì mờ đi.

```text
/animate Thực hiện plans/014-rocket-phone-and-reduced-motion.md trong repo CultureCompass (assets/js/rocket.js, assets/css/refinements.css).
Đọc hết plan, làm đúng Steps và Boundaries: ở chế độ reduced motion không có requestAnimationFrame và không có transform nào đổi theo thời gian; đường bay trên máy tính giữ nguyên. Nếu code trích không khớp thì DỪNG và báo.
Kiểm: node --check; npm run build; console sạch.
Điện thoại (khung 375x812): cuộn hết phần mở đầu, báo toạ độ và opacity của tên lửa cho tới khi nó ra khỏi mép phải; cuộn ngược lên thì nó bay về đúng đường cũ.
Giảm chuyển động (CC.settings.set({reduceMotion:true}), làm xong trả lại giá trị cũ): tên lửa đứng yên đúng chỗ đỗ, đếm số lần rocket.js gọi rAF khi cuộn (phải bằng 0), mở thẻ quốc gia thì nó mờ đi; tắt chế độ này thì tên lửa bay trở lại.
Dùng thêm skill mobile-native để soát cảm giác trên điện thoại. Tăng ?v=. Không commit.
```

**Bạn xem:** trên điện thoại thật, tàu vụt đi chứ không đứng ì. Bật giảm chuyển động trong cài đặt của site: có tàu đứng yên, không có gì bay.

## Bước 7 — 013 Nền sao trôi (tuỳ chọn)

**Làm gì:** lớp sao trong iframe quả cầu trôi ngược chiều tàu, tối đa ±24px; khi đỗ thì trôi rất chậm. Chỉ làm nếu sau bước 1–6 vẫn thấy thiếu chiều sâu.

```text
/animation-performance Thực hiện plans/013-starfield-parallax.md trong repo CultureCompass (assets/js/rocket.js, components/3d-globe-demo.tsx, globe/styles.css).
Đọc hết plan, làm đúng Steps và Boundaries: tối đa 20 tin nhắn mỗi giây, chỉ gửi khi tên lửa đang đỗ hoặc đang lượn vào chỗ đỗ; luôn kiểm e.source và e.origin; biên độ không quá 24px; tôn trọng reducedMotion trong iframe. Nếu code trích không khớp thì DỪNG và báo.
Kiểm: npm run build:globe (có typecheck), rồi npm run build; console sạch ở cả trang chính và iframe; xác nhận vòng rAF trong iframe dừng khoảng 1 giây sau khi cuộn đi chỗ khác; không lộ mép đen ở cạnh khung sao.
Tăng ?v=. Không commit.
```

**Bạn xem:** lượn vào chỗ đỗ thì sao trượt nhẹ rồi lắng lại; không chóng mặt. Nếu chóng mặt, giảm biên độ xuống 12, đừng tăng.

---

## Sau mỗi bước

1. Đọc kết luận của `review-animations`: Block thì sửa trước khi đi tiếp.
2. Quay màn hình, xem 0.25× cạnh phần chữ. Vệt khói, tia RCS, quầng sáng và lập lòe cộng lại dễ rối mắt. Nếu rối, giảm biên độ trong `CFG`, đừng thêm hiệu ứng mới.
3. Ưng thì commit bước đó riêng (mỗi plan một commit), rồi mới chạy bước sau.
4. Đánh dấu plan là DONE trong `plans/README.md`.

## Đã soát (9/11)

- Mọi đoạn code trích trong 008–014 khớp code hiện tại; tên biến và hàm đều có thật; các plan không sửa chồng lên nhau.
- Gia tốc và tốc độ xoay đo trên trang thật; ngưỡng của 008 và 010 đặt theo số đo.
- Chưa kiểm: cảm giác thật (cần mắt người), và lúc chỉ chuột vào cờ (không giả lập được con trỏ trong iframe).
