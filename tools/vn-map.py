#!/usr/bin/env python3
"""Build assets/data/vn-map.js (the Vietnam overview map on explore.html).
Needs Natural Earth 1:10m 'Admin 0 – countries, Vietnam point of view' (ne_10m_admin_0_countries_vnm.*, public domain),
from https://github.com/nvkelso/natural-earth-vector/tree/master/10m_cultural .
Usage: python3 tools/vn-map.py <folder with the ne_10m_admin_0_countries_vnm files> assets/data/vn-map.js"""
import os, sys, json, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from shp import read_dbf, read_shp
d = os.path.join(sys.argv[1], 'ne_10m_admin_0_countries_vnm')
R = read_dbf(d + '.dbf'); S = read_shp(d + '.shp')
LON0, LON1, LAT0, LAT1 = 99.0, 118.5, 6.5, 24.2
K = 40; C = math.cos(math.radians(15.5))
W = round((LON1 - LON0) * K * C); H = round((LAT1 - LAT0) * K)
def P(lon, lat): return ((lon - LON0) * K * C, (LAT1 - lat) * K)
def dp(pts, eps):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]; dx, dy = b[0]-a[0], b[1]-a[1]; L = math.hypot(dx, dy) or 1e-9
    i, dm = 0, -1
    for j in range(1, len(pts)-1):
        p = pts[j]; dd = abs(dy*(p[0]-a[0]) - dx*(p[1]-a[1])) / L
        if dd > dm: i, dm = j, dd
    if dm > eps: return dp(pts[:i+1], eps)[:-1] + dp(pts[i:], eps)
    return [a, b]
def area(r): return abs(sum(r[i][0]*r[i-1][1]-r[i-1][0]*r[i][1] for i in range(len(r))))/2
def path(rings, eps, minarea, keepsmall=False):
    out = []; tiny = []
    for ring in rings:
        xs = [P(*p) for p in ring]
        if max(x for x, y in xs) < -5 or min(x for x, y in xs) > W + 5 or max(y for x, y in xs) < -5 or min(y for x, y in xs) > H + 5: continue
        a = area(xs)
        if a < minarea:
            if keepsmall: tiny.append(xs)
            continue
        if not keepsmall: xs = [(min(max(x, -20), W + 20), min(max(y, -20), H + 20)) for x, y in xs]
        xs = [p for i, p in enumerate(xs) if i == 0 or p != xs[i - 1]]
        h = len(xs) // 2
        s = dp(xs[:h + 1], eps)[:-1] + dp(xs[h:], eps) if len(xs) > 6 else xs
        if len(s) < 3: s = xs
        out.append('M' + 'L'.join('%.1f %.1f' % p for p in s) + 'Z')
    return ''.join(out), tiny
res = {'w': W, 'h': H, 'lon0': LON0, 'lat1': LAT1, 'k': K, 'c': round(C, 6), 'neighbours': [], 'vn': '', 'islets': []}
for r, s in zip(R, S):
    a3 = r['ADM0_A3']
    if a3 == 'VNM':
        res['vn'], tiny = path(s, 0.45, 1.5, keepsmall=True)
        # tiny islands (incl. many in Hoàng Sa and Trường Sa): keep as dots at their centres
        res['islets'] = [[round(sum(x for x, y in t)/len(t), 1), round(sum(y for x, y in t)/len(t), 1)] for t in tiny]
    elif a3 in ('CHN', 'LAO', 'KHM', 'THA', 'MYS', 'PHL', 'MMR', 'TWN', 'IDN', 'BRN'):
        d_, _ = path(s, 1.4, 12)
        if d_: res['neighbours'].append({'name': r['NAME'].strip('\x00 '), 'd': d_})
js = '/* Vietnam overview map for explore.html, made by tools/vn-map.py from Natural Earth 1:10m Admin 0 countries,\n   Vietnam point of view (ne_10m_admin_0_countries_vnm, public domain). Projection: equirectangular, x scaled by cos 15.5°. */\nwindow.CC = window.CC || {};\nCC.vnMap = ' + json.dumps(res, ensure_ascii=False, separators=(',', ':')) + ';\n'
open(sys.argv[2], 'w').write(js)
print(W, H, len(res['vn']), len(res['islets']), [n['name'] for n in res['neighbours']], len(js))
