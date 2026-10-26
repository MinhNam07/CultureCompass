import { build } from "esbuild";

await build({
  entryPoints: { "tracing-beam": "tracing-beam/main.tsx" },
  bundle: true,
  outdir: "assets/tracing-beam",
  format: "iife",
  platform: "browser",
  target: "es2022",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
});
