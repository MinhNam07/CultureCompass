/* Story: calling people with "ơi" (st-oi). Layout: guide.
   Researched 12 Nov 2026. Word meanings follow Vietnamese dictionaries (via vi.wiktionary); how address works in
   Hà Nội follows linguists who recorded conversations there. The palm-down beckon is common advice only, so it is
   given as our suggestion. Kinship terms in depth are in st-family-words. */
const today = '2026-11-12';

const dict = (w, word, url, used) => ({ id: 'DICT-' + w, short: 'Vietnamese dictionary', title: '“' + word + '” — vi.wiktionary', org: 'Wiktionary (Vietnamese), from the dictionaries of Hồ Ngọc Đức (2003) and Soha Tra Từ', url, type: 'reference', checked: today, used, limits: 'A free dictionary drawing on older published dictionaries; gives meanings, not regional detail.' });

const sources = [
  dict('OI', 'ơi', 'https://vi.wiktionary.org/wiki/%C6%A1i', 'Ơi as a friendly word for calling someone, and as a reply to a call from an equal or someone junior.'),
  dict('DA', 'dạ', 'https://vi.wiktionary.org/wiki/d%E1%BA%A1', 'Dạ as a polite reply to a call or a polite way to begin speaking; the saying “gọi dạ, bảo vâng”.'),
  dict('VANG', 'vâng', 'https://vi.wiktionary.org/wiki/v%C3%A2ng', 'Vâng as a polite yes, agreeing or confirming.'),
  dict('A', 'ạ', 'https://vi.wiktionary.org/wiki/%E1%BA%A1', 'Ạ as a particle of respect or warmth at the end of a sentence or after the address word, as in “Vâng ạ” and “Em chào thầy ạ”.'),
  dict('U', 'ừ', 'https://vi.wiktionary.org/wiki/%E1%BB%AB', 'Ừ as a yes to an equal or someone junior.'),
  { id: 'SIDNELL-VU-2024', short: 'Frontiers in Sociology', title: 'On the division of labor in the maintenance of intersubjectivity: insights from the Vietnamese case — Frontiers in Sociology', org: 'Jack Sidnell and Vũ Thị Thanh Hương, Frontiers in Sociology', url: 'https://doi.org/10.3389/fsoc.2023.1205433', type: 'academic', checked: today,
    used: 'About 35 hours of conversation recorded in Hà Nội cafés and restaurants: kin terms as the default way to refer to the person you are talking to, never used reciprocally; seniority not read mechanically from age (people born in the same year can be peers, five years may or may not matter); dạ conveying deference and ừ used with juniors.',
    limits: 'A research article (January 2024) on recordings made in 2012.' },
  { id: 'PLO-STOKES', short: 'Pháp Luật TP.HCM', title: 'Người Anh “hoảng” với “ma trận” xưng hô ở Việt Nam — Pháp Luật TP.HCM', org: 'Pháp Luật TP.HCM (on tuoitre.vn), translating Connla Stokes in Guardian Weekly', url: 'https://tuoitre.vn/plo/nguoi-anh-hoang-voi-ma-tran-xung-ho-o-viet-nam-post292828.html', type: 'press', checked: today,
    used: 'A British writer in Hà Nội corrected by a bakery owner for answering “chào em”; people guessing age from looks and circumstances; his wife’s advice that “chào bác” is safe when unsure.',
    limits: 'A personal column (2014), in translation.' },
  { id: 'SGGP-DA', short: 'Sài Gòn Giải Phóng', title: 'Hay sao tiếng “dạ” người Nam bộ — SGGP', org: 'Sài Gòn Giải Phóng, by Nguyễn Minh Hải', url: 'https://www.sggp.org.vn/hay-sao-tieng-da-nguoi-nam-bo-post778855.html', type: 'press', checked: today,
    used: 'Southerners rarely saying vâng and using dạ instead, often to show they are listening rather than agreeing.',
    limits: 'A feature essay (January 2025).' },
  { id: 'VNE-DATHUA', short: 'VnExpress', title: 'Đâu rồi tiếng dạ, thưa? — VnExpress', org: 'VnExpress, by Hoàng Xuân', url: 'https://vnexpress.net/dau-roi-tieng-da-thua-3094923.html', type: 'press', checked: today,
    used: 'Dạ and thưa described as the minimum of polite speech, and a northern and a southern way of asking a price.',
    limits: 'An opinion piece (October 2014).' },
  { id: 'NGONNGU-3VUNG', short: 'ngonngu.net', title: 'Khái quát về hệ thống ngữ âm của 3 vùng phương ngữ — ngonngu.net', org: 'ngonngu.net (Vietnamese linguistics site)', url: 'https://ngonngu.net/pn_nguam_3vung/313', type: 'reference', checked: today,
    used: 'Hà Nội speech as typical of the northern dialect, and no officially fixed standard of pronunciation.',
    limits: 'An overview article (2007, updated 2019).' },
  { id: 'BDT-GIONG', short: 'Báo Đầu tư', title: 'Nảy lửa tranh cãi về giọng nói biên tập viên thời sự — Báo Đầu tư', org: 'Báo Đầu tư (from VietNamNet)', url: 'https://baodautu.vn/nay-lua-tranh-cai-ve-giong-noi-bien-tap-vien-thoi-su-d20263.html', type: 'press', checked: today,
    used: 'A national-television presenter arguing that the news should be read in the northern, Hà Nội voice, and readers replying that no rule requires it.',
    limits: 'A news report of a public debate (August 2014).' },
  { id: 'CA-COMM', short: 'The Cultural Atlas', title: 'Vietnamese culture: Communication — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica)', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-communication', type: 'reference', checked: today,
    used: 'Avoiding pointing with the index finger, a single forefinger with the palm up seen as offensive, touching someone’s head or passing things over it seen as offensive, and “yes” sometimes meaning “I hear you”.',
    limits: 'A general guide (2016) for Vietnam as a whole.' },
  { id: 'CA-ETIQ', short: 'The Cultural Atlas', title: 'Vietnamese culture: Etiquette — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica)', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-etiquette', type: 'reference', checked: today,
    used: 'Objects passed, given and received with both hands; etiquette following an age hierarchy.',
    limits: 'A general guide (2016) for Vietnam as a whole.' },
  { id: 'TON-2017', used: 'Address terms whose feeling depends on context; the rule “xưng khiêm, hô tôn”, modest for oneself and respectful for the other; tôi as the only fairly neutral pronoun, formal in everyday use; tớ–cậu as a casual northern pair; learners over-using tôi and bạn; a study of 500 market conversations in Hà Nội, Huế, Nha Trang and Hồ Chí Minh City in which 80% of questions used kinship forms.' }
];

const claims = [
  { id: 'C-OI-WORD', kind: 'custom', status: 'published', sourceIds: ['DICT-OI'], text: 'Ơi is a friendly word for calling someone, as in “mẹ ơi!”, Mum! It is also a reply to a call, but only from an equal or someone junior.' },
  { id: 'C-DA', kind: 'custom', status: 'published', sourceIds: ['DICT-DA', 'SIDNELL-VU-2024'], text: 'Dạ is the polite reply when someone calls you, and a polite way to begin speaking; it conveys deference. A saying sums up the manners: gọi dạ, bảo vâng, answer a call with dạ and an instruction with vâng.' },
  { id: 'C-VANG', kind: 'custom', status: 'published', sourceIds: ['DICT-VANG'], text: 'Vâng is a polite yes, agreeing or confirming, often as “vâng ạ”.' },
  { id: 'C-A', kind: 'custom', status: 'published', sourceIds: ['DICT-A'], text: 'Ạ is a particle of respect or warmth added at the end of a sentence or after the address word, as in “Vâng ạ” or “Em chào thầy ạ”, I greet you, teacher.' },
  { id: 'C-U', kind: 'custom', status: 'published', sourceIds: ['DICT-U', 'SIDNELL-VU-2024'], text: 'Ừ is a yes for equals and juniors; said to someone older it sounds too casual.' },
  { id: 'C-DA-SOUTH', kind: 'custom', status: 'published', sourceIds: ['SGGP-DA', 'DICT-DA'], text: 'Northerners use both dạ and vâng; in the south few people say vâng, and dạ serves for both, often meaning “I’m listening” rather than “yes”.' },
  { id: 'C-HANOI-KIN', kind: 'custom', status: 'published', sourceIds: ['SIDNELL-VU-2024'], text: 'In conversations recorded in Hà Nội, family words were the default way to refer to the person spoken to, and never used both ways: if you call someone em, they call you anh or chị. Who counts as senior is not mechanical: people born in the same year may treat each other as equals, and five years’ difference may or may not matter.' },
  { id: 'C-STOKES', kind: 'custom', status: 'published', sourceIds: ['PLO-STOKES'], text: 'A British writer in Hà Nội answered a bakery owner’s “chào anh” with “chào em” and was told he could not call her em: she had set the terms. People guess age from looks and circumstances; his wife’s advice when unsure was to say “chào bác”.' },
  { id: 'C-MARKET-KIN', kind: 'custom', status: 'published', sourceIds: ['TON-2017'], text: 'In a study of 500 market conversations in Hà Nội, Huế, Nha Trang and Hồ Chí Minh City, 80% of questions used family words, partly to sound close to the seller.' },
  { id: 'C-XUNGKHIEM', kind: 'custom', status: 'published', sourceIds: ['TON-2017'], text: 'An old rule of address is xưng khiêm, hô tôn: speak of yourself modestly and of the other person respectfully.' },
  { id: 'C-TOI-FORMAL', kind: 'custom', status: 'published', sourceIds: ['TON-2017', 'CA-NAMING'], text: 'Tôi, I, is the most neutral pronoun but sounds formal or distant in everyday talk; tôi with bạn sounds unnatural between, say, two middle-aged neighbours. Among friends in the north, tớ and cậu are a common casual pair.' },
  { id: 'C-ACCENT', kind: 'custom', status: 'published', sourceIds: ['NGONNGU-3VUNG', 'BDT-GIONG'], text: 'Hà Nội speech is typical of the northern dialect and is often treated as the model for broadcast Vietnamese, but no official standard of pronunciation has been fixed, and the point is argued.' },
  { id: 'C-TWO-HANDS', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ', 'CA-ETIQ'], text: 'Pass, give and receive things with both hands, or at least the right hand, especially with someone older.' },
  { id: 'C-HEAD', kind: 'custom', status: 'published', sourceIds: ['CA-COMM'], text: 'Touching someone’s head, or passing something over it, is seen as offensive.' },
  { id: 'C-FINGER', kind: 'custom', status: 'published', sourceIds: ['CA-COMM'], text: 'Pointing at people with the index finger is seen as disrespectful, and beckoning with a single forefinger, palm up, as offensive.' },
  { id: 'C-YES-HEAR', kind: 'custom', status: 'published', sourceIds: ['CA-COMM', 'SGGP-DA'], text: '“Yes” may mean “I hear you” rather than “I agree”.' },
  { id: 'C-OI-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Call with your voice rather than your hand. If you must wave someone over, many people advise keeping the palm down and moving the fingers towards you.' },
  { id: 'C-OI-SHOP-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'In a shop or café, chị ơi or anh ơi for staff who look older than you, em ơi for those who look younger; add ạ to your question.' }
];

const story = {
  id: 'st-oi',
  layout: 'guide',
  title: 'Calling people with “ơi”',
  dek: 'No “excuse me”, no raised hand: in Hà Nội you call people by a family word and a short “ơi”, and answer with “dạ”. A guide to getting attention, asking and replying politely.',
  place: 'Hà Nội',
  sceneId: 'sc04',
  imageId: 'img-old-quarter',
  hero: { image: 'img-old-quarter' },
  appliesTo: 'Shops, cafés and streets in Hà Nội. Word meanings come from Vietnamese dictionaries; how people use them, from linguists who recorded conversations in Hà Nội and from the national tourism authority.',
  varies: 'Which family word fits depends on how old the other person seems to you, and people judge that differently. The south uses dạ where the north often says vâng.',
  phraseIds: ['ph-chioi', 'ph-banoi', 'ph-hoiho'],
  sections: [
    { text: 'People call each other with a family word that matches the other person’s age, followed by “ơi”.', claimIds: ['C-CALL-OI'] },
    { heading: 'The safe choice', text: 'If you are not sure, “bạn ơi” is a neutral choice for people about your age.', claimIds: ['C-BANOI'] },
    { heading: 'Call, don’t point', text: 'Avoid pointing at people, or patting them on the back or head.', claimIds: ['C-NO-POINT'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'In a Hà Nội café people rarely say “excuse me” to get attention. A customer calls *em ơi!* to a young waiter, or *chị ơi!* to a woman a little older behind the counter. That small word, [[oi|ơi]], is how people get each other’s attention in Hà Nội, and the word in front of it says who they think they are talking to.', claimIds: ['C-CALL-OI', 'C-OI-WORD'] },
      { text: 'It is one of the most useful things a visitor can learn, and one of the easiest. This guide covers calling, asking and answering politely, and the gestures that go with them. For the family words themselves in depth, see [why people use family words with strangers](story:st-family-words).', claimIds: ['C-CALL-OI'] }
    ] },
    { type: 'facts', title: 'The short version', items: [
      { term: 'Call', text: 'Family word + ơi: chị ơi, anh ơi, em ơi.' },
      { term: 'Unsure', text: 'Bạn ơi, for someone about your age.' },
      { term: 'Ask', text: 'Add ạ to be polite.' },
      { term: 'Answer', text: 'Dạ when called; vâng for yes.' }
    ], claimIds: ['C-CALL-OI', 'C-BANOI', 'C-A', 'C-DA'] },

    { type: 'steps', heading: 'Call, ask, answer', id: 'steps', items: [
      { title: 'Pick the word', paras: [
        { text: 'Choose the family word that fits how old the person looks to you: *em* for someone younger, *chị* or *anh* for a woman or man a bit older, *cô* or *chú* for someone your aunt’s or uncle’s age, *bà* or *ông* for someone your grandparents’ age. The national tourism authority suggests *bạn ơi*, hey friend, when you are not sure; it suits people of about your own age.', claimIds: ['C-CALL-OI', 'C-BANOI'] }
      ] },
      { title: 'Call', paras: [
        { text: 'Add *ơi* and say it clearly: *chị ơi!* It is friendly, not rude; it is the same word a child uses to call *mẹ ơi*, Mum. Use your voice rather than your hand.', claimIds: ['C-OI-WORD', 'C-OI-TIP'] }
      ] },
      { title: 'Ask, with ạ', paras: [
        { text: 'Then ask, and end with *ạ*, a small particle of respect or warmth: *Hồ Hoàn Kiếm ở đâu ạ?*, Where is Hoàn Kiếm Lake, please? It works after a greeting too: a pupil says *Em chào thầy ạ* to a teacher.', claimIds: ['C-A'] }
      ] },
      { title: 'Answer with dạ', paras: [
        { text: 'If someone calls you, the polite reply is *dạ*. Answering *ơi* is fine only to an equal or someone younger. For yes, say *vâng*, or *vâng ạ* to be warmer. An old saying sums it up: *gọi dạ, bảo vâng*, answer a call with dạ, an instruction with vâng.', claimIds: ['C-DA', 'C-OI-WORD', 'C-VANG'] }
      ] },
      { title: 'Hand things over properly', paras: [
        { text: 'When you pay or pass something, use both hands, or at least your right hand, especially with someone older.', claimIds: ['C-TWO-HANDS'] }
      ] }
    ] },
    { type: 'phrases', heading: 'Say it', ids: ['ph-chioi', 'ph-banoi', 'ph-hoiho'] },

    { type: 'text', heading: 'Who calls whom what', id: 'who', paras: [
      { text: 'Linguists who recorded about 35 hours of conversation in Hà Nội cafés and restaurants found that family words were the default way to refer to the person spoken to. They are never used both ways round: if you call someone *em*, they call you *anh* or *chị*. And seniority is not mechanical. People born in the same year may treat each other as equals; five years’ difference matters to some pairs and not to others.', claimIds: ['C-HANOI-KIN'] },
      { text: 'The other person may decide for you. A British writer living in Hà Nội was greeted by a bakery owner with *chào anh*, and answered *chào em*. She told him he could not call her *em*: she had set the terms, whatever their real ages. People guess age from looks and circumstances, he wrote; his wife’s advice when unsure was simply to say *chào bác*.', claimIds: ['C-STOKES'] }
    ] },
    { type: 'quote', text: 'Gọi dạ, bảo vâng.', by: 'A Vietnamese saying: answer a call with dạ, an instruction with vâng', claimIds: ['C-DA'] },

    { type: 'text', heading: 'In shops and markets', id: 'shops', paras: [
      { text: 'Family words are the language of buying and selling. In a study of 500 market conversations in Hà Nội, Huế, Nha Trang and Hồ Chí Minh City, 80 percent of questions used them, partly because they make buyer and seller sound close. An old rule of address explains the choice: *xưng khiêm, hô tôn*, speak of yourself modestly and of the other person respectfully.', claimIds: ['C-MARKET-KIN', 'C-XUNGKHIEM'] },
      { text: 'In practice: *chị ơi* or *anh ơi* for staff who look older than you, *em ơi* for those who look younger, and *ạ* on the end of your question.', claimIds: ['C-OI-SHOP-TIP'] }
    ] },

    { type: 'text', heading: 'Why not just “tôi” and “bạn”?', id: 'toi', paras: [
      { text: 'Textbooks teach *tôi*, I, and *bạn*, you, because they are the most neutral pair. In everyday talk they sound formal or distant, the language of first meetings. Between two middle-aged neighbours, *tôi* and *bạn* would sound odd; *chị* and *em* would be natural. Among friends in the north the casual pair is *tớ* and *cậu*.', claimIds: ['C-TOI-FORMAL'] }
    ] },

    { type: 'tabs', heading: 'Answers, north and south', id: 'replies', intro: 'Choose a tab to compare how people answer in Hà Nội and in the south.', label: 'Polite replies', tabs: [
      { label: 'Hà Nội', columns: ['Word', 'Use it for'], rows: [
        [{ text: 'dạ', vi: true }, { text: 'Answering when someone calls you; starting to speak politely.', claimIds: ['C-DA'] }],
        [{ text: 'vâng', vi: true }, { text: 'A polite yes.', claimIds: ['C-VANG'] }],
        [{ text: 'ạ', vi: true }, { text: 'At the end of a sentence, for respect.', claimIds: ['C-A'] }],
        [{ text: 'ừ', vi: true }, { text: 'Yes, to equals and juniors only.', claimIds: ['C-U'] }]
      ] },
      { label: 'The south', columns: ['Word', 'Use it for'], rows: [
        [{ text: 'dạ', vi: true }, { text: 'Both answering and yes; often “I’m listening” rather than agreement.', claimIds: ['C-DA-SOUTH'] }],
        [{ text: 'vâng', vi: true }, { text: 'Rarely used.', claimIds: ['C-DA-SOUTH'] }]
      ] }
    ] },
    { type: 'note', text: 'Like “dạ”, an English “yes” from a Vietnamese speaker may mean “I hear you” rather than “I agree”. If something matters, check.', claimIds: ['C-YES-HEAR'] },

    { type: 'text', heading: 'Hands, fingers and heads', id: 'gestures', paras: [
      { text: 'Calling with *ơi* does the job that a pointed finger or a wave might do elsewhere. Pointing at people with the index finger is seen as disrespectful, and beckoning with one finger, palm up, as offensive. Avoid patting people on the back or the head, particularly anyone older than you; touching someone’s head, or passing something over it, is seen as offensive.', claimIds: ['C-NO-POINT', 'C-FINGER', 'C-HEAD'] },
      { text: 'If you must wave someone over, many people advise keeping the palm down and moving the fingers towards you. Better still, call.', claimIds: ['C-OI-TIP'] }
    ] },
    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Chị ơi, anh ơi, em ơi to get attention.', claimIds: ['C-CALL-OI'] },
      { text: 'Ạ at the end of a question.', claimIds: ['C-A'] },
      { text: 'Dạ when someone calls you.', claimIds: ['C-DA'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Answering ừ to someone older.', claimIds: ['C-U'] },
      { text: 'Beckoning with one finger, palm up.', claimIds: ['C-FINGER'] },
      { text: 'Patting someone on the head.', claimIds: ['C-HEAD', 'C-NO-POINT'] }
    ] } },

    { type: 'text', heading: 'The Hà Nội voice', id: 'accent', paras: [
      { text: 'Hà Nội speech is typical of the northern dialect, and many people treat it as the model for the news: a well-known national-television presenter once argued that the news should be read in the northern, Hà Nội voice. Others answered that no rule says so, and linguists note that no official standard of pronunciation has been fixed. What a visitor hears in Hà Nội is the north’s *vâng* and *ạ*, alongside the *dạ* that every region shares.', claimIds: ['C-ACCENT', 'C-DA-SOUTH'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Call', text: 'Chị ơi! Anh ơi! Em ơi!' },
      { term: 'Unsure', text: 'Bạn ơi!' },
      { term: 'Polite', text: '… ạ?' },
      { term: 'Answer', text: 'Dạ. Vâng ạ.' }
    ] },
    { type: 'quiz', image: 'img-old-quarter', question: 'Someone calls your name', prompt: 'Your friend’s grandmother calls you from the kitchen. What do you answer?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Ơi!', feedback: 'Ơi as a reply is for equals and juniors. To someone older, answer dạ.' },
      { label: 'Dạ!', fit: true, feedback: 'Yes. Dạ is the polite reply to a call.' },
      { label: 'Ừ!', feedback: 'Ừ is for equals and juniors; to a grandmother it sounds too casual.' }
    ] }
  ]
};

const glossary = [
  { id: 'oi', vi: 'ơi', say: 'er-ee', en: 'A friendly word for calling someone, after their name or a family word: chị ơi!' }
];

module.exports = { sources, claims, glossary, stories: [story] };
