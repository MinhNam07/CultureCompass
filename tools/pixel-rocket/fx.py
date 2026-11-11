"""Pixel effects for the home page rocket (plans/016-pixel-rocket.md): engine flame, ignition, smoke puff, RCS jet.

Hard retro light: a heat map cut into flat steps (light.steps, 4x4 dither on the outer step), one palette colour per
step, no outline. Writes beanfx sheets (PNG + JSON) to out/, previews as GIFs.
Run from the repo root: .venv/bin/python tools/pixel-rocket/fx.py, then copy out/ into assets/img/brand/pixel/
"""
import sys
from pathlib import Path

import numpy as np

# the beanfx kit is not in git: its setup.sh copies it to drafts/pixel_rocket/kit
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "drafts" / "pixel_rocket" / "kit"))
import fxlib  # noqa: E402
import light  # noqa: E402
import pfx  # noqa: E402
import export  # noqa: E402

OUT = Path(__file__).parent / "out"   # out/ is git-ignored
FLAME = ["#BA2D2F", "#FC5C46", "#E8B84A", "#F1CE8E"]   # outer .. core (game palette)
SMOKE = ["#A5907B", "#D0BE9C", "#EEEEEE"]
JET = ["#67798D", "#A9C6E8", "#EEEEEE"]


def cut(heat, pal, phase=(0, 0)):
    """Heat 0..1 -> RGBA in len(pal) flat steps, outer step dithered."""
    q = light.steps(heat, levels=len(pal), phase=phase)
    idx = np.round(q * len(pal)).astype(int) - 1
    return pfx.paint(idx, pal)


def flame_heat(w, h, length, f, n, seed, width=5.2):
    """A jet pointing down from the top centre. length in px; noise scrolls down and tiles every n frames."""
    x, y = fxlib.grid(w, h, w / 2, 0)
    t = np.clip(y / max(length, 1), 0, 1.5)
    hw = width * (1 - np.clip(t, 0, 1)) ** 0.8 + 0.5 * (t < 1)
    body = 1 - np.abs(x) / np.maximum(hw, 0.1)
    period = (64, 32)
    nz = fxlib.noise(x + 32, y - f * period[1] / n, 5, seed, period)
    nz2 = fxlib.noise(x + 32, y - f * period[1] / n * 2, 3, seed + 7, period)
    heat = body * (1.25 - 0.9 * t) + ((nz - 0.5) * 0.3 + (nz2 - 0.5) * 0.18) * (0.4 + t)
    heat += 0.45 * np.exp(-((x / 2.0) ** 2 + (y / 6.0) ** 2))      # hot core at the nozzle
    return np.where(t < 1.08, np.clip(heat, 0, 1), 0)


def flame(seed=11, n=6, w=16, h=32):
    lengths = [h - 3, h - 5, h - 2, h - 4, h - 1, h - 4]
    return [cut(flame_heat(w, h, lengths[f % len(lengths)], f, n, seed), FLAME) for f in range(n)]


def ignite(seed=11, w=16, h=32):
    out = []
    for f, (length, width, flash) in enumerate([(3, 1.6, .6), (7, 3.0, .45), (13, 4.4, .3), (20, 5.4, .15),
                                                 (h - 4, 5.2, 0)]):
        heat = flame_heat(w, h, length, f, 6, seed, width)
        x, y = fxlib.grid(w, h, w / 2, 1)
        heat = np.clip(heat + flash * np.exp(-(x * x + y * y) / 6), 0, 1)
        out.append(cut(heat, FLAME))
    return out


def puff(seed=5, w=12, h=12):
    out = []
    x, y = fxlib.grid(w, h, w / 2, h / 2)
    for f, (r, k) in enumerate([(2.0, 1.0), (3.2, .95), (4.2, .8), (4.9, .6), (5.4, .4), (5.7, .22)]):
        nz = fxlib.noise(x + 16, y + 16 - f, 3, seed, (32, 32))
        d = np.hypot(x, y * 1.1) / r
        heat = (1 - d) * 1.4 * k + (nz - 0.5) * 0.3
        heat += 0.25 * k * np.clip(-(x + y) / (r * 1.4), 0, 1)
        out.append(cut(np.where(d < 1.05, np.clip(heat, 0, 1), 0), SMOKE))
    return out


def rcs(w=8, h=6):
    out = []
    x, y = fxlib.grid(w, h, 0, h / 2)
    for f, (length, k) in enumerate([(3, 1.0), (7, 1.0), (8, .7), (8, .35)]):
        t = x / length
        hw = 0.7 + 1.9 * np.clip(t, 0, 1)
        heat = (1 - np.abs(y) / hw) * (1.5 - 0.9 * t) * k
        out.append(cut(np.where(t < 1, np.clip(heat, 0, 1), 0), JET))
    return out


def main():
    sheets = {
        "pixel-flame": (flame(), 12, (8, 0), True),
        "pixel-ignite": (ignite(), 12, (8, 0), False),
        "pixel-puff": (puff(), 10, (6, 6), False),
        "pixel-rcs": (rcs(), 15, (0, 3), False),
    }
    for name, (frames, fps, pivot, loop) in sheets.items():
        export.write(OUT, name, frames, fps, pivot, loop)
        pfx.gif(frames, OUT / f"{name}.gif", fps, scale=8, bg="#0B1220")
        print(name, len(frames), "frames", frames[0].shape[1], "x", frames[0].shape[0])


if __name__ == "__main__":
    main()
