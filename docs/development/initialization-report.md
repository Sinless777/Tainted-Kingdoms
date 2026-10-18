# Initialization report

Initialized the empty Tainted Kingdoms repository for SinLess Games with nine workspace projects (root, game, and seven packages). All requested reserved directories are present and preserved with `.gitkeep` files. No existing game code or assets were present. No commits or pushes were made. Licensing remains pending and LICENSE is intentionally absent.

## Installed versions

| Package/tool       | Version |
| ------------------ | ------- |
| @babylonjs/core    | 9.31.0  |
| @eslint/js         | 10.0.1  |
| @types/node        | 24.19.2 |
| eslint             | 10.13.0 |
| prettier           | 3.9.10  |
| typescript         | 6.0.3   |
| typescript-eslint  | 8.71.2  |
| vite               | 8.3.4   |
| vitest             | 5.0.5   |
| pnpm               | 12.11.2 |
| Validation Node.js | 24.21.0 |
| Git LFS            | 3.7.1   |

TypeScript 6.0.3 is selected because typescript-eslint 8.71.2 supports TypeScript versions below 6.1. Package versions are pinned and the generated pnpm lockfile is included.

## Verification results

- Frozen-lockfile dependency installation passed.
- Strict TypeScript checks passed across all workspaces, tests, and Vite/Vitest configuration.
- ESLint and Prettier checks passed.
- Five tests passed across two suites: renderer selection/failure behavior and actual Babylon NullEngine scene creation/render/disposal.
- Production Vite build passed. Vite reports a main chunk above 500 kB (about 1.38 MB minified, 336 kB gzip); initial loading optimization remains future work.
- Vite development server started on localhost.
- A temporary Playwright Chromium driver rendered the actual application through software WebGL2. The shell reached its ready state, FPS updated, canvas resized to 1000×700, and no page errors occurred. Screenshot inspection confirmed ground, cube, and lighting. Browser tooling was installed outside the repository and is not a project dependency.
- WebGPU reported no available adapter in this environment. Real WebGPU rendering and Windows/native hardware behavior remain unverified. Automated factory tests verify WebGPU selection and fallback logic.
- Git LFS was initialized with repository-local configuration and hooks. All 29 requested patterns were listed; no LFS files exist yet. Attribute checks confirmed GLB uses LFS while JSON and WGSL remain ordinary Git text. No binaries were added and `.gitattributes` remains uncommitted, per the no-automatic-commit requirement.

The sandbox blocks network access and local port binding by default; installation, repository-local LFS setup, and the local browser check succeeded through authorized elevated execution. An offline installation attempt could not reuse the external dependency store; the subsequent normal frozen installation passed.

## Launch

```sh
pnpm install
pnpm dev
```

## Next milestone

Add player movement and camera interaction on the procedural test scene, with an explicit input mapping and resource lifecycle tests. Keep new game rules separate from rendering and defer authored RPG systems until requirements exist.

## Actual repository tree

Generated files, dependencies, internal repository metadata, and `.gitkeep` markers are omitted below. Empty reserved directories are included.

```text
Tainted_Kingdoms/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── editor/
│   │   └── README.md
│   ├── game/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── bootstrap/
│   │   │   │   └── start-game.ts
│   │   │   ├── config/
│   │   │   ├── input/
│   │   │   ├── runtime/
│   │   │   ├── scenes/
│   │   │   │   └── create-start-scene.ts
│   │   │   ├── styles/
│   │   │   │   └── main.css
│   │   │   ├── ui/
│   │   │   └── main.ts
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── server/
│       └── README.md
├── assets/
│   ├── animations/
│   ├── armor/
│   ├── audio/
│   │   ├── ambient/
│   │   ├── music/
│   │   ├── sfx/
│   │   └── voices/
│   ├── buildings/
│   ├── characters/
│   ├── cinematics/
│   ├── creatures/
│   ├── environments/
│   ├── items/
│   ├── materials/
│   ├── shaders/
│   ├── source/
│   │   ├── blender/
│   │   ├── reference/
│   │   └── substance/
│   ├── terrain/
│   ├── textures/
│   ├── ui/
│   ├── vegetation/
│   ├── vfx/
│   └── weapons/
├── content/
│   ├── abilities/
│   ├── biomes/
│   ├── characters/
│   ├── civilizations/
│   ├── creatures/
│   ├── dialogue/
│   ├── factions/
│   ├── items/
│   ├── quests/
│   ├── settlements/
│   └── world/
├── docs/
│   ├── architecture/
│   │   └── workspaces.md
│   ├── assets/
│   │   └── workflow.md
│   ├── development/
│   │   ├── initialization-report.md
│   │   └── verification.md
│   ├── gameplay/
│   └── world/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── events/
│   │   │   ├── lifecycle/
│   │   │   │   └── disposable.ts
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── data/
│   │   ├── src/
│   │   │   ├── definitions/
│   │   │   ├── registries/
│   │   │   ├── schemas/
│   │   │   ├── serialization/
│   │   │   ├── validation/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── engine/
│   │   ├── src/
│   │   │   ├── animation/
│   │   │   ├── audio/
│   │   │   ├── cameras/
│   │   │   ├── lighting/
│   │   │   ├── materials/
│   │   │   ├── physics/
│   │   │   ├── rendering/
│   │   │   │   ├── create-engine.ts
│   │   │   │   ├── select-renderer.test.ts
│   │   │   │   └── select-renderer.ts
│   │   │   ├── resources/
│   │   │   ├── shaders/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── gameplay/
│   │   ├── src/
│   │   │   ├── abilities/
│   │   │   ├── ai/
│   │   │   ├── attributes/
│   │   │   ├── characters/
│   │   │   ├── combat/
│   │   │   ├── crafting/
│   │   │   ├── dialogue/
│   │   │   ├── equipment/
│   │   │   ├── factions/
│   │   │   ├── inventory/
│   │   │   ├── items/
│   │   │   ├── magic/
│   │   │   ├── progression/
│   │   │   ├── quests/
│   │   │   ├── reputation/
│   │   │   ├── spawning/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── networking/
│   │   ├── src/
│   │   │   ├── protocol/
│   │   │   ├── replication/
│   │   │   ├── transport/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared/
│   │   ├── src/
│   │   │   ├── constants/
│   │   │   ├── math/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── world/
│       ├── src/
│       │   ├── biomes/
│       │   ├── civilizations/
│       │   ├── climate/
│       │   ├── generation/
│       │   ├── navigation/
│       │   ├── settlements/
│       │   ├── streaming/
│       │   ├── structures/
│       │   ├── terrain/
│       │   ├── time/
│       │   ├── vegetation/
│       │   ├── weather/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── tests/
│   ├── fixtures/
│   └── integration/
│       └── scene.test.ts
├── tools/
│   ├── asset-pipeline/
│   ├── content-validation/
│   └── scripts/
│       └── clean.mjs
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── CONTRIBUTING.md
├── README.md
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.tools.json
└── vitest.config.ts
```
