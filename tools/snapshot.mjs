import fs from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outName = fs
  .readdirSync(join(root, 'dist-ssr'))
  .find(f => /^prerender-entry\.m?js$/.test(f));
if (!outName) throw new Error('ssr bundle missing');
const mod = await import(join(root, 'dist-ssr', outName));
const target = join(root, 'dist', 'index.html');
const before = fs.readFileSync(target, 'utf8');
const slot = '<div id="root"></div>';
if (!before.includes(slot)) throw new Error('slot missing');
fs.writeFileSync(target, before.replace(slot, '<div id="root">' + mod.render() + '</div>'));
