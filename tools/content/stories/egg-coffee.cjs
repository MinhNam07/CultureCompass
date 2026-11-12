/* Story: egg coffee (st-egg-coffee). Layout: essay.
   Researched 12 Nov 2026. 1946 is the year Café Giảng opened (at 90 Cầu Gỗ, moving to Hàng Gai in 1969); the milk-shortage origin is the family's account.
   No heritage listing exists for egg coffee; claims of one were not used. */
const today = '2026-11-12';

const sources = [
  { id: 'ZN-CONG', short: 'Znews', title: 'Cà phê Cộng: kinh doanh hoài niệm — Znews', org: 'Znews (from Doanh Nhân)', url: 'https://znews.vn/ca-phe-cong-kinh-doanh-hoai-niem-post387139.html', type: 'press', checked: today,
    used: 'Cộng Cà Phê founded in 2007 by the singer Linh Dung in a 28-square-metre room on Triệu Việt Vương, decorated in the style of the subsidy era.',
    limits: 'A business feature (February 2014).' },
  { id: 'VNS-EGG', short: 'Việt Nam News', title: 'Wake up and smell the egg coffee — Việt Nam News', org: 'Việt Nam News, by Minh Huyền', url: 'https://vietnamnews.vn/life-style/717886/wake-up-and-smell-the-egg-coffee.html', type: 'press', checked: today,
    used: 'Nguyễn Văn Giảng, a Metropole bartender, using whipped egg yolk when milk was scarce in the 1940s, then founding Café Giảng in 1946; his son Nguyễn Văn Đạo’s description of the original recipe (yolk, condensed milk, coffee, butter, cheese and secret ingredients); the cup served in a bowl of hot water; the family: the youngest son running Café Giảng, the daughter Bích opening Café Đinh.',
    limits: 'A feature (June 2020) based on the family’s own account.' },
  { id: 'DDK-CAPHE', short: 'Đại Đoàn Kết', title: 'Hà Nội — Cà phê — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by Vương Anh', url: 'https://daidoanket.vn/ha-noi-ca-phe-10149346.html', type: 'press', checked: today,
    used: 'Giảng starting work in coffee in 1937 in the kitchens of the Metropole and another hotel; Café Giảng at 90 Cầu Gỗ from 1946 and at 7 Hàng Gai from 1969; the family business later dividing into cafés on Yên Phụ and Nguyễn Hữu Huân; his death in 1988.',
    limits: 'A feature (February 2020). It says kitchens where Việt Nam News says bar.' },
  { id: 'VNEI-EGG-2016', short: 'VnExpress International', title: 'Three best places for egg coffee — VnExpress International', org: 'VnExpress International, by Phạm Văn and Minh Anh', url: 'https://e.vnexpress.net/news/travel/places/three-best-places-for-egg-coffee-3372157.html', type: 'press', checked: today,
    used: 'Giảng basing the drink on a cappuccino; the warm-water bowl at Café Giảng; prices in 2016 of about 20,000 đồng.',
    limits: 'A short guide (March 2016).' },
  { id: 'VNEI-TASTEATLAS', short: 'VnExpress International', title: '3 Vietnamese coffee drinks among Southeast Asia’s best: TasteAtlas — VnExpress International', org: 'VnExpress International, by Mai Phương', url: 'https://e.vnexpress.net/news/travel/food-recipes/3-vietnamese-coffee-drinks-among-southeast-asia-s-best-tasteatlas-4992985.html', type: 'press', checked: today,
    used: 'Egg coffee in the top ten of TasteAtlas’s Southeast Asian drinks (December 2025), which dates its origin to the 1950s.',
    limits: 'A report of an online food guide’s reader-rated list.' },
  { id: 'ZN-HNCOFFEE', short: 'Znews', title: 'Kiểu cà phê vừa cũ vừa mới của Hà Nội — Znews', org: 'Znews, by Quỳnh Trang', url: 'https://znews.vn/kieu-ca-phe-vua-cu-vua-moi-cua-ha-noi-post1645901.html', type: 'press', checked: today,
    used: 'Hà Nội ranked second among coffee cities in Food & Wine’s Global Tastemakers Awards 2026; Café Giảng called the cradle of egg coffee.',
    limits: 'A news feature (April 2026) reporting a magazine’s expert survey.' },
  { id: 'VT-NAU', short: 'VietTimes', title: 'Khác biệt văn hóa uống cà phê của Hà Nội và Sài Gòn — VietTimes', org: 'VietTimes (citing VnExpress)', url: 'https://viettimes.vn/khac-biet-van-hoa-uong-ca-phe-cua-ha-noi-va-sai-gon-post18048.html', type: 'press', checked: today,
    used: 'Hanoians calling coffee with milk “cà phê nâu”, thick with condensed milk and often without ice, and bạc xỉu being almost unknown in Hà Nội.',
    limits: 'A comparative feature (January 2016).' },
  { id: 'BPL-CAPHEPHO', short: 'Báo Pháp Luật', title: 'Cà-phê phố — Báo Pháp Luật Việt Nam', org: 'Báo Pháp Luật Việt Nam, by Đoàn Tử Diễn', url: 'https://baophapluat.vn/ca-phe-pho-post90217.html', type: 'press', checked: today,
    used: 'Nguyễn Tuân insisting coffee must be phin coffee; slow drinking in street cafés; Café Lâm on Nguyễn Hữu Huân, more than half a century old, hung with paintings by Bùi Xuân Phái, Nguyễn Tư Nghiêm, Nguyễn Sáng and Văn Cao.',
    limits: 'A literary essay (2010).' },
  { id: 'ANTD-LAM', short: 'An ninh Thủ đô', title: 'Ẩn ý chuyện “đổi gái lấy cà phê” — An ninh Thủ đô', org: 'An ninh Thủ đô, by Ánh Nguyệt', url: 'https://anninhthudo.vn/an-y-chuyen-doi-gai-lay-ca-phe-post119830.antd', type: 'press', checked: today,
    used: 'Bùi Xuân Phái sketching portraits as gifts at Café Lâm while he drank there.',
    limits: 'A feature (November 2011) retelling anecdotes.' },
  { id: 'VNN-OLDCAFES', short: 'VietNamNet', title: 'Experience long-established cafes in Hanoi’s Old Quarter — VietNamNet', org: 'VietNamNet (from Hanoi Times)', url: 'https://vietnamnet.vn/en/experience-long-established-cafes-in-hanoi-s-old-quarter-2273152.html', type: 'press', checked: today,
    used: 'Café Lâm established in 1952; Café Thái on Triệu Việt Vương nearly a hundred years old.',
    limits: 'A feature (April 2024); other sources give different years.' },
  { id: 'VNE-CAPHE-1857', short: 'VnExpress', title: 'Trăm năm lam lũ với cà phê — VnExpress', org: 'VnExpress (from Sài Gòn Tiếp Thị)', url: 'https://vnexpress.net/tram-nam-lam-lu-voi-ca-phe-2873466.html', type: 'press', checked: today,
    used: 'Coffee brought to Vietnam in 1857 and planted officially from 1888, with the first French estates in the centre and north.',
    limits: 'A feature (2013) about Vietnam as a whole, not Hà Nội.' },
  { id: 'CAFEF-BACXIU', short: 'CafeF', title: 'Vì sao gọi là bạc xỉu — CafeF', org: 'CafeF (from Phụ nữ mới), by Ngọc Ánh', url: 'https://cafef.vn/vi-sao-goi-la-bac-xiu-188260805205431233.chn', type: 'press', checked: today,
    used: 'The popular explanation that bạc xỉu comes from the Chinese community of Saigon–Chợ Lớn: milk with a little coffee.',
    limits: 'A short explainer (August 2026) giving the popular explanation.' }
];

const claims = [
  { id: 'C-EGGCOFFEE', kind: 'history', status: 'published', sourceIds: ['VNS-EGG', 'DDK-CAPHE'], text: 'By his family’s account, egg coffee was created in the 1940s by Nguyễn Văn Giảng, who worked at the Metropole Hotel and used whipped egg yolk because fresh milk was scarce. In 1946 he opened Café Giảng, which his family still runs.' },
  { id: 'C-EGG-ADDRESS', kind: 'history', status: 'published', sourceIds: ['DDK-CAPHE'], text: 'Café Giảng opened at 90 Cầu Gỗ in 1946, moved to 7 Hàng Gai in 1969, and later divided into two family cafés, on Yên Phụ and Nguyễn Hữu Huân. Giảng died in 1988.' },
  { id: 'C-EGG-DISPUTE', kind: 'history', status: 'published', sourceIds: ['DDK-CAPHE', 'VNS-EGG', 'VNEI-EGG-2016', 'VNEI-TASTEATLAS'], text: 'Details differ between accounts: one says Giảng worked in the hotel kitchens rather than the bar, one says he based the drink on a cappuccino, and TasteAtlas dates it to the 1950s.' },
  { id: 'C-EGGCOFFEE-MAKE', kind: 'custom', status: 'published', sourceIds: ['VNS-EGG', 'VNEI-EGG-2016'], text: 'Egg yolk is whipped into a thick, sweet foam and spooned over hot black coffee. The cup is often served standing in a bowl of hot water to keep it warm.' },
  { id: 'C-EGG-RECIPE', kind: 'custom', status: 'published', sourceIds: ['VNS-EGG'], text: 'Giảng’s son Nguyễn Văn Đạo described the original recipe as egg yolk, condensed milk, coffee, butter, cheese and some secret ingredients.' },
  { id: 'C-EGG-FAMILY', kind: 'history', status: 'published', sourceIds: ['VNS-EGG'], text: 'Giảng’s youngest son runs Café Giảng, and his daughter Bích opened Café Đinh on Đinh Tiên Hoàng, by Hoàn Kiếm Lake, which her son manages.' },
  { id: 'C-EGG-RANK', kind: 'custom', status: 'published', sourceIds: ['VNEI-TASTEATLAS', 'ZN-HNCOFFEE'], text: 'Egg coffee was in the top ten of TasteAtlas’s Southeast Asian drinks in 2025, and in 2026 Food & Wine’s Global Tastemakers survey ranked Hà Nội the world’s second coffee city.' },
  { id: 'C-COFFEE-ARRIVE', kind: 'history', status: 'published', sourceIds: ['VNE-CAPHE-1857'], text: 'Coffee was brought to Vietnam in 1857 and planted officially from 1888, on French estates.' },
  { id: 'C-COFFEE-NAU', kind: 'custom', status: 'published', sourceIds: ['VT-NAU', 'CAFEF-BACXIU'], text: 'In Hà Nội coffee with milk is “cà phê nâu”, brown coffee, made thick with condensed milk and often drunk without ice. Bạc xỉu, mostly milk with a little coffee, is a Saigon drink whose name is popularly traced to the city’s Chinese community.' },
  { id: 'C-COFFEE-PHIN', kind: 'custom', status: 'published', sourceIds: ['BPL-CAPHEPHO'], text: 'Hà Nội coffee is traditionally made in a phin, a small metal drip filter, and drunk slowly; the writer Nguyễn Tuân insisted coffee had to be phin coffee.' },
  { id: 'C-COFFEE-LAM', kind: 'history', status: 'published', sourceIds: ['BPL-CAPHEPHO', 'ANTD-LAM', 'VNN-OLDCAFES'], text: 'Café Lâm on Nguyễn Hữu Huân, open since the early 1950s, was a haunt of painters: Bùi Xuân Phái sketched portraits as gifts there, and works by Phái, Nguyễn Tư Nghiêm, Nguyễn Sáng and Văn Cao hung on its walls.' },
  { id: 'C-COFFEE-OLDNEW', kind: 'history', status: 'published', sourceIds: ['VNN-OLDCAFES', 'BPL-CAPHEPHO', 'ZN-CONG'], text: 'Triệu Việt Vương is lined with cafés, among them Café Thái, nearly a hundred years old. Newer chains play on the past: Cộng Cà Phê, founded there in 2007 by the singer Linh Dung, is decorated in the style of the subsidy era.' },
  { id: 'C-EGG-PRICE', kind: 'custom', status: 'published', sourceIds: ['VNEI-EGG-2016'], text: 'In 2016 an egg coffee at Café Giảng cost about 20,000 đồng, and slightly less at Café Đinh.' },
  { id: 'C-EGG-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: eat the foam with the spoon first, then stir the rest into the coffee. And drink it slowly: a Hà Nội café is for sitting.' }
];

const glossary = [
  { id: 'phin', vi: 'phin', say: 'fin', en: 'A small metal drip filter that sits on the cup; the coffee drips through slowly.' },
  { id: 'ca-phe-nau', vi: 'cà phê nâu', say: 'cah feh now', en: '“Brown coffee”: the Hà Nội name for coffee with condensed milk.' }
];

const story = {
  id: 'st-egg-coffee',
  layout: 'essay',
  title: 'Egg coffee',
  dek: 'A bartender, a shortage of milk, and a café that has stayed in one family since 1946. How Hà Nội came to whip egg yolk into its coffee, and how the city drinks it.',
  place: 'Hà Nội’s cafés',
  imageId: 'fd-egg-giang',
  hero: { image: 'fd-egg-giang' },
  appliesTo: 'Egg coffee and café habits in Hà Nội. The origin story is the one told by the Giảng family.',
  varies: 'Recipes differ from café to café, and many now serve iced and flavoured versions. Coffee in Saigon is a different world.',
  sections: [
    { text: 'Egg coffee is thought to have begun in the 1940s with Nguyễn Văn Giảng, who used whipped egg yolk when fresh milk was scarce. In 1946 he opened Café Giảng, which his family still runs.', claimIds: ['C-EGGCOFFEE'] },
    { heading: 'What is in the cup', text: 'Egg yolk is whipped into a sweet foam over hot black coffee, often served in a bowl of hot water.', claimIds: ['C-EGGCOFFEE-MAKE'] }
  ],
  blocks: [
    { type: 'essay', label: 'Photo essay: egg coffee in Hà Nội', steps: [
      { image: 'fd-egg-sign', label: 'Since 1946', heading: 'A sign at the end of a lane', paras: [
        { text: 'The most famous café in Hà Nội is easy to miss: a lit sign at the mouth of a narrow lane off Nguyễn Hữu Huân. This is Café Giảng, where by the family’s account egg coffee began.', claimIds: ['C-EGGCOFFEE'] }
      ] },
      { image: 'fd-egg-making', label: 'The whisk', heading: 'Yolk, sugar, patience', paras: [
        { text: 'Egg yolk is whipped with sweetener until it turns pale and thick. It is spooned on top of a small cup of strong black coffee.', claimIds: ['C-EGGCOFFEE-MAKE'] }
      ] },
      { image: 'fd-egg-giang', label: 'The cup', heading: 'Served in hot water', paras: [
        { text: 'The cup often comes standing in a bowl of hot water, to keep it warm while you work through the foam with a spoon.', claimIds: ['C-EGGCOFFEE-MAKE'] }
      ] }
    ] },

    { type: 'text', heading: 'A bartender and a shortage of milk', id: 'origin', paras: [
      { text: 'Nguyễn Văn Giảng started working with coffee in 1937, at the Metropole, the grand French hotel near the Opera House. In the 1940s fresh milk was hard to find in Hà Nội. According to his family, Giảng whipped egg yolk as a substitute, and the thick, sweet foam that resulted became a drink of its own.', claimIds: ['C-EGGCOFFEE', 'C-EGG-ADDRESS'] },
      { text: 'In 1946 he left the hotel and opened his own café, at 90 Cầu Gỗ in the Old Quarter. In 1969 it moved to 7 Hàng Gai. Giảng died in 1988, and the business later divided between his children: the café that now carries his name, up a lane off Nguyễn Hữu Huân, and another on Yên Phụ.', claimIds: ['C-EGGCOFFEE', 'C-EGG-ADDRESS'] },
      { text: 'Like most food origin stories, this one comes mostly from the people who tell it, and the details vary. One newspaper says Giảng worked in the hotel kitchens, not the bar. One English-language report says he was trying to recreate a cappuccino. The food guide TasteAtlas dates the drink to the 1950s. What everyone agrees on is the family and the café. Giảng’s son Nguyễn Văn Đạo has described the original recipe as egg yolk, condensed milk, coffee, butter, cheese and some secret ingredients.', claimIds: ['C-EGG-DISPUTE', 'C-EGG-RECIPE'] }
    ] },

    { type: 'text', heading: 'One family, two cafés', id: 'family', paras: [
      { text: 'Egg coffee is still a family business. Giảng’s youngest son runs Café Giảng. His daughter, Bích, opened Café Đinh on Đinh Tiên Hoàng, by Hoàn Kiếm Lake, and her son manages it today. Many other cafés now serve egg coffee too, some of them iced or flavoured.', claimIds: ['C-EGG-FAMILY'] },
      { text: 'The recipe has travelled further than the family could have imagined. In 2025 TasteAtlas put egg coffee in its top ten Southeast Asian drinks, and in 2026 a Food & Wine survey of more than four hundred experts ranked Hà Nội the world’s second coffee city, with Café Giảng described as the cradle of egg coffee.', claimIds: ['C-EGG-RANK'] }
    ] },
    { type: 'figure', image: 'fd-egg-giang', size: 'wide', caption: 'Egg coffee at Café Giảng, with a glass of iced tea.' },

    { type: 'text', heading: 'How to drink it', id: 'drink', paras: [
      { text: 'There is no single rule, but most people start with the spoon, eating some of the foam on its own, then stir the rest into the coffee underneath. Keep the cup in its bowl of hot water between sips. The drink is rich and sweet, closer to a dessert than a morning coffee, and a small cup is plenty.', claimIds: ['C-EGGCOFFEE-MAKE', 'C-EGG-TIP'] }
    ] },
    { type: 'note', text: 'Egg coffee uses raw or lightly warmed egg yolk. If you avoid raw egg, ask before ordering.', editorial: true },

    { type: 'text', heading: 'A city that drinks coffee slowly', id: 'cafes', paras: [
      { text: 'Coffee reached Vietnam with the French: it was brought in 1857 and planted officially from 1888. Hà Nội made its own habits around it. The city’s coffee is traditionally made in a [[phin|phin]], a small metal filter that sits on the cup and lets the coffee drip through, slowly. The writer Nguyễn Tuân would drink nothing else.', claimIds: ['C-COFFEE-ARRIVE', 'C-COFFEE-PHIN'] },
      { text: 'Order coffee with milk in Hà Nội and you ask for [[ca-phe-nau|cà phê nâu]], brown coffee: thick with condensed milk, often drunk hot and without ice. *Bạc xỉu*, a glass of milk with a little coffee, is a Saigon drink, its name popularly traced to the city’s Chinese community, and you will rarely see it on an old Hà Nội menu.', claimIds: ['C-COFFEE-NAU'] },
      { text: 'Cafés were also where the city’s artists met. Café Lâm on Nguyễn Hữu Huân, open since the early 1950s, was a haunt of painters. Bùi Xuân Phái drew portraits there as gifts while he drank, and works by Phái, Nguyễn Tư Nghiêm, Nguyễn Sáng and Văn Cao hung on its walls.', claimIds: ['C-COFFEE-LAM'] }
    ] },
    { type: 'text', heading: 'Old cafés and new', id: 'oldnew', paras: [
      { text: 'Walk down Triệu Việt Vương, south of the lake, and you pass café after café: tiny stools on the pavement, people sitting for an hour over one glass. Some are old. Café Thái at number 27 is nearly a hundred years old, and the street’s cafés appear in the writing of Hà Nội essayists who liked to watch the city go by over a phin.', claimIds: ['C-COFFEE-OLDNEW', 'C-COFFEE-PHIN'] },
      { text: 'Others sell the past. Cộng Cà Phê began in 2007 in a 28-square-metre room on the same street, opened by the singer Linh Dung and decorated to recall the subsidy era. Egg coffee, meanwhile, has spread from a single family café to menus across the city. At the family cafés the price has stayed modest: about 20,000 đồng a cup in 2016.', claimIds: ['C-COFFEE-OLDNEW', 'C-EGG-PRICE'] }
    ] },
    { type: 'tabs', heading: 'Hà Nội coffee, in four orders', id: 'orders', intro: 'Choose a tab for coffee drinks, or for café habits.', label: 'Coffee in Hà Nội', tabs: [
      { label: 'Drinks', columns: ['Order', 'What you get'], rows: [
        [{ text: 'cà phê trứng', vi: true }, { text: 'Egg coffee: whipped yolk over black coffee, often in hot water.', claimIds: ['C-EGGCOFFEE-MAKE'] }],
        [{ text: 'cà phê nâu', vi: true }, { text: 'Coffee with condensed milk, the Hà Nội way.', claimIds: ['C-COFFEE-NAU'] }],
        [{ text: 'cà phê đen', vi: true }, 'Black coffee, usually from a phin.'],
        [{ text: 'bạc xỉu', vi: true }, { text: 'Mostly milk, a little coffee. A Saigon drink.', claimIds: ['C-COFFEE-NAU'] }]
      ] },
      { label: 'Habits', columns: ['Habit', 'What to expect'], rows: [
        ['The phin', { text: 'Your coffee may arrive still dripping. Wait for it.', claimIds: ['C-COFFEE-PHIN'] }],
        ['Sitting', { text: 'Cafés are for staying. Nobody will hurry you.', claimIds: ['C-COFFEE-PHIN', 'C-EGG-TIP'] }],
        ['Iced tea', { text: 'A glass of trà đá often comes free on the side.', claimIds: ['C-FOOD-TRADA'] }]
      ] }
    ] },

    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Where it began', text: 'Café Giảng, by the family’s account; opened 1946.' },
      { term: 'How', text: 'Foam first with the spoon, then stir.' },
      { term: 'With milk', text: 'Ask for cà phê nâu.' },
      { term: 'Pace', text: 'Slow. Sit.' }
    ] },
    { type: 'quiz', image: 'fd-egg-making', question: 'Ordering like a Hanoian', prompt: 'You want coffee with milk, the way Hà Nội drinks it. What do you ask for?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Bạc xỉu', feedback: 'That is mostly milk with a little coffee, a Saigon drink you will rarely see on an old Hà Nội menu.' },
      { label: 'Cà phê nâu', fit: true, feedback: 'Yes: “brown coffee”, thick with condensed milk.' },
      { label: 'Cà phê trứng', feedback: 'That is egg coffee: delicious, but whipped yolk rather than milk.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [story] };
