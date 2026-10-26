# CultureCompass

Understand the place before you arrive. A student UX prototype (web-based multimedia application) that helps travellers explore the stories, traditions and everyday life of a destination before a trip. The first destination is **Vietnam, starting in Hà Nội**: six culture themes, eleven sourced stories, four optional practice scenes and a phrasebook.

Built with HTML5, CSS, Bootstrap 5.3.3, vanilla JavaScript, inline SVG and GSAP 3.12.5. No backend, accounts or tracking.

## Open it

- **Simplest:** double-click `index.html`. Everything works from `file://`: data is loaded as plain scripts, fonts and libraries are in the project.
- **Local server (optional):**
  ```bash
  npm run dev
  ```
  Then open http://localhost:8765. This rebuilds the data files and serves the folder with `tools/dev-server.py` (Python's built-in server with caching off). Nothing to install. Stop it with Ctrl + C.
- **Other commands:** `npm run build` rebuilds the data files after a JSON change; `npm run check` runs the content checker.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: credited photo flow, immediate **Explore destinations** CTA and persistent skip link, clear Vietnam scope, then the destination chooser (hover or focus previews the country; click or Enter opens it) |
| `vietnam.html` | Vietnam, opened like the front of a printed guide: a **cover** (title, scope, counts, the Hà Nội Train Street clip) followed by the **compass of six themes**, then a **contents page of three places** (at the table, on the street, at the temple: photo, what our stories cover, one phrase, links to the theme and scene; from `countries.json` → `contexts`); `#food`, `#language` … deep-link to a theme, a collapsible full story index, optional practice scenes, words to carry |
| `story.html?id=st-…` | A culture story: standfirst, picture with credit, numbered source notes, where it applies, how it varies, phrases, sources with limits, optional practice, next/previous in the theme |
| `scene.html?id=sc01…sc04` | Optional practice scene; resumes at the exact step you left |
| `phrases.html` | Phrasebook, filtered by what you want to do and by theme or scene (`?intent=`, `?topic=`, `?scene=`) |
| `collection.html` | My collection: saved stories, phrases and reminder cards, grouped by destination, printable |
| `about.html` | Method, scope, live content status, sources, media credits, accessibility, your data |
| `saved.html`, `hanoi.html` | Old addresses; they redirect to `collection.html` and `vietnam.html` |

## Content and where to edit it

All content lives in JSON files in `assets/data/`. Each starts with a `"$comment"` explaining its fields; keys starting with `$` never reach the site.

- `sources.json`: every source, with the date checked and its limits
- `scenarios.json`: **claims** (each linked to sources, with a status) and the four practice scenes (steps, choices, feedback, summaries, reminder cards, `storyIds`)
- `stories.json`: the culture stories. Every paragraph lists the claims it rests on; a paragraph that only frames scope is marked `editorial`
- `topics.json`: the themes on a country page (`storyIds`, `sceneIds`, `phraseIds`, `aliases` for old links). `planned` themes are shown as “Not written yet”
- `phrases.json`: intents and phrases (meaning, who to use them with, audio id, status)
- `assets.json`: credits and licences for every image, video and audio file
- `countries.json`: the home opening (`heroGallery`, photos with the place each was taken), the destinations, and each country's `contexts` (three places: table, street, temple)
- `svgs.js`: SVG scene wrappers, numbered interactive pins and theme icons. Scene paintings are local JPEGs in `assets/img/scenes/`; small thumbnails load lazily. Exact image-generation prompts are in `docs/design/illustration-prompts-2026-10-25.md` and embedded in the JPEGs.

The pages don't read JSON directly (browsers block that from `file://`); `tools/build-data.js` copies each JSON file into a matching `.js` file. **Don't edit those `.js` files by hand.** After any content change:

```bash
npm run build
```

```bash
npm run check
```

The checker fails on invalid JSON, stale generated files, broken references, claims or story paragraphs without sources, stories not reachable from any theme, assets without credits, and hero clips without a place. It lists every item still **being verified**.

## Saved data

My collection, the reading log (“Read before”), scene progress (including the exact step) and settings are stored in this browser only (`localStorage`, keys starting `cc.`).
- If storage is blocked, the site keeps working for the visit and says it can't remember.
- If stored data can't be read, a copy is kept under `cc.backup.<key>`, that part starts fresh and the visitor is told.
- Cards saved by the earlier version (`cc.saved`) move into My collection automatically; the old key is left in place.

## Still to do

- **Arts & creativity** has no story yet. The water-puppetry clip is footage only; a story needs a reliable source first.
- **Native-speaker check** of the 7 phrases marked `needs_verification` in `phrases.json`; then set them to `reviewed`.
- **Replace the audio.** `assets/audio/*.m4a` is a computer voice (macOS “Linh”), labelled as such. Record each phrase with a person who agrees to its use, keep the file names (or update `file` in `assets.json`), remove `synthetic: true`, set the credit, rebuild.
- **Stronger sources** for the 5 claims still `needs_verification` (forms of address, chopsticks in rice, crossing pace and moving with locals).
- **Usability testing** has not been run; no results exist yet.
- Re-check the Temple of Literature rules page shortly before any demo.

## Accessibility notes

- Everything works by keyboard. On the compass, arrow keys move between themes and Escape closes the open one; focus returns to the theme or story you came from.
- Hover is never required: keyboard focus shows the same previews, and touch screens show them by default.
- Videos are muted, have Pause/Play and stills; with Reduce motion (yours or the device's) or data saver they wait for Play. Scenes have a Text-first mode.
- Every phrase is written out with its meaning; audio never plays by itself and computer voices are labelled.
- Status uses words and icons, not colour alone. No timers. Not audited for WCAG conformance.

## Design and QA

- Design system: `DESIGN.md` (tokens live in `assets/css/cc.css`). Product direction: `PRODUCT.md`.
- Latest check, with what was and wasn't tested: `docs/qa/2026-10-24-redesign-check.md`. Layout helper: `tools/qa/layout-sweep.js`.
- Files retired by the redesign are kept in `legacy/` (not loaded by the site).

## Media credits

Full list on the About page and in `assets/data/assets.json`. In short: photos and clips from Wikimedia Commons under CC BY, CC BY-SA or CC0 (credited where shown; the market clips are from Hội An); scene paintings are AI-generated illustrations with original SVG interactive overlays; fonts are Source Serif 4 and Be Vietnam Pro (SIL OFL).

## Interface refinement · 25 October 2026

Four consistent AI-generated gouache illustrations replace the old primitive SVG figures. They are imagined scenes, labelled as such, not documentary evidence. SVG still provides the interactive pins and camera. Choice sequences now use a gentle guided zoom and authored caption beats; they do not animate individual limbs. The Temple of Literature includes a separate arrival wardrobe and a covered-clothing state.

Feedback leads with the chosen action and contextual explanation, followed by Next / Try another; detailed beats and sources remain expandable. Desktop completion opens a two-column summary with a visible save control. Home/country navigation was simplified while retaining the established identity. A scene-mobile redesign remains out of scope.

Validation and screenshots: `docs/qa/2026-10-25/`.

## Aceternity 3D globe demo

Run `npm install`, then `npm run dev`, and open
`http://localhost:8765/globe.html`. `npm run build` generates the existing content
and the standalone globe bundle; `npm run typecheck` checks the React sources.
After changing globe source, run `npm run build:globe` and refresh the page.

React 19.1.1, Fiber 9.3.0, Drei 10.7.6, and Three 0.180.0 are pinned: the
initial latest-version combination produced a DOM cleanup error during loading.
The pinned set passed browser checks without errors or warnings.

The supplied components live at `components/ui/3d-globe.tsx` and
`components/3d-globe-demo.tsx`. The country-selection update replaces avatar
markers with rectangular, keyboard-focusable flag buttons and adds photo backgrounds.
`GlobeMarker`, `Globe3DConfig`, and `Globe3D` retain their original names.
The `@/` alias points to this directory; `lib/utils.ts` supplies `cn` using
clsx and tailwind-merge.

Integration additions: this previously static project now uses React,
TypeScript, esbuild, and Tailwind CSS v4 for this demo only. `globe/main.tsx`
mounts the demo; `globe/styles.css` generates its Tailwind utilities;
`tools/build-globe.mjs` creates a classic browser script under `assets/globe/`.
The demo now uses a dark photo overlay for readable labels and the project’s
self-hosted fonts. The homepage embeds this globe in its destination section; the iframe isolates
Tailwind from the site’s existing Bootstrap styles. Other pages retain their styles.

Unlike the existing offline content, this demo requires network access for the
unpkg Earth textures, and a WebGL-capable browser.
The source intentionally leaves atmosphere disabled by default even though the
demo passes atmosphere color/intensity. Its `globeColor`, `initialRotation`,
`markerSize`, and marker `size` options are also unused in the supplied source;
these behaviors are retained for fidelity.

Country data is in `globe/countries.ts`: 16 countries, approximate mainland pin
positions, local images, captions, and original photo source links. Photos reuse
the existing credited collection in `assets/data/assets.json`. Flags come from
flag-icons 7.5.0 (MIT), downloaded from jsDelivr into `assets/img/flags/`, with
the license included. Hover or keyboard focus previews a representative landmark photograph. Clicking
or using the country picker opens an introduction beside the globe; the globe
moves left on desktop, and the introduction stacks below it on mobile. Two local
photos float gently, with all motion disabled for reduced-motion preferences.
Only the arrow CTA navigates to the country page. Close or Escape restores the
unselected globe. Other country pages remain scoped visual introductions rather
than full researched lessons.

The 16 new landmark images are loaded on first preview/selection and retained for
smooth subsequent transitions. Sources, authors and licenses are recorded in
`assets/img/destinations/credits.json`; UI metadata is in
`globe/destination-photos.ts`. Short introductions use the existing photographed
cultural scenes as their scope (`globe/country-intros.ts`).

The homepage `#destinations` section embeds `globe.html?embed=1`. Its height
follows the React content via a source-checked message, avoiding an inner
scrollbar. Country clicks navigate the parent page. Detail-page return links
lead back to `index.html#destinations`.

### Content tracing beam

The full document on the home, Vietnam, story, phrasebook, collection, about and
country-detail pages has a decorative scroll-following beam. It is mounted as an
overlay so existing HTML, data rendering, controls and layouts remain intact.
`components/ui/tracing-beam.tsx` exports `TracingBeam`; `tracing-beam/main.tsx`
attaches it to the body of each page. `assets/css/tracing-beam.css` scopes the overlay styles.
Build with `npm run build:tracing-beam` (included in `npm run build`).

The original demo content, page, font and Typography dependency have been removed.
Compared with the reference, the beam uses actual page content, ResizeObserver
for changing content heights, unique gradient IDs, a reactive progress dot, and
full-document scroll progress (including header and footer). The line is straight along the page gutter to
avoid overlapping existing content. Reduced motion keeps only the static track;
printing hides the decoration. The original gradient colors are preserved. Spring smoothing is removed so
scroll reversals and page endpoints track immediately without lag. The existing CultureCompass fonts and page colors are unchanged.
