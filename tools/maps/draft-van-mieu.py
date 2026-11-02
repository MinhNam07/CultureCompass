#!/usr/bin/env python3
"""ONE-TIME DRAFT of assets/game/maps/van-mieu.tmj (Tiled map).
After you edit the map in Tiled, do NOT run this again: it would overwrite your edits.
Run with --force to regenerate on purpose."""
import json, os, sys, random
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
G = os.path.join(ROOT, 'assets', 'game')
DST = os.path.join(G, 'maps', 'van-mieu.tmj')
if os.path.exists(DST) and '--force' not in sys.argv:
    sys.exit('van-mieu.tmj exists; use --force to overwrite')
random.seed(7)
W, H, T = 32, 52, 16
SV, VM, PR = 1, 856, 896           # firstgids
sv = lambda i: SV + i
vm = lambda r, c: VM + r * 8 + c
ground = [sv(61)] * (W * H)
floor = [0] * (W * H); walls = [0] * (W * H); coll = [0] * (W * H)
def put(layer, x, y, g):
    if 0 <= x < W and 0 <= y < H: layer[y * W + x] = g
def block(x, y): put(coll, x, y, vm(4, 0))
def rect(layer, x0, y0, x1, y1, fn):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1): put(layer, x, y, fn(x, y))
brick = lambda x, y: vm(0, random.choice([0, 1, 2, 4, 5, 6]))
# street outside the gate
rect(ground, 0, 45, W - 1, H - 1, lambda x, y: sv(48))
# paths and courtyards
rect(floor, 14, 31, 17, 42, brick)
rect(floor, 11, 16, 20, 23, brick)
rect(floor, 14, 22, 17, 28, brick)
rect(floor, 14, 11, 17, 15, brick)
rect(floor, 6, 8, 25, 12, brick)
# pond (Thiên Quang well)
px0, py0, px1, py1 = 13, 18, 18, 21
for y in range(py0, py1 + 1):
    for x in range(px0, px1 + 1):
        top, bot, left, right = y == py0, y == py1, x == px0, x == px1
        i = 31
        if top: i = 11 if left else 13 if right else 12
        elif bot: i = 49 if left else 51 if right else 50
        elif left: i = 30
        elif right: i = 32
        put(floor, x, y, sv(i)); block(x, y)
# horizontal walls: coping row y, face row y+1; openings = x positions left open
def wall(y, x0, x1, openings=()):
    for x in range(x0, x1 + 1):
        if x in openings: continue
        left_end = x == x0 or (x - 1) in openings
        right_end = x == x1 or (x + 1) in openings
        put(walls, x, y, vm(3, 1) if left_end else vm(3, 7) if right_end else vm(3, random.choice([0, 3, 4])))
        put(walls, x, y + 1, vm(2, random.choice(range(8))))
        block(x, y); block(x, y + 1)
wall(0, 0, W - 1)
wall(13, 2, 29, openings=(15, 16))
wall(29, 2, 12); wall(29, 19, 29)
wall(43, 2, 29, openings=range(12, 20))      # the gate object fills 12..19
for y in range(H):                              # side bounds (trees stand along them)
    for x in (0, 1, 30, 31): block(x, y)
for x in range(W): block(x, H - 1)

# props (image collection tileset)
props = ['van-mieu/van-mieu-mon', 'van-mieu/khue-van-cac', 'van-mieu/dai-thanh', 'van-mieu/nha-bia', 'van-mieu/bia-1',
         'van-mieu/bia-2', 'van-mieu/lu-huong-0', 'serene/tree-a', 'serene/tree-b', 'serene/tree-c', 'serene/tree-d',
         'serene/tree-small', 'serene/sign', 'serene/bush', 'serene/flowers-0', 'serene/flowers-2', 'serene/flowers-4']
pid = {p: i for i, p in enumerate(props)}
tiles = []
for i, p in enumerate(props):
    im = Image.open(os.path.join(G, 'sprites', p + '.png'))
    t = {'id': i, 'image': '../sprites/' + p + '.png', 'imagewidth': im.width, 'imageheight': im.height}
    if p == 'van-mieu/lu-huong-0':
        t['properties'] = [{'name': 'frames', 'type': 'string', 'value': 'van-mieu/lu-huong-0,van-mieu/lu-huong-1,van-mieu/lu-huong-2,van-mieu/lu-huong-3'},
                           {'name': 'fps', 'type': 'int', 'value': 4}]
    tiles.append(t)
objs = []; oid = [1]
def obj(p, tx, ty_bottom, name=''):
    im = tiles[pid[p]]
    objs.append({'id': oid[0], 'gid': PR + pid[p], 'name': name or p.split('/')[-1], 'x': tx * T, 'y': ty_bottom * T,
                 'width': im['imagewidth'], 'height': im['imageheight'], 'rotation': 0, 'visible': True, 'type': ''})
    oid[0] += 1
def foot(tx0, ty0, tx1, ty1, skip=()):
    for y in range(ty0, ty1 + 1):
        for x in range(tx0, tx1 + 1):
            if x not in skip: block(x, y)
obj('van-mieu/van-mieu-mon', 12, 45, 'Văn Miếu Môn'); foot(12, 43, 19, 44, skip=(15, 16))
obj('van-mieu/khue-van-cac', 13, 31, 'Khuê Văn Các'); foot(13, 29, 14, 30); foot(17, 29, 18, 30)
obj('van-mieu/dai-thanh', 10, 8, 'Đại Thành'); foot(10, 4, 21, 7)
obj('van-mieu/nha-bia', 3, 22, 'Nhà bia (west)'); foot(3, 20, 10, 21)
obj('van-mieu/nha-bia', 21, 22, 'Nhà bia (east)'); foot(21, 20, 28, 21)
for i, (x, p) in enumerate([(4, 'bia-1'), (7, 'bia-2'), (22, 'bia-2'), (25, 'bia-1')]):
    obj('van-mieu/' + p, x, 27, 'Stele'); foot(x, 26, x + 1, 26)
obj('van-mieu/lu-huong-0', 15, 11, 'Incense burner'); foot(15, 10, 16, 10)
trees = [('tree-a', 2, 34), ('tree-b', 5, 38), ('tree-c', 2, 42), ('tree-a', 25, 34), ('tree-d', 28, 38), ('tree-b', 25, 42),
         ('tree-c', 8, 33), ('tree-a', 21, 33), ('tree-b', 2, 12), ('tree-c', 28, 12), ('tree-small', 2, 7), ('tree-small', 28, 7),
         ('tree-a', 2, 50), ('tree-d', 28, 50), ('tree-b', 5, 50), ('tree-c', 25, 50), ('tree-small', 2, 18), ('tree-small', 28, 18)]
for p, x, y in trees:
    obj('serene/' + p, x, y); foot(x, y - 1, x + 1, y - 1)
for x, y, p in [(9, 40, 'bush'), (22, 40, 'bush'), (11, 33, 'flowers-0'), (20, 33, 'flowers-2'), (12, 24, 'flowers-4'), (19, 24, 'flowers-0')]:
    obj('serene/' + p, x, y)
    if p == 'bush': block(x, y - 1)
obj('serene/sign', 11, 47, 'Rules board'); block(11, 46)

pts = []
def point(cls, name, x, y, props=None, w=0, h=0):
    o = {'id': oid[0], 'name': name, 'type': cls, 'x': x * T, 'y': y * T, 'width': w * T, 'height': h * T, 'rotation': 0, 'visible': True}
    if not w: o['point'] = True
    if props: o['properties'] = [{'name': k, 'type': 'string', 'value': v} for k, v in props.items()]
    pts.append(o); oid[0] += 1
point('spawn', 'spawn', 16, 49.5)
point('target', 'gate', 16, 46)
point('target', 'stelae', 16, 24)
point('target', 'hall', 16, 10)
point('npc', 'staff-gate', 18.5, 47, {'sprite': 'nhan-vien', 'speaker': 'Staff member', 'fact': 'f-staff'})
point('npc', 'staff-stelae', 11, 26, {'sprite': 'nhan-vien', 'speaker': 'Staff member', 'fact': 'f-staff'})
point('npc', 'staff-hall', 21, 11, {'sprite': 'nhan-vien', 'speaker': 'Staff member', 'fact': 'f-staff'})
point('npc', 'worshipper', 13, 11, {'sprite': 'ba', 'speaker': 'A woman offering incense', 'line': 'She is praying quietly. You step back and give her space.'})
point('npc', 'visitor', 18.5, 12, {'sprite': 'nguoi-ban', 'speaker': 'A visitor', 'line': 'She nods to you and goes back to looking at the hall.'})
point('npc', 'family-1', 11.5, 37, {'sprite': 'co-lan', 'speaker': 'A visitor', 'line': '“Xin chào!” She smiles back.'})
point('npc', 'family-2', 12.5, 37, {'sprite': 'con-trai', 'speaker': 'A teenager', 'line': 'He is busy taking a photo of Khuê Văn Các.'})
point('hotspot', 'Rules board', 11, 46, {'fact': 'f-rules', 'label': 'Rules board at the gate'}, 1, 1)
point('hotspot', 'Stele', 4, 24, {'fact': 'f-stelae', 'label': 'Stelae on stone turtles'}, 5, 3)
point('hotspot', 'Stele', 22, 24, {'fact': 'f-stelae', 'label': 'Stelae on stone turtles'}, 5, 3)
point('hotspot', 'Worship hall', 13, 8, {'fact': 'f-hall', 'label': 'Worship hall'}, 6, 1)
point('hotspot', 'Văn Miếu gate', 16.8, 44.9, {'fact': 'f-vm-1070', 'label': 'Văn Miếu Môn, the main gate'}, 2.4, 1.2)
point('hotspot', 'Khuê Văn Các', 14.4, 31, {'fact': 'f-kvc', 'label': 'Khuê Văn Các'}, 3.2, 1.2)
point('zone', 'gate', 11, 45, {'step': 's1'}, 10, 2)
point('zone', 'stelae', 2, 22, {'step': 's2'}, 28, 6)
point('zone', 'hall', 7, 8, {'step': 's3'}, 18, 4)

layer = lambda i, n, d, **kw: dict({'id': i, 'name': n, 'type': 'tilelayer', 'width': W, 'height': H, 'x': 0, 'y': 0,
                                    'opacity': 1, 'visible': True, 'data': d}, **kw)
tmj = {
    'type': 'map', 'version': '1.10', 'tiledversion': '1.11.0', 'orientation': 'orthogonal', 'renderorder': 'right-down',
    'width': W, 'height': H, 'tilewidth': T, 'tileheight': T, 'infinite': False, 'nextlayerid': 7, 'nextobjectid': oid[0],
    'properties': [{'name': 'title', 'type': 'string', 'value': 'Văn Miếu – Quốc Tử Giám'}],
    'tilesets': [
        {'firstgid': SV, 'name': 'serene-village', 'image': '../vendor/serene-village/Serene_Village_16x16.png', 'imagewidth': 304,
         'imageheight': 720, 'tilewidth': 16, 'tileheight': 16, 'columns': 19, 'tilecount': 855, 'margin': 0, 'spacing': 0},
        {'firstgid': VM, 'name': 'van-mieu-tiles', 'image': '../tilesets/van-mieu-tiles.png', 'imagewidth': 128, 'imageheight': 80,
         'tilewidth': 16, 'tileheight': 16, 'columns': 8, 'tilecount': 40, 'margin': 0, 'spacing': 0},
        {'firstgid': PR, 'name': 'props', 'tilewidth': 192, 'tileheight': 128, 'columns': 0, 'tilecount': len(tiles),
         'margin': 0, 'spacing': 0, 'grid': {'orientation': 'orthogonal', 'width': 1, 'height': 1}, 'tiles': tiles}],
    'layers': [
        layer(1, 'ground', ground), layer(2, 'floor', floor),
        layer(3, 'walls', walls, properties=[{'name': 'ysort', 'type': 'bool', 'value': True}]),
        {'id': 4, 'name': 'objects', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': objs},
        {'id': 5, 'name': 'points', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': pts},
        layer(6, 'collision', coll, opacity=0.35, visible=False)]
}
json.dump(tmj, open(DST, 'w'), ensure_ascii=False, indent=1)
print('wrote', DST)
