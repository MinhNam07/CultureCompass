# Explore mode – Art direction

Ngày: 27/10/2026. Chỉ dùng tài nguyên **miễn phí**.

## 1. Gói miễn phí dùng làm nền

| Gói | Dùng cho | Giấy phép | Trạng thái |
|---|---|---|---|
| Serene Village Revamped – LimeZu | Cỏ, nước (có sóng động), đất, đá, cây, hoa, hàng rào, biển gỗ, cửa có hoạt ảnh | CC BY 4.0 – phải ghi "LimeZu" + link | Đã có trong `SERENE_VILLAGE_REVAMPED/` |
| Modern Interiors **Free v2.2** – LimeZu (limezu.itch.io/moderninteriors) | Nhân vật chính 16×32 có hoạt ảnh đi, vài đồ nội thất | Đọc file license trong zip | **Henry cần tải** |
| Ninja Adventure – Pixel-boy (pixel-boy.itch.io/ninja-adventure-asset-pack) | **Chỉ lấy nhạc + SFX** (CC0). Không dùng hình (mái kiểu Nhật, kiểu vẽ khác) | CC0 | Henry cần tải |
| Freesound.org (lọc CC0) | Âm thanh môi trường: xe máy, chuông chùa, chợ, bếp nướng | CC0 / CC BY tùy file | Tải theo danh sách ở checklist |

Không dùng Modern Exteriors (trả phí). Phố, xe máy, kiến trúc Việt → **Gemini tạo**, Claude chuẩn hóa.

## 2. Phân tích kiểu vẽ Serene Village (đã xem ảnh gốc)

- **Góc nhìn:** 3/4 top-down kiểu RPG Maker. Nhà chỉ thấy **mặt trước** + mái; không thấy tường bên. Mái chiếm ~55–60% chiều cao nhà.
- **Lưới:** 16×16 px. Nhà nhỏ 6×6 tile, nhà lớn 12×10 tile. Trên web phóng ×3 (48px), nearest-neighbor.
- **Viền:** viền 1px màu xanh tím đậm `#3a3a50` bao quanh mọi vật. Không dùng đen thuần.
- **Đổ bóng:** 3–4 sắc độ / chất liệu, nguồn sáng trên-trái. Highlight là các vạch sáng ngắn trên mái/thân cây; bóng là sắc đậm hơn, hơi ngả tím/xanh. Không gradient, không khử răng cưa, dither rất ít.
- **Màu:** bão hòa, ấm, "cozy". Cỏ xanh lá tươi, gỗ cam nâu, mái đỏ/xanh dương/xanh rêu, nền đá be.
- **Chi tiết:** khối to, đơn giản; cửa sổ 4 ô, tay nắm cửa 1px vàng. Cỏ nhỏ mọc quanh chân nhà.
- **Bảng màu:** 32 màu chính trong `ref/palette-serene-village.png` (+ `.txt`). Mọi asset mới được ép về bảng này (+ tối đa 8 màu bổ sung cho chất Việt, xem dưới).

## 3. Chuyển sang chất Việt – quy tắc

| Yếu tố | Cách vẽ | Màu (trong bảng) |
|---|---|---|
| Mái ngói đỏ | Dùng đỏ của mái Serene nhưng **hoa văn ngói vảy/âm dương** thay cho ván dọc; mái chùa có **đầu đao cong vút** ở góc | `#e63f38` `#fc5c46` `#ba2d2f` |
| Tường vàng kiểu Pháp (phố cổ, Đồng Xuân) | Vàng kem, vệt ố nhẹ 1–2 px | `#f1ce8e` `#e0b870` + bổ sung `#e8c976` |
| Cửa chớp xanh | Lá chớp ngang, xanh rêu | `#568d61` `#4e6e61` |
| Gỗ son (Văn Miếu, đền) | Đỏ son + gỗ nâu đậm, chữ Hán = vài vạch vàng, không viết chữ thật | `#ba2d2f` `#b35e3f` + bổ sung vàng kim `#e8b84a` |
| Gạch sân Bát Tràng | Gạch đỏ cam vuông, mạch be | `#c78c59` `#b5754d` `#d0be9c` |
| Đá bia, rùa đá | Xám xanh, rêu xanh | `#67798d` `#565972` `#70a858` |
| Đường nhựa / vỉa hè | Xám than, vạch trắng; vỉa hè gạch xám hoặc đỏ | bổ sung `#5a5a6a` `#8a8a96` `#eeeeee` |
| Nhựa đỏ/xanh (ghế quán) | Phẳng, bóng 1px | `#e63f38` `#4280dd` |

Tối đa 8 màu bổ sung. Claude giữ danh sách cuối trong `ref/palette-vn.txt`.

## 4. Nhân vật

- Tỉ lệ: **16×32**, đầu to (chibi) giống Modern Interiors. 4 hướng.
- Nhân vật chính: dùng nhân vật có sẵn trong Modern Interiors Free (thêm balo bằng chỉnh tay).
- NPC Việt: chỉ cần **đứng yên 2 khung** (thở/chớp mắt) + 1 hướng mặt trước. Không cần đi → giảm việc cho AI.
- Trang phục đời thường, tránh khuôn mẫu: không phải ai cũng đội nón lá/mặc áo dài. Nón lá chỉ cho người bán hàng rong.

## 5. Danh sách asset cần tạo (bản demo Hà Nội)

**Chung:** đường nhựa + vạch qua đường, vỉa hè (2 kiểu), cột điện + dây, đèn đường, đèn giao thông, biển hiệu cửa hàng (không chữ thật), cây bàng, cây đa, chậu cây, xe máy đỗ (3 màu), xe máy chạy (4 hướng, 2 khung), xe đạp.

**Homestay:** nhà ống 3 tầng (mặt tiền), nội thất: sàn gạch hoa, bàn ghế gỗ, bàn thờ gia tiên, mâm cơm (bát, đũa, đĩa rau, cá), tủ, quạt trần.
**Văn Miếu:** Văn Miếu Môn (cổng), Khuê Văn Các, giếng Thiên Quang (dùng nước Serene), dãy bia trên lưng rùa, Đại Thành điện (mặt tiền), lư hương + khói (hoạt ảnh), bảng nội quy, tường gạch.
**Phố cổ – Hồ Gươm:** dãy nhà ống (3 biến thể), cầu Thê Húc (đỏ), cổng đền Ngọc Sơn, ghế đá ven hồ, người bán hàng rong + đòn gánh.
**Chợ Đồng Xuân:** mặt tiền chợ (5 vòm), sạp vải, sạp hoa quả, sạp rau, giỏ, cân.
**Quán phở / bún chả:** ghế nhựa thấp, bàn inox, nồi phở có hơi (hoạt ảnh), bếp than nướng + khói, rổ rau, biển quán.
**Bản đồ tổng quan:** bản đồ Việt Nam kiểu pixel, 3 ghim: Hà Nội (mở), Hội An, Đà Nẵng ("Sắp có").

## 6. Quy trình Gemini → Claude

1. Henry tạo bằng Gemini theo `gemini-prompts.md`, **nền hồng #FF00FF**, mỗi ảnh 1 asset (hoặc 1 bộ cùng loại).
2. Lưu vào `assets/game/raw/<khu>/<ten-asset>.png` (chữ thường, gạch ngang).
3. Claude chạy `tools/pixelize.py`: bỏ nền hồng → dò lưới pixel → thu nhỏ nearest → ép bảng màu → thêm viền `#3a3a50` → cắt tile → `assets/game/tiles/`.
4. Henry xem, báo lại cái nào lệch.
