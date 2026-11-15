// Bakes the rendered React markup into dist/index.html after `vite build`.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ssrDir = path.join(root, 'dist-ssr');
const htmlPath = path.join(root, 'dist', 'index.html');

// Components read localStorage while rendering; give them an empty one.
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const template = await readFile(htmlPath, 'utf-8');
if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder');
}
await writeFile(htmlPath, template.replace('<!--app-html-->', appHtml));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: injected ${appHtml.length} chars of HTML into dist/index.html`);
