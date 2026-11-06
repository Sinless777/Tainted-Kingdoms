# Development verification

Run `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:run`, and `pnpm build` from the repository root.

For a browser smoke test, start `pnpm dev`, open the printed URL, and confirm ground, placeholder cube, lighting, and orbit/zoom controls. Resize the window and confirm the canvas and camera view update. Confirm the FPS indicator appears in development and is absent in production.

Use a WebGPU-capable browser in a secure context (localhost qualifies) and inspect Babylon's startup console output to confirm the chosen engine. Repeat in a browser with WebGPU disabled to verify real WebGL rendering. Tests simulate WebGPU initialization failure and check fallback disposal. Test navigation away and Vite hot replacement for resource cleanup. If both graphics backends fail, the shell must report initialization failure.

The Node-based NullEngine integration test checks scene construction and rendering without GPU access. Browser and desktop behavior require separate device validation; no desktop packaging is present.

## Tracked dependency residual

`minimatch@10.2.6` is a transitive dev dependency of the root `eslint`, `@eslint/js`, and `typescript-eslint` packages, resolved in `pnpm-lock.yaml`. GitHub advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) (CVE-2026-118764, medium, published 2026-10-30) covers `minimatch` versions `>=7.0.0 <11.0.1`. A crafted glob can drive excessive CPU and memory use. The patched release line is `minimatch@>=11.0.1`.

The lockfile keeps `10.2.6`. `minimatch` 11 is a breaking major outside the 10.x ranges those parents declare: `eslint` `^10.2.5`, `@eslint/config-array` `^10.2.4`, and `@typescript-eslint/typescript-estree` `^10.2.2`.

ESLint globs in this repository are trusted repository input. `pnpm lint` runs `eslint .`. `eslint.config.js` contains static ignore patterns and the recommended configs only. Player content, network requests, and other outside strings are not passed to ESLint as globs. Revisit this residual when those parents adopt `minimatch` 11, or sooner if lint starts accepting patterns from outside the repository.
