/* Stories at Văn Miếu – Quốc Tử Giám: st-van-mieu-university (longform) and st-stelae (timeline).
   Researched 12 Nov 2026. Corrections from research: national treasure 2015 (not 2012); Memory of the World 9 Mar 2010 (Asia-Pacific) and 26 May 2011 (international);
   1,304 laureates (UNESCO); Khải Thánh burnt in 1946; Khuê Văn Các is the capital's symbol under the 2012 Capital Law. "Poems read at Khuê Văn Các" was dropped: no source. */
const today = '2026-11-12';

const sources = [
  { id: 'VM-HISTORY', short: 'Văn Miếu – Quốc Tử Giám', title: 'Lịch sử di tích — Văn Miếu – Quốc Tử Giám', org: 'Văn Miếu – Quốc Tử Giám Centre for Cultural and Scientific Activities (official site)', url: 'https://vanmieu.gov.vn/vi/introduction/site-history', type: 'gov', checked: today,
    used: 'The site’s timeline: Văn Miếu built in 1070 under Lý Thánh Tông; Quốc Tử Giám founded in 1076 under Lý Nhân Tông; the first examination of 1075; Chu Văn An as deputy head under the Trần; the school enlarged in 1483; the academy moved to Huế in 1802; the site a prefectural school from 1805; a national relic in 1962, a special national relic in 2012; the stelae a national treasure in 2015.',
    limits: 'An undated official page.' },
  { id: 'VM-ARCH', short: 'Văn Miếu – Quốc Tử Giám', title: 'Kiến trúc: Văn Miếu Môn, Đại Trung Môn, Khuê Văn Các, Điện Đại Thành, Nhà Thái Học — Văn Miếu – Quốc Tử Giám', org: 'Văn Miếu – Quốc Tử Giám Centre for Cultural and Scientific Activities (official site)', url: 'https://vanmieu.gov.vn/vi/visit/architecture/khue-van-pavilion', type: 'gov', checked: today,
    used: 'The main gate (two storeys, three openings, eight roofs, Lê dragons in front and Nguyễn dragons inside); Đại Trung gate and its carp ornaments; Khuê Văn Các, commissioned in 1805 by Nguyễn Văn Thành, with round windows evoking the Khuê star; the nine-bay Bái Đường with 40 ironwood columns and the panel “Vạn thế sư biểu”; Khải Thánh temple burnt in 1946; Thái Học house built 1999–2000 and who it honours.',
    limits: 'Undated official pages, one for each building.' },
  { id: 'VM-VISIT', short: 'Văn Miếu – Quốc Tử Giám', title: 'Thông tin tham quan — Văn Miếu – Quốc Tử Giám', org: 'Văn Miếu – Quốc Tử Giám Centre for Cultural and Scientific Activities (official site)', url: 'https://vanmieu.gov.vn/vi/introduction/visitor-information', type: 'gov', checked: today,
    used: 'Opening hours of 8 a.m. to 5 p.m.; tickets of 70,000 đồng, 35,000 đồng for students in Vietnam and people over 60, free for under-16s; night tour hours on Wednesday, Saturday and Sunday.',
    limits: 'Read in November 2026; prices change.' },
  { id: 'VM-NIGHT', short: 'Văn Miếu – Quốc Tử Giám', title: 'Tour đêm — Văn Miếu – Quốc Tử Giám', org: 'Văn Miếu – Quốc Tử Giám Centre for Cultural and Scientific Activities (official site)', url: 'https://vanmieu.gov.vn/vi/experience/night-tour', type: 'gov', checked: today,
    used: 'Night tour prices: 299,000 đồng for one show, 399,000 đồng for two.',
    limits: 'Read in November 2026.' },
  { id: 'UNESCO-STELAE-N', short: 'UNESCO', title: 'Stone Stele Records of Royal Examinations of the Le and Mac Dynasties (1442–1779): nomination form — UNESCO Memory of the World', org: 'UNESCO Memory of the World (nomination submitted by the Văn Miếu centre)', url: 'https://media.unesco.org/sites/default/files/webform/mow001/vietnam_stone_stele_records_royal_examinations_le_mac_dynasties.pdf', type: 'gov', checked: today,
    used: 'The first stele set up in 1484 by order of King Lê Thánh Tông for the examination of 1442; 82 stelae for 82 examinations, erected 1484–1780 in batches (1653, 1717, 1721–1780); the names of 1,304 doctoral laureates and their home villages; stelae up to 2.07 m tall on turtle-shaped bases; visitors rubbing stelae and turtles causing wear; examinations every three years from 1434; the last examination in 1919.',
    limits: 'A 2010 nomination form; it contains a few typing errors in dates, which we did not use.' },
  { id: 'UNESCO-STELAE-R', short: 'UNESCO', title: 'Stone Stele Records of Royal Examinations of the Le and Mac Dynasties (1442–1779) — UNESCO Memory of the World', org: 'UNESCO', url: 'https://www.unesco.org/en/memory-world/stone-stele-records-royal-examinations-le-and-mac-dynasties-1442-1779', type: 'gov', checked: today,
    used: 'Registration on the international Memory of the World register in 2011.',
    limits: 'The register page.' },
  { id: 'TT-MOW2010', short: 'Tuổi Trẻ', title: 'Bia tiến sĩ tại Văn Miếu – Quốc Tử Giám là di sản tư liệu thế giới — Tuổi Trẻ', org: 'Tuổi Trẻ (from the Vietnam News Agency)', url: 'https://tuoitre.vn/bia-tien-si-tai-van-mieu---quoc-tu-giam-la-di-san-tu-lieu-the-gioi-367388.htm', type: 'press', checked: today,
    used: 'The stelae added to the Asia-Pacific Memory of the World register in Macao on 9 March 2010.',
    limits: 'A news report (March 2010).' },
  { id: 'VGP-MOW2011', short: 'Viet Nam Government Portal', title: 'Doctoral steles become UNESCO’s Memory of the World — Viet Nam Government Portal', org: 'Viet Nam Government Portal (thanglong.chinhphu.vn), by Khánh Phương', url: 'https://thanglong.chinhphu.vn/english/doctoral-steles-become-unescos-memory-of-the-world-110293.htm', type: 'gov', checked: today,
    used: 'The stelae added to the international Memory of the World register on 26 May 2011.',
    limits: 'A news item (May 2011).' },
  { id: 'TT-VANMIEU', short: 'Tuổi Trẻ', title: 'Văn Miếu – Quốc Tử Giám, trường đại học cổ nhất Việt Nam — Tuổi Trẻ', org: 'Tuổi Trẻ, by Tiến Thành', url: 'https://tuoitre.vn/van-mieu---quoc-tu-giam-truong-dai-hoc-co-nhat-viet-nam-327456.htm', type: 'press', checked: today,
    used: 'The site of 54,331 m² and its five courtyards; Thành Đức and Đạt Tài gates for virtue and talent; Khuê Văn Các with two storeys and eight roofs; Thiên Quang Tỉnh; side halls that once held tablets for 72 disciples of Confucius; the Bích Ung bell cast in 1768 and the stone chime.',
    limits: 'A feature (July 2009).' },
  { id: 'VNP-VM950', short: 'VietnamPlus', title: 'Văn Miếu – Quốc Tử Giám: Di sản 950 năm và hành trình làm mới trải nghiệm văn hóa — VietnamPlus', org: 'VietnamPlus', url: 'https://www.vietnamplus.vn/van-mieu-quoc-tu-giam-di-san-950-nam-va-hanh-trinh-lam-moi-trai-nghiem-van-hoa-post1145255.vnp', type: 'press', checked: today,
    used: 'The site’s three parts (Văn Lake, the Giám garden and the temple precinct) and five spaces on its axis; 2026 as the 950th year of Quốc Tử Giám.',
    limits: 'A feature (October 2026).' },
  { id: 'VNP-THAIHOC', short: 'VietnamPlus', title: '950 năm Quốc Tử Giám: Nhà Thái Học — dấu ấn của trường Quốc học xưa — VietnamPlus', org: 'VietnamPlus', url: 'https://www.vietnamplus.vn/950-nam-quoc-tu-giam-nha-thai-hoc-dau-an-cua-truong-quoc-hoc-xua-post1146246.vnp', type: 'press', checked: today,
    used: 'Students in 1076 drawn from the royal family, nobles and mandarins’ families; commoners of ability admitted from 1253 under Trần Thái Tông; more than seven centuries of teaching.',
    limits: 'A feature (2026).' },
  { id: 'TT-KHUEVAN', short: 'Tuổi Trẻ', title: 'Chọn Khuê Văn Các làm biểu tượng của thủ đô — Tuổi Trẻ', org: 'Tuổi Trẻ, by Quốc Thanh', url: 'https://tuoitre.vn/chon-khue-van-cac-lam-bieu-tuong-cua-thu-do-521511.htm', type: 'press', checked: today,
    used: 'The National Assembly choosing Khuê Văn Các as the capital’s symbol in the Capital Law on 21 November 2012.',
    limits: 'A news report (November 2012).' },
  { id: 'ND-BIA', short: 'Nhân Dân', title: 'Bia đá “kể chuyện” kinh sử xưa — Nhân Dân', org: 'Nhân Dân, by Giang Nam', url: 'https://nhandan.vn/bia-da-ke-chuyen-kinh-su-xua-post856297.html', type: 'press', checked: today,
    used: 'The 1442 stele text by Thân Nhân Trung with the line “hiền tài là nguyên khí quốc gia”.',
    limits: 'A feature (January 2025).' },
  { id: 'TT-RUA', short: 'Tuổi Trẻ', title: 'Rùa biểu tượng sự trường tồn trong văn hóa Việt — Tuổi Trẻ', org: 'Tuổi Trẻ, by V. V. Tuân (interview with Prof. Ngô Đức Thịnh)', url: 'https://tuoitre.vn/rua-bieu-tuong-su-truong-ton-trong-van-hoa-viet-1041523.htm', type: 'press', checked: today,
    used: 'The folklorist Ngô Đức Thịnh on the turtle under a doctoral stele as a sign that the laureates’ names last for ever.',
    limits: 'An interview (January 2016).' },
  { id: 'TT-DUCBO', short: 'Tuổi Trẻ', title: 'Bí mật những dòng chữ trên bia tiến sĩ bị đục bỏ — Tuổi Trẻ', org: 'Tuổi Trẻ, by Thiên Điểu', url: 'https://tuoitre.vn/bi-mat-nhung-dong-chu-tren-bia-tien-si-bi-duc-bo-20260211012805844.htm', type: 'press', checked: today,
    used: 'Lines praising the Trịnh lords chiselled off the stelae after an order of 1840.',
    limits: 'A feature (February 2026).' },
  { id: 'TP-RUA2012', short: 'Tiền Phong', title: 'Sinh viên tình nguyện vào mùa “trông rùa” Văn Miếu — Tiền Phong', org: 'Tiền Phong, by Trường Phong', url: 'https://tienphong.vn/gioi-tre/582681/sinh-vien-tinh-nguyen-vao-mua-trong-rua-van-mieu-tpov.html', type: 'press', checked: today,
    used: 'Students visiting before university entrance exams to pray for luck; the turtles roped off and guarded by volunteers in 2012.',
    limits: 'A news report (June 2012).' },
  { id: 'BPL-RUA2014', short: 'Báo Pháp Luật', title: 'Sỹ tử bất lực trước ý định sờ đầu rùa — Báo Pháp Luật Việt Nam', org: 'Báo Pháp Luật Việt Nam, by Trần Kháng', url: 'https://baophapluat.vn/sy-tu-bat-luc-truoc-y-dinh-so-dau-rua-post180220.html', type: 'press', checked: today,
    used: 'A stainless-steel fence replacing the silk ropes around the stelae in 2014.',
    limits: 'A news report (July 2014).' },
  { id: 'VNE-BVQG2015', short: 'VnExpress', title: '12 bảo vật quốc gia mới — VnExpress', org: 'VnExpress', url: 'https://vnexpress.net/12-bao-vat-quoc-gia-moi-3135467.html', type: 'press', checked: today,
    used: 'The 82 stelae named a national treasure by the Prime Minister in January 2015.',
    limits: 'A news report (January 2015).' },
  { id: 'VNS-XINCHU', short: 'Việt Nam News', title: 'Spring Calligraphy Festival 2026 opens in Văn Miếu — Việt Nam News', org: 'Việt Nam News', url: 'https://vietnamnews.vn/life-style/1765703/spring-calligraphy-festival-2026-opens-in-van-mieu.html', type: 'press', checked: today,
    used: 'The 2026 spring calligraphy festival at Văn Lake, 11 February to 1 March, with 35 calligraphers writing characters for visitors’ wishes.',
    limits: 'A news report (February 2026).' },
  { id: 'BPL-THICU', short: 'Báo Pháp Luật', title: 'Uy nghiêm thi cử thời xưa — Báo Pháp Luật Việt Nam', org: 'Báo Pháp Luật Việt Nam (compiled by Đoàn Vũ)', url: 'https://baophapluat.vn/uy-nghiem-thi-cu-thoi-xua-post95667.html', type: 'press', checked: today,
    used: 'The three levels of examination: thi Hương (regional), thi Hội (metropolitan) and thi Đình (in the palace, before the king).',
    limits: 'A compiled feature (2011).' },
  { id: 'TT-1919', short: 'Tuổi Trẻ', title: 'Đường khoa cử từ đây dứt hẳn — Tuổi Trẻ', org: 'Tuổi Trẻ (drawing on Nguyễn Thị Chân Quỳnh, “Khoa cử Việt Nam”)', url: 'https://tuoitre.vn/duong-khoa-cu-tu-day-dut-han-500717.htm', type: 'press', checked: today,
    used: 'The last palace examination held in Huế on 16 May 1919, and King Khải Định declaring the road of examinations ended.',
    limits: 'A feature (2012) based on a historian’s book.' },
  { id: 'BBVPL-VM2025', short: 'Báo Bảo vệ Pháp luật', title: 'Văn Miếu – Quốc Tử Giám đón lượng khách kỉ lục trong năm 2025 — Báo Bảo vệ Pháp luật', org: 'Báo Bảo vệ Pháp luật, by Duy Minh', url: 'https://baovephapluat.vn/van-hoa-xa-hoi/goc-van-hoa/van-mieu-quoc-tu-giam-don-luong-khach-ki-luc-trong-nam-2025-tro-thanh-diem-nhan-van-hoa-du-lich-thu-do-193324.html', type: 'press', checked: today,
    used: 'About 1.7 million visits in 2025, according to the site’s centre.',
    limits: 'A news report (February 2026).' }
];

const claims = [
  { id: 'C-VM-FOUNDED', kind: 'history', status: 'published', sourceIds: ['VM-HISTORY', 'VNP-THAIHOC'], text: 'Văn Miếu was built in 1070 under King Lý Thánh Tông. In 1076 King Lý Nhân Tông founded Quốc Tử Giám beside it, for the sons of the royal family, nobles and mandarins; from 1253, under Trần Thái Tông, commoners of ability were admitted too.' },
  { id: 'C-VM-1070', kind: 'history', status: 'published', sourceIds: ['VM-HISTORY'], text: 'Văn Miếu was built in 1070 under King Lý Thánh Tông. In 1076 King Lý Nhân Tông set up Quốc Tử Giám, the royal academy, beside it.' },
  { id: 'C-VM-ACADEMY', kind: 'history', status: 'published', sourceIds: ['VM-HISTORY', 'VNP-THAIHOC', 'VM-ARCH'], text: 'Quốc Tử Giám taught for more than seven centuries, until the Nguyễn moved it to Huế in 1802. Văn Miếu honours Confucius and the Confucian worthies, and the teacher Chu Văn An, who served as the academy’s deputy head under the Trần.' },
  { id: 'C-VM-EXAM1075', kind: 'history', status: 'published', sourceIds: ['VM-HISTORY'], text: 'The first Confucian examination was held in 1075, a year before the academy opened.' },
  { id: 'C-VM-LAYOUT', kind: 'history', status: 'published', sourceIds: ['TT-VANMIEU', 'VNP-VM950'], text: 'The site covers 54,331 m² in three parts: Văn Lake, the Giám garden and the walled temple precinct, which is divided into five courtyards along one axis.' },
  { id: 'C-VM-GATE', kind: 'history', status: 'published', sourceIds: ['VM-ARCH', 'TT-VANMIEU'], text: 'The main gate, inscribed “Văn Miếu Môn”, has two storeys, three openings and eight roofs, with Lê-period stone dragons in front and Nguyễn-period dragons inside. Next comes Đại Trung gate, decorated with carp that stand for students striving to succeed, flanked by Thành Đức (virtue) and Đạt Tài (talent).' },
  { id: 'C-VM-KHUEVAN', kind: 'history', status: 'published', sourceIds: ['VM-ARCH', 'TT-VANMIEU', 'TT-KHUEVAN'], text: 'Khuê Văn Các was built in 1805, commissioned by the Nguyễn governor Nguyễn Văn Thành: brick pillars below, a wooden pavilion above with round windows whose spokes evoke the rays of the Khuê star, the constellation of literature. Since the 2012 Capital Law it has been the symbol of Hà Nội.' },
  { id: 'C-VM-WELL', kind: 'history', status: 'published', sourceIds: ['TT-VANMIEU', 'UNESCO-STELAE-N'], text: 'The square pond Thiên Quang Tỉnh, the Well of Heavenly Clarity, lies in the third courtyard between the rows of stelae.' },
  { id: 'C-VM-DAITHANH', kind: 'history', status: 'published', sourceIds: ['VM-ARCH', 'TT-VANMIEU'], text: 'Through Đại Thành gate is a courtyard whose side halls once held tablets for Confucius’s 72 leading disciples. At its end stands the nine-bay Bái Đường hall on 40 ironwood columns, with the panel “Vạn thế sư biểu”, “teacher of ten thousand generations”; a bronze bell cast in 1768 and a stone chime hang there.' },
  { id: 'C-VM-THAIHOC', kind: 'history', status: 'published', sourceIds: ['VM-ARCH', 'VNP-THAIHOC', 'VM-HISTORY'], text: 'After the academy moved to Huế, its site became Khải Thánh temple, which was burnt in 1946. Thái Học house was built there in 1999–2000; it honours Chu Văn An downstairs and kings Lý Thánh Tông, Lý Nhân Tông and Lê Thánh Tông upstairs.' },
  { id: 'C-VM-STATUS', kind: 'history', status: 'published', sourceIds: ['VM-HISTORY', 'VNE-BVQG2015'], text: 'Văn Miếu became a national relic in 1962 and a special national relic in 2012; the 82 stelae were named a national treasure in 2015.' },
  { id: 'C-VM-VISIT', kind: 'siteRule', status: 'published', sourceIds: ['VM-VISIT', 'VM-NIGHT'], text: 'The site opens daily from 8 a.m. to 5 p.m. A ticket costs 70,000 đồng, 35,000 đồng for students in Vietnam and people over 60, and under-16s go free. A night tour with light shows runs on Wednesday, Saturday and Sunday evenings, from 299,000 đồng.' },
  { id: 'C-VM-VISITORS', kind: 'custom', status: 'published', sourceIds: ['BBVPL-VM2025', 'VNP-VM950'], text: 'The site counted about 1.7 million visits in 2025; 2026 marks 950 years since Quốc Tử Giám was founded.' },
  { id: 'C-VM-XINCHU', kind: 'custom', status: 'published', sourceIds: ['VNS-XINCHU'], text: 'Every spring, around Tết, calligraphers set up by Văn Lake to write characters for visitors’ wishes for learning, good character and luck; in 2026 the festival ran from 11 February to 1 March with 35 calligraphers.' },
  { id: 'C-VM-LUCK', kind: 'custom', status: 'published', sourceIds: ['TP-RUA2012'], text: 'Students visit before their exams to pray for luck.' },
  /* stelae */
  { id: 'C-STELAE-FACTS', kind: 'history', status: 'published', sourceIds: ['UNESCO-STELAE-N', 'UNESCO-STELAE-R', 'TT-MOW2010', 'VGP-MOW2011'], text: '82 stone stelae survive. Erected between 1484 and 1780, they record the doctoral laureates of 82 examinations held from 1442 to 1779, and were added to UNESCO’s Memory of the World register for Asia and the Pacific on 9 March 2010 and to the international register on 26 May 2011.' },
  { id: 'C-STELAE-FIRST', kind: 'history', status: 'published', sourceIds: ['UNESCO-STELAE-N', 'ND-BIA'], text: 'King Lê Thánh Tông ordered the first stele in 1484, for the examination of 1442, held 42 years earlier. Its text, by Thân Nhân Trung, contains the line “hiền tài là nguyên khí quốc gia”: talented people are the vital force of the nation.' },
  { id: 'C-STELAE-BATCHES', kind: 'history', status: 'published', sourceIds: ['UNESCO-STELAE-N'], text: 'The stelae went up in batches: the first under Lê Thánh Tông, then 25 in 1653, 21 in 1717 and 22 between 1721 and 1780.' },
  { id: 'C-STELAE-NAMES', kind: 'history', status: 'published', sourceIds: ['UNESCO-STELAE-N'], text: 'Together the stelae record 1,304 doctoral laureates, with their home villages and positions; one source counts 1,307 entries.' },
  { id: 'C-STELAE-SIZE', kind: 'history', status: 'published', sourceIds: ['UNESCO-STELAE-N'], text: 'Each stele stands on a stone turtle; the tallest is 2.07 m high and the smallest 1.1 m.' },
  { id: 'C-STELAE-TURTLE', kind: 'belief', status: 'published', sourceIds: ['TT-RUA'], text: 'The folklorist Ngô Đức Thịnh explains the turtle under a doctoral stele as a sign that the laureates’ names will be kept from generation to generation, for ever.' },
  { id: 'C-STELAE-1840', kind: 'history', status: 'published', sourceIds: ['TT-DUCBO'], text: 'After an order of 1840 under the Nguyễn, lines praising the Trịnh lords were chiselled off some stelae.' },
  { id: 'C-STELAE-FENCE', kind: 'siteRule', status: 'published', sourceIds: ['UNESCO-STELAE-N', 'TP-RUA2012', 'BPL-RUA2014', 'VMQTG-RULES'], text: 'Rubbing the stelae and the turtles’ heads for luck wore them down. By 2012 the rows were roped off and guarded by volunteers, and in 2014 a steel fence went up; today visitors may not touch, write or draw on them.' },
  { id: 'C-EXAMS', kind: 'history', status: 'published', sourceIds: ['BPL-THICU', 'UNESCO-STELAE-N'], text: 'Scholars passed three levels of examination: the regional thi Hương, the metropolitan thi Hội and the palace thi Đình, held before the king. From 1434 exams were held every three years, and from 1442 those who passed the highest were titled tiến sĩ, doctor.' },
  { id: 'C-EXAMS-1919', kind: 'history', status: 'published', sourceIds: ['TT-1919', 'UNESCO-STELAE-N'], text: 'The last palace examination was held in Huế on 16 May 1919. King Khải Định declared that the road of examinations ended there.' },
  { id: 'C-VM-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: go when the gates open at eight. By mid-morning school groups and graduation photo shoots fill the courtyards.' }
];

const glossary = [
  { id: 'tien-si', vi: 'tiến sĩ', say: 'tee-en see', en: 'Doctor: the title of a scholar who passed the highest royal examination.' },
  { id: 'khue', vi: 'Khuê', say: 'kway', en: 'The constellation of literature in Chinese and Vietnamese astronomy, which gives Khuê Văn Các its name.' }
];

const uni = {
  id: 'st-van-mieu-university',
  layout: 'longform',
  title: 'Vietnam’s first university',
  dek: 'A temple to Confucius from 1070, and the royal academy that grew up beside it. Five courtyards, walked from the street gate to the school at the back.',
  place: 'Văn Miếu – Quốc Tử Giám, Hà Nội',
  imageId: 'vm-khuevan',
  hero: { image: 'vm-khuevan' },
  appliesTo: 'Văn Miếu – Quốc Tử Giám in Hà Nội, from the site’s official pages, UNESCO and Vietnamese press. Prices and hours from November 2026.',
  varies: 'Specific to this site. Hours and ticket prices change; check the official site before you go.',
  sections: [
    { text: 'Văn Miếu was built in 1070; in 1076 Quốc Tử Giám, the royal academy, was founded beside it.', claimIds: ['C-VM-FOUNDED'] },
    { heading: 'Seven centuries of teaching', text: 'The academy taught for more than 700 years, until 1802.', claimIds: ['C-VM-ACADEMY'] },
    { heading: 'Five courtyards', text: 'The walled site is divided into five courtyards along one axis.', claimIds: ['C-VM-LAYOUT'] },
    { editorial: true, text: 'Calling it a “university” is a modern shorthand: it trained scholars for the royal examinations in the Confucian classics.', claimIds: [] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Behind a long wall on a busy street west of the Old Quarter is the quietest place in central Hà Nội. In 1070 King Lý Thánh Tông built Văn Miếu, a temple to Confucius. Six years later his successor, Lý Nhân Tông, founded Quốc Tử Giám beside it, a royal academy that taught for more than seven centuries. Vietnamese call it the country’s first university.', claimIds: ['C-VM-FOUNDED', 'C-VM-ACADEMY'] },
      { text: 'That is a modern shorthand. Quốc Tử Giám did not teach medicine or law; it trained young men in the Confucian classics for the royal examinations that chose the country’s officials. At first its students were the sons of the royal family, nobles and mandarins; from 1253, under the Trần, commoners of ability were admitted too. In 2026 the site marks 950 years since the academy opened.', claimIds: ['C-VM-FOUNDED', 'C-VM-VISITORS'] }
    ] },
    { type: 'facts', title: 'Văn Miếu in brief', items: [
      { term: 'Built', text: 'Temple 1070, academy 1076.' },
      { term: 'Taught', text: 'Until 1802, when the academy moved to Huế.' },
      { term: 'Site', text: '54,331 m², five courtyards.' },
      { term: 'Open', text: 'Daily 8 a.m.–5 p.m.; 70,000 đồng.' }
    ], claimIds: ['C-VM-FOUNDED', 'C-VM-ACADEMY', 'C-VM-LAYOUT', 'C-VM-VISIT'] },

    { type: 'text', heading: 'An academy for the examinations', id: 'academy', paras: [
      { text: 'The first Confucian examination was held in 1075, a year before the academy itself. Over the next centuries the exams became the road into government. A scholar passed the regional exam, *thi Hương*, then the metropolitan exam, *thi Hội*, in the capital, and finally the palace exam, *thi Đình*, in front of the king. From 1434 they were held every three years. Those who passed the highest were called [[tien-si|tiến sĩ]], doctors.', claimIds: ['C-VM-EXAM1075', 'C-EXAMS'] },
      { text: 'Quốc Tử Giám was where many of them studied. Its most famous teacher was Chu Văn An, deputy head under the Trần in the fourteenth century, still honoured as a model of learning and integrity. King Lê Thánh Tông enlarged the school in 1483. When the Nguyễn dynasty made Huế its capital, it moved the academy there in 1802, and the Hà Nội site became a provincial school.', claimIds: ['C-VM-ACADEMY', 'C-VM-THAIHOC'] }
    ] },

    { type: 'steps', heading: 'Walking the five courtyards', id: 'walk', items: [
      { title: 'The street gate', paras: [
        { text: 'You enter through Văn Miếu Môn, a gate of two storeys, three openings and eight roofs. Look at the stone dragons: the pair in front are Lê-period, the pair inside Nguyễn.', claimIds: ['C-VM-GATE'] }
      ] },
      { title: 'Đại Trung gate', paras: [
        { text: 'The second gate is decorated with carp, a symbol of students striving to succeed. Two small side gates are named for what a scholar needed: Thành Đức, virtue, and Đạt Tài, talent.', claimIds: ['C-VM-GATE'] }
      ] },
      { title: 'Khuê Văn Các', paras: [
        { text: 'The second courtyard ends at Khuê Văn Các, built in 1805: brick pillars below, a small wooden pavilion above. Its round windows have spokes like rays of light, for the [[khue|Khuê]] star, the constellation of literature. In 2012 the National Assembly made it the symbol of Hà Nội.', claimIds: ['C-VM-KHUEVAN'] }
      ], image: 'vm-khuevan', caption: 'Khuê Văn Các, the Pavilion of the Constellation of Literature.' },
      { title: 'The Well of Heavenly Clarity', paras: [
        { text: 'In the third courtyard a square pond, Thiên Quang Tỉnh, lies between two rows of stone turtles carrying stelae: the records of the royal examinations. Our story on [the stelae](story:st-stelae) tells their history.', claimIds: ['C-VM-WELL', 'C-STELAE-FACTS'] }
      ], image: 'vm-well', caption: 'The pond of the third courtyard, with Khuê Văn Các behind.' },
      { title: 'The temple', paras: [
        { text: 'Through Đại Thành gate is the temple itself. The side halls once held tablets for Confucius’s 72 leading disciples. At the end stands the Bái Đường, a nine-bay hall on 40 ironwood columns, under a panel that calls Confucius *vạn thế sư biểu*, teacher of ten thousand generations. A bronze bell cast in 1768 hangs on one side.', claimIds: ['C-VM-DAITHANH'] }
      ], image: 'vm-hall', caption: 'Inside the hall: red columns and bronze cranes on turtles.' },
      { title: 'Thái Học, the school', paras: [
        { text: 'The fifth courtyard is where the academy stood. After it moved to Huế the site became a temple to Confucius’s parents, burnt in 1946. Thái Học house was rebuilt there in 1999–2000. Downstairs it honours Chu Văn An; upstairs, the three kings who built and grew the school.', claimIds: ['C-VM-THAIHOC'] }
      ] }
    ] },

    { type: 'text', heading: 'After the exams ended', id: 'after', paras: [
      { text: 'The examinations that gave the place its purpose outlived the academy by more than a century. The last palace examination was held in Huế on 16 May 1919, and King Khải Định declared that the road of examinations ended there. Văn Miếu kept its temple and its stelae, but nothing more was added to them.', claimIds: ['C-EXAMS-1919', 'C-STELAE-FACTS'] },
      { text: 'In the twentieth century the state took over its protection. The site was listed as a national relic in 1962 and as a special national relic in 2012, and its 82 stelae were named a national treasure in 2015. In 2026 it marks 950 years since Quốc Tử Giám was founded, and 2025 was a record year, with about 1.7 million visits. For the royal city it belonged to, see [Thăng Long, a capital since 1010](story:st-thang-long).', claimIds: ['C-VM-STATUS', 'C-VM-VISITORS'] }
    ] },

    { type: 'text', heading: 'Exams, luck and calligraphy', id: 'today', paras: [
      { text: 'The temple has never stopped being about exams. Students come before their university entrance exams to pray for luck. For years visitors rubbed the stone turtles’ heads for luck, until the wear forced the site to fence them off.', claimIds: ['C-VM-LUCK', 'C-STELAE-FENCE'] },
      { text: 'Around Tết, calligraphers set up their tables by Văn Lake and write characters on red paper for visitors’ wishes: learning, good character, luck. In 2026 the spring festival ran for almost three weeks with 35 calligraphers.', claimIds: ['C-VM-XINCHU'] }
    ] },
    { type: 'quote', text: 'Talented people are the vital force of the nation.', by: 'From the stele of the 1442 examination, by Thân Nhân Trung (hiền tài là nguyên khí quốc gia)', claimIds: ['C-STELAE-FIRST'] },

    { type: 'text', heading: 'Visiting', id: 'visit', paras: [
      { text: 'The site opens every day from 8 a.m. to 5 p.m. A ticket is 70,000 đồng, half price for students in Vietnam and people over 60, and free for under-16s. On Wednesday, Saturday and Sunday evenings a night tour with light shows tells the story of the academy and the stelae.', claimIds: ['C-VM-VISIT'] },
      { text: 'Dress respectfully for the temple halls, keep your voice down, and do not touch the stelae or the turtles. The site counted about 1.7 million visits in 2025, so go early.', claimIds: ['C-VM-DRESS', 'C-VM-QUIET', 'C-VM-NOTOUCH', 'C-VM-VISITORS', 'C-VM-TIP'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Built', text: '1070 (temple), 1076 (academy).' },
      { term: 'Walk', text: 'Five courtyards, gate to school.' },
      { term: 'Symbol', text: 'Khuê Văn Các, symbol of the capital.' },
      { term: 'Rules', text: 'Dress modestly, keep quiet, don’t touch.' }
    ] },
    { type: 'quiz', image: 'vm-khuevan', question: 'Why “first university”?', prompt: 'Quốc Tử Giám is often called Vietnam’s first university. What did it actually teach?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Medicine, law and astronomy', feedback: 'Not as subjects of their own. It was a school of Confucian learning.' },
      { label: 'The Confucian classics, for the royal examinations', fit: true, feedback: 'Yes. It prepared scholars for the exams that chose the country’s officials.' },
      { label: 'Only religious ritual for monks', feedback: 'It was a Confucian school, not a Buddhist one, and its students went into government.' }
    ] }
  ]
};

const stelae = {
  id: 'st-stelae',
  layout: 'timeline',
  title: 'The stelae of doctoral laureates',
  dek: 'Eighty-two stones on the backs of stone turtles, carved with the names of 1,304 scholars. Three centuries of royal examinations, and why you may no longer touch them.',
  place: 'Văn Miếu – Quốc Tử Giám, Hà Nội',
  imageId: 'img-stelae',
  hero: { image: 'img-stelae' },
  appliesTo: 'The doctoral stelae at Văn Miếu – Quốc Tử Giám, from UNESCO’s Memory of the World record, the site’s official pages and Vietnamese press.',
  varies: 'Specific to this site. Sources differ slightly on the number of names (1,304 or 1,307).',
  sections: [
    { text: 'The stelae record the names of people who passed the highest royal examinations: 82 stelae for exams held from 1442 to 1779.', claimIds: ['C-STELAE-FACTS'] },
    { heading: 'On UNESCO’s registers', text: 'They were added to UNESCO’s Memory of the World registers in 2010 and 2011.', claimIds: ['C-STELAE-FACTS'] },
    { heading: 'Looking, not touching', text: 'The site asks visitors not to touch, write on or draw on the stelae.', claimIds: ['C-VM-NOTOUCH'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'In the third courtyard of Văn Miếu, on either side of a square pond, stand two rows of stone turtles. Each carries a stone slab on its back, and each slab is carved with the names of the men who passed one royal examination: when it was held, who set it, who came first, and where each laureate came from. There are 82 of them, for exams held between 1442 and 1779, and together they name 1,304 doctors.', claimIds: ['C-STELAE-FACTS', 'C-STELAE-NAMES', 'C-VM-WELL'] },
      { text: 'They are the closest thing Vietnam has to a stone archive of its scholars. UNESCO added them to its Memory of the World register in 2011, and Vietnam made them a national treasure in 2015.', claimIds: ['C-STELAE-FACTS', 'C-VM-STATUS'] }
    ] },
    { type: 'facts', title: 'The stelae in brief', items: [
      { term: 'How many', text: '82 stelae, 82 examinations.' },
      { term: 'Exams', text: '1442 to 1779.' },
      { term: 'Names', text: '1,304 doctoral laureates.' },
      { term: 'Tallest', text: '2.07 m, on a stone turtle.' }
    ], claimIds: ['C-STELAE-FACTS', 'C-STELAE-NAMES', 'C-STELAE-SIZE'] },

    { type: 'text', heading: 'The examinations they record', id: 'exams', paras: [
      { text: 'To earn a place on a stele, a scholar had to pass three examinations: the regional *thi Hương*, the metropolitan *thi Hội* in the capital, and the palace *thi Đình*, where candidates knelt in the courtyard before the king to receive the question. From 1434 the exams were held every three years, and from 1442 those who passed the last stage were titled [[tien-si|tiến sĩ]].', claimIds: ['C-EXAMS'] },
      { text: 'The stelae begin with that year. In 1484 King Lê Thánh Tông ordered a stele for the examination of 1442, held 42 years before. Its text, written by the scholar Thân Nhân Trung, contains a famous line: *hiền tài là nguyên khí quốc gia*, talented people are the vital force of the nation.', claimIds: ['C-STELAE-FIRST'] }
    ] },
    { type: 'quote', text: 'Talented people are the vital force of the nation.', by: 'Thân Nhân Trung, on the stele of the 1442 examination', claimIds: ['C-STELAE-FIRST'] },

    { type: 'timeline', heading: 'Three centuries in stone', label: 'Timeline of the doctoral stelae', items: [
      { era: 'The examinations' },
      { year: '1075', title: 'The first exam', text: 'The first Confucian examination is held under the Lý, a year before the academy opens.', claimIds: ['C-VM-EXAM1075'] },
      { year: '1434', title: 'Every three years', text: 'Under the Lê, examinations are set every three years.', claimIds: ['C-EXAMS'] },
      { year: '1442', title: 'The first doctors on stone', text: 'The examination that the first stele will record. From now on, laureates are titled tiến sĩ.', claimIds: ['C-EXAMS', 'C-STELAE-FIRST'] },
      { era: 'The stelae go up' },
      { year: '1484', title: 'Lê Thánh Tông’s order', text: 'The king orders stelae to honour the laureates, starting with 1442.', claimIds: ['C-STELAE-FIRST'], image: 'img-stelae', caption: 'Stelae on their stone turtles.' },
      { year: '1653', title: '25 more', text: 'A large batch is added under the restored Lê.', claimIds: ['C-STELAE-BATCHES'] },
      { year: '1717', title: '21 more', text: 'Another batch fills the gaps of the previous decades.', claimIds: ['C-STELAE-BATCHES'] },
      { year: '1780', title: 'The last stele', text: 'The last of 22 stelae set up since 1721, for the exam of 1779.', claimIds: ['C-STELAE-BATCHES', 'C-STELAE-FACTS'] },
      { era: 'After' },
      { year: '1840', title: 'Lines chiselled off', text: 'Under the Nguyễn, praise for the old Trịnh lords is cut from some stelae.', claimIds: ['C-STELAE-1840'] },
      { year: '1919', title: 'The last examination', text: 'The last palace exam is held in Huế. “The road of examinations ends here.”', claimIds: ['C-EXAMS-1919'] },
      { era: 'Protected' },
      { year: '2010–11', title: 'Memory of the World', text: 'UNESCO’s Asia-Pacific register (9 March 2010), then the international register (26 May 2011).', claimIds: ['C-STELAE-FACTS'] },
      { year: '2014', title: 'A fence', text: 'After years of rubbing for luck, a steel fence replaces the ropes.', claimIds: ['C-STELAE-FENCE'], image: 'vm-stelae-row', caption: 'A row of stelae behind the fence.' },
      { year: '2015', title: 'National treasure', text: 'The 82 stelae are named a national treasure.', claimIds: ['C-VM-STATUS'] }
    ] },

    { type: 'text', heading: 'Why turtles?', id: 'turtles', paras: [
      { text: 'Each stele stands on a stone turtle, the tallest more than two metres high. UNESCO’s record describes the turtles but does not explain them. The folklorist Ngô Đức Thịnh does: the turtle lives long and is the very picture of endurance, so a stele on its back means the laureates’ names will be kept from generation to generation, for ever.', claimIds: ['C-STELAE-SIZE', 'C-STELAE-TURTLE'] },
      { text: 'Turtles appear elsewhere in Hà Nội’s stories too, above all in the legend of [the returned sword](story:st-sword-lake) at Hoàn Kiếm Lake.', claimIds: ['C-SWORD-LEGEND'] }
    ] },

    { type: 'text', heading: 'Rubbing for luck, and the fence', id: 'fence', paras: [
      { text: 'For generations students rubbed the turtles’ heads before their exams, hoping some of the laureates’ luck would pass to them. By 2010 UNESCO’s nomination noted that touching and rubbing was wearing the stones down. In 2012 the rows were roped off and student volunteers stood guard in exam season; in 2014 a steel fence went up.', claimIds: ['C-STELAE-FENCE', 'C-VM-LUCK'] },
      { text: 'The rule today is simple: look, do not touch. The site’s rules forbid touching, writing or drawing on the stelae and buildings.', claimIds: ['C-VM-NOTOUCH'] }
    ] },
    { type: 'text', heading: 'Struck out and spared', id: 'politics', paras: [
      { text: 'The stones also record politics. Some of their texts praised the Trịnh lords, and later rulers did not want that remembered: after an order of 1840 under the Nguyễn, those lines were chiselled off some of the stelae.', claimIds: ['C-STELAE-1840'] },
      { text: 'Nor did the stones go up as the exams were held. They came in batches: the first under Lê Thánh Tông, then 25 in 1653, 21 in 1717 and 22 between 1721 and 1780, often recording examinations held many years earlier, just as the first stele did for 1442.', claimIds: ['C-STELAE-BATCHES', 'C-STELAE-FIRST'] },
      { text: 'What survived is still remarkable: 82 stones covering 82 examinations over more than three centuries, with each laureate’s name, home village and position. UNESCO added them to its Memory of the World register for Asia and the Pacific in 2010, and to the international register in 2011.', claimIds: ['C-STELAE-FACTS', 'C-STELAE-NAMES'] }
    ] },

    { type: 'note', text: 'Sources differ on the number of names: UNESCO and most Vietnamese reports give 1,304, one newspaper 1,307 entries. We use UNESCO’s figure.', claimIds: ['C-STELAE-NAMES'] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Reading the stelae from the path.', claimIds: ['C-VM-NOTOUCH'] },
      { text: 'Keeping your voice down.', claimIds: ['C-VM-QUIET'] },
      { text: 'Coming early, before the crowds.', claimIds: ['C-VM-TIP'] }
    ] }, think: { title: 'Not allowed', items: [
      { text: 'Rubbing a turtle’s head for luck.', claimIds: ['C-STELAE-FENCE'] },
      { text: 'Touching, writing or drawing on a stele.', claimIds: ['C-VM-NOTOUCH'] },
      { text: 'Climbing the fence for a photo.', claimIds: ['C-STELAE-FENCE'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Stelae', text: '82, on stone turtles.' },
      { term: 'Exams', text: '1442–1779.' },
      { term: 'Names', text: '1,304 doctors.' },
      { term: 'Rule', text: 'Look, don’t touch.' }
    ] },
    { type: 'quiz', image: 'img-stelae', question: 'The turtle’s head', prompt: 'A friend with an exam next week wants to rub a turtle’s head for luck. What do you tell them?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Go ahead, everyone does', feedback: 'They used to, and it wore the stones down. Since 2014 the stelae are fenced off.' },
      { label: 'It is not allowed now; pray or ask for a calligraphy character instead', fit: true, feedback: 'Yes. Students still come for luck, but the stelae are looked at, not touched.' },
      { label: 'Only on the first day of Tết', feedback: 'There is no exception: the rule applies every day.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [uni, stelae] };
