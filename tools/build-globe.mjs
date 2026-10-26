import { build } from "esbuild";

await build({
  entryPoints: { globe: "globe/main.tsx", details: "globe/details.tsx" },
  bundle: true,
  outdir: "assets/globe",
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
});
