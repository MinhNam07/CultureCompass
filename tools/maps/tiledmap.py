"""Shared helper for the map scripts (tools/maps/draft-*.py): builds a Tiled .tmj with every tileset the Hà Nội maps use
plus an image-collection 'props' tileset that grows as props are placed.

Tilesets (fixed firstgids, so a gid means the same tile in every map):
  chung-tiles (street), homestay-tiles, cho-tiles, serene-village (LimeZu), van-mieu-tiles, hn-tiles (tools/pixel/draw.py),
  room-builder (LimeZu Modern Interiors free: walls and floors), props (any sprite under assets/game/sprites).
Run a draft with --force to overwrite the .tmj (it replaces any hand edits made in Tiled)."""
import json, os, random, sys
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
G = os.path.join(ROOT, 'assets', 'game')
T = 16
CH = ['nhua', 'nhua-nut', 'nhua-dau', 'vach-ngua', 'via-he-xam', 'via-he-xam-b', 'via-he-cam', 'nap-cong', 'nap-cong-b',
      'le-tren', 'le-duoi', 'le-trai', 'le-phai', 'le-goc-tren-phai', 'le-goc-duoi-trai', 'le-goc-duoi-phai']
HM = ['gach-men', 'gach-men-bong', 'san-go', 'san-go-toi', 'tuong-trang', 'tuong-trang-b', 'tuong-chan', 'gach-bep']
CHO = ['san-cho', 'san-cho-b', 'san-cho-uot']
HN = json.load(open(os.path.join(G, 'tilesets', 'hn-tiles.json')))
CHG, HMG, PRG, SVG, COG, VMG, HNG, RBG = 1, 101, 201, 401, 1301, 1401, 1451, 1501   # firstgids
ch = lambda n: CHG + CH.index(n)
hm = lambda n: HMG + HM.index(n)
sv = lambda i: SVG + i
co = lambda n: COG + CHO.index(n)
vm = lambda r, c: VMG + r * 8 + c          # van-mieu-tiles: row 0-1 courtyard brick, 2 wall face, 3 coping, 4 steps
hn = lambda n: HNG + HN[n]
rb = lambda c, r: RBG + r * 17 + c          # room builder, by column and row of the 16 px grid
SV_GRASS = [sv(61), sv(61), sv(61), sv(3), sv(4), sv(5)]
BLOCK = ch('nhua')


class Map:
    def __init__(self, name, w, h, props=(), seed=1):
        self.name, self.w, self.h = name, w, h
        self.ground = [0] * (w * h); self.floor = [0] * (w * h); self.walls = [0] * (w * h); self.coll = [0] * (w * h)
        self.over = [0] * (w * h)       # drawn on top of everything (rarely needed)
        self.tiles, self.pid = [], {}
        self.objs, self.pts, self.oid = [], [], 1
        self.rnd = random.Random(seed)
        self.props_meta = {}
        self.view = None; self.title = None
        self.filling = False     # set by load(): what is added from now on is tagged, so a rerun replaces it
        for p in props: self.prop(p)

    # ---- props tileset
    def prop(self, p, frames=None, fps=4, flat=False):
        if p in self.pid: return self.pid[p]
        im = Image.open(os.path.join(G, 'sprites', p + '.png'))
        t = {'id': len(self.tiles), 'image': '../sprites/' + p + '.png', 'imagewidth': im.width, 'imageheight': im.height}
        pr = []
        if frames: pr += [{'name': 'frames', 'type': 'string', 'value': ','.join(frames)}, {'name': 'fps', 'type': 'int', 'value': fps}]
        if flat: pr.append({'name': 'flat', 'type': 'bool', 'value': True})
        if pr: t['properties'] = pr
        self.pid[p] = t['id']; self.tiles.append(t)
        return t['id']

    def size(self, p):
        t = self.tiles[self.prop(p)]
        return t['imagewidth'] / T, t['imageheight'] / T

    # ---- tiles
    def put(self, layer, x, y, g):
        if 0 <= x < self.w and 0 <= y < self.h: layer[y * self.w + x] = g

    def at(self, layer, x, y):
        return layer[y * self.w + x] if 0 <= x < self.w and 0 <= y < self.h else None

    def rect(self, layer, x0, y0, x1, y1, g):
        """fill [x0..x1] × [y0..y1]; g is a gid, a list (random pick) or a function (x, y) → gid"""
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                v = g(x, y) if callable(g) else (self.rnd.choice(g) if isinstance(g, list) else g)
                self.put(layer, x, y, v)

    def scatter(self, layer, x0, y0, x1, y1, gids, chance, where=None):
        """sprinkle overlay tiles (tufts, flowers, leaves) on free cells; where(x, y) can veto a cell"""
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                if self.rnd.random() < chance and not self.at(self.coll, x, y) and (not where or where(x, y)):
                    self.put(layer, x, y, self.rnd.choice(gids))

    def block(self, x0, y0, x1=None, y1=None, skip=()):
        for y in range(y0, (y1 if y1 is not None else y0) + 1):
            for x in range(x0, (x1 if x1 is not None else x0) + 1):
                if (x, y) not in skip: self.put(self.coll, x, y, BLOCK)

    def unblock(self, x0, y0, x1=None, y1=None):
        for y in range(y0, (y1 if y1 is not None else y0) + 1):
            for x in range(x0, (x1 if x1 is not None else x0) + 1):
                self.put(self.coll, x, y, 0)

    def free(self, x, y): return not self.at(self.coll, x, y)

    # ---- objects
    def obj(self, p, x, y, name='', foot=None, frames=None, fps=4, flat=False):
        """place sprite p with its left edge at tile x and its bottom edge at tile y (fractions allowed).
        foot = (rows, inset): block that many tile rows above y, across the sprite width minus inset tiles each side
        foot = 'auto': one row, full width"""
        i = self.prop(p, frames, fps, flat)
        t = self.tiles[i]
        self.objs.append({'id': self.oid, 'gid': PRG + i, 'name': name or p.split('/')[-1], 'x': round(x * T), 'y': round(y * T),
                          'width': t['imagewidth'], 'height': t['imageheight'], 'rotation': 0, 'visible': True, 'type': 'fill' if self.filling else ''})
        self.oid += 1
        if foot:
            rows, inset = (1, 0) if foot == 'auto' else foot
            w = t['imagewidth'] / T
            x0 = int(x + inset + 0.01); x1 = int(x + w - inset - 0.01)
            y1 = int(y - 0.01) if y != int(y) else int(y) - 1
            self.block(x0, y1 - rows + 1, x1, y1)

    def point(self, cls, name, x, y, props=None, w=0, h=0):
        o = {'id': self.oid, 'name': name, 'type': cls, 'x': round(x * T), 'y': round(y * T), 'width': round(w * T), 'height': round(h * T), 'rotation': 0, 'visible': True}
        if not w: o['point'] = True
        if self.filling: props = dict(props or {}, fill='1')
        if props: o['properties'] = [{'name': k, 'type': 'string', 'value': v} for k, v in props.items()]
        self.pts.append(o); self.oid += 1

    def npc(self, name, x, y, sprite, speaker, **props):
        """a person standing at (x, y): x is the centre, y the feet. Extra props: fact, line, talk, showAfter, hideAfter, dir"""
        d = {'sprite': sprite, 'speaker': speaker}
        d.update({k: v for k, v in props.items() if v is not None})
        self.point('npc', name, x, y, d)

    def hotspot(self, name, x, y, w, h, fact=None, label=None, **props):
        d = {}
        if fact: d['fact'] = fact
        if label: d['label'] = label
        d.update(props)
        self.point('hotspot', name, x, y, d, w, h)

    # ---- start from an existing map (to add to it rather than redraw it)
    @classmethod
    def load(cls, name, seed=1):
        """reads assets/game/maps/<name>.tmj made with the same firstgids (every map here is); objects keep their place"""
        tmj = json.load(open(os.path.join(G, 'maps', name + '.tmj')))
        m = cls(name, tmj['width'], tmj['height'], seed=seed)
        pr = {p['name']: p['value'] for p in tmj.get('properties', [])}
        m.view = pr.get('viewTiles'); m.title = pr.get('title')
        props_ts = next(t for t in tmj['tilesets'] if t['name'] == 'props')
        old = {t['id']: t for t in props_ts.get('tiles', [])}
        layer = lambda n: {'ground': m.ground, 'floor': m.floor, 'walls': m.walls, 'collision': m.coll, 'over': m.over}.get(n.lower())
        # tiles and collision come from the copy saved the first time (tools/maps/base/), so a rerun starts clean
        base = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'base', name + '.tmj')
        if not os.path.exists(base):
            os.makedirs(os.path.dirname(base), exist_ok=True)
            json.dump(tmj, open(base, 'w'), ensure_ascii=False)
        for l in json.load(open(base))['layers']:
            if l['type'] == 'tilelayer' and layer(l['name']) is not None: layer(l['name'])[:] = l['data']
        for l in tmj['layers']:
            if l['type'] == 'tilelayer':
                continue
            elif l['name'] == 'points':
                for o in l['objects']:
                    if any(q['name'] == 'fill' for q in o.get('properties', [])): continue
                    o = dict(o); o['id'] = m.oid; m.oid += 1; m.pts.append(o)
            else:
                for o in l['objects']:
                    if o.get('type') == 'fill': continue
                    t = old[o['gid'] - props_ts['firstgid']]
                    p = t['image'].split('../sprites/', 1)[1][:-4]
                    fr = next((q['value'].split(',') for q in t.get('properties', []) if q['name'] == 'frames'), None)
                    fl = any(q['name'] == 'flat' and q['value'] for q in t.get('properties', []))
                    i = m.prop(p, fr, flat=fl)
                    o = dict(o); o['gid'] = PRG + i; o['id'] = m.oid; m.oid += 1; m.objs.append(o)
        m.filling = True
        return m

    def drop_points(self, test):
        """remove points for which test(point) is true (to move or replace them)"""
        self.pts = [o for o in self.pts if not test(o)]

    def move_point(self, name, x=None, y=None, cls=None):
        for o in self.pts:
            if o['name'] == name and (cls is None or o['type'] == cls):
                if x is not None: o['x'] = round(x * T)
                if y is not None: o['y'] = round(y * T)

    # ---- output
    def save(self):
        dst = os.path.join(G, 'maps', self.name + '.tmj')
        if os.path.exists(dst) and '--force' not in sys.argv:
            print('skip (exists, use --force):', dst); return
        L = lambda i, n, d, **kw: dict({'id': i, 'name': n, 'type': 'tilelayer', 'width': self.w, 'height': self.h, 'x': 0, 'y': 0, 'opacity': 1, 'visible': True, 'data': d}, **kw)
        props = []
        if self.view: props.append({'name': 'viewTiles', 'type': 'int', 'value': self.view})
        if self.title: props.append({'name': 'title', 'type': 'string', 'value': self.title})
        sheet = lambda gid, name, image, w, h: {'firstgid': gid, 'name': name, 'image': image, 'imagewidth': w, 'imageheight': h,
                                                'tilewidth': 16, 'tileheight': 16, 'columns': w // 16, 'tilecount': (w // 16) * (h // 16), 'margin': 0, 'spacing': 0}
        hnim = Image.open(os.path.join(G, 'tilesets', 'hn-tiles.png'))
        layers = [L(1, 'ground', self.ground), L(2, 'floor', self.floor),
                  L(3, 'walls', self.walls, properties=[{'name': 'ysort', 'type': 'bool', 'value': True}]),
                  {'id': 4, 'name': 'objects', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.objs},
                  {'id': 5, 'name': 'points', 'type': 'objectgroup', 'draworder': 'topdown', 'opacity': 1, 'visible': True, 'x': 0, 'y': 0, 'objects': self.pts},
                  L(6, 'collision', self.coll, opacity=0.35, visible=False)]
        if any(self.over): layers.insert(5, L(7, 'over', self.over))
        tmj = {'type': 'map', 'version': '1.10', 'tiledversion': '1.11.0', 'orientation': 'orthogonal', 'renderorder': 'right-down',
               'width': self.w, 'height': self.h, 'tilewidth': T, 'tileheight': T, 'infinite': False, 'nextlayerid': 8, 'nextobjectid': self.oid,
               'properties': props,
               'tilesets': [
                   sheet(CHG, 'chung-tiles', '../tilesets/chung-tiles.png', 128, 32),
                   sheet(HMG, 'homestay-tiles', '../tilesets/homestay-tiles.png', 128, 16),
                   sheet(COG, 'cho-tiles', '../tilesets/cho-tiles.png', 128, 16),
                   sheet(SVG, 'serene-village', '../vendor/serene-village/Serene_Village_16x16.png', 304, 720),
                   sheet(VMG, 'van-mieu-tiles', '../tilesets/van-mieu-tiles.png', 128, 80),
                   sheet(HNG, 'hn-tiles', '../tilesets/hn-tiles.png', hnim.width, hnim.height),
                   sheet(RBG, 'room-builder', '../vendor/limezu-interiors-free/Interiors_free/16x16/Room_Builder_free_16x16.png', 272, 368),
                   {'firstgid': PRG, 'name': 'props', 'tilewidth': 192, 'tileheight': 192, 'columns': 0, 'tilecount': len(self.tiles), 'margin': 0, 'spacing': 0,
                    'grid': {'orientation': 'orthogonal', 'width': 1, 'height': 1}, 'tiles': self.tiles}],
               'layers': layers}
        assert len(self.tiles) < SVG - PRG, 'too many props'
        json.dump(tmj, open(dst, 'w'), ensure_ascii=False, indent=1)
        print('wrote', dst, '(%d props, %d objects, %d points)' % (len(self.tiles), len(self.objs), len(self.pts)))
