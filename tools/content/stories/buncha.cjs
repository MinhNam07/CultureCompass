/* Story: how to eat bún chả (st-bun-cha). Layout: guide.
   Researched 12 Nov 2026. Corrections from research: Hương Liên is at 24 Lê Văn Hưu; Obama and Bourdain ate there on 23 May 2016;
   the famous couplet in Thạch Lam's book is spoken by a character, a country scholar, not by Thạch Lam himself. */
const today = '2026-11-12';

const sources = [
  { id: 'VNNEWS-BUNCHA', short: 'Việt Nam News', title: 'Bún chả: a tasty feast of colours and flavours — Việt Nam News', org: 'Việt Nam News, by Hồng Vân', url: 'https://vietnamnews.vn/life-style/345278/bun-cha-a-tasty-feast-of-colours-and-flavours.html', type: 'press', checked: today,
    used: 'The two kinds of pork, grilled over charcoal, once clamped in bamboo and now on wire racks; the sauce and its garnish of green papaya or kohlrabi and carrot; the herbs; vendors once selling it from bamboo baskets in the streets; that nobody knows exactly when or where it was created; locals eating it at any meal.',
    limits: 'A feature (November 2016).' },
  { id: 'VNE-BUNCHA-2023', short: 'VnExpress', title: 'Cách làm bún chả Hà Nội hương vị xưa — VnExpress', org: 'VnExpress, by Bùi Thủy', url: 'https://vnexpress.net/bun-cha-ha-noi-huong-vi-xua-4594150.html', type: 'press', checked: today,
    used: 'Chả miếng (sliced belly) and chả băm (chopped shoulder pressed into patties); the sauce at roughly one part each of fish sauce, sugar and vinegar to five of water, with garlic, chilli and pepper; pickled papaya and carrot; the sauce warmed in winter; Vũ Bằng’s lines on Láng basil and a sauce that is not too salty.',
    limits: 'A recipe feature (April 2023); family recipes vary.' },
  { id: 'VNE-BUNCHA-2024', short: 'VnExpress', title: 'Nước chấm bún chả Hà Nội pha giấm hay chanh? — VnExpress', org: 'VnExpress, by Bùi Thủy', url: 'https://vnexpress.net/doi-song-cooking-nuoc-cham-bun-cha-ha-noi-4777572.html', type: 'press', checked: today,
    used: 'The same sauce ratio and the vinegar-or-lime question; quotes the couplet from Thạch Lam’s book.',
    limits: 'A recipe feature (August 2024).' },
  { id: 'MICH-BUNCHA', short: 'Michelin Guide', title: 'What Is Bun Cha, Hanoi’s Grilled Pork and Noodle Dish — MICHELIN Guide', org: 'MICHELIN Guide Vietnam', url: 'https://guide.michelin.com/vn/en/article/features/iconic-dishes-what-is-vietnamese-bun-cha', type: 'press', checked: today,
    used: 'Bún chả as a lunchtime staple in Hà Nội; the broth served cool in summer and warmed in winter; an origin legend about a Hà Nội grill master; the 2024 list including Bún Chả Đắc Kim (Bib Gourmand) and Hương Liên (recommended).',
    limits: 'A guide feature (March 2025). Its origin story is a legend.' },
  { id: 'MICH-2023', short: 'Michelin Guide', title: '103 Restaurants Shine in the Inaugural Edition of the MICHELIN Guide Hanoi & Ho Chi Minh City — MICHELIN Guide', org: 'MICHELIN Guide', url: 'https://guide.michelin.com/en/article/michelin-guide-ceremony/103-restaurants-shine-in-the-inaugural-edition-of-the-michelin-guide-hanoi-ho-chi-minh-city-including-4-michelin-stars', type: 'press', checked: today,
    used: 'The first Vietnam selection of 6 June 2023: 103 places, 29 Bib Gourmand, 13 of them in Hà Nội, including the bún chả shops Bun Cha Ta and Tuyết Bún Chả 34.',
    limits: 'The guide’s own announcement.' },
  { id: 'VNEI-CHAN', short: 'VnExpress International', title: 'Hanoi grilled pork noodle shop now a Michelin favorite — VnExpress International', org: 'VnExpress International, by Tung Dinh', url: 'https://e.vnexpress.net/photo/food-recipes/hanoi-grilled-pork-noodle-shop-now-a-michelin-favorite-4773508.html', type: 'press', checked: today,
    used: 'Bún Chả Chan on Mai Hắc Đế added as a Bib Gourmand in June 2024, at 40,000 đồng a bowl.',
    limits: 'A photo feature (July 2024).' },
  { id: 'ZN-BUNCHA-LUNCH', short: 'Znews', title: 'Hàng bún chả ở Hà Nội bán hàng trăm suất vào buổi trưa — Znews', org: 'Znews, by Tuấn Anh', url: 'https://znews.vn/hang-bun-cha-o-ha-noi-ban-hang-tram-suat-vao-buoi-trua-post1308348.html', type: 'press', checked: today,
    used: 'A Mai Hắc Đế shop selling 500–600 portions a day, full at noon, from 40,000 đồng.',
    limits: 'A news feature (April 2022) about one shop.' },
  { id: 'BPL-THACHLAM', short: 'Báo Pháp Luật', title: 'Thạch Lam của Hà Nội băm sáu phố phường — Báo Pháp Luật Việt Nam', org: 'Báo Pháp Luật Việt Nam, by Trịnh Chu', url: 'https://baophapluat.vn/thach-lam-cua-ha-noi-bam-sau-pho-phuong-post156343.html', type: 'press', checked: today,
    used: 'The Vietnamese text of Thạch Lam’s passage on bún chả (1943): the couplet spoken by a visiting country scholar, and Thạch Lam’s own description of smoke, sizzling fat and fanning over the coals.',
    limits: 'A literary article (2011) quoting the book; not checked against the 1943 edition.' },
  { id: 'VNS-OBAMA', short: 'Việt Nam News', title: 'US President Obama has dinner at a Bún Chả restaurant in Hà Nội — Việt Nam News', org: 'Việt Nam News', url: 'https://vietnamnews.vn/society/297182/us-president-obama-has-dinner-at-a-bun-cha-restaurant-in-ha-noi.html', type: 'press', checked: today,
    used: 'Barack Obama dining at a bún chả restaurant in Hà Nội on the evening of 23 May 2016, for about an hour.',
    limits: 'A news report on the night.' },
  { id: 'DTI-OBAMA', short: 'DTiNews', title: 'Obama had bun cha at Hanoi’s streetside restaurant — DTiNews (Dân trí)', org: 'DTiNews, the English service of Dân trí', url: 'https://dtinews.dantri.com.vn/vietnam-today/obama-had-bun-cha-at-hanois-streetside-restaurant-20160524091847513.htm', type: 'press', checked: today,
    used: 'Anthony Bourdain’s post that the dinner with the President cost US$6 in total and that he paid.',
    limits: 'A news report (May 2016) quoting a social media post.' },
  { id: 'VNS-OBAMATABLE', short: 'Việt Nam News', title: 'Restaurant moonlights as museum to preserve president’s dining spot — Việt Nam News', org: 'Việt Nam News', url: 'https://vietnamnews.vn/a-twist-in-the-tale/424207/restaurant-moonlights-as-museum-to-preserve-president-s-dining-spot.html', type: 'press', checked: today,
    used: 'The restaurant keeping the table, plates, chopsticks, beer bottles and stools behind glass on its second floor.',
    limits: 'A short news item (March 2018).' },
  { id: 'TTN-OBAMA', short: 'Tuổi Trẻ News', title: 'Hanoi ‘bun cha’ eatery at full capacity since Obama visit — Tuổi Trẻ News', org: 'Tuổi Trẻ News', url: 'https://news.tuoitre.vn/news/gallery/20160526/hanoi-%E2%80%98bun-cha%E2%80%99-eatery-at-full-capacity-since-obama-visit/33483.html', type: 'press', checked: today,
    used: 'The restaurant packed in the days after the dinner of 23 May 2016.',
    limits: 'A photo report (May 2016).' },
  { id: 'MICH-HUONGLIEN', short: 'Michelin Guide', title: 'Bún chả Hương Liên — MICHELIN Guide', org: 'MICHELIN Guide Vietnam (restaurant listing)', url: 'https://guide.michelin.com/vn/en/ha-noi/ha-noi_2978072/restaurant/bun-cha-huong-lien', type: 'press', checked: today,
    used: 'The address, 24 Lê Văn Hưu; the glass-encased “president table”; most guests ordering the “Obama combo” of a fried seafood roll, bún chả and a Hà Nội beer.',
    limits: 'The guide’s listing, read in November 2026.' }
];

const claims = [
  { id: 'C-BUNCHA', kind: 'custom', status: 'published', sourceIds: ['VNNEWS-BUNCHA', 'VNE-BUNCHA-2023'], text: 'Bún chả is rice vermicelli with two kinds of pork grilled over charcoal: sliced belly (chả miếng) and chopped pork pressed into patties (chả băm). It comes with fresh herbs and a dipping sauce of fish sauce, vinegar or lime, sugar and water with garlic and chilli, garnished with pickled green papaya or kohlrabi and carrot.' },
  { id: 'C-BUNCHA-EAT', kind: 'custom', status: 'published', sourceIds: ['VNNEWS-BUNCHA', 'MICH-BUNCHA'], text: 'You dip the noodles in the sauce and eat them with the pork and herbs. The sauce is served cool in summer and warmed in winter.' },
  { id: 'C-BUNCHA-SAUCE', kind: 'custom', status: 'published', sourceIds: ['VNE-BUNCHA-2023', 'VNE-BUNCHA-2024'], text: 'A classic Hà Nội sauce uses roughly one part each of fish sauce, sugar and vinegar to five parts water, with garlic, chilli and pepper; cooks argue over vinegar versus lime.' },
  { id: 'C-BUNCHA-GRILL', kind: 'custom', status: 'published', sourceIds: ['VNNEWS-BUNCHA', 'BPL-THACHLAM'], text: 'The pork was once clamped between split bamboo for grilling; wire racks have replaced it. The smoke of the charcoal grill, fanned at the shop front, is part of the dish’s character.' },
  { id: 'C-BUNCHA-WHEN', kind: 'custom', status: 'published', sourceIds: ['MICH-BUNCHA', 'VNNEWS-BUNCHA', 'ZN-BUNCHA-LUNCH'], text: 'Bún chả is above all a lunch dish in Hà Nội, though some people eat it at any meal; a busy shop can sell 500–600 portions a day, most at noon.' },
  { id: 'C-BUNCHA-HISTORY', kind: 'history', status: 'published', sourceIds: ['VNNEWS-BUNCHA', 'MICH-BUNCHA'], text: 'Nobody knows exactly when or where bún chả was created. Vendors once sold it from bamboo baskets carried through the streets; stories about its inventor are legends.' },
  { id: 'C-BUNCHA-THACHLAM', kind: 'history', status: 'published', sourceIds: ['BPL-THACHLAM', 'VNE-BUNCHA-2024'], text: 'In “Hà Nội băm sáu phố phường” (1943) Thạch Lam describes the smoke and sizzle of bún chả grills, and has a visiting country scholar ask whether bún chả is the thousand-year treasure of Thăng Long.' },
  { id: 'C-BUNCHA-VUBANG', kind: 'history', status: 'published', sourceIds: ['VNE-BUNCHA-2023'], text: 'The writer Vũ Bằng thought Hà Nội bún chả was special perhaps because of Láng basil, and praised a sauce that was not too salty, with the vinegar just right.' },
  { id: 'C-BUNCHA-OBAMA', kind: 'history', status: 'published', sourceIds: ['VNS-OBAMA', 'DTI-OBAMA', 'TTN-OBAMA', 'MICH-HUONGLIEN'], text: 'On the evening of 23 May 2016 US President Barack Obama ate bún chả with the chef Anthony Bourdain at Bún chả Hương Liên, 24 Lê Văn Hưu. Bourdain said the meal cost US$6 and that he paid; the shop was packed for days afterwards.' },
  { id: 'C-BUNCHA-TABLE', kind: 'history', status: 'published', sourceIds: ['VNS-OBAMATABLE', 'MICH-HUONGLIEN'], text: 'The restaurant keeps the table, plates, chopsticks, beer bottles and stools behind glass, and many diners order the “Obama combo”: a fried seafood roll, bún chả and a Hà Nội beer.' },
  { id: 'C-BUNCHA-MICHELIN', kind: 'custom', status: 'published', sourceIds: ['MICH-2023', 'VNEI-CHAN', 'MICH-BUNCHA'], text: 'The first Michelin Guide to Vietnam (June 2023) gave Bib Gourmand awards to the Hà Nội bún chả shops Bun Cha Ta and Tuyết Bún Chả 34; Bún Chả Chan and Bún Chả Đắc Kim were added in 2024, and Hương Liên is recommended.' },
  { id: 'C-BUNCHA-PRICE', kind: 'custom', status: 'published', sourceIds: ['VNEI-CHAN', 'ZN-BUNCHA-LUNCH'], text: 'A portion at a well-known shop cost about 40,000 đồng in 2022–24.' },
  { id: 'C-BUNCHA-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: follow the smoke. Grills are fanned at the front of the shop, so you can usually find bún chả by smell before you see the sign; go between about 11 and 1.' }
];

const glossary = [
  { id: 'cha', vi: 'chả', say: 'chah', en: 'Grilled or fried meat, often minced and pressed into patties. In bún chả, both patties and sliced pork belly.' },
  { id: 'nuoc-cham', vi: 'nước chấm', say: 'nuke chum', en: 'Dipping sauce: fish sauce balanced with sugar, vinegar or lime, water, garlic and chilli.' }
];

const story = {
  id: 'st-bun-cha',
  layout: 'guide',
  title: 'How to eat bún chả',
  dek: 'Charcoal smoke at the shop front, pork in a bowl of sauce, cold noodles and a basket of herbs. Hà Nội’s lunch, a president’s dinner, and how to put it together.',
  place: 'Hà Nội',
  imageId: 'fd-buncha-top',
  hero: { image: 'fd-buncha-top' },
  appliesTo: 'Bún chả as it is served in Hà Nội. Prices from 2022–24.',
  varies: 'Every shop has its own sauce and pork, and some add fried spring rolls. Bún chả elsewhere in Vietnam and abroad can be quite different.',
  sections: [
    { text: 'Bún chả comes in parts: grilled pork in a bowl of dipping sauce, cold rice vermicelli and fresh herbs.', claimIds: ['C-BUNCHA'] },
    { heading: 'Dip, then eat', text: 'Take some noodles, dip them in the sauce and eat them with the pork and herbs.', claimIds: ['C-BUNCHA-EAT'] },
    { heading: 'A Hà Nội lunch', text: 'It is above all a lunch dish, and nobody knows exactly where it began.', claimIds: ['C-BUNCHA-WHEN', 'C-BUNCHA-HISTORY'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Around eleven in the morning, the side streets of Hà Nội fill with smoke. At the front of a bún chả shop someone crouches over a charcoal grill, fanning it, while pork fat drips onto the coals and hisses. By noon every table is full: a shop on Mai Hắc Đế told Znews it sells five or six hundred portions a day, most of them at lunch.', claimIds: ['C-BUNCHA-GRILL', 'C-BUNCHA-WHEN'] },
      { text: 'What arrives at your table can be puzzling the first time: not one dish but four, and nothing to tell you how they go together. This guide explains the parts, how to eat them, and a little of the dish’s history, from a 1943 essay to the night an American president sat on a plastic stool.', claimIds: ['C-BUNCHA'] }
    ] },
    { type: 'facts', title: 'Bún chả in brief', items: [
      { term: 'What', text: 'Charcoal-grilled pork in a dipping sauce, with rice vermicelli and herbs.' },
      { term: 'When', text: 'Lunch, above all.' },
      { term: 'Price', text: 'About 40,000 đồng at a well-known shop.' },
      { term: 'Sauce', text: 'Cool in summer, warm in winter.' }
    ], claimIds: ['C-BUNCHA', 'C-BUNCHA-WHEN', 'C-BUNCHA-PRICE', 'C-BUNCHA-EAT'] },

    { type: 'text', heading: 'What is on the table', id: 'parts', paras: [
      { text: 'A bowl of [[nuoc-cham|dipping sauce]] with the pork already in it. There are two kinds of [[cha|chả]]: *chả miếng*, thin slices of pork belly, and *chả băm*, chopped shoulder pressed into small patties. Both are grilled over charcoal; the pork was once clamped between strips of split bamboo, and today sits on a wire rack.', claimIds: ['C-BUNCHA', 'C-BUNCHA-GRILL'] },
      { text: 'A plate of cold rice vermicelli, *bún*. A basket of fresh greens: lettuce, coriander, perilla and basil. And on the table, small bowls of chopped garlic and sliced chilli, so you can make the sauce hotter. Many shops also serve fried spring rolls, ordered separately.', claimIds: ['C-BUNCHA'] }
    ] },
    { type: 'figure', image: 'fd-buncha-set', size: 'wide', caption: 'The parts of a bún chả meal: pork in sauce, vermicelli, herbs, spring rolls, chilli and garlic.' },

    { type: 'steps', heading: 'Putting it together', id: 'steps', items: [
      { title: 'Season the sauce', paras: [
        { text: 'Taste the sauce first. Add garlic and chilli from the little bowls if you like. A classic Hà Nội sauce is roughly one part each of fish sauce, sugar and vinegar to five of water, so it is light enough to drink from the spoon.', claimIds: ['C-BUNCHA-SAUCE'] }
      ], image: 'fd-buncha-condiments', caption: 'Chilli, garlic, vermicelli and the bowl of sauce.' },
      { title: 'Take some noodles', paras: [
        { text: 'With your chopsticks, take a small bundle of vermicelli from the plate and dip it into the sauce bowl.', claimIds: ['C-BUNCHA-EAT'] }
      ] },
      { title: 'Add pork and herbs', paras: [
        { text: 'Pick up a piece of pork and some herbs from the sauce and eat them together with the noodles. Tear larger leaves with your fingers.', claimIds: ['C-BUNCHA-EAT'] }
      ] },
      { title: 'Repeat', paras: [
        { text: 'Keep going, a little at a time, topping up with herbs as you like. The pickled papaya or kohlrabi in the sauce is meant to be eaten too.', claimIds: ['C-BUNCHA', 'C-BUNCHA-EAT'] }
      ] },
      { title: 'Pay on the way out', paras: [
        { text: 'As at most small shops, eat first and pay at the front when you leave.', claimIds: ['C-FOOD-PAY'] }
      ] }
    ] },

    { type: 'text', heading: 'Lunch, by the smell of the smoke', id: 'lunch', paras: [
      { text: 'The Michelin Guide calls bún chả a lunchtime staple in Hà Nội, and that is when the shops are busiest. Some Hanoians eat it at any meal, and it was once thought of as a summer dish. Today the sauce follows the season: cool in summer, gently warmed in winter.', claimIds: ['C-BUNCHA-WHEN', 'C-BUNCHA-EAT'] },
      { text: 'Smell leads you there. Grills are set at the front of the shop or on the pavement, and fanned by hand, so the smoke drifts down the street. Go between about eleven and one, and expect to share a table.', claimIds: ['C-BUNCHA-GRILL', 'C-BUNCHA-TIP', 'C-FOOD-SHARE'] }
    ] },
    { type: 'pair', items: [
      { image: 'fd-buncha-hangmanh', caption: 'A full table at a bún chả shop on Hàng Mành.' },
      { image: 'fd-buncha-top', caption: 'Bún chả from above: sauce bowls, vermicelli, herbs and spring rolls.' }
    ] },

    { type: 'text', heading: 'Baskets, smoke and a scholar’s question', id: 'history', paras: [
      { text: 'Nobody knows exactly when or where bún chả was first made, and stories about its inventor, including one the Michelin Guide tells about a Hà Nội grill master, are legends. What is remembered is how it was sold: from bamboo baskets carried through the streets, before it settled into shops.', claimIds: ['C-BUNCHA-HISTORY'] },
      { text: 'In 1943 the writer Thạch Lam wrote about it in *Hà Nội băm sáu phố phường*, his book about the food and streets of the city. He describes the smoke, the fat sizzling on the coals and the fanning, and he gives a visiting country scholar a famous couplet, asking whether bún chả is the thousand-year treasure of Thăng Long. The line is often quoted as Thạch Lam’s own; in the book, it belongs to his character.', claimIds: ['C-BUNCHA-THACHLAM'] },
      { text: 'Vũ Bằng, the other great writer of Hà Nội food, thought the city’s bún chả was special perhaps because of the basil grown in Láng village, and because its sauce was never too salty, with the vinegar just right.', claimIds: ['C-BUNCHA-VUBANG'] }
    ] },
    { type: 'quote', text: 'A thousand-year treasure of Thăng Long: is it bún chả?', by: 'A country scholar in Thạch Lam’s “Hà Nội băm sáu phố phường” (1943), our translation', claimIds: ['C-BUNCHA-THACHLAM'] },

    { type: 'text', heading: 'The president’s table', id: 'obama', paras: [
      { text: 'On the evening of 23 May 2016, during his visit to Vietnam, US President Barack Obama sat down at Bún chả Hương Liên, a plain shop at 24 Lê Văn Hưu, with the chef and television host Anthony Bourdain. They ate bún chả, drank Hà Nội beer and stayed about an hour. Bourdain posted afterwards that the meal had cost six dollars in total, and that he had paid.', claimIds: ['C-BUNCHA-OBAMA'] },
      { text: 'The shop was full for days. It later put the table, plates, chopsticks, beer bottles and plastic stools behind glass on its second floor, and many diners still order the “Obama combo”: a fried seafood roll, a bowl of bún chả and a Hà Nội beer.', claimIds: ['C-BUNCHA-OBAMA', 'C-BUNCHA-TABLE'] }
    ] },
    { type: 'note', text: 'Some reports give the shop’s address as Hàng Bàn or Thi Sách. The Michelin Guide’s listing gives 24 Lê Văn Hưu, in Hai Bà Trưng.', claimIds: ['C-BUNCHA-OBAMA'] },

    { type: 'text', heading: 'Bib Gourmand bún chả', id: 'michelin', paras: [
      { text: 'When the Michelin Guide published its first selection for Vietnam in June 2023, two Hà Nội bún chả shops received a Bib Gourmand, the guide’s award for good food at moderate prices: Bun Cha Ta on Nguyễn Hữu Huân and Tuyết Bún Chả 34 on Hàng Than. Bún Chả Chan on Mai Hắc Đế and Bún Chả Đắc Kim on Hàng Mành followed in 2024, and Hương Liên is recommended.', claimIds: ['C-BUNCHA-MICHELIN'] },
      { text: 'The prices did not change much. A bowl at Bún Chả Chan was still 40,000 đồng after the award, and that is close to what a good bowl costs across the city.', claimIds: ['C-BUNCHA-PRICE'] }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually right', items: [
      { text: 'Dipping noodles into the sauce bowl a little at a time.', claimIds: ['C-BUNCHA-EAT'] },
      { text: 'Adding garlic and chilli to taste.', claimIds: ['C-BUNCHA-SAUCE'] },
      { text: 'Going at lunchtime.', claimIds: ['C-BUNCHA-WHEN'] },
      { text: 'Paying at the front when you leave.', claimIds: ['C-FOOD-PAY'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Pouring the sauce over the noodles: it stays in its bowl.', claimIds: ['C-BUNCHA-EAT'] },
      { text: 'Arriving late in the afternoon, when many shops have sold out.', claimIds: ['C-BUNCHA-WHEN'] },
      { text: 'Quoting the famous couplet as Thạch Lam’s own words.', claimIds: ['C-BUNCHA-THACHLAM'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Parts', text: 'Pork in sauce, noodles, herbs.' },
      { term: 'How', text: 'Noodles into the sauce, eat with pork and herbs.' },
      { term: 'When', text: 'About 11 to 1.' },
      { term: 'Price', text: 'Around 40,000 đồng.' }
    ] },
    { type: 'quiz', image: 'fd-buncha-set', question: 'Your bún chả arrives', prompt: 'A bowl of sauce with pork in it, a plate of noodles and a basket of herbs land in front of you. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Tip the noodles into the sauce bowl all at once', feedback: 'The bowl is too small, and the noodles would go soggy. Dip a little at a time.' },
      { label: 'Dip a bundle of noodles in the sauce and eat it with pork and herbs', fit: true, feedback: 'Yes: a little at a time, with as many herbs as you like.' },
      { label: 'Pour the sauce over the plate of noodles', feedback: 'The sauce stays in its own bowl; that is where you dip.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [story] };
