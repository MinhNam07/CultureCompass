"""Puts the pixel ship into the logo: cc-logo-no-rocket-1024.png + ship.png -> cc-logo-1024/256/128.png.

The ship sits where rocket.js parks it on the logo's orbit (LOGO.t0), nose north-east (LOGO.head = 45 deg), as long
as LOGO.rocketLen, so the flying rocket leaves from and docks into the same spot.
Run from the repo root: .venv/bin/python tools/pixel-rocket/logo.py
"""
import math
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
BRAND = ROOT / "assets" / "img" / "brand"
# the numbers from assets/js/rocket.js (LOGO)
CX, CY, A, B, UX, UY, T0, LEN, HEAD = 511.17, 509.62, 478.78, 136.62, 0.78853222, -0.61499345, -0.066, 137.9, 45

c, s = math.cos(T0), math.sin(T0)
px = CX + c * A * UX + s * B * -UY
py = CY + c * A * UY + s * B * UX

ship = Image.open(BRAND / "pixel" / "ship.png").convert("RGBA")
k = round(LEN / ship.height * 4) / 4                      # close to LEN, still nearest-neighbour
big = ship.resize((round(ship.width * k), round(ship.height * k)), Image.NEAREST)
big = big.rotate(-HEAD, resample=Image.NEAREST, expand=True)   # PIL turns anticlockwise; CSS rotate(45deg) is clockwise

logo = Image.open(BRAND / "cc-logo-no-rocket-1024.png").convert("RGBA")
logo.alpha_composite(big, (round(px - big.width / 2), round(py - big.height / 2)))
logo.save(BRAND / "cc-logo-1024.png")
for size in (256, 128):
    logo.resize((size, size), Image.LANCZOS).save(BRAND / f"cc-logo-{size}.png")
print("ship at", round(px, 1), round(py, 1), "scale", k)
