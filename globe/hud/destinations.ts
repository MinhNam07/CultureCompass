// Destinations shown in the country HUD (the overlay that opens when a flag is chosen on the homepage globe).
// Only Hà Nội is playable today. Everything else is listed as "in development" so people can see what is coming.
import explore from "@/assets/data/explore.json";
import { countries, countryHref, type CountryMarker } from "@/globe/countries";
import { destinationPhotos } from "@/globe/destination-photos";

export interface HudPhoto { src: string; alt: string; credit: string; sourceUrl: string; place: string }

export interface HudDestination {
  id: string;
  name: string;
  /** one line, shown under the name */
  hook: string;
  ready: boolean;
  /** position on the country map (only for countries that have a map) */
  lon?: number;
  lat?: number;
  /** label placement next to the pin, in map units */
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "end";
  photo: HudPhoto;
  /** zone ids in assets/data/explore.json that belong to this destination */
  zones: string[];
  playHref?: string;
  readHref: string;
}

export interface HudCountry {
  code: string;
  label: string;
  hasMap: boolean;
  photo: HudPhoto;
  overviewHref: string;
  destinations: HudDestination[];
}

interface ExploreZone { id: string; country: string; title: string; minutes: number; objectives?: { step: string }[] }
const zones = (explore as unknown as { exploreZones: ExploreZone[] }).exploreZones;

const hanoiPhoto: HudPhoto = {
  src: "assets/img/hn-street-central.jpg",
  alt: "A street in central Hà Nội lined with shop signs, with motorbikes, a cyclo and a woman in a conical hat crossing.",
  credit: "Vyacheslav Argenberg · CC BY 4.0",
  sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=85840495",
  place: "Central Hà Nội",
};

function countryPhoto(code: string): HudPhoto {
  const p = destinationPhotos[code];
  return { src: p.src, alt: p.alt, credit: p.credit, sourceUrl: p.sourceUrl, place: p.place };
}

const vietnam: HudCountry = {
  code: "vn",
  label: "Vietnam",
  hasMap: true,
  photo: countryPhoto("vn"),
  overviewHref: "vietnam.html",
  destinations: [
    {
      id: "hanoi", name: "Hà Nội", ready: true,
      hook: "A first day in the capital: a family meal, the Old Quarter, a market and the words people greet you with.",
      lon: 105.85, lat: 21.03, labelDx: -16, labelDy: 5, labelAnchor: "end",
      photo: hanoiPhoto,
      zones: zones.filter((z) => z.country === "vietnam").map((z) => z.id),
      playHref: "explore.html",
      readHref: "vietnam.html#contents",
    },
    {
      id: "hoian", name: "Hội An", ready: false,
      hook: "The old town, lanterns at dusk and a tailor’s shop.",
      lon: 108.33, lat: 15.88, labelDx: 14, labelDy: 16, labelAnchor: "start",
      photo: countryPhoto("vn"), zones: [], readHref: "vietnam.html",
    },
    {
      id: "danang", name: "Đà Nẵng", ready: false,
      hook: "Beach mornings and a seafood market.",
      lon: 108.21, lat: 16.06, labelDx: 14, labelDy: -8, labelAnchor: "start",
      photo: countryPhoto("vn"), zones: [], readHref: "vietnam.html",
    },
  ],
};

export function hudCountry(country: CountryMarker): HudCountry {
  if (country.code === "vn") return vietnam;
  const snapshot: HudPhoto = { src: country.image, alt: country.alt, credit: country.credit, sourceUrl: country.sourceUrl, place: country.place };
  return {
    code: country.code,
    label: country.label ?? country.place,
    hasMap: false,
    photo: countryPhoto(country.code),
    overviewHref: countryHref(country),
    destinations: [{ id: country.code, name: country.place, hook: "A cultural snapshot with its original source. Stories and a game are not ready yet.", ready: false, photo: snapshot, zones: [], readHref: countryHref(country) }],
  };
}

export const hudCountries = countries;

export interface ZoneSummary { places: number; minutes: number; stamps: number }

/** Progress is saved by the game in localStorage under cc.explore (see assets/js/game/explore-game.js). */
export function zoneSummary(dest: HudDestination): ZoneSummary {
  let saved: { zones?: Record<string, { done?: boolean; steps?: Record<string, { choice?: unknown }> }> } = {};
  try { saved = JSON.parse(window.localStorage.getItem("cc.explore") || "{}") || {}; } catch { saved = {}; }
  const own = zones.filter((z) => dest.zones.includes(z.id));
  const stamps = own.filter((z) => {
    const s = saved.zones?.[z.id];
    if (!s) return false;
    const objectives = z.objectives || [];
    const chosen = objectives.filter((o) => s.steps?.[o.step]?.choice).length;
    return !!s.done || (objectives.length > 0 && chosen >= objectives.length);
  }).length;
  return { places: own.length, minutes: own.reduce((sum, z) => sum + (z.minutes || 0), 0), stamps };
}
