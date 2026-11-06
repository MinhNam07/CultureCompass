/* New chapter-3 content for CultureCompass (Vietnam). Merged into assets/data/*.json by merge.js. */
const today = '2026-11-03';

const sources = [
  { id: 'CA-REL', short: 'Cultural Atlas', title: 'Vietnamese culture: Religion — Cultural Atlas', org: 'Cultural Atlas (Mosaica)', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-religion', type: 'reference', checked: today,
    used: 'Ancestral altars, when ancestors are honoured (death anniversaries, the 1st and 15th of the lunar month, Tết), filial piety, village tutelary spirits, Mother Goddess worship being more common in the north.',
    limits: 'An educational overview written for an Australian audience (2025). Not specific to Hà Nội or to any one family.' },
  { id: 'TT-STELAE-WH', short: 'Tuổi Trẻ', title: 'Bia tiến sĩ tại Văn Miếu – Quốc Tử Giám là Di sản tư liệu thế giới — Tuổi Trẻ', org: 'Tuổi Trẻ (newspaper)', url: 'https://tuoitre.vn/bia-tien-si-tai-van-mieu---quoc-tu-giam-la-di-san-tu-lieu-the-gioi-367388.htm', type: 'press', checked: today,
    used: 'The first doctoral stele was erected in 1484 for the 1442 examination and the last in 1780; the line “Hiền tài là nguyên khí quốc gia” on the first stele.',
    limits: 'News report in Vietnamese (2010). The English translation of the quotation is ours.' },
  { id: 'NHANDAN-STELAE', short: 'Nhân Dân', title: 'Hỏi các nhà sử học — Nhân Dân', org: 'Nhân Dân (newspaper)', url: 'https://nhandan.vn/hoi-cac-nha-su-hoc-post551654.html', type: 'press', checked: today,
    used: 'The 1442 examination as the first whose laureates were carved on a stele; ten stelae erected together in 1484; the source of the “hiền tài” quotation.',
    limits: 'A short reader Q&A in Vietnamese. Its count of laureates (1,306) differs slightly from other sources, so we do not quote a number.' },
  { id: 'VNAT-TET', short: 'Vietnam National Authority of Tourism', title: 'Lunar New Year — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/festival-event/lunar-new-year-2023?month=jan&year=2023', type: 'official', checked: today,
    used: 'How families prepare for Tết (cooking, cleaning, paying respects to ancestors), flowering trees, lucky money called “mừng tuổi” in the north and “lì xì” in the south.',
    limits: 'An events listing for Tết 2023; general and brief.' },
  { id: 'VNA-XONGDAT', short: 'Vietnam News Agency', title: '“Xông đất” – a cherished Lunar New Year tradition — Vietnam Pictorial (VNA)', org: 'Vietnam News Agency', url: 'https://vietnam.vnanet.vn/english/print/xong-dat-–-a-cherished-lunar-new-year-tradition-220469.html', type: 'press', checked: today,
    used: 'The first visitor of the year (xông đất) and the belief that this person bears on a household’s fortune.',
    limits: 'Feature article (2020); describes the custom in general terms.' },
  { id: 'VNN-TET', short: 'VietNamNet', title: 'Unique traditional Tet customs of Vietnam — VietNamNet', org: 'VietNamNet (newspaper)', url: 'https://vietnamnet.vn/en/entertainment-sports/unique-traditional-tet-customs-of-vietnam-712750.html', type: 'press', checked: today,
    used: 'Families visiting ancestors’ graves in the last week of the lunar year to invite them home for Tết; visiting and lucky money in the first days.',
    limits: 'General feature; customs vary by family and region.' },
  { id: 'DTI-VOTIVE', short: 'Dân trí (DTiNews)', title: 'Votive paper burnt in Hanoi’s Old Quarter — DTiNews', org: 'Dân trí / DTiNews (newspaper)', url: 'https://dtinews.dantri.com.vn/vietnam-today/votive-paper-burnt-in-hanois-old-quarter-20220812144238237.htm', type: 'press', checked: today,
    used: 'Votive paper burnt on Old Quarter streets on the 15th day of the seventh lunar month, and concern about smoke, fire risk and waste.',
    limits: 'Short photo report (2022).' },
  { id: 'HNT-HANGMA', short: 'Hanoi Times', title: 'Hang Ma street: a glittering space of buoyant businesses — Hanoi Times', org: 'Hanoi Times (newspaper)', url: 'https://hanoitimes.vn/hang-ma-street-a-glittering-space-of-buoyant-businesses-5810.html', type: 'press', checked: today,
    used: 'Hàng Mã as an Old Quarter street of paper offerings and paper ornaments, with tube houses typical of the quarter.',
    limits: 'Feature article; no date shown in the text we read.' },
  { id: 'VT-HANGMA', short: 'vietnamtourism.com', title: 'Hang Ma Street — vietnamtourism.com', org: 'vietnamtourism.com (private travel site)', url: 'https://www.vietnamtourism.com/en/places/hanoi/hang-ma-street', type: 'secondary', checked: today,
    used: 'That “mã” refers to paper goods made for offerings, and that families burn paper money for their ancestors on the 1st and 15th of the lunar month.',
    limits: 'A private travel website, not the national tourism authority despite its name. Treated as “being verified”.' },
  { id: 'VT-TEMPLES', short: 'vietnamtourism.com', title: 'Temple etiquette in Vietnam — vietnamtourism.com', org: 'vietnamtourism.com (private travel site)', url: 'https://www.vietnamtourism.com/en/temple-etiquette-in-vietnam-what-to-wear-do-and-avoid', type: 'secondary', checked: today,
    used: 'The difference between chùa (Buddhist pagoda), đền (temple to a hero, king or deity) and đình (village communal house for guardian spirits).',
    limits: 'A private travel website. The distinction is widely repeated, but real sites often combine all three. Treated as “being verified”.' },
  { id: 'UNESCO-TL', short: 'UNESCO World Heritage Committee', title: 'Decision 34 COM 8B.22: Central Sector of the Imperial Citadel of Thang Long – Hanoi', org: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/decisions/4001', type: 'official', checked: today,
    used: 'The inscription of the Central Sector of the Imperial Citadel of Thăng Long – Hà Nội on the World Heritage List in 2010.',
    limits: 'An official decision text; it does not describe what visitors see.' },
  { id: 'HTTL-1010', short: 'Imperial Citadel of Thang Long', title: 'Imperial Citadel of Thang Long — hoangthanhthanglong.vn', org: 'Thang Long – Hanoi Heritage Conservation Centre (official site)', url: 'https://hoangthanhthanglong.vn/en/category/imperial-citadel-of-thang-long/page/5', type: 'site', checked: today,
    used: 'Thăng Long – Hà Nội’s thousand years counted from King Lý Thái Tổ’s decision to move the capital here in 1010.',
    limits: 'The site’s own listing page; we read the summaries, not every article.' },
  { id: 'VNAT-DISAN-TL', short: 'Vietnam National Authority of Tourism', title: 'Central Sector of the Imperial Citadel of Thang Long – Ha Noi — Vietnam heritage pages', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnamtourism.vn/disan/en/index.php?catid=10', type: 'official', checked: today,
    used: 'Đoan Môn as the main gate of the Forbidden City, facing south; the site covering about 18 hectares with the archaeological area at 18 Hoàng Diệu.',
    limits: 'General heritage summary, no publication date shown.' },
  { id: 'UNESCO-MAU', short: 'UNESCO Intangible Cultural Heritage', title: 'Practices related to the Viet beliefs in the Mother Goddesses of Three Realms', org: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064', type: 'official', checked: today,
    used: 'The Mother Goddesses of the realms of heaven, water, and mountains and forests; Liễu Hạnh as Mother of the World; inscription in 2016.',
    limits: 'UNESCO’s summary of Vietnam’s nomination file.' },
  { id: 'UN-VN-MAU', short: 'United Nations in Viet Nam', title: 'Practices related to the Việt beliefs in the Mother Goddesses of Three Realms receive inscription — UN Viet Nam press release', org: 'United Nations in Viet Nam', url: 'https://vietnam.un.org/vi/node/7740', type: 'official', checked: today,
    used: 'Daily worship, ceremonies and the lên đồng (mediumship) ritual; that the practice is believed to have developed since the 16th century.',
    limits: 'Press release, 5 December 2016.' },
  { id: 'VNAT-DISAN-MAU', short: 'Vietnam National Authority of Tourism', title: 'Practices related to the Viet Beliefs in the Mother Goddesses of Three Realms — Vietnam heritage pages', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnamtourism.vn/disan/en/index.php?catid=26', type: 'official', checked: today,
    used: 'That the belief is open to everyone regardless of age, occupation or religion, and is practised mainly in the north and north-central regions.',
    limits: 'General heritage summary.' }
];

const claims = [
  { id: 'C-VM-FOUNDED', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'Văn Miếu was built in 1070 under King Lý Thánh Tông. In 1076 King Lý Nhân Tông founded Quốc Tử Giám beside it, at first for princes and later for gifted students from across the country.' },
  { id: 'C-VM-ACADEMY', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'Quốc Tử Giám taught for more than 700 years (1076–1802). Văn Miếu honours Confucius, Confucian scholars and the teacher Chu Văn An.' },
  { id: 'C-VM-LAYOUT', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'The site covers 54,331 m², including Văn Lake and the Giám garden; inside the walls it is divided into five courtyards.' },
  { id: 'C-VM-GATE', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'The main gate is a two-storey, three-arched gate inscribed “Văn Miếu Môn”, with Lê-period stone dragons outside and Nguyễn-period dragons inside. Đại Trung gate follows, flanked by the small Thành Đức and Đạt Tài gates.' },
  { id: 'C-VM-KHUEVAN', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'Khuê Văn Các was built in 1805 under the Nguyễn: two storeys and eight roofs, brick pillars below and wood above, with round windows whose spokes stand for the rays of the Khuê star. Scholars’ best poems were read there, and it has been taken as the symbol of Hà Nội.' },
  { id: 'C-VM-WELL', kind: 'history', sourceIds: ['TT-VANMIEU', 'MOWCAP-STELAE'],
    text: 'A square pond, Thiên Quang Tỉnh (“Well of Heavenly Clarity”), lies between two gardens of stelae; the 82 stelae, erected 1484–1780, record the names and home villages of the doctoral laureates of 82 examinations.' },
  { id: 'C-VM-DAITHANH', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'Đại Thành gate opens onto a brick courtyard whose side halls once held tablets for Confucius’s 72 disciples and Vietnamese scholars. At its end stand the Đại Bái hall and sanctuary; a large bronze bell cast in 1768 hangs on the left and a stone chime on the right.' },
  { id: 'C-VM-THAIHOC', kind: 'history', sourceIds: ['TT-VANMIEU'],
    text: 'When the Nguyễn moved the academy to Huế in the early 19th century, its site became Khải Thánh temple; it was burnt in 1946–1947. Thái Học house was completed in 2000 and honours kings Lý Thánh Tông, Lý Nhân Tông and Lê Thánh Tông and the teacher Chu Văn An.' },
  { id: 'C-STELAE-1442', kind: 'history', sourceIds: ['TT-STELAE-WH', 'NHANDAN-STELAE'],
    text: 'The first stele was erected in 1484 for the examination of 1442, and the last in 1780. The inscription for 1442, written by Thân Nhân Trung, contains the line “Hiền tài là nguyên khí của quốc gia”.' },
  { id: 'C-ALTAR', kind: 'custom', sourceIds: ['CA-REL'],
    text: 'Many homes of the Việt majority have an ancestral altar with photographs of family members who have died, and offerings of incense, flowers, fruit and water. Ancestors are honoured most on a death anniversary (giỗ), on the 1st and 15th of the lunar month and above all at Tết.' },
  { id: 'C-ALTAR-ALL', kind: 'custom', sourceIds: ['CA-REL'],
    text: 'Ancestor veneration rests on filial piety (hiếu) and is practised by most people in Vietnam whatever their religion, including many Catholics and people with no religion.' },
  { id: 'C-SACRED-TYPES', kind: 'custom', sourceIds: ['VT-TEMPLES', 'CA-REL'],
    text: 'A chùa is a Buddhist pagoda; a đền is usually a temple to a national hero, a king or a deity; a đình is a village communal house dedicated to a guardian spirit, and villages are thought to have such a tutelary spirit.' },
  { id: 'C-HANGMA', kind: 'custom', sourceIds: ['HNT-HANGMA', 'VT-HANGMA'],
    text: 'Hàng Mã in the Old Quarter sells paper offerings and paper decorations; “mã” refers to paper goods made for offerings, and families burn paper money for their ancestors, for example on the 1st and 15th of the lunar month.' },
  { id: 'C-VOTIVE-BURN', kind: 'custom', sourceIds: ['DTI-VOTIVE'],
    text: 'On the 15th day of the seventh lunar month many people in the Old Quarter burn votive paper in the street, which raises concern about smoke, fire risk and waste.' },
  { id: 'C-TET-PREP', kind: 'custom', sourceIds: ['VNAT-TET'],
    text: 'Families prepare for Tết by cooking New Year foods, cleaning their homes and paying respects to their ancestors, and flowering trees are set outside homes. On the first day children receive lucky money in a red envelope, called “mừng tuổi” in the north and “lì xì” in the south.' },
  { id: 'C-TET-GRAVES', kind: 'custom', sourceIds: ['VNN-TET'],
    text: 'In the last days of the lunar year families visit their ancestors’ graves and invite them home to celebrate Tết.' },
  { id: 'C-TET-FIRST', kind: 'custom', sourceIds: ['VNA-XONGDAT'],
    text: 'The first visitor of the new year (xông đất) is believed to bear on the household’s fortune, so families often invite someone to come first, usually on the morning of the first day.' },
  { id: 'C-SWORD-LEGEND', kind: 'history', sourceIds: ['VNAT-HOANKIEM'],
    text: 'In the legend, after the victory over the Ming in 1428, Lê Lợi was boating on the lake when a golden turtle rose and asked for his magic sword; he returned it, and the lake, once called Lục Thủy (“Green Water”), became Hoàn Kiếm, the Lake of the Returned Sword. The Turtle Tower on its islet is linked to the legend.' },
  { id: 'C-NGOCSON', kind: 'history', sourceIds: ['VNAT-NGOCSON'],
    text: 'Ngọc Sơn temple stands on an islet in the lake; documents kept there date it to 1841, and it was restored in 1865 by the scholar Nguyễn Văn Siêu. It honours General Trần Hưng Đạo and Văn Xương and is reached by the red Thê Húc bridge; the Pen Tower and Ink Slab at the entrance are linked with learning, and students come to pray for luck in exams.' },
  { id: 'C-THANGLONG', kind: 'history', sourceIds: ['HTTL-1010', 'UNESCO-TL'],
    text: 'Hà Nội counts its thousand years from 1010, when King Lý Thái Tổ moved the capital here and named it Thăng Long. The Central Sector of the Imperial Citadel of Thăng Long – Hà Nội was inscribed on the UNESCO World Heritage List in 2010.' },
  { id: 'C-DOANMON', kind: 'history', sourceIds: ['VNAT-DISAN-TL'],
    text: 'Đoan Môn is the main gate of the former Forbidden City and faces south; the heritage area also takes in the archaeological site at 18 Hoàng Diệu.' },
  { id: 'C-MAU', kind: 'custom', sourceIds: ['UNESCO-MAU', 'UN-VN-MAU'],
    text: 'The Mother Goddesses of Three Realms — heaven, water, and mountains and forests — are worshipped for health and success; Liễu Hạnh is honoured as Mother of the World. The practice includes the lên đồng mediumship ritual and was inscribed by UNESCO in 2016.' },
  { id: 'C-MAU-OPEN', kind: 'custom', sourceIds: ['VNAT-DISAN-MAU', 'CA-REL'],
    text: 'The belief is open to anyone regardless of age, occupation or religion, and is most common in northern Vietnam.' }
].map((c) => Object.assign({ status: 'needs_verification' }, c));

const stories = [
  {
    id: 'st-van-mieu-university', country: 'vietnam', place: 'Văn Miếu – Quốc Tử Giám, Hà Nội',
    title: 'Vietnam’s first university', dek: 'A temple to Confucius from 1070, and the royal academy that grew up beside it.',
    sceneId: 'sc03', imageId: 'img-vm-khuevan',
    sections: [
      { text: 'Văn Miếu, the “Temple of Literature”, was built in 1070 under King Lý Thánh Tông. Six years later King Lý Nhân Tông founded Quốc Tử Giám beside it: a school first for princes, later for gifted students from across the country.', claimIds: ['C-VM-FOUNDED'] },
      { heading: 'Seven centuries of teaching', text: 'The academy taught for more than 700 years, until 1802. The temple honours Confucius and Confucian scholars, and the teacher Chu Văn An, remembered as a model of learning and integrity.', claimIds: ['C-VM-ACADEMY'] },
      { heading: 'Five courtyards', text: 'Today the walled site is divided into five courtyards, walked from the street gate to Thái Học house at the back. The plan on this page follows that route.', claimIds: ['C-VM-LAYOUT'] },
      { editorial: true, text: 'Calling it a “university” is a modern shorthand: it trained scholars for the royal examinations in the Confucian classics, not in the subjects a university teaches today.', claimIds: [] }
    ],
    appliesTo: 'Văn Miếu – Quốc Tử Giám in Hà Nội, from a Tuổi Trẻ feature on the site.',
    varies: 'Specific to this site.', phraseIds: []
  },
  {
    id: 'st-family-altar', country: 'vietnam', place: 'Hà Nội',
    title: 'The family altar', dek: 'Photos, incense and fruit: where the living keep company with the family’s dead.',
    imageId: 'img-altar-tet',
    sections: [
      { text: 'Many Vietnamese homes have an ancestral altar, often in the main room, holding photographs of family members who have died, with incense, flowers, fruit and water as offerings.', claimIds: ['C-ALTAR'] },
      { heading: 'When it matters most', text: 'Some families light incense every day. Most give the altar special attention on a person’s death anniversary (giỗ), on the 1st and 15th days of the lunar month, and above all at Tết.', claimIds: ['C-ALTAR'] },
      { heading: 'Not tied to one religion', text: 'The practice rests on filial piety (hiếu), the duty to care for parents and elders in life and after death. Most people in Vietnam keep it up whatever their religion, including many Catholics and people who call themselves non-religious.', claimIds: ['C-ALTAR-ALL'] },
      { heading: 'As a guest', editorial: true, text: 'Our sources say nothing about guests and altars. Leaving the altar and its offerings alone, and asking before taking a photo of it, are the safe choices.', claimIds: [] }
    ],
    appliesTo: 'Homes of Vietnam’s Việt majority, as described by the Cultural Atlas.',
    varies: 'Altars, offerings and how often incense is lit differ from family to family.', phraseIds: []
  },
  {
    id: 'st-sacred-places', country: 'vietnam', place: 'Hà Nội',
    title: 'Chùa, đền, đình: which is which?', dek: 'Pagoda, temple and communal house are three different kinds of sacred place.',
    imageId: 'img-tranquoc',
    sections: [
      { text: 'English signs often say “temple” for all of them, but Vietnamese tells them apart. A chùa is a Buddhist pagoda. A đền is usually a temple to a national hero, a king or a deity. A đình is a village communal house, built for the guardian spirit that each village is thought to have.', claimIds: ['C-SACRED-TYPES'] },
      { heading: 'Three examples in Hà Nội', editorial: true, text: 'Trấn Quốc on West Lake is a chùa. Ngọc Sơn on Hoàn Kiếm Lake is a đền. Văn Miếu, the Temple of Literature, is something else again: a temple to Confucius.', claimIds: [] },
      { heading: 'Lines blur', text: 'Real places mix the three: a pagoda may have a shrine to a spirit, and a temple may hold a Buddha statue. Ngọc Sơn, for one, keeps a statue of the Buddha Amitābha.', claimIds: ['C-NGOCSON'] }
    ],
    appliesTo: 'Places of worship in and around Hà Nội. The three-way distinction comes from a travel guide we are still checking.',
    varies: 'Many sites combine a pagoda, a temple and a communal house in one compound.', phraseIds: ['ph-chupanh-noi']
  },
  {
    id: 'st-paper-offerings', country: 'vietnam', place: 'Hàng Mã, Hà Nội',
    title: 'Paper offerings on Hàng Mã', dek: 'A street named after paper gifts for the dead, and the smoke on festival days.',
    imageId: 'img-hangma',
    sections: [
      { text: 'Hàng Mã, in the Old Quarter, is named after its trade: “mã” are paper goods made as offerings. Shops sell paper money and paper objects alongside lanterns and decorations for festivals.', claimIds: ['C-HANGMA'] },
      { heading: 'Gifts that are burnt', text: 'Families burn paper money for their ancestors, for example on the 1st and 15th of the lunar month.', claimIds: ['C-HANGMA'] },
      { heading: 'Smoke in the street', text: 'On the 15th day of the seventh lunar month many people in the Old Quarter burn votive paper on the pavement, and the smoke, fire risk and waste are a recurring concern in the press.', claimIds: ['C-VOTIVE-BURN'] }
    ],
    appliesTo: 'Hàng Mã street and the Old Quarter, from Hanoi Times, Dân trí and a travel guide we are still checking.',
    varies: 'Some families burn a great deal, others very little or none.', phraseIds: []
  },
  {
    id: 'st-tet', country: 'vietnam', place: 'Vietnam',
    title: 'Tết, the Lunar New Year', dek: 'Cleaning, cooking and calling the ancestors home: the most important days of the year.',
    imageId: 'img-banh-chung',
    sections: [
      { text: 'Tết is the most important celebration in Vietnam. Families get ready by cooking New Year foods, cleaning the house and paying respects to their ancestors, and flowering trees appear outside homes and offices.', claimIds: ['C-TET-PREP'] },
      { heading: 'Inviting the ancestors', text: 'In the last days of the old year many families visit their ancestors’ graves and invite them home to celebrate.', claimIds: ['C-TET-GRAVES'] },
      { heading: 'The first visitor', text: 'The first person to enter a home in the new year (xông đất) is believed to bear on the family’s fortune, so families often invite someone to come first, usually on the morning of the first day.', claimIds: ['C-TET-FIRST'] },
      { heading: 'Lucky money', text: 'On the first day children receive lucky money in a red envelope from their elders — “mừng tuổi” in the north, “lì xì” in the south.', claimIds: ['C-TET-PREP'] },
      { editorial: true, text: 'If you are in Hà Nội at Tết and not invited anywhere, it is kinder not to drop in on a family on the first day.', claimIds: [] }
    ],
    appliesTo: 'Vietnam as a whole, from the national tourism authority, VietNamNet and the Vietnam News Agency.',
    varies: 'Dates move with the lunar calendar, and customs differ between regions and families.', phraseIds: []
  },
  {
    id: 'st-sword-lake', country: 'vietnam', place: 'Hồ Hoàn Kiếm, Hà Nội',
    title: 'The lake of the returned sword', dek: 'How a golden turtle gave Hoàn Kiếm Lake its name, and the temple on its islet.',
    imageId: 'img-turtle-tower',
    sections: [
      { text: 'In the legend, after the victory over the Ming in 1428, Lê Lợi was boating on the lake when a golden turtle rose and asked for the magic sword he had been lent. He gave it back, and the lake, once called Lục Thủy (“Green Water”), became Hoàn Kiếm: the Lake of the Returned Sword.', claimIds: ['C-SWORD-LEGEND'] },
      { heading: 'Turtle Tower', text: 'The small tower on the islet near the south of the lake is linked to the legend and is often used as an emblem of Hà Nội.', claimIds: ['C-SWORD-LEGEND'] },
      { heading: 'Ngọc Sơn temple', text: 'At the north end, the red Thê Húc bridge leads to Ngọc Sơn temple, dated by its own documents to 1841 and restored in 1865. It honours General Trần Hưng Đạo and Văn Xương; the Pen Tower and Ink Slab at its gate are linked with learning, and students come to pray for luck in exams.', claimIds: ['C-NGOCSON'] }
    ],
    appliesTo: 'Hoàn Kiếm Lake and Ngọc Sơn temple, from the national tourism authority.',
    varies: 'Specific to this place. The legend is told with small differences.', phraseIds: []
  },
  {
    id: 'st-thang-long', country: 'vietnam', place: 'Hoàng thành Thăng Long, Hà Nội',
    title: 'Thăng Long, a capital since 1010', dek: 'Why Hà Nội celebrated its thousandth birthday in 2010.',
    imageId: 'img-doanmon',
    sections: [
      { text: 'Hà Nội counts its history as a capital from 1010, when King Lý Thái Tổ moved the court here and named the city Thăng Long. The city marked its thousandth year in 2010.', claimIds: ['C-THANGLONG'] },
      { heading: 'The citadel', text: 'In the same year the Central Sector of the Imperial Citadel of Thăng Long – Hà Nội was added to UNESCO’s World Heritage List.', claimIds: ['C-THANGLONG'] },
      { heading: 'What you can see', text: 'Đoan Môn, the main gate of the old Forbidden City, faces south; the heritage area also includes the excavations at 18 Hoàng Diệu.', claimIds: ['C-DOANMON'] }
    ],
    appliesTo: 'The Imperial Citadel in Ba Đình, Hà Nội, from UNESCO and the site’s own conservation centre.',
    varies: 'Specific to this site.', phraseIds: []
  },
  {
    id: 'st-mother-goddess', country: 'vietnam', place: 'Northern Vietnam',
    title: 'The Mother Goddesses', dek: 'A northern belief in goddesses of heaven, water and forest, and the lên đồng ritual.',
    imageId: 'img-phu-tay-ho',
    sections: [
      { text: 'Many people worship the Mother Goddesses of Three Realms — heaven, water, and mountains and forests — asking for health and success. Liễu Hạnh is honoured as the Mother of the World.', claimIds: ['C-MAU'] },
      { heading: 'Lên đồng', text: 'Practice includes daily worship, festivals and lên đồng, a ritual in which a medium in costume embodies a series of spirits. UNESCO added these practices to its intangible heritage list in 2016.', claimIds: ['C-MAU'] },
      { heading: 'Open to anyone', text: 'The belief is open to people of any age, occupation or religion, and is most common in the north.', claimIds: ['C-MAU-OPEN'] },
      { editorial: true, text: 'Phủ Tây Hồ, on a spit of land in West Lake, is one Hà Nội shrine to Mother Liễu Hạnh. A ritual you come across is worship, not a show: watch quietly and ask before filming.', claimIds: [] }
    ],
    appliesTo: 'Northern Vietnam, from UNESCO, the UN in Viet Nam and the national tourism authority.',
    varies: 'Shrines and rituals differ; not everyone in the north takes part.', phraseIds: []
  }
];

/* the five Văn Miếu stops, written into explore.js (R.inline) */
const stops = [
  { name: 'Văn Miếu Gate', vi: 'Văn Miếu Môn', imageId: 'img-vm-gate', claimIds: ['C-VM-GATE'],
    text: 'The walk starts at a two-storey gate with three arches and the words Văn Miếu Môn above the middle one. Stone dragons guard it: Lê-period ones outside, Nguyễn-period ones inside. Straight ahead, Đại Trung gate leads on, with two small side gates named Thành Đức (“becoming virtuous”) and Đạt Tài (“reaching talent”).' },
  { name: 'Constellation of Literature pavilion', vi: 'Khuê Văn Các', imageId: 'img-vm-khuevan', claimIds: ['C-VM-KHUEVAN'],
    text: 'Built in 1805, this little two-storey pavilion has eight roofs and a round window on each side whose spokes stand for the rays of Khuê, the star of literature. Scholars’ best poems were once read aloud here. Today it is the symbol of Hà Nội.' },
  { name: 'Well of Heavenly Clarity and the stelae', vi: 'Thiên Quang Tỉnh', imageId: 'img-vm-well', claimIds: ['C-VM-WELL', 'C-VM-NOTOUCH'],
    text: 'A square pond sits at the centre of the third courtyard. On either side stand the 82 stone stelae, each on a stone turtle, erected between 1484 and 1780 with the names and home villages of the doctoral laureates of 82 examinations. The site asks visitors not to touch them.' },
  { name: 'Great Success courtyard', vi: 'Đại Thành', imageId: 'img-vm-daithanh', claimIds: ['C-VM-DAITHANH', 'C-VM-QUIET'],
    text: 'Through Đại Thành gate is a wide brick courtyard. Its side halls once held tablets for Confucius’s 72 disciples and Vietnamese scholars; at the end are the Đại Bái hall and the sanctuary of Confucius. A bronze bell cast in 1768 hangs on the left, a stone chime on the right. This is a place of worship, so keep your voice down.' },
  { name: 'National Academy', vi: 'Thái Học', imageId: 'img-vm-thaihoc', claimIds: ['C-VM-THAIHOC'],
    text: 'The last courtyard stands on the site of the old academy. It became a temple when the Nguyễn moved the school to Huế, burned in 1946–1947, and was rebuilt as Thái Học house in 2000. Upstairs are altars to the three kings who built and grew the school, Lý Thánh Tông, Lý Nhân Tông and Lê Thánh Tông; downstairs honours the teacher Chu Văn An.' }
];

const C = (title, author, page, license, licenseUrl) => ({ credit: author + ', “' + title + '”', sourceUrl: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(page.replace(/ /g, '_')), license, licenseUrl });
const BY4 = 'https://creativecommons.org/licenses/by/4.0/', BYSA4 = 'https://creativecommons.org/licenses/by-sa/4.0/', BYSA2 = 'https://creativecommons.org/licenses/by-sa/2.0/', BY2 = 'https://creativecommons.org/licenses/by/2.0/', CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/';
const photos = [
  ['img-vm-khuevan', 'vm-khue-van-cac.jpg', 'Constellation of Literature pavilion, Temple of Literature, Hanoi, Vietnam, 20240123 0931 3072.jpg', 'Jakub Hałun', 'CC BY 4.0', BY4, 'Khuê Văn Các at the Temple of Literature: a red two-storey pavilion with round windows, raised on four white brick pillars among trees.'],
  ['img-vm-gate', 'vm-gate.jpg', 'Temple of Literature - main gate.jpg', 'Greg Willis', 'CC BY-SA 2.0', BYSA2, 'The whitewashed three-arched main gate of the Temple of Literature, with a tiled upper storey and lawns in front.'],
  ['img-vm-well', 'vm-well.jpg', 'Well of Heavenly Clarity - Temple of Literature, Hanoi - DSC04565.JPG', 'Daderot', 'CC0', CC0, 'The square Well of Heavenly Clarity at the Temple of Literature, edged with stone, with Khuê Văn Các behind it.'],
  ['img-vm-daithanh', 'vm-dai-thanh.jpg', 'Gate of great synthesis (Dai Thanh) - Temple of Literature, Hanoi - DSC04579.JPG', 'Daderot', 'CC0', CC0, 'Đại Thành gate at the Temple of Literature: a red wooden gate building with a curved tiled roof, beside a bonsai tree.'],
  ['img-vm-thaihoc', 'vm-thai-hoc.jpg', 'Display in the upper chambers of the Temple of Literature (31454117685).jpg', 'shankar s.', 'CC BY 2.0', BY2, 'An altar in the upper hall of Thái Học house: a seated statue under a red-and-gold canopy, with offerings and tall vases in front.'],
  ['img-altar-tet', 'altar-tet.jpg', 'Tết 2024 nhà mình (cúng Tết đầu năm, bàn thờ gia tiên) (4).jpg', 'Phương Huy', 'CC0', CC0, 'A family altar at Tết: a dark wooden altar with framed photos, set with fruit, flowers and dishes of food.'],
  ['img-ngocson', 'hn-ngoc-son.jpg', 'Ngoc Son Temple on Hoan Kiem Lake (9753135371).jpg', 'Gary Todd', 'CC0', CC0, 'The red Thê Húc bridge leading across Hoàn Kiếm Lake to the gate of Ngọc Sơn temple, under trees.'],
  ['img-turtle-tower', 'hn-turtle-tower.jpg', 'Hanoi - Turtle Tower (Tháp Rùa), Hoàn Kiếm Lake.jpg', 'P. Hughes', 'CC BY 4.0', BY4, 'The small Turtle Tower on its islet in Hoàn Kiếm Lake, with city buildings on the far shore.'],
  ['img-doanmon', 'hn-doan-mon.jpg', 'Doan Mon Gate 1.jpg', 'Christophe95', 'CC BY-SA 4.0', BYSA4, 'Đoan Môn, the southern gate of the Thăng Long citadel: a long stone gate with arched doorways and a tiled pavilion on top, behind a lawn.'],
  ['img-tranquoc', 'hn-tran-quoc.jpg', 'Tran Quoc Pagoda, Hanoi, Vietnam, 20240123 1212 3310.jpg', 'Jakub Hałun', 'CC BY 4.0', BY4, 'Trấn Quốc pagoda on West Lake: a tall red tiered stupa behind a low wall, with palm trees and the lake in front.'],
  ['img-phu-tay-ho', 'hn-phu-tay-ho.jpg', 'Phu Tay Ho in 2015 01.jpg', 'Vuong Tri Binh', 'CC BY-SA 4.0', BYSA4, 'The ornate three-arched entrance gate of Phủ Tây Hồ, with people and stalls in front.'],
  ['img-banh-chung', 'banh-chung.jpg', 'Banh Chung in Vietnam.jpg', 'Syced', 'CC0', CC0, 'A square bánh chưng, the Tết rice cake, wrapped in leaves and tied with string, on a white plate.'],
  ['img-dongxuan', 'hn-dong-xuan.jpg', 'Hanoi, Dong Xuan market (6225885496).jpg', 'Arian Zwegers', 'CC BY 2.0', BY2, 'Inside Đồng Xuân market: a stall stacked to the ceiling with folded fabric in many colours.'],
  ['img-family-meal', 'family-meal.jpg', 'Vietnamese family daily meal.jpg', 'Hoangkid', 'CC BY-SA 4.0', BYSA4, 'A Vietnamese family meal seen from above: shared dishes of meat, vegetables and soup around a tray, with small bowls and chopsticks.'],
  ['img-bun-cha', 'bun-cha.jpg', 'Bun cha Hanoi.jpg', 'Weetjesman', 'CC BY-SA 4.0', BYSA4, 'Bún chả on a table: grilled pork in broth, a plate of noodles, fresh herbs and spring rolls.'],
  ['img-street-stall', 'hn-street-stall.jpg', 'Street Food - Hanoi - Vietnam (15852884012).jpg', 'Esin Üstün', 'CC BY 2.0', BY2, 'A pavement food stall in Hà Nội: a cook behind pots at the front, low blue stools, and people waiting.'],
  ['img-mam-com', 'mam-com.jpg', 'Món ăn Tết 2023 (bữa cơm gia đình, mâm cơm) (1).jpg', 'Phương Huy', 'CC BY-SA 4.0', BYSA4, 'A shared family meal on a patterned tray: a plate of meat, greens, a small bowl of broth and chopsticks.']
].map(([id, file, page, author, license, licenseUrl, alt]) => Object.assign({ id, kind: 'image', file: 'assets/img/' + file, alt }, C(page.replace(/\.(jpe?g|JPG)$/, '').replace(/ \(\d+\)$/, ''), author, page, license, licenseUrl), { note: 'Resized.', commonsFile: page }));

/* existing stories that get a photo now */
const storyImages = { 'st-shared-table': 'img-family-meal', 'st-host': 'img-bun-cha', 'st-chop': 'img-mam-com', 'st-street-stall': 'img-street-stall', 'st-market': 'img-dongxuan' };

module.exports = { sources, claims, stories, stops, photos, storyImages };
