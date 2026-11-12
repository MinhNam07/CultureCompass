/* Stories: Tết in Hà Nội (st-tet, timeline) and paper offerings (st-paper-offerings, compare).
   Researched 12 Nov 2026. Folk explanations are given as folk explanations; the rules on burning paper
   follow the texts themselves (Decree 110/2018 regulates where people burn, it does not forbid it). */
const today = '2026-11-12';

const sources = [
  { id: 'VNN-TET', used: 'Families visiting ancestors’ graves from the 23rd to the 30th of the last lunar month to invite them home; the Kitchen Gods riding carp to heaven; bánh chưng no longer a special dish but still made by many families; buying salt at the start of the year.' },
  { id: 'VNA-XONGDAT', used: 'The first visitor of the year (xông đất), often chosen for a compatible age and success, bringing small gifts and lucky money; families who send one of their own out before midnight; the custom now seen more as a New Year pleasure than a forecast of fortune.' },
  { id: 'TP-TET2026', short: 'Tiền Phong', title: 'Thủ tướng đồng ý nghỉ 9 ngày Tết Nguyên đán Bính Ngọ — Tiền Phong', org: 'Tiền Phong, by Văn Kiên', url: 'https://tienphong.vn/thu-tuong-dong-y-nghi-9-ngay-tet-nguyen-dan-binh-ngo-post1786865.html', type: 'press', checked: today,
    used: 'A nine-day Tết holiday for state employees, 14 to 22 February 2026 (27th of the last month to the 6th of the first).',
    limits: 'A news report (October 2025).' },
  { id: 'VNP-TET2027', short: 'VietnamPlus', title: '“Chốt” lịch nghỉ dịp Ngày Văn hóa Việt Nam 2026, Tết Nguyên đán và Quốc khánh năm 2027 — VietnamPlus', org: 'VietnamPlus, by Hồng Kiều', url: 'https://www.vietnamplus.vn/chot-lich-nghi-dip-ngay-van-hoa-viet-nam-2026-tet-nguyen-dan-va-quoc-khanh-nam-2027-post1139707.amp', type: 'press', checked: today,
    used: 'A seven-day Tết holiday from Thursday 4 to Wednesday 10 February 2027.',
    limits: 'A news report (October 2026).' },
  { id: 'TCCT-TAO', short: 'Tạp chí Công Thương', title: 'Gốc rễ sự tích ông Công ông Táo — Tạp chí Công Thương', org: 'Tạp chí Công Thương, by Thu Thủy', url: 'https://tapchicongthuong.vn/goc-re-su-tich-ong-cong-ong-tao-59691.htm', type: 'press', checked: today,
    used: 'The folk tale of the three Kitchen Gods (Trọng Cao, Thị Nhi and Phạm Lang); its versions differing because it was passed on by word of mouth; releasing carp, which carry the gods to heaven; the belief that offerings should be made before noon on the 23rd.',
    limits: 'A feature (January 2019) retelling a folk tale.' },
  { id: 'DBND-CACHEP', short: 'Đại biểu Nhân dân', title: 'Hà Nội: Nhộn nhịp thả cá chép tiễn ông Công, ông Táo — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Mạnh Hưng', url: 'https://daibieunhandan.vn/ha-noi-nhon-nhip-tha-ca-chep-tien-ong-cong-ong-tao-10406609.html', type: 'press', checked: today,
    used: 'People releasing carp at Nghĩa Đô park and West Lake on 10 February 2026; bins and sacks for plastic bags set out by the bridges; volunteers cleaning the water afterwards.',
    limits: 'A news report (February 2026).' },
  { id: 'DBND-NILON', short: 'Đại biểu Nhân dân', title: 'Công an Thủ đô “đi từng ngõ, gõ từng nhà” vận động nhân dân hạn chế rác thải nhựa dịp lễ ông Công ông Táo — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Trọng Nghĩa', url: 'https://daibieunhandan.vn/cong-an-thu-do-di-tung-ngo-go-tung-nha-van-dong-nhan-dan-han-che-rac-thai-nhua-dip-le-ong-cong-ong-tao-10406030.html', type: 'press', checked: today,
    used: 'Tây Hồ ward police going door to door before the 2026 festival to ask people not to throw plastic bags and basins into West Lake with the fish.',
    limits: 'A news report (February 2026).' },
  { id: 'DBND-DAO', short: 'Đại biểu Nhân dân', title: 'Thị trường đào cảnh Hà Nội sôi động trước Tết Nguyên đán — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Thanh Bình', url: 'https://daibieunhandan.vn/print/10405095.html', type: 'press', checked: today,
    used: 'Nhật Tân’s peach growers: nearly 800 households on about 80 hectares, mostly on the Red River banks; đào bích and đào phai; branches from 100,000 to 350,000 VND and trees from 1–2 million VND upwards in 2026; storms reducing supply.',
    limits: 'A market report (January 2026).' },
  { id: 'BVH-HANGLUOC', short: 'Báo Văn hóa', title: 'Ngày xuân khám phá chợ hoa lâu đời nhất Hà thành — Báo Văn hóa', org: 'Báo Văn hóa (Ministry of Culture, Sports and Tourism)', url: 'https://baovanhoa.vn/van-hoa/ngay-xuan-kham-pha-cho-hoa-lau-doi-nhat-ha-thanh-203700.html', type: 'press', checked: today,
    used: 'The Hàng Lược flower market, about a century old, running from the middle of the last lunar month to the afternoon of the 30th; peach, kumquat, chrysanthemum, white apricot and narcissus; Hanoians’ fondness for white apricot.',
    limits: 'A feature (February 2026); sources differ on the day the market opens.' },
  { id: 'BPL-NGUQUA', short: 'Báo Pháp Luật', title: 'Khác biệt trong cách bày biện mâm ngũ quả dịp Tết Nguyên đán ở ba miền — Báo Pháp luật Việt Nam', org: 'Báo Pháp luật Việt Nam, by Dương Trang', url: 'https://baophapluat.vn/khac-biet-trong-cach-bay-bien-mam-ngu-qua-dip-tet-nguyen-dan-o-ba-mien-post503776.html', type: 'press', checked: today,
    used: 'The northern five-fruit tray: a hand of green bananas at the base, a pomelo or Buddha’s hand in the middle, colours following the five elements; the southern tray, whose fruits spell “cầu sung vừa đủ xài”.',
    limits: 'A popular feature (February 2024) citing no expert; practice varies by family.' },
  { id: 'PLO-TAOMO', short: 'Pháp Luật TP.HCM', title: 'Tảo mộ cuối năm — nét đẹp trong văn hóa Việt Nam — Pháp Luật TP.HCM', org: 'Pháp Luật TP.HCM (on tuoitre.vn), by Phi Hùng', url: 'https://tuoitre.vn/plo/tao-mo-cuoi-nam-net-dep-trong-van-hoa-viet-nam-post830886.html', type: 'press', checked: today,
    used: 'Hà Nội families cleaning and tidying graves at the end of the year, bringing flowers, fruit, paper money and small kumquat trees, and inviting the ancestors home; cemeteries such as Văn Điển.',
    limits: 'A photo feature (January 2025).' },
  { id: 'VNE-GIAOTHUA', short: 'VnExpress', title: 'Nghi thức cúng Giao thừa — VnExpress', org: 'VnExpress, with the cultural researcher Phạm Đình Hải', url: 'https://vnexpress.net/nghi-thuc-cung-giao-thua-4562063.html', type: 'press', checked: today,
    used: 'The New Year’s Eve offering, which sends off the old year’s guardian deity and welcomes the new one; made between about 23:15 and midnight, with paper burnt before one o’clock; sticky rice, boiled chicken, betel, wine and flowers.',
    limits: 'A guide (January 2023) following one researcher; families vary.' },
  { id: 'LAW-137', short: 'Decree 137/2020/NĐ-CP', title: 'Nghị định 137/2020/NĐ-CP về quản lý, sử dụng pháo', org: 'Government of Vietnam (text read on hethongphapluat.com)', url: 'https://hethongphapluat.com/nghi-dinh-137-2020-nd-cp-ve-quan-ly-su-dung-phao.html', type: 'law', checked: today,
    used: 'The ban on exploding firecrackers; adults allowed to use non-exploding fireworks bought from licensed sellers at festivals and celebrations; cities such as Hà Nội allowed public displays of up to 15 minutes at New Year’s Eve.',
    limits: 'The decree (in force from January 2021), read in a legal database rather than the official gazette.' },
  { id: 'ZN-PHAOHOA', short: 'Znews', title: 'Chi tiết 33 điểm bắn pháo hoa giao thừa tối nay tại Hà Nội — Znews', org: 'Znews, from VTC News (Minh Tuệ)', url: 'https://znews.vn/chi-tiet-33-diem-ban-phao-hoa-giao-thua-toi-nay-tai-ha-noi-post1627903.html', type: 'press', checked: today,
    used: 'Fireworks at 33 places in Hà Nội from midnight to 00:15 on 17 February 2026, 11 of them high-altitude, at a cost of nearly 40 billion VND.',
    limits: 'A news report (February 2026); another outlet counted 31 places.' },
  { id: 'ND-LIXI', short: 'Nhân Dân', title: 'Nguồn gốc từ “lì xì” — Nhân Dân', org: 'Nhân Dân, by Trần Phỏng Diều', url: 'https://nhandan.vn/nguon-goc-tu-li-xi-post405141.html', type: 'press', checked: today,
    used: 'Two explanations of the word lì xì: a borrowing meaning “profit”, and a legend that dates the custom to the Tang dynasty.',
    limits: 'A short essay (2007) offering explanations, not settled history.' },
  { id: 'PLO-MUNG3', short: 'Pháp Luật TP.HCM', title: 'Vì sao gọi “Mùng 3 Tết thầy”? — Pháp Luật TP.HCM', org: 'Pháp Luật TP.HCM (on tuoitre.vn)', url: 'https://tuoitre.vn/plo/vi-sao-goi-mung-3-tet-thay-post512953.html', type: 'press', checked: today,
    used: 'The saying “mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy”: the father’s family on the first day, the mother’s on the second, teachers on the third; Prof. Nguyễn Minh Thuyết’s reading of it.',
    limits: 'A short feature (February 2019); it gives no history of the saying.' },
  { id: 'DBND-DILE', short: 'Đại biểu Nhân dân', title: 'Người dân Thủ đô nườm nượp đi lễ đầu năm — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Quốc Việt', url: 'https://daibieunhandan.vn/nguoi-dan-thu-do-nuom-nuop-di-le-dau-nam-10407133.html', type: 'press', checked: today,
    used: 'Crowds at Trấn Quốc pagoda and Ngọc Sơn temple on the first day of Tết 2026, praying for peace, and calligraphers writing characters at Ngọc Sơn.',
    limits: 'A news report (February 2026).' },
  { id: 'BVH-HOICHU', short: 'Báo Văn hóa', title: 'Tưng bừng khai Hội chữ Xuân Bính Ngọ 2026 — Báo Văn hóa', org: 'Báo Văn hóa (Ministry of Culture, Sports and Tourism)', url: 'https://baovanhoa.vn/van-hoa/tung-bung-khai-hoi-chu-xuan-binh-ngo-2026-204263.html', type: 'press', checked: today,
    used: 'The 2026 spring calligraphy festival by Văn Lake, 11 February to 1 March, 8:00–22:00, where people ask for characters for luck, learning and success.',
    limits: 'A news report (February 2026).' },

  { id: 'VT-HANGMA', used: 'That “mã” refers to paper goods made for offerings; families burning paper money on the 1st and 15th of the lunar month and adding paper houses and cars for death anniversaries and the seventh-month festival; the street’s stock following the calendar.',
    limits: 'A private travel website, not the national tourism authority despite its name; used only for general description.' },
  { id: 'DTI-VOTIVE', used: 'Votive paper burnt on Old Quarter streets such as Hàng Ngang, Hàng Đào, Hàng Buồm and Hàng Bông on the 15th day of the seventh lunar month, and concern about smoke, fire risk and waste.' },
  { id: 'TP-VULAN2026', short: 'Tiền Phong', title: 'Tránh nhầm lẫn Vu lan báo hiếu với xá tội vong nhân — Tiền Phong', org: 'Tiền Phong, by Ngọc Ánh', url: 'https://tienphong.vn/tranh-nham-lan-vu-lan-bao-hieu-voi-xa-toi-vong-nhan-post1871564.tpo', type: 'press', checked: today,
    used: 'The head of Hà Nội’s Buddhist Sangha explaining that Vu Lan, the Buddhist festival of filial gratitude, and offerings to wandering souls are entirely different rites, and that Vu Lan is not about lavish trays and burning paper money.',
    limits: 'An interview (August 2026).' },
  { id: 'TT-SANGHA2018', short: 'Tuổi Trẻ', title: 'Giáo hội Phật giáo Việt Nam đề nghị bỏ tục đốt vàng mã — Tuổi Trẻ', org: 'Tuổi Trẻ, by V.V. Tuân', url: 'https://tuoitre.vn/giao-hoi-phat-giao-viet-nam-de-nghi-bo-tuc-dot-vang-ma-20180222092809043.htm', type: 'press', checked: today,
    used: 'A 2018 letter of the Vietnam Buddhist Sangha asking clergy to guide people away from burning votive paper at Buddhist sites, and a senior monk’s statement that the Buddha never taught burning paper for ancestors.',
    limits: 'A news report (February 2018); the letter covers Buddhist sites, not homes.' },
  { id: 'TP-VULAN2024', short: 'Tiền Phong', title: 'Giáo hội yêu cầu không thu tiền mua lễ, đốt vàng mã dịp lễ Vu lan — Tiền Phong', org: 'Tiền Phong, by Ngọc Ánh', url: 'https://tienphong.vn/giao-hoi-yeu-cau-khong-thu-tien-mua-le-dot-vang-ma-dip-le-vu-lan-post1655330.tpo', type: 'press', checked: today,
    used: 'A 2024 Sangha notice asking pagodas not to burn votive paper at Vu Lan.',
    limits: 'A news report (July 2024).' },
  { id: 'LAW-110', short: 'Decree 110/2018/NĐ-CP', title: 'Nghị định 110/2018/NĐ-CP quy định về quản lý và tổ chức lễ hội', org: 'Government of Vietnam (text read on hethongphapluat.com)', url: 'https://hethongphapluat.com/nghi-dinh-110-2018-nd-cp-ve-quan-ly-va-to-chuc-le-hoi.html', type: 'law', checked: today,
    used: 'The duty of festival-goers to light incense and burn votive paper only in the places set aside for it.',
    limits: 'The decree (in force from October 2018), read in a legal database rather than the official gazette.' },
  { id: 'BVH-VANGMA2026', short: 'Báo Văn hóa', title: 'Đốt vàng mã, rải tiền lẻ ở nơi thờ tự: Khi tín ngưỡng bị “lệch chuẩn” — Báo Văn hóa', org: 'Báo Văn hóa (Ministry of Culture, Sports and Tourism)', url: 'https://baovanhoa.vn/doi-song/dot-vang-ma-rai-tien-le-o-noi-tho-tu-khi-tin-nguong-bi-lech-chuan-205961.html', type: 'press', checked: today,
    used: 'A Ministry of Culture letter of January 2026 asking localities to limit burning votive paper and scattering small notes outside the places set aside; the researcher Nguyễn Hùng Vĩ on the idea that the other world mirrors this one.',
    limits: 'A feature in the ministry’s own newspaper (February 2026).' },
  { id: 'TTR-HN2026', short: 'Thanh Tra', title: 'Hà Nội siết đốt vàng mã, hướng tới nếp sống văn minh — Thanh Tra', org: 'Thanh Tra, by Hải Hà', url: 'https://thanhtra.com.vn/van-hoa-the-thao-BE2162E3A/ha-noi-siet-dot-vang-ma-huong-toi-nep-song-van-minh-fd5a21b1c.html', type: 'press', checked: today,
    used: 'Hà Nội temples restricting votive paper in 2026: no paper in the main shrine at Quán Thánh, no burning in the main worship area at Kim Liên, a supervised burning place at Phủ Tây Hồ; the city also forbidding scattering rice or salt and sticking incense into trees.',
    limits: 'A news report (March 2026); gives no figures.' },
  { id: 'VOV-LINHDAM', short: 'VOV', title: 'Hà Nội: Cháy chung cư VP5 Linh Đàm do người dân đốt vàng mã — VOV', org: 'VOV, by Phi Long', url: 'https://vov.vn/xa-hoi/ha-noi-chay-chung-cu-vp5-linh-dam-do-nguoi-dan-dot-vang-ma-440525.vov', type: 'press', checked: today,
    used: 'A small fire in a Linh Đàm tower block in October 2015 after a resident dumped the ashes of burnt votive paper into a ventilation shaft; hundreds of households evacuated, no one hurt.',
    limits: 'A news report (October 2015).' },
  { id: 'TP-HUE2026', short: 'Tiền Phong', title: 'Từ vụ đốt vàng mã gây cháy rừng: Biến tướng chạy đua tâm linh — Tiền Phong', org: 'Tiền Phong, by Ngọc Ánh', url: 'https://tienphong.vn/tu-vu-dot-vang-ma-gay-chay-rung-bien-tuong-chay-dua-tam-linh-post1871827.tpo', type: 'press', checked: today,
    used: 'Cemetery fires in Huế on 26 August 2026, mostly from incense and votive paper, and a researcher of the Institute for Religious Studies on waste.',
    limits: 'A news report (August 2026); Tuổi Trẻ counted 13 fires, Tiền Phong more than 20.' },
  { id: 'VNB-VULAN2016', short: 'VnBusiness', title: 'Tháng Vu lan: Hàng mã, đồ chay, dịch vụ tâm linh đắt khách — VnBusiness', org: 'VnBusiness, by Thu Hường', url: 'https://vnbusiness.vn/thang-vu-lan-hang-ma-do-chay-dich-vu-tam-linh-dat-khach.html', type: 'press', checked: today,
    used: 'Prices in Hà Nội at Vu Lan 2016: paper clothes from 20,000 to 200,000 VND, paper villas and cars around 180,000–250,000 VND.',
    limits: 'A market report (August 2016); prices are old.' }
];

const claims = [
  { id: 'C-TET-PREP', kind: 'custom', status: 'published', sourceIds: ['VNAT-TET'], text: 'Families prepare for Tết by cooking New Year foods, cleaning their homes and paying respects to their ancestors, and flowering trees are set outside homes. On the first day children receive lucky money in a red envelope, called “mừng tuổi” in the north and “lì xì” in the south.' },
  { id: 'C-TET-GRAVES', kind: 'custom', status: 'published', sourceIds: ['VNN-TET', 'PLO-TAOMO'], text: 'In the last days of the lunar year, from the 23rd to the 30th, families visit and tidy their ancestors’ graves and invite them home to celebrate Tết.' },
  { id: 'C-TET-FIRST', kind: 'custom', status: 'published', sourceIds: ['VNA-XONGDAT'], text: 'The first visitor of the new year (xông đất) is believed to bear on the household’s fortune, so families often invite someone to come first, usually on the morning of the first day.' },
  { id: 'C-TET-FIRST-WHO', kind: 'custom', status: 'published', sourceIds: ['VNA-XONGDAT'], text: 'Families often choose the first visitor for a compatible age and a successful life; the guest brings small gifts and lucky money for the children. Some families send one of their own out before midnight to come back in first. Many now see the custom as a New Year pleasure more than a forecast.' },
  { id: 'C-TET-DATES', kind: 'custom', status: 'published', sourceIds: ['TP-TET2026', 'VNP-TET2027'], text: 'State employees had nine days off for Tết 2026, from 14 to 22 February; the first day of the year fell on 17 February. For Tết 2027 the holiday runs from 4 to 10 February.' },
  { id: 'C-TET-TAO', kind: 'legend', status: 'published', sourceIds: ['TCCT-TAO', 'VNN-TET'], text: 'On the 23rd of the last lunar month families send the Kitchen Gods, ông Công ông Táo, to heaven to report on the household, and release live carp to carry them. The folk tale behind them exists in several versions; by folk belief the offering should be made before noon.' },
  { id: 'C-TET-CARP', kind: 'custom', status: 'published', sourceIds: ['DBND-CACHEP', 'DBND-NILON'], text: 'On 10 February 2026 Hanoians released carp at West Lake and Nghĩa Đô park. The city set out bins for the plastic bags, police in Tây Hồ went door to door asking people not to throw bags and basins into the lake, and volunteers cleaned the water afterwards.' },
  { id: 'C-TET-DAO', kind: 'custom', status: 'published', sourceIds: ['DBND-DAO'], text: 'Nhật Tân’s peach growers, nearly 800 households on about 80 hectares along the Red River, supply much of the city’s Tết peach blossom: deep red đào bích and paler đào phai. In 2026 branches sold for 100,000 to 350,000 VND and trees for a million or more.' },
  { id: 'C-TET-HANGLUOC', kind: 'custom', status: 'published', sourceIds: ['BVH-HANGLUOC'], text: 'The Hàng Lược flower market in the Old Quarter, about a century old, runs from the middle of the last lunar month to the afternoon of the 30th, selling peach, kumquat, chrysanthemum, white apricot and narcissus.' },
  { id: 'C-TET-NGUQUA', kind: 'custom', status: 'published', sourceIds: ['BPL-NGUQUA'], text: 'In the north the five-fruit tray usually rests on a hand of green bananas, with a pomelo or Buddha’s hand in the middle and fruit of different colours around it. In the south the fruits are chosen to spell a wish, “cầu sung vừa đủ xài”. Families vary.' },
  { id: 'C-TET-BANHCHUNG', kind: 'custom', status: 'published', sourceIds: ['VNN-TET'], text: 'Bánh chưng, the square sticky-rice cake, is no longer a special treat, but many families still make it for Tết.' },
  { id: 'C-TET-GIAOTHUA', kind: 'custom', status: 'published', sourceIds: ['VNE-GIAOTHUA'], text: 'The New Year’s Eve offering sends off the old year’s guardian deity and welcomes the new one. It is made in the last hour before midnight, often at the main door, with sticky rice, a boiled chicken, betel, wine and flowers, and paper is burnt before one o’clock.' },
  { id: 'C-TET-PHAO', kind: 'law', status: 'published', sourceIds: ['LAW-137'], text: 'Exploding firecrackers are banned. Adults may use fireworks that do not explode, bought from licensed sellers, and cities such as Hà Nội may hold public displays of up to 15 minutes at New Year’s Eve.' },
  { id: 'C-TET-FIREWORKS', kind: 'custom', status: 'published', sourceIds: ['ZN-PHAOHOA'], text: 'For Tết 2026 Hà Nội set off fireworks at 33 places from midnight to 00:15, eleven of them high-altitude, at a cost of nearly 40 billion VND.' },
  { id: 'C-TET-LIXI', kind: 'custom', status: 'published', sourceIds: ['ND-LIXI'], text: 'The origin of the word lì xì is uncertain: one explanation makes it a borrowing meaning profit, another a legend from the Tang dynasty.' },
  { id: 'C-TET-MUNG3', kind: 'custom', status: 'published', sourceIds: ['PLO-MUNG3'], text: 'A saying sets out the first three days: the father’s family on the first, the mother’s on the second, teachers on the third.' },
  { id: 'C-TET-DILE', kind: 'custom', status: 'published', sourceIds: ['DBND-DILE', 'VNN-TET'], text: 'On the first day many Hanoians go to pagodas and temples such as Trấn Quốc and Ngọc Sơn to pray for peace in the year ahead.' },
  { id: 'C-TET-CHU', kind: 'custom', status: 'published', sourceIds: ['BVH-HOICHU', 'DBND-DILE'], text: 'Calligraphers write characters for the new year at Văn Miếu and Ngọc Sơn; in 2026 the spring festival by Văn Lake ran from 11 February to 1 March.' },
  { id: 'C-TET-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'If you are invited to a home on the first days, ask whether anyone has come yet before you call; some families wait for a chosen first visitor.' },

  { id: 'C-HANGMA', kind: 'custom', status: 'published', sourceIds: ['VT-HANGMA'], text: 'Hàng Mã in the Old Quarter sells paper offerings and paper decorations; “mã” refers to paper goods made for offerings, and families burn paper money for their ancestors, for example on the 1st and 15th of the lunar month.' },
  { id: 'C-HANGMA-SEASON', kind: 'custom', status: 'published', sourceIds: ['VT-HANGMA'], text: 'Besides paper money, families burn paper houses, clothes and cars for death anniversaries and the seventh-month festival, and the street’s stock follows the calendar: lanterns before the Mid-Autumn festival, red and gold before Tết.' },
  { id: 'C-VOTIVE-BURN', kind: 'custom', status: 'published', sourceIds: ['DTI-VOTIVE'], text: 'On the 15th day of the seventh lunar month many people in the Old Quarter burn votive paper in the street, which raises concern about smoke, fire risk and waste.' },
  { id: 'C-VULAN-TWO', kind: 'belief', status: 'published', sourceIds: ['TP-VULAN2026'], text: 'Two rites fall on the 15th of the seventh month: Vu Lan, the Buddhist festival of gratitude to parents, and offerings for wandering souls. The head of Hà Nội’s Buddhist Sangha calls them entirely different, and says Vu Lan is not about lavish trays or burning paper money.' },
  { id: 'C-SANGHA-VANGMA', kind: 'belief', status: 'published', sourceIds: ['TT-SANGHA2018', 'TP-VULAN2024'], text: 'In 2018 the Vietnam Buddhist Sangha asked its clergy to guide people away from burning votive paper at Buddhist sites; a senior monk said the Buddha never taught it. A 2024 notice asked pagodas not to burn it at Vu Lan.' },
  { id: 'C-LAW-110', kind: 'law', status: 'published', sourceIds: ['LAW-110'], text: 'The 2018 decree on festivals does not ban burning votive paper; it requires festival-goers to light incense and burn paper only in the places set aside for it.' },
  { id: 'C-VANGMA-2026', kind: 'custom', status: 'published', sourceIds: ['BVH-VANGMA2026'], text: 'In January 2026 the Ministry of Culture asked localities to limit burning votive paper and scattering small notes outside the places set aside. A researcher quoted by its newspaper traces the custom to the idea that the other world mirrors this one.' },
  { id: 'C-VANGMA-HN', kind: 'siteRule', status: 'published', sourceIds: ['TTR-HN2026'], text: 'Many Hà Nội temples now limit paper offerings: Quán Thánh asks visitors not to bring them into the main shrine, Kim Liên does not allow burning in its main worship area, and Phủ Tây Hồ has a supervised burning place. The city also forbids scattering rice or salt and sticking incense into trees.' },
  { id: 'C-VANGMA-FIRE', kind: 'safety', status: 'published', sourceIds: ['VOV-LINHDAM', 'TP-HUE2026'], text: 'Burning paper causes fires: in 2015 ashes dumped down a ventilation shaft set off a small fire in a Linh Đàm tower block, and in August 2026 incense and paper set off cemetery fires in Huế.' },
  { id: 'C-VANGMA-COST', kind: 'custom', status: 'published', sourceIds: ['VNB-VULAN2016'], text: 'In Hà Nội at Vu Lan 2016 a set of paper clothes cost 20,000 to 200,000 VND and a paper villa or car around 180,000 to 250,000 VND.' },
  { id: 'C-VANGMA-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'If you join a family’s offering, follow their lead: hand over what you are given, step back from the fire, and do not photograph the burning without asking.' }
];

const glossary = [
  { id: 'ong-tao', vi: 'ông Công ông Táo', say: 'ong cong ong tao', en: 'The Kitchen Gods, who watch over the household and report to heaven on the 23rd of the last lunar month.' },
  { id: 'giao-thua', vi: 'giao thừa', say: 'zao twa', en: 'The moment the old year passes to the new: midnight on New Year’s Eve.' },
  { id: 'vang-ma', vi: 'vàng mã', say: 'vang ma', en: 'Votive paper: paper money and paper copies of goods, burnt as offerings to ancestors and spirits.' }
];

const tet = {
  id: 'st-tet',
  layout: 'timeline',
  title: 'Tết, the Lunar New Year',
  dek: 'Kitchen Gods on carp, peach blossom on motorbikes, and a city that falls quiet for a week. Tết in Hà Nội, day by day, from the 23rd of the last month to the third day of the new year.',
  place: 'Hà Nội',
  imageId: 'ev-oq-flowers',
  hero: { image: 'oq-flower-night' },
  appliesTo: 'Tết in Hà Nội, with dates from 2026. Customs follow Vietnamese press and the national tourism authority; families keep them in their own ways.',
  varies: 'Dates move with the lunar calendar. Customs differ between north and south and between families, and folk explanations differ too.',
  sections: [
    { text: 'Families prepare for Tết by cooking, cleaning and paying respects to their ancestors.', claimIds: ['C-TET-PREP'] },
    { heading: 'The graves', text: 'In the last days of the year families visit their ancestors’ graves and invite them home.', claimIds: ['C-TET-GRAVES'] },
    { heading: 'The first visitor', text: 'The first visitor of the new year is believed to bear on the household’s fortune.', claimIds: ['C-TET-FIRST'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'For a week or so each winter, Hà Nội changes. The flower markets fill the Old Quarter with peach branches and kumquat trees; families clean their homes, cook, and tidy their ancestors’ graves. Then the year turns at midnight, and the visiting begins.', claimIds: ['C-TET-PREP', 'C-TET-HANGLUOC', 'C-TET-GRAVES'] },
      { text: 'Tết Nguyên Đán, the Lunar New Year, is the biggest holiday in Vietnam. In 2026 state employees had nine days off, from 14 to 22 February; the year began on 17 February. Here is how the days run in Hà Nội, from the send-off of the Kitchen Gods to the third day of the year.', claimIds: ['C-TET-DATES'] }
    ] },
    { type: 'facts', title: 'Tết in brief', items: [
      { term: 'Tết 2026', text: 'First day 17 February; holiday 14–22 February.' },
      { term: 'Tết 2027', text: 'Holiday 4–10 February.' },
      { term: 'Flowers', text: 'Peach in the north, from Nhật Tân.' },
      { term: 'Fireworks', text: 'Public displays at midnight; firecrackers banned.' }
    ], claimIds: ['C-TET-DATES', 'C-TET-DAO', 'C-TET-PHAO'] },

    { type: 'timeline', heading: 'The days of Tết', label: 'Timeline of Tết in Hà Nội', items: [
      { era: 'The last month' },
      { year: 'Mid-month', title: 'The flower market opens', text: 'Hàng Lược fills with peach, kumquat and white apricot until the afternoon of the 30th.', claimIds: ['C-TET-HANGLUOC'], image: 'ev-oq-flowers', caption: 'A flower seller in the Old Quarter.' },
      { year: '23rd', title: 'The Kitchen Gods leave', text: 'Families make offerings, by folk belief before noon, and release carp at the lakes.', claimIds: ['C-TET-TAO', 'C-TET-CARP'] },
      { year: '23rd–30th', title: 'The graves', text: 'Families tidy their ancestors’ graves and invite them home for Tết.', claimIds: ['C-TET-GRAVES'] },
      { year: '24th', title: 'Calligraphy', text: 'In 2026 the spring calligraphy festival opens by Văn Lake.', claimIds: ['C-TET-CHU'] },
      { year: '27th', title: 'The holiday begins', text: 'In 2026, offices close on 14 February.', claimIds: ['C-TET-DATES'] },
      { year: '30th', title: 'New Year’s Eve', text: 'In the last hour before midnight, an offering to see out the old year’s guardian deity.', claimIds: ['C-TET-GIAOTHUA'], image: 'ev-home-altar', caption: 'A home altar ready for Tết.' },
      { era: 'The new year' },
      { year: 'Midnight', title: 'Fireworks', text: 'Fifteen minutes of fireworks over the city.', claimIds: ['C-TET-FIREWORKS', 'C-TET-PHAO'] },
      { year: '1st', title: 'The first visitor', text: 'A chosen guest comes first; children receive lucky money; the father’s family is visited.', claimIds: ['C-TET-FIRST', 'C-TET-PREP', 'C-TET-MUNG3'] },
      { year: '1st', title: 'To the pagoda', text: 'Crowds at Trấn Quốc and Ngọc Sơn pray for a peaceful year.', claimIds: ['C-TET-DILE'] },
      { year: '2nd', title: 'The mother’s family', text: 'Visits to the mother’s side of the family.', claimIds: ['C-TET-MUNG3'] },
      { year: '3rd', title: 'Teachers', text: 'Visits to teachers.', claimIds: ['C-TET-MUNG3'] },
      { year: '6th', title: 'Back to work', text: 'In 2026, the holiday ends on 22 February.', claimIds: ['C-TET-DATES'] }
    ] },

    { type: 'text', heading: 'The 23rd: sending the Kitchen Gods', id: 'tao', paras: [
      { text: 'Tết starts a week early, on the 23rd day of the last lunar month, with the [[ong-tao|Kitchen Gods]]. In the folk tale, two men and a woman who died in a fire became the gods of the hearth; the story has been passed on by word of mouth and exists in several versions. Each year they go up to heaven to report on the household, and families send them off with an offering, by folk belief before noon.', claimIds: ['C-TET-TAO'] },
      { text: 'They travel on carp. Families buy live fish and release them into a lake or river. On 10 February 2026 Hanoians lined the bridges of West Lake and the lake in Nghĩa Đô park to do it. The custom has a problem: people used to throw the plastic bags and basins in after the fish. Before the 2026 festival police in Tây Hồ went door to door asking them not to; bins were set out by the bridges, and volunteers cleaned the water afterwards.', claimIds: ['C-TET-TAO', 'C-TET-CARP'] }
    ] },

    { type: 'text', heading: 'Peach blossom and the flower market', id: 'flowers', paras: [
      { text: 'In Hà Nội the Tết flower is peach. Much of it comes from Nhật Tân, where nearly 800 households grow peach on about 80 hectares, mostly on the banks of the Red River. There are two kinds: đào bích, deep red and dense, and đào phai, a paler pink. In 2026 a branch cost from 100,000 to 350,000 đồng, a tree a million or more, and storms had cut the supply.', claimIds: ['C-TET-DAO'] },
      { text: 'In the Old Quarter the flowers are sold on Hàng Lược, a market about a century old that runs from the middle of the last month to the afternoon of the 30th: peach, kumquat trees, chrysanthemums, narcissus, and the white apricot that, the Ministry of Culture’s newspaper says, Hanoians have always loved.', claimIds: ['C-TET-HANGLUOC'] }
    ] },
    { type: 'figure', image: 'oq-flower-night', size: 'wide', caption: 'Flower sellers at dusk in the Old Quarter.' },

    { type: 'text', heading: 'The altar and the five fruits', id: 'altar', paras: [
      { text: 'Between the 23rd and the 30th families visit their ancestors’ graves, clean them, light incense and leave flowers, fruit, paper money and sometimes a small kumquat tree. They are inviting the ancestors home. For many Hà Nội families that means a trip to the big cemeteries such as Văn Điển.', claimIds: ['C-TET-GRAVES'] },
      { text: 'At home the altar is cleaned and set with a tray of five fruits. In the north the tray usually rests on a hand of green bananas, with a pomelo or a Buddha’s hand in the middle and fruit of different colours around it. In the south the fruits are chosen to make a wish out of their names: custard apple, fig, coconut, papaya and mango sound like “cầu sung vừa đủ xài”, may we have just enough to spend. These explanations come from popular writing; every family arranges its own tray.', claimIds: ['C-TET-NGUQUA'] },
      { text: 'And there is food. Bánh chưng, the square sticky-rice cake wrapped in leaves, is no longer the rare treat it once was, but many families still make it, because Tết does not feel like Tết without it.', claimIds: ['C-TET-BANHCHUNG'] }
    ] },
    { type: 'note', text: 'Folk explanations for Tết customs, from the Kitchen Gods to the five fruits, differ between sources and families. We give them as explanations people offer, not as history.', claimIds: ['C-TET-TAO', 'C-TET-NGUQUA'] },

    { type: 'text', heading: 'New Year’s Eve', id: 'eve', paras: [
      { text: 'On the night of the 30th, in the last hour before [[giao-thua|giao thừa]], families make one more offering, often at the main door: sticky rice, a boiled chicken, betel, wine, flowers. According to the cultural researcher Phạm Đình Hải, it sees off the old year’s guardian deity and welcomes the new one. The paper offerings are burnt before one o’clock.', claimIds: ['C-TET-GIAOTHUA'] },
      { text: 'At midnight the sky fills with fireworks. Exploding firecrackers are banned in Vietnam; adults may use quiet fireworks bought from licensed sellers, and cities may put on public displays of up to fifteen minutes. In 2026 Hà Nội fired them from 33 places, eleven of them high-altitude, at a cost of nearly 40 billion đồng.', claimIds: ['C-TET-PHAO', 'C-TET-FIREWORKS'] }
    ] },

    { type: 'text', heading: 'The first day', id: 'first', paras: [
      { text: 'The first visitor of the year matters. In the custom of xông đất, the first person through the door is believed to bear on the household’s fortune for the year, so families often invite someone in advance: a person of a compatible age and a successful life, who arrives on the morning of the first day with small gifts and lucky money for the children. Some families send one of their own out before midnight so that they can be the first to come back in. Many people now treat it more as a pleasure of the New Year than a forecast.', claimIds: ['C-TET-FIRST', 'C-TET-FIRST-WHO'] },
      { text: 'Children receive lucky money in red envelopes, called mừng tuổi in the north and lì xì in the south. Where the word lì xì comes from is uncertain; one explanation makes it a borrowing meaning profit, another a legend of the Tang dynasty.', claimIds: ['C-TET-PREP', 'C-TET-LIXI'] },
      { text: 'A saying sets the order of visits: *mùng 1 Tết cha, mùng 2 Tết mẹ, mùng 3 Tết thầy*. The first day for the father’s family, the second for the mother’s, the third for teachers.', claimIds: ['C-TET-MUNG3'] }
    ] },
    { type: 'quote', text: 'Mùng một Tết cha, mùng hai Tết mẹ, mùng ba Tết thầy.', by: 'A Vietnamese saying: the first day for the father’s family, the second for the mother’s, the third for teachers', claimIds: ['C-TET-MUNG3'] },

    { type: 'text', heading: 'Pagodas and calligraphy', id: 'pagodas', paras: [
      { text: 'Many Hanoians begin the year at a pagoda or temple. On the first day of 2026 crowds filled Trấn Quốc on West Lake and Ngọc Sơn on Hoàn Kiếm Lake to pray for a peaceful year; a reporter noted that, crowded as it was, everyone was quiet.', claimIds: ['C-TET-DILE'] },
      { text: 'Others ask for a character. Calligraphers sit at Ngọc Sơn and, every spring, by Văn Lake at Văn Miếu, writing characters for luck, learning and success on red paper. In 2026 the calligraphy festival ran from 11 February to 1 March. Our story on [Văn Miếu](story:st-van-mieu-university) tells more.', claimIds: ['C-TET-CHU'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-home-altar', caption: 'A family altar with fruit, flowers and incense.' },
      { image: 'ev-oq-flowers', caption: 'Flowers for the new year.' }
    ] },

    { type: 'text', heading: 'If you are in Hà Nội for Tết', id: 'visit', paras: [
      { text: 'If you are invited to a home on the first days, ask whether anyone has come yet before you call; some families wait for a chosen first visitor. A first visitor usually brings small gifts, and lucky money for the children.', claimIds: ['C-TET-TIP', 'C-TET-FIRST-WHO'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: '23rd', text: 'Kitchen Gods leave on carp.' },
      { term: '30th', text: 'New Year’s Eve offering, then fireworks.' },
      { term: '1st', text: 'First visitor, lucky money, the pagoda.' },
      { term: 'Greeting', text: 'Chúc mừng năm mới, Happy New Year.' }
    ] },
    { type: 'quiz', image: 'oq-flower-night', question: 'The first caller', prompt: 'You are invited to a friend’s family on the first morning of Tết. What is the thoughtful thing to do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Arrive as early as possible to be first', feedback: 'Not without asking: some families have chosen a first visitor in advance.' },
      { label: 'Ask first whether they want you to be the first visitor', fit: true, feedback: 'Yes. The first visitor is thought to bear on the year, so families like to choose.' },
      { label: 'Wait until the third day', feedback: 'The third day is traditionally for teachers; just ask your friend.' }
    ] }
  ]
};

const offerings = {
  id: 'st-paper-offerings',
  layout: 'compare',
  title: 'Paper offerings on Hàng Mã',
  dek: 'Paper money, paper houses, paper cars: a street that sells gifts for the dead, the smoke on festival days, and the monks and officials who would like a little less of it.',
  place: 'Hàng Mã, Hà Nội',
  imageId: 'img-hangma',
  hero: { image: 'oq-hang-ma' },
  appliesTo: 'Hàng Mã street, the Old Quarter and Hà Nội’s temples, with national rules and Buddhist guidance.',
  varies: 'Some families burn a great deal, others very little or none. Temples set their own rules.',
  sections: [
    { text: 'Hàng Mã in the Old Quarter sells paper offerings and paper decorations.', claimIds: ['C-HANGMA'] },
    { heading: 'Burning', text: 'On the 15th day of the seventh lunar month many people burn votive paper in the street.', claimIds: ['C-VOTIVE-BURN'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Walk up Hàng Mã a few weeks before a festival and the street turns red and gold. *Mã* means paper goods made as offerings: [[vang-ma|vàng mã]], paper money, paper clothes, paper houses, even paper cars and phones. Families burn them so that their ancestors, and the wandering souls who have no one, will have what they need in the other world.', claimIds: ['C-HANGMA', 'C-HANGMA-SEASON'] },
      { text: 'It is an old and widespread custom, and an argued one. Buddhist leaders say it has nothing to do with Buddhism; the state asks people to burn only where it is safe; temples are cutting back. This story sets out what the custom is and who says what about it.', claimIds: ['C-SANGHA-VANGMA', 'C-LAW-110', 'C-VANGMA-HN'] }
    ] },
    { type: 'facts', title: 'Paper offerings in brief', items: [
      { term: 'What', text: 'Paper money and paper copies of goods, burnt for the dead.' },
      { term: 'When', text: 'The 1st and 15th of the lunar month, death anniversaries, Tết, the seventh month.' },
      { term: 'The law', text: 'Burn only in the places set aside.' },
      { term: 'Buddhist view', text: 'Not part of Buddhist teaching.' }
    ], claimIds: ['C-HANGMA', 'C-HANGMA-SEASON', 'C-LAW-110', 'C-SANGHA-VANGMA'] },

    { type: 'text', heading: 'A street that follows the calendar', id: 'street', paras: [
      { text: 'Hàng Mã’s stock changes with the lunar year. Families burn paper money for their ancestors on the 1st and 15th of each month; for a death anniversary or the seventh-month festival they add paper houses, clothes and cars. Before the Mid-Autumn festival the street fills with lanterns; before Tết it turns red and gold.', claimIds: ['C-HANGMA', 'C-HANGMA-SEASON'] },
      { text: 'It is not expensive by the piece. At Vu Lan in 2016 a set of paper clothes cost between 20,000 and 200,000 đồng in Hà Nội, and a paper villa or car about 180,000 to 250,000. The cost lies in the quantity some families burn.', claimIds: ['C-VANGMA-COST'] }
    ] },
    { type: 'figure', image: 'img-hangma', size: 'wide', caption: 'Hàng Mã street in the Old Quarter.' },

    { type: 'text', heading: 'The seventh month', id: 'seventh', paras: [
      { text: 'The biggest day for burning is the 15th of the seventh lunar month. On that evening the pavements of Old Quarter streets such as Hàng Ngang, Hàng Đào, Hàng Buồm and Hàng Bông fill with small fires, and the smoke, the fire risk and the ash worry the city.', claimIds: ['C-VOTIVE-BURN'] },
      { text: 'Two different rites fall on that day, and they are often confused. Vu Lan is a Buddhist festival of gratitude to parents. The offering for wandering souls, *cúng cô hồn*, is for wandering souls. The head of Hà Nội’s Buddhist Sangha, interviewed in 2026, called them entirely different, and said the point of Vu Lan is not lavish trays or burning paper money.', claimIds: ['C-VULAN-TWO'] }
    ] },

    { type: 'tabs', heading: 'Who says what', id: 'views', intro: 'Choose a tab to see what Buddhist leaders, the national rules and Hà Nội’s temples say about burning paper.', label: 'Views on paper offerings', tabs: [
      { label: 'Buddhist leaders', columns: ['Who', 'What they say'], rows: [
        ['Vietnam Buddhist Sangha, 2018', { text: 'Clergy should guide people away from burning votive paper at Buddhist sites.', claimIds: ['C-SANGHA-VANGMA'] }],
        ['A senior monk, 2018', { text: 'The Buddha never taught burning paper for ancestors.', claimIds: ['C-SANGHA-VANGMA'] }],
        ['Sangha notice, 2024', { text: 'Pagodas should not burn votive paper at Vu Lan.', claimIds: ['C-SANGHA-VANGMA'] }],
        ['Hà Nội Sangha, 2026', { text: 'Vu Lan is not about lavish trays or burning paper money.', claimIds: ['C-VULAN-TWO'] }]
      ] },
      { label: 'The rules', columns: ['Text', 'What it says'], rows: [
        ['Decree 110/2018 on festivals', { text: 'Festival-goers must burn incense and paper only in the places set aside. It does not ban burning.', claimIds: ['C-LAW-110'] }],
        ['Ministry of Culture, January 2026', { text: 'Localities should limit burning and scattering small notes outside the places set aside.', claimIds: ['C-VANGMA-2026'] }]
      ] },
      { label: 'Hà Nội temples', columns: ['Place', 'What it does'], rows: [
        ['Quán Thánh temple', { text: 'Asks visitors not to bring paper offerings into the main shrine.', claimIds: ['C-VANGMA-HN'] }],
        ['Kim Liên temple', { text: 'No burning in the main worship area.', claimIds: ['C-VANGMA-HN'] }],
        ['Phủ Tây Hồ', { text: 'A supervised place for burning.', claimIds: ['C-VANGMA-HN'] }],
        ['City-wide', { text: 'No scattering rice or salt, no incense stuck into trees.', claimIds: ['C-VANGMA-HN'] }]
      ] }
    ] },

    { type: 'text', heading: 'Why people burn', id: 'why', paras: [
      { text: 'Behind the custom is an old idea, *trần sao âm vậy*: as in this world, so in the other. The dead are thought to need money, clothes and a house, as the living do, and the family that provides them is keeping faith with its ancestors. The researcher Nguyễn Hùng Vĩ, quoted in the Ministry of Culture’s newspaper, traces the burning to that idea.', claimIds: ['C-VANGMA-2026'] },
      { text: 'Buddhism does not share it. In 2018 the Vietnam Buddhist Sangha asked its clergy to guide people away from burning paper at Buddhist sites, and a senior monk said plainly that the Buddha never taught it. The letter is about pagodas, not homes; at home, families decide for themselves.', claimIds: ['C-SANGHA-VANGMA'] }
    ] },

    { type: 'text', heading: 'Smoke and fire', id: 'fire', paras: [
      { text: 'Fire is the practical worry. In October 2015 a resident of a tower block in Linh Đàm dumped the ashes of burnt paper into a ventilation shaft and set off a small fire; hundreds of households were evacuated, though no one was hurt. In August 2026, at Vu Lan, incense and paper set off a string of cemetery fires in Huế; reports counted between 13 and more than 20.', claimIds: ['C-VANGMA-FIRE'] },
      { text: 'That is why the rules talk about place rather than belief: burn where it is safe, in the burners that temples and buildings set aside.', claimIds: ['C-LAW-110'] }
    ] },
    { type: 'note', text: 'Reports differ on the number of fires in Huế in August 2026: Tuổi Trẻ counted 13, Tiền Phong more than 20.', claimIds: ['C-VANGMA-FIRE'] },

    { type: 'text', heading: 'The temples cut back', id: 'temples', paras: [
      { text: 'In the 2026 festival season Hà Nội’s temples were noticeably stricter. Quán Thánh asked visitors not to bring paper offerings into the main shrine; Kim Liên stopped burning in its main worship area and played reminders over loudspeakers; Phủ Tây Hồ set up a supervised burning place. The city also banned scattering rice or salt and sticking incense into trees. At Kim Liên, the heavy smoke of earlier years has clearly fallen.', claimIds: ['C-VANGMA-HN'] }
    ] },

    { type: 'dodont', heading: 'If you are with a family', do: { title: 'Usually welcome', items: [
      { text: 'Following the family’s lead at an offering.', claimIds: ['C-VANGMA-TIP'] },
      { text: 'Burning only in the burner provided.', claimIds: ['C-LAW-110'] },
      { text: 'Stepping back from the fire.', claimIds: ['C-VANGMA-FIRE'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Photographing a family’s offering without asking.', claimIds: ['C-VANGMA-TIP'] },
      { text: 'Taking paper offerings into a temple’s main shrine.', claimIds: ['C-VANGMA-HN'] },
      { text: 'Scattering small notes or rice at a temple.', claimIds: ['C-VANGMA-HN'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Mã', text: 'Paper goods made as offerings.' },
      { term: 'Biggest day', text: '15th of the seventh lunar month.' },
      { term: 'Rule', text: 'Burn only where it is set aside.' },
      { term: 'Temples', text: 'Many now limit paper offerings.' }
    ] },
    { type: 'quiz', image: 'img-hangma', question: 'Is it banned?', prompt: 'A friend says burning votive paper is now illegal in Vietnam. Is that right?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Yes, everywhere since 2018', feedback: 'No. The 2018 decree on festivals regulates where people burn; it does not ban it.' },
      { label: 'No, but it should be done only in the places set aside', fit: true, feedback: 'Yes. And many temples now limit it further.' },
      { label: 'It is required at every festival', feedback: 'No. It is a family custom, and Buddhist leaders discourage it at pagodas.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [tet, offerings] };
