import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
// Only clear this generated directory; never publish the source repository.
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
const pages = (await readdir(root)).filter(name => name.endsWith('.html'));
for (const name of [...pages, 'assets', 'vendor']) {
  await cp(path.join(root, name), path.join(out, name), {
    recursive: true,
    filter: source => path.basename(source) !== '.DS_Store',
  });
}
console.log(`Packaged ${pages.length} pages, assets and vendor into dist/.`);
