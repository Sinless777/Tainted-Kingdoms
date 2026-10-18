# Development verification

Run `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:run`, and `pnpm build` from the repository root.

For a browser smoke test, start `pnpm dev`, open the printed URL, and confirm ground, placeholder cube, lighting, and orbit/zoom controls. Resize the window and confirm the canvas and camera view update. Confirm the FPS indicator appears in development and is absent in production.

Use a WebGPU-capable browser in a secure context (localhost qualifies) and inspect Babylon's startup console output to confirm the chosen engine. Repeat in a browser with WebGPU disabled to verify real WebGL rendering. Tests simulate WebGPU initialization failure and check fallback disposal. Test navigation away and Vite hot replacement for resource cleanup. If both graphics backends fail, the shell must report initialization failure.

The Node-based NullEngine integration test checks scene construction and rendering without GPU access. Browser and desktop behavior require separate device validation; no desktop packaging is present.
