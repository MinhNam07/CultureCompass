#!/usr/bin/env python3
"""Inside cô Lan's tube house (assets/game/maps/homestay-inside.tmj), rebuilt 14/11/2026 as a real ground floor:
back wall with windows and pictures, kitchen and family altar at the back, dining table in the middle, living room at the
front, scooter parked by the folding door, stairs up to the bedrooms. Walls and floors: LimeZu Room Builder (free) and
homestay-tiles; furniture: homestay sprites + LimeZu Interiors (tools/pixel/cut-limezu.py).
Run: python3 tools/maps/draft-homestay-inside.py --force, then npm run build."""
from tiledmap import Map, hm, rb, T

W, H = 20, 17
m = Map('homestay-inside', W, H, seed=3)
m.view = 16
VOID = rb(12, 0)

m.rect(m.ground, 0, 0, W - 1, H - 1, VOID)
m.rect(m.floor, 1, 3, W - 2, H - 2, lambda x, y: hm('gach-men-bong') if (x * 7 + y * 3) % 11 == 0 else hm('gach-men'))
m.rect(m.floor, 1, 3, 11, 5, hm('gach-bep'))                     # kitchen tiles at the back
# back wall: two rows of LimeZu wall (row 7-8 of the Room Builder: warm yellow with a skirting board)
for x in range(1, W - 1):
    c = 0 if x == 1 else 2 if x == W - 2 else 1
    m.put(m.ground, x, 1, rb(c, 7)); m.put(m.ground, x, 2, rb(c, 8))
m.block(0, 0, W - 1, 2)
m.block(0, 0, 0, H - 1); m.block(W - 1, 0, W - 1, H - 1)
# front wall with the open folding door in the middle
for x in range(1, W - 1):
    if x in (9, 10): continue
    m.put(m.ground, x, H - 1, rb(1, 8)); m.block(x, H - 1)

# ---- back wall decoration
m.obj('noi-that/cua-so', 13, 2.6, 'Window'); m.obj('noi-that/cua-so', 16, 2.6, 'Window')
m.obj('noi-that/tranh-hoa', 1.5, 1.6, 'Picture'); m.obj('noi-that/tranh-phong-canh', 9.6, 1.8, 'Picture')

# ---- back: altar (left), kitchen (middle), stairs (right)
m.obj('homestay/ban-tho', 1.3, 3.9, 'Family altar', foot=(1, 0))
m.obj('noi-that/binh-gom-b', 3.2, 3.9, 'Vase', foot='auto')
m.obj('homestay/bep', 4.6, 3.9, 'Kitchen', foot=(1, 0))
m.obj('noi-that/tu-ngan', 8.1, 4.1, 'Cupboard', foot=(1, 0))
m.obj('homestay/tu-lanh', 10.1, 4.2, 'Fridge', foot=(1, 0))
m.obj('noi-that/gio-rau', 6.2, 4.8, 'Basket of greens'); m.block(6, 4)
m.obj('noi-that/cau-thang', 16.5, 6.6, 'Stairs'); m.block(16, 3, 18, 6)
m.obj('noi-that/ke-sach', 13, 4.2, 'Shelf', foot=(1, 0))
m.obj('noi-that/cay-cao', 14.9, 4.3, 'Plant', foot='auto')

# ---- middle: dining table (the dinner moments happen here)
TX, TY = 7, 8.6
m.obj('homestay/ban-an', TX, TY, 'Dining table'); m.block(7, 7, 9, 7)
m.obj('noi-that/tham-xanh', 12.6, 8.3, 'Mat', flat=True)
m.obj('noi-that/ghe-dau', 13.3, 7.9, 'Stool')
m.obj('homestay/chau-cay-nha', 1.3, 9.2, 'Plant', foot='auto')
m.obj('noi-that/tu-go', 1.2, 7.2, 'Cabinet', foot=(1, 0))

# ---- front: living room
m.obj('noi-that/tham-do', 2.4, 13.4, 'Rug', flat=True)
m.obj('homestay/sofa', 2.2, 11.4, 'Sofa', foot=(1, 0))
m.obj('noi-that/ban-tra', 3.5, 13.3, 'Tea table', foot=(1, 0.3))
m.obj('quan-an/binh-tra-da', 4.2, 13.35, 'Teapot')
m.obj('homestay/tv', 11.4, 10.6, 'TV', foot=(1, 0))
m.obj('noi-that/ke-sach-b', 14.2, 10.7, 'Bookshelf', foot=(1, 0))
m.obj('noi-that/den-cay', 16.6, 10.8, 'Lamp', foot='auto')
m.obj('noi-that/sofa-nau', 13, 14.2, 'Armchairs', foot=(1, 0))
m.obj('noi-that/cay-cau', 17.1, 14.3, 'Palm', foot='auto')

# ---- entrance: scooter, shoes, water
m.obj('homestay/xe-may-trong-nha', 5.3, 15.9, 'Scooter', foot=(1, 0))
m.obj('homestay/ke-giay', 11.1, 15.9, 'Shoe rack', foot=(1, 0))
m.obj('homestay/cay-nuoc', 1.3, 15.9, 'Water dispenser', foot='auto')
m.obj('noi-that/den-ban', 7.05, 15.9, 'Lamp', foot='auto')

# ---- points (names kept: the moments and explore.json use them)
m.point('spawn', 'spawn', 9.9, 15.6, {'dir': 'up'})
m.point('spawn', 'from-street', 9.9, 15.6, {'dir': 'up'})
m.point('target', 'living', 8.6, 12.8)
m.point('target', 'table', 8.6, 9.9)
m.point('door', 'to-street', 9, 16.2, {'to': 'homestay-street', 'spawn': 'from-inside'}, 2, 0.8)
m.npc('ba', 6.6, 12.3, 'ba', 'Cô Lan’s mother', hideAfter='sc01:s3', line='She smiles at you.')
m.npc('con-trai', 10.4, 12.1, 'con-trai', 'Cô Lan’s son', hideAfter='sc01:s3', line='He looks up from his phone and nods.')
m.npc('co-lan', 6.4, 8.5, 'co-lan', 'Cô Lan', talk='hs-lan')
m.npc('ba-table', 8.6, 6.4, 'ba', 'Cô Lan’s mother', showAfter='sc01:s3', line='She pours you a glass of tea.')
m.npc('con-trai-table', 10.8, 8.5, 'con-trai', 'Cô Lan’s son', showAfter='sc01:s3', line='“Chị ăn đi! Eat!”')
m.hotspot('Dining table', 7, 6.7, 2, 2, 'f-shared', 'Rice bowls and shared dishes')
m.hotspot('Chopsticks', 9, 6.9, 1.4, 1.8, 'f-chop', 'Chopsticks')
m.hotspot('Family altar', 1.3, 2.9, 2, 1.2, 'f-altar', 'The family altar')
m.hotspot('Teapot', 3.6, 12.2, 2, 1.2, 'f-tea', 'Tea for guests')
m.hotspot('Stairs', 16, 6, 3, 1, 'f-tube', 'Stairs to the bedrooms')
m.hotspot('Scooter', 5.3, 14.6, 2.2, 1.4, None, 'A scooter in the living room', line='Every evening the family wheels the scooter in through the front door and parks it inside for the night.')
m.point('zone', 'living', 2, 10.8, {'step': 'sc01:s3'}, 14, 3.4)
m.point('zone', 'table', 4, 5, {'step': 'sc02:s1'}, 10, 4.8)
m.save()
