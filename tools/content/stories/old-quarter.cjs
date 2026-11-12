/* Story: the Old Quarter's trade streets (st-old-quarter). Layout: longform.
   Researched 12 Nov 2026. Every factual paragraph points at claims; claims point at sources read that day.
   Where sources disagree (the gate's rebuilding, the origin of its name) the text says so. */
const today = '2026-11-12';

const sources = [
  { id: 'VNAT-OLDQ', short: 'Vietnam National Authority of Tourism', title: 'Explore the Old Quarter your way — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/explore-old-quarter-your-way', type: 'official', checked: today,
    used: 'The 36 guild streets named after trades that supplied the court at the Thăng Long citadel; few streets still sell their goods; Hàng Bạc, Hàng Mã, Hàng Gai and Lãn Ông today; tube houses; Ô Quan Chưởng as the last gate, built 1749 and rebuilt 1817; Chinese merchant families; the weekend walking streets.',
    limits: 'A visitor guide with no date or references. It gives the “pink dye” name to Hàng Gai, which belongs to Hàng Đào, so we do not use that line.' },
  { id: 'HN-QD6398', short: 'Hà Nội People’s Committee', title: 'Decision 6398/QĐ-UBND (24 October 2013): planning and architecture regulation for the Hà Nội Old Quarter', org: 'Hà Nội People’s Committee (via hethongphapluat.com)', url: 'https://hethongphapluat.com/quyet-dinh-6398-qd-ubnd-nam-2013-ve-quy-che-quan-ly-quy-hoach-kien-truc-khu-pho-co-ha-noi.html', type: 'official', checked: today,
    used: 'The Old Quarter’s official extent (about 82 ha, 10 wards, 79 streets) and boundary streets; the 2004 national heritage listing it cites; the rules to keep tube houses, inner courtyards, pre-1954 buildings and tiled roofs, and to allow no large shopping centres.',
    limits: 'A legal text, read on a third-party legal database whose later articles were only partly visible. Ward names changed after the 2025 reorganisation of Hà Nội’s wards.' },
  { id: 'ND-OQC', short: 'Nhân Dân', title: 'Ô Quan Chưởng – cửa ô duy nhất còn lại của Hà Nội — Nhân Dân', org: 'Nhân Dân (newspaper)', url: 'https://nhandan.vn/cua-o-duy-nhat-con-lai-cua-ha-noi-post837255.html', type: 'press', checked: today,
    used: 'Ô Quan Chưởng built in 1749 as Đông Hà Môn; 21 gates in early-nineteenth-century records and 16 in 1831; the name linked to a Chưởng cơ who fought the French in 1873; its two storeys, three arches and old wooden doors; Hàng Chiếu, the mat street, beside it.',
    limits: 'A weekend feature in Vietnamese (October 2024); it does not date the later repairs.' },
  { id: 'VNE-CUAO', short: 'VnExpress', title: 'Hà Nội từng có 21 cửa ô — VnExpress', org: 'VnExpress (newspaper), by Nguyễn Trương Quý', url: 'https://vnexpress.net/ha-noi-tung-co-21-cua-o-3518674.html', type: 'press', checked: today,
    used: 'The wall rebuilt under Lord Trịnh Doanh in 1749; old geographies counting 21 gates, maps showing 15 or 16; the 1881 stele of Governor Hoàng Diệu on the gate; André Masson’s account that the gate was saved from demolition in 1906 by the École française d’Extrême-Orient.',
    limits: 'A feature in Vietnamese (December 2016) by a writer on Hà Nội, citing old books and maps rather than giving references.' },
  { id: 'VTC-OQC', short: 'VTC News', title: 'Tên gọi Ô Quan Chưởng có ý nghĩa gì? — VTC News', org: 'VTC News', url: 'https://vtcnews.vn/ten-goi-o-quan-chuong-co-y-nghia-gi-ar1033049.html', type: 'press', checked: today,
    used: 'Three explanations of the gate’s name; repairs in 1785 and rebuilding in 1804; the characters Đông Hà Môn above the arch; the local story of residents refusing to sign for its demolition; its listing as a historical and cultural relic in 1994.',
    limits: 'A short explainer in Vietnamese (August 2026). Its rebuilding dates differ from the tourism authority’s 1817.' },
  { id: 'VGP-HANGBAC', short: 'Viet Nam Government Portal', title: 'Hàng Bạc Street — Viet Nam Government Portal, Hà Nội Capital', org: 'Viet Nam Government Portal (thanglong.chinhphu.vn), by Carol Howland', url: 'https://hanoicapital.chinhphu.vn/hang-bac-street-110165.htm', type: 'official', checked: today,
    used: 'Hàng Bạc as a centre of gold, silver and money exchange for centuries; the silver-ingot workshop set up at No. 58 by Lưu Xuân Tín under Lê Thánh Tông; the two communal houses of the silversmiths.',
    limits: 'A feature written in 2010 for the government’s English-language Hà Nội pages; some Vietnamese names are misspelt in it.' },
  { id: 'VNP-CHAUKHE', short: 'VietnamPlus', title: 'Giữ lửa nghề truyền thống ở làng chế tác vàng bạc 500 năm tuổi ở Hải Dương — VietnamPlus', org: 'VietnamPlus (Vietnam News Agency)', url: 'https://www.vietnamplus.vn/giu-lua-nghe-truyen-thong-o-lang-che-tac-vang-bac-500-nam-tuoi-o-hai-duong-post921035.vnp', type: 'press', checked: today,
    used: 'Châu Khê, the silversmith village whose people founded Hàng Bạc; Lưu Xuân Tín casting silver ingots for the capital under Lê Thánh Tông (1460–1497); the ingot work later moving to Huế while the craftsmen stayed as jewellers; craftsmen from Định Công and Đồng Xâm joining them.',
    limits: 'A news feature (January 2024) that retells the village’s history as recorded tradition, without references.' },
  { id: 'ND-KIMNGAN', short: 'Nhân Dân', title: 'Đình Kim Ngân đón Bằng Di tích quốc gia — Nhân Dân', org: 'Nhân Dân (newspaper)', url: 'https://nhandan.vn/dinh-kim-ngan-don-bang-di-tich-quoc-gia-post570689.html', type: 'press', checked: today,
    used: 'Kim Ngân communal house on Hàng Bạc, built by people from Châu Khê, honouring the founder of the hundred crafts; its ranking as a national relic in October 2012.',
    limits: 'A short news report (March 2013).' },
  { id: 'VOV-KIMNGAN', short: 'VOV', title: 'Không gian kể chuyện đình Kim Ngân: Đánh thức ký ức phường nghề phố cổ Hà Nội — VOV', org: 'Voice of Vietnam (VOV)', url: 'https://vov.vn/van-hoa/khong-gian-ke-chuyen-dinh-kim-ngan-danh-thuc-ky-uc-phuong-nghe-pho-co-ha-noi-post1248073.vov', type: 'press', checked: today,
    used: 'The storytelling exhibition at Kim Ngân communal house in 2025, with demonstrations of silver-leaf work and repoussé, run by the Hoàn Kiếm Lake and Old Quarter Management Board.',
    limits: 'News of a temporary exhibition (November–December 2025).' },
  { id: 'ND-BACHMA', short: 'Nhân Dân', title: 'Quận Hoàn Kiếm đón bằng công nhận Di tích quốc gia đặc biệt đền Bạch Mã — Nhân Dân', org: 'Nhân Dân (newspaper)', url: 'https://nhandan.vn/quan-hoan-kiem-don-bang-cong-nhan-di-tich-quoc-gia-dac-biet-den-bach-ma-post701817.html', type: 'press', checked: today,
    used: 'Bạch Mã temple as the eastern of the four guardian temples of Thăng Long, worshipping the god Long Đỗ; the white-horse legend, told as legend; its festival on the 12th and 13th of the second lunar month; the 2022 special national relic ranking (Decision 93/QĐ-TTg).',
    limits: 'A report of the ranking ceremony (June 2022).' },
  { id: 'DBND-BACHMA', short: 'Đại biểu Nhân dân', title: 'Thăm đền Bạch Mã: Theo dấu ngựa trắng dựng thành Thăng Long — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân (newspaper of the National Assembly)', url: 'https://daibieunhandan.vn/tham-den-bach-ma-theo-dau-ngua-trang-dung-thanh-thang-long-10407086.html', type: 'press', checked: today,
    used: 'The white-horse legend as recorded in the fourteenth-century Việt điện u linh tập, according to Prof. Đinh Khắc Thuân; the temple’s nineteenth-century Nguyễn architecture; its 17 steles and 21 royal decrees; its 1986 national listing.',
    limits: 'A feature (February 2026) quoting historians; the founding date it gives rests on legend.' },
  { id: 'VNS-ARCH', short: 'Việt Nam News', title: 'History through Hà Nội’s architecture — Việt Nam News', org: 'Việt Nam News (Vietnam News Agency)', url: 'https://vietnamnews.vn/sunday/features/427187/history-through-ha-noi-s-architecture.html', type: 'press', checked: today,
    used: 'Đồng Xuân market built by the French in 1889, with a double iron roof for ventilation; the 1886 municipal council meant to make Hà Nội a “European city”; the city of citadel, Old Quarter and countryside before colonial rule; tube houses kept beside French villas.',
    limits: 'A feature (May 2018) quoting architects, without references.' },
  { id: 'COMMONS-SALLES', short: 'Wikimedia Commons', title: 'Rue des Changeurs, Hanoi (André Salles, 1896) — Wikimedia Commons', org: 'Wikimedia Commons (scan of a photograph by André Salles)', url: 'https://commons.wikimedia.org/wiki/File%3AHanoi_-_Rue_des_Changeurs_(1896).jpg', type: 'archive', checked: today,
    used: 'That the French called Hàng Bạc “rue des Changeurs” (money changers’ street) in the 1890s, as the photograph’s title records.',
    limits: 'An archive photograph and its title, not a history.' },
  { id: 'WIKT-HANG', short: 'Wiktionary', title: 'hàng — Wiktionary', org: 'Wiktionary (dictionary)', url: 'https://en.wiktionary.org/wiki/h%C3%A0ng', type: 'reference', checked: today,
    used: 'The meaning of “hàng”: goods, wares, merchandise (also a row or line).',
    limits: 'A community dictionary, used only for the everyday meaning of the word.' }
];

const claims = [
  { id: 'C-OQ-GUILDS', kind: 'history', status: 'published', sourceIds: ['VNAT-OLDQ'], text: 'The Old Quarter is known as the 36 guild streets, named after trades and crafts that settled north of Hoàn Kiếm Lake and supplied the royal court at the nearby Thăng Long citadel. Only a few streets still sell what their names describe.' },
  { id: 'C-OQ-HANG', kind: 'custom', status: 'published', sourceIds: ['WIKT-HANG', 'VNAT-OLDQ'], text: '“Hàng” means goods or wares, so in a street name it is followed by the thing the street sold.' },
  { id: 'C-OQ-EXAMPLES', kind: 'custom', status: 'published', sourceIds: ['VNAT-OLDQ'], text: 'Hàng Bạc silversmiths made money and jewellery for the palace and the street still has jewellers and money changers; Lãn Ông is a street of traditional medicine and herbs; Hàng Mã sells religious goods and festival decorations; Hàng Gai now sells fabrics and made-to-measure clothes.' },
  { id: 'C-OQ-TUBE', kind: 'history', status: 'published', sourceIds: ['VNAT-OLDQ'], text: 'The quarter’s tube houses have narrow fronts but are built deep and high, with several courtyards to let light in. Ô Quan Chưởng is the only gate left of the wall that protected the area.' },
  { id: 'C-OQ-AREA', kind: 'history', status: 'published', sourceIds: ['HN-QD6398'], text: 'Hà Nội’s 2013 regulation defines the Old Quarter as about 82 hectares with 10 wards and 79 streets, bounded by Phan Đình Phùng and Hàng Đậu to the north, Trần Nhật Duật and Trần Quang Khải to the east, Phùng Hưng to the west, and Hàng Thùng, Cầu Gỗ, Hàng Gai and Hàng Bông to the south. It cites the quarter’s 2004 listing as a national historic site.' },
  { id: 'C-OQ-RULES', kind: 'history', status: 'published', sourceIds: ['HN-QD6398'], text: 'The 2013 regulation describes most Old Quarter housing as tube-shaped with inner courtyards and sloping tiled roofs, requires the tube-house form, the courtyards and pre-1954 buildings to be conserved, and allows no large shopping centres or new housing that adds population.' },
  { id: 'C-OQ-MIXED', kind: 'history', status: 'published', sourceIds: ['VNAT-OLDQ', 'VNS-ARCH'], text: 'The Old Quarter was partly settled by Chinese immigrants who traded there; before colonial rule Hà Nội was made up of the citadel, the commercial Old Quarter and the surrounding countryside.' },
  { id: 'C-OQ-SILVER', kind: 'history', status: 'published', sourceIds: ['VNP-CHAUKHE', 'VGP-HANGBAC'], text: 'Under King Lê Thánh Tông (1460–1497), Lưu Xuân Tín, a mandarin from the silversmith village of Châu Khê, brought craftsmen to the capital to cast silver ingots and set up a workshop at No. 58 Hàng Bạc. Ingot casting later moved to Huế, but the craftsmen stayed as jewellers, joined by others from Định Công and Đồng Xâm.' },
  { id: 'C-OQ-EXCHANGE', kind: 'history', status: 'published', sourceIds: ['VGP-HANGBAC', 'COMMONS-SALLES'], text: 'For centuries Hàng Bạc was a centre of gold, silver and money exchange, and in the 1890s the French called it rue des Changeurs, the money changers’ street.' },
  { id: 'C-OQ-KIMNGAN', kind: 'history', status: 'published', sourceIds: ['ND-KIMNGAN', 'VOV-KIMNGAN'], text: 'Kim Ngân communal house on Hàng Bạc was built by people from Châu Khê and honours the founder of the hundred crafts. It was ranked a national relic in 2012, and in 2025 it hosted an exhibition with demonstrations of silver-leaf and repoussé work.' },
  { id: 'C-OQ-BACHMA', kind: 'legend', status: 'published', sourceIds: ['ND-BACHMA', 'DBND-BACHMA'], text: 'Bạch Mã temple on Hàng Buồm is the eastern of Thăng Long’s four guardian temples and worships the god Long Đỗ. Legend, recorded in the fourteenth-century Việt điện u linh tập, says that when Lý Thái Tổ’s new walls kept collapsing, a white horse came out of the temple and its tracks showed where to build. The temple was ranked a special national relic in 2022; its festival falls on the 12th and 13th days of the second lunar month.' },
  { id: 'C-OQ-GATE', kind: 'history', status: 'published', sourceIds: ['ND-OQC', 'VNE-CUAO', 'VTC-OQC', 'VNAT-OLDQ'], text: 'Ô Quan Chưởng was built in 1749, when the outer wall was rebuilt under Lord Trịnh Doanh, and was first called Đông Hà Môn after Đông Hà ward. Sources give different dates for its rebuilding: 1785 and 1804 in one account, 1817 in the tourism authority’s.' },
  { id: 'C-OQ-GATE-NAME', kind: 'legend', status: 'published', sourceIds: ['ND-OQC', 'VTC-OQC'], text: 'The usual explanation of the name Ô Quan Chưởng is that it remembers a chưởng cơ, a military officer, who fought the French at this gate when they attacked Hà Nội in 1873; other explanations link it to an official who lived or kept watch there.' },
  { id: 'C-OQ-GATES', kind: 'history', status: 'published', sourceIds: ['ND-OQC', 'VNE-CUAO'], text: 'Early-nineteenth-century geographies count 21 gates in Hà Nội’s outer wall; maps of 1831 and later show 15 or 16. Ô Quan Chưởng is the only one still standing.' },
  { id: 'C-OQ-GATE-LOOK', kind: 'history', status: 'published', sourceIds: ['ND-OQC', 'VTC-OQC'], text: 'The gate has two storeys: three arches below, the central one about three metres high and wide, and a lookout above, built of large unplastered bricks, with its old wooden doors still in place.' },
  { id: 'C-OQ-GATE-STELE', kind: 'history', status: 'published', sourceIds: ['VNE-CUAO', 'VTC-OQC'], text: 'A stone tablet set up by Governor Hoàng Diệu in 1881 on the gate’s wall forbade the guards to harass people passing through.' },
  { id: 'C-OQ-GATE-SAVED', kind: 'history', status: 'published', sourceIds: ['VNE-CUAO', 'VTC-OQC'], text: 'The gate was threatened with demolition under French rule. One account credits the École française d’Extrême-Orient with saving it in 1906; a local tradition credits residents who refused to sign for its removal.' },
  { id: 'C-OQ-FRENCH', kind: 'history', status: 'published', sourceIds: ['VNS-ARCH'], text: 'The French built Đồng Xuân market in 1889, with a double iron roof to let heat out, and from 1886 a municipal council set out to make Hà Nội a European city of grid streets and boulevards, while the Old Quarter kept its tube houses.' },
  { id: 'C-OQ-TIP-WALK', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion for walking the quarter: go early or in the evening, look above the shop signs, and ask before photographing someone at work.' }
];

const story = {
  id: 'st-old-quarter',
  layout: 'longform',
  title: 'Streets named after what they sold',
  dek: 'Silver, silk, paper offerings and herbs: how the Old Quarter of Hà Nội wrote its trades into its street names, and what those streets are now.',
  place: 'Phố cổ, Hà Nội',
  imageId: 'oq-hang-bac-gold',
  hero: { video: 'oq-aerial', image: 'oq-hang-bac-gold' },
  appliesTo: 'Hà Nội’s Old Quarter: about 82 hectares between Hoàn Kiếm Lake, the old citadel and the Red River dyke, as the city defines it.',
  varies: 'Shops change fast and most streets no longer sell what their names say. Dates for some events differ between sources, and a few stories here are legend; the text says which.',
  sections: [
    { text: 'North of Hoàn Kiếm Lake, the Old Quarter is often called the “36 streets”. Each was named after a trade or craft that settled there, and many workshops once made goods for the royal court at the nearby citadel.', claimIds: ['C-OQ-GUILDS'] },
    { heading: 'Reading a street sign', text: '“Hàng” means goods, so the word after it tells you what the street sold.', claimIds: ['C-OQ-HANG'] },
    { heading: 'Then and now', text: 'Hàng Bạc was the silversmiths’ street and still has jewellers; Lãn Ông sells herbs and traditional medicine; Hàng Mã sells offerings and festival decorations. Most other streets have moved on.', claimIds: ['C-OQ-EXAMPLES'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Walk north from Hoàn Kiếm Lake and the city closes in. The streets narrow, shopfronts shrink to the width of a doorway, and the blue street signs keep beginning with the same word: [[hang|Hàng]]. Hàng Bạc, Hàng Đào, Hàng Mã, Hàng Gai. Read them one after another and they become a list of goods, as if someone had written the stock of an old market across the map. That is close to what happened.', claimIds: ['C-OQ-HANG'] },
      { text: 'This is the Old Quarter, ~Phố cổ~, the oldest trading district of Hà Nội. For centuries it was the commercial town beside the royal citadel: craftspeople and merchants who made, dyed, cast and sold what the court and the city needed. People still call it the “36 streets”, ~36 phố phường~. The number is a figure of speech. The city’s own regulation counts 79 streets on about 82 hectares, between Hoàn Kiếm Lake, the old citadel and the Red River dyke.', claimIds: ['C-OQ-GUILDS', 'C-OQ-AREA'] }
    ] },

    { type: 'text', heading: 'A town beside the citadel', paras: [
      { text: 'Before the French arrived, Hà Nội had three parts: the walled citadel of the kings, the countryside of villages and rice fields around it, and between them the commercial quarter where most townspeople lived and worked. The quarter served the court first. Its workshops made jewellery, ritual objects, textiles and tools, and its markets fed the city.', claimIds: ['C-OQ-MIXED', 'C-OQ-GUILDS'] },
      { text: 'It was never one people. Craftspeople came from the villages of the Red River Delta, and merchants from China settled and traded here too; some of the old merchant houses and assembly halls in the quarter were theirs.', claimIds: ['C-OQ-MIXED'] }
    ] },
    { type: 'figure', image: 'oq-corner', size: 'wide', caption: 'A corner of the Old Quarter today: balconies, shopfronts and trees over the street.' },

    { type: 'text', heading: 'Villages that moved to town', paras: [
      { text: 'The trade streets grew from a simple pattern. Families from one craft village came to the capital to sell their work and settled side by side, so neighbours made the same thing. Each group formed a [[phuong|phường]], a quarter with its own craft and customs, and often its own communal house, a [[dinh|đình]], where the founder of the craft was honoured.', claimIds: ['C-OQ-GUILDS'] },
      { text: 'For a customer this made the city legible. If you wanted a silver bracelet you went to the silversmiths; a sleeping mat, to the mat sellers; paper offerings for the ancestors, to the paper makers. The street took its name from the goods: **Hàng**, goods or wares, followed by the thing itself.', claimIds: ['C-OQ-HANG'] }
    ] },
    { type: 'facts', title: 'How to read a street name', items: [
      { term: 'Hàng Bạc', vi: true, text: 'bạc, silver: the silversmiths’ street, later the money changers’.' },
      { term: 'Hàng Đào', vi: true, text: 'đào, peach-pink: the street of dyed silk.' },
      { term: 'Hàng Gai', vi: true, text: 'gai, hemp: once rope and sacking, now silk and tailoring.' },
      { term: 'Hàng Mã', vi: true, text: 'mã, paper offerings: goods made to be burnt for the ancestors.' },
      { term: 'Hàng Chiếu', vi: true, text: 'chiếu, sleeping mats: the street that runs to the last city gate.' },
      { term: 'Hàng Buồm', vi: true, text: 'buồm, sails: a reminder that the river was close.' }
    ], claimIds: ['C-OQ-HANG', 'C-OQ-EXAMPLES'] },

    { type: 'map', map: 'old-quarter', heading: 'Find the trade streets', water: 'Hoàn Kiếm Lake', label: 'Map of the Old Quarter. Streets whose names begin with Hàng are highlighted; the list beside the map picks one.',
      intro: 'On this map of the quarter, every street whose name begins with Hàng is drawn in blue. Choose one to see where it runs. The map is drawn from OpenStreetMap; it is the streets as they are now.',
      claimIds: ['C-OQ-AREA'],
      places: [
        { name: 'Hàng Bạc', means: 'bạc: silver, money', text: 'Silversmiths from Châu Khê, then money changers; gold and jewellery shops today.', image: 'oq-hang-bac-2' },
        { name: 'Hàng Mã', means: 'mã: paper offerings', text: 'Still sells paper offerings, lanterns and festival decorations.', image: 'oq-hang-ma' },
        { name: 'Hàng Đào', means: 'đào: dyed silk', text: 'The silk street; the weekend night market starts here.', image: 'oq-hang-dao-sign' },
        { name: 'Hàng Gai', means: 'gai: hemp', text: 'Hemp rope once; silk, embroidery and made-to-measure clothes now.', image: 'oq-corner' },
        { name: 'Hàng Điếu', means: 'điếu: smoking pipe', text: 'The water-pipe makers’ street; few pipes are sold there now.', image: 'oq-hang-dieu' },
        { name: 'Hàng Chiếu', means: 'chiếu: sleeping mat', text: 'The mat street, which runs east to Ô Quan Chưởng, the last gate of the wall.', image: 'oq-quan-chuong' },
        { name: 'Hàng Buồm', means: 'buồm: sail', text: 'Home of Bạch Mã temple, the oldest of the city’s four guardian temples.' },
        { name: 'Lãn Ông', means: 'named after a physician', text: 'Not a “Hàng” street: it honours Hải Thượng Lãn Ông and sells herbs and traditional medicine.' }
      ] },

    { type: 'text', heading: 'Silver, then money', id: 'silver', paras: [
      { text: 'Hàng Bạc shows the pattern best, because its history is unusually well remembered. In the fifteenth century, under King Lê Thánh Tông, a mandarin named Lưu Xuân Tín came from Châu Khê, a silversmith village in what is now Hải Dương. He brought craftsmen from home to cast silver ingots for the capital, which served as money, and set up the workshop at what is now No. 58 Hàng Bạc.', claimIds: ['C-OQ-SILVER'] },
      { text: 'When the Nguyễn kings moved the court to Huế in the early nineteenth century, the casting of ingots went with them. The Châu Khê families did not. They stayed and turned to jewellery, and silversmiths from Định Công and Đồng Xâm joined them. Because the street handled precious metal, it also handled money: for centuries merchants came here to change and weigh it, and in the 1890s the French called Hàng Bạc *rue des Changeurs*, the money changers’ street.', claimIds: ['C-OQ-SILVER', 'C-OQ-EXCHANGE'] },
      { text: 'The guild built a communal house on the street, [[dinh|đình]] Kim Ngân, “gold and silver”, which honours the founder of the hundred crafts. It was ranked a national relic in 2012, and it is still used: in late 2025 it held an exhibition where craftsmen showed how silver leaf is laid and how a sheet of metal is beaten into relief.', claimIds: ['C-OQ-KIMNGAN'] }
    ] },
    { type: 'beforeAfter', before: 'oq-changeurs-1890', after: 'oq-hang-bac-gold', labelBefore: '1896', labelAfter: '2023', caption: 'Hàng Bạc, rue des Changeurs, photographed by André Salles in 1896, and the same street in 2023. Drag the handle, or use the arrow keys. The same street, not the same viewpoint.' },
    { type: 'text', paras: [
      { text: 'Today the street is lined with jewellers and gold shops, their signs crowded with the words [[vang|vàng]] and [[bac|bạc]], and some still change money. Hàng Bạc is one of the few streets whose name still describes its shops.', claimIds: ['C-OQ-EXAMPLES'] }
    ] },

    { type: 'text', heading: 'Names that outlived their trades', id: 'then-now', paras: [
      { text: 'Hàng Mã also still does what its name says. Its shops sell paper offerings, the paper money, clothes and houses that families burn for their ancestors, and before the Mid-Autumn Festival and Tết the street turns red and gold with lanterns and decorations. Lãn Ông, named after the eighteenth-century physician Hải Thượng Lãn Ông, is still the street of traditional medicine: the smell of dried roots and herbs reaches you before the shops do.', claimIds: ['C-OQ-EXAMPLES'] },
      { text: 'Most streets have moved on. Hàng Gai once sold hemp rope and sacking; now it sells silk, embroidery and made-to-measure clothes. Others sell shoes, toys, coffee or rooms for the night whatever the word on the sign. The names have outlived the trades, and that is part of their value: together they are a map of how the city used to work.', claimIds: ['C-OQ-EXAMPLES', 'C-OQ-GUILDS'] }
    ] },
    { type: 'pair', items: [
      { image: 'oq-hang-ma', caption: 'Hàng Mã, hung with lanterns and paper decorations.' },
      { image: 'oq-citron', caption: 'A street seller with fingered citrons, a fruit placed on altars at Tết.' }
    ] },
    { type: 'quote', text: 'The names have outlived the trades. Together they are a map of how the city used to work.' },
    { type: 'figure', image: 'oq-flower-night', size: 'bleed', caption: 'Flower sellers at dusk in the Old Quarter market.' },

    { type: 'text', heading: 'Narrow, deep and tall', id: 'houses', paras: [
      { text: 'The buildings explain the streets as much as the names do. The typical house is a [[nhaong|nhà ống]], a tube house: a front only a few metres wide that runs far back from the street, through rooms and small open courtyards that bring in light and air. The shop sits at the front, the workshop and the family behind and above.', claimIds: ['C-OQ-TUBE'] },
      { text: 'Street frontage was what a trader needed, so houses grew upward and backward instead of outward. Many of the façades you see are later: under French rule the city around the quarter was replanned with grid streets and villas, and the quarter kept its tube houses behind newer fronts.', claimIds: ['C-OQ-TUBE', 'C-OQ-FRENCH'] },
      { text: 'These houses are now protected by rule as well as by habit. Hà Nội’s 2013 regulation for the quarter describes its housing as tube-shaped with inner courtyards and sloping tiled roofs, and requires that form, the courtyards and buildings from before 1954 to be kept. It allows no large shopping centres, and no new housing that would add to the number of people living there.', claimIds: ['C-OQ-RULES'] }
    ] },
    { type: 'figure', image: 'oq-tube-houses', caption: 'Tube houses: narrow fronts, built upward as families grew.' },

    { type: 'text', heading: 'The white horse of Hàng Buồm', id: 'temple', paras: [
      { text: 'Among the shops of Hàng Buồm stands Bạch Mã, the temple of the White Horse. It is the eastern of the four guardian temples that were said to protect Thăng Long, one for each direction, and it worships the god Long Đỗ, the guardian spirit of the capital.', claimIds: ['C-OQ-BACHMA'] },
      { text: 'Its story is a legend, and is told as one. When King Lý Thái Tổ moved his capital here in 1010, the walls he built kept collapsing. He prayed at the temple of Long Đỗ, and a white horse came out of it; the king built along its tracks, and the walls held. The legend is recorded in a fourteenth-century collection of stories about spirits, the *Việt điện u linh tập*. The buildings you see are mostly nineteenth-century, and the temple was ranked a special national relic in 2022. Its festival falls on the 12th and 13th days of the second lunar month.', claimIds: ['C-OQ-BACHMA', 'C-THANGLONG'] }
    ] },

    { type: 'text', heading: 'The last gate', id: 'gate', paras: [
      { text: 'At the eastern edge of the quarter, where Hàng Chiếu meets the road along the dyke, stands **Ô Quan Chưởng**. An [[o|ô]] is a gate in the outer wall of the city. Early-nineteenth-century geographies count 21 of them; maps from 1831 onward show 15 or 16. This is the only one still standing.', claimIds: ['C-OQ-GATES', 'C-OQ-TUBE'] },
      { text: 'It was built in 1749, when the outer wall was rebuilt under Lord Trịnh Doanh, and was first called Đông Hà Môn, the gate of Đông Hà ward; the characters are still above the central arch. Accounts of its later rebuilding differ: one gives repairs in 1785 and a rebuilding in 1804, the national tourism authority gives 1817.', claimIds: ['C-OQ-GATE'] },
      { text: 'The name everyone uses is explained in more than one way. The best-known story says it remembers a military commander, a *chưởng cơ*, who held the gate against the French when they attacked Hà Nội in 1873 and died there. Other explanations tie it to an official who lived nearby or kept watch over the river traffic. The sources agree on the gate, not on the story.', claimIds: ['C-OQ-GATE-NAME'] },
      { text: 'Look closely as you pass under it. It has two storeys, three arches below and a lookout above, built of large bricks left bare, and its heavy wooden doors are still there. On the wall of the main arch is a stone tablet put up in 1881 by the governor Hoàng Diệu, ordering the guards not to harass people passing through. Under French rule the gate was nearly demolished; one account credits French scholars of the École française d’Extrême-Orient with saving it in 1906, a local tradition credits residents who refused to sign for its removal.', claimIds: ['C-OQ-GATE-LOOK', 'C-OQ-GATE-STELE', 'C-OQ-GATE-SAVED'] }
    ] },
    { type: 'figure', image: 'oq-quan-chuong', size: 'wide', caption: 'Ô Quan Chưởng, the surviving gate of the old city wall.' },

    { type: 'timeline', heading: 'The quarter in eight dates', label: 'Timeline of the Old Quarter', items: [
      { year: '1010', title: 'A capital called Thăng Long', text: 'King Lý Thái Tổ moves his capital here. Hà Nội counts its thousand years from this date.', claimIds: ['C-THANGLONG'] },
      { era: 'Under the Lê kings' },
      { year: '1460s', title: 'Silver comes to town', text: 'Under Lê Thánh Tông, craftsmen from Châu Khê begin casting silver ingots on what becomes Hàng Bạc.', claimIds: ['C-OQ-SILVER'], image: 'oq-hang-dieu', caption: 'Hàng Điếu, one of the trade streets.' },
      { year: '1749', title: 'A gate in the wall', text: 'The outer wall is rebuilt and Ô Quan Chưởng, then Đông Hà Môn, is built on the river side.', claimIds: ['C-OQ-GATE'], image: 'oq-quan-chuong', caption: 'Ô Quan Chưởng today.' },
      { era: 'Under French rule' },
      { year: '1889', title: 'A covered market', text: 'The French build Đồng Xuân market at the north of the quarter, under a double iron roof.', claimIds: ['C-OQ-FRENCH'], image: 'oq-pipes-1900', caption: 'Rue des Pipes (Hàng Điếu) in the early twentieth century.' },
      { year: '1896', title: 'Rue des Changeurs', text: 'André Salles photographs Hàng Bạc, known to the French as the money changers’ street.', claimIds: ['C-OQ-EXCHANGE'], image: 'oq-changeurs-1890b', caption: 'Rue des Changeurs (Hàng Bạc), 1896.' },
      { year: '1920s', title: 'The silk street', text: 'Hàng Đào, rue de la Soie, lined with trees and rickshaws.', image: 'oq-hang-dao-1920', caption: 'Hàng Đào in the 1920s.' },
      { era: 'Today' },
      { year: '2004', title: 'A protected quarter', text: 'The Old Quarter is listed as a national historic site; a 2013 regulation sets out how its houses must be kept.', claimIds: ['C-OQ-AREA', 'C-OQ-RULES'] },
      { year: '2022', title: 'The guardian temples', text: 'Bạch Mã and the other guardian temples of Thăng Long are ranked a special national relic.', claimIds: ['C-OQ-BACHMA'], image: 'oq-flower-night', caption: 'An Old Quarter evening.' }
    ] },

    { type: 'text', heading: 'If you go', id: 'visit', paras: [
      { text: 'The quarter is easiest on foot, early in the morning or in the evening when the heat lifts. On weekend evenings the streets around Hoàn Kiếm Lake close to traffic and fill with walkers.', claimIds: ['C-HK-WALK'] },
      { text: 'Look up as well as in: the oldest details are often above the shop signs. Step into a communal house or temple when its doors are open, dressed as you would for any place of worship. And if you want a photo of someone at work, ask first; our story [Asking before a photo](story:st-photo-ask) explains how.', claimIds: ['C-OQ-TIP-WALK'] }
    ] },
    { type: 'gallery', heading: 'More from the streets', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'oq-vendor-bike', caption: 'A vendor’s bicycle loaded with flowers.' },
      { image: 'oq-vendor-fruit', caption: 'Fruit sold from baskets on a bicycle.' },
      { image: 'oq-vendor-meat', caption: 'A pavement butcher’s tray.' },
      { image: 'oq-chuong-vang-night', caption: 'A French-era façade on Hàng Bạc at night.' },
      { image: 'oq-hang-bac-2', caption: 'A food stall in front of the jewellers on Hàng Bạc.' },
      { image: 'oq-changeurs-1890b', caption: 'Rue des Changeurs in 1896.' }
    ] },
    { type: 'quiz', image: 'oq-hang-ma', question: 'Which street is this?', prompt: 'Red lanterns, paper decorations and offerings in every doorway. Choose the name that fits.', fitLabel: 'That fits', otherLabel: 'Look again', options: [
      { label: 'Hàng Bạc', vi: true, feedback: 'Hàng Bạc is the silver street: jewellers and gold shops, not paper. Look at what hangs in the doorways.' },
      { label: 'Hàng Mã', vi: true, fit: true, feedback: '*Mã* means paper offerings. Hàng Mã still sells them, and before Mid-Autumn and Tết it fills with lanterns like these.' },
      { label: 'Hàng Gai', vi: true, feedback: 'Hàng Gai was the hemp street and now sells silk and tailoring. The lanterns point somewhere else.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
