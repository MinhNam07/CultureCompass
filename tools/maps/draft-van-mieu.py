#!/usr/bin/env python3
"""Văn Miếu – Quốc Tử Giám (assets/game/maps/van-mieu.tmj), rebuilt 14/11/2026 with the five courtyards on one axis
(source for the layout: claim C-VM-LAYOUT): street and tứ trụ → Văn Miếu Môn → court 1 → Đại Trung Môn (with the side
gates Thành Đức and Đạt Tài) → court 2 → Khuê Văn Các → court 3 (Thiên Quang well, stele houses) → Đại Thành Môn →
court 4 (Đại Thành hall, side halls, incense burner) → court 5 (Thái Học, drum and bell).
Run: python3 tools/maps/draft-van-mieu.py --force   (overwrites hand edits made in Tiled), then npm run build."""
from tiledmap import Map, sv, vm, hn, ch, SV_GRASS, T

W, H, AX = 40, 112, 20          # AX: the central axis; the path runs on x 18..21
m = Map('van-mieu', W, H, seed=7)
m.title = 'Văn Miếu – Quốc Tử Giám'
rnd = m.rnd
brick = lambda x, y: vm(0, rnd.choice([0, 1, 2, 4, 5, 6]))
paving = lambda x, y: hn('paving' if (x + y) % 3 else 'paving-b')

# ---------------------------------------------------------------- ground
m.rect(m.ground, 0, 0, W - 1, H - 1, SV_GRASS)

# rows (top → bottom)
Y5, W5 = 2, 16          # court 5 rows 2..15, wall at 16-17
Y4, W4 = 18, 38         # court 4 rows 18..37, wall at 38-39 (Đại Thành Môn)
Y3, W3 = 40, 64         # court 3 rows 40..63, wall at 64-65 (Khuê Văn Các)
Y2, W2 = 66, 84         # court 2 rows 66..83, wall at 84-85 (Đại Trung Môn)
Y1, W1 = 86, 100        # court 1 rows 86..99, wall at 100-101 (Văn Miếu Môn)
YS = 102                # street: pavement 102..105, road 106..109, Văn Lake 110..111


def wall(y, x0, x1, gaps=()):
    """temple wall: coping row y, face row y+1, a post at every end; gaps = list of (gx0, gx1) left open"""
    open_ = set()
    for a, b in gaps: open_.update(range(a, b + 1))
    run = []
    for x in range(x0, x1 + 1):
        if x in open_:
            if run: segs.append(run)
            run = []
        else:
            run.append(x)
    if run: segs.append(run)


segs = []
def build_wall(y, x0, x1, gaps=(), posts=True):
    global segs
    segs = []
    wall(y, x0, x1, gaps)
    for s in segs:
        for x in s:
            l, r = x == s[0], x == s[-1]
            m.put(m.walls, x, y, hn('coping-l' if l else 'coping-r' if r else 'coping-m'))
            m.put(m.walls, x, y + 1, hn('face-l' if l else 'face-r' if r else 'face-%d' % rnd.randint(0, 2)))
            m.block(x, y, x, y + 1)
        if posts:
            for x in {s[0], s[-1]}:
                if 0 < x < W - 1: m.obj('hn/tru-tuong', x, y + 2)
    # a strip of stone paving along both sides of the wall, so it stands on a footing and not on the grass
    for x in range(x0, x1 + 1):
        for yy in (y - 1, y + 2):
            if 0 <= yy < H and not m.at(m.floor, x, yy): m.put(m.floor, x, yy, hn('paving'))


# outer wall along the top, and the side walls are lines of old trees (see below)
build_wall(0, 0, W - 1, posts=False)

# central brick path through courts 1–3, stone paving in courts 4–5
m.rect(m.floor, 18, Y1, 21, W1 + 1, brick)
m.rect(m.floor, 18, Y2, 21, W2 + 1, brick)
m.rect(m.floor, 18, Y3, 21, W3 + 1, brick)
m.rect(m.floor, 3, Y4 + 6, 36, W4 - 2, paving)      # Bái Đường courtyard
m.rect(m.floor, 17, W4 - 2, 22, W4 + 1, paving)
m.rect(m.floor, 6, Y5 + 10, 33, W5 - 1, paving)     # in front of Thái Học
m.rect(m.floor, 8, W5 - 1, 11, W5 + 2, paving); m.rect(m.floor, 28, W5 - 1, 31, W5 + 2, paving)
# cross paths in courts 1–2 to the side gates and benches
m.rect(m.floor, 4, 91, 35, 92, brick)
m.rect(m.floor, 7, W2 + 2, 9, Y1 + 5, brick); m.rect(m.floor, 30, W2 + 2, 32, Y1 + 5, brick)
m.rect(m.floor, 5, 74, 34, 75, brick)
# court 3: brick walk around the well
m.rect(m.floor, 12, 44, 27, 60, brick)

# ---------------------------------------------------------------- walls and gates
build_wall(W5, 1, W - 2, gaps=[(9, 9), (29, 29)])                      # side gates into court 5
build_wall(W4, 1, W - 2, gaps=[(19, 20)])                               # Đại Thành Môn
build_wall(W3, 1, W - 2, gaps=[(9, 9), (19, 20), (30, 30)])             # Khuê Văn Các + Bi Văn / Súc Văn
build_wall(W2, 1, W - 2, gaps=[(8, 8), (19, 20), (31, 31)])             # Đại Trung Môn + Thành Đức / Đạt Tài
build_wall(W1, 1, W - 2, gaps=[(19, 20)])                               # Văn Miếu Môn

m.obj('van-mieu/van-mieu-mon', 16, W1 + 2, 'Văn Miếu Môn'); m.block(16, W1, 23, W1 + 1, skip={(19, W1), (20, W1), (19, W1 + 1), (20, W1 + 1)})
m.obj('hn/dai-trung-mon', 16, W2 + 2, 'Đại Trung Môn'); m.block(16, W2 - 1, 23, W2 + 1, skip={(x, y) for x in (19, 20) for y in range(W2 - 1, W2 + 2)})
m.obj('hn/cong-phu', 7, W2 + 2, 'Thành Đức gate'); m.obj('hn/cong-phu', 30, W2 + 2, 'Đạt Tài gate')
m.obj('van-mieu/khue-van-cac', 17, W3 + 2, 'Khuê Văn Các'); m.block(17, W3, 18, W3 + 1); m.block(21, W3, 22, W3 + 1)
m.obj('hn/cong-phu', 8, W3 + 2, 'Bi Văn gate'); m.obj('hn/cong-phu', 29, W3 + 2, 'Súc Văn gate')
m.obj('hn/dai-thanh-mon', 16, W4 + 2, 'Đại Thành Môn'); m.block(16, W4 - 1, 23, W4 + 1, skip={(x, y) for x in (19, 20) for y in range(W4 - 1, W4 + 2)})
m.obj('hn/cong-phu', 8, W5 + 2, 'Side gate'); m.obj('hn/cong-phu', 28, W5 + 2, 'Side gate')

# ---------------------------------------------------------------- street outside (Quốc Tử Giám street, Văn Lake beyond)
m.rect(m.floor, 0, YS, W - 1, YS + 3, lambda x, y: ch('via-he-xam' if (x + y) % 4 else 'via-he-xam-b'))
m.rect(m.floor, 0, YS + 4, W - 1, YS + 4, ch('le-tren'))
m.rect(m.floor, 0, YS + 5, W - 1, YS + 7, lambda x, y: ch('nhua' if rnd.random() < .85 else 'nhua-nut'))
m.rect(m.floor, 0, YS + 8, W - 1, YS + 8, ch('le-duoi'))
m.rect(m.floor, 0, YS + 9, W - 1, YS + 9, hn('shore')); m.rect(m.floor, 0, H - 1, W - 1, H - 1, [hn('lake'), hn('lake-b')])
m.block(0, YS + 4, W - 1, H - 1)
m.point('mover', 'traffic-1', 0, YS + 5.1, {'sprite': 'chung/xe-may-chay', 'dir': 'right', 'speed': '46'}, W, 1.4)
m.point('mover', 'traffic-2', 0, YS + 6.4, {'sprite': 'chung/xe-may-chay', 'dir': 'left', 'speed': '38', 'offset': '200'}, W, 1.4)
m.obj('hn/tru-bieu', 14, YS + 2, 'Tứ trụ', foot=(1, 0)); m.obj('hn/tru-bieu', 25, YS + 2, 'Tứ trụ', foot=(1, 0))
m.obj('serene/sign', 12, YS + 1, 'Rules board'); m.block(12, YS)
m.obj('hn/bang-thong-tin', 26.5, YS + 1, 'Ticket board'); m.block(27, YS, 28, YS)
m.obj('hn/ban-ong-do', 4, YS + 3, 'Calligrapher', foot=(1, 0))
for x in (1, 9, 31, 37):
    m.obj('chung/cay-bang', x - 1, YS + 2.4, 'Tree'); m.block(x, YS + 1)
m.obj('chung/xe-may-do-do', 33, YS + 3.2); m.obj('chung/xe-may-do-xanh', 35, YS + 3.3)

# ---------------------------------------------------------------- side tree lines (the old trees along the walls)
trees = ['serene/tree-a', 'serene/tree-b', 'serene/tree-c', 'serene/tree-d']
for y0, y1 in [(Y5, W5 - 1), (Y4, W4 - 1), (Y3, W3 - 1), (Y2, W2 - 1), (Y1, W1 - 1)]:
    for y in range(y0 + 3, y1 + 2, 3):
        for x in (0, W - 2):
            m.obj(rnd.choice(trees), x, y, 'Tree'); m.block(x, y - 1, x + 1, y - 1)
for y in range(0, H - 10):
    m.block(0, y); m.block(W - 1, y)


def lawn(x0, y0, x1, y1, hedge=True, flowers=True):
    """a lawn framed by trimmed hedges, with a few tufts and flowers"""
    if hedge:
        for x in range(x0, x1 + 1):
            m.put(m.floor, x, y0, hn('hedge-%d' % (x % 2))); m.put(m.floor, x, y1, hn('hedge-%d' % (x % 2)))
        m.block(x0, y0, x1, y0); m.block(x0, y1, x1, y1)
    m.scatter(m.floor, x0, y0 + 1, x1, y1 - 1, [hn('grass-tuft'), hn('flowers') if flowers else hn('grass-tuft')], .18,
              where=lambda x, y: not m.at(m.floor, x, y))


def tuft_everywhere(x0, y0, x1, y1, chance=.06):
    m.scatter(m.floor, x0, y0, x1, y1, [hn('grass-tuft'), hn('grass-tuft'), hn('moss'), hn('leaves')], chance,
              where=lambda x, y: not m.at(m.floor, x, y))


# ---------------------------------------------------------------- court 1: lawns, old trees, benches
lawn(4, 87, 15, 89); lawn(24, 87, 35, 89); lawn(4, 94, 15, 98); lawn(24, 94, 35, 98)
for x, y in [(6, 97), (11, 97), (26, 97), (31, 97)]:
    m.obj('chung/cay-da', x - 2, y - 0.2, 'Old tree'); m.block(x, y - 1, x + 1, y - 1)
for x, y in [(15, 93.9), (22.2, 93.9)]:
    m.obj('pho-co/ghe-da', x, y, 'Stone bench'); m.block(int(x), int(y) - 1, int(x) + 1, int(y) - 1)
m.obj('hn/cay-canh', 16.2, 90.8, 'Bonsai'); m.block(16, 90, 17, 90)
m.obj('hn/cay-canh', 22.3, 90.8, 'Bonsai'); m.block(22, 90, 23, 90)
m.obj('hn/dong-la', 30, 92.6, 'Leaves', flat=True)
m.obj('hn/choi', 33.2, 92.7, 'Broom')

# ---------------------------------------------------------------- court 2: lawns and trees before Khuê Văn Các
lawn(3, 67, 16, 72); lawn(23, 67, 36, 72); lawn(3, 77, 16, 82); lawn(23, 77, 36, 82)
for x, y in [(5, 82), (11, 82), (26, 82), (32, 82), (5, 72), (32, 72)]:
    m.obj(rnd.choice(trees), x, y - 0.3, 'Tree'); m.block(x, y - 1, x + 1, y - 1)
m.obj('hn/cay-canh-b', 16.4, 77, 'Bonsai'); m.block(16, 76, 17, 76)
m.obj('hn/cay-canh-b', 22, 77, 'Bonsai'); m.block(22, 76, 23, 76)
m.obj('hn/chan-may-anh', 24.6, 69.6, 'Tripod'); m.block(25, 69)
m.obj('hn/den-long', 16.6, 70, 'Lantern'); m.block(17, 69)
m.obj('hn/den-long', 22, 70, 'Lantern'); m.block(22, 69)

# ---------------------------------------------------------------- court 3: Thiên Quang well and the stele houses
kx0, ky0, kx1, ky1 = 15, 47, 24, 55
for y in range(ky0, ky1 + 1):
    for x in range(kx0, kx1 + 1):
        t, b, l, r = y == ky0, y == ky1, x == kx0, x == kx1
        n = ('kerb-t' + ('l' if l else 'r' if r else '')) if t else ('kerb-b' + ('l' if l else 'r' if r else '')) if b else \
            'kerb-l' if l else 'kerb-r' if r else rnd.choice(['water', 'water', 'water-b', 'lotus-0', 'lotus-1'])
        m.put(m.floor, x, y, hn(n)); m.block(x, y)
for x0 in (2, 30):
    for yb in (49, 59):
        m.obj('van-mieu/nha-bia', x0, yb, 'Stele house'); m.block(x0, yb - 2, x0 + 7, yb - 1)
    m.rect(m.floor, x0 - 1, 43, x0 + 8, 62, lambda x, y: m.at(m.floor, x, y) or brick(x, y))
# loose stelae on turtles at the corners of the well
for x, y, p in [(12.4, 46.6, 'bia-1'), (25.6, 46.6, 'bia-2'), (12.4, 58, 'bia-2'), (25.6, 58, 'bia-1')]:
    m.obj('van-mieu/' + p, x, y, 'Stele'); m.block(int(x), int(y) - 1, int(x) + 1, int(y) - 1)
for x, y in [(11, 52), (28, 52)]:
    m.obj('hn/chum-men', x, y, 'Glazed jar'); m.block(x, y - 1)
for x in (13, 26):
    m.obj('hn/den-long', x, 61.6, 'Lantern'); m.block(x, 61)

# ---------------------------------------------------------------- court 4: Đại Thành hall, side halls, incense
m.obj('van-mieu/dai-thanh', 14, Y4 + 7, 'Đại Thành'); m.block(14, Y4 + 3, 25, Y4 + 6)
m.obj('hn/ta-vu', 2.5, 32, 'Tả Vu (east hall)'); m.block(3, 30, 7, 31)
m.obj('hn/ta-vu', 31.5, 32, 'Hữu Vu (west hall)'); m.block(32, 30, 36, 31)
m.obj('van-mieu/lu-huong-0', 19, 31, 'Incense burner', frames=['van-mieu/lu-huong-%d' % i for i in range(4)]); m.block(19, 30, 20, 30)
for x, y in [(13, 27.6), (25.5, 27.6), (13, 35.6), (25.5, 35.6)]:
    m.obj('hn/cay-canh', x, y, 'Bonsai'); m.block(int(x), int(y) - 1, int(x) + 1, int(y) - 1)
for x in (10, 29):
    m.obj('hn/chum', x, 26.6, 'Jar'); m.block(x, 26)
for x, y in [(3, 23), (34, 23)]:
    m.obj(rnd.choice(trees), x, y, 'Tree'); m.block(x, y - 1, x + 1, y - 1)

# ---------------------------------------------------------------- court 5: Thái Học, drum and bell
m.obj('hn/thai-hoc', 14.5, Y5 + 10, 'Thái Học'); m.block(15, Y5 + 6, 24, Y5 + 9)
m.obj('hn/trong', 8, Y5 + 10, 'Drum'); m.block(8, Y5 + 9, 9, Y5 + 9)
m.obj('hn/chuong', 30, Y5 + 10, 'Bell'); m.block(30, Y5 + 9, 31, Y5 + 9)
for x, y in [(3, 9), (34, 9), (4, 14.8), (33, 14.8)]:
    m.obj(rnd.choice(trees), x, y, 'Tree'); m.block(int(x), int(y) - 1, int(x) + 1, int(y) - 1)
for x in (12, 26.4):
    m.obj('hn/den-long', x, Y5 + 12, 'Lantern'); m.block(int(x), Y5 + 11)

tuft_everywhere(1, 2, W - 2, H - 12)

# ---------------------------------------------------------------- points: the three moments keep their names
m.point('spawn', 'spawn', AX, YS + 2.6, {'dir': 'up'})
m.point('target', 'gate', AX, YS + 1.2)
m.point('target', 'stelae', AX, 60)
m.point('target', 'hall', AX, 33)
m.point('zone', 'gate', 15, YS, {'step': 's1'}, 10, 2)
m.point('zone', 'stelae', 2, 56, {'step': 's2'}, 36, 7)
m.point('zone', 'hall', 9, 27, {'step': 's3'}, 22, 8)

S = 'Staff member'
m.npc('staff-gate', 22.5, YS + 1.6, 'nhan-vien', S, fact='f-staff')
m.npc('staff-stelae', 10.5, 60.5, 'nhan-vien', S, fact='f-staff')
m.npc('staff-hall', 26, 31, 'nhan-vien', S, fact='f-staff')
m.npc('worshipper', 17.5, 31.3, 'ba', 'A woman offering incense', line='She is praying quietly. You step back and give her space.')
m.npc('visitor', 23, 33, 'nguoi-ban', 'A visitor', line='She nods to you and goes back to looking at the hall.')
m.npc('family-1', 12.5, 93.2, 'co-lan', 'A visitor', line='“Xin chào!” She smiles back.')
m.npc('family-2', 13.6, 93.3, 'con-trai', 'A teenager', line='He is busy taking a photo of Khuê Văn Các.')
# new people (talks and lines live in explore.json: zone.talks)
m.npc('ticket', 29.5, YS + 1.8, 'nhan-vien', 'Ticket seller', talk='vm-ticket')
m.npc('ong-do', 6, YS + 3.4, 'ong-do', 'A calligrapher (ông đồ)', talk='vm-ongdo')
m.npc('guide', 26.5, 92.6, 'huong-dan', 'A tour guide', talk='vm-guide')
m.npc('tourist-1', 28, 93.4, 'khach-tay', 'A visitor from abroad', line='“Five courtyards! I thought this was the whole thing,” he laughs, looking back at the gate.')
m.npc('tourist-2', 29.2, 92.9, 'khach-tay-b', 'A visitor from abroad', line='She is reading the guidebook: “It says the first examination here was in 1075.”')
m.npc('sweeper', 32.2, 93.2, 'quet-la', 'A groundskeeper', line='She sweeps the fallen leaves into a neat pile and nods at you. “Sáng nào cũng quét.” Every morning, she says.')
m.npc('grad-1', 23.6, 70.6, 'sinh-vien', 'A graduating student', talk='vm-grads')
m.npc('grad-2', 26.4, 70.8, 'sinh-vien-b', 'A graduating student', talk='vm-grads')
m.npc('old-man', 9.5, 74.4, 'cu-ong', 'An old man', line='He is resting in the shade. “Ngày xưa Khuê Văn Các là biểu tượng của Hà Nội đấy.” Khuê Văn Các is the symbol of Hà Nội, he says.', fact='f-vm-symbol')
m.npc('couple-1', 13.6, 56.6, 'khach-viet', 'A visitor', line='She points at the square pond: “Thiên Quang Tỉnh — the Well of Heavenly Clarity.”', fact='f-vm-well')
m.npc('tourist-3', 26.6, 62.6, 'khach-tay', 'A visitor from abroad', line='He leans over the rope to look at a turtle, then steps back. “Better not,” he says.')
m.npc('student-luck', 21.6, Y5 + 12.6, 'con-trai', 'A student', talk='vm-luck')
m.npc('staff-thaihoc', 13, Y5 + 12.4, 'nhan-vien', S, line='“Thái Học house was rebuilt in 2000, on the site of the old academy.”', fact='f-vm-thaihoc')

L = 'Văn Miếu Môn, the main gate'
m.hotspot('Rules board', 12, YS - 0.4, 1, 1.2, 'f-rules', 'Rules board at the gate')
m.hotspot('Văn Miếu gate', 18.6, W1 + 1.4, 2.8, 1, 'f-vm-1070', L)
m.hotspot('Tứ trụ', 24.6, YS + 0.6, 1.4, 1.2, 'f-vm-layout', 'The four pillars and the five courtyards')
m.hotspot('Đại Trung Môn', 18.6, W2 + 1.4, 2.8, 1, 'f-vm-gate', 'Đại Trung Môn')
m.hotspot('Thành Đức gate', 7, W2 + 1.6, 3, 1, 'f-vm-sidegates', 'Thành Đức and Đạt Tài gates')
m.hotspot('Đạt Tài gate', 30, W2 + 1.6, 3, 1, 'f-vm-sidegates', 'Thành Đức and Đạt Tài gates')
m.hotspot('Khuê Văn Các', 18.4, W3 + 1.4, 3.2, 1, 'f-kvc', 'Khuê Văn Các')
m.hotspot('Stele', 2, 49, 8, 1.4, 'f-stelae', 'Stelae on stone turtles')
m.hotspot('Stele', 30, 49, 8, 1.4, 'f-stelae', 'Stelae on stone turtles')
m.hotspot('Stele turtle', 12, 58, 2, 1, 'f-stelae-turtle', 'Why a turtle?')
m.hotspot('Rope', 30, 59, 8, 1.4, 'f-stelae-fence', 'The rope around the stelae')
m.hotspot('Đại Thành Môn', 18.6, W4 + 1.4, 2.8, 1, 'f-vm-daithanh', 'Đại Thành Môn and the hall courtyard')
m.hotspot('Worship hall', 15, 25, 10, 1.2, 'f-hall', 'Worship hall')
m.hotspot('Side hall', 3, 32, 5, 1.2, 'f-vm-daithanh', 'Tả Vu, a side hall')
m.hotspot('Thái Học', 16, Y5 + 10, 8, 1.2, 'f-vm-academy', 'Thái Học, the old academy')
m.hotspot('Drum', 8, Y5 + 10, 2, 1, 'f-vm-thaihoc', 'The drum house')

m.save()
