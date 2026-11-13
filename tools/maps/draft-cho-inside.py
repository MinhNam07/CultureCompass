#!/usr/bin/env python3
"""Inside Đồng Xuân market (assets/game/maps/cho-inside.tmj), rebuilt 14/11/2026: 30×22, three rows of stalls with a
central aisle — fresh food at the back, crafts and flowers in the middle, fabric and clothes at the front (the sc05
moments happen at the fabric and clothes stalls). Every seller has a short conversation (talks in explore.json).
Run: python3 tools/maps/draft-cho-inside.py --force, then npm run build."""
import random
from tiledmap import Map, hm, co

random.seed(9)
W, H = 30, 22
I = Map('cho-inside', W, H, seed=9)
I.view = 18
for y in range(H):
    for x in range(W):
        if y == 0: I.put(I.walls, x, y, hm('tuong-trang'))
        elif y == 1: I.put(I.walls, x, y, hm('tuong-chan'))
        r = random.random()
        I.put(I.ground, x, y, co('san-cho-uot') if r < .04 else co('san-cho-b') if r < .3 else co('san-cho'))
I.block(0, 0, W - 1, 1); I.block(0, 0, 0, H - 1); I.block(W - 1, 0, W - 1, H - 1)
I.block(0, H - 1, W - 1, H - 1, skip={(14, H - 1), (15, H - 1)})
for x in (3, 9, 19, 25): I.obj('cho-dong-xuan/den-tuyp', x, 1.5, 'Strip light')

def stall(p, x, bottom, name):
    w, _ = I.size(p)
    I.obj(p, x, bottom, name); I.block(int(x), int(bottom) - 2, int(x + w - 0.05), int(bottom) - 1)

# ---- back row (bottom 5): fresh food and dry goods
A = 5
stall('cho-dong-xuan/sap-rau', 1, A, 'Vegetable stall')
stall('cho-dong-xuan/sap-hoa-qua', 5.4, A, 'Fruit stall')
stall('cho-dong-xuan/sap-kho', 9.4, A, 'Dry-goods stall')
stall('cho-dong-xuan/sap-tap-hoa', 16.2, A, 'Grocery stall')
stall('hn/sap-gia-vi', 20.2, A, 'Spice stall')
stall('cho-dong-xuan/ban-bat-xanh', 23.6, A + 0.2, 'Tarp table')
for x, p in [(27.1, 'hn/bao-tai'), (28.0, 'hn/bao-tai-b'), (27.5, 'hn/can')]:
    I.obj(p, x, 4.9 if p != 'hn/can' else 5.6, 'Sacks of rice' if 'bao' in p else 'Scales')
I.block(27, 4, 28, 4)
# ---- middle row (bottom 10.5): crafts, flowers, a rack of áo dài
B = 10.5
stall('hn/sap-non', 1.2, B, 'Nón lá stall')
stall('hn/sap-may-tre', 4.6, B, 'Basket stall')
stall('hn/sap-hoa', 8.0, B, 'Flower stall')
for x, p in [(11.3, 'hn/xo'), (12.1, 'hn/xo-xanh'), (11.7, 'hn/gio')]:
    I.obj(p, x, 10.4 if p != 'hn/gio' else 10.9, 'Buckets of flowers' if 'xo' in p else 'Basket')
I.block(11, 9, 12, 10)
stall('cho-dong-xuan/gia-ao-dai', 16.2, B, 'Áo dài rack')
stall('cho-dong-xuan/gia-quan-ao', 19.8, B, 'Clothes rack')
stall('cho-dong-xuan/sap-hoa-qua', 24.4, B, 'Fruit stall')
# ---- front row (bottom 16): fabric and clothes (the moments), more cloth
C = 16
stall('cho-dong-xuan/sap-vai', 1.5, C, 'Fabric stall')
stall('cho-dong-xuan/sap-quan-ao', 6.2, C, 'Clothes stall')
stall('cho-dong-xuan/sap-vai', 10.2, C, 'Silk stall')
stall('cho-dong-xuan/sap-quan-ao', 16.2, C, 'Clothes stall')
stall('cho-dong-xuan/sap-kho', 20.4, C, 'Sweets stall')
stall('cho-dong-xuan/gia-quan-ao', 24.6, C, 'Clothes rack')
# ---- entrance hall: pillars, fans, bundles, a porter's cart
for x in (5.2, 10.6, 18.8, 24.2):
    I.obj('cho-dong-xuan/cot', x, 19.9, 'Pillar'); I.block(int(x), 19)
I.obj('cho-dong-xuan/quat-cay', 1.2, 20.9, 'Fan'); I.block(1, 20)
I.obj('cho-dong-xuan/quat-cay', 27.6, 20.9, 'Fan'); I.block(27, 20)
I.obj('cho-dong-xuan/kien-hang', 25.6, 20.95, 'Bundles'); I.block(25, 20, 26, 20)
I.obj('hn/xe-tho', 20.6, 20.95, 'Hand cart'); I.block(20, 20, 22, 20)
I.obj('hn/thung-xop', 2.4, 20.9, 'Polystyrene box'); I.block(2, 20)

# ---- points (names kept: the moments use them)
I.point('spawn', 'spawn', 14.9, 20.3, {'dir': 'up'})
I.point('spawn', 'from-street', 14.9, 20.3, {'dir': 'up'})
I.point('door', 'to-street', 14, 21.35, {'to': 'cho-street', 'spawn': 'from-inside'}, 2, 0.65)
I.point('target', 'fabric', 3.6, 17.3)
I.point('target', 'clothes', 8.4, 17.3)
I.point('zone', 'fabric', 1.5, 16.5, {'step': 'sc05:s1'}, 4, 2.2)
I.point('zone', 'clothes', 6.2, 16.5, {'step': 'sc05:s3'}, 4.2, 2.2)
I.npc('ban-vai', 4.9, 16.8, 'ban-vai', 'Fabric seller', line='“Lụa đẹp lắm! Beautiful silk!”')
I.npc('ban-vai-b', 9.6, 16.8, 'ban-vai-b', 'Clothes seller', line='She folds a shirt and smiles at you.')
I.npc('ban-vai-c', 13.3, 16.8, 'ban-vai-c', 'Silk seller', talk='dx-silk')
I.npc('ban-hoa-qua', 3.4, 5.6, 'ban-hoa-qua', 'Vegetable seller', talk='dx-veg')
I.npc('ban-hoa-qua-b', 7.4, 5.6, 'ban-hoa-qua-b', 'Fruit seller', talk='dx-fruit')
I.npc('ban-do-kho', 11.6, 5.7, 'ban-do-kho', 'Dry-goods seller', talk='dx-dry')
I.npc('ban-gia-vi', 21.7, 5.6, 'ban-gia-vi', 'Spice seller', talk='dx-spice')
I.npc('ban-non', 2.7, 11.1, 'ban-non', 'Nón lá seller', talk='dx-non')
I.npc('ban-may-tre', 6.1, 11.1, 'ban-do-kho-b', 'Basket seller', talk='dx-basket')
I.npc('ban-hoa', 9.5, 11.1, 'ban-hoa', 'Flower seller', talk='dx-flower')
I.npc('ban-hoa-qua-c', 26.0, 11.1, 'nguoi-ban', 'Fruit seller', line='He is cutting a pineapple into a spiral. “Dứa ngọt lắm! Sweet pineapple!”')
I.npc('ban-keo', 22.6, 16.6, 'ban-tra-da', 'Sweets seller', talk='dx-sweets')
I.npc('khach-1', 17.0, 7.0, 'khach-viet', 'A shopper', line='She holds up two bags of dried mushrooms and compares them. “Cái này thơm hơn.” This one smells better.')
I.npc('khach-2', 23.3, 12.3, 'khach-tay', 'A tourist', line='“I came for one scarf and now I have four bags!”')
I.npc('khach-3', 12.9, 12.0, 'khach-viet-b', 'A shopper', line='“Chị ơi, cho em hai bó hoa cúc!” She buys two bunches of chrysanthemums for her altar.')
I.npc('porter', 22.4, 19.6, 'boc-vac', 'A porter', talk='dx-porter')
I.hotspot('No price tags', 1.6, 13.6, 2.6, 1.6, 'f-bargain', 'No price tags')
I.hotspot('Áo dài rack', 16.2, 8.4, 3.2, 1.6, None, 'Áo dài', line='Silk áo dài in every colour, made to measure in a day or two upstairs.')
I.hotspot('Pillar', 18.4, 18.4, 1.4, 1.6, 'f-dx-fire', 'A new hall, an old front')
I.save()
