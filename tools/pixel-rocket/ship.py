"""The pixel rocket for the home page (plans/016-pixel-rocket.md), drawn pixel by pixel.

26 x 64 sprite, nose up, in the Explore game's palette (docs/game/ref/palette-vn.txt), light from the top left,
1 px outline #3a3a50. Writes out/ship.png (1x) and out/ship_8x.png (preview on the site's night ground).
Run from the repo root: .venv/bin/python tools/pixel-rocket/ship.py, then copy out/ into assets/img/brand/pixel/
"""
from pathlib import Path
import math
from PIL import Image

W, H = 26, 64
CX = 12.5          # centre line between columns 12 and 13
OUT = Path(__file__).parent / "out"   # out/ is git-ignored

C = {
    "o": (0x3A, 0x3A, 0x50),   # outline
    "w0": (0xEE, 0xEE, 0xEE),  # white, lit
    "w1": (0xCF, 0xD8, 0xE6),  # white, mid
    "w2": (0xA9, 0xC6, 0xE8),  # white, shade (blue-grey)
    "w3": (0x8A, 0x8A, 0x96),  # white, deep shade
    "n0": (0x50, 0xA7, 0xE8),  # navy highlight
    "n1": (0x40, 0x6A, 0xC5),  # navy
    "n2": (0x56, 0x59, 0x72),  # navy shade
    "c0": (0x5E, 0xC8, 0xFC),  # cyan stripe
    "g0": (0x8A, 0x8A, 0x96),  # metal, lit
    "g1": (0x67, 0x79, 0x8D),  # metal
    "g2": (0x5A, 0x5A, 0x6A),  # metal shade
    "a0": (0xE8, 0xB8, 0x4A),  # amber (inside the nozzle, antenna tip)
    "k0": (0x3A, 0x3A, 0x50),  # porthole glass, dark
    "k1": (0xA9, 0xC6, 0xE8),  # porthole glint
}

px = [[None] * W for _ in range(H)]


def put(x, y, c):
    if 0 <= x < W and 0 <= y < H:
        px[y][x] = c


def row(y, hw, mat):
    """One row of a round body: half width hw about CX, shaded across like a cylinder lit from the left."""
    x0, x1 = math.ceil(CX - hw), math.floor(CX + hw)
    n = max(1, x1 - x0)
    for x in range(x0, x1 + 1):
        t = (x - x0) / n           # 0 left edge .. 1 right edge
        if mat == "w":
            c = "w1" if t < 0.12 else "w0" if t < 0.45 else "w1" if t < 0.68 else "w2" if t < 0.88 else "w3"
        elif mat == "n":
            c = "n1" if t < 0.12 else "n0" if t < 0.3 else "n1" if t < 0.7 else "n2"
        elif mat == "g":
            c = "g1" if t < 0.15 else "g0" if t < 0.4 else "g1" if t < 0.75 else "g2"
        elif mat == "c":
            c = "c0" if t < 0.75 else "n1"
        put(x, y, c)


# antenna with an amber tip
put(12, 1, "a0"); put(13, 1, "a0")
for y in range(2, 7):
    put(12, y, "g0"); put(13, y, "g1")

# nose capsule: a rounded dome that widens to the shoulder
for y in range(6, 22):
    t = (y - 6) / 15
    hw = max(1.6, 7.4 * math.sqrt(1 - (1 - t) ** 2.2))
    row(y, hw, "w")
# one big round porthole on the centre line: navy rim, blue glass lit from the top left, a two-pixel glint
WIN = ["..rrrr..",
       ".rggggr.",
       "rgwhgggr",
       "rghgggdr",
       "rggggddr",
       "rgggdddr",
       ".rgdddr.",
       "..rrrr.."]
for dy, line in enumerate(WIN):
    for dx, ch in enumerate(line):
        if ch != ".":
            put(9 + dx, 10 + dy, {"r": "n2", "g": "n1", "d": "o", "w": "w0", "h": "c0"}[ch])

# shoulder band (navy lip) and the neck ring
for y in range(22, 25):
    row(y, 8.4, "n")
for y in range(25, 27):
    row(y, 6.6, "g")

# body: white cylinder with a navy band, a cyan stripe and a lower navy band
for y in range(27, 55):
    row(y, 7.0, "w")
for y in (28, 29):
    row(y, 7.0, "n")
row(30, 7.0, "c")
for y in (50, 51):
    row(y, 7.0, "n")
# a small panel and vent on the body
for y in (35, 36):
    put(9, y, "w2"); put(10, y, "w2")
for y in range(40, 45):
    put(16, y, "w2")

# nozzle: a short bell, amber glow inside
for i, y in enumerate(range(55, 61)):
    row(y, 2.6 + 0.45 * i, "g")
for x in range(11, 15):
    put(x, 60, "a0")
put(12, 59, "a0"); put(13, 59, "a0")

# side fins: swept back, a curved leading edge, flat foot
for y in range(41, 63):
    t = (y - 41) / 21
    reach = round(1 + 5 * math.sin(min(1.0, t * 1.3) * math.pi / 2))
    root = 7 if y < 55 else 6
    for k in range(reach):
        lx, rx = 12 - root - k, 13 + root + k
        put(lx, y, "n0" if k == reach - 2 else "n1")
        put(rx, y, "n2" if k >= reach - 2 else "n1")

# front fin: a narrow blade down the middle, in front of the nozzle
for y in range(46, 63):
    put(12, y, "n0"); put(13, y, "n1")
for y in range(51, 63):
    put(11, y, "n1"); put(14, y, "n2")

# 1 px outline round everything, never pure black
filled = [[px[y][x] is not None for x in range(W)] for y in range(H)]
for y in range(H):
    for x in range(W):
        if filled[y][x]:
            continue
        if any(0 <= x + dx < W and 0 <= y + dy < H and filled[y + dy][x + dx]
               for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1))):
            px[y][x] = "o"
# a line between the nose and the band, and above the nozzle, so the parts read apart
for y, mats in ((21, "w"),):
    pass

img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
for y in range(H):
    for x in range(W):
        if px[y][x]:
            img.putpixel((x, y), C[px[y][x]] + (255,))

OUT.mkdir(exist_ok=True)
img.save(OUT / "ship.png")
big = Image.new("RGBA", (W * 8 + 64, H * 8 + 64), (0x0B, 0x12, 0x20, 255))
big.alpha_composite(img.resize((W * 8, H * 8), Image.NEAREST), (32, 32))
big.save(OUT / "ship_8x.png")
used = {px[y][x] for y in range(H) for x in range(W) if px[y][x]}
print("ship.png", W, "x", H, "colours", len({C[k] for k in used}))
