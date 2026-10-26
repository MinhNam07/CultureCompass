# Destination selection — cinematic B

Approved direction: full-section cinematic refinement, 25 October 2026.

## Delivered
- Two-column desktop stage with the existing credited destination photograph behind a directional scrim.
- Native country picker alongside globe; persistent selected flag/name, camera flight to the chosen country, and backdrop locked to selection.
- One cultural photograph, existing factual introduction, place/source caption, readable scope and a full-width ivory CTA.
- Mobile layout at 760px and below collapses the globe after selection, with an explicit toggle to explore it again.
- Keyboard focus previews, Escape/back focus restoration, selection announcements, image and globe failure fallbacks; reduced-motion support.
- Existing content routes, global header and other sections retained. Mockup-generated photography is not used.

## Validation
- `npm run build:globe` passed (TypeScript, esbuild, Tailwind).
- Impeccable detector ran on the two changed components and stylesheet. Advisory findings concern section-specific colors/type sizes against the older global ramp; the approved exception is recorded in DESIGN.md.
- Browser render inspected in the actual homepage iframe at 1440×1000 and 390×844.
- Native select to Thailand: globe finishes facing Thailand with a persistent label.
- Keyboard focus on Vietnam while Thailand selected: country story and background remain Thailand.
- Escape: clears selection and restores focus to the native country select.
- Mobile globe toggle opens/closes; iframe resizes and CTA/source credits are reachable without clipping.
- Thailand CTA navigates the top page to `country-details.html?country=th`.
- Screenshots: `docs/qa/screens/destination-b-desktop.png`, `docs/qa/screens/destination-b-mobile.png`.

## Limits
No full screen-reader or device-matrix audit. OS reduced-motion and failure states are implemented but were not simulated in-browser. Globe textures retain the pre-existing remote NASA texture URLs; the country picker and introduction work as the fallback if globe loading fails.

## Closing hero stop · 26 October 2026
User requested a single pause at the final “Every place has a story” composition before the destination section. Wheel/trackpad input now lands exactly at the end of the sticky hero, absorbs the remaining events of that gesture, then permits a fresh gesture after a 180ms quiet gap. A 1.2s maximum prevents a continuous event stream trapping the visitor. Upward scroll, links, keyboard, pinch zoom and reduced-motion behavior remain native. Re-arms after returning at least 120px into the hero. Touch scrolling is unchanged.

Validation: JS syntax passed; isolated event tests passed for stop, momentum, fresh gesture, reversal, re-arm, bypass and reduced motion. Browser at 1440px verified landing at scrollY=2400 (hero height minus stage height) and subsequent scrolling beyond it. Screenshot: docs/qa/screens/hero-closing-stop.png.


## Native scrolling restored · 26 October 2026
User requested removal of the closing stop and trackpad momentum interception. Removed initClosingStop and its wheel/scroll/click/keydown listeners entirely. Retained the slower 720svh desktop / 540svh mobile hero travel. Previous closing-stop validation above describes a superseded implementation.

Impeccable animation review: recommended next direction is a visually settled closing composition during the last part of the existing sticky section, while native scroll position continues freely. Finish photo travel earlier, reveal the closing copy before the endpoint, then keep the composition still for roughly the last 15–20% of the hero journey. No new input handlers, scroll snapping, or timed locks. This alternative is a proposal only; not implemented in this change.
