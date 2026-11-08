# 012 — Khi đỗ: giữ vị trí kiểu tàu vũ trụ thay cho nhấp nhô

- **Status**: TODO
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–006 và 015
- **Severity**: LOW
- **Category**: Cohesion
- **Depends on**: 010 (dùng `rcs()`). Nếu chưa có 010, bỏ qua bước 4.
- **Estimated scope**: `assets/js/rocket.js` (~20 dòng), `index.html` (`?v=`)

## Problem

Khi đỗ, tên lửa nhấp nhô lên xuống đều và lắc qua lại:

```js
/* assets/js/rocket.js:246-252 — hiện tại */
function attached(now, sy) {
  var st = m.station, tsec = (now - startedAt) / 1000, w = 2 * Math.PI / CFG.hover.period;
  var x = st.x, y = st.y - sy + Math.sin(tsec * w) * CFG.hover.amp * m.D;
  var head = Math.sin(tsec * w + 1) * CFG.hover.tilt;
  if (globe && globe.hover && !m.phone) head = headingOf(m.frame.x - window.scrollX + globe.hover.x - x, m.frame.y - sy + globe.hover.y - y);
  return { x: x, y: y, len: st.len, head: head, op: 1, phase: 'parked' };
}
```

Nhấp nhô theo một trục với một nhịp là cảm giác **có trọng lực**, như thuyền trên nước hay drone. Tàu vũ trụ đang "giữ vị trí" cạnh một hành tinh thì trôi rất chậm, không có hướng "xuống", và thỉnh thoảng phụt một tia nhỏ để chỉnh lại.

## Target

- **Trôi theo đường Lissajous** (hai trục với hai nhịp khác nhau, nên không lặp lại đều đặn):
  - `x = st.x + 0.010·D·sin(2π·t/9.0)`
  - `y = st.y − sy + 0.008·D·sin(2π·t/7.0 + 1.3)`
- **Mũi trôi chậm**: `head = 1.5·sin(2π·t/11.0 + 0.4)` độ (thay cho lắc 2° mỗi 3.2s).
- **Tia chỉnh**: mỗi 4–7 giây (ngẫu nhiên) phụt một tia RCS ở bên mà mũi đang trôi về, như đang giữ thăng bằng. Không phụt khi đang chỉ vào lá cờ.
- Việc chỉ vào lá cờ dưới con trỏ giữ nguyên.

## Repo conventions to follow

- `m.D` = đường kính quả cầu theo px; `m.station` = chỗ đỗ (rocket.js, `measure()`).
- `t` tính từ `startedAt` như hiện tại.

## Steps

1. `CFG`: thay dòng `hover: {...}` bằng
   ```js
   keep: { ax: 0.010, ay: 0.008, px: 9.0, py: 7.0, tilt: 1.5, pt: 11.0, puffMin: 4, puffMax: 7 },   // parked drift (diameters), periods (s), nose drift (deg), seconds between trim puffs
   ```
2. Viết lại thân `attached`:
   ```js
   function attached(now, sy) {
     var st = m.station, k = CFG.keep, ts = (now - startedAt) / 1000, TAU = 2 * Math.PI;
     var x = st.x + k.ax * m.D * Math.sin(TAU * ts / k.px);
     var y = st.y - sy + k.ay * m.D * Math.sin(TAU * ts / k.py + 1.3);
     var head = k.tilt * Math.sin(TAU * ts / k.pt + 0.4), pointing = false;
     if (globe && globe.hover && !m.phone) { head = headingOf(m.frame.x - window.scrollX + globe.hover.x - x, m.frame.y - sy + globe.hover.y - y); pointing = true; }
     return { x: x, y: y, len: st.len, head: head, op: 1, phase: 'parked', pointing: pointing };
   }
   ```
3. Tìm mọi chỗ còn dùng `CFG.hover` (`grep -n "CFG.hover" assets/js/rocket.js`) và đổi sang `CFG.keep`. Nếu ngoài `attached` còn chỗ khác dùng `CFG.hover.amp`, DỪNG và báo lại.
4. Tia chỉnh (cần plan 010): khai báo `var nextTrim = 0;`. Trong `frame()`, sau khi có `t`:
   ```js
   if (t.phase === 'parked' && !t.pointing && !hidden && !m.phone && typeof rcs === 'function') {
     if (!nextTrim) nextTrim = now + 1000 * lerp(CFG.keep.puffMin, CFG.keep.puffMax, Math.random());
     else if (now >= nextTrim) {
       var drift = Math.cos(2 * Math.PI * (now - startedAt) / 1000 / CFG.keep.pt + 0.4);   // sign of the nose's drift
       rcs(drift > 0 ? 'right' : 'left', now);
       nextTrim = 0;
     }
   } else nextTrim = 0;
   ```
5. `index.html:77`: tăng `?v=`.

## Boundaries

- KHÔNG đổi chỗ đỗ (`m.station`) hay kích thước khi đỗ.
- KHÔNG đổi cách chỉ vào lá cờ.
- Biên độ không được lớn hơn các giá trị trên: tên lửa ở ngay cạnh chữ, trôi nhiều sẽ gây phân tâm.

## Verification

- **Mechanical**: `node --check`; `npm run build`; console sạch.
- **Feel check**:
  - Đỗ cạnh quả cầu và nhìn 30 giây: tên lửa trôi rất chậm theo một vòng không đều, không có nhịp lên-xuống rõ ràng.
  - Mỗi vài giây có một tia nhỏ ở mũi, không theo nhịp cố định.
  - Đọc đoạn chữ "Let curiosity lead the way" bên cạnh: chuyển động không kéo mắt.
  - Rê chuột qua lá cờ: tên lửa vẫn chỉ đúng cờ; trong lúc chỉ thì không có tia chỉnh.
- **Done when**: không còn cảm giác nhấp nhô có trọng lực, và chuyển động khi đỗ đủ nhỏ để không làm phiền việc đọc.
