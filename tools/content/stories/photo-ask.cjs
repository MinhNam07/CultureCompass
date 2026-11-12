/* Story: asking before a photo (st-photo-ask). Layout: guide.
   Researched 12 Nov 2026. Law from the Civil Code 2015 (unofficial translation) and decrees of 2025; site rules as published.
   Not legal advice. Commercial “Vietnam tourism” sites that are not the national authority were not used. */
const today = '2026-11-12';

const sources = [
  { id: 'VN-CIVIL-2015', short: 'Civil Code 2015', title: 'Civil Code No. 91/2015/QH13, Articles 32 and 38 (unofficial English translation)', org: 'National Assembly of Vietnam (translation hosted by economica.vn)', url: 'https://economica.vn/Content/files/LAW%20%26%20REG/91_2015_QH13%20Civil%20Code.pdf', type: 'official', checked: today,
    used: 'Article 32: a person’s rights over their image, consent needed to use it, payment for commercial use, the exceptions for public interest and public events, and court remedies; Article 38 on private life.',
    limits: 'An unofficial translation “for reference only”. The article governs using an image, such as publishing it, not taking it.' },
  { id: 'VN-DEC218', short: 'Decree 218/2025', title: 'Decree 218/2025/NĐ-CP on penalties for administrative violations in national defence (Chapter 2, Sections 7 and 9)', org: 'Government of Vietnam (via hethongphapluat.com)', url: 'https://hethongphapluat.com/decree-no-218-2025-nd-cp-dated-august-05-2025-on-penalties-for-administrative-violations-regarding-national-defense-and-cipher-activities/chuong-2/muc-7', type: 'official', checked: today,
    used: 'Fines of 20–30 million đồng and confiscation for filming or photographing in the restricted and protected zones of the Hồ Chí Minh Mausoleum site; 5–8 million đồng for photographing in a military prohibited area, and 30–50 million in special-category zones.',
    limits: 'Read on a third-party legal database (Sections 7 and 9).' },
  { id: 'TCTA-LANG', short: 'Tạp chí Tòa án nhân dân', title: 'Họp báo công bố Pháp lệnh Quản lý, bảo vệ khu di tích lăng Chủ tịch Hồ Chí Minh — Tạp chí Tòa án nhân dân', org: 'Tạp chí Tòa án nhân dân (journal of the People’s Courts)', url: 'https://tapchitoaan.vn/index.php/uu-tien-tuyen-chon-nhan-tai-vao-luc-luong-quan-ly-bao-ve-lang-chu-tich-ho-chi-minh13170.html', type: 'press', checked: today,
    used: 'The ordinance on managing and protecting the Mausoleum relic site, adopted on 13 March 2025 and in force from 19 May 2025.',
    limits: 'A report of the press conference (April 2025).' },
  { id: 'VNEC-DRONE', short: 'VnEconomy', title: 'Ban hành quy định quản lý tàu bay không người lái và phương tiện bay khác — VnEconomy', org: 'VnEconomy, by T. Tuấn Khang', url: 'https://vneconomy.vn/ban-hanh-quy-dinh-quan-ly-tau-bay-khong-nguoi-lai-va-phuong-tien-bay-khac.htm', type: 'press', checked: today,
    used: 'Decree 288/2025 on drones, in force from 5 November 2025, requiring a licence to fly aircraft of 0.25 kg and over.',
    limits: 'A news summary (November 2025); we did not confirm which older rules it replaces.' },
  { id: 'DTI-DRONE', short: 'Dân Trí International', title: 'Illegal drone flights face fines of up to VND 40 million — DTiNews', org: 'Dân Trí International (citing VOV)', url: 'https://dtinews.dantri.com.vn/print/20260623143216830.htm', type: 'press', checked: today,
    used: 'Fines under Decree 282/2025 from 15 December 2025: 8–9 million đồng for aerial photos or video without permission, 2–3 million for flying without registration or a permit, up to 40 million for endangering aviation; Hà Nội police warning against flights near military and restricted sites.',
    limits: 'A news report (June 2026).' },
  { id: 'HTTL-RULES', short: 'Imperial Citadel of Thăng Long', title: 'Visiting regulations — Imperial Citadel of Thang Long', org: 'Thăng Long – Hà Nội Heritage Conservation Centre (hoangthanhthanglong.vn)', url: 'https://hoangthanhthanglong.vn/en/visiting-regulations/', type: 'official', checked: today,
    used: 'Prior permission needed to make films or visual recordings at the site; no drones; neat, polite dress.',
    limits: 'Rules dated 2013; nothing on ordinary still photos.' },
  { id: 'VOV-CHUA', short: 'VOV', title: 'Những việc nên và không nên làm khi ghé thăm một ngôi chùa Phật giáo — VOV', org: 'Voice of Vietnam (VOV), by Hà Phương (adapted from Business Insider)', url: 'https://vov.vn/du-lich/nhung-viec-nen-va-khong-nen-lam-khi-ghe-tham-mot-ngoi-chua-phat-giao-457262.vov', type: 'press', checked: today,
    used: 'Temples as places of worship; no flash where signs ask for no photos; photographing the Buddha often seen as disrespectful, and selfies with statues as controversial.',
    limits: 'A general guide to Buddhist temples (December 2015), adapted from an English article.' },
  { id: 'DTI-VENDORS', short: 'Dân Trí International', title: 'Hanoi punishes street vendors for harassing foreigners — DTiNews', org: 'Dân Trí International (with Thanh Niên)', url: 'https://dtinews.dantri.com.vn/vietnam-today/hanoi-punishes-street-vendors-for-harassing-foreigners-20120912113404497.htm', type: 'press', checked: today,
    used: 'Hoàn Kiếm district acting against nearly 140 vendors in 2012 who put their shoulder poles on tourists for photos and then demanded money, many of them repeat offenders.',
    limits: 'A report from 2012; we found no recent figures, so this is described as a long-reported practice.' }
];

const claims = [
  { id: 'C-PHOTO-ASK', kind: 'custom', status: 'published', sourceIds: ['VNAT-ETQ'], text: 'Ask before photographing people. Most people will be happy to have their photo taken, and asking first respects their privacy and can start a conversation.' },
  { id: 'C-PHOTO-LAW', kind: 'law', status: 'published', sourceIds: ['VN-CIVIL-2015'], text: 'Vietnam’s Civil Code gives everyone rights over their image: using a person’s image needs their consent, and commercial use must be paid for unless agreed otherwise. Consent is not needed for use in the public interest or for images from public events such as performances or sports, as long as the use does not harm the person’s dignity. A person can ask a court to stop the use and claim compensation.' },
  { id: 'C-PHOTO-PRIVACY', kind: 'law', status: 'published', sourceIds: ['VN-CIVIL-2015'], text: 'Article 38 of the Civil Code protects private life: collecting, storing, using or publishing information about a person’s private life needs their consent, unless the law says otherwise.' },
  { id: 'C-PHOTO-MAUSOLEUM', kind: 'law', status: 'published', sourceIds: ['VN-DEC218', 'TCTA-LANG'], text: 'An ordinance protecting the Hồ Chí Minh Mausoleum site has been in force since 19 May 2025. Filming or photographing in its restricted and protected zones can be fined 20–30 million đồng, and the camera or phone confiscated.' },
  { id: 'C-PHOTO-MILITARY', kind: 'law', status: 'published', sourceIds: ['VN-DEC218'], text: 'Photographing, filming or sketching in a military prohibited area without permission can be fined 5–8 million đồng, or 30–50 million in special-category zones, with the equipment confiscated.' },
  { id: 'C-PHOTO-DRONE', kind: 'law', status: 'published', sourceIds: ['VNEC-DRONE', 'DTI-DRONE', 'HTTL-RULES'], text: 'Since November 2025, flying a drone of 0.25 kg or more needs a licence. Taking aerial photos or video without permission can be fined 8–9 million đồng, and Hà Nội police warn against flying near military and restricted sites. The Imperial Citadel does not allow drones at all.' },
  { id: 'C-PHOTO-CITADEL', kind: 'siteRule', status: 'published', sourceIds: ['HTTL-RULES'], text: 'The Imperial Citadel of Thăng Long asks anyone who wants to make films or visual recordings at the site to get permission from its management first, and asks visitors to dress neatly.' },
  { id: 'C-VM-PHOTO-UNKNOWN', kind: 'siteRule', status: 'published', sourceIds: ['VMQTG-RULES'], text: 'The site’s published rules do not mention photography or incense, so ask staff or look for signs on the day.' },
  { id: 'C-PHOTO-TEMPLE', kind: 'custom', status: 'published', sourceIds: ['VOV-CHUA', 'VNAT-ETQ'], text: 'Temples and pagodas are places of worship: dress modestly, take off shoes and hats where asked, and do not use flash where signs ask for no photos. Photographing Buddha statues, or posing for selfies with them, can be seen as disrespectful.' },
  { id: 'C-PHOTO-VENDOR', kind: 'history', status: 'published', sourceIds: ['DTI-VENDORS'], text: 'Vendors putting their shoulder poles and baskets on tourists for a photo and then asking for money is a long-reported practice in central Hà Nội; in 2012 Hoàn Kiếm district acted against nearly 140 vendors for it.' },
  { id: 'C-PHOTO-HEAD', kind: 'custom', status: 'published', sourceIds: ['CA-ETQ'], text: 'Touching someone on the top of the head, especially a baby or child, is rude.' },
  { id: 'C-PHOTO-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: ask with a gesture and a smile, show the picture afterwards, delete it if someone asks, and agree any price before you pose with a vendor’s goods.' }
];

const story = {
  id: 'st-photo-ask',
  layout: 'guide',
  title: 'Asking before a photo',
  dek: 'A vendor’s bicycle, a temple courtyard, a pair of friends in áo dài: Hà Nội is easy to photograph. The people in the picture get a say, and a few places have rules of their own.',
  place: 'Streets and sites of Hà Nội',
  imageId: 'ev-oq-aodai',
  hero: { image: 'ev-oq-aodai' },
  appliesTo: 'Taking photos of people and places in Hà Nội. The laws apply across Vietnam.',
  varies: 'Each person decides for themself, and each site may post its own rules. Laws and fines are as reported in 2025–26; this is not legal advice.',
  sections: [
    { text: 'Ask before photographing people; a calm, friendly request usually works.', claimIds: ['C-PHOTO-ASK', 'C-KEEP-COOL'] },
    { heading: 'At heritage sites', text: 'Some sites publish no photo rules, so ask staff or look for signs.', claimIds: ['C-VM-PHOTO-UNKNOWN'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Hà Nội is easy to photograph: a woman in a conical hat with a bicycle full of flowers, a red bridge over green water, friends in [[aodai|áo dài]] posing in an Old Quarter lane. It is tempting to raise the camera and shoot.', editorial: true },
      { text: 'Ask first. The national tourism authority puts it plainly, and adds the good news: most people will be happy to have their picture taken, and asking often starts a conversation. This guide covers how to ask, what the law says, and the few places where the answer is always no.', claimIds: ['C-PHOTO-ASK'] }
    ] },

    { type: 'steps', heading: 'Taking a portrait, step by step', id: 'steps', items: [
      { title: 'Ask, even without words', paras: [
        { text: 'Catch the person’s eye, smile, lift the camera slightly and tilt your head: the question is clear in any language. If you can, say it: *Tôi chụp ảnh bạn được không?* A nod means yes; a wave of the hand or a turned shoulder means no, and that is the end of it.', claimIds: ['C-PHOTO-ASK', 'C-PHOTO-TIP'] }
      ], phraseIds: ['ph-chupanh-nguoi'] },
      { title: 'Take your time, then show them', paras: [
        { text: 'Once someone agrees, there is no need to rush. Afterwards, turn the screen round and show them. People often laugh, point, ask for another. If they ask you to delete it, delete it while they watch.', claimIds: ['C-PHOTO-TIP'] }
      ], image: 'ev-fruit-pole', caption: 'A fruit seller with her baskets.' },
      { title: 'Be careful with children', paras: [
        { text: 'Ask a parent before photographing a child, and don’t pat a child on the head to say thank you: touching the top of the head, especially a child’s, is considered rude.', claimIds: ['C-PHOTO-HEAD', 'C-PHOTO-ASK'] }
      ] },
      { title: 'Agree a price before you pose', paras: [
        { text: 'In the streets around Hoàn Kiếm Lake, a vendor may offer to put her shoulder pole and baskets on you for a photo. It is a long-reported routine, and money is usually expected afterwards; in 2012 the district acted against nearly 140 vendors who did it without asking. If you want the picture, agree a price first. If you don’t, say no with a smile and walk on.', claimIds: ['C-PHOTO-VENDOR', 'C-BARGAIN-WALK'] }
      ], image: 'ev-lake-vendor', caption: 'A vendor by Hoàn Kiếm Lake.' },
      { title: 'Think before you post', paras: [
        { text: 'Taking a photo in a public place is one thing; publishing it is another. Under Vietnam’s Civil Code, using someone’s image needs their consent, and using it commercially means paying them unless you agree otherwise. Photos of public events, such as performances and sports, are an exception, as long as the use does not harm the person’s dignity.', claimIds: ['C-PHOTO-LAW'] }
      ] }
    ] },

    { type: 'text', heading: 'What the law does and does not say', id: 'law', paras: [
      { text: 'Vietnam’s Civil Code of 2015 gives every person rights over their own image. The key word is *use*: the article is about publishing a picture, putting it in an advertisement or selling it, not about pressing the shutter in a public street. Using a person’s image needs their consent; using it to make money means paying them, unless you both agree otherwise.', claimIds: ['C-PHOTO-LAW'] },
      { text: 'There are two exceptions. Images used in the national or public interest need no consent, and nor do images taken at public activities such as conferences, sports matches and performances, provided the use does not damage the person’s honour, dignity or reputation. A separate article protects private life: collecting or publishing information about someone’s private life needs their consent. Anyone whose image is misused can ask a court to order it taken down or destroyed and to award compensation.', claimIds: ['C-PHOTO-LAW', 'C-PHOTO-PRIVACY'] },
      { text: 'In practice: a street scene for your own album is fine; a close portrait you post online or sell is where consent matters most.', claimIds: ['C-PHOTO-TIP'] }
    ] },

    { type: 'text', heading: 'Temples and pagodas', id: 'temples', paras: [
      { text: 'A temple is a place of worship before it is a sight. Dress modestly, take off your hat and, where asked, your shoes. Look for signs before you photograph inside, and never use flash where they ask for no photos. Many Buddhists find photos of Buddha statues, and especially selfies with them, disrespectful.', claimIds: ['C-PHOTO-TEMPLE'] },
      { text: 'People who are praying are not part of the scenery. Ask, or wait until they have finished.', claimIds: ['C-PHOTO-ASK', 'C-PHOTO-TIP'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-ngoc-son-gate', caption: 'Inside Ngọc Sơn Temple: ask before photographing people at prayer.' },
      { image: 'ev-huc-bridge', caption: 'The bridge to the temple, a favourite spot for photos.' }
    ] },

    { type: 'tabs', heading: 'Places with their own rules', intro: 'Most of the city is open to your camera. These places have published rules or laws that say otherwise.', label: 'Photo rules at particular places', tabs: [
      { label: 'Sites', columns: ['Place', 'Photos', 'What the rules say'], rows: [
        ['Hồ Chí Minh Mausoleum', { match: 'no', text: 'Not in restricted zones' }, { text: 'Fines of 20–30 million đồng and confiscation for filming or photographing in restricted and protected zones.', claimIds: ['C-PHOTO-MAUSOLEUM'] }],
        ['Military areas', { match: 'no', text: 'Not without permission' }, { text: '5–8 million đồng, or 30–50 million in special zones; equipment confiscated.', claimIds: ['C-PHOTO-MILITARY'] }],
        ['Imperial Citadel of Thăng Long', { match: 'part', text: 'Visitors’ photos; filming needs permission' }, { text: 'Permission needed for films and visual recordings; no drones.', claimIds: ['C-PHOTO-CITADEL'] }],
        ['Temple of Literature', { match: 'part', text: 'Not mentioned' }, { text: 'Its published rules say nothing about photos; ask staff or look for signs.', claimIds: ['C-VM-PHOTO-UNKNOWN'] }],
        ['Temples and pagodas', { match: 'part', text: 'Check signs inside' }, { text: 'No flash where signs ask; be careful with statues and people at prayer.', claimIds: ['C-PHOTO-TEMPLE'] }]
      ], caption: 'Photo rules at particular places in Hà Nội' },
      { label: 'Drones', columns: ['Situation', 'Allowed?', 'What the rules say'], rows: [
        ['Any drone of 0.25 kg or more', { match: 'part', text: 'With a licence' }, { text: 'A licence has been required since November 2025.', claimIds: ['C-PHOTO-DRONE'] }],
        ['Aerial photos or video', { match: 'part', text: 'With permission' }, { text: 'Without permission: 8–9 million đồng.', claimIds: ['C-PHOTO-DRONE'] }],
        ['Near military or restricted sites', { match: 'no', text: 'No' }, { text: 'Police warn against it; the Imperial Citadel bans drones outright.', claimIds: ['C-PHOTO-DRONE'] }]
      ], caption: 'Drone rules in Vietnam' }
    ] },
    { type: 'note', text: 'Guides disagree about whether you may carry a switched-off phone into the Mausoleum or must leave it at the check-in. Follow what the security staff tell you on the day.', claimIds: ['C-PHOTO-MAUSOLEUM'] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually welcome', items: [
      { text: 'Asking first, with words or a gesture.', claimIds: ['C-PHOTO-ASK'] },
      { text: 'Showing people the photo afterwards.', claimIds: ['C-PHOTO-TIP'] },
      { text: 'Agreeing a price before posing with a vendor’s goods.', claimIds: ['C-PHOTO-VENDOR'] },
      { text: 'Looking for signs before photographing inside a temple.', claimIds: ['C-PHOTO-TEMPLE'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Photographing people at prayer, or Buddha statues up close.', claimIds: ['C-PHOTO-TEMPLE'] },
      { text: 'Posting or selling a portrait without the person’s consent.', claimIds: ['C-PHOTO-LAW'] },
      { text: 'Any camera near the Mausoleum’s restricted zones or a military site.', claimIds: ['C-PHOTO-MAUSOLEUM', 'C-PHOTO-MILITARY'] },
      { text: 'Flying a drone without a licence and permission.', claimIds: ['C-PHOTO-DRONE'] }
    ] } },
    { type: 'phrases', heading: 'Words to ask with', ids: ['ph-chupanh-nguoi', 'ph-chupanh-noi', 'ph-camon'] },
    { type: 'gallery', heading: 'Photographed with permission', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'ev-oq-aodai', caption: 'Friends in áo dài in the Old Quarter.' },
      { image: 'ev-oq-flowers', caption: 'A flower seller’s bicycle.' },
      { image: 'ev-fruit-bike', caption: 'Fruit on a bicycle.' },
      { image: 'ev-ceramics-bike', caption: 'A motorbike loaded with ceramics.' }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Tôi chụp ảnh bạn được không?', vi: true, text: 'May I take your photo?' },
      { term: 'No means no', text: 'A wave of the hand is an answer.' },
      { term: 'Vendors', text: 'Agree a price before you pose.' },
      { term: 'Posting', text: 'Needs the person’s consent.' },
      { term: 'Mausoleum and military sites', text: 'Cameras away.' }
    ] },
    { type: 'quiz', image: 'ev-lake-vendor', question: 'A vendor offers you her baskets', prompt: 'By the lake, a fruit vendor lifts her shoulder pole towards you and gestures for a photo. You hadn’t planned on one. What do you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Pose, then see what happens', feedback: 'Payment is usually expected afterwards, and an unagreed price is where trouble starts.' },
      { label: 'Agree a price first, or smile and say no', fit: true, feedback: 'Either is fine. *Không, cảm ơn* and a smile end it politely.' },
      { label: 'Take her photo instead without asking', feedback: 'Ask first, always. She may well say yes.' }
    ] }
  ]
};

const glossary = [
  { id: 'aodai', vi: 'áo dài', say: 'ow zai (north) / ow yai (south)', en: 'The long tunic worn over trousers, Vietnam’s best-known traditional dress.' }
];

module.exports = { sources, claims, glossary, stories: [story] };
