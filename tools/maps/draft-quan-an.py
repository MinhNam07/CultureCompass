#!/usr/bin/env python3
"""ONE-TIME DRAFT of assets/game/maps/quan-an.tmj: a pavement bún chả and phở stall in an Old Quarter street.
After you edit the map in Tiled, do NOT run this again (use --force on purpose)."""
import os, sys, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tiledmap import Map, ch

random.seed(12)
P = ['pho-co/nha-pho-co-1', 'pho-co/nha-pho-co-3', 'chung/nha-kieu-phap-xanh', 'chung/nha-kieu-phap-b', 'homestay/nha-ong', 'pho-co/shop-cua-cuon',
     'quan-an/noi-pho-0', 'quan-an/bep-than-0', 'quan-an/tu-kinh', 'quan-an/ban-inox', 'quan-an/ghe-do', 'quan-an/ghe-xanh', 'quan-an/ro-rau',
     'quan-an/bat-dua', 'quan-an/chai-nuoc-cham', 'quan-an/binh-tra-da', 'quan-an/bien-quan', 'chung/xe-may-do-do', 'chung/xe-may-do-den',
     'chung/cay-bang', 'chung/tiles/bon-cay', 'chung/cot-dien']
M = Map('quan-an', 26, 18, P)
M.view = 18
for y in range(M.h):
    for x in range(M.w):
        g = ch('via-he-cam') if y <= 13 else ch('le-tren') if y == 14 else ch('le-duoi') if y == 17 else ch('nhua')
        M.put(M.ground, x, y, g)
# animated stoves: frames come from the props tileset (frames/fps properties)
for t in M.tiles:
    for base, n in (('quan-an/noi-pho', 3), ('quan-an/bep-than', 3)):
        if t['image'] == '../sprites/' + base + '-0.png':
            t['properties'] = [{'name': 'frames', 'type': 'string', 'value': ','.join(f'{base}-{i}' for i in range(n))}, {'name': 'fps', 'type': 'int', 'value': 4}]
x = -1
for p, w in [('chung/nha-kieu-phap-xanh', 4), ('pho-co/nha-pho-co-1', 5), ('homestay/nha-ong', 4), ('pho-co/nha-pho-co-3', 4.44), ('pho-co/shop-cua-cuon', 3.94), ('chung/nha-kieu-phap-b', 4), ('pho-co/nha-pho-co-1', 5)]:
    M.obj(p, x, 8, p.split('/')[-1]); x += w
M.block(0, 0, 25, 7); M.block(0, 14, 25, 17); M.block(0, 8, 0, 13); M.block(25, 8, 25, 13)
# the stall: pot and glass cabinet by the house front, grill on the pavement, sign
M.obj('quan-an/bien-quan', 7.1, 8.6, 'Stall sign')
M.obj('quan-an/tu-kinh', 8.2, 9.4, 'Glass cabinet'); M.block(8, 8, 9, 8)
M.obj('quan-an/noi-pho-0', 10.3, 9.6, 'Phở pot'); M.block(10, 8, 11, 9)
M.obj('quan-an/bep-than-0', 13.0, 9.9, 'Charcoal grill'); M.block(13, 9, 14, 9)
# tables with stools
tables = [(8.6, 12.4, 'busy'), (12.4, 12.4, 'yours'), (16.4, 11.8, 'busy2')]
for tx, ty, name in tables:
    M.obj('quan-an/ban-inox', tx, ty, 'Table'); M.block(int(tx), int(ty) - 1, int(tx) + 1, int(ty) - 1)
    M.obj('quan-an/ghe-do', tx - 0.9, ty + 0.1); M.obj('quan-an/ghe-xanh', tx + 1.5, ty + 0.1)
M.obj('quan-an/ro-rau', 12.7, 11.3, 'Herbs'); M.obj('quan-an/binh-tra-da', 13.4, 11.25, 'Iced tea')
M.obj('quan-an/chai-nuoc-cham', 8.9, 11.25); M.obj('quan-an/bat-dua', 16.6, 10.75)
M.obj('chung/xe-may-do-do', 19.8, 13.8); M.obj('chung/xe-may-do-den', 22.0, 13.8); M.block(19, 13, 23, 13)
M.obj('chung/tiles/bon-cay', 2, 14, 'Tree pit'); M.obj('chung/cay-bang', 1.44, 13.45, 'Indian almond tree'); M.block(2, 12, 3, 13)
M.obj('chung/cot-dien', 6.0, 13.9, 'Electric pole'); M.block(6, 13)
M.point('spawn', 'spawn', 3.8, 10.5, {'dir': 'right'})
M.point('target', 'cook', 11.0, 10.8)
M.point('target', 'table', 13.1, 13.3)
M.point('npc', 'cook-pho', 11.9, 9.5, {'sprite': 'dau-bep-pho', 'speaker': 'Phở cook', 'line': '“Ăn gì em? What would you like?”'})
M.point('npc', 'cook-buncha', 15.4, 9.95, {'sprite': 'dau-bep-bun-cha', 'speaker': 'Bún chả cook', 'line': 'He fans the charcoal and the pork sizzles.'})
M.point('npc', 'diner-1', 8.0, 12.55, {'sprite': 'khach-ngoi', 'speaker': 'A diner', 'line': 'He is slurping his phở. He nods at you.'})
M.point('npc', 'diner-2', 18.3, 11.95, {'sprite': 'khach-ngoi-ben', 'speaker': 'A diner', 'line': 'She dips a piece of pork into her bowl of dipping sauce.'})
M.point('npc', 'stranger', 14.9, 12.6, {'sprite': 'ban-do-kho-b', 'speaker': 'A man looking for a seat', 'hideAfter': 'sc06:s2'})
M.point('npc', 'stranger-seated', 14.3, 12.55, {'sprite': 'khach-ngoi-ben-b', 'speaker': 'Your table neighbour', 'showAfter': 'sc06:s2', 'line': '“Ngon không? Is it good?” he asks with a grin.'})
M.point('hotspot', 'Herbs', 12.4, 10.6, {'fact': 'f-herbs', 'label': 'Plate of herbs'}, 0.9, 0.9)
M.point('hotspot', 'Iced tea', 13.3, 10.6, {'fact': 'f-trada', 'label': 'Jug of trà đá'}, 0.9, 0.9)
M.point('hotspot', 'Chopsticks', 16.4, 10.2, {'fact': 'f-wipe', 'label': 'Chopsticks and napkins'}, 1.4, 0.8)
M.point('zone', 'cook', 9.6, 9.8, {'step': 'sc06:s1'}, 3.6, 2)
M.point('zone', 'table', 11.4, 12.6, {'step': 'sc06:s2'}, 3, 1.4)
M.point('mover', 'traffic-1', 0, 14.6, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '40'}, 26, 1.4)
M.point('mover', 'traffic-2', 0, 15.6, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '34', 'offset': '200'}, 26, 1.4)
M.save()
