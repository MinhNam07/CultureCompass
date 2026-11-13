"""Tiny pixel-art kit for the hand-drawn game assets (tools/pixel/draw.py).
Follows docs/game/art-direction.md: 16 px grid, flat shades lit from the top-left, a 1 px #3a3a50 outline around every
standing object (added automatically by Sprite.outline), colours from docs/game/ref/palette-vn.txt."""
import random
from PIL import Image

OL = '#3a3a50'
C = {  # named colours, all from the palette (+ the VN extras)
    'ol': OL, 'dk': '#5e4e50', 'red': '#e63f38', 'red2': '#fc5c46', 'red3': '#ba2d2f', 'brown': '#b35e3f', 'brown2': '#7d6961',
    'tan': '#c78c59', 'tan2': '#b5754d', 'sand': '#d0be9c', 'cream': '#f1ce8e', 'ochre': '#e0b870', 'yellow': '#e8c976',
    'gold': '#e8b84a', 'white': '#eeeeee', 'paper': '#fbf3e4', 'grey': '#8a8a96', 'grey2': '#5a5a6a', 'slate': '#67798d',
    'slate2': '#565972', 'stone': '#a79796', 'stone2': '#9c786b', 'beige': '#b99e86', 'g1': '#76c564', 'g2': '#55b14e',
    'g3': '#568d61', 'g4': '#4e6e61', 'lime': '#9bc246', 'moss': '#70a858', 'teal': '#46c296', 'mint': '#6bc2a3',
    'w1': '#5ec8fc', 'w2': '#50a7e8', 'w3': '#4280dd', 'w4': '#406ac5', 'sky': '#a9c6e8', 'skin': '#eab08c', 'skin2': '#c98a6b',
    'mauve': '#a5907b',
}


def rgb(c):
    c = C.get(c, c).lstrip('#')
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4)) + (255,)


class Sprite:
    def __init__(self, w, h):
        self.w, self.h = w, h
        self.im = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        self.p = self.im.load()

    def px(self, x, y, c):
        if 0 <= x < self.w and 0 <= y < self.h:
            self.p[x, y] = rgb(c)

    def get(self, x, y):
        return self.p[x, y] if 0 <= x < self.w and 0 <= y < self.h else (0, 0, 0, 0)

    def rect(self, x0, y0, x1, y1, c):  # inclusive
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                self.px(x, y, c)

    def hline(self, x0, x1, y, c): self.rect(x0, y, x1, y, c)
    def vline(self, x, y0, y1, c): self.rect(x, y0, x, y1, c)

    def box(self, x0, y0, x1, y1, fill, edge=OL):
        self.rect(x0, y0, x1, y1, fill)
        self.hline(x0, x1, y0, edge); self.hline(x0, x1, y1, edge); self.vline(x0, y0, y1, edge); self.vline(x1, y0, y1, edge)

    def ellipse(self, cx, cy, rx, ry, c):
        for y in range(int(cy - ry), int(cy + ry) + 1):
            for x in range(int(cx - rx), int(cx + rx) + 1):
                if ((x - cx) / max(rx, .5)) ** 2 + ((y - cy) / max(ry, .5)) ** 2 <= 1.0:
                    self.px(x, y, c)

    def speckle(self, x0, y0, x1, y1, cols, n, seed=1):
        r = random.Random(seed)
        for _ in range(n):
            self.px(r.randint(x0, x1), r.randint(y0, y1), r.choice(cols))

    def outline(self, c=OL):
        """1 px outline on the transparent pixels around the drawn shape (4-neighbours)."""
        add = []
        for y in range(self.h):
            for x in range(self.w):
                if self.p[x, y][3]:
                    continue
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    q = self.get(x + dx, y + dy)
                    if q[3] and q[:3] != rgb(c)[:3]:
                        add.append((x, y)); break
        for x, y in add:
            self.px(x, y, c)
        return self

    def paste(self, other, x, y):
        self.im.alpha_composite(other.im if isinstance(other, Sprite) else other, (x, y))
        self.p = self.im.load()

    def flip(self):
        s = Sprite(self.w, self.h); s.im = self.im.transpose(Image.FLIP_LEFT_RIGHT); s.p = s.im.load(); return s

    def save(self, path):
        self.im.save(path)


def roof(s, x0, x1, y0, y1, base='red', light='red2', dark='red3', curl=True, ridge=True):
    """A Vietnamese tiled roof seen from the front: tile courses, a dark ridge, upturned corners when curl."""
    hgt = max(1, y1 - y0)
    for y in range(y0, y1 + 1):
        k = (y - y0)
        inset = (hgt - k) // 3                       # the roof slopes in towards the ridge
        for x in range(x0 + inset, x1 - inset + 1):
            c = base
            if (x - x0) % 4 == 0: c = dark            # rows of curved tiles
            elif (x - x0) % 4 == 1: c = light
            if k % 4 == 3: c = dark if (x - x0) % 4 == 0 else 'red3'   # course line
            s.px(x, y, c)
        s.px(x0 + inset, y, dark); s.px(x1 - inset, y, dark)
    s.hline(x0, x1, y1, dark)
    if ridge:
        ri = hgt // 3
        s.rect(x0 + ri + 1, y0 - 2, x1 - ri - 1, y0 - 1, 'red3')
        s.hline(x0 + ri + 1, x1 - ri - 1, y0 - 2, 'dk')
        s.rect(x0 + ri, y0 - 5, x0 + ri + 1, y0 - 2, 'red3'); s.px(x0 + ri - 1, y0 - 5, 'red3')   # ridge ends curl up
        s.rect(x1 - ri - 1, y0 - 5, x1 - ri, y0 - 2, 'red3'); s.px(x1 - ri + 1, y0 - 5, 'red3')
        cx = (x0 + x1) // 2                           # small ornament in the middle of the ridge
        s.rect(cx - 2, y0 - 4, cx + 2, y0 - 3, 'gold'); s.px(cx, y0 - 5, 'gold')
    if curl:  # upturned eaves at both lower corners
        for i in range(4):
            s.px(x0 - 1 - i, y1 - i, dark); s.px(x0 - i, y1 - i, base)
            s.px(x1 + 1 + i, y1 - i, dark); s.px(x1 + i, y1 - i, base)
