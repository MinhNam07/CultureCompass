#!/usr/bin/env python3
"""Fills the empty pavement of the street eatery (quan-an.tmj), 14/11/2026: another table of diners, an ice box,
the washing-up corner, a price board, stacked stools and a delivery bike. Uses Map.load, so it can be rerun
(python3 tools/maps/fill-quan-an.py --force)."""
from tiledmap import Map
m = Map.load('quan-an', seed=6)
m.obj('quan-an/ban-inox', 20.4, 10.9, 'Table'); m.block(20, 10, 21, 10)
for x, p in [(19.6, 'quan-an/ghe-do'), (21.9, 'quan-an/ghe-xanh'), (20.7, 'quan-an/ghe-xanh')]:
    m.obj(p, x, 11.6 if x != 20.7 else 10.0, 'Stool')
m.obj('quan-an/bat-dua', 20.6, 10.1, 'Bowls')
m.obj('hn/thung-xop', 19.2, 9.0, 'Ice box'); m.block(19, 8)
m.obj('hn/chau-rua', 23.0, 9.0, 'Washing-up bowl'); m.block(23, 8)
m.obj('hn/ghe-chong', 24.0, 9.0, 'Stacked stools'); m.block(24, 8)
m.obj('hn/bang-gia', 1.1, 9.1, 'Price board'); m.block(1, 8)
m.obj('hn/ghe-chong-xanh', 5.6, 9.0, 'Stacked stools'); m.block(5, 8)
m.obj('hn/xe-giao-hang', 23.0, 12.95, 'Delivery bike'); m.block(23, 12, 24, 12)
m.obj('quan-an/ro-rau', 9.0, 9.0, 'Basket of herbs')
m.npc('diner-3', 22.6, 11.0, 'khach-ngoi-ben-b', 'A diner', talk='qa-diner')
m.npc('helper', 22.0, 9.4, 'nhan-vien', 'The cook’s helper', line='She rinses bowls in a big basin, stacks them, and runs them back to the cook. “Nhanh lên! Quick!”')
m.npc('rider', 21.8, 12.9, 'sinh-vien', 'A delivery rider', line='“Hai bún chả mang về! Two bún chả to take away!” He checks the order on his phone.')
m.hotspot('Price board', 1.0, 8.2, 1.6, 1, 'f-price', 'Handwritten prices')
m.hotspot('Delivery bike', 23.0, 11.8, 2, 1, None, 'A delivery bike', line='Green delivery bikes come and go all evening, picking up bags of food in plastic boxes.')
m.save()
