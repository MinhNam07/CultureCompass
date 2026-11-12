/* Story: a bowl of phở (st-pho). Layout: timeline.
   Researched 12 Nov 2026. Origins are disputed; every theory is labelled as one. Dates that sources disagree on are given as ranges or both. */
const today = '2026-11-12';

const sources = [
  { id: 'ND-PHO-2024', short: 'Nhân Dân', title: 'Phở — Tinh hoa ẩm thực Việt — Nhân Dân', org: 'Nhân Dân (special report), by Tuyết Loan', url: 'https://special.nhandan.vn/dau-an-van-hoa-Pho-Viet/index.html', type: 'press', checked: today,
    used: 'That phở’s origin is still unsettled; the four theories (bún xáo trâu, pot-au-feu, Vân Cù village, Cantonese ngưu nhục phấn) and the paper’s doubts about two of them; Henri Oger’s drawings of 1908–09 showing a phở cart; a 1933 dictionary entry for phở chín and phở tái; phở in the Shorter Oxford English Dictionary (2007).',
    limits: 'A long feature (March 2024). Its own dates for phở gà differ from other sources.' },
  { id: 'ND-PHO-HERITAGE', short: 'Nhân Dân', title: 'Phở Hà Nội trở thành Di sản Văn hoá phi vật thể quốc gia — Nhân Dân', org: 'Nhân Dân, by Giang Nam', url: 'https://nhandan.vn/post-823904.html', type: 'press', checked: today,
    used: 'Decision 2328/QĐ-BVHTTDL listing the folk knowledge of Hà Nội phở; the dossier’s view that phở was created collectively in early twentieth-century Hà Nội and sold as a street snack from about 1907–1910; nearly 700 phở shops counted in 2023.',
    limits: 'A news report of the listing (August 2024).' },
  { id: 'VNEC-PHO-2009', short: 'VnEconomy', title: 'Trăm năm phở Việt — VnEconomy', org: 'VnEconomy, by T. Q. Dũng (the researcher Trịnh Quang Dũng)', url: 'https://vneconomy.vn/tram-nam-pho-viet.htm', type: 'press', checked: today,
    used: 'A four-period history of phở; beef stew sold to river-boat workers around 1908–09; Hà Nội phở at least fifteen years before the first Nam Định shop; beef-free Mondays and Fridays in 1939 and the spread of phở gà; phở tái becoming common after 1954; refugees taking phở abroad after 1975.',
    limits: 'One researcher’s account (2009); the byline gives only initials. Some dates differ from Nhân Dân’s.' },
  { id: 'DDK-PHO-LIT', short: 'Đại Đoàn Kết', title: 'Phở trong văn chương Việt — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by Đỗ Anh Vũ', url: 'https://daidoanket.vn/pho-trong-van-chuong-viet-10153716.html', type: 'press', checked: today,
    used: 'Thạch Lam’s 1943 essay, probably the first written about phở; Nguyễn Tuân’s essay “Phở” (1957) and the one-word shop names after owners’ nicknames; Vũ Bằng’s three ways phở was sold: from a cart, from a shoulder pole, from a shop.',
    limits: 'A literary feature (2020). Publication years for some works differ between sources.' },
  { id: 'SGGP-PHO', short: 'Sài Gòn Giải Phóng', title: 'Nơi nào ở Hà Nội có số lượng quán phở nhiều nhất? — SGGP', org: 'Sài Gòn Giải Phóng, by Mai An', url: 'https://www.sggp.org.vn/noi-nao-o-ha-noi-co-so-luong-quan-pho-nhieu-nhat-post770077.html', type: 'press', checked: today,
    used: 'The 2023 survey of 18 districts and its counts (Long Biên 93, Thanh Xuân 56, Hoàn Kiếm 32 and others); that it counted shops meeting hygiene standards; phở starting with mobile vendors; mainly a breakfast dish, most shops selling until about 10 a.m.',
    limits: 'A news report (November 2024). The 700 is not a full census of the city.' },
  { id: 'ZN-DOPHAN', short: 'Znews', title: 'Ăn phở thì ăn ở đâu — Znews', org: 'Znews, extract from Đỗ Phấn’s book “Hà Nội chút bụi trên vai người” (NXB Trẻ)', url: 'https://znews.vn/an-pho-thi-an-o-dau-post1468327.html', type: 'press', checked: today,
    used: 'Private phở stalls closing in the war and subsidy years; state-run (mậu dịch) shops on Vân Hồ, Hàng Bài, Ngô Quyền and Hàng Buồm; phở with no meat nicknamed “phở không người lái”.',
    limits: 'A writer’s memoir (2024), so one person’s recollection.' },
  { id: 'VOV-PHO-MEM', short: 'VOV', title: 'Phở Hà Nội và tôi — VOV', org: 'VOV (blog), by Trần Nhật Minh', url: 'https://vov.vn/blog/pho-ha-noi-va-toi-477787.vov', type: 'press', checked: today,
    used: 'That phở was a luxury in the subsidy era; buying a ticket and queuing at the kitchen window; phở eaten with vinegar rather than lime.',
    limits: 'A personal blog post on a national broadcaster’s site (2016).' },
  { id: 'VNEI-PHO-DIVIDE', short: 'VnExpress International', title: 'Hanoi and Saigon, the pho divide explained — VnExpress International', org: 'VnExpress International, by Tam Anh', url: 'https://e.vnexpress.net/news/travel/food-recipes/hanoi-and-saigon-the-pho-divide-explained-4963497.html', type: 'press', checked: today,
    used: 'The divide beginning after 1954 when northerners moved south; Hà Nội’s clear broth, few herbs and rare hoisin, with lime or garlic-chilli vinegar; the south’s sweeter broth, basil, sawtooth herb, bean sprouts, hoisin and chilli sauce.',
    limits: 'A feature (December 2025); describes typical bowls, not every shop.' },
  { id: 'VNE-PHOCUON', short: 'VnExpress', title: 'Phở cuốn làng Ngũ Xã — VnExpress', org: 'VnExpress', url: 'https://vnexpress.net/pho-cuon-lang-ngu-xa-2358186.html', type: 'press', checked: today,
    used: 'Phở cuốn as a new dish of the early 2000s in Ngũ Xã: beef fried with garlic, rolled with herbs in sheets of phở.',
    limits: 'A short report (2004); other accounts tell the origin differently.' },
  { id: 'ND-PHOTHIN', short: 'Nhân Dân', title: 'Chuyện Phở Thìn Hà Nội — Nhân Dân', org: 'Nhân Dân (special report)', url: 'https://special.nhandan.vn/chuyen-pho-thin-ha-noi/index.html', type: 'press', checked: today,
    used: 'Nguyễn Trọng Thìn opening his Lò Đúc shop in 1979 and its phở tái lăn, beef stir-fried with garlic before going into the bowl.',
    limits: 'An undated feature. Not the same shop as Phở Thìn Bờ Hồ.' },
  { id: 'VNN-PHO-QUEUE', short: 'VietNamNet', title: 'Phở Hà Nội là di sản quốc gia, quán nào đông nghẹt khách — VietNamNet', org: 'VietNamNet, by Linh Trang', url: 'https://vietnamnet.vn/pho-ha-noi-la-di-san-quoc-gia-quan-nao-dong-nghet-khach-xep-hang-lay-so-2311353.html', type: 'press', checked: today,
    used: 'Queues at Phở Bát Đàn, where diners carry their own bowls, and its listing in the Michelin Guide; prices of 50,000–65,000 đồng at famous shops in 2024.',
    limits: 'A news feature (August 2024).' },
  { id: 'DBND-PHO', short: 'Đại biểu Nhân dân', title: 'Cơ hội bảo tồn và phát triển bền vững phở Hà Nội — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân, by Ng. Phương', url: 'https://daibieunhandan.vn/co-hoi-bao-ton-va-phat-trien-ben-vung-pho-ha-noi-10353361.html', type: 'press', checked: today,
    used: 'The date of the listing decision, 9 August 2024.',
    limits: 'A news report (November 2024).' },
  { id: 'BVH-PHO-CERT', short: 'Báo Văn Hóa', title: 'Công bố quyết định ghi danh Phở Hà Nội là di sản văn hóa phi vật thể quốc gia — Báo Văn Hóa', org: 'Báo Văn Hóa, by Phương Anh', url: 'https://baovanhoa.vn/van-hoa/cong-bo-quyet-dinh-ghi-danh-pho-ha-noi-la-di-san-van-hoa-phi-vat-the-quoc-gia-113463.html', type: 'press', checked: today,
    used: 'The certificate handed to the city on 29 November 2024 at the opening of the Hà Nội Culinary Culture Festival.',
    limits: 'A news report (November 2024).' },
  { id: 'BVH-NAMDINH', short: 'Báo Văn Hóa', title: 'Phở Nam Định trở thành di sản văn hóa phi vật thể quốc gia — Báo Văn Hóa', org: 'Báo Văn Hóa', url: 'https://baovanhoa.vn/van-hoa/pho-nam-dinh-tro-thanh-di-san-van-hoa-phi-vat-the-quoc-gia-101471.html', type: 'press', checked: today,
    used: 'Decision 2326/QĐ-BVHTTDL listing Phở Nam Định; about 300 phở shops in the province and about 600 sellers from Vân Cù, Giao Cù and Tây Lạc; Nam Định described as the home of the phở trade; the listing as a first step towards a UNESCO bid.',
    limits: 'A news report (August 2024), written from Nam Định’s point of view.' },
  { id: 'TT-PHODAY', short: 'Tuổi Trẻ', title: 'Đề xuất xác lập Ngày của phở Việt Nam là 12-12 — Tuổi Trẻ', org: 'Tuổi Trẻ, by Như Bình and Phạm Vũ', url: 'https://tuoitre.vn/de-xuat-xac-lap-ngay-cua-pho-viet-nam-la-12-12-20171212134933647.htm', type: 'press', checked: today,
    used: 'Tuổi Trẻ launching 12 December as Phở Day in 2017, chosen because the date is easy to remember.',
    limits: 'The newspaper reporting its own event; Phở Day is not a public holiday.' },
  { id: 'VNP-PHO-UNESCO', short: 'VietnamPlus', title: 'Hồ sơ phở phải chứng minh được sức sống của di sản trong cộng đồng — VietnamPlus', org: 'VietnamPlus, by Xuân Mai', url: 'https://www.vietnamplus.vn/ho-so-pho-phai-chung-minh-duoc-suc-song-cua-di-san-trong-cong-dong-post1128227.vnp', type: 'press', checked: today,
    used: 'Hà Nội preparing a UNESCO dossier for phở in 2026; an expert’s view that it must show a heritage alive in the community, and that dossiers take about two years with no guarantee.',
    limits: 'A news report (August 2026); the dossier was still being prepared.' },
  { id: 'NDT-PHO-PRICE', short: 'Nhà Đầu tư', title: 'Tô phở 30.000 đồng dần biến mất — Nhà Đầu tư', org: 'Nhà Đầu tư, by Duy Anh', url: 'https://nhadautu.vn/to-pho-30000-dong-dan-bien-mat-hang-an-lap-mat-bang-gia-moi-d98663.html', type: 'press', checked: today,
    used: 'Common prices of 35,000–40,000 đồng a bowl in Hà Nội in 2025, 15–20% up on a year before, and almost no 30,000 đồng bowls left in the centre.',
    limits: 'A market report (August 2025).' }
];

const claims = [
  { id: 'C-PHO-BOWL', kind: 'history', status: 'published', sourceIds: ['HNT-PHO', 'ND-PHO-HERITAGE'], text: 'Phở began as a street snack in early twentieth-century Hà Nội. It is rice noodles in a clear, aromatic broth, served mainly with beef (phở bò) or chicken (phở gà).' },
  { id: 'C-PHO-ORIGIN', kind: 'history', status: 'published', sourceIds: ['ND-PHO-2024', 'ND-PHO-HERITAGE'], text: 'Nobody knows for certain where phở came from. The main theories trace it to a buffalo noodle soup of Thanh Trì, to the French pot-au-feu, to Vân Cù village in Nam Định, or to a Cantonese beef noodle dish; the heritage dossier concludes it was created collectively in early twentieth-century Hà Nội.' },
  { id: 'C-PHO-EARLY', kind: 'history', status: 'published', sourceIds: ['ND-PHO-2024', 'ND-PHO-HERITAGE', 'VNEC-PHO-2009'], text: 'Henri Oger’s drawings of 1908–09 already show a phở cart, the heritage dossier dates phở as a street snack to about 1907–1910, and a 1933 dictionary defines phở chín and phở tái.' },
  { id: 'C-PHO-NAMVSHN', kind: 'history', status: 'published', sourceIds: ['VNEC-PHO-2009', 'BVH-NAMDINH'], text: 'Where phở was born is contested. The researcher Trịnh Quang Dũng argues Hà Nội phở existed at least fifteen years before the first Nam Định shop; Nam Định’s side calls the province the home of the phở trade.' },
  { id: 'C-PHO-LIT', kind: 'history', status: 'published', sourceIds: ['DDK-PHO-LIT'], text: 'Thạch Lam wrote what is probably the first essay about phở in 1943. Nguyễn Tuân’s essay “Phở” (1957) records shops named after their owners’ nicknames, and Vũ Bằng described three ways phở was sold: from a cart, from a shoulder pole and from a shop.' },
  { id: 'C-PHO-SELLERS', kind: 'history', status: 'published', sourceIds: ['SGGP-PHO', 'DDK-PHO-LIT'], text: 'Hà Nội phở began with mobile vendors in the Old Quarter; some of the best-known shops started as stalls carried on a shoulder pole before they had an address.' },
  { id: 'C-PHO-GA', kind: 'history', status: 'published', sourceIds: ['VNEC-PHO-2009', 'ND-PHO-2024'], text: 'Chicken phở grew when beef was short. One account dates it to 1939, when beef was not sold on Mondays and Fridays; Nhân Dân dates it to 1947–54, when cattle were kept for work.' },
  { id: 'C-PHO-BAOCAP', kind: 'history', status: 'published', sourceIds: ['ZN-DOPHAN', 'VOV-PHO-MEM'], text: 'In the war and subsidy years private phở stalls closed and state-run shops took over. Diners bought a ticket and queued at the kitchen window, phở was a luxury, and a bowl with no meat was nicknamed “phở không người lái”, “pilotless phở”.' },
  { id: 'C-PHO-SOUTH', kind: 'history', status: 'published', sourceIds: ['VNEI-PHO-DIVIDE', 'VNEC-PHO-2009'], text: 'Phở went south with northerners who moved after 1954 and changed there to suit local tastes; after 1975 Vietnamese who left the country took it abroad.' },
  { id: 'C-PHO-STYLE', kind: 'custom', status: 'published', sourceIds: ['VNEI-PHO-DIVIDE'], text: 'A Hà Nội bowl is known for its clear broth and few herbs; hoisin is rarely used, and diners add lime or garlic-chilli vinegar. Southern phở has a sweeter broth, basil, sawtooth herb, bean sprouts, hoisin and chilli sauce.' },
  { id: 'C-PHO-TAI', kind: 'history', status: 'published', sourceIds: ['VNEC-PHO-2009', 'ND-PHO-2024'], text: 'Early phở used well-cooked beef (chín). Phở with rare beef (tái) came later and became the usual order after 1954.' },
  { id: 'C-PHO-THIN', kind: 'history', status: 'published', sourceIds: ['ND-PHOTHIN'], text: 'Phở Thìn on Lò Đúc, opened by Nguyễn Trọng Thìn in 1979, is known for phở tái lăn: beef stir-fried quickly with garlic before it goes into the bowl.' },
  { id: 'C-PHO-CUON', kind: 'history', status: 'published', sourceIds: ['VNE-PHOCUON'], text: 'Phở cuốn, beef fried with garlic and rolled with herbs in sheets of phở noodle, appeared in Ngũ Xã, by Trúc Bạch Lake, around the early 2000s.' },
  { id: 'C-PHO-QUEUE', kind: 'custom', status: 'published', sourceIds: ['VNN-PHO-QUEUE'], text: 'At Phở Bát Đàn, one of the Michelin-listed shops, diners queue and carry their own bowls to the table.' },
  { id: 'C-PHO-HERITAGE', kind: 'custom', status: 'published', sourceIds: ['ND-PHO-HERITAGE', 'DBND-PHO', 'BVH-PHO-CERT'], text: 'By Decision 2328 of 9 August 2024, the Ministry of Culture listed the folk knowledge of Hà Nội phở as national intangible cultural heritage; the certificate was handed over on 29 November 2024.' },
  { id: 'C-PHO-COUNT', kind: 'custom', status: 'published', sourceIds: ['SGGP-PHO', 'ND-PHO-HERITAGE'], text: 'A 2023 survey of 18 of the city’s districts counted nearly 700 phở shops meeting hygiene standards, with the most in Long Biên (93), Thanh Xuân (56) and Hoàn Kiếm (32). It was not a full count.' },
  { id: 'C-PHO-NAMDINH', kind: 'custom', status: 'published', sourceIds: ['BVH-NAMDINH', 'INVESTOR-NAMDINH'], text: 'Phở Nam Định was listed as national intangible cultural heritage in the same week (Decision 2326). The province has about 300 phở shops, and about 600 phở sellers come from its villages of Vân Cù, Giao Cù and Tây Lạc.' },
  { id: 'C-PHO-DAY', kind: 'custom', status: 'published', sourceIds: ['TT-PHODAY'], text: 'Since 2017 the newspaper Tuổi Trẻ has marked 12 December as Phở Day. It is a newspaper event, not a public holiday.' },
  { id: 'C-PHO-UNESCO', kind: 'custom', status: 'published', sourceIds: ['VNP-PHO-UNESCO', 'BVH-NAMDINH'], text: 'In 2026 Hà Nội began preparing a dossier to put phở forward to UNESCO. Experts say it must show a heritage alive in the community; such dossiers take about two years and do not guarantee a listing.' },
  { id: 'C-PHO-WORLD', kind: 'history', status: 'published', sourceIds: ['ND-PHO-2024'], text: '“Pho” entered the Shorter Oxford English Dictionary in 2007.' },
  { id: 'C-PHO-WHEN', kind: 'custom', status: 'published', sourceIds: ['SGGP-PHO'], text: 'Phở is mainly a breakfast dish in Hà Nội: most shops sell until about 10 a.m., and a few open at night.' },
  { id: 'C-PHO-PRICE', kind: 'custom', status: 'published', sourceIds: ['NDT-PHO-PRICE', 'VNN-PHO-QUEUE'], text: 'In 2025 a bowl commonly cost 35,000–40,000 đồng in Hà Nội, about 15–20% more than a year before; famous shops charged 50,000–65,000 đồng or more.' },
  { id: 'C-PHO-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: taste the broth before you add anything. In Hà Nội the broth is the point, and the lime and vinegar are there to adjust it, not to cover it.' }
];

const glossary = [
  { id: 'pho-tai', vi: 'tái', say: 'tie', en: 'Rare: thin slices of raw beef that cook in the hot broth. Chín means well cooked.' },
  { id: 'quay', vi: 'quẩy', say: 'kway', en: 'Fried dough sticks, torn into pieces and dipped in phở or rice porridge.' },
  { id: 'baocap', vi: 'bao cấp', say: 'bow cup', en: 'The subsidy era, before the 1986 reforms, when the state rationed food and ran most shops.' }
];

const story = {
  id: 'st-pho',
  layout: 'timeline',
  title: 'A bowl of phở',
  dek: 'A street snack from a pole-carried kitchen became Hà Nội’s breakfast, then national heritage. A hundred and twenty years of phở, and how to order a bowl today.',
  place: 'Hà Nội',
  imageId: 'fd-pho-bowl',
  hero: { image: 'fd-pho-bowl' },
  appliesTo: 'Phở as it is sold and eaten in Hà Nội. Prices are from 2025.',
  varies: 'Every shop has its own broth. Phở in Nam Định and in the south is made and served differently, and where phở began is still argued over.',
  sections: [
    { text: 'Phở began as a street snack in early twentieth-century Hà Nội: rice noodles in a clear broth with beef or chicken.', claimIds: ['C-PHO-BOWL'] },
    { heading: 'Heritage in a bowl', text: 'In August 2024 the folk knowledge of Hà Nội phở was listed as national intangible cultural heritage. A 2023 survey counted nearly 700 shops.', claimIds: ['C-PHO-HERITAGE', 'C-PHO-COUNT'] },
    { heading: 'Not only Hà Nội', text: 'Phở Nam Định was listed the same week, and southern phở is served quite differently.', claimIds: ['C-PHO-NAMDINH', 'C-PHO-STYLE'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Before seven in the morning, the phở shops of Hà Nội are already full. People sit on low stools with their knees near their chins, steam rising past their faces, a pot of broth bubbling at the door. It is the city’s breakfast: most shops sell until about ten and then close.', claimIds: ['C-PHO-WHEN'] },
      { text: 'A bowl is simple to describe: flat rice noodles in a clear, fragrant broth, with beef or chicken. Its history is not. Nobody agrees on where phở was born, and the question still starts arguments between Hà Nội and Nam Định. What is not in doubt is that it grew up on the streets of this city in the first years of the twentieth century, and that it has outlived wars, rationing and a hundred years of change.', claimIds: ['C-PHO-BOWL', 'C-PHO-ORIGIN', 'C-PHO-NAMVSHN'] }
    ] },
    { type: 'facts', title: 'Phở in brief', items: [
      { term: 'What', text: 'Flat rice noodles in clear broth, with beef (phở bò) or chicken (phở gà).' },
      { term: 'When', text: 'Mostly breakfast. Many shops close by mid-morning.' },
      { term: 'Price', text: 'About 35,000–40,000 đồng a bowl in 2025; more at famous shops.' },
      { term: 'Heritage', text: 'National intangible cultural heritage since August 2024.' }
    ], claimIds: ['C-PHO-BOWL', 'C-PHO-WHEN', 'C-PHO-PRICE', 'C-PHO-HERITAGE'] },

    { type: 'text', heading: 'Where did it come from?', id: 'origins', paras: [
      { text: 'There are four main stories, and Nhân Dân, the Party newspaper, admits that none has been proven. One traces phở to *bún xáo trâu*, a buffalo noodle soup from Thanh Trì on the edge of the city, with beef replacing buffalo once the French raised cattle nearby. A second points to the French *pot-au-feu*, a beef stew; the paper doubts it, since pot-au-feu was full of carrots and turnips. A third places the first phở in Vân Cù, a village in Nam Định province, and a fourth hears the name in the cry of Cantonese vendors selling *ngưu nhục phấn*, beef with rice noodles.', claimIds: ['C-PHO-ORIGIN'] },
      { text: 'The heritage dossier submitted for Hà Nội takes a different view: that phở was made collectively, by many cooks, in early twentieth-century Hà Nội, out of all of these influences. The earliest firm evidence fits that. Drawings made by the Frenchman Henri Oger in 1908–09 show a phở cart in the street, and by 1933 a dictionary was defining phở chín and phở tái.', claimIds: ['C-PHO-ORIGIN', 'C-PHO-EARLY'] },
      { text: 'Nam Định has its own claim. Its villages still send hundreds of phở cooks around the country, and its newspapers call the province the home of the trade. The researcher Trịnh Quang Dũng argues the other way: that phở was sold in Hà Nội at least fifteen years before the first shop opened in Nam Định. Both sides have their evidence. This story is about Hà Nội, but it does not take sides.', claimIds: ['C-PHO-NAMVSHN', 'C-PHO-NAMDINH'] }
    ] },
    { type: 'quote', text: 'Clear, and always piping hot.', by: 'Thạch Lam on phở, in “Hà Nội băm sáu phố phường” (1943), our translation', claimIds: ['C-PHO-LIT'] },

    { type: 'timeline', heading: 'A hundred and twenty years in a bowl', label: 'Timeline of phở in Hà Nội', items: [
      { era: 'On the street' },
      { year: '1907–10', title: 'A street snack', text: 'Phở is sold from carts and shoulder poles in the Old Quarter. Henri Oger draws a phở cart in 1908–09.', claimIds: ['C-PHO-EARLY', 'C-PHO-SELLERS'] },
      { year: '1930s', title: 'Shops with names', text: 'Phở moves indoors. Shops take their owners’ nicknames, and a 1933 dictionary lists phở chín and phở tái.', claimIds: ['C-PHO-EARLY', 'C-PHO-LIT'] },
      { year: '1939', title: 'Chicken on beefless days', text: 'With no beef on Mondays and Fridays, some shops serve chicken. Nhân Dân dates phở gà later, to 1947–54.', claimIds: ['C-PHO-GA'], image: 'fd-pho-two', caption: 'Beef phở with the herbs, lime and chilli most shops set out.' },
      { year: '1943', title: 'Into literature', text: 'Thạch Lam writes what is probably the first essay about phở. Nguyễn Tuân and Vũ Bằng follow.', claimIds: ['C-PHO-LIT'] },
      { era: 'War and rationing' },
      { year: 'After 1954', title: 'Phở goes south', text: 'Northerners moving south take their recipes; Saigon makes the dish its own. Rare beef, tái, becomes the usual order in the North.', claimIds: ['C-PHO-SOUTH', 'C-PHO-TAI'] },
      { year: '1960s–80s', title: 'State phở', text: 'Private stalls close. In state-run shops diners buy a ticket, queue at the window, and sometimes get “pilotless phở”, with no meat.', claimIds: ['C-PHO-BAOCAP'] },
      { year: '1979', title: 'Phở Thìn', text: 'Nguyễn Trọng Thìn opens on Lò Đúc, frying the beef with garlic before it goes in the bowl.', claimIds: ['C-PHO-THIN'] },
      { era: 'Open again' },
      { year: 'After 1975', title: 'Phở abroad', text: 'Vietnamese who leave the country take phở to Paris, California and beyond. In 2007 “pho” enters the Shorter Oxford English Dictionary.', claimIds: ['C-PHO-SOUTH', 'C-PHO-WORLD'] },
      { year: '2000s', title: 'Phở cuốn', text: 'In Ngũ Xã, by Trúc Bạch Lake, cooks roll fried beef and herbs in sheets of phở noodle.', claimIds: ['C-PHO-CUON'] },
      { year: '2017', title: 'Phở Day', text: 'The newspaper Tuổi Trẻ starts marking 12 December as Phở Day.', claimIds: ['C-PHO-DAY'] },
      { year: '2024', title: 'National heritage', text: 'Hà Nội phở and Phở Nam Định are listed as national intangible cultural heritage in the same week of August.', claimIds: ['C-PHO-HERITAGE', 'C-PHO-NAMDINH'], image: 'fd-pho-spice', caption: 'Seasoning a bowl at the table.' },
      { year: '2026', title: 'Towards UNESCO', text: 'The city starts work on a dossier to put phở forward to UNESCO.', claimIds: ['C-PHO-UNESCO'] }
    ] },

    { type: 'text', heading: 'From the shoulder pole to the shop', id: 'street', paras: [
      { text: 'The first phở cooks carried their kitchens. A *gánh*, a shoulder pole, held a pot of broth over a small fire at one end and the bowls, noodles and meat at the other. Many of the city’s best-known shops began like this, as a stall carried through the Old Quarter or set down by the lake, before they had an address.', claimIds: ['C-PHO-SELLERS'] },
      { text: 'By the 1930s phở had moved indoors. The writer Vũ Bằng described three ways to buy it: from a cart, from a pole, or in a shop. Nguyễn Tuân, in his essay “Phở”, noticed that shops were known by a single word, the owner’s nickname, as if everyone in the city knew them personally. Many shops are still named that way.', claimIds: ['C-PHO-LIT'] }
    ] },
    { type: 'figure', image: 'fd-pho-bowl', size: 'wide', caption: 'Beef phở with spring onion and herbs.' },

    { type: 'text', heading: 'Ticket, queue, pilotless phở', id: 'rationing', paras: [
      { text: 'During the war years and the [[baocap|subsidy era]] that followed, private trade in rice goods was banned and the family stalls disappeared. What was left was state phở, sold in state-run shops on streets such as Hàng Bài, Ngô Quyền and Hàng Buồm. You bought a ticket at a counter, queued at the kitchen window and carried your own bowl. A writer who grew up then remembers phở as a luxury, eaten with vinegar because there were no limes.', claimIds: ['C-PHO-BAOCAP'] },
      { text: 'When there was no beef, the shops still sold the noodles and broth. Hanoians called it *phở không người lái*, “pilotless phở”. The phrase is remembered differently: one researcher uses it for the queue-and-carry system instead.', claimIds: ['C-PHO-BAOCAP'] }
    ] },
    { type: 'note', text: 'We could not confirm where the nickname came from beyond memoirs. Sources agree on the phrase, not on exactly what it described.', claimIds: ['C-PHO-BAOCAP'] },

    { type: 'text', heading: 'Hà Nội phở and southern phở', id: 'styles', paras: [
      { text: 'After 1954, when many northerners moved south, phở went with them, and in Saigon it changed. Today the two are easy to tell apart. A Hà Nội bowl is about the broth: clear, savoury, with few herbs. Hoisin sauce, which would cloud it, is rarely used. On the table you will find lime and a jar of garlic and chilli in vinegar, to adjust it as you like, and sometimes [[quay|quẩy]], fried dough, to dip.', claimIds: ['C-PHO-SOUTH', 'C-PHO-STYLE'] },
      { text: 'In the south the broth is darker and sweeter, and the bowl comes with a basket of basil, sawtooth herb and bean sprouts, plus bottles of hoisin and chilli sauce. Neither is the wrong way to eat phở. They are two cities’ ideas of the same dish.', claimIds: ['C-PHO-STYLE'] }
    ] },
    { type: 'tabs', heading: 'What to order', id: 'order', intro: 'Choose a tab for the main kinds of bowl in Hà Nội, or for what goes on the table.', label: 'Kinds of phở', tabs: [
      { label: 'Beef', columns: ['Order', 'What you get'], rows: [
        [{ text: 'phở tái', vi: true }, { text: 'Thin slices of raw beef that cook in the hot broth. The usual order since the 1950s.', claimIds: ['C-PHO-TAI'] }],
        [{ text: 'phở chín', vi: true }, { text: 'Well-cooked beef, the older style.', claimIds: ['C-PHO-TAI'] }],
        [{ text: 'phở tái lăn', vi: true }, { text: 'Beef stir-fried quickly with garlic before it goes in, made famous at Phở Thìn, Lò Đúc.', claimIds: ['C-PHO-THIN'] }]
      ] },
      { label: 'Other kinds', columns: ['Order', 'What you get'], rows: [
        [{ text: 'phở gà', vi: true }, { text: 'Chicken phở, which spread when beef was short.', claimIds: ['C-PHO-GA'] }],
        [{ text: 'phở cuốn', vi: true }, { text: 'Fried beef and herbs rolled in sheets of phở noodle, dipped in sauce. From Ngũ Xã.', claimIds: ['C-PHO-CUON'] }]
      ] },
      { label: 'On the table', columns: ['Item', 'What to do'], rows: [
        ['Lime', { text: 'Squeeze in a little to sharpen the broth.', claimIds: ['C-PHO-STYLE'] }],
        ['Garlic-chilli vinegar', { text: 'A spoonful for heat and sourness.', claimIds: ['C-PHO-STYLE'] }],
        [{ text: 'quẩy', vi: true }, 'Fried dough. Tear it and dip it in the broth.']
      ] }
    ] },

    { type: 'text', heading: 'Heritage, and a count of 700', id: 'heritage', paras: [
      { text: 'On 9 August 2024 the Ministry of Culture, Sports and Tourism listed the folk knowledge of Hà Nội phở as national intangible cultural heritage. What is listed is not one recipe but the know-how: the bones and spices, the way the broth is kept clear, the habits of the people who make and eat it. The certificate was handed to the city on 29 November that year, at the opening of a festival of Hà Nội food.', claimIds: ['C-PHO-HERITAGE'] },
      { text: 'Before the listing, the city’s culture department surveyed 18 of its districts and counted nearly 700 phở shops, with the most in Long Biên (93), Thanh Xuân (56) and Hoàn Kiếm (32). The count included only shops that met hygiene standards, so the real number is higher. Phở Nam Định was listed in the same week; its province counts about 300 shops of its own and sends about 600 cooks around the country.', claimIds: ['C-PHO-COUNT', 'C-PHO-NAMDINH'] },
      { text: 'In 2026 the city began preparing a dossier to put phở forward to UNESCO. Experts warn that it has to show something alive, cooked and eaten by a community, not only a famous dish; dossiers usually take about two years, and many are not accepted.', claimIds: ['C-PHO-UNESCO'] }
    ] },
    { type: 'quote', text: 'The dossier must show that this is a heritage living in the community.', by: 'Dr Lê Thị Minh Lý, heritage expert, to VietnamPlus (2026), our translation', claimIds: ['C-PHO-UNESCO'] },

    { type: 'text', heading: 'Eating a bowl', id: 'eat', paras: [
      { text: 'Go early. Phở is a breakfast dish, and many shops run out or close by mid-morning. At the busiest places the system can still feel like the old days: at Phở Bát Đàn, listed by the Michelin Guide, you queue, pay and carry your own bowl to the table.', claimIds: ['C-PHO-WHEN', 'C-PHO-QUEUE'] },
      { text: 'A bowl cost about 35,000–40,000 đồng in 2025, up 15–20% in a year; in the city centre a 30,000 đồng bowl had nearly disappeared. Famous shops charge 50,000–65,000 đồng or more.', claimIds: ['C-PHO-PRICE'] },
      { text: 'Taste the broth first. Then add lime or vinegar if you want to: in Hà Nội the broth is the point, and the cook has already seasoned it.', claimIds: ['C-PHO-TIP', 'C-PHO-STYLE'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'When', text: 'Morning. Many shops close by ten.' },
      { term: 'Order', text: 'Tái (rare), chín (cooked) or gà (chicken).' },
      { term: 'First', text: 'Taste the broth, then add lime or vinegar.' },
      { term: 'Price', text: 'About 35,000–40,000 đồng.' }
    ] },
    { type: 'quiz', image: 'fd-pho-two', question: 'Which bowl is from Hà Nội?', prompt: 'A friend from Saigon and a friend from Hà Nội each describe “real” phở. Which one is describing the Hà Nội bowl?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Sweet broth, a basket of basil and bean sprouts, hoisin on the side', feedback: 'That is the southern bowl, shaped by cooks in Saigon after 1954.' },
      { label: 'Clear broth, few herbs, lime and garlic-chilli vinegar to adjust it', fit: true, feedback: 'Yes. In Hà Nội the clear broth is the point, and hoisin is rarely used.' },
      { label: 'Either one: there is no difference', feedback: 'They are the same dish, but the two cities make and serve it quite differently.' }
    ] }
  ]
};

module.exports = { sources, claims, glossary, stories: [story] };
