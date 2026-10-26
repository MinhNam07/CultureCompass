/* CultureCompass — layout sweep (QA helper, not loaded by the site).
   Paste into the browser console on any page of the running site (npm run dev → http://localhost:8765),
   with the viewport set to the width you want to test (320, 390, 768, 1280×720, 1920×1080).
   It loads each page in a hidden frame of the same size and reports:
     X …     an element sticking out past the left/right edge (would cause sideways scrolling)
     CLIPH … a heading whose text is cut off by overflow
   Pictures inside cropped frames (thumbnails, video) are skipped on purpose.
   Returns { page: { sw: page scroll width, W: viewport width, bad: [...] } }. */
(async () => {
const W0 = innerWidth, H0 = innerHeight;
const pages=['index.html','vietnam.html','vietnam.html#food','story.html?id=st-hand&from=theme:people','story.html?id=st-stelae','scene.html?id=sc04','phrases.html','collection.html','about.html'];
const out={};
for (const p of pages){ const f=document.createElement('iframe'); f.style.cssText=`position:fixed;left:0;top:0;width:${W0}px;height:${H0}px;border:0;opacity:0;pointer-events:none`; document.body.appendChild(f); f.src='/'+p; await new Promise(r=>f.onload=r); await new Promise(r=>setTimeout(r,900)); const d=f.contentDocument, w=f.contentWindow; const W=w.innerWidth; const bad=[];
 d.querySelectorAll('body *').forEach(el=>{ if(el.closest('svg')&&el.tagName!=='svg') return; if(el.closest('.story-thumb,.story-pic,.scene-pic,.frame,.visually-hidden,.offcanvas,[hidden],.cc-subnav-in,.atlas-lines,.hero-media,.dest-stage')) return; const r=el.getBoundingClientRect(); if(!r.width||!r.height) return; if(r.right>W+1||r.left<-1) bad.push('X '+el.tagName+'.'+String(el.className.baseVal??el.className).slice(0,40)+' '+Math.round(r.left)+'-'+Math.round(r.right));
 const cs=w.getComputedStyle(el); if(/^h[1-4]$/i.test(el.tagName) && el.scrollHeight>el.clientHeight+3 && cs.overflow!=='visible') bad.push('CLIPH '+el.textContent.slice(0,30)); });
 out[p]={sw:d.documentElement.scrollWidth, W, bad:[...new Set(bad)].slice(0,6)}; f.remove(); }
return out;
})();
