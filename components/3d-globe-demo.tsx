"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Globe3D } from "@/components/ui/3d-globe";
import { countries, countryHref, type CountryMarker } from "@/globe/countries";
import { destinationPhotos } from "@/globe/destination-photos";
import { countryIntros } from "@/globe/country-intros";

// Fixed positions keep the star field stable across previews and selections.
const stars = Array.from({ length: 780 }, (_, i) => {
  const random = (salt: number) => { const n = Math.sin((i + 1) * salt) * 43758.5453; return n - Math.floor(n); };
  return { x: random(12.9898) * 1600, y: random(78.233) * 1000, r: .35 + random(39.425) * 1.05, opacity: .25 + random(17.71) * .7 };
});

function Arrow({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={back ? { transform: "rotate(180deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="destination-globe-fallback" role="status"><p>The globe is unavailable.</p><p>You can still explore every destination using the country list above.</p></div> : this.props.children; }
}

export default function Globe3DDemo({ embedded = false }: { embedded?: boolean }) {
  const [hovered, setHovered] = useState<CountryMarker | null>(null);
  const [selected, setSelected] = useState<CountryMarker | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [globeExpanded, setGlobeExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const picker = useRef<HTMLSelectElement>(null);
  const active = selected;
  const blankPointer = useRef<{ x: number; y: number } | null>(null);
  const intro = selected && countryIntros[selected.code];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function remember(country: CountryMarker | null) {
    if (country) setVisited((current) => current.includes(country.code) ? current : [...current, country.code]);
  }
  function preview(country: CountryMarker | null) {
    if (!selected) remember(country);
    setHovered(country);
  }
  function chooseCountry(country: CountryMarker) {
    remember(country);
    setHovered(null);
    setSelected(country);
    setImageFailed(false);
    setGlobeExpanded(false);
    if (window.matchMedia("(max-width: 760px)").matches) picker.current?.focus();
  }
  function closeCountry() {
    setSelected(null);
    setHovered(null);
    setGlobeExpanded(false);
    picker.current?.focus();
  }

  return (
    <section className={`destination-experience ${selected ? "has-selection" : ""} ${active ? "has-backdrop" : ""} ${globeExpanded ? "is-globe-expanded" : ""}`} onPointerDown={(event) => { blankPointer.current = { x: event.clientX, y: event.clientY }; }} onClick={(event) => {
      const start = blankPointer.current;
      blankPointer.current = null;
      if (!selected || !start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
      const target = event.target as Element;
      if (!target.closest("button, a, select, label, .destination-story, .destination-header, .destination-orbit, .destination-footer")) closeCountry();
    }} onKeyDown={(event) => { if (event.key === "Escape" && selected) { event.preventDefault(); closeCountry(); } }}>
      <svg className="destination-stars" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{stars.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#fff" opacity={star.opacity} />)}</svg>
      <div className="destination-backdrops" aria-hidden="true">
        {countries.filter((country) => visited.includes(country.code)).map((country) => (
          <img key={country.code} src={destinationPhotos[country.code].src} alt="" decoding="async" className={active?.code === country.code ? "is-active" : ""} />
        ))}
      </div>
      <div className="destination-scrim" aria-hidden="true" />
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
            <GlobeBoundary>
              <Globe3D onBlankClick={selected ? closeCountry : undefined} markers={countries} selectedMarker={selected} reducedMotion={reducedMotion} className="destination-canvas" config={{ bumpScale: .65, ambientIntensity: 1.6, pointLightIntensity: 1.1, frontLightIntensity: 3.2, autoRotateSpeed: hovered || selected || reducedMotion ? 0 : 0.3 }}
                onMarkerHover={(marker) => preview(marker as CountryMarker | null)}
                onMarkerClick={(marker) => chooseCountry(marker as CountryMarker)} />
            </GlobeBoundary>
            <p className="destination-orbit-hint">Drag to explore. Select a flag to look closer.</p>
            <p className="destination-preview" aria-live="polite">{hovered && hovered.code !== selected?.code ? hovered.label : selected ? `${selected.label} selected` : "Let curiosity choose your next stop."}</p>
          </div>
        </div>
        {selected && intro ? (
          <article className="destination-story" key={selected.code} aria-labelledby="destination-title">
            <button className="destination-close" onClick={closeCountry}><Arrow back /> Back to the world</button>
            <h2 id="destination-title">{selected.label}</h2>
            <p className="destination-lede">{intro.title}</p>
            <p className="destination-description">{intro.text}</p>
            <figure className="destination-culture">
              {imageFailed ? <p className="destination-image-fallback">This image could not load. You can still read the introduction or view the original source.</p> : <img src={selected.image} alt={selected.alt} decoding="async" onError={() => setImageFailed(true)} />}
              <figcaption>{selected.place} <a href={selected.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Image source: ${selected.place} (opens in a new tab)`}>Image source <span aria-hidden="true">↗</span></a></figcaption>
            </figure>
            <div className="destination-action">
              <p className="destination-scope">{selected.code === "vn" ? "Stories, everyday encounters and words to carry. Starting in Hà Nội." : "A cultural snapshot with its original source."}</p>
              <a className="destination-continue" href={countryHref(selected)} target={embedded ? "_top" : "_self"}>
                <span>{selected.code === "vn" ? "Explore Vietnam’s stories" : "Explore this cultural snapshot"}</span><Arrow />
              </a>
            </div>
          </article>
        ) : (
          <div className="destination-invitation" aria-live="polite">
            <p className="destination-invitation-title">{hovered ? hovered.label : "Let curiosity lead the way."}</p>
            <p>{hovered ? "Select the flag to take a closer look." : "Choose a flag on the globe, or find your destination in the country list."}</p>
          </div>
        )}
      </div>
      <p className="destination-announcement" role="status">{selected ? `${selected.label} selected. Introduction and explore link are now available.` : "Choose a destination."}</p>
      <footer className="destination-footer">
        {active && <a href={destinationPhotos[active.code].sourceUrl} target="_blank" rel="noreferrer">Background: {destinationPhotos[active.code].place} · {destinationPhotos[active.code].credit} <span aria-hidden="true">↗</span></a>}
      </footer>
    </section>
  );
}
