import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { CountryMarker } from "@/globe/countries";
import type { HudFocus } from "@/components/3d-globe-demo";
import { countryIntros } from "@/globe/country-intros";
import { hudCountry, zoneSummary, type HudCountry, type HudDestination } from "@/globe/hud/destinations";
import { vnMap } from "@/globe/hud/vn-map.generated";

const M = vnMap;
function xy(lon: number, lat: number): [number, number] { return [(lon - M.lon0) * M.k * M.c, (M.lat1 - lat) * M.k]; }
function coords(lat?: number, lon?: number) { return lat === undefined || lon === undefined ? "" : `${lat.toFixed(2)}°N  ${lon.toFixed(2)}°E`; }
const SWAP_OUT_MS = 180;
function pad(n: number) { return String(n).padStart(2, "0"); }

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" style={back ? { transform: "rotate(180deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function Typed({ text }: { text: string }) {
  return <span className="hud-type" key={text} style={{ "--n": text.length } as CSSProperties}>{text}</span>;
}

function CountryMap({ data, selected, onPick }: { data: HudCountry; selected: HudDestination | null; onPick: (d: HudDestination) => void }) {
  const [peek, setPeek] = useState<string | null>(null);
  const seas = [
    { t: "Quần đảo Hoàng Sa", s: "Hoàng Sa archipelago", lon: 112.0, lat: 17.45 },
    { t: "Quần đảo Trường Sa", s: "Trường Sa archipelago", lon: 114.75, lat: 11.75 },
    { t: "Biển Đông", s: "East Sea", lon: 112.6, lat: 14.1, sea: true },
  ];
  const lands = [{ t: "China", lon: 104.2, lat: 23.6 }, { t: "Laos", lon: 102.6, lat: 19.6 }, { t: "Thailand", lon: 101.0, lat: 15.6 }, { t: "Cambodia", lon: 104.6, lat: 12.9 }];
  return (
    // aria-label rather than <title>, so the description doesn't pop up as a tooltip on hover
    <svg className="hud-map" viewBox={`0 0 ${M.w} ${M.h}`} role="img" aria-label="Map of Vietnam with the Hoàng Sa and Trường Sa archipelagos. Hà Nội is open; Hội An and Đà Nẵng are in development.">
      <defs>
        <pattern id="hud-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" className="hud-grid-line" /></pattern>
      </defs>
      <rect width={M.w} height={M.h} fill="url(#hud-grid)" />
      {M.neighbours.map((n) => <path key={n.name + n.d.length} className="hud-nb" d={n.d} />)}
      <path className="hud-vn" d={M.vn} />
      {M.islets.map((p, i) => <circle key={i} className="hud-islet" cx={p[0]} cy={p[1]} r={2.6} />)}
      {lands.map((l) => { const p = xy(l.lon, l.lat); return <text key={l.t} className="hud-land" x={p[0]} y={p[1]} textAnchor="middle">{l.t}</text>; })}
      {seas.map((l) => {
        const p = xy(l.lon, l.lat);
        return <text key={l.t} className={l.sea ? "hud-sea" : "hud-isl"} x={p[0]} y={p[1]} textAnchor="middle"><tspan x={p[0]}>{l.t}</tspan><tspan className="hud-sub" x={p[0]} dy="1.3em">{l.s}</tspan></text>;
      })}
      {data.destinations.filter((d) => d.lon !== undefined && d.lat !== undefined).map((d) => {
        const [x, y] = xy(d.lon!, d.lat!);
        const on = selected?.id === d.id;
        return (
          <g key={d.id} className={`hud-pin ${d.ready ? "is-ready" : "is-soon"} ${on || peek === d.id ? "is-on" : ""}`} onClick={() => onPick(d)} onPointerEnter={() => setPeek(d.id)} onPointerLeave={() => setPeek(null)} aria-hidden="true">
            {d.ready && <circle className="hud-pin-pulse" cx={x} cy={y} r={10} />}
            <circle className="hud-pin-ring" cx={x} cy={y} r={d.ready ? 13 : 9} />
            <circle className="hud-pin-dot" cx={x} cy={y} r={d.ready ? 6 : 4.5} />
            <circle className="hud-pin-hit" cx={x} cy={y} r={22} />
            <text className="hud-pin-label" x={x + (d.labelDx || 14)} y={y + (d.labelDy || 5)} textAnchor={d.labelAnchor || "start"}>{d.name}{d.ready ? "" : " · soon"}</text>
            {d.ready && <text className="hud-pin-play" x={x + (d.labelDx || 14)} y={y + (d.labelDy || 5) + 22} textAnchor={d.labelAnchor || "start"}>▶ Click to play</text>}
          </g>
        );
      })}
    </svg>
  );
}

export function CountryHud({ country, reducedMotion, beamed = false, closing = false, onFocus, onClose }: { country: CountryMarker; reducedMotion: boolean; beamed?: boolean; closing?: boolean; onFocus?: (focus: HudFocus | null) => void; onClose: () => void }) {
  const data = useMemo(() => hudCountry(country), [country]);
  const intro = countryIntros[country.code];
  const [dest, setDest] = useState<HudDestination | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const lastPicked = useRef<string | null>(null);
  const open = data.destinations.filter((d) => d.ready).length;
  const summary = dest && dest.ready ? zoneSummary(dest) : null;

  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [dest]);
  // The globe under the HUD turns to the chosen place and fires a new beam.
  useEffect(() => {
    onFocus?.(dest ? { lat: dest.lat ?? country.lat, lng: dest.lon ?? country.lng, key: dest.id } : null);
  }, [dest, country, onFocus]);

  // Changing place re-projects the HUD: it fades out with the beam, the globe turns,
  // then the beam fades back in and the HUD splits open on the new place.
  const [swap, setSwap] = useState<"" | "out" | "in">("");
  const swapTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(swapTimer.current), []);
  function change(apply: () => void) {
    if (!beamed || reducedMotion) { apply(); return; }
    if (swap === "out") return;
    setSwap("out");
    swapTimer.current = window.setTimeout(() => { apply(); setSwap("in"); }, SWAP_OUT_MS);
  }
  // An open destination goes straight to its map of places in the game; only places still being built open the panel.
  function go(href: string) { (window.top || window).location.href = new URL(href, window.location.href).href; }
  function pick(d: HudDestination) {
    if (d.ready && d.playHref) { go(d.playHref); return; }
    change(() => { lastPicked.current = d.id; setDest(d); });
  }
  function backToList() {
    change(() => {
      const id = lastPicked.current;
      setDest(null);
      window.requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>(`[data-dest="${id}"]`)?.focus({ preventScroll: true }));
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (dest) backToList(); else onClose();
      return;
    }
    if (event.key !== "Tab" || !panel.current) return;
    const items = [...panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex='0']")].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  const code = `CC // ${data.label.toUpperCase()} // ${dest ? dest.name.toUpperCase() : "SELECT DESTINATION"}`;
  const index = dest ? data.destinations.indexOf(dest) + 1 : 0;

  return (
    <div className={`cc-hud ${beamed ? "is-beamed" : ""} ${closing ? "is-closing" : ""} ${swap ? `is-swap-${swap}` : ""} ${reducedMotion ? "is-still" : ""}`} role="dialog" aria-modal="true" aria-labelledby="hud-title" onKeyDown={onKeyDown}>
      <div className="hud-panel" ref={panel}>
        <span className="hud-line" aria-hidden="true" />
        <span className="hud-corner is-tl" aria-hidden="true" /><span className="hud-corner is-tr" aria-hidden="true" />
        <span className="hud-corner is-bl" aria-hidden="true" /><span className="hud-corner is-br" aria-hidden="true" />
        <span className="hud-scan" aria-hidden="true" />

        <header className="hud-bar">
          <p className="hud-code" aria-hidden="true"><span className="hud-blink" />  <Typed text={code} /></p>
          <button type="button" className="hud-close" onClick={onClose}>Back to the globe <kbd>Esc</kbd></button>
        </header>

        <div className="hud-body">
          <div className={`hud-view ${dest ? "is-scene" : ""}`}>
            {dest ? (
              <div className={`hud-screen is-photo ${dest.ready ? "" : "is-soon"}`} key={dest.id}>
                <img src={dest.photo.src} alt={dest.photo.alt} decoding="async" />
                <span className="hud-scene-tag" aria-hidden="true">LIVE VIEW</span>
                {coords(dest.lat, dest.lon) && <span className="hud-scene-coords" aria-hidden="true">{coords(dest.lat, dest.lon)}</span>}
                {!dest.ready && <p className="hud-construct"><span>Under construction</span>This place is still being built.</p>}
                {data.hasMap && <button type="button" className="hud-mapback" onClick={backToList}><Arrow back /> Back to the map</button>}
              </div>
            ) : data.hasMap ? (
              <div className="hud-screen is-map" key="map"><CountryMap data={data} selected={dest} onPick={pick} /></div>
            ) : (
              <div className="hud-screen is-photo" key="snapshot">
                <img src={data.photo.src} alt={data.photo.alt} decoding="async" />
                <p className="hud-construct is-map-soon"><span>Map in development</span>{data.label} is not mapped yet.</p>
              </div>
            )}
            <span className="hud-view-tag" aria-hidden="true">{dest ? `DEST ${pad(index)}` : `MAP // ${data.label.toUpperCase()}`}</span>
          </div>

          <div className="hud-info">
            {dest ? (
              <div className="hud-dest" key={dest.id}>
                {data.destinations.length > 1 && <button type="button" className="hud-back" onClick={backToList}><Arrow back /> All destinations</button>}
                <p className="hud-kicker">Destination {pad(index)} <span className={dest.ready ? "hud-status is-open" : "hud-status is-soon"}>{dest.ready ? "Open" : "In development"}</span></p>
                <h2 id="hud-title" ref={heading} tabIndex={-1}>{dest.name}</h2>
                <p className="hud-hook">{dest.hook}</p>
                {summary && (
                  <dl className="hud-stats">
                    <div><dt>Places</dt><dd>{summary.places}</dd></div>
                    <div><dt>Time</dt><dd>~{summary.minutes} min</dd></div>
                    <div><dt>Stamps</dt><dd>{summary.stamps}/{summary.places}</dd></div>
                  </dl>
                )}
                {dest.ready ? (
                  <>
                    <p className="hud-note">You walk around the city as a first-time visitor, talk to people and choose what to do in everyday moments.</p>
                    <div className="hud-actions">
                      <a className="hud-btn is-primary" href={dest.playHref} target="_top">Enter {dest.name} <Arrow /></a>
                      <a className="hud-btn" href={dest.readHref} target="_top">Read about {dest.name}</a>
                    </div>
                  </>
                ) : (
                  <div className="hud-actions">
                    <a className="hud-btn" href={dest.readHref} target="_top">Read about {data.label} <Arrow /></a>
                  </div>
                )}
                {data.destinations.length > 1 && (
                  <div className="hud-others">
                    <p className="hud-kicker">Other destinations</p>
                    <div>{data.destinations.filter((d) => d.id !== dest.id).map((d) => <button type="button" key={d.id} className="hud-chip" onClick={() => pick(d)}>{d.name}{d.ready ? "" : " · soon"}</button>)}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hud-list-wrap">
                <p className="hud-kicker">{open} open · {data.destinations.length - open} in development</p>
                <h2 id="hud-title" ref={heading} tabIndex={-1}>{data.label}</h2>
                {intro && <p className="hud-lede">{intro.title}</p>}
                <p className="hud-hint">Select <b>Hà Nội</b> on the map to start playing: you walk its streets in a small pixel-art game.</p>
                <ol className="hud-list">
                  {data.destinations.map((d, i) => {
                    const s = d.ready ? zoneSummary(d) : null;
                    if (d.ready) return (
                      <li key={d.id}>
                        <div className="hud-item is-ready" data-dest={d.id}>
                          <span className="hud-item-n" aria-hidden="true">{pad(i + 1)}</span>
                          <span className="hud-item-txt">
                            <b>{d.name}</b>
                            <span>{d.hook}</span>
                            <small>{s ? `${s.places} places · ~${s.minutes} min · ${s.stamps}/${s.places} stamps` : ""}</small>
                          </span>
                          <span className="hud-item-go">
                            {d.playHref && <a className="hud-btn is-primary" href={d.playHref} target="_top">Play {d.name} <Arrow /></a>}
                            <a className="hud-item-read" href={d.readHref} target="_top">Read the stories</a>
                          </span>
                        </div>
                      </li>
                    );
                    return (
                      <li key={d.id}>
                        <button type="button" data-dest={d.id} className="hud-item is-soon" onClick={() => pick(d)}>
                          <span className="hud-item-n" aria-hidden="true">{pad(i + 1)}</span>
                          <span className="hud-item-txt">
                            <b>{d.name}</b>
                            <span>{d.hook}</span>
                            <small>In development</small>
                          </span>
                          <Arrow />
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </div>

        <footer className="hud-foot">
          <a href={data.overviewHref} target="_top">Only want to read? {data.label} overview <Arrow /></a>
        </footer>
      </div>
    </div>
  );
}
