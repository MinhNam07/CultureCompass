#!/usr/bin/env python3
"""Renders a whole Tiled map (assets/game/maps/<id>.tmj) to one PNG, the way engine.js draws it, for reviewing a layout
without opening the game. NPCs are drawn at their first frame, points as small coloured marks (spawn green, target gold,
hotspot cyan outline, door magenta outline).
Usage: python3 tools/maps/render.py <map-id> [out.png] [--scale 2] [--marks]"""
import json, os, sys
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MAPS = os.path.join(ROOT, 'assets', 'game', 'maps')
_cache = {}
def img(path):
    if path not in _cache:
        try: _cache[path] = Image.open(path).convert('RGBA')
        except Exception: _cache[path] = None
    return _cache[path]

def render(mid, marks=False):
    m = json.load(open(os.path.join(MAPS, mid + '.tmj')))
    T, W, H = m['tilewidth'], m['width'], m['height']
    sets = sorted(m['tilesets'], key=lambda t: t['firstgid'])
    def tile(gid):
        gid &= 0x1fffffff
        ts = None
        for t in sets:
            if gid >= t['firstgid']: ts = t
        if not ts: return None, None
        i = gid - ts['firstgid']
        if 'image' in ts:
            im = img(os.path.normpath(os.path.join(MAPS, ts['image'])))
            c = ts['columns']
            return im.crop(((i % c) * T, (i // c) * T, (i % c) * T + T, (i // c) * T + T)), False
        for t in ts.get('tiles', []):
            if t['id'] == i:
                flat = '/tiles/' in t['image'] or any(p['name'] == 'flat' and p['value'] for p in t.get('properties', []))
                return img(os.path.normpath(os.path.join(MAPS, t['image']))), flat
        return None, None
    out = Image.new('RGBA', (W * T, H * T), (58, 58, 80, 255))
    draw_list, layers = [], m['layers']
    obj_order = next((k for k, l in enumerate(layers) if l['type'] == 'objectgroup' and l['name'] != 'points'), 99)
    flats = []
    for k, l in enumerate(layers):
        if l['type'] == 'tilelayer':
            if l['name'].lower() == 'collision' or not l.get('visible', True): continue
            ys = any(p['name'] == 'ysort' and p['value'] for p in l.get('properties', []))
            for i, g in enumerate(l['data']):
                if not g: continue
                im, _ = tile(g)
                if im is None: continue
                x, y = (i % W) * T, (i // W) * T
                if ys: draw_list.append(((i // W + 1) * T, 1, im, x, y + T - im.height))
                elif k < obj_order: out.alpha_composite(im, (x, y + T - im.height))
                else: draw_list.append((1e9, 0, im, x, y + T - im.height))
        elif l['name'] == 'points':
            for o in l['objects']:
                if (o.get('type') or o.get('class')) == 'npc':
                    p = {q['name']: q['value'] for q in o.get('properties', [])}
                    im = img(os.path.join(ROOT, 'assets/game/sprites/npc', p.get('sprite', 'nhan-vien') + '-0.png'))
                    if im: draw_list.append((o['y'], 2, im, round(o['x'] - im.width / 2), round(o['y'] - im.height)))
        else:
            for o in l['objects']:
                if 'gid' not in o: continue
                im, flat = tile(o['gid'])
                if im is None: continue
                if flat: flats.append((im, round(o['x']), round(o['y'] - im.height)))
                else: draw_list.append((o['y'], 1, im, round(o['x']), round(o['y'] - im.height)))
    for im, x, y in flats: out.alpha_composite(im, (x, y)) if x >= 0 and y >= 0 else out.paste(im, (x, y), im)
    draw_list.sort(key=lambda d: (d[0], d[1]))
    for _, _, im, x, y in draw_list: out.paste(im, (x, y), im)
    if marks:
        d = ImageDraw.Draw(out)
        for l in layers:
            if l['name'] != 'points': continue
            for o in l['objects']:
                c = o.get('type') or o.get('class'); x, y, w, h = o['x'], o['y'], o.get('width', 0), o.get('height', 0)
                if c == 'spawn': d.rectangle((x - 3, y - 3, x + 3, y + 3), fill=(40, 220, 90, 255))
                elif c == 'target': d.rectangle((x - 2, y - 2, x + 2, y + 2), fill=(250, 200, 40, 255))
                elif c == 'hotspot': d.rectangle((x, y, x + w, y + h), outline=(60, 230, 240, 255))
                elif c == 'door': d.rectangle((x, y, x + w, y + h), outline=(255, 0, 255, 255))
                elif c == 'zone': d.rectangle((x, y, x + w, y + h), outline=(255, 140, 0, 160))
    return out

if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    sc = int(sys.argv[sys.argv.index('--scale') + 1]) if '--scale' in sys.argv else 2
    if '--scale' in sys.argv: a = [x for x in a if x != str(sc)]
    im = render(a[0], '--marks' in sys.argv)
    im = im.resize((im.width * sc, im.height * sc), Image.NEAREST)
    dst = a[1] if len(a) > 1 else os.path.join(ROOT, 'docs', 'game', 'maps', a[0] + '.png')
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst); print('wrote', dst, im.size)
