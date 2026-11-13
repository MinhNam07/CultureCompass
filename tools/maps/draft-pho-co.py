#!/usr/bin/env python3
"""Phố cổ – Hồ Gươm (assets/game/maps/pho-co.tmj), rebuilt 14/11/2026.
North: an Old Quarter street (the sc04 moments: ask the way, cross the side street, cross at the lights).
South: the lake shore. Straight across the zebra crossing is the way to Ngọc Sơn temple in its real order:
the gate on the shore → Tháp Bút (the Pen Tower) on its rock and Đài Nghiên (the Ink Slab) → the red Thê Húc bridge
west to Jade Island and the temple. Tháp Rùa (the Turtle Tower) stands on its islet out in the lake.
The promenade has morning exercisers, chess players, an ice-cream seller, students practising English.
Run: python3 tools/maps/draft-pho-co.py --force, then npm run build."""
import random
from tiledmap import Map, ch, sv, hn, SV_GRASS

random.seed(4)
W, H = 46, 36
M = Map('pho-co', W, H, seed=4)
M.view = 22
SIDE = (24, 25, 26)
ZEBRA = (31, 32)
SHORE = 21
PEN = range(29, 36)          # the paved spit from the gate to the bridge
ISLE_X, ISLE_Y = range(5, 20), range(22, 33)

for y in range(H):
    for x in range(W):
        if y <= 11:
            g = (ch('le-trai') if x == SIDE[0] else ch('le-phai') if x == SIDE[-1] else ch('nhua')) if x in SIDE else ch('via-he-cam')
        elif y == 12: g = ch('le-tren')
        elif y <= 16: g = ch('vach-ngua') if x in ZEBRA else ch('nhua-nut') if random.random() < .03 else ch('nhua')
        elif y == 17: g = ch('le-duoi')
        elif y < SHORE: g = ch('via-he-xam-b') if random.random() < .12 else ch('via-he-xam')
        elif y == SHORE: g = hn('shore')
        else: g = hn('lake-b') if random.random() < .08 else hn('lake')
        M.put(M.ground, x, y, g)
for y in range(SHORE, 29):
    for x in PEN: M.put(M.ground, x, y, ch('via-he-xam'))
for y in ISLE_Y:
    for x in ISLE_X: M.put(M.ground, x, y, random.choice(SV_GRASS))
for x in ISLE_X: M.put(M.ground, x, ISLE_Y[-1] + 1, hn('shore'))
M.scatter(M.floor, 5, 22, 19, 32, [hn('flowers'), hn('grass-tuft'), hn('grass-tuft')], .08)

# ---- collision: houses, road (but the zebra), lake (but the spit, the bridge and the island)
M.block(0, 0, W - 1, 9, skip={(x, y) for x in SIDE for y in range(6, 10)})
M.block(0, 12, W - 1, 17, skip={(x, y) for x in ZEBRA for y in range(12, 18)})
M.block(0, SHORE, W - 1, H - 1)
M.unblock(29, SHORE, 35, 28)
M.unblock(19, 26, 28, 26)                   # along the bridge deck
M.unblock(5, 27, 19, 31); M.unblock(18, 25, 19, 26)
M.block(0, 10, 0, 20); M.block(W - 1, 10, W - 1, 20)

# ---- the street: houses and shops (bottoms on row 10)
def row(x, items):
    for p, w in items:
        M.obj(p, x, 10, p.split('/')[-1]); x += w
west = [('chung/nha-kieu-phap-hong', 4), ('chung/nha-kieu-phap-xanh', 4), ('pho-co/nha-pho-co-1', 5), ('pho-co/shop-hang-ma', 4.19), ('pho-co/shop-tap-hoa', 4.375), ('pho-co/nha-pho-co-2', 3)]
row(SIDE[0] - sum(w for _, w in west), west)
row(SIDE[-1] + 1, [('pho-co/shop-kim-hoan', 4.56), ('pho-co/nha-pho-co-3', 4.44), ('homestay/nha-ong', 4), ('pho-co/shop-hang-vai', 3.94)])
M.obj('chung/nha-kieu-phap-b', 42, 10)
# street furniture
M.obj('hn/bien-chi-duong', 12.2, 11.95, 'Signpost'); M.block(12, 11, 13, 11)
M.obj('hn/hang-nuoc', 2.4, 11.6, 'Iced-tea stall'); M.block(2, 11, 3, 11)
for x, p in [(1.4, 'quan-an/ghe-xanh'), (4.6, 'quan-an/ghe-do')]: M.obj(p, x, 11.9, 'Stool')
M.obj('chung/cot-dien', 16.6, 11.9, 'Electric pole'); M.block(17, 11)
M.obj('chung/xe-may-do-do', 7.0, 11.8); M.obj('chung/xe-may-do-xanh', 9.0, 11.8); M.block(7, 11, 10, 11)
M.obj('chung/den-giao-thong', 30.1, 11.9, 'Traffic light'); M.block(30, 11)
M.obj('chung/xe-may-do-den', 35.4, 11.8); M.obj('chung/xe-may-do-do', 37.4, 11.8); M.block(35, 11, 38, 11)
M.obj('chung/xe-dap', 41.6, 11.8, 'Bicycle'); M.block(41, 11, 42, 11)

# ---- the shore promenade
M.obj('chung/den-giao-thong', 33.2, 18.9, 'Traffic light'); M.block(33, 18)
for x in (6.5, 17.5, 25.0, 39.0, 43.0): M.obj('pho-co/cay-lieu', x, 21.4, 'Willow')
for x in (9.0, 22.0, 41.0): M.obj('pho-co/ghe-da', x, 20.9, 'Stone bench'); M.block(int(x), 20, int(x) + 1, 20)
for x in (12.6, 27.6, 36.2): M.obj('pho-co/den-ho', x, 20.9, 'Lamp'); M.block(int(x) + 1, 20)
M.obj('hn/ban-co', 14.0, 19.7, 'Chess board'); M.block(14, 19, 15, 19)
M.obj('hn/thung-kem', 19.6, 19.5, 'Ice-cream box'); M.block(19, 19)
M.obj('hn/bong-bay', 18.2, 19.9, 'Balloons')
M.obj('hn/bang-thong-tin', 36.8, 19.0, 'Notice board'); M.block(37, 18)
# ---- the way to Ngọc Sơn: gate, Pen Tower, Ink Slab, bridge, temple
M.obj('pho-co/cong-ngoc-son', 29.6, 22.0, 'Ngọc Sơn gate'); M.block(29, 21, 30, 21); M.block(33, 21, 34, 21)
M.obj('pho-co/thap-but', 32.6, 26.4, 'Tháp Bút'); M.block(33, 25, 35, 25)
M.obj('hn/dai-nghien', 29.2, 25.4, 'Đài Nghiên'); M.block(29, 24, 30, 24)
M.obj('hn/chum', 34.6, 28.0, 'Water jar'); M.block(34, 27)
M.obj('pho-co/cau-the-huc', 19.2, 27.6, 'Thê Húc bridge', flat=True)
M.obj('hn/den-ngoc-son', 7.2, 26.9, 'Ngọc Sơn Temple'); M.block(7, 25, 16, 26)
for x in (5.2, 17.0): M.obj('hn/den-long', x, 27.0, 'Lantern')
M.obj('chung/cay-da', 5.0, 33.0, 'Banyan tree')
M.obj('hn/cay-canh', 16.6, 32.0, 'Bonsai'); M.block(16, 31, 17, 31)
M.obj('hn/thap-rua', 37.0, 33.6, 'Tháp Rùa')

# ---- moments (names kept) and people
M.point('spawn', 'spawn', 14.6, 10.9, {'dir': 'right'})
M.point('target', 'shop', 20.0, 11.5)
M.point('target', 'sidestreet', 25.0, 11.3)
M.point('target', 'crossing', 31.5, 11.4)
M.point('target', 'vendor', 40.0, 19.4)
M.point('zone', 'shop', 17.8, 10, {'step': 'sc04:s3'}, 4.4, 2.1)
M.point('zone', 'sidestreet', 23.9, 10, {'step': 'sc04:s2'}, 2.2, 2.1)
M.point('zone', 'crossing', 29.0, 10, {'step': 'sc04:s1'}, 6.5, 2.1)
M.point('zone', 'vendor', 37.8, 17.9, {'step': 'sc04:s4'}, 7, 2.1)
M.npc('chi', 20.0, 10.25, 'nguoi-ban', 'Shopkeeper', fact='f-call', line='“Hồ Gươm à? Đi thẳng, rồi qua đường ở đèn nhé — straight on, then cross at the lights.”')
M.npc('vendor', 41.6, 18.9, 'ban-hang-rong', 'Street vendor', fact='f-vendor', line='She smiles and shows you her mangoes and rambutans.')
M.hotspot('Signpost', 12.0, 10.2, 2, 1.4, None, 'Hồ Hoàn Kiếm →', line='HỒ HOÀN KIẾM → The lake is just across the big road. Cross at the lights, then follow the red bridge to Ngọc Sơn Temple.')
M.hotspot('Side street', 24.4, 10.2, 1.4, 1.6, 'f-traffic', 'Motorbike traffic')
M.hotspot('Lights and crossing', 29.6, 10.6, 1.4, 1.4, 'f-crossing', 'Lights and marked crossing')
M.hotspot('Your bag', 34.2, 10.4, 1.4, 1.4, 'f-bag', 'Motorbikes passing close')
M.hotspot('Hàng Mã', 9.4, 9.0, 3, 1.2, 'f-hangma', 'Paper offerings')
M.hotspot('Ngọc Sơn gate', 30.8, 19.4, 2.4, 1.4, 'f-ngocson', 'Gate to Ngọc Sơn Temple')
M.hotspot('Pen Tower', 31.4, 24.4, 1.6, 1.6, 'f-thapbut', 'Tháp Bút, the Pen Tower')
M.hotspot('Thê Húc bridge', 23.0, 25.8, 3, 1.2, 'f-thehuc', 'Thê Húc bridge')
M.hotspot('Ngọc Sơn Temple', 10.0, 27.0, 4, 1.2, 'f-hk-ngocson', 'Ngọc Sơn Temple')
M.hotspot('Turtle Tower', 31.0, 27.4, 3, 1.4, 'f-hk-tower', 'Tháp Rùa, out in the lake')
M.hotspot('Lake shore', 3.0, 19.6, 3, 1.2, 'f-hoankiem', 'Hoàn Kiếm Lake')
M.hotspot('Notice board', 37.0, 17.9, 1.6, 1, 'f-hk-walk', 'Walking street notice')
M.npc('tea-1', 3.2, 11.0, 'khach-ngoi-ben', 'A regular', line='“Ra hồ chưa? Been to the lake yet? Cross at the lights, it’s right there.”')
M.npc('lost', 22.4, 11.1, 'khach-tay', 'A lost tourist', line='He turns his map round and round. “Is the lake… this way? Oh! I can see it from here.”')
M.npc('ex-1', 2.6, 19.3, 'tap-the-duc', 'Morning exerciser', talk='hk-exercise')
M.npc('ex-2', 4.2, 19.6, 'tap-the-duc', 'Morning exerciser', line='She swings her arms in time with the music from a small speaker.')
M.npc('ex-3', 5.6, 19.2, 'cu-ong', 'Morning walker', line='“Một vòng hồ, mỗi sáng! One loop of the lake, every morning!”', fact='f-hk-morning')
M.npc('chess-1', 13.4, 19.3, 'cu-ong', 'Chess player', talk='hk-chess')
M.npc('chess-2', 16.4, 19.4, 'ong-do', 'Chess player', line='He frowns at the board and does not look up. The game has been going for an hour.')
M.npc('kem', 21.0, 19.2, 'ban-kem', 'Ice-cream seller', talk='hk-kem')
M.npc('eng-1', 27.0, 19.3, 'sinh-vien', 'A student', talk='hk-english')
M.npc('eng-2', 28.1, 19.6, 'sinh-vien-b', 'A student', line='She holds a notebook with a list of questions. “Where are you from?”')
M.npc('keeper', 18.4, 28.6, 'nhan-vien', 'Temple keeper', talk='hk-temple')
M.npc('photo-1', 12.0, 28.9, 'khach-viet', 'A visitor', line='“Can you take our photo? With the temple behind us!” She hands you her phone.')
M.npc('photo-2', 13.2, 29.1, 'khach-viet-b', 'A visitor', line='He fixes his hair for the photo.')
M.npc('guide', 33.0, 23.3, 'huong-dan', 'A tour guide', line='“Tháp Bút, the Pen Tower: three characters on top, Tả Thanh Thiên, ‘writing on the blue sky’.”', fact='f-thapbut')
M.point('mover', 'traffic-1', 0, 12.6, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '50'}, W, 1.4)
M.point('mover', 'traffic-2', 0, 13.5, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '38', 'offset': '260'}, W, 1.4)
M.point('mover', 'traffic-3', 0, 14.5, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '44', 'offset': '120'}, W, 1.4)
M.point('mover', 'flowers', 0, 15.6, {'sprite': 'pho-co/xe-dap-hoa', 'dir': 'left', 'speed': '14', 'offset': '300'}, W, 1.4)
M.save()
