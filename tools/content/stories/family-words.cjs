/* Story: why use family words with strangers? (st-family-words). Layout: compare.
   Researched 12 Nov 2026. Northern (Hà Nội) usage first; regional differences only where a source states them. */
const today = '2026-11-12';

const sources = [
  { id: 'CA-NAMING', short: 'The Cultural Atlas', title: 'Vietnamese culture: Naming — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica), by Nina Evason', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-naming', type: 'reference', checked: today,
    used: 'Kinship titles used for non-relatives, chosen by age, gender, status and region; anh, chị, chú, cô, bác, ông, bà and em by relative age; cháu for a much younger person in the North and con in the Centre and South; bạn mainly among young people of the same age; the title placed before the given name.',
    limits: 'A general guide (2025) for Vietnam as a whole.' },
  { id: 'NQ-2018', short: 'Nguyễn Quang 2018', title: 'Chủ quan tính và khách quan tính trong hệ thống xưng hô Việt và Anh — VNU Journal of Foreign Studies 34(1): 16–34', org: 'VNU Journal of Foreign Studies (University of Languages and International Studies, Hà Nội), Nguyễn Quang', url: 'https://js.vnu.edu.vn/FS/article/view/4222/3933', type: 'academic', checked: today,
    used: 'Speakers classifying themselves and others by kinship, position and age; the northern pairing cháu–bác or cháu–chú, used in both directions; respect when both halves of a pair are used and intimacy when one is dropped; a 1992 survey in which 428 of 562 responses used kinship terms; northern speakers using chú and cô rather than dì or cậu for strangers of their parents’ age; tôi as formal and distant, and once meaning a king’s subject.',
    limits: 'An academic paper (2018) whose author calls his findings preliminary remarks, not stereotypes.' },
  { id: 'TON-2017', short: 'Ton 2017', title: 'Vietnamese terms of address: Pragmatic connotations, translation and ESL/EFL pedagogy — PhD thesis, University of New England', org: 'University of New England (Australia), Ton Nu Linh Thoai', url: 'https://hdl.handle.net/1959.11/22577', type: 'academic', checked: today,
    used: 'Address terms whose feeling depends on context; tôi as the only fairly neutral pronoun, formal in everyday use; tớ–cậu as a casual northern pair; learners over-using tôi and bạn, which sounds unnatural between middle-aged neighbours; a study of 500 market conversations in four cities in which 80% of questions used kinship forms.',
    limits: 'A doctoral thesis (2017) written partly from a Central and Southern perspective.' },
  { id: 'MSU-BASIC', short: 'Basic Vietnamese (MSU)', title: 'Basic Vietnamese, Unit 1 and Unit 6 culture notes — Michigan State University open textbook', org: 'Michigan State University Libraries, by Tung Hoang', url: 'https://openbooks.lib.msu.edu/vietnamese/chapter/u6-culture-notes/', type: 'reference', checked: today,
    used: 'Family terms and what they cover: bác for a parent’s older sibling, chú for a father’s younger brother, cô for a father’s younger sister, cậu for a mother’s younger brother, dì for a mother’s younger sister; the note that rules differ by region.',
    limits: 'An open textbook (2023, CC BY-NC 4.0) for beginners.' },
  { id: 'BPL-VUNGMIEN', short: 'Báo Pháp luật Việt Nam', title: 'Thú vị sự khác biệt của gia đình Việt các vùng miền — Báo Pháp luật Việt Nam', org: 'Báo Pháp luật Việt Nam, by Ngọc Mai', url: 'https://baophapluat.vn/thu-vi-su-khac-biet-cua-gia-dinh-viet-cac-vung-mien-post221458.html', type: 'press', checked: today,
    used: 'Northern bố and mẹ against southern ba and má; the eldest brother called anh cả in the North and anh hai in the South, where anh hai in the North is the second brother.',
    limits: 'A light feature (July 2016).' },
  { id: 'VOH-XUNGHO', short: 'VOH', title: 'Sơ đồ cách xưng hô trong họ hàng — VOH', org: 'Voice of Hồ Chí Minh City (VOH), by Hồng Phượng', url: 'https://voh.com.vn/thuong-thuc/so-do-cach-xung-ho-trong-ho-hang-575769.html', type: 'press', checked: today,
    used: 'Great-grandparents called cụ in the North and cố in the South; folding your arms and nodding when unsure how to address an older person.',
    limits: 'A practical explainer (January 2025).' }
];

const claims = [
  { id: 'C-ADDR-FAMILY', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'CA-NAMING'], text: 'People are usually addressed with family terms that reflect age and relationship, even when they are strangers: younger people like younger siblings, older people like older siblings, aunts, uncles or grandparents.' },
  { id: 'C-ADDR-TERMS', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'VNA-NAMES', 'CA-NAMING'], text: 'Common terms: anh (a man somewhat older than you), chị (a woman somewhat older), em (anyone younger), chú and cô (a man or woman a little younger than your parents), bác (someone a little older than your parents), ông and bà (people of your grandparents’ age).' },
  { id: 'C-ADDR-NAME', kind: 'custom', status: 'published', sourceIds: ['CA-GREET', 'VNA-NAMES', 'CA-NAMING'], text: 'People are usually addressed with a family term and their given name, not their surname (for example “chị Lan” or “bác Nam”). The given name alone can come across as impolite, especially with someone older.' },
  { id: 'C-ADDR-PAIR', kind: 'custom', status: 'published', sourceIds: ['NQ-2018'], text: 'In northern Vietnamese the words come in pairs: speaking to someone of your parents’ age, you call yourself cháu (niece or nephew) and them bác or chú; they call themselves bác and you cháu. Using both halves of the pair shows respect; dropping one can sound closer.' },
  { id: 'C-ADDR-YOUNG', kind: 'custom', status: 'published', sourceIds: ['CA-NAMING'], text: 'Someone much younger is called cháu in the North and con in the Centre and South.' },
  { id: 'C-ADDR-NORTH-CO', kind: 'custom', status: 'published', sourceIds: ['NQ-2018'], text: 'For strangers of their parents’ age, northern speakers usually say chú and cô, the father’s-side words, rather than dì or cậu.' },
  { id: 'C-ADDR-TOI', kind: 'custom', status: 'published', sourceIds: ['TON-2017', 'NQ-2018'], text: 'Tôi, “I”, is the most neutral word for oneself but sounds formal and distant in everyday talk; it once meant a king’s subject. Learners who use tôi and bạn with everyone can sound unnatural, for example between two middle-aged neighbours.' },
  { id: 'C-ADDR-SURVEY', kind: 'custom', status: 'published', sourceIds: ['NQ-2018', 'TON-2017'], text: 'In a 1992 survey, 428 of 562 responses used kinship terms; a study of 500 market conversations in Hà Nội, Huế, Nha Trang and Hồ Chí Minh City found kinship forms in 80% of buyers’ and sellers’ questions.' },
  { id: 'C-ADDR-KIN', kind: 'custom', status: 'published', sourceIds: ['MSU-BASIC'], text: 'Inside the family, bác is a parent’s older sibling, chú a father’s younger brother, cô a father’s younger sister, cậu a mother’s younger brother and dì a mother’s younger sister; the details differ by region.' },
  { id: 'C-ADDR-REGION', kind: 'custom', status: 'published', sourceIds: ['BPL-VUNGMIEN', 'VOH-XUNGHO', 'CA-NAMING'], text: 'Family words vary by region: parents are bố and mẹ in the North and often ba and má in the South; the eldest brother is anh cả in the North and anh hai in the South, where anh hai in the North means the second brother; great-grandparents are cụ in the North and cố in the South.' },
  { id: 'C-ADDR-FRIENDS', kind: 'custom', status: 'published', sourceIds: ['TON-2017', 'CA-NAMING', 'ZN-NEP'], text: 'Friends of the same age use other pairs: bạn among young people, tớ and cậu as a casual northern pair. Mày and tao are casual to rude, and older Hà Nội families forbade them.' },
  { id: 'C-ADDR-OI', kind: 'custom', status: 'published', sourceIds: ['CA-GREET', 'VNAT-ETQ'], text: 'Calling “ơi” after a family word (em ơi, chị ơi, anh ơi, cô ơi, chú ơi, bà ơi, ông ơi) is a polite way to get someone’s attention.' },
  { id: 'C-ADDR-AGE', kind: 'custom', status: 'published', sourceIds: ['CA-GREET', 'VNAT-LIKE'], text: 'Asking someone’s age when you first meet is not rude: it tells both people which words to use.' },
  { id: 'C-BANOI', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'CA-NAMING', 'TON-2017'], text: 'The tourism authority suggests “bạn ơi” when you are unsure which word to use. Bạn suits people of about your own age; with someone clearly older, a family word is safer.' },
  { id: 'C-ADDR-CAUTION', kind: 'custom', status: 'published', sourceIds: ['NQ-2018', 'TON-2017'], text: 'Linguists describe these patterns as tendencies: families, regions and generations differ, and scholars disagree on some details.' },
  { id: 'N-ASK', kind: 'projectNote', status: 'published', sourceIds: [], text: 'When you are not sure, asking is always a respectful option.' },
  { id: 'C-ADDR-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: listen to the word the other person uses for themself and answer with its partner.' }
];

const story = {
  id: 'st-family-words',
  layout: 'compare',
  title: 'Why use family words with strangers?',
  dek: 'In Vietnamese there is no neutral “you”. Every time you speak to someone, you choose a family word that places you both: older sister, uncle, grandchild.',
  place: 'Hà Nội and the North',
  imageId: 'ev-oq-flowers',
  hero: { image: 'ev-oq-flowers' },
  appliesTo: 'Spoken Vietnamese in Hà Nội and the North. Most of it holds across the country; regional differences are marked.',
  varies: 'Terms depend on age and relationship, and families and regions differ. Follow the word a person uses about themself.',
  sections: [
    { text: 'People are usually addressed with family words that reflect age and relationship.', claimIds: ['C-ADDR-FAMILY'] },
    { heading: 'The terms you will hear most', text: 'Anh, chị, em, cô, chú and bác cover most everyday encounters.', claimIds: ['C-ADDR-TERMS'] },
    { heading: 'A first name on its own', text: 'Use a family word with the given name; the name alone can sound rude.', claimIds: ['C-ADDR-NAME'] },
    { heading: 'When you are not sure', text: '“Bạn ơi” works with people your age, and asking is always polite.', claimIds: ['C-BANOI', 'N-ASK'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Buy a bunch of flowers from a woman about your mother’s age and you will not call her “you”. You will call her *cô*, aunt, and yourself *cháu*, her niece or nephew. She will answer the same way. A minute later, buying coffee from a student, you are *anh* or *chị*, older brother or sister, and the student is *em*.', claimIds: ['C-ADDR-PAIR', 'C-ADDR-TERMS'] },
      { text: 'Vietnamese has no neutral, all-purpose word for “you”, and even “I” is usually a family word. Speakers place themselves and the other person by age, relationship and status every time they open their mouth. It is less complicated than it sounds, and getting it roughly right is one of the warmest things a visitor can do.', claimIds: ['C-ADDR-FAMILY', 'C-ADDR-TOI'] }
    ] },

    { type: 'tabs', heading: 'Who do I call what?', id: 'terms', intro: 'Choose a tab: strangers by age, relatives, or how the North and South differ. On a phone, each row reads as a card.', label: 'Vietnamese family words', tabs: [
      { label: 'Strangers', columns: ['Who they are', 'Call them', 'Call yourself'], rows: [
        ['A bit older than you, man', { text: 'anh', vi: true, claimIds: ['C-ADDR-TERMS'] }, { text: 'em', vi: true }],
        ['A bit older than you, woman', { text: 'chị', vi: true, claimIds: ['C-ADDR-TERMS'] }, { text: 'em', vi: true }],
        ['Younger than you', { text: 'em', vi: true, claimIds: ['C-ADDR-TERMS'] }, { text: 'anh / chị', vi: true }],
        ['A little younger than your parents', { text: 'chú (man), cô (woman)', vi: true, claimIds: ['C-ADDR-TERMS', 'C-ADDR-NORTH-CO'] }, { text: 'cháu', vi: true, claimIds: ['C-ADDR-PAIR'] }],
        ['A little older than your parents', { text: 'bác', vi: true, claimIds: ['C-ADDR-TERMS'] }, { text: 'cháu', vi: true, claimIds: ['C-ADDR-PAIR'] }],
        ['Your grandparents’ age', { text: 'ông (man), bà (woman)', vi: true, claimIds: ['C-ADDR-TERMS'] }, { text: 'cháu', vi: true }],
        ['Much younger, a child', { text: 'cháu (North), con (South)', vi: true, claimIds: ['C-ADDR-YOUNG'] }, { text: 'cô / chú / bác…', vi: true }],
        ['Your age, a friend', { text: 'bạn, cậu', vi: true, claimIds: ['C-ADDR-FRIENDS'] }, { text: 'mình, tớ', vi: true }]
      ], caption: 'Words for strangers, by age' },
      { label: 'Relatives', columns: ['Relative', 'In the North', 'Notes'], rows: [
        ['Parent’s older brother or sister', { text: 'bác', vi: true, claimIds: ['C-ADDR-KIN'] }, 'Either side of the family.'],
        ['Father’s younger brother', { text: 'chú', vi: true, claimIds: ['C-ADDR-KIN'] }, 'Also any man a little younger than your parents.'],
        ['Father’s younger sister', { text: 'cô', vi: true, claimIds: ['C-ADDR-KIN'] }, 'Also any woman a little younger than your parents.'],
        ['Mother’s younger brother', { text: 'cậu', vi: true, claimIds: ['C-ADDR-KIN'] }, 'Rarely used for strangers in the North.'],
        ['Mother’s younger sister', { text: 'dì', vi: true, claimIds: ['C-ADDR-KIN'] }, 'Rarely used for strangers in the North.'],
        ['Great-grandparent', { text: 'cụ', vi: true, claimIds: ['C-ADDR-REGION'] }, 'Also a respectful word for a very old person.']
      ], caption: 'Family words in northern Vietnamese' },
      { label: 'North and South', columns: ['', 'Hà Nội and the North', 'The South'], rows: [
        ['Father, mother', { text: 'bố, mẹ', vi: true, claimIds: ['C-ADDR-REGION'] }, { text: 'ba, má', vi: true }],
        ['Eldest brother', { text: 'anh cả', vi: true, claimIds: ['C-ADDR-REGION'] }, { text: 'anh hai', vi: true }],
        ['Great-grandparent', { text: 'cụ', vi: true, claimIds: ['C-ADDR-REGION'] }, { text: 'cố', vi: true }],
        ['A much younger person', { text: 'cháu', vi: true, claimIds: ['C-ADDR-YOUNG'] }, { text: 'con', vi: true }]
      ], caption: 'Regional differences' }
    ] },

    { type: 'text', heading: 'Words that come in pairs', id: 'pairs', paras: [
      { text: 'The key is that the words come in pairs. If you call a man *bác*, you are his *cháu*; if he calls you *em*, he is your *anh*. A Hà Nội linguist, Nguyễn Quang, shows how the pair carries the relationship: using both halves, “*cháu* invites *bác* upstairs”, sounds respectful even in a request, while dropping one half sounds closer and more relaxed.', claimIds: ['C-ADDR-PAIR'] },
      { text: 'This is everyday speech, not formality. In one survey, three quarters of responses used kinship words; in 500 recorded market conversations across four cities, buyers and sellers used them in 80% of their questions.', claimIds: ['C-ADDR-SURVEY'] }
    ] },
    { type: 'figure', image: 'ev-fruit-pole', size: 'wide', caption: 'At a fruit stall, buyer and seller will call each other by family words.' },

    { type: 'text', heading: 'Calling out: “ơi”', id: 'oi', paras: [
      { text: 'To get someone’s attention, add *ơi* to the family word: *chị ơi* to a waitress a little older than you, *em ơi* to a younger one, *chú ơi* to a motorbike-taxi driver of your father’s generation, *bác ơi* to an older shopkeeper. It is the polite way to call someone over, in a restaurant, a market or the street, and it is far warmer than a wave or a raised finger.', claimIds: ['C-ADDR-OI', 'C-ADDR-TERMS'] },
      { text: 'If you cannot judge someone’s age at all, the tourism authority’s fallback is *bạn ơi*, “hey, friend”. It works well with people about your own age; with someone obviously older, choose *anh*, *chị* or *cô* and err on the generous side.', claimIds: ['C-BANOI'] }
    ] },

    { type: 'text', heading: 'Inside the family', id: 'family', paras: [
      { text: 'The words were family words first, and inside the family they are precise. *Bác* is a parent’s older brother or sister; *chú* is your father’s younger brother and *cô* his younger sister; *cậu* is your mother’s younger brother and *dì* her younger sister. That is why northern speakers, who use *chú* and *cô* for strangers of their parents’ age, rarely call an unrelated woman *dì*.', claimIds: ['C-ADDR-KIN', 'C-ADDR-NORTH-CO'] },
      { text: 'Regions differ even here. A Hà Nội child says *bố* and *mẹ*; a southern child often says *ba* and *má*. In the North the eldest brother is *anh cả* and *anh hai* is the second; in the South *anh hai* is the eldest. A northern great-grandparent is *cụ*, a southern one *cố*.', claimIds: ['C-ADDR-REGION'] }
    ] },

    { type: 'text', heading: 'Why not just “tôi” and “bạn”?', id: 'toi', paras: [
      { text: 'Phrasebooks often teach *tôi* for “I” and *bạn* for “you”. They are not wrong, but they are not neutral either. *Tôi* is the most impersonal word for oneself, polite but distant, and it once meant a king’s subject. *Bạn* means friend and fits people of about your own age. Researchers note that learners who use *tôi* and *bạn* with everyone can sound stiff, as two middle-aged neighbours would if they spoke that way.', claimIds: ['C-ADDR-TOI', 'C-BANOI'] },
      { text: 'Between friends of the same age, people use other pairs: *bạn* and *mình*, or the casual northern *tớ* and *cậu*. *Mày* and *tao* are for close friends at best and insults at worst; older Hà Nội families banned them at home.', claimIds: ['C-ADDR-FRIENDS'] }
    ] },

    { type: 'text', heading: 'Asking someone’s age', id: 'age', paras: [
      { text: 'Because the words depend on age, people often ask how old you are soon after meeting. It is not nosy: it is how both of you find the right pair. If you are not sure, it is fine to ask the person what you should call them: *Tôi nên gọi bạn thế nào ạ?*', claimIds: ['C-ADDR-AGE', 'N-ASK'] },
      { text: 'And always put the family word before the given name, not the surname: *chị Lan*, *bác Nam*. The given name on its own can sound rude to someone older.', claimIds: ['C-ADDR-NAME'] }
    ] },
    { type: 'note', text: 'In Hà Nội a woman of your parents’ age is usually *cô*. Southern speakers sometimes use other words, and families differ; the safest guide is the word she uses for herself.', claimIds: ['C-ADDR-NORTH-CO', 'C-ADDR-TIP'] },

    { type: 'phrases', heading: 'Phrases to start with', ids: ['ph-xinchao-co', 'ph-chioi', 'ph-banoi', 'ph-xungho'] },
    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'A family word plus the given name: *chị Lan*.', claimIds: ['C-ADDR-NAME'] },
      { text: 'Answering with the partner of the word they use.', claimIds: ['C-ADDR-PAIR', 'C-ADDR-TIP'] },
      { text: 'Asking someone’s age, or what to call them.', claimIds: ['C-ADDR-AGE', 'N-ASK'] },
      { text: '*Bạn ơi* with people about your age.', claimIds: ['C-BANOI'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'A given name on its own with someone older.', claimIds: ['C-ADDR-NAME'] },
      { text: '*Tôi* and *bạn* with everyone.', claimIds: ['C-ADDR-TOI'] },
      { text: '*Mày* and *tao*.', claimIds: ['C-ADDR-FRIENDS'] },
      { text: 'The surname as a form of address.', claimIds: ['C-ADDR-NAME'] }
    ] } },
    { type: 'note', text: 'Linguists stress that these are tendencies, and they disagree on some details, such as exactly who counts as *bác*. Families, regions and generations differ.', claimIds: ['C-ADDR-CAUTION'] },
    { type: 'quiz', image: 'ev-oq-flowers', question: 'What do you call the flower seller?', prompt: 'She looks a few years younger than your parents. You want to ask the price. Which word fits?', fitLabel: 'That fits', otherLabel: 'Look again', options: [
      { label: 'Bạn', vi: true, feedback: '*Bạn* suits someone about your own age. For a woman of your parents’ generation it sounds too casual.' },
      { label: 'Cô', vi: true, fit: true, feedback: 'In Hà Nội a woman a little younger than your parents is *cô*, and you are *cháu*: *Cô ơi, cái này bao nhiêu tiền ạ?*' },
      { label: 'Em', vi: true, feedback: '*Em* is for someone younger than you. She would be surprised.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
