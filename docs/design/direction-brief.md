> **Superseded on 24 October 2026.** This "Biển hiệu phố cổ" direction was replaced by the owner-approved redesign brief (cultural publication, six-colour palette, Source Serif 4 + Be Vietnam Pro). The current system is in `DESIGN.md`; the old CSS and scripts are in `legacy/`. Kept for the assignment history.

# Brief thiết kế: Biển hiệu phố cổ (Shopfront street)

Trạng thái: **đã duyệt** (2026-10-24); landing đang được dựng theo brief này. Hướng do người dùng chọn ngày 2026-10-24 (thẻ IMPECCABLE'S PICK, seed:2b6fff55370cb2ab). Các hướng đã loại: Vở ô li, One moment at a time, kiểu trang du lịch thông thường. Bản phác: `.impeccable/mocks/decision/pick.png`.

## 1. Người dùng và mục đích
- Khách du lịch quốc tế, ở nhà, vài tuần trước chuyến đi; không biết tiếng Việt. Người chấm bài đọc site trên laptop.
- Landing thuộc dạng **Persuade**: trong vài giây phải thấy được Hà Nội, hiểu site để làm gì và bắt đầu một scene. Trang la bàn và scene thuộc dạng **Operate**: làm một việc rõ ràng, giữ đúng bản sắc nhưng tiết chế hơn.

## 2. Kết quả và bằng chứng
- Hành động chính: **Start a scene**, nằm ngay màn hình đầu, đi thẳng vào scene đầu tiên (Eating).
- Bằng chứng có thật: 3 clip CC (chợ, bán rau, múa rối nước), ảnh Văn Miếu, nguồn có ngày kiểm, câu nói kèm audio. Không bịa trích dẫn, đánh giá hay số liệu.

## 3. Hướng đã chọn
- **Ý tưởng:** cả site là một con phố. Mỗi bối cảnh, chủ đề hoặc scene là một mặt tiền có biển hiệu sơn riêng, giống các phố Hàng. Muốn tập thì "bước vào cửa hàng".
- **Câu ý tưởng (taste-skill):** trên site này, *biển hiệu sơn và dãy mặt tiền ống của Phố Cổ* trở thành *bảng ô ghép sát nhau* (bố cục dense-tiles).
- **Chất liệu:** biển sơn đỏ, vàng, xanh lá đậm; biển số nhà; cửa cuốn kim loại; nền mực gần đen như khe giữa các nhà; video phố thật.
- **Màu (Committed):** đỏ biển hiệu và vàng biển hiệu phủ những mảng lớn, xanh lá đậm là màu thứ ba, mực gần đen làm nền khe. Mã màu sẽ chốt sau khi kiểm AA.
- **Chữ:** chữ hiển thị là sans hẹp, đậm, in hoa như chữ kẻ biển, phải có đủ glyph tiếng Việt (ứng viên: Anton, sẽ kiểm thêm). Chữ thường dùng Be Vietnam Pro. Tối đa 2 họ font.
- **Tương tác chữ ký (live thing):** rê chuột hoặc chạm vào một mặt tiền thì cửa cuốn kéo lên, lộ clip hoặc minh họa của scene, kèm tên tiếng Việt và thời lượng. Ô **Street sound** bật âm thanh nền của phố (mặc định tắt).
- **Mạch landing:** bức tường mặt tiền → dải các nước (hiện có Việt Nam, các nước khác là cửa còn đóng) → cách tập 1 scene (chọn, xem, nghe, lưu thẻ) → nguồn và phạm vi → footer như một tấm biển lớn ghi tên site.

## 4. Phạm vi và ranh giới
- Làm lần lượt: landing (`index.html`) → trang la bàn (`vietnam.html`, gộp `hanoi.html`) → scene (`scene.html`). Sau đó áp hệ này sang phrases, saved, about.
- Giữ nguyên: dữ liệu JSON, build-data, check-content, luồng scene và 4 loại phản hồi, các cam kết a11y, chạy được từ `file://`.
- **Không muốn:** kiểu đồ lưu niệm (nón lá, hoa sen, đèn lồng làm trang trí), chữ giả "phong cách châu Á", gradient, kính mờ, hàng card giống hệt nhau, nền kem.

## 5. Các trang theo hướng này
- **La bàn (vietnam.html):** một ngã tư phố. 9 chủ đề là 9 mặt tiền quanh một ô trung tâm ("Bạn đang ở Hà Nội" + tiến độ). Đây là ẩn dụ la bàn mà không cần vẽ la bàn. Chủ đề có scene thì cửa mở được; chủ đề chưa có nội dung thì cửa đóng, ghi rõ "chưa có".
- **Scene:** bước vào bên trong cửa hàng. Biển hiệu thu nhỏ thành thanh tiêu đề, bên trong là minh họa SVG trên nền tĩnh hơn. Lựa chọn là các nút to như bảng giá viết tay. Phản hồi dùng 4 màu loại phản hồi trong hệ màu mới. Chuyển động ngắn, có Skip.
- **Thẻ nhắc (saved):** một tấm biển nhỏ in được, ghi câu nói, nghĩa và nguồn.

## 6. Bố cục, thiết bị và trạng thái
- Desktop trước: lưới 12 cột, khe 8px, ô ghép kín không để trống.
- Mobile: dãy ô xếp thành **một cột hẹp và sâu, giống nhà ống**, cuộn từ mặt tiền vào trong. Cửa cuốn mở bằng chạm, có nút thay cho hover.
- Trạng thái cần thiết kế: cửa đóng/mở, đang phát/tạm dừng video, âm thanh tắt/bật, scene chưa làm/đang làm/xong, chủ đề chưa có nội dung, giảm chuyển động (cửa cuốn hiện sẵn, không chạy hiệu ứng), không tải được video (hiện ảnh poster).

## 7. Ràng buộc và việc còn mở
- WCAG 2.2 AA: chữ vàng trên đỏ, đỏ trên vàng và chữ trắng trên video đều phải đạt tương phản; nếu không đạt thì đổi màu cho đạt, không lùi về nền trung tính.
- **Dấu tiếng Việt trên chữ in hoa:** line-height của tiêu đề tối thiểu khoảng 1.1, không dùng overflow cắt chữ (đã gặp lỗi "HÀ NỘI" mất dấu trong bản phác).
- Font tải từ thư mục dự án hoặc Google Fonts kèm fallback, vẫn chạy được từ `file://`.
- Cần thêm ảnh hoặc clip CC về biển hiệu và mặt tiền Phố Cổ (tìm trên Wikimedia/Openverse, ghi credit vào `assets.json`). Không được trình bày như ảnh của chính dự án.
- Chưa chốt: mã màu cuối cùng sau khi kiểm AA; font hiển thị cuối cùng; có thêm clip cho 9 mặt tiền hay chỉ 3 bối cảnh có clip, còn lại dùng minh họa.
