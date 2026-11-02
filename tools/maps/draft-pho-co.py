#!/usr/bin/env python3
"""ONE-TIME DRAFT of assets/game/maps/pho-co.tmj: an Old Quarter street meeting the road along Hoàn Kiếm Lake.
After you edit the map in Tiled, do NOT run this again (use --force on purpose)."""
import os, sys, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tiledmap import Map, ch, sv

random.seed(4)
P = ['pho-co/nha-pho-co-1', 'pho-co/nha-pho-co-2', 'pho-co/nha-pho-co-3', 'pho-co/shop-tap-hoa', 'pho-co/shop-hang-ma', 'pho-co/shop-kim-hoan',
     'pho-co/shop-hang-vai', 'pho-co/shop-cua-cuon-xe-cub', 'chung/nha-kieu-phap-xanh', 'chung/nha-kieu-phap-hong', 'chung/nha-kieu-phap-b', 'homestay/nha-ong',
     'pho-co/thap-but', 'pho-co/cong-ngoc-son', 'pho-co/cau-the-huc', 'pho-co/cay-lieu', 'pho-co/den-ho', 'pho-co/ghe-da',
     'chung/den-giao-thong', 'chung/cot-dien', 'chung/xe-may-do-do', 'chung/xe-may-do-xanh', 'chung/xe-dap', 'serene/tree-a', 'serene/tree-b', 'serene/tree-small']
M = Map('pho-co', 40, 29, P)
M.view = 22
W, H = M.w, M.h
SIDE = (18, 19, 20)          # the side street running north between the houses
ZEBRA = (30, 31)

for y in range(H):
    for x in range(W):
        if y <= 11:
            if x in SIDE: g = ch('le-trai') if x == 18 else ch('le-phai') if x == 20 else ch('nhua')
            else: g = ch('via-he-cam')
        elif y == 12: g = ch('le-tren')
        elif y <= 16: g = ch('vach-ngua') if x in ZEBRA else ch('nhua-nut') if random.random() < .03 else ch('nhua')
        elif y == 17: g = ch('le-duoi')
        elif y <= 19: g = ch('via-he-xam')
        elif y == 20: g = ch('le-duoi')
        else: g = sv(31)      # Hoàn Kiếm Lake
        M.put(M.ground, x, y, g)
# a small paved jetty from the Ngọc Sơn gate to the bridge, and the islet the bridge leads to
for y in range(20, 24):
    for x in range(6, 10): M.put(M.ground, x, y, ch('via-he-xam'))
for y in range(22, 28):
    for x in range(19, 25): M.put(M.ground, x, y, sv(61))

# houses and shops along the north side (bottoms on row 10)
def row(start, items):
    x = start
    for p, w in items:
        M.obj(p, x, 10, p.split('/')[-1]); x += w
west = [('chung/nha-kieu-phap-hong', 4), ('chung/nha-kieu-phap-xanh', 4), ('pho-co/nha-pho-co-1', 5), ('pho-co/shop-tap-hoa', 4.375), ('pho-co/nha-pho-co-2', 3)]
row(18 - sum(w for _, w in west), west)
row(21, [('pho-co/shop-hang-ma', 4.19), ('pho-co/nha-pho-co-3', 4.44), ('homestay/nha-ong', 4), ('pho-co/shop-kim-hoan', 4.56), ('chung/nha-kieu-phap-b', 4)])

# collision: houses, the side street beyond the corner, the big road (except the zebra crossing), the lake
M.block(0, 0, 39, 9, skip={(x, y) for x in SIDE for y in range(6, 10)})
M.block(0, 12, 39, 17, skip={(x, y) for x in ZEBRA for y in range(12, 18)})
M.block(0, 20, 39, 28, skip={(x, y) for x in range(6, 10) for y in range(20, 24)})
M.block(0, 10, 0, 19); M.block(39, 10, 39, 19)

# street furniture
M.obj('chung/cot-dien', 14.4, 11.9, 'Electric pole'); M.block(14, 11)
M.obj('chung/xe-may-do-do', 22.3, 11.8); M.obj('chung/xe-may-do-xanh', 24.4, 11.8); M.block(22, 11, 25, 11)
M.obj('chung/xe-dap', 36.4, 11.8, 'Bicycle'); M.block(36, 11, 37, 11)
M.obj('chung/den-giao-thong', 29.1, 11.9, 'Traffic light'); M.block(29, 11)
M.obj('chung/den-giao-thong', 32.2, 18.9, 'Traffic light'); M.block(32, 18)
# lakeside
M.obj('pho-co/thap-but', 1.2, 19.95, 'Pen Tower'); M.block(1, 19, 4, 19)
M.obj('pho-co/cong-ngoc-son', 5.6, 19.95, 'Ngọc Sơn gate'); M.block(5, 19, 6, 19); M.block(9, 19, 10, 19)
M.obj('pho-co/cau-the-huc', 9.4, 24.4, 'Thê Húc bridge')
for x in (13, 24.5, 35.5): M.obj('pho-co/cay-lieu', x, 20.6, 'Willow')
for x in (16, 27, 37): M.obj('pho-co/ghe-da', x, 19.9, 'Stone bench'); M.block(int(x), 19, int(x) + 1, 19)
for x in (11.5, 21.5, 33.8): M.obj('pho-co/den-ho', x, 19.9, 'Lamp'); M.block(int(x) + 1, 19)
for x, p in [(19.2, 'serene/tree-a'), (21.6, 'serene/tree-b'), (20.4, 'serene/tree-small')]:
    M.obj(p, x, 26.6 if p != 'serene/tree-small' else 24.6, 'Islet tree')

# people, places, moments
M.point('spawn', 'spawn', 3.5, 10.9, {'dir': 'right'})
M.point('target', 'shop', 10.2, 11.5)
M.point('target', 'sidestreet', 17, 11.3)
M.point('target', 'crossing', 30.5, 11.4)
M.point('target', 'vendor', 33.5, 19.4)
M.point('npc', 'chi', 10.2, 10.25, {'sprite': 'nguoi-ban', 'speaker': 'Shopkeeper', 'fact': 'f-call', 'line': '“Hồ Gươm à? Đi thẳng, rồi qua đường ở đèn nhé — straight on, then cross at the lights.”'})
M.point('npc', 'vendor', 35.2, 18.9, {'sprite': 'ban-hang-rong', 'speaker': 'Street vendor', 'fact': 'f-vendor', 'line': 'She smiles and shows you her mangoes and rambutans.'})
M.point('hotspot', 'Lights and crossing', 28.6, 10.6, {'fact': 'f-crossing', 'label': 'Lights and marked crossing'}, 1.4, 1.4)
M.point('hotspot', 'Side street', 16.4, 10.2, {'fact': 'f-traffic', 'label': 'Motorbike traffic'}, 1.4, 1.6)
M.point('hotspot', 'Your bag', 26.2, 10.4, {'fact': 'f-bag', 'label': 'Motorbikes passing close'}, 1.4, 1.4)
M.point('hotspot', 'Pen Tower', 1.2, 17.9, {'fact': 'f-thapbut', 'label': 'Tháp Bút, the Pen Tower'}, 3, 1.3)
M.point('hotspot', 'Ngọc Sơn gate', 6.4, 17.9, {'fact': 'f-ngocson', 'label': 'Gate to Ngọc Sơn Temple'}, 2.8, 1.3)
M.point('hotspot', 'Thê Húc bridge', 6.2, 21.8, {'fact': 'f-thehuc', 'label': 'Thê Húc bridge'}, 3.6, 2)
M.point('hotspot', 'Lake shore', 12.4, 18, {'fact': 'f-hoankiem', 'label': 'Hoàn Kiếm Lake'}, 3, 1.3)
M.point('zone', 'shop', 8, 10, {'step': 'sc04:s3'}, 4.4, 2.1)
M.point('zone', 'sidestreet', 15.8, 10, {'step': 'sc04:s2'}, 2.1, 2.1)
M.point('zone', 'crossing', 27, 10, {'step': 'sc04:s1'}, 6.5, 2.1)
M.point('zone', 'vendor', 30.5, 17.9, {'step': 'sc04:s4'}, 8, 2.1)
M.point('mover', 'traffic-1', 0, 12.6, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '50'}, 40, 1.4)
M.point('mover', 'traffic-2', 0, 13.5, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '38', 'offset': '260'}, 40, 1.4)
M.point('mover', 'traffic-3', 0, 14.5, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '44', 'offset': '120'}, 40, 1.4)
M.point('mover', 'flowers', 0, 15.6, {'sprite': 'pho-co/xe-dap-hoa', 'dir': 'left', 'speed': '14', 'offset': '300'}, 40, 1.4)
M.save()
