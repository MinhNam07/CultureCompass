"use client";
import { Component, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Globe3D, globeFocusGeometry } from "@/components/ui/3d-globe";
import { countries, type CountryMarker } from "@/globe/countries";
import { CountryHud } from "@/globe/hud/country-hud";

function hashCountry() {
  const code = window.location.hash.replace(/^#/, "");
  return countries.find((item) => item.code === code) || null;
}
function tellParent(data: Record<string, unknown>) {
  if (window.parent === window) return;
  window.parent.postMessage(data, window.location.origin === "null" ? "*" : window.location.origin);
}

// Fixed positions keep the star field stable across previews and selections.
const stars = Array.from({ length: 780 }, (_, i) => {
  const random = (salt: number) => { const n = Math.sin((i + 1) * salt) * 43758.5453; return n - Math.floor(n); };
  return { x: random(12.9898) * 1600, y: random(78.233) * 1000, r: .35 + random(39.425) * 1.05, opacity: .25 + random(17.71) * .7 };
});

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={back ? { transform: "rotate(180deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

// When a country opens, the globe shrinks to the bottom centre and a V-shaped beam rises from
// the country into the HUD above it. Only on wide screens: phones have no room for both.
/* the globe opens facing South-East Asia with Vietnam just above centre, then auto-rotates from there */
const START_VIEW = { lat: 10, lng: 108 };
const FOCUS_TILT = 34;      // the focus sits this many degrees above the globe's centre
const GLOBE_SCALE = 0.9;    // the globe rises as a horizon; its lower half fades out below the section edge
const PIN_FROM_BOTTOM = 100;
const HUD_SPACE = 220;      // room kept under the HUD panel for the beam and the globe (px)
const WIDE = "(min-width: 861px)";
const CLOSE_MS = 480;       // the HUD folds into the beam and the beam sinks into the globe, then the globe returns

export interface HudFocus { lat: number; lng: number; key: string }
interface Point { x: number; y: number }

/** Offset of `el` inside `root`, ignoring CSS transforms (so it is stable while the globe is moved). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0, y = 0, node: HTMLElement | null = el;
  while (node && node !== root) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function HudBeam({ pin, target, root, closing }: { pin: Point; target: string; root: HTMLElement; closing: boolean }) {
  const [panel, setPanel] = useState<{ l: number; r: number; b: number } | null>(null);
  useLayoutEffect(() => {
    const el = root.querySelector<HTMLElement>(".hud-panel");
    if (!el) return;
    const measure = () => {
      const a = el.getBoundingClientRect(), o = root.getBoundingClientRect();
      setPanel({ l: a.left - o.left, r: a.right - o.left, b: a.bottom - o.top });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el); ro.observe(root);
    return () => ro.disconnect();
  }, [root]);
  // The first beam waits for the globe to settle; later ones (a new place) come in sooner.
  const first = useRef(target);
  const swapped = useRef(false);
  if (target !== first.current) swapped.current = true;
  if (!panel || panel.b >= pin.y - 20) return null;
  const inset = (panel.r - panel.l) * 0.1;
  const L = panel.l + inset, R = panel.r - inset, w = R - L;
  // A soft cone of light: brightest at the globe, fading out before it reaches the HUD.
  return (
    <svg className={`hud-beam-page ${closing ? "is-closing" : ""} ${swapped.current ? "is-swapped" : ""}`} aria-hidden="true">
      <defs>
        <linearGradient id="hud-beam-fill" gradientUnits="userSpaceOnUse" x1="0" y1={pin.y} x2="0" y2={panel.b}>
          <stop offset="0" stopColor="#9eeef7" stopOpacity=".7" />
          <stop offset=".5" stopColor="#5fd8e8" stopOpacity=".24" />
          <stop offset="1" stopColor="#5fd8e8" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id="hud-beam-line" gradientUnits="userSpaceOnUse" x1="0" y1={pin.y} x2="0" y2={panel.b}>
          <stop offset="0" stopColor="#9eeef7" stopOpacity=".9" />
          <stop offset="1" stopColor="#9eeef7" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id="hud-beam-glow" gradientUnits="userSpaceOnUse" x1="0" y1={pin.y} x2="0" y2={panel.b}>
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".7" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="hud-beam-v" key={target}>
        <polygon className="hud-beam-fill" points={`${pin.x},${pin.y} ${L},${panel.b} ${R},${panel.b}`} fill="url(#hud-beam-fill)" />
        <polygon className="hud-beam-core" points={`${pin.x},${pin.y} ${pin.x - w * 0.08},${panel.b} ${pin.x + w * 0.08},${panel.b}`} fill="url(#hud-beam-glow)" />
        <path className="hud-beam-edge" d={`M${L} ${panel.b} L${pin.x} ${pin.y} L${R} ${panel.b}`} stroke="url(#hud-beam-line)" />
      </g>
      <g className="hud-beam-pin">
        <circle className="hud-beam-pulse" cx={pin.x} cy={pin.y} r={9} />
        <circle className="hud-beam-dot" cx={pin.x} cy={pin.y} r={5} />
      </g>
    </svg>
  );
}

class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="destination-globe-fallback" role="status"><p>The globe is unavailable.</p><p>You can still explore every destination using the country list above.</p></div> : this.props.children; }
}

export default function Globe3DDemo({ embedded = false }: { embedded?: boolean }) {
  const [hovered, setHovered] = useState<CountryMarker | null>(null);
  const [selected, setSelected] = useState<CountryMarker | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [globeExpanded, setGlobeExpanded] = useState(false);
  const picker = useRef<HTMLSelectElement>(null);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [hudFocus, setHudFocus] = useState<HudFocus | null>(null);
  const [pin, setPin] = useState<Point | null>(null);
  const [stageMove, setStageMove] = useState<string | undefined>(undefined);
  const beamed = !!selected && wide;
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(0);
  const blankPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(WIDE);
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setHudFocus(null);
    // Closing ends once the country is gone, whichever way it went (Esc, button, browser Back).
    window.clearTimeout(closeTimer.current);
    setClosing(false);
  }, [selected]);

  // Move the globe so the focus lands just above the bottom centre of the section.
  useLayoutEffect(() => {
    const root = section.current, el = stage.current;
    if (!beamed || !root || !el) { setStageMove(undefined); setPin(null); return; }
    const place = () => {
      const base = offsetWithin(el, root);
      const g = globeFocusGeometry(FOCUS_TILT);
      const p = { x: root.clientWidth / 2, y: root.clientHeight - PIN_FROM_BOTTOM };
      const tx = p.x - base.x - GLOBE_SCALE * base.w / 2;
      const ty = p.y - base.y - GLOBE_SCALE * g.pin * base.h;
      setStageMove(`translate(${tx}px, ${ty}px) scale(${GLOBE_SCALE})`);
      setPin((prev) => prev && Math.abs(prev.x - p.x) < 1 && Math.abs(prev.y - p.y) < 1 ? prev : p);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(root);
    return () => ro.disconnect();
  }, [beamed]);

  // The HUD is an overlay with its own history entry (#vn, #jp …), so the browser Back button closes it.
  useEffect(() => {
    const initial = hashCountry();
    if (initial) setSelected(initial);
    const onPop = () => {
      const country = hashCountry();
      setHovered(null);
      setSelected(country);
      if (!country) picker.current?.focus({ preventScroll: true });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function preview(country: CountryMarker | null) {
    setHovered(country);
  }
  function chooseCountry(country: CountryMarker) {
    setHovered(null);
    setSelected(country);
    setGlobeExpanded(false);
    if (window.location.hash !== `#${country.code}`) {
      if (window.history.state?.ccHud) window.history.replaceState({ ccHud: country.code }, "", `#${country.code}`);
      else window.history.pushState({ ccHud: country.code }, "", `#${country.code}`);
    }
    tellParent({ type: "culturecompass-hud", open: true });
  }
  function closeCountry() {
    if (closing) return;
    if (beamed && !reducedMotion) {
      setClosing(true);
      closeTimer.current = window.setTimeout(finishClose, CLOSE_MS);
      return;
    }
    finishClose();
  }
  function finishClose() {
    setHovered(null);
    setGlobeExpanded(false);
    if (window.history.state?.ccHud) { window.history.back(); return; }
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setSelected(null);
    picker.current?.focus({ preventScroll: true });
  }

  return (
    <section ref={section} style={{ "--hud-space": `${HUD_SPACE}px` } as CSSProperties} className={`destination-experience ${beamed ? "is-beamed" : ""} ${closing ? "is-closing" : ""} ${selected ? "has-selection" : ""} ${globeExpanded ? "is-globe-expanded" : ""} ${selected ? "has-hud" : ""}`} onPointerDown={(event) => { blankPointer.current = { x: event.clientX, y: event.clientY }; }} onClick={(event) => {
      const start = blankPointer.current;
      blankPointer.current = null;
      if (!selected || !start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
      const target = event.target as Element;
      if (!target.closest("button, a, select, label, .cc-hud, .destination-story, .destination-header, .destination-orbit, .destination-footer")) closeCountry();
    }} onKeyDown={(event) => { if (event.key === "Escape" && selected) { event.preventDefault(); closeCountry(); } }}>
      <svg className="destination-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{stars.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#fff" opacity={star.opacity} />)}</svg>
      <div className="destination-layout">
        <div className="destination-explore">
          <header className="destination-header">
            <h1>{embedded ? "Choose a destination" : "A world worth understanding."}</h1>
            <p>Explore a place through its stories and everyday life.</p>
          </header>
          <label className="destination-picker" htmlFor="country-picker">
            Find a country
            <select ref={picker} id="country-picker" value={selected?.code || ""} onChange={(event) => {
              const country = countries.find((item) => item.code === event.target.value);
              if (country) chooseCountry(country);
            }}>
              <option value="" disabled>Choose a country</option>
              {countries.map((country) => <option key={country.code} value={country.code}>{country.label}</option>)}
            </select>
          </label>
          {selected && <button className="destination-globe-toggle" aria-expanded={globeExpanded} aria-controls="destination-orbit" onClick={() => setGlobeExpanded(!globeExpanded)}>{globeExpanded ? "Hide globe" : "Explore the globe"}<Arrow /></button>}
          <div className="destination-orbit" id="destination-orbit">
            <div className="destination-globe-stage" ref={stage} style={{ transform: stageMove }}>
            <GlobeBoundary>
              <Globe3D onBlankClick={selected ? closeCountry : undefined} markers={countries} selectedMarker={selected} reducedMotion={reducedMotion} className="destination-canvas"
                focus={beamed ? hudFocus ?? selected : null} focusTilt={beamed ? FOCUS_TILT : 0} locked={beamed} config={{ bumpScale: .65, ambientIntensity: 1.6, pointLightIntensity: 1.1, frontLightIntensity: 3.2, initialView: START_VIEW, autoRotateSpeed: hovered || selected || reducedMotion ? 0 : 0.3 }}
                onMarkerHover={(marker) => preview(marker as CountryMarker | null)}
                onMarkerClick={(marker) => chooseCountry(marker as CountryMarker)} />
            </GlobeBoundary>
            </div>
            <p className="destination-orbit-hint">Drag to explore. Select a flag to look closer.</p>
            <p className="destination-preview" aria-live="polite">{hovered && hovered.code !== selected?.code ? hovered.label : selected ? `${selected.label} selected` : "Let curiosity choose your next stop."}</p>
          </div>
        </div>
        <div className="destination-invitation" aria-live="polite">
            <p className="destination-invitation-title">{hovered ? hovered.label : "Let curiosity lead the way."}</p>
            <p>{hovered ? "Select the flag to take a closer look." : "Choose a flag on the globe, or find your destination in the country list."}</p>
        </div>
      </div>
      {selected && <CountryHud key={selected.code} country={selected} reducedMotion={reducedMotion} beamed={beamed} closing={closing} onFocus={setHudFocus} onClose={closeCountry} />}
      {beamed && pin && section.current && <HudBeam pin={pin} target={hudFocus?.key ?? selected.code} root={section.current} closing={closing} />}
      <p className="destination-announcement" role="status">{selected ? `${selected.label} selected. Its destinations are open.` : "Choose a destination."}</p>
      <footer className="destination-footer">
      </footer>
    </section>
  );
}
