/* Story: life on the pavement (st-pavement). Layout: photo essay.
   Researched 12 Nov 2026. Fines and plans changed several times in 2025–26; where outlets disagree the text says so,
   and drafts are called drafts. */
const today = '2026-11-12';

const sources = [
  { id: 'AFP-PAVEMENT', short: 'AFP via The Star', title: 'Hanoi curbs kerb culture with clampdown on pavement vendors — AFP, published by The Star', org: 'Agence France-Presse (republished by The Star, Malaysia)', url: 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/06/02/hanoi-curbs-kerb-culture-with-clampdown-on-pavement-vendors', type: 'press', checked: today,
    used: 'Pavements long tolerated as space for stalls, parking and drinkers on low stools; nearly 2,000 surveillance cameras; fines of up to 6 million đồng for businesses and 250,000 đồng for vendors; more than 3,000 fines since December 2025 according to state media; a flower seller moved to a vacant lot whose takings halved; earlier campaigns short-lived.',
    limits: 'A wire report of June 2026. Its vendor fine is a tenth of the figure VnExpress gives; it names no streets.' },
  { id: 'VNE-PLAN332', short: 'VnExpress International', title: 'Hanoi street vendors move off sidewalks as encroachment crackdown tightens — VnExpress International', org: 'VnExpress International, by Quynh Duong', url: 'https://e.vnexpress.net/news/life/trend/hanoi-street-vendors-move-off-sidewalks-as-encroachment-crackdown-tightens-5071179.html', type: 'press', checked: today,
    used: 'Plan 332 and its three stages; camera fines issued remotely; a vendor fine of 2.5 million đồng with equipment seized; about 1,100 streets with pavements and a 2025 survey finding over 90% of 120 streets encroached; where a bún riêu stall, an iced-tea stand and a xôi stall moved; an economist’s call for designated vending zones.',
    limits: 'A news feature of May 2026. Its vendor fine differs from AFP’s.' },
  { id: 'VNS-CAMPAIGN', short: 'Việt Nam News', title: 'Hà Nội to ramp up urban order campaign starting December 13 — Việt Nam News', org: 'Việt Nam News (Vietnam News Agency)', url: 'https://vietnamnews.vn/society/1731692/ha-noi-to-ramp-up-urban-order-campaign-starting-december-13.html', type: 'press', checked: today,
    used: 'The campaign’s start at 7 a.m. on 13 December 2025, its three phases to the end of March 2026, the aim of ending informal street markets and changing “outdated habits”.',
    limits: 'A report of the plan before it began (December 2025).' },
  { id: 'DBND-CAMERA', short: 'Đại biểu Nhân dân', title: 'Hà Nội: Camera AI vào cuộc “phạt nguội”, trật tự đô thị từng bước đi vào nề nếp — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân (newspaper of the National Assembly), by Nhật Trường', url: 'https://daibieunhandan.vn/ha-noi-camera-ai-vao-cuoc-phat-nguoi-trat-tu-do-thi-tung-buoc-di-vao-ne-nep-10404789.html', type: 'press', checked: today,
    used: 'Plan 332/KH-UBND of 10 December 2025; fines issued afterwards from camera images; about 848 cases in the first week, 269 found by cameras including AI cameras; pilot camera centres at ward police in Ô Chợ Dừa and Tây Hồ.',
    limits: 'A report in Vietnamese (January 2026) based on police figures.' },
  { id: 'TT-SIDEWALKS', short: 'Tuổi Trẻ News', title: 'Vietnam’s biggest cities push to reclaim sidewalks, drawing praise, nostalgia, and skepticism — Tuổi Trẻ News', org: 'Tuổi Trẻ News, by Bao Anh', url: 'https://news.tuoitre.vn/vietnams-biggest-cities-push-to-reclaim-sidewalks-drawing-praise-nostalgia-and-skepticism-103260130112305796.htm', type: 'press', checked: today,
    used: 'The pilot in the central wards of Hoàn Kiếm, Cửa Nam and Ba Đình; vendors asked to bring goods indoors; residents who found it strange at first but welcomed the walking space.',
    limits: 'A feature of January 2026 that also covers Hồ Chí Minh City.' },
  { id: 'VGP-PAVEMENTS', short: 'Viet Nam Government News', title: 'Ha Noi: Local pavements cleared in urban order crackdown — Government News', org: 'Viet Nam Government Portal (en.baochinhphu.vn), by Kim Loan', url: 'https://en.baochinhphu.vn/print/ha-noi-local-pavements-cleared-in-urban-order-crackdown-111260519102243791.htm', type: 'official', checked: today,
    used: 'Streets cleared (Hàng Mã, Hàng Ngang, Hàng Đào, Phùng Hưng, Tràng Tiền, Đinh Tiên Hoàng and around Hoàn Kiếm Lake); day and evening inspections; the government’s view that central pavements are noticeably less congested.',
    limits: 'The government’s own account (May 2026); its results are not independently measured.' },
  { id: 'VNS-FINES', short: 'Việt Nam News', title: 'Encroachment on roadways and pavements in Hà Nội to be fined up to $220 — Việt Nam News', org: 'Việt Nam News (Vietnam News Agency)', url: 'https://vietnamnews.vn/society/1782125/encroachment-on-roadways-and-pavements-in-ha-noi-to-be-fined-up-to-220.html', type: 'press', checked: today,
    used: 'A draft city resolution under the 2026 Law on the Capital: 4–6 million đồng for using roads or pavements for markets, food service or displays, 1.2–2 million for pavement parking, double for organisations, from next year if approved.',
    limits: 'Reports a draft (May 2026). We did not confirm whether it has been passed.' },
  { id: 'VCT-LEASE', short: 'Vietcetera', title: 'Hanoi Rolls Out $1.7 Sidewalk Leasing. But Is It Economical? — Vietcetera', org: 'Vietcetera, by Anh Trang', url: 'https://vietcetera.com/amp/en/hanoi-rolls-out-17-sidewalk-leasing-but-is-it-economical', type: 'press', checked: today,
    used: 'A draft pilot to lease pavement for trade at 20,000–45,000 đồng per square metre a month, on streets at least 3 m wide outside heritage zones, keeping 1.5 m clear and with the consent of half the households.',
    limits: 'Reports a draft (May 2026) with no adoption date.' },
  { id: 'VNE-2017', short: 'VnExpress International', title: 'Locals retake Hanoi’s sidewalks as cleanup campaign dies down — VnExpress International', org: 'VnExpress International, by Pham Du and Quang Chien', url: 'https://e.vnexpress.net/news/news/locals-retake-hanoi-s-sidewalks-as-cleanup-campaign-dies-down-3581672.html', type: 'press', checked: today,
    used: 'The 2017 campaign: begun in late February, a three-step plan from 10 March, and by May ramps, parked motorbikes and tea sellers back on the pavements.',
    limits: 'A news report of May 2017.' },
  { id: 'VNE-TRADA', short: 'VnExpress International', title: 'Hanoi sidewalk tea’s spirit of the streets — VnExpress International', org: 'VnExpress International, by Nguyen Chi', url: 'https://e.vnexpress.net/news/travel/places/hanoi-sidewalk-tea-s-spirit-of-the-streets-4762821.html', type: 'press', checked: today,
    used: 'A glass once cost as little as 500 đồng; ice arriving under French rule from a factory on Trần Nhật Duật Street, and Hanoians icing drinks by the early 1920s; stalls busy from morning until late; customers from all walks of life; the tea seller as the street’s source of news.',
    limits: 'A travel feature (June 2024) without references for its history.' },
  { id: 'VCT-TRADA', short: 'Vietcetera', title: 'Trà Đá: Vietnam’s Most Common Drink Tells A Collective Memory — Vietcetera', org: 'Vietcetera, by Tam My', url: 'https://vietcetera.com/en/tra-da-vietnams-most-common-drink-tells-a-collective-memory', type: 'press', checked: today,
    used: 'The stall as a kettle, a thermos and rows of low stools; the view that iced tea became a northern habit after 1975 and spread through Hà Nội in the 1990s.',
    limits: 'A magazine essay; its year of publication is not shown on the page. Its history differs from VnExpress’s.' },
  { id: 'VNN-TRADA', short: 'VietNamNet', title: 'Sidewalk iced tea culture in Hanoi — VietNamNet', org: 'VietNamNet (credited to Việt Nam News), by Le Ha', url: 'https://vietnamnet.vn/en/sidewalk-iced-tea-culture-in-hanoi-E160030.html', type: 'press', checked: today,
    used: 'What a stall holds (thermos, teapot, jar of sweets, tobacco pipe, plastic chairs); regulars who meet every morning; a seller at Ô Quan Chưởng for decades; tea shops as places to chat and share news.',
    limits: 'A feature of July 2016.' },
  { id: 'EIDSE-2016', short: 'Eidse, Turner & Oswin 2016', title: 'Contesting Street Spaces in a Socialist City: Itinerant Vending-Scapes and the Everyday Politics of Mobility in Hanoi, Vietnam — Annals of the American Association of Geographers 106(2): 340–349', org: 'Annals of the American Association of Geographers (peer-reviewed), N. Eidse, S. Turner and N. Oswin', url: 'https://doi.org/10.1080/00045608.2015.1117936', type: 'academic', checked: today,
    used: 'Eight months of fieldwork with 305 Hà Nội vendors, most of them women and most itinerant migrants from farming households; carrying-pole loads of up to 45 kg; the 1984 rule reserving pavements for walking and the 1991 campaign; moving on as a way to stay in the city.',
    limits: 'Fieldwork from the early 2010s; it describes vendors, not customers.' },
  { id: 'KURFURST-2023', short: 'Kurfürst 2023', title: 'Shared Streets: Choreographed Disorder in the Late Socialist City — Politics and Governance 11(2): 305–314', org: 'Politics and Governance (peer-reviewed, open access), S. Kurfürst', url: 'https://doi.org/10.17645/pag.v11i2.6466', type: 'academic', checked: today,
    used: 'Street trade, mostly by women, growing after Đổi Mới; Decision 02/2008 banning trade on 62 streets and at 48 historic sites from 1 July 2008; police taking stools and tables; vendors with shoulder poles and bicycles slipping into alleys; campaigns fading after a few months.',
    limits: 'Based on fieldwork from 2007 to 2018. Another study counts 63 streets under the 2008 ban.' }
];

const claims = [
  { id: 'C-TRADA', kind: 'custom', status: 'published', sourceIds: ['VNN-TRADA', 'VCT-TRADA'], text: 'A trà đá stall needs little more than a kettle or thermos, a teapot, glasses and rows of low plastic stools; many also keep a jar of sweets and a tobacco pipe for customers.' },
  { id: 'C-TRADA-SOCIAL', kind: 'custom', status: 'published', sourceIds: ['VNE-TRADA', 'VNN-TRADA'], text: 'Iced-tea stalls are busy from morning until late at night with customers from all walks of life; regulars meet there every day, and the stalls are known as places to chat and pass on news.' },
  { id: 'C-TRADA-HISTORY', kind: 'history', status: 'published', sourceIds: ['VNE-TRADA', 'VCT-TRADA'], text: 'Accounts of iced tea’s history differ: one says ice arrived under French rule from a factory on Trần Nhật Duật Street and Hanoians were icing drinks by the early 1920s; another says iced tea only became a northern habit after 1975 and spread through Hà Nội in the 1990s. A glass once cost as little as 500 đồng.' },
  { id: 'C-PAVE-VENDORS', kind: 'history', status: 'published', sourceIds: ['EIDSE-2016', 'KURFURST-2023'], text: 'Street trade in Hà Nội, mostly by women, grew after the Đổi Mới reforms of 1986. A study of 305 vendors found most were women and most of the mobile ones were migrants from farming households, carrying loads of up to 45 kg on a shoulder pole.' },
  { id: 'C-PAVE-RULES', kind: 'history', status: 'published', sourceIds: ['EIDSE-2016', 'KURFURST-2023', 'VNE-2017'], text: 'Hà Nội declared pavements for walking in 1984, ran an order campaign in 1991, banned street trade on 62 streets and at 48 historic sites from 1 July 2008 (another study says 63 streets), and ran another campaign in 2017. Each time stalls returned within months.' },
  { id: 'C-PAVEMENT-2026', kind: 'history', status: 'published', sourceIds: ['VNS-CAMPAIGN', 'DBND-CAMERA', 'VNE-PLAN332', 'AFP-PAVEMENT'], text: 'Hà Nội’s Plan 332/KH-UBND of 10 December 2025 began a campaign on 13 December to clear pavements in stages. From January 2026 fines were also issued from camera images, with about 848 cases handled in the first week, 269 of them found by cameras; AFP reported nearly 2,000 surveillance cameras.' },
  { id: 'C-PAVE-SURVEY', kind: 'history', status: 'published', sourceIds: ['VNE-PLAN332'], text: 'Hà Nội has about 1,100 streets with pavements; a 2025 survey of 120 of them found more than 90% occupied by business or parking.' },
  { id: 'C-PAVE-FINES', kind: 'history', status: 'published', sourceIds: ['AFP-PAVEMENT', 'VNE-PLAN332'], text: 'Businesses that block pavements can be fined up to 6 million đồng. Reports of the vendor fine differ: 250,000 đồng in AFP’s report, 2.5 million đồng with equipment seized in VnExpress’s. State media counted more than 3,000 fines between December 2025 and June 2026.' },
  { id: 'C-PAVE-MOVED', kind: 'history', status: 'published', sourceIds: ['VNE-PLAN332', 'AFP-PAVEMENT'], text: 'Vendors reported in 2026 moved a bún riêu stall into a one-metre alley, where sales fell to about a third; an iced-tea stand onto a house’s porch; a xôi stall into a rented shop at double the rent; and a flower seller to a vacant lot where takings roughly halved.' },
  { id: 'C-PAVE-CENTRE', kind: 'history', status: 'published', sourceIds: ['VGP-PAVEMENTS', 'TT-SIDEWALKS'], text: 'Enforcement began in the central wards of Hoàn Kiếm, Cửa Nam and Ba Đình, including Hàng Mã, Hàng Ngang, Hàng Đào, Tràng Tiền and the streets around Hoàn Kiếm Lake. The government says central pavements are noticeably less congested; residents interviewed found the change strange at first and welcomed the walking space.' },
  { id: 'C-PAVE-NEXT', kind: 'history', status: 'published', sourceIds: ['VNS-FINES', 'VCT-LEASE', 'VNE-PLAN332'], text: 'Drafts discussed in May 2026 would raise fines for using pavements for markets or food to 4–6 million đồng from 2027, and would let traders lease pavement for 20,000–45,000 đồng per square metre a month on wide streets, keeping 1.5 metres clear. An economist proposed designated vending zones.' },
  { id: 'C-PAVE-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: sit where the owner points, ask the price or pay what others pay, and if a stall has moved into an alley or a doorway, follow it there.' }
];

const story = {
  id: 'st-pavement',
  layout: 'essay',
  title: 'Life on the pavement',
  dek: 'A teapot, some glasses, a few plastic stools: the city’s smallest meeting place, and the long argument over who the pavement is for.',
  place: 'Vỉa hè, Hà Nội',
  imageId: 'ev-tra-da',
  hero: { image: 'ev-tra-da' },
  appliesTo: 'Hà Nội’s pavements, especially in the central wards where the 2025–26 campaign began.',
  varies: 'Rules on pavement use are changing, and enforcement differs from street to street. Fines and plans here are as reported up to November 2026; drafts are marked as drafts.',
  sections: [
    { text: 'A trà đá stall needs little more than a kettle, a teapot, glasses and a few low plastic stools on the pavement.', claimIds: ['C-TRADA'] },
    { heading: 'Who sits there', text: 'Customers come from every walk of life, from morning until late, to drink, watch the street and pass on news.', claimIds: ['C-TRADA-SOCIAL'] },
    { heading: 'Pavements are changing', text: 'Since December 2025 Hà Nội has been clearing pavements, with fines and surveillance cameras, so stalls are fewer in the centre.', claimIds: ['C-PAVEMENT-2026'] }
  ],
  blocks: [
    { type: 'essay', label: 'Photo essay: the pavement', steps: [
      { image: 'ev-tra-da-wide', label: 'The stall', heading: 'A kettle and some stools', paras: [
        { text: 'An iced-tea stall, [[tra-da|trà đá]], is the cheapest seat in the city. A kettle or a thermos, a teapot, a tray of glasses, a jar of sweets, and a stack of plastic stools a hand’s width high. That is the whole business.', claimIds: ['C-TRADA'] }
      ] },
      { image: 'ev-oq-pavement', label: 'The street', heading: 'Everyone’s pavement', paras: [
        { text: 'On most Hà Nội streets the pavement is shop floor, car park, kitchen and dining room before it is a footpath. A survey of 120 streets in 2025 found more than nine in ten taken up by business or parking.', claimIds: ['C-PAVE-SURVEY'] }
      ] },
      { image: 'ev-fruit-pole', label: 'The vendors', heading: 'A shop on a shoulder pole', paras: [
        { text: 'Many of the sellers walk in from the countryside. Researchers who interviewed 305 vendors found most were women, and the mobile ones carried up to 45 kilos on a bamboo pole.', claimIds: ['C-PAVE-VENDORS'] }
      ] },
      { image: 'ev-ceramics-bike', label: 'The rules', heading: 'And the city wants it back', paras: [
        { text: 'Since December 2025 Hà Nội has been clearing its pavements again, this time with cameras that send the fine afterwards.', claimIds: ['C-PAVEMENT-2026'] }
      ] }
    ] },

    { type: 'text', lede: true, heading: 'The smallest meeting place', paras: [
      { text: 'Sit down on a stool at a trà đá stall and you are about a foot off the ground, knees high, a glass of pale green tea with a lump of ice in your hand. The stall owner, usually a woman, knows the regulars by name. Behind you a shop is open; in front of you motorbikes slide past close enough to touch. Nobody minds how long you stay.', claimIds: ['C-TRADA'] },
      { text: 'The stalls are busy from early morning until late at night, and the customers are anyone at all: motorbike-taxi drivers between fares, office workers after lunch, students, retired men who meet at the same corner every morning. Writers on the city keep coming back to the same point. If you want to know what is happening in a street, ask the woman who sells the tea.', claimIds: ['C-TRADA-SOCIAL'] }
    ] },
    { type: 'pair', items: [
      { image: 'ev-tra-da', caption: 'Stools under a tree on Tú Mỡ Street, March 2026.' },
      { image: 'ev-oq-flowers', caption: 'A flower seller’s bicycle in the Old Quarter.' }
    ] },
    { type: 'facts', title: 'What is on the tray', items: [
      { term: 'Trà đá', vi: true, text: 'Iced green tea, poured from a pot of cheap local tea over ice. Hot tea, *trà nóng*, in winter.' },
      { term: 'Hướng dương', vi: true, text: 'Sunflower seeds, cracked between the teeth while you talk.' },
      { term: 'Kẹo lạc', vi: true, text: 'Peanut brittle from the jar on the tray.' },
      { term: 'Điếu cày', vi: true, text: 'The long bamboo water pipe some stalls keep for customers.' }
    ], claimIds: ['C-TRADA'] },

    { type: 'text', heading: 'Where the ice came from', id: 'history', paras: [
      { text: 'Ice is newer than tea. One history traces it to an ice factory the French set up on Trần Nhật Duật Street to supply their troops, hotels and bars, and says Hanoians were putting ice in their drinks by the early 1920s. Another says iced tea did not become a northern habit until after 1975, and spread through Hà Nội in the 1990s. Both can be partly true: ice came early, the cheap glass on every corner came later. A glass once cost as little as 500 đồng.', claimIds: ['C-TRADA-HISTORY'] }
    ] },

    { type: 'text', heading: 'Who sells on the pavement', id: 'vendors', paras: [
      { text: 'The tea stall is the fixed end of a much larger trade. Since the [[doimoi|Đổi Mới]] reforms of 1986 opened the economy, street selling, done mostly by women, has grown into one of the ways the city feeds itself. Fruit, flowers, bread, sticky rice and household goods move through the streets on bicycles and shoulder poles.', claimIds: ['C-PAVE-VENDORS'] },
      { text: 'Geographers who spent eight months with 305 vendors found that most of the mobile sellers were migrants from farming households who came to the city for the season, while most of the fixed stalls belonged to people who lived on the street. A full shoulder-pole load could weigh 45 kilos. For the migrants, keeping on the move was not just a way to find customers; it was a way to stay in the city at all.', claimIds: ['C-PAVE-VENDORS'] }
    ] },
    { type: 'figure', image: 'ev-street-market', size: 'wide', caption: 'Fruit sellers along a wet street beside a school wall.' },
    { type: 'quote', text: 'Without vendors, I don’t think Hanoi is Hanoi anymore.', by: 'Nguyễn Thị Hoàn, flower seller, to AFP (2026)', claimIds: ['C-PAVE-MOVED'] },

    { type: 'timeline', heading: 'Forty years of clearing the pavement', label: 'Timeline of Hà Nội’s pavement rules', items: [
      { year: '1984', title: 'Pavements are for walking', text: 'The city declares pavements for pedestrians, with a fee for any other use.', claimIds: ['C-PAVE-RULES'] },
      { year: '1991', title: 'An order campaign', text: 'The first of many drives to clear the streets.', claimIds: ['C-PAVE-RULES'] },
      { year: '2008', title: 'Banned streets', text: 'From 1 July, street trade is banned on 62 streets and at 48 historic sites. Police take stools and tables; vendors slip into the alleys and come back.', claimIds: ['C-PAVE-RULES'] },
      { year: '2017', title: 'A spring campaign', text: 'A three-step plan begins on 10 March. By May, ramps, parked motorbikes and tea sellers are back.', claimIds: ['C-PAVE-RULES'], image: 'ev-fruit-bike', caption: 'A fruit seller’s bicycle.' },
      { era: 'The current campaign' },
      { year: 'Dec 2025', title: 'Plan 332', text: 'The city’s plan, issued on 10 December, starts on the 13th: first persuasion, then inspection, then patrols.', claimIds: ['C-PAVEMENT-2026'] },
      { year: 'Jan 2026', title: 'Fines by camera', text: 'Fines begin to be issued afterwards from camera images, with pilot camera centres at ward police stations.', claimIds: ['C-PAVEMENT-2026'] },
      { year: 'May 2026', title: 'Drafts for what comes next', text: 'Higher fines from 2027 and a scheme to lease pavement back to traders are both put forward as drafts.', claimIds: ['C-PAVE-NEXT'] }
    ] },

    { type: 'text', heading: 'The 2025 campaign', id: 'campaign', paras: [
      { text: 'The current campaign is the most organised yet. Plan 332, issued by the city on 10 December 2025, began at seven in the morning three days later and ran in stages: a month of surveys and voluntary clearing, then inspection and fines across the city, then patrols to stop the stalls returning. Its stated aim was to end informal street markets and change what officials called outdated habits.', claimIds: ['C-PAVEMENT-2026'] },
      { text: 'What made it different was the camera. From January 2026 fines could be issued afterwards from images, without a police officer on the street; in the first week, police handled about 848 cases, a third of them found by cameras. AFP counted nearly 2,000 surveillance cameras in use. It started in the centre, in the wards of Hoàn Kiếm, Cửa Nam and Ba Đình: Hàng Mã, Hàng Đào, Tràng Tiền, the streets around the lake.', claimIds: ['C-PAVEMENT-2026', 'C-PAVE-CENTRE'] },
      { text: 'The fines are not small. A business that blocks the pavement can be fined up to 6 million đồng. For vendors, the reports disagree by a factor of ten: AFP gave 250,000 đồng, VnExpress 2.5 million with the goods taken. By June, state media had counted more than 3,000 fines.', claimIds: ['C-PAVE-FINES'] }
    ] },
    { type: 'note', text: 'Two newspapers, two vendor fines: 250,000 đồng and 2.5 million. They may describe different offences, or one may have an extra zero. We give both rather than guess.', claimIds: ['C-PAVE-FINES'] },

    { type: 'text', heading: 'Where the stalls went', id: 'moved', paras: [
      { text: 'Stalls did not vanish; they moved a few metres. Reporters followed them. A bún riêu stall on Hàng Cháo retreated into an alley a metre wide, and its owner now sits at the mouth of it calling customers in; her sales fell to about a third. An iced-tea seller moved onto a neighbour’s porch. A sticky-rice seller rented a shop and saw her rent double. A flower seller who had worked the same paving slab for ten years was moved to an empty lot and lost about half her takings.', claimIds: ['C-PAVE-MOVED'] },
      { text: 'Opinion is divided, and not along the lines you might expect. The government reports central pavements noticeably less crowded and fewer repeat offences. Residents interviewed in the Old Quarter said moving tables indoors felt strange at first, but many liked having room to walk. Café owners point out that a good share of their customers want to sit outside.', claimIds: ['C-PAVE-CENTRE'] }
    ] },
    { type: 'figure', image: 'ev-oq-traffic', size: 'bleed', caption: 'A junction in the Old Quarter: parked scooters fill the pavement in front of the shops.' },

    { type: 'text', heading: 'What comes next', id: 'next', paras: [
      { text: 'Every campaign before this one faded within months. Whether this one lasts may depend on what the city offers in return. In May 2026 two drafts were on the table: one would raise fines for using pavements to sell food or goods to 4–6 million đồng from 2027; the other would let traders lease pavement back, for 20,000–45,000 đồng per square metre a month, on streets wide enough to keep a metre and a half clear and only where half the households agree. An economist quoted by VnExpress suggested trying designated vending zones. None of these was final when we checked.', claimIds: ['C-PAVE-NEXT', 'C-PAVE-RULES'] }
    ] },

    { type: 'text', heading: 'If you sit down', id: 'visit', paras: [
      { text: 'Pull up a stool where the owner points, order *một trà đá*, and pay what the people next to you pay; it is rarely more than the price of a bottle of water. If the stall you remember has gone from the pavement, look in the nearest alley or doorway. It may have moved, not closed.', claimIds: ['C-PAVE-TIP'] },
      { text: 'If you want to photograph the people at a stall, ask first; our story [Asking before a photo](story:st-photo-ask) explains how.', claimIds: ['C-PAVE-TIP'] }
    ] },
    { type: 'gallery', heading: 'More from the pavement', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'ev-fruit-bike', caption: 'Fruit on a bicycle, ready to move.' },
      { image: 'ev-ceramics-bike', caption: 'A motorbike loaded with ceramics in the Old Quarter.' },
      { image: 'ev-lake-vendor', caption: 'A vendor by Hoàn Kiếm Lake.' },
      { image: 'ev-dx-night', caption: 'Selling from the street outside Đồng Xuân Market at night.' },
      { image: 'ev-oq-flowers', caption: 'Flowers in the Old Quarter.' }
    ] },
    { type: 'quiz', image: 'ev-tra-da', question: 'The stall has gone. What now?', prompt: 'The trà đá stall you sat at last year is not on the pavement any more. What is the most likely explanation?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'It closed for good', feedback: 'Possible, but reporters who followed vendors in 2026 found most had moved a few metres rather than stopped.' },
      { label: 'It moved into an alley or a doorway', fit: true, feedback: 'That is what most did: into alleys, onto porches, into rented shops. Look nearby.' },
      { label: 'Tea stalls are banned in Hà Nội', feedback: 'There is no ban on tea. The campaign is about blocking the pavement, and stalls that leave room to walk or move indoors carry on.' }
    ] }
  ]
};

const glossary = [
  { id: 'tra-da', vi: 'trà đá', say: 'chah dah', en: 'Iced tea: cheap green tea over ice, sold from pavement stalls.' },
  { id: 'doimoi', vi: 'Đổi Mới', say: 'doy moy', en: '“Renovation”: the economic reforms begun in 1986 that opened Vietnam to private trade.' }
];

module.exports = { sources, claims, glossary, stories: [story] };
