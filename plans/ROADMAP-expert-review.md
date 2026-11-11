# Roadmap: sửa theo góp ý chuyên gia (10/11/2026)

16 góp ý (#1–#16) cộng 1 lỗi t tự thấy trong ảnh chụp (#17). Đã đối chiếu với code ngày 10/11.
Chia 4 đợt: lỗi rõ ràng trước, rồi giao diện trang đọc, rồi motion và game, cuối cùng là thử nghiệm tên lửa pixel.

## Đánh giá chung

- **Đồng ý gần hết.** Có 3 lỗi thật (#1, #12, #17), sửa nhanh được.
- **Ý lớn nhất là bảng màu.** "Xanh neon dị tật" (#7) và "light/dark mode" (#10) thực chất là cùng một việc: làm lại hệ màu. Màu cyan `--cyan: #5FD8E8` trong `night.css` đang là màu hành động của toàn site (nút, link, game, HUD quả cầu), nên đổi nó là đổi cả site. Phải làm hệ màu trước, rồi mới chỉnh từng trang.
- **Nên làm khác ý anh ấy một chút ở 2 chỗ:**
  - #9 (hiện dần khi cuộn tới): nên hiện **một lần**, không lặp lại mỗi lần cuộn lên xuống, vì lặp lại thì đọc rất mệt. Hiện theo từng khối, không theo từng đoạn văn. `explore.js:477` đã ghi lý do cũ là "24 lần hiện trên một trang thành nhiễu".
  - #6 (ẩn thanh cuộn): ẩn hẳn ở trang chủ (trang kể chuyện bằng cuộn) và trong game. Ở các trang đọc dài thì làm thanh cuộn mảnh, cùng màu nền, chứ không bỏ hẳn, vì người dùng desktop cần biết trang còn dài bao nhiêu.
- **Tên lửa pixel (#4) là thử nghiệm, chưa phải quyết định.** Làm prototype rồi so với tàu hiện tại (plan 015) rồi mới chọn.

## Đợt 1: Lỗi rõ ràng (nhỏ, làm ngay) — DONE 10/11, chưa commit

Đã làm: #1 (keyframe riêng `gx-appear`, căn giữa bằng margin), #17 (token theme), #12 (tự cuộn tới điểm vừa mở, nút "Next stop", số nhỏ lại trên điện thoại; bỏ ý hai cột), #3 (`clearWords()` trong `rocket.js`: lúc cất cánh bay cao trên tiêu đề, ở dòng kết thì dạt sang phải chữ; điện thoại thì luôn bay phía trên chữ), #6 (chỉ ẩn ở trang chủ, trang khác để thanh mảnh, game cũng để thanh mảnh vì có nội dung bên dưới).
Chưa xem bằng mắt: animation của hộp thoại và đường bay tên lửa (trình duyệt dùng để kiểm bị ẩn nên chỉ đo được vị trí).

**Vòng 2 (10/11, sau khi Henry xem):**
- Tên lửa: bỏ luật né tiêu đề đầu trang (giữ tàu cao làm nó kẹt sát header rồi rơi mạnh, nhất là màn hình thấp). Chỉ còn né dòng kết.
- Quả địa cầu "mất" là do worktree chưa `npm run build` (`assets/globe/` không nằm trong git), không phải lỗi code.
- Hộp thoại game kiểu RPG: khung mở từ một vạch ngang (clip-path, 220ms), thẻ tên, chữ gõ dần (~55 ký tự/giây, tối đa 1.1s), nút hiện sau. Bấm E hoặc Continue khi đang gõ thì hiện hết chữ. Đóng thì mờ đi 120ms. Giảm chuyển động: chỉ mờ dần, không gõ chữ.
- Sơ đồ Văn Miếu vẽ lại (`impeccable`): bản vẽ mặt bằng nét ngà (tường kép, cổng ba lối, cây, Khuê Văn Các có cửa sổ tròn, giếng, 82 bia, các điện, lầu chuông/trống); số chọn đổi thành con dấu vuông màu son trên một hàng, có sợi chỉ xuống vị trí; sân đang chọn sáng vàng. Điện thoại: sơ đồ vuốt ngang, tự cuộn tới điểm đang chọn.
- Tên lửa quay đầu khi cuộn ngược (Henry yêu cầu): cuộn lên nhanh hơn 1.5px/frame thì tàu xoay 180° qua phía dưới (mũi chúc xuống; Henry chọn, thuận mắt hơn qua phía trên) trong 520ms và bay mũi trước về logo; cuộn xuống thì xoay lại. Giữ hướng cho tới khi về hẳn logo. `CFG.reverse` trong `rocket.js`.

### #1 Hộp thoại NPC trượt từ phải sang trái — ĐÃ TÌM RA NGUYÊN NHÂN
- `game.css:58–61`: `.gx-dialog` căn giữa bằng `left: 50%; transform: translateX(-50%)`, nhưng lại chạy `animation: cc-rise`. Keyframe `cc-rise` (`cc.css:627`) ghi đè `transform` bằng `translateY(10px)`, nên trong lúc chạy hộp mất `translateX(-50%)`, lệch sang phải nửa bề rộng, xong mới nhảy về giữa. Vì vậy trông như bay từ phải sang.
- Sửa: căn giữa bằng `inset-inline: 0; margin-inline: auto` (hoặc thuộc tính `translate`), để `transform` cho animation dùng riêng. Hiệu ứng mới: hiện tại chỗ, mờ sang rõ, nhích lên 8px và scale từ .98, khoảng 220ms ease-out. Đóng thì nhanh hơn (150ms).
- Kiểm tra cùng lúc `.gx-toast` và `.gx-panel-in`, xem có bị cùng lỗi không.
- Skill: `animate`.

### #17 Thẻ nguồn (Sources) không đọc được (trang About)
- `ex-pages.css:298`: `.src-item` vẫn dùng nền giấy sáng `rgb(251 243 228 / .75)` từ giao diện cũ, còn chữ đã đổi sang màu sáng của theme đêm, nên chữ sáng nằm trên nền sáng. `night.css` chưa ghi đè.
- Sửa: dùng token `--color-surface` và `--line`. Làm xong #10 thì tự đúng ở cả hai chế độ sáng/tối.

### #12 Sơ đồ 5 sân Văn Miếu: bấm số không xem được hết
- `explore.js:261–297` và `read.css:224–248`: bấm số trên sơ đồ thì mở mục tương ứng trong danh sách **bên dưới** sơ đồ. Trên điện thoại, đoạn chữ vừa mở nằm ngoài màn hình nên người dùng không thấy gì thay đổi.
- Sửa:
  - Desktop: hai cột, sơ đồ dính (sticky) bên trái, chữ bên phải.
  - Điện thoại: bấm số thì cuộn nhẹ tới đoạn vừa mở (`CC.motion.scrollTo`), hoặc hiện ngay dưới sơ đồ một ô chữ thay đổi theo số đang chọn. Thêm nút trước/sau để đi lần lượt 5 điểm.
- Khi làm, kiểm tra luôn xem khung chứa có cắt mất đáy nội dung không (ảnh chụp có dấu hiệu bị cắt).

### #3 Tên lửa che tiêu đề trang chủ
- `rocket.js` không có đoạn nào tránh chữ. Đường bay và chỗ đỗ đi xuyên qua "Every place has a story".
- Sửa (chọn 1, ưu tiên a):
  - a. Đo khung của tiêu đề và nút bằng `getBoundingClientRect`, coi đó là vùng cấm. Điểm đỗ và điểm kiểm soát của đường bay đẩy ra khỏi vùng đó.
  - b. Đặt chữ nằm trên tên lửa (z-index), cho tên lửa bay sau chữ. Rẻ hơn nhưng nhìn kém khéo hơn.
- Xem chậm 0.25× ở 3 cỡ màn hình: 1440, 1100, 375.
- Skill: `animate`, `apple-design`.

### #6 Thanh cuộn
- Trang chủ và game: `scrollbar-width: none` cộng `::-webkit-scrollbar { display: none }`.
- Trang khác: thanh mảnh, màu `--line-strong` trên nền trang (`cc.css:71`, `explore.css:53`).

## Đợt 2: Hệ màu và trang đọc — trang đọc DONE 10/11, hệ màu HOÃN, chưa commit

Đã làm:
- #8: bỏ thanh Play/Read (`core.js`, div `#cc-subnav` trên 4 trang). Bìa trang Vietnam có thêm nút "Play in Hà Nội". Trang game vẫn có link "Read about Vietnam", trang bài viết vẫn có breadcrumb.
- #11: viết lại tiêu đề và câu của 27 thẻ kiến thức trong game (`explore.json`). Tiêu đề nói việc cần làm ("Don't stand chopsticks in the rice"). Nguồn và link "Read:" nằm riêng dưới một đường kẻ (`.gx-fact-foot`).
- #5: ảnh trang chủ to hơn khoảng 20%; ảnh dọc luôn lấy cỡ lớn. Chú thích 2 dòng: dòng 1 là trường mới `what` trong `heroGallery` (36 ảnh, lấy từ alt), dòng 2 là nơi chụp (rút còn 2 phần cuối, alt vẫn giữ đủ). `check-content.js` bắt buộc có `what`.
- #7 (phần trang bài viết): bỏ viên thuốc eyebrow, hàng 5 icon, nền sao và đường sóng. Thông tin gọn thành một dòng chữ. Nút chính "Walk through this moment" đặc, "Save" viền. Bài có ảnh (9/27) lấy chính ảnh đó làm nền đầu trang, có lớp tối và dòng ghi nguồn ảnh. Bài không có ảnh thì nền đêm trơn, hình minh họa vẫn ở dưới.

Hoãn (Henry chốt 10/11: "màu mè tính sau"): #10 light/dark mode và phần đổi màu cyan của #7. Bản thử light mode đã làm rồi gỡ ra; các file xem trước đã xóa 11/11.


### #10 Light mode và dark mode (làm trước mọi thứ khác trong đợt này)
- Hiện tại site chỉ có theme đêm: `night.css` ghi đè token của `cc.css` và token giấy của `explore.css`. Token giấy cũ vẫn còn, nên có nền để dựng lại chế độ sáng.
- Làm:
  - Gom màu về token trên `:root`.
  - Thêm `[data-theme="light"]` và `[data-theme="dark"]`. Mặc định theo hệ thống (`prefers-color-scheme`).
  - Thêm lựa chọn Sáng / Tối / Theo máy vào Settings có sẵn (`core.js:131`, `CC.settings`).
  - Đặt `data-theme` trước khi vẽ trang để không bị nháy màu.
- Phần cần chú ý: HUD quả cầu (`globe/styles.css`, iframe riêng) và game pixel. Hai phần này có thể giữ tối ở cả hai chế độ, vì đó là "không gian" và "màn hình game". Nên chốt trước khi làm.
- Rà lại các màu viết cứng (ví dụ `#08101C`, `rgb(11 18 32 / .96)` trong `game.css`).
- Skill: `impeccable` (colorize, harden).

### #7 Bỏ xanh neon, trang bài viết bớt "AI", mang không khí Văn Miếu
- **Màu:** thay cyan làm màu hành động chung bằng màu trung tính (trắng ngà / xám ở dark, mực đậm ở light) cộng một màu nhấn ấm, lấy từ son đỏ / vàng đã có (`--lacquer`, `--gold`). Header trong suốt giữ nguyên nếu nền nào cũng đọc được; không thì đổi sang xám như anh ấy gợi ý.
- **Bài viết theo địa điểm:** mỗi story có thể có nền riêng. Văn Miếu thì dùng ảnh Văn Miếu (Khuê Văn Các, bia tiến sĩ) phủ tối/mờ, hoặc họa tiết lấy từ kiến trúc (ngói, song cửa), thay cho nền sao chung. Cần ảnh có giấy phép (theo quy trình `tools/fetch-photos.sh` và `assets.json`).
- **Dấu hiệu "AI" cần bỏ** (hero bài "Visiting a temple…"):
  - Hàng meta 5 icon.
  - Viên thuốc (pill) màu xanh ở eyebrow.
  - Hai nút viền tròn giống hệt nhau.
  - Nền sao không liên quan tới nội dung.
- Chạy `impeccable critique` cho trang `story.html`, rồi `design-taste-frontend` cho phần hero.
- Skill: `impeccable` (critique, colorize, quieter), `design-taste-frontend`.

### #8 Thanh "Vietnam | Play Read" thừa
- `core.js:481–491` (`cc-subnav`). Đề xuất bỏ thanh riêng này. Đưa Play/Read thành hai lựa chọn trong hero của trang quốc gia, hoặc gộp vào nav chính khi đang ở trong Vietnam. Giữ được đường quay về "Vietnam" bằng breadcrumb nhỏ.

### #11 `impeccable clarify` cho các thẻ chữ
- Thẻ "The rules board" và các thẻ cùng loại trên trang đọc: chạy `impeccable clarify`. Mục tiêu: tiêu đề nói thẳng người đọc cần làm gì, câu ngắn hơn, nguồn và link "Read:" tách rõ khỏi nội dung.

### #5 Ảnh trang chủ to hơn, chú thích 2 dòng
- `home.js:45–47`: hiện chỉ có `.hero-photo-place` (tên nơi, xuống tới 3–4 dòng).
- Đổi:
  - Ảnh to hơn.
  - Chú thích tối đa 2 dòng (`line-clamp: 2`). Dòng 1 là ảnh nói về gì (ví dụ "Castells, tháp người"), dòng 2 là nơi chụp.
- "Detail thêm" t hiểu là thêm dòng nội dung này. Cần thêm trường mô tả ngắn cho từng ảnh trong dữ liệu.

## Đợt 3: Motion và game — DONE 10/11, chưa commit

Đã làm:
- #14: rà motion cả site. Không có `transition: all`, `ease-in` hay `scale(0)`; nút đã có hiệu ứng nhấn. Lỗi chính là 35 hiệu ứng hover có nhích/phóng to nhưng chưa giới hạn cho chuột, nên trên điện thoại chạm xong bị kẹt. Đã bọc chúng trong `@media (hover: hover) and (pointer: fine)`. Panel trong game (sổ tay, cách chơi): nền mờ dần vào 160ms, khung nhanh hơn (220ms). Giảm chuyển động thì chỉ còn mờ dần.
- #9: mọi khối `.rd-rise` trên trang Vietnam (68 khối) hiện một lần khi cuộn tới: nhích 12px trong 400ms. Các khối tới cùng lúc lệch nhau 50ms. Cuộn lên không chạy lại. Giảm chuyển động thì không chạy.
- #2: nút toàn màn hình trên thanh công cụ game và phím F. Esc đóng cửa sổ đang mở trước, rồi mới thoát toàn màn hình. Dùng Fullscreen API trên `.gx-frame`; nơi không có (iPhone) thì khung phủ kín cửa sổ và khóa cuộn trang. Hộp thoại và panel nằm trong khung nên vẫn hiện. Có chừa vùng tai thỏ/notch.
- #15: vòng la bàn chung `.cc-loader` cho game ("Setting out…") và quả cầu trang chủ ("Loading the globe…"). Chỉ hiện nếu tải lâu hơn 300ms. Vòng của quả cầu nằm cao hơn chỗ tên lửa chờ. Trang bài viết hiện ra ngay (dữ liệu nằm sẵn trong JS) nên chưa cần khung xương. Khi làm #4 có thể thay la bàn bằng tên lửa pixel.


### #9 Hiện dần khi cuộn tới
- Mở rộng `explore.js:477–500` (đang chỉ cho tiêu đề `.rd-rise`) ra các khối section và hình. Mỗi khối hiện một lần: nhích lên 12px, 400ms. Phần tử trong cùng một khối lệch nhau 40–60ms. Tôn trọng chế độ giảm chuyển động.
- Skill: `animate`, `choreograph`.

### #14 Motion cho UI nói chung
- Chạy `improve-animations` để rà cả site, ra danh sách theo mức ưu tiên (hover/press của nút, mở/đóng panel, đổi tab Play/Read, thẻ quốc gia). Gộp các phần đó vào đây thay vì làm lẻ tẻ.
- Skill: `improve-animations`, `find-animation-opportunities`, `emil-design-eng`.

### #2 Chế độ toàn màn hình cho game
- Nút "Toàn màn hình" trên thanh công cụ game, phím F, Esc để thoát. Dùng Fullscreen API trên khung game (`gx-frame`), canvas tự vẽ lại theo cỡ mới.
- iPhone Safari không hỗ trợ Fullscreen API cho phần tử thường, nên cần dự phòng: lớp CSS phủ kín màn hình (`position: fixed; inset: 0; 100dvh`) và khóa cuộn trang.
- Hộp thoại và panel phải vẫn nằm trong vùng toàn màn hình.
- Skill: `mobile-native`.

### #15 Animation lúc tải trang
- Hiện tại: chữ "Loading the story…" (`story.html:27`), quả cầu và game không có gì.
- Đề xuất:
  - Một loader nhỏ dùng chung: tên lửa pixel bay vòng hoặc la bàn quay, gắn với #4.
  - Chỉ hiện nếu tải lâu quá khoảng 300ms, để khỏi nháy.
  - Trang bài viết dùng khung xương (skeleton) giống bố cục thật.
- Làm sau #4 nếu loader dùng tên lửa pixel.

## Đợt 4: Tên lửa pixel — XONG 11/11, HENRY CHỌN TÀU PIXEL

Henry giao Claude tự làm cả tàu lẫn hiệu ứng. Chi tiết ở `plans/016-pixel-rocket.md`.

Đã làm:
- `.gitignore` có `.venv/`, `drafts/`, `out/` cho beanfx. beanfx đã cài: `.venv/` (numpy, pillow), kit nằm ở `drafts/pixel_rocket/kit/`.
- Tàu pixel 26×64 do Claude vẽ bằng code (`tools/pixel-rocket/ship.py`), không dùng Gemini. Dùng bảng màu game, viền `#3a3a50`.
- 4 sprite sheet beanfx (`tools/pixel-rocket/fx.py`): lửa (6 khung, lặp), đánh lửa (5), khói (6), tia RCS (4). Tất cả nằm trong `assets/img/brand/pixel/` (PNG + JSON).
- Chế độ xem thử `index.html?rocket=pixel` trong `rocket.js`:
  - Tàu, lửa và tia RCS vẽ chung một canvas nhỏ, xoay theo nấc 15° rồi phóng to.
  - Lửa: lúc mới bật chạy hết 5 khung đánh lửa. Lửa mồi ngắn dùng khung đánh lửa nhỏ. Khi đẩy mạnh dùng sheet lửa, cắt theo độ dài.
  - Khói thải: mỗi đốm là sheet khói, đổi khung theo tuổi, không phóng to dần.
  - Không có cờ thì trang chủ vẫn y như cũ.
- Đã chụp so sánh hai bản ở lúc cất cánh, lúc bay và lúc đỗ: đường bay giống nhau, không lỗi console.

Henry chọn tàu pixel (11/11):
- Tàu pixel là mặc định trên trang chủ. `index.html?rocket=classic` vẫn xem được tàu cũ để so.
- Bản pixel không tải ảnh lửa và thân tàu cũ nữa. Khi giảm chuyển động, tàu đứng yên cũng là tàu pixel, có lửa mồi nhỏ.
- Tàu nhỏ bay quanh logo vẫn là `ship-rocket-256.webp` (5px thì pixel không đọc được).
- Còn có thể làm: xóa hẳn code và ảnh tàu cũ khi không cần so nữa; bóng tàu pixel; #15 đổi la bàn thành tên lửa pixel.


### #4 Hướng tên lửa pixel art
- Lý do nên thử: game Explore đã là pixel art, nên tên lửa pixel làm site liền mạch hơn.
- Vấn đề chính: ảnh pixel xoay góc lẻ sẽ bị nhòe hoặc răng cưa. Cách xử lý thường dùng là vẽ sẵn 8 hoặc 16 hướng rồi chọn hướng gần nhất, hoặc xoay theo nấc 22.5°, kèm `image-rendering: pixelated`.
- Làm:
  - Tàu: pixel hóa tàu Gemini hiện tại (đã có `tools/pixelize.py`) rồi tự chỉnh tay, hoặc vẽ mới.
  - Lửa, khói, tia RCS: sprite sheet làm bằng beanfx (#16).
  - Gắn vào `rocket.js` sau một cờ bật/tắt để so sánh với tàu hiện tại.
- Chốt sau khi so 2 bản cạnh nhau.
- Skill: `gemini-asset-brief` (nếu vẽ tàu bằng Gemini), `animate`.

### #16 Plugin beanfx
- Đã đọc repo `baenv/beanfx` (MIT): một skill `/beanfx`. Viết hiệu ứng pixel bằng Python từ mô tả chữ hoặc ảnh mẫu, xuất sprite sheet PNG kèm JSON (kiểu Aseprite), có runtime JS cho canvas 2D (`loadFx`, `fx.update`, `fx.draw`).
- Hợp với: lửa và khói tên lửa pixel, loader (#15), hiệu ứng trong game (nhặt tem, chuyển cảnh).
- Cài (chạy trong terminal `claude`):
  ```
  /plugin marketplace add baenv/beanfx
  /plugin install beanfx@beanfx
  ```
- Yêu cầu: Python 3.10+ (máy đang có 3.14). Lần chạy đầu tạo `.venv/` trong project với numpy và pillow.
- Trước khi cài: thêm `.venv/`, `drafts/`, `out/` vào `.gitignore`.
- Chú ý: plugin tự viết rồi chạy file Python trên máy, nên xem lại file `.py` nó tạo ra trước khi chạy.

## Thứ tự và phụ thuộc

1. Đợt 1 làm song song được: #1, #17, #12, #3, #6.
2. #10 trước, rồi #7, #8, #11, #5. #17 tự hoàn chỉnh sau #10.
3. #14 (audit) trước #9, để motion theo cùng một hệ thời gian/easing. #2 độc lập.
4. #16 (cài beanfx), rồi #4, rồi #15.

## Cần chốt trước đợt 2
- Bỏ cyan khỏi **cả site**, hay chỉ ở trang đọc? (T đề xuất: cả site, giữ cyan nhỏ trong HUD quả cầu nếu muốn.)
- HUD quả cầu và game có đổi theo chế độ sáng không? (T đề xuất: luôn tối.)
