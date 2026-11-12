/* Story: the lake of the returned sword (st-sword-lake). Layout: timeline.
   Researched 12 Nov 2026. The legend is told as legend, and its written history follows a 2019 scholarly paper.
   The Turtle Tower builder's name differs between sources; no 2012 restoration was found, so none is claimed. */
const today = '2026-11-12';

const sources = [
  { id: 'VGP-LEGEND', short: 'Viet Nam Government Portal', title: 'The legend of Restored Sword Lake — Viet Nam Government Portal', org: 'Viet Nam Government Portal (thanglong.chinhphu.vn), text by Tô Hoài', url: 'https://thanglong.chinhphu.vn/english/the-legend-of-restored-sword-lake-110173.htm', type: 'gov', checked: today,
    used: 'The two-part legend: the fisherman Lê Thận netting a blade, Lê Lợi finding a hilt in a forest, the uprising against the Ming (1406–1428), and a giant turtle asking for the sword back.',
    limits: 'A retelling of the legend by a well-known writer (2010).' },
  { id: 'HCMUE-HOGUOM', short: 'HCMUE Journal of Science', title: 'Truyền thuyết “Hồ Hoàn Kiếm” — một cách đọc liên văn bản — Tạp chí Khoa học ĐHSP TP.HCM 16(2)', org: 'Lê Thời Tân, Nguyễn Văn Phương and Dương Văn Duyên (Hanoi Metropolitan University), HCMUE Journal of Science', url: 'https://journal.hcmue.edu.vn/index.php/hcmuejos/article/download/2452/2413/2690', type: 'academic', checked: today,
    used: 'The legend’s written history: the receiving of the sword in Lam Sơn thực lục (1431); late eighteenth-century accounts of a king who throws or loses his sword in the lake; the turtle taking the sword in Đại Nam nhất thống chí; the full return-the-sword story appearing in modern collections of folk tales; the old lake divided into Tả Vọng and Hữu Vọng, and Hữu Vọng filled by the French from 1884.',
    limits: 'A scholarly article (2019); its idea that the name Hồ Gươm comes from the lake’s shape is the authors’ own hypothesis.' },
  { id: 'VNN-TQDUC', short: 'VietNamNet', title: 'Có nhiều truyền thuyết về sự tích Hồ Gươm — VietNamNet', org: 'VietNamNet (from Thể thao & Văn hóa), interview with the researcher Trần Quang Đức', url: 'https://vietnamnet.vn/co-nhieu-truyen-thuyet-ve-su-tich-ho-guom-159345.html', type: 'press', checked: today,
    used: 'The researcher’s view that the oldest record has only the receiving of the sword, and that the episodes were strung together in the late nineteenth century.',
    limits: 'An interview (January 2014).' },
  { id: 'XD-HOGUOM', short: 'Tạp chí Xây dựng', title: 'Đặc điểm, tiềm năng và định hướng bảo tồn không gian Hồ Gươm — Tạp chí Xây dựng', org: 'Khuất Tân Hưng and Đặng Hoàng Vũ (Hanoi Architectural University), Tạp chí Xây dựng', url: 'https://vjol.info.vn/tcxd/article/download/84952/72206/', type: 'academic', checked: today,
    used: 'The lake once reaching from behind Hàng Đào to Hàng Chuối; a road dividing it in the early eighteenth century; an area of about 10.7 hectares today.',
    limits: 'A journal article (October 2023); its date for the division differs from other sources.' },
  { id: 'TT-THAPRUA', short: 'Tuổi Trẻ', title: 'Tháp Rùa — góc nhìn bình yên của Hà Nội — Tuổi Trẻ', org: 'Tuổi Trẻ, by Thái Lộc', url: 'https://tuoitre.vn/thap-rua-goc-nhin-binh-yen-cua-ha-noi-20180730093535287.htm', type: 'press', checked: today,
    used: 'The Turtle Tower about 9 m tall with four storeys and Gothic-style pointed arches; the architect Hoàng Đạo Kính calling it of no special architectural value; a cement re-plastering two decades earlier that drew public criticism; the lake’s old name Lục Thủy.',
    limits: 'A feature (July 2018).' },
  { id: 'VGP-THAPRUA', short: 'Viet Nam Government Portal', title: 'The Tortoise Stupa — Viet Nam Government Portal', org: 'Viet Nam Government Portal, text by Hữu Ngọc', url: 'https://hanoicapital.chinhphu.vn/the-tortoise-stupa-110110.htm', type: 'gov', checked: today,
    used: 'The tower built around 1886 by Bá Kim, who wanted to bury his father’s remains on the islet for geomantic reasons.',
    limits: 'An essay by a well-known cultural writer (2010).' },
  { id: 'VNN-THAPRUA2011', short: 'VietNamNet', title: 'Chuyện ít người biết về Tháp Rùa Hồ Gươm — VietNamNet', org: 'VietNamNet (from Pháp luật Việt Nam)', url: 'https://vietnamnet.vn/chuyen-it-nguoi-biet-ve-thap-rua-ho-guom-42802.html', type: 'press', checked: today,
    used: 'The two lower storeys in a Western style and the two upper in the style of Vietnamese temples; the burial story as oral tradition that cannot be verified; a bronze copy of the Statue of Liberty on the tower in the 1890s, later moved and pulled down in 1945.',
    limits: 'A feature (2011); gives the builder a different name.' },
  { id: 'VNE-RUA1967', short: 'VnExpress', title: 'Tu sửa tiêu bản rùa hồ Gươm — VnExpress', org: 'VnExpress, by Như Trang', url: 'https://vnexpress.net/tu-sua-tieu-ban-rua-ho-guom-1961599.html', type: 'press', checked: today,
    used: 'The turtle that died on 2 June 1967, about 200 kg and 1.9 m long, preserved at Ngọc Sơn and restored in 2003.',
    limits: 'A news report (December 2003); other sources give 2.1 m and 250 kg.' },
  { id: 'VNE-RUA2011', short: 'VnExpress', title: 'Rùa hồ Gươm được đưa lên cạn; Rùa Hồ Gươm là “cụ bà” — VnExpress', org: 'VnExpress, by Hương Thu', url: 'https://vnexpress.net/rua-ho-guom-duoc-dua-len-can-2191589.html', type: 'press', checked: today,
    used: 'The turtle caught on 3 April 2011 for treatment of skin disease, 185 cm long and 169 kg, and found by DNA tests to be female.',
    limits: 'News reports (April 2011).' },
  { id: 'VNE-RUA2016', short: 'VnExpress', title: 'Rùa hồ Gươm ước tính 200 tuổi — VnExpress', org: 'VnExpress, by Phạm Hương', url: 'https://vnexpress.net/rua-ho-guom-uoc-tinh-200-tuoi-3345624.html', type: 'press', checked: today,
    used: 'The turtle found dead on 19 January 2016 by the Lê Thái Tổ shore, and a scientist’s estimate of its age at about 200 years.',
    limits: 'A news report (January 2016); the age is an estimate.' },
  { id: 'VNEI-RUA2019', short: 'VnExpress International', title: 'Vietnam’s legendary giant turtle plastinated for life — VnExpress International', org: 'VnExpress International, by Ngọc Thành', url: 'https://e.vnexpress.net/news/news/vietnam-s-legendary-giant-turtle-plastinated-for-life-3896297.html', type: 'press', checked: today,
    used: 'The 2016 turtle preserved by German experts and displayed at Ngọc Sơn beside the 1967 specimen, in a cooled glass case.',
    limits: 'A news report (March 2019); its length differs from the 2011 measurement.' },
  { id: 'FARKAS-2011', short: 'Russian Journal of Herpetology', title: 'Rafetus vietnamensis Le et al., 2010 — another invalid name for an invalid species of softshell turtle — Russian Journal of Herpetology 18(1)', org: 'B. Farkas, Le Minh Duc and Nguyen Quang Truong', url: 'https://iucn-tftsg.org/wp-content/uploads/file/Articles/Farkas_etal_2011.pdf', type: 'academic', checked: today,
    used: 'Most specialists treating the Hoàn Kiếm turtle as Rafetus swinhoei, the Yangtze giant softshell, while some Vietnamese scientists named it a species of its own.',
    limits: 'A scientific paper (2011) taking one side of a dispute.' },
  { id: 'WCS-2025', short: 'WCS Vietnam', title: 'First portable eDNA test for the Swinhoe’s softshell turtle — WCS Vietnam', org: 'Wildlife Conservation Society, Vietnam programme', url: 'https://programs.wcs.org/vietnam/en-us/News/Media-Releases/ID/24090/First-Portable-eDNA-Test.aspx', type: 'gov', checked: today,
    used: 'Two animals of the species known as of 2024: one in the wild in Vietnam and one captive male in Suzhou, China.',
    limits: 'A conservation group’s release (January 2025).' },
  { id: 'HNO-DONGMO', short: 'Hà Nội Online', title: 'Bẫy bắt cá thể rùa Hoàn Kiếm tại Đồng Mô để bảo tồn — Hà Nội Online', org: 'Hà Nội Online (Hà Nội Radio and Television)', url: 'https://hanoionline.vn/bay-bat-ca-the-rua-hoan-kiem-tai-dong-mo-de-bao-ton-246375267.htm', type: 'press', checked: today,
    used: 'A female of the species caught at Đồng Mô lake in 2020 and found dead in April 2023; a trapping attempt in December 2025 that did not succeed.',
    limits: 'A news report (December 2025).' },
  { id: 'BQT-ROI', short: 'Báo Thế giới & Việt Nam', title: 'Về đất tổ của nghề rối nước — Báo Thế giới & Việt Nam', org: 'Báo Thế giới & Việt Nam, by Phương Thảo and Hương Giang', url: 'https://baoquocte.vn/ve-dat-to-cua-nghe-roi-nuoc-310719.html', type: 'press', checked: today,
    used: '“Lê Lợi trả gươm thần”, Lê Lợi returning the sword, as an established water-puppet act.',
    limits: 'A feature (April 2025) about one village troupe.' },
  { id: 'VNE-DONGHOGUOM', short: 'VnExpress', title: 'Tháo dỡ công trình bên Hồ Gươm — VnExpress', org: 'VnExpress, by Võ Hải', url: 'https://vnexpress.net/thao-do-cong-trinh-ben-ho-guom-5007991.html', type: 'press', checked: today,
    used: 'Demolition on the east shore beginning on 19 January 2026 to make a square and park of about 2.14 hectares.',
    limits: 'A news report (January 2026).' }
];

const claims = [
  { id: 'C-SWORD-TWO', kind: 'legend', status: 'published', sourceIds: ['VGP-LEGEND', 'HCMUE-HOGUOM'], text: 'In the fullest telling, a fisherman, Lê Thận, nets a blade, and Lê Lợi finds a hilt in a forest; they fit together, and the sword carries Lê Lợi’s uprising to victory over the Ming. Years later, boating on the lake as king, he meets a golden turtle who asks him to return the sword to the Dragon King.' },
  { id: 'C-SWORD-TEXTS', kind: 'history', status: 'published', sourceIds: ['HCMUE-HOGUOM', 'VNN-TQDUC'], text: 'The oldest record, Lam Sơn thực lục (1431), has only the finding of the sword. Late eighteenth-century writers tell of a king who throws or loses his sword in the lake; the nineteenth-century Đại Nam nhất thống chí has a turtle take it. Scholars think the full story of receiving and returning the sword was put together in the late nineteenth century and fixed by modern folk-tale collections.' },
  { id: 'C-SWORD-OMEN', kind: 'history', status: 'published', sourceIds: ['HCMUE-HOGUOM'], text: 'In the older texts, losing the sword reads as an omen of the dynasty’s decline; the dignified return to the Dragon King belongs to the later telling taught in schools today.' },
  { id: 'C-LAKE-NAMES', kind: 'history', status: 'published', sourceIds: ['HCMUE-HOGUOM', 'TT-THAPRUA', 'VGP-NGOCSON'], text: 'The lake was once called Lục Thủy, Green Water. A road divided it into Tả Vọng (left) and Hữu Vọng (right), and the right half, used to drill the navy, was filled by the French from 1884 for the first French quarter.' },
  { id: 'C-LAKE-SIZE', kind: 'history', status: 'published', sourceIds: ['XD-HOGUOM'], text: 'The old lake reached from behind Hàng Đào to Hàng Chuối; today it covers about 10.7 hectares. Architects date the dividing road to the early eighteenth century, earlier than some other accounts.' },
  { id: 'C-TOWER-BUILT', kind: 'history', status: 'published', sourceIds: ['VGP-THAPRUA', 'VNN-THAPRUA2011', 'VNN-TURTLETOWER'], text: 'The Turtle Tower was built around 1886 by a wealthy local called Bá Kim (usually named Nguyễn Ngọc Kim; one account says Nguyễn Hữu Kim). The story that he meant to bury his father’s remains on the islet is oral tradition that cannot be verified.' },
  { id: 'C-TOWER-STYLE', kind: 'history', status: 'published', sourceIds: ['TT-THAPRUA', 'VNN-THAPRUA2011'], text: 'The tower is about 9 m tall, with four storeys: Gothic-style pointed arches below and a Vietnamese temple roof above. An architect quoted by Tuổi Trẻ says it has no special architectural value; its value lies in what it means to the city.' },
  { id: 'C-TOWER-LIBERTY', kind: 'history', status: 'published', sourceIds: ['VNN-THAPRUA2011'], text: 'In the 1890s a bronze copy of the Statue of Liberty stood on the tower; it was later moved elsewhere in the city and pulled down in 1945.' },
  { id: 'C-TURTLE-1967', kind: 'history', status: 'published', sourceIds: ['VNE-RUA1967', 'VGP-NGOCSON'], text: 'A giant turtle that died on 2 June 1967 was preserved and is displayed at Ngọc Sơn temple; reports give it as 1.9–2.1 m long and 200–250 kg.' },
  { id: 'C-TURTLE-2011', kind: 'history', status: 'published', sourceIds: ['VNE-RUA2011'], text: 'In April 2011 the lake’s last known turtle was caught for treatment of a skin disease. It measured 185 cm and weighed 169 kg, and DNA tests showed it was female.' },
  { id: 'C-TURTLE-2016', kind: 'history', status: 'published', sourceIds: ['VNE-RUA2016', 'TT-TURTLE', 'VNEI-RUA2019'], text: 'She was found dead on 19 January 2016, aged about 200 by one scientist’s estimate. Preserved by German specialists, she has been on display at Ngọc Sơn since 2019, beside the turtle of 1967.' },
  { id: 'C-TURTLE-SPECIES', kind: 'history', status: 'published', sourceIds: ['FARKAS-2011', 'WCS-2025', 'HNO-DONGMO'], text: 'Most specialists consider the Hoàn Kiếm turtle a Yangtze giant softshell (Rafetus swinhoei), though some Vietnamese scientists named it a species of its own. As of 2024 only two of the species were known: one in the wild in Vietnam and one captive male in China. The last known female in Vietnam died at Đồng Mô lake in 2023.' },
  { id: 'C-SWORD-PUPPETS', kind: 'custom', status: 'published', sourceIds: ['BQT-ROI'], text: 'Lê Lợi returning the sword is a classic act of water puppetry.' },
  { id: 'C-LAKE-EAST', kind: 'custom', status: 'published', sourceIds: ['VNE-DONGHOGUOM'], text: 'In January 2026 the city began clearing buildings on the east shore to make a square and park of about 2.14 hectares.' }
];

const story = {
  id: 'st-sword-lake',
  layout: 'timeline',
  title: 'The lake of the returned sword',
  dek: 'A sword from the water, a turtle who took it back, and a lake that kept the story. How the legend of Hoàn Kiếm grew over six hundred years, and the real turtles that lived in it.',
  place: 'Hoàn Kiếm Lake, Hà Nội',
  imageId: 'ev-turtle-tower',
  hero: { image: 'ev-turtle-tower-night' },
  appliesTo: 'Hoàn Kiếm Lake in central Hà Nội. The legend is a legend; its written history follows Vietnamese scholars.',
  varies: 'The legend is told in several versions. Sources differ on the Turtle Tower’s builder and on the turtles’ measurements.',
  sections: [
    { text: 'In the legend, after the victory over the Ming, a golden turtle rose from the lake and asked Lê Lợi to return his magic sword; the lake became Hoàn Kiếm, the Lake of the Returned Sword.', claimIds: ['C-SWORD-LEGEND'] },
    { heading: 'Turtle Tower', text: 'The small tower on the islet was built around 1886.', claimIds: ['C-TOWER-BUILT'] },
    { heading: 'Ngọc Sơn temple', text: 'At the north end, the red Thê Húc bridge leads to Ngọc Sơn temple.', claimIds: ['C-NGOCSON'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Every Hanoian child learns the story. A fisherman pulls a blade from the river in his net; a rebel leader finds a hilt in a forest. Put together, they make a sword that carries the uprising of Lê Lợi to victory over the Ming. Years later, when Lê Lợi is king and boating on a lake in his capital, a golden turtle rises from the water and asks him to return the sword to the Dragon King. He does, and the lake is named Hoàn Kiếm, the Returned Sword.', claimIds: ['C-SWORD-TWO', 'C-SWORD-LEGEND'] },
      { text: 'It is a legend, and like most legends it has a history of its own: it took centuries to reach the form taught in schools today. And the lake did have giant turtles, real ones, until the last of them died in 2016. This story follows both.', claimIds: ['C-SWORD-TEXTS', 'C-TURTLE-2016'] }
    ] },
    { type: 'facts', title: 'The lake in brief', items: [
      { term: 'Name', text: 'Hoàn Kiếm, “Returned Sword”; earlier Lục Thủy, “Green Water”.' },
      { term: 'Size', text: 'About 10.7 hectares, once much larger.' },
      { term: 'Turtle Tower', text: 'Built around 1886, about 9 m tall.' },
      { term: 'Last turtle', text: 'Died 19 January 2016.' }
    ], claimIds: ['C-LAKE-NAMES', 'C-LAKE-SIZE', 'C-TOWER-BUILT', 'C-TURTLE-2016'] },

    { type: 'text', heading: 'How the legend grew', id: 'legend', paras: [
      { text: 'Scholars at Hanoi Metropolitan University have traced the story through the old books. The oldest, *Lam Sơn thực lục* of 1431, the official history of Lê Lợi’s war, tells only half of it: the fisherman Lê Thận netting a strip of iron inscribed with the words “Thuận Thiên”, and Lê Lợi praying that the blade and hilt, if heaven-sent, should fit. There is no lake and no turtle.', claimIds: ['C-SWORD-TEXTS'] },
      { text: 'The lake comes later. Writers of the late eighteenth century tell of a king who sees a huge turtle, points his sword at it, and throws or drops the sword into the water. In these versions losing the sword is a bad omen, a sign of a dynasty’s decline. The nineteenth-century geography *Đại Nam nhất thống chí* has the turtle take the sword in its mouth and dive.', claimIds: ['C-SWORD-TEXTS', 'C-SWORD-OMEN'] },
      { text: 'The version Hanoians know now, with the sword received from the water and solemnly given back to the Dragon King, was strung together in the late nineteenth century, says the researcher Trần Quang Đức, and fixed in modern collections of folk tales and the school textbook. The legend did not shrink with time. It grew.', claimIds: ['C-SWORD-TEXTS', 'C-SWORD-OMEN'] }
    ] },
    { type: 'quote', text: 'Your Majesty, return the sword to the Dragon King!', by: 'The golden turtle, in the modern folk telling, our translation', claimIds: ['C-SWORD-TEXTS'] },

    { type: 'timeline', heading: 'Six centuries of a legend', label: 'Timeline of Hoàn Kiếm Lake', items: [
      { era: 'The story' },
      { year: '1428', title: 'Victory over the Ming', text: 'Lê Lợi’s uprising ends twenty years of Ming rule. In the legend, the sword returns to the water soon after.', claimIds: ['C-SWORD-TWO', 'C-HK-NAME'] },
      { year: '1431', title: 'The first record', text: 'Lam Sơn thực lục tells of the sword’s finding, but not its return.', claimIds: ['C-SWORD-TEXTS'] },
      { year: '1700s', title: 'A lake divided', text: 'A road splits the lake into Tả Vọng and Hữu Vọng. Late in the century, writers tell of a king losing his sword to a turtle.', claimIds: ['C-LAKE-SIZE', 'C-LAKE-NAMES', 'C-SWORD-TEXTS'] },
      { year: '1800s', title: 'The turtle takes the sword', text: 'Đại Nam nhất thống chí has the turtle seize the sword and dive.', claimIds: ['C-SWORD-TEXTS'] },
      { era: 'Under French rule' },
      { year: '1884', title: 'Half the lake disappears', text: 'The French fill Hữu Vọng to build the first French quarter.', claimIds: ['C-LAKE-NAMES'] },
      { year: 'c. 1886', title: 'The Turtle Tower', text: 'A wealthy local, Bá Kim, builds a small tower on the islet.', claimIds: ['C-TOWER-BUILT'], image: 'ev-turtle-tower', caption: 'The Turtle Tower on its islet.' },
      { year: '1890s', title: 'Liberty on the lake', text: 'A bronze copy of the Statue of Liberty briefly stands on the tower.', claimIds: ['C-TOWER-LIBERTY'] },
      { era: 'The real turtles' },
      { year: '1967', title: 'A giant found dead', text: 'A turtle of about 200 kg dies; it is preserved at Ngọc Sơn.', claimIds: ['C-TURTLE-1967'], image: 'ev-ngoc-son-gate', caption: 'Inside Ngọc Sơn temple.' },
      { year: '2011', title: 'Treatment', text: 'The last known turtle is caught and treated for skin disease: 185 cm, 169 kg, female.', claimIds: ['C-TURTLE-2011'] },
      { year: '2016', title: 'The last turtle dies', text: 'She is found dead on 19 January, aged about 200 by one estimate.', claimIds: ['C-TURTLE-2016'], image: 'ev-lake-wide', caption: 'Hoàn Kiếm Lake.' },
      { year: '2019', title: 'On display', text: 'Preserved by German specialists, she joins the 1967 turtle at Ngọc Sơn.', claimIds: ['C-TURTLE-2016'], image: 'hk-specimen', caption: 'A preserved turtle on display at Ngọc Sơn.' },
      { year: '2026', title: 'A new east shore', text: 'Buildings on the east bank are cleared for a lakeside square and park.', claimIds: ['C-LAKE-EAST'] }
    ] },

    { type: 'text', heading: 'Green Water, Left and Right', id: 'names', paras: [
      { text: 'The lake has had many names. Long ago it was Lục Thủy, Green Water. It was also much bigger, reaching from behind Hàng Đào in the Old Quarter down to Hàng Chuối. A road built across it split it into two lakes, Tả Vọng on the left and Hữu Vọng on the right; architects date the road to the early eighteenth century, other accounts later. The navy once drilled on Hữu Vọng.', claimIds: ['C-LAKE-NAMES', 'C-LAKE-SIZE'] },
      { text: 'From 1884 the French filled Hữu Vọng to build their first quarter in the city. What is left, about 10.7 hectares, is the lake you see now. Its formal name is Hoàn Kiếm; in everyday speech Hanoians often call it Hồ Gươm, Sword Lake.', claimIds: ['C-LAKE-NAMES', 'C-LAKE-SIZE', 'C-HK-NAME'] }
    ] },

    { type: 'text', heading: 'The tower on the islet', id: 'tower', paras: [
      { text: 'The Turtle Tower was built around 1886 by a wealthy local known as Bá Kim; sources give his full name differently. A story says he wanted to bury his father’s remains on the islet, a lucky site, and that the bones were later thrown into the lake. Hữu Ngọc tells it; another account calls it oral tradition that cannot be verified.', claimIds: ['C-TOWER-BUILT'] },
      { text: 'The tower is small, about nine metres tall: two lower storeys with Gothic-style pointed arches, two upper ones with the roof of a Vietnamese temple. An architect quoted by Tuổi Trẻ says that as architecture it is nothing special. It does not matter. Lit at night in the middle of the water, it has become one of the best-known pictures of Hà Nội.', claimIds: ['C-TOWER-STYLE'] }
    ] },
    { type: 'figure', image: 'ev-turtle-tower-night', size: 'bleed', caption: 'The Turtle Tower lit at night.' },

    { type: 'text', heading: 'The real turtles', id: 'turtles', paras: [
      { text: 'The lake really did have giant turtles. One that died in 1967, about 200 kilograms, is preserved at Ngọc Sơn temple. In April 2011 the last known turtle in the lake, suffering from a skin disease, was caught and treated on an islet: it measured 185 centimetres, weighed 169 kilograms, and DNA tests showed it was female.', claimIds: ['C-TURTLE-1967', 'C-TURTLE-2011'] },
      { text: 'She was found dead on 19 January 2016, aged about 200 by one scientist’s estimate. German specialists preserved her body, and since 2019 she has been displayed at Ngọc Sơn beside the turtle of 1967.', claimIds: ['C-TURTLE-2016'] },
      { text: 'What species she was is still argued. Most specialists consider her a Yangtze giant softshell, *Rafetus swinhoei*; some Vietnamese scientists named her a species of her own. Either way, the species is nearly gone: as of 2024 only two animals were known, one in the wild in Vietnam and one captive male in China. The last known female in Vietnam died at Đồng Mô lake, west of the city, in 2023.', claimIds: ['C-TURTLE-SPECIES'] }
    ] },
    { type: 'note', text: 'Measurements of the turtles differ between reports (the 1967 turtle is given as 1.9 or 2.1 m, the 2016 turtle as 1.85 or 2.08 m), probably because they were measured differently.', claimIds: ['C-TURTLE-1967', 'C-TURTLE-2016'] },

    { type: 'text', heading: 'The legend today', id: 'today', paras: [
      { text: 'The story is everywhere in the city. Lê Lợi returning the sword is a classic act of water puppetry. At the north end of the lake, the red Thê Húc bridge leads to Ngọc Sơn temple, where the two turtles rest. And every weekend evening, when the streets around the lake close to traffic, families walk the shore the turtle once swam past.', claimIds: ['C-SWORD-PUPPETS', 'C-NGOCSON', 'C-HK-WALK'] },
      { text: 'For more about the lake as a place to spend a day, see [a day by the lake](story:st-hoan-kiem-days).', editorial: true }
    ] },
    { type: 'pair', items: [
      { image: 'ev-huc-bridge', caption: 'The Thê Húc bridge to Ngọc Sơn temple.' },
      { image: 'ev-lake-night', caption: 'The bridge lit red at night.' }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Legend', text: 'Sword from the water, returned to a turtle.' },
      { term: 'Oldest record', text: '1431, and only half the story.' },
      { term: 'Tower', text: 'About 1886.' },
      { term: 'Turtles', text: 'See them preserved at Ngọc Sơn.' }
    ] },
    { type: 'quiz', image: 'ev-turtle-tower', question: 'Where does the story come from?', prompt: 'The oldest written record of Lê Lợi’s sword, from 1431, tells which part of the legend?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'The whole story, turtle and all', feedback: 'Not yet. The turtle and the lake appear in much later writing.' },
      { label: 'Only the finding of the sword', fit: true, feedback: 'Yes. The return to the turtle was added over the following centuries.' },
      { label: 'Only the turtle taking the sword', feedback: 'It is the other way round: the oldest record has the finding, not the return.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
