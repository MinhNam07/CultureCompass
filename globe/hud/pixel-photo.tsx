import { useEffect, useRef } from "react";

/** Draws a real photograph at a tiny size so the browser scales it up into chunky pixels.
 *  It starts almost sharp and breaks down into pixels, a stand-in for the destination's game scene. */
export function PixelPhoto({ src, columns = 150, reducedMotion = false, className }: { src: string; columns?: number; reducedMotion?: boolean; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let cancelled = false;
    const timers: number[] = [];
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      const ratio = img.naturalHeight / img.naturalWidth || 0.66;
      const draw = (cols: number, posterize: boolean) => {
        const w = Math.max(8, Math.round(cols));
        const h = Math.max(6, Math.round(cols * ratio));
        el.width = w;
        el.height = h;
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, w, h);
        if (!posterize) return;
        try {
          const data = ctx.getImageData(0, 0, w, h);
          const d = data.data, step = 255 / 7;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = Math.round(d[i] / step) * step;
            d[i + 1] = Math.round(d[i + 1] / step) * step;
            d[i + 2] = Math.round(d[i + 2] / step) * step;
          }
          ctx.putImageData(data, 0, 0);
        } catch {
          // Pages opened from file:// cannot read canvas pixels; the plain downscale still looks pixelated.
        }
      };
      if (reducedMotion) { draw(columns, true); return; }
      const sequence = [720, 420, 280, columns];
      sequence.forEach((cols, i) => {
        timers.push(window.setTimeout(() => { if (!cancelled) draw(cols, i === sequence.length - 1); }, i * 110));
      });
    };
    img.src = src;
    return () => { cancelled = true; timers.forEach((t) => window.clearTimeout(t)); };
  }, [src, columns, reducedMotion]);

  return <canvas ref={canvas} className={className} aria-hidden="true" />;
}
