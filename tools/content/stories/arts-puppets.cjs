/* Story: water puppetry (st-water-puppets). Layout: essay.
   Researched 12 Nov 2026. The 1121 stele is the earliest written record; older origins are tradition. Show times and
   prices come from a private travel site and change, so they are given as a guide only. */
const today = '2026-11-12';

const sources = [
  { id: 'NHMRVN-HISTORY', short: 'Vietnam Puppetry Theatre', title: 'History of Water Puppetry — Nhà hát Múa rối Việt Nam', org: 'Nhà hát Múa rối Việt Nam (the national puppet theatre)', url: 'https://nhahatmuaroivietnam.vn/node/998', type: 'official', checked: today,
    used: 'The 1121 stele at Long Đọi Sơn pagoda recording a water puppet show for the king’s longevity; the theatre’s own account tracing the art to the Hùng kings.',
    limits: 'An undated history page (2009) by a state theatre; its earliest origins are tradition.' },
  { id: 'DDK-TADUC', short: 'Đại Đoàn Kết', title: 'Múa rối nước – bản sắc văn hóa Việt — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by the ethnologist Tạ Đức', url: 'https://daidoanket.vn/mua-roi-nuoc-ban-sac-van-hoa-viet-10252642.html', type: 'press', checked: today,
    used: 'The scene described on the 1121 stele: a golden turtle carrying three mountains, immortals, rare birds and dancing deer.',
    limits: 'An essay (June 2023); the author’s wider theories about older origins are his interpretation and are not used.' },
  { id: 'AFP-PUPPETS', short: 'AFP / VnExpress', title: 'Tourism keeps Vietnam’s ancient water puppets afloat — VnExpress International', org: 'AFP, via VnExpress International', url: 'https://e.vnexpress.net/news/life/tourism-keeps-vietnam-s-ancient-water-puppets-afloat-3761556.html', type: 'press', checked: today,
    used: 'The earliest record being a 12th-century stele in Hà Nam, with historians believing the art older; about 20 puppeteers working waist-deep in rubber overalls; puppets of up to 10 kg, a one-metre fairy needing four people; the sword legend in the show; the theatre drawing hundreds of tourists a day but few locals.',
    limits: 'A news feature (June 2018).' },
  { id: 'VOV-PUPPETS', short: 'VOV', title: 'Vietnam’s water puppetry: A living heritage on its journey to the world — VOV', org: 'Voice of Vietnam (English)', url: 'https://english.vov.vn/en/culture/vietnams-water-puppetry-a-living-heritage-on-its-journey-to-the-world-post1267904.vov', type: 'press', checked: today,
    used: 'The water stage called thủy đình; puppeteers waist-deep behind bamboo screens; brightly lacquered wooden figures moved by rods and strings under the water; drums, cymbals and folk melodies with little speech; a UNESCO dossier in preparation.',
    limits: 'A feature (February 2026).' },
  { id: 'VNAT-PUPPETS', short: 'Vietnam Tourism', title: 'All about Vietnamese water puppets — vietnam.travel', org: 'Vietnam National Authority of Tourism', url: 'https://vietnam.travel/node/1299', type: 'official', checked: today,
    used: 'Puppets of buoyant fig wood painted with lacquer; puppeteers standing in water throughout the show; decades to become a master; every traditional show opening with Tễu, the comic host; musicians and singers beside the stage; Đào Thục as one of the last remaining workshops.',
    limits: 'An undated tourism page.' },
  { id: 'HUUNGOC-PUPPETS', short: 'Hữu Ngọc / Viet Nam News', title: 'Its secrets revealed, water puppetry retains its charm — Viet Nam News', org: 'Hữu Ngọc, in Viet Nam News (republished by the Embassy of Viet Nam in the US)', url: 'https://vietnamembassy-usa.org/news/2005/07/its-secrets-revealed-water-puppetry-retains-its-charm', type: 'press', checked: today,
    used: 'The screened pavilion called buồng trò; puppeteers half-submerged, working rods, threads and cords; Tễu introducing himself as exiled to earth for stealing a peach of immortality; troupes guarding their secrets.',
    limits: 'A column (June 2005) by a well-known writer on Vietnamese culture.' },
  { id: 'ND-DAOTHUC2024', short: 'Nhân Dân', title: 'Về Đào Thục xem nghệ nhân thổi hồn vào gỗ để giữ nghề trăm năm — Nhân Dân', org: 'Nhân Dân, by Bình Nguyên', url: 'https://nhandan.vn/ve-dao-thuc-xem-nghe-nhan-thoi-hon-vao-go-de-giu-nghe-tram-nam-post854243.html', type: 'press', checked: today,
    used: 'Artisan Nguyễn Văn Phi taking about ten days to carve a 30–40 cm puppet.',
    limits: 'A feature (December 2024) on one workshop.' },
  { id: 'DDK-THUYDINH', short: 'Đại Đoàn Kết', title: 'Phía sau sân khấu thủy đình — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by Mai Hà', url: 'https://daidoanket.vn/phia-sau-san-khau-thuy-dinh-10270363.html', type: 'press', checked: today,
    used: 'Đào Thục building its permanent water stage only in 2001, after years of bamboo screens put up for each show; puppets worked by a pole-and-string mechanism (máy sào dây).',
    limits: 'A feature (January 2024) on one village troupe.' },
  { id: 'ND-DAOTHUC2023', short: 'Nhân Dân', title: 'Rối nước Đào Thục trở thành Di sản Văn hóa phi vật thể quốc gia — Nhân Dân', org: 'Nhân Dân, by Giang Nam', url: 'https://nhandan.vn/roi-nuoc-dao-thuc-tro-thanh-di-san-van-hoa-phi-vat-the-quoc-gia-post742469.html', type: 'press', checked: today,
    used: 'Đào Thục water puppetry (Thụy Lâm, Đông Anh) added to the national intangible heritage list in March 2023; the guild founder Đào Đăng Khiêm, a court official; the village stele dating the craft to the Later Lê, more than 300 years ago.',
    limits: 'A news report (March 2023); sources differ on the exact day of the decision.' },
  { id: 'BLC-LANGRACH', short: 'Báo Lào Cai', title: 'Bật mí làng nghề làm rối nước lâu đời nhất ở miền Bắc — Báo Lào Cai', org: 'Báo Lào Cai, by An An (republished on VietNamNet)', url: 'https://vietnamnet.vn/nhung-nguoi-giup-chu-teu-co-tien-ong-but-them-suc-song-truong-ton-2245110.html', type: 'press', checked: today,
    used: 'A village repertoire of farm and festival scenes: buffalo fighting, fishing, swinging, catching ducks, firecrackers and the fairies’ dance.',
    limits: 'A feature (February 2024) about a puppet-making village in Nam Định.' },
  { id: 'VNE-PHUONGROI', short: 'VnExpress', title: 'Khó chấn hưng các phường rối dân gian — VnExpress', org: 'VnExpress, by Hiền Hòa', url: 'https://vnexpress.net/kho-chan-hung-cac-phuong-roi-dan-gian-1877014.html', type: 'press', checked: today,
    used: 'New guild members swearing a blood oath to keep the craft secret, a pig as the fine for leaking it, guilds taking only men, and only 14 traditional guilds still active.',
    limits: 'A news report (May 2003); describes guild rules of the past and the situation at that time.' },
  { id: 'DDK-TL50', short: 'Đại Đoàn Kết', title: '50 năm Nhà hát Múa rối Thăng Long — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by Minh Quân', url: 'https://daidoanket.vn/50-nam-nha-hat-mua-roi-thang-long-10138589.html', type: 'press', checked: today,
    used: 'The Thăng Long theatre founded on 10 October 1969 as the Kim Đồng art troupe, nine members doing land puppetry for children; renamed the Hà Nội Puppet Troupe in 1975 and the Thăng Long Puppet Theatre in 2001.',
    limits: 'An anniversary report (October 2019); other sources give other years for the renaming.' },
  { id: 'BVH-TL55', short: 'Báo Văn Hóa', title: 'Nhà hát Múa rối Thăng Long đón nhận Huân chương Lao động hạng Ba — Báo Văn Hóa', org: 'Báo Văn Hóa, by Thế Thúy Hiền', url: 'https://baovanhoa.vn/nghe-thuat/nha-hat-mua-roi-thang-long-don-nhan-huan-chuong-lao-dong-hang-ba-116682.html', type: 'press', checked: today,
    used: 'The theatre touring more than 40 countries; playing 365 days a year at about seven or eight shows a day; more than 1,600 shows in 2023.',
    limits: 'An anniversary report (December 2024) based on the theatre’s own figures.' },
  { id: 'TL-THEATRE-SITE', short: 'Thăng Long Puppet Theatre', title: 'Nhà hát Múa rối Thăng Long — contact', org: 'Nhà hát Múa rối Thăng Long', url: 'https://nhahatmuaroithanglong.com.vn', type: 'official', checked: today,
    used: 'The theatre’s address at 57B Đinh Tiên Hoàng and its box-office telephone.',
    limits: 'The site lists no schedule or prices.' },
  { id: 'VNT-TLSHOW', short: 'vietnamtourism.com', title: 'Thang Long Water Puppet Theatre in Hanoi: showtimes, tickets and how long it lasts — vietnamtourism.com', org: 'vietnamtourism.com (a private travel site)', url: 'https://www.vietnamtourism.com/en/thang-long-water-puppet-theatre-in-hanoi-showtimes-tickets-and-how-long-it-lasts', type: 'guide', checked: today,
    used: 'A show of about 50 minutes without an interval, made of some 15 to 17 short scenes; the usual scenes; tickets of about 100,000 to 200,000 VND and a fee for cameras.',
    limits: 'A private travel guide (updated September 2026); times and prices change and other listings differ.' },
  { id: 'BVH-UNESCO-PUPPETS', short: 'Báo Văn Hóa', title: 'Lập hồ sơ “Phở” và “Múa rối nước” đề nghị UNESCO ghi danh di sản văn hóa phi vật thể — Báo Văn Hóa', org: 'Báo Văn Hóa', url: 'https://baovanhoa.vn/van-hoa/lap-ho-so-pho-va-mua-roi-nuoc-de-nghi-unesco-ghi-danh-di-san-van-hoa-phi-vat-the-194988.html', type: 'press', checked: today,
    used: 'On 4 January 2026 the government agreeing in principle to prepare UNESCO dossiers for phở and water puppetry, with Hà Nội leading together with other provinces.',
    limits: 'A news report (January 2026); the list and timetable were not stated.' }
];

const claims = [
  { id: 'C-WP-1121', kind: 'history', status: 'published', sourceIds: ['NHMRVN-HISTORY', 'DDK-TADUC', 'AFP-PUPPETS'], text: 'The earliest written record of water puppetry is a stele of 1121 at Long Đọi Sơn pagoda, in what was Hà Nam province, describing a show for the Lý king’s longevity: a golden turtle carrying three mountains on its back, immortals, flocks of rare birds and dancing deer.' },
  { id: 'C-WP-OLDER', kind: 'legend', status: 'published', sourceIds: ['NHMRVN-HISTORY', 'AFP-PUPPETS'], text: 'Historians believe the art is older than the stele. The national puppet theatre traces it to the Hùng kings, which is tradition rather than record.' },
  { id: 'C-WP-STAGE', kind: 'custom', status: 'published', sourceIds: ['VOV-PUPPETS', 'HUUNGOC-PUPPETS'], text: 'The stage is a pool of water, the thủy đình. The puppeteers stand waist-deep behind a bamboo screen in a pavilion called the buồng trò and move the figures with rods, threads and cords hidden under the surface.' },
  { id: 'C-WP-WOOD', kind: 'custom', status: 'published', sourceIds: ['VNAT-PUPPETS', 'VOV-PUPPETS'], text: 'The puppets are carved from light fig wood, which floats, and finished in bright lacquer. It takes decades to become a master puppeteer.' },
  { id: 'C-WP-WEIGHT', kind: 'custom', status: 'published', sourceIds: ['AFP-PUPPETS'], text: 'At the Thăng Long theatre about 20 puppeteers work in the water in rubber overalls. Some puppets weigh up to 10 kg, and a one-metre fairy needs four people.' },
  { id: 'C-WP-CARVE', kind: 'custom', status: 'published', sourceIds: ['ND-DAOTHUC2024'], text: 'At Đào Thục, an artisan takes about ten days to carve a puppet 30–40 cm tall.' },
  { id: 'C-WP-TEU', kind: 'custom', status: 'published', sourceIds: ['VNAT-PUPPETS', 'HUUNGOC-PUPPETS'], text: 'A traditional show opens with Tễu, the comic host, who introduces himself and the show; in his own story he was exiled to earth for stealing a peach of immortality.' },
  { id: 'C-WP-ACTS', kind: 'custom', status: 'published', sourceIds: ['VNT-TLSHOW', 'AFP-PUPPETS', 'BLC-LANGRACH'], text: 'A show is a run of short scenes: dragons and phoenixes dancing, a boy playing the flute on a buffalo, planting rice, fishing, catching ducks, the legend of the returned sword, and a closing dance of the sacred creatures.' },
  { id: 'C-WP-MUSIC', kind: 'custom', status: 'published', sourceIds: ['VOV-PUPPETS', 'VNAT-PUPPETS'], text: 'Musicians and singers sit beside the stage; the shows use drums, cymbals and folk melodies, with little spoken language.' },
  { id: 'C-WP-SECRET', kind: 'history', status: 'published', sourceIds: ['VNE-PHUONGROI', 'HUUNGOC-PUPPETS'], text: 'Village guilds guarded their techniques. New members swore a blood oath to keep the craft secret, leaking it cost a pig and expulsion, and the guilds took only men. In 2003 only 14 traditional guilds were still active.' },
  { id: 'C-WP-DAOTHUC', kind: 'history', status: 'published', sourceIds: ['ND-DAOTHUC2023', 'VNAT-PUPPETS'], text: 'Đào Thục, a village in Hà Nội’s Đông Anh area, has kept water puppetry for more than 300 years by its stele’s account, founded by a court official, Đào Đăng Khiêm. In 2023 its puppetry was added to the national list of intangible heritage.' },
  { id: 'C-WP-POOL', kind: 'history', status: 'published', sourceIds: ['DDK-THUYDINH'], text: 'Đào Thục built its permanent water stage only in 2001; before that villagers cut bamboo to put up screens for each show.' },
  { id: 'C-WP-TLHISTORY', kind: 'history', status: 'published', sourceIds: ['DDK-TL50'], text: 'The Thăng Long theatre began on 10 October 1969 as the Kim Đồng troupe, nine people doing land puppetry for children. It became the Hà Nội Puppet Troupe in 1975 and the Thăng Long Puppet Theatre in 2001.' },
  { id: 'C-WP-TLNOW', kind: 'custom', status: 'published', sourceIds: ['BVH-TL55', 'AFP-PUPPETS'], text: 'The theatre plays every day of the year, about seven or eight shows a day, more than 1,600 in 2023, and has toured more than 40 countries. Its audience is mostly visitors.' },
  { id: 'C-WP-VISIT', kind: 'siteRule', status: 'published', sourceIds: ['TL-THEATRE-SITE', 'VNT-TLSHOW'], text: 'The Thăng Long Water Puppet Theatre is at 57B Đinh Tiên Hoàng, beside Hoàn Kiếm Lake. A show lasts about 50 minutes without an interval; a 2026 listing gave tickets at about 100,000 to 200,000 VND, with a fee for cameras. Times and prices change.' },
  { id: 'C-WP-UNESCO', kind: 'law', status: 'published', sourceIds: ['BVH-UNESCO-PUPPETS', 'VOV-PUPPETS'], text: 'Water puppetry is not on a UNESCO list. In January 2026 the government agreed in principle to prepare a nomination, led by Hà Nội.' },
  { id: 'C-WP-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Book a day ahead in high season, sit a few rows back for the whole stage, and stay for the curtain call, when the puppeteers come out through the screen.' }
];

const story = {
  id: 'st-water-puppets',
  country: 'vietnam',
  layout: 'essay',
  title: 'Water puppets',
  dek: 'A turtle rises out of a pool, a boy plays the flute on a buffalo, dragons dance on the water. Behind a bamboo screen, puppeteers stand waist-deep and work it all with hidden poles. How a village art from the paddy fields became Hà Nội’s best-known show.',
  place: 'Hà Nội',
  imageId: 'ar-wp-finale',
  hero: { image: 'ar-wp-finale' },
  appliesTo: 'Water puppetry as played at the Thăng Long theatre and by village troupes around Hà Nội. History follows the national puppet theatre, a 1121 stele and Vietnamese press; visiting details follow the theatre and a 2026 travel listing.',
  varies: 'Each guild has its own puppets, scenes and tricks, and kept them secret. City shows run on a daily timetable; a village troupe may put up its stage on the water only for a show.',
  sections: [
    { text: 'The earliest written record of water puppetry is a stele of 1121.', claimIds: ['C-WP-1121'] },
    { heading: 'How it works', text: 'Puppeteers stand waist-deep behind a bamboo screen and move lacquered wooden figures with hidden rods.', claimIds: ['C-WP-STAGE', 'C-WP-WOOD'] },
    { heading: 'Seeing a show', text: 'The Thăng Long theatre at 57B Đinh Tiên Hoàng plays every day.', claimIds: ['C-WP-VISIT', 'C-WP-TLNOW'] }
  ],
  blocks: [
    { type: 'essay', label: 'Photo essay: a water puppet show', steps: [
      { image: 'ar-wp-theatre', label: '57B Đinh Tiên Hoàng', heading: 'A theatre by the lake', paras: [
        { text: 'Beside Hoàn Kiếm Lake, the Thăng Long theatre plays water puppets every day of the year, seven or eight times a day. Most of the audience are visitors.', claimIds: ['C-WP-VISIT', 'C-WP-TLNOW'] }
      ] },
      { image: 'ar-wp-show', label: 'The stage', heading: 'A pool for a stage', paras: [
        { text: 'There is no floor: the stage is a pool of water, the *thủy đình*, in front of a pavilion hung with a bamboo screen. The water hides everything that makes the puppets move.', claimIds: ['C-WP-STAGE'] }
      ] },
      { image: 'ar-wp-band', label: 'The music', heading: 'Drums at the side', paras: [
        { text: 'Musicians and singers sit to one side and carry the story with drums, cymbals and folk melodies. The puppets barely speak.', claimIds: ['C-WP-MUSIC'] }
      ] },
      { image: 'ar-wp-turtle', label: 'The turtle', heading: 'Out of the water', paras: [
        { text: 'The figures are carved from light fig wood, which floats, and lacquered in bright colours. They glide, dive and come up again, a golden turtle among them.', claimIds: ['C-WP-WOOD', 'C-WP-ACTS'] }
      ] },
      { image: 'ar-wp-performers', label: 'The curtain call', heading: 'Waist-deep', paras: [
        { text: 'At the end the puppeteers come out through the screen, wet to the waist. About 20 of them work each show; some puppets weigh up to 10 kg.', claimIds: ['C-WP-WEIGHT'] }
      ] }
    ] },

    { type: 'text', heading: 'A show for a king, 1121', id: 'stele', paras: [
      { text: 'The first time water puppets appear in writing is on a stone. In 1121, under the Lý dynasty that had made Thăng Long its capital a century earlier, a stele was raised at Long Đọi Sơn pagoda, in what was then Hà Nam province south of the capital. Its inscription describes a performance for the king’s longevity. A golden turtle swam out carrying three mountains on its back; immortals appeared; flocks of rare birds and a troupe of auspicious deer danced on the water.', claimIds: ['C-WP-1121'] },
      { text: 'The scene on the stone is already elaborate, which is why historians think the art is older. How much older nobody can say. The national puppet theatre traces water puppetry back to the legendary Hùng kings; that is a tradition, not a record. What the stele does show is that by the early twelfth century water puppets were good enough to be played before a king.', claimIds: ['C-WP-OLDER'] }
    ] },
    { type: 'figure', image: 'ar-longdoi-brick', size: 'inline', caption: 'A decorated brick from Long Đọi pagoda, made between 1118 and 1121, the years of the stele. Vietnam National Museum of Fine Arts.' },

    { type: 'text', heading: 'Behind the screen', id: 'how', paras: [
      { text: 'The trick of the art is that you never see how it is done. The puppeteers stand in water up to the waist in a screened pavilion, the [[buong-tro|buồng trò]]. Each figure sits on a long pole or a set of strings and rods that runs under the water and through the screen, so the puppet seems to move by itself. Villages call the mechanism *máy sào dây*, pole and string.', claimIds: ['C-WP-STAGE', 'C-WP-POOL'] },
      { text: 'The puppets are carved from fig wood, chosen because it is light and floats, then painted and lacquered so they survive the water. At Đào Thục, a village on the north side of Hà Nội, an artisan takes about ten days to carve a single puppet 30–40 cm tall. The big ones are heavy: at the Thăng Long theatre some weigh up to 10 kg, and a one-metre fairy needs four people to work it. About 20 puppeteers are in the water for each show, in rubber overalls.', claimIds: ['C-WP-WOOD', 'C-WP-CARVE', 'C-WP-WEIGHT'] },
      { text: 'It takes decades to become a master.', claimIds: ['C-WP-WOOD'] }
    ] },
    { type: 'facts', title: 'Water puppetry in brief', items: [
      { term: 'First record', text: 'A stele of 1121, Long Đọi Sơn pagoda.' },
      { term: 'Stage', text: 'A pool, the thủy đình, with a screened pavilion.' },
      { term: 'Puppets', text: 'Fig wood and lacquer; up to 10 kg.' },
      { term: 'Show', text: 'About 50 minutes, 15–17 short scenes.' }
    ], claimIds: ['C-WP-1121', 'C-WP-STAGE', 'C-WP-WEIGHT', 'C-WP-VISIT'] },

    { type: 'text', heading: 'Tễu and the scenes', id: 'acts', paras: [
      { text: 'A traditional show opens with [[teu|Tễu]], a cheerful boy who acts as host and jokes with the audience. In his own story he was exiled to earth for stealing a peach of immortality, which is why he is so pleased to be here.', claimIds: ['C-WP-TEU'] },
      { text: 'Then come the scenes, each only a few minutes long. A city show strings together some 15 to 17 of them. Many are village life: a boy playing the flute on a buffalo’s back, farmers planting rice, men fishing, a fox chased away from the ducks. Some are legends, above all the return of the sword at Hoàn Kiếm Lake, where a golden turtle rises to take back a king’s sword. The show ends with the sacred creatures, dragon, unicorn, tortoise and phoenix, dancing on the water. Village troupes have their own lists: one guild in Nam Định plays buffalo fights, swinging, firecrackers and the fairies’ dance.', claimIds: ['C-WP-ACTS'] },
      { text: 'The legend of the sword is told in full in [the story of Sword Lake](story:st-sword-lake).', editorial: true }
    ] },
    { type: 'pair', items: [
      { image: 'ar-wp-turtle', caption: 'The golden turtle of the sword legend.' },
      { image: 'ar-wp-finale', caption: 'The final dance on the water.' }
    ] },

    { type: 'text', heading: 'Village secrets', id: 'guilds', paras: [
      { text: 'Water puppetry was a village art, and each village’s guild kept its own puppets and tricks. They guarded them closely. New members swore a blood oath to keep the craft secret for life; anyone who leaked it was fined a pig and thrown out. The guilds took only men. A Hà Nội newspaper counted only 14 traditional guilds still active in 2003.', claimIds: ['C-WP-SECRET'] },
      { text: 'Đào Thục is one of them. By the account of its village stele, the craft there is more than 300 years old, founded by a court official, Đào Đăng Khiêm. For most of that time the troupe had no fixed stage: villagers cut bamboo and put up screens on the water for each show. They built a permanent stage only in 2001. In 2023 Đào Thục water puppetry was added to the national list of intangible heritage, and it remains one of the last workshops still carving puppets by hand.', claimIds: ['C-WP-DAOTHUC', 'C-WP-POOL'] }
    ] },
    { type: 'quote', text: 'A golden turtle carrying three mountains on its back.', by: 'The 1121 stele at Long Đọi Sơn pagoda, describing a water puppet show', claimIds: ['C-WP-1121'] },

    { type: 'text', heading: 'From children’s troupe to tourist stage', id: 'thanglong', paras: [
      { text: 'The theatre by the lake began modestly. On 10 October 1969 the city set up the Kim Đồng troupe: nine people doing puppetry on dry land for children. It became the Hà Nội Puppet Troupe in 1975 and took its present name, the Thăng Long Puppet Theatre, in 2001.', claimIds: ['C-WP-TLHISTORY'] },
      { text: 'Today it plays every day of the year, seven or eight shows a day; in 2023 it gave more than 1,600. It has toured more than 40 countries. A news agency that visited in 2018 found it drawing hundreds of tourists a day while few Hà Nội people came.', claimIds: ['C-WP-TLNOW'] }
    ] },
    { type: 'timeline', heading: 'Nine hundred years on the water', label: 'Timeline of water puppetry', items: [
      { year: '1121', title: 'The stele', text: 'A stele at Long Đọi Sơn pagoda records a show for the Lý king.', claimIds: ['C-WP-1121'], image: 'ar-longdoi-brick', caption: 'A brick from the same pagoda.' },
      { year: 'Later Lê', title: 'Đào Thục', text: 'By its stele’s account, the Đào Thục guild starts under the Later Lê.', claimIds: ['C-WP-DAOTHUC'] },
      { year: '1969', title: 'A children’s troupe', text: 'The Kim Đồng troupe, later the Thăng Long theatre, is founded in Hà Nội.', claimIds: ['C-WP-TLHISTORY'] },
      { year: '2001', title: 'New names, new stages', text: 'The city troupe becomes the Thăng Long Puppet Theatre; Đào Thục builds a permanent water stage.', claimIds: ['C-WP-TLHISTORY', 'C-WP-POOL'] },
      { year: '2023', title: 'National heritage', text: 'Đào Thục water puppetry joins the national list of intangible heritage.', claimIds: ['C-WP-DAOTHUC'] },
      { year: '2026', title: 'Towards UNESCO', text: 'The government agrees to prepare a UNESCO nomination, led by Hà Nội.', claimIds: ['C-WP-UNESCO'] }
    ] },

    { type: 'text', heading: 'Towards UNESCO', id: 'unesco', paras: [
      { text: 'Water puppetry is not yet on any UNESCO list. In January 2026 the government agreed in principle to prepare nominations for two things Hà Nội is known for, phở and water puppetry, with the city leading the work together with other provinces where the art is played. No date for a decision has been set.', claimIds: ['C-WP-UNESCO'] }
    ] },

    { type: 'text', heading: 'Seeing a show', id: 'visit', paras: [
      { text: 'The Thăng Long Water Puppet Theatre is at 57B Đinh Tiên Hoàng, across the road from Hoàn Kiếm Lake. A show lasts about 50 minutes, with no interval. A travel listing in 2026 gave tickets at about 100,000 to 200,000 VND depending on the seat, with a small extra fee to take photographs or video. Times and prices change, so check at the box office.', claimIds: ['C-WP-VISIT'] },
      { text: 'Book a day ahead in high season, and sit a few rows back to see the whole stage. Stay for the end, when the puppeteers come out through the screen.', claimIds: ['C-WP-TIP'] }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Where', text: 'Thăng Long theatre, 57B Đinh Tiên Hoàng.' },
      { term: 'How long', text: 'About 50 minutes, no interval.' },
      { term: 'Look for', text: 'Tễu, the buffalo boy, the golden turtle.' },
      { term: 'Stay for', text: 'The curtain call.' }
    ] },
    { type: 'quiz', image: 'ar-wp-performers', question: 'Where are the puppeteers?', prompt: 'During a water puppet show, where are the people moving the puppets?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Above the stage, with strings', feedback: 'Not here. Water puppets are worked from behind and below, not from above.' },
      { label: 'Waist-deep behind the screen', fit: true, feedback: 'Yes. They stand in the water behind a bamboo screen and work the figures with hidden poles and strings.' },
      { label: 'Under the stage, in a dry pit', feedback: 'No: they are in the water, often in rubber overalls.' }
    ] }
  ]
};

const glossary = [
  { id: 'buong-tro', vi: 'buồng trò', say: 'boo-ung chaw', en: 'The screened pavilion at the back of a water puppet stage, where the puppeteers stand in the water.' },
  { id: 'teu', vi: 'Tễu', say: 'teh-oo', en: 'The comic boy who hosts a water puppet show.' }
];

module.exports = { sources, claims, glossary, stories: [story], topics: [{ id: 'arts', storyIds: ['st-water-puppets'] }] };
