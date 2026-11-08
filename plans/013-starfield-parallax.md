# 013 — Nền sao trôi nhẹ theo tên lửa (tuỳ chọn)

- **Status**: TODO
- **Commit**: e48080b + các thay đổi chưa commit của plan 003–007
- **Severity**: LOW (tuỳ chọn; chỉ làm nếu sau 008–012 vẫn thấy thiếu chiều sâu)
- **Category**: Missed opportunities
- **Estimated scope**: `components/3d-globe-demo.tsx` (~30 dòng), `globe/styles.css` (1 dòng), `assets/js/rocket.js` (~15 dòng), build lại quả cầu

## Problem

Nền sao ở khu chọn điểm đến là một SVG tĩnh gồm 780 chấm, nằm trong iframe quả cầu:

```tsx
/* components/3d-globe-demo.tsx:246 — hiện tại */
<svg className="destination-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{stars.map(...)}</svg>
```
```css
/* globe/styles.css:82 — hiện tại */
.destination-stars { position:absolute; inset:0; width:100%; height:100%; z-index:-2; pointer-events:none; opacity:1; transition:opacity .4s ease; }
```

Khi tên lửa lao vào và đỗ, sao đứng yên tuyệt đối, nên không có cảm giác chiều sâu hay đang ở giữa không gian.

## Target

- Lớp sao dịch **ngược chiều chuyển động trên màn hình của tên lửa**, rất nhẹ: tối đa ±24px, qua một spring nên mượt và có quán tính.
- Khi đỗ: sao trôi rất chậm, 3 px/giây, ngược hướng mũi, nên có cảm giác tàu vẫn đang đi. Vị trí được quấn trong ±24px rồi đổi chiều bằng sin, không trôi mãi về một phía. Cụ thể: `offset = 24 · sin(t · 3 / 24)` theo hướng ngược mũi.
- Lớp sao phóng to `scale(1.04)` để không lộ mép khi dịch.
- Trang chính gửi cho iframe **tối đa 20 tin nhắn/giây**, và chỉ khi tên lửa ở trong khu quả cầu (đỗ, hoặc đang lượn vào với `phase === 'swoop'`).
- Tôn trọng reduced motion trong iframe: khi bật thì không dịch.

## Repo conventions to follow

- Trang chính ↔ iframe nói chuyện bằng `postMessage` cùng origin. Iframe gửi `type: "culturecompass-rocket"` (3d-globe-demo.tsx, effect "tell the parent where the globe is"). Trang chính lắng nghe ở `rocket.js` (cuối file, `window.addEventListener('message', ...)`) và luôn kiểm `e.source` và `e.origin`. Làm y như vậy cho chiều ngược lại.
- Iframe đã có state `reducedMotion` (3d-globe-demo.tsx:108, 149-154).

## Steps

1. `rocket.js`: khai báo `var lastStarMsg = 0;`. Cuối `frame()`, trước phần hẹn frame tiếp:
   ```js
   if ((t.phase === 'parked' || t.phase === 'swoop') && !m.phone && onScreen && now - lastStarMsg > 50 && els.frame.contentWindow) {
     lastStarMsg = now;
     els.frame.contentWindow.postMessage({ type: 'culturecompass-stars', vx: sp.vx / m.vh, vy: sp.vy / m.vh, head: sp.h, parked: t.phase === 'parked' }, window.location.origin);
   }
   ```
2. `3d-globe-demo.tsx`: thêm `const starsRef = useRef<SVGSVGElement>(null);` và gắn `ref={starsRef}` vào `<svg className="destination-stars">`.
3. Thêm một effect (chỉ khi `embedded` và không `reducedMotion`):
   ```tsx
   useEffect(() => {
     if (!embedded || reducedMotion) return;
     const el = starsRef.current; if (!el) return;
     let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, raf = 0, last = 0, info: { vx: number; vy: number; head: number; parked: boolean } | null = null, at = 0;
     const MAX = 24, w = 2 * Math.PI / 0.6, k = w * w, c = 2 * 0.9 * w;   // spring: 0.6 s response, damping 0.9
     const tick = (now: number) => {
       const dt = Math.min(64, last ? now - last : 16.7) / 1000; last = now;
       if (info) {
         if (info.parked) { const h = info.head * Math.PI / 180, o = MAX * Math.sin(now / 1000 * 3 / MAX); tx = -Math.sin(h) * o; ty = Math.cos(h) * o; }
         else { tx = Math.max(-MAX, Math.min(MAX, -info.vx * 12)); ty = Math.max(-MAX, Math.min(MAX, -info.vy * 12)); }
       }
       if (now - at > 400) { info = null; tx = 0; ty = 0; }   // the rocket stopped talking: drift home
       vx += (-k * (x - tx) - c * vx) * dt; x += vx * dt;
       vy += (-k * (y - ty) - c * vy) * dt; y += vy * dt;
       el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1.04)`;
       raf = Math.abs(x) + Math.abs(y) + Math.abs(vx) + Math.abs(vy) > 0.05 || info ? requestAnimationFrame(tick) : 0;
     };
     const onMsg = (e: MessageEvent) => {
       if (e.source !== window.parent || e.origin !== window.location.origin || e.data?.type !== "culturecompass-stars") return;
       info = e.data; at = performance.now();
       if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
     };
     window.addEventListener("message", onMsg);
     return () => { window.removeEventListener("message", onMsg); cancelAnimationFrame(raf); el.style.transform = ""; };
   }, [embedded, reducedMotion]);
   ```
4. `globe/styles.css:82`: thêm `will-change:transform; transform:scale(1.04);` vào `.destination-stars`.
5. `npm run build:globe` (có typecheck), rồi tăng `?v=` của `rocket.js` trong `index.html:77`.

## Boundaries

- KHÔNG đụng quả cầu WebGL, các lá cờ hay HUD.
- KHÔNG gửi tin nhắn mỗi frame (tối đa 20/giây) và không gửi khi tên lửa ở ngoài khu quả cầu.
- Biên độ tối đa 24px. Nếu sau feel-check vẫn thấy chóng mặt thì giảm xuống 12, không tăng.
- Lớp sao chỉ được đổi `transform`.

## Verification

- **Mechanical**: `npm run build` (có typecheck) chạy thành công; console sạch ở cả trang chính và iframe.
- **Feel check**:
  - Lượn vào chỗ đỗ: sao trượt nhẹ ngược chiều tên lửa rồi lắng lại mượt.
  - Đỗ 20 giây: sao trôi rất chậm, ngược hướng mũi, như tàu vẫn đang bay; không lộ mép đen ở cạnh khung.
  - Cuộn đi chỗ khác: sao về vị trí 0 trong khoảng 1 giây rồi vòng rAF trong iframe dừng (DevTools → Performance không còn frame nào từ iframe).
  - Bật reduced motion: sao đứng yên.
- **Done when**: khu quả cầu có chiều sâu nhẹ, không gây chóng mặt, và không còn chi phí khi tên lửa ở chỗ khác.
