#!/usr/bin/env python3
"""Adds life to the front of Đồng Xuân (cho-street.tmj), 14/11/2026: a porter unloading a hand cart, a fruit cart,
shoppers, sacks. Uses Map.load, so it can be rerun (python3 tools/maps/fill-cho-street.py --force)."""
from tiledmap import Map
m = Map.load('cho-street', seed=4)
m.obj('hn/xe-tho', 12.6, 9.95, 'Hand cart'); m.block(13, 9, 14, 9)
m.obj('hn/bao-tai', 18.4, 9.6, 'Sacks'); m.obj('hn/bao-tai-b', 19.2, 9.7, 'Sacks'); m.block(19, 9)
m.obj('hn/xe-day-hoa-qua', 20.6, 10.0, 'Fruit cart'); m.block(20, 9, 22, 9)
m.obj('hn/gio', 1.2, 9.9, 'Basket'); m.obj('hn/ghe-chong', 22.6, 8.9, 'Stools')
m.npc('porter', 14.6, 8.8, 'boc-vac', 'A porter', talk='dx-porter')
m.npc('fruit-cart', 21.9, 8.9, 'ban-hang-rong', 'Fruit-cart seller', talk='dx-cart')
m.npc('shopper', 6.6, 9.3, 'khach-viet', 'A shopper', line='“Upstairs is fabric, downstairs is everything else. Đi đi, go in!”', fact='f-dx-floors')
m.npc('night', 9.4, 9.9, 'sinh-vien', 'A student', line='“Come back on Friday evening! The whole street turns into a night market.”', fact='f-dx-night')
m.save()
