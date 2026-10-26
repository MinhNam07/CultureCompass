# Vercel deployment check — 26 October 2026

## Fix

The reported build at `e9c0f4d` compiled successfully but Vercel expected a
`public` output directory that did not exist. The build now packages the 11 HTML
pages, assets and vendor libraries into `dist`. `vercel.json` explicitly selects
that directory, `npm ci`, the build command and the Other framework preset.
Source code, tooling, documentation and node_modules are not published.

## Verification

- Fresh temporary copy of Git-tracked files plus the deployment changes:
  `npm ci` and `npm run build` passed. No pre-existing node_modules or ignored
  globe bundles were copied. npm audit reported zero vulnerabilities.
- TypeScript and both React bundles compiled; Tailwind CSS generated.
- Content check: 13 sources, 33 claims, 11 phrases, 71 assets, 4 scenes,
  11 stories and 6 themes; zero errors, 28 existing editorial/audio warnings.
- Packaged-output check passed: 178 local HTML/CSS references and required bundles.
- Additional scan found all 112 literal asset paths referenced by application
  JavaScript, JSON and React sources in the output.
- Served `dist` over localhost and opened all 11 page entrypoints. Story and
  scene query parameters rendered their content; Japan rendered with
  `country=jp`; an unknown country displayed the fallback. `saved.html` and
  `hanoi.html` redirected correctly.
- `git diff --check` passed. Output size was approximately 116 MB on disk.

## Limits

This was a deployment/build and page-loading check, not a full interaction,
accessibility or cross-browser audit. No live Vercel deployment was performed.
The in-app browser recorded a MutationObserver error on homepage loads without
a source URL/stack. No shipped file in `dist` contains `MutationObserver`, and
the pages rendered, suggesting browser-injected code; its origin is not proven.
The globe still depends on external unpkg textures and WebGL.
Editorial verification and synthetic-voice warnings remain unchanged.

## Deploy

Commit/push the deployment changes and deploy the new commit. In Vercel use the
repository root (`./`), where `package.json` and `vercel.json` live. The local
checkout folder is named `implementation`, but that is not a nested directory
in this GitHub repository. The configured output is `dist`, not `public`.
