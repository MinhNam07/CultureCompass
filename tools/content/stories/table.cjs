/* Stories at the table: st-shared-table (longform), st-host (compare), st-chop (guide).
   Researched 12 Nov 2026. Beliefs are labelled as beliefs; where sources disagree (leaving food, serving guests) both views are given.
   Holding the glass lower than an elder's and lifting the rice bowl were left out: no Vietnamese source we could find. */
const today = '2026-11-12';

const sources = [
  { id: 'TCCT-MIENGAN', short: 'Tạp chí Công Thương', title: 'Miếng ăn Hà Nội — Tạp chí Công Thương', org: 'Tạp chí Công Thương (Ministry of Industry and Trade magazine)', url: 'https://tapchicongthuong.vn/mieng-an-ha-noi-5575.htm', type: 'press', checked: today,
    used: 'The old Hà Nội tray: a bowl of dipping sauce in the middle, the rice pot beside it, and the woman “at the head of the pot” (grandmother, mother or eldest daughter-in-law) serving rice so nobody has to get up; soup ladled into your own bowl, never sipped from the shared spoon; “mời mẹ xơi cơm ạ”.',
    limits: 'A short essay (2008) describing a traditional Hà Nội family; many households no longer eat this way.' },
  { id: 'BHT-BUAAN', short: 'Báo Hà Tĩnh', title: 'Văn hóa trong bữa ăn gia đình Việt — Báo Hà Tĩnh', org: 'Báo Hà Tĩnh, by Thái Văn Sinh', url: 'https://baohatinh.vn/van-hoa-trong-bua-an-gia-dinh-viet-post190762.html', type: 'press', checked: today,
    used: 'Best seats for elders and the proverb “ăn trông nồi, ngồi trông hướng”; everyone waits until the oldest picks up their bowl; turning chopsticks round to serve others; uneven chopsticks as bad luck; the polite last piece and its proverb; asking leave at the end of the meal; tea for elders afterwards.',
    limits: 'A provincial newspaper’s essay (2020) on traditional family customs, not a survey of how people eat now.' },
  { id: 'SGN-MAM', short: 'Saigoneer', title: 'The Unifying Presence of Cái Mâm — Saigoneer', org: 'Saigoneer (first published by Urbanist Hanoi), by Trang Six', url: 'https://saigoneer.com/saigon-food-culture/24398', type: 'press', checked: today,
    used: 'Families sitting cross-legged in a circle around the tray, dishes arranged around a central bowl of fish sauce: a vegetable, a protein and a soup; higher and lower trays at village feasts.',
    limits: 'A feature essay (2020, republished).' },
  { id: 'VNE-MAMCOM', short: 'VnExpress', title: 'Mâm cơm quốc dân ngày hè — VnExpress', org: 'VnExpress, by Bùi Thủy', url: 'https://vnexpress.net/mam-com-quoc-dan-ngay-he-4610662.html', type: 'press', checked: today,
    used: 'A typical northern summer meal: boiled pork, crab soup with jute leaves and gourd, fried tofu with shrimp paste, morning glory, salted aubergines and fruit.',
    limits: 'A food feature (2023); menus vary by family and season.' },
  { id: 'PMP-2022', short: 'Postmodernism Problems', title: 'The Fusion Between Culinary and Communication Culture in Traditional Vietnamese Family — Postmodernism Problems 12(2)', org: 'V. Marinescu and Le Thi Kim Dung, Postmodernism Problems (journal)', url: 'https://pmpjournal.org/index.php/pmp/article/view/307', type: 'academic', checked: today,
    used: 'An ethnographic study treating the family tray meal as a mix of food and communication.',
    limits: 'We read the abstract only.' },
  { id: 'VNE-DUACHUNG', short: 'VnExpress', title: 'Nhà tôi ăn riêng bát, riêng đũa — VnExpress', org: 'VnExpress (reader opinion)', url: 'https://vnexpress.net/nha-toi-an-rieng-bat-rieng-dua-4515469.html', type: 'press', checked: today,
    used: 'A reader’s family always keeping shared spoons and chopsticks; the view that taking from shared dishes with your own chopsticks is impolite and unhygienic, and the advice to ask first.',
    limits: 'One reader’s opinion (2022).' },
  { id: 'VNE-DUA10', short: 'VnExpress', title: '10 cấm kỵ khi dùng đũa — VnExpress', org: 'VnExpress, by Bảo Nhiên (adapted from a Chinese-language outlet)', url: 'https://vnexpress.net/10-cam-ky-khi-dung-dua-4868189.html', type: 'press', checked: today,
    used: 'Chopsticks upright in rice recalling a bowl offered to the dead; tapping a bowl suggesting begging; pointing chopsticks at people as rude; digging through shared dishes; dropping chopsticks once seen as very bad luck.',
    limits: 'An article of April 2025 adapted from Chinese sources, so it describes East Asian chopstick customs in general, not only Vietnamese ones.' },
  { id: 'VNE-THUA', short: 'VnExpress', title: 'Để thừa chút đồ ăn: ranh giới giữa lịch sự và lãng phí — VnExpress', org: 'VnExpress (readers’ views), by Thành Lê', url: 'https://vnexpress.net/de-thua-chut-do-an-ranh-gioi-giua-lich-su-va-lang-phi-3973361.html', type: 'press', checked: today,
    used: 'Readers split on leaving a little food; many say finishing everything shows respect for the cook.',
    limits: 'Readers’ comments (2019), not a survey.' },
  { id: 'TP-TRATIEN', short: 'Tiền Phong', title: 'Văn hóa “giành trả tiền” — Tiền Phong', org: 'Tiền Phong (essay), by Phương Thu', url: 'https://tienphong.vn/van-hoa-gianh-tra-tien-post1841740.tpo', type: 'press', checked: today,
    used: 'Friends fighting to pay the bill, people quietly paying for a friend’s table, and young people preferring to each pay their own share.',
    limits: 'An essay (May 2026), so one writer’s observations.' },
  { id: 'VNE-PETERSON', short: 'VnExpress', title: 'Phong tục nhậu — VnExpress', org: 'VnExpress (opinion), by Jesse Peterson', url: 'https://vnexpress.net/phong-tuc-nhau-3700714.html', type: 'press', checked: today,
    used: 'Drinkers shouting “trăm phần trăm” and “dô”; people being pressed to drink, and refusing seen as impolite.',
    limits: 'A foreign resident’s opinion column (2018).' },
  { id: 'VNEI-DRINK', short: 'VnExpress International', title: 'What expats think about Vietnam drinking culture — VnExpress International', org: 'VnExpress International, by Ngoc Ngan', url: 'https://e.vnexpress.net/news/life/trend/alcohol-resolves-rather-than-aggravates-conflicts-what-expats-think-about-vietnam-drinking-culture-4892571.html', type: 'press', checked: today,
    used: 'Nobody drinking alone, and foreign residents feeling pressed to have “just one drink”.',
    limits: 'Interviews with foreign residents (June 2025).' },
  { id: 'VNE-CHENRUOU', short: 'VnExpress', title: 'Mất lòng vì chén rượu — VnExpress', org: 'VnExpress, by Phan Dương', url: 'https://vnexpress.net/mat-long-vi-chen-ruou-4037287.html', type: 'press', checked: today,
    used: 'A new son-in-law rebuked for toasting a clan elder, since only his father-in-law was of equal rank; the cultural researcher Bùi Hoài Sơn on drinking’s roots in community ritual and its excess today.',
    limits: 'A feature built on personal stories (January 2020).' },
  { id: 'TCCT-BIAHOI', short: 'Tạp chí Công Thương', title: 'Bia hơi Hà Nội: “bia cắt tiết” và sự ra đời của keg bia hơi 2 lít — Tạp chí Công Thương', org: 'Tạp chí Công Thương, by Nguyên Vỵ', url: 'https://tapchicongthuong.vn/bia-hoi-ha-noi---bia-cat-tiet--va-su-ra-doi-cua-keg-bia-hoi-2-lit-123238.htm', type: 'press', checked: today,
    used: 'Bia hơi as unpasteurised fresh beer, delivered in 100-litre aluminium tanks in the subsidy era and 50-litre kegs from 2000; “bia cắt tiết”, the first foamy cups from a new keg.',
    limits: 'A trade magazine article (July 2024) that draws on the brewer’s information.' },
  { id: 'TTN-BEER', short: 'Tuổi Trẻ News', title: 'Vietnam ranks eighth globally in beer consumption in 2024 — Tuổi Trẻ News', org: 'Tuổi Trẻ News, by Vinh Tho and Cong Khai', url: 'https://news.tuoitre.vn/vietnam-ranks-eighth-globally-in-beer-consumption-in-2024-103260112154925637.htm', type: 'press', checked: today,
    used: 'Kirin’s estimate of 4.6 billion litres of beer drunk in Vietnam in 2024, eighth in the world.',
    limits: 'A news report (January 2026) of a brewer’s estimate; other sources give lower totals.' },
  { id: 'LAW-ALCOHOL', short: 'Law 44/2019/QH14', title: 'Luật Phòng, chống tác hại của rượu, bia (No. 44/2019/QH14), Điều 5', org: 'National Assembly of Vietnam (text via hethongphapluat.com)', url: 'https://hethongphapluat.com/luat-phong-chong-tac-hai-cua-ruou-bia-2019/dieu-5', type: 'law', checked: today,
    used: 'The ban on inciting, coaxing or forcing others to drink, on drinking under 18, and on driving with any alcohol in the blood or breath. The law took effect on 1 January 2020.',
    limits: 'Read through a legal database, not the official gazette.' },
  { id: 'VOH-117', short: 'VOH', title: 'Từ hôm nay 15/11/2020, ép người khác uống rượu bia bị phạt — VOH', org: 'VOH (Ho Chi Minh City radio), by Lan Hương', url: 'https://voh.com.vn/phap-luat/tu-hom-nay-15-11-2020-ep-nguoi-khac-uong-ruou-bia-ban-ruou-bia-cho-nguoi-duoi-18-tuoi-bi-phat-384576.html', type: 'press', checked: today,
    used: 'Decree 117/2020: fines of 1–3 million đồng for forcing someone to drink, and 500,000–1 million đồng for urging or coaxing them.',
    limits: 'A news summary of the decree (November 2020).' },
  { id: 'VNE-EPRUOU', short: 'VnExpress', title: 'Cấm ép rượu — VnExpress', org: 'VnExpress (column), by Hoàng Anh Tú', url: 'https://vnexpress.net/cam-ep-ruou-4172175.html', type: 'press', checked: today,
    used: 'A health ministry official saying the rule is meant to change behaviour more than to punish; pressure to drink coming mostly from bosses, older relatives and fathers.',
    limits: 'An opinion column (October 2020).' },
  { id: 'CT-168', short: 'Sở Tư pháp Cần Thơ', title: 'Mức phạt nồng độ cồn từ 01/01/2025 — Sở Tư pháp Cần Thơ', org: 'Cần Thơ Department of Justice (official legal-education page)', url: 'https://pbgdpl.cantho.gov.vn/muc-phat-nong-do-con-tu-01012025', type: 'gov', checked: today,
    used: 'Decree 168/2024 fines for driving after drinking: 2–10 million đồng for motorbike riders and 6–40 million đồng for car drivers, rising with the alcohol level, with licence points taken or the licence suspended for up to 24 months.',
    limits: 'An official provincial summary (January 2025), not the decree itself.' },
  { id: 'VNE-APLUC', short: 'VnExpress', title: 'Áp lực rượu bia để xã giao — VnExpress', org: 'VnExpress (translated from CNA), by Ngọc Ngân', url: 'https://vnexpress.net/ap-luc-ruou-bia-de-xa-giao-4870091.html', type: 'press', checked: today,
    used: 'Ways to decline a drink: say plainly you do not drink, give health, religion or driving as the reason, say so in advance, change the subject; and the worry that not joining in can seem unsociable.',
    limits: 'A translated feature (April 2025).' },
  { id: 'DBND-TTDB', short: 'Đại biểu Nhân dân', title: 'Luật Thuế tiêu thụ đặc biệt: điều tiết tiêu dùng với những mặt hàng có hại cho sức khỏe — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Anh Thảo', url: 'https://daibieunhandan.vn/luat-thue-tieu-thu-dac-biet-dieu-tiet-tieu-dung-voi-nhung-mat-hang-co-hai-cho-suc-khoe-10379708.html', type: 'press', checked: today,
    used: 'The 2025 Special Consumption Tax Law raising the tax on beer to 65% in 2026, 70% in 2027 and 90% by 2031.',
    limits: 'A report of the law as passed (July 2025).' }
];

const claims = [
  /* the tray */
  { id: 'C-SHARED-MEAL', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'SGN-MAM'], text: 'Meals are shared: the dishes sit in the middle, often on a round tray, and each person has a small rice bowl and chopsticks.' },
  { id: 'C-MAM-LAYOUT', kind: 'custom', status: 'published', sourceIds: ['SGN-MAM', 'TCCT-MIENGAN'], text: 'On a traditional tray the dishes surround a bowl of fish sauce or dipping sauce in the middle: usually a vegetable, a meat or fish dish and a soup. Families once sat cross-legged on the floor around it.' },
  { id: 'C-MAM-MENU', kind: 'custom', status: 'published', sourceIds: ['VNE-MAMCOM'], text: 'A typical northern summer meal is boiled pork, a crab soup with jute leaves, fried tofu with shrimp paste, boiled morning glory, salted aubergines and fruit.' },
  { id: 'C-MAM-POT', kind: 'custom', status: 'published', sourceIds: ['TCCT-MIENGAN'], text: 'In the old Hà Nội family the rice pot sat beside the tray, and the woman at the head of the pot, usually the grandmother, mother or eldest daughter-in-law, refilled everyone’s bowl so nobody had to get up.' },
  { id: 'C-MAM-SEATS', kind: 'custom', status: 'published', sourceIds: ['BHT-BUAAN', 'SGN-MAM'], text: 'The best places go to the elders (“ăn trông nồi, ngồi trông hướng”: watch the pot as you eat, watch where you sit), and at village feasts higher-ranking guests have a tray of their own.' },
  { id: 'C-MAM-WAIT', kind: 'custom', status: 'published', sourceIds: ['BHT-BUAAN', 'TCCT-MIENGAN'], text: 'Traditionally the younger people invite each elder to eat (“mời mẹ xơi cơm ạ”), others wait until the oldest picks up their bowl, and at the end the younger ones ask leave to stand up and bring the elders tea.' },
  { id: 'C-MAM-SOUP', kind: 'custom', status: 'published', sourceIds: ['TCCT-MIENGAN'], text: 'Soup from the shared bowl is ladled into your own bowl, never sipped from the serving spoon.' },
  { id: 'C-MAM-STUDY', kind: 'custom', status: 'published', sourceIds: ['PMP-2022'], text: 'Researchers describe the family tray meal as a mix of food culture and communication: how a family talks and ranks itself is part of the meal.' },
  { id: 'C-LEFTOVER', kind: 'custom', status: 'published', sourceIds: ['BHT-BUAAN', 'VNE-THUA'], text: 'Views differ on the last piece. The traditional custom is to leave a polite last piece on the shared dish; in a VnExpress discussion many readers said finishing everything is what shows respect for the cook.' },
  /* chopsticks */
  { id: 'C-CHOP-UPRIGHT', kind: 'belief', status: 'published', sourceIds: ['CA-ETQ', 'VOV5-TABLE', 'VNE-DUA10'], text: 'Chopsticks left standing upright in a bowl of rice recall the incense sticks and the bowl of rice offered to the dead, so rest them across the bowl or on the table.' },
  { id: 'C-CHOP-TURN', kind: 'custom', status: 'published', sourceIds: ['BHT-BUAAN', 'VNE-DUACHUNG', 'BQT-GAP'], text: 'To serve someone else, or to take from a shared dish, turn your chopsticks round and use the other end, or use serving chopsticks if there are any. Never serve another person with the end you eat from.' },
  { id: 'C-CHOP-TABOOS', kind: 'custom', status: 'published', sourceIds: ['VNE-DUA10'], text: 'Pointing your chopsticks at people is rude, tapping your bowl with them suggests a beggar, and digging through a shared dish for the best piece is bad manners.' },
  { id: 'C-CHOP-LUCK', kind: 'belief', status: 'published', sourceIds: ['BHT-BUAAN', 'VNE-DUA10'], text: 'Older beliefs count a dropped chopstick, or a pair of uneven chopsticks, as bad luck.' },
  /* drinks */
  { id: 'C-TOAST-DO', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'Drinking is communal: people raise glasses together, often counting “một, hai, ba, dô!”, said “zo” in the North and “yo” in the South, and drink as a group rather than alone.' },
  { id: 'C-TOAST-100', kind: 'custom', status: 'published', sourceIds: ['VNE-PETERSON', 'VNEI-DRINK'], text: '“Trăm phần trăm”, “one hundred per cent”, means empty the glass. Foreign residents describe being pressed to have “just one drink”, and refusing can be taken as impolite.' },
  { id: 'C-TOAST-RANK', kind: 'custom', status: 'published', sourceIds: ['VNE-CHENRUOU'], text: 'Who toasts whom follows rank: in one reported family a new son-in-law was rebuked for raising his glass to a clan elder, since only the elder’s equals should invite him to drink.' },
  { id: 'C-BIAHOI', kind: 'history', status: 'published', sourceIds: ['TCCT-BIAHOI'], text: 'Bia hơi is fresh, unpasteurised beer. In the subsidy era it came in 100-litre aluminium tanks; since 2000 Hà Nội’s brewer has used 50-litre kegs, and the first foamy cups from a new keg are nicknamed “bia cắt tiết”.' },
  { id: 'C-BEER-VOLUME', kind: 'custom', status: 'published', sourceIds: ['TTN-BEER'], text: 'By the brewer Kirin’s estimate, Vietnam drank about 4.6 billion litres of beer in 2024, the eighth-largest total in the world.' },
  { id: 'C-ALC-LAW', kind: 'law', status: 'published', sourceIds: ['LAW-ALCOHOL', 'VOH-117'], text: 'Since 2020 the alcohol law has banned urging or forcing others to drink. Under Decree 117/2020, forcing someone can be fined 1–3 million đồng, and urging or coaxing them 500,000–1 million đồng.' },
  { id: 'C-ALC-PRESSURE', kind: 'custom', status: 'published', sourceIds: ['VNE-EPRUOU', 'VNE-CHENRUOU'], text: 'Pressure to drink comes mostly from bosses, older relatives and fathers; a health official said the ban is meant to change behaviour more than to punish, and a cultural researcher calls today’s drinking excessive.' },
  { id: 'C-ALC-DRIVE', kind: 'law', status: 'published', sourceIds: ['LAW-ALCOHOL', 'CT-168'], text: 'Driving with any alcohol in the blood or breath is banned. Under Decree 168/2024 a motorbike rider can be fined 2–10 million đồng and a car driver 6–40 million đồng, depending on the level, with points taken or the licence suspended for up to 24 months.' },
  { id: 'C-ALC-DECLINE', kind: 'custom', status: 'published', sourceIds: ['VNE-APLUC'], text: 'Ways to decline a drink that a VnExpress feature suggests: say plainly you do not drink, give your health, religion or driving as the reason, say so before the meal, or change the subject.' },
  { id: 'C-BEER-TAX', kind: 'law', status: 'published', sourceIds: ['DBND-TTDB'], text: 'A 2025 tax law raises the special consumption tax on beer to 65% in 2026, then step by step to 90% by 2031.' },
  /* hosting and paying */
  { id: 'C-HOST-SERVE', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'Hosts show hospitality by serving guests, refilling drinks and placing the best pieces of a dish in a guest’s bowl.' },
  { id: 'C-HOST-PROTOCOL', kind: 'custom', status: 'published', sourceIds: ['BQT-GAP'], text: 'A protocol column in the foreign ministry’s newspaper takes a stricter view: never serve others with your own chopsticks, do not press food on guests, and at formal banquets offer in words (“Mời anh lấy thêm…”) rather than putting food in their bowl.' },
  { id: 'C-WHO-PAYS', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'When eating out, the person who gave the invitation usually pays; otherwise the most senior person does.' },
  { id: 'C-PAY-FIGHT', kind: 'custom', status: 'published', sourceIds: ['TP-TRATIEN'], text: 'Friends sometimes fight to pay, or one quietly settles the bill for the table; many young people now prefer each paying their own share.' },
  { id: 'C-TABLE-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: if you are not sure, watch the oldest person at the table, start when they start, and copy how they take from the shared dishes.' },
  { id: 'C-DRINK-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: if you do not drink alcohol, fill your glass with tea or water before the first toast and raise it with everyone. Saying early that you are driving is the easiest refusal of all.' }
];

const glossary = [
  { id: 'mam', vi: 'mâm', say: 'mum', en: 'A round tray that holds the shared dishes of a meal; also the meal around it.' },
  { id: 'moi', vi: 'mời', say: 'muh-ee', en: '“Please, I invite you”: said to elders before eating, and when offering food or a drink.' },
  { id: 'bia-hoi', vi: 'bia hơi', say: 'bee-ah hoy', en: 'Fresh, unpasteurised draught beer, poured from kegs at street corners and sold by the glass.' }
];

const shared = {
  id: 'st-shared-table',
  layout: 'longform',
  title: 'A table of shared dishes',
  dek: 'Rice in your bowl, everything else in the middle. How a Hà Nội family meal is laid out, who sits where, who starts, and what happens when the glasses come out.',
  place: 'Hà Nội homes',
  imageId: 'fd-family-meal',
  hero: { image: 'fd-family-meal' },
  appliesTo: 'Family meals at home in Hà Nội and northern Vietnam, from the national tourism authority’s etiquette guide and Vietnamese press.',
  varies: 'Many families now eat at a table and keep fewer of the old customs; city and village, young and old, do things differently.',
  sections: [
    { text: 'Meals are shared: dishes in the middle, a small rice bowl and chopsticks each.', claimIds: ['C-SHARED-MEAL'] },
    { heading: 'Passing things', text: 'Pass dishes with both hands or the right hand. Hold the soup spoon in the left.', claimIds: ['C-PASS-HANDS', 'C-SPOON-LEFT'] },
    { heading: 'Raising a glass', text: 'People toast together with “dô”, “zo” in the North and “yo” in the South.', claimIds: ['C-TOAST-DO'] },
    { text: 'You can join a toast with any drink.', claimIds: ['N-ANY-DRINK'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'At a Vietnamese family meal nobody has a plate of their own. The food sits in the middle, often on a round [[mam|mâm]], a tray, and everyone has a small bowl of rice and a pair of chopsticks. You take a little from the shared dishes, put it on your rice, eat, and take a little more. The national tourism authority puts it simply: mealtimes are about sharing.', claimIds: ['C-SHARED-MEAL'] },
      { text: 'That one idea shapes everything else: where people sit, who starts, how you reach for food, even how you raise a glass. Researchers who study the family meal describe it as a mix of food and conversation, a daily rehearsal of who is who in the family. You do not need to know every rule to be a good guest. It helps to know what is going on around you.', claimIds: ['C-MAM-STUDY', 'C-TABLE-TIP'] }
    ] },
    { type: 'facts', title: 'At the table', items: [
      { term: 'Yours', text: 'A small rice bowl, chopsticks, maybe a spoon.' },
      { term: 'Shared', text: 'Every other dish, in the middle.' },
      { term: 'Start', text: 'When the oldest person starts.' },
      { term: 'Toast', text: '“Một, hai, ba, dô!”, with any drink.' }
    ], claimIds: ['C-SHARED-MEAL', 'C-MAM-WAIT', 'C-TOAST-DO', 'N-ANY-DRINK'] },

    { type: 'text', heading: 'The tray', id: 'tray', paras: [
      { text: 'A traditional tray is laid out around a small bowl of fish sauce or dipping sauce in the centre. Around it go a vegetable, a dish of meat or fish, and a soup. For generations families sat cross-legged on a mat around the tray; many now eat at a table, but the layout is the same.', claimIds: ['C-MAM-LAYOUT'] },
      { text: 'What goes on it is everyday food. VnExpress described a typical northern summer meal: boiled pork belly, a crab soup cooked with jute leaves and gourd, fried tofu dipped in shrimp paste, boiled morning glory, salted baby aubergines, and fruit to finish. Nothing is served in courses. It all arrives together, and you move between the dishes as you like.', claimIds: ['C-MAM-MENU'] }
    ] },
    { type: 'figure', image: 'fd-family-meal', size: 'wide', caption: 'An everyday meal on an aluminium tray: soup, sweet and sour pork, vegetables and a dipping sauce in the middle.' },

    { type: 'text', heading: 'The person by the rice pot', id: 'pot', paras: [
      { text: 'In an old Hà Nội family, the rice pot sat on the floor beside the tray, and one person sat at the head of it. That was usually the grandmother, the mother or the eldest daughter-in-law, and an essay on Hà Nội food calls her the most important woman in the house. When your bowl was empty she refilled it, so that nobody had to get up during the meal.', claimIds: ['C-MAM-POT'] },
      { text: 'A guest at a family table today will often see the same thing in a smaller form: someone, usually the host, keeps an eye on everyone’s bowl. Hold yours out when it is offered, and say thank you.', claimIds: ['C-MAM-POT', 'C-HOST-SERVE'] }
    ] },

    { type: 'text', heading: 'Who sits where, and who starts', id: 'order', paras: [
      { text: 'Seats follow age. A northern proverb says *ăn trông nồi, ngồi trông hướng*: watch the pot as you eat, watch where you sit. The best places go to the grandparents and parents. At village feasts the most senior guests may have a tray of their own, set a little apart.', claimIds: ['C-MAM-SEATS'] },
      { text: 'Before anyone eats, the younger people invite their elders, one by one: *Con mời bà ăn cơm*, “I invite you to eat, grandmother”. In older Hà Nội speech it was *mời mẹ xơi cơm ạ*, with the polite verb *xơi*. Nobody starts until the oldest person picks up their bowl. At the end, the younger ones ask leave to get up, and bring the elders tea.', claimIds: ['C-MAM-WAIT', 'C-HOME-MOI'] },
      { text: 'This custom is fading. A 2025 VnExpress report found many families have dropped the invitation altogether, as busy households eat together less often. As a guest, a simple [[moi|mời]] to the people around you before you start is always welcome, and never wrong.', claimIds: ['C-HOME-MOI'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-home-meal', caption: 'A home meal in Hà Nội, with rice bowls round the shared dishes.' },
      { image: 'ev-home-table', caption: 'A family table set for a meal.' }
    ] },

    { type: 'text', heading: 'Reaching for food', id: 'reach', paras: [
      { text: 'Pass dishes with both hands or with the right hand, not the left. If there is soup, the spoon goes in your left hand while the chopsticks stay in your right. Soup from the shared bowl is ladled into your own bowl; you never sip from the serving spoon.', claimIds: ['C-PASS-HANDS', 'C-SPOON-LEFT', 'C-MAM-SOUP'] },
      { text: 'Take from the side of the dish nearest you, and do not dig around for the best piece. When you take from a shared dish, or put food in someone else’s bowl, many families turn their chopsticks round and use the other end, or use a pair of serving chopsticks. Our guide to [chopsticks](story:st-chop) has the details.', claimIds: ['C-CHOP-TABOOS', 'C-CHOP-TURN'] }
    ] },

    { type: 'text', heading: 'The last piece', id: 'last', paras: [
      { text: 'Here the sources disagree, and so do Vietnamese families. The traditional custom is to leave one piece on a shared dish, a polite last piece, so that nobody looks greedy. A proverb jokes about it: eat it all and get a beating, leave some and lose a wife.', claimIds: ['C-LEFTOVER'] },
      { text: 'Times have changed. When VnExpress asked readers, many said that leaving food is wasteful, and that clearing your bowl is how you show respect for the cook. The safest course is the one the host sets: if they urge you to take the last piece, take it.', claimIds: ['C-LEFTOVER', 'C-HOME-BOWL'] }
    ] },
    { type: 'quote', text: 'Watch the pot as you eat, watch where you sit.', by: 'Northern proverb, ăn trông nồi, ngồi trông hướng', claimIds: ['C-MAM-SEATS'] },

    { type: 'text', heading: 'Raising a glass', id: 'toast', paras: [
      { text: 'When there are drinks, nobody drinks alone. People raise their glasses together, often counting *một, hai, ba, dô!*, one, two, three, cheers, and drink as a group. *Dô* is said “zo” in the North and “yo” in the South. Someone may call out *trăm phần trăm*, “one hundred per cent”: empty the glass.', claimIds: ['C-TOAST-DO', 'C-TOAST-100'] },
      { text: 'Toasts follow rank too. VnExpress told the story of a new son-in-law scolded for raising his glass to the head of his wife’s clan: only the elder’s equals, like his father-in-law, should have invited him to drink. As a guest you will not be expected to know this; wait to be toasted, and toast back.', claimIds: ['C-TOAST-RANK'] },
      { text: 'You can join any toast with any drink. Whether you drink alcohol is your choice, and the law is on your side: since 2020 it has been illegal to urge or force anyone to drink. Our story on [hosts and guests](story:st-host) covers saying no.', claimIds: ['N-ANY-DRINK', 'C-ALC-LAW'] }
    ] },
    { type: 'phrases', heading: 'Phrases for the table', ids: ['ph-do', 'ph-no', 'ph-camon'] },

    { type: 'text', heading: 'Bia hơi on the corner', id: 'biahoi', paras: [
      { text: 'Outside the home, Hà Nội drinks [[bia-hoi|bia hơi]]: fresh, unpasteurised beer, brewed to be drunk within a day or so and poured at pavement corners into thick glasses. In the subsidy era it arrived in 100-litre aluminium tanks; since 2000 the city’s brewer has delivered it in 50-litre kegs. The first foamy cups from a new keg have a nickname, *bia cắt tiết*.', claimIds: ['C-BIAHOI'] },
      { text: 'It is part of why Vietnam drinks a lot of beer: by one brewer’s estimate about 4.6 billion litres in 2024, the eighth-largest total in the world. From 2026 the tax on beer rises every year, to 90% by 2031.', claimIds: ['C-BEER-VOLUME', 'C-BEER-TAX'] }
    ] },
    { type: 'figure', image: 'fd-biahoi', size: 'bleed', caption: 'A bia hơi corner in the Old Quarter at night.' },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Waiting for the oldest person to start.', claimIds: ['C-MAM-WAIT'] },
      { text: 'Saying “mời” before you eat.', claimIds: ['C-HOME-MOI'] },
      { text: 'Passing dishes with both hands or the right hand.', claimIds: ['C-PASS-HANDS'] },
      { text: 'Joining a toast with whatever is in your glass.', claimIds: ['N-ANY-DRINK'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Digging through a dish for the best piece.', claimIds: ['C-CHOP-TABOOS'] },
      { text: 'Sipping from the shared soup spoon.', claimIds: ['C-MAM-SOUP'] },
      { text: 'Leaving chopsticks upright in your rice.', claimIds: ['C-CHOP-UPRIGHT'] },
      { text: 'Drinking alone while others wait.', claimIds: ['C-TOAST-DO'] }
    ] } },
    { type: 'quiz', image: 'fd-family-meal', question: 'Everyone is seated', prompt: 'The dishes are on the tray and everyone has rice. You are hungry. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Start eating so the food does not go cold', feedback: 'In many families nobody starts until the oldest person picks up their bowl.' },
      { label: 'Wait, say “mời” to the people around you, and start when the oldest does', fit: true, feedback: 'Yes. Inviting others and waiting for the eldest is the traditional order.' },
      { label: 'Serve yourself a large portion of everything first', feedback: 'Take a little at a time from the shared dishes; it is a meal you eat together.' }
    ] }
  ]
};

const host = {
  id: 'st-host',
  layout: 'compare',
  title: 'Why does the host keep filling your bowl?',
  dek: 'Hospitality you can see: a full bowl, a full glass, a bill already paid. What hosts do, what the etiquette books say, and how to say “enough” kindly.',
  place: 'Hà Nội',
  imageId: 'ev-home-meal',
  hero: { image: 'ev-home-meal' },
  appliesTo: 'Meals as a guest at home and in restaurants in Hà Nội, from the national tourism authority, the foreign ministry’s newspaper, Vietnamese press and the law.',
  varies: 'Families, generations and occasions differ: a family dinner is not a business banquet. Laws and fines are as of 2026.',
  sections: [
    { text: 'Serving a guest, topping up drinks and choosing the best pieces for their bowl, is one way hosts show hospitality.', claimIds: ['C-HOST-SERVE'] },
    { heading: 'Saying you have had enough', text: 'To decline more food, politely say that you are very full.', claimIds: ['C-DECLINE-FULL'] },
    { heading: 'When you eat out', text: 'The person who invited usually pays; otherwise it is often the most senior person.', claimIds: ['C-WHO-PAYS'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'You have barely finished a mouthful when a piece of fish lands in your bowl. You eat it; a piece of pork follows. Your glass is never empty for long. For a guest at a Vietnamese table this can feel like a lot, and it is meant to: serving a guest, choosing the best pieces for them and keeping their glass full is how a host shows care.', claimIds: ['C-HOST-SERVE'] },
      { text: 'Not everyone agrees on how far this should go. The national tourism authority describes it as normal hospitality; a protocol column in the foreign ministry’s newspaper advises hosts to hold back. This story compares the two, and explains how to say “enough”, to food, to drink and to the bill, without giving offence.', claimIds: ['C-HOST-SERVE', 'C-HOST-PROTOCOL'] }
    ] },
    { type: 'facts', title: 'In brief', items: [
      { term: 'Food in your bowl', text: 'A sign of care. Eat what you can.' },
      { term: 'To stop', text: 'Say you are very full: *no rồi*.' },
      { term: 'Drinks', text: 'Pressing someone to drink is illegal since 2020.' },
      { term: 'The bill', text: 'Usually paid by whoever invited.' }
    ], claimIds: ['C-HOST-SERVE', 'C-DECLINE-FULL', 'C-ALC-LAW', 'C-WHO-PAYS'] },

    { type: 'text', heading: 'Two views of a full bowl', id: 'views', paras: [
      { text: 'At a family table, the host putting food in your bowl is the custom the tourism authority describes, and the one most visitors meet. It says, more clearly than words, that you are welcome and that the best of the meal is for you.', claimIds: ['C-HOST-SERVE'] },
      { text: 'The foreign ministry’s newspaper, *Thế giới & Việt Nam*, sets out a stricter etiquette. Never serve someone with the chopsticks you eat with: turn them round or use serving chopsticks. Do not press food on a guest. At a formal banquet, offer in words, *mời anh lấy thêm*, “please, have some more”, and let guests serve themselves. A guest who would rather do so can say so, gently: *cứ để tôi tự nhiên*, “let me help myself”.', claimIds: ['C-HOST-PROTOCOL', 'C-CHOP-TURN'] }
    ] },
    { type: 'tabs', heading: 'Home, restaurant, banquet', id: 'compare', intro: 'The same gesture means different things in different settings. Choose a tab to compare. On a phone, each row reads as a card.', label: 'Hosting in three settings', tabs: [
      { label: 'Food', columns: ['', 'Family dinner', 'Formal banquet'], rows: [
        ['Food in your bowl', { match: 'yes', text: 'Common, a sign of care.', claimIds: ['C-HOST-SERVE'] }, { match: 'no', text: 'Avoided; hosts offer in words.', claimIds: ['C-HOST-PROTOCOL'] }],
        ['Pressing guests to eat', { match: 'part', text: 'Happens; say you are full.', claimIds: ['C-DECLINE-FULL'] }, { match: 'no', text: 'Not done.', claimIds: ['C-HOST-PROTOCOL'] }],
        ['Serving chopsticks', { match: 'part', text: 'Many families turn chopsticks round.', claimIds: ['C-CHOP-TURN'] }, { match: 'yes', text: 'Expected.', claimIds: ['C-HOST-PROTOCOL'] }]
      ] },
      { label: 'Drinks', columns: ['', 'Among friends', 'With elders or bosses'], rows: [
        ['Toasting', { match: 'yes', text: 'Together, often: “một, hai, ba, dô!”', claimIds: ['C-TOAST-DO'] }, { match: 'part', text: 'Follows rank; wait to be toasted.', claimIds: ['C-TOAST-RANK'] }],
        ['Pressure to drink', { match: 'part', text: 'Can happen; “just one drink”.', claimIds: ['C-TOAST-100'] }, { match: 'part', text: 'Most often comes from here.', claimIds: ['C-ALC-PRESSURE'] }],
        ['Saying no', { match: 'yes', text: 'Say it early and plainly.', claimIds: ['C-ALC-DECLINE'] }, { match: 'yes', text: 'Driving, health or religion are accepted reasons.', claimIds: ['C-ALC-DECLINE'] }]
      ] },
      { label: 'The bill', columns: ['', 'Older generation', 'Younger friends'], rows: [
        ['Who pays', { text: 'Whoever invited, or the most senior person.', claimIds: ['C-WHO-PAYS'] }, { text: 'Often each pays their own share.', claimIds: ['C-PAY-FIGHT'] }],
        ['At the till', { text: 'Friends may fight to pay, or one settles quietly.', claimIds: ['C-PAY-FIGHT'] }, { text: 'Splitting is normal.', claimIds: ['C-PAY-FIGHT'] }]
      ] }
    ] },

    { type: 'text', heading: 'Saying “enough” to food', id: 'enough', paras: [
      { text: 'The kind way to stop is to say that you are very full, *no rồi*, and to say it more than once. A first refusal can sound like politeness; the second and third are believed. Leave a little in your bowl if you really cannot eat more; an empty bowl may simply be refilled.', claimIds: ['C-DECLINE-FULL', 'C-HOME-BOWL'] },
      { text: 'Praise the food as you go. A host may call the meal simple, just rice and greens; that is modesty, and it is your cue to say how good it is.', claimIds: ['C-HOME-MODEST'] }
    ] },
    { type: 'phrases', heading: 'Phrases', ids: ['ph-no', 'ph-camon', 'ph-do'] },

    { type: 'text', heading: 'Saying “no” to a drink', id: 'drink', paras: [
      { text: 'Drinking together is a big part of hospitality, and pressure is real. A foreign resident writing in VnExpress described tables shouting *trăm phần trăm*, empty your glass, and guests treated as impolite for refusing. Expats interviewed in 2025 said the hardest words to escape were “just one drink”. A cultural researcher traces the custom to village ritual and calls today’s drinking excessive.', claimIds: ['C-TOAST-100', 'C-ALC-PRESSURE'] },
      { text: 'The law has changed the balance. The 2019 alcohol law, in force since 2020, bans urging, coaxing or forcing anyone to drink; under Decree 117/2020, forcing someone can cost 1–3 million đồng. A health ministry official said the point is to change behaviour, not to fine people, and that the pressure comes mostly from bosses, older relatives and fathers.', claimIds: ['C-ALC-LAW', 'C-ALC-PRESSURE'] },
      { text: 'Driving is the strongest reason of all. Vietnam allows no alcohol at all for anyone at the wheel or on a motorbike, and since 2025 the fines have been heavy: 2–10 million đồng for a motorbike rider and 6–40 million đồng for a car driver, with the licence suspended for up to two years at the highest level.', claimIds: ['C-ALC-DRIVE'] }
    ] },
    { type: 'steps', heading: 'Declining a drink, politely', id: 'decline', items: [
      { title: 'Say it early', paras: [ { text: 'Tell your host before the first round that you are not drinking alcohol. It is easier than refusing a glass already poured.', claimIds: ['C-ALC-DECLINE'] } ] },
      { title: 'Give a reason people accept', paras: [ { text: 'Health, religion or “I am driving” are understood. With zero tolerance for drivers, the last one is hard to argue with.', claimIds: ['C-ALC-DECLINE', 'C-ALC-DRIVE'] } ] },
      { title: 'Join the toast anyway', paras: [ { text: 'Fill your glass with tea, water or a soft drink and raise it with everyone. The toast is about being together, not about the drink.', claimIds: ['N-ANY-DRINK', 'C-DRINK-TIP'] } ] },
      { title: 'Change the subject', paras: [ { text: 'If someone insists, smile, thank them and talk about something else.', claimIds: ['C-ALC-DECLINE'] } ] }
    ] },
    { type: 'figure', image: 'fd-biahoi', size: 'wide', caption: 'A bia hơi corner in the Old Quarter.' },

    { type: 'text', heading: 'Who pays', id: 'pay', paras: [
      { text: 'When you eat out, the person who made the invitation usually pays. If nobody clearly invited, the most senior person often does. If you are invited, let your host pay, thank them, and offer to treat them next time.', claimIds: ['C-WHO-PAYS'] },
      { text: 'Among friends paying can turn into a contest, with people racing to the till or one friend quietly settling the bill before the others notice. A 2026 Tiền Phong essay noted that many young people now prefer to split the bill and each pay their own share.', claimIds: ['C-PAY-FIGHT'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Food in your bowl', text: 'Care. Eat what you can.' },
      { term: 'Enough', text: '“No rồi”, said more than once.' },
      { term: 'Not drinking', text: 'Say so early; toast with tea.' },
      { term: 'Driving', text: 'Zero alcohol, heavy fines.' },
      { term: 'The bill', text: 'Whoever invited.' }
    ] },
    { type: 'quiz', image: 'ev-home-meal', question: 'The third refill', prompt: 'Your host has filled your bowl twice and is reaching for the fish again. You cannot eat any more. What do you say?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Nothing; just eat it', feedback: 'Your host will keep going. Saying you are full is the clear, polite signal they are expecting.' },
      { label: '“No rồi, cảm ơn”: I’m full, thank you, and say how good it was', fit: true, feedback: 'Yes. Say it kindly, more than once if needed, and praise the cooking.' },
      { label: 'Put your hand over your bowl without a word', feedback: 'Words are kinder here. A silent block can look like you did not like the food.' }
    ] }
  ]
};

const chop = {
  id: 'st-chop',
  layout: 'guide',
  title: 'Chopsticks and the rice bowl',
  dek: 'Which end to use, where to rest them, and why they should never stand in your rice. A short guide to the two things you hold all through a meal.',
  place: 'Hà Nội',
  imageId: 'fd-buncha-condiments',
  hero: { image: 'fd-buncha-condiments' },
  appliesTo: 'Family meals and restaurants in Hà Nội. Some customs here are shared across East Asia; we say where.',
  varies: 'Families differ, and street stalls are more relaxed than a family table. The luck beliefs are beliefs, held by some people more than others.',
  sections: [
    { text: 'Chopsticks standing upright in rice look like the incense and rice offered to the dead, so they are rested across the bowl or on the table instead.', claimIds: ['C-CHOP-UPRIGHT'] },
    { heading: 'Serving others', text: 'To serve someone, turn your chopsticks round or use serving chopsticks.', claimIds: ['C-CHOP-TURN'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'At a Vietnamese meal you hold two things from start to finish: a small bowl of rice and a pair of chopsticks. The dishes are shared, so the chopsticks do more than carry food to your mouth. They reach into the middle of the table, into other people’s bowls, and they rest beside you when you stop. That is why people notice how you use them.', claimIds: ['C-SHARED-MEAL'] },
      { text: 'Most of what follows is ordinary politeness, the kind any family would teach a child. A few customs come from beliefs about the dead and about luck. Some are shared across East Asia; a widely read VnExpress list of chopstick taboos was adapted from a Chinese source. None of it needs to make you nervous: hosts forgive a visitor almost anything, and watching the people around you is the best guide.', claimIds: ['C-CHOP-TABOOS', 'C-TABLE-TIP'] }
    ] },
    { type: 'facts', title: 'The essentials', items: [
      { term: 'Resting', text: 'Across the bowl or on the table, never standing in the rice.' },
      { term: 'Serving', text: 'Turn them round, or use serving chopsticks.' },
      { term: 'Spoon', text: 'Left hand, for soup.' },
      { term: 'Passing', text: 'Both hands, or the right hand.' }
    ], claimIds: ['C-CHOP-UPRIGHT', 'C-CHOP-TURN', 'C-SPOON-LEFT', 'C-PASS-HANDS'] },

    { type: 'steps', heading: 'Through a meal, step by step', id: 'steps', items: [
      { title: 'Before you start', paras: [
        { text: 'Wait for the oldest person to pick up their bowl. In many northern families the younger people first invite each elder to eat. A quiet *mời* to the people beside you is always welcome.', claimIds: ['C-MAM-WAIT', 'C-HOME-MOI'] }
      ] },
      { title: 'Taking from the shared dishes', paras: [
        { text: 'Take a little at a time, from the side of the dish nearest you, and put it on your rice. Do not dig through the dish for the best piece.', claimIds: ['C-CHOP-TABOOS'] },
        { text: 'Many families keep a pair of serving chopsticks, or turn their own round and use the clean end for the shared dishes. One VnExpress reader wrote that her family always kept shared chopsticks and spoons, and that if you are not sure, you can simply ask.', claimIds: ['C-CHOP-TURN'] }
      ], image: 'fd-family-meal', caption: 'Shared dishes round a bowl of dipping sauce.' },
      { title: 'Serving someone else', paras: [
        { text: 'Hosts often put food in a guest’s bowl, and you may want to do the same for an elder. Never do it with the end you eat from: turn your chopsticks round, or use the serving pair. The foreign ministry’s newspaper says the same.', claimIds: ['C-CHOP-TURN', 'C-HOST-SERVE', 'C-HOST-PROTOCOL'] }
      ] },
      { title: 'Soup', paras: [
        { text: 'Ladle soup from the shared bowl into your own; never sip from the serving spoon. The spoon goes in your left hand, the chopsticks stay in your right.', claimIds: ['C-MAM-SOUP', 'C-SPOON-LEFT'] }
      ] },
      { title: 'Resting your chopsticks', paras: [
        { text: 'When you pause, lay your chopsticks across the top of your bowl or on the table beside it. Never leave them standing upright in the rice: it recalls the incense sticks and the bowl of rice offered to the dead at an altar.', claimIds: ['C-CHOP-UPRIGHT'] }
      ] },
      { title: 'Finishing', paras: [
        { text: 'Lay the chopsticks down neatly. In traditional families the younger people ask leave before getting up, and bring the elders tea.', claimIds: ['C-MAM-WAIT'] }
      ] }
    ] },

    { type: 'text', heading: 'Why not upright?', id: 'upright', paras: [
      { text: 'On a family altar, a bowl of rice is offered to the ancestors and sticks of incense are planted upright in a bowl of sand or rice. Chopsticks standing in a bowl of rice look the same. At a meal for the living, that is a picture nobody wants to see. The Cultural Atlas, the national broadcaster’s foreign service and VnExpress all mention it.', claimIds: ['C-CHOP-UPRIGHT'] },
      { text: 'It is a belief, but a widely shared one, in Vietnam and across East Asia, and it is the one chopstick rule a host is most likely to notice. Our story on [arriving at a Hà Nội home](story:st-arrive-home) says more about the family altar.', claimIds: ['C-CHOP-UPRIGHT', 'C-HOME-ALTAR'] }
    ] },
    { type: 'note', text: 'Some of these customs are shared with China, Korea and Japan. The VnExpress list of chopstick taboos we cite was adapted from a Chinese-language source, so treat it as East Asian etiquette in general.', claimIds: ['C-CHOP-TABOOS'] },

    { type: 'tabs', heading: 'Chopstick habits that read badly', id: 'habits', intro: 'Choose a tab: everyday manners, or the older beliefs about luck.', label: 'Chopstick habits', tabs: [
      { label: 'Manners', columns: ['Habit', 'How it can read'], rows: [
        ['Pointing your chopsticks at someone', { text: 'Rude and disrespectful, as with pointing a finger.', claimIds: ['C-CHOP-TABOOS'] }],
        ['Tapping your bowl with them', { text: 'Suggests a beggar asking for food.', claimIds: ['C-CHOP-TABOOS'] }],
        ['Digging for the best piece', { text: 'Greedy, and unfair to everyone else.', claimIds: ['C-CHOP-TABOOS'] }],
        ['Serving with the end you eat from', { text: 'Unhygienic; use the other end.', claimIds: ['C-CHOP-TURN'] }]
      ] },
      { label: 'Beliefs', columns: ['Habit', 'The belief'], rows: [
        ['Standing them upright in rice', { text: 'Recalls incense and the rice offered to the dead.', claimIds: ['C-CHOP-UPRIGHT'] }],
        ['Dropping a chopstick', { text: 'Once counted as very bad luck.', claimIds: ['C-CHOP-LUCK'] }],
        ['Using an uneven pair', { text: 'Thought unlucky in older families.', claimIds: ['C-CHOP-LUCK'] }]
      ] }
    ] },

    { type: 'text', heading: 'Hands, bowls and passing', id: 'hands', paras: [
      { text: 'When you pass a dish, a bowl or anything else across the table, use both hands or your right hand, not the left. Handing something to an elder with both hands is a small, clear sign of respect.', claimIds: ['C-PASS-HANDS'] },
      { text: 'When someone at the head of the rice pot offers to refill your bowl, hold it out with both hands and say thank you. In old Hà Nội families that person, usually the grandmother or mother, made sure nobody had to get up during the meal.', claimIds: ['C-MAM-POT', 'C-PASS-HANDS'] }
    ] },
    { type: 'figure', image: 'fd-buncha-top', size: 'wide', caption: 'Chopsticks resting across the bowls at a bún chả meal.' },

    { type: 'text', heading: 'At a street stall', id: 'stall', paras: [
      { text: 'At a [street-food stall](story:st-street-stall) things are simpler. Chopsticks wait in a holder on the table, and wiping them with a paper napkin before you eat is normal. You will rarely share dishes with strangers, so serving etiquette mostly does not apply. The rule about standing chopsticks in your bowl still does.', claimIds: ['C-FOOD-WIPE', 'C-CHOP-UPRIGHT'] }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually right', items: [
      { text: 'Resting chopsticks across the bowl or on the table.', claimIds: ['C-CHOP-UPRIGHT'] },
      { text: 'Turning them round to serve others.', claimIds: ['C-CHOP-TURN'] },
      { text: 'Spoon in the left hand for soup.', claimIds: ['C-SPOON-LEFT'] },
      { text: 'Passing with both hands or the right hand.', claimIds: ['C-PASS-HANDS'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Chopsticks standing upright in rice.', claimIds: ['C-CHOP-UPRIGHT'] },
      { text: 'Pointing with them, or tapping the bowl.', claimIds: ['C-CHOP-TABOOS'] },
      { text: 'Searching a shared dish for the best piece.', claimIds: ['C-CHOP-TABOOS'] },
      { text: 'Sipping from the shared soup spoon.', claimIds: ['C-MAM-SOUP'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Rest', text: 'Across the bowl, never upright.' },
      { term: 'Serve', text: 'Other end, or serving pair.' },
      { term: 'Soup', text: 'Into your own bowl; spoon in the left hand.' },
      { term: 'Pass', text: 'Both hands or the right.' }
    ] },
    { type: 'quiz', image: 'fd-buncha-condiments', question: 'A pause in the meal', prompt: 'You want to put your chopsticks down for a moment to talk. Where do they go?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Stuck upright in the rice, so they stay clean', feedback: 'That is the one to avoid: it recalls the incense and rice offered to the dead.' },
      { label: 'Across the top of your bowl, or on the table beside it', fit: true, feedback: 'Yes. Either is fine.' },
      { label: 'Pointing towards the person you are talking to', feedback: 'Pointing chopsticks at people reads as rude.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [shared, host, chop] };
