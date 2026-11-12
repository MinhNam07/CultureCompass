/* Story: keeping your cool in public (st-keep-cool). Layout: longform.
   Researched 12 Nov 2026. Face and indirectness are described as tendencies, with the scholars’ own warnings against stereotypes. */
const today = '2026-11-12';

const sources = [
  { id: 'CA-CORE', short: 'The Cultural Atlas', title: 'Vietnamese culture: Core Concepts — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica), Cultural Atlas Editors', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-core-concepts', type: 'reference', checked: today,
    used: 'Face as reputation, influence, dignity and honour; giving face through respect and compliments and losing it through criticism; indirect, polite speech; modesty (khiêm tốn) as keeping harmony; the note that modesty does not preclude honesty and that views vary by region, age and education.',
    limits: 'A general guide (2016) for Vietnam as a whole.' },
  { id: 'CA-COMM', short: 'The Cultural Atlas', title: 'Vietnamese culture: Communication — The Cultural Atlas', org: 'The Cultural Atlas (Mosaica), Cultural Atlas Editors', url: 'https://theculturalatlas.org/vietnamese-culture/vietnamese-culture-communication', type: 'reference', checked: today,
    used: 'Indirect communication; avoiding a flat no; a yes that may mean “I hear you”; pausing before answering as politeness; shouting seen as improper yet common; smiling when embarrassed or nervous; sombre expressions that are not unfriendly; pointing and beckoning with an open hand; the head as sacred; feet, hands on hips and the “okay” sign.',
    limits: 'A general guide (2016); it describes tendencies, not rules.' },
  { id: 'PHAM-2014', short: 'Pham 2014', title: 'How Do the Vietnamese Lose Face? Understanding the Concept of Face through Self-Reported, Face Loss Incidents — International Journal of Language and Linguistics 2(3): 223–231', org: 'International Journal of Language and Linguistics, Pham Thi Hong Nhung (Hue University of Foreign Languages)', url: 'https://doi.org/10.11648/j.ijll.20140203.21', type: 'academic', checked: today,
    used: 'The finding that Vietnamese face (mất mặt, mất thể diện) is both an individual and a collective possession and depends on how others judge.',
    limits: 'Read as the published abstract only.' },
  { id: 'NTK-2015', short: 'Nguyễn Trung Kiên 2015', title: '“Thể diện linh thiêng”: Cái gì định hướng người Việt Nam trong tương tác xã hội thường nhật — Vietnam Journal of Social Sciences and Humanities', org: 'VNU University of Social Sciences and Humanities, Nguyễn Trung Kiên', url: 'https://repository.vnu.edu.vn/handle/VNU_123/64727', type: 'academic', checked: today,
    used: 'The distinction between the face of people higher and lower in a hierarchy, and the finding that loss of face by someone higher up has more serious consequences.',
    limits: 'Read as the published abstract only (2015).' },
  { id: 'NQ-2019', short: 'Nguyễn Quang 2019', title: 'Nghiên cứu trở lại vấn đề thể diện và lịch sự trong giao tiếp — VNU Journal of Foreign Studies', org: 'VNU Journal of Foreign Studies (University of Languages and International Studies, Hà Nội), Nguyễn Quang', url: 'https://js.vnu.edu.vn/FS/article/view/4345/4034', type: 'academic', checked: today,
    used: 'A Vietnamese host’s mock scolding of a guest for bringing a gift, comfortable for a Vietnamese guest but not for an American one; the author’s warning that such observations are hypotheses, not stereotypes.',
    limits: 'A theoretical paper (2019) by a Hà Nội linguist.' },
  { id: 'NTT-2022', short: 'Nguyễn Thanh Tùng 2022', title: 'Nghiên cứu về danh dự gia đình ở Việt Nam: Vấn đề khái niệm và hướng tiếp cận — Thông tin Khoa học xã hội', org: 'Social Sciences Information Review no. 5 (2022), Nguyễn Thanh Tùng', url: 'https://vjol.info.vn/ssir/article/download/82327/70166', type: 'academic', checked: today,
    used: 'Danh dự, thể diện, sĩ diện and related words being used almost interchangeably; thể diện as the social form of honour, extended to the group; older critiques of “sĩ diện hão”, hollow vanity.',
    limits: 'A review of concepts (2022) that itself calls for caution.' }
];

const claims = [
  { id: 'C-KEEP-COOL', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: '“Saving face” matters. Keep your cool in public, avoid loud arguments or making a scene, and don’t berate people for their mistakes.' },
  { id: 'C-NO-POINT', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'Avoid pointing at people, or patting them on the back or head, particularly if they are older than you.' },
  { id: 'C-FACE-DEF', kind: 'custom', status: 'published', sourceIds: ['CA-CORE'], text: 'Face stands for a person’s reputation, influence, dignity and honour. People give face by showing respect and paying compliments, and lose it when they are criticised or behave badly in front of others.' },
  { id: 'C-FACE-SHARED', kind: 'custom', status: 'published', sourceIds: ['PHAM-2014', 'NTK-2015'], text: 'Research describes Vietnamese face as both personal and shared, depending on how others judge; when someone higher in a hierarchy loses face, the consequences are seen as more serious.' },
  { id: 'C-COOL-ELDERS', kind: 'custom', status: 'published', sourceIds: ['VNAT-LIKE'], text: 'Older is seen as wiser. Lễ phép means being courteous, respectful and even compliant towards older people, and Vietnamese uses different words for “you” depending on whether someone is older or younger.' },
  { id: 'C-FACE-WORDS', kind: 'custom', status: 'published', sourceIds: ['NTT-2022'], text: 'Vietnamese has several overlapping words for face and honour, among them danh dự (honour), thể diện (face) and sĩ diện (pride), often used interchangeably; “sĩ diện hão”, hollow pride, has long been criticised.' },
  { id: 'C-INDIRECT', kind: 'custom', status: 'published', sourceIds: ['CA-COMM', 'CA-CORE'], text: 'Communication tends to be indirect and polite. People may avoid a flat “no”, a “yes” may mean “I hear you” rather than agreement, and a pause before answering is a sign of respect.' },
  { id: 'C-MODEST', kind: 'custom', status: 'published', sourceIds: ['CA-CORE'], text: 'Modesty, khiêm tốn, means playing down your feelings and speaking indirectly to keep harmony; it does not mean being dishonest.' },
  { id: 'C-SHOUT', kind: 'custom', status: 'published', sourceIds: ['CA-COMM'], text: 'Shouting is generally seen as improper, yet raised voices are common in practice.' },
  { id: 'C-SMILE', kind: 'custom', status: 'published', sourceIds: ['CA-COMM', 'VNAT-ETQ'], text: 'People may smile or laugh quietly when embarrassed, apologetic, frustrated or nervous, and may keep a serious face that is not unfriendly. A smile goes a long way, especially when language fails.' },
  { id: 'C-GESTURES', kind: 'custom', status: 'published', sourceIds: ['CA-COMM', 'CA-ETQ', 'VNAT-ETQ'], text: 'Point or beckon with an open hand rather than one finger; beckoning with a forefinger, palm up, can seem threatening. The head is the most sacred part of the body, the soles of the feet should not point at people, hands on hips can look aggressive, crossed fingers are impolite and the “okay” sign can mean poor quality.' },
  { id: 'C-HOST-MOCK', kind: 'custom', status: 'published', sourceIds: ['NQ-2019'], text: 'A Vietnamese host may pretend to scold a friend for bringing a gift; a Vietnamese guest reads it as warmth, while a guest from elsewhere may be confused.' },
  { id: 'C-FACE-CAUTION', kind: 'custom', status: 'published', sourceIds: ['NQ-2019', 'CA-CORE'], text: 'Scholars warn that such patterns are starting points, not stereotypes, and views differ by region, age, education and experience.' },
  { id: 'C-COOL-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion for a dispute: lower your voice, smile, use a polite form of address, explain the problem as a misunderstanding and leave the other person a way to fix it without losing face.' }
];

const story = {
  id: 'st-keep-cool',
  layout: 'longform',
  title: 'Keeping your cool in public',
  dek: 'Why a quiet word works better than a raised voice, what a smile can mean, and which gestures to keep in your pocket.',
  place: 'Everyday Hà Nội',
  imageId: 'ev-street-market',
  hero: { image: 'ev-street-market' },
  appliesTo: 'Everyday encounters in Hà Nội: shops, taxis, restaurants, offices and the street.',
  varies: 'General guidance, not a rule. People, generations and situations differ, and the scholars quoted here warn against treating it as a stereotype.',
  sections: [
    { text: 'Saving face matters: keep calm in public and avoid loud arguments.', claimIds: ['C-KEEP-COOL'] },
    { heading: 'Gestures to avoid', text: 'Don’t point at people or pat them on the head, especially if they are older than you.', claimIds: ['C-NO-POINT'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Sooner or later something will go wrong: a wrong order, a taxi that takes the long way, a price that changes at the till. The instinct many visitors bring is to make the problem clear, firmly and loudly. In Hà Nội, that is usually the slowest way to fix it.', editorial: true },
      { text: 'The national tourism authority’s advice is short: keep your cool, avoid loud arguments and making a scene, and don’t berate people for mistakes. Behind it is an idea that shapes everyday life here, and has its own small vocabulary: face.', claimIds: ['C-KEEP-COOL'] }
    ] },

    { type: 'text', heading: 'What “face” means', id: 'face', paras: [
      { text: 'Face stands for a person’s reputation, dignity and honour in the eyes of others. You give someone face by treating them with respect and paying compliments; they lose it when they are criticised or shown up in public. A shop assistant scolded in front of colleagues has lost face. So, in a different way, has the customer who shouted.', claimIds: ['C-FACE-DEF'] },
      { text: 'Researchers in Vietnam describe face as both personal and shared. It belongs to you, but also to your family and group, and it depends on what others think. One study finds that when someone higher up a hierarchy loses face, an older person, a manager, an official, the consequences are taken more seriously. That is why a public confrontation with an older or senior person can go especially badly.', claimIds: ['C-FACE-SHARED'] }
    ] },
    { type: 'facts', title: 'Words for face', items: [
      { term: 'Thể diện', vi: true, text: 'Face: your standing in other people’s eyes.' },
      { term: 'Mất mặt', vi: true, text: 'To lose face, literally “lose the face”.' },
      { term: 'Danh dự', vi: true, text: 'Honour, of a person or a family.' },
      { term: 'Sĩ diện', vi: true, text: 'Pride; *sĩ diện hão* is hollow pride, keeping up appearances.' },
      { term: 'Khiêm tốn', vi: true, text: 'Modest, playing yourself down.' }
    ], claimIds: ['C-FACE-WORDS', 'C-FACE-SHARED', 'C-MODEST'] },
    { type: 'note', text: 'Vietnamese scholars themselves use these words loosely, often interchangeably, and Vietnamese writers have long criticised *sĩ diện hão*, pride for show. Face is a value people argue about, not a rule they all obey.', claimIds: ['C-FACE-WORDS'] },

    { type: 'text', heading: 'Older means wiser', id: 'elders', paras: [
      { text: 'Age shapes almost every encounter. Vietnam’s tourism authority sums up the attitude in three words, older is wiser, and names the virtue that goes with it: *lễ phép*, being courteous, respectful and even compliant towards older people. The language builds it in, with different words for “you” depending on whether the other person is older or younger, and people will often ask your age soon after meeting so they know which to use.', claimIds: ['C-COOL-ELDERS', 'C-ADDR-AGE'] },
      { text: 'This is why the same complaint lands differently depending on who receives it. Research on face finds that when someone higher in a hierarchy loses face, the damage is taken more seriously than when someone lower down does. Contradicting an older shopkeeper in front of her family, or a senior official in front of his staff, costs more than the same words said to a teenager behind a counter. If you need to disagree with someone older, do it privately, gently, and with their title: *bác*, *cô*, *chú*.', claimIds: ['C-FACE-SHARED', 'C-COOL-TIP'] }
    ] },

    { type: 'text', heading: 'Saying no without saying no', id: 'indirect', paras: [
      { text: 'Everyday speech tends to be indirect and polite. Someone may avoid a flat “no” and say “maybe”, “it’s difficult” or nothing at all; a “yes” may simply mean “I hear you”. A pause before answering is a sign of respect, not hesitation. If you need a clear answer, ask an open question, “what would be possible?”, rather than one that forces a refusal.', claimIds: ['C-INDIRECT'] },
      { text: 'Modesty works the same way. People play down their feelings, their cooking and their gifts. A host may even pretend to scold a friend for bringing a present: “why did you go to all that trouble?” A Vietnamese guest hears warmth; a visitor may hear a complaint. None of this means people are dishonest. Observers often note the opposite.', claimIds: ['C-MODEST', 'C-HOST-MOCK'] }
    ] },
    { type: 'quote', text: 'Modesty does not preclude honesty.', by: 'The Cultural Atlas, on Vietnamese culture', claimIds: ['C-MODEST'] },

    { type: 'text', heading: 'Raised voices and quiet smiles', id: 'voices', paras: [
      { text: 'Shouting is generally seen as improper, uncivilised even. It is also, honestly, common: you will hear raised voices in markets, in traffic and across the street. The difference is who is shouting at whom. A visitor raising their voice at a waiter or driver puts the other person in a corner where giving way means losing face.', claimIds: ['C-SHOUT', 'C-FACE-DEF'] },
      { text: 'A smile can mean more than happiness. People may smile or laugh softly when they are embarrassed, apologising, frustrated or nervous, as if to spare you the discomfort. Others keep a serious face that is not unfriendly at all. And from you, a smile goes a long way, especially when you have no shared language.', claimIds: ['C-SMILE'] }
    ] },
    { type: 'figure', image: 'ev-oq-pavement', size: 'wide', caption: 'An Old Quarter pavement in the afternoon.' },

    { type: 'tabs', heading: 'Gestures that travel badly', intro: 'Some everyday gestures read differently here. Switch between what to avoid and what to do instead.', label: 'Gestures', tabs: [
      { label: 'Avoid', columns: ['Gesture', 'How it may read'], rows: [
        ['Pointing at someone with a finger', { text: 'Rude, especially to someone older.', claimIds: ['C-NO-POINT', 'C-GESTURES'] }],
        ['Beckoning with a forefinger, palm up', { text: 'Rude, even threatening.', claimIds: ['C-GESTURES'] }],
        ['Patting a head, even a child’s', { text: 'The head is the most sacred part of the body.', claimIds: ['C-GESTURES', 'C-NO-POINT'] }],
        ['Soles of the feet towards someone', { text: 'Rude.', claimIds: ['C-GESTURES'] }],
        ['Hands on hips, arms crossed', { text: 'Can look aggressive.', claimIds: ['C-GESTURES'] }],
        ['Crossed fingers; the “okay” sign', { text: 'Impolite; the okay sign can mean “poor quality”.', claimIds: ['C-GESTURES'] }]
      ], caption: 'Gestures to avoid' },
      { label: 'Instead', columns: ['Instead of…', 'Try'], rows: [
        ['Pointing', { text: 'An open hand, palm up, towards the person or thing.', claimIds: ['C-GESTURES'] }],
        ['Beckoning with one finger', { text: 'An open hand.', claimIds: ['C-GESTURES'] }],
        ['A raised voice', { text: 'A lower voice and a smile.', claimIds: ['C-KEEP-COOL', 'C-SMILE'] }],
        ['Public criticism', { text: 'A quiet word, one to one.', claimIds: ['C-KEEP-COOL', 'C-FACE-DEF'] }]
      ], caption: 'What to do instead' }
    ] },

    { type: 'text', heading: 'When something goes wrong', id: 'dispute', paras: [
      { text: 'Say the bill is wrong. Lower your voice rather than raising it. Use a polite form of address, *anh ơi*, *chị ơi*, and smile. Describe the problem as a misunderstanding, not an accusation: “I think there may be a mistake here.” Give the other person room to put it right without being shown up. If it is not resolved, ask quietly for a manager, away from the crowd.', claimIds: ['C-COOL-TIP', 'C-KEEP-COOL'] },
      { text: 'It will not always work, and you are not obliged to accept being cheated. But the calm route is usually faster, and it leaves both of you able to walk away with your face intact.', claimIds: ['C-COOL-TIP'] }
    ] },
    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually works', items: [
      { text: 'A low voice, a smile and patience.', claimIds: ['C-KEEP-COOL', 'C-SMILE'] },
      { text: 'Open questions instead of yes-or-no ones.', claimIds: ['C-INDIRECT'] },
      { text: 'Raising a problem quietly, one to one.', claimIds: ['C-FACE-DEF'] },
      { text: 'Pointing with an open hand.', claimIds: ['C-GESTURES'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Shouting, or scolding someone in front of others.', claimIds: ['C-KEEP-COOL'] },
      { text: 'Taking a “yes” as a firm agreement.', claimIds: ['C-INDIRECT'] },
      { text: 'Reading a nervous laugh as mockery.', claimIds: ['C-SMILE'] },
      { text: 'Touching heads or pointing feet.', claimIds: ['C-GESTURES'] }
    ] } },
    { type: 'note', text: 'The linguists quoted here are careful to call their findings starting points, not stereotypes. Hà Nội is a city of millions; expect every kind of temperament.', claimIds: ['C-FACE-CAUTION'] },
    { type: 'quiz', image: 'ev-oq-traffic', question: 'The fare has gone up', prompt: 'At the end of a ride, the driver asks for more than the price you agreed. What is most likely to work?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Raise your voice so people nearby notice', feedback: 'A public scene corners the driver: backing down now means losing face, so he is more likely to dig in.' },
      { label: 'Smile, show the agreed price and suggest a mistake', fit: true, feedback: 'Calling it a misunderstanding gives him a way to accept the agreed fare without being shown up.' },
      { label: 'Pay and post a complaint online later', feedback: 'You can, but a calm word on the spot often settles it.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
