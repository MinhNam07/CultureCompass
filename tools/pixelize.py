#!/usr/bin/env python3
"""Turns AI-generated "pixel art" (Gemini, on a #FF00FF background) into clean game sprites.

Usage:
  python3 tools/pixelize.py inspect assets/game/raw/van-mieu/bia-rua.png   # list the objects found in a sheet
  python3 tools/pixelize.py build                                           # build everything in assets/game/raw/spec.json

What `build` does for every output:
  1. background: magenta (and the purple shadows Gemini paints on it) and the Gemini sparkle watermark become transparent;
  2. the object is cut out (one connected object of the sheet, or a fixed box, or a grid cell);
  3. it is scaled down to the size asked for in the spec, one output pixel per block, taking the most common colour of each block
     (crisp pixels, no blur);
  4. colours are reduced to a small set, snapped to the Serene Village palette when close (docs/game/ref/palette-vn.txt),
     and the darkest tones become the outline colour #3a3a50.
Output PNGs go to assets/game/sprites/<out>. Nothing in raw/ is changed.
"""
import json, sys, os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'assets', 'game', 'raw')
OUT = os.path.join(ROOT, 'assets', 'game', 'sprites')
PALETTE_FILE = os.path.join(ROOT, 'docs', 'game', 'ref', 'palette-vn.txt')
OUTLINE = (0x3a, 0x3a, 0x50)


def load_palette():
    cols = []
    for line in open(PALETTE_FILE):
        line = line.split('#', 2)
        if len(line) >= 2 and len(line[1].strip()) >= 6:
            h = line[1].strip()[:6]
            cols.append(tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)))
    return np.array(cols, dtype=np.float32)


def background_mask(a):
    """True where the pixel is background: magenta-ish hue (incl. darker purple shadows) or the corner watermark."""
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    mag = (r - g > 70) & (b - g > 70) & (np.abs(r - b) < 90)
    h, w = r.shape
    # Gemini sparkle: light, low-saturation pixels in the bottom-right corner
    wm = np.zeros_like(mag)
    y0, x0 = int(h * .87), int(w * .9)
    corner = a[y0:, x0:, :3].astype(int)
    light = (corner.min(axis=2) > 150) & (corner.max(axis=2) - corner.min(axis=2) < 90)
    wm[y0:, x0:] = light
    return mag | wm | (a[..., 3] < 128)


def components(mask, step=8, gap=2):
    """Connected objects on a coarse grid (step px); `gap` coarse cells of dilation merge nearby bits (smoke, shadows)."""
    h, w = mask.shape
    H, W = h // step, w // step
    m = mask[:H * step, :W * step].reshape(H, step, W, step).any(axis=(1, 3))
    d = m.copy()
    for _ in range(gap):
        d = d | np.roll(d, 1, 0) | np.roll(d, -1, 0) | np.roll(d, 1, 1) | np.roll(d, -1, 1)
    lab = np.zeros((H, W), int)
    n = 0
    boxes = []
    for y in range(H):
        for x in range(W):
            if d[y, x] and not lab[y, x]:
                n += 1
                stack = [(y, x)]
                lab[y, x] = n
                y0 = y1 = y; x0 = x1 = x
                while stack:
                    cy, cx = stack.pop()
                    y0, y1, x0, x1 = min(y0, cy), max(y1, cy), min(x0, cx), max(x1, cx)
                    for ny, nx in ((cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)):
                        if 0 <= ny < H and 0 <= nx < W and d[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n
                            stack.append((ny, nx))
                # tighten to the real (undilated) pixels inside the box
                sub = mask[y0 * step:(y1 + 1) * step, x0 * step:(x1 + 1) * step]
                ys, xs = np.nonzero(sub)
                if len(ys) < 400:
                    continue
                boxes.append([int(x0 * step + xs.min()), int(y0 * step + ys.min()),
                              int(x0 * step + xs.max() + 1), int(y0 * step + ys.max() + 1)])
    # reading order: rows (by vertical overlap), then left to right
    boxes.sort(key=lambda b: (b[1], b[0]))
    rows = []
    for b in boxes:
        for row in rows:
            r0 = row[0]
            if b[1] < r0[3] and b[3] > r0[1]:
                row.append(b); break
        else:
            rows.append([b])
    out = []
    for row in rows:
        out += sorted(row, key=lambda b: b[0])
    return out


def downscale(rgba, fg, tw, th):
    """One output pixel per block: the most common colour among the block's foreground pixels (centre-weighted)."""
    h, w = fg.shape
    out = np.zeros((th, tw, 4), np.uint8)
    for oy in range(th):
        ya, yb = int(oy * h / th), max(int(oy * h / th) + 1, int((oy + 1) * h / th))
        for ox in range(tw):
            xa, xb = int(ox * w / tw), max(int(ox * w / tw) + 1, int((ox + 1) * w / tw))
            # inner 70% of the block avoids bleeding from neighbouring art pixels
            my, mx = (yb - ya) * .15, (xb - xa) * .15
            ia, ib = int(ya + my), max(int(ya + my) + 1, int(yb - my))
            ja, jb = int(xa + mx), max(int(xa + mx) + 1, int(xb - mx))
            m = fg[ia:ib, ja:jb]
            if m.mean() < .5:
                continue
            px = rgba[ia:ib, ja:jb, :3][m] // 8  # bucket similar colours
            keys = px[:, 0].astype(np.int32) * 1024 + px[:, 1] * 32 + px[:, 2]
            vals, counts = np.unique(keys, return_counts=True)
            k = vals[counts.argmax()]
            sel = px[keys == k]
            full = rgba[ia:ib, ja:jb, :3][m][keys == k].mean(axis=0)
            out[oy, ox, :3] = full.round().astype(np.uint8)
            out[oy, ox, 3] = 255
    return out


def reduce_colours(img, palette, n=24, snap=30.0):
    a = img.copy()
    op = a[..., 3] > 0
    if not op.any():
        return a
    pil = Image.fromarray(a[..., :3])
    q = pil.quantize(colors=n, method=Image.Quantize.MEDIANCUT)
    pal = np.array(q.getpalette()[:n * 3], np.float32).reshape(-1, 3)
    idx = np.array(q)
    for i, c in enumerate(pal):
        lum = .3 * c[0] + .59 * c[1] + .11 * c[2]
        if lum < 52:
            pal[i] = OUTLINE
            continue
        d = np.sqrt(((palette - c) ** 2).sum(axis=1))
        if d.min() < snap:
            pal[i] = palette[d.argmin()]
    a[..., :3] = pal[idx].round().astype(np.uint8)
    a[~op] = 0
    return a


def cut(a, mask, box, inset=0.0):
    x0, y0, x1, y1 = box
    if inset:
        dx, dy = (x1 - x0) * inset, (y1 - y0) * inset
        x0, y0, x1, y1 = int(x0 + dx), int(y0 + dy), int(x1 - dx), int(y1 - dy)
    return a[y0:y1, x0:x1], ~mask[y0:y1, x0:x1]


def inspect(path):
    a = np.array(Image.open(path).convert('RGBA'))
    mask = ~background_mask(a)
    for i, b in enumerate(components(mask)):
        print(i, b, 'size', b[2] - b[0], 'x', b[3] - b[1])


def build_one(entry, palette):
    src = os.path.join(RAW, entry['src'])
    a = np.array(Image.open(src).convert('RGBA'))
    bg = background_mask(a)
    fgmask = ~bg
    if 'box' in entry:
        boxes = [entry['box']]
    else:
        boxes = components(fgmask, gap=entry.get('gap', 2))
    for o in entry['outputs']:
        if 'grid' in o:  # cell of a tileset sheet: [index in reading order]
            box = boxes[o['grid']]
        else:
            box = boxes[o.get('index', 0)] if 'boxPx' not in o else o['boxPx']
        part, fg = cut(a, bg, box, o.get('inset', 0))
        if o.get('opaque'):
            fg = np.ones_like(fg)
        w, h = part.shape[1], part.shape[0]
        tw, th = o.get('w'), o.get('h')
        if not tw: tw = max(1, round(w * th / h))
        if not th: th = max(1, round(h * tw / w))
        img = downscale(part, fg, tw, th)
        img = reduce_colours(img, palette, n=o.get('colours', 24))
        if 'canvas' in o:  # pad into a fixed frame, bottom-centre (characters)
            cw, ch = o['canvas']
            frame = np.zeros((ch, cw, 4), np.uint8)
            ox, oy = (cw - img.shape[1]) // 2, ch - img.shape[0]
            frame[max(0, oy):, max(0, ox):max(0, ox) + img.shape[1]] = img[max(0, -oy):, :cw]
            img = frame
        if o.get('cropTop'):  # drop the top rows (e.g. a flag Gemini added on a roof)
            img = img[o['cropTop']:]
        dst = os.path.join(OUT, o['out'])
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        Image.fromarray(img).save(dst)
        print('wrote', os.path.relpath(dst, ROOT), img.shape[1], 'x', img.shape[0])


def build():
    spec = json.load(open(os.path.join(RAW, 'spec.json')))
    palette = load_palette()
    for e in spec['assets']:
        build_one(e, palette)


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[1] == 'inspect':
        inspect(sys.argv[2])
    elif len(sys.argv) > 1 and sys.argv[1] == 'build':
        build()
    else:
        print(__doc__)
