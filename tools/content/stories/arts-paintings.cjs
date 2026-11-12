/* Story: Đông Hồ and Hàng Trống folk paintings (st-folk-paintings). Layout: compare.
   Researched 12 Nov 2026. Đông Hồ was inscribed by UNESCO in December 2025. No source was found for Hàng Trống on the
   national heritage list, so none is claimed. Ages are given as each source states them; village origin stories are
   legend. The prints shown are museum pieces photographed at the Vietnam National Museum of Fine Arts. */
const today = '2026-11-12';

const sources = [
  { id: 'BVH-DONGHO-UNESCO', short: 'Báo Văn Hóa', title: 'Nghề làm tranh dân gian Đông Hồ là Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp của UNESCO — Báo Văn Hóa', org: 'Báo Văn Hóa', url: 'https://baovanhoa.vn/van-hoa/nghe-lam-tranh-dan-gian-dong-ho-la-di-san-van-hoa-phi-vat-the-can-bao-ve-khan-cap-cua-unesco-186984.html', type: 'press', checked: today,
    used: 'UNESCO inscribing the craft of Đông Hồ folk painting on the Urgent Safeguarding List on 9 December 2025 in New Delhi, decision 20.COM 7.a.1, Viet Nam’s 17th element; the craft about 500 years old in Đông Khê hamlet, Thuận Thành, Bắc Ninh; ink drawings carved into thị-wood blocks, all by hand; the five colours and what they are made from; dó paper coated with điệp; printing red, blue, yellow and white first and the black key block last; the themes; only a few households still keeping the craft and why.',
    limits: 'A news report (December 2025); UNESCO’s own page was not read.' },
  { id: 'TT-DONGHO-DOSSIER', short: 'Tuổi Trẻ', title: 'UNESCO đánh giá cao hồ sơ bảo vệ khẩn cấp nghề làm tranh Đông Hồ — Tuổi Trẻ', org: 'Tuổi Trẻ, by Hà Quân', url: 'https://tuoitre.vn/unesco-danh-gia-cao-ho-so-bao-ve-khan-cap-nghe-lam-tranh-dong-ho-20250409174848797.htm', type: 'press', checked: today,
    used: 'The Đông Hồ dossier prepared by Bắc Ninh and the Ministry of Culture; the craft described as at risk of dying out.',
    limits: 'A news report (April 2025).' },
  { id: 'ND-DONGHO2026', short: 'Nhân Dân', title: 'Nối dài sức sống tranh Đông Hồ — Nhân Dân', org: 'Nhân Dân, by Trang Anh', url: 'https://nhandan.vn/noi-dai-suc-song-tranh-dong-ho-post969610.html', type: 'press', checked: today,
    used: 'Only a few practitioners remaining in 2026, among them Nguyễn Hữu Quả and Meritorious Artisan Nguyễn Thị Oanh; youth projects such as Hồn trên giấy mộc and Họa ký Đông Hồ.',
    limits: 'A feature (June 2026).' },
  { id: 'WIKI-DONGHO', short: 'Wikipedia', title: 'Đông Hồ painting — Wikipedia', org: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/%C4%90%C3%B4ng_H%E1%BB%93_painting', type: 'reference', checked: today,
    used: 'Villagers dating the craft to the Lý dynasty and researchers placing printing in the reign of Lê Kính Tông (1600–1619); điệp paper made with shell powder; favourite subjects such as the herd of pigs, the hens and the buffalo boy, and folk tales such as the mice’s wedding; printing beginning months before Tết.',
    limits: 'An encyclopedia article, used for background only and checked against Vietnamese press where possible.' },
  { id: 'SGGP-HANGTRONG', short: 'Sài Gòn Giải Phóng', title: 'Người giữ nghề cho tranh Hàng Trống — SGGP', org: 'Sài Gòn Giải Phóng, by Hà My', url: 'https://www.sggp.org.vn/nguoi-giu-nghe-cho-tranh-hang-trong-post244913.html', type: 'press', checked: today,
    used: 'Hàng Trống adding a fourth stage to drawing, carving and printing: colouring each sheet by hand over printed outlines, so no two are alike; Lê Đình Nghiên, third generation of a family from Bình Vọng village that settled on Hàng Trống street nearly a century earlier, and his workshop on Cửa Đông; subjects such as the carp looking at the moon, the four ladies, blind man’s buff, the Mother Goddess and Saint Trần; prints bought mainly for Tết; by 2006 no longer sold on the old streets, and buyers mostly foreign visitors.',
    limits: 'A profile (January 2006).' },
  { id: 'WIKI-HANGTRONG', short: 'Wikipedia', title: 'Hàng Trống painting — Wikipedia', org: 'Wikipedia (English)', url: 'https://en.wikipedia.org/wiki/H%C3%A0ng_Tr%E1%BB%91ng_painting', type: 'reference', checked: today,
    used: 'Hàng Trống paintings said to date from the sixteenth century, made around Hàng Trống, Hàng Nón, Hàng Hòm and Hàng Quạt; made in the last lunar months for Tết; xuyến chỉ paper; the Five Tigers; Buddhist and Taoist subjects and a more urban style than Đông Hồ.',
    limits: 'An encyclopedia article, used for background only.' },
  { id: 'VNEC-HANGTRONG2019', short: 'VnEconomy', title: 'Khi tranh Hàng Trống kết hợp nghệ thuật đa phương tiện — VnEconomy', org: 'VnEconomy, by Tuệ Mỹ', url: 'https://vneconomy.vn/khi-tranh-hang-trong-ket-hop-nghe-thuat-da-phuong-tien.htm', type: 'press', checked: today,
    used: 'An exhibition of 50 Hàng Trống works at the Hà Nội Museum in late 2019, in three groups of worship, Tết and social life; two painted on corrugated metal by the artisan’s father in 1942–43; Lê Đình Nghiên described as the only person holding the craft’s secrets.',
    limits: 'An exhibition report (November 2019).' },
  { id: 'ND-HANGTRONG2025', short: 'Nhân Dân', title: 'Xưa nắn nót và nay sặc sỡ, hồn nhiên — Nhân Dân', org: 'Nhân Dân, by Hoàng Hoa', url: 'https://nhandan.vn/xua-nan-not-va-nay-sac-so-hon-nhien-post893133.html', type: 'press', checked: today,
    used: 'Lê Đình Nghiên restoring the Hàng Trống works at Nam Hương temple; a young artist, Hoàng Anh Trung, showing new work inspired by the prints at a gallery on Hàng Trống street.',
    limits: 'A feature (July 2025).' }
];

const claims = [
  { id: 'C-DH-UNESCO', kind: 'law', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO', 'TT-DONGHO-DOSSIER'], text: 'On 9 December 2025, at its session in New Delhi, UNESCO inscribed the craft of Đông Hồ folk painting on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding, Viet Nam’s 17th element on UNESCO’s lists.' },
  { id: 'C-DH-PLACE', kind: 'history', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO'], text: 'Đông Hồ prints are made in Đông Khê hamlet, Thuận Thành, in Bắc Ninh province east of Hà Nội; the craft is about 500 years old.' },
  { id: 'C-DH-AGE', kind: 'legend', status: 'published', sourceIds: ['WIKI-DONGHO', 'BVH-DONGHO-UNESCO'], text: 'Villagers date the craft to the Lý dynasty, in the eleventh century; researchers place the start of printing around the early seventeenth century, and a heritage report calls it about 500 years old.' },
  { id: 'C-DH-METHOD', kind: 'custom', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO'], text: 'A design is drawn in ink and carved into blocks of thị wood. Each colour has its own block; red, blue, yellow and white are printed first, and the black outline last. Every stage is done by hand.' },
  { id: 'C-DH-COLOURS', kind: 'custom', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO'], text: 'The five colours come from nature: blue from indigo leaves, red from red gravel, yellow from pagoda-tree flowers and gardenia fruit, white from powdered scallop shell, and black from the ash of bamboo leaves and glutinous-rice straw.' },
  { id: 'C-DH-PAPER', kind: 'custom', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO', 'WIKI-DONGHO'], text: 'The prints are made on dó paper coated with điệp, a paste containing powdered shell, which gives the paper its surface.' },
  { id: 'C-DH-THEMES', kind: 'custom', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO', 'WIKI-DONGHO'], text: 'The subjects are devotional, congratulatory, historical, everyday life and landscape: a herd of pigs, hens and chicks, a boy playing the flute on a buffalo, folk tales such as the mice’s wedding. They were bought for Tết, the Mid-Autumn festival and worship.' },
  { id: 'C-DH-RISK', kind: 'custom', status: 'published', sourceIds: ['BVH-DONGHO-UNESCO', 'ND-DONGHO2026'], text: 'Only a few households still make Đông Hồ prints. Young people are not drawn to it, the income is poor and demand around festivals has fallen; young people’s projects such as Hồn trên giấy mộc are trying to bring the prints back.' },
  { id: 'C-HT-METHOD', kind: 'custom', status: 'published', sourceIds: ['SGGP-HANGTRONG'], text: 'Hàng Trống painters print only the outline from a woodblock and then colour each sheet by hand, so no two are alike; Đông Hồ prints every colour from a block.' },
  { id: 'C-HT-ORIGIN', kind: 'history', status: 'published', sourceIds: ['WIKI-HANGTRONG', 'SGGP-HANGTRONG'], text: 'Hàng Trống paintings take their name from a street in old Hà Nội; they are said to date from the sixteenth century and were made around Hàng Trống, Hàng Nón, Hàng Hòm and Hàng Quạt, mainly for Tết.' },
  { id: 'C-HT-THEMES', kind: 'custom', status: 'published', sourceIds: ['SGGP-HANGTRONG', 'WIKI-HANGTRONG'], text: 'Hàng Trống subjects lean towards worship and the city: the Mother Goddess and Saint Trần, the Five Tigers, a carp looking at the moon, four panels of elegant women, and children playing blind man’s buff. The paper is xuyến chỉ rather than điệp.' },
  { id: 'C-HT-NGHIEN', kind: 'custom', status: 'published', sourceIds: ['SGGP-HANGTRONG', 'VNEC-HANGTRONG2019', 'ND-HANGTRONG2025'], text: 'Lê Đình Nghiên is the third generation of a family from Bình Vọng village that settled on Hàng Trống street nearly a century before 2006; his workshop is on Cửa Đông. He is described as the only person holding the craft’s secrets, and in 2025 he restored the Hàng Trống works at Nam Hương temple.' },
  { id: 'C-HT-DECLINE', kind: 'custom', status: 'published', sourceIds: ['SGGP-HANGTRONG'], text: 'By 2006 Hàng Trống prints were no longer sold on the old streets, and most buyers were foreign visitors.' },
  { id: 'C-HT-2019', kind: 'custom', status: 'published', sourceIds: ['VNEC-HANGTRONG2019'], text: 'In late 2019 the Hà Nội Museum showed 50 Hàng Trống works in three groups, worship, Tết and social life; two had been painted on corrugated metal by the artisan’s father in 1942–43.' },
  { id: 'C-HT-NEW', kind: 'custom', status: 'published', sourceIds: ['ND-HANGTRONG2025'], text: 'A young artist, Hoàng Anh Trung, born in 1997, shows new work inspired by the prints at a gallery on Hàng Trống street; it is a new art, not the old technique.' },
  { id: 'C-PRINTS-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'The prints in our photographs are museum pieces at the Vietnam National Museum of Fine Arts in Hà Nội. Đông Hồ village is a day trip east of the city, in Bắc Ninh.' }
];

const story = {
  id: 'st-folk-paintings',
  country: 'vietnam',
  layout: 'compare',
  title: 'Folk prints: Đông Hồ and Hàng Trống',
  dek: 'Pigs, hens and a wedding of mice, printed in five natural colours on shell-coated paper; tigers and goddesses outlined in ink and coloured by hand. Northern Vietnam’s two great folk-print traditions, one from a village and one from a Hà Nội street.',
  place: 'Hà Nội and Bắc Ninh',
  imageId: 'ar-dh-mice',
  hero: { image: 'ar-dh-mice' },
  appliesTo: 'Folk prints of the Red River delta: Đông Hồ, made in a village of Bắc Ninh province, and Hàng Trống, made in Hà Nội’s Old Quarter. Technique and status follow Vietnamese press reports, including UNESCO’s 2025 decision as reported there.',
  varies: 'Each family keeps its own blocks and designs. Ages and origins differ between sources, and village tradition often places them earlier than the records.',
  sections: [
    { text: 'Đông Hồ prints every colour from woodblocks; Hàng Trống prints the outline and colours by hand.', claimIds: ['C-DH-METHOD', 'C-HT-METHOD'] },
    { heading: 'On the urgent list', text: 'In December 2025 UNESCO inscribed the craft of Đông Hồ painting as heritage in need of urgent safeguarding.', claimIds: ['C-DH-UNESCO'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'For centuries, families in northern Vietnam bought new pictures for [Tết](story:st-tet). Hung on the wall for the new year, they showed pigs and hens, scenes of village life, legends, goddesses and guardians. Two traditions supplied most of them. One is Đông Hồ, a village east of Hà Nội whose prints are made entirely from carved woodblocks. The other is Hàng Trống, named after a street in the Old Quarter, where painters printed an outline and then coloured each sheet by hand.', claimIds: ['C-DH-THEMES', 'C-HT-ORIGIN', 'C-HT-METHOD'] },
      { text: 'Both are now rare. Only a few households still make Đông Hồ prints, and in December 2025 UNESCO listed the craft as heritage in urgent need of safeguarding. Hàng Trống is held by a single family workshop.', claimIds: ['C-DH-RISK', 'C-DH-UNESCO', 'C-HT-NGHIEN'] }
    ] },
    { type: 'tabs', heading: 'Two traditions side by side', id: 'compare', intro: 'Choose a tab to compare the two kinds of print.', label: 'Đông Hồ and Hàng Trống compared', tabs: [
      { label: 'How they are made', columns: ['', 'Đông Hồ', 'Hàng Trống'], rows: [
        ['Where', { text: 'Đông Khê hamlet, Bắc Ninh.', claimIds: ['C-DH-PLACE'] }, { text: 'Hàng Trống and nearby streets, Hà Nội.', claimIds: ['C-HT-ORIGIN'] }],
        ['Colour', { text: 'Every colour printed from its own block.', claimIds: ['C-DH-METHOD'] }, { text: 'Outline printed, colour added by hand.', claimIds: ['C-HT-METHOD'] }],
        ['Paper', { text: 'Dó paper coated with điệp.', claimIds: ['C-DH-PAPER'] }, { text: 'Xuyến chỉ paper.', claimIds: ['C-HT-THEMES'] }],
        ['Each print', { text: 'Repeatable from the blocks.', claimIds: ['C-DH-METHOD'] }, { text: 'No two alike.', claimIds: ['C-HT-METHOD'] }]
      ] },
      { label: 'What they show', columns: ['', 'Đông Hồ', 'Hàng Trống'], rows: [
        ['Favourites', { text: 'Pigs, hens, the buffalo boy, the mice’s wedding.', claimIds: ['C-DH-THEMES'] }, { text: 'Five Tigers, carp and moon, four elegant women.', claimIds: ['C-HT-THEMES'] }],
        ['Worship', { text: 'Devotional prints among others.', claimIds: ['C-DH-THEMES'] }, { text: 'Mother Goddess, Saint Trần.', claimIds: ['C-HT-THEMES'] }],
        ['Feel', { text: 'Village life and wishes for plenty.', claimIds: ['C-DH-THEMES'] }, { text: 'More urban, with Buddhist and Taoist subjects.', claimIds: ['C-HT-THEMES'] }]
      ] },
      { label: 'Today', columns: ['', 'Đông Hồ', 'Hàng Trống'], rows: [
        ['Makers', { text: 'A few households.', claimIds: ['C-DH-RISK'] }, { text: 'One family workshop, on Cửa Đông.', claimIds: ['C-HT-NGHIEN'] }],
        ['Recognition', { text: 'UNESCO urgent safeguarding list, 2025.', claimIds: ['C-DH-UNESCO'] }, { text: 'A Hà Nội Museum exhibition, 2019.', claimIds: ['C-HT-2019'] }],
        ['New life', { text: 'Youth projects such as Hồn trên giấy mộc.', claimIds: ['C-DH-RISK'] }, { text: 'Exhibitions; new art inspired by the prints.', claimIds: ['C-HT-2019', 'C-HT-NEW'] }]
      ] }
    ] },
    { type: 'pair', items: [
      { image: 'ar-dh-rooster', caption: 'Đông Hồ: a rooster and hen, every colour from a block.' },
      { image: 'ar-ht-tigers', caption: 'Hàng Trống: the Five Tigers, coloured by hand.' }
    ] },

    { type: 'text', heading: 'Đông Hồ: five colours from the earth', id: 'dongho', paras: [
      { text: 'Đông Hồ prints are made in Đông Khê hamlet, in Thuận Thành, Bắc Ninh province. The age of the craft depends on who is asked. Villagers date it to the Lý dynasty in the eleventh century; researchers place the start of printing around the early seventeenth century; the report on its UNESCO listing calls it about 500 years old.', claimIds: ['C-DH-PLACE', 'C-DH-AGE'] },
      { text: 'A design begins as an ink drawing, carved into blocks of [[thi|thị]] wood. Each colour has a block of its own. The printer lays the paper on each inked block in turn: red, blue, yellow and white, and last the black block that carries the outline and holds the picture together. Every stage is done by hand.', claimIds: ['C-DH-METHOD'] },
      { text: 'The colours are what make Đông Hồ unmistakable, and they all come from nature. Blue is from indigo leaves, red from a red gravel, yellow from the flowers of the pagoda tree and from gardenia fruit, white from powdered scallop shell, and black from the ash of bamboo leaves and of glutinous-rice straw. The paper is [[giay-diep|giấy điệp]]: dó paper brushed with a paste containing powdered shell.', claimIds: ['C-DH-COLOURS', 'C-DH-PAPER'] }
    ] },
    { type: 'figure', image: 'ar-dh-printing', size: 'wide', caption: 'Pressing a sheet onto an inked block in Đông Hồ village.' },
    { type: 'text', heading: 'Pigs, hens and a wedding of mice', id: 'themes', paras: [
      { text: 'The subjects fall into a few families: devotional pictures, congratulations, history, everyday life and landscape. The best sellers are animals and village life: a herd of pigs, hens with their chicks, a boy playing the flute on a buffalo’s back. Folk tales appear too, the best known being the mice’s wedding.', claimIds: ['C-DH-THEMES'] },
      { text: 'People bought them for Tết, for the Mid-Autumn festival and for worship. Printing started months before the new year.', claimIds: ['C-DH-THEMES'] }
    ] },
    { type: 'gallery', heading: 'Đông Hồ prints and printing', id: 'gallery', intro: 'Select a picture to see it larger; use the arrow keys or swipe to move between them.', items: [
      { image: 'ar-dh-mice', caption: 'The mice’s wedding.' },
      { image: 'ar-dh-rooster', caption: 'A rooster and hen.' },
      { image: 'ar-dh-printing', caption: 'Printing by hand.' },
      { image: 'ar-dh-drying', caption: 'Half-finished prints drying.' }
    ] },
    { type: 'text', heading: 'On the urgent list', id: 'unesco', paras: [
      { text: 'By 2025 only a few households in the village still made the prints. Young people were not drawn to the work, the income was poor, and fewer families bought new pictures for the festivals. Bắc Ninh and the Ministry of Culture prepared a dossier, and on 9 December 2025, at its session in New Delhi, UNESCO inscribed the craft of Đông Hồ folk painting on its List of Intangible Cultural Heritage in Need of Urgent Safeguarding. It was Viet Nam’s seventeenth element on UNESCO’s lists.', claimIds: ['C-DH-RISK', 'C-DH-UNESCO'] },
      { text: 'In 2026 the craft is still held by a handful of people, among them Nguyễn Hữu Quả, whose family has made prints for three generations, and the Meritorious Artisan Nguyễn Thị Oanh. Young people have started their own projects around the prints, such as *Hồn trên giấy mộc*, Soul on Woodblock Paper.', claimIds: ['C-DH-RISK'] }
    ] },

    { type: 'text', heading: 'Hàng Trống: the city’s pictures', id: 'hangtrong', paras: [
      { text: 'Hàng Trống is a street in old Hà Nội. Its pictures are said to date from the sixteenth century, and they were made there and on the neighbouring streets of Hàng Nón, Hàng Hòm and Hàng Quạt, mostly in the last months of the lunar year for Tết.', claimIds: ['C-HT-ORIGIN'] },
      { text: 'The technique differs from Đông Hồ in one decisive step. Drawing, carving and printing are the same, but only the outline is printed. Each sheet is then coloured by hand with a brush, so no two prints are exactly alike. The paper is *xuyến chỉ*, not the shell-coated điệp of the village.', claimIds: ['C-HT-METHOD', 'C-HT-THEMES'] },
      { text: 'There are pictures for worship, the Mother Goddess and Saint Trần, and for the new year: the Five Tigers; a carp looking at the moon; four panels of elegant women; children playing blind man’s buff.', claimIds: ['C-HT-THEMES'] }
    ] },
    { type: 'figure', image: 'ar-ht-tigers', size: 'wide', caption: 'The Five Tigers, a Hàng Trống painting in the Vietnam National Museum of Fine Arts.' },
    { type: 'text', heading: 'One workshop on Cửa Đông', id: 'nghien', paras: [
      { text: 'Hàng Trống is now held by one family. Lê Đình Nghiên is the third generation of a family from Bình Vọng village in Thường Tín, whose forebears settled on Hàng Trống street nearly a century before 2006. His workshop is on Cửa Đông street. By 2006 the prints were no longer sold on the old streets at all, and most buyers were foreign visitors.', claimIds: ['C-HT-NGHIEN', 'C-HT-DECLINE'] },
      { text: 'In late 2019 the Hà Nội Museum gave the tradition a large exhibition: 50 works in three groups, worship, Tết and social life, among them two painted on corrugated metal by Nghiên’s father in 1942 and 1943. The report called Nghiên the only person still holding the craft’s secrets. In 2025 he restored the Hàng Trống pictures at Nam Hương temple. On Hàng Trống street itself, a young artist born in 1997, Hoàng Anh Trung, shows bright new work inspired by the prints; it is new art, not the old technique.', claimIds: ['C-HT-2019', 'C-HT-NGHIEN', 'C-HT-NEW'] }
    ] },
    { type: 'quote', text: 'No two are alike.', by: 'On Hàng Trống paintings, coloured by hand (after Sài Gòn Giải Phóng, 2006)', claimIds: ['C-HT-METHOD'] },

    { type: 'note', text: 'The prints in our photographs are museum pieces at the Vietnam National Museum of Fine Arts in Hà Nội. Đông Hồ village is a day trip east of the city, in Bắc Ninh province.', claimIds: ['C-PRINTS-TIP'] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Đông Hồ', text: 'Five natural colours, all from blocks, on shell-coated paper.' },
      { term: 'Hàng Trống', text: 'Outline printed, coloured by hand.' },
      { term: 'Look for', text: 'Pigs and hens; tigers and the carp.' }
    ] },
    { type: 'quiz', image: 'ar-ht-tigers', question: 'Which is which?', prompt: 'A print’s colours differ slightly from copy to copy, as if painted by hand. Which tradition is it most likely from?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Đông Hồ', feedback: 'Đông Hồ prints every colour from a block, so copies match closely.' },
      { label: 'Hàng Trống', fit: true, feedback: 'Yes. Hàng Trống colours each sheet by hand over a printed outline.' }
    ] }
  ]
};

const glossary = [
  { id: 'giay-diep', vi: 'giấy điệp', say: 'zay dee-ep', en: 'Paper coated with a paste of powdered shell, used for Đông Hồ prints.' },
  { id: 'thi', vi: 'thị', say: 'tee', en: 'The wood of a persimmon-family tree, carved into blocks for Đông Hồ prints.' }
];

module.exports = { sources, claims, glossary, stories: [story], topics: [{ id: 'arts', storyIds: ['st-folk-paintings'] }] };
