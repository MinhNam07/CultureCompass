#!/usr/bin/env python3
"""Cuts single pieces of furniture out of LimeZu Modern Interiors (free, 16x16 sheet) into
assets/game/sprites/noi-that/<name>.png, trimmed to the drawn pixels, for use as map props.
Free licence: non-commercial use only (CultureCompass is a student project) and credit LimeZu (done on explore.html + About).
Rects are [col, row, cols, rows] on the 16 px grid of Interiors_free_16x16.png."""
import os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, 'assets/game/vendor/limezu-interiors-free/Interiors_free/16x16/Interiors_free_16x16.png')
OUT = os.path.join(ROOT, 'assets/game/sprites/noi-that')
PIECES = {
    'ban-go': [1, 10, 3, 3], 'ban-tra': [6, 10, 3, 3], 'ghe-dau': [6, 13, 1, 1],
    'ke-sach': [5, 14, 2, 2], 'ke-sach-b': [5, 16, 2, 2],
    'tranh-ca': [0, 21, 2, 1], 'tranh-phong-canh': [8, 23, 2, 1], 'tranh-meo': [2, 25, 2, 1], 'tranh-hoa': [10, 22, 2, 1],
    'rem': [4, 24, 3, 2], 'cua-so': [7, 24, 2, 2], 'cua-so-b': [9, 24, 2, 2], 'cua-go': [11, 24, 2, 2],
    'tham-do': [7, 15, 4, 3], 'tham-xanh': [11, 18, 2, 1], 'tham-nho': [11, 20, 2, 1],
    'ghe-go': [4, 21, 1, 2], 'ghe-go-b': [6, 21, 1, 2], 'ghe-go-c': [7, 21, 1, 2],
    'cay-cao': [10, 44, 2, 3], 'cay-chau': [12, 45, 1, 2], 'cay-cau': [13, 44, 2, 2], 'cay-nho': [0, 49, 1, 1],
    'tu-go': [7, 48, 2, 3], 'tu-go-b': [11, 48, 2, 3], 'tu-ngan': [7, 51, 2, 3],
    'gio-qua': [1, 54, 1, 1], 'gio-qua-b': [2, 54, 1, 1], 'gio-rau': [0, 54, 1, 1],
    'den-ban': [13, 54, 1, 2], 'den-cay': [11, 55, 1, 2],
    'binh-gom': [0, 67, 1, 1], 'binh-gom-b': [1, 67, 1, 1], 'binh-gom-c': [0, 69, 1, 1],
    'ke-chai': [10, 69, 2, 2], 'ke-chai-b': [12, 69, 2, 2], 'ke-chai-c': [14, 69, 2, 2],
    'sofa-xam': [1, 72, 3, 2], 'sofa-nau': [7, 72, 2, 2],
    'bep-ga': [12, 79, 2, 2], 'bep-hut': [12, 81, 2, 3], 'tu-trung-bay': [2, 18, 2, 3],
    'tranh-to': [8, 21, 2, 1], 'cau-thang': [9, 5, 2, 4], 'cua-so-lon': [7, 28, 2, 2],
}
os.makedirs(OUT, exist_ok=True)
sheet = Image.open(SRC).convert('RGBA')
for name, (c, r, w, h) in PIECES.items():
    im = sheet.crop((c * 16, r * 16, (c + w) * 16, (r + h) * 16))
    bb = im.getbbox()
    if bb: im = im.crop(bb)
    im.save(os.path.join(OUT, name + '.png'))
print(len(PIECES), 'pieces →', OUT)
