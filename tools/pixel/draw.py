#!/usr/bin/env python3
"""Hand-drawn (by code) pixel assets for the fuller Hà Nội maps.

  python3 tools/pixel/draw.py          # writes everything below, then docs/game/hand-drawn-preview.png

Outputs
  assets/game/tilesets/hn-tiles.png (+ hn-tiles.json: name → tile index)   temple wall, pond kerb, paving, lake edge
  assets/game/sprites/hn/<name>.png                                       props and stand-in buildings
Stand-in buildings (dai-trung-mon, dai-thanh-mon, thai-hoc, den-ngoc-son, thap-rua…) are replaced by the Gemini
versions (docs/game/gemini-prompts.md, group I) once they exist: keep the same file name and size."""
import json, os, random
from kit import Sprite, roof, rgb, C, OL

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SPR = os.path.join(ROOT, 'assets', 'game', 'sprites', 'hn')
TS = os.path.join(ROOT, 'assets', 'game', 'tilesets')
os.makedirs(SPR, exist_ok=True)
OUT = {}


def save(name, s):
    path = os.path.join(SPR, name + '.png')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    s.save(path); OUT[name] = s


# ---------------------------------------------------------------- tiles
TILES = []


def tile(name):
    s = Sprite(16, 16); TILES.append((name, s)); return s


def coping(s, left=False, right=False):
    # small tiled roof on top of the wall: ridge, two courses of red tiles, eave line
    s.rect(0, 3, 15, 13, 'red')
    for x in range(16):
        if x % 3 == 0: s.vline(x, 6, 12, 'red3')
    s.hline(0, 15, 6, 'red2'); s.hline(0, 15, 9, 'red2')
    s.rect(0, 2, 15, 4, 'red3'); s.hline(0, 15, 1, OL); s.hline(0, 15, 2, 'dk')
    s.hline(0, 15, 13, 'red3'); s.hline(0, 15, 14, OL); s.hline(0, 15, 15, 'brown')
    if left: s.vline(0, 1, 15, OL)
    if right: s.vline(15, 1, 15, OL)


def face(s, seed, left=False, right=False):
    s.rect(0, 0, 15, 15, 'ochre')
    s.hline(0, 15, 0, 'tan2')
    s.speckle(0, 1, 15, 10, ['cream', 'yellow', 'tan'], 7, seed)
    r = random.Random(seed)
    if r.random() < .5: s.rect(r.randint(1, 10), 8, r.randint(11, 14), 10, 'yellow')  # a faded patch
    s.rect(0, 11, 15, 15, 'tan2')              # brick plinth
    for x in range(0, 16, 4): s.vline(x + (2 if True else 0), 12, 15, 'brown')
    s.hline(0, 15, 11, 'brown'); s.hline(0, 15, 13, 'brown')
    if r.random() < .6: s.px(r.randint(0, 15), 10, 'moss'); s.px(r.randint(0, 15), 10, 'g3')
    if left: s.vline(0, 0, 15, OL)
    if right: s.vline(15, 0, 15, OL)


coping(tile('coping-l'), left=True); coping(tile('coping-m')); coping(tile('coping-r'), right=True)
for i in range(3): face(tile('face-%d' % i), i + 3)
face(tile('face-l'), 9, left=True); face(tile('face-r'), 11, right=True)

for i, name in enumerate(['paving', 'paving-b']):          # big grey stone slabs along walls and in front of halls
    s = tile(name); s.rect(0, 0, 15, 15, 'stone')
    s.hline(0, 15, 7 + i, 'stone2'); s.vline(7 if i else 11, 0, 7 + i, 'stone2'); s.vline(3 if i else 5, 8 + i, 15, 'stone2')
    s.speckle(0, 0, 15, 15, ['beige', 'sand'], 6, 20 + i)
s = tile('gravel'); s.rect(0, 0, 15, 15, 'sand'); s.speckle(0, 0, 15, 15, ['beige', 'stone', 'cream'], 26, 31)


def kerb(s, top=False, bottom=False, left=False, right=False):
    """Thiên Quang well: a square of water inside a grey-green stone kerb; the top edge has a low balustrade."""
    s.rect(0, 0, 15, 15, 'w3')
    if top: s.rect(0, 0, 15, 15, 'w4')
    if top:
        s.rect(0, 0, 15, 9, 'slate')
        s.hline(0, 15, 0, OL); s.hline(0, 15, 1, 'sky'); s.hline(0, 15, 3, 'slate2')   # rail
        for x in (1, 6, 11): s.rect(x, 1, x + 2, 7, 'sky'); s.vline(x + 2, 2, 7, 'slate2')  # balusters
        s.hline(0, 15, 8, 'slate2'); s.hline(0, 15, 9, OL); s.rect(0, 10, 15, 12, 'w4')
    if bottom:
        s.rect(0, 11, 15, 15, 'slate'); s.hline(0, 15, 11, 'sky'); s.hline(0, 15, 15, OL); s.hline(0, 15, 14, 'slate2')
    if left:
        s.rect(0, 0, 4, 15, 'slate'); s.vline(4, 0, 15, 'slate2'); s.vline(0, 0, 15, OL); s.vline(1, 0, 15, 'sky')
    if right:
        s.rect(11, 0, 15, 15, 'slate'); s.vline(11, 0, 15, 'slate2'); s.vline(15, 0, 15, OL)
    if top and left: s.rect(0, 0, 4, 9, 'slate'); s.rect(1, 1, 3, 8, 'sky'); s.vline(0, 0, 15, OL)
    if top and right: s.rect(11, 0, 15, 9, 'slate'); s.rect(12, 1, 14, 8, 'sky'); s.vline(15, 0, 15, OL)


for n, kw in [('kerb-tl', dict(top=1, left=1)), ('kerb-t', dict(top=1)), ('kerb-tr', dict(top=1, right=1)),
              ('kerb-l', dict(left=1)), ('kerb-r', dict(right=1)), ('kerb-bl', dict(bottom=1, left=1)),
              ('kerb-b', dict(bottom=1)), ('kerb-br', dict(bottom=1, right=1))]:
    kerb(tile(n), **kw)
s = tile('water'); s.rect(0, 0, 15, 15, 'w3'); s.hline(3, 6, 5, 'w2'); s.hline(10, 13, 11, 'w2')
s = tile('water-b'); s.rect(0, 0, 15, 15, 'w3'); s.hline(8, 11, 3, 'w2'); s.hline(2, 4, 12, 'w1')
for i in range(2):  # lotus leaves on the water
    s = tile('lotus-%d' % i); s.rect(0, 0, 15, 15, 'w3')
    for cx, cy, r in ([(5, 6, 4), (11, 11, 3)] if i == 0 else [(10, 5, 3), (5, 11, 4)]):
        s.ellipse(cx, cy, r, r - 1, 'g2'); s.ellipse(cx - 1, cy - 1, r - 2, r - 2, 'g1'); s.px(cx, cy, 'g3'); s.px(cx + 1, cy, 'w3')
    if i == 1: s.rect(9, 3, 10, 4, 'red2'); s.px(10, 3, 'paper')
# lake shore (Hồ Gươm): stone edge between the promenade and the water, and open lake water
s = tile('shore'); s.rect(0, 0, 15, 15, 'w2'); s.rect(0, 0, 15, 5, 'stone'); s.hline(0, 15, 5, 'stone2'); s.hline(0, 15, 6, OL)
s.hline(0, 15, 7, 'w4'); s.hline(4, 8, 11, 'w1')
for x in (0, 8): s.vline(x, 0, 5, 'stone2')
s = tile('lake'); s.rect(0, 0, 15, 15, 'w2'); s.hline(2, 5, 4, 'w1'); s.hline(10, 12, 12, 'w1')
s = tile('lake-b'); s.rect(0, 0, 15, 15, 'w2'); s.hline(7, 10, 8, 'w1')
s = tile('rail'); s.vline(1, 6, 15, OL); s.vline(2, 6, 15, 'grey2'); s.hline(0, 15, 7, OL); s.hline(0, 15, 8, 'grey2')
s.hline(0, 15, 12, 'grey2'); s.rect(1, 5, 2, 6, 'grey')
for i, base in enumerate(['g1', 'g2']):  # trimmed hedge rows (box hedges in the temple courtyards)
    s = tile('hedge-%d' % i); s.rect(0, 3, 15, 13, 'g3'); s.rect(0, 3, 15, 8, base); s.speckle(0, 3, 15, 8, ['lime', 'g1', 'g2'], 10, 40 + i)
    s.hline(0, 15, 2, OL); s.hline(0, 15, 14, OL); s.hline(0, 15, 13, 'g4')
s = tile('leaves'); s.speckle(0, 0, 15, 15, ['gold', 'tan', 'lime'], 6, 77)       # fallen leaves (overlay)
s = tile('moss'); s.speckle(0, 0, 15, 15, ['moss', 'g3'], 9, 78)
s = tile('flowers'); [s.px(x, y, c) for x, y, c in [(3, 4, 'red2'), (4, 4, 'paper'), (10, 9, 'gold'), (12, 3, 'paper'), (6, 12, 'red2'), (13, 13, 'gold')]]
s = tile('grass-tuft'); [s.px(x, y, c) for x, y, c in [(4, 5, 'g3'), (5, 4, 'g3'), (6, 5, 'g3'), (11, 11, 'g3'), (12, 10, 'g3'), (13, 11, 'g3')]]

cols = 16
sheet = Sprite(cols * 16, ((len(TILES) + cols - 1) // cols) * 16)
for i, (n, s) in enumerate(TILES): sheet.paste(s, (i % cols) * 16, (i // cols) * 16)
sheet.save(os.path.join(TS, 'hn-tiles.png'))
json.dump({n: i for i, (n, _) in enumerate(TILES)}, open(os.path.join(TS, 'hn-tiles.json'), 'w'), indent=1)


# ---------------------------------------------------------------- buildings (stand-ins until the Gemini art arrives)
def hall(w, h, openings=3, wall='cream', storeys=1, board=True, steps=True, pillars='red3', door='red3', roof_top=6):
    s = Sprite(w, h)
    base = h - (5 if steps else 1)
    rt = roof_top + int((base - roof_top) * (0.50 if storeys == 1 else 0.36))
    wx0, wx1 = 6, w - 7
    # wall
    s.rect(wx0, rt, wx1, base, wall)
    s.hline(wx0, wx1, rt + 1, 'dk' if wall == 'red3' else 'tan')
    n = openings
    span = (wx1 - wx0) / n
    for i in range(n):
        cx = wx0 + span * (i + .5)
        dw = int(span * (0.55 if i == n // 2 else 0.45)) // 2
        top = rt + 4 if i == n // 2 else rt + 6
        s.rect(int(cx) - dw, top, int(cx) + dw, base, 'dk')
        s.rect(int(cx) - dw, top, int(cx) - dw + 1, base, door); s.rect(int(cx) + dw - 1, top, int(cx) + dw, base, door)
        s.hline(int(cx) - dw, int(cx) + dw, top, OL)
        for yy in range(top + 3, base, 4): s.px(int(cx) - dw, yy, 'gold'); s.px(int(cx) + dw, yy, 'gold')
    for i in range(n + 1):  # lacquered pillars between the doors
        x = int(wx0 + span * i)
        x = min(max(x, wx0), wx1 - 1)
        s.rect(x, rt + 2, x + 1, base, pillars); s.px(x, rt + 2, 'gold'); s.px(x + 1, rt + 2, 'gold')
    if board:
        bx = w // 2
        s.rect(bx - 7, rt + 1, bx + 7, rt + 3, 'dk'); s.hline(bx - 5, bx + 5, rt + 2, 'gold')
    if steps:
        s.rect(wx0 - 2, base + 1, wx1 + 2, h - 2, 'stone'); s.hline(wx0 - 2, wx1 + 2, base + 1, 'sand')
        s.hline(wx0 - 2, wx1 + 2, base + 3, 'stone2'); s.hline(wx0 - 3, wx1 + 3, h - 2, 'stone2')
    # roofs
    if storeys == 2:
        ut = roof_top
        ub = ut + int((rt - ut) * 0.42)
        roof(s, 12, w - 13, ut, ub)
        s.rect(16, ub + 1, w - 17, ub + 6, 'red3')                      # upper floor: lattice band
        for x in range(18, w - 18, 3): s.vline(x, ub + 2, ub + 5, 'gold')
        s.hline(16, w - 17, ub + 6, OL)
        roof(s, 3, w - 4, ub + 7, rt - 1, ridge=False)
    else:
        roof(s, 3, w - 4, roof_top, rt - 1)
    return s.outline()


save('dai-trung-mon', hall(128, 80, openings=3, wall='cream'))
save('dai-thanh-mon', hall(128, 80, openings=3, wall='red3', pillars='brown'))
save('thai-hoc', hall(176, 144, openings=5, wall='red3', storeys=2, pillars='brown'))
save('ta-vu', hall(96, 64, openings=4, wall='cream', board=False))
save('cong-phu', hall(48, 48, openings=1, wall='cream', board=False, steps=False, roof_top=5))
save('den-ngoc-son', hall(160, 96, openings=3, wall='ochre', pillars='red3'))
save('nha-trong', hall(48, 64, openings=1, wall='red3', board=False, roof_top=5))   # drum / bell house


def thap_rua():
    s = Sprite(64, 80)
    s.ellipse(32, 72, 30, 7, 'g2'); s.ellipse(31, 70, 26, 5, 'g1')            # small grassy mound
    s.ellipse(12, 58, 8, 8, 'g3'); s.ellipse(11, 56, 6, 6, 'g2'); s.rect(11, 62, 12, 68, 'brown')  # a tree
    for i, (y0, y1, hw) in enumerate([(50, 68, 13), (34, 49, 11), (20, 33, 9)]):
        s.rect(32 - hw, y0, 32 + hw, y1, 'beige' if i % 2 else 'sand')
        s.hline(32 - hw - 1, 32 + hw + 1, y0, 'stone2'); s.hline(32 - hw - 2, 32 + hw + 2, y0 - 1, 'stone')
        for k in (-1, 0, 1):  # pointed-arch openings
            ax = 32 + k * (hw - 4 if hw > 9 else 5)
            s.rect(ax - 1, y0 + 5, ax + 1, y1 - 2, 'dk'); s.px(ax, y0 + 4, 'dk')
    s.rect(29, 12, 35, 19, 'sand'); s.hline(28, 36, 12, 'stone2'); s.rect(31, 6, 33, 11, 'beige'); s.px(32, 4, 'stone2'); s.px(32, 5, 'stone')
    return s.outline()


save('thap-rua', thap_rua())


def dai_nghien():
    s = Sprite(32, 32)
    s.rect(4, 22, 27, 29, 'stone'); s.hline(4, 27, 22, 'sand'); s.hline(4, 27, 29, 'stone2')          # plinth
    for fx in (7, 15, 23): s.ellipse(fx, 20, 3, 2, 'moss'); s.px(fx - 1, 19, 'g3'); s.px(fx + 1, 19, 'g3')  # three frogs
    s.ellipse(16, 13, 10, 5, 'slate'); s.ellipse(15, 12, 8, 3, 'sky'); s.ellipse(16, 12, 4, 1, 'slate2')    # the ink slab
    return s.outline()


save('dai-nghien', dai_nghien())

# ---------------------------------------------------------------- props
def tru_bieu():  # tứ trụ: tall square pillar with a lotus top
    s = Sprite(16, 56)
    s.rect(4, 14, 11, 52, 'cream'); s.vline(10, 14, 52, 'ochre'); s.vline(11, 14, 52, 'tan')
    for y in (20, 30, 40): s.hline(5, 10, y, 'ochre'); s.rect(6, y + 2, 9, y + 6, 'red3'); s.vline(7, y + 3, y + 5, 'gold')
    s.rect(3, 50, 12, 55, 'stone'); s.hline(3, 12, 50, 'sand')
    s.rect(3, 10, 12, 13, 'ochre'); s.ellipse(7.5, 7, 4, 3, 'red2'); s.ellipse(7, 6, 2, 2, 'red'); s.px(7, 2, 'gold'); s.px(7, 3, 'gold')
    return s.outline()


save('tru-bieu', tru_bieu())


def pillar():  # wall end post, stands above the coping
    s = Sprite(16, 40)
    s.rect(3, 6, 12, 39, 'ochre'); s.vline(11, 6, 39, 'tan'); s.vline(12, 6, 39, 'tan2'); s.vline(4, 6, 39, 'cream')
    s.rect(3, 30, 12, 39, 'tan2'); s.hline(3, 12, 30, 'brown'); s.hline(3, 12, 34, 'brown')
    s.rect(1, 3, 14, 6, 'red'); s.hline(1, 14, 3, 'red2'); s.hline(1, 14, 6, 'red3'); s.rect(5, 0, 10, 2, 'red3')
    return s.outline()


save('tru-tuong', pillar())


def bonsai(kind=0):
    s = Sprite(24, 28)
    pot = ['paper', 'w3'] if kind == 0 else ['tan', 'brown']
    s.rect(4, 19, 19, 26, pot[0]); s.hline(4, 19, 19, pot[1]); s.hline(5, 18, 23, pot[1]); s.hline(5, 18, 26, 'stone2')
    if kind == 0:
        for x in (7, 11, 15): s.px(x, 21, 'w3'); s.px(x + 1, 22, 'w3')
    s.vline(11, 10, 18, 'brown'); s.px(10, 13, 'brown'); s.px(12, 15, 'brown'); s.px(13, 14, 'brown')
    for cx, cy, r in [(7, 11, 4), (16, 9, 5), (11, 5, 4)]:
        s.ellipse(cx, cy, r, r - 1, 'g3'); s.ellipse(cx - 1, cy - 1, r - 2, r - 2, 'g2')
    return s.outline()


save('cay-canh', bonsai(0)); save('cay-canh-b', bonsai(1))


def jar(c1='tan', c2='brown', h=20):
    s = Sprite(16, h)
    s.ellipse(7.5, h - 8, 6, 7, c1); s.ellipse(6, h - 10, 3, 4, 'cream' if c1 == 'tan' else 'sky'); s.rect(5, h - 17, 10, h - 14, c2)
    s.hline(4, 11, h - 17, c2); s.hline(3, 12, h - 2, 'stone2')
    return s.outline()


save('chum', jar()); save('chum-men', jar('w3', 'w4'))


def lantern_post():  # stone lantern / lamp of the temple courtyards
    s = Sprite(16, 32)
    s.rect(5, 12, 10, 29, 'stone'); s.vline(10, 12, 29, 'stone2'); s.rect(3, 28, 12, 31, 'stone2')
    s.rect(3, 5, 12, 11, 'red'); s.rect(5, 6, 10, 10, 'gold'); s.hline(2, 13, 4, 'red3'); s.rect(6, 1, 9, 3, 'red3')
    return s.outline()


save('den-long', lantern_post())


def drum():
    s = Sprite(32, 40)
    s.rect(4, 10, 6, 39, 'brown'); s.rect(25, 10, 27, 39, 'brown'); s.hline(2, 29, 9, 'brown'); s.hline(2, 29, 8, 'red3')
    s.ellipse(16, 24, 10, 11, 'red3'); s.ellipse(16, 24, 8, 9, 'red'); s.ellipse(15, 23, 6, 7, 'cream'); s.ellipse(14, 21, 2, 2, 'paper')
    s.rect(6, 36, 25, 37, 'brown')
    return s.outline()


def bell():
    s = Sprite(32, 40)
    s.rect(4, 6, 6, 39, 'brown'); s.rect(25, 6, 27, 39, 'brown'); s.rect(2, 3, 29, 6, 'red'); s.hline(2, 29, 6, 'red3'); s.hline(4, 27, 2, 'red3')
    s.vline(16, 7, 10, 'dk'); s.ellipse(16, 18, 6, 8, 'g4'); s.rect(10, 18, 22, 29, 'g4'); s.rect(9, 28, 23, 31, 'g3')
    s.vline(12, 13, 29, 'mint'); s.hline(10, 22, 22, 'g3')
    return s.outline()


save('trong', drum()); save('chuong', bell())


def calligrapher_table():  # ông đồ's low table with red paper, ink and brushes
    s = Sprite(40, 24)
    s.rect(2, 8, 37, 13, 'brown'); s.hline(2, 37, 8, 'tan'); s.rect(4, 14, 5, 22, 'brown'); s.rect(34, 14, 35, 22, 'brown')
    s.rect(8, 6, 17, 9, 'red'); s.rect(20, 5, 29, 9, 'red2'); s.vline(12, 6, 8, 'dk'); s.vline(24, 6, 8, 'dk'); s.px(26, 7, 'dk')
    s.rect(31, 6, 34, 8, 'dk'); s.vline(33, 1, 6, 'brown'); s.vline(35, 2, 6, 'brown')
    for i, x in enumerate((3, 9, 15)):  # hanging finished scrolls in front
        s.rect(x, 15, x + 4, 22, 'red2'); s.vline(x + 2, 16, 21, 'dk')
    return s.outline()


save('ban-ong-do', calligrapher_table())


def stall_frame(w, h, goods, awning='red'):
    """A market stall: a wooden counter with goods on it and an awning."""
    s = Sprite(w, h)
    s.rect(1, 2, w - 2, 7, awning); s.hline(1, w - 2, 2, 'paper' if awning != 'paper' else 'red')
    for x in range(1, w - 1, 6): s.rect(x, 3, x + 2, 7, 'paper')
    s.vline(2, 8, h - 2, 'brown'); s.vline(w - 3, 8, h - 2, 'brown')
    s.rect(1, h - 12, w - 2, h - 2, 'tan'); s.hline(1, w - 2, h - 12, 'cream'); s.hline(1, w - 2, h - 7, 'tan2')
    goods(s)
    return s.outline()


def hats(s):  # conical hats stacked
    for i, x in enumerate(range(6, 44, 9)):
        y = s.h - 15 - (i % 2) * 4
        for k in range(5): s.hline(x - k, x + k, y - 4 + k, 'cream' if k < 4 else 'tan')
        s.px(x, y - 4, 'tan2')
    for x in range(8, 42, 10): s.vline(x, 12, 20, 'tan'); s.ellipse(x, 11, 3, 2, 'cream')


def baskets(s):
    for x in range(4, s.w - 10, 10):
        y = s.h - 16
        s.rect(x, y, x + 8, y + 4, 'tan'); s.hline(x, x + 8, y, 'brown'); s.px(x + 2, y + 2, 'brown'); s.px(x + 6, y + 2, 'brown')
    for x in range(6, s.w - 8, 9): s.ellipse(x + 2, 13, 3, 3, 'tan'); s.ellipse(x + 2, 13, 1, 1, 'brown')


def spices(s):
    cols = ['red', 'gold', 'brown', 'moss', 'red3', 'cream']
    for i, x in enumerate(range(4, s.w - 8, 7)):
        y = s.h - 15
        s.rect(x, y, x + 5, y + 3, 'paper'); s.ellipse(x + 2.5, y - 1, 3, 2, cols[i % len(cols)])


def flowers(s):
    cols = ['red2', 'gold', 'paper', 'red', 'mint']
    for i, x in enumerate(range(4, s.w - 6, 5)):
        y = s.h - 15
        s.rect(x, y, x + 3, y + 4, 'w3'); s.vline(x + 1, y - 4, y, 'g3')
        s.ellipse(x + 1.5, y - 6, 2, 2, cols[i % len(cols)])


save('sap-non', stall_frame(48, 40, hats, 'red'))
save('sap-may-tre', stall_frame(48, 40, baskets, 'g3'))
save('sap-gia-vi', stall_frame(48, 40, spices, 'gold'))
save('sap-hoa', stall_frame(48, 40, flowers, 'w3'))


def sack(c='beige'):
    s = Sprite(16, 18)
    s.rect(2, 5, 13, 16, c); s.ellipse(7.5, 5, 5, 2, 'paper' if c != 'paper' else 'cream'); s.ellipse(7.5, 5, 3, 1, 'gold')
    s.vline(12, 6, 16, 'stone2' if c == 'beige' else 'tan2'); s.hline(2, 13, 10, 'stone2' if c == 'beige' else 'tan2')
    return s.outline()


save('bao-tai', sack()); save('bao-tai-b', sack('tan'))


def scale():
    s = Sprite(16, 16)
    s.rect(3, 8, 12, 14, 'red'); s.rect(5, 10, 10, 12, 'paper'); s.vline(7, 10, 11, 'dk'); s.ellipse(7.5, 6, 6, 2, 'grey'); s.ellipse(7.5, 6, 4, 1, 'white')
    return s.outline()


save('can', scale())


def bucket(c='red'):
    s = Sprite(16, 16)
    s.rect(3, 5, 12, 14, c); s.ellipse(7.5, 5, 5, 2, 'w3'); s.vline(11, 6, 14, 'red3' if c == 'red' else 'w4'); s.hline(2, 13, 4, c)
    return s.outline()


save('xo', bucket()); save('xo-xanh', bucket('w3'))


def foam_box():
    s = Sprite(16, 16)
    s.rect(1, 4, 14, 14, 'paper'); s.hline(1, 14, 4, 'white'); s.rect(1, 1, 14, 4, 'white'); s.hline(1, 14, 6, 'sky'); s.vline(13, 5, 14, 'sky')
    return s.outline()


save('thung-xop', foam_box())


def basket_round():
    s = Sprite(16, 12)
    s.ellipse(7.5, 6, 7, 4, 'tan'); s.ellipse(7.5, 5, 5, 2, 'brown')
    for x in range(2, 14, 3): s.px(x, 8, 'brown')
    return s.outline()


save('gio', basket_round())


def cart(load='boxes'):
    s = Sprite(40, 28)
    s.rect(4, 14, 33, 19, 'brown'); s.hline(4, 33, 14, 'tan'); s.rect(32, 10, 38, 12, 'brown')   # bed + handle
    s.ellipse(9, 22, 4, 4, 'dk'); s.ellipse(9, 22, 2, 2, 'grey'); s.ellipse(27, 22, 4, 4, 'dk'); s.ellipse(27, 22, 2, 2, 'grey')
    if load == 'boxes':
        s.rect(5, 4, 15, 13, 'tan'); s.vline(10, 4, 13, 'tan2'); s.rect(16, 7, 31, 13, 'beige'); s.hline(16, 31, 10, 'stone2')
        s.rect(18, 1, 26, 6, 'paper'); s.hline(18, 26, 3, 'sky')
    else:
        s.ellipse(12, 10, 7, 4, 'g2'); s.ellipse(22, 9, 7, 5, 'gold'); s.ellipse(29, 11, 4, 3, 'red2')
    return s.outline()


save('xe-tho', cart()); save('xe-day-hoa-qua', cart('fruit'))


def tea_stall():  # hàng nước chè: low table, kettle, glasses, jars of sweets
    s = Sprite(32, 24)
    s.rect(2, 10, 29, 15, 'w3'); s.hline(2, 29, 10, 'w2'); s.rect(4, 16, 5, 22, 'grey2'); s.rect(26, 16, 27, 22, 'grey2')
    s.ellipse(8, 7, 3, 3, 'paper'); s.rect(5, 3, 11, 9, 'sky'); s.ellipse(8, 3, 3, 1, 'g2')          # jar of green tea leaves
    s.ellipse(16, 7, 3, 3, 'white'); s.ellipse(16, 4, 1, 1, 'grey'); s.px(19, 6, 'grey'); s.px(20, 5, 'grey')  # kettle
    for x in (22, 25): s.rect(x, 6, x + 1, 9, 'sky'); s.px(x, 7, 'gold')
    s.rect(11, 7, 13, 9, 'red2')
    return s.outline()


save('hang-nuoc', tea_stall())


def broom():
    s = Sprite(16, 28)
    s.vline(8, 2, 18, 'brown'); s.vline(9, 2, 18, 'tan')
    for k in range(7): s.vline(5 + k, 19 + (1 if k in (0, 6) else 0), 26, 'gold' if k % 2 else 'tan')
    return s.outline()


save('choi', broom())


def sign_arrow(color='g3'):
    s = Sprite(32, 32)
    s.rect(14, 12, 16, 31, 'brown'); s.vline(16, 12, 31, 'tan2')
    s.rect(2, 3, 24, 12, color); s.hline(2, 24, 3, 'g1' if color == 'g3' else 'red2')
    for k in range(5): s.vline(25 + k, 3 + k, 12 - k, color)
    for x in range(5, 20, 3): s.px(x, 7, 'paper'); s.px(x + 1, 7, 'paper'); s.px(x, 9, 'paper')
    return s.outline()


save('bien-chi-duong', sign_arrow()); save('bien-chi-duong-b', sign_arrow().flip())


def chess_table():
    s = Sprite(32, 20)
    s.rect(3, 6, 28, 11, 'stone'); s.hline(3, 28, 6, 'sand'); s.rect(5, 12, 7, 19, 'stone2'); s.rect(24, 12, 26, 19, 'stone2')
    s.rect(8, 2, 23, 8, 'cream'); s.hline(8, 23, 5, 'tan2')
    for x, y, c in [(10, 3, 'red'), (14, 4, 'red'), (18, 3, 'dk'), (21, 7, 'dk'), (12, 7, 'red'), (16, 7, 'dk')]:
        s.rect(x, y, x + 1, y + 1, c)
    return s.outline()


save('ban-co', chess_table())


def balloons():
    s = Sprite(24, 40)
    for (x, y, c) in [(6, 7, 'red2'), (14, 4, 'gold'), (19, 10, 'w1'), (10, 13, 'mint')]:
        s.ellipse(x, y, 4, 5, c); s.px(x - 1, y - 2, 'paper'); s.vline(x, y + 5, 30, 'grey')
    s.rect(10, 30, 13, 39, 'brown')
    return s.outline()


save('bong-bay', balloons())


def ice_box():
    s = Sprite(24, 24)
    s.rect(2, 8, 21, 21, 'w3'); s.rect(2, 4, 21, 8, 'paper'); s.hline(2, 21, 8, 'sky'); s.rect(6, 12, 17, 16, 'paper')
    s.rect(8, 13, 9, 15, 'red'); s.rect(12, 13, 13, 15, 'gold'); s.rect(15, 13, 16, 15, 'red2')
    s.rect(4, 22, 6, 23, 'grey2'); s.rect(17, 22, 19, 23, 'grey2')
    return s.outline()


save('thung-kem', ice_box())


def plastic_stack(c='red'):
    s = Sprite(16, 22)
    for k in range(3):
        y = 4 + k * 3
        s.rect(2, y, 13, y + 2, c); s.hline(2, 13, y, 'red2' if c == 'red' else 'w1')
    s.rect(2, 13, 4, 21, c); s.rect(11, 13, 13, 21, c); s.hline(2, 13, 13, 'red3' if c == 'red' else 'w4')
    return s.outline()


save('ghe-chong', plastic_stack()); save('ghe-chong-xanh', plastic_stack('w3'))


def wash_basin():
    s = Sprite(24, 16)
    s.ellipse(11.5, 9, 11, 5, 'w3'); s.ellipse(11.5, 8, 9, 3, 'w1'); s.ellipse(8, 7, 3, 1, 'paper'); s.ellipse(15, 8, 3, 1, 'white')
    return s.outline()


save('chau-rua', wash_basin())


def price_board():
    s = Sprite(24, 32)
    s.rect(3, 2, 20, 21, 'dk'); s.hline(3, 20, 2, 'grey2')
    for y in (6, 10, 14, 18): s.hline(6, 12, y, 'paper'); s.hline(15, 18, y, 'gold')
    s.vline(5, 22, 31, 'brown'); s.vline(18, 22, 31, 'brown')
    return s.outline()


save('bang-gia', price_board())


def delivery_bike():  # parked scooter with a delivery box
    s = Sprite(32, 28)
    s.ellipse(7, 22, 5, 5, 'dk'); s.ellipse(7, 22, 2, 2, 'grey'); s.ellipse(25, 22, 5, 5, 'dk'); s.ellipse(25, 22, 2, 2, 'grey')
    s.rect(9, 14, 24, 19, 'grey2'); s.rect(20, 8, 23, 14, 'grey2'); s.hline(19, 25, 7, 'dk')
    s.rect(4, 4, 15, 13, 'g2'); s.hline(4, 15, 4, 'g1'); s.rect(7, 7, 12, 9, 'paper')
    return s.outline()


save('xe-giao-hang', delivery_bike())


def fallen_leaves_pile():
    s = Sprite(24, 10)
    s.ellipse(11.5, 6, 10, 3, 'gold'); s.speckle(2, 3, 21, 8, ['tan', 'lime', 'red2'], 14, 5)
    return s.outline()


save('dong-la', fallen_leaves_pile())


def info_board():
    s = Sprite(32, 32)
    s.rect(2, 3, 29, 20, 'red3'); s.rect(4, 5, 27, 18, 'cream')
    for y in (8, 11, 14): s.hline(7, 24, y, 'tan2')
    s.rect(6, 21, 7, 31, 'brown'); s.rect(24, 21, 25, 31, 'brown'); s.hline(1, 30, 2, 'red'); s.hline(2, 29, 1, 'red3')
    return s.outline()


save('bang-thong-tin', info_board())


def photo_tripod():
    s = Sprite(16, 28)
    s.rect(5, 2, 11, 7, 'dk'); s.px(9, 4, 'w1'); s.vline(8, 8, 18, 'grey2'); s.px(6, 20, 'grey2'); s.px(5, 22, 'grey2'); s.px(4, 25, 'grey2')
    s.px(10, 20, 'grey2'); s.px(11, 22, 'grey2'); s.px(12, 25, 'grey2'); s.vline(8, 19, 26, 'grey2')
    return s.outline()


save('chan-may-anh', photo_tripod())


def bench_wood():
    s = Sprite(32, 16)
    s.rect(1, 4, 30, 7, 'tan'); s.hline(1, 30, 4, 'cream'); s.rect(3, 8, 4, 14, 'brown'); s.rect(27, 8, 28, 14, 'brown')
    return s.outline()


save('ghe-go', bench_wood())


# ---------------------------------------------------------------- preview
names = list(OUT)
W = 900
x = y = rowh = 0
pos = []
for n in names:
    s = OUT[n]
    if x + s.w + 8 > W: x = 0; y += rowh + 14; rowh = 0
    pos.append((n, x, y)); x += s.w + 8; rowh = max(rowh, s.h)
from PIL import Image as _I
prev = _I.new('RGBA', (W, y + rowh + 8), rgb('#7fb36a'))
for n, x, y in pos: prev.alpha_composite(OUT[n].im, (x, y))
prev.alpha_composite(sheet.im, (W - sheet.w, prev.height - sheet.h))
prev = prev.resize((prev.width * 2, prev.height * 2), _I.NEAREST)
os.makedirs(os.path.join(ROOT, 'docs', 'game'), exist_ok=True)
prev.save(os.path.join(ROOT, 'docs', 'game', 'hand-drawn-preview.png'))
print('tiles:', len(TILES), 'sprites:', len(OUT))
