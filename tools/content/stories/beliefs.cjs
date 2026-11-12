/* Stories: sacred places (st-sacred-places, compare), visiting a temple (st-temple-visit, guide),
   the family altar (st-family-altar, longform) and the Mother Goddesses (st-mother-goddess, longform).
   Researched 12 Nov 2026. Founding legends are told as legends; where sources disagree (statue sizes,
   relic counts, the dates of the ban on mediumship) the stories say so. */
const today = '2026-11-12';

const sources = [
  { id: 'VT-TEMPLES', used: 'The kinds of sacred place: chùa (Buddhist, often with resident monks or nuns), đền (heroes, deities or local spirits), đình (the village guardian spirit), miếu (small shrines without clergy) and phủ (the Mother Goddesses), with Trấn Quốc and Phủ Tây Hồ as examples.',
    limits: 'A private travel website, not the national tourism authority despite its name. We use only its general definitions, which match the other sources, not its examples of đền.' },
  { id: 'BPL-TRANQUOC', short: 'Báo Pháp Luật', title: 'Chùa Trấn Quốc: Linh thiêng cổ tự nghìn tuổi bên Hồ Tây — Báo Pháp luật Việt Nam', org: 'Báo Pháp luật Việt Nam, by Quốc Cường and Quang Thuận', url: 'https://baophapluat.vn/chua-tran-quoc-linh-thieng-co-tu-nghin-tuoi-ben-ho-tay-post237995.html', type: 'press', checked: today,
    used: 'Trấn Quốc founded, by tradition, under Lý Nam Đế in the sixth century and first named Khai Quốc; a cutting of the bodhi tree brought by the president of India in 1959; an eleven-storey stupa of about 15 m built in 1998; listed as a national relic in 1962.',
    limits: 'A feature (January 2017); the founding date is tradition.' },
  { id: 'VNN-TRANQUOC', short: 'VietNamNet', title: 'National historical and cultural relic Tran Quoc ancient pagoda — VietNamNet', org: 'VietNamNet, with photos from VNA', url: 'https://vietnamnet.vn/en/national-historical-and-cultural-relic-tran-quoc-ancient-pagoda-2017040.html', type: 'press', checked: today,
    used: 'Trấn Quốc dating from the sixth century, a national relic since 1962, with its eleven-storey Lục Độ Đài Sen stupa.',
    limits: 'A photo feature (May 2022).' },
  { id: 'VOV-MOTCOT', short: 'VOV', title: 'Chùa Một Cột được xác lập kỷ lục châu Á — VOV', org: 'Voice of Vietnam', url: 'https://vov.vn/van-hoa-giai-tri/chua-mot-cot-duoc-xac-lap-ky-luc-chau-a-228677.vov', type: 'press', checked: today,
    used: 'The One Pillar pagoda, Diên Hựu, built in 1049 under Lý Thái Tông according to the chronicle; the legend of the king’s dream of Quan Âm on a lotus; blown up by French forces in 1954 and rebuilt in 1955; a national relic since 1962.',
    limits: 'A news report (October 2012).' },
  { id: 'ANTD-TUTRAN', short: 'An ninh Thủ đô', title: 'Thăng Long tứ trấn được xếp hạng Di tích quốc gia đặc biệt — An ninh Thủ đô', org: 'An ninh Thủ đô, by Hương Thủy', url: 'https://anninhthudo.vn/thang-long-tu-tran-duoc-xep-hang-di-tich-quoc-gia-dac-biet-post493358.antd', type: 'press', checked: today,
    used: 'The four guardian temples of Thăng Long (Bạch Mã, Voi Phục, Quán Thánh and Kim Liên) made a special national relic by a decision of 18 January 2022.',
    limits: 'A news report (January 2022).' },
  { id: 'LSVN-TUTRAN', short: 'Luật sư Việt Nam', title: 'Thăng Long tứ trấn: những điều chưa biết — Luật sư Việt Nam', org: 'Luật sư Việt Nam, by Phương Hạnh', url: 'https://lsvn.vn/thang-long-tu-tran-nhung-dieu-chua-biet-a23770.html', type: 'press', checked: today,
    used: 'The directions and gods of the four guardian temples: Quán Thánh (north, Huyền Thiên Trấn Vũ), Bạch Mã (east, Long Đỗ), Kim Liên (south, Cao Sơn) and Voi Phục (west, Linh Lang); legends that clash with recorded dates; differing figures for the Quán Thánh statue.',
    limits: 'A feature (January 2021) in a lawyers’ association journal.' },
  { id: 'TT-QUANTHANH', short: 'Tuổi Trẻ', title: 'Bí ẩn người làm bảo vật quốc gia — Kỳ 1: Vị “công công” làm hai bảo vật — Tuổi Trẻ', org: 'Tuổi Trẻ, by Thái Lộc', url: 'https://tuoitre.vn/bi-an-nguoi-lam-bao-vat-quoc-gia-ky-1-vi-cong-cong-lam-hai-bao-vat-20230520101530713.htm', type: 'press', checked: today,
    used: 'The black bronze statue of Trấn Vũ at Quán Thánh, cast in 1677 to replace a wooden one, now a national treasure.',
    limits: 'A feature (May 2023).' },
  { id: 'ND-BACHMA', short: 'Nhân Dân', title: '“Đệ nhất” Tứ trấn Thăng Long — Nhân Dân', org: 'Nhân Dân', url: 'https://nhandan.vn/ocop/de-nhat-tu-tran-thang-long-post701573.html', type: 'press', checked: today,
    used: 'Bạch Mã temple on Hàng Buồm, the oldest of the four; the legend of the god Long Đỗ appearing as a white horse whose tracks showed where to build the citadel walls; its stelae and royal decrees.',
    limits: 'A feature (June 2022).' },
  { id: 'DBND-HUONG2026', short: 'Đại biểu Nhân dân', title: 'Khai hội chùa Hương xuân Bính Ngọ 2026 — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Hương Sen', url: 'https://daibieunhandan.vn/khai-hoi-chua-huong-xuan-binh-ngo-2026-10407313.html', type: 'press', checked: today,
    used: 'The Hương pagoda festival of 2026, from 18 February to 11 May, opened on 22 February; about 20 temples and pagodas on four routes; 135,900 visitors in the first five days of Tết; motorboats not allowed on the stream that year.',
    limits: 'A news report (February 2026).' },
  { id: 'QLNN-RELICS', short: 'Tạp chí Quản lý Nhà nước', title: 'Bảo tồn và phát huy giá trị di tích quốc gia đặc biệt trên địa bàn thành phố Hà Nội — Tạp chí Quản lý Nhà nước', org: 'Tạp chí Quản lý Nhà nước (National Academy of Public Administration), by Đào Ngọc Thủy', url: 'https://www.quanlynhanuoc.vn/2024/11/14/bao-ton-va-phat-huy-gia-tri-di-tich-quoc-gia-dac-biet-tren-dia-ban-thanh-pho-ha-noi/', type: 'academic', checked: today,
    used: 'Hà Nội’s 5,922 recorded relics: one World Heritage Site, 21 special national relics, 1,160 national and 1,456 city-level relics.',
    limits: 'A journal article (November 2024); a 2025 report gives slightly higher counts.' },
  { id: 'TCCT-RELICS', short: 'Tạp chí Công Thương', title: 'Hà Nội: Công bố Danh mục di tích, di sản cần được bảo vệ và phát huy giá trị — Tạp chí Công Thương', org: 'Tạp chí Công Thương, by Phan Nho', url: 'https://tapchicongthuong.vn/ha-noi--cong-bo-danh-muc-di-tich--di-san-can-duoc-bao-ve-va-phat-huy-gia-tri-140406.htm', type: 'press', checked: today,
    used: '22 special national relics, 1,164 national and about 1,600 city-level relics in Hà Nội in 2025.',
    limits: 'A news report (May 2025).' },
  { id: 'BPL-HUONG', short: 'Báo Pháp Luật', title: 'Lí giải tục thắp hương cầu cúng — Báo Pháp luật Việt Nam', org: 'Báo Pháp luật Việt Nam, by Hữu Sơn', url: 'https://baophapluat.vn/li-giai-tuc-thap-huong-cau-cung-post222522.html', type: 'press', checked: today,
    used: 'A scholar explaining the custom of lighting odd numbers of incense sticks, usually three or one; the abbot of the One Pillar pagoda saying one, two or three are all fine and that pagodas set no rule.',
    limits: 'A feature (July 2016).' },
  { id: 'TT-TET2025', short: 'Tuổi Trẻ', title: 'Nườm nượp đi lễ Phủ Tây Hồ, chùa Trấn Quốc, mâm lễ không còn vàng mã — Tuổi Trẻ', org: 'Tuổi Trẻ, by Dương Liễu', url: 'https://tuoitre.vn/nuom-nuop-di-le-phu-tay-ho-chua-tran-quoc-mam-le-khong-con-vang-ma-20250129110858693.htm', type: 'press', checked: today,
    used: 'Offerings at Phủ Tây Hồ and Trấn Quốc on the first day of Tết 2025: no votive paper and no meat, only fruit and sweets; at Phủ Tây Hồ visitors made offerings from the courtyard.',
    limits: 'A news report (January 2025).' },
  { id: 'VNE-TIENLE', short: 'VnExpress', title: 'Tiền lẻ găm đầy di tích — VnExpress', org: 'VnExpress', url: 'https://vnexpress.net/tien-le-gam-day-di-tich-3152123.html', type: 'press', checked: today,
    used: 'Small notes tucked into statues and piled at their feet at Hà Nội sites in 2015, and a ministry instruction that fee-charging money-changing inside relic sites be stopped.',
    limits: 'A news report (March 2015).' },
  { id: 'LAW-110-ART7', short: 'Decree 110/2018/NĐ-CP', title: 'Điều 7, Nghị định 110/2018/NĐ-CP quy định về quản lý và tổ chức lễ hội', org: 'Government of Vietnam (text read on hethongphapluat.com)', url: 'https://hethongphapluat.com/nghi-dinh-110-2018-nd-cp-ve-quan-ly-va-to-chuc-le-hoi/dieu-7', type: 'law', checked: today,
    used: 'Festival organisers’ duty to guide people to place offerings of money only in the places set aside.',
    limits: 'The decree (2018), read in a legal database rather than the official gazette.' },
  { id: 'VNP-ALTAR', short: 'VietnamPlus', title: 'Ý nghĩa thiêng liêng của bàn thờ gia tiên trong gia đình người Việt — VietnamPlus', org: 'VietnamPlus (Vietnam News Agency)', url: 'https://www.vietnamplus.vn/y-nghia-thieng-lieng-cua-ban-tho-gia-tien-trong-gia-dinh-nguoi-viet-post868894.vnp', type: 'press', checked: today,
    used: 'The family altar set in the most central and highest place in the house; attended on death anniversaries and the 1st and 15th of the lunar month; the incense urn and candlesticks cleaned before Tết; the five-fruit tray, flowers, bánh chưng, betel and a cup of water at Tết.',
    limits: 'A feature (January 2023).' },
  { id: 'DT-ALTAR', short: 'Dân trí', title: 'Bàn thờ tổ tiên — đôi điều nhân nghĩa — Dân trí', org: 'Dân trí (forum section)', url: 'https://dantri.com.vn/dien-dan/ban-tho-to-tien-doi-dieu-nhan-nghia-20210213080519428.htm', type: 'press', checked: today,
    used: 'The altar once in the middle of the house and today often on the top floor; the old custom of placing a guest’s gift on the altar first.',
    limits: 'An opinion piece (February 2021).' },
  { id: 'BPL-TOTIEN', short: 'Báo Pháp Luật', title: 'Tục thờ cúng tổ tiên của người Việt — Báo Pháp luật Việt Nam', org: 'Báo Pháp luật Việt Nam, compiled by Hương Tú', url: 'https://baophapluat.vn/tuc-tho-cung-to-tien-cua-nguoi-viet-post86875.html', type: 'press', checked: today,
    used: 'The eldest son responsible for the ancestral rites, and after him the eldest grandson; descendants gathering at the eldest son’s house on a death anniversary.',
    limits: 'A compiled feature (February 2011) describing tradition.' },
  { id: 'CAFEF-THANTAI', short: 'CafeF', title: 'Tại sao bàn thờ Thần Tài, Ông Địa thường đặt sát mặt đất — CafeF', org: 'CafeF (from Phụ Nữ Mới), by Thư Hân', url: 'https://cafef.vn/tai-sao-ban-tho-than-tai-ong-dia-thuong-dat-sat-mat-dat-188261002111930303.chn', type: 'press', checked: today,
    used: 'The shop altar to Thần Tài and Ông Địa set low near the door, which a scholar says separates it from the high ancestral altar rather than ranking it lower; the 10th of the first lunar month as Thần Tài’s day.',
    limits: 'A feature (October 2026).' },
  { id: 'VNE-DOTHO', short: 'VnExpress', title: 'Tìm mua đồ thờ tại Hà Nội — VnExpress', org: 'VnExpress (from Sài Gòn Tiếp Thị)', url: 'https://vnexpress.net/tim-mua-do-tho-tai-ha-noi-2661634.html', type: 'press', checked: today,
    used: 'Altars sold on Hàng Quạt and bronze urns and altar sets on Hàng Đồng in the Old Quarter.',
    limits: 'A shopping feature (2001); its prices are long out of date.' },
  { id: 'PEW-2024', short: 'Pew Research Center', title: 'Religion and Spirituality in East Asian Societies — Pew Research Center', org: 'Pew Research Center', url: 'https://www.pewresearch.org/religion/2024/06/17/ancestor-veneration-funerals-and-afterlife-beliefs/', type: 'academic', checked: today,
    used: 'A 2023 survey in Vietnam: 48% with no religion and 38% Buddhist; 95% with a home altar, across Buddhists, Christians and the unaffiliated; 86% who had offered food or drink to ancestors in the past year; 96% who had burnt incense.',
    limits: 'A survey report (June 2024).' },
  { id: 'GSO-2019', short: 'General Statistics Office', title: 'Press release on results of the Population and Housing Census 01/4/2019 — General Statistics Office of Viet Nam', org: 'General Statistics Office of Viet Nam', url: 'https://www.nso.gov.vn/en/events/2019/12/press-release-on-results-of-the-population-and-housing-census-01-4-2019/', type: 'gov', checked: today,
    used: '13.2 million people, 13.7% of the population, identifying with a religion in the 2019 census.',
    limits: 'An official release (December 2019); other official counts differ.' },
  { id: 'UNESCO-MAU-DEC', short: 'UNESCO', title: 'Decision 11.COM 10.b.37 — UNESCO Intangible Cultural Heritage', org: 'UNESCO Intergovernmental Committee for the Safeguarding of the Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/Decisions/11.COM/10.b.37', type: 'official', checked: today,
    used: 'The practices transmitted since the sixteenth century, with no restrictions on who may take part; safeguarding aimed against over-commercialisation; on Vietnam’s national list since 2013.',
    limits: 'The official decision (2016).' },
  { id: 'ND-MAU2016', short: 'Nhân Dân', title: 'UNESCO công nhận thực hành tín ngưỡng thờ Mẫu của người Việt là Di sản văn hóa phi vật thể — Nhân Dân', org: 'Nhân Dân, by Tuyết Loan', url: 'https://nhandan.vn/unesco-cong-nhan-thuc-hanh-tin-nguong-tho-mau-cua-nguoi-viet-la-di-san-van-hoa-phi-vat-the-post279449.html', type: 'press', checked: today,
    used: 'The inscription on 1 December 2016 (Vietnam time) at the 11th session in Addis Ababa; Liễu Hạnh as a fairy who came down to earth and later turned to Buddhism, one of the Four Immortals; gods drawn from the Kinh, Mường, Tày, Nùng and Dao; chầu văn music, costume and dance; a revival from the early 1990s.',
    limits: 'A news report (December 2016).' },
  { id: 'VNS-HAUDONG', short: 'VietNamNet', title: 'The art of mediumship as performance — VietNamNet', org: 'VietNamNet (from Viet Nam News), by Minh Thu', url: 'https://vietnamnet.vn/en/the-art-of-mediumship-as-performance-E151741.html', type: 'press', checked: today,
    used: 'Mediumship rituals banned as superstition and made legal again in 1987; staged performances in Hà Nội; a scholar’s criticism of crowding and loud music.',
    limits: 'A feature (February 2016).' },
  { id: 'TTN-HAUDONG', short: 'Tuổi Trẻ News', title: 'The spiritual practice of “len dong” in Vietnamese folk religion — Tuổi Trẻ News', org: 'Tuổi Trẻ News', url: 'https://news.tuoitre.vn/news/audio/20161024/the-spiritual-practice-of-%E2%80%98len-dong%E2%80%99-in-vietnamese-folk-religion/21019.html', type: 'press', checked: today,
    used: 'Lên đồng once condemned as superstition and banned, the ban lifted in 1987; members of the audience approaching the medium with offerings or requests.',
    limits: 'A feature (October 2016).' },
  { id: 'ND-MAU2022', short: 'Nhân Dân', title: 'Ngăn chặn biến tướng, lệch lạc trong thờ Mẫu — Nhân Dân', org: 'Nhân Dân, by Hoa Lâm', url: 'https://nhandan.vn/ngan-chan-bien-tuong-lech-lac-trong-tho-mau-post715932.html', type: 'press', checked: today,
    used: 'Hà Nội’s nearly 600 đền, 5 phủ and 1,230 private shrines; a 2018 ministry instruction that hầu đồng be held only at Mother Goddess shrines and relic sites, not as tourist shows, and with fewer paper and costly offerings; an artisan on devotees ruined by spending.',
    limits: 'A feature (September 2022).' },
  { id: 'BVH-MAU2023', short: 'Báo Văn hóa', title: 'Chấn chỉnh hoạt động làm sai lệch di sản Thực hành tín ngưỡng thờ Mẫu — Báo Văn hóa', org: 'Báo Văn hóa (Ministry of Culture, Sports and Tourism), by Hà Phương', url: 'https://baovanhoa.vn/van-hoa/chan-chinh-hoat-dong-lam-sai-lech-di-san-thuc-hanh-tin-nguong-tho-mau-87496.html', type: 'press', checked: today,
    used: 'A ministry letter of July 2023 noting that distortions of the practice, such as staging hầu đồng outside its proper setting, were continuing and even increasing.',
    limits: 'A news report (August 2023).' }
];

const claims = [
  /* sacred places */
  { id: 'C-SACRED-TYPES', kind: 'custom', status: 'published', sourceIds: ['VT-TEMPLES', 'ND-BACHMA', 'ND-MAU2022'], text: 'A chùa is a Buddhist pagoda, often home to monks or nuns; a đền honours a national hero, a deity or a local spirit; a đình is a village communal house for the guardian spirit each village is thought to have; a miếu is a small shrine; a phủ honours the Mother Goddesses.' },
  { id: 'C-TRANQUOC', kind: 'history', status: 'published', sourceIds: ['BPL-TRANQUOC', 'VNN-TRANQUOC'], text: 'By tradition Trấn Quốc was founded in the sixth century, under Lý Nam Đế, as Khai Quốc. A cutting of the bodhi tree was brought by the president of India in 1959, an eleven-storey stupa about 15 m tall went up in 1998, and the pagoda has been a national relic since 1962.' },
  { id: 'C-MOTCOT', kind: 'history', status: 'published', sourceIds: ['VOV-MOTCOT'], text: 'The chronicle dates the One Pillar pagoda to 1049, under Lý Thái Tông; in legend the king dreamt of the bodhisattva Quan Âm on a lotus. French forces blew it up in 1954, and the present building dates from 1955. It has been a national relic since 1962.' },
  { id: 'C-MOTCOT-RECORD', kind: 'custom', status: 'published', sourceIds: ['VOV-MOTCOT', 'BPL-TRANQUOC'], text: 'Trấn Quốc and the One Pillar pagoda have both been national relics since 1962. In 2012 an Asian records organisation named the One Pillar pagoda the most unique architecture in Asia.' },
  { id: 'C-TUTRAN', kind: 'history', status: 'published', sourceIds: ['ANTD-TUTRAN', 'LSVN-TUTRAN'], text: 'Four temples guarded Thăng Long: Quán Thánh in the north (Trấn Vũ), Bạch Mã in the east (Long Đỗ), Kim Liên in the south (Cao Sơn) and Voi Phục in the west (Linh Lang). Together they became a special national relic in January 2022.' },
  { id: 'C-QUANTHANH', kind: 'history', status: 'published', sourceIds: ['TT-QUANTHANH', 'LSVN-TUTRAN'], text: 'The black bronze statue of Trấn Vũ at Quán Thánh was cast in 1677 to replace a wooden one and is a national treasure. Its recorded size differs between sources.' },
  { id: 'C-BACHMA', kind: 'legend', status: 'published', sourceIds: ['ND-BACHMA', 'LSVN-TUTRAN'], text: 'Bạch Mã temple, on Hàng Buồm, is the oldest of the four. In legend the god Long Đỗ appeared as a white horse whose tracks showed the king where to build the citadel walls; scholars note that the legends and the recorded dates do not always agree.' },
  { id: 'C-BACHMA-RECORDS', kind: 'history', status: 'published', sourceIds: ['ND-BACHMA'], text: 'Bạch Mã keeps 18 stone stelae and 17 royal decrees of the Nguyễn, and the temple has partly revived an old spring ritual.' },
  { id: 'C-HN-RELICS', kind: 'history', status: 'published', sourceIds: ['QLNN-RELICS', 'TCCT-RELICS'], text: 'Hà Nội has about 5,900 recorded relics; in 2024–25 about 21–22 were special national relics, about 1,160 national and between 1,450 and 1,600 city-level.' },
  { id: 'C-HUONG2026', kind: 'custom', status: 'published', sourceIds: ['DBND-HUONG2026'], text: 'The Hương pagoda festival of 2026 ran from 18 February to 11 May, with about 20 temples and pagodas on four routes; 135,900 people came in the first five days of Tết, and motorboats were not allowed on the stream.' },
  /* temple visit */
  { id: 'C-TEMPLE-SHOES', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'The national tourism authority advises modest clothing at temples and taking off shoes and hats; you can carry your shoes, just not wear them.' },
  { id: 'C-TEMPLE-CAMERA', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'The national tourism authority advises always asking before photographing people.' },
  { id: 'C-FLOOR-ALTAR', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'CAFEF-THANTAI'], text: 'Homes and shops often have a small altar on the floor near the door; the national tourism authority advises not stepping over it or walking directly in front of it.' },
  { id: 'C-INCENSE', kind: 'custom', status: 'published', sourceIds: ['BPL-HUONG'], text: 'Custom favours an odd number of incense sticks, usually three or one; the abbot of the One Pillar pagoda says one, two or three are all fine and that pagodas set no rule.' },
  { id: 'C-OFFER-2025', kind: 'custom', status: 'published', sourceIds: ['TT-TET2025'], text: 'At Phủ Tây Hồ and Trấn Quốc on the first day of Tết 2025, offerings were fruit and sweets, without votive paper or meat; at Phủ Tây Hồ visitors made their offerings from the courtyard.' },
  { id: 'C-MONEY-STATUES', kind: 'siteRule', status: 'published', sourceIds: ['VNE-TIENLE', 'LAW-110-ART7'], text: 'Visitors used to tuck small notes into statues’ hands and pile them at their feet. The rules now ask festival organisers to guide people to put offerings of money only in the places set aside, and fee-charging money-changing inside sites is to be stopped.' },
  { id: 'C-TEMPLE-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Carry a scarf or light long trousers if you are touring in shorts, and put money in the donation box rather than on an altar or statue.' },
  /* family altar */
  { id: 'C-ALTAR', kind: 'custom', status: 'published', sourceIds: ['CA-REL', 'VNP-ALTAR'], text: 'Many homes of the Việt majority have an ancestral altar with photographs of family members who have died, and offerings of incense, flowers, fruit and water. Ancestors are honoured most on a death anniversary (giỗ), on the 1st and 15th days of the lunar month, and at Tết.' },
  { id: 'C-ALTAR-ALL', kind: 'belief', status: 'published', sourceIds: ['CA-REL', 'PEW-2024'], text: 'Ancestor veneration rests on filial piety (hiếu) and is practised by most people in Vietnam whatever their religion, including many Catholics and people with no religion.' },
  { id: 'C-ALTAR-PLACE', kind: 'custom', status: 'published', sourceIds: ['VNP-ALTAR', 'DT-ALTAR'], text: 'The altar goes in the most central and highest place in the house. In old houses that was the middle room; in today’s narrow town houses it is often the top floor.' },
  { id: 'C-ALTAR-TET', kind: 'custom', status: 'published', sourceIds: ['VNP-ALTAR'], text: 'Before Tết families clean the incense urn and candlesticks and set the altar with a tray of five fruits, flowers, bánh chưng, betel and a cup of water.' },
  { id: 'C-ALTAR-SON', kind: 'custom', status: 'published', sourceIds: ['BPL-TOTIEN'], text: 'By tradition the eldest son keeps the ancestral rites, and after him the eldest grandson; on a death anniversary the family gathers at the eldest son’s house.' },
  { id: 'C-ALTAR-GIFT', kind: 'custom', status: 'published', sourceIds: ['DT-ALTAR'], text: 'An old custom is to place a guest’s gift on the altar first, as if offering it to the ancestors.' },
  { id: 'C-PEW-ALTAR', kind: 'custom', status: 'published', sourceIds: ['PEW-2024'], text: 'In a 2023 survey 48% of people in Vietnam said they had no religion, yet 95% had a home altar, in equal shares among Buddhists, Christians and the unaffiliated; 86% had offered food or drink to their ancestors in the past year.' },
  { id: 'C-PEW-MORE', kind: 'custom', status: 'published', sourceIds: ['PEW-2024'], text: 'In the same 2023 survey 96% of people in Vietnam had burnt incense for their ancestors in the past year and 90% had offered flowers or candles; more than eight in ten had a family grave, about seven in ten visited it every year, and nearly eight in ten said an ancestor’s spirit had helped them.' },
  { id: 'C-CENSUS-REL', kind: 'custom', status: 'published', sourceIds: ['GSO-2019', 'CA-REL'], text: 'In the 2019 census 13.7% of people said they belonged to a religion; another official count, by the Government Committee for Religious Affairs, gives about 27%.' },
  { id: 'C-THANTAI', kind: 'custom', status: 'published', sourceIds: ['CAFEF-THANTAI'], text: 'Shops keep a low altar near the door for Thần Tài, the god of wealth, and Ông Địa, the earth god. A scholar says it is low to keep it apart from the high ancestral altar, not because it ranks lower. The 10th day of the first lunar month is Thần Tài’s day.' },
  { id: 'C-ALTAR-SHOPS', kind: 'custom', status: 'published', sourceIds: ['VNE-DOTHO'], text: 'In the Old Quarter altars are sold on Hàng Quạt and bronze urns and altar sets on Hàng Đồng.' },
  { id: 'C-ALTAR-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'As a guest, leave the altar and its offerings alone and ask before photographing it. If your host invites you to light a stick of incense, it is a kindness to accept.' },
  /* mother goddesses */
  { id: 'C-MAU', kind: 'belief', status: 'published', sourceIds: ['UNESCO-MAU', 'UN-VN-MAU', 'ND-MAU2016'], text: 'The Mother Goddesses of Three Realms (heaven, water, and mountains and forests) are worshipped for health and success; Liễu Hạnh is honoured as Mother of the World. The practice includes the lên đồng ritual, in which a medium in costume embodies a series of spirits, and was added to UNESCO’s Representative List in 2016.' },
  { id: 'C-MAU-OPEN', kind: 'belief', status: 'published', sourceIds: ['VNAT-DISAN-MAU', 'UNESCO-MAU-DEC'], text: 'Anyone may take part, whatever their age, occupation or religion. The practice is strongest in the north and north-central regions, with its centre in Nam Định, and is also found in Hồ Chí Minh City.' },
  { id: 'C-MAU-UNESCO', kind: 'history', status: 'published', sourceIds: ['UNESCO-MAU-DEC', 'ND-MAU2016'], text: 'UNESCO inscribed the practices at its 11th session in Addis Ababa on 1 December 2016, Vietnam time. They have been passed on since the sixteenth century and had been on Vietnam’s national list since 2013; safeguarding aims among other things to counter over-commercialisation.' },
  { id: 'C-MAU-LIEUHANH', kind: 'legend', status: 'published', sourceIds: ['ND-MAU2016', 'UN-VN-MAU'], text: 'Liễu Hạnh is told of as a fairy who came down to earth, lived as a human and later turned to Buddhism; she is one of the Four Immortals of Vietnamese belief.' },
  { id: 'C-MAU-RITUAL', kind: 'custom', status: 'published', sourceIds: ['ND-MAU2016', 'UNESCO-MAU'], text: 'In lên đồng, also called hầu đồng, one medium embodies several gods in turn, changing costume for each, to chầu văn music and dance. The pantheon draws on the Kinh, Mường, Tày, Nùng and Dao peoples. Temple keepers, ritual masters, mediums, assistants and musicians carry the practice, mostly by word of mouth.' },
  { id: 'C-MAU-HISTORY', kind: 'history', status: 'published', sourceIds: ['VNS-HAUDONG', 'TTN-HAUDONG', 'ND-MAU2016'], text: 'Lên đồng was condemned as superstition and banned for decades; the ban was lifted in 1987, and the practice revived openly from the early 1990s.' },
  { id: 'C-MAU-TOLERANCE', kind: 'custom', status: 'published', sourceIds: ['UNESCO-MAU-DEC'], text: 'UNESCO’s decision describes the practice as open to anyone, with no restrictions, and as promoting tolerance between ethnic groups and religions.' },
  { id: 'C-MAU-STAGE', kind: 'custom', status: 'published', sourceIds: ['VNS-HAUDONG', 'BVH-MAU2023'], text: 'Hầu đồng has also been staged as performance, for instance in a Hà Nội theatre in 2016; the Ministry of Culture counts staging it outside its proper setting among the distortions it wants corrected.' },
  { id: 'C-MAU-WOMEN', kind: 'custom', status: 'published', sourceIds: ['UNESCO-MAU'], text: 'UNESCO notes that the practice contributes to the appreciation of women and their roles in society.' },
  { id: 'C-MAU-HN', kind: 'siteRule', status: 'published', sourceIds: ['ND-MAU2022', 'BVH-MAU2023'], text: 'Hà Nội has nearly 600 đền, 5 phủ and 1,230 private shrines. Since 2018 the Ministry of Culture has asked that hầu đồng be held only at Mother Goddess shrines and relic sites, not as tourist shows, with fewer paper and costly offerings; in 2023 it said such distortions were still increasing.' },
  { id: 'C-MAU-AUDIENCE', kind: 'custom', status: 'published', sourceIds: ['TTN-HAUDONG', 'VNS-HAUDONG'], text: 'During a ritual members of the audience may approach the medium with offerings or requests; a scholar has criticised crowding and loud music at some rituals.' },
  { id: 'C-MAU-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'If you come across a ritual, it is worship, not a show: stand at the side, keep quiet, and ask the temple keeper before filming.' }
];

const glossary = [
  { id: 'thanh-hoang', vi: 'thành hoàng', say: 'tahn hwang', en: 'A village or city guardian spirit, honoured in the communal house (đình).' },
  { id: 'gio', vi: 'giỗ', say: 'zaw', en: 'A death anniversary: the yearly day on which a family honours an ancestor with offerings and a meal.' },
  { id: 'hau-dong', vi: 'hầu đồng', say: 'how dong', en: 'Spirit mediumship in the Mother Goddess religion, also called lên đồng: a medium embodies a series of gods in turn.' },
  { id: 'chau-van', vi: 'chầu văn', say: 'chow van', en: 'The sung music that accompanies hầu đồng.' }
];

const sacred = {
  id: 'st-sacred-places',
  layout: 'compare',
  title: 'Chùa, đền, đình: which is which?',
  dek: 'English signs call them all temples. Vietnamese does not. A guide to the pagodas, temples, communal houses and shrines of Hà Nội, and the four temples that once guarded the city.',
  place: 'Hà Nội',
  imageId: 'bl-tranquoc',
  hero: { image: 'bl-tranquoc' },
  appliesTo: 'Places of worship in and around Hà Nội. Founding dates are often tradition; we say so where they are.',
  varies: 'Many sites combine a pagoda, a temple and a communal house in one compound, and the words are used loosely.',
  sections: [
    { text: 'A chùa is a Buddhist pagoda; a đền honours a hero or deity; a đình is a village communal house.', claimIds: ['C-SACRED-TYPES'] },
    { heading: 'Lines blur', text: 'Real places mix them: Ngọc Sơn, a đền, keeps a statue of the Buddha.', claimIds: ['C-NGOCSON'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Hà Nội has about 5,900 recorded relics, from pagodas older than the city to shrines the size of a cupboard. English signs call most of them “temples”. Vietnamese is more precise: a *chùa* is not a *đền*, and neither is a *đình*. Knowing which is which tells you who is worshipped there, who looks after it, and what to bring.', claimIds: ['C-HN-RELICS', 'C-SACRED-TYPES'] }
    ] },
    { type: 'facts', title: 'Sacred places in brief', items: [
      { term: 'Chùa', text: 'Buddhist pagoda.' },
      { term: 'Đền', text: 'Temple to a hero, deity or spirit.' },
      { term: 'Đình', text: 'Village communal house.' },
      { term: 'Phủ', text: 'Shrine to the Mother Goddesses.' }
    ], claimIds: ['C-SACRED-TYPES'] },

    { type: 'tabs', heading: 'Which is which?', id: 'types', intro: 'Choose a tab: the kinds of place, or the four temples that guarded Thăng Long.', label: 'Kinds of sacred place in Hà Nội', tabs: [
      { label: 'Kinds of place', columns: ['Word', 'What it is', 'Hà Nội example'], rows: [
        [{ text: 'chùa', vi: true }, { text: 'A Buddhist pagoda, often home to monks or nuns.', claimIds: ['C-SACRED-TYPES'] }, 'Trấn Quốc, One Pillar'],
        [{ text: 'đền', vi: true }, { text: 'A temple to a national hero, a deity or a local spirit.', claimIds: ['C-SACRED-TYPES'] }, 'Ngọc Sơn, Quán Thánh'],
        [{ text: 'đình', vi: true }, { text: 'A village communal house for the guardian spirit.', claimIds: ['C-SACRED-TYPES'] }, 'The đình of old villages, now inside the city'],
        [{ text: 'miếu', vi: true }, { text: 'A small shrine, often by a road, with no clergy.', claimIds: ['C-SACRED-TYPES'] }, 'Street corners across the city'],
        [{ text: 'phủ', vi: true }, { text: 'A shrine to the Mother Goddesses.', claimIds: ['C-SACRED-TYPES'] }, 'Phủ Tây Hồ']
      ] },
      { label: 'Four guardians', columns: ['Temple', 'Direction', 'God'], rows: [
        ['Quán Thánh', 'North', { text: 'Huyền Thiên Trấn Vũ', claimIds: ['C-TUTRAN'] }],
        ['Bạch Mã', 'East', { text: 'Long Đỗ', claimIds: ['C-TUTRAN'] }],
        ['Kim Liên', 'South', { text: 'Cao Sơn', claimIds: ['C-TUTRAN'] }],
        ['Voi Phục', 'West', { text: 'Linh Lang', claimIds: ['C-TUTRAN'] }]
      ] }
    ] },

    { type: 'text', heading: 'Chùa: the pagodas', id: 'chua', paras: [
      { text: 'A *chùa* is Buddhist: the halls hold statues of the Buddha and bodhisattvas, and monks or nuns often live there. Hà Nội’s best known is Trấn Quốc, on its islet in West Lake. By tradition it was founded in the sixth century, under Lý Nam Đế, as Khai Quốc, which would make it older than the city itself; the date is tradition, not a finding. Its tall stupa, eleven storeys and about fifteen metres, is recent, built in 1998, and the bodhi tree in its courtyard grew from a cutting brought by the president of India in 1959.', claimIds: ['C-SACRED-TYPES', 'C-TRANQUOC'] },
      { text: 'The One Pillar pagoda is the other famous one. The chronicle dates it to 1049, under King Lý Thái Tông, and a legend says he built it after dreaming of the bodhisattva Quan Âm seated on a lotus. French forces blew it up in 1954; what you see now was rebuilt in 1955.', claimIds: ['C-MOTCOT'] },
      { text: 'Both pagodas have been national relics since 1962, and in 2012 an Asian records organisation named the One Pillar pagoda the most unique architecture in Asia: a large title for a very small building.', claimIds: ['C-MOTCOT-RECORD'] }
    ] },
    { type: 'pair', items: [
      { image: 'bl-tranquoc', caption: 'Trấn Quốc pagoda on West Lake.' },
      { image: 'bl-motcot', caption: 'The One Pillar pagoda, rebuilt in 1955.' }
    ] },

    { type: 'text', heading: 'Đền: temples to heroes and gods', id: 'den', paras: [
      { text: 'A *đền* honours someone other than the Buddha: a national hero, a deity, a local spirit. A keeper looks after it rather than a community of monks. Ngọc Sơn, on Hoàn Kiếm Lake, honours General Trần Hưng Đạo and the god of literature, though it also keeps a statue of the Buddha; in practice the lines blur.', claimIds: ['C-SACRED-TYPES', 'C-NGOCSON'] },
      { text: 'Four temples once guarded the four sides of Thăng Long: Quán Thánh in the north, Bạch Mã in the east, Kim Liên in the south and Voi Phục in the west. In January 2022 they were made a special national relic together. Bạch Mã, on Hàng Buồm in the Old Quarter, is the oldest. Its legend says the god Long Đỗ appeared as a white horse, *bạch mã*, whose tracks showed the king where to build the citadel walls. Like many founding stories it does not sit neatly with the recorded dates.', claimIds: ['C-TUTRAN', 'C-BACHMA'] },
      { text: 'Quán Thánh, by West Lake, holds a great black bronze statue of the guardian Trấn Vũ, cast in 1677 to replace a wooden one and now a national treasure. Sources disagree on how tall it is.', claimIds: ['C-QUANTHANH'] },
      { text: 'Bạch Mã is also an archive. It keeps 18 stone stelae and 17 royal decrees from the Nguyễn kings, and it has partly revived an old spring ritual. Of the four guardians, Kim Liên in the south honours Cao Sơn, and Voi Phục in the west Linh Lang.', claimIds: ['C-BACHMA-RECORDS', 'C-TUTRAN'] }
    ] },
    { type: 'figure', image: 'bl-quanthanh', size: 'wide', caption: 'Quán Thánh temple, guardian of the north.' },

    { type: 'text', heading: 'Đình, miếu and phủ', id: 'dinh', paras: [
      { text: 'A *đình* is the communal house of a village, built for its [[thanh-hoang|guardian spirit]]. As Hà Nội grew around its old villages, their đình remained, some of them in the Old Quarter itself.', claimIds: ['C-SACRED-TYPES'] },
      { text: 'A *miếu* is smaller: a shrine to a local spirit, often by a road, with no clergy at all. A *phủ* is a shrine to the Mother Goddesses; Phủ Tây Hồ, on a spit of land in West Lake, is the city’s best known. Hà Nội has nearly 600 đền, 5 phủ and more than a thousand private shrines of that religion. Our story on [the Mother Goddesses](story:st-mother-goddess) explains it.', claimIds: ['C-SACRED-TYPES', 'C-MAU-HN'] }
    ] },

    { type: 'text', heading: 'The Hương pagoda pilgrimage', id: 'huong', paras: [
      { text: 'Every spring pilgrims go to the Hương pagoda, within Hà Nội, travelling by boat on the Yến stream to a cluster of about twenty temples and pagodas on four routes. In 2026 the festival ran from 18 February to 11 May; 135,900 people came in the first five days of Tết alone, and motorboats were not allowed on the stream that year.', claimIds: ['C-HUONG2026'] }
    ] },
    { type: 'note', text: 'Hà Nội’s relic counts differ slightly between a 2024 journal article and a 2025 city list: 21 or 22 special national relics, about 1,160 national ones.', claimIds: ['C-HN-RELICS'] },

    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Chùa', text: 'Buddha; monks or nuns.' },
      { term: 'Đền', text: 'Heroes, gods, spirits; a keeper.' },
      { term: 'Đình', text: 'The village and its guardian.' },
      { term: 'Phủ', text: 'The Mother Goddesses.' }
    ] },
    { type: 'quiz', image: 'bl-quanthanh', question: 'Pagoda or temple?', prompt: 'Quán Thánh, by West Lake, honours the guardian god Trấn Vũ. Is it a chùa or a đền?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'A chùa, because it is old', feedback: 'Age does not decide it. A chùa is for the Buddha.' },
      { label: 'A đền, because it honours a god', fit: true, feedback: 'Yes. It is one of the four temples that guarded Thăng Long.' },
      { label: 'A đình, because it is in the city', feedback: 'A đình is a village communal house for its guardian spirit.' }
    ] }
  ]
};

const visit = {
  id: 'st-temple-visit',
  layout: 'guide',
  title: 'Visiting a temple or pagoda',
  dek: 'What to wear, how many incense sticks, where the money goes, and when to put the camera away. A practical guide to Hà Nội’s places of worship, from the rules sites publish to the customs they leave unsaid.',
  place: 'Hà Nội',
  sceneId: 'sc03',
  imageId: 'img-garden',
  hero: { image: 'bl-tranquoc' },
  appliesTo: 'Pagodas, temples and heritage sites in Hà Nội. Site rules come from the sites themselves; general guidance from the national tourism authority.',
  varies: 'Each site has its own rules, and they change. Check signs on the day.',
  phraseIds: ['ph-chupanh-noi'],
  sections: [
    { heading: 'The site’s own rules', text: 'Văn Miếu – Quốc Tử Giám asks visitors to dress respectfully, keep quiet and not touch the stelae or buildings.', claimIds: ['C-VM-DRESS', 'C-VM-QUIET', 'C-VM-NOTOUCH'] },
    { heading: 'General guidance', text: 'Dress modestly and take off hats.', claimIds: ['C-TEMPLE-COVER'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'At Hà Nội’s pagodas and temples a few things matter: what you wear, where you put your feet and your money, and when you lift your camera. This guide sets out what the sites themselves ask, what general guidance adds, and where both are silent.', claimIds: ['C-TEMPLE-COVER', 'C-VM-DRESS'] }
    ] },
    { type: 'facts', title: 'The short version', items: [
      { term: 'Wear', text: 'Shoulders and knees covered; hat off.' },
      { term: 'Incense', text: 'Usually one or three sticks.' },
      { term: 'Money', text: 'In the donation box, not on statues.' },
      { term: 'Photos', text: 'Ask before photographing people.' }
    ], claimIds: ['C-TEMPLE-COVER', 'C-INCENSE', 'C-MONEY-STATUES', 'C-TEMPLE-CAMERA'] },

    { type: 'steps', heading: 'A visit, step by step', id: 'steps', items: [
      { title: 'Dress for it', paras: [
        { text: 'General guidance for temples in Vietnam is to dress modestly, covering shoulders and knees, and to take off your hat. Văn Miếu’s own rules ask for respectful dress in its places of worship. If you are touring in shorts, a scarf or light trousers in your bag solves it.', claimIds: ['C-TEMPLE-COVER', 'C-VM-DRESS', 'C-TEMPLE-TIP'] }
      ] },
      { title: 'Shoes', paras: [
        { text: 'The national tourism authority advises taking off shoes at temples; you may carry them, just not wear them.', claimIds: ['C-TEMPLE-SHOES'] }
      ] },
      { title: 'Incense', paras: [
        { text: 'Custom favours an odd number of sticks, usually three or one. The abbot of the One Pillar pagoda, asked about it, said one, two or three are all fine, and that pagodas set no rule; what matters is sincerity.', claimIds: ['C-INCENSE'] }
      ] },
      { title: 'Offerings', paras: [
        { text: 'On the first day of Tết 2025, reporters found the trays at Phủ Tây Hồ and Trấn Quốc held only fruit and sweets, with no votive paper and no meat. Many temples now limit paper offerings; see [paper offerings](story:st-paper-offerings).', claimIds: ['C-OFFER-2025', 'C-VANGMA-HN'] }
      ] },
      { title: 'Money', paras: [
        { text: 'For years visitors tucked small notes into statues’ hands and piled them at their feet. The rules now ask festival organisers to guide people to put money only in the places set aside, and money-changing for a fee inside sites is to stop. Use the donation box.', claimIds: ['C-MONEY-STATUES', 'C-TEMPLE-TIP'] }
      ] },
      { title: 'Quiet, and hands off', paras: [
        { text: 'Keep your voice down in the halls. At heritage sites such as Văn Miếu you must not touch, write on or draw on stelae, statues or buildings.', claimIds: ['C-VM-QUIET', 'C-VM-NOTOUCH'] }
      ] },
      { title: 'The camera', paras: [
        { text: 'Ask before photographing people, especially anyone praying. Do not use flash where signs ask for no photos, and avoid posing for selfies with Buddha statues, which can be seen as disrespectful. Where the published rules are silent, as Văn Miếu’s are, look for signs or ask staff.', claimIds: ['C-TEMPLE-CAMERA', 'C-VM-PHOTO-UNKNOWN', 'C-PHOTO-TEMPLE'] }
      ] }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Covering shoulders and knees.', claimIds: ['C-TEMPLE-COVER'] },
      { text: 'One or three sticks of incense.', claimIds: ['C-INCENSE'] },
      { text: 'Money in the donation box.', claimIds: ['C-MONEY-STATUES'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Tucking notes into a statue’s hand.', claimIds: ['C-MONEY-STATUES'] },
      { text: 'Stepping over a small floor altar in a shop.', claimIds: ['C-FLOOR-ALTAR'] },
      { text: 'Photographing someone praying without asking.', claimIds: ['C-TEMPLE-CAMERA'] }
    ] } },

    { type: 'text', heading: 'Busy days', id: 'busy', paras: [
      { text: 'The 1st and 15th of each lunar month are the days families light incense, at home and at temples, and the first days of the year are the busiest of all: on the first day of Tết 2025 crowds were at Phủ Tây Hồ from nine in the morning. If you want a quiet visit, avoid those days; if you want to see the city at worship, go then.', claimIds: ['C-ALTAR', 'C-OFFER-2025'] },
      { text: 'On the busiest days the halls may be closed to the crowd. At Phủ Tây Hồ on the first day of Tết 2025, visitors made their offerings from the courtyard rather than inside. Follow the staff and the signs, and give the people praying room.', claimIds: ['C-OFFER-2025'] }
    ] },
    { type: 'text', heading: 'Altars in homes and shops', id: 'floor', paras: [
      { text: 'Many shops and homes keep a small altar on the floor near the door, for the god of wealth and the earth god. The national tourism authority advises not stepping over it or walking directly in front of it. Our story on [the family altar](story:st-family-altar) explains it.', claimIds: ['C-FLOOR-ALTAR', 'C-THANTAI'] }
    ] },
    { type: 'text', heading: 'Tickets, hours and luck', id: 'tickets', paras: [
      { text: 'Heritage sites charge for entry. Văn Miếu opens every day from 8 a.m. to 5 p.m., and a ticket is 70,000 đồng, half price for students and people over 60. The Imperial Citadel is open 8:00–17:00 and costs 100,000 đồng.', claimIds: ['C-VM-VISIT', 'C-TL-VISIT'] },
      { text: 'Some customs have had to change. For years students rubbed the heads of the stone turtles under Văn Miếu’s stelae for luck before their exams, until the wear forced the site to fence them off in 2014. Look, and leave them be.', claimIds: ['C-STELAE-FENCE', 'C-VM-LUCK'] }
    ] },
    { type: 'text', heading: 'Paper offerings and the new rules', id: 'paper', paras: [
      { text: 'Hà Nội’s temples have tightened up on paper offerings. In the 2026 festival season Quán Thánh asked visitors not to bring paper offerings into the main shrine, Kim Liên did not allow burning in its main worship area, and Phủ Tây Hồ set up a supervised place for burning. The city also forbids scattering rice or salt and sticking incense into trees. If you buy offerings at the gate, ask what the temple allows.', claimIds: ['C-VANGMA-HN'] }
    ] },
    { type: 'text', heading: 'At Tết and on pilgrimage', id: 'tet', paras: [
      { text: 'On the first day of the year many Hanoians go to pagodas and temples such as Trấn Quốc and Ngọc Sơn to pray for peace, and calligraphers write characters for the new year at Ngọc Sơn and Văn Miếu. In spring pilgrims travel by boat to the Hương pagoda; in 2026 the festival ran from February to May and 135,900 people came in its first five days.', claimIds: ['C-TET-DILE', 'C-TET-CHU', 'C-HUONG2026'] },
      { text: 'For the difference between a chùa, a đền and a đình, and what each one honours, see [Chùa, đền, đình](story:st-sacred-places).', editorial: true }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Wear', text: 'Covered shoulders and knees.' },
      { term: 'Incense', text: 'One or three sticks.' },
      { term: 'Money', text: 'Donation box only.' },
      { term: 'Ask', text: 'Chụp ảnh được không? May I take a photo?' }
    ] },
    { type: 'quiz', image: 'img-garden', question: 'The statue’s hand', prompt: 'At a temple you see notes tucked into a statue’s hand. You would like to make an offering too. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Add a note to the statue’s hand', feedback: 'Others may do it, but the rules ask people to put money only in the places set aside.' },
      { label: 'Put it in the donation box', fit: true, feedback: 'Yes. That is what the sites and the national rules ask.' },
      { label: 'Leave a note on the incense urn', feedback: 'Better not: use the donation box.' }
    ] }
  ]
};

const altar = {
  id: 'st-family-altar',
  layout: 'longform',
  title: 'The family altar',
  dek: 'Photographs, incense and a plate of fruit on the top floor of a tube house. Why nearly every home in Vietnam keeps an altar to its dead, even where nobody calls themselves religious.',
  place: 'Hà Nội',
  imageId: 'ev-home-altar',
  hero: { image: 'ev-home-altar' },
  appliesTo: 'Homes of Vietnam’s Việt majority, with Hà Nội examples. Figures come from a 2023 survey and the 2019 census.',
  varies: 'Altars, offerings and how often incense is lit differ from family to family, and so does who keeps the altar.',
  sections: [
    { text: 'Many Vietnamese homes have an ancestral altar holding photographs of family members who have died.', claimIds: ['C-ALTAR'] },
    { heading: 'Not tied to one religion', text: 'Most people in Vietnam keep it up whatever their religion.', claimIds: ['C-ALTAR-ALL'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Climb to the top floor of almost any Hà Nội tube house and you will find it: a polished wooden altar, framed photographs of grandparents and great-grandparents, an incense urn, a vase of flowers, a plate of fruit, a cup of water. It is the family altar, *bàn thờ gia tiên*, and it is where the living keep company with the family’s dead.', claimIds: ['C-ALTAR', 'C-ALTAR-PLACE'] },
      { text: 'It is also one of the most widely shared practices in Vietnam. In a 2023 survey nearly half of people said they had no religion, yet 95 percent had an altar at home.', claimIds: ['C-PEW-ALTAR'] }
    ] },
    { type: 'facts', title: 'The altar in brief', items: [
      { term: 'Where', text: 'The highest, most central place in the house.' },
      { term: 'What', text: 'Photographs, an incense urn, flowers, fruit, water.' },
      { term: 'When', text: 'The 1st and 15th of the lunar month, death anniversaries, Tết.' },
      { term: 'Who', text: '95% of households, whatever their religion (2023).' }
    ], claimIds: ['C-ALTAR-PLACE', 'C-ALTAR', 'C-PEW-ALTAR'] },

    { type: 'text', heading: 'Why the top floor', id: 'place', paras: [
      { text: 'The altar goes in the most central and highest place in the house. In an old village house that meant the middle room. Hà Nội’s town houses are narrow and tall, and there the highest place is the top floor, so that is where most families put it.', claimIds: ['C-ALTAR-PLACE'] },
      { text: 'Shops add a second, very different altar: a low one near the door, often on the floor, for Thần Tài, the god of wealth, and Ông Địa, the earth god. A scholar quoted in 2026 says it sits low to keep it apart from the high ancestral altar, not because it ranks lower. The 10th day of the first lunar month is Thần Tài’s day. Because the shop altar sits on the floor, the national tourism authority advises visitors not to step over it or walk directly in front of it.', claimIds: ['C-THANTAI', 'C-FLOOR-ALTAR'] }
    ] },
    { type: 'figure', image: 'ev-home-flat-altar', size: 'wide', caption: 'An ancestral altar in a high-rise flat.' },

    { type: 'text', heading: 'What is on it', id: 'what', paras: [
      { text: 'The altar holds photographs of family members who have died, and offerings of incense, flowers, fruit and water. At its centre is the incense urn, *bát hương*, often flanked by candlesticks. Before Tết families clean the urn and the candlesticks and set the altar for the new year: a tray of five fruits, flowers, the square rice cake bánh chưng, betel and a cup of water.', claimIds: ['C-ALTAR', 'C-ALTAR-TET'] },
      { text: 'In the Old Quarter you can still see where the pieces come from: altars on Hàng Quạt, bronze urns and altar sets on Hàng Đồng, and paper offerings on [Hàng Mã](story:st-paper-offerings).', claimIds: ['C-ALTAR-SHOPS', 'C-HANGMA'] }
    ] },

    { type: 'text', heading: 'The days that matter', id: 'days', paras: [
      { text: 'Some families light incense every day. Most give the altar special attention on the 1st and 15th of each lunar month, on each ancestor’s [[gio|death anniversary]], and above all at Tết, when the ancestors are invited home from their graves to celebrate with the family.', claimIds: ['C-ALTAR', 'C-TET-GRAVES'] },
      { text: 'By tradition the eldest son keeps the rites, and after him the eldest grandson. On a death anniversary the family gathers at his house, to honour the ancestor at the altar. That is the custom as it is usually described; families today arrange it in many ways.', claimIds: ['C-ALTAR-SON'] }
    ] },
    { type: 'quote', text: 'Ancestor veneration rests on filial piety, the duty to care for parents and elders in life and after death.', by: 'A summary of the Cultural Atlas, our wording', claimIds: ['C-ALTAR-ALL'] },

    { type: 'text', heading: 'Religion, or not', id: 'religion', paras: [
      { text: 'The altar rests on filial piety, *hiếu*: the duty to care for one’s parents and elders, in life and after death. It is not tied to one religion. In the 2019 census only 13.7 percent of people said they belonged to a religion; another official count, by the Government Committee for Religious Affairs, puts it at about 27 percent. Either way, most Vietnamese are not members of a religion in that sense.', claimIds: ['C-ALTAR-ALL', 'C-CENSUS-REL'] },
      { text: 'Yet nearly everyone keeps the altar. Pew Research Center’s 2023 survey found that 95 percent of households had one, in equal shares among Buddhists, Christians and people with no religion, and that 86 percent of people had offered food or drink to their ancestors in the past year. Many Catholics keep an altar to their ancestors alongside their faith.', claimIds: ['C-PEW-ALTAR', 'C-ALTAR-ALL'] },
      { text: 'The same survey shows how much the practice involves. In the past year 96 percent had burnt incense for their ancestors and 90 percent had offered flowers or candles. More than eight in ten families had a family grave, about seven in ten visited it every year, and nearly eight in ten people said an ancestor’s spirit had helped them. The altar at home and the grave in the village are two ends of the same bond; at Tết, families tidy the graves and invite the ancestors home.', claimIds: ['C-PEW-MORE', 'C-TET-GRAVES'] }
    ] },
    { type: 'note', text: 'Official counts of religious affiliation differ: 13.7 percent in the 2019 census, about 27 percent in figures from the Government Committee for Religious Affairs. We give both.', claimIds: ['C-CENSUS-REL'] },

    { type: 'text', heading: 'As a guest', id: 'guest', paras: [
      { text: 'An old custom is for the host to place a guest’s gift on the altar first, as if offering it to the ancestors; in some homes your box of sweets may go up to the altar before it is opened. Leave the altar and its offerings alone, and ask before photographing it. If your host invites you to light a stick of incense, for instance on a death anniversary, it is a kindness to accept.', claimIds: ['C-ALTAR-GIFT', 'C-ALTAR-TIP'] }
    ] },
    { type: 'text', paras: [
      { text: 'For what happens at the altar during the New Year, from the Kitchen Gods to the five-fruit tray and New Year’s Eve, see our story on [Tết](story:st-tet).', editorial: true }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Bàn thờ', text: 'The family altar, highest in the house.' },
      { term: 'Giỗ', text: 'A death anniversary.' },
      { term: 'Hiếu', text: 'Filial piety.' },
      { term: 'Guest', text: 'Hands off; ask before a photo.' }
    ] },
    { type: 'quiz', image: 'ev-home-altar', question: 'No religion?', prompt: 'A friend says that since most Vietnamese report no religion, few families keep an altar. What do the figures say?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Only Buddhists keep altars', feedback: 'No. Christians and the unaffiliated keep them in equal shares.' },
      { label: 'Nearly every household keeps one', fit: true, feedback: 'Yes: 95 percent in a 2023 survey, whatever their religion.' },
      { label: 'About half of households', feedback: 'Far more: 95 percent.' }
    ] }
  ]
};

const mau = {
  id: 'st-mother-goddess',
  layout: 'longform',
  title: 'The Mother Goddesses',
  dek: 'Goddesses of heaven, water and forest, a fairy who came down to earth, and mediums who change costume a dozen times in a night. The Mother Goddess religion of northern Vietnam, banned for decades and now World Heritage.',
  place: 'Phủ Tây Hồ and northern Vietnam',
  imageId: 'bl-tayho',
  hero: { image: 'bl-tayho' },
  appliesTo: 'The Mother Goddess religion of the Việt, strongest in the north, with Hà Nội examples. From UNESCO, the UN in Viet Nam, the national tourism authority and Vietnamese press.',
  varies: 'Shrines and rituals differ; not everyone in the north takes part, and many who do never go to a mediumship ritual.',
  sections: [
    { text: 'Many people worship the Mother Goddesses of Three Realms for health and success.', claimIds: ['C-MAU'] },
    { heading: 'Open to anyone', text: 'The belief is open to people of any age, occupation or religion.', claimIds: ['C-MAU-OPEN'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'In a temple hall the musicians strike up and a medium in costume begins to dance. For a while the medium is a god. Then the costume changes, and another god arrives, and another: one medium may embody several in a single ceremony.', claimIds: ['C-MAU-RITUAL'] },
      { text: 'This is [[hau-dong|hầu đồng]], or lên đồng, the best-known ritual of the Mother Goddess religion, *Đạo Mẫu*. Its followers worship the Mothers of Three Realms, heaven, water, and mountains and forests, for health and success. Condemned for decades as superstition, it was added to UNESCO’s list of the intangible heritage of humanity in 2016.', claimIds: ['C-MAU', 'C-MAU-HISTORY'] }
    ] },
    { type: 'facts', title: 'The Mother Goddesses in brief', items: [
      { term: 'Realms', text: 'Heaven, water, mountains and forests.' },
      { term: 'Mother of the World', text: 'Liễu Hạnh.' },
      { term: 'Ritual', text: 'Hầu đồng, with chầu văn music.' },
      { term: 'UNESCO', text: 'Representative List, 2016.' }
    ], claimIds: ['C-MAU', 'C-MAU-RITUAL', 'C-MAU-UNESCO'] },

    { type: 'text', heading: 'Three realms and a fairy', id: 'mothers', paras: [
      { text: 'The religion honours the Mothers of the Three Realms: of heaven, of water, and of the mountains and forests. Their pantheon draws on the Kinh, the Việt majority, and from the Mường, Tày, Nùng and Dao peoples of the northern hills.', claimIds: ['C-MAU', 'C-MAU-RITUAL'] },
      { text: 'Above them all in popular devotion stands Liễu Hạnh, honoured as Mother of the World. She is told of as a fairy who came down to earth, lived as a woman and later turned to Buddhism, and she is counted among the Four Immortals of Vietnamese belief. UNESCO’s record notes that the religion contributes to the appreciation of women and their roles in society.', claimIds: ['C-MAU-LIEUHANH', 'C-MAU-WOMEN'] }
    ] },
    { type: 'figure', image: 'bl-tayho', size: 'wide', caption: 'Phủ Tây Hồ, on West Lake.' },

    { type: 'text', heading: 'Hầu đồng', id: 'ritual', paras: [
      { text: 'Daily worship is quiet: incense, flowers and prayers at a shrine. The ritual that draws attention is hầu đồng. One medium embodies several gods in turn in a single ceremony, changing costume for each, to the sung music called [[chau-van|chầu văn]] and to dance. The practice is carried by temple keepers, ritual masters, mediums, assistants and musicians, and is passed on mostly by word of mouth.', claimIds: ['C-MAU-RITUAL'] },
      { text: 'It is not a performance for an audience, though people watch. During the ritual members of the congregation may come forward to the medium with offerings or requests. A scholar quoted in 2016 criticised the crowding and loud music at some rituals.', claimIds: ['C-MAU-AUDIENCE'] }
    ] },

    { type: 'timeline', heading: 'From ban to World Heritage', label: 'Timeline of the Mother Goddess religion', items: [
      { year: '1500s', title: 'Passed on', text: 'UNESCO dates the practices’ transmission to the sixteenth century.', claimIds: ['C-MAU-UNESCO'] },
      { year: '20th c.', title: 'Banned', text: 'Lên đồng is condemned as superstition and banned.', claimIds: ['C-MAU-HISTORY'] },
      { year: '1987', title: 'The ban is lifted', text: 'The rituals become legal again.', claimIds: ['C-MAU-HISTORY'] },
      { year: '1990s', title: 'Revival', text: 'The practice revives openly, carried by its followers.', claimIds: ['C-MAU-HISTORY'] },
      { year: '2013', title: 'National list', text: 'Vietnam lists it as national intangible heritage.', claimIds: ['C-MAU-UNESCO'] },
      { year: '2016', title: 'UNESCO', text: 'Inscribed on 1 December (Vietnam time) in Addis Ababa.', claimIds: ['C-MAU-UNESCO'] },
      { year: '2018', title: 'Rules for rituals', text: 'Hầu đồng to be held only at shrines, not as tourist shows.', claimIds: ['C-MAU-HN'] },
      { year: '2023', title: 'Still a worry', text: 'The ministry says distortions are increasing.', claimIds: ['C-MAU-HN'] }
    ] },

    { type: 'text', heading: 'Banned, then honoured', id: 'history', paras: [
      { text: 'For decades the state condemned lên đồng as superstition and banned it. The ban was lifted in 1987, and from the early 1990s the practice revived openly, carried by its own followers. Vietnam put it on its national list of intangible heritage in 2013, and UNESCO inscribed it at its 11th session, in Addis Ababa, on 1 December 2016, Vietnam time.', claimIds: ['C-MAU-HISTORY', 'C-MAU-UNESCO'] },
      { text: 'Anyone may take part, whatever their age, occupation or religion. The religion is strongest in the north and north-central regions, with its centre in Nam Định, south of Hà Nội, and is also found in Hồ Chí Minh City.', claimIds: ['C-MAU-OPEN'] }
    ] },
    { type: 'note', text: 'Sources date the end of the restrictions differently: the ban was lifted in 1987 according to two press features, while the open revival is dated to the early 1990s.', claimIds: ['C-MAU-HISTORY'] },

    { type: 'text', heading: 'Money and the market', id: 'money', paras: [
      { text: 'UNESCO’s decision names one danger outright: over-commercialisation. Rituals can be costly, and an artisan quoted by Nhân Dân in 2022 spoke of devotees who spent until they were ruined. Since 2018 the Ministry of Culture has asked that hầu đồng be held only at Mother Goddess shrines and relic sites, not as street shows or tourist services, with fewer paper and costly offerings. In 2023 it said such distortions were continuing and even increasing.', claimIds: ['C-MAU-UNESCO', 'C-MAU-HN'] }
    ] },

    { type: 'text', heading: 'Worship or performance?', id: 'stage', paras: [
      { text: 'The music and costume of hầu đồng are striking, and some have taken them to the stage: in 2016 a Hà Nội theatre ran staged performances. The Ministry of Culture counts staging the ritual outside its proper setting among the distortions it wants corrected. UNESCO’s decision, for its part, stresses what the practice does for its community: it is open to anyone, with no restrictions, and promotes tolerance between ethnic groups and religions.', claimIds: ['C-MAU-STAGE', 'C-MAU-TOLERANCE'] }
    ] },

    { type: 'text', heading: 'In Hà Nội', id: 'hanoi', paras: [
      { text: 'Hà Nội has nearly 600 đền, 5 phủ and some 1,230 private shrines of the religion. The best known is Phủ Tây Hồ, on West Lake, where crowds gather from early morning on the first day of Tết.', claimIds: ['C-MAU-HN', 'C-OFFER-2025'] },
      { text: 'If you come across a ritual, remember it is worship, not a show: stand at the side, keep quiet, and ask the temple keeper before filming.', claimIds: ['C-MAU-TIP'] },
      { text: 'A phủ is one of several kinds of sacred place in the city, alongside pagodas, temples to heroes and village communal houses. For how to tell them apart, and what each one honours, see [Chùa, đền, đình: which is which?](story:st-sacred-places).', editorial: true }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Đạo Mẫu', text: 'The Mother Goddess religion.' },
      { term: 'Hầu đồng', text: 'A medium embodies gods in turn.' },
      { term: '2016', text: 'UNESCO Representative List.' },
      { term: 'Watching', text: 'Quietly, from the side.' }
    ] },
    { type: 'quiz', image: 'bl-tayho', question: 'A ritual in progress', prompt: 'At a temple you walk into a hầu đồng ritual, music playing and a medium in costume. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Film it from the front; it is a performance', feedback: 'It is worship. Ask the temple keeper before filming.' },
      { label: 'Watch quietly from the side', fit: true, feedback: 'Yes. Stand back, keep quiet, and ask before filming.' },
      { label: 'Leave at once; outsiders are not allowed', feedback: 'Visitors may usually watch, quietly. Anyone may take part.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [sacred, visit, altar, mau] };
