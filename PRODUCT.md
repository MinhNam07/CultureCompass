# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

International travellers preparing for a trip, at home in the weeks before they leave, on a laptop or a phone. They may not speak the local language. They want to understand the place they are going to (its everyday life, history, beliefs, food and language) and to keep a few things that will help on the trip.

The project is also a solo student UX assignment (CSCU9X5), so module assessors read it, but the traveller is the user it is designed for.

## Product Purpose

CultureCompass helps travellers **explore and understand the culture of a destination before they arrive**: everyday life, history and memory, food, arts, beliefs and festivals, and how people speak to each other. Practising a situation in an interactive scene is one branch that helps apply what they read; it is not the whole product.

Tagline: *Understand the place before you arrive. Explore the stories, traditions and everyday life behind your next destination.*

After one session a visitor should:
1. understand one cultural practice and the context or meaning behind it;
2. see that it varies by region, community, family or place, and know the limits of what we can tell them;
3. have saved one story, phrase or reminder that will help on the trip.

Reading or completing something is never presented as having understood or mastered a culture. There are no scores, leaderboards or forced rewards.

## Vision vs. what exists today

- **Vision:** many countries, each with its own themes, regions and communities. The architecture (countries.json → topics.json → stories.json, with scenes and phrases attached) is built for that.
- **Today (24 October 2026):** one destination, **Vietnam, starting in Hà Nội**. 6 themes (5 with stories; *Arts & creativity* is not written yet), 11 stories, 4 optional practice scenes, 11 phrases, 13 sources. Run `node tools/check-content.js` for current numbers.
- Hà Nội content is never presented as representing all of Vietnam. No placeholder countries, invented articles, interviews, testimonials, contributors or launch dates are shown.

## Positioning

A cultural publication you explore like a game of discovery. Choosing a destination, turning the compass to a theme, opening a story and keeping a bookmark all respond immediately and with a little delight, but the content is the point: short, sourced explanations that say where they apply and how they vary. Practice scenes give contextual feedback that is never a bare right or wrong (*Fits this situation*, *Another way that also fits*, *Needs more context*, *See the rules and guidance*).

## Operating Context

Main flow: `index.html` (muted culture montage → choose a destination) → `vietnam.html` (overview and scope → compass of six themes → stories) → `story.html?id=…` (the story, its sources, where it applies, phrases) → optional `scene.html?id=…` (practice) → save to `collection.html`.

Global navigation: **Destinations · My collection · About** (+ Settings). Inside a destination: **Overview · Themes · Practise a moment · Phrasebook**.

Supporting pages: `phrases.html` (phrasebook by intent, theme or scene), `collection.html` (saved stories, phrases and reminder cards, grouped by destination, printable), `about.html` (method, scope, live content status, sources, credits, accessibility, data). Old routes: `saved.html` → `collection.html`; `hanoi.html` → `vietnam.html`; old theme anchors such as `#topic-greetings` or `#street` open the matching new theme.

## Capabilities and Constraints

- Static site: HTML5, CSS, Bootstrap 5.3.3 (reboot + offcanvas), vanilla JavaScript, inline SVG, GSAP 3.12.5 core (no plugins vendored). No backend, accounts or tracking.
- Must work when opened from `file://`. Content is authored in `assets/data/*.json`; `tools/build-data.js` generates the `.js` files the pages load (never edit them by hand). `svgs.js` is hand-edited. `tools/check-content.js` validates references, sources, credits, stories and themes.
- Fonts are self-hosted (Source Serif 4, Be Vietnam Pro); there are no external requests.
- Storage is the browser's localStorage only, with an in-memory fallback when blocked and a kept backup when data is unreadable. Saved data from older versions is migrated, never silently deleted.
- UI language is English; Vietnamese appears with full diacritics and `lang="vi"`.
- The assignment requires multimedia: video, audio, animation and interaction.

## Brand Commitments

- Name: CultureCompass. The compass is the navigation metaphor on country pages (a needle that turns toward the theme you are looking at).
- Visual direction (decided by the project owner, 24 October 2026): a warm, deep cultural publication, gently evocative of old print but bright and modern; six fixed colours and Source Serif 4 + Be Vietnam Pro. See DESIGN.md.
- Voice: calm, curious, non-judgemental. Explains why, offers alternatives, says what we don't know.

## Evidence on Hand

- Sources with check dates and limits: `assets/data/sources.json`. Claims and their status: `assets/data/scenarios.json` (5 still `needs_verification`). Stories: `assets/data/stories.json` (every paragraph points to claims). Phrases: `assets/data/phrases.json` (7 waiting for a native-speaker check).
- Media credits and licences: `assets/data/assets.json`. Videos are trimmed CC clips from Wikimedia Commons; the market clips were filmed in Hội An and are captioned so.
- Audio in `assets/audio/` is a synthetic placeholder (macOS “Linh” voice), labelled “Computer voice” everywhere. Do not present it as a real speaker.
- Design research: `docs/research/sandooka-analysis.md` (mechanism reference only; no Sandooka assets or layouts are reused).
- No user interviews or usability tests have been run; there are no testimonials, quotes or test results. Do not invent any.

## Product Principles

1. Understanding first: the culture is readable directly; practice is an optional next step.
2. Sourced or labelled: nothing is shown as fact unless it is linked to a checked source; unverified items say so in place.
3. Scope honestly: every story says where it applies and how it varies; empty themes say "Not written yet".
4. Context over correctness: feedback explains when a choice fits and offers other ways.
5. Something to take along: stories, phrases and reminder cards can be saved and printed.

## Accessibility & Inclusion

Target: WCAG 2.2 AA (not audited; not claimed).
- Everything works by keyboard; focus is visible on paper and on media and is returned to where you were after closing a theme or coming back from a story.
- Hover is never required: focus previews the same as hover, and touch screens show previews by default.
- Videos are muted, have Pause/Play and a still, and wait for Play under reduced motion or data saver.
- Audio phrases always have written text and meaning; synthetic audio is labelled.
- Status uses words and icons, never colour alone. No timers.
