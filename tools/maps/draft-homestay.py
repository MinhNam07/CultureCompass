#!/usr/bin/env python3
"""ONE-TIME DRAFT of the homestay zone maps (Tiled): assets/game/maps/homestay-street.tmj and homestay-inside.tmj.
After you edit a map in Tiled, do NOT run this again: it would overwrite your edits (use --force on purpose)."""
import json, os, sys, random
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
G = os.path.join(ROOT, 'assets', 'game')
T = 16
CH = ['nhua', 'nhua-nut', 'nhua-dau', 'vach-ngua', 'via-he-xam', 'via-he-xam-b', 'via-he-cam', 'nap-cong', 'nap-cong-b',
      'le-tren', 'le-duoi', 'le-trai', 'le-phai', 'le-goc-tren-phai', 'le-goc-duoi-trai', 'le-goc-duoi-phai']
HM = ['gach-men', 'gach-men-bong', 'san-go', 'san-go-toi', 'tuong-trang', 'tuong-trang-b', 'tuong-chan', 'gach-bep']
CHG, HMG, PRG = 1, 101, 201   # firstgids
ch = lambda n: CHG + CH.index(n)
hm = lambda n: HMG + HM.index(n)
random.seed(11)


class Map:
    def __init__(self, name, w, h, props):
        self.name, self.w, self.h = name, w, h
        self.ground = [0] * (w * h); self.floor = [0] * (w * h); self.walls = [0] * (w * h); self.coll = [0] * (w * h)
        self.props = props; self.pid = {p: i for i, p in enumerate(props)}
        self.tiles = []
        for i, p in enumerate(props):
            im = Image.open(os.path.join(G, 'sprites', p + '.png'))
            self.tiles.append({'id': i, 'image': '../sprites/' + p + '.png', 'imagewidth': im.width, 'imageheight': im.height})
        self.objs, self.pts, self.oid = [], [], 1

    def put(self, layer, x, y, g):
        if 0 <= x < self.w and 0 <= y < self.h: layer[y * self.w + x] = g

    def block(self, x0, y0, x1=None, y1=None, skip=()):
        for y in range(y0, (y1 if y1 is not None else y0) + 1):
            for x in range(x0, (x1 if x1 is not None else x0) + 1):
                if (x, y) not in skip: self.put(self.coll, x, y, ch('nhua'))

    def unblock(self, x, y): self.put(self.coll, x, y, 0)

    def obj(self, p, x, y, name=''):
        t = self.tiles[self.pid[p]]
        self.objs.append({'id': self.oid, 'gid': PRG + self.pid[p], 'name': name or p.split('/')[-1], 'x': round(x * T), 'y': round(y * T),
                          'width': t['imagewidth'], 'height': t['imageheight'], 'rotation': 0, 'visible': True, 'type': ''})
        self.oid += 1

    def point(self, cls, name, x, y, props=None, w=0, h=0):
        o = {'id': self.oid, 'name': name, 'type': cls, 'x': round(x * T), 'y': round(y * T), 'width': round(w * T), 'height': round(h * T), 'rotation': 0, 'visible': True}
        if not w: o['point'] = True
        if props: o['properties'] = [{'name': k, 'type': 'string', 'value': v} for k, v in props.items()]
        self.pts.append(o); self.oid += 1

    def save(self):
        dst = os.path.join(G, 'maps', self.name + '.tmj')
        if os.path.exists(dst) and '--force' not in sys.argv:
            print('skip (exists):', dst); return
        L = lambda i, n, d, **kw: dict({'id': i, 'name': n, 'type': 'tilelayer', 'width': self.w, 'height': self.h, 'x': 0, 'y': 0, 'opacity': 1, 'visible': True, 'data': d}, **kw)
        tmj = {'type': 'map', 'version': '1.10', 'tiledversion': '1.11.0', 'orientation': 'orthogonal', 'renderorder': 'right-down',
               'width': self.w, 'height': self.h, 'tilewidth': T, 'tileheight': T, 'infinite': False, 'nextlayerid': 7, 'nextobjectid': self.oid,
               'properties': [{'name': 'viewTiles', 'type': 'int', 'value': self.view}] if getattr(self, 'view', None) else [],
               'tilesets': [
                   {'firstgid': CHG, 'name': 'chung-tiles', 'image': '../tilesets/chung-tiles.png', 'imagewidth': 128, 'imageheight': 32, 'tilewidth': 16, 'tileheight': 16, 'columns': 8, 'tilecount': 16, 'margin': 0, 'spacing': 0},
                   {'firstgid': HMG, 'name': 'homestay-tiles', 'image': '../tilesets/homestay-tiles.png', 'imagewidth': 128, 'imageheight': 16, 'tilewidth': 16, 'tileheight': 16, 'columns': 8, 'tilecount': 8, 'margin': 0, 'spacing': 0},
                   {'firstgid': PRG, 'name': 'props', 'tilewidth': 64, 'tileheight': 192, 'columns': 0, 'tilecount': len(self.tiles), 'margin': 0, 'spacing': 0,
                    'grid': {'orientation': 'orthogonal', 'width': 1, 'height': 1}, 'tiles': self.tiles}],
               'layers': [L(1, 'ground', self.ground), L(2, 'floor', self.floor),
                          L(3, 'walls', self.walls, properties=[{'name': 'ysort', 'type': 'bool', 'value': True}]),
                          {'id': 4, 'name': 'objects', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.objs},
                          {'id': 5, 'name': 'points', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.pts},
                          L(6, 'collision', self.coll, opacity=0.35, visible=False)]}
        json.dump(tmj, open(dst, 'w'), ensure_ascii=False, indent=1)
        print('wrote', dst)


# ---------------- street outside the homestay ----------------
S = Map('homestay-street', 28, 22, ['chung/nha-kieu-phap', 'chung/nha-kieu-phap-b', 'chung/nha-kieu-phap-xanh', 'chung/nha-kieu-phap-hong',
                                     'homestay/nha-ong', 'chung/cay-bang', 'chung/tiles/bon-cay', 'chung/cot-dien', 'chung/xe-may-do-do',
                                     'chung/xe-may-do-xanh', 'chung/xe-may-do-den', 'chung/chau-cay', 'homestay/ke-giay', 'chung/den-duong'])
for y in range(S.h):
    for x in range(S.w):
        if y <= 15: g = ch('via-he-cam')
        elif y == 16: g = ch('le-tren')
        elif y <= 19: g = ch('nap-cong') if (x, y) == (6, 18) else ch('nhua-nut') if random.random() < .04 else ch('nhua')
        elif y == 20: g = ch('le-duoi')
        else: g = ch('via-he-cam')
        S.put(S.ground, x, y, g)
# houses side by side, bottoms on row 13; the homestay is the modern house at x 8–11
for x, p in [(-2, 'chung/nha-kieu-phap-hong'), (2, 'chung/nha-kieu-phap-xanh'), (6, 'chung/nha-kieu-phap'), (10, 'homestay/nha-ong'), (14, 'chung/nha-kieu-phap-hong'),
             (18, 'chung/nha-kieu-phap-b'), (22, 'chung/nha-kieu-phap-xanh'), (26, 'chung/nha-kieu-phap')]:
    S.obj(p, x, 13, 'Homestay' if 'nha-ong' in p else 'House')
S.block(0, 0, 27, 12)
S.unblock(11, 12); S.unblock(12, 12); S.unblock(10, 12); S.unblock(13, 12)                    # the homestay doorway
S.block(0, 16, 27, 21)                                 # road and far pavement: you stay on this side
S.block(0, 13, 0, 15); S.block(27, 13, 27, 15)
for bx in (3, 21):
    S.obj('chung/tiles/bon-cay', bx, 16, 'Tree pit'); S.obj('chung/cay-bang', bx - 0.56, 15.45, 'Indian almond tree'); S.block(bx, 14, bx + 1, 15)
S.obj('chung/cot-dien', 8, 15.9, 'Electric pole'); S.block(8, 15)
S.obj('chung/den-duong', 16.2, 15.9, 'Street lamp'); S.block(16, 15)
S.obj('chung/xe-may-do-do', 14.2, 15.8); S.obj('chung/xe-may-do-den', 17.4, 15.8); S.obj('chung/xe-may-do-xanh', 24.4, 15.8); S.block(14, 15, 15, 15); S.block(17, 15, 18, 15); S.block(24, 15, 25, 15)
S.obj('chung/chau-cay', 9.3, 13.9, 'Potted plant'); S.block(9, 13)
S.obj('homestay/ke-giay', 12.9, 13.95, 'Shoe rack'); S.block(13, 13, 14, 13)
S.point('spawn', 'spawn', 6.2, 14.6, {'dir': 'right'})
S.point('spawn', 'from-inside', 11.9, 14.2, {'dir': 'down'})
S.point('target', 'door', 12, 13.8)
S.point('npc', 'co-lan-door', 10.8, 13.75, {'sprite': 'co-lan', 'speaker': 'Cô Lan', 'hideAfter': 'sc01:s2'})
S.point('hotspot', 'Shoe rack', 12.9, 12.9, {'fact': 'f-shoes', 'label': 'Shoes by the door'}, 2.3, 1.1)
S.point('zone', 'door', 9.5, 13, {'step': 'sc01:s1'}, 5, 2.2)
S.point('door', 'into-house', 10.3, 12.4, {'to': 'homestay-inside', 'spawn': 'from-street', 'after': 'sc01:s2',
                                         'notYet': 'Cô Lan is waiting to welcome you at the door first.'}, 3.4, 1.1)
S.point('mover', 'traffic-1', 0, 16.6, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '46'}, 28, 1.4)
S.point('mover', 'traffic-2', 0, 18.4, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '38', 'offset': '200'}, 28, 1.4)
S.point('mover', 'traffic-3', 0, 17.4, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '30', 'offset': '320'}, 28, 1.4)
S.save()

# ---------------- inside the homestay (ground floor) ----------------
I = Map('homestay-inside', 12, 16, ['homestay/sofa', 'homestay/tv', 'homestay/ban-an', 'homestay/bep', 'homestay/tu-lanh', 'homestay/cay-nuoc',
                                     'homestay/ban-tho', 'homestay/chau-cay-nha', 'homestay/xe-may-trong-nha'])
I.view = 14
for y in range(I.h):
    for x in range(I.w):
        if y == 0: I.put(I.walls, x, y, hm('tuong-trang'))
        elif y == 1: I.put(I.walls, x, y, hm('tuong-chan'))
        I.put(I.ground, x, y, hm('gach-men-bong') if random.random() < .15 else hm('gach-men'))
I.block(0, 0, 11, 1); I.block(0, 0, 0, 15); I.block(11, 0, 11, 15); I.block(0, 15, 11, 15, skip={(5, 15), (6, 15)})
I.obj('homestay/ban-tho', 1.2, 1.7, 'Family altar')
I.obj('homestay/bep', 5.6, 2.3, 'Kitchen'); I.obj('homestay/tu-lanh', 9.6, 2.4, 'Fridge'); I.block(5, 2, 10, 2)
I.obj('homestay/ban-an', 3.4, 6.6, 'Dining table'); I.block(4, 5, 6, 6)
I.obj('homestay/sofa', 1.1, 11.2, 'Sofa'); I.block(1, 10, 3, 10)
I.obj('homestay/tv', 8.2, 9.6, 'TV'); I.block(8, 9, 10, 9)
I.obj('homestay/chau-cay-nha', 10.1, 12.4, 'Plant'); I.block(10, 12)
I.obj('homestay/xe-may-trong-nha', 1.2, 14.9, 'Scooter'); I.block(1, 14, 3, 14)
I.obj('homestay/cay-nuoc', 9.9, 14.9, 'Water dispenser'); I.block(10, 14)
I.point('spawn', 'spawn', 6, 14.3, {'dir': 'up'})
I.point('spawn', 'from-street', 6, 14.3, {'dir': 'up'})
I.point('target', 'living', 5, 12)
I.point('target', 'table', 5, 7.8)
I.point('door', 'to-street', 5, 15.35, {'to': 'homestay-street', 'spawn': 'from-inside'}, 2, 0.65)
I.point('npc', 'ba', 4.2, 12.3, {'sprite': 'ba', 'speaker': 'Cô Lan’s mother', 'hideAfter': 'sc01:s3', 'line': 'She smiles at you.'})
I.point('npc', 'con-trai', 6.6, 12.1, {'sprite': 'con-trai', 'speaker': 'Cô Lan’s son', 'hideAfter': 'sc01:s3', 'line': 'He looks up from his phone and nods.'})
I.point('npc', 'co-lan', 2.9, 6.4, {'sprite': 'co-lan', 'speaker': 'Cô Lan', 'line': '“Ăn cơm thôi! Time to eat.”'})
I.point('npc', 'ba-table', 5.2, 4.3, {'sprite': 'ba', 'speaker': 'Cô Lan’s mother', 'showAfter': 'sc01:s3', 'line': 'She pours you a glass of tea.'})
I.point('npc', 'con-trai-table', 7.4, 6.4, {'sprite': 'con-trai', 'speaker': 'Cô Lan’s son', 'showAfter': 'sc01:s3', 'line': '“Chị ăn đi! Eat!”'})
I.point('hotspot', 'Dining table', 3.4, 4.6, {'fact': 'f-shared', 'label': 'Rice bowls and shared dishes'}, 2, 2.2)
I.point('hotspot', 'Chopsticks', 5.4, 4.8, {'fact': 'f-chop', 'label': 'Chopsticks'}, 1.4, 2)
I.point('zone', 'living', 1, 9.8, {'step': 'sc01:s3'}, 10, 3.6)
I.point('zone', 'table', 1, 3, {'step': 'sc02:s1'}, 9, 4.8)
I.save()
