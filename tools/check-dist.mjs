import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const errors = [];
let checked = 0;
async function check(file, reference) {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return;
  const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
  const target = pathname.startsWith('/')
    ? path.join(root, pathname)
    : path.resolve(path.dirname(file), pathname);
  checked++;
  try {
    if (!(await stat(target)).isFile()) throw new Error('Not a file');
  } catch {
    errors.push(`${path.relative(root, file)}: missing ${reference}`);
  }
}
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.(html|css)$/.test(entry.name)) continue;
    const text = await readFile(file, 'utf8');
    const pattern = entry.name.endsWith('.html')
      ? /\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi
      : /url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]+))\s*\)/gi;
    for (const match of text.matchAll(pattern)) await check(file, match[1] ?? match[2] ?? match[3]);
  }
}
await walk(root);
for (const required of ['index.html', 'assets/globe/globe.js', 'assets/globe/details.js', 'assets/globe/globe.css', 'assets/tracing-beam/tracing-beam.js']) {
  await check(path.join(root, 'index.html'), required);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${checked} local HTML/CSS references and required bundles in dist/.`);
