# 003 — Tên lửa mờ đi và hiện lại mượt khi mở/đóng thẻ quốc gia

- **Status**: DONE (8/11) — đã kiểm: mở thẻ thì mờ về 0, đóng thẻ thì transition 250ms từ 0 lên 1 sau khi thẻ gập xong (~500ms)
- **Commit**: e48080b
- **Severity**: HIGH
- **Category**: Interruptibility / Easing & duration
- **Estimated scope**: 2 file (`assets/js/rocket.js`, `assets/css/refinements.css`), ~15 dòng; đổi `?v=` trong `index.html`

## Problem

Khi người dùng mở một quốc gia trên quả cầu, iframe gửi `hud: true` và tên lửa nhận class `is-away`.
Transition chỉ nằm trong chính class đó:

```css
/* assets/css/refinements.css:139 và :142 — hiện tại */
.cc-rocket { position: fixed; left: 0; top: 0; z-index: 39; pointer-events: none; transform-origin: 50% 50%; will-change: transform, opacity; }
.cc-rocket.is-away { opacity: 0 !important; transition: opacity .3s ease; }
```

```js
/* assets/js/rocket.js:286-287 — hiện tại */
var hidden = globe && globe.hud;
els.fly.classList.toggle('is-away', !!hidden);
```

Lỗi:
1. Lúc đóng thẻ, class bị gỡ thì transition cũng mất theo, nên tên lửa **hiện lại ngay lập tức** (opacity 0 lên 1 trong 1 frame).
2. `ease` có sẵn của CSS quá yếu. 300ms cho một phản hồi của hệ thống là chậm.
3. `!important` phải đè lên opacity mà JS đặt inline mỗi frame (`drawFly`, rocket.js:266). Dùng chung một thuộc tính cho hai việc nên mới phải hack.

## Target

Tách thành hai lớp, mỗi lớp lo một việc:
- `.cc-rocket` (lớp ngoài): JS đặt `transform` và `opacity` mỗi frame như cũ. Opacity này dùng cho việc mờ dần trên điện thoại.
- `.cc-rocket-fade` (lớp mới bên trong): chỉ lo việc mờ đi và hiện lại khi mở/đóng thẻ, bằng CSS transition ở **cả hai chiều**.

Thời gian bất đối xứng: lúc tránh đi thì nhanh, vì là phản hồi của hệ thống và không được đè lên thẻ đang mở. Lúc quay lại thì dịu hơn. Iframe chỉ gửi `hud: false` sau khi thẻ đóng xong (`CLOSE_MS = 480` trong `components/3d-globe-demo.tsx:35`), nên không cần thêm delay.

```css
/* target — assets/css/refinements.css */
.cc-rocket-fade { width: 100%; height: 100%; transition: opacity 250ms var(--ease-out); }
.cc-rocket.is-away .cc-rocket-fade { opacity: 0; transition-duration: 150ms; }
```

`--ease-out` đã có trong `assets/css/cc.css:38`: `cubic-bezier(.22, 1, .36, 1)`.

## Repo conventions to follow

- Token easing và thời lượng nằm ở `assets/css/cc.css:38-45` (`--ease-out`, `--t-press: 120ms`, `--t-micro: 200ms`, `--t-open: 300ms`). Dùng `var(--ease-out)`, không tự viết cubic-bezier mới.
- Toàn bộ CSS của tên lửa nằm trong khối `/* ---- Home: the rocket from the logo ---- */` ở `assets/css/refinements.css:132-144`.

## Steps

1. Trong `assets/js/rocket.js`, hàm `build()` (dòng 346), đổi:
   ```js
   els.fly.innerHTML = '<img src="' + PIC.src + '" alt="" decoding="async">';
   ```
   thành:
   ```js
   els.fly.innerHTML = '<div class="cc-rocket-fade"><img src="' + PIC.src + '" alt="" decoding="async"></div>';
   ```
2. Trong `assets/css/refinements.css`, xóa dòng 142 (`.cc-rocket.is-away { opacity: 0 !important; transition: opacity .3s ease; }`).
3. Ngay sau dòng `.cc-rocket.is-hidden { visibility: hidden; }`, thêm hai dòng trong phần **Target**.
4. Giữ nguyên `.cc-rocket img { … }`. Ảnh vẫn rộng 100% và cao 100% so với lớp `.cc-rocket-fade`, mà lớp này rộng/cao bằng `.cc-rocket`.
5. Trong `index.html:77`, đổi `rocket.js?v=20261108-rocket4` thành `rocket.js?v=20261108-rocket5`. Nếu `refinements.css` cũng có `?v=` trong `index.html` thì tăng số đó luôn.

## Boundaries

- KHÔNG sửa đường bay, spring, `CFG`, hay logic `frame()`, ngoài chuỗi `innerHTML` ở bước 1.
- KHÔNG sửa `components/3d-globe-demo.tsx`.
- KHÔNG thêm `!important`.
- Nếu code không khớp các đoạn trích trên (đã thay đổi sau commit e48080b) thì DỪNG và báo lại, không tự xoay xở.

## Verification

- **Mechanical**: `npm run build` chạy thành công. Console trang chủ không có lỗi.
- **Feel check** (`npm run dev`, mở `http://localhost:8765/`, cửa sổ rộng hơn 760px):
  - Cuộn tới "Choose a destination" để tên lửa đỗ cạnh quả cầu.
  - Bấm một quốc gia: tên lửa mờ đi trong khoảng 150ms, không giật.
  - Đóng thẻ: sau khi thẻ gập xong, tên lửa **mờ dần hiện lại** (khoảng 250ms), không bật ra.
  - Mở rồi đóng thật nhanh nhiều lần: opacity đổi chiều từ giá trị đang có, không nhảy về 0 hoặc 1.
  - DevTools → Animations, playback 10%: thấy transition opacity ở cả hai chiều.
  - Thu cửa sổ xuống khoảng 400px: tên lửa vẫn mờ dần ở cuối phần mở đầu như cũ (opacity inline ở lớp ngoài vẫn chạy).
- **Done when**: không còn frame nào tên lửa nhảy từ 0 lên 1 khi đóng thẻ, và CSS của tên lửa không còn `!important` nào cho opacity.
