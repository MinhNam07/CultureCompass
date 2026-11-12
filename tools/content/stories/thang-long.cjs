/* Story: Thăng Long and the Imperial Citadel (st-thang-long). Layout: longform.
   Researched 12 Nov 2026. whc.unesco.org refused automated reads, so the inscription is sourced
   from the site's own conservation centre. Where official sources disagree (the year of the name
   Đông Kinh, the first use of Hậu Lâu, excavated areas) the story says so rather than choosing. */
const today = '2026-11-12';

const sources = [
  { id: 'VGP-STAGES', short: 'Viet Nam Government Portal', title: 'Historical stages of Thang Long – Ha Noi — Viet Nam Government Portal', org: 'Viet Nam Government Portal (thanglong.chinhphu.vn)', url: 'https://thanglong.chinhphu.vn/english/historical-stages-of-thang-long-ha-noi-110136.htm', type: 'gov', checked: today,
    used: 'Lý Thái Tổ moving the capital from Hoa Lư to Đại La in 1010; dynasty dates; the Nguyễn ruling from Phú Xuân (Huế) from 1802; the 1883 treaty and the French decree creating Hà Nội city in 1888; 2 September 1945 at Ba Đình; 10 October 1954; Hà Nội approved as capital of the reunified country in 1976.',
    limits: 'An official overview (March 2010). It dates the name Đông Kinh to 1430, the companion page to 1427.' },
  { id: 'VGP-NAMES', short: 'Viet Nam Government Portal', title: 'The changing names of Ha Noi — Viet Nam Government Portal', org: 'Viet Nam Government Portal, by Tường Minh', url: 'https://thanglong.chinhphu.vn/english/the-changing-names-of-ha-noi-110137.htm', type: 'gov', checked: today,
    used: 'The city’s names: Đại La (enlarged by Gao Pian in 866), Thăng Long (1010), Đông Đô (1397), Đông Quan (Ming rule), Đông Kinh (1427), Bắc Thành (Tây Sơn), Thăng Long with a new character for “Long” (1805), and Hà Nội (1831).',
    limits: 'An official summary (March 2010); gives no names for the Mạc period.' },
  { id: 'ND-RONG', short: 'Nhân Dân', title: 'Rồng Việt — linh thiêng, huyền ảo và lung linh, gần gũi — Nhân Dân special page', org: 'Nhân Dân, with material from the Huế Monuments Conservation Centre', url: 'https://special.nhandan.vn/r-ng-vi-t-linh-thi-ng-huy-n-o-v-lung-linh-g-n-g-i/index.html', type: 'press', checked: today,
    used: 'The passage of the chronicle Đại Việt sử ký toàn thư telling of a yellow dragon appearing by the royal boat in the seventh month of 1010, and the citadel renamed Thăng Long for it.',
    limits: 'A feature page with no date shown; some retellings speak of a cloud dragon instead.' },
  { id: 'ND-CHIEU', short: 'Nhân Dân', title: 'Hội Đền Đô và lễ đọc Chiếu dời Đô — Nhân Dân', org: 'Nhân Dân, by Nguyễn Quang Dũng', url: 'https://nhandan.vn/hoi-den-do-va-le-doc-chieu-doi-do-post528650.html', type: 'press', checked: today,
    used: 'Lines of the Edict on Moving the Capital in Vietnamese translation, calling the site the finest in the land and a meeting place of the four directions.',
    limits: 'A festival report (March 2009) quoting a modern translation.' },
  { id: 'VNE-MOCBAN', short: 'VnExpress', title: 'Tìm thấy mộc bản khắc Chiếu dời đô cổ nhất — VnExpress', org: 'VnExpress, by Lưu Quỳnh', url: 'https://vnexpress.net/tim-thay-moc-ban-khac-chieu-doi-do-co-nhat-2174178.html', type: 'press', checked: today,
    used: 'The edict’s length of 214 characters; the oldest known woodblock of it found at National Archives Centre IV in Đà Lạt, its date unsettled; a translated line on choosing the centre for the good of all generations.',
    limits: 'A news report (August 2010).' },
  { id: 'HTTL-JOURNEY', short: 'Imperial Citadel of Thang Long', title: 'The Heritage Journey — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre, by Kim Yến', url: 'https://hoangthanhthanglong.vn/en/the-heritage-journey/', type: 'site', checked: today,
    used: 'The inscription at 20:30 Brasília time on 31 July 2010, at the 34th session of the World Heritage Committee; the property covering the central axis of the old citadel and the archaeological site at 18 Hoàng Diệu.',
    limits: 'The site’s own account (December 2015). We could not read UNESCO’s own pages, which refuse automated visits.' },
  { id: 'HTTL-15', short: 'Imperial Citadel of Thang Long', title: '15 years as a World Heritage Site — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre', url: 'https://hoangthanhthanglong.vn/en/4281-2/', type: 'site', checked: today,
    used: 'The site’s description of over 1,300 years of uninterrupted history in one place.',
    limits: 'An anniversary page (November 2025).' },
  { id: 'ND-DOANMON', short: 'Nhân Dân', title: 'Di tích Đoan Môn — Nhân Dân special page', org: 'Nhân Dân, with material from the Thang Long – Hanoi Heritage Conservation Centre', url: 'https://special.nhandan.vn/ditichdoanmon/index.html', type: 'press', checked: today,
    used: 'Đoan Môn built under the early Lê in the fifteenth century and repaired under the Nguyễn; five arched openings, the middle one for the king; the gate into the Forbidden City; a Lê paved yard found 1.2 m down in 1999 and a Trần brick road at 1.9 m.',
    limits: 'A feature page with no date shown.' },
  { id: 'HTTL-KINHTHIEN', short: 'Imperial Citadel of Thang Long', title: 'Điện Kính Thiên — hành trình tái hiện trái tim của Hoàng thành Thăng Long — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre', url: 'https://hoangthanhthanglong.vn/dien-kinh-thien-hanh-trinh-tai-hien-trai-tim-cua-hoang-thanh-thang-long/', type: 'site', checked: today,
    used: 'Kính Thiên palace built in 1428 and rebuilt in 1465; pulled down by the French in the late nineteenth century for an artillery barracks; a hall of nine bays, with 28 of its 60 column positions found.',
    limits: 'The site’s own article (July 2026).' },
  { id: 'HTTL-HAULAU', short: 'Imperial Citadel of Thang Long', title: 'The Tĩnh Bắc Pavilion (Hậu Lâu) — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre, by Đỗ Đức Tuệ', url: 'https://hoangthanhthanglong.vn/en/?p=4252', type: 'site', checked: today,
    used: 'Hậu Lâu built by Emperor Minh Mạng in October 1821, also called Tĩnh Bắc lâu and, by the French, Pagode des Dames; altered by the French in 1885–87 and 1910–21; renovated in 2002.',
    limits: 'The site’s own article (December 2024). It calls the building Daoist; another Centre text says it was first used for Buddhist worship.' },
  { id: 'ND-HAULAU', short: 'Nhân Dân', title: 'Di tích Hậu Lâu — Nhân Dân special page', org: 'Nhân Dân, with material from the Thang Long – Hanoi Heritage Conservation Centre', url: 'https://special.nhandan.vn/ditichhaulau/index.html', type: 'press', checked: today,
    used: 'Hậu Lâu first used for Buddhist worship; remains of an early Lê water landing found 3.2 m below it.',
    limits: 'A feature page with no date shown.' },
  { id: 'HTTL-BACMON', short: 'Imperial Citadel of Thang Long', title: 'Bắc Môn — chứng nhân lịch sử của kinh thành Thăng Long — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre', url: 'https://hoangthanhthanglong.vn/bac-mon-chung-nhan-lich-su-cua-kinh-thanh-thang-long/', type: 'site', checked: today,
    used: 'Bắc Môn, the north gate of the citadel begun in 1805, built on the Lê-era gate; its plaque Chính Bắc Môn; two cannon-shot marks from the French attack of 1882; Governor Hoàng Diệu taking his own life when the citadel fell; Hoàng Diệu and Nguyễn Tri Phương honoured in the gate’s pavilion.',
    limits: 'The site’s own article (August 2026).' },
  { id: 'ND-KYDAI', short: 'Nhân Dân', title: 'Di tích Cột cờ Hà Nội — Nhân Dân special page', org: 'Nhân Dân, with material from the Thang Long – Hanoi Heritage Conservation Centre', url: 'https://special.nhandan.vn/ditichkydai/index.html', type: 'press', checked: today,
    used: 'The Flag Tower built in the early Nguyễn period (1805–1812), 33.4 m tall; surviving the French demolition of the citadel in 1894–1897; the flag ceremony of 10 October 1954.',
    limits: 'A feature page with no date shown; other sources date the demolition 1896–97.' },
  { id: 'VNS-FLAG', short: 'Viet Nam News', title: 'Hà Nội Flag Tower opens for visitors, offers portal to the past — Viet Nam News', org: 'Viet Nam News', url: 'https://vietnamnews.vn/sunday/1690401/ha-noi-flag-tower-opens-for-visitors-offers-portal-to-the-past.html', type: 'press', checked: today,
    used: 'The Flag Tower about 33 m tall, 44 m with its pole, opened for visitors to climb in early 2025.',
    limits: 'A feature (January 2025).' },
  { id: 'ND-18HD', short: 'Nhân Dân', title: 'Khu di tích khảo cổ học 18 Hoàng Diệu — Nhân Dân special page', org: 'Nhân Dân, with material from the Thang Long – Hanoi Heritage Conservation Centre', url: 'https://special.nhandan.vn/ditich18hoangdieu/index.html', type: 'press', checked: today,
    used: 'Excavation at 18 Hoàng Diệu from December 2002; by December 2009, 33,000 m² opened and 168 features found (95 building foundations, 16 walls, 24 wells, 33 drains); layers from Đại La in the seventh to ninth centuries to the Nguyễn; finds including Đại La bricks, Lê dragon tiles, royal ceramics, a boat and oars, and ceramics from China, Japan and West Asia.',
    limits: 'A feature page with no date shown; area figures depend on which digs are counted.' },
  { id: 'VNN-15YRS', short: 'VietNamNet', title: 'Thang Long citadel secrets revealed after 15 years of research — VietNamNet', org: 'VietNamNet', url: 'https://vietnamnet.vn/en/thang-long-citadel-secrets-revealed-after-15-years-of-research-2459593.html', type: 'press', checked: today,
    used: 'A November 2025 conference of the Institute of Archaeology on 15 years of research; the archaeologist Tống Trung Tín putting the 18 Hoàng Diệu and National Assembly digs together at over 30,000 m², with more than 1,300 years of layers.',
    limits: 'A news report (November 2025).' },
  { id: 'ND-QUOCHOI', short: 'Nhân Dân', title: 'Địa chỉ đặc sắc về lịch sử nghìn năm Thăng Long – Hà Nội — Nhân Dân', org: 'Nhân Dân, by Vương Anh', url: 'https://nhandan.vn/dia-chi-dac-sac-ve-lich-su-nghin-nam-thang-long-ha-noi-post263261.html', type: 'press', checked: today,
    used: 'The 2008–09 dig on the site of the new National Assembly building, and an underground display of more than 400 objects beneath it.',
    limits: 'A news report (May 2016).' },
  { id: 'HTTL-D67', short: 'Imperial Citadel of Thang Long', title: 'House and tunnel D67 — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre, by Kim Yến', url: 'https://hoangthanhthanglong.vn/en/?p=2427', type: 'site', checked: today,
    used: 'House D67 built in 1967 and used by the Politburo, the Central Military Commission and the defence minister from September 1968 to 30 April 1975, including meetings in January 1971 and January and March 1975.',
    limits: 'The site’s own article (April 2016).' },
  { id: 'VNS-BUNKERS', short: 'Viet Nam News', title: 'Historic bunkers at Thăng Long Imperial Citadel open to public — Viet Nam News', org: 'Viet Nam News', url: 'https://vietnamnews.vn/life-style/1723785/historic-bunkers-at-thang-long-imperial-citadel-open-to-public.html', type: 'press', checked: today,
    used: 'New exhibitions opened on 19 August 2025, including the General Staff’s cipher bunker, built in 1966, and House and Bunker D67.',
    limits: 'A news report (August 2025); links D67 to the 1968 Tết Offensive, which the Centre’s own dates do not support.' },
  { id: 'HTTL-TICKETS', short: 'Imperial Citadel of Thang Long', title: 'Giá vé tham quan Hoàng thành Thăng Long — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre', url: 'https://hoangthanhthanglong.vn/gia-ve-tham-quan-hoang-thanh-thang-long/', type: 'site', checked: today,
    used: 'Entry at 100,000 VND per person from 1 January 2025; half price for people aged 60 and over and for students with a card; free for children under 16; open 8:00–17:00 daily.',
    limits: 'The official notice (January 2025); prices may change.' },
  { id: 'VNP-NIGHT', short: 'VietnamPlus', title: 'Tour đêm “Giải mã Hoàng thành Thăng Long” — VietnamPlus', org: 'VietnamPlus', url: 'https://www.vietnamplus.vn/tour-dem-giai-ma-hoang-thanh-thang-long--hanh-trinh-trai-nghiem-dac-sac-post935874.vnp', type: 'press', checked: today,
    used: 'The night tour launched in April 2021: weekend evenings, about an hour and a half, from Đoan Môn to the excavations; 300,000 VND for adults in 2024.',
    limits: 'A feature (March 2024); we found no later price.' },
  { id: 'VNE-1000NAM', short: 'VnExpress', title: 'Hà Nội khai hội nghìn năm — VnExpress', org: 'VnExpress', url: 'https://vnexpress.net/ha-noi-khai-hoi-nghin-nam-2176427.html', type: 'press', checked: today,
    used: 'The thousand-year celebrations opening at 8:00 on 1 October 2010 by Hồ Gươm, with a sacred flame lit, and ten days of events.',
    limits: 'A news report (October 2010).' },
  { id: 'SGGP-1000NAM', short: 'Sài Gòn Giải Phóng', title: 'Diễu binh, diễu hành mừng Đại lễ 1000 năm Thăng Long – Hà Nội — SGGP', org: 'Sài Gòn Giải Phóng, by Phan Thảo and Thu Hà', url: 'https://www.sggp.org.vn/dieu-binh-dieu-hanh-mung-dai-le-1000-nam-thang-long-ha-noi-hoanh-trang-xuc-dong-post286847.html', type: 'press', checked: today,
    used: 'The main ceremony at Ba Đình on 10 October 2010, with a 21-gun salute, a parade of about 12,000 marchers and nearly 40,000 people taking part.',
    limits: 'A news report (October 2010).' },
  { id: 'ND-WHC48', short: 'Nhân Dân', title: 'Ủy ban Di sản Thế giới thông qua báo cáo về tình trạng bảo tồn của Khu trung tâm Hoàng thành Thăng Long – Hà Nội — Nhân Dân', org: 'Nhân Dân, by Thiên Lam', url: 'https://nhandan.vn/ocop/uy-ban-di-san-the-gioi-thong-qua-bao-cao-ve-tinh-trang-bao-ton-cua-khu-trung-tam-hoang-thanh-thang-long-ha-noi-post977504.html', type: 'press', checked: today,
    used: 'The World Heritage Committee’s 48th session (July 2026) noting progress and asking Vietnam to keep preparing technical documents for rebuilding Kính Thiên palace.',
    limits: 'A news report (July 2026) of a decision we could not read at UNESCO.' },
  { id: 'TP-KINHTHIEN', short: 'Tiền Phong', title: 'Điện Kính Thiên trước cuộc đại phục dựng hơn 1.600 tỷ đồng — Tiền Phong', org: 'Tiền Phong, by Ngọc Ánh', url: 'https://tienphong.vn/dien-kinh-thien-truoc-cuoc-dai-phuc-dung-hon-1600-ty-dong-post1876399.tpo', type: 'press', checked: today,
    used: 'A preliminary budget of 1,686 billion VND for rebuilding Kính Thiên, approved by the city council on 15 June 2026, for 2026–2030.',
    limits: 'A news report (September 2026); a preliminary figure.' },
  { id: 'HTTL-KHOICONG', short: 'Imperial Citadel of Thang Long', title: 'Khởi công phục dựng điện Kính Thiên — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre', url: 'https://hoangthanhthanglong.vn/khoi-cong-phuc-dung-dien-kinh-thien-trung-tam-hoang-thanh-thang-long/', type: 'site', checked: today,
    used: 'Work on rebuilding Kính Thiên starting on the morning of 29 September 2026, after fifteen years of research.',
    limits: 'The site’s own report (September 2026).' },
  { id: 'VNP-KT2026', short: 'VietnamPlus', title: 'Phát hiện địa tầng 6m hé lộ lịch sử dưới lòng đất Hoàng thành Thăng Long — VietnamPlus', org: 'VietnamPlus, by Tuyết Mai', url: 'https://www.vietnamplus.vn/phat-hien-dia-tang-6m-he-lo-lich-su-duoi-long-dat-hoang-thanh-thang-long-post1136051.vnp', type: 'press', checked: today,
    used: 'A 2026 dig at the base of Kính Thiên finding about six metres of layers from Đại La to the Nguyễn, and a hall of nine by five bays.',
    limits: 'A news report (September 2026); gives two different figures for the area dug.' }
];

const claims = [
  { id: 'C-THANGLONG', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES', 'HTTL-JOURNEY'], text: 'Hà Nội counts its thousand years from 1010, when King Lý Thái Tổ moved the capital here and named it Thăng Long. The Central Sector of the Imperial Citadel of Thăng Long – Hà Nội was inscribed on the UNESCO World Heritage List in 2010.' },
  { id: 'C-TL-MOVE', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES', 'VGP-NAMES'], text: 'In 1010 Lý Thái Tổ moved the capital from Hoa Lư to the citadel of Đại La, which a Tang governor, Gao Pian (Cao Biền), had enlarged in 866, and renamed it Thăng Long.' },
  { id: 'C-TL-DRAGON', kind: 'legend', status: 'published', sourceIds: ['ND-RONG'], text: 'The court chronicle Đại Việt sử ký toàn thư says that when the king arrived in the seventh month of 1010, a yellow dragon appeared by the royal boat, and so the citadel was named Thăng Long, the rising dragon.' },
  { id: 'C-TL-EDICT', kind: 'history', status: 'published', sourceIds: ['ND-CHIEU', 'VNE-MOCBAN'], text: 'The Edict on Moving the Capital, Chiếu dời đô, is 214 characters long. It calls the site the finest in the land and a meeting place of the four directions, and ends by asking the court for its view. The oldest known woodblock of it was found at the national archives in Đà Lạt; its date is unsettled.' },
  { id: 'C-TL-NAMES', kind: 'history', status: 'published', sourceIds: ['VGP-NAMES', 'VGP-STAGES'], text: 'The city has been Thăng Long (1010), Đông Đô (1397), Đông Quan under Ming rule, Đông Kinh under the Lê (dated 1427 on one official page and 1430 on another), Bắc Thành under the Tây Sơn, Thăng Long again in 1805 with a different character for Long, and Hà Nội from 1831.' },
  { id: 'C-TL-DYNASTIES', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES'], text: 'Thăng Long was the capital of the Lý (1009–1225), the Trần (1226–1400) and the Lê (1428–1788). The Trần repaired the citadel and rebuilt the Forbidden City in 1243.' },
  { id: 'C-TL-NGUYEN', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES', 'VGP-NAMES'], text: 'The Nguyễn, from 1802, ruled from Phú Xuân (Huế). In 1805 the old capital kept the name Thăng Long but with its Long changed from “dragon” to a word meaning prosperity, and in 1831 Emperor Minh Mạng made it the seat of a new province, Hà Nội.' },
  { id: 'C-TL-FRENCH', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES', 'ND-KYDAI'], text: 'After the 1883 treaty France ruled the north; a French decree of 1888 made Hà Nội a city. The French pulled down most of the citadel in 1894–1897 (some sources say 1896–97); the Flag Tower survived.' },
  { id: 'C-TL-1945', kind: 'history', status: 'published', sourceIds: ['VGP-STAGES', 'ND-KYDAI'], text: 'On 2 September 1945 Hồ Chí Minh proclaimed the Democratic Republic of Vietnam at Ba Đình, with Hà Nội as its capital. On 10 October 1954 the city was handed over and a flag ceremony was held at the Flag Tower. In 1976 the National Assembly made Hà Nội the capital of the reunified country.' },
  { id: 'C-TL-UNESCO', kind: 'history', status: 'published', sourceIds: ['HTTL-JOURNEY', 'HTTL-15'], text: 'The World Heritage Committee inscribed the Central Sector on 31 July 2010, at its 34th session in Brasília (already 1 August in Vietnam). The property takes in the central axis of the old citadel and the archaeological site at 18 Hoàng Diệu; the site describes it as over 1,300 years of history in one place.' },
  { id: 'C-DOANMON', kind: 'history', status: 'published', sourceIds: ['ND-DOANMON'], text: 'Đoan Môn, the gate into the old Forbidden City, was built under the early Lê in the fifteenth century and repaired under the Nguyễn. It has five arched openings; the middle one was for the king. A dig in 1999 found a Lê paved yard 1.2 m below it and a Trần brick road at 1.9 m.' },
  { id: 'C-TL-KINHTHIEN', kind: 'history', status: 'published', sourceIds: ['HTTL-KINHTHIEN', 'VNP-KT2026'], text: 'Kính Thiên, the main palace, was built in 1428 and rebuilt in 1465. The French pulled it down in the late nineteenth century for an artillery barracks. Its hall was nine bays wide; 28 of its 60 column positions have been found, and a 2026 dig found about six metres of layers beneath it.' },
  { id: 'C-TL-HAULAU', kind: 'history', status: 'published', sourceIds: ['HTTL-HAULAU', 'ND-HAULAU'], text: 'Hậu Lâu, the rear pavilion, was built by Emperor Minh Mạng in 1821 and altered by the French, who called it the Pagode des Dames. Centre texts differ on its first use: one calls it Daoist, another says it was used for Buddhist worship.' },
  { id: 'C-TL-BACMON', kind: 'history', status: 'published', sourceIds: ['HTTL-BACMON'], text: 'Bắc Môn, the north gate of the citadel begun in 1805, still shows two marks of French cannon fire from 1882. When the citadel fell that year its governor, Hoàng Diệu, took his own life; he and Nguyễn Tri Phương, who defended it in 1873, are honoured in the pavilion above the gate.' },
  { id: 'C-TL-FLAG', kind: 'history', status: 'published', sourceIds: ['ND-KYDAI', 'VNS-FLAG'], text: 'The Flag Tower was built in 1805–1812, early in the Nguyễn period. It is about 33 m tall, 44 m with the flagpole, and opened for visitors to climb in early 2025.' },
  { id: 'C-TL-18HD', kind: 'history', status: 'published', sourceIds: ['ND-18HD'], text: 'Digging at 18 Hoàng Diệu began in December 2002. By December 2009 about 33,000 m² had been opened and 168 features found, among them 95 building foundations, 24 wells and 33 drains, in layers from Đại La (seventh to ninth centuries) to the Nguyễn. Finds include Đại La bricks, Lê dragon tiles, royal ceramics, a boat and oars, and ceramics from China, Japan and West Asia.' },
  { id: 'C-TL-DIGAREA', kind: 'history', status: 'published', sourceIds: ['VNN-15YRS', 'ND-18HD'], text: 'Figures for the area excavated differ with what is counted: an archaeologist put the 18 Hoàng Diệu and National Assembly digs together at over 30,000 m² in 2025.' },
  { id: 'C-TL-QUOCHOI', kind: 'history', status: 'published', sourceIds: ['ND-QUOCHOI'], text: 'Building the new National Assembly next door led to a dig in 2008–09; more than 400 of its finds are shown in an underground display beneath the building.' },
  { id: 'C-TL-D67', kind: 'history', status: 'published', sourceIds: ['HTTL-D67', 'VNS-BUNKERS'], text: 'Inside the citadel, House D67, built in 1967, was used by the Politburo and the Central Military Commission from September 1968 until 30 April 1975. It and the General Staff’s cipher bunker of 1966 opened as exhibitions in August 2025.' },
  { id: 'C-TL-1000', kind: 'history', status: 'published', sourceIds: ['VNE-1000NAM', 'SGGP-1000NAM'], text: 'The thousand-year celebrations opened on 1 October 2010 by Hồ Gươm and ran for ten days, ending with a ceremony and parade at Ba Đình on 10 October: a 21-gun salute and about 12,000 marchers, with nearly 40,000 people taking part.' },
  { id: 'C-TL-REBUILD', kind: 'history', status: 'published', sourceIds: ['ND-WHC48', 'TP-KINHTHIEN', 'HTTL-KHOICONG'], text: 'In July 2026 the World Heritage Committee asked Vietnam to keep preparing technical documents for rebuilding Kính Thiên. The city council approved a preliminary 1,686 billion VND for 2026–2030, and work began on 29 September 2026 after fifteen years of research.' },
  { id: 'C-TL-VISIT', kind: 'siteRule', status: 'published', sourceIds: ['HTTL-TICKETS'], text: 'The citadel is open 8:00–17:00 every day. Entry is 100,000 VND, half price for people aged 60 and over and for students with a card, and free for children under 16 (prices from January 2025).' },
  { id: 'C-TL-NIGHT', kind: 'custom', status: 'published', sourceIds: ['VNP-NIGHT'], text: 'A guided night tour, run on weekend evenings since 2021, takes about an hour and a half from Đoan Môn to the excavations. In 2024 it cost 300,000 VND for adults.' },
  { id: 'C-TL-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Give the citadel a morning: enter at Đoan Môn, walk north along the axis to Hậu Lâu, then walk to the excavations at 18 Hoàng Diệu, and leave the Flag Tower for last.' }
];

const glossary = [
  { id: 'cam-thanh', vi: 'Cấm thành', say: 'gum tahn', en: 'The Forbidden City: the innermost walled precinct, where the king lived and held court.' },
  { id: 'hoang-thanh', vi: 'Hoàng thành', say: 'hwang tahn', en: 'The Imperial Citadel: the walled royal enclosure around the Forbidden City.' }
];

const story = {
  id: 'st-thang-long',
  layout: 'longform',
  title: 'Thăng Long, a capital since 1010',
  dek: 'A king, a river plain and a rising dragon. How a thousand years of Hà Nội lie stacked under one walled square in Ba Đình, and what you can still see of them.',
  place: 'Hoàng thành Thăng Long, Hà Nội',
  imageId: 'tl-doanmon',
  hero: { image: 'tl-doanmon' },
  appliesTo: 'The Imperial Citadel in Ba Đình, Hà Nội, and the city’s history as a capital. Dates follow the government portal and the site’s conservation centre.',
  varies: 'Official sources differ on a few dates (the name Đông Kinh, the French demolition) and on excavated areas; we give both where they do.',
  sections: [
    { text: 'Hà Nội counts its history as a capital from 1010, when King Lý Thái Tổ moved the court here and named the city Thăng Long. The city marked its thousandth year in 2010.', claimIds: ['C-THANGLONG'] },
    { heading: 'The citadel', text: 'In the same year the Central Sector of the Imperial Citadel of Thăng Long – Hà Nội was added to UNESCO’s World Heritage List.', claimIds: ['C-TL-UNESCO'] },
    { heading: 'What you can see', text: 'Đoan Môn, the gate of the old Forbidden City, leads north along the old axis; nearby are the excavations at 18 Hoàng Diệu.', claimIds: ['C-DOANMON', 'C-TL-18HD'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'In the autumn of 1010 a king came by boat to an old walled town on the plain. He had left the capital at Hoa Lư for a site, as he put it, at the centre of the land. The court chronicle says that as his boat arrived, a yellow dragon rose beside it. He named the place Thăng Long, the rising dragon.', claimIds: ['C-TL-MOVE', 'C-TL-DRAGON'] },
      { text: 'The dragon is legend; the move is history. From that year Hà Nội counts its life as a capital, and in 2010 it celebrated a thousand years. In the same year the heart of the old royal city, a square of gates, lawns and excavation pits in Ba Đình, was inscribed as a World Heritage Site. It is one of the few places where you can stand on top of a thousand years, more or less in layers.', claimIds: ['C-THANGLONG', 'C-TL-UNESCO'] }
    ] },
    { type: 'facts', title: 'The citadel in brief', items: [
      { term: 'Founded', text: '1010, by Lý Thái Tổ, on the older citadel of Đại La.' },
      { term: 'World Heritage', text: 'Inscribed 31 July 2010.' },
      { term: 'Main gate', text: 'Đoan Môn, fifteenth century, five arches.' },
      { term: 'Open', text: '8:00–17:00 daily; 100,000 VND.' }
    ], claimIds: ['C-TL-MOVE', 'C-TL-UNESCO', 'C-DOANMON', 'C-TL-VISIT'] },

    { type: 'text', heading: 'The edict and the dragon', id: 'edict', paras: [
      { text: 'Lý Thái Tổ explained his move in a short text, the *Chiếu dời đô*, Edict on Moving the Capital: just 214 characters of classical Chinese. In modern Vietnamese translation it says that, looking across the whole land, only this place is the finest site, a meeting point of the four directions, and that the dynasty should build at the centre for the sake of all the generations to come. It ends not with an order but with a question to the court: what do you think?', claimIds: ['C-TL-EDICT'] },
      { text: 'Đại La was not empty when he came. It was an old citadel that a Tang governor, Gao Pian (in Vietnamese, Cao Biền), had enlarged in 866, during the long centuries of Chinese rule. The king renamed it. The chronicle *Đại Việt sử ký toàn thư*, compiled centuries later, gives the reason as the yellow dragon by the royal boat; some modern retellings make it a cloud dragon. Either way, the name stuck for most of the next eight hundred years.', claimIds: ['C-TL-MOVE', 'C-TL-DRAGON'] },
      { text: 'The edict itself survives through copies. In 2010, the anniversary year, archivists announced that the oldest known woodblock of it had been found at the national archives in Đà Lạt. Whether it was carved in the seventeenth century or the early nineteenth is still argued.', claimIds: ['C-TL-EDICT'] }
    ] },
    { type: 'quote', text: 'Looking across our land, only this place is the finest site.', by: 'Chiếu dời đô (1010), from a modern Vietnamese translation, our English', claimIds: ['C-TL-EDICT'] },

    { type: 'text', heading: 'One city, many names', id: 'names', paras: [
      { text: 'Thăng Long was the capital of three long dynasties: the Lý, who founded it, the Trần, who repaired the citadel and rebuilt its Forbidden City in 1243, and the Lê. The names changed with the rulers. The Hồ called it Đông Đô, Eastern Capital, in 1397; under Ming occupation in the early fifteenth century it was Đông Quan; after Lê Lợi drove the Ming out it became Đông Kinh.', claimIds: ['C-TL-DYNASTIES', 'C-TL-NAMES'] },
      { text: 'When the Nguyễn united the country in 1802 they ruled from Phú Xuân, today’s Huế, and Thăng Long became a regional seat. In 1805 it kept its name, but with a different character for *Long*: no longer the dragon, a word that sounds the same and means prosperity. In 1831 Emperor Minh Mạng made it the seat of a new province, Hà Nội, and the province gave the city the name it has today.', claimIds: ['C-TL-NGUYEN', 'C-TL-NAMES'] }
    ] },
    { type: 'note', text: 'Two pages of the same government portal date the name Đông Kinh to 1427 and to 1430. We give both.', claimIds: ['C-TL-NAMES'] },

    { type: 'timeline', heading: 'A thousand years at a glance', label: 'Timeline of Thăng Long – Hà Nội', items: [
      { era: 'Before the capital' },
      { year: '866', title: 'Đại La', text: 'A Tang governor enlarges the citadel of Đại La.', claimIds: ['C-TL-MOVE'] },
      { era: 'Thăng Long' },
      { year: '1010', title: 'The rising dragon', text: 'Lý Thái Tổ moves the court from Hoa Lư and names the city Thăng Long.', claimIds: ['C-TL-MOVE', 'C-TL-DRAGON'] },
      { year: '1243', title: 'A new Forbidden City', text: 'The Trần rebuild the innermost royal precinct.', claimIds: ['C-TL-DYNASTIES'] },
      { year: '1397', title: 'Đông Đô', text: 'The Hồ rename the city the Eastern Capital.', claimIds: ['C-TL-NAMES'] },
      { year: '1428', title: 'Kính Thiên', text: 'The Lê build their main palace; it is rebuilt in 1465.', claimIds: ['C-TL-KINHTHIEN', 'C-TL-DYNASTIES'] },
      { year: '1400s', title: 'Đoan Môn', text: 'The early Lê build the gate that still stands.', claimIds: ['C-DOANMON'], image: 'tl-doanmon', caption: 'Đoan Môn today.' },
      { era: 'Under the Nguyễn' },
      { year: '1802', title: 'Capital at Huế', text: 'The Nguyễn rule from Phú Xuân; Thăng Long becomes a regional seat.', claimIds: ['C-TL-NGUYEN'] },
      { year: '1805', title: 'A new citadel', text: 'A new citadel is begun, and the Flag Tower raised by 1812.', claimIds: ['C-TL-FLAG', 'C-TL-BACMON'], image: 'tl-flagtower', caption: 'The Flag Tower.' },
      { year: '1831', title: 'Hà Nội', text: 'Minh Mạng creates the province of Hà Nội.', claimIds: ['C-TL-NGUYEN'] },
      { era: 'French rule' },
      { year: '1882', title: 'The citadel falls', text: 'French cannon mark Bắc Môn; Governor Hoàng Diệu takes his own life.', claimIds: ['C-TL-BACMON'], image: 'tl-bacmon', caption: 'Bắc Môn, the north gate.' },
      { year: '1894–97', title: 'Demolition', text: 'Most of the citadel is pulled down; the Flag Tower survives.', claimIds: ['C-TL-FRENCH'] },
      { era: 'The modern capital' },
      { year: '1945', title: 'Independence', text: 'Hồ Chí Minh proclaims the Democratic Republic of Vietnam at Ba Đình.', claimIds: ['C-TL-1945'] },
      { year: '1954', title: '10 October', text: 'The city is handed over; a flag ceremony is held at the Flag Tower.', claimIds: ['C-TL-1945'] },
      { year: '1968–75', title: 'House D67', text: 'The war is directed from a low building inside the citadel.', claimIds: ['C-TL-D67'] },
      { year: '2002', title: '18 Hoàng Diệu', text: 'Archaeologists begin digging beside the palace site.', claimIds: ['C-TL-18HD'] },
      { year: '2010', title: 'A thousand years', text: 'Ten days of celebrations; the Central Sector is inscribed on 31 July.', claimIds: ['C-TL-1000', 'C-TL-UNESCO'] },
      { year: '2026', title: 'Kính Thiên rises again', text: 'Work begins on rebuilding the main palace.', claimIds: ['C-TL-REBUILD'] }
    ] },

    { type: 'text', heading: 'What the French left, and what they did not', id: 'french', paras: [
      { text: 'The citadel you walk through today is mostly a Nguyễn one, built from 1805, on top of the Lê and Lý royal city. It did not last long. In 1882 French troops attacked it; two marks of their cannon fire can still be seen on the brick of Bắc Môn, the north gate. When the citadel fell, its governor, Hoàng Diệu, took his own life rather than surrender. He is honoured, with Nguyễn Tri Phương, who had defended the city in 1873, in the small pavilion above the gate.', claimIds: ['C-TL-BACMON'] },
      { text: 'After a treaty in 1883 France ruled the north, and a decree of 1888 made Hà Nội a French city. Between 1894 and 1897 most of the citadel was pulled down; Kính Thiên palace made way for an artillery barracks. The Flag Tower, a brick tower of 1805–1812 more than thirty metres tall, survived.', claimIds: ['C-TL-FRENCH', 'C-TL-KINHTHIEN', 'C-TL-FLAG'] }
    ] },
    { type: 'figure', image: 'tl-flagtower', size: 'wide', caption: 'The Flag Tower of 1805–1812.' },

    { type: 'steps', heading: 'Walking the axis', id: 'walk', items: [
      { title: 'Đoan Môn', paras: [
        { text: 'Enter at the south, through Đoan Môn, the gate of the [[cam-thanh|Forbidden City]]. It dates from the early Lê in the fifteenth century, repaired under the Nguyễn. It has five arched openings; the middle one was the king’s. A dig there in 1999 found a Lê paved yard 1.2 metres down, and a Trần brick road beneath that.', claimIds: ['C-DOANMON'] }
      ], image: 'tl-doanmon', caption: 'Đoan Môn, seen from the south.' },
      { title: 'Kính Thiên', paras: [
        { text: 'North of the gate is the platform where Kính Thiên, the main palace, stood: built in 1428, rebuilt in 1465, demolished by the French. A wide flight of stone steps, carved with dragons, survives. Of the hall above it, nine bays wide, archaeologists have found 28 of its 60 column positions. This is the building now being rebuilt.', claimIds: ['C-TL-KINHTHIEN', 'C-TL-REBUILD'] }
      ], image: 'tl-dragons', caption: 'Stone dragons on the steps of the Kính Thiên site.' },
      { title: 'House D67', paras: [
        { text: 'Behind the platform is a plain building. House D67 was built in 1967, and from September 1968 until 30 April 1975 the Politburo and the Central Military Commission met here to direct the war. Its rooms and the bunkers beneath were opened as new exhibitions in August 2025.', claimIds: ['C-TL-D67'] }
      ] },
      { title: 'Hậu Lâu', paras: [
        { text: 'At the north end stands Hậu Lâu, the rear pavilion, built by Emperor Minh Mạng in 1821 and remodelled by the French, who called it the Pagode des Dames. The Centre’s own texts disagree about its first use: one calls it Daoist, another says it was for Buddhist worship.', claimIds: ['C-TL-HAULAU'] }
      ] },
      { title: 'Bắc Môn', paras: [
        { text: 'A short walk north is the north gate, with its two cannon marks and the shrine to Hoàng Diệu above. Its plaque reads Chính Bắc Môn.', claimIds: ['C-TL-BACMON'] }
      ], image: 'tl-bacmon', caption: 'Bắc Môn lit at night.' }
    ] },

    { type: 'text', heading: 'Under 18 Hoàng Diệu', id: 'dig', paras: [
      { text: 'In December 2002 archaeologists began digging at 18 Hoàng Diệu, about a hundred metres west of the Kính Thiên foundations. By the end of 2009 they had opened about 33,000 square metres and recorded 168 features: 95 building foundations, 24 wells, 33 drains and the lines of walls, layered from Đại La, in the seventh to ninth centuries, up through the Lý, Trần and Lê to the Nguyễn.', claimIds: ['C-TL-18HD'] },
      { text: 'The finds range from the bricks of Đại La, some stamped with the name of the army unit that made them, to Lê roof tiles shaped as dragons, royal ceramics, a boat with its oars, and ceramics brought from China, Japan and West Asia. That depth, one capital on top of another in the same place, is what the conservation centre means when it speaks of over 1,300 years of continuous history.', claimIds: ['C-TL-18HD', 'C-TL-UNESCO'] },
      { text: 'The site of the new National Assembly building next door was dug in 2008–09 and added more: over 400 of its finds are shown in an underground display beneath it.', claimIds: ['C-TL-QUOCHOI'] }
    ] },
    { type: 'note', text: 'Excavated areas are given differently depending on which digs are counted: about 33,000 m² for 18 Hoàng Diệu by 2009 in one Centre text, and over 30,000 m² for that site and the National Assembly site together in a 2025 account.', claimIds: ['C-TL-DIGAREA'] },

    { type: 'text', heading: 'Ba Đình, 1945 and after', id: 'modern', paras: [
      { text: 'The square beside the citadel, Ba Đình, is where the modern state began. On 2 September 1945 Hồ Chí Minh read the Declaration of Independence there, proclaiming the Democratic Republic of Vietnam with Hà Nội as its capital. War followed. On 10 October 1954 the city was handed over and the national flag was raised at the Flag Tower,.', claimIds: ['C-TL-1945'] },
      { text: 'Through the next war the leadership worked inside the old citadel walls, in House D67 and the bunkers under it. In 1976, after reunification, the National Assembly confirmed Hà Nội as capital of the whole country.', claimIds: ['C-TL-D67', 'C-TL-1945'] }
    ] },

    { type: 'text', heading: 'A thousand years, 2010', id: 'millennium', paras: [
      { text: 'The celebrations began at eight in the morning on 1 October 2010 by Hồ Gươm, with a sacred flame lit, and ran for ten days, with stages set up around the lake. They ended on 10 October at Ba Đình with a 21-gun salute and a parade of about 12,000 marchers; nearly 40,000 people took part.', claimIds: ['C-TL-1000'] },
      { text: 'For [the lake at the centre of those celebrations](story:st-sword-lake), see our story on its legend.', editorial: true }
    ] },

    { type: 'text', heading: 'Kính Thiên, again', id: 'rebuild', paras: [
      { text: 'For years the question has been whether to rebuild the palace that the French pulled down. In July 2026 the World Heritage Committee asked Vietnam to keep preparing the technical documents for it. A dig at its base that year found about six metres of layers, from Đại La to the Nguyễn. The city council approved a preliminary budget of 1,686 billion đồng for 2026 to 2030, and work began on 29 September 2026, after what the Centre describes as fifteen years of research.', claimIds: ['C-TL-REBUILD', 'C-TL-KINHTHIEN'] }
    ] },

    { type: 'text', heading: 'Visiting', id: 'visit', paras: [
      { text: 'The citadel is open every day from 8:00 to 17:00. Entry is 100,000 đồng; people aged 60 and over and students with a card pay half, and children under 16 go free. The Flag Tower opened for visitors to climb in early 2025.', claimIds: ['C-TL-VISIT', 'C-TL-FLAG'] },
      { text: 'On weekend evenings there is a guided night tour, run since 2021, that takes about an hour and a half from Đoan Môn to the excavations; in 2024 it cost 300,000 đồng for adults. If you want to film, ask the site first; and dress neatly, as you would at any place of history.', claimIds: ['C-TL-NIGHT', 'C-PHOTO-CITADEL'] },
      { text: 'Give the citadel a morning. Enter at Đoan Môn, walk north along the axis to Hậu Lâu, then walk to the excavations at 18 Hoàng Diệu, and leave the Flag Tower for last.', claimIds: ['C-TL-TIP'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: '1010', text: 'Lý Thái Tổ moves the capital; Thăng Long, the rising dragon.' },
      { term: '1831', text: 'The name Hà Nội.' },
      { term: '2010', text: 'A thousand years; World Heritage.' },
      { term: 'Ticket', text: '100,000 đồng; open 8:00–17:00.' }
    ] },
    { type: 'quiz', image: 'tl-doanmon', question: 'Why “Thăng Long”?', prompt: 'A friend says Thăng Long, the rising dragon, is just a poetic nickname. What does the old chronicle say?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'A dragon appeared by the king’s boat', fit: true, feedback: 'Yes. Đại Việt sử ký toàn thư says a yellow dragon rose by the royal boat in 1010. It is a legend, but an old one.' },
      { label: 'The French named it', feedback: 'No. The name is from 1010; under the French the city was already Hà Nội.' },
      { label: 'It was the name given in 1831', feedback: 'No. 1831 is when Emperor Minh Mạng created the province of Hà Nội; Thăng Long is from 1010.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [story] };
