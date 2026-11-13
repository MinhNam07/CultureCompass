# Explore mode – Checklist tới 20/11/2026

Ký hiệu: **[H]** Henry · **[G]** Gemini (Henry gửi prompt) · **[C]** Claude.
Đánh dấu `[x]` khi xong. Claude đọc file này để biết tiến độ.

## Tuần 1 · 27/10 – 2/11 · Nền tảng
- [x] [H] Tải **Modern Interiors Free v2.2** → `assets/game/vendor/limezu-interiors-free/` (27/10). ⚠️ Giấy phép bản free: **chỉ dùng phi thương mại**
- [x] [H] Tải **Ninja Adventure** → `assets/game/vendor/ninja-adventure/` (27/10, cả gói; đã thêm vào .gitignore, chỉ copy audio được chọn sang `assets/game/audio/`)
- [x] [H] Cài **Tiled** (đã tải 27/10 – nhớ kéo Tiled.app vào Applications) (mapeditor.org, miễn phí) – để chỉnh bản đồ Claude dựng sẵn
- [x] [C] ~~Chuyển `SERENE_VILLAGE_REVAMPED/` → `assets/game/vendor/serene-village/`~~ (đã chuyển 27/10), thêm credit CC BY vào `assets.json` + About
- [x] [C] ~~Phaser~~ (bị chặn tải) → engine canvas tự viết `assets/js/game/engine.js`; tạo `explore.html` (khung game nằm trong trang, giao diện CultureCompass)
- [x] [C] `tools/build-maps.js`: Tiled JSON → `.js` (chạy được từ `file://`), nối vào `npm run build`
- [x] [C] Nhân vật đi 4 hướng (WASD/mũi tên), va chạm, camera, kim la bàn chỉ mục tiêu
- [x] [C] Hệ thống hội thoại + 4 kiểu phản hồi + "hậu quả rồi chọn lại"
- [x] [C] Khu **Văn Miếu** (đã dùng luôn ảnh Gemini C1–C5), chạy nội dung sc03
- [x] [G] Nhóm **C** xong; **G (NPC)** cần vẽ lại kiểu chibi trong `gemini-prompts.md`
- [ ] [H] Chơi thử bản Văn Miếu, ghi nhận xét vào cuối file này

## Tuần 2 · 3 – 9/11 · Ba khu có sẵn nội dung
- [x] [C] `tools/pixelize.py`: bỏ nền hồng, dò lưới, thu nhỏ, ép bảng màu, thêm viền, cắt tile
- [x] [C] Xử lý ảnh Gemini nhóm C + G, thay tile tạm ở Văn Miếu
- [x] [G] Nhóm **A (đường phố)** (28/10)
- [x] [G] Nhóm **B (homestay)** bản hiện đại (29/10)
- [x] [G] Nhóm **D (phố cổ – Hồ Gươm)** (01/11)
- [x] [C] Khu **Homestay** (sc01 + sc02): phố + trong nhà, 6 tình huống (29/10)
- [x] [C] Khu **Phố cổ – Hồ Gươm** (sc04): phố cổ, ngõ nhỏ, đường ven hồ, Tháp Bút, cổng đền Ngọc Sơn, cầu Thê Húc (01/11)
- [x] [C] Mở fact khi: vào khu vực / bấm đồ vật / nói chuyện NPC. Mỗi fact link tới claim + nguồn
- [x] [C] Sổ tay hành trình + con dấu, lưu fact/câu nói vào My collection
- [x] [C] Bản đồ tổng quan Việt Nam (Natural Earth – góc nhìn Việt Nam, đủ Hoàng Sa – Trường Sa), Hội An & Đà Nẵng "Sắp có" → `explore.html` (01/11)
- [x] Nhạc: giữ 27 - Chill (Henry, 01/11) ~~Chọn 2–3 bản nhạc chill trong `assets/game/vendor/ninja-adventure/Audio/Musics/` (gợi ý nghe thử: 27 - Chill, 33 - Calm Village, 5 - Peaceful, 31 - Sunny, 12 - Temple), ghi tên file vào đây~~
- [ ] (không bắt buộc) [H] Tải âm thanh CC0 từ freesound.org → `assets/game/raw/audio/`: xe máy, còi xe, chuông/mõ chùa, tiếng chợ, bếp nướng xèo xèo, nồi nước sôi, chim hót, tiếng hồ nước. Ghi link từng file vào `assets/game/raw/audio/SOURCES.md`

## Tuần 3 · 10 – 16/11 · Hai khu mới
- [x] [C] Nghiên cứu + viết claims/sources cho **Chợ Đồng Xuân** (sc05) và **quán ăn vỉa hè** (sc06) (01/11)
- [x] [C] Viết tình huống + hội thoại NPC cho 2 khu mới
- [ ] [H] Kiểm tra fact mới, bỏ nhãn "Being verified" những cái đúng: 8 claim + 11 câu nói (Henry là người bản ngữ → tự duyệt câu nói được)
- [x] [G] Nhóm **E (chợ)** và **F (quán ăn)** (01/11, có cả E4 người bán ở chợ)
- [x] [C] Dựng 2 khu mới (01/11)
- [x] [C] Liên kết hai chiều: story đã đọc ↔ đánh dấu trong game; chơi xong → gợi ý story; 2 story mới (chợ, quán ăn) (01/11)
- [x] [C] Thay tab "Practise a moment" → "Explore", `scene.html` chuyển hướng (01/11)

## Tuần 4 · 17 – 20/11 · Hoàn thiện
- [x] [C] Danh sách "Đi tới…" (phím G), giảm chuyển động, focus bàn phím — đã chơi hết 5 khu chỉ bằng bàn phím (01/11)
- [ ] [H] Tự test toàn bộ 5 khu trên laptop (Chrome + Safari), ghi lỗi bên dưới
- [ ] [C] Sửa lỗi, chạy `npm run check`
- [x] [C] Cập nhật PRODUCT.md, DESIGN.md, README, About (credit đầy đủ) (01/11)
- [x] [C] `npm run zip` → `../CultureCompass-submission.zip` (bỏ footage gốc, raw, vendor, node_modules)
- [ ] [H] Đóng zip nộp bài

## Redesign 03/11 (Đêm Hà Nội)
- [x] [C] Nav chính: Explore · Passport · About · icon Settings. Thanh của nước: Play | Read (bỏ Themes, Phrasebook; `phrases.html` chuyển về game)
- [x] [C] `explore.html` = màn chọn map trong game (pin trên bản đồ pixel Hà Nội, danh sách moment, All places, chip Hội An/Đà Nẵng "soon"); vào place là chơi luôn, nút Map quay lại
- [x] [C] Bảng màu Đêm Hà Nội trong `assets/css/night.css`; hộp thoại khung pixel + cyan; trang Read nền đêm, thêm "Places in the game"
- [ ] [H] Chơi thử luồng mới trên Chrome + Safari, ghi lỗi bên dưới

## Sau 20/11
- [ ] Chủ đề "Hà Nội xưa" (khoảng 1960–1980): dùng ảnh trong `raw/ha-noi-xua/`, cần nguồn riêng cho từng fact
- [ ] Hội An, Đà Nẵng · chế độ tự tạo nhân vật · điều khiển cảm ứng trên điện thoại · chuẩn hóa cho nước khác

## Ghi chú / lỗi của Henry
- [x] 01/11: sổ tay không cuộn được → đã sửa (cuộn chuột + phím mũi tên)
- [x] 01/11: bồn cây vẽ đè lên cây bàng → đã sửa (sprite trong thư mục `tiles/` luôn nằm dưới đất)
- [x] 01/11: thêm fact địa danh: Tháp Bút, đền Ngọc Sơn, cầu Thê Húc, Hồ Hoàn Kiếm (phố cổ); Văn Miếu Môn 1070, Khuê Văn Các 1805 (Văn Miếu)

## Sửa map 14/11 (Henry chơi thử: map trống, tường Văn Miếu lỗi, nút Journal/Go to khó thấy)
- [x] [C] Văn Miếu dựng lại đủ 5 sân, tường có trụ, giếng Thiên Quang có bờ đá, 13 người mới + 14 fact (`tools/maps/draft-van-mieu.py`)
- [x] [C] Hệ thống hội thoại nhiều lượt (`talks` trong explore.json): câu tiếng Việt màu vàng, câu đã hỏi mờ đi
- [x] [C] Trong nhà homestay thành nhà ống thật (tường, bếp, bàn thờ, cầu thang, phòng khách); ngoài phố có hàng trà đá; thoại cô Lan + bà bán trà đá
- [x] [C] Chợ Đồng Xuân: trong chợ 30×22, 3 dãy sạp; 10 người bán hỏi được "Cái này là gì? / Bao nhiêu tiền? / Bớt chút?"; ngoài chợ có người bốc vác, xe hoa quả
- [x] [C] Phố cổ – Hồ Gươm: xuất phát gần hồ + biển chỉ đường; cổng Ngọc Sơn → Tháp Bút, Đài Nghiên → cầu Thê Húc → đền Ngọc Sơn; Tháp Rùa giữa hồ; người tập thể dục, đánh cờ, bán kem, học sinh hỏi tiếng Anh
- [x] [C] Quán ăn: thêm bàn khách, chậu rửa, bảng giá, xe giao hàng, thoại khách ăn
- [x] [C] Bỏ nút Journal + Go to…: góc trái: bản đồ tròn viền la bàn vàng có chữ N (M), dưới là các dòng nhiệm vụ hiện thẳng trên game; bản đồ tròn mở bản đồ lớn có ghim + danh sách (G), J mở sổ tay. Đã bỏ cột trái theo góp ý của Henry 14/11
- [ ] [H] Duyệt các câu tiếng Việt trong thoại mới (explore.json → `talks`) và giá trong thoại chợ
- [ ] [H] Chạy prompt nhóm I trong `docs/game/gemini-prompts.md` → mình thay sprite tự vẽ bằng hình Gemini
