/* Story: arriving at a family home (st-arrive-home). Layout: guide.
   Researched 12 Nov 2026. Most sources describe Vietnam generally; Hà Nội-specific points are marked. Gift taboos are beliefs. */
const today = '2026-11-12';

const sources = [
  { id: 'VNAT-LIKE', short: 'Vietnam National Authority of Tourism', title: 'What are the Vietnamese like? — vietnam.travel', org: 'Vietnam National Authority of Tourism (official site)', url: 'https://vietnam.travel/things-to-do/what-are-vietnamese-like/', type: 'official', checked: today,
    used: 'Lễ phép, politeness to elders; being asked your age at a first meeting; most homes having an ancestral altar; meals beginning when the oldest person takes the first bite; guests invited to stay for a meal and served by the host.',
    limits: 'A general visitor page (2019) about Vietnam as a whole.' },
  { id: 'CA-ETQ', short: 'The Cultural Atlas', title: 'Vietnamese culture: Etiquette — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica), Cultural Atlas Editors', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-etiquette', type: 'reference', checked: today,
    used: 'Passing and receiving with both hands; givers playing down a gift and hosts playing down a meal; complimenting the food; gifts thought to be bad omens; not standing chopsticks upright in rice; thanking sincerely rather than by reflex.',
    limits: 'A general guide (2016) for Vietnam as a whole; it notes regional differences in places.' },
  { id: 'VNEI-GREET', short: 'VnExpress International', title: 'How to meet and greet in Vietnamese — VnExpress International', org: 'VnExpress International, by Pham Van and Kim Thuy', url: 'https://e.vnexpress.net/news/life/how-to-meet-and-greet-in-vietnamese-3447085.html', type: 'press', checked: today,
    used: 'Greeting with chào and a family word: cháu chào bác, cô, chú, ông or bà; adding ạ to show respect to elders; respect for elders as deeply rooted.',
    limits: 'A short guide of August 2016. It says xin chào is rarely used in real conversation, where other guides treat it as standard.' },
  { id: 'ZN-NEP', short: 'Znews', title: 'Nếp nhà Hà Nội — Znews (from “Chuyện người Hà Nội”)', org: 'Znews, book excerpt by Vũ Thế Long (NXB Hà Nội and Tri thức Trẻ Books)', url: 'https://znews.vn/nep-nha-ha-noi-post1294450.html', type: 'press', checked: today,
    used: 'In older Hà Nội families, friends who visited folded their arms to greet the parents and older siblings, and rude forms of address were strictly forbidden; the author describes these habits as fading.',
    limits: 'A memoir of older Hà Nội family custom (published 2022), not a description of homes today.' },
  { id: 'VNN-MEAL', short: 'VietNamNet', title: 'Eating and etiquette: Top tips for joining a VN family meal — VietNamNet', org: 'VietNamNet (from Việt Nam News), by Eloise Levesque', url: 'https://vietnamnet.vn/en/eating-and-etiquette-top-tips-for-joining-a-vn-family-meal-E85341.html', type: 'press', checked: today,
    used: 'Not arriving empty-handed; fruit as the most popular gift, or something from your own country; hosts putting food in a guest’s bowl; leaving the last piece unless urged; being sent home with fruit.',
    limits: 'A foreign contributor’s first-hand account (October 2013).' },
  { id: 'VNN-GIFT', short: 'VietNamNet', title: 'Những món quà “kiêng” tặng ngày tết — VietNamNet', org: 'VietNamNet (credited to VietQ)', url: 'https://vietnamnet.vn/nhung-mon-qua-kieng-tang-ngay-tet-106684.html', type: 'press', checked: today,
    used: 'Folk beliefs about gifts to avoid at Tết: knives and scissors, clocks, dark wrapping, and others, some of them regional.',
    limits: 'A Tết feature of January 2013 describing beliefs, not rules.' },
  { id: 'SGGP-TRA', short: 'Sài Gòn Giải Phóng', title: 'Vị thế của trà — Sài Gòn Giải Phóng', org: 'Sài Gòn Giải Phóng (newspaper), by Nguyễn Ngọc Tuấn', url: 'https://www.sggp.org.vn/vi-the-cua-tra-post583416.html', type: 'press', checked: today,
    used: 'Hosts brewing a fresh pot when guests arrive; the saying that a cup of tea starts the conversation; not offering tea seen as impolite.',
    limits: 'An essay of February 2021 on tea across Vietnam, not only Hà Nội.' },
  { id: 'VNP-ALTAR', short: 'VietnamPlus', title: 'Ý nghĩa thiêng liêng của bàn thờ gia tiên trong gia đình người Việt — VietnamPlus', org: 'VietnamPlus (Vietnam News Agency)', url: 'https://www.vietnamplus.vn/y-nghia-thieng-lieng-cua-ban-tho-gia-tien-trong-gia-dinh-nguoi-viet-post868894.vnp', type: 'press', checked: today,
    used: 'The ancestral altar as the most sacred place in the home, at its centre and highest point; the flowers offered on it at Tết, chrysanthemums among them.',
    limits: 'A Tết feature of January 2023.' },
  { id: 'DT-ALTAR', short: 'Dân trí', title: 'Bàn thờ tổ tiên – đôi điều nhân nghĩa — Dân trí', org: 'Dân trí (forum section)', url: 'https://dantri.com.vn/dien-dan/ban-tho-to-tien-doi-dieu-nhan-nghia-20210213080519428.htm', type: 'press', checked: today,
    used: 'Altars in the middle of traditional houses and often on the top floor today; the old custom of placing a visitor’s gift on the altar, now largely gone; northern and southern customs differing.',
    limits: 'An opinion piece of February 2021.' },
  { id: 'VNN-ANC', short: 'VietNamNet', title: 'Ancestor worship reminds people of their roots — VietNamNet', org: 'VietNamNet (credited to Vietnam News Agency)', url: 'https://vietnamnet.vn/en/ancestor-worship-reminds-people-of-their-roots-611876.html', type: 'press', checked: today,
    used: 'Altars in homes rich and poor, in a prominent place, with tablets and photographs, an incense bowl and candles.',
    limits: 'A feature of January 2020.' },
  { id: 'VNE-MOI', short: 'VnExpress', title: 'Văn hóa “mời cơm” đang biến mất? — VnExpress', org: 'VnExpress, by Phạm Nga', url: 'https://vnexpress.net/van-hoa-moi-com-dang-bien-mat-4920376.html', type: 'press', checked: today,
    used: 'The northern custom of younger family members inviting their elders, in order, to eat before picking up their chopsticks; its fading as families share fewer meals; a 2021 Nielsen figure of about 45% of families eating dinner together five times a week or more.',
    limits: 'A feature of August 2025. The invitation it describes is between family members, not from host to guest.' },
  { id: 'BQT-GAP', short: 'Báo Thế giới & Việt Nam', title: 'Nên hay không gắp đồ ăn cho người khác? — Báo Thế giới & Việt Nam', org: 'Báo Thế giới & Việt Nam (newspaper of the Ministry of Foreign Affairs), protocol column', url: 'https://baoquocte.vn/nen-hay-khong-gap-do-an-cho-nguoi-khac-106844.html', type: 'press', checked: today,
    used: 'Hosts placing food in guests’ bowls as affection; the column’s advice that with less familiar guests, especially foreigners, hosts should invite in words only and not press food on them; a guest’s polite reply, let me help myself.',
    limits: 'A protocol column of December 2019 arguing for a modern view.' },
  { id: 'VNE-ANCOM', short: 'VnExpress', title: '“Ăn cơm chưa, đi đâu đấy?” — VnExpress', org: 'VnExpress (opinion), by Đinh Võ Kiều Oanh', url: 'https://vnexpress.net/an-com-chua-di-dau-day-4833971.html', type: 'press', checked: today,
    used: '“Have you eaten yet?” as a greeting and often an invitation to stay and eat; the proverb that a greeting is worth more than a feast.',
    limits: 'An opinion piece of January 2025.' },
  { id: 'GSO-2019', short: 'General Statistics Office', title: 'Press release: preliminary results of the 2019 Population and Housing Census', org: 'General Statistics Office of Vietnam (nso.gov.vn)', url: 'https://www.nso.gov.vn/?p=9040', type: 'official', checked: today,
    used: 'An average of 3.5 people per household nationally, 3.3 in cities and in the Red River Delta, the region that includes Hà Nội.',
    limits: 'Preliminary figures (2019); no figure for Hà Nội alone and no data on generations.' },
  { id: 'VNN-ELD', short: 'VietNamNet', title: 'The generation of elderly who do not live with their children — VietNamNet', org: 'VietNamNet, by Nguyen Thao', url: 'https://vietnamnet.vn/en/the-generation-of-elderly-who-do-not-live-with-their-children-771541.html', type: 'press', checked: today,
    used: 'Two studies that disagree: one finding the share of older people living with their children fell from about 80% in 1992–93 to 28% in 2017 in two provinces, another national survey finding more than 60% still do.',
    limits: 'A feature of February 2022 that does not reconcile the two figures.' },
  { id: 'BVH-EQ', short: 'Báo Văn Hóa', title: '4 câu người EQ cao không bao giờ nói khi đến thăm nhà người khác — Báo Văn Hóa', org: 'Báo Văn Hóa, by Tathiên An', url: 'https://baovanhoa.vn/gia-dinh/4-cau-nguoi-eq-cao-khong-bao-gio-noi-khi-den-tham-nha-nguoi-khac-189736.html', type: 'press', checked: today,
    used: 'Choosing a natural pause to leave and thanking the host sincerely for their hospitality; not looking at the clock or saying you are tired.',
    limits: 'A general lifestyle piece (December 2025).' }
];

const claims = [
  { id: 'C-HOME-GREET', kind: 'custom', status: 'published', sourceIds: ['CA-GREET', 'VNEI-GREET', 'VNAT-LIKE'], text: 'People are greeted in order of age, oldest first, standing and with a slight bow from the shoulders; if an older person does not offer a hand, a bow or nod is enough. Visitors greet older people with a family word, for example “Cháu chào bác” to someone older than their parents, and adding “ạ” shows respect. Being asked your age is normal: it tells people which word to use.' },
  { id: 'C-HOME-ARMS', kind: 'custom', status: 'published', sourceIds: ['ZN-NEP'], text: 'In older Hà Nội families, children’s friends who visited were expected to fold their arms when greeting the parents and older siblings; the writer who records this describes such habits as fading.' },
  { id: 'C-HOME-GIFT', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'VNN-MEAL', 'CA-ETQ'], text: 'Visitors are expected not to arrive empty-handed: fruit, biscuits or cake, flowers or soft drinks are usual, and a specialty from your own country is welcome. The giver plays the gift down as “a small gift”, and the host may not open it straight away.' },
  { id: 'C-HOME-UNLUCKY', kind: 'belief', status: 'published', sourceIds: ['CA-ETQ', 'VNAT-ETQ', 'VNN-GIFT', 'VNP-ALTAR'], text: 'Some gifts are thought to be bad omens: guides list anything black, handkerchiefs and yellow flowers, and at Tết folk belief warns against knives, scissors and clocks. Chrysanthemums appear on such lists too, though they are also offered on family altars at Tết.' },
  { id: 'C-HOME-HANDS', kind: 'custom', status: 'published', sourceIds: ['CA-ETQ', 'VNAT-ETQ'], text: 'Things are given and received with both hands; dishes at the table are passed with both hands or the right hand.' },
  { id: 'C-HOME-TEA', kind: 'custom', status: 'published', sourceIds: ['SGGP-TRA'], text: 'Hosts often brew a fresh pot of tea when guests arrive; a saying has it that a cup of tea opens the conversation, and not offering tea can seem impolite.' },
  { id: 'C-HOME-ALTAR', kind: 'custom', status: 'published', sourceIds: ['VNAT-LIKE', 'VNN-ANC', 'VNP-ALTAR', 'DT-ALTAR'], text: 'Most Vietnamese homes have an ancestral altar, the most sacred place in the house, with photographs or tablets, an incense bowl and candles. Traditionally it stands at the centre and highest point of the house; in tall city houses it is often on the top floor.' },
  { id: 'C-HOME-ALTAR-GUEST', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'DT-ALTAR'], text: 'Guests should not step over altars placed on the floor, walk directly in front of them or put things in front of them. In the past a visitor’s gift was set on the family altar for the ancestors to see; the custom has largely faded.' },
  { id: 'C-HOME-MOI', kind: 'custom', status: 'published', sourceIds: ['VNE-MOI', 'VNAT-LIKE'], text: 'In many northern families, younger members invite their elders to eat, in order, before picking up their chopsticks (“Con mời bố mẹ ăn cơm”), and the meal begins when the oldest person starts. The custom is fading as families eat together less: a 2021 survey found about 45% of families had dinner together five or more times a week.' },
  { id: 'C-HOME-BOWL', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'VNN-MEAL', 'BQT-GAP'], text: 'Hosts often put food in a guest’s bowl; to decline, guests repeat politely that they are full, and leave the last piece unless urged. A protocol column in the foreign ministry’s newspaper advises hosts to invite in words only with less familiar guests and not to press food on them.' },
  { id: 'C-HOME-MODEST', kind: 'custom', status: 'published', sourceIds: ['CA-ETQ'], text: 'Hosts may play down their cooking as a simple meal of rice and greens; guests are expected to compliment the food. Chopsticks should never be left standing upright in rice, which recalls incense for the dead.' },
  { id: 'C-HOME-ANCOM', kind: 'custom', status: 'published', sourceIds: ['VNE-ANCOM'], text: '“Ăn cơm chưa?”, “Have you eaten yet?”, works as a greeting, and when you arrive near a mealtime it is often an invitation to stay.' },
  { id: 'C-HOME-HOUSEHOLD', kind: 'history', status: 'published', sourceIds: ['GSO-2019', 'VNN-ELD'], text: 'The 2019 census counted 3.5 people per household nationally and 3.3 in the Red River Delta around Hà Nội. Studies disagree on how many older people still live with their children: one found the share fell to 28% by 2017 in two provinces, while a national survey put it above 60%.' },
  { id: 'C-HOME-LEAVE', kind: 'custom', status: 'published', sourceIds: ['BVH-EQ', 'CA-ETQ'], text: 'Guests leave at a natural pause in the conversation and thank the host for their hospitality, without glancing at the clock or saying they are tired; thanks mean more when they are sincere than when automatic.' },
  { id: 'C-HOME-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: follow your host. Watch where shoes go, who sits where and when people start eating, and ask if you are unsure.' }
];

const story = {
  id: 'st-arrive-home',
  layout: 'guide',
  title: 'Arriving at a family home',
  dek: 'Shoes at the door, the eldest first, a pot of tea and a host who keeps filling your bowl: how a visit to a Hà Nội home usually goes.',
  place: 'A family home, Hà Nội',
  imageId: 'ev-home-table',
  hero: { image: 'ev-home-table' },
  appliesTo: 'Visiting a family at home in Hà Nội and northern Vietnam. Most of what follows holds across the country.',
  varies: 'Families differ, and so do generations and regions. Follow how your host introduces themself and what they do; gift taboos are beliefs, not rules.',
  sections: [
    { text: 'Shoes are usually taken off at the door of a home.', claimIds: ['C-SHOES-HOME'] },
    { heading: 'Who to greet first', text: 'Greet the oldest people first, and smile at everyone.', claimIds: ['C-ELDEST'] },
    { heading: 'Being looked after', text: 'Hosts serve their guests, refill their drinks and put the best pieces in their bowl.', claimIds: ['C-HOST-SERVE'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Being invited home is a step up from being taken to a restaurant. In Hà Nội, where families often share narrow tube houses or high-rise flats, the invitation means being let into the place where the generations meet and the ancestors are remembered. What follows is how a visit usually goes, step by step.', claimIds: ['C-HOME-ALTAR', 'C-HOME-TIP'] },
      { text: 'None of it is a test. Hosts expect a foreign guest to get things slightly wrong, and the easiest rule is to watch them: where the shoes go, who sits where, who starts eating. When you are not sure, ask.', claimIds: ['C-HOME-TIP', 'N-ASK'] }
    ] },

    { type: 'steps', heading: 'A visit, step by step', id: 'steps', items: [
      { title: 'Bring something', paras: [
        { text: 'Don’t arrive empty-handed. Fruit is the usual gift; biscuits or a cake, flowers or soft drinks work too, and something from your own country is a good talking point. Hand it over with both hands and play it down: it is just a small thing. Your host may put it aside without opening it, and may well send you home with fruit of their own.', claimIds: ['C-HOME-GIFT', 'C-HOME-HANDS'] }
      ] },
      { title: 'Shoes off at the door', paras: [
        { text: 'Take your shoes off just outside the door, next to the family’s own.', claimIds: ['C-SHOES-HOME'] }
      ] },
      { title: 'Greet the eldest first', paras: [
        { text: 'Greet people in order of age, starting with the grandparents. Stand, nod or bow slightly from the shoulders, and let an older person offer a hand first. Use a family word: *Cháu chào bác* to someone older than your parents, *cô* or *chú* to someone younger than them, *ông* or *bà* to a grandparent. Adding *ạ* at the end sounds respectful. Don’t be surprised if someone asks how old you are; it is how they work out what to call you.', claimIds: ['C-HOME-GREET', 'C-ELDEST'] },
        { text: 'Older Hà Nội families once expected visiting children to fold their arms when they greeted the parents. You will rarely see it now, but it shows how much the greeting matters.', claimIds: ['C-HOME-ARMS'] }
      ], phraseIds: ['ph-xinchao-co'] },
      { title: 'Tea first', paras: [
        { text: 'Before anything else, there is usually tea. The host brews a fresh pot and pours small cups; a saying has it that a cup of tea opens the conversation. Take the cup with both hands, sip, and let the talk begin. You may be asked whether you have eaten, *ăn cơm chưa?*, which is a greeting and, near a mealtime, often an invitation to stay.', claimIds: ['C-HOME-TEA', 'C-HOME-ANCOM', 'C-HOME-HANDS'] }
      ], image: 'ev-home-tea', caption: 'A teapot and cups set out for guests.' },
      { title: 'At the table', paras: [
        { text: 'Wait to be shown where to sit, and wait to start. In many northern families the younger members invite each elder to eat in turn, and nobody begins until the oldest person does. Your host will probably put food in your bowl, again and again. Eat what you can; to stop, say you are full, kindly and more than once, and leave the last piece on a shared dish unless you are urged to take it.', claimIds: ['C-HOME-MOI', 'C-HOME-BOWL', 'C-HOST-SERVE'] },
        { text: 'Your host may call it a simple meal of rice and greens. Say how good it is. And never leave your chopsticks standing upright in the rice: it recalls the incense sticks offered to the dead.', claimIds: ['C-HOME-MODEST'] }
      ], image: 'ev-home-meal', caption: 'A family meal: fish, greens, vegetables and small bowls of dipping sauce.', phraseIds: ['ph-no'] },
      { title: 'Leaving', paras: [
        { text: 'There is no set ritual for leaving. Wait for a natural pause, thank your hosts for looking after you, and say goodbye to the elders as you greeted them. Avoid glancing at the clock or saying you are tired. One warm thank-you means more than many automatic ones.', claimIds: ['C-HOME-LEAVE'] }
      ], phraseIds: ['ph-camon'] }
    ] },

    { type: 'text', heading: 'The altar', id: 'altar', paras: [
      { text: 'Somewhere in the house there will be an ancestral altar: photographs or name tablets of the family’s dead, an incense bowl, candles, fruit and flowers. Families rich and poor keep one, and it is the most sacred place in the home. In a traditional house it stands in the centre and at the highest point; in the tall, narrow houses of Hà Nội it is often on the top floor.', claimIds: ['C-HOME-ALTAR'] },
      { text: 'As a guest, give it room. Don’t step over an altar on the floor, walk straight in front of it or put your things down before it. People once placed a visitor’s gift on the altar so the ancestors could see it; that custom has mostly faded, but if your host does it, it is a compliment.', claimIds: ['C-HOME-ALTAR-GUEST'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-home-altar', caption: 'A family altar with photographs, flowers and fruit.' },
      { image: 'ev-home-flat-altar', caption: 'An altar in a high-rise flat.' }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Fruit, cake or flowers, handed over with both hands.', claimIds: ['C-HOME-GIFT', 'C-HOME-HANDS'] },
      { text: 'Shoes off at the door.', claimIds: ['C-SHOES-HOME'] },
      { text: 'Greeting the eldest first, with a family word.', claimIds: ['C-HOME-GREET'] },
      { text: 'Praising the food, and saying you are full when you are.', claimIds: ['C-HOME-MODEST', 'C-HOME-BOWL'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Gifts wrapped in black, handkerchiefs, or knives and clocks at Tết. Some families see them as bad omens.', claimIds: ['C-HOME-UNLUCKY'] },
      { text: 'Starting to eat before the oldest person.', claimIds: ['C-HOME-MOI'] },
      { text: 'Chopsticks left standing in rice.', claimIds: ['C-HOME-MODEST'] },
      { text: 'Stepping over or in front of a floor altar.', claimIds: ['C-HOME-ALTAR-GUEST'] }
    ] } },
    { type: 'note', text: 'Gift taboos are beliefs, and families differ. Chrysanthemums are on some guides’ list of unlucky flowers, yet families also offer them on their own altars at Tết.', claimIds: ['C-HOME-UNLUCKY'] },

    { type: 'text', heading: 'Who you might meet', id: 'family', paras: [
      { text: 'The picture of three generations under one roof is only partly true now. The 2019 census counted 3.5 people per household across Vietnam and 3.3 in the Red River Delta around Hà Nội. Researchers disagree on how many older people still live with their children: one study found the share fell to 28% by 2017 in two provinces, another national survey put it above 60%. Expect anything from a couple in a flat to grandparents, parents and children in one house.', claimIds: ['C-HOME-HOUSEHOLD'] }
    ] },
    { type: 'figure', image: 'ev-home-table', caption: 'A family table laid for a meal beside the altar cabinet.' },

    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Gift', text: 'Fruit or cake, given with both hands.' },
      { term: 'Door', text: 'Shoes off outside.' },
      { term: 'Cháu chào bác ạ', vi: true, text: 'Hello, to someone older than your parents.' },
      { term: 'Table', text: 'Wait for the eldest to start; say you are full, kindly, when you are.' },
      { term: 'Altar', text: 'Give it room.' }
    ] },
    { type: 'quiz', image: 'ev-home-meal', question: 'Your bowl keeps filling up', prompt: 'You are full, but your host has just put another piece of fish in your bowl. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Eat it quietly, then keep eating whatever comes', feedback: 'Your host will keep going. It is fine to stop.' },
      { label: 'Thank them and say, more than once, that you are full', fit: true, feedback: 'Repeating kindly that you are full is the usual way to stop. *Tôi no rồi, cảm ơn.*' },
      { label: 'Put the piece back on the shared plate', feedback: 'Leave it in your bowl and say you are full instead.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
