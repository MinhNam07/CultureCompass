# CultureCompass interface refinement · 25 October 2026

This is an as-built record of an ordinary refinement of the existing warm-paper publication. It does not replace the visual world or redefine its tokens. Home and country navigation were the first priority, followed by scene feedback and completion. A scene-mobile redesign remains deferred.

## Preserved system

`DESIGN.md` remains the normative token reference. Its six palette values, serif/sans pairing, type scale, fluid gutter, reading measure and small radii match the corresponding primitives in `assets/css/cc.css`. Source Serif 4 remains the reading and heading voice; Be Vietnam Pro remains the interface voice. Wine-red actions, ivory surfaces, paper ground and brass ornament carry through the new components. The refinement adds component-specific layout and typography overrides, not replacement global tokens.

## Home and country

- `index.html` exposes **Explore destinations** in the initial hero copy, states “Vietnam, starting in Hà Nội”, and supplies a persistent **Skip to destinations** link. `assets/js/home.js` adds place captions to the international photo flow. In `assets/css/cc.css`, the flow uses a 240svh scroll run on desktop and 180svh at the narrow breakpoint, in addition to the viewport-height stage; the direct links bypass that journey.
- `vietnam.html` now orders the opening as cover → themes → familiar places. The full story directory uses a closed native `details` disclosure, while practice and phrases remain below it.
- The October 25 rules at the end of `assets/css/cc.css` tighten the cover and section spacing and rebalance the atlas/panel. The final wide-screen atlas map is 420px maximum, with smaller theme controls and space for the long Language question. The screenshots show the existing editorial hierarchy and video plate retained.

## Painted scenes and controls

`assets/img/scenes/` contains four full paintings (`homestay.jpg`, `dinner.jpg`, `temple.jpg`, `street.jpg`), four matching `-thumb.jpg` derivatives, and `temple-arrival.jpg`, the alternate arrival wardrobe. These are AI-generated gouache-style interpretations. They are not documentary photographs or evidence of site geometry. Prompts are recorded in `docs/design/illustration-prompts-2026-10-25.md`; asset credits and limitations live in `assets/data/assets.json`.

`assets/data/svgs.js` embeds each painting in an 800×450 SVG camera group, with numbered pins above it. The adjacent numbered button list supplies the keyboard-operable route to the same details. `assets/js/scene-engine.js` handles selection, authored captions and explanatory details. The dinner glass pin is at `(282, 220)`. Street step 2 keeps a visible note that the moment takes place later on a smaller street without a crossing or light; the unchanged painting shows the earlier location. Temple arrival uses the uncovered-clothing variant; the dress choice and later steps use the covered-clothing painting.

## Feedback, completion and motion

`assets/js/scene-engine.js` and `assets/css/refinements.css` put the chosen action above contextual feedback, retain the named feedback status, and bring **Next moment** and **Try another option** ahead of the expandable context and sources. The supporting evidence is still available without dominating the first response.

At widths of at least 961px, completion changes the scene grid into a full-width panel. The two-column spread pairs the painting and contextual reminders with a visible save action and the reminder card. The old stage and object list are hidden in this desktop summary state. This replaces a completion message constrained to the choice panel.

The paintings remain still. GSAP gently scales the SVG camera to 1.055 around the relevant pin while authored caption beats advance every 0.6 seconds; the duration is at least 0.8 seconds. This guides attention but does not depict articulated hands, limbs, facial reactions or physically enacted choices. Skip animation remains available. Reduced motion or absent GSAP takes the direct caption-and-feedback route. The temple wardrobe change is an image swap, not a dressing animation.

## Evidence and limits

This documentation pass compared `DESIGN.md`, the Home/country HTML and scripts, `assets/data/svgs.js`, `assets/js/scene-engine.js`, both interface stylesheets, `README.md`, and `docs/qa/2026-10-25/README.md`. It visually inspected all five supplied 1280×720 captures: Home, country overview, country themes, scene feedback and scene summary. The captures support the visible hierarchy described here; source inspection supplies behavior that a still image cannot verify.

The QA record reports successful build/content/syntax checks, the tested temple journey and save flow, and the existing content-verification warnings. This documentation pass did not independently rerun those checks or claim broader interaction coverage. The captured viewport does not certify narrow-screen Home/country behavior. Scene mobile remains deferred, and no exhaustive choice regression, usability study or assistive-technology audit is claimed.

Existing documentation drift was left outside this scoped update: the older README media-credit sentence still calls scene illustrations “original SVGs”; `DESIGN.md` contains broad historical claims such as a 14px minimum despite smaller existing interface details, and a separate Motion section beyond its canonical eight-section format. These were not used as grounds for a token rewrite or unrelated documentation repair. The appended refinement note in `DESIGN.md` resolves only the changed country ordering, scene medium and completion behavior.
