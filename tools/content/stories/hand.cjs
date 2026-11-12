/* Story: why raise your hand to cross? (st-hand). Layout: guide.
   Researched 12 Nov 2026. Law and fines from the 2024 road law and Decree 168/2024; local crossing habits come from opinion pieces and are labelled as such.
   Not legal advice. */
const today = '2026-11-12';

const sources = [
  { id: 'DBND-EV', short: 'Đại biểu Nhân dân', title: 'Xe điện dần thay đổi thói quen đi lại của người dân Hà Nội — Đại biểu Nhân dân', org: 'Đại biểu Nhân dân (newspaper of the National Assembly), by Thanh Bình', url: 'https://daibieunhandan.vn/xe-dien-dan-thay-doi-thoi-quen-di-lai-cua-nguoi-dan-ha-noi-10417586.html', type: 'press', checked: today,
    used: 'About 6.9 million motorbikes and 1.1 million cars in Hà Nội, and more than 450,000 motorbikes inside Ring Road 1.',
    limits: 'A report of May 2026; the citywide totals may repeat 2025 figures.' },
  { id: 'BVH-DIR20', short: 'Báo Văn Hóa', title: 'Thủ tướng yêu cầu Hà Nội thực hiện lộ trình đến ngày 1.7.2026 không có xe máy sử dụng nhiên liệu hóa thạch lưu thông trong Vành đai 1 — Báo Văn Hóa', org: 'Báo Văn Hóa, by Tùng Quang', url: 'https://baovanhoa.vn/doi-song/thu-tuong-yeu-cau-ha-noi-thuc-hien-lo-trinh-den-ngay-172026-khong-co-xe-may-su-dung-nhien-lieu-hoa-thach-luu-thong-trong-vanh-dai-1-151526.html', type: 'press', checked: today,
    used: 'Directive 20/CT-TTg of 12 July 2025, asking Hà Nội to have no petrol motorbikes inside Ring Road 1 from 1 July 2026, with wider limits in 2028 and 2030.',
    limits: 'A newspaper’s report of the directive (July 2025); we could not open the directive itself.' },
  { id: 'VNN-LEZ-DROP', short: 'VietNamNet', title: 'Hanoi drops proposal for outright petrol motorbike ban around Hoan Kiem Lake — VietNamNet', org: 'VietNamNet', url: 'https://vietnamnet.vn/en/hanoi-drops-proposal-for-outright-petrol-motorbike-ban-around-hoan-kiem-lake-2521274.html', type: 'press', checked: today,
    used: 'The city dropping an outright ban on petrol motorbikes in the centre in favour of phases: a small zone around the lake and Old Quarter in 2026, two wards in 2027, the whole of Ring Road 1 in 2028–2029.',
    limits: 'A report of May 2026, before the final vote.' },
  { id: 'BVH-TNGT2025', short: 'Báo Văn Hóa', title: 'Xử lý hơn 3,3 triệu trường hợp vi phạm giao thông trong năm 2025 — Báo Văn Hóa', org: 'Báo Văn Hóa (citing the National Traffic Safety Committee)', url: 'https://baovanhoa.vn/doi-song/xu-ly-hon-33-trieu-truong-hop-vi-pham-giao-thong-trong-nam-2025-195886.html', type: 'press', checked: today,
    used: '10,379 road deaths nationally between mid-December 2024 and mid-December 2025, down about 6% on the year before.',
    limits: 'Police-recorded figures (January 2026), which count fewer deaths than WHO’s modelled estimates.' },
  { id: 'VNP-TNGT2026', short: 'VietnamPlus', title: '9 tháng năm 2026, toàn quốc xảy ra 11.564 vụ tai nạn giao thông — VietnamPlus', org: 'VietnamPlus (citing the Traffic Police Department)', url: 'https://www.vietnamplus.vn/9-thang-nam-2026-toan-quoc-xay-ra-11564-vu-tai-nan-giao-thong-post1139589.vnp', type: 'press', checked: today,
    used: '7,198 traffic deaths nationally in the first nine months of 2026, down 9% on a year earlier.',
    limits: 'Police-recorded figures (October 2026).' },
  { id: 'VNS-WHO', short: 'Việt Nam News', title: 'Việt Nam’s road accident-related deaths fall by 43.5 per cent in 2011-20 — Việt Nam News', org: 'Việt Nam News (citing the WHO Global Status Report on Road Safety 2023)', url: 'https://vietnamnews.vn/society/1638040/viet-nam-s-road-accident-related-deaths-fall-by-43-5-per-cent-in-2011-20.html', type: 'press', checked: today,
    used: 'WHO’s estimated road death rate for Vietnam falling from 25.4 per 100,000 people in 2010 to 17.7 in 2021.',
    limits: 'A news report (December 2023) of WHO’s modelled estimates, which are not comparable with police counts.' },
  { id: 'LVN-168', short: 'LuatVietnam', title: 'Đi bộ qua đường không có tín hiệu bằng tay phạt đến 250.000 đồng — LuatVietnam', org: 'LuatVietnam (legal news), by Ngọc Thúy', url: 'https://luatvietnam.vn/tin-van-ban-moi/di-bo-qua-duong-khong-co-tin-hieu-bang-tay-phat-den-250000-dong-186-100566-article.html', type: 'press', checked: today,
    used: 'Decree 168/2024 Article 10(1): fines of 150,000–250,000 đồng for pedestrians who walk in the wrong part of the road, climb medians, cross in the wrong place, cross without a hand signal where one is required, or ignore lights or police; 60,000–100,000 đồng before 2025.',
    limits: 'A legal news summary (January 2025).' },
  { id: 'ZN-VAYTAY', short: 'Znews', title: 'Vẫy tay thế nào cho đúng khi đi bộ qua đường? — Znews', org: 'Znews, by Đan Thanh', url: 'https://tech.zingnews.vn/vay-tay-the-nao-cho-dung-khi-di-bo-qua-duong-post1526807.html', type: 'press', checked: today,
    used: 'That no hand signal is needed on a marked crossing, and that the decree does not say how the hand signal should be made.',
    limits: 'An explainer of January 2025.' },
  { id: 'TT-VAYTAY', short: 'Tuổi Trẻ', title: 'Đi bộ qua đường, chịu khó bước lại vạch trắng và vẫy tay — Tuổi Trẻ', org: 'Tuổi Trẻ (opinion)', url: 'https://tuoitre.vn/di-bo-qua-duong-chiu-kho-buoc-lai-vach-trang-va-vay-tay-20250213104806644.htm', type: 'press', checked: today,
    used: 'Raising a hand described as a long-standing good habit, and the writers’ view that drivers yield more since Decree 168.',
    limits: 'An opinion piece (February 2025).' },
  { id: 'VNE-VACH', short: 'VnExpress', title: '“Vạch kẻ đường vô hình” — VnExpress', org: 'VnExpress (reader opinion), by Ngọc Trâm', url: 'https://vnexpress.net/vach-ke-duong-vo-hinh-5079045.html', type: 'press', checked: today,
    used: 'A reader counting 37 people crossing during one red light at a Hà Nội junction, only 4 of them on the zebra crossing; blocked pavements and short green lights; a motorbike-taxi driver’s advice to walk evenly, look ahead and not stop, run or hesitate.',
    limits: 'A reader’s opinion piece (May 2026), not a study.' },
  { id: 'VNS-3SEC', short: 'Việt Nam News', title: 'Three seconds of morality — Việt Nam News', org: 'Việt Nam News (“Talk Around Town” column), by Bảo Long', url: 'https://vietnamnews.vn/talk-around-town/1731146/three-seconds-of-morality.html', type: 'press', checked: today,
    used: 'The columnist’s view that vehicles in Hà Nội rarely stop for pedestrians; walking steadily and keeping eye contact while riders adjust just enough to pass.',
    limits: 'A newspaper column (December 2025), so opinion.' },
  { id: 'BXD-LEZ', short: 'Báo Xây dựng', title: 'Hà Nội: Chính thức thí điểm vùng phát thải thấp trong Vành đai 1 từ ngày 1/7 — Báo Xây dựng', org: 'Báo Xây dựng (newspaper of the Ministry of Construction), by Mai Thu', url: 'https://baoxaydung.vn/ha-noi-chinh-thuc-thi-diem-vung-phat-thai-thap-trong-vanh-dai-1-tu-ngay-1-7-19226061515382322.htm', type: 'press', checked: today,
    used: 'The city council’s approval of a low-emission pilot zone on 15 June 2026: first phase limited to part of Hoàn Kiếm ward, with vehicles kept out from 7 p.m. to midnight on Friday to Sunday around the lake and the night market; the city not yet banning petrol motorbikes outright, with the wider limits moved to 2028.',
    limits: 'A report of the approval (June 2026), in Vietnamese.' }
];

const claims = [
  { id: 'C-ROAD-WHERE', kind: 'law', status: 'published', sourceIds: ['VN-LAW-ROAD'], text: 'Vietnam’s road traffic law (in force since 1 January 2025) says pedestrians may cross only where there are traffic lights, a marked crossing, or a pedestrian bridge or tunnel, and must follow the signals.' },
  { id: 'C-ROAD-HAND', kind: 'law', status: 'published', sourceIds: ['VN-LAW-ROAD'], text: 'Where there is no light, marked crossing, bridge or tunnel, the law says pedestrians must watch the oncoming vehicles, cross only when it is safe, and give a hand signal while crossing.' },
  { id: 'C-ROAD-ART30', kind: 'law', status: 'published', sourceIds: ['VN-LAW-ROAD'], text: 'The same article tells pedestrians to use the pavement, or keep to the right-hand edge where there is none, not to climb over medians, to lead children under seven by the hand when crossing, and asks everyone to help children, pregnant women, older and disabled people across.' },
  { id: 'C-ROAD-FINE', kind: 'law', status: 'published', sourceIds: ['HATINH-FINE', 'LVN-168'], text: 'Under Decree 168/2024, pedestrians who cross in the wrong place, cross without the required hand signal, climb over a median or ignore lights or police can be fined 150,000–250,000 đồng, up from 60,000–100,000 đồng before 2025.' },
  { id: 'C-ROAD-HOWHAND', kind: 'law', status: 'published', sourceIds: ['ZN-VAYTAY', 'TT-VAYTAY'], text: 'No hand signal is required on a marked crossing, and the decree does not say how the signal should be made. Writers in Tuổi Trẻ call raising a hand a long-standing good habit and think drivers have yielded more since the decree.' },
  { id: 'C-ROAD-VEHICLES', kind: 'history', status: 'published', sourceIds: ['DBND-EV'], text: 'Hà Nội has about 6.9 million motorbikes and 1.1 million cars, with more than 450,000 motorbikes inside Ring Road 1 alone.' },
  { id: 'C-ROAD-DIR20', kind: 'history', status: 'published', sourceIds: ['BVH-DIR20', 'VNN-LEZ-DROP', 'BXD-LEZ'], text: 'A 2025 government directive asked Hà Nội to have no petrol motorbikes inside Ring Road 1 from 1 July 2026. The city chose phases instead: from July 2026 a small zone around Hoàn Kiếm Lake and the Old Quarter is closed to vehicles on weekend evenings, and wider limits were moved to 2028.' },
  { id: 'C-ROAD-DEATHS', kind: 'safety', status: 'published', sourceIds: ['BVH-TNGT2025', 'VNP-TNGT2026', 'VNS-WHO'], text: 'Police counted 10,379 road deaths across Vietnam in the year to mid-December 2025, about 6% fewer than the year before, and 7,198 in the first nine months of 2026. WHO’s modelled estimate, which runs higher, fell from 25.4 deaths per 100,000 people in 2010 to 17.7 in 2021.' },
  { id: 'C-ROAD-ALERT', kind: 'safety', status: 'published', sourceIds: ['UK-FCDO-VN'], text: 'The UK government’s travel advice says compliance with road laws is poor in Vietnam, and tells people on foot to be aware of motorcycles approaching as they walk.' },
  { id: 'C-BAG-SIDE', kind: 'safety', status: 'published', sourceIds: ['UK-FCDO-VN'], text: 'Bag-snatching by thieves on motorcycles is common, so hold your bag in front of you or on the side away from the traffic.' },
  { id: 'C-CROSS-STEADY', kind: 'safety', status: 'published', sourceIds: ['TTN-CROSS-2025', 'VCT-ROAD'], text: 'Walk at a steady, even pace in a straight line so riders can predict where you will be. Rushing or zigzagging between motorbikes can confuse them.' },
  { id: 'C-CROSS-LOCALS', kind: 'safety', status: 'published', sourceIds: ['TTN-CROSS-2014', 'VCT-ROAD'], text: 'If you are unsure, stand with local pedestrians who are about to cross and move when they do.' },
  { id: 'C-CROSS-HABITS', kind: 'safety', status: 'published', sourceIds: ['VNE-VACH', 'VNS-3SEC'], text: 'Writers in Hà Nội newspapers describe a city where few drivers stop for pedestrians and many pedestrians ignore crossings: one reader counted 37 people crossing at a single red light, only 4 on the zebra. Their advice is local know-how: walk evenly, look ahead and at the riders, and do not stop, run or hesitate.' },
  { id: 'C-CROSS-TIP', kind: 'projectNote', status: 'published', sourceIds: [], text: 'Our suggestion: motorbikes can steer around a steady walker, but cars, buses and lorries cannot, so let the big vehicles pass before you step out.' }
];

const story = {
  id: 'st-hand',
  layout: 'guide',
  title: 'Why raise your hand to cross?',
  dek: 'Nearly seven million motorbikes, few traffic lights in the old streets, and a law that asks pedestrians to signal with a hand. How Hà Nội crosses the road.',
  place: 'Streets of Hà Nội',
  imageId: 'ev-oq-crossing',
  hero: { image: 'ev-oq-crossing' },
  appliesTo: 'Crossing streets in Hà Nội and other Vietnamese cities. The law applies nationwide.',
  varies: 'Traffic differs from street to street and hour to hour, and rules for the city centre are changing. This is not legal advice.',
  sections: [
    { text: 'Vietnam’s road law asks pedestrians to cross at lights, marked crossings, bridges or tunnels where there are any.', claimIds: ['C-ROAD-WHERE'] },
    { heading: 'Where there is no crossing', text: 'Watch the traffic, cross when it is safe and give a hand signal. Crossing without one can be fined.', claimIds: ['C-ROAD-HAND', 'C-ROAD-FINE'] },
    { heading: 'Keep watching anyway', text: 'Compliance with road rules is poor, so stay alert and keep your bag away from the traffic.', claimIds: ['C-ROAD-ALERT', 'C-BAG-SIDE'] },
    { heading: 'A steady pace', text: 'Walk steadily so riders can predict you, or cross with local people.', claimIds: ['C-CROSS-STEADY', 'C-CROSS-LOCALS'] }
  ],
  blocks: [
    { type: 'text', lede: true, paras: [
      { text: 'The first time you stand at the edge of a Hà Nội street, it can look like a river with no bridge. Motorbikes pour past in both directions, weaving, hooting, filling every gap. There is a reason the city feels like this: it has about 6.9 million motorbikes and 1.1 million cars, and more than 450,000 motorbikes inside the inner ring road alone.', claimIds: ['C-ROAD-VEHICLES'] },
      { text: 'People cross anyway, all day, and so can you. Vietnam’s road law even tells you how, down to a detail that surprises visitors: where there is no crossing, raise your hand. This guide explains the rule, the fine, and the local habits that matter as much as either.', claimIds: ['C-ROAD-HAND'] }
    ] },
    { type: 'facts', title: 'The law in brief', items: [
      { term: 'Where', text: 'At lights, marked crossings, footbridges or underpasses, if there are any.' },
      { term: 'If there is none', text: 'Watch the traffic, cross when it is safe, and signal with your hand.' },
      { term: 'On a zebra crossing', text: 'No hand signal needed; follow the lights.' },
      { term: 'The fine', text: '150,000–250,000 đồng for crossing in the wrong place or without the signal where it is required.' }
    ], claimIds: ['C-ROAD-WHERE', 'C-ROAD-HAND', 'C-ROAD-HOWHAND', 'C-ROAD-FINE'] },

    { type: 'steps', heading: 'Crossing, step by step', id: 'steps', items: [
      { title: 'Look for a crossing first', paras: [
        { text: 'The law, in force since January 2025, says to cross at traffic lights, a marked crossing, a footbridge or an underpass where one exists, and to follow the signals. On a marked crossing you do not need to raise your hand.', claimIds: ['C-ROAD-WHERE', 'C-ROAD-HOWHAND'] }
      ], image: 'ev-oq-crossing', caption: 'Traffic lights at an Old Quarter junction.' },
      { title: 'Wait for a gap, not an empty road', paras: [
        { text: 'An empty road may never come. Watch the oncoming traffic and choose a moment when it thins. If you are unsure, stand beside local people who are about to cross and move when they do.', claimIds: ['C-ROAD-HAND', 'C-CROSS-LOCALS'] },
        { text: 'Let cars, buses and lorries pass first. A motorbike can steer around you; a bus cannot.', claimIds: ['C-CROSS-TIP'] }
      ] },
      { title: 'Raise your hand', paras: [
        { text: 'Where there is no crossing, the law asks you to give a hand signal while you cross. It does not say how; the point is that riders can see you mean to cross. Crossing without the signal where it is required, or in a place you should not, can be fined 150,000–250,000 đồng, more than double the old fine.', claimIds: ['C-ROAD-HAND', 'C-ROAD-HOWHAND', 'C-ROAD-FINE'] }
      ] },
      { title: 'Walk steadily. Don’t stop, don’t run', paras: [
        { text: 'This is the part locals stress most. Walk at an even pace, in a straight line, and look at the riders coming towards you. They judge where you will be and steer around you. Stopping halfway, stepping back or suddenly running is what confuses them.', claimIds: ['C-CROSS-STEADY', 'C-CROSS-HABITS'] }
      ] },
      { title: 'Keep watching, and keep your bag close', paras: [
        { text: 'The UK government’s travel advice is blunt: compliance with road laws is poor, so stay aware of motorbikes the whole way across. Thieves on motorbikes snatch bags, so carry yours in front of you or on the side away from the road.', claimIds: ['C-ROAD-ALERT', 'C-BAG-SIDE'] }
      ] }
    ] },

    { type: 'text', heading: 'What locals actually do', id: 'locals', paras: [
      { text: 'Hà Nội’s own writers are frank about it. One reader of VnExpress stood at a busy junction and counted 37 people crossing during a single red light; only four used the zebra crossing. Pavements are often blocked by parked bikes and stalls, and at some wide junctions the green light lasts barely long enough to cross. A columnist in Việt Nam News put it simply: don’t expect a vehicle to stop for you.', claimIds: ['C-CROSS-HABITS'] },
      { text: 'Their advice is the same as a motorbike-taxi driver’s: walk evenly, look straight ahead, don’t stop, don’t run, don’t hesitate. It works because riders read a steady walker easily. It is local know-how rather than a rule, and it works far better with motorbikes than with cars.', claimIds: ['C-CROSS-HABITS', 'C-CROSS-TIP'] }
    ] },
    { type: 'figure', image: 'ev-oq-traffic', size: 'wide', caption: 'Motorbikes turning through an Old Quarter junction.' },

    { type: 'text', heading: 'How dangerous is it?', id: 'safety', paras: [
      { text: 'Traffic is a real risk in Vietnam, but the numbers are falling. Police counted 10,379 road deaths across the country in the year to mid-December 2025, about 6% fewer than the year before, and 7,198 in the first nine months of 2026. The World Health Organization’s estimates, made a different way and running higher, show the death rate falling from 25.4 per 100,000 people in 2010 to 17.7 in 2021.', claimIds: ['C-ROAD-DEATHS'] }
    ] },
    { type: 'note', text: 'Police counts and WHO estimates are measured differently and should not be compared directly. Both point the same way: down.', claimIds: ['C-ROAD-DEATHS'] },

    { type: 'text', heading: 'A quieter centre on weekend nights', id: 'centre', paras: [
      { text: 'Crossing is easiest of all where there is no traffic. Every Friday to Sunday evening, the streets around Hoàn Kiếm Lake close to vehicles and become a walking space. In July 2026 this became the first phase of a low-emission pilot zone. A government directive had asked Hà Nội to keep petrol motorbikes out of the whole inner ring road from that date; the city chose to go in stages, and pushed the wider limits back to 2028.', claimIds: ['C-ROAD-DIR20', 'C-HK-WALK'] }
    ] },
    { type: 'figure', image: 'ev-lake-saturday', size: 'bleed', caption: 'The car-free lakeside on a Saturday night.' },

    { type: 'text', heading: 'Walking with children', id: 'children', paras: [
      { text: 'The law asks adults to lead children under seven by the hand when crossing, and asks everyone to help children, pregnant women, older people and disabled people across the road. Use the pavement where there is one, and keep to the right-hand edge of the road where there isn’t.', claimIds: ['C-ROAD-ART30'] }
    ] },

    { type: 'dodont', heading: 'At a glance', do: { title: 'Usually works', items: [
      { text: 'Use lights, crossings and footbridges when you can.', claimIds: ['C-ROAD-WHERE'] },
      { text: 'Raise a hand where there is no crossing.', claimIds: ['C-ROAD-HAND'] },
      { text: 'Walk at a steady, even pace and watch the riders.', claimIds: ['C-CROSS-STEADY'] },
      { text: 'Cross alongside local people.', claimIds: ['C-CROSS-LOCALS'] }
    ] }, think: { title: 'Think twice', items: [
      { text: 'Stopping, stepping back or running halfway across.', claimIds: ['C-CROSS-STEADY'] },
      { text: 'Stepping out in front of a car or bus.', claimIds: ['C-CROSS-TIP'] },
      { text: 'Holding your phone or bag on the traffic side.', claimIds: ['C-BAG-SIDE'] },
      { text: 'Assuming a green light means no one is coming.', claimIds: ['C-ROAD-ALERT'] }
    ] } },
    { type: 'keep', title: 'Take it with you', items: [
      { term: 'Crossing', text: 'Use one if there is one.' },
      { term: 'Hand', text: 'Raise it where there isn’t.' },
      { term: 'Pace', text: 'Steady. Don’t stop, don’t run.' },
      { term: 'Big vehicles', text: 'Let them pass.' },
      { term: 'Bag', text: 'Away from the road.' }
    ] },
    { type: 'quiz', image: 'ev-oq-pavement', question: 'Halfway across, a motorbike is coming', prompt: 'You are in the middle of the road and a motorbike is heading towards you. What should you do?', fitLabel: 'That fits', otherLabel: 'Think again', options: [
      { label: 'Stop and wait for it to pass', feedback: 'Stopping suddenly is what riders find hardest to predict. They are already steering for where you were going to be.' },
      { label: 'Keep walking at the same steady pace', fit: true, feedback: 'A steady walker is easy to read. The rider will pass behind or in front of you.' },
      { label: 'Run to the other side', feedback: 'Running changes your speed without warning, and that is what causes near misses.' }
    ] }
  ]
};

module.exports = { sources, claims, stories: [story] };
