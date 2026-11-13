#!/usr/bin/env python3
"""Adds street life to cô Lan's street (homestay-street.tmj) without moving what is there: an iced-tea stall with
low stools and regulars, a woman sweeping leaves, pot plants along the house fronts, a delivery scooter.
Safe to rerun: what it added last time is removed first (tiledmap.Map.load). Then npm run build."""
from tiledmap import Map, rb

m = Map.load('homestay-street', seed=11)
m.rect(m.ground, 0, 0, m.w - 1, 2, rb(12, 0))          # nothing but sky-dark above the rooftops
# iced-tea stall by the right-hand tree
m.obj('hn/hang-nuoc', 25.0, 14.6, 'Iced-tea stall'); m.block(25, 14, 26, 14)
for x, y in [(23.0, 15.4), (24.1, 15.5), (22.6, 14.7)]:
    m.obj('quan-an/ghe-xanh' if x > 23.5 else 'quan-an/ghe-do', x, y, 'Stool')
m.obj('hn/ghe-chong', 22.1, 13.2, 'Stacked stools'); m.block(22, 12)
m.npc('tea-lady', 26.5, 13.9, 'ban-tra-da', 'The iced-tea seller', talk='hs-trada')
m.npc('tea-1', 24.4, 14.95, 'khach-ngoi-ben', 'A regular', line='He lifts his glass at you. “Trà đá đi, mát lắm!” Have an iced tea, it’s cool.')
m.npc('tea-2', 23.3, 14.95, 'khach-ngoi-ben-b', 'A regular', line='She is telling the others about her neighbour’s new grandson. Everyone here seems to know everyone.')
# sweeping the leaves of the Indian almond tree
m.obj('hn/dong-la', 1.2, 14.4, 'Leaves', flat=True)
m.npc('sweeper', 2.6, 13.8, 'quet-la', 'A neighbour', line='She is sweeping up the big red leaves of the bàng tree. “Mùa này lá rụng nhiều lắm.” Lots of leaves fall this season.')
m.obj('hn/choi', 3.4, 13.4, 'Broom')
# pot plants and a delivery scooter
for x in (1.2, 5.1, 16.9, 20.2):
    m.obj('chung/chau-cay', x, 12.95, 'Pot plant'); m.block(int(x), 12)
m.obj('hn/xe-giao-hang', 0.2, 15.95, 'Delivery scooter'); m.block(0, 15, 1, 15)
m.obj('hn/thung-xop', 9.3, 15.9, 'Foam box'); m.block(9, 15)
m.hotspot('Iced-tea stall', 25, 13.6, 2, 1.2, 'f-hs-trada', 'An iced-tea stall')
m.save()
