#!/usr/bin/env python3
"""Stand-in NPCs for the fuller maps, made from the existing Gemini NPCs (new clothes colours + a small accessory)
and from LimeZu's Adam and Alex (foreign visitors). Writes assets/game/sprites/npc/<id>-0.png and -1.png.
Replace any of them with the Gemini set I5 (docs/game/gemini-prompts.md) later: same names, 2 frames."""
import colorsys, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NPC = os.path.join(ROOT, 'assets/game/sprites/npc')
CH = os.path.join(ROOT, 'assets/game/vendor/limezu-interiors-free/Characters_free')
OL = (0x3a, 0x3a, 0x50)


def hx(h): h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def skinlike(c):
    r, g, b = c[:3]
    return r > 170 and g > 110 and b > 80 and r > g > b and r - b > 40


def recolour(im, rows, ramp):
    """Clothes in rows [y0, y1] take the colours of ramp (dark → light) by brightness rank."""
    im = im.copy(); p = im.load(); y0, y1 = rows
    cols = {}
    for y in range(max(0, y0), min(im.height, y1 + 1)):
        for x in range(im.width):
            c = p[x, y]
            if c[3] < 128 or c[:3] == OL or skinlike(c) or max(c[:3]) < 70: continue
            cols[c[:3]] = cols.get(c[:3], 0) + 1
    order = sorted(cols, key=lambda c: sum(c))
    ramp = [hx(h) for h in ramp]
    m = {c: ramp[min(len(ramp) - 1, int(i * len(ramp) / max(1, len(order))))] for i, c in enumerate(order)}
    for y in range(max(0, y0), min(im.height, y1 + 1)):
        for x in range(im.width):
            c = p[x, y]
            if c[3] >= 128 and c[:3] in m: p[x, y] = m[c[:3]] + (255,)
    return im


def draw(im, pts, widen=0):
    if widen:
        n = Image.new('RGBA', (im.width + widen, im.height)); n.alpha_composite(im, (widen // 2, 0)); im = n
    p = im.load()
    for x, y, c in pts:
        x += widen // 2
        if 0 <= x < im.width and 0 <= y < im.height: p[x, y] = hx(c) + (255,)
    return im


def head_top(im):
    p = im.load()
    for y in range(im.height):
        xs = [x for x in range(im.width) if p[x, y][3] > 128]
        if xs: return y, min(xs), max(xs)
    return 0, 0, im.width - 1


def grad_cap(im):
    y, a, b = head_top(im); cx = (a + b) // 2
    pts = [(x, y - 1, '#3a3a50') for x in range(cx - 6, cx + 7)] + [(x, y, '#2b2b3d') for x in range(cx - 5, cx + 6)]
    pts += [(cx + 5, y + 1, '#e8b84a'), (cx + 5, y + 2, '#e8b84a')]
    return draw(im, pts)


def cap(im, c):
    y, a, b = head_top(im)
    pts = [(x, y, c) for x in range(a + 1, b)] + [(x, y + 1, c) for x in range(a, b + 1)] + [(x, y + 2, '#3a3a50') for x in range(b - 1, b + 3)]
    return draw(im, pts)


def non_la(im):
    y, a, b = head_top(im); cx = (a + b) // 2
    pts = []
    for k in range(5):
        for x in range(cx - 1 - k * 2, cx + 2 + k * 2): pts.append((x, y - 3 + k, '#f1ce8e' if k < 4 else '#c78c59'))
    pts += [(cx - 9, y + 1, '#3a3a50'), (cx + 9, y + 1, '#3a3a50')]
    return draw(im, pts)


def flag(im):
    pts = [(15, y, '#7d6961') for y in range(8, 24)] + [(x, y, '#46c296') for x in range(16, 20) for y in range(8, 12)] + [(16, 9, '#fbf3e4')]
    return draw(im, pts, widen=8)


def load2(name):
    return [Image.open(os.path.join(NPC, '%s-%d.png' % (name, i))).convert('RGBA') for i in (0, 1)]


def save(name, frames):
    for i, f in enumerate(frames): f.save(os.path.join(NPC, '%s-%d.png' % (name, i)))
    print('npc', name, frames[0].size)


NAVY = ['#2b2b3d', '#3a3a50', '#565972']
V = {
    'huong-dan':   ('nhan-vien',   (13, 24), ['#ba2d2f', '#e63f38', '#fc5c46'], flag),
    'sinh-vien':   ('con-trai',    (12, 31), NAVY, grad_cap),
    'sinh-vien-b': ('nguoi-ban',   (13, 31), NAVY, grad_cap),
    'cu-ong':      ('ban-do-kho',  (13, 24), ['#7d6961', '#9c786b', '#b99e86'], lambda im: cap(im, '#4e6e61')),
    'ong-do':      ('ban-do-kho-b', (13, 31), ['#2b2b3d', '#406ac5', '#4280dd'], None),
    'tap-the-duc': ('ba',          (12, 31), ['#ba2d2f', '#e63f38', '#fc5c46'], None),
    'ban-kem':     ('con-trai',    (12, 24), ['#406ac5', '#4280dd', '#5ec8fc'], lambda im: cap(im, '#fbf3e4')),
    'boc-vac':     ('ban-do-kho-b', (13, 24), ['#4e6e61', '#568d61', '#70a858'], lambda im: cap(im, '#e8b84a')),
    'quet-la':     ('ba',          (12, 31), ['#4e6e61', '#568d7d', '#6bc2a3'], non_la),
    'ban-non':     ('ban-vai-b',   (13, 24), ['#b35e3f', '#c78c59', '#e0b870'], None),
    'ban-gia-vi':  ('ban-vai-c',   (13, 24), ['#568d61', '#70a858', '#9bc246'], None),
    'ban-hoa':     ('co-lan',      (13, 24), ['#ba2d2f', '#fc5c46', '#eab08c'], None),
    'ban-tra-da':  ('ba',          (12, 24), ['#406ac5', '#50a7e8', '#a9c6e8'], None),
    'khach-viet':  ('nguoi-ban',   (13, 24), ['#46c296', '#6bc2a3', '#a9c6e8'], None),
    'khach-viet-b': ('con-trai',   (12, 24), ['#e8b84a', '#f1ce8e', '#fbf3e4'], None),
}
for name, (base, rows, ramp, extra) in V.items():
    fr = [recolour(f, rows, ramp) for f in load2(base)]
    if extra: fr = [extra(f) for f in fr]
    save(name, fr)

# foreign visitors: LimeZu Adam and Alex, idle facing down (idle_anim frames 18–23)
for name, src in (('khach-tay', 'Adam'), ('khach-tay-b', 'Alex')):
    sh = Image.open(os.path.join(CH, src + '_idle_anim_16x16.png')).convert('RGBA')
    save(name, [sh.crop((f * 16, 0, f * 16 + 16, 32)) for f in (18, 21)])
