/* New chapter 1–2 content for CultureCompass (Vietnam). Merged by apply-vietnam-ch12.cjs. */
const today = '2026-11-04';

const sources = [
  { id: 'VNAT-OLDQ', short: 'Vietnam National Authority of Tourism', title: 'Explore the Old Quarter your way — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/explore-old-quarter-your-way', type: 'official', checked: today,
    used: 'The 36 trade streets north of Hoàn Kiếm Lake and their link to the royal court; what Hàng Bạc, Lãn Ông and Hàng Mã sell; tube houses; Ô Quan Chưởng as the last surviving gate.',
    limits: 'A visitor guide, no publication date shown. Some street descriptions are brief.' },
  { id: 'HNT-TRADA', short: 'Hanoi Times', title: 'Sidewalk iced tea, an indispensable part of Hanoians’ life — Hanoi Times', org: 'Hanoi Times (newspaper)', url: 'https://hanoitimes.vn/sidewalk-iced-tea-an-indispensable-part-of-hanoians-life-316913.html', type: 'press', checked: today,
    used: 'How a trà đá stall is set up, what else it sells, when people drink it and who sits there.',
    limits: 'Feature article; no publication date shown in the text we read.' },
  { id: 'AFP-PAVEMENT', short: 'AFP via The Star', title: 'Hanoi curbs kerb culture with clampdown on pavement vendors — AFP, published by The Star', org: 'Agence France-Presse (republished by The Star, Malaysia)', url: 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/06/02/hanoi-curbs-kerb-culture-with-clampdown-on-pavement-vendors', type: 'press', checked: today,
    used: 'Fines for unauthorised peddling and blocking pavements since December 2025, and surveillance cameras.',
    limits: 'A news report from June 2026; rules and enforcement may change again. It names no specific streets.' },
  { id: 'HNT-WALK', short: 'Hanoi Times', title: 'Streets around Hoan Kiem Lake officially become pedestrianized on weekends — Hanoi Times', org: 'Hanoi Times (newspaper)', url: 'https://m.hanoitimes.vn/streets-around-hoan-kiem-lake-officially-become-pedestrianized-on-weekends-300624.html', type: 'press', checked: today,
    used: 'The weekend walking space around Hoàn Kiếm Lake: Friday to Sunday evenings, its hours and cultural events.',
    limits: 'Report from December 2019. Hours and the streets included have changed over the years; check locally.' },
  { id: 'HNT-PHO', short: 'Hanoi Times', title: 'Hanoi’s pho declared national intangible heritage — Hanoi Times', org: 'Hanoi Times (newspaper)', url: 'https://hanoitimes.vn/hanois-pho-declared-national-intangible-heritage.594554.html', type: 'press', checked: today,
    used: 'Hà Nội phở listed as national intangible cultural heritage in August 2024; phở as an early-1900s street snack; beef and chicken versions; what comes with a bowl; the number of phở shops.',
    limits: 'News report (2024). It does not name the issuing authority or decision number.' },
  { id: 'INVESTOR-NAMDINH', short: 'The Investor', title: 'Local noodle soup designated as national intangible cultural heritage — The Investor', org: 'The Investor (Vietnam Investment Review)', url: 'https://theinvestor.vn/local-noodle-soup-designated-as-national-intangible-cultural-heritage-d11881.html', type: 'press', checked: today,
    used: 'Phở Nam Định was also recognised as national intangible cultural heritage by the Ministry of Culture, Sports and Tourism in 2024.',
    limits: 'News report, 13 August 2024.' },
  { id: 'VNNEWS-BUNCHA', short: 'Viet Nam News', title: 'Bún chả: a tasty feast of colours and flavours — Viet Nam News', org: 'Viet Nam News (newspaper)', url: 'https://vietnamnews.vn/life-style/345278/bun-cha-a-tasty-feast-of-colours-and-flavours.html', type: 'press', checked: today,
    used: 'What bún chả is made of, its dipping sauce and herbs, how it is eaten, when Hanoians eat it, and what writer Thạch Lam said about it.',
    limits: 'Feature article, 1 November 2016.' },
  { id: 'VNN-EGG', short: 'VietNamNet', title: 'Wake up and smell the egg coffee — VietNamNet', org: 'VietNamNet (newspaper)', url: 'https://vietnamnet.vn/en/wake-up-and-smell-the-egg-coffee-647728.html', type: 'press', checked: today,
    used: 'The origin of egg coffee with Nguyễn Văn Giang in the 1940s, Café Giảng (1946), how it is made and served.',
    limits: 'Feature article, June 2020. The origin story comes from the family that runs the café.' }
];

const claims = [
  { id: 'C-OQ-GUILDS', kind: 'history', sourceIds: ['VNAT-OLDQ'],
    text: 'The Old Quarter has 36 streets, each named after a trade or craft that settled north of Hoàn Kiếm Lake; its workshops made goods for the royal court at the nearby Thăng Long citadel. Only a few streets still sell what their names describe.' },
  { id: 'C-OQ-HANG', kind: 'custom', sourceIds: ['VT-HANGMA'],
    text: '“Hàng” in a street name means goods or merchandise.' },
  { id: 'C-OQ-EXAMPLES', kind: 'custom', sourceIds: ['VNAT-OLDQ'],
    text: 'Hàng Bạc was home to silversmiths making items for the palace and now has jewellers and money changers; Lãn Ông is known for traditional medicines and herbs; Hàng Mã for religious goods and festival decorations; Hàng Gai today sells fabrics and made-to-measure clothes.' },
  { id: 'C-OQ-TUBE', kind: 'history', sourceIds: ['VNAT-OLDQ'],
    text: 'The quarter’s tube houses have narrow fronts but are built deep and tall, with courtyards inside to let in light. Ô Quan Chưởng is the only surviving gate of the wall that once protected the area.' },
  { id: 'C-TRADA', kind: 'custom', sourceIds: ['HNT-TRADA'],
    text: 'A trà đá (iced tea) stall needs little more than a teapot, some glasses and a few plastic stools on the pavement; some also sell peanut sweets, sunflower seeds and bottled drinks. Stalls open from early morning until late, and serve hot tea in winter.' },
  { id: 'C-TRADA-SOCIAL', kind: 'custom', sourceIds: ['HNT-TRADA'],
    text: 'Office workers and street sweepers, young and old, stop for tea after breakfast, at lunch, after work or with friends in the evening, watching the street and chatting, sometimes with strangers.' },
  { id: 'C-PAVEMENT-2026', kind: 'custom', sourceIds: ['AFP-PAVEMENT'],
    text: 'Since December 2025 Hà Nội has been fining unauthorised street vending and businesses that block pavements, helped by about 2,000 surveillance cameras, so pavement stalls and seating are less spontaneous than before.' },
  { id: 'C-HK-MORNING', kind: 'custom', sourceIds: ['VNAT-HOANKIEM'],
    text: 'Around 6 a.m. local residents practise tai chi on the shore of Hoàn Kiếm Lake. Small groups of students sometimes approach foreign visitors to practise their English.' },
  { id: 'C-HK-WALK', kind: 'custom', sourceIds: ['HNT-WALK'],
    text: 'From Friday evening to Sunday night the streets around Hoàn Kiếm Lake close to traffic and become a walking space, from about 7 p.m. in summer and 6 p.m. in winter until midnight, with cultural and art performances; the scheme began on trial around 2016.' },
  { id: 'C-PHO-HERITAGE', kind: 'custom', sourceIds: ['HNT-PHO'],
    text: 'Hà Nội phở was added to Vietnam’s list of national intangible cultural heritage in August 2024. The city had nearly 700 phở shops by 2023.' },
  { id: 'C-PHO-BOWL', kind: 'history', sourceIds: ['HNT-PHO'],
    text: 'Phở began as a street snack in the early 1900s. It is served mainly with beef or chicken, in an aromatic broth with soft rice noodles, often with fresh herbs, spices and crisp fried dough sticks.' },
  { id: 'C-PHO-NAMDINH', kind: 'custom', sourceIds: ['INVESTOR-NAMDINH'],
    text: 'Phở Nam Định was also recognised as national intangible cultural heritage by the Ministry of Culture, Sports and Tourism in 2024.' },
  { id: 'C-BUNCHA', kind: 'custom', sourceIds: ['VNNEWS-BUNCHA'],
    text: 'Bún chả is rice vermicelli with pork patties and sliced pork belly grilled over charcoal, fresh herbs such as lettuce, coriander, basil and perilla, and a dipping sauce that balances fish sauce, vinegar or lime, chilli and sugar, sometimes with green papaya, kohlrabi or carrot pickles.' },
  { id: 'C-BUNCHA-EAT', kind: 'custom', sourceIds: ['VNNEWS-BUNCHA'],
    text: 'You dip the noodles in the sauce and eat them with the pork and herbs. Hanoians eat it at breakfast, lunch or dinner; it was once sold from bamboo baskets carried through the streets, and the writer Thạch Lam called it the most characteristic dish of Hà Nội.' },
  { id: 'C-EGGCOFFEE', kind: 'history', sourceIds: ['VNN-EGG'],
    text: 'Egg coffee is thought to have begun in the 1940s with Nguyễn Văn Giang, a bartender at the Metropole Hotel, who whisked egg yolk in place of fresh milk when milk was scarce. He opened Café Giảng in 1946, which his family still runs.' },
  { id: 'C-EGGCOFFEE-MAKE', kind: 'custom', sourceIds: ['VNN-EGG'],
    text: 'Egg yolk is whipped into a thick, creamy foam and poured over hot black coffee; some cafés serve the cup standing in a bowl of hot water to keep it warm.' }
].map((c) => Object.assign({ status: 'needs_verification' }, c));

const stories = [
  {
    id: 'st-old-quarter', country: 'vietnam', place: 'Phố cổ, Hà Nội',
    title: 'Streets named after what they sold', dek: 'Silver, herbs, paper offerings: how the Old Quarter’s street names tell its trades.',
    imageId: 'img-hang-bac',
    sections: [
      { text: 'North of Hoàn Kiếm Lake, the Old Quarter is often called the “36 streets”. Each was named after a trade or craft that settled there, and many workshops once made goods for the royal court at the nearby citadel.', claimIds: ['C-OQ-GUILDS'] },
      { heading: 'Reading a street sign', text: '“Hàng” means goods, so the word after it tells you what the street sold.', claimIds: ['C-OQ-HANG'] },
      { heading: 'Then and now', text: 'Hàng Bạc was the street of silversmiths and now has jewellers and money changers. Lãn Ông still smells of traditional medicine and herbs, and Hàng Mã sells religious goods and festival decorations. Hàng Gai today sells fabric and made-to-measure clothes. Only a few streets still match their names.', claimIds: ['C-OQ-EXAMPLES', 'C-OQ-GUILDS'] },
      { heading: 'Narrow, deep and tall', text: 'The tube houses lining these streets have narrow fronts but run far back, with small courtyards inside for light. At the eastern edge, Ô Quan Chưởng is the last surviving gate of the old city wall.', claimIds: ['C-OQ-TUBE'] }
    ],
    appliesTo: 'Hà Nội’s Old Quarter (Hoàn Kiếm), from the national tourism authority’s visitor guide.',
    varies: 'Shops change quickly; many streets now sell clothes and souvenirs whatever their name.', phraseIds: []
  },
  {
    id: 'st-pavement', country: 'vietnam', place: 'Hà Nội',
    title: 'Life on the pavement', dek: 'A teapot, some glasses, a few plastic stools: the city’s smallest meeting place.',
    imageId: 'img-plastic-stools',
    sections: [
      { text: 'A trà đá (iced tea) stall needs very little: a teapot, glasses and a few plastic stools on the pavement. Some also sell peanut sweets, sunflower seeds and bottled drinks. They open from early morning until late, and in winter the tea comes hot.', claimIds: ['C-TRADA'] },
      { heading: 'Who sits there', text: 'Everyone: office workers and street sweepers, students and retirees. People stop after breakfast, at lunch, after work or with friends in the evening, watch the street go by and talk, sometimes with people they have only just met.', claimIds: ['C-TRADA-SOCIAL'] },
      { heading: 'Pavements are changing', text: 'Since December 2025 the city has been fining unlicensed vendors and businesses that block the pavement, using about 2,000 cameras, so stalls and pavement seating are less spontaneous than older guides describe.', claimIds: ['C-PAVEMENT-2026'] },
      { editorial: true, text: 'Sitting down on a free stool and ordering a glass is how most people join in.', claimIds: [] }
    ],
    appliesTo: 'Hà Nội, from Hanoi Times and an AFP report from June 2026.',
    varies: 'Rules on pavement use are changing; what you find depends on the street and the year.', phraseIds: []
  },
  {
    id: 'st-hoan-kiem-days', country: 'vietnam', place: 'Hồ Hoàn Kiếm, Hà Nội',
    title: 'Mornings and weekends by the lake', dek: 'Tai chi at dawn and a car-free lakeside at the weekend.',
    imageId: 'img-taichi-lake',
    sections: [
      { text: 'Hoàn Kiếm Lake wakes up early. Around 6 a.m. residents practise tai chi and other exercises along the shore.', claimIds: ['C-HK-MORNING'] },
      { heading: 'A walking city at the weekend', text: 'From Friday evening to Sunday night the streets around the lake close to traffic and become a walking space until midnight, with music, performances and events.', claimIds: ['C-HK-WALK'] },
      { heading: 'Practising English', text: 'You may be approached by students who want to practise their English. They are usually polite, and a short chat is an easy way to meet local people.', claimIds: ['C-HK-MORNING'] }
    ],
    appliesTo: 'Hoàn Kiếm Lake, from the national tourism authority and Hanoi Times.',
    varies: 'Walking-street hours and streets have changed over time, and it may close on some holidays.', phraseIds: []
  },
  {
    id: 'st-pho', country: 'vietnam', place: 'Hà Nội',
    title: 'A bowl of phở', dek: 'From a street snack in the early 1900s to national heritage in 2024.',
    imageId: 'img-pho-bo',
    sections: [
      { text: 'Phở began as a street snack in the early 1900s. A bowl is rice noodles in an aromatic broth, served mainly with beef (phở bò) or chicken (phở gà), often with fresh herbs, spices and crisp fried dough sticks.', claimIds: ['C-PHO-BOWL'] },
      { heading: 'Heritage in a bowl', text: 'In August 2024 Hà Nội phở was added to Vietnam’s list of national intangible cultural heritage. By 2023 the city had nearly 700 phở shops.', claimIds: ['C-PHO-HERITAGE'] },
      { heading: 'Not only Hà Nội', text: 'Phở Nam Định, from a province south-east of the capital, was recognised in the same year, and other regions have their own versions.', claimIds: ['C-PHO-NAMDINH'] }
    ],
    appliesTo: 'Hà Nội, from Hanoi Times and The Investor.',
    varies: 'Every shop has its own broth and toppings, and southern phở is served quite differently.', phraseIds: []
  },
  {
    id: 'st-bun-cha', country: 'vietnam', place: 'Hà Nội',
    title: 'How to eat bún chả', dek: 'Grilled pork, cold noodles and a bowl of sauce you dip into.',
    imageId: 'img-bun-cha',
    sections: [
      { text: 'Bún chả comes in parts: a bowl of dipping sauce with grilled pork patties and pork belly in it, a plate of cold rice vermicelli and a basket of fresh herbs. The sauce balances fish sauce, vinegar or lime, chilli and sugar, sometimes with thin slices of green papaya or kohlrabi.', claimIds: ['C-BUNCHA'] },
      { heading: 'Dip, then eat', text: 'Take some noodles, dip them in the sauce and eat them with the pork and herbs.', claimIds: ['C-BUNCHA-EAT'] },
      { heading: 'A Hà Nội dish', text: 'Hanoians eat it at any meal. It was once sold from bamboo baskets carried through the streets, and the writer Thạch Lam called it the most characteristic dish of Hà Nội.', claimIds: ['C-BUNCHA-EAT'] }
    ],
    appliesTo: 'Hà Nội, from Viet Nam News.',
    varies: 'Shops differ in their sauce and how they serve it.', phraseIds: []
  },
  {
    id: 'st-egg-coffee', country: 'vietnam', place: 'Hà Nội',
    title: 'Egg coffee', dek: 'A drink invented when milk ran short, still served by the same family.',
    imageId: 'img-egg-coffee',
    sections: [
      { text: 'Egg coffee (cà phê trứng) is thought to have begun in the 1940s with Nguyễn Văn Giang, a bartender at the Metropole Hotel, who used whisked egg yolk because fresh milk was scarce. In 1946 he opened his own café, Café Giảng, which his family still runs.', claimIds: ['C-EGGCOFFEE'] },
      { heading: 'What is in the cup', text: 'Egg yolk is whipped into a thick, sweet foam and poured over hot black coffee. Some cafés serve the cup in a bowl of hot water to keep it warm.', claimIds: ['C-EGGCOFFEE-MAKE'] }
    ],
    appliesTo: 'Hà Nội, from VietNamNet. The origin story is the one told by the café’s family.',
    varies: 'Recipes differ from café to café, and many now serve iced and flavoured versions.', phraseIds: []
  }
];

const BY4 = 'https://creativecommons.org/licenses/by/4.0/', BYSA4 = 'https://creativecommons.org/licenses/by-sa/4.0/', BYSA3 = 'https://creativecommons.org/licenses/by-sa/3.0/', BYSA2 = 'https://creativecommons.org/licenses/by-sa/2.0/', CC0 = 'https://creativecommons.org/publicdomain/zero/1.0/';
const photos = [
  ['img-hang-bac', 'hn-hang-bac.jpg', 'Hanoi - Hàng Bạc Street - 1.jpg', 'Benjamin Smith', 'CC BY-SA 4.0', BYSA4, 'Hàng Bạc street in the Old Quarter: narrow shopfronts with signs and balconies, and motorbikes on the road.'],
  ['img-plastic-stools', 'hn-plastic-stools.jpg', 'Hanoi Vietnam The-omnipresent-plastic-chairs-01.jpg', 'CEphoto, Uwe Aranas', 'CC BY-SA 3.0', BYSA3, 'Stacks of small blue and red plastic stools on a Hà Nội pavement.'],
  ['img-taichi-lake', 'hn-taichi-lake.jpg', 'Taichi exercise at Ngọc Sơn Temple 02-12-2013.jpg', 'Rudolph.A.Furtado', 'CC0', CC0, 'People doing tai chi in the morning by Hoàn Kiếm Lake near Ngọc Sơn temple.'],
  ['img-pho-bo', 'pho-bo.jpg', 'Phở bò, Cầu Giấy, Hà Nội.jpg', 'Codename5281', 'CC BY-SA 3.0', BYSA3, 'A bowl of phở bò with noodles, beef and herbs, chopsticks resting in it, beside lime wedges and chilli.'],
  ['img-egg-coffee', 'egg-coffee.jpg', 'Egg Coffee at Cafe Giảng, Hà Nội, Vietnam.jpg', 'travel oriented', 'CC BY-SA 2.0', BYSA2, 'A cup of egg coffee with a thick pale foam, on a saucer at Café Giảng.']
].map(([id, file, page, author, license, licenseUrl, alt]) => ({
  id, kind: 'image', file: 'assets/img/' + file, alt,
  credit: author + ', “' + page.replace(/\.(jpe?g|JPG)$/, '') + '”',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(page.replace(/ /g, '_')),
  license, licenseUrl, note: 'Resized.', commonsFile: page
}));

/* existing stories without a photo get a scene painting (already on disk) */
const storyImages = { 'st-arrive-home': 'art-sc01', 'st-family-words': 'art-sc01', 'st-keep-cool': 'art-sc04' };

const leads = {
  everyday: 'Hà Nội life spills onto the street: tea on the pavement, prices agreed at the market, a word for “you” chosen with care. These stories start at the door of a family home and end by the lake.',
  food: 'Most meals here are shared, and many are eaten on a low stool by the road. Start with how a family table works, then try the city’s best-known bowls and cups.',
  beliefs: 'A thousand years as a capital have left temples, stone stelae and legends all over the city, and most homes keep an altar of their own.'
};

module.exports = { sources, claims, stories, photos, storyImages, leads };
