#!/usr/bin/env python3
"""Checks that every target, person, hotspot and door of a map can be reached on foot from its spawn points
(flood fill over the collision layer, like engine.js findPath). Usage: python3 tools/maps/check-reach.py [map-id ...]"""
import json, os, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MAPS = os.path.join(ROOT, 'assets', 'game', 'maps')
bad = 0
ids = sys.argv[1:] or [os.path.basename(f)[:-4] for f in sorted(glob.glob(os.path.join(MAPS, '*.tmj')))]
for mid in ids:
    m = json.load(open(os.path.join(MAPS, mid + '.tmj')))
    W, H, T = m['width'], m['height'], m['tilewidth']
    col = next(l['data'] for l in m['layers'] if l['name'].lower() == 'collision')
    pts = next(l['objects'] for l in m['layers'] if l['name'] == 'points')
    blocked = lambda x, y: not (0 <= x < W and 0 <= y < H) or col[y * W + x]
    seen, q = set(), []
    for o in pts:
        if o['type'] == 'spawn':
            s = (int(o['x'] // T), int((o['y'] - 1) // T))
            if blocked(*s): print('  %s: spawn %s stands on a blocked tile %s' % (mid, o['name'], s)); bad += 1
            else: seen.add(s); q.append(s)
    while q:
        x, y = q.pop()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            n = (x + dx, y + dy)
            if n not in seen and not blocked(*n): seen.add(n); q.append(n)
    def near(x0, y0, x1, y1, pad=1):
        return any((x, y) in seen for x in range(int(x0 // T) - pad, int(x1 // T) + pad + 1) for y in range(int(y0 // T) - pad, int(y1 // T) + pad + 1))
    for o in pts:
        t = o['type']
        if t in ('mover', 'spawn'): continue
        x, y, w, h = o['x'], o['y'], o.get('width', 0), o.get('height', 0)
        ok = near(x, y - 1, x + w, y + h, 0 if t == 'zone' else 1)
        if t == 'npc':  # the player talks from the side or the front of a person
            ok = near(x, y - 1, x, y - 1, 1)
        if not ok:
            print('  %s: %s "%s" at (%.1f, %.1f) cannot be reached' % (mid, t, o['name'], x / T, y / T)); bad += 1
    print('%s: %d walkable tiles' % (mid, len(seen)))
sys.exit(1 if bad else 0)
