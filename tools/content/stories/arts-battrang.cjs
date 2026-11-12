/* Story: Bát Tràng ceramics (st-bat-trang). Layout: guide.
   Researched 12 Nov 2026. The Lý-dynasty migration is tradition; documents place the village in the 14th–15th
   centuries. Sources disagree on the year the pottery craft was listed, so no year is given. Distances differ
   between sources (13–20 km); bus details are unconfirmed and left out. */
const today = '2026-11-12';

const sources = [
  { id: 'ND-BT-FESTIVAL', short: 'Nhân Dân', title: 'Công bố lễ hội làng Bát Tràng là Di sản văn hóa phi vật thể quốc gia — Nhân Dân', org: 'Nhân Dân, by Mai Lữ', url: 'https://nhandan.vn/cong-bo-le-hoi-lang-bat-trang-la-di-san-van-hoa-phi-vat-the-quoc-gia-post864820.html', type: 'press', checked: today,
    used: 'The tradition that under Lý Thái Tổ craftsmen from the villages of Bồ and Bát in Yên Mô (Ninh Bình) settled at Bát Tràng to make bricks and ceramics; the village festival recognised as national intangible heritage on 10 December 2024 and announced on 12 March 2025; the pottery craft already on the national list.',
    limits: 'A news report (March 2025); its year for the craft’s listing differs from other reports.' },
  { id: 'VGP-BATTRANG', short: 'Government portal', title: 'Bát Tràng ceramic village — Thăng Long, government portal', org: 'Government of Viet Nam portal (from vietnam-beauty.com)', url: 'https://thanglong.chinhphu.vn/english/bat-trang-ceramic-village-110154.htm', type: 'official', checked: today,
    used: 'Documents placing the village’s founding in the 14th or 15th century, villagers believing it older, and a legend of scholars bringing pottery skills from China.',
    limits: 'An introductory page (2010) reproduced from another site.' },
  { id: 'ND-BT-OLDCERAMICS', short: 'Nhân Dân', title: 'Gốm cổ Bát Tràng “kể chuyện” — Nhân Dân', org: 'Nhân Dân, by Tuyết Loan', url: 'https://nhandan.vn/gom-co-bat-trang-ke-chuyen-post753288.html', type: 'press', checked: today,
    used: 'A National Museum of History exhibition of 39 Bát Tràng pieces in three periods from the 14th to the 20th century; excavations at Kim Lan in 2001–03 finding material from the 9th to the 20th century; blue glaze emerging in the 14th century and widespread in the 16th–17th; crackle glaze from the different shrinking of body and glaze, deliberately controlled mainly in the 19th–20th centuries; brown glaze painted under the glaze; ivory-white glaze.',
    limits: 'An exhibition report (May 2023) drawing on museum curators.' },
  { id: 'VLM-KIMLAN', short: 'Vietnam Law Magazine', title: 'Kim Lan ceramics village rises from an ancient site to national heritage — Vietnam Law Magazine', org: 'Vietnam Law Magazine', url: 'https://vietnamlawmagazine.vn/kim-lan-ceramics-villages-rise-from-an-ancient-site-to-national-heritage-78888.html', type: 'press', checked: today,
    used: 'Neighbouring Kim Lan’s pottery craft added to the national intangible heritage list on 23 January 2025.',
    limits: 'A feature (2026).' },
  { id: 'BVH-WCC', short: 'Báo Văn Hóa', title: 'Bát Tràng và Vạn Phúc được vinh danh là thành viên của mạng lưới các thành phố thủ công sáng tạo trên toàn thế giới — Báo Văn Hóa', org: 'Báo Văn Hóa, by Hà Huy Anh', url: 'https://baovanhoa.vn/van-hoa/bat-trang-va-van-phuc-duoc-vinh-danh-la-thanh-vien-cua-mang-luoi-cac-thanh-pho-thu-cong-sang-tao-tren-toan-the-gioi-121235.html', type: 'press', checked: today,
    used: 'Bát Tràng ceramics and Vạn Phúc silk joining the World Crafts Council’s network of creative craft cities, with certificates presented on 14 February 2025 at the Thăng Long citadel.',
    limits: 'A news report (February 2025).' },
  { id: 'ND-BT-MUSEUM', short: 'Nhân Dân', title: 'Độc đáo Bảo tàng gốm Bát Tràng — Nhân Dân', org: 'Nhân Dân, by Thùy Linh', url: 'https://nhandan.vn/ocop/doc-dao-bao-tang-gom-bat-trang-post641619.html', type: 'press', checked: today,
    used: 'The Bát Tràng Ceramics Museum: seven spiral forms based on potters’ wheels and recalling the old bottle kilns; thin fibre-reinforced concrete faced with reclaimed local tiles and bricks; a 3,700 m² site beside the Bắc Hưng Hải canal; part of a craft-village centre.',
    limits: 'A report (April 2021) written before the museum opened.' },
  { id: 'CAFEF-BTMUSEUM', short: 'CafeF', title: 'Một công trình của Việt Nam tiếp tục lọt top kiến trúc đẹp nhất thế giới năm 2026 — CafeF', org: 'CafeF, by Ngọc Lan', url: 'https://cafef.vn/mot-cong-trinh-cua-viet-nam-tiep-tuc-lot-top-kien-truc-dep-nhat-the-gioi-nam-2026-dung-cung-loat-bieu-tuong-kinh-dien-toan-cau-nhu-den-taj-mahal-kim-tu-thap-giza-188260801153501776.chn', type: 'press', checked: today,
    used: 'The museum open since 2021; a gold prize at the National Architecture Awards 2022–23; 17th place in Time Out’s 2026 list of the world’s most beautiful buildings.',
    limits: 'A news report (August 2026).' },
  { id: 'WIKI-BTMUSEUM', short: 'Wikipedia', title: 'Bát Tràng Pottery Museum — Wikipedia', org: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/B%C3%A1t_Tr%C3%A0ng_Pottery_Museum', type: 'reference', checked: today,
    used: 'The architect, Hoàng Thúc Hào.',
    limits: 'An encyclopedia article citing Vietnamese press.' },
  { id: 'VNAT-BATTRANG', short: 'Vietnam Tourism', title: 'Full-day trip: Bát Tràng pottery village — vietnam.travel', org: 'Vietnam National Authority of Tourism', url: 'https://vietnam.travel/vi/things-to-do/full-day-trip-bat-trang-pottery-village', type: 'official', checked: today,
    used: 'Bát Tràng about 14 km from central Hà Nội, reached by bus, motorbike, taxi or tour; the pottery market a short walk away; the Vạn Vân old house, about 200 years old; workshops where visitors make their own pottery.',
    limits: 'An undated tourism page.' },
  { id: 'TCCT-MOSAIC', short: 'Tạp chí Công Thương', title: 'Bức tranh ghép gốm sứ Sông Hồng đạt kỷ lục thế giới — Tạp chí Công Thương', org: 'Tạp chí Công Thương', url: 'https://tapchicongthuong.vn/buc-tranh-ghep-gom-su-song-hong-dat-ky-luc-the-gioi-13009.htm', type: 'press', checked: today,
    used: 'The ceramic mosaic along the Red River dyke inaugurated on 5 October 2010 for Thăng Long’s millennium; a Guinness record as the largest ceramic mosaic for an 810 m section of 1,570.2 m²; the whole road 3.85 km and 6,950 m²; started by the journalist and painter Nguyễn Thị Thu Thủy and made by Vietnamese and foreign artists, children and artisans from Bát Tràng and other pottery villages.',
    limits: 'A news report (October 2010).' },
  { id: 'TTRA-MOSAIC2020', short: 'Thanh Tra', title: 'Hà Nội phá dỡ hơn 600m con đường gốm sứ để mở đường — Thanh Tra', org: 'Thanh Tra (from VietnamPlus), by Quang Hưng and Băng Châu', url: 'https://thanhtra.com.vn/an-sinh-AFA9C5670/ha-noi-pha-do-hon-600m-con-duong-gom-su-de-mo-duong-5D9BBB19.html', type: 'press', checked: today,
    used: 'More than 600 m of the mosaic demolished at Nghi Tàm–Xuân Diệu in June 2020 to widen the road towards Nhật Tân bridge; the mural nearly 4 km long, begun in 2008.',
    limits: 'A news report (June 2020).' }
];

const claims = [
  { id: 'C-BT-LEGEND', kind: 'legend', status: 'published', sourceIds: ['ND-BT-FESTIVAL', 'VGP-BATTRANG'], text: 'By tradition, when Lý Thái Tổ moved the capital to Thăng Long, craftsmen from the villages of Bồ and Bát in Yên Mô, Ninh Bình, settled at Bát Tràng to make bricks and ceramics for the new city. Another legend credits scholars who brought pottery skills from China.' },
  { id: 'C-BT-RECORD', kind: 'history', status: 'published', sourceIds: ['VGP-BATTRANG', 'ND-BT-OLDCERAMICS'], text: 'Documents place the village in the 14th or 15th century, and the oldest pieces in museum collections date from the 14th; villagers believe it is older.' },
  { id: 'C-BT-GLAZES', kind: 'history', status: 'published', sourceIds: ['ND-BT-OLDCERAMICS'], text: 'Bát Tràng’s glazes changed over the centuries: blue decoration appeared in the 14th century and was widespread by the 16th–17th; brown was painted under the glaze; ivory-white glaze appears on 17th-century pieces; and crackle glaze, from the body and glaze shrinking at different rates, was deliberately controlled mainly in the 19th and 20th centuries.' },
  { id: 'C-BT-EXHIBIT', kind: 'history', status: 'published', sourceIds: ['ND-BT-OLDCERAMICS'], text: 'In 2023 the National Museum of History showed 39 old Bát Tràng pieces in three periods, from the 14th century to the 20th, among them a 17th-century model house in ivory-white glaze.' },
  { id: 'C-BT-KIMLAN', kind: 'history', status: 'published', sourceIds: ['ND-BT-OLDCERAMICS', 'VLM-KIMLAN'], text: 'Excavations at neighbouring Kim Lan in 2001–03 found material from the 9th to the 20th century, and in January 2025 Kim Lan’s pottery was added to the national list of intangible heritage.' },
  { id: 'C-BT-HERITAGE', kind: 'law', status: 'published', sourceIds: ['ND-BT-FESTIVAL', 'BVH-WCC'], text: 'Bát Tràng’s pottery craft is on the national list of intangible heritage, and its village festival was added on 10 December 2024. In February 2025 Bát Tràng joined the World Crafts Council’s network of creative craft cities, together with the silk village of Vạn Phúc.' },
  { id: 'C-BT-MUSEUM', kind: 'custom', status: 'published', sourceIds: ['ND-BT-MUSEUM', 'CAFEF-BTMUSEUM', 'WIKI-BTMUSEUM'], text: 'The Bát Tràng Ceramics Museum, open since 2021 and designed by Hoàng Thúc Hào, is built as seven spirals based on potters’ wheels and recalling the old bottle kilns, in thin concrete faced with reclaimed local bricks and tiles, beside the Bắc Hưng Hải canal.' },
  { id: 'C-BT-AWARDS', kind: 'custom', status: 'published', sourceIds: ['CAFEF-BTMUSEUM'], text: 'The museum won a gold prize at the National Architecture Awards 2022–23 and was ranked 17th in Time Out’s 2026 list of the world’s most beautiful buildings.' },
  { id: 'C-BT-TRIP', kind: 'siteRule', status: 'published', sourceIds: ['VNAT-BATTRANG', 'VGP-BATTRANG', 'ND-BT-MUSEUM'], text: 'Bát Tràng is about 13–15 km from central Hà Nội, depending on the source; it can be reached by bus, motorbike, taxi or tour.' },
  { id: 'C-BT-SIGHTS', kind: 'siteRule', status: 'published', sourceIds: ['VNAT-BATTRANG'], text: 'In the village are the pottery market, the Vạn Vân old house of about 200 years, and workshops where visitors can make their own pottery.' },
  { id: 'C-BT-MOSAIC', kind: 'history', status: 'published', sourceIds: ['TCCT-MOSAIC'], text: 'The ceramic mosaic along the Red River dyke in Hà Nội, inaugurated on 5 October 2010 for the city’s millennium, ran 3.85 km. An 810 m section of 1,570 m² holds a Guinness record as the largest ceramic mosaic. It was started by the journalist and painter Nguyễn Thị Thu Thủy and made by artists from Vietnam and abroad, children and artisans from Bát Tràng and other pottery villages.' },
  { id: 'C-BT-MOSAIC2020', kind: 'history', status: 'published', sourceIds: ['TTRA-MOSAIC2020'], text: 'In June 2020 more than 600 m of the mosaic at Nghi Tàm–Xuân Diệu was demolished to widen the road towards Nhật Tân bridge.' },
  { id: 'C-BT-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Go on a weekday morning, start at the museum for the history, then walk to the market. Allow time for a pottery class, and bring a bag for anything fragile.' }
];

const story = {
  id: 'st-bat-trang',
  country: 'vietnam',
  layout: 'guide',
  title: 'Bát Tràng: the pottery village',
  dek: 'On the edge of Hà Nội, a village has been firing clay for some six hundred years. A guide to Bát Tràng: its glazes, its prize-winning museum, its market, and a wheel where you can make your own bowl.',
  place: 'Bát Tràng, Hà Nội',
  imageId: 'ar-bt-market',
  hero: { image: 'ar-bt-market' },
  appliesTo: 'Bát Tràng, a pottery village in Hà Nội. History follows the national history museum’s curators and Vietnamese press; visiting details, the national tourism authority.',
  varies: 'Workshops, prices and class times vary from house to house. Sources give the distance from the city as anything from 13 to 20 km, depending on where they measure from.',
  sections: [
    { text: 'Documents place Bát Tràng in the 14th or 15th century; tradition says it is older.', claimIds: ['C-BT-RECORD', 'C-BT-LEGEND'] },
    { heading: 'Visiting', text: 'The village is about 14 km from central Hà Nội, with a market, a museum and pottery classes.', claimIds: ['C-BT-TRIP', 'C-BT-SIGHTS'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'About 14 km from the Old Quarter, a village has been making pottery since at least the fourteenth century. Bát Tràng’s old pieces are in the national museums in Hà Nội, and its new ones fill the village market.', claimIds: ['C-BT-RECORD', 'C-BT-SIGHTS'] },
      { text: 'This guide takes you through a day there: the history in its glazes, the museum that has won prizes for its architecture, the market, and a potter’s wheel where you can try it yourself.', editorial: true }
    ] },
    { type: 'facts', title: 'Bát Tràng in brief', items: [
      { term: 'Where', text: 'About 14 km from central Hà Nội.' },
      { term: 'Since', text: '14th–15th century in the records; older by tradition.' },
      { term: 'Known for', text: 'Blue, brown and crackle glazes.' },
      { term: 'Heritage', text: 'National heritage craft; village festival listed 2024.' }
    ], claimIds: ['C-BT-TRIP', 'C-BT-RECORD', 'C-BT-GLAZES', 'C-BT-HERITAGE'] },

    { type: 'text', heading: 'Six hundred years of clay', id: 'history', paras: [
      { text: 'The village tells its origin as part of the capital’s. When Lý Thái Tổ moved the court to Thăng Long, the story goes, craftsmen from the villages of Bồ and Bát in Yên Mô, in today’s Ninh Bình, settled here to make the bricks and ceramics the new city needed. Another legend credits scholars who brought pottery skills from China. These are traditions.', claimIds: ['C-BT-LEGEND'] },
      { text: 'The records are later. Documents place the village in the fourteenth or fifteenth century, and the oldest Bát Tràng pieces in museum collections date from the fourteenth. Next door, at Kim Lan, archaeologists digging in 2001–03 found material spanning the ninth to the twentieth centuries; Kim Lan’s pottery joined the national list of intangible heritage in January 2025.', claimIds: ['C-BT-RECORD', 'C-BT-KIMLAN'] }
    ] },
    { type: 'text', heading: 'Reading the glazes', id: 'glazes', paras: [
      { text: 'The village’s history can be read in its glazes. Blue decoration appeared in the fourteenth century and was everywhere by the sixteenth and seventeenth. Brown was painted on before glazing. Ivory-white glaze appears on seventeenth-century pieces. And the fine web of cracks on many pieces is a technique, [[men-ran|men rạn]], crackle glaze: the clay body and the glaze shrink at different rates. Potters learned to control it deliberately mainly in the nineteenth and twentieth centuries.', claimIds: ['C-BT-GLAZES'] },
      { text: 'You can follow the whole sequence in one room. In 2023 the National Museum of History in Hà Nội showed 39 old Bát Tràng pieces in three periods: the fourteenth century, the fifteenth to eighteenth, and the nineteenth to twentieth. Side by side, the early blue pieces, the brown-painted ones and the crackled wares of the last two centuries show how the village’s style changed over six centuries. Among them was a seventeenth-century model house in ivory-white glaze.', claimIds: ['C-BT-EXHIBIT', 'C-BT-GLAZES'] }
    ] },
    { type: 'pair', items: [
      { image: 'ar-bt-vase', caption: 'Blue decoration: a 19th-century Bát Tràng vase.' },
      { image: 'ar-bt-tiger', caption: 'Crackle and brown glazes: an 18th-century tiger.' }
    ] },

    { type: 'steps', heading: 'A day in Bát Tràng', id: 'steps', items: [
      { title: 'Getting there', paras: [
        { text: 'Bát Tràng is about 14 km from central Hà Nội; sources give anything from 13 to 15 km, more if you measure from further out. Buses, motorbikes, taxis and tour shuttles all go there.', claimIds: ['C-BT-TRIP', 'C-BT-MOSAIC'] }
      ] },
      { title: 'Start at the museum', paras: [
        { text: 'The Bát Tràng Ceramics Museum, open since 2021, is the best place to begin. Its architect, Hoàng Thúc Hào, built it as seven spirals based on potters’ wheels, which also recall the village’s old bottle kilns, in thin concrete faced with reclaimed local bricks and tiles. It stands beside the Bắc Hưng Hải canal. It won a gold prize at the National Architecture Awards 2022–23, and in 2026 Time Out ranked it 17th among the world’s most beautiful buildings.', claimIds: ['C-BT-MUSEUM', 'C-BT-AWARDS'] }
      ] },
      { title: 'Walk the market', image: 'ar-bt-market', paras: [
        { text: 'The pottery market is a short walk away: stall after stall of bowls, cups, vases and pots.', claimIds: ['C-BT-SIGHTS'] }
      ] },
      { title: 'Into the lanes', image: 'ar-bt-lane', paras: [
        { text: 'In the village lanes, look for the Vạn Vân old house, about 200 years old, and the village communal house, whose festival was added to the national list of intangible heritage in December 2024.', claimIds: ['C-BT-SIGHTS', 'C-BT-HERITAGE'] }
      ] },
      { title: 'Make your own', image: 'ar-bt-wheel', paras: [
        { text: 'Many workshops let visitors sit at a wheel and shape their own piece.', claimIds: ['C-BT-SIGHTS'] }
      ] },
      { title: 'Carry it home', paras: [
        { text: 'Go on a weekday morning if you can, and allow time for a class. Bring a bag for anything fragile.', claimIds: ['C-BT-TIP'] }
      ] }
    ] },

    { type: 'text', heading: 'A craft city', id: 'heritage', paras: [
      { text: 'Bát Tràng’s pottery craft is on the national list of intangible heritage, and on 10 December 2024 the village festival was added too; it was announced at the communal house the following March. In February 2025, at a ceremony in the old Thăng Long citadel, Bát Tràng and the silk village of Vạn Phúc joined the World Crafts Council’s network of creative craft cities.', claimIds: ['C-BT-HERITAGE'] }
    ] },
    { type: 'figure', image: 'ar-bt-dinh', size: 'wide', caption: 'Bát Tràng’s communal house, home of the village festival.' },

    { type: 'text', heading: 'Four kilometres of tiles', id: 'mosaic', paras: [
      { text: 'Bát Tràng’s artisans also helped make one of Hà Nội’s longest artworks. For the city’s thousandth birthday, the journalist and painter Nguyễn Thị Thu Thủy proposed covering the Red River dyke wall with ceramic mosaic. Begun in 2008 and inaugurated on 5 October 2010, it ran for 3.85 km and was made by artists from Vietnam and abroad, by children, and by artisans from Bát Tràng and other pottery villages. An 810 m section of 1,570 m², called *Vietnamese patterns in the flow of history*, holds a Guinness record as the largest ceramic mosaic.', claimIds: ['C-BT-MOSAIC', 'C-BT-MOSAIC2020'] },
      { text: 'Not all of it survived. In June 2020 more than 600 m at Nghi Tàm–Xuân Diệu was demolished to widen the road towards Nhật Tân bridge.', claimIds: ['C-BT-MOSAIC2020'] }
    ] },
    { type: 'figure', image: 'ar-mosaic', size: 'bleed', caption: 'A stretch of the ceramic mosaic on the dyke road.' },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Worth doing', items: [
      { text: 'Start at the museum for the history.', claimIds: ['C-BT-MUSEUM'] },
      { text: 'Look for crackle, blue and brown glazes.', claimIds: ['C-BT-GLAZES'] },
      { text: 'Try a wheel in a workshop.', claimIds: ['C-BT-SIGHTS'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Taking crackle for age: it is a glaze.', claimIds: ['C-BT-GLAZES'] },
      { text: 'Carrying fragile pieces unwrapped.', claimIds: ['C-BT-TIP'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Distance', text: 'About 14 km from central Hà Nội.' },
      { term: 'See', text: 'Museum, market, Vạn Vân old house, communal house.' },
      { term: 'Do', text: 'Make your own piece at a wheel.' },
      { term: 'Look for', text: 'Men rạn, crackle glaze.' }
    ] },
    { type: 'quiz', image: 'ar-bt-tiger', question: 'Old or new?', prompt: 'A bowl in the market is covered in a fine web of cracks. What does that tell you?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'It must be very old', feedback: 'Not necessarily. Crackle is a glaze potters create on purpose.' },
      { label: 'It is a crackle glaze', fit: true, feedback: 'Yes. Men rạn comes from the clay and glaze shrinking at different rates, and potters control it deliberately.' },
      { label: 'It is damaged', feedback: 'No: the cracks are in the glaze, not the bowl.' }
    ] }
  ]
};

const glossary = [
  { id: 'men-ran', vi: 'men rạn', say: 'men zahn', en: 'Crackle glaze: a fine network of cracks made on purpose in the glaze.' }
];

module.exports = { sources, claims, glossary, stories: [story], topics: [{ id: 'arts', storyIds: ['st-bat-trang'] }] };
