#!/usr/bin/env python3
"""ONE-TIME DRAFT of the Đồng Xuân market maps: cho-street.tmj (the front) and cho-inside.tmj (the stalls).
After you edit a map in Tiled, do NOT run this again (use --force on purpose)."""
import os, sys, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tiledmap import Map, ch, hm, co

random.seed(9)
# ---------------- in front of the market ----------------
S = Map('cho-street', 24, 16, ['cho-dong-xuan/mat-tien-cho', 'cho-dong-xuan/kien-hang', 'chung/xe-may-do-do', 'chung/xe-may-do-xanh', 'chung/xe-may-do-den',
                                'chung/xe-dap', 'chung/cot-dien', 'chung/cay-bang', 'chung/tiles/bon-cay', 'pho-co/shop-tap-hoa', 'pho-co/shop-hang-vai'])
S.view = 20
for y in range(S.h):
    for x in range(S.w):
        g = ch('via-he-cam') if y <= 10 else ch('le-tren') if y == 11 else ch('le-duoi') if y == 15 else ch('nhua')
        S.put(S.ground, x, y, g)
S.obj('pho-co/shop-hang-vai', 0, 8); S.obj('cho-dong-xuan/mat-tien-cho', 4, 8, 'Đồng Xuân Market'); S.obj('pho-co/shop-tap-hoa', 20, 8)
S.block(0, 0, 23, 7, skip={(11, 7), (12, 7)})
S.block(0, 11, 23, 15); S.block(0, 8, 0, 10); S.block(23, 8, 23, 10)
for x in (5.2, 17.6): S.obj('cho-dong-xuan/kien-hang', x, 8.95, 'Bundles of goods'); S.block(int(x), 8)
S.obj('chung/xe-may-do-do', 7.2, 10.8); S.obj('chung/xe-may-do-xanh', 14.6, 10.8); S.obj('chung/xe-may-do-den', 19.2, 10.8)
S.block(7, 10, 8, 10); S.block(14, 10, 15, 10); S.block(19, 10, 20, 10)
S.obj('chung/xe-dap', 2.2, 10.8); S.block(2, 10, 3, 10)
S.obj('chung/cot-dien', 10.0, 10.9, 'Electric pole'); S.block(10, 10)
S.point('spawn', 'spawn', 3.5, 9.3, {'dir': 'right'})
S.point('spawn', 'from-inside', 12, 8.9, {'dir': 'down'})
S.point('target', 'door', 12, 8.8)
S.point('hotspot', 'Đồng Xuân Market', 8, 7.4, {'fact': 'f-dx-1889', 'label': 'Đồng Xuân Market'}, 2, 1.2)
S.point('hotspot', 'Bundles of goods', 17.2, 8.0, {'fact': 'f-dx-floors', 'label': 'Bundles of goods'}, 1.6, 1.4)
S.point('door', 'into-market', 10.6, 7.2, {'to': 'cho-inside', 'spawn': 'from-street'}, 2.8, 1.3)
S.point('mover', 'traffic-1', 0, 11.7, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '42'}, 24, 1.4)
S.point('mover', 'traffic-2', 0, 12.9, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '36', 'offset': '150'}, 24, 1.4)
S.point('mover', 'flowers', 0, 13.8, {'sprite': 'pho-co/xe-dap-hoa', 'dir': 'right', 'speed': '13', 'offset': '90'}, 24, 1.4)
S.save()

# ---------------- inside: aisles of stalls ----------------
I = Map('cho-inside', 22, 16, ['cho-dong-xuan/sap-vai', 'cho-dong-xuan/sap-quan-ao', 'cho-dong-xuan/sap-kho', 'cho-dong-xuan/sap-tap-hoa',
                                'cho-dong-xuan/sap-hoa-qua', 'cho-dong-xuan/sap-rau', 'cho-dong-xuan/gia-quan-ao', 'cho-dong-xuan/gia-ao-dai',
                                'cho-dong-xuan/ban-bat-xanh', 'cho-dong-xuan/kien-hang', 'cho-dong-xuan/quat-cay', 'cho-dong-xuan/cot'])
I.view = 16
for y in range(I.h):
    for x in range(I.w):
        if y == 0: I.put(I.walls, x, y, hm('tuong-trang'))
        elif y == 1: I.put(I.walls, x, y, hm('tuong-chan'))
        r = random.random()
        I.put(I.ground, x, y, co('san-cho-uot') if r < .04 else co('san-cho-b') if r < .3 else co('san-cho'))
I.block(0, 0, 21, 1); I.block(0, 0, 0, 15); I.block(21, 0, 21, 15); I.block(0, 15, 21, 15, skip={(10, 15), (11, 15)})
# back row of stalls against the wall (bottoms on row 5), front row (bottoms on row 10.5)
back = [('cho-dong-xuan/sap-rau', 1), ('cho-dong-xuan/sap-hoa-qua', 6), ('cho-dong-xuan/sap-kho', 11), ('cho-dong-xuan/sap-tap-hoa', 16.2)]
for p, x in back: I.obj(p, x, 5); I.block(int(x), 3, int(x) + 3, 4)
front = [('cho-dong-xuan/sap-vai', 1.5, 'Fabric stall'), ('cho-dong-xuan/sap-quan-ao', 6.2, 'Clothes stall'), ('cho-dong-xuan/gia-ao-dai', 13.0, 'Áo dài rack'), ('cho-dong-xuan/gia-quan-ao', 16.8, 'Clothes rack')]
for p, x, n in front: I.obj(p, x, 10.5, n); I.block(int(x), 9, int(x) + 3, 10)
for x in (5.2, 10.6, 15.8):
    I.obj('cho-dong-xuan/cot', x, 13.9, 'Pillar'); I.block(int(x), 13)
I.obj('cho-dong-xuan/kien-hang', 19.6, 14.9, 'Bundles'); I.block(19, 14, 20, 14)
I.obj('cho-dong-xuan/quat-cay', 1.2, 14.9, 'Fan'); I.block(1, 14)
I.obj('cho-dong-xuan/ban-bat-xanh', 10.2, 5.2, 'Tarp table'); I.block(10, 4, 12, 4)
I.point('spawn', 'spawn', 10.9, 14.3, {'dir': 'up'})
I.point('spawn', 'from-street', 10.9, 14.3, {'dir': 'up'})
I.point('door', 'to-street', 10, 15.35, {'to': 'cho-street', 'spawn': 'from-inside'}, 2, 0.65)
I.point('target', 'fabric', 3.6, 11.8)
I.point('target', 'clothes', 8.4, 11.8)
I.point('npc', 'ban-vai', 4.9, 11.3, {'sprite': 'ban-vai', 'speaker': 'Fabric seller', 'line': '“Lụa đẹp lắm! Beautiful silk!”'})
I.point('npc', 'ban-vai-b', 9.6, 11.3, {'sprite': 'ban-vai-b', 'speaker': 'Clothes seller', 'line': 'She folds a shirt and smiles at you.'})
I.point('npc', 'ban-do-kho', 14.6, 5.6, {'sprite': 'ban-do-kho', 'speaker': 'Dry-goods seller', 'line': 'He weighs a bag of dried mushrooms for another customer.'})
I.point('npc', 'ban-hoa-qua-b', 9.3, 5.5, {'sprite': 'ban-hoa-qua-b', 'speaker': 'Fruit seller', 'line': 'She is checking her phone between customers.'})
I.point('npc', 'ban-hoa-qua', 4.4, 5.5, {'sprite': 'ban-hoa-qua', 'speaker': 'Vegetable seller', 'line': 'She waves a fan over her greens.'})
I.point('npc', 'ban-vai-c', 19.6, 11.3, {'sprite': 'ban-vai-c', 'speaker': 'Clothes seller', 'line': 'He is measuring a length of cloth.'})
I.point('hotspot', 'No price tags', 1.6, 8.6, {'fact': 'f-bargain', 'label': 'No price tags'}, 2.6, 1.6)
I.point('zone', 'fabric', 1.5, 11, {'step': 'sc05:s1'}, 4, 2.2)
I.point('zone', 'clothes', 6.2, 11, {'step': 'sc05:s3'}, 4.2, 2.2)
I.save()
