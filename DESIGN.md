---
name: CultureCompass
description: Understand the place before you arrive. A living cultural publication on warm paper, with stories you open like chapters.
colors:
  background: "#F4EFE5"
  surface: "#FFFCF7"
  primary: "#762F3B"
  text: "#302720"
  text-secondary: "#80634D"
  accent: "#B28A45"
typography:
  display:
    fontFamily: "Source Serif 4, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3.25rem, 1.9rem + 5.6vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  h1:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.65rem + 2.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.18
  h3:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.15rem + .45vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.25
  lead:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.125rem, 1.05rem + .35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  read:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.125rem, 1.08rem + .2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.25
  meta:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "3px"
  md: "6px"
  pill: "20px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  max: "1240px"
  measure: "66ch"
  section: "clamp(56px, 8vw, 112px)"
  section-tight: "clamp(40px, 5vw, 72px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "10px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.surface}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "10px 22px"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
    height: "40px"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "18px"
  atlas-medal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "50%"
    size: "64px"
  atlas-medal-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
---

# Design System: CultureCompass

<!-- Source of truth: assets/css/cc.css (tokens on :root) and assets/css/fonts.css.
     Every page loads cc.css after bootstrap.min.css. The previous systems (street.css, main.css) are retired in legacy/. -->

## Overview

**Creative North Star: "A living cultural publication."** Each destination reads like a well-made printed guide that answers back: warm paper, a serif you want to read, chapter rules in brass, and one wine-red ink for everything you can act on. The visitor explores it like a game of discovery: choosing a destination, turning a compass toward a theme, opening a story, keeping a bookmark. Every choice answers within a fifth of a second, and nothing makes them wait for an animation.

Identity comes from two places only: the publication itself (paper, type, rules) and the real media of each place (credited photographs, video, drawn scene illustrations). The UI never takes on a country's colours; the same six colours, navigation and reading structure carry over to every destination. Photos and video keep their natural colour, with no sepia or tint. The paper grain is a 12%-opacity noise tile on the page background only, never over media or text boxes.

**Key characteristics**
- Six colours, each with one job (below). No seventh brand colour.
- Source Serif 4 for names, headings, standfirsts and long reading; Be Vietnam Pro for navigation, buttons, labels and metadata. Both self-hosted with Vietnamese, Latin-extended and Latin subsets.
- Soft, real depth: surfaces lift with a two-layer shadow (offset and blur), never a zero-blur block.
- One signature interaction per surface: the destination preview (Home), the compass atlas (country), the bookmark (everywhere).

## Colors

| Token | Hex | Role |
|---|---|---|
| `background` | `#F4EFE5` | Paper. Page ground, storytelling sections, white space. The largest area. |
| `surface` | `#FFFCF7` | Ivory. Reading boxes, open panels, drawers, cards, menus. Separated from paper by a 1px line, not by colour alone. |
| `primary` | `#762F3B` | Wine-red ink. Primary buttons, links, selected states, the compass needle and selection line. Never a large fill. |
| `text` | `#302720` | Dark wood. Headings, body, menus. Also the hover fill of primary buttons. |
| `text-secondary` | `#80634D` | Earth brown. Metadata, captions, places, dates, secondary labels, control borders. Never made lighter with opacity. |
| `accent` | `#B28A45` | Brass. Chapter rules, the compass ring, the reminder-card border, decorative icons. Never text, never a CTA, never the only focus signal. |

Derived values are mixes of these six only: `--line` (text-secondary at 38% for hairlines), shadows and the media scrim from `text` as rgba.

### Contrast (computed on the real components, October 2026)
- Solid backgrounds: an automated pass over every text node on vietnam, story, scene, phrases, collection and about pages found no pair under 4.5:1 (3:1 for large text). Key pairs: text/background 12.75, text/surface 14.28, primary/background 8.18, surface/primary 9.16, text-secondary/background 4.81, text-secondary/surface 5.39.
- Text on photos and video sits on a `text`-coloured scrim (hero: 88% → 72% → 38% from the bottom; destination preview: 70–80% across). Worst case under a white pixel is about 5:1 for the destination intro. This is an estimate, not a measurement on every frame.
- This is not a WCAG conformance claim.

### Named rules
**The One Ink Rule.** Wine red marks what you can act on or what is selected. If it isn't interactive or selected, it isn't red.
**The Brass Is Ornament Rule.** Accent only draws: rules, rings, small icons beside text. It never carries information on its own.
**The Natural Media Rule.** Photos and video keep their colour. The only thing laid over media is the neutral scrim under text.

## Typography

- **Display** (Source Serif 4 600, `clamp(3.25rem … 6rem)`, line-height 1.04, -0.025em): country names, the home promise.
- **H1 / H2 / H3** (Source Serif 4 600): page titles, section titles, story and theme titles. Balanced wrapping.
- **Lead** (Source Serif 4 400, 18–22px, 1.5): standfirsts and theme questions; italic for questions and Vietnamese names.
- **Read** (Source Serif 4 400, 18–20px, 1.7, 66ch): story body. A wine-red drop cap opens the first paragraph.
- **Body / label / meta** (Be Vietnam Pro 400 / 700 / 500): UI text 17px, buttons 16px bold, metadata 14px. Nothing smaller than 14px; no all-caps; no light weights.

**The Real Vietnamese Rule.** Vietnamese is always set with full diacritics and `lang="vi"`. Both fonts were checked on “Việt Nam”, “Hà Nội”, “Tín ngưỡng”, “Lễ hội”, “Đời sống”, “Văn Miếu – Quốc Tử Giám”. Headings never use `overflow: hidden`, so stacked marks are not clipped.

## Layout

- Content width 1240px plus a fluid gutter (16px on phones, up to 48px). Long reading is held to 66 characters.
- Sections breathe: 56–112px between chapters; a brass chapter rule (line + lozenge) opens major sections.
- Header (sticky, 68px; 60px on phones) carries the three global routes: **Destinations · My collection · About**, plus Settings. On phones they fold into a Menu disclosure.
- Inside a destination, a second bar carries **Overview · Themes · Practise a moment · Phrasebook**, the same on country, story, scene and phrasebook pages. Breadcrumbs (Destinations › Vietnam › Theme › Story) sit above every title below Home.
- Breakpoints: 960px (two-column layouts stack), 760px (menu folds, destination preview becomes a picture card), 640px (the atlas ring becomes a two-column list of tiles), 360px (one column).

## Elevation & Depth

Two shadows only: `shadow-1` (resting cards, medallions) and `shadow-2` (hover lift, open menu, toast). Both are offset and blurred, tinted with `text`. Hover lifts by 3px at most. No glass, no gradients on surfaces; the only gradients are the media scrims.

## Shapes

Small, printed radii: 3px on buttons and inputs, 6px on cards, frames and panels, 20px pills for chips and Listen buttons, circles for compass medallions. Icons are one authored SVG set (24 grid, 1.75 stroke, round caps) in `core.js`; no emoji or Unicode glyphs as icons.

## Components

- **Buttons.** Primary: wine red with ivory text, hover to dark wood, press scales to .97 in 120ms, arrow nudges 4px. Quiet: transparent with an earth-brown border. Disabled: dashed/secondary, no motion, with a reason in the label when needed.
- **Bookmark (save).** One control for stories, phrases and reminder cards (`CC.saveButton`). Saving drops the ribbon with a short spring, fills it, updates the header count with a small bump and shows “Saved to My collection” with a link. Removing is quiet.
- **Cover and contents (country page opening).** The top of every country page reads like the front of a printed guide. The cover: breadcrumb, a two-line title (one span per line, `clamp(2.5rem … 5.25rem)`), the local name, the scope sentence, counts, actions, and the country's clip as the plate beside it with its caption below (no text over the video). Then, on ivory, a contents page of three places from `countries.json` → `contexts`: with a mouse on a wide screen (≥ 961px) the list sits left and the open place's photo and phrase sit right; hover (after 90ms) or focus opens another place, arrow keys move between places, closed places keep their links out of the tab order, and “Read the stories” opens that theme on the compass. On phones, touch screens and without script all three places are open, one after another.
- **Compass atlas (signature, country page).** Six themes around a centre disc. Hover or focus turns the brass-ringed needle toward the theme (620ms spring, retargets on every move) and shows its guiding question in the centre. Choosing draws a wine-red line to it (420ms), pops the medallion and opens the panel, whose stories rise in a 45ms stagger. Planned themes have a dashed medallion and say “Not written yet”. Arrow keys walk the ring; Escape closes; the URL follows (`#food`), so Back closes too. Under 640px the ring becomes a list of tiles with the needle as a small badge.
- **Destination preview (signature, Home).** The country name is the object: hover or keyboard focus fades its credited photo in behind the section (520ms) with the text turning ivory over a scrim. Only click or Enter navigates; the exit widens the picture for at most 650ms, and a second click goes at once. On touch and narrow screens the picture is always shown as a card above the name.
- **Story row / story card.** Thumbnail (photo or scene illustration), serif title, standfirst, meta (place, minutes, sources, “Being verified”, “Read before”). The whole row is the link; the bookmark sits beside it.
- **Explore frame (game).** The pixel world sits inside a paper frame on the page, never full-screen; the canvas scales by whole pixels so the art stays crisp. Everything around the pixels (goal pill with the compass needle, tool buttons, dialogs, journal, Go to…, stamp) uses the site's own type, colours and buttons, never a pixel font. Markers over people: “!” a moment is waiting, “?” something to look at. A choice that doesn't fit shakes the frame once (not under reduced motion) and shows what happens, then Try another way.
- **Explore map (hub).** The Vietnam outline from Natural Earth (Vietnam point of view, Hoàng Sa and Trường Sa always shown and named) in warm sand on a pale sea, neighbours in paper beige; the ready city gets a filled pin with a slow halo, later cities a grey pin and “soon”. Beside it, one card per place: a dashed stamp that becomes a double-ringed wine-red stamp once explored, the time, the moments and honest progress (“1 of 3 moments”).
- **Feedback (Explore moments).** Four kinds, each with its own icon and words: Fits this situation (filled check), Another way that also fits (outlined swap), Needs more context (question mark, dashed border), See the rules and guidance (dark info). Never colour alone.
- **Reminder card.** Ivory card with a brass border and a wine-red ribbon notch; Do / Say / Applies to.
- **Status tags.** “Being verified” (half-filled circle, dashed underline), “Computer voice” (microphone), “Read before” / “Practised” (check). Text always present.
- **Focus.** 3px wine-red outline with a 3px ivory halo, offset 3px. On media it flips to ivory with a dark halo.

## Motion

Timing: press 120ms; micro 200ms; open/close 300ms; scene changes 520ms (exit from Home capped at 650ms). Easing `cubic-bezier(.22,1,.36,1)` for most things, a gentle overshoot `cubic-bezier(.34,1.45,.64,1)` only for the needle, medallion pop, ribbon and count bump. Motion is CSS first; GSAP (core only, 3.12.5) drives the atlas first reveal, the panel settle, the Home exit and scene animations. Entrances start from an already-visible state (opacity ≥ .25) so a stalled frame never hides content. All motion stops under `prefers-reduced-motion` or the site's Reduce motion setting; videos then wait for Play, and scenes show still steps. Nothing animates while you read a story.

## Do's and Don'ts

**Do**
- Use the six tokens by role; let media and stories carry local colour.
- Label every status with words and an icon; credit every photo and clip and caption the place it really shows.
- Keep one interaction per surface as its signature and make every other response fast and plain.
- Show empty themes, missing media and blocked storage honestly.

**Don't**
- Reintroduce the red–yellow signboard system, Anton capitals or a per-country brand colour.
- Put brass on text, tint photos, or lay texture over media.
- Add eyebrow labels above headings, emoji icons, glass effects or zero-blur block shadows.
- Make an animation gate input, queue on repeated clicks, or hijack scrolling.

### As-built refinement · 25 October 2026

The existing tokens and visual world above remain authoritative. Home now offers an immediate destination CTA and persistent skip link. The country opening now proceeds from cover to theme compass, then the three familiar places; the full story directory is collapsible. Scene illustrations are AI-generated gouache paintings inside SVG wrappers with numbered interactive pins. Choice sequences use a gentle camera zoom and authored captions, with a separate temple wardrobe image state; they do not animate individual limbs. Feedback leads with the chosen action and explanation, then continuation/retry controls and expandable sources. At desktop widths, completion opens a full-width two-column spread with a visible reminder save control. Scene-mobile redesign remains deferred. See [the scoped as-built record](docs/design/refinement-2026-10-25.md) for implementation paths, evidence and limitations.


### Destination selection · cinematic direction B · 25 October 2026

User-approved scoped exception for `globe.html` / `components/3d-globe-demo.tsx`: an immersive photographic destination stage with a dark charcoal scrim, a globe on the left, and an editorial country introduction on the right. The global paper navigation, serif/sans families, ivory and wine action palette remain. This replaces the floating postcard treatment for this section only. Local charcoal tones #181d20, #242728 and rgba(16,20,22,alpha) serve photography readability, not a new site-wide palette. Section display sizes are fluid 32–46px and 44–76px; body 16px, scope 14px, captions/hints 13px and background attribution 12px.

One real culture photograph carries each introduction, with place and source. Landmark backgrounds remain separately credited. Selection locks the backdrop and flies the camera toward the country; the selected marker retains its name. Hover never substitutes another country's background while reading. No continuous decorative postcard motion. Native country selection remains available if the globe fails. Below 760px, selection collapses the globe behind an explicit disclosure so reading and the CTA come first. Escape and Back return focus to the country picker. OS reduced-motion suppresses CSS transitions and makes the camera move immediate.

### Destination resting state follow-up
User-requested resting state: pure black with a stable dense white star field (780 points), with “Let curiosity lead the way.” The cinematic destination photo appears only after explicit selection. Header becomes black with ivory navigation while the destination section reaches the sticky header, and restores outside it. Clicking empty stage/canvas space closes the overview and resumes globe auto-rotation (except reduced motion); content, country controls and globe dragging do not dismiss it. Browser-verified country-flag switching and blank-stage/canvas dismissal; build/typecheck passed. Screenshot: docs/qa/screens/destination-space.png.

### Editorial system · country page and inner pages · 26–27 October 2026

**Where it applies (27 October 2026):** every page except the home page. That is `vietnam.html`, `story.html`, `scene.html`, `phrases.html`, `collection.html` and `about.html`, each marked `body.ex`. **The home page (`index.html`, `home.js`, the globe) keeps the original publication system above and must not be changed by this system.** `vietnam-classic.html` also stays on the original system. The rest of this section was first written for the country page only:

User-approved, first for the country page only: `vietnam.html` (styles `assets/css/explore.css`, scoped under `body.ex`; behaviour and the page config in `assets/js/explore.js`). The global header, sub-navigation, footer, settings drawer, bookmark and focus behaviour stay as above. The previous country page (cover, compass atlas, places, story directory) remains available as `vietnam-classic.html`, and the compass stays its signature there.

**North star for this page:** a long editorial magazine you scroll and explore rather than read. Pictures lead, text is short and sits on them over a dark scrim, and the background changes colour with each chapter.

**Tokens (this page only)**
| Token | Value | Role |
|---|---|---|
| `--bg-paper` | `#F3E4CB` | Cream paper, the default section ground (also re-points the shell's `--color-background`) |
| `--bg-paper-hi` | `#FBF3E4` | Raised cream: arrow buttons, game card backs, quiet panels |
| `--ch-teal` | `#037A90` | Chapter 1, Everyday life (white text, 5.0:1) |
| `--ch-peach` | `#F7A96A` | Chapter 2, Food & the table (dark text) |
| `--ch-jade` | `#75B2A8` | Chapter 3, Beliefs & temples (dark text) |
| `--ch-ember` | `#FC6C39` | Chapter 4, History & memory (dark text) |
| `--text-primary` / `--text-secondary` / `--text-muted` | `#202124` / `#3C4043` / `#5F6368` | Text; muted is the lightest allowed on cream (4.8:1) |
| `--eyebrow-bg` / `--eyebrow-ink` | `#FBAB64` / `#A14A12` | Eyebrow pill fill (dark text on it); uppercase category text on cream |
| radii | 8px cards and frames, 56px pills, 50% round views and icon buttons | |

Measured contrast (October 2026): every chapter heading, question and section subtitle is ≥ 5:1 on its chapter colour; uppercase category text and muted text on cream ≥ 4.79:1. Links on cream use `#02606F`.

**Typography.** Be Vietnam Pro throughout (already self-hosted with the Vietnamese subset): section titles 28–40px at weight 400, centred, with a 16px subtitle; chapter titles 40–68px at 400; card titles 18–22px at 500. The hero is a poster wordmark: “Việt Nam” in Be Vietnam Pro 700 as four offset SVG layers (cream over peach, ember and teal), with full diacritics and a visually hidden real heading. Source Serif 4 italic appears only in the large quotation.

**Rules this page relaxes (and only here)**
- Uppercase, letter-spaced eyebrow pills on cards (category or place, 11px bold) and the small uppercase “Explore” / theme labels. They never sit above a section heading.
- One colour per chapter, from the four tokens above. Countries do not get their own palette: a second destination reuses the same four chapter colours.
- Numbered chapter marks (digit + short dash) in the table of contents and chapter openings, because the order is the page's structure.
- Decorative motifs drawn as our own SVG: a band of four parallel wavy stripes (sóng nước), concentric half rings, a wavy ribbon crossing pictures in the chapter colour, and a bronze-drum sun ring. They are ornament only, never information.

**Modules** (each one a render function; the page is the `SECTIONS` array, so editors reorder or remove sections without touching module code): hero · sources strip · table of contents tiles · small banner · chapter opener · accordion strip · chips · round views ribbon · clusters (bento) · cards ribbon · cover stack · stories inline (plan with numbered stops) · large story cards · quotation · “Which came first?” game · phrase tiles · keep exploring · before you go · keep-it toast.

**Picture frames.** Until photos are chosen, every picture is a frame: a tone, a faint fish-scale wave pattern and a small tag naming the intended shot (“Photo · a pavement phở gà stall”). Setting `PHOTOS = true` in `explore.js` loads each frame's `imageId` from `assets.json` (or `src`) when it comes within 200px of the viewport and fades it in over 300ms. The Natural Media Rule still applies to the real photos.

**Motion**
- Easing `cubic-bezier(0.19, 1, 0.22, 1)` (ease-out-expo) for almost everything; durations 150 / 300 / 500 / 1000ms. A light spring `cubic-bezier(0.24, 1, 0.32, 1)` only for the heart, pins and badges.
- Hover zoom inside frames: scale 1 → 1.08 over 1000ms, the same way out; the scrim deepens over 300ms.
- Accordion strip: the hovered or focused strip opens over 500ms while the picture inside stays a fixed width, so it reads as a curtain opening; its text fades and rises 8px after 100ms. Arrow keys walk the strips. On screens ≤ 768px it is a swipe row and the card nearest the middle is open.
- Cover stack: scale by distance from the centre card (1, .861, .780, .723, .678, .642, .611, .584), z-index 10 − distance, 500ms. Hover, arrow keys, the arrow buttons or a swipe choose the centre; only the centre card shows text and is in the tab order.
- Ribbons: scroll-snap rows with 40px round arrow buttons that appear only when there is more to see.
- The one authored entrance: the wavy ribbons on the contents tiles and chapter openers draw across when they arrive (1400ms), starting a third drawn so nothing is ever hidden.
- Ink ripple on pills, chips and icon buttons; heart bounce on like; the game cards turn over (800ms).
- The URL follows the chapter you are reading (`#everyday`, `#food`, `#beliefs`, `#history`) with `replaceState`. Old anchors still land: `#overview` → hero, `#themes` → contents, `#practice` → the stack, a theme id or alias → its chapter (language → the phrase tiles).
- No parallax, no scroll hijacking, no per-letter text animation. Under the OS or site Reduce motion setting, zoom, stack, curtain, ribbon drawing and ripples stop, and only the image fade remains (150ms).

**Honesty.** Copy that has not been written from a source carries a visible “Placeholder copy” tag in place (the quotation, the Văn Miếu stop descriptions, the game's dates). Round “360°” views open the nearest story or say that no view exists yet.

**Inner pages (27 October 2026).** `assets/css/ex-pages.css` (after cc.css, refinements.css and explore.css) carries the system to the inner pages, and `assets/js/ex-kit.js` (after core.js) holds what they share: the SVG motifs, the chapter colour for a theme or scene, the page-head band and the ink ripple. `explore.js` takes its motifs from the kit.
- **Tokens, scoped to `body.ex`:** the six cc.css roles are re-pointed so every shared component follows. `background` is cream `#F3E4CB`, `surface` is `#FBF3E4`, `primary` becomes the deep teal ink `#02606F` (links, selected and saved states; 5.9:1 on cream), `text` is `#202124`, `text-secondary` is `#54585D`, and `accent` is ember `#E0652F` (ornament only). `--font-serif` maps to Be Vietnam Pro, and radii are 8px. Only the CultureCompass wordmark keeps Source Serif 4.
- **Controls:** buttons are pills. A primary button is dark ink `#202124` with cream text and turns teal on hover; on a teal band it inverts to cream. A quiet button is an outline pill. Chips are outline pills, and the selected chip is dark. Selects and Listen buttons are pills. The current page in the header and sub-navigation gets an ember underline.
- **Night frame, paper page (27 October 2026):** the frame of every inner page carries the home page's night sky, and the reading stays on cream paper. Pure black is never used behind long reading text.
  - Lacquer black `#100E0C` (`--night`; was pure `#000` until 27 October 2026, warmed so it sits with the cream paper and the warm paintings): the header (opaque, because a translucent bar over cream turns grey), the Vietnam sub-navigation, the page head and the footer. The page head has the home page's star tile (`home-stars.svg` under a 44% black veil).
  - Ink on night: `#FFFCF7` (19.9:1) for text, links and focus, and `#D6D2CB` (13.9:1) for secondary text. Hairlines are `rgb(255 252 247 / .16)`, buttons invert to cream, and the current page and the saved count are marked in cream ink (not ember: the frame carries one colour only). On black, teal is lifted to `--ch-teal-night` `#2BA3B7` (7.0:1); the paper keeps `#037A90`.
  - **The horizon (27 October 2026, replaces the four-stripe band and half rings on inner pages).** The page head ends in one long, low wave (`CC.ex.MOTIF.horizon`): the paper is cut along it, a 4px rim in the chapter colour runs on the edge, and two fading inlay lines (55%, 30%) follow it on the night side. The same horizon, with night below, joins the paper to the footer (`.ex-foot-join`). The rainbow band and half rings stay only in `vietnam.html`'s own modules.
  - **Nothing crosses the horizon.** Content starts below the wave with its own space; cards, filters and photos are never pulled up over it.
  - **The chapter colour leads, alone.** One colour per page: the horizon rim and inlays, the eyebrow pill (dark text, ≥ 5.3:1) and the footer mark. Everything else in the frame is neutral (night, cream ink). Story and Scene use the colour of their theme; Phrasebook is teal, Collection is peach and About is jade. The ground is always night.
  - "Try it in a scene" cards and the chapters of `vietnam.html` keep their chapter fills on paper.
  - Toasts carry a 1px cream hairline so they stay separate over the black footer. In print, the night frame and both bands are removed.
- **Story:** body in Be Vietnam Pro, 17–19px at a 1.75 line height and 66ch measure.
  - Drop cap in the chapter's ink; source numbers are small teal pills.
  - Aside boxes have a round icon in the chapter colour.
  - Sources are a numbered list with round counters.
  - "Try it in a scene" is a card in the chapter colour; the previous/next links are bordered cards.
- **Story cards** (related, collection): a borderless 8px frame with the slow 1.08 hover zoom, the theme as an uppercase label, and a round floating save button.
- **Scene:** stage and panel are raised surfaces lifted over the band.
  - Choices are 8px cards; the picked choice is teal.
  - Step dots are peach when done and dark for the current step.
  - Hotspot rings in the painting are ember.
  - The four feedback kinds keep their icons and words.
- **Phrasebook, Collection, About:**
  - The phrasebook filters sit in a raised panel over the band.
  - Phrase cards, collection items and source entries are cream-on-cream cards with 1px hairlines.
  - Uppercase labels (intent, source type, reminder Do/Say/Applies to, table headers) use the eyebrow ink or the eyebrow pill.
  - About lists use ember dots.
- **Motion:** the story entrance keeps its short rise, now on the expo ease. Hover zoom (1000ms), card lifts and the ink ripple stop under Reduce motion.

**Inner page structure (27 October 2026).** `assets/css/ex-layout.css` (loaded last on the five inner pages) owns order, grouping and space only.
- Scene: one stage card reads painting → live caption → object buttons → art credit; the side panel holds only the task (sticky, scrolls inside itself); background stories and "Applies to" sit under the painting.
- Story: the photo is a wide plate (max 62vh); the aside keeps only "Where this applies" and "How it varies"; "Words you can use" is a full-width row after the body; Sources and "Try it in a scene" close the story side by side.
- Phrasebook: with "All", phrases are grouped by what you want to do; each group is as wide as its phrases (up to three), so small groups share a row.
- Collection: stories are full-width reading-list rows; phrases and reminders stay as cards.
- About: a sticky "On this page" rail beside one reading column; on phones it becomes a contents card at the top.

### Country reading page · "Field Atlas" · 7 November 2026

**Supersedes, for `vietnam.html` only,** the cream-paper tokens, chapter fills, eyebrow pills, numbered chapter marks, rainbow motifs and picture frames described in "Editorial system" above. Those rules still describe the inner pages. The page's colours are the night palette of `assets/css/night.css`. Its styles live in `assets/css/read.css`, loaded last and scoped to `body[data-page="vietnam"]` and the `rd-` classes that `assets/js/explore.js` renders. It is the template for every country: a new country needs data, not new CSS.

**Idea.** Each chapter is a page of a field notebook. On wide screens (≥ 1001px) a picture (the *plate*) stands still on the left while the reading column scrolls on the right. The plate changes with the section being read: each module may name its own `plate` in `SECTIONS`. Below 1001px the plate becomes the chapter's opening picture.

**Colour.** One ground (`--night` #0B1220), one ink (`--night-text` #E6EEF6, secondary #C6D2DE), one action colour (`--cyan` **#5FD8E8**, now the same value as the globe HUD's `--cy`). Surfaces step in tone (`--night-2`, `--night-3`), never in lines or shadows. The Food chapter takes the `--night-2` field, so the three chapters read as separate rooms. Chapter tones (cyan, gold, jade) appear only as the 4px mark above the plate.

**Type (six sizes).** Display 72–176px Source Serif 4 600 (the country name, real text in the `h1`). Chapter 40–56px serif. Section 26–32px serif. Lead and row titles 22px serif. Body 18px Be Vietnam Pro, 1.6, at most 60ch. Meta, captions and credits 14px. Nothing smaller than 13px. On phones, row titles drop to the body size in the sans.

**Blocks** (the `SECTIONS` array):
- Required: cover · contents · start · chapter bar · chapter (opener + modules) · places in the game · picture credits · before you go.
- Optional: moments strip · story list · around the table · quotation · walk-through plan · timeline · which came first · keep it · keep exploring.
- No two neighbouring blocks share a layout. A block with no data renders nothing, never a placeholder.

**Pictures.** `pic()` resolves every picture: first a credited photo or video from `CC.assets`, then the story's scene painting (a pin of the painting can be zoomed to show a different detail), then the pixel art of the story's Explore zone. Every picture used is listed with its credit, licence and source in "Picture credits" at the foot of the page. Plates and the start picture carry their credit beside them. Pictures that repeat the text of their link are decorative (`alt=""`). Videos play muted only while on screen, never under reduced motion, and each has a pause button.

**Chapter bar.** Sticky under the header: the three chapters plus Places in the game, the current one underlined in cyan, and a 3px reading-progress line. On phones it becomes a native "Go to a chapter" select.

**Places in the game** is the only HUD quotation on the page: a `data-ui` panel with the HUD's cyan corner brackets and hairline frame, holding the zones' pixel art, stamps and progress. The heading stays outside the panel.

**Motion (intensity 3).** Headings, text and pictures rise 24px and fade in turn (70ms stagger) the first time they arrive. The plate cross-fades over 400ms. Hover zoom on pictures is 1.05 over 900ms. The moments strip opens over 500ms. The quiz cards turn over in 800ms. Under the OS or site Reduce motion setting nothing travels, the hidden start states never apply, and videos wait for Play.

**Gate (7 November 2026).** `inspect.mjs` reports 0 FAIL at 1440, 768 and 390 and leaves two warnings, both defended:
- Eleven type sizes: the page itself uses six plus the plan's SVG label; 15, 17, 20 and 24px come from the shared header and footer.
- Mixed-font rows on phones: a serif row title above a sans standfirst is two roles, not a headline that switches face mid-line.

`lint.mjs` is clean. The neutral scrims under text on pictures and the HUD frame carry `taste-skill-ignore` comments.

## Logo (8 November 2026)

**The mark is "Orbit Rose".** A four-point compass star (north point cyan, the others navy with a cyan outline), a wireframe globe in the centre, a thin white orbit ring that passes in front of the star at the lower right and behind it at the top, and a small cyan rocket with an amber flame at the end of the orbit. Drawn by Gemini; it is a picture, not a coloured icon, so it no longer follows `currentColor` or the page's primary ink.

- Files live in `assets/img/brand/`: `cc-logo-128.png` and `cc-logo-256.png` (header and footer, 1x/2x, transparent), `cc-logo-1024.png` (master), `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (simplified: star and globe only, no orbit or rocket), `cc-lockup-dark.png` (mark plus wordmark on night, for slides and social only), `cc-logo-pixel.png` (pixel version for the Explore game).
- `CC.MARK` in `core.js` renders the mark in the header (40px, 34px under 360px) and the footer (44px). The wordmark beside it stays live text in the page's own type; never use the lockup image in the site header.
- Every page links the favicon set in its `<head>`. A new page copies those three `<link>` lines.
- Over photographs the header adds a soft shadow under the mark instead of recolouring it.
- Do not recolour, outline or rotate the mark at rest (the header's hover turn is the only motion). Do not put it on mid-tone backgrounds where the navy star disappears; night and cream both work.

