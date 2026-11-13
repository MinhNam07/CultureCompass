# Gemini prompts – Explore mode

## Cách dùng
1. Mở **một** cuộc trò chuyện Gemini cho mỗi nhóm (Chung, Văn Miếu, Phố cổ…) để giữ kiểu vẽ đồng nhất.
2. Tin nhắn đầu tiên: đính kèm `ref/style-reference-serene-village.png` + `ref/palette-serene-village.png`, dán **STYLE BLOCK** bên dưới.
3. Các tin sau: chỉ dán prompt của từng asset (Gemini nhớ style block trong cùng cuộc trò chuyện). Nếu kiểu vẽ bắt đầu lệch, dán lại style block.
4. Tải ảnh gốc (PNG, kích thước lớn nhất), lưu vào `assets/game/raw/<khu>/<ten-asset>.png`.
5. Đừng tự chỉnh nền trong suốt – để nền hồng, Claude xử lý.

---

## STYLE BLOCK (dán đầu mỗi cuộc trò chuyện)

```
You are helping me make game assets for a cozy 2D top-down pixel-art game set in Hà Nội, Vietnam.
Match the attached style reference exactly (LimeZu "Serene Village" style):
- 3/4 top-down RPG view (RPG Maker style): buildings show only the FRONT wall plus the roof; the roof takes ~55–60% of the building height. No side walls, no isometric angle, no perspective.
- Real pixel art on a 16×16 tile grid. Draw each art pixel as a crisp, perfectly square block of 8×8 screen pixels, aligned to a grid. No anti-aliasing, no blur, no gradients, no soft brushes, no noise, very little dithering.
- 1-pixel outline in dark navy-purple #3a3a50 around every object (never pure black). Ground and floor tiles have NO outline or border: they must tile seamlessly.
- 3–4 flat shades per material, light from the top-left, short bright highlight strokes, shadows slightly cooler.
- Use ONLY colours from the attached palette, plus these extras when needed: #e8c976 (French-colonial yellow wall), #e8b84a (gold lacquer), #5a5a6a and #8a8a96 (asphalt/concrete), #eeeeee (road paint).
- People: chibi proportions matching the attached LimeZu character reference (big head about 45% of the height, short body).
- Simple, chunky shapes, readable at small size. No text, no letters, no Chinese characters, no logos – use a few abstract strokes instead of writing.
- Solid flat magenta background #FF00FF filling the whole image. No checkerboard, no shadows on the background, no scenery around the object.
- One object (or one requested set) per image, centred, with empty magenta margin.
Reply "Ready" and wait for my asset requests.
```

---

## A. Chung (đường phố)  · cập nhật 28/10 sau lần làm nhóm C/G

Bài học từ lần trước: (1) ô gạch bị Gemini vẽ khung viền đậm → nền nhìn thấy lưới ô; (2) nhân vật vẽ tỉ lệ người thật, không chibi. Prompt dưới đã sửa hai điểm này.
Đính kèm thêm: `ref/character-reference-limezu.png` cho A3 và mọi prompt có người.

**A1. Đường + vỉa hè (tileset)**
```
Ground tileset for a Hà Nội street, 16×16 art-pixel tiles laid out in a grid with 1-tile magenta gaps between tiles.
IMPORTANT: ground tiles have NO outline and NO border frame – they must tile seamlessly edge to edge (the left edge continues into the right edge, the top into the bottom). Only the kerb edge tiles may have a darker line, and only on the kerb side.
Tiles: asphalt road ×3 variants (plain, small crack, oil stain); white zebra-crossing stripe tile (bars run parallel to the traffic); road edge/kerb tiles: top, bottom, left, right and 4 outer corners; grey square-tiled pavement ×2 variants; worn red-brick pavement ×2 variants; manhole cover; drain grate.
```
**A2. Xe máy đỗ**
```
3 parked Vietnamese motor scooters (Honda Wave–style step-through), 3/4 top-down RPG view, seen from the side, each about 32×24 art pixels: one red, one blue, one black. A side stand down, simple chunky shapes, chrome as 1–2 light pixels. Each on its own spot with magenta gaps. #3a3a50 outline.
```
**A3. Xe máy chạy (sprite sheet)**
```
Sprite sheet of a rider on a motor scooter, matching the chibi proportions of the attached LimeZu character reference (big head with a simple helmet, short body).
4 rows = 4 directions (down, left, right, up), 2 columns = 2 animation frames (wheels/legs shift slightly). Each frame exactly 32×32 art pixels, rider and scooter centred, same position in every frame. Plain jacket, no logos.
```
**A4. Phố – đồ vật**
```
Set of Hà Nội street props, each on its own spot with magenta gaps, 3/4 top-down RPG view, #3a3a50 outline:
- concrete electricity pole with a tangle of black cables hanging off both sides (16×48 art pixels)
- street lamp (16×48)
- traffic light on a pole (16×48)
- blank shop sign board, no text (32×16)
- Indian almond tree (cây bàng) with big broad leaves (48×64)
- large banyan tree with aerial roots (64×80)
- round glazed ceramic plant pot with a small bush (16×16)
- old black bicycle with a front basket (32×24)
```

## B. Homestay (hiện đại, 2026) · viết lại 28/10

Lần đầu Gemini vẽ ra nhà và đồ đạc kiểu Hà Nội xưa (đã chuyển sang `raw/ha-noi-xua/` để dành cho chủ đề sau). Bản này chỉ rõ nhà phố hiện đại.

**B1. Nhà ống hiện đại làm homestay**
```
Front of a MODERN Hà Nội tube house (built in the 2010s) that a family runs as a small homestay, 64×176 art pixels (4 tiles wide × 11 tiles tall), 3/4 top-down RPG view showing only the front wall and the top of the roof terrace.
4 storeys plus a flat roof terrace. Smooth painted concrete facade in cream/off-white with light grey trim.
Ground floor: a metal roller shutter (rolled up) above a wide aluminium-and-glass folding door; through the glass you can see the front tip of two parked motor scooters; a small step; a small blank sign board with no letters.
Upper floors: aluminium-frame glass windows and glass doors, narrow balconies with stainless-steel railings and potted plants, two wall-mounted air-conditioner units, a few tangled cables.
Roof terrace: low parapet, a cylindrical stainless-steel water tank, a few potted plants.
NOT a French colonial villa: no wooden louvred shutters, no clay-tile roof.
```
**B2a. Sàn và tường trong nhà hiện đại (tileset)**
```
Interior tileset for a modern Vietnamese family home (2020s), 16×16 art-pixel tiles in a grid with 1-tile magenta gaps.
IMPORTANT: floor tiles have NO outline and NO border frame – seamless edge to edge.
Tiles: large glossy cream ceramic floor tile ×2 variants (thin grout lines, like 60×60 cm tiles); light wood-look laminate floor ×2 variants; plain white painted wall face ×2 variants; white wall with a low ceramic skirting at the bottom; white kitchen backsplash tiles; polished granite stair step; doorway opening.
```
**B2b. Đồ đạc nhà hiện đại**
```
Furniture for a modern Hà Nội family home that hosts guests, each item on its own spot with magenta gaps, 3/4 top-down RPG view, #3a3a50 outline, everyday 2020s style (not antique, no carved wood):
- grey fabric sofa with a low wooden coffee table (48×32)
- flat-screen TV on a low TV cabinet (32×24)
- shoe rack by the entrance with shoes and a few pairs of slippers (32×16)
- motor scooter parked indoors, seen from the side (32×24)
- dining table with 4 chairs and a family meal on it: rice bowls, chopsticks, shared plates of greens, fish and tofu, a small bowl of fish sauce (48×32)
- kitchen counter with a gas stove, a rice cooker and a sink (48×24); a tall fridge (16×32); a water dispenser (16×24)
- guest bed with white sheets and two pillows (32×48); small wardrobe (32×32)
- family altar on a wall shelf: incense pot, fruit plate, flowers, two small framed photos shown only as shapes (32×24)
- potted plant (16×24)
```

## C. Văn Miếu – Quốc Tử Giám

**C1. Khuê Văn Các**
```
Khuê Văn Các pavilion of the Temple of Literature in Hà Nội: a two-tier pavilion on four square brick pillars, upper storey of dark red lacquered wood with a round window shaped like a sun on each side, curved red-tile roofs with upturned corners. About 6 tiles wide × 7 tiles tall.
```
**C2. Cổng Văn Miếu Môn**
```
Main gate of the Temple of Literature: a three-arched gate in weathered ochre plaster and brick, two-tiered curved roof with red tiles and upturned eaves, small decorative panel above the central arch (abstract strokes, no text). About 8 tiles wide × 6 tiles tall.
```
**C3. Bia tiến sĩ trên lưng rùa**
```
Row piece: one grey-blue stone stele standing on the back of a stone turtle, moss patches, under it a small shadow. 2 tiles wide × 3 tiles tall. Then a second variant slightly more weathered. Then a low tiled-roof shelter that covers a row of 4 steles (8 tiles wide × 4 tiles tall).
```
**C4. Đại Thành điện + lư hương**
```
Front of the main worship hall: wide single-storey hall with dark red lacquered wooden doors and pillars, gold-lacquer details, low steps, big curved red-tile roof with upturned corners. 12 tiles wide × 8 tiles tall.
Second image: bronze incense burner on a stone base (2×2 tiles) with 4 animation frames of thin rising smoke, laid out side by side.
```
**C5. Gạch sân + tường**
```
Tileset 16×16, magenta gaps: Bát Tràng terracotta courtyard bricks (seamless), courtyard brick edge tiles, old ochre brick wall with moss (seamless horizontal), wall top with small tiled coping, stone steps, rectangular pond edge tiles.
```

## D. Phố cổ – Hồ Gươm (hiện tại, 2026) · viết lại 29/10

**D1. Dãy nhà phố cổ (3 biến thể)**
```
Three different present-day Hà Nội Old Quarter tube-house fronts, made to stand side by side in a row, 3/4 top-down RPG view (front wall + roof only):
1) an old 2-storey French-era house, 48×128 art pixels: faded yellow wall, green louvred shutters, small clay-tile roof, ground floor open as a souvenir shop with lacquer bowls, conical hats and paintings on display.
2) a newer 4-storey narrow house, 48×160: painted concrete, glass balcony doors, AC units, ground floor open as a clothes shop with a rail of shirts.
3) a 3-storey house, 64×144: pale blue wall, balcony full of plants, ground floor open as a small café with a striped awning and low stools in the doorway.
All: blank sign boards with NO letters, a few tangled cables between them, no people.
```
**D2. Hồ Gươm: cầu Thê Húc, cổng đền Ngọc Sơn, Tháp Bút, ven hồ**
```
Image 1: The Huc bridge – red-painted wooden arched footbridge seen from the 3/4 top-down view, running horizontally, 160×48 art pixels, red railings, meant to sit over lake water.
Image 2: the entrance gate of Ngọc Sơn temple: a small gate with two pillars and a curved red-tile roof, inscription panels shown only as abstract strokes (80×80).
Image 3: Pen Tower (Tháp Bút): a slim tapering stone tower on a small rocky mound with a brush-tip shape at the top (32×80).
Image 4: lakeside set: stone bench (32×16), weeping willow tree leaning over water (48×64), round lamp post (16×48).
```
**D3. Người bán hàng rong (NPC chibi)**
```
NPC sprites matching the attached LimeZu character reference (chibi, 16×32 art pixels each, big head):
1) woman street vendor in a conical straw hat (nón lá), long-sleeve shirt and trousers, carrying a bamboo shoulder pole with two baskets of fruit – front idle 2 frames + side view walking 2 frames.
2) woman selling flowers from an old bicycle loaded with flowers (bicycle + vendor together, 32×32) – side view, 2 frames.
```

## E. Chợ Đồng Xuân (hiện tại, 2026) · viết lại 01/11

**E1. Mặt tiền chợ**
```
Front of Đồng Xuân market in Hà Nội as it looks today, 3/4 top-down RPG view (front wall + roof only), about 256×144 art pixels:
a long pale-yellow French-colonial facade with tall arched entrances, the central bay taller with a raised gable on top, a blank name panel with NO letters, grey roof behind.
In front: a few parked motor scooters, sacks and boxes of goods stacked by the entrances, a hand cart.
```
**E2. Sạp hàng trong chợ**
```
Market stalls for inside Đồng Xuân market, each on its own spot with magenta gaps, 3/4 top-down RPG view, #3a3a50 outline, about 48×40 art pixels each:
1) fabric stall: shelves of folded colourful cloth and rolls of fabric
2) clothes stall: hanging shirts and áo dài on rails
3) dry goods stall: sacks of rice and beans, jars, dried mushrooms, packets of tea
4) fruit stall: mangoes, dragon fruit, bananas, rambutans in baskets
5) vegetable and herb stall: leafy greens and fresh herbs in flat baskets
Each stall has a low stool for the seller behind it. No text on any sign.
```
**E3. Sàn và lối đi trong chợ (tileset)**
```
Tileset for the inside of a busy Vietnamese market, 16×16 art-pixel tiles in a grid with 1-tile magenta gaps.
IMPORTANT: floor tiles have NO outline and NO border – seamless edge to edge.
Tiles: worn grey concrete floor ×2 variants, concrete floor with a wet patch, yellow-painted pillar seen from the front (16×48), a narrow aisle edge tile.
```
**E4. Người bán ở chợ (NPC chibi)**
```
NPC sprites matching the attached LimeZu character reference (chibi, 16×32 art pixels each, big head), front-facing idle, 2 frames each:
1) a woman fabric seller in a cardigan with a measuring tape around her neck
2) an older man selling dry goods, short-sleeve shirt
3) a young woman selling fruit, cotton face mask lowered to her chin, sitting on a low stool (seated pose)
```

## F. Quán phở / bún chả vỉa hè (hiện tại, 2026) · viết lại 01/11

**F1. Đồ quán vỉa hè**
```
Pavement food-stall props for a present-day Hà Nội street, each on its own spot with magenta gaps, 3/4 top-down RPG view, #3a3a50 outline:
- low red plastic stool and low blue plastic stool (16×16 each)
- small low stainless-steel table (32×16)
- big phở stock pot on a gas burner, 3 animation frames of rising steam (32×40 per frame, side by side)
- charcoal grill with pork patties and skewers for bún chả, 3 animation frames of smoke (32×32 per frame)
- glass display cabinet on wheels with noodles, herbs and sliced beef (32×40)
- basket of fresh herbs, stack of bowls, chopstick holder with a box of napkins, bottles of fish sauce and chilli (16×16 each)
- plastic jug of iced tea with glasses (16×16)
- blank sign board with NO letters (32×16)
```
**F2. Người ở quán (NPC chibi)**
```
NPC sprites matching the attached LimeZu character reference (chibi, 16×32 art pixels each, big head):
1) phở cook: short hair, t-shirt and apron, ladling broth – front idle 2 frames (NO headband)
2) bún chả cook fanning the grill with a hand fan – front idle 2 frames
3) two customers sitting on low plastic stools eating with chopsticks, seen from the front and from the side – 2 frames each
```

## G. NPC chính (16×32, đứng yên 2 khung, nhìn thẳng)

```
NPC sprites, 16×32 art pixels each, chibi proportions matching LimeZu Modern Interiors characters, front-facing idle with 2 frames (breathing), side by side:
1) cô Lan – woman in her 50s, homestay host, short hair, flowered blouse, trousers.
2) her elderly mother – grey hair in a bun, áo bà ba–style plain blouse.
3) her teenage son – t-shirt, shorts.
4) temple staff member – light blue short-sleeve uniform shirt, dark trousers.
5) phở cook – apron, t-shirt.
6) market seller – cardigan, cloth face mask lowered to chin.
```

## H. Bản đồ tổng quan

```
Cozy pixel-art map of Vietnam seen from above, sea in the palette blues with small waves, land in greens with a few hills, the S-shape outline accurate, three small pin markers: Hà Nội (north), Đà Nẵng and Hội An (centre). No text. 40×60 tiles.
```

> ⚠️ Bản đồ Việt Nam: AI hay vẽ sai đường bờ biển và bỏ sót quần đảo Hoàng Sa, Trường Sa – điều này nhạy cảm với người dùng Việt. Khuyến nghị: **Claude dựng bản đồ từ dữ liệu địa lý thật** rồi pixel hóa; Gemini chỉ dùng để thử phong cách.

---

## H. Bản đồ Việt Nam kiểu pixel (trang `explore.html`) · 01/11

**Cách làm:** Gemini KHÔNG vẽ hình nước Việt Nam (AI hay vẽ sai bờ biển, sót hoặc vẽ sai Hoàng Sa – Trường Sa). Claude dựng hình đất liền + biển + hai quần đảo bằng pixel từ dữ liệu thật (Natural Earth, góc nhìn Việt Nam). Gemini chỉ vẽ **các mảnh trang trí** dưới đây, Claude ghép lên. Chữ (tên thành phố, tên biển, tên quần đảo) do trang web viết bằng font thật – ảnh không có chữ.
Dùng chung STYLE BLOCK ở đầu file. Lưu ảnh vào `assets/game/raw/ban-do/H1.png` … `H5.png`.

**H1. Ô nền bản đồ (nhìn thẳng từ trên xuống)**
```
Map tiles for a pixel-art world map, seen straight from above (flat top-down, NOT 3/4 view), 16×16 art-pixel tiles in a grid with 1-tile magenta gaps.
NO outline and NO border on any tile: every tile must tile seamlessly edge to edge.
Tiles: deep sea ×2 variants (calm blue, a few tiny lighter wave dashes); shallow coastal sea ×2 (lighter blue-green); sea wave sparkle ×2 animation frames (same tile, the white dashes shift); Vietnam land ×3 variants (fresh green grass with a few darker tufts); rice-field land ×2 (neat rows of bright green); neighbouring-country land ×2 (pale desaturated sand-beige, flat, very little detail so it stays in the background).
Muted, calm colours from the palette. Magenta background.
```

**H2. Núi, rừng, sông (rải lên đất liền)**
```
Small terrain decorations for a pixel-art world map, 3/4 top-down RPG view, #3a3a50 outline, each on its own spot with magenta gaps:
limestone karst peaks like Hạ Long / Ninh Bình (tall rounded green-topped pillars) ×3 sizes (16×16, 16×24, 24×32 art px); green rounded mountain ×2 sizes; a cluster of 3 tropical trees (16×16); a coconut palm (16×24); a small rice-terrace hill with stepped green rows (24×16); a short river bend piece and a straight river piece (16×16, blue with a light edge, no outline on the water).
```

**H3. Biểu tượng 3 thành phố**
```
Three small landmark icons for a pixel-art world map, 3/4 top-down RPG view, #3a3a50 outline, each about 32×32 art pixels, on its own spot with magenta gaps, with a small flat oval patch of ground under each:
1) Hà Nội – the small Turtle Tower (Tháp Rùa): a three-storey weathered stone tower with arched openings on a tiny green islet surrounded by a ring of lake water.
2) Đà Nẵng – the Dragon Bridge: a short golden-yellow steel bridge whose arch is a wavy dragon body over blue water, the head at one end.
3) Hội An – a cluster of round silk lanterns (red, yellow, orange) hanging in front of a small yellow old-town house with a dark tiled roof.
No text, no letters.
```

**H4. Ghim, đảo, nhãn**
```
Map markers for a pixel-art world map, #3a3a50 outline, each on its own spot with magenta gaps:
a big location pin (16×24) in deep teal #2e6f78 with a light dot in the middle, 2 animation frames (frame 2 lifted up 2 pixels with a smaller shadow); a small round flat shadow under the pin; a soft pulsing ring around a point, 3 frames growing outward (24×24, thin teal ring, no fill); a small grey pin (12×18) for places coming later; a tiny padlock badge (10×10, grey and gold); a small yellow star (10×10) for the capital;
three tiny island clusters seen from above (16×16 each): 3–6 specks of sand-yellow and green, each speck 1–3 pixels, with a 1-pixel light-blue ring of shallow water around each speck, no outline;
an empty rounded label plate (48×12, cream #f6e3b8 with a dark navy outline, NO text) and a wider one (80×12).
```

**H5. Trang trí biển + khung**
```
Decorations for a pixel-art world map, 3/4 top-down RPG view, #3a3a50 outline, each on its own spot with magenta gaps:
a Vietnamese wooden fishing boat with a brown sail (24×16), 2 frames gently rocking; a round basket boat (thúng chai, 12×10) with a fisherman, 2 frames; small white cloud ×3 shapes (24×12, soft flat pixel clouds, light outline #c8d4dc instead of navy); 2 seagulls (8×6), 2 frames; a compass rose (32×32) in cream, brass and wine red with the north point longer – NO letters;
a map frame kit: 4 corner pieces (16×16) and straight edge pieces top/bottom/left/right (16×16) looking like an old wooden map board with brass corner caps, tileable edges.
```

Gửi xong (hoặc từng nhóm), Claude: tách sprite → ghép lên nền pixel → thay bản đồ SVG trên `explore.html` (giữ chấm Hà Nội bấm được, chữ là chữ thật, bàn phím vẫn dùng được).

---

## I. Lấp đầy map · viết 14/11

Dùng cùng STYLE BLOCK ở trên (một cuộc trò chuyện cho I1–I3, một cho I4–I5). Lưu ảnh vào `assets/game/raw/<khu>/` đúng tên ghi ở mỗi mục; Claude cắt và thay sprite tạm. Trong lúc chưa có ảnh, game dùng sprite tạm Claude tự vẽ, nên làm mục nào trước cũng được.

**I1. Văn Miếu: Đại Trung Môn + Đại Thành Môn** → `raw/van-mieu/cong-trong.png`
```
Two inner gates of the Temple of Literature, Hà Nội, side by side, 3/4 top-down RPG view (front wall + roof only):
1) Đại Trung Môn: a single-storey gate building with three wide wooden door openings (doors open, dark inside), dark red lacquered pillars, white-grey plaster walls, one curved red-tile roof with gently upturned corners. 8 tiles wide × 5 tiles tall.
2) Đại Thành Môn: similar but grander, three openings, red lacquered doors with gold-lacquer studs, a horizontal board above the middle door with abstract gold strokes (no text), red-tile roof with upturned corners. 8 tiles wide × 5 tiles tall.
```
**I2. Văn Miếu: Thái Học + trống, chuông** → `raw/van-mieu/thai-hoc.png`
```
Image 1: Thái Học hall (the old Imperial Academy): a two-storey hall, 12 tiles wide × 9 tiles tall, dark red lacquered wooden columns and lattice doors, two stacked curved red-tile roofs with upturned corners, stone steps in front.
Image 2: a big ceremonial drum on a wooden stand (2×3 tiles) and a large bronze bell hanging in a small wooden frame with a tiled roof (2×3 tiles), side by side.
```
**I3. Văn Miếu: giếng Thiên Quang + lan can** → `raw/van-mieu/gieng.png`
```
Tileset 16×16 with 1-tile magenta gaps: edge pieces of a square ornamental pond seen from the 3/4 top-down view: grey-green stone kerb on all 4 sides and 4 corners, a low stone balustrade along the top edge (with small square posts), water tiles (dark at the top edge for shadow, then mid blue), plus one lotus-leaf-on-water tile. Ground and water tiles have NO outline and must tile seamlessly.
```
**I4. Hồ Gươm: đền Ngọc Sơn, Tháp Rùa, Đài Nghiên** → `raw/pho-co/ho-guom-2.png`
```
Image 1: front of Ngọc Sơn Temple on its island: single-storey temple hall with red lacquered pillars, yellow-ochre walls, curved red-tile roof with dragon-tip corners, small stone steps, 10 tiles wide × 6 tiles tall.
Image 2: Turtle Tower (Tháp Rùa): small three-storey square tower in weathered grey-white plaster with pointed-arch openings, a small decorative top, standing on a little grassy mound with one tree, all on lake water edge. 4 tiles wide × 5 tiles tall.
Image 3: Đài Nghiên: a small stone ink-slab shaped like half a peach resting on the back of three stone frogs, on a plinth. 2 × 2 tiles.
```
**I5. NPC Hà Nội (chibi 16×32, đứng yên 2 khung, nhìn thẳng)** → `raw/npc/npc-ho-guom.png`
```
NPC sprites matching the attached LimeZu character reference (chibi, 16×32 art pixels each, big head), front-facing idle, 2 frames each (breathing), side by side:
1) older woman doing morning exercise, tracksuit, arms raised.
2) old man in a cap sitting on a tiny stool, leaning over a Chinese chess board (board included in the sprite, 32×32).
3) graduating student in a dark blue gown and square academic cap holding a bouquet.
4) ice-cream seller with a small cool box on a strap, cap.
5) tour guide with a small flag on a stick and a lanyard.
6) man pulling a cart of goods (cart included, 32×32).
```
