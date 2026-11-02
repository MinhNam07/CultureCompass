"""Shared helper for the one-time map drafts (tools/maps/draft-*.py): builds a Tiled .tmj with the
chung (street), homestay and Serene Village tilesets plus an image-collection 'props' tileset."""
import json, os, sys
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
G = os.path.join(ROOT, 'assets', 'game')
T = 16
CH = ['nhua', 'nhua-nut', 'nhua-dau', 'vach-ngua', 'via-he-xam', 'via-he-xam-b', 'via-he-cam', 'nap-cong', 'nap-cong-b',
      'le-tren', 'le-duoi', 'le-trai', 'le-phai', 'le-goc-tren-phai', 'le-goc-duoi-trai', 'le-goc-duoi-phai']
HM = ['gach-men', 'gach-men-bong', 'san-go', 'san-go-toi', 'tuong-trang', 'tuong-trang-b', 'tuong-chan', 'gach-bep']
CHO = ['san-cho', 'san-cho-b', 'san-cho-uot']
CHG, HMG, PRG, SVG, COG = 1, 101, 201, 401, 1301   # firstgids
ch = lambda n: CHG + CH.index(n)
hm = lambda n: HMG + HM.index(n)
sv = lambda i: SVG + i
co = lambda n: COG + CHO.index(n)


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
                   {'firstgid': COG, 'name': 'cho-tiles', 'image': '../tilesets/cho-tiles.png', 'imagewidth': 128, 'imageheight': 16, 'tilewidth': 16, 'tileheight': 16, 'columns': 8, 'tilecount': 8, 'margin': 0, 'spacing': 0},
                   {'firstgid': SVG, 'name': 'serene-village', 'image': '../vendor/serene-village/Serene_Village_16x16.png', 'imagewidth': 304, 'imageheight': 720, 'tilewidth': 16, 'tileheight': 16, 'columns': 19, 'tilecount': 855, 'margin': 0, 'spacing': 0},
                   {'firstgid': PRG, 'name': 'props', 'tilewidth': 64, 'tileheight': 192, 'columns': 0, 'tilecount': len(self.tiles), 'margin': 0, 'spacing': 0,
                    'grid': {'orientation': 'orthogonal', 'width': 1, 'height': 1}, 'tiles': self.tiles}],
               'layers': [L(1, 'ground', self.ground), L(2, 'floor', self.floor),
                          L(3, 'walls', self.walls, properties=[{'name': 'ysort', 'type': 'bool', 'value': True}]),
                          {'id': 4, 'name': 'objects', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.objs},
                          {'id': 5, 'name': 'points', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.pts},
                          L(6, 'collision', self.coll, opacity=0.35, visible=False)]}
        json.dump(tmj, open(dst, 'w'), ensure_ascii=False, indent=1)
        print('wrote', dst)


