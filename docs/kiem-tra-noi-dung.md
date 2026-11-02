# Kiểm tra nội dung “Being verified” — ĐÃ CHỐT 01/11/2026

**Kết quả:** cả 8 claim đã có thêm nguồn báo chí / tham khảo (Tuổi Trẻ News, VietNamNet, VOV5, Cultural Atlas, và trang chính thức vietnam.travel cho cách xưng hô) → `published`. Sửa câu chữ: C-ADDR-NAME (nói rõ “từ xưng hô + tên”), C-BARGAIN-MARKET (“người bán rong và sạp không ghi giá”), C-BARGAIN-WALK. 11 câu nói đều đúng chính tả, tự nhiên → `reviewed`; ph-xungho đổi nghĩa tiếng Anh thành “What should I call you?”. Danh sách bên dưới là nội dung trước khi chốt.


Tạo ngày 01/11/2026 từ `assets/data/scenarios.json` và `assets/data/phrases.json`.
Cách dùng: đọc từng mục, đánh dấu `[x]` nếu đúng, hoặc ghi chỗ cần sửa ngay dưới mục đó. Xong thì báo Claude để đổi status trong JSON (claim → `published`, câu nói → `reviewed`) và chạy lại `npm run build` + `npm run check`.

## A. 8 claim (nội dung văn hoá)

Mỗi claim đang dựa trên một nguồn phụ (không chính thức), nên site gắn nhãn “Being verified”. Bỏ nhãn được khi: (1) mày thấy đúng với thực tế ở Hà Nội, **và** (2) nguồn nói đúng như vậy. Nếu biết nguồn tốt hơn (báo chính thống, trang chính phủ), ghi link vào.

### [x] C-ADDR-TERMS
> Common terms: anh (a man somewhat older than you), chị (a woman somewhat older), em (someone younger), cô / chú / bác (people of your parents’ generation).

- Nguồn: [Common Vietnamese names and forms of address](https://www.vietnamairlines.com/en/useful-information/travel-guide/common-vietnam-names) — Vietnam Airlines (travel guide). Giới hạn: Travel-marketing guide, not a linguistic source. Treated as “being verified”.
- Xuất hiện trong story: Why use family words with strangers?
- Ghi chú của Henry: 

### [x] C-ADDR-NAME
> Calling someone by their first name alone, without a family term, is often felt to be impolite.

- Nguồn: [Common Vietnamese names and forms of address](https://www.vietnamairlines.com/en/useful-information/travel-guide/common-vietnam-names) — Vietnam Airlines (travel guide). Giới hạn: Travel-marketing guide, not a linguistic source. Treated as “being verified”.
- Xuất hiện trong story: Why use family words with strangers?
- Ghi chú của Henry: 

### [x] C-CHOP-UPRIGHT
> Chopsticks left standing upright in a bowl of rice can recall the incense sticks used at funerals, so rest them across the bowl or on the table.

- Nguồn: [Vietnamese chopstick etiquette: a traveler’s guide](https://localvietnam.com/culture/cuisine/vietnamese-chopstick/) — localvietnam.com. Giới hạn: Third-party blog. Not confirmed by an official or academic source yet.
- Xuất hiện trong story: Chopsticks and the rice bowl
- Ghi chú của Henry: 

### [x] C-CROSS-STEADY
> Walk at a steady, even pace in a straight line so riders can predict where you will be. Rushing or zigzagging between motorbikes can confuse them.

- Nguồn: [Vietnam Survival Guide: Road Crossing 101](https://vietcetera.com/en/vietnam-survival-guide-road-crossing-101) — Vietcetera (Vietnamese media company), by Quynh Anh, 22 November 2024. Giới hạn: Lifestyle guide, not official road-safety advice. Treated as “being verified” until an official source says the same.
- Xuất hiện trong story: Why raise your hand to cross?
- Ghi chú của Henry: 

### [x] C-CROSS-LOCALS
> If you are unsure, stand with local pedestrians who are about to cross and move when they do.

- Nguồn: [Vietnam Survival Guide: Road Crossing 101](https://vietcetera.com/en/vietnam-survival-guide-road-crossing-101) — Vietcetera (Vietnamese media company), by Quynh Anh, 22 November 2024. Giới hạn: Lifestyle guide, not official road-safety advice. Treated as “being verified” until an official source says the same.
- Xuất hiện trong story: Why raise your hand to cross?
- Ghi chú của Henry: 

### [x] C-BARGAIN-MARKET
> Bargaining is common in local markets, where many goods have no price tag.

- Nguồn: [Vietnam Survival Guide: Bargaining 101](https://vietcetera.com/en/vietnam-survival-guide-bargaining-101) — Vietcetera (Vietnamese media company). Giới hạn: A lifestyle article (5 December 2024), not an official source. Its advice to open at half the quoted price is not used here.
- Xuất hiện trong story: Shopping at a market
- Ghi chú của Henry: 

### [x] C-BARGAIN-POLITE
> Bargaining goes best when it is polite and respectful; a friendly manner with the seller helps.

- Nguồn: [Vietnam Survival Guide: Bargaining 101](https://vietcetera.com/en/vietnam-survival-guide-bargaining-101) — Vietcetera (Vietnamese media company). Giới hạn: A lifestyle article (5 December 2024), not an official source. Its advice to open at half the quoted price is not used here.
- Xuất hiện trong story: Shopping at a market
- Ghi chú của Henry: 

### [x] C-BARGAIN-WALK
> If you don’t want to buy, you can say “Không, cảm ơn” (No, thank you) and walk on.

- Nguồn: [Vietnam Survival Guide: Bargaining 101](https://vietcetera.com/en/vietnam-survival-guide-bargaining-101) — Vietcetera (Vietnamese media company). Giới hạn: A lifestyle article (5 December 2024), not an official source. Its advice to open at half the quoted price is not used here.
- Xuất hiện trong story: Shopping at a market
- Ghi chú của Henry: 

## B. 11 câu nói tiếng Việt

Kiểm tra: câu có tự nhiên không, dấu đúng không, nghĩa tiếng Anh đúng không, và lời dặn “dùng với ai” có hợp không.

### [x] ph-xinchao-co: Xin chào cô.
- Nghĩa (tiếng Anh): Hello (to a woman of your parents’ generation).
- Dùng với: A woman who has introduced herself as “cô”, or who is about your parents’ age. Swap “cô” for the word the person uses about themself.
- Ghi chú của Henry: 

### [x] ph-xungho: Tôi nên gọi bạn thế nào ạ?
- Nghĩa (tiếng Anh): How should I call you?
- Dùng với: Anyone you are meeting for the first time. Asking is a respectful choice, not a mistake.
- Ghi chú của Henry: 

### [x] ph-noicham: Xin nói chậm hơn được không ạ?
- Nghĩa (tiếng Anh): Could you speak more slowly, please?
- Dùng với: Anyone, when you did not catch what was said.
- Ghi chú của Henry: 

### [x] ph-no: Tôi no rồi, cảm ơn.
- Nghĩa (tiếng Anh): I’m full, thank you.
- Dùng với: A host who keeps adding food to your bowl. Saying you are full is the polite way to stop.
- Ghi chú của Henry: 

### [x] ph-chupanh-nguoi: Tôi chụp ảnh bạn được không?
- Nghĩa (tiếng Anh): May I take a photo of you?
- Dùng với: A person you would like to photograph. Accept “no” with a smile.
- Ghi chú của Henry: 

### [x] ph-chupanh-noi: Ở đây có được chụp ảnh không ạ?
- Nghĩa (tiếng Anh): Is photography allowed here?
- Dùng với: Staff or a guide at a temple, museum or heritage site.
- Ghi chú của Henry: 

### [x] ph-hoiho: Hồ Hoàn Kiếm ở đâu ạ?
- Nghĩa (tiếng Anh): Where is Hoàn Kiếm Lake, please?
- Dùng với: Anyone you have just called with “ơi”. The “ạ” at the end makes it more polite.
- Ghi chú của Henry: 

### [x] ph-baonhieu: Cái này bao nhiêu tiền?
- Nghĩa (tiếng Anh): How much is this?
- Dùng với: A seller at a market stall, while pointing at the thing you mean.
- Ghi chú của Henry: 

### [x] ph-khongcamon: Không, cảm ơn.
- Nghĩa (tiếng Anh): No, thank you.
- Dùng với: A seller, when you don’t want to buy. Say it with a smile and walk on.
- Ghi chú của Henry: 

### [x] ph-motsuat: Cho tôi một suất.
- Nghĩa (tiếng Anh): One serving, please.
- Dùng với: The cook at a street-food stall, while pointing at the dish.
- Ghi chú của Henry: 

### [x] ph-tinhtien: Chị ơi, tính tiền!
- Nghĩa (tiếng Anh): Excuse me, the bill please! (to a woman a bit older than you)
- Dùng với: The cook or owner when you are ready to pay. Swap “chị” for “anh” (a man a bit older) or “cô” (a woman your parents’ age).
- Ghi chú của Henry: 

