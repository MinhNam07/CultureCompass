/* Story: shopping at a market (st-market). Layout: photo essay.
   Researched 12 Nov 2026. Vendors’ beliefs about the first sale are reported as beliefs. Market counts differ by date and method; the text says so. */
const today = '2026-11-12';

const sources = [
  { id: 'HNM-DX130', short: 'Nhịp sống Hà Nội', title: '130 năm chợ Đồng Xuân — Nhịp sống Hà Nội (Hà Nội Mới)', org: 'Nhịp sống Hà Nội (Hà Nội Mới), by Thu Hằng', url: 'https://nhipsonghanoi.hanoimoi.vn/130-nam-cho-dong-xuan-627683.html', type: 'press', checked: today,
    used: 'The French merging the markets beside Cầu Đông pagoda and Bạch Mã temple at Đồng Xuân in 1889; its five arched entrances and five long halls; trams, the Long Biên bridge and the station making it the city’s “stomach”; the 1994 fire; three of the original gables kept in the rebuilding; more than 2,100 stalls; the night market since 2003.',
    limits: 'An anniversary feature of October 2019, in Vietnamese.' },
  { id: 'HNM-DX2026', short: 'Hà Nội Mới', title: 'Chợ Đồng Xuân – Dấu ấn Hà Nội xưa giữa nhịp sống đương đại — Hà Nội Mới', org: 'Hà Nội Mới (newspaper of the Hà Nội Party Committee), by Khánh Huy', url: 'https://hanoimoi.vn/cho-dong-xuan-tu-ky-uc-ke-cho-den-nhip-song-duong-dai-1764308.html', type: 'press', checked: today,
    used: 'The market rebuilt after the 1994 fire on three floors of more than 14,000 m²; what each floor sells; hours of 6 a.m. to 6 p.m.; the weekend night market from 6 to 10.30 p.m.; its standing as one of the north’s largest wholesale markets.',
    limits: 'A feature of November 2026, in Vietnamese. Another source gives closing time as 7 p.m.' },
  { id: 'VNE-KECHO', short: 'VnExpress', title: 'Ký ức chợ Hà Nội xưa — VnExpress', org: 'VnExpress, by Hiểu Nhân', url: 'https://vnexpress.net/ky-uc-cho-ha-noi-xua-4450983.html', type: 'press', checked: today,
    used: 'Thăng Long once called Kẻ Chợ, “the market people”; Paul Bourde finding no covered market in 1883 and markets meeting every six days; Đồng Xuân formed from the Bạch Mã and Cầu Đông markets; market taxes under French rule; a seventeenth-century visitor noting street vendors beside the many markets.',
    limits: 'A history feature of April 2022, in Vietnamese. It dates Đồng Xuân to 1890, where most sources give 1889.' },
  { id: 'VNEI-FRENCH', short: 'VnExpress International', title: 'Eight landmark French-era buildings in downtown Hanoi — VnExpress International', org: 'VnExpress International, by Ngan Duong', url: 'https://e.vnexpress.net/news/travel/places/eight-landmark-french-era-buildings-in-downtown-hanoi-4251787.html', type: 'press', checked: today,
    used: 'Đồng Xuân built in 1889, burnt in 1994 and rebuilt the following year for nearly 68 billion đồng with three storeys and more than 2,000 stores.',
    limits: 'A travel feature of March 2021.' },
  { id: 'TT-CHOHN', short: 'Tuổi Trẻ Cuối tuần', title: 'Chợ Hà Nội – Tìm trong ký ức — Tuổi Trẻ Cuối tuần', org: 'Tuổi Trẻ Cuối tuần, by Đỗ Phấn', url: 'https://cuoituan.tuoitre.vn/cho-ha-noi-tim-trong-ky-uc-712461.htm', type: 'press', checked: today,
    used: 'Đồng Xuân’s riveted steel trusses like those of the Long Biên bridge; only the front kept after the 1994 fire; in old village markets, sellers who believed a high opening price brought luck, and buyers who bargained to reach the right price rather than a cheap one.',
    limits: 'A memoir-essay by a Hà Nội painter and writer (February 2015).' },
  { id: 'TP-LONGBIEN', short: 'Tiền Phong', title: 'Tấp nập khu chợ đêm mùa quả chín rẻ nhất Hà Nội — Tiền Phong', org: 'Tiền Phong (newspaper), by T. Minh', url: 'https://tienphong.vn/tap-nap-khu-cho-dem-mua-qua-chin-re-nhat-ha-noi-post1351656.tpo', type: 'press', checked: today,
    used: 'Long Biên market founded in 1992 under the bridge, on more than 27,000 m²; goods laid out by about 11 p.m., busiest from midnight to 1 a.m., quiet by dawn; 200–300 tonnes of produce a day.',
    limits: 'A news feature of July 2021.' },
  { id: 'VNE-LBWOMEN', short: 'VnExpress', title: 'Những phụ nữ ở chợ đêm Long Biên — VnExpress', org: 'VnExpress, by Hoàng Hà', url: 'https://vnexpress.net/nhung-phu-nu-o-cho-dem-long-bien-2123904.html', type: 'press', checked: today,
    used: 'Women porters at Long Biên, mostly in their thirties to fifties, carrying fruit loads of several hundred kilos from 3 a.m.',
    limits: 'A feature of March 2009; pay figures in it are long out of date and not used.' },
  { id: 'VNE-CHOCOC', short: 'VnExpress', title: 'Vì sao nhiều người Hà Nội “nặng lòng” với chợ cóc? — VnExpress', org: 'VnExpress, by Dương Nga', url: 'https://vnexpress.net/nang-long-voi-cho-coc-5004152.html', type: 'press', checked: today,
    used: 'Chợ cóc on pavements, alleys and along railway lines; why people use them; a HealthBridge and Université de Montréal study finding about 100 chợ cóc against 25 official markets in four inner districts, serving nearly half the population within 300 m; renovated official markets losing buyers and sellers.',
    limits: 'A feature of January 2026. Some figures it gives on traffic and food safety come from studies it does not name and are not used.' },
  { id: 'VNEC-CHOCOC', short: 'VnEconomy', title: 'Hà Nội đã sắp xếp được 98 “chợ cóc”, điểm kinh doanh tự phát — VnEconomy', org: 'VnEconomy, by T. Thanh Xuân', url: 'https://vneconomy.vn/ha-noi-da-sap-xep-duoc-98-cho-coc-diem-kinh-doanh-tu-phat.htm', type: 'press', checked: today,
    used: 'Hà Nội’s 468 markets by class; 231 chợ cóc and informal trading points identified and 98 dealt with; a timetable to June 2027; the city’s stance of firm but not extreme handling.',
    limits: 'A report of January 2026. Other counts of the city’s markets differ by date.' },
  { id: 'WERTHEIM-2015', short: 'Wertheim-Heck et al. 2015', title: 'Food safety and urban food markets in Vietnam: The need for flexible and customized retail modernization policies — Food Policy 54: 95–106', org: 'Food Policy (peer-reviewed), S. Wertheim-Heck, S. Vellema and G. Spaargaren', url: 'https://doi.org/10.1016/j.foodpol.2015.05.002', type: 'academic', checked: today,
    used: 'The finding that replacing wet markets with supermarkets in Hà Nội reaches only a minor part of the population and pushes many shoppers towards informal vending.',
    limits: 'Read as the published abstract and summary; research from the early 2010s.' },
  { id: 'VNN-MOHANG', short: 'VietNamNet', title: 'Văn hóa khai trương, mở hàng năm mới — VietNamNet', org: 'VietNamNet (credited to Người đưa tin)', url: 'https://vietnamnet.vn/van-hoa-khai-truong-mo-hang-nam-moi-109116.html', type: 'press', checked: today,
    used: 'The belief that the day’s first buyer brings luck and a failed first sale brings bad luck, so sellers avoid quoting the first customer too high; change given smoothly for the first sale; many such taboos fading.',
    limits: 'A feature of February 2013 describing beliefs, not rules.' },
  { id: 'DT-DOTVIA', short: 'Dân trí', title: 'Trải nghiệm ác mộng đi chợ ở Hà Nội: Bị hành hung, đốt vía, “quay xe” — Dân trí', org: 'Dân trí, by Hồng Anh', url: 'https://dantri.com.vn/doi-song/trai-nghiem-ac-mong-di-cho-o-ha-noi-bi-hanh-hung-dot-via-quay-xe-20221209160247334.htm', type: 'press', checked: today,
    used: 'A Hà Nội seller pressing a shopper to buy because she had not yet made her first sale; hostility to shoppers who bargain and leave; the linguist Phạm Văn Tình’s view that the right to ask high and the right to bargain are equal.',
    limits: 'A feature of December 2022 built on shoppers’ bad experiences, so not a picture of a typical market.' },
  { id: 'VNEI-OVERCHARGE', short: 'VnExpress International', title: 'Tourists overcharged? It’s a two-way street — VnExpress International', org: 'VnExpress International (readers’ views), by Minh Minh', url: 'https://e.vnexpress.net/news/readers-views/tourists-overcharged-its-a-two-way-street-4656169.html', type: 'press', checked: today,
    used: 'Readers’ view that bargaining is expected in markets but haggling over tiny sums is unfair to vendors, and that malls have fixed prices for those who prefer not to bargain.',
    limits: 'A round-up of reader comments (September 2023), so opinion.' },
  { id: 'VNEI-TIPS', short: 'VnExpress International', title: 'Overcharged in Vietnam: tips to avoid paying too much — VnExpress International', org: 'VnExpress International, by Kim Thuy', url: 'https://e.vnexpress.net/news/life/overcharged-in-vietnam-tips-to-avoid-paying-too-much-3357519.html', type: 'press', checked: today,
    used: 'Starting at about half to two-thirds of the asking price with vendors, raising slowly and staying polite; supermarkets for fixed prices.',
    limits: 'A practical article of March 2016.' }
];

const claims = [
  { id: 'C-DX-1889', kind: 'history', status: 'published', sourceIds: ['HNM-DX130', 'VNE-KECHO', 'VNEI-FRENCH'], text: 'Đồng Xuân Market was created by the French in 1889 (one source says 1890) by moving the vendors of two older markets, beside Cầu Đông pagoda and Bạch Mã temple, onto one site, later covered by five long iron-roofed halls behind five arched gables.' },
  { id: 'C-DX-FLOORS', kind: 'custom', status: 'published', sourceIds: ['HNM-DX2026', 'HNM-DX130'], text: 'Today’s Đồng Xuân has three floors of more than 14,000 m² and over 2,000 stalls: household goods, electronics, accessories and sweets on the ground floor, fabrics, silk and clothing on the second, children’s goods on the third. It is one of the largest wholesale markets in the north and opens about 6 a.m.' },
  { id: 'C-DX-KECHO', kind: 'history', status: 'published', sourceIds: ['VNE-KECHO'], text: 'Thăng Long was once called Kẻ Chợ, “the market place”. In 1883 a French visitor found no covered market and no fixed market site; markets met in turns every few days, and street vendors worked between them.' },
  { id: 'C-DX-STOMACH', kind: 'history', status: 'published', sourceIds: ['HNM-DX130', 'TT-CHOHN'], text: 'With trams, the Long Biên bridge and the railway station nearby, Đồng Xuân became the city’s largest and busiest market, nicknamed Hà Nội’s stomach. Its riveted steel roof trusses resembled those of the bridge.' },
  { id: 'C-DX-FIRE', kind: 'history', status: 'published', sourceIds: ['HNM-DX130', 'VNEI-FRENCH', 'HNM-DX2026', 'TT-CHOHN'], text: 'A fire in 1994 destroyed almost all of the stalls. The market was rebuilt on three floors, keeping the front: three of the five original gables survive, the end ones removed to widen the side streets. One source says it reopened the following year.' },
  { id: 'C-DX-NIGHT', kind: 'custom', status: 'published', sourceIds: ['HNM-DX130', 'HNM-DX2026'], text: 'Since 2003 a night market has run on weekend evenings from the square in front of Đồng Xuân along Hàng Đường, Hàng Ngang and Hàng Đào; Hà Nội Mới gives its hours as 6 to 10.30 p.m. on Friday to Sunday.' },
  { id: 'C-LONGBIEN', kind: 'custom', status: 'published', sourceIds: ['TP-LONGBIEN', 'VNE-LBWOMEN'], text: 'Long Biên market, founded in 1992 beneath the old bridge, is the city’s largest wholesale market for farm produce. It trades mainly by night: goods are laid out by about 11 p.m., trade peaks around midnight, and women porters carry loads of several hundred kilos.' },
  { id: 'C-CHOCOC', kind: 'custom', status: 'published', sourceIds: ['VNE-CHOCOC', 'VNEC-CHOCOC', 'WERTHEIM-2015'], text: 'Chợ cóc, informal markets on pavements, in alleys and along railway lines, remain where many Hà Nội residents buy food. One study counted about 100 against 25 official markets in four inner districts, within 300 m of nearly half the population; research finds supermarkets reach only a minority of shoppers.' },
  { id: 'C-CHOCOC-POLICY', kind: 'history', status: 'published', sourceIds: ['VNEC-CHOCOC', 'VNE-CHOCOC'], text: 'In January 2026 Hà Nội counted 468 markets and 231 informal ones; 98 had been dealt with, and the rest were scheduled by June 2027. Some renovated official markets have lost buyers and sellers.' },
  { id: 'C-MOHANG', kind: 'belief', status: 'published', sourceIds: ['VNN-MOHANG', 'DT-DOTVIA'], text: 'Many vendors believe the day’s first sale, mở hàng, sets their luck: a first customer who buys easily brings a good day, one who bargains and leaves a bad one. Sellers may avoid quoting the first customer high, or press them to buy. Some of these beliefs are fading.' },
  { id: 'C-BARGAIN-RIGHT', kind: 'custom', status: 'published', sourceIds: ['TT-CHOHN', 'DT-DOTVIA'], text: 'In old village markets, sellers believed a high opening price brought luck and buyers bargained to reach the right price rather than a cheap one. A Hà Nội linguist puts it this way: the right to ask high and the right to bargain are equal.' },
  { id: 'C-BARGAIN-HOW', kind: 'custom', status: 'published', sourceIds: ['VNEI-TIPS', 'VNEI-OVERCHARGE'], text: 'A common suggestion with street vendors is to start at about half to two-thirds of the asking price and raise slowly, staying polite; haggling over very small sums is seen as unfair to vendors, and fixed-price shops suit people who prefer not to bargain.' },
  { id: 'C-BARGAIN-MARKET', kind: 'custom', status: 'published', sourceIds: ['VNN-SHOP', 'VCT-BARGAIN'], text: 'Bargaining is common with street vendors and at market stalls where goods have no printed price tag.' },
  { id: 'C-BARGAIN-POLITE', kind: 'custom', status: 'published', sourceIds: ['VNN-SHOP', 'VCT-BARGAIN'], text: 'Bargaining goes best when it is polite and respectful; a friendly manner with the seller helps.' },
  { id: 'C-BARGAIN-WALK', kind: 'custom', status: 'published', sourceIds: ['VNN-SHOP', 'VCT-BARGAIN'], text: 'If you don’t want to buy, it is fine to say “Không, cảm ơn” (No, thank you) and walk on.' },
  { id: 'C-MARKET-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: ask the price before you pick something up, agree a price before money changes hands, and if you are the first customer of the morning, buy or say no kindly and quickly.' }
];

const story = {
  id: 'st-market',
  layout: 'essay',
  title: 'Shopping at a market',
  dek: 'A covered market from 1889, a wholesale market that wakes at midnight and a pavement market at the end of every alley. Many prices are talked about, not printed.',
  place: 'Chợ Đồng Xuân and beyond, Hà Nội',
  imageId: 'ev-dx-2018',
  hero: { image: 'ev-dx-2018' },
  appliesTo: 'Markets and street vendors in Hà Nội, from Đồng Xuân and Long Biên to the small markets of each neighbourhood.',
  varies: 'Shops with printed prices, supermarkets and malls usually don’t bargain. Market hours and counts change; beliefs about the first sale vary from seller to seller.',
  sections: [
    { text: 'Đồng Xuân Market, created in 1889, is Hà Nội’s best-known market: three floors of fabric, clothing and household goods.', claimIds: ['C-DX-1889', 'C-DX-FLOORS'] },
    { heading: 'Asking the price', text: 'Bargaining is common at stalls where goods have no printed price.', claimIds: ['C-BARGAIN-MARKET'] },
    { heading: 'Bargaining kindly', text: 'It goes best when it is friendly and polite; once you have agreed a price, pay it.', claimIds: ['C-BARGAIN-POLITE', 'N-PRICE-AGREE'] },
    { heading: 'Saying no', text: 'If you don’t want to buy, say “Không, cảm ơn” and walk on.', claimIds: ['C-BARGAIN-WALK'] }
  ],
  blocks: [
    { type: 'essay', label: 'Photo essay: Hà Nội’s markets', steps: [
      { image: 'ev-dx-interior', label: 'Đồng Xuân', heading: 'Three floors of everything', paras: [
        { text: 'Inside Đồng Xuân, more than two thousand stalls are packed under one roof: buttons and bolts of silk, rice cookers, sweets by the kilo. Much of it is sold wholesale to shops across the north.', claimIds: ['C-DX-FLOORS'] }
      ] },
      { image: 'ev-longbien-market', label: 'Long Biên', heading: 'A market that wakes at midnight', paras: [
        { text: 'Under the old bridge, the city’s produce market does most of its trade while Hà Nội sleeps. Lorries unload by eleven; by midnight it is at its busiest.', claimIds: ['C-LONGBIEN'] }
      ] },
      { image: 'ev-street-market', label: 'Chợ cóc', heading: 'The market at the end of the alley', paras: [
        { text: 'Most people buy their food nearer home, at a [[cho-coc|chợ cóc]]: a pavement market that appears in the morning and is gone by noon.', claimIds: ['C-CHOCOC'] }
      ] },
      { image: 'ev-night-market', label: 'At night', heading: 'And on weekend evenings', paras: [
        { text: 'On Friday to Sunday evenings the streets in front of Đồng Xuân fill with a night market.', claimIds: ['C-DX-NIGHT'] }
      ] }
    ] },

    { type: 'text', lede: true, heading: 'A city named after its market', paras: [
      { text: 'Before it was Hà Nội, the capital had a nickname: Kẻ Chợ, roughly “the market place”. The capital was a city of markets long before it had a market building. When a French visitor came in 1883 he found no covered hall and no fixed site; markets met in turns every few days, and vendors walked the streets in between.', claimIds: ['C-DX-KECHO'] },
      { text: 'That changed in 1889. The French moved the sellers of two older markets, one beside Cầu Đông pagoda and one beside Bạch Mã temple, onto a single site at Đồng Xuân. It began in the open air and was soon covered by five long iron-roofed halls behind five arched gables.', claimIds: ['C-DX-1889'] }
    ] },
    { type: 'beforeAfter', before: 'ev-dx-1926', after: 'ev-dx-2018', labelBefore: '1926', labelAfter: '2018', caption: 'Đồng Xuân in 1926 and in 2018. Drag the handle, or use the arrow keys. After the 1994 fire three of the five gables were kept; the outer two were removed to widen the side streets.' },

    { type: 'text', heading: 'The city’s stomach', id: 'dong-xuan', paras: [
      { text: 'Trams ran close by, the Long Biên bridge brought the countryside in, and the railway station was a short walk away. Đồng Xuân became the biggest and busiest market in the city, and people called it Hà Nội’s stomach. Under the roof, riveted steel trusses echoed the bridge across the river.', claimIds: ['C-DX-STOMACH'] },
      { text: 'In 1994 a fire destroyed almost every stall inside. The city rebuilt it as a three-storey hall but kept the front: three of the original five gables still face Đồng Xuân Street, the two outer ones taken down to widen the roads at either side. One account says it reopened the following year.', claimIds: ['C-DX-FIRE'] }
    ] },
    { type: 'facts', title: 'Đồng Xuân, floor by floor', items: [
      { term: 'Ground floor', text: 'Household goods, electronics, fashion accessories, sweets and dried goods.' },
      { term: 'Second floor', text: 'Fabrics, silk and brocade, sewing supplies, clothing.' },
      { term: 'Third floor', text: 'Children’s clothes, baby goods and accessories.' },
      { term: 'Hours', text: 'From about 6 a.m. into the early evening; the night market outside on Friday to Sunday evenings.' }
    ], claimIds: ['C-DX-FLOORS', 'C-DX-NIGHT'] },

    { type: 'text', heading: 'Long Biên: the night shift', id: 'long-bien', paras: [
      { text: 'Walk north to the foot of the Long Biên bridge after dark and you find the market that feeds the other markets. Founded in 1992 on more than 27,000 square metres, it is the city’s largest wholesale market for fruit, vegetables and seafood. Goods are laid out by about eleven at night, trade peaks around midnight, and by dawn it is quiet again.', claimIds: ['C-LONGBIEN'] },
      { text: 'Much of the carrying is done by women porters, mostly in their thirties to fifties, who start work in the small hours and move loads of several hundred kilos on carts and shoulder poles.', claimIds: ['C-LONGBIEN'] }
    ] },
    { type: 'figure', image: 'ev-longbien-market', size: 'bleed', caption: 'Vegetable sellers on the deck of the Long Biên bridge.' },

    { type: 'text', heading: 'The market at the end of the alley', id: 'cho-coc', paras: [
      { text: 'Big markets get the photographs, but most Hà Nội households buy their food closer to home. A chợ cóc, a “frog market”, springs up on a pavement, in an alley or along a railway line, sells fresh food to the neighbourhood and disappears. People like them because they are close, the food is fresh, they know the sellers, and older shoppers do not have to travel. A study in four inner districts counted about a hundred of them against twenty-five official markets, within 300 metres of nearly half the population.', claimIds: ['C-CHOCOC'] },
      { text: 'The city wants them tidied away. In January 2026 it counted 468 official markets and 231 informal ones, had dealt with 98, and set a timetable for the rest by mid-2027. Researchers have long warned that supermarkets reach only a minority of shoppers, and some renovated official markets have lost both buyers and sellers.', claimIds: ['C-CHOCOC-POLICY', 'C-CHOCOC'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-fruit-pole', caption: 'A fruit seller with baskets and a carrying pole.' },
      { image: 'ev-dx-night', caption: 'Selling from the street outside Đồng Xuân at night.' }
    ] },

    { type: 'text', heading: 'The first sale of the day', id: 'mo-hang', paras: [
      { text: 'If you shop early, you may be someone’s [[mo-hang|mở hàng]], their first customer. Many vendors believe the first sale sets the day’s luck. A buyer who pays easily brings a good day; one who bargains hard and walks away brings a bad one. So a seller may give the first customer a gentler price, or press them to buy, and a few will mutter at a shopper who haggles and leaves.', claimIds: ['C-MOHANG'] },
      { text: 'These are beliefs, not rules, and newspapers report that many are fading. They are worth knowing because they explain the moment. If you are first, buy or say no kindly and quickly.', claimIds: ['C-MOHANG', 'C-MARKET-TIP'] }
    ] },
    { type: 'note', text: 'Bargaining is not haggling for the sake of it. In the old village markets, sellers believed a high opening price brought luck, and buyers bargained to reach the right price, not a cheap one.', claimIds: ['C-BARGAIN-RIGHT'] },

    { type: 'dodont', heading: 'Bargaining kindly', do: { title: 'Usually welcome', items: [
      { text: 'Ask the price before you pick something up: *Cái này bao nhiêu tiền?*', claimIds: ['C-BARGAIN-MARKET'] },
      { text: 'Offer about half to two-thirds of the first price where goods have no tag, and come up slowly.', claimIds: ['C-BARGAIN-HOW'] },
      { text: 'Keep it friendly. A smile does more than a hard face.', claimIds: ['C-BARGAIN-POLITE'] },
      { text: 'Once you have agreed a price, pay it.', claimIds: ['N-PRICE-AGREE'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Haggling over a few thousand đồng on a bánh mì. Readers of VnExpress call it unfair to vendors.', claimIds: ['C-BARGAIN-HOW'] },
      { text: 'Bargaining in shops with printed prices, supermarkets and malls.', claimIds: ['C-BARGAIN-HOW'] },
      { text: 'Bargaining hard with no intention of buying, especially early in the morning.', claimIds: ['C-MOHANG'] },
      { text: 'Walking off without a word. *Không, cảm ơn* and a nod are enough.', claimIds: ['C-BARGAIN-WALK'] }
    ] } },
    { type: 'phrases', heading: 'Words for the market', ids: ['ph-baonhieu', 'ph-khongcamon', 'ph-camon'] },

    { type: 'gallery', heading: 'More from the markets', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'ev-dx-2018', caption: 'The front of Đồng Xuân Market.' },
      { image: 'ev-dx-1926', caption: 'Đồng Xuân in 1926.' },
      { image: 'ev-night-market', caption: 'The weekend night market.' },
      { image: 'ev-ceramics-bike', caption: 'Ceramics on the move.' },
      { image: 'ev-fruit-bike', caption: 'Fruit sold from a bicycle.' }
    ] },
    { type: 'quiz', image: 'ev-street-market', question: 'Seven in the morning, and you are the first customer', prompt: 'You ask the price of some mangoes but decide not to buy. What is the kindest way to leave?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Bargain a little longer to be polite', feedback: 'Bargaining with no plan to buy is exactly what many vendors hope to avoid from their first customer.' },
      { label: 'Say “Không, cảm ơn” with a smile and move on quickly', fit: true, feedback: 'A clear, friendly no lets the seller get on with finding a first sale.' },
      { label: 'Walk away without saying anything', feedback: 'It is not a disaster, but a word and a nod are friendlier.' }
    ] }
  ]
};

const glossary = [
  { id: 'cho-coc', vi: 'chợ cóc', say: 'chuh kok', en: '“Frog market”: an informal neighbourhood market on a pavement or in an alley.' },
  { id: 'mo-hang', vi: 'mở hàng', say: 'muh hahng', en: 'The day’s first sale, believed by many vendors to set their luck.' }
];

module.exports = { sources, claims, glossary, stories: [story] };
