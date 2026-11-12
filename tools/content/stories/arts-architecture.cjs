/* Story: tube houses and French-era Hà Nội (st-architecture). Layout: longform.
   Researched 12 Nov 2026. The "taxed by frontage" explanation for tube houses is widely repeated but no historical
   record was found, so it is given as a popular explanation. Architects and dates are given as each source states
   them; where they disagree, the story says so. The cathedral is left out: no reliable source was found in time.
   This module also marks the Arts theme ready. */
const today = '2026-11-12';

const sources = [
  { id: 'WIKI-TUBEHOUSE', short: 'Wikipedia', title: 'Tube house — Wikipedia', org: 'Wikipedia (English), citing The Straits Times, The Guardian and others', url: 'https://en.wikipedia.org/wiki/Tube_house', type: 'reference', checked: today,
    used: 'Tube houses originating in Hà Nội in the late 19th century; the explanation, repeated in the press, that property was taxed by street frontage.',
    limits: 'An encyclopedia article whose sources are newspapers; none cites a historical tax record.' },
  { id: 'VNN-MAMAY87', short: 'VietNamNet', title: 'Lạc vào thế kỷ XIX trong ngôi nhà giữa lòng phố cổ — VietNamNet', org: 'VietNamNet', url: 'https://vietnamnet.vn/lac-vao-the-ky-xix-trong-ngoi-nha-giua-long-pho-co-668842.html', type: 'press', checked: today,
    used: 'The house at 87 Mã Mây: built in the early 19th century; a rice business until 1945, then a Chinese family selling traditional medicine, then taken over by the state in 1954; the shop at the front, a courtyard, a back room, storage and kitchen, with the altar and bedrooms upstairs; restored from 1998 to 1999 with the city of Toulouse; recognised as a national relic in 2004.',
    limits: 'A feature (August 2020); other sources give a later build date.' },
  { id: 'VNE-MAMAY', short: 'VnExpress', title: 'Mã Mây, phố nằm trong phố — VnExpress', org: 'VnExpress, by Vy An', url: 'https://vnexpress.net/ma-may-pho-nam-trong-pho-2900551.html', type: 'press', checked: today,
    used: 'Mã Mây under 300 m long and keeping more old houses than any other street in Hà Nội.',
    limits: 'A feature (October 2013).' },
  { id: 'DBND-PHOCO-RULES', short: 'Đại biểu Nhân dân', title: 'Quản lý quy hoạch, kiến trúc khu phố cổ Hà Nội — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, interview with Đào Ngọc Nghiêm, by Diệu Linh', url: 'https://daibieunhandan.vn/quan-ly-quy-hoach-kien-truc-khu-pho-co-ha-noi-10131710.html', type: 'press', checked: today,
    used: 'A draft regulation for the 82 ha Old Quarter: a 28 ha conservation zone limited to 3 floors (12 m) on the street front and 4 behind, and a 54 ha renovation zone limited to 4 floors (16 m) on the street front and 5 behind.',
    limits: 'An interview (March 2013) about the draft; the adopted rules were not read.' },
  { id: 'BVH-PHOCO2026', short: 'Báo Văn Hóa', title: 'Từ những căn nhà chật hẹp đến yêu cầu bảo tồn phố cổ Hà Nội — Báo Văn Hóa', org: 'Báo Văn Hóa, by Tuấn Đông', url: 'https://baovanhoa.vn/van-minh-do-thi/tu-nhung-can-nha-chat-hep-den-yeu-cau-bao-ton-pho-co-ha-noi-279866.html', type: 'press', checked: today,
    used: '902 households, 3,621 people, in Hoàn Kiếm ward living on less than 5 m² each, given priority for social housing in 2026–27.',
    limits: 'A news report (October 2026).' },
  { id: 'TP-FRENCH6', short: 'Tiền Phong', title: 'Sáu công trình kiến trúc Pháp trăm tuổi tại Hà Nội xưa và nay — Tiền Phong', org: 'Tiền Phong (from VnExpress)', url: 'https://tienphong.vn/sau-cong-trinh-kien-truc-phap-tram-tuoi-tai-ha-noi-xua-va-nay-post984580.tpo', type: 'press', checked: today,
    used: 'The Opera House built from 1901 to 1911 to designs by Harley and Broyer; the Long Biên bridge 1,682 m long, then thought the largest steel structure in South-East Asia; the Post Office’s two buildings of 1893–99 and 1942; the Indochina Finance Office by Ernest Hébrard, built from 1925, now the Foreign Ministry; the Indochina University building completed in 1927.',
    limits: 'A then-and-now feature (October 2017); some names are spelt differently elsewhere.' },
  { id: 'WIKI-PRESPALACE', short: 'Wikipedia', title: 'Presidential Palace, Hanoi — Wikipedia', org: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/Presidential_Palace,_Hanoi', type: 'reference', checked: today,
    used: 'The palace built from 1900 to 1906 for the French Governor-General of Indochina; its architect credited to Charles Lichtenfelder, with the common credit to Auguste-Henri Vildieu called mistaken; visitors admitted to the grounds but not inside.',
    limits: 'An encyclopedia article; many Vietnamese and English sources credit Vildieu.' },
  { id: 'KTSG-LONGBIEN2025', short: 'Saigon Times', title: 'Pháp tài trợ 20 tỉ đồng nghiên cứu cải tạo cầu Long Biên — Saigon Times', org: 'Kinh tế Sài Gòn (Saigon Times), from the Vietnam News Agency', url: 'https://tuoitre.vn/saigontimes/phap-tai-tro-20-ti-dong-nghien-cuu-cai-tao-cau-long-bien/', type: 'press', checked: today,
    used: 'Long Biên built from 12 September 1898 to 28 February 1902, the first steel bridge across the Red River; a French grant of nearly 20 billion VND for a study of its repair and future use after national rail stops using it.',
    limits: 'A news report (March 2025).' },
  { id: 'KTSG-LONGBIEN2009', short: 'Saigon Times', title: 'Cầu Long Biên: từ ký ức hướng tới tương lai — Saigon Times', org: 'Kinh tế Sài Gòn (Saigon Times), by Thoa Nguyễn', url: 'https://tuoitre.vn/saigontimes/cau-long-bien-tu-ky-uc-huong-toi-tuong-lai', type: 'press', checked: today,
    used: 'The bridge built by Daydé & Pillé and first named after Governor-General Doumer; a single railway track in the middle; bombed many times between 1965 and 1972, losing spans on 10 September 1972 and reopening in January 1973.',
    limits: 'A feature (October 2009); it gives a different length from other sources and credits the design to the Eiffel firm, which others dispute.' },
  { id: 'VNEC-LONGBIEN2025', short: 'VnEconomy', title: 'Cầu Long Biên trong đợt sửa chữa lớn nhất hơn một thế kỷ qua — VnEconomy', org: 'VnEconomy', url: 'https://vneconomy.vn/cau-long-bien-trong-dot-sua-chua-lon-nhat-hon-mot-the-ky-qua.htm', type: 'press', checked: today,
    used: 'The largest repair in over a century in late 2025: rusted rivets replaced with high-strength bolts, new concrete deck slabs, railings and paint.',
    limits: 'A news report (December 2025).' },
  { id: 'TT-LONGBIEN2026', short: 'Tuổi Trẻ', title: 'Hà Nội cấm xe đi qua cầu Long Biên trong 2 tháng để sửa chữa — Tuổi Trẻ', org: 'Tuổi Trẻ, by Phạm Tuấn', url: 'https://tuoitre.vn/ha-noi-cam-xe-di-qua-cau-long-bien-trong-2-thang-de-sua-chua-20260326083632435.htm', type: 'press', checked: today,
    used: 'Motorbikes and pedestrians kept off the bridge from 28 March to 27 May 2026 for urgent repairs.',
    limits: 'A news report (March 2026).' },
  { id: 'BTLS-BUILDING', short: 'National Museum of History', title: 'The Vietnam National Museum of History: an impression of Indochinese architectural style', org: 'Vietnam National Museum of History, by Nguyễn Hải Vân', url: 'https://baotanglichsuquocgia.vn/en/Articles/3181/16824/the-vietnam-national-museum-of-history-an-impression-of-indochinese-architectural-style.html', type: 'official', checked: today,
    used: 'The building designed by C. Batteur and E. Hébrard in 1925, completed in 1929 and opened in 1932 as the École française d’Extrême-Orient’s Louis Finot Museum, at 1 Tràng Tiền; an octagonal main hall under a three-tiered roof the author compares to Keo pagoda; double roofs with gaps for air, wide eaves and concrete brackets; a typical example of Indochinese architecture.',
    limits: 'The museum’s own article (2014).' },
  { id: 'TTRA-VILLAS2022', short: 'Thanh Tra', title: 'Hà Nội công bố danh mục 1.216 biệt thự cũ trước năm 1954 — Thanh Tra', org: 'Thanh Tra, by Hải Hà', url: 'https://thanhtra.com.vn/an-sinh-AFA9C5670/ha-noi-cong-bo-danh-muc-1-216-biet-thu-cu-truoc-nam-1954-94C92CED.html', type: 'press', checked: today,
    used: 'A 2022 list of 1,216 villas built before 1954, 53 fewer than in 2013: 222 in group 1, of which 111 in Ba Đình and 87 in Hoàn Kiếm; 356 in group 2; 638 in group 3.',
    limits: 'A news report (June 2022).' },
  { id: 'ND-VILLAS2026', short: 'Nhân Dân', title: 'Hà Nội đưa 2 biệt thự cũ ra khỏi danh mục phải bảo tồn — Nhân Dân', org: 'Nhân Dân, by Lê Minh Thu', url: 'https://nhandan.vn/ha-noi-dua-2-biet-thu-cu-ra-khoi-danh-muc-phai-bao-ton-post1000088.html', type: 'press', checked: today,
    used: 'A 2025 resolution keeping 222 group-1 and 356 group-2 villas on the list to be preserved; a proposal before the city council in November 2026 to move two villas, 68B Trần Hưng Đạo and 62 Nguyễn Du, to group 3.',
    limits: 'A news report (4 November 2026); the outcome of the vote had not been reported when checked.' }
];

const claims = [
  { id: 'C-AR-TUBE', kind: 'history', status: 'published', sourceIds: ['WIKI-TUBEHOUSE', 'VNN-MAMAY87'], text: 'Tube houses, nhà ống, have a narrow front on the street and run deep behind it: a shop at the front, then a courtyard, rooms, storage and a kitchen, with the altar and bedrooms upstairs. The form is associated with Hà Nội’s Old Quarter from the 19th century.' },
  { id: 'C-AR-TAX', kind: 'legend', status: 'published', sourceIds: ['WIKI-TUBEHOUSE'], text: 'A popular explanation is that houses were taxed by the width of their street front. It is repeated widely in the press, but no historical tax record has been cited for it.' },
  { id: 'C-AR-MAMAY87', kind: 'history', status: 'published', sourceIds: ['VNN-MAMAY87'], text: 'The house at 87 Mã Mây was built in the early 19th century. It was a rice business until 1945, then a Chinese family’s traditional-medicine shop, and was taken over by the state in 1954. It was restored in 1998–99 with the French city of Toulouse and recognised as a national relic in 2004.' },
  { id: 'C-AR-MAMAY', kind: 'history', status: 'published', sourceIds: ['VNE-MAMAY'], text: 'Mã Mây is under 300 m long and keeps more old houses than any other street in Hà Nội.' },
  { id: 'C-AR-RULES', kind: 'law', status: 'published', sourceIds: ['DBND-PHOCO-RULES'], text: 'A 2013 draft regulation for the 82 ha Old Quarter proposed a 28 ha conservation zone, limited to 3 floors (12 m) on the street front, and a 54 ha renovation zone limited to 4 floors (16 m).' },
  { id: 'C-AR-CROWD', kind: 'custom', status: 'published', sourceIds: ['BVH-PHOCO2026'], text: 'In 2026, 902 households, 3,621 people, in Hoàn Kiếm ward were living on less than 5 m² each; the city gave them priority for social housing in 2026–27.' },
  { id: 'C-AR-OPERA', kind: 'history', status: 'published', sourceIds: ['TP-FRENCH6'], text: 'The Opera House was built from 1901 to 1911 to designs by the architects Harley and Broyer.' },
  { id: 'C-AR-PALACE', kind: 'history', status: 'published', sourceIds: ['WIKI-PRESPALACE'], text: 'The Presidential Palace was built from 1900 to 1906 for the French Governor-General of Indochina. Its architect is often given as Auguste-Henri Vildieu, but some sources credit Charles Lichtenfelder. Visitors may walk in the grounds but not go inside.' },
  { id: 'C-AR-POST', kind: 'history', status: 'published', sourceIds: ['TP-FRENCH6'], text: 'The Post Office by Hoàn Kiếm Lake is two buildings: one of 1893–99 and one of 1942.' },
  { id: 'C-AR-LONGBIEN', kind: 'history', status: 'published', sourceIds: ['KTSG-LONGBIEN2025', 'KTSG-LONGBIEN2009', 'TP-FRENCH6'], text: 'The Long Biên bridge was built from 1898 to 1902 by the French firm Daydé & Pillé and first named after Governor-General Doumer. It was the first steel bridge across the Red River, with a single railway track in the middle; sources give its length as about 1.7 to 1.9 km. Some credit its design to the Eiffel firm; others dispute it.' },
  { id: 'C-AR-LONGBIEN-WAR', kind: 'history', status: 'published', sourceIds: ['KTSG-LONGBIEN2009'], text: 'The bridge was bombed many times between 1965 and 1972; on 10 September 1972 spans fell, and it reopened in January 1973.' },
  { id: 'C-AR-LONGBIEN-NOW', kind: 'custom', status: 'published', sourceIds: ['KTSG-LONGBIEN2025', 'VNEC-LONGBIEN2025', 'TT-LONGBIEN2026'], text: 'In 2025 France funded a study of the bridge’s repair and future use, and late that year it had its largest repair in more than a century, with rusted rivets replaced by high-strength bolts and a new concrete deck. From 28 March to 27 May 2026 motorbikes and pedestrians were kept off for urgent repairs.' },
  { id: 'C-AR-HEBRARD', kind: 'history', status: 'published', sourceIds: ['BTLS-BUILDING', 'TP-FRENCH6'], text: 'In the 1920s the architect Ernest Hébrard designed the Indochina Finance Office, built from 1925 and now the Foreign Ministry, and, with C. Batteur, the Louis Finot Museum, whose roofs follow Vietnamese models.' },
  { id: 'C-AR-MUSEUM', kind: 'history', status: 'published', sourceIds: ['BTLS-BUILDING'], text: 'The Louis Finot Museum at 1 Tràng Tiền, designed in 1925, completed in 1929 and opened in 1932, is now the National Museum of History. Its octagonal hall rises under a three-tiered roof the museum compares to Keo pagoda, with double roofs, gaps for air, wide eaves and concrete brackets; it calls the building a typical example of Indochinese architecture.' },
  { id: 'C-AR-VILLAS', kind: 'law', status: 'published', sourceIds: ['TTRA-VILLAS2022', 'ND-VILLAS2026'], text: 'Hà Nội lists 1,216 villas built before 1954, in three groups. The 222 of group 1, the most valuable, are mostly in Ba Đình and Hoàn Kiếm. In November 2026 the city council considered moving two villas, at 68B Trần Hưng Đạo and 62 Nguyễn Du, down to group 3.' },
  { id: 'C-AR-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'A walk from 87 Mã Mây to the Opera House takes in both cities: the Old Quarter’s narrow fronts, then the lake, the Post Office and the wide French streets beyond.' }
];

const story = {
  id: 'st-architecture',
  country: 'vietnam',
  layout: 'longform',
  title: 'Tube houses and French villas',
  dek: 'Houses a few metres wide and many times as deep; an opera house, a bridge and a governor’s palace; a museum that put Vietnamese roofs on French concrete. How two very different cities grew side by side in Hà Nội, and what is being done to keep them.',
  place: 'Hà Nội',
  imageId: 'ar-tube-street',
  hero: { image: 'ar-tube-street' },
  appliesTo: 'The Old Quarter and the French-built quarters of central Hà Nội. Building histories follow Vietnamese press, the National Museum of History and an encyclopedia where noted; rules follow city reports.',
  varies: 'Dates and architects differ between sources for several buildings, and the story says where. Rules for the Old Quarter and the villas are revised from time to time.',
  sections: [
    { text: 'Tube houses have a narrow front and run deep behind it.', claimIds: ['C-AR-TUBE'] },
    { heading: 'The French city', text: 'The Opera House, the Long Biên bridge and the Presidential Palace were built around 1900.', claimIds: ['C-AR-OPERA', 'C-AR-LONGBIEN', 'C-AR-PALACE'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Walk from the Old Quarter towards the Opera House and the city changes shape. Behind you are streets of [[nhaong|tube houses]], each a narrow shopfront with rooms running far back behind it. Ahead are wide streets, a pale yellow palace, and the villas the French built for themselves. Hà Nội grew as two cities side by side, and both are still standing.', claimIds: ['C-AR-TUBE', 'C-AR-OPERA', 'C-AR-VILLAS'] },
      { text: 'This story walks through both: how a tube house works, where the narrow fronts may have come from, the public buildings of the colonial city, and the rules now meant to keep them. For the streets themselves, see [the Old Quarter](story:st-old-quarter).', editorial: true }
    ] },

    { type: 'text', heading: 'A house like a tube', id: 'tube', paras: [
      { text: 'A tube house, *nhà ống*, has a narrow front on the street and runs deep behind it. The front room was the shop. Behind it came an open courtyard to let in light and air, then a back room, storage and the kitchen; upstairs were the family altar and the bedrooms. The form is associated with Hà Nội’s Old Quarter from the nineteenth century.', claimIds: ['C-AR-TUBE'] },
      { text: 'Why so narrow? The answer most often given is that houses were taxed by the width of their street front, so owners kept fronts small and built back. It is repeated in newspapers and guidebooks, but no historical tax record has been cited for it. It may be true; it has not been shown.', claimIds: ['C-AR-TAX'] }
    ] },
    { type: 'figure', image: 'ar-tube-street', size: 'wide', caption: 'Narrow fronts at the corner of Đào Duy Từ and Mã Mây.' },
    { type: 'text', heading: '87 Mã Mây', id: 'mamay', paras: [
      { text: 'One house shows the plan clearly: 87 Mã Mây. The street is under 300 m long and keeps more old houses than any other in Hà Nội. Number 87 was built in the early nineteenth century; some sources say later. It was a rice business until 1945, then a Chinese family sold traditional medicine there, and in 1954 the state took it over. From 1998 to 1999 it was restored with help from the French city of Toulouse, keeping its structure and objects, and in 2004 it was recognised as a national relic.', claimIds: ['C-AR-MAMAY', 'C-AR-MAMAY87'] },
      { text: 'Inside, the plan of a tube house is easy to read: shop, courtyard, rooms, kitchen, and the altar upstairs.', claimIds: ['C-AR-TUBE', 'C-AR-MAMAY87'] }
    ] },
    { type: 'figure', image: 'ar-mamay-inside', size: 'inline', caption: 'Inside 87 Mã Mây.' },

    { type: 'text', heading: 'The French city', id: 'french', paras: [
      { text: 'The French colonial government’s public buildings came in a rush around the turn of the twentieth century. The Post Office beside Hoàn Kiếm Lake is two buildings, one of 1893–99 and one of 1942. The Opera House was built from 1901 to 1911 to designs by the architects Harley and Broyer.', claimIds: ['C-AR-POST', 'C-AR-OPERA'] },
      { text: 'The palace built for the Governor-General of Indochina from 1900 to 1906 is now the Presidential Palace. Its architect is often named as Auguste-Henri Vildieu; some sources say that is a mistake and credit Charles Lichtenfelder. Visitors may walk in the grounds but cannot go inside.', claimIds: ['C-AR-PALACE'] }
    ] },
    { type: 'pair', items: [
      { image: 'ar-opera', caption: 'The Opera House, 1901–11.' },
      { image: 'ar-palace', caption: 'The Presidential Palace, built for the Governor-General.' }
    ] },
    { type: 'figure', image: 'ar-postoffice', size: 'inline', caption: 'The Post Office by Hoàn Kiếm Lake.' },

    { type: 'text', heading: 'A steel bridge', id: 'longbien', paras: [
      { text: 'The biggest work of all crosses the Red River. The Long Biên bridge was built from September 1898 to February 1902 by the French firm Daydé & Pillé and named after the Governor-General, Paul Doumer. It was the first steel bridge across the river, with a single railway track down the middle, and at the time it was thought the largest steel structure in South-East Asia. Sources give its length as anything from about 1.7 to 1.9 km. Many guides say Gustave Eiffel’s firm designed it; that is disputed.', claimIds: ['C-AR-LONGBIEN'] },
      { text: 'During the war the bridge was bombed many times between 1965 and 1972. On 10 September 1972 spans fell into the river; it reopened in January 1973.', claimIds: ['C-AR-LONGBIEN-WAR'] },
      { text: 'In 2025 France funded a study of how to repair it and what it should become once the national railway stops using it. Late that year it had its largest repair in more than a century, with rusted rivets replaced by high-strength bolts and a new concrete deck; in spring 2026 motorbikes and pedestrians were kept off for two months.', claimIds: ['C-AR-LONGBIEN-NOW'] }
    ] },
    { type: 'figure', image: 'ar-longbien', size: 'bleed', caption: 'The Long Biên bridge over the Red River.' },

    { type: 'text', heading: 'Vietnamese roofs on French concrete', id: 'indochinese', paras: [
      { text: 'In the 1920s a building appeared that borrowed openly from Vietnamese architecture. Its architect, Ernest Hébrard, also designed the Indochina Finance Office, built from 1925 and now the Foreign Ministry, and he drew it with C. Batteur: a museum for the French school of Asian studies, the École française d’Extrême-Orient.', claimIds: ['C-AR-HEBRARD'] },
      { text: 'The museum, named after the scholar Louis Finot, was designed in 1925, finished in 1929 and opened in 1932 at 1 Tràng Tiền. It is now the National Museum of History. Its octagonal main hall rises under a three-tiered roof that the museum compares to the tower of Keo pagoda. The roofs are doubled, with gaps for the air to move, the eaves are wide, and the brackets are concrete. The museum calls it a typical example of the Indochinese style.', claimIds: ['C-AR-MUSEUM'] }
    ] },
    { type: 'figure', image: 'ar-history-museum', size: 'wide', caption: 'The former Louis Finot Museum, now the National Museum of History.' },
    { type: 'quote', text: 'A typical example of Indochinese architecture.', by: 'The National Museum of History, on its own building', claimIds: ['C-AR-MUSEUM'] },

    { type: 'timeline', heading: 'Building two cities', label: 'Timeline of Hà Nội architecture', items: [
      { year: 'Early 1800s', title: '87 Mã Mây', text: 'A tube house is built in the Old Quarter.', claimIds: ['C-AR-MAMAY87'] },
      { year: '1893–99', title: 'Post Office', text: 'The first Post Office building rises by the lake.', claimIds: ['C-AR-POST'] },
      { year: '1898–1902', title: 'Long Biên bridge', text: 'The first steel bridge across the Red River.', claimIds: ['C-AR-LONGBIEN'], image: 'ar-longbien', caption: 'Long Biên’s steel spans.' },
      { year: '1900–06', title: 'Governor-General’s palace', text: 'Now the Presidential Palace.', claimIds: ['C-AR-PALACE'] },
      { year: '1901–11', title: 'Opera House', text: 'Designed by Harley and Broyer.', claimIds: ['C-AR-OPERA'] },
      { year: '1925–32', title: 'Louis Finot Museum', text: 'Hébrard and Batteur’s Indochinese style.', claimIds: ['C-AR-MUSEUM'] },
      { year: '1972', title: 'Bombing', text: 'Long Biên loses spans on 10 September.', claimIds: ['C-AR-LONGBIEN-WAR'] },
      { year: '1999', title: 'Restoration', text: '87 Mã Mây restored with Toulouse.', claimIds: ['C-AR-MAMAY87'] },
      { year: '2022', title: '1,216 villas', text: 'The city lists its villas built before 1954.', claimIds: ['C-AR-VILLAS'] },
      { year: '2025–26', title: 'Long Biên repaired', text: 'The bridge’s largest repair in a century.', claimIds: ['C-AR-LONGBIEN-NOW'] }
    ] },

    { type: 'text', heading: 'Keeping the old city', id: 'keeping', paras: [
      { text: 'Both cities are under pressure. In the Old Quarter a 2013 draft regulation proposed limits for the 82 ha area: in a 28 ha conservation zone, buildings no higher than 3 floors, 12 m, on the street front; in the 54 ha around it, 4 floors, 16 m. Inside, many houses are crowded. In 2026, 902 households in Hoàn Kiếm ward, 3,621 people, were living on less than 5 m² each, and the city gave them priority for social housing in 2026–27.', claimIds: ['C-AR-RULES', 'C-AR-CROWD'] },
      { text: 'The French villas have a list of their own. In 2022 the city counted 1,216 villas built before 1954, 53 fewer than in 2013, in three groups. The 222 of group 1, the most valuable, are mostly in Ba Đình, 111 of them, and Hoàn Kiếm, 87. The list changes: in November 2026 the city council considered moving two villas, at 68B Trần Hưng Đạo and 62 Nguyễn Du, down to group 3.', claimIds: ['C-AR-VILLAS'] }
    ] },
    { type: 'figure', image: 'ar-villa', size: 'wide', caption: 'A French-era villa in Hà Nội.' },
    { type: 'facts', title: 'By the numbers', items: [
      { term: 'Mã Mây', text: 'Under 300 m, the most old houses of any street.' },
      { term: 'Old Quarter', text: '82 ha; draft height limit of 3 floors in the core.' },
      { term: 'Villas', text: '1,216 listed; 222 in the top group.' },
      { term: 'Long Biên', text: 'Built 1898–1902; about 1.7–1.9 km.' }
    ], claimIds: ['C-AR-MAMAY', 'C-AR-RULES', 'C-AR-VILLAS', 'C-AR-LONGBIEN'] },
    { type: 'note', text: 'A walk from 87 Mã Mây to the Opera House takes in both cities: the Old Quarter’s narrow fronts, then the lake, the Post Office and the wide French streets beyond.', claimIds: ['C-AR-TIP'] },
    { type: 'quiz', image: 'ar-tube-street', question: 'Why so narrow?', prompt: 'A guide tells you tube houses are narrow because the French taxed street frontage. What is the best answer?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'That is a proven fact', feedback: 'It is widely repeated, but no historical tax record has been cited for it.' },
      { label: 'It is a popular explanation', fit: true, feedback: 'Yes. It may be true, but it has not been shown from historical records.' },
      { label: 'It is certainly wrong', feedback: 'We cannot say that either: it simply has not been proven.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story], topics: [{ id: 'arts', storyIds: ['st-architecture'], status: 'ready', blurb: 'Water puppets and ca trù, folk prints and Bát Tràng pottery, tube houses and French villas: Hà Nội’s arts, with where to see them today.' }] };
