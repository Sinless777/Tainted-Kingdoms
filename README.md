# Tainted Kingdoms

See the [folder guide](docs/architecture/folder-guide.md) for every directory, its intended contents, and examples of where new files belong.

A grimdark, open-world 3D fantasy RPG by **SinLess Games**, under SinLess Industries.
This repository provides the browser-first TypeScript foundation: Babylon.js rendering, WebGPU with WebGL fallback, and a procedural starter scene. Desktop packaging and gameplay systems are future work.

## Prerequisites and installation

Use Node.js 24 LTS, pnpm 12.11.2, Git, and Git LFS. Windows and Linux development are supported; rendering requires a modern browser with WebGL or WebGPU enabled.

```sh
git lfs install
pnpm install
pnpm dev
```

Open the local URL printed by Vite. Drag to orbit and scroll to zoom. A development-only FPS counter updates twice per second. Run `pnpm build` for production output in `apps/game/dist`.

## Development commands

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Start the game development server        |
| `pnpm build`        | Build the browser game                   |
| `pnpm typecheck`    | Check all workspaces, tooling, and tests |
| `pnpm lint`         | Run ESLint                               |
| `pnpm format`       | Format source and documentation          |
| `pnpm format:check` | Check formatting                         |
| `pnpm test`         | Watch tests                              |
| `pnpm test:run`     | Run tests once                           |
| `pnpm clean`        | Remove known build and test caches       |

## Repository structure

- `apps/game`: Vite browser application, startup, starter scene, input and UI integration.
- `apps/editor`, `apps/server`: documentation-only reservations, not active workspaces.
- `packages/core`: platform-independent lifecycle and common infrastructure.
- `packages/engine`: Babylon.js adapters and rendering initialization.
- `packages/gameplay`, `packages/world`, `packages/data`, `packages/networking`, `packages/shared`: compile-ready package boundaries; no gameplay features implemented.
- `assets`: source and runtime media organized by category.
- `content`: authored gameplay definitions, separate from logic.
- `tools`: asset and validation preparation plus repository scripts.
- `tests`: integration tests and fixtures.
- `docs`: architecture, development, gameplay, world, and asset documentation.

See [architecture](docs/architecture/workspaces.md) for package responsibilities and dependency direction. Workspace packages export TypeScript source for Vite; independent package publishing is not configured. Browser APIs are confined to the game and engine.

## Assets and Git LFS

Run `git lfs install` once per developer machine, then `git lfs pull` after cloning if necessary. The repository tracks models, textures, audio, cinematics, and binary archives with LFS. Inspect configuration with `git lfs version`, `git lfs track`, and `git lfs ls-files`. An empty file list is expected until actual binary assets are committed.

Review and commit `.gitattributes` before adding binary assets. No initial commit or history migration is performed by this setup. TypeScript, JSON, Markdown, shader sources, and other text stay in regular Git, except `.gltf` which is explicitly LFS-tracked by the requested model policy. Prefer GLB for runtime models.

Follow the [Blender-to-Babylon workflow](docs/assets/workflow.md). Assets are not copied wholesale into Vite public files. Only explicitly included runtime assets belong in the game build.

## Testing and CI

Renderer selection tests cover WebGPU preference, unsupported hardware, initialization failure cleanup, and WebGL errors. The integration test creates and renders the actual starter scene with Babylon's NullEngine. This verifies scene construction without a GPU; it does not prove browser GPU support. Manually verify both rendering backends using the [development checks](docs/development/verification.md).

GitHub Actions installs the frozen lockfile and runs type checking, lint, formatting, tests, and production build on Node 24. No deployment workflow is configured.

## Licensing

Licensing is pending. No license grant or legal terms have been chosen for this repository.
