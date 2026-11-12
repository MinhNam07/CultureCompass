/* Story: ca trù (st-ca-tru). Layout: timeline.
   Researched 12 Nov 2026. UNESCO pages give the status; origins are disputed, so the earliest documents are given as
   documents and the founder stories as legend. Venues change; only the Bích Câu Saturday show is confirmed for 2026.
   The Committee reviews Viet Nam's fourth report at its session from 30 November 2026, so no outcome is stated. */
const today = '2026-11-12';

const sources = [
  { id: 'UNESCO-CATRU', short: 'UNESCO', title: 'Ca trù singing — UNESCO Intangible Cultural Heritage', org: 'UNESCO', url: 'https://ich.unesco.org/en/USL/ca-tru-singing-00309', type: 'official', checked: today,
    used: 'Ca trù as a complex form of sung poetry from northern Viet Nam; the three performers; worship, entertainment, the royal palace and contests as its uses; 56 musical forms; the threats of ageing practitioners, hard training, low pay, lost spaces and mass media; inscription in 2009 on the Urgent Safeguarding List.',
    limits: 'The element page; dates only by year.' },
  { id: 'UNESCO-4COM', short: 'UNESCO', title: 'Decision of the Intergovernmental Committee: 4.COM 14.12', org: 'UNESCO', url: 'https://ich.unesco.org/en/decisions/4.COM/14.12', type: 'official', checked: today,
    used: 'The 2009 inscription on the Urgent Safeguarding List, viability judged still at risk because few competent musicians remain, and advice to invest in people rather than in restoring venues.',
    limits: 'The decision text (Abu Dhabi, 2009).' },
  { id: 'UNESCO-17COM', short: 'UNESCO', title: 'Decision of the Intergovernmental Committee: 17.COM 6.A.22', org: 'UNESCO', url: 'https://ich.unesco.org/en/decisions/17.COM/6.A.22', type: 'official', checked: today,
    used: 'The Committee welcoming progress in 2022, warning against over-commercialisation through tourism, asking for all parts including dance to be passed on, and setting the next report for December 2025.',
    limits: 'The decision text (Rabat, 2022).' },
  { id: 'UNESCO-USL-REPORTS', short: 'UNESCO', title: 'Periodic reporting on elements on the Urgent Safeguarding List — UNESCO', org: 'UNESCO', url: 'https://ich.unesco.org/en/6a-periodic-reporting-usl-01449', type: 'official', checked: today,
    used: 'Viet Nam’s fourth report on ca trù, submitted on 15 December 2025, listed for examination at the Committee’s 21st session in late 2026; earlier reports showing clubs that practise regularly growing from 20 to 60.',
    limits: 'A list of reports; the report itself is not quoted, and the 2026 decision had not been made when checked.' },
  { id: 'NORTON-CATRU', short: 'Barley Norton, Goldsmiths', title: 'Ca trù — Goldsmiths, University of London', org: 'Barley Norton (ethnomusicologist), Goldsmiths, University of London', url: 'https://www.gold.ac.uk/music/catru/', type: 'academic', checked: today,
    used: 'The trio of a female singer with the phách, a player of the three-stringed đàn đáy and a drummer on the small praise drum; roots probably in the sixteenth century; the Thái Hà ensemble as the finest performers today.',
    limits: 'A short scholarly introduction by a specialist in Vietnamese music.' },
  { id: 'VNM-VNT', short: 'Vietnamese Institute for Musicology', title: 'Characteristics of Ca trù music: brief introduction about six musical forms of Ca trù — Vietnamese Institute for Musicology', org: 'Vietnamese Institute for Musicology, by Assoc. Prof. Vũ Nhật Thăng', url: 'https://vienamnhac.vn/heritage/ca-tru-singing/articles/characteristics-of-ca-tru-music-brief-introduction-about-six-musical-forms-of-ca-tru', type: 'academic', checked: today,
    used: 'The singer leading the ensemble with her clappers; the forms thét nhạc, hát nói, bắc phản, gửi thư and others; hát nói as the best-loved, appearing in the late eighteenth century; the settings of communal house, entertainment, contest, worship and palace; the seven generations of the Thái Hà family.',
    limits: 'An article (November 2019) from the institute that prepared the UNESCO nomination.' },
  { id: 'VNM-NTL', short: 'Vietnamese Institute for Musicology', title: 'Some exchanges about Ca trù — Vietnamese Institute for Musicology', org: 'Vietnamese Institute for Musicology, by Nguyễn Thụy Loan', url: 'https://vienamnhac.vn/heritage/ca-tru-singing/articles/some-exchanges-about-ca-tru', type: 'academic', checked: today,
    used: 'The earliest cited document being a poem by Lê Đức Mao written before 1505; the story of the founder of the singers treated as legend.',
    limits: 'A scholarly essay (May 2019) that argues against some other theories of origin.' },
  { id: 'ND-ADAO', short: 'Nhân Dân', title: 'Hát ả đào và nỗi oan của các cô đầu xưa — Nhân Dân', org: 'Nhân Dân', url: 'https://nhandan.vn/hat-a-dao-va-noi-oan-cua-cac-co-dau-xua-post439109.html', type: 'press', checked: today,
    used: 'The name from the bamboo tallies (trù) listeners gave singers as reward; a poem by Hoàng Nghĩa Phú (born 1480) mentioning singers in Thăng Long; singing houses on Hàng Giấy and in Thái Hà, later Khâm Thiên and other suburbs, under French rule; hostesses who could not sing being confused with singers and tainting the art; the Lỗ Khê legend text dated 1476 and copied in 1740.',
    limits: 'A historical feature (February 2006); its counts of singing houses in the 1920s and 1930s disagree, so they are not used.' },
  { id: 'VNA-CATRU2021', short: 'Vietnam News Agency', title: 'Hanoi works hard to keep ceremonial singing alive — Vietnam News Agency', org: 'Vietnam News Agency (VNA)', url: 'https://vietnam.vnanet.vn/english/hanoi-works-hard-to-keep-ceremonial-singing-alive/505514.html', type: 'press', checked: today,
    used: 'Ca trù thriving until the early twentieth century and then declining; 16 clubs and 250–300 singers and players in Hà Nội in 2021; pre-pandemic shows at Kim Ngân communal house, Quán Đế temple and Bích Câu Đạo Quán; the Thái Hà guild touring abroad.',
    limits: 'A news feature (December 2021).' },
  { id: 'VNN-CATRU2011', short: 'VietNamNet', title: 'Ca trù folk music sees revival — VietNamNet', org: 'VietNamNet (from Tuổi Trẻ)', url: 'https://vietnamnet.vn/en/ca-tru-folk-music-sees-revival-E4359.html', type: 'press', checked: today,
    used: 'The shame attached to ca trù persisting after 1945; Quách Thị Hồ reluctant to teach; Nguyễn Thúy Hòa as her best student; the Thái Hà family touring Europe, the US and China since 1995.',
    limits: 'A news feature (February 2011).' },
  { id: 'TT-QUACHTHIHO', short: 'Thanh Tra', title: 'Nhớ ca nương bậc nhất thế kỷ 20 Quách Thị Hồ — Thanh Tra', org: 'Thanh Tra (from Tuổi Trẻ)', url: 'https://thanhtra.com.vn/van-hoa-the-thao-BE2162E3A/nho-ca-nuong-bac-nhat-the-ky-20-quach-thi-ho-AC8C24A8.html', type: 'press', checked: today,
    used: 'Quách Thị Hồ (1909–2001), born into a ca trù family, singing from the age of six and famous in Thăng Long by fifteen; called the finest ca trù singer of the twentieth century; People’s Artist.',
    limits: 'A commemorative feature (January 2011).' },
  { id: 'TT-NGUYENTHICHUC', short: 'Tuổi Trẻ', title: 'Vĩnh biệt nghệ nhân ca trù Nguyễn Thị Chúc — Tuổi Trẻ', org: 'Tuổi Trẻ, by Vũ Viết Tuân', url: 'https://tuoitre.vn/vinh-biet-nghe-nhan-ca-tru-nguyen-thi-chuc-601841.htm', type: 'press', checked: today,
    used: 'Nguyễn Thị Chúc (1930–2014), born on Khâm Thiên into a family that ran a singing house, singing from twelve; teaching at the Hà Nội Conservatory from 2002; co-founding the Thăng Long ca trù club in 2006 with her student Phạm Thị Huệ; her part in the UNESCO nomination.',
    limits: 'An obituary (April 2014).' },
  { id: 'ND-BACHVAN', short: 'Nhân Dân', title: 'Một đời giữ nhịp ca trù — Nhân Dân', org: 'Nhân Dân, by Hồng Sơn', url: 'https://nhandan.vn/mot-doi-giu-nhip-ca-tru-post895952.html', type: 'press', checked: today,
    used: 'Bạch Vân hearing Quách Thị Hồ on the radio; her first public ca trù performance at Văn Miếu in 1991, from which the Hà Nội Ca trù Club grew; the first expanded Hà Nội ca trù festival in 2000; her remark that she became the club’s head because nobody else dared put their name to it.',
    limits: 'A profile (July 2025).' },
  { id: 'DDK-LOKHE', short: 'Đại Đoàn Kết', title: 'Lỗ Khê, mạch nguồn ca trù vẫn chảy — Đại Đoàn Kết', org: 'Đại Đoàn Kết, by Minh Phúc', url: 'https://daidoanket.vn/lo-khe-mach-nguon-ca-tru-van-chay-10085517.html', type: 'press', checked: today,
    used: 'Lỗ Khê in Đông Anh as an ancestral land of ca trù, with a legend of a founding couple in the fifteenth century; its club founded in 1995 with 54 members.',
    limits: 'A feature (October 2017); the legend’s names vary between sources.' },
  { id: 'VNS-BICHCAU', short: 'Viet Nam News', title: 'Free ca trù classes held to preserve traditional singing art — Viet Nam News', org: 'Viet Nam News', url: 'https://vietnamnews.vn/life-style/1796149/free-ca-tru-classes-held-to-preserve-traditional-singing-art.html', type: 'press', checked: today,
    used: 'Free classes and a free show every Saturday night at the Ca trù Bích Câu theatre in Bích Câu Đạo Quán; the club founded in 2008 by Meritorious Artist Nguyễn Thị Vân Mai and Trần Văn Trúc, the theatre opened in 2017; about ten international groups visiting each month in 2026.',
    limits: 'A news feature (July 2026).' },
  { id: 'BTHN-CATRU2025', short: 'Hà Nội Museum', title: 'Khai mạc Liên hoan Ca trù Hà Nội lần thứ 4 năm 2025 — Bảo tàng Hà Nội', org: 'Bảo tàng Hà Nội, by Thùy Dương', url: 'https://baotanghanoi.com.vn/khai-mac-lien-hoan-ca-tru-ha-noi-lan-thu-4-nam-2025/', type: 'official', checked: today,
    used: 'The fourth Hà Nội Ca trù Festival on 27–28 September 2025 at the Hà Nội Museum: 21 clubs and groups, 105 individual contestants aged 8 to 86; 32 honoured ca trù artisans in the city.',
    limits: 'The museum’s own report of the festival.' },
  { id: 'BVH-CATRU2025', short: 'Báo Văn Hóa', title: 'Ca trù Hà Nội khẳng định sức sống bền bỉ — Báo Văn Hóa', org: 'Báo Văn Hóa, by Huy Hoàng', url: 'https://baovanhoa.vn/nghe-thuat/ca-tru-ha-noi-khang-dinh-suc-song-ben-bi-171037.html', type: 'press', checked: today,
    used: 'Contestant numbers at the 2025 festival two and a half times those of the previous one, according to the researcher Bùi Trọng Hiền; 22 contestants under 18.',
    limits: 'A festival report (September 2025).' },
  { id: 'VNS-YOUNGCATRU', short: 'Viet Nam News', title: 'Young voices bring ca trù back to life — Viet Nam News', org: 'Viet Nam News', url: 'https://vietnamnews.vn/life-style/1780338/young-voices-bring-ca-tru-back-to-life.html', type: 'press', checked: today,
    used: 'A student project, Tiếng Ca Nhịp Phách, and its podcast introducing ca trù to young listeners.',
    limits: 'A feature (April 2026).' }
];

const claims = [
  { id: 'C-CT-WHAT', kind: 'custom', status: 'published', sourceIds: ['UNESCO-CATRU', 'NORTON-CATRU'], text: 'Ca trù is a complex form of sung poetry from northern Viet Nam, performed by three people: a woman singer who keeps time with small bamboo clappers, a player of the long-necked, three-stringed đàn đáy, and a drummer on a small praise drum.' },
  { id: 'C-CT-LEAD', kind: 'custom', status: 'published', sourceIds: ['VNM-VNT'], text: 'The singer leads the ensemble with her clappers, the phách.' },
  { id: 'C-CT-FORMS', kind: 'custom', status: 'published', sourceIds: ['UNESCO-CATRU', 'VNM-VNT'], text: 'Ca trù has 56 musical forms. Thét nhạc opened singing at the communal house; hát nói, which appeared in the late eighteenth century, is the best-loved. It was sung for worship, for entertainment, at the royal palace and in contests.' },
  { id: 'C-CT-NAME', kind: 'history', status: 'published', sourceIds: ['ND-ADAO'], text: 'The name comes from the bamboo tallies, trù, that listeners gave singers as reward; it was also called hát ả đào, after the singers.' },
  { id: 'C-CT-ORIGIN', kind: 'history', status: 'published', sourceIds: ['VNM-NTL', 'ND-ADAO', 'NORTON-CATRU'], text: 'Its origins are disputed. The earliest documents are poems from around 1500: one by Lê Đức Mao written before 1505, and one by Hoàng Nghĩa Phú, born in 1480, that mentions singers in Thăng Long. A scholar of Vietnamese music dates its roots probably to the sixteenth century.' },
  { id: 'C-CT-LEGEND', kind: 'legend', status: 'published', sourceIds: ['VNM-NTL', 'DDK-LOKHE', 'ND-ADAO'], text: 'Villages tell of a founding couple; Lỗ Khê, north of Hà Nội, keeps such a story in a text dated 1476 and copied in 1740. Scholars treat the founder stories as legend.' },
  { id: 'C-CT-COLONIAL', kind: 'history', status: 'published', sourceIds: ['ND-ADAO', 'VNA-CATRU2021'], text: 'Under French rule singing houses gathered on Hàng Giấy and in Thái Hà, later on Khâm Thiên and in other suburbs. Hostesses who could not sing were confused with the singers, and the art gained a bad name. Ca trù thrived until the early twentieth century and then declined.' },
  { id: 'C-CT-1945', kind: 'history', status: 'published', sourceIds: ['VNN-CATRU2011'], text: 'After 1945 the shame persisted, and even the great singer Quách Thị Hồ was reluctant to teach.' },
  { id: 'C-CT-QTH', kind: 'history', status: 'published', sourceIds: ['TT-QUACHTHIHO', 'VNN-CATRU2011'], text: 'Quách Thị Hồ (1909–2001), born into a ca trù family, sang from the age of six and was famous in Thăng Long by fifteen. She is called the finest ca trù singer of the twentieth century; Nguyễn Thúy Hòa of the Thái Hà family was her best student.' },
  { id: 'C-CT-CHUC', kind: 'history', status: 'published', sourceIds: ['TT-NGUYENTHICHUC'], text: 'Nguyễn Thị Chúc (1930–2014) was born on Khâm Thiên into a family that ran a singing house and sang from twelve. She taught at the Hà Nội Conservatory from 2002, co-founded the Thăng Long ca trù club in 2006 with her student Phạm Thị Huệ, and helped with the UNESCO nomination.' },
  { id: 'C-CT-1991', kind: 'history', status: 'published', sourceIds: ['ND-BACHVAN'], text: 'In 1991 the singer Bạch Vân gave a public ca trù performance at Văn Miếu, from which the Hà Nội Ca trù Club grew; she said she became its head because nobody else dared put their name to it. In 2000 the club held the first expanded Hà Nội ca trù festival.' },
  { id: 'C-CT-LOKHE', kind: 'history', status: 'published', sourceIds: ['DDK-LOKHE'], text: 'Lỗ Khê in Đông Anh set up its ca trù club in 1995 with 54 members.' },
  { id: 'C-CT-THAIHA', kind: 'history', status: 'published', sourceIds: ['VNM-VNT', 'NORTON-CATRU', 'VNN-CATRU2011'], text: 'The Thái Hà family has passed ca trù down for seven generations and has toured abroad since 1995; a leading scholar calls its ensemble the finest performers today.' },
  { id: 'C-CT-UNESCO', kind: 'law', status: 'published', sourceIds: ['UNESCO-CATRU', 'UNESCO-4COM'], text: 'In 2009 UNESCO put ca trù on its List of Intangible Cultural Heritage in Need of Urgent Safeguarding, because few skilled musicians remained, and advised investing in people rather than in restoring venues.' },
  { id: 'C-CT-THREATS', kind: 'custom', status: 'published', sourceIds: ['UNESCO-CATRU'], text: 'UNESCO names the threats as ageing practitioners, long and hard training, low pay, the loss of places to perform, and mass media.' },
  { id: 'C-CT-REPORTS', kind: 'law', status: 'published', sourceIds: ['UNESCO-USL-REPORTS', 'UNESCO-17COM'], text: 'Clubs practising regularly grew from 20 to 60 by Viet Nam’s first report. In 2022 the Committee warned against over-commercialising ca trù for tourists and asked for every part, dance included, to be passed on. Viet Nam sent its fourth report in December 2025; the Committee examines it at its session from late November 2026, and ca trù remains on the urgent list.' },
  { id: 'C-CT-HN2021', kind: 'custom', status: 'published', sourceIds: ['VNA-CATRU2021'], text: 'In 2021 Hà Nội had 16 ca trù clubs and 250–300 singers and players. Before the pandemic shows were held at Kim Ngân communal house on Hàng Bạc, Quán Đế temple on Hàng Buồm and Bích Câu Đạo Quán.' },
  { id: 'C-CT-FEST2025', kind: 'custom', status: 'published', sourceIds: ['BTHN-CATRU2025', 'BVH-CATRU2025'], text: 'The fourth Hà Nội Ca trù Festival, in September 2025 at the Hà Nội Museum, drew 21 clubs and groups and 105 individual contestants aged 8 to 86, 22 of them under 18 — two and a half times as many contestants as the previous festival. The city has 32 honoured ca trù artisans.' },
  { id: 'C-CT-BICHCAU', kind: 'siteRule', status: 'published', sourceIds: ['VNS-BICHCAU'], text: 'The Ca trù Bích Câu theatre, in Bích Câu Đạo Quán, gives free classes and a free show every Saturday night. Its club was founded in 2008 and the theatre opened in 2017; in 2026 about ten international groups were visiting each month.' },
  { id: 'C-CT-YOUNG', kind: 'custom', status: 'published', sourceIds: ['VNS-YOUNGCATRU'], text: 'Students have started their own projects, such as Tiếng Ca Nhịp Phách and its podcast, to bring ca trù to young listeners.' },
  { id: 'C-CT-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'A ca trù night is quiet and close: arrive on time, silence your phone, and listen for the drum, which praises the singer as she goes.' }
];

const story = {
  id: 'st-ca-tru',
  country: 'vietnam',
  layout: 'timeline',
  title: 'Ca trù: sung poetry',
  dek: 'A woman sings old poems to the click of bamboo clappers, a three-stringed lute answers, and a small drum marks the lines worth praising. Five centuries of Hà Nội’s chamber music: how it rose, fell into disrepute, nearly vanished and came back.',
  place: 'Hà Nội',
  imageId: 'ar-catru-perf',
  hero: { image: 'ar-catru-perf' },
  appliesTo: 'Ca trù as sung in Hà Nội and the villages around it. Its form and status follow UNESCO and the Vietnamese Institute for Musicology; its history, scholars and Vietnamese press.',
  varies: 'Guilds and families keep their own melodies and styles. Where and when ca trù is sung in Hà Nội changes often; only some venues hold regular nights.',
  sections: [
    { text: 'Ca trù is sung poetry performed by a singer, a lute player and a drummer.', claimIds: ['C-CT-WHAT'] },
    { heading: 'On the urgent list', text: 'In 2009 UNESCO listed ca trù as heritage in need of urgent safeguarding.', claimIds: ['C-CT-UNESCO'] },
    { heading: 'Hearing it', text: 'Bích Câu Đạo Quán holds a free show every Saturday night.', claimIds: ['C-CT-BICHCAU'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'Ca trù is music for a small room. A woman sits on a mat, an old poem in her head and small bamboo clappers in her hands. Beside her a musician plays the [[dan-day|đàn đáy]], a lute with a long neck and three strings. A third person keeps a small drum, and strikes it to praise the lines and turns of voice. UNESCO calls it a complex form of sung poetry from northern Viet Nam.', claimIds: ['C-CT-WHAT'] },
      { text: 'For centuries it was sung at village communal houses, for entertainment and at court. In the twentieth century it fell into disrepute and nearly died. Today it is on UNESCO’s list of heritage in urgent need of safeguarding, and some twenty clubs in Hà Nội are keeping it alive.', claimIds: ['C-CT-FORMS', 'C-CT-COLONIAL', 'C-CT-UNESCO'] }
    ] },
    { type: 'facts', title: 'Ca trù in brief', items: [
      { term: 'Who', text: 'A singer with clappers, a lute player, a drummer.' },
      { term: 'What', text: 'Sung poetry; 56 musical forms.' },
      { term: 'Since', text: 'At least around 1500, in the earliest documents.' },
      { term: 'Status', text: 'UNESCO urgent safeguarding list since 2009.' }
    ], claimIds: ['C-CT-WHAT', 'C-CT-FORMS', 'C-CT-ORIGIN', 'C-CT-UNESCO'] },

    { type: 'text', heading: 'Three performers', id: 'trio', paras: [
      { text: 'The singer, the [[dao-nuong|đào nương]], is the leader. She keeps time on the [[phach|phách]], a small bamboo percussion instrument, and its beat sets the pace for everyone. The lute player follows her. The drum is small; UNESCO calls it a praise drum, and its strokes praise the singer at the right moment.', claimIds: ['C-CT-WHAT', 'C-CT-LEAD'] },
      { text: 'There are 56 musical forms. *Thét nhạc* opened the singing at a village communal house. *Hát nói*, which appeared in the late eighteenth century, became the best-loved, and its name has nothing to do with speaking, *nói*. Ca trù was sung for worship at temples and communal houses, for entertainment, at the royal palace and in singing contests between guilds.', claimIds: ['C-CT-FORMS'] }
    ] },
    { type: 'figure', image: 'ar-danday', size: 'inline', caption: 'A đàn đáy: the long neck and three strings of ca trù’s lute.' },

    { type: 'text', heading: 'Tallies and names', id: 'name', paras: [
      { text: 'The word *trù* means a tally. Listeners who liked a singer gave her bamboo tallies as a reward, and the art took its name from them. It was also called *hát ả đào*, after the singers.', claimIds: ['C-CT-NAME'] },
      { text: 'Where it began is argued. Villages tell of a founding couple, and Lỗ Khê, north of Hà Nội, keeps a text of its story dated 1476 and copied in 1740; scholars treat these as legends. The earliest documents are poems from around 1500. One, by Lê Đức Mao, was written before 1505; another, by Hoàng Nghĩa Phú, born in 1480, mentions singers in the streets of Thăng Long. A specialist in Vietnamese music at Goldsmiths, University of London, puts its roots probably in the sixteenth century.', claimIds: ['C-CT-LEGEND', 'C-CT-ORIGIN'] }
    ] },

    { type: 'timeline', heading: 'Five centuries of ca trù', label: 'Timeline of ca trù in Hà Nội', items: [
      { era: 'Scholars and guilds' },
      { year: '1476 / 1740', title: 'A village legend', text: 'Lỗ Khê’s founder story is dated 1476 and copied in 1740.', claimIds: ['C-CT-LEGEND'] },
      { year: 'c. 1500', title: 'The first poems', text: 'Poems by Lê Đức Mao and Hoàng Nghĩa Phú mention singers, some in the streets of Thăng Long.', claimIds: ['C-CT-ORIGIN'] },
      { year: 'Late 1700s', title: 'Hát nói', text: 'The best-loved form of ca trù appears.', claimIds: ['C-CT-FORMS'] },
      { era: 'Disrepute' },
      { year: 'Early 1900s', title: 'Singing houses', text: 'Under French rule singing houses gather on Hàng Giấy and in Thái Hà, later on Khâm Thiên. Hostesses who cannot sing give the art a bad name.', claimIds: ['C-CT-COLONIAL'], image: 'ar-hangbac', caption: 'An Old Quarter street today.' },
      { year: 'After 1945', title: 'Silence', text: 'The shame persists; even Quách Thị Hồ is reluctant to teach.', claimIds: ['C-CT-1945'] },
      { era: 'Revival' },
      { year: '1991', title: 'Văn Miếu', text: 'Bạch Vân sings ca trù in public at Văn Miếu; the Hà Nội Ca trù Club grows from it.', claimIds: ['C-CT-1991'] },
      { year: '1995', title: 'Lỗ Khê and Thái Hà', text: 'Lỗ Khê founds its club with 54 members; the Thái Hà family begins touring abroad.', claimIds: ['C-CT-LOKHE', 'C-CT-THAIHA'] },
      { year: '2006', title: 'Thăng Long club', text: 'Nguyễn Thị Chúc and her student Phạm Thị Huệ found the Thăng Long ca trù club.', claimIds: ['C-CT-CHUC'] },
      { year: '2009', title: 'UNESCO', text: 'Ca trù goes on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding.', claimIds: ['C-CT-UNESCO'] },
      { year: '2017', title: 'A theatre at Bích Câu', text: 'The Ca trù Bích Câu theatre opens, with free Saturday shows.', claimIds: ['C-CT-BICHCAU'], image: 'ar-bichcau', caption: 'Bích Câu Đạo Quán.' },
      { year: '2025', title: 'A festival of 105 voices', text: 'The fourth Hà Nội Ca trù Festival draws contestants aged 8 to 86.', claimIds: ['C-CT-FEST2025'] },
      { year: '2026', title: 'Under review', text: 'UNESCO’s Committee examines Viet Nam’s fourth report on ca trù.', claimIds: ['C-CT-REPORTS'] }
    ] },

    { type: 'text', heading: 'How it fell', id: 'fall', paras: [
      { text: 'Under French rule ca trù was sung in the city’s singing houses, the *nhà cô đầu*. They gathered on Hàng Giấy and in Thái Hà, and later on Khâm Thiên and in other suburbs. Many houses employed hostesses who could neither sing nor play the clappers, and the public came to confuse them with the singers. The art gained a reputation it took a century to lose.', claimIds: ['C-CT-COLONIAL'] },
      { text: 'Ca trù thrived until the early twentieth century and then declined. After 1945 the shame attached to it persisted. Quách Thị Hồ, the greatest singer of her generation, was reluctant to teach.', claimIds: ['C-CT-COLONIAL', 'C-CT-1945'] }
    ] },
    { type: 'cards', heading: 'Voices that carried it', id: 'voices', items: [
      { title: 'Quách Thị Hồ (1909–2001)', text: 'Born into a ca trù family, singing from six, famous in Thăng Long by fifteen; called the finest ca trù singer of the twentieth century.', claimIds: ['C-CT-QTH'] },
      { title: 'Nguyễn Thị Chúc (1930–2014)', text: 'Born on Khâm Thiên into a family that ran a singing house; taught at the Hà Nội Conservatory and helped with the UNESCO nomination.', claimIds: ['C-CT-CHUC'] },
      { title: 'Bạch Vân', text: 'Heard Quách Thị Hồ on the radio, sang at Văn Miếu in 1991, and led the Hà Nội Ca trù Club.', claimIds: ['C-CT-1991'] },
      { title: 'The Thái Hà family', text: 'Seven generations of singers and players; Nguyễn Thúy Hòa was Quách Thị Hồ’s best student.', claimIds: ['C-CT-THAIHA', 'C-CT-QTH'] }
    ] },

    { type: 'text', heading: 'How it came back', id: 'revival', paras: [
      { text: 'The revival began with a few people who refused to let it go. The singer Bạch Vân first heard Quách Thị Hồ on the radio and was captivated. In 1991 she gave a public ca trù performance at Văn Miếu, the Temple of Literature, and a club grew from it. She became its head, she said later, because nobody else dared put their name to it. In 2000 the club held the first expanded Hà Nội ca trù festival.', claimIds: ['C-CT-1991'] },
      { text: 'Others followed. Lỗ Khê, the village with the founder legend, set up its club in 1995 with 54 members. The Thái Hà family, seven generations of singers and players, began touring Europe, the United States and China the same year; a scholar of the music calls its ensemble the finest performers today. In 2006 Nguyễn Thị Chúc, who had grown up in a singing house on Khâm Thiên, founded the Thăng Long club with her student Phạm Thị Huệ.', claimIds: ['C-CT-LOKHE', 'C-CT-THAIHA', 'C-CT-CHUC'] }
    ] },
    { type: 'quote', text: 'Nobody else dared put their name to it.', by: 'Bạch Vân, on becoming head of the Hà Nội Ca trù Club (Nhân Dân, 2025, our translation)', claimIds: ['C-CT-1991'] },

    { type: 'text', heading: 'On the urgent list', id: 'unesco', paras: [
      { text: 'In 2009 UNESCO inscribed ca trù on its List of Intangible Cultural Heritage in Need of Urgent Safeguarding. The decision found that too few skilled musicians remained, and it advised Viet Nam to invest in people, singers and teachers, rather than in restoring old venues. UNESCO lists the threats plainly: ageing practitioners, long and hard training, low pay, the loss of places to perform, and competition from mass media.', claimIds: ['C-CT-UNESCO', 'C-CT-THREATS'] },
      { text: 'Progress has been reported every few years. By the first report, clubs practising regularly had grown from 20 to 60. In 2022 the Committee welcomed the progress but warned against over-commercialising it for tourists, and asked for every part of it, including the dance, to be passed on. Viet Nam sent its fourth report in December 2025; the Committee examines it at its session that opens at the end of November 2026. Ca trù remains on the urgent list.', claimIds: ['C-CT-REPORTS'] }
    ] },

    { type: 'text', heading: 'Ca trù in Hà Nội today', id: 'today', paras: [
      { text: 'In 2021 the city had 16 ca trù clubs and 250–300 singers and players. Its festival in September 2025, at the Hà Nội Museum, drew 21 clubs and groups and 105 individual contestants aged from 8 to 86; 22 were under 18, and there were two and a half times as many contestants as at the previous festival. Hà Nội now has 32 honoured ca trù artisans. Students have started their own projects, such as *Tiếng Ca Nhịp Phách* and its podcast.', claimIds: ['C-CT-HN2021', 'C-CT-FEST2025', 'C-CT-YOUNG'] },
      { text: 'Before the pandemic, visitors heard ca trù at Kim Ngân communal house on Hàng Bạc, at Quán Đế temple on Hàng Buồm and at Bích Câu Đạo Quán. The most regular now is Bích Câu: the Ca trù Bích Câu theatre gives free classes and a free show every Saturday night, and in 2026 about ten groups from abroad were visiting each month.', claimIds: ['C-CT-HN2021', 'C-CT-BICHCAU'] }
    ] },
    { type: 'pair', items: [
      { image: 'ar-kimngan', caption: 'Kim Ngân communal house, Hàng Bạc, an old venue for ca trù.' },
      { image: 'ar-bichcau', caption: 'Bích Câu Đạo Quán, home of the Saturday show.' }
    ] },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Where', text: 'Ca trù Bích Câu theatre, Saturday nights, free.' },
      { term: 'Listen for', text: 'The clappers, the three-stringed lute, the praise drum.' },
      { term: 'Manners', text: 'On time, phone silent.' }
    ] },
    { type: 'note', text: 'A ca trù night is quiet and close: arrive on time, silence your phone, and listen for the drum, which praises the singer as she goes.', claimIds: ['C-CT-TIP'] },
    { type: 'quiz', image: 'ar-catru-perf', question: 'Who leads?', prompt: 'In a ca trù trio, who sets the pace for the others?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'The drummer', feedback: 'The drum praises and marks the lines, but it follows.' },
      { label: 'The singer, with her clappers', fit: true, feedback: 'Yes. The singer leads with the phách, and the others follow her.' },
      { label: 'The lute player', feedback: 'The đàn đáy answers the voice; the singer leads.' }
    ] }
  ]
};

const glossary = [
  { id: 'dan-day', vi: 'đàn đáy', say: 'dahn die', en: 'The long-necked, three-stringed lute of ca trù.' },
  { id: 'phach', vi: 'phách', say: 'fahk', en: 'Small bamboo clappers the ca trù singer strikes to keep time.' },
  { id: 'dao-nuong', vi: 'đào nương', say: 'dow noo-ung', en: 'A ca trù singer.' }
];

module.exports = { sources, claims, glossary, stories: [story], topics: [{ id: 'arts', storyIds: ['st-ca-tru'] }] };
