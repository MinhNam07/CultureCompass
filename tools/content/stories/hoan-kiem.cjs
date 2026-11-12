/* Story: a day and a weekend by Hoàn Kiếm Lake (st-hoan-kiem-days). Layout: longform.
   Researched 12 Nov 2026. The sword story is told as legend; where sources disagree on the Turtle Tower or the walking street, the text says so. */
const today = '2026-11-12';

const sources = [
  { id: 'VGP-NGOCSON', short: 'Viet Nam Government Portal', title: 'Ngọc Sơn Temple and Hoàn Kiếm Lake — Viet Nam Government Portal, Hà Nội Capital', org: 'Viet Nam Government Portal (thanglong.chinhphu.vn)', url: 'https://thanglong.chinhphu.vn/english/ngoc-son-temple-and-hoan-kiem-lake-110195.htm', type: 'official', checked: today,
    used: 'The lake’s earlier name Lục Thủy (Green Water) and its renaming in the fifteenth century after the legend of Lê Lợi and the tortoise; the history of Ngọc Sơn Temple from a temple to Guan Yu to the 1841 Association of Good Deeds and its rebuilding in 1859–1862; Trần Hưng Đạo and Văn Xương; the Pen Tower; a turtle 2.1 m long found in 1967.',
    limits: 'A government feature of July 2010 with no author; it tells the sword story as legend.' },
  { id: 'VNAT-HOANKIEM', short: 'Vietnam Tourism', title: 'Hoan Kiem Lake', org: 'Vietnam National Authority of Tourism (SEA Games 31 visitor site)', url: 'https://seagames31.vietnamtourism.gov.vn/?p=1255', type: 'official', checked: '2026-11-01',
    used: 'The meaning of the name and the legend of Lê Lợi returning the sword to the Golden Turtle God in 1428.',
    limits: 'A visitor page made for the 2022 SEA Games; it tells the legend as a legend, not as history.' },
  { id: 'VNE-NGOCSON', short: 'VnExpress International', title: 'Ngoc Son Temple: A historic spiritual haven in Hanoi — VnExpress International', org: 'VnExpress International, by Phong Ngo', url: 'https://e.vnexpress.net/news/travel/places/ngoc-son-temple-4830235.html', type: 'press', checked: today,
    used: 'The temple on Jade Island honouring Trần Hưng Đạo and Văn Xương; the scholar Nguyễn Văn Siêu’s works of 1865 and the curved red Thê Húc bridge; the Pen Tower and Ink Slab; two preserved turtles on display; opening hours and the 50,000 đồng ticket.',
    limits: 'A travel feature of January 2025; hours and prices may change. Its date for Nguyễn Văn Siêu’s work differs from the government page.' },
  { id: 'VNN-TURTLETOWER', short: 'VietNamNet', title: 'Turtle tower: The architectural landmark of Hoan Kiem lake — VietNamNet', org: 'VietNamNet (credited to Hanoi Times)', url: 'https://vietnamnet.vn/en/turtle-tower-the-architectural-landmark-of-hoan-kiem-lake-E206914.html', type: 'press', checked: today,
    used: 'The tower built in 1884–1886 by Nguyễn Ngọc Kim, said to be a pretext to bury his parents on the islet; the earlier pavilion of Lê Thánh Tông and the Trịnh lords’ temple on the mound; brick storeys with Gothic arches under a Vietnamese roof.',
    limits: 'A feature of August 2018. Other accounts give the builder’s name, the date and the number of storeys differently.' },
  { id: 'TT-TURTLE', short: 'Tuổi Trẻ News', title: 'Vietnam’s giant turtle in Hoan Kiem Lake dies — Tuổi Trẻ News', org: 'Tuổi Trẻ News', url: 'https://news.tuoitre.vn/vietnams-giant-turtle-in-hoan-kiem-lake-dies-10337803.htm', type: 'press', checked: today,
    used: 'The turtle found dead on the afternoon of 19 January 2016; its 2011 measurements of 185 cm and 169 kg; old age and cold weather given as causes; its body taken to Ngọc Sơn Temple and then the Vietnam National Museum of Nature.',
    limits: 'A news report of January 2016.' },
  { id: 'VCT-MORNING', short: 'Vietcetera', title: 'Hanoi Perspectives: Morning Exercise by the Lake — Vietcetera', org: 'Vietcetera, by Manh Nguyen Huu', url: 'https://vietcetera.com/en/hanoi-perspectives-morning-exercise-by-the-lake', type: 'press', checked: today,
    used: 'Group exercise from 6 a.m., with some people arriving around 5 to meet friends; dancing groups behind an instructor, older women at tai chi, older men jogging, younger men doing push-ups.',
    limits: 'A photo feature (about 2016) covering both Hoàn Kiếm and West Lake.' },
  { id: 'VNS-KINKS', short: 'Việt Nam News', title: 'Getting the kinks out — Việt Nam News', org: 'Việt Nam News, by Richard Henderson', url: 'https://ovietnam.vietnamnews.vn/getting-the-kinks-out-post230980.html', type: 'press', checked: today,
    used: 'The walk around the lake as a loop of about 1.5 km; people walking, jogging and giving each other back massages in the morning.',
    limits: 'A column of October 2012.' },
  { id: 'VNP-WALK-2016', short: 'VietnamPlus', title: 'Hà Nội: Khai trương tuyến phố đi bộ quanh hồ Hoàn Kiếm — VietnamPlus', org: 'VietnamPlus (Vietnam News Agency)', url: 'https://www.vietnamplus.vn/ha-noi-khai-truong-tuyen-pho-di-bo-quanh-ho-hoan-kiem-post403911.vnp', type: 'press', checked: today,
    used: 'The walking space opened on the evening of 1 September 2016, from 7 p.m. on Friday to midnight on Sunday, on about 15 streets including Đinh Tiên Hoàng, Hàng Khay, Tràng Tiền and Lê Thái Tổ, closed to all vehicles.',
    limits: 'A report of the opening night (September 2016). Another report counts 14 streets.' },
  { id: 'VNE-WALK-2023', short: 'VnExpress International', title: 'Hoan Kiem walking street: where Hanoi comes alive during weekends — VnExpress International', org: 'VnExpress International, by Tam Anh', url: 'https://e.vnexpress.net/news/places/hoan-kiem-walking-street-where-hanoi-comes-alive-during-weekends-4641597.html', type: 'press', checked: today,
    used: 'Hours of 7 p.m. Friday to midnight Sunday; 25,000–35,000 visitors a weekend and up to 50,000 at Tết.',
    limits: 'A feature of August 2023. It calls September 2016 the official opening after a pilot, while other reports call it the start of the pilot.' },
  { id: 'BXD-LEZ', short: 'Báo Xây dựng', title: 'Hà Nội: Chính thức thí điểm vùng phát thải thấp trong Vành đai 1 từ ngày 1/7 — Báo Xây dựng', org: 'Báo Xây dựng (newspaper of the Ministry of Construction), by Mai Thu', url: 'https://baoxaydung.vn/ha-noi-chinh-thuc-thi-diem-vung-phat-thai-thap-trong-vanh-dai-1-tu-ngay-1-7-19226061515382322.htm', type: 'press', checked: today,
    used: 'The city council’s approval of a low-emission pilot zone on 15 June 2026: first phase limited to part of Hoàn Kiếm ward, with vehicles kept out from 7 p.m. to midnight on Friday to Sunday around the lake and the night market; the city not yet banning petrol motorbikes outright, with the wider limits moved to 2028.',
    limits: 'A report of the approval (June 2026), in Vietnamese.' },
  { id: 'DTI-LEZ', short: 'Dân Trí International', title: 'Hanoi begins vehicle ban in Hoan Kiem low-emission zone — DTiNews', org: 'Dân Trí International (DTiNews)', url: 'https://dtinews.dantri.com.vn/lifestyle/hanoi-begins-vehicle-ban-in-hoan-kiem-low-emission-zone-20260704084734369.htm', type: 'press', checked: today,
    used: 'The zone starting on the evening of 3 July 2026, with motorbikes and cars barred from 12 streets between 7 p.m. and midnight, residents asked to push their bikes, and police focusing on guidance at first.',
    limits: 'A report of the first weekend (July 2026).' },
  { id: 'WSJ-ENGLISH', short: 'The Wall Street Journal', title: 'The Hanoi Lake Where Kids Hustle American Tourists for English Lessons — The Wall Street Journal (republished by To Vima)', org: 'The Wall Street Journal, by Stu Woo (republished by To Vima)', url: 'https://www.tovima.com/wsj/the-hanoi-lake-where-kids-hustle-american-tourists-for-english-lessons/', type: 'press', checked: today,
    used: 'Children sent by teachers and parents to approach tourists at the lake at weekends with clipboards of questions to practise English.',
    limits: 'A feature of November 2026, read in a republished copy.' },
  { id: 'VNE-FOREIGNER', short: 'VnExpress International', title: 'Random conversations with foreigners won’t improve your English — VnExpress International', org: 'VnExpress International (opinion), by Bui Minh Duc', url: 'https://e.vnexpress.net/news/perspectives/why-random-conversations-with-foreigners-won-t-improve-your-english-4658675.html', type: 'press', checked: today,
    used: 'The habit of students approaching foreigners to practise English, and the writer’s view that it teaches little and can leave visitors uneasy.',
    limits: 'An opinion piece (October 2023); readers replied with the opposite view.' }
];

const claims = [
  { id: 'C-HK-NAME', kind: 'legend', status: 'published', sourceIds: ['VGP-NGOCSON', 'VNAT-HOANKIEM'], text: 'Hoàn Kiếm means “Returned Sword”. The lake was earlier called Lục Thủy, “Green Water”, and took its present name in the fifteenth century from the legend of Lê Lợi giving back his sword to a turtle; the tourism authority dates the legend to 1428.' },
  { id: 'C-SWORD-LEGEND', kind: 'legend', status: 'published', sourceIds: ['VGP-NGOCSON', 'VNAT-HOANKIEM'], text: 'In the legend, Lê Lợi found a sword that carried him through ten years of war against the Ming. After he became king, a giant turtle rose from the lake as he was boating, took the sword and dived; the lake has been called the Lake of the Returned Sword since.' },
  { id: 'C-HK-NGOCSON', kind: 'history', status: 'published', sourceIds: ['VGP-NGOCSON', 'VNE-NGOCSON'], text: 'Ngọc Sơn Temple, on Jade Island, honours the general Trần Hưng Đạo and Văn Xương, a patron of literature. A temple to Guan Yu stood there first; in 1841 the Association of Good Deeds took it over, and in the mid-nineteenth century the scholar Nguyễn Văn Siêu led its rebuilding (1859–1862 in one account, 1865 in another), with the red Thê Húc bridge and the Pen Tower on the shore.' },
  { id: 'C-HK-VISIT', kind: 'siteRule', status: 'published', sourceIds: ['VNE-NGOCSON'], text: 'As reported in January 2025, Ngọc Sơn Temple opens 7 a.m.–6 p.m. on weekdays and until 9 p.m. at weekends; a ticket costs 50,000 đồng, children under 16 enter free, and crossing the bridge is free.' },
  { id: 'C-HK-TOWER', kind: 'history', status: 'published', sourceIds: ['VNN-TURTLETOWER'], text: 'The Turtle Tower on the islet in the lake was built in the 1880s under French rule (1884–1886 in one account) by a local notable, Nguyễn Ngọc Kim, said to have used it as a pretext to bury his parents there. Earlier, a pavilion of King Lê Thánh Tông and a temple of the Trịnh lords stood on the mound. The tower mixes Gothic arches with a Vietnamese roof.' },
  { id: 'C-HK-TURTLE', kind: 'history', status: 'published', sourceIds: ['TT-TURTLE', 'VGP-NGOCSON', 'VNE-NGOCSON'], text: 'The last giant turtle known to live in the lake was found dead on 19 January 2016; measured in 2011, it was 185 cm long and weighed 169 kg, and officials blamed age and cold. Ngọc Sơn Temple displays preserved turtles, including one 2.1 m long found in 1967.' },
  { id: 'C-HK-MORNING', kind: 'custom', status: 'published', sourceIds: ['VCT-MORNING', 'VNS-KINKS'], text: 'From around 5 a.m. people come to exercise by Hoàn Kiếm Lake, and group sessions start at about 6: dancing behind an instructor, tai chi, jogging and walking the loop of about 1.5 km around the water.' },
  { id: 'C-HK-WALK', kind: 'custom', status: 'published', sourceIds: ['VNP-WALK-2016', 'VNE-WALK-2023'], text: 'Since 1 September 2016 the streets around Hoàn Kiếm Lake have closed to vehicles from 7 p.m. on Friday to midnight on Sunday and become a walking space, drawing 25,000–35,000 people a weekend. Hours change for holidays and events.' },
  { id: 'C-HK-LEZ', kind: 'history', status: 'published', sourceIds: ['BXD-LEZ', 'DTI-LEZ'], text: 'Since July 2026 the lake and the Old Quarter night-market streets have been the first phase of a low-emission pilot zone: motor vehicles are kept out from 7 p.m. to midnight on Friday to Sunday, and residents push their bikes. Wider limits on petrol motorbikes inside Ring Road 1 were moved to 2028.' },
  { id: 'C-HK-ENGLISH', kind: 'custom', status: 'published', sourceIds: ['WSJ-ENGLISH', 'VNE-FOREIGNER'], text: 'At weekends, children and students sent by teachers or parents approach foreign visitors by the lake to practise English, often with a list of questions. Some Vietnamese writers think it teaches little and can make visitors uneasy; others enjoy it.' },
  { id: 'C-HK-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: come at dawn for the exercise and on a weekend evening for the walking street; if a child asks to practise English, a few minutes is a kind gift and saying no politely is fine too.' }
];

const story = {
  id: 'st-hoan-kiem-days',
  layout: 'longform',
  title: 'Mornings and weekends by the lake',
  dek: 'Tai chi at dawn, a red bridge, a tower on an island and, on weekend nights, a city centre without engines: a day around Hoàn Kiếm Lake.',
  place: 'Hồ Hoàn Kiếm, Hà Nội',
  imageId: 'ev-lake-wide',
  hero: { image: 'ev-lake-wide' },
  appliesTo: 'Hoàn Kiếm Lake and the streets around it, in the heart of Hà Nội between the Old Quarter and the French quarter.',
  varies: 'Walking-street hours change for holidays and events, and the low-emission zone is a pilot. Temple hours and prices are as last reported. The sword story is a legend.',
  sections: [
    { text: 'From around 5 a.m. people gather by Hoàn Kiếm Lake to walk, dance and practise tai chi.', claimIds: ['C-HK-MORNING'] },
    { heading: 'A walking city at the weekend', text: 'From Friday evening to Sunday night the streets around the lake close to traffic and fill with people.', claimIds: ['C-HK-WALK'] },
    { heading: 'Practising English', text: 'Children and students sometimes approach visitors to practise English.', claimIds: ['C-HK-ENGLISH'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Before it is light, the lake already has company. Walkers come first, then the joggers, then groups who set up a speaker on the pavement and dance. By six there is tai chi under the trees and men doing push-ups against the railings. The water is still green and flat, the island tower dark in the middle of it. The traffic has not started yet.', claimIds: ['C-HK-MORNING'] },
      { text: 'Hoàn Kiếm Lake, [[ho|Hồ]] Hoàn Kiếm, is the centre of Hà Nội in every sense: the Old Quarter to its north, the French-built streets to its south. People simply call it Hồ Gươm, Sword Lake. It is small, a loop of about a kilometre and a half, and it is where the city comes to breathe.', claimIds: ['C-HK-MORNING', 'C-HK-NAME'] }
    ] },

    { type: 'text', heading: 'The sword and the turtle', id: 'legend', paras: [
      { text: 'The name comes from a legend every Vietnamese child learns. Lê Lợi, a landowner from Lam Sơn, found a sword that carried him through ten years of war against the Ming. After he won and became king, he was out on the lake in a boat when a giant turtle rose from the water, took the sword in its mouth and dived. The king understood the sword had only been lent. The lake, until then called Lục Thủy, Green Water, has been Hoàn Kiếm, the Returned Sword, ever since.', claimIds: ['C-SWORD-LEGEND', 'C-HK-NAME'] },
      { text: 'It is a legend, and the sources that tell it say so. The tourism authority places it in 1428; the government’s own history page says only the fifteenth century.', claimIds: ['C-HK-NAME'] }
    ] },
    { type: 'figure', image: 'ev-huc-bridge', size: 'wide', caption: 'The Thê Húc bridge to Jade Island and Ngọc Sơn Temple.' },

    { type: 'text', heading: 'A temple on Jade Island', id: 'temple', paras: [
      { text: 'At the northern end, a curved red wooden bridge, Thê Húc, often translated as Light of Dawn, leads to a small island and Ngọc Sơn Temple, the Temple of the Jade Mountain. It honours two figures: Trần Hưng Đạo, the general who defeated the Mongol invasions in the thirteenth century, and Văn Xương, a patron of literature and exams.', claimIds: ['C-HK-NGOCSON'] },
      { text: 'The site has changed hands more than once. A temple to Guan Yu stood here first. In 1841 it passed to a charitable society, the Association of Good Deeds, and in the middle of the century the scholar Nguyễn Văn Siêu led its rebuilding. Sources date that work to 1859–1862 or to 1865. On the shore he left the Pen Tower, a stone column topped like a brush tip, inscribed *Tả thanh thiên*: writing on the blue sky.', claimIds: ['C-HK-NGOCSON'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-ngoc-son-gate', caption: 'Inside Ngọc Sơn Temple.' },
      { image: 'ev-lake-night', caption: 'The bridge lit red at night.' }
    ] },

    { type: 'text', heading: 'The tower in the middle', id: 'tower', paras: [
      { text: 'The small tower on the islet in the middle of the lake is newer than it looks. It was built in the 1880s, under French rule, by a local notable. One account names him Nguyễn Ngọc Kim and says he put it up as a pretext to bury his parents’ remains on the island, a plan the neighbours foiled. Before that the mound had held a pavilion of King Lê Thánh Tông and a temple of the Trịnh lords.', claimIds: ['C-HK-TOWER'] },
      { text: 'Look at it closely and it is a mixture: Gothic pointed arches in the brick storeys, a Vietnamese curved roof on top. It has become the lake’s symbol, and the city’s, but the sources disagree on almost every detail about it, from the builder’s middle name to the number of storeys.', claimIds: ['C-HK-TOWER'] }
    ] },
    { type: 'figure', image: 'ev-turtle-tower', caption: 'The Turtle Tower on its islet.' },

    { type: 'text', heading: 'The last turtle', id: 'turtle', paras: [
      { text: 'The lake really did have giant turtles. The last one known to live there, a huge softshell that Hanoians called Cụ Rùa, great-grandfather turtle, was found dead on the afternoon of 19 January 2016. When scientists measured it in 2011 it was 185 centimetres long and weighed 169 kilos. Officials blamed old age and the cold.', claimIds: ['C-HK-TURTLE'] },
      { text: 'Its body went first to Ngọc Sơn Temple and then to the national museum of nature. In the temple you can still see preserved turtles from the lake, including one 2.1 metres long that was found in 1967.', claimIds: ['C-HK-TURTLE'] }
    ] },
    { type: 'facts', title: 'Names around the lake', items: [
      { term: 'Hồ Hoàn Kiếm', vi: true, text: 'Lake of the Returned Sword, its formal name.' },
      { term: 'Hồ Gươm', vi: true, text: 'Sword Lake, what most people call it.' },
      { term: 'Lục Thủy', vi: true, text: 'Green Water, the name before the legend.' },
      { term: 'Tháp Rùa', vi: true, text: 'The Turtle Tower on the islet.' },
      { term: 'Cầu Thê Húc', vi: true, text: 'The red bridge to Ngọc Sơn Temple.' }
    ], claimIds: ['C-HK-NAME', 'C-HK-NGOCSON', 'C-HK-TOWER'] },

    { type: 'timeline', heading: 'A day by the lake', label: 'Timeline of a day and a weekend at Hoàn Kiếm Lake', items: [
      { year: '5:00', title: 'First walkers', text: 'People arrive in the dark to walk and to meet friends before the exercise starts.', claimIds: ['C-HK-MORNING'] },
      { year: '6:00', title: 'Groups begin', text: 'Dance groups behind an instructor, tai chi under the trees, joggers on the loop.', claimIds: ['C-HK-MORNING'], image: 'ev-lake-angler', caption: 'Early morning at the water’s edge.' },
      { year: '7:00', title: 'The temple opens', text: 'Ngọc Sơn opens its gate; the bridge is free to cross, the temple takes a ticket.', claimIds: ['C-HK-VISIT'], image: 'ev-huc-bridge', caption: 'The Thê Húc bridge.' },
      { year: 'Day', title: 'A city crossroads', text: 'Traffic circles the lake; vendors and visitors fill the shore.', image: 'ev-lake-vendor', caption: 'A vendor by the lake.' },
      { era: 'Friday to Sunday' },
      { year: '19:00', title: 'Engines off', text: 'The streets around the lake close to vehicles and become a walking space.', claimIds: ['C-HK-WALK', 'C-HK-LEZ'], image: 'ev-lake-saturday', caption: 'Saturday night on the lakeside street.' },
      { year: '24:00', title: 'Back to traffic', text: 'At midnight on Sunday the roads reopen, until the walkers come back before dawn.', claimIds: ['C-HK-WALK'], image: 'ev-turtle-tower-night', caption: 'The Turtle Tower at night.' }
    ] },

    { type: 'text', heading: 'A city centre without engines', id: 'weekend', paras: [
      { text: 'On the evening of 1 September 2016, the city closed the streets around the lake to traffic for the first time. Since then, from seven on Friday evening to midnight on Sunday, about fifteen streets, among them Đinh Tiên Hoàng, Hàng Khay, Tràng Tiền and Lê Thái Tổ, belong to people on foot. By 2023 the walking space drew 25,000 to 35,000 people a weekend, and up to 50,000 at Tết.', claimIds: ['C-HK-WALK'] },
      { text: 'In July 2026 the same hours took on a second job. The lake and the Old Quarter night-market streets became the first phase of a low-emission pilot zone: from 7 p.m. to midnight, Friday to Sunday, motorbikes and cars are kept out of a dozen streets, and residents push their bikes home. The bigger plan, to limit petrol motorbikes across the whole inner ring road, has been pushed back to 2028.', claimIds: ['C-HK-LEZ'] }
    ] },
    { type: 'figure', image: 'ev-lake-saturday', size: 'bleed', caption: 'The walking street on a Saturday night.' },

    { type: 'text', heading: '“Excuse me, can I practise my English?”', id: 'english', paras: [
      { text: 'Sit on a bench at the weekend and a child with a clipboard may appear beside you, a parent or teacher hovering behind, ready with questions: where are you from, what is your name, do you like Vietnamese food. The habit is decades old. Students once came on their own; now teachers and parents send younger children.', claimIds: ['C-HK-ENGLISH'] },
      { text: 'Not everyone in Hà Nội approves. One writer in VnExpress argued that these short conversations teach little and can leave visitors uneasy; readers wrote back to say they enjoyed them. A few minutes is a kind gift. A polite no is fine too.', claimIds: ['C-HK-ENGLISH', 'C-HK-TIP'] }
    ] },

    { type: 'text', heading: 'If you go', id: 'visit', paras: [
      { text: 'Come twice: once at dawn for the exercise and the quiet water, and once on a weekend evening for the walking street. The full loop takes about twenty minutes at a stroll.', claimIds: ['C-HK-TIP', 'C-HK-MORNING'] },
      { text: 'Ngọc Sơn Temple was open from 7 a.m. to 6 p.m. on weekdays and until 9 p.m. at weekends when last reported, with a 50,000 đồng ticket and free entry for children under 16. Dress as you would for any place of worship, and ask before photographing people at prayer; our story [Asking before a photo](story:st-photo-ask) explains how.', claimIds: ['C-HK-VISIT'] }
    ] },
    { type: 'gallery', heading: 'More from the lake', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'ev-lake-wide', caption: 'The lake on a clear afternoon.' },
      { image: 'ev-turtle-tower-night', caption: 'The Turtle Tower at night.' },
      { image: 'ev-lake-angler', caption: 'Fishing from the shore.' },
      { image: 'ev-lake-night', caption: 'The red bridge after dark.' },
      { image: 'ev-ngoc-son-gate', caption: 'Inside Ngọc Sơn Temple.' }
    ] },
    { type: 'quiz', image: 'ev-turtle-tower', question: 'What does Hoàn Kiếm mean?', prompt: 'The lake’s name comes from a legend about King Lê Lợi. Choose the translation.', fitLabel: 'That fits', otherLabel: 'Look again', options: [
      { label: 'Green Water', feedback: 'Green Water, *Lục Thủy*, was the lake’s name before the legend.' },
      { label: 'Returned Sword', fit: true, feedback: 'The king gave his sword back to a turtle that rose from the water, so the lake became the Lake of the Returned Sword.' },
      { label: 'Turtle Tower', feedback: 'That is *Tháp Rùa*, the small tower in the middle of the lake, built in the 1880s.' }
    ] }
  ]
};

const glossary = [
  { id: 'ho', vi: 'hồ', say: 'hoh', en: 'Lake.' }
];

module.exports = { sources, claims, glossary, stories: [story] };
