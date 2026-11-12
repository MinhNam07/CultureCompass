/* Story: eating at a street-food stall (st-street-stall). Layout: guide.
   Researched 12 Nov 2026. How-to from the national tourism authority; laws, figures and the pavement campaign from Vietnamese press and official pages.
   Hà Nội food-poisoning figures for 2024–26 were not found, so none are given. */
const today = '2026-11-12';

const sources = [
  { id: 'VNAT-HN10', short: 'Vietnam Tourism', title: '10 must-try Hanoian dishes — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/10-must-try-hanoi-dishes/', type: 'gov', checked: today,
    used: 'Bún chả as almost exclusively a lunch dish; bún thang as a breakfast that began with leftover Tết food; garlic vinegar with beef phở and lime with chicken phở.',
    limits: 'An undated guide page.' },
  { id: 'VNAT-HNGUIDE', short: 'Vietnam Tourism', title: 'Ha Noi Food Guide: best street food dishes to sample — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/ha-noi-food-guide-best-street-food-dishes-sample', type: 'gov', checked: today,
    used: 'Bánh cuốn as a traditional Hà Nội breakfast; bún ốc as a classic comfort food; phở, bún chả and bánh mì as the city’s three most famous dishes.',
    limits: 'An undated guide page.' },
  { id: 'VNAT-21', short: 'Vietnam Tourism', title: '21 must-try Vietnamese dishes — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/21-must-try-vietnamese-dishes/', type: 'gov', checked: today,
    used: 'Savoury xôi as a cheap, popular breakfast; bún riêu’s crab and tomato broth.',
    limits: 'An undated guide page covering all of Vietnam.' },
  { id: 'BQT-BANHCUON', short: 'Báo Thế giới & Việt Nam', title: 'Nghề làm bánh cuốn Thanh Trì trở thành di sản văn hóa phi vật thể quốc gia — Báo Thế giới & Việt Nam', org: 'Báo Thế giới & Việt Nam, by Hà Anh', url: 'https://baoquocte.vn/nghe-lam-banh-cuon-thanh-tri-tro-thanh-di-san-van-hoa-phi-vat-the-quoc-gia-371321.html', type: 'press', checked: today,
    used: 'Decision 2228/QĐ-BVHTTDL of 27 June 2025 listing the craft of bánh cuốn Thanh Trì as national intangible heritage; the certificate handed over on 18 March 2026.',
    limits: 'A news report (March 2026).' },
  { id: 'VTC-CHACA', short: 'VTC News', title: 'Chả cá Lã Vọng có gì đặc biệt — VTC News', org: 'VTC News, by Nguyệt Ánh', url: 'https://vtcnews.vn/cha-ca-la-vong-co-gi-dac-biet-ar960666.html', type: 'press', checked: today,
    used: 'Chả cá Lã Vọng served for more than 130 years on Chả Cá, the only Hà Nội street named after a dish; fish marinated with galangal, turmeric and fermented rice, finished at the table with dill and spring onion; its listing as national intangible heritage on 13 August 2025.',
    limits: 'A feature (August 2025).' },
  { id: 'VNEI-AUTUMN', short: 'VnExpress International', title: '7 experiences to embrace autumn in Hanoi — VnExpress International', org: 'VnExpress International, by Nguyen Chi', url: 'https://e.vnexpress.net/news/food/7-experiences-to-embrace-autumn-in-hanoi-4664113.html', type: 'press', checked: today,
    used: 'Snails at their best in autumn, boiled with lemongrass and lime leaves; cốm, young green rice wrapped in lotus leaves, tied to the city’s autumn.',
    limits: 'A seasonal feature (October 2023).' },
  { id: 'VNS-MICH2025', short: 'Việt Nam News', title: 'The 2025 MICHELIN Guide Hanoi, Ho Chi Minh City, Da Nang celebrates Vietnam’s culinary ascent — Việt Nam News', org: 'MICHELIN Guide press release, published by Việt Nam News', url: 'https://vietnamnews.vn/media-outreach/1719107/the-2025-michelin-guide-hanoi-ho-chi-minh-city-da-nang-celebrates-vietnam-s-culinary-ascent-with-9-one-star-2-green-star-and-63-bib-gourmand.html', type: 'press', checked: today,
    used: 'The guide’s director saying street-food stalls, family eateries and long-standing local shops preserve culinary traditions; 63 Bib Gourmand places nationally in 2025.',
    limits: 'The guide’s own press release (June 2025).' },
  { id: 'VNS-MICH2026', short: 'Việt Nam News', title: '11 stars shine in the MICHELIN Guide ceremony 2026 — Việt Nam News', org: 'MICHELIN Guide press release, published by Việt Nam News', url: 'https://vietnamnews.vn/media-outreach/1782810/11-stars-shine-in-the-michelin-guide-restaurant-ceremony-2026-hanoi-ho-chi-minh-city-da-nang.html', type: 'press', checked: today,
    used: 'The 2026 selection: 193 places, 72 Bib Gourmand; new Hà Nội Bib Gourmands including Bánh Cuốn Gia Truyền Thanh Vân and Phở Hà on Hàng Hòm.',
    limits: 'The guide’s own press release (June 2026).' },
  { id: 'TTN-MICH-BANHMI', short: 'Tuổi Trẻ News', title: '4th Michelin Guide Vietnam features 193 establishments, still overlooks banh mi — Tuổi Trẻ News', org: 'Tuổi Trẻ News', url: 'https://news.tuoitre.vn/4th-michelin-guide-vietnam-features-193-establishments-still-overlooks-banh-mi-103260605152002438.htm', type: 'press', checked: today,
    used: 'That no bánh mì shop was named in the 2026 selection.',
    limits: 'A news report (June 2026).' },
  { id: 'TTN-TIMEOUT', short: 'Tuổi Trẻ News', title: 'Hanoi named second-best street food city in Asia by Time Out — Tuổi Trẻ News', org: 'Tuổi Trẻ News, by Thanh Ha and Tieu Tung', url: 'https://news.tuoitre.vn/print/hanoi-named-second-best-street-food-city-in-asia-by-time-out-103250922114748027.htm', type: 'press', checked: today,
    used: 'Time Out ranking Hà Nội the second-best street-food city in Asia, after Penang (September 2025).',
    limits: 'A report of a magazine ranking.' },
  { id: 'TT-HN-STREETFOOD', short: 'Báo Thanh tra', title: 'Quản lý thực phẩm online cần hành lang pháp lý rõ ràng, thống nhất — Báo Thanh tra', org: 'Báo Thanh tra, by Dương Nguyễn (citing the Hà Nội People’s Council)', url: 'https://thanhtra.com.vn/an-sinh-AFA9C5670/quan-ly-thuc-pham-online-can-hanh-lang-phap-ly-ro-rang-thong-nhat-02398760a.html', type: 'press', checked: today,
    used: '6,890 street-food businesses among about 80,000 food businesses in Hà Nội in 2025; over 315,000 inspections since 2021, 13.7% finding violations.',
    limits: 'A report (July 2025) of a city council survey.' },
  { id: 'LAW-FOODSAFETY', short: 'Law 55/2010/QH12', title: 'Luật An toàn thực phẩm (No. 55/2010/QH12), Điều 2 and 31–33', org: 'National Assembly of Vietnam (text via hethongphapluat.com)', url: 'https://hethongphapluat.com/luat-an-toan-thuc-pham-2010/dieu-31', type: 'law', checked: today,
    used: 'Street food defined as food prepared to eat or drink at once; the requirement that it be displayed on clean tables, shelves or stands, with clean ingredients and utensils.',
    limits: 'Read through a legal database. A revised law was before the National Assembly in late 2026.' },
  { id: 'DBND-FOODLAW', short: 'Đại biểu Nhân dân', title: 'Chuyển mạnh sang hậu kiểm nhưng phải bảo đảm năng lực thực thi — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by H. Ngọc', url: 'https://daibieunhandan.vn/chuyen-manh-sang-hau-kiem-nhung-phai-bao-dam-nang-luc-thuc-thi-10440244.html', type: 'press', checked: today,
    used: 'The revised Food Safety Law, including rules on street food, presented to the National Assembly on 24 October 2026.',
    limits: 'A report of the debate (October 2026); the law had not been passed when we checked.' },
  { id: 'TBTC-FINES', short: 'Thời báo Tài chính', title: 'Hà Nội: kinh doanh thức ăn đường phố vi phạm an toàn thực phẩm bị phạt đến 6 triệu đồng — Thời báo Tài chính Việt Nam', org: 'Thời báo Tài chính Việt Nam, by Diệu Hoa', url: 'https://thoibaotaichinhvietnam.vn/ha-noi-kinh-doanh-thuc-an-duong-pho-vi-pham-an-toan-thuc-pham-bi-phat-den-6-trieu-dong-166182.html', type: 'press', checked: today,
    used: 'Fines of up to 6 million đồng for street-food safety violations in Hà Nội from 1 January 2025.',
    limits: 'A news report (December 2024) of a city council resolution.' },
  { id: 'DBND-BYT-STREET', short: 'Đại biểu Nhân dân', title: 'Bộ Y tế cảnh báo nguy cơ ngộ độc thực phẩm từ thức ăn đường phố — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Xuân Quý (citing the Ministry of Health)', url: 'https://daibieunhandan.vn/bo-y-te-canh-bao-nguy-co-ngo-doc-thuc-pham-tu-thuc-an-duong-pho-post408434.html', type: 'press', checked: today,
    used: 'The health ministry’s advice to choose stalls with a clean grilling area and staff wearing gloves, and to avoid food of odd colour or smell, dark reused oil and dusty, smoky spots by heavy traffic.',
    limits: 'A news report (March 2025) of an official dispatch.' },
  { id: 'VTC-PHO50', short: 'VTC News', title: 'Bát phở tăng giá lên 50.000 đồng — VTC News', org: 'VTC News, by Phạm Duy', url: 'https://vtcnews.vn/bat-pho-tang-gia-len-50-000-dong-chu-quan-co-lai-lon-hon-thoi-30-000-dong-ar1009023.html', type: 'press', checked: today,
    used: 'A bowl of bún or phở in Hà Nội averaging 45,000–50,000 đồng in March 2026, with bones and cooking gas costing more.',
    limits: 'A market report (March 2026).' },
  { id: 'VNEI-VENDORS-MOVE', short: 'VnExpress International', title: 'Hanoi street vendors move off sidewalks as encroachment crackdown tightens — VnExpress International', org: 'VnExpress International, by Quynh Duong', url: 'https://e.vnexpress.net/news/life/trend/hanoi-street-vendors-move-off-sidewalks-as-encroachment-crackdown-tightens-5071179.html', type: 'press', checked: today,
    used: 'A crab-noodle stall on Hàng Cháo moving into a one-metre alley and losing two-thirds of its sales; a xôi stall on Hàng Khoai moving to a rented shop at double the rent; fines of 2.5 million đồng.',
    limits: 'A feature (May 2026).' },
  { id: 'ND-TONGDUYTAN', short: 'Nhân Dân', title: 'Phố ẩm thực Tống Duy Tân thay áo mới — Nhân Dân', org: 'Nhân Dân, by Giang Nam', url: 'https://nhandan.vn/pho-am-thuc-tong-duy-tan-thay-ao-moi-post855510.html', type: 'press', checked: today,
    used: 'Tống Duy Tân opening as a food street in 2000 and its renovation of January 2025, with stone paving, lanterns and a bronze statue of a phở seller.',
    limits: 'A news report (January 2025).' }
];

const claims = [
  { id: 'C-FOOD-ORDER', kind: 'custom', status: 'published', sourceIds: ['VNAT-FOOD'], text: 'At street-food stalls you usually order at the front, then choose your own table or stool. Many stalls serve only two or three dishes; if you are unsure, order what the next table is eating.' },
  { id: 'C-FOOD-BUSY', kind: 'custom', status: 'published', sourceIds: ['VNAT-FOOD'], text: 'The busier the stall, the more likely it is worth the wait. Morning stalls open soon after sunrise, lunch runs from about 11.30 to 1, and dinner is busiest from 6 to 8.' },
  { id: 'C-FOOD-CONDIMENTS', kind: 'custom', status: 'published', sourceIds: ['VNAT-FOOD', 'VNAT-HN10'], text: 'The table holds a jar of garlic and chilli in vinegar, fish sauce, chilli and lime. Napkins, lime husks and herb stalks go in the bin under the table.' },
  { id: 'C-FOOD-PAY', kind: 'custom', status: 'published', sourceIds: ['VNAT-FOOD'], text: 'Eat first, pay later: at small stalls, diners ask for the bill (“tính tiền”) and pay the cook on the way out.' },
  { id: 'C-FOOD-TIMES', kind: 'custom', status: 'published', sourceIds: ['VNAT-HN10', 'VNAT-HNGUIDE', 'VNAT-21'], text: 'Hà Nội eats by the clock: phở, bánh cuốn, xôi and bún thang are breakfast dishes, and bún chả is almost always lunch.' },
  { id: 'C-FOOD-BUNTHANG', kind: 'custom', status: 'published', sourceIds: ['VNAT-HN10'], text: 'Bún thang, a delicate noodle soup with many toppings, began as a way to use up leftover Tết food and became a favourite breakfast.' },
  { id: 'C-FOOD-BANHCUON', kind: 'custom', status: 'published', sourceIds: ['VNAT-HNGUIDE', 'BQT-BANHCUON'], text: 'Bánh cuốn, steamed rice sheets, is a traditional Hà Nội breakfast. The craft of bánh cuốn from Thanh Trì was listed as national intangible heritage by a decision of 27 June 2025.' },
  { id: 'C-FOOD-CHACA', kind: 'history', status: 'published', sourceIds: ['VTC-CHACA'], text: 'Chả cá Lã Vọng, fish marinated with galangal and turmeric and finished at the table with dill and spring onion, has been served for more than 130 years on Chả Cá, the only Hà Nội street named after a dish. Its preparation was listed as national intangible heritage in August 2025.' },
  { id: 'C-FOOD-AUTUMN', kind: 'custom', status: 'published', sourceIds: ['VNEI-AUTUMN'], text: 'Some foods follow the seasons: snails are at their best in autumn, and cốm, young green rice wrapped in a lotus leaf, is the taste of a Hà Nội autumn.' },
  { id: 'C-FOOD-PRICE', kind: 'custom', status: 'published', sourceIds: ['VTC-PHO50'], text: 'In March 2026 a bowl of bún or phở in Hà Nội averaged 45,000–50,000 đồng; the 30,000 đồng bowl had nearly disappeared as bones and cooking gas cost more.' },
  { id: 'C-FOOD-MICHELIN', kind: 'custom', status: 'published', sourceIds: ['VNS-MICH2025', 'VNS-MICH2026', 'TTN-MICH-BANHMI'], text: 'The Michelin Guide’s Vietnam selection lists street stalls among its Bib Gourmand places; the 2026 edition had 72 nationwide, with a Hàng Gà bánh cuốn shop and a Hàng Hòm phở shop new in Hà Nội, though still no bánh mì shop.' },
  { id: 'C-FOOD-TIMEOUT', kind: 'custom', status: 'published', sourceIds: ['TTN-TIMEOUT'], text: 'In 2025 Time Out ranked Hà Nội the second-best street-food city in Asia, after Penang.' },
  { id: 'C-FOOD-COUNT', kind: 'custom', status: 'published', sourceIds: ['TT-HN-STREETFOOD'], text: 'A 2025 city council survey counted 6,890 street-food businesses among about 80,000 food businesses in Hà Nội; since 2021 inspectors found violations in about one check in seven.' },
  { id: 'C-FOOD-LAW', kind: 'law', status: 'published', sourceIds: ['LAW-FOODSAFETY', 'TBTC-FINES', 'DBND-FOODLAW'], text: 'The 2010 Food Safety Law has its own rules for street food, such as clean tables, utensils and ingredients. Hà Nội can fine violations up to 6 million đồng from 2025, and a revised law with new street-food rules went before the National Assembly in October 2026.' },
  { id: 'C-FOOD-SAFE', kind: 'safety', status: 'published', sourceIds: ['DBND-BYT-STREET', 'VNAT-FOOD'], text: 'The health ministry advises choosing stalls with a clean cooking area and staff who wear gloves, and avoiding food that looks or smells odd, dark reused frying oil, and spots that are dusty or right beside heavy traffic.' },
  { id: 'C-FOOD-MOVED', kind: 'custom', status: 'published', sourceIds: ['VNEI-VENDORS-MOVE'], text: 'The 2025–26 pavement campaign pushed many Old Quarter food stalls indoors: one crab-noodle seller on Hàng Cháo moved into a one-metre alley and lost about two-thirds of the stall’s trade, and a xôi stall on Hàng Khoai moved into a shop at double the rent.' },
  { id: 'C-FOOD-TDT', kind: 'history', status: 'published', sourceIds: ['ND-TONGDUYTAN'], text: 'Tống Duy Tân became Hà Nội’s food street in 2000 and was renovated in January 2025, with stone paving, lanterns and a bronze statue of a phở seller.' },
  { id: 'C-FOOD-TIP2', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: carry small notes. Stalls rarely take cards, and paying 50,000 đồng with a 500,000 note can leave the cook without change.' }
];

const story = {
  id: 'st-street-stall',
  layout: 'guide',
  title: 'Eating at a street-food stall',
  dek: 'Order at the front, sit where there is room, eat first and pay on the way out. A guide to Hà Nội’s plastic-stool kitchens: what to order, when, and how to choose one.',
  place: 'Streets of Hà Nội',
  imageId: 'fd-stall-snails',
  hero: { image: 'fd-stall-snails' },
  appliesTo: 'Small pavement and shopfront stalls in Hà Nội, from the national tourism authority’s street-food guides, Vietnamese press and official pages. Prices from 2026.',
  varies: 'Restaurants and cafés work differently, and stalls in other cities have their own habits. Pavement rules in Hà Nội were changing in 2025–26.',
  sections: [
    { text: 'At a small street-food stall there is often no menu. Order at the front, then choose your own stool; pointing is fine.', claimIds: ['C-FOOD-ORDER', 'C-FOOD-POINT'] },
    { heading: 'Sharing a table', text: 'At busy times other diners may sit at your table; that is normal.', claimIds: ['C-FOOD-SHARE'] },
    { heading: 'What is already on the table', text: 'Herbs come free with noodle dishes, trà đá replaces water, and wiping your chopsticks is normal.', claimIds: ['C-FOOD-HERBS', 'C-FOOD-TRADA', 'C-FOOD-WIPE'] },
    { heading: 'Paying', text: 'Eat first and pay on the way out. Tipping is not expected.', claimIds: ['C-FOOD-PAY', 'C-TIP'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Much of the best food in Hà Nội is cooked in a space the size of a parked car. A pot of broth on a gas ring, a tray of herbs, a stack of bowls, and a cluster of low plastic stools: that is a restaurant. Many stalls serve only two or three dishes, perfected over years, and some have no sign at all.', claimIds: ['C-FOOD-ORDER'] },
      { text: 'The city is proud of them. In 2025 Time Out ranked Hà Nội the second-best street-food city in Asia, and the Michelin Guide now lists stalls alongside restaurants, its director praising the street stalls and family eateries that keep old recipes alive. This guide explains how a stall works, what to eat and when, and how to choose a good one.', claimIds: ['C-FOOD-TIMEOUT', 'C-FOOD-MICHELIN'] }
    ] },
    { type: 'facts', title: 'Street stalls in brief', items: [
      { term: 'Order', text: 'At the front, then sit anywhere.' },
      { term: 'Drink', text: 'Trà đá, iced tea, instead of water.' },
      { term: 'Pay', text: 'On the way out. Say “tính tiền”.' },
      { term: 'Price', text: 'About 45,000–50,000 đồng for a bowl of noodles (2026).' }
    ], claimIds: ['C-FOOD-ORDER', 'C-FOOD-TRADA', 'C-FOOD-PAY', 'C-FOOD-PRICE'] },

    { type: 'steps', heading: 'A meal at a stall, step by step', id: 'steps', items: [
      { title: 'Choose a busy one', paras: [
        { text: 'The national tourism authority’s rule of thumb: the busier the stall, the more likely it is worth the wait. Locals know which cook is good. The health ministry adds a few signs to look for: a clean cooking area, staff wearing gloves, and oil that is not dark from reuse. Avoid stalls that are dusty, smoky or right on the edge of heavy traffic.', claimIds: ['C-FOOD-BUSY', 'C-FOOD-SAFE'] }
      ], image: 'fd-stools', caption: 'Plastic stools stacked outside a Hà Nội eatery.' },
      { title: 'Order at the front', paras: [
        { text: 'Go to the cook, usually at the front by the pot, and order before you sit. If there is no menu, point at what you want and ask for *một suất*, one serving, or *một cái này*, one of these. Or order what the next table is eating.', claimIds: ['C-FOOD-ORDER', 'C-FOOD-POINT'] }
      ] },
      { title: 'Sit wherever there is room', paras: [
        { text: 'Pick your own stool or table. At busy times strangers will sit at yours; that is normal, and a smile is enough.', claimIds: ['C-FOOD-SHARE'] }
      ] },
      { title: 'Use what is on the table', paras: [
        { text: 'Noodle dishes come with a free plate of herbs and greens. On the table you will find a jar of garlic and chilli in vinegar, fish sauce, chilli and lime: vinegar usually goes with beef phở, lime with chicken. Wiping your chopsticks and spoon with a napkin before you eat is normal, and the used napkins, lime husks and herb stalks go in the bin under the table.', claimIds: ['C-FOOD-HERBS', 'C-FOOD-CONDIMENTS', 'C-FOOD-WIPE'] },
        { text: 'Instead of water you will be offered [[tra-da|trà đá]], iced green tea, or hot tea in cold weather.', claimIds: ['C-FOOD-TRADA'] }
      ] },
      { title: 'Eat first, pay last', paras: [
        { text: 'When you have finished, say *tính tiền* and pay the cook on your way out; someone may add up the bill at your table. Tipping is not expected at stalls.', claimIds: ['C-FOOD-PAY', 'C-TIP'] },
        { text: 'Carry small notes. Stalls rarely take cards, and a large note can leave the cook without change.', claimIds: ['C-FOOD-TIP2'] }
      ] }
    ] },
    { type: 'phrases', heading: 'Phrases for the stall', ids: ['ph-motsuat', 'ph-baonhieu', 'ph-tinhtien', 'ph-camon'] },

    { type: 'text', heading: 'Hà Nội eats by the clock', id: 'clock', paras: [
      { text: 'Stalls keep hours, and so do dishes. Morning stalls open soon after sunrise; lunch is from about half past eleven to one; dinner is busiest from six to eight. Arrive late and the pot may be empty.', claimIds: ['C-FOOD-BUSY'] },
      { text: 'Breakfast is the big meal of the street. [Phở](story:st-pho) is the best known, but there is also *bánh cuốn*, delicate steamed rice sheets; *xôi*, sticky rice with savoury toppings; and *bún thang*, a clear noodle soup with many fine toppings that, the tourism authority says, began as a way to use up leftover Tết food. [Bún chả](story:st-bun-cha) belongs to lunch.', claimIds: ['C-FOOD-TIMES', 'C-FOOD-BUNTHANG', 'C-FOOD-BANHCUON'] }
    ] },
    { type: 'tabs', heading: 'What to eat, and when', id: 'when', intro: 'Choose a time of day. On a phone, each row reads as a card.', label: 'Hà Nội street dishes by time of day', tabs: [
      { label: 'Morning', columns: ['Dish', 'What it is'], rows: [
        [{ text: 'phở', vi: true }, { text: 'Rice noodles in clear broth with beef or chicken.', claimIds: ['C-PHO-BOWL'] }],
        [{ text: 'bánh cuốn', vi: true }, { text: 'Steamed rice sheets; the Thanh Trì craft is national heritage.', claimIds: ['C-FOOD-BANHCUON'] }],
        [{ text: 'xôi', vi: true }, { text: 'Sticky rice with savoury toppings; cheap and filling.', claimIds: ['C-FOOD-TIMES'] }],
        [{ text: 'bún thang', vi: true }, { text: 'Clear noodle soup with many fine toppings.', claimIds: ['C-FOOD-BUNTHANG'] }]
      ] },
      { label: 'Midday', columns: ['Dish', 'What it is'], rows: [
        [{ text: 'bún chả', vi: true }, { text: 'Grilled pork in dipping sauce with noodles; almost always lunch.', claimIds: ['C-FOOD-TIMES', 'C-BUNCHA'] }],
        [{ text: 'bún riêu', vi: true }, { text: 'Noodles in a crab and tomato broth.', claimIds: ['C-FOOD-TIMES'] }],
        [{ text: 'bún ốc', vi: true }, { text: 'Snail noodle soup, a Hà Nội comfort food.', claimIds: ['C-FOOD-TIMES'] }]
      ] },
      { label: 'Evening and seasons', columns: ['Dish', 'What it is'], rows: [
        [{ text: 'chả cá Lã Vọng', vi: true }, { text: 'Turmeric fish finished with dill at the table; more than 130 years on Chả Cá street.', claimIds: ['C-FOOD-CHACA'] }],
        [{ text: 'ốc', vi: true }, { text: 'Snails with lemongrass and lime leaf, best in autumn.', claimIds: ['C-FOOD-AUTUMN'] }],
        [{ text: 'cốm', vi: true }, { text: 'Young green rice in a lotus leaf: the taste of autumn.', claimIds: ['C-FOOD-AUTUMN'] }]
      ] }
    ] },
    { type: 'figure', image: 'fd-stall-snails', size: 'wide', caption: 'A snail stall on the pavement, with baskets of snails and low stools.' },

    { type: 'text', heading: 'Is it safe?', id: 'safety', paras: [
      { text: 'Street food is regulated. The 2010 Food Safety Law has its own section on it: food must be displayed on clean tables, shelves or stands, with clean ingredients and utensils. Since January 2025 Hà Nội can fine violations up to 6 million đồng, and a revised law with new street-food rules went before the National Assembly in October 2026.', claimIds: ['C-FOOD-LAW'] },
      { text: 'Enforcement is a big job. A city council survey in 2025 counted 6,890 street-food businesses in Hà Nội, out of about 80,000 food businesses of all kinds; since 2021 inspectors had found violations in about one check in seven. We could not find reliable figures for food poisoning from Hà Nội street food, so we do not give any.', claimIds: ['C-FOOD-COUNT'] },
      { text: 'The practical advice is the same as in step one: choose busy stalls, food cooked hot in front of you, a clean cooking area, and clean oil.', claimIds: ['C-FOOD-SAFE', 'C-FOOD-BUSY'] }
    ] },
    { type: 'note', text: 'We could not find Hà Nội food-poisoning figures for 2024–26 from a reliable source, so we have not given any.', claimIds: ['C-FOOD-COUNT'] },

    { type: 'text', heading: 'Off the pavement', id: 'pavement', paras: [
      { text: 'The stalls are changing. In 2025–26 Hà Nội’s campaign to clear the pavements, described in our story on [life on the pavement](story:st-pavement), pushed many food sellers indoors. One crab-noodle seller on Hàng Cháo moved into an alley a metre wide and lost about two-thirds of the stall’s trade; a xôi seller on Hàng Khoai moved into a shop two hundred metres away and paid double the rent.', claimIds: ['C-FOOD-MOVED'] },
      { text: 'Some streets are made for eating. Tống Duy Tân has been the city’s food street since 2000, and in January 2025 it reopened with stone paving, lanterns and a bronze statue of a phở seller.', claimIds: ['C-FOOD-TDT'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-night-market', caption: 'Food stalls at the Old Quarter night market.' },
      { image: 'ev-tra-da', caption: 'Iced tea and stools under a tree.' }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually right', items: [
      { text: 'Ordering at the front before you sit.', claimIds: ['C-FOOD-ORDER'] },
      { text: 'Choosing a busy stall.', claimIds: ['C-FOOD-BUSY'] },
      { text: 'Sharing a table with strangers.', claimIds: ['C-FOOD-SHARE'] },
      { text: 'Paying on the way out, with small notes.', claimIds: ['C-FOOD-PAY', 'C-FOOD-TIP2'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Waiting at the table for a menu.', claimIds: ['C-FOOD-ORDER'] },
      { text: 'Stalls with dark, reused oil or food that smells odd.', claimIds: ['C-FOOD-SAFE'] },
      { text: 'Looking for bún chả at breakfast.', claimIds: ['C-FOOD-TIMES'] },
      { text: 'Leaving a tip as if it were expected.', claimIds: ['C-TIP'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Order', text: 'At the front; point if you need to.' },
      { term: 'Sit', text: 'Anywhere there is room.' },
      { term: 'Table', text: 'Herbs, vinegar, lime, trà đá.' },
      { term: 'Pay', text: '“Tính tiền”, on the way out.' }
    ] },
    { type: 'quiz', image: 'fd-stools', question: 'No menu, no waiter', prompt: 'You sit down at a stall and nobody comes to take your order. What is going on?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'They are ignoring you', feedback: 'Not at all. At most stalls nobody comes to the table to take orders.' },
      { label: 'You were supposed to order from the cook at the front first', fit: true, feedback: 'Yes. Order at the front, then sit; your food will be brought to you.' },
      { label: 'You need to wave for the bill first', feedback: 'You pay at the end, on the way out.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
