import { URL } from 'node:url';
import { rm } from 'node:fs/promises';
const root = new URL('../../', import.meta.url);
for (const path of [
  'apps/game/dist',
  'node_modules/.vite',
  'apps/game/node_modules/.vite',
  'coverage',
]) {
  await rm(new URL(path, root), { recursive: true, force: true });
}
