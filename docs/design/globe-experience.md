# Homepage globe experience · 25 October 2026

This record covers the destination globe in the homepage's `#destinations` section and its standalone `globe.html` view. The requested interaction is a representative photograph on hover, followed by a country introduction and floating photographs on selection. The arrow CTA is the deliberate step into a country page.

This is a scoped treatment of the existing destination chooser. [DESIGN.md](../../DESIGN.md) remains the global design authority and [PRODUCT.md](../../PRODUCT.md) retains the product scope: a cultural learning prototype centred on Vietnam, starting in Hà Nội. Other pages retain the publication's warm paper, typography and navigation.

## Visual decisions

The globe provides an exploratory entry point; a native country picker gives visitors a direct route to every available destination. Rectangular flag buttons replace avatar markers. Their positions are approximate mainland anchors, not precise locations of the pictured scenes.

The selected country moves the globe left on desktop and reveals a reading area on the right. A large serif country name, short introduction, two offset postcard photographs and one arrow CTA form the hierarchy. The landscape photograph supplies a recognisable place; the smaller cultural photograph connects to the existing collection's specific people, craft or performance. Neutral dark scrims keep text readable over natural-colour photography. Source Serif 4 and Be Vietnam Pro carry over from the site.

The dark photographic ground, compact metadata and local animation timings are specific to this surface. They do not redefine the global palette, type scale or component rules. The iframe isolates the globe's Tailwind styles from the site's Bootstrap styles.

## State and navigation

| State or action | Result |
|---|---|
| Initial view | Centred globe, exploration hint and country picker; slow automatic rotation when motion is allowed. |
| Hover or keyboard focus on a flag | Preview its representative photograph and country name; pause automatic rotation. No navigation. |
| Leave the preview | Restore the selected country's background, if any; otherwise return to the unselected ground. |
| Activate a flag or choose a country in the picker | Retain that selection, reveal its introduction and two photographs, and pause automatic rotation. On desktop, move the globe left. |
| Preview another flag while a country is selected | Temporarily show the hovered country's backdrop; the selected introduction remains until another selection is made. |
| Activate another country | Replace the introduction and photographs in the existing layout. |
| Close or press Escape within the experience | Clear both selection and preview and restore the unselected layout. |
| Activate the arrow CTA | Open `vietnam.html` for Vietnam or `country-details.html?country=…` for another country. Embedded mode navigates the parent page. |

The arrow CTA is the only control that enters a country page. Photo-source links remain separate external attribution links. Country detail return links lead to `index.html#destinations`.

## Small screens, input and motion

At widths of 900px and below, the globe stays centred and the selected introduction stacks underneath it. The embedded frame follows its content height through a source-checked message, avoiding an inner scrollbar.

Flags are keyboard-focusable buttons, and the native picker makes selection possible without rotating the globe or relying on hover. Visible focus styles and descriptive photo alt text support the interaction. Coarse-pointer devices show “Choose a flag or find a country to look closer” instead of hover instructions, and flag hit areas have a 44px minimum width and height. These touch refinements were included following review.

The backdrop fades, globe shifts and postcards drift gently when motion is enabled. `prefers-reduced-motion` disables the CSS transitions and animations and stops automatic globe rotation. This records the implemented OS preference support; it does not claim that the host site's separate stored motion setting is bridged into the iframe.

## Content and sources

- [globe/destination-photos.ts](../../globe/destination-photos.ts) supplies paths, alt text, place labels, credits and original source links for 16 new local landscape/landmark photographs.
- [assets/img/destinations/credits.json](../../assets/img/destinations/credits.json) preserves photo attribution and source metadata, including authors and licences. The active backdrop exposes its credit and original source in the footer.
- [globe/countries.ts](../../globe/countries.ts) supplies flag markers and the existing cultural photographs. Their credits also belong to the existing media collection in [assets/data/assets.json](../../assets/data/assets.json); the postcard links to its original source.
- [globe/country-intros.ts](../../globe/country-intros.ts) contains short editorial introductions grounded in the specific cultural scenes already pictured. Flags use the locally stored flag-icons assets and included licence.

Background images are first mounted when previewed or selected and retained for subsequent transitions. They are local files; the globe still needs network access for its remote Earth textures and requires WebGL.

A landmark is an invitation to explore, not evidence of an entire country's culture. Vietnam's Hạ Long Bay background, for example, does not expand the researched lesson scope beyond Hà Nội. The other 15 destinations remain visual introductions with source links, not complete researched courses. The short editorial copy does not replace the claim-level sources used by the Vietnam stories. Existing content verification gaps and the absence of formal usability testing remain as documented in the [README](../../README.md).

## Implementation and validation

The interaction is implemented in [components/3d-globe-demo.tsx](../../components/3d-globe-demo.tsx), with the globe and flag controls in [components/ui/3d-globe.tsx](../../components/ui/3d-globe.tsx), and layout/motion in [globe/styles.css](../../globe/styles.css). The homepage embeds `globe.html?embed=1`.

Build, TypeScript and content checks passed for this update. Desktop and mobile layouts and the browser selection-to-navigation flow were checked. These checks establish the observed implementation behaviour; they are not a WCAG audit, a comprehensive device matrix or user-research findings.

Saved visual evidence:

- [Desktop selection](../globe-checks/selection-desktop.png)
- [Mobile selection](../globe-checks/selection-mobile.png)
- [Country reveal within the homepage](../globe-checks/homepage-country-reveal.png)

### Space background and frontal illumination

The unselected globe now sits on pure black (#000) with 235 deterministic,
stationary SVG stars. Country photographs still replace the star field during
preview and selection. Stars are decorative and ignore pointer events.
The demo adds camera-following directional sunlight (intensity 3.2), raises
ambient fill to 1.4, and reduces bump scale to 1.5. This keeps the visible side
readable while dragging; the reusable component's new frontLightIntensity
option defaults to zero. Build/typecheck and browser rotation/selection checks
passed. Evidence: `../globe-checks/space-globe.png`.
