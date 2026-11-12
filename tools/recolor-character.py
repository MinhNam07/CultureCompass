#!/usr/bin/env python3
"""Builds the player characters (Arvy, Henry) by recolouring LimeZu Modern Interiors sheets: hair and clothes only.

Usage:
  python3 tools/recolor-character.py            # build every character in assets/game/characters/recolor.json
  python3 tools/recolor-character.py henry      # build one

To change a colour, edit "to" in recolor.json and run the tool again. Each group names the base colour it starts from
("from", the most common shade of that part) and the colour it should become ("to"); every other shade of the group
keeps its distance in hue, lightness and saturation from that base, so the pixel shading survives the change.
"y" limits a group to some rows of the 16 x 32 frame, "frames" to some frames (0-23: right, up, left, down; Bob's collar
shows only from behind), and "keepEdge": true leaves the pixels that touch the transparent background alone
(Bob's suit is painted in the outline colours, so without it the outline around his hands would turn white too).

Output: assets/game/characters/<id>/run.png and idle.png (384 x 32: 24 frames of 16 x 32, rows right, up, left, down),
and docs/game/characters-preview.png to look at. The vendor files are never changed.
"""
import colorsys, json, os, sys
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC = os.path.join(ROOT, 'assets', 'game', 'characters', 'recolor.json')
VENDOR = os.path.join(ROOT, 'assets', 'game', 'vendor', 'limezu-interiors-free', 'Characters_free')
OUT = os.path.join(ROOT, 'assets', 'game', 'characters')
PREVIEW = os.path.join(ROOT, 'docs', 'game', 'characters-preview.png')
SHEETS = {'run': 'run', 'idle': 'idle_anim'}


def hexrgb(h):
    h = h.lstrip('#').lower()
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def hls(rgb):
    return colorsys.rgb_to_hls(*(c / 255 for c in rgb))


def clamp(v):
    return max(0.0, min(1.0, v))


def shift(rgb, src, dst):
    """rgb moved the way src moves to dst."""
    h, l, s = hls(rgb)
    hs, ls, ss = hls(src)
    hd, ld, sd = hls(dst)
    nh = (hd + (h - hs)) % 1.0
    nl = clamp(ld + (l - ls))
    ns = clamp(sd * (s / ss) if ss > 0.02 else sd + (s - ss))
    r, g, b = colorsys.hls_to_rgb(nh, nl, ns)
    return tuple(round(c * 255) for c in (r, g, b))


def build_one(cid, ch):
    groups = []
    for name, g in ch['groups'].items():
        cols = {hexrgb(c) for c in g['colours']}
        groups.append((name, cols, hexrgb(g['from']), hexrgb(g['to']), g.get('y'), g.get('frames'), g.get('keepEdge')))
    os.makedirs(os.path.join(OUT, cid), exist_ok=True)
    out = {}
    for key, suffix in SHEETS.items():
        im = Image.open(os.path.join(VENDOR, '%s_%s_16x16.png' % (ch['base'], suffix))).convert('RGBA')
        px = im.load()
        src = im.copy().load()

        def edge(x, y):
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                X, Y = x + dx, y + dy
                if X < 0 or Y < 0 or X >= im.width or Y >= im.height or X // 16 != x // 16 or src[X, Y][3] == 0:
                    return True
            return False

        cache = {}
        for y in range(im.height):
            for x in range(im.width):
                r, g, b, a = px[x, y]
                if a == 0:
                    continue
                f = x // 16
                for name, cols, base, dst, yr, frs, keep in groups:
                    if (r, g, b) in cols and (not yr or yr[0] <= y <= yr[1]) \
                            and (not frs or any(lo <= f <= hi for lo, hi in frs)) and not (keep and edge(x, y)):
                        k = (name, (r, g, b))
                        if k not in cache:
                            cache[k] = shift((r, g, b), base, dst)
                        px[x, y] = cache[k] + (a,)
                        break
        path = os.path.join(OUT, cid, key + '.png')
        im.save(path)
        out[key] = im
        print('wrote', os.path.relpath(path, ROOT))
    return out


def preview(built, spec):
    """Each character, base and recoloured: the four directions standing, then a walk cycle to the right, at 6x."""
    z, pad = 6, 10
    frames = [18, 0, 6, 12]          # idle facing down, right, up, left
    walk = list(range(0, 6))
    cols = len(frames) + len(walk)
    rowh = 32 * z + 26
    img = Image.new('RGB', (cols * 16 * z + (cols + 1) * pad, len(built) * 2 * rowh + pad), (236, 231, 220))
    d = ImageDraw.Draw(img)
    y = pad
    for cid, sheets in built.items():
        base = spec[cid]['base']
        for label, run, idle in (
            ('%s (LimeZu %s, base)' % (spec[cid]['name'], base),
             Image.open(os.path.join(VENDOR, base + '_run_16x16.png')).convert('RGBA'),
             Image.open(os.path.join(VENDOR, base + '_idle_anim_16x16.png')).convert('RGBA')),
            ('%s' % spec[cid]['name'], sheets['run'], sheets['idle'])):
            d.text((pad, y), label, fill=(27, 31, 42))
            x = pad
            for i, f in enumerate(frames + walk):
                src = idle if i < len(frames) else run
                cell = src.crop((f * 16, 0, f * 16 + 16, 32)).resize((16 * z, 32 * z), Image.NEAREST)
                img.paste(cell, (x, y + 16), cell)
                x += 16 * z + pad
            y += rowh
    os.makedirs(os.path.dirname(PREVIEW), exist_ok=True)
    img.save(PREVIEW)
    print('wrote', os.path.relpath(PREVIEW, ROOT))


def main():
    spec = json.load(open(SPEC))
    spec = {k: v for k, v in spec.items() if not k.startswith('$')}
    only = sys.argv[1:]
    built = {cid: build_one(cid, ch) for cid, ch in spec.items() if not only or cid in only}
    if not only:
        preview(built, spec)


if __name__ == '__main__':
    main()
