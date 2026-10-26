# Redesign check — 24 October 2026

What was checked after the redesign, how, and what was not checked. Screenshots in `screens/` were taken on this date from the current build (older images in `docs/research/screens/` are research on another site and are not evidence about this one).

## Environment

- macOS, Google Chrome (desktop) through the Claude browser pane and headless Chrome. **No other browser was tested** (no Safari, Firefox, iOS or Android hardware).
- Local server: `npm run dev` (http://localhost:8765). `file://` checked with headless Chrome.
- Headless Chrome screenshots freeze animations and cannot go below ~500px wide, so phone widths were checked in the browser pane instead.

## Automated checks

| Check | Result |
|---|---|
| `npm run build` | Wrote 7 data files |
| `npm run check` | 13 sources, 33 claims, 11 phrases, 24 assets, 4 scenes, 11 stories, 6 themes. **No errors.** 28 items still being verified: 5 claims, 7 phrases, 11 computer-voice audio files, and 5 story paragraphs that use those claims |
| JavaScript syntax (`assets/js/*.js`, `assets/data/*.js`) | All parse |
| Live pages referencing retired files (`street.css`, `main.css`, Anton, Google Fonts) | None |
| Layout sweep (`tools/qa/layout-sweep.js`) on 9 page states at 320, 390, 768, 1280×720, 1920×1080 | No sideways overflow, no clipped headings, after two fixes (Menu button 3px overhang; phrase filter fieldset min-width) |
| Contrast of every text node on a solid background (vietnam#food, story, scene, phrases, collection, about) | No pair below 4.5:1 (3:1 large). Text over photos/video was not measured per frame; scrims were strengthened to an estimated ≥ 5:1 worst case |
| Script errors on 10 page states (incl. missing story/scene ids and an empty theme) | None |

## Flows checked by hand (in the browser)

| Flow | Result |
|---|---|
| Home montage plays muted, captions name activity and real place, dots track the clip | Works |
| Pause / Play; choice kept for the visit | Works |
| Reduce motion on: no video loads, still shown, "Play video" offered and works when pressed | Works |
| A clip fails to load: its still shows, "This clip couldn't load" note, montage moves on, note clears | Works (simulated by breaking the source) |
| Explore destinations arrow scrolls and moves focus to the chooser | Works |
| Destination preview on mouse hover, cleared on leave; on keyboard Tab focus (light focus ring over the photo) | Works |
| Phones: preview shown as a picture card above "Vietnam", no hover needed | Works (390, 320) |
| Choose Vietnam → short exit (≤ 650 ms) → country page | Works; second click navigates at once |
| Country page: themes compass, needle turns on hover/focus, selection draws line, stories stagger in; planned theme shows "Not written yet" | Works |
| Deep links `#food`, `#beliefs`, `#arts`; old `#topic-greetings` → People & everyday life; old `hanoi.html#scenes` → Practise | Works (also from `file://`) |
| Theme → story → browser Back: theme still open, same scroll position, focus on the story link, story marked "Read before" | Works |
| Back again closes the theme; Escape closes and returns focus to the theme button; arrow keys walk the ring | Works |
| Scene: start, answer step 1, Next, answer step 2, **reload** → "Welcome back… step 2 of 3, after making a choice" → Continue restores the step, the picked answer and the feedback | Works (this was the old Continue bug) |
| Save / unsave story, phrase and reminder card; header count updates; survives reload | Works |
| Old saved cards (`cc.saved`) migrate into My collection with a notice; old key left in place | Works |
| Corrupted stored data: copy kept under `cc.backup.collection`, collection starts fresh, notice shown | Works (after a fix so the notice shows even when another open tab repaired the data first) |
| Blocked storage: saving still works for the visit, count updates, message says it won't be remembered | Works (simulated by making `localStorage` throw) |
| Collection: grouped by destination; remove animates out and moves focus to the next item; unknown saved ids shown with a Remove button rather than dropped; empty state | Works |
| Phrasebook filters by intent and by theme or scene; old `?scene=sc02` links; empty-result state with "Show all phrases" | Works |
| `file://`: all pages, data, fonts (Source Serif 4, Be Vietnam Pro with Vietnamese marks), redirects | Works in headless Chrome |

## Fixed during this check

Hero headline wrapping one word per line; header jumping when it turned solid on Home; preview picture above the heading on phones; atlas centre disc stretching to an oval; top theme label colliding with the centre and later with the section intro; stray dashes on the selection line; needle crossing the country name; small photos upscaled and soft; mismatched photo (street stall) on a home-dinner story; country entrance and theme reveal starting fully transparent; destination exit depending on animation frames; Vietnamese place names written "Hanoi" in scene data; eyebrow labels above titles; verbose accessible name on the Vietnam link.

## Not checked / known limits

- Safari, Firefox, Edge and real phones or tablets (touch was emulated in Chrome; iOS autoplay rules not verified).
- Screen readers (VoiceOver, NVDA) were not used; semantics were checked in the DOM only.
- No performance measurement (the home clips total about 6.6 MB; posters show first).
- No WCAG audit; no conformance is claimed.
- No usability testing with travellers has been run.
- Content gaps that remain honest rather than filled: Arts & creativity has no story; Festivals such as Tết are not written; 7 phrases await a native-speaker check; all audio is a computer voice.

## How to repeat

1. `npm run build` then `npm run check`.
2. `npm run dev`, open http://localhost:8765, set the browser width, paste `tools/qa/layout-sweep.js` into the console.
3. Walk the flows above; for reduced motion use Settings → Reduce motion or the OS setting.
