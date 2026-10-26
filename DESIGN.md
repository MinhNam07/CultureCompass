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
| `primary` | `#762F3B` | Wine-red ink. Logo, primary buttons, links, selected states, the compass needle and selection line. Never a large fill. |
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
- **Feedback (practice scenes).** Four kinds, each with its own icon and words: Fits this situation (filled check), Another way that also fits (outlined swap), Needs more context (question mark, dashed border), See the rules and guidance (dark info). Never colour alone.
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
