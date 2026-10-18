# Tainted Kingdoms folder guide

This guide explains every project directory and its intended ownership. A directory described as **reserved** is a place for future work, not an implemented feature. Most reserved directories contain only `.gitkeep`, a marker that lets Git preserve an otherwise empty folder.

## Choosing where a file belongs

| You are adding…                                       | Put it in…                                  |
| ----------------------------------------------------- | ------------------------------------------- |
| A runnable application or its browser UI              | `apps/`                                     |
| Reusable TypeScript behavior                          | The responsible workspace under `packages/` |
| Models, textures, audio, or editable art originals    | `assets/`                                   |
| Authored character, item, quest, or world definitions | `content/`                                  |
| A developer command or conversion tool                | `tools/`                                    |
| A test crossing package/application boundaries        | `tests/integration/`                        |
| A focused unit test                                   | Beside the code it verifies as `*.test.ts`  |
| Explanations, decisions, or workflows                 | `docs/`                                     |

For example, a weapon model belongs in `assets/weapons/`, its authored item definition in `content/items/`, and its behavior in `packages/gameplay/src/items/`. A Blender original belongs in `assets/source/blender/`. These examples describe file ownership, not established game content.

`packages/` contains seven reusable TypeScript workspaces. Each package's `src/` contains implementation code, and `src/index.ts` defines its public exports. Use workspace imports across package boundaries. See [workspace architecture](workspaces.md) for allowed dependency direction. Keep portable packages free of browser and rendering APIs.

## Applications: `apps/`

Runnable applications and their composition code.

| Directory                  | Purpose                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/game/`               | The active browser game workspace, built and served by Vite.                                                                                    |
| `apps/game/public/`        | Explicitly selected files served unchanged by Vite. Anything here is public and copied into the build; never put source assets or secrets here. |
| `apps/game/src/`           | Game application TypeScript and CSS; connects engine features to the browser experience.                                                        |
| `apps/game/src/bootstrap/` | Startup and shutdown orchestration. Currently creates the engine and scene, starts rendering, and registers cleanup.                            |
| `apps/game/src/config/`    | Reserved for application configuration such as graphics preferences and environment settings, not RPG balance definitions.                      |
| `apps/game/src/runtime/`   | Reserved for application session coordination and ownership of running systems.                                                                 |
| `apps/game/src/scenes/`    | Application-specific Babylon scene composition. Currently creates the ground, cube, camera, and lights.                                         |
| `apps/game/src/input/`     | Reserved for translating browser input into game actions and control bindings.                                                                  |
| `apps/game/src/ui/`        | Reserved for HUDs, menus, and other player-facing interface code. The current small overlay is in index.html.                                   |
| `apps/game/src/styles/`    | CSS for the canvas, shell, and future interface.                                                                                                |
| `apps/editor/`             | Documentation-only reservation for a future authoring application; not an active workspace.                                                     |
| `apps/server/`             | Documentation-only reservation for a future server application; no server or multiplayer implementation exists.                                 |

## Core infrastructure: `packages/core/`

Portable infrastructure and lifecycle contracts; no browser or Babylon dependencies.

| Directory                      | Purpose                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `packages/core/src/`           | Core TypeScript implementation and its public index.ts entry point.      |
| `packages/core/src/events/`    | Reserved for event contracts and event dispatch utilities when needed.   |
| `packages/core/src/lifecycle/` | Resource ownership and cleanup contracts; currently contains Disposable. |
| `packages/core/src/types/`     | Infrastructure-specific types used by core and its consumers.            |
| `packages/core/src/utils/`     | Small infrastructure helpers that do not belong to a game domain.        |

## Engine integration: `packages/engine/`

Reusable Babylon.js integration. Browser and GPU APIs belong here or in the application.

| Directory                        | Purpose                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `packages/engine/src/`           | Engine TypeScript implementation and public exports.                                                          |
| `packages/engine/src/rendering/` | Engine initialization and renderer selection, including WebGPU preference, WebGL fallback, and related tests. |
| `packages/engine/src/cameras/`   | Reserved for reusable Babylon camera setup and control adapters.                                              |
| `packages/engine/src/lighting/`  | Reserved for reusable light setup and lighting configuration.                                                 |
| `packages/engine/src/physics/`   | Reserved for integrating an existing physics solution through Babylon, not implementing a physics engine.     |
| `packages/engine/src/animation/` | Reserved for animation playback, blending, skeleton integration, and retargeting adapters.                    |
| `packages/engine/src/audio/`     | Reserved for playback, spatial audio, and audio resource integration.                                         |
| `packages/engine/src/materials/` | Reserved for reusable Babylon material creation and PBR integration.                                          |
| `packages/engine/src/shaders/`   | Reserved for shader integration code and rendering-specific shader modules.                                   |
| `packages/engine/src/resources/` | Reserved for engine resource loading, caching, GPU ownership, and disposal.                                   |

## Gameplay rules: `packages/gameplay/`

Portable game behavior composed from data. These domain folders are reserved; no RPG systems are implemented.

| Directory                            | Purpose                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------- |
| `packages/gameplay/src/`             | Gameplay TypeScript and future public exports.                                     |
| `packages/gameplay/src/characters/`  | Character composition, state, and behavior shared by players, NPCs, and creatures. |
| `packages/gameplay/src/attributes/`  | Attribute calculations and modifiers; authored values belong in content.           |
| `packages/gameplay/src/progression/` | Skill and progression rules once specified.                                        |
| `packages/gameplay/src/abilities/`   | Ability activation, requirements, and effects.                                     |
| `packages/gameplay/src/combat/`      | Combat resolution and coordination.                                                |
| `packages/gameplay/src/magic/`       | Magic-specific behavior once its rules are established.                            |
| `packages/gameplay/src/inventory/`   | Item storage, quantities, and transfer rules.                                      |
| `packages/gameplay/src/equipment/`   | Equipping items and applying equipment effects.                                    |
| `packages/gameplay/src/items/`       | Runtime item behavior and item instances.                                          |
| `packages/gameplay/src/crafting/`    | Crafting requirements and transformation rules.                                    |
| `packages/gameplay/src/quests/`      | Quest state and objective evaluation.                                              |
| `packages/gameplay/src/dialogue/`    | Dialogue state, branching, and condition evaluation.                               |
| `packages/gameplay/src/factions/`    | Faction membership and relationship rules.                                         |
| `packages/gameplay/src/reputation/`  | Reputation state and updates.                                                      |
| `packages/gameplay/src/ai/`          | NPC decision logic and behavior composition.                                       |
| `packages/gameplay/src/spawning/`    | Rules for deciding when and what game entities should spawn.                       |

## World systems: `packages/world/`

Portable simulation and world policies. All domain folders are reserved.

| Directory                           | Purpose                                                                                                  |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `packages/world/src/`               | World TypeScript and future public exports.                                                              |
| `packages/world/src/terrain/`       | Terrain representations and terrain-related world logic.                                                 |
| `packages/world/src/biomes/`        | Biome selection, classification, and environmental rules.                                                |
| `packages/world/src/vegetation/`    | Vegetation distribution and placement policies.                                                          |
| `packages/world/src/weather/`       | Changing weather state and simulation.                                                                   |
| `packages/world/src/climate/`       | Longer-term environmental patterns that influence weather and biomes.                                    |
| `packages/world/src/time/`          | World clock and time progression.                                                                        |
| `packages/world/src/settlements/`   | Settlement state and layout policies.                                                                    |
| `packages/world/src/civilizations/` | World-scale civilization state and relationships.                                                        |
| `packages/world/src/structures/`    | World structure placement and representation.                                                            |
| `packages/world/src/navigation/`    | Navigation data and route-planning integration.                                                          |
| `packages/world/src/streaming/`     | Policies for activating and retiring world regions; engine resources remain owned by engine integration. |
| `packages/world/src/generation/`    | Procedural world generation and deterministic generation inputs.                                         |

## Content infrastructure: `packages/data/`

Code for reading and enforcing authored data contracts. All subfolders are reserved.

| Directory                          | Purpose                                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `packages/data/src/`               | Data TypeScript and future public exports.                                                         |
| `packages/data/src/schemas/`       | Machine-readable structure and constraints for authored content.                                   |
| `packages/data/src/definitions/`   | TypeScript contracts representing content definitions; actual authored records belong in content/. |
| `packages/data/src/registries/`    | Indexes for finding definitions by stable identifiers.                                             |
| `packages/data/src/validation/`    | Validation logic and useful authoring diagnostics.                                                 |
| `packages/data/src/serialization/` | Encoding and decoding supported data formats and versions.                                         |

## Networking: `packages/networking/`

Portable networking boundaries for future multiplayer. No network service currently exists.

| Directory                              | Purpose                                                           |
| -------------------------------------- | ----------------------------------------------------------------- |
| `packages/networking/src/`             | Networking TypeScript and future public exports.                  |
| `packages/networking/src/protocol/`    | Message shapes, identifiers, and protocol contracts.              |
| `packages/networking/src/replication/` | Rules for synchronizing state between peers or client and server. |
| `packages/networking/src/transport/`   | Transport interfaces and implementations when required.           |

## Shared primitives: `packages/shared/`

Small portable primitives with no dependencies on higher-level packages. All subfolders are reserved.

| Directory                        | Purpose                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `packages/shared/src/`           | Shared TypeScript and future public exports.                                            |
| `packages/shared/src/constants/` | Stable cross-domain constants, not RPG balancing tables.                                |
| `packages/shared/src/math/`      | Portable math helpers used by concrete consumers.                                       |
| `packages/shared/src/types/`     | Cross-domain foundational types; keep feature-specific types with their owning package. |

## Media assets: `assets/`

Media organized by purpose. These directories are currently empty. Binary formats covered by .gitattributes use Git LFS.

| Directory                  | Purpose                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/characters/`       | Runtime-ready character models and related media.                                                                                              |
| `assets/creatures/`        | Runtime-ready creature models and related media.                                                                                               |
| `assets/animations/`       | Exported motion clips and animation assets.                                                                                                    |
| `assets/environments/`     | Environmental set pieces and scene media spanning several asset types.                                                                         |
| `assets/terrain/`          | Terrain geometry and associated runtime media.                                                                                                 |
| `assets/vegetation/`       | Trees, plants, and related vegetation media.                                                                                                   |
| `assets/buildings/`        | Building models and modular architectural pieces.                                                                                              |
| `assets/weapons/`          | Weapon models and related media.                                                                                                               |
| `assets/armor/`            | Armor models and related media.                                                                                                                |
| `assets/items/`            | Other item models and associated media.                                                                                                        |
| `assets/materials/`        | Reusable material assets and material authoring outputs.                                                                                       |
| `assets/textures/`         | Texture images and compressed runtime textures.                                                                                                |
| `assets/shaders/`          | Authored shader source assets; plain-text shaders stay in normal Git. Engine-specific integration code belongs in packages/engine/src/shaders. |
| `assets/vfx/`              | Visual effect media such as particle textures and effect meshes.                                                                               |
| `assets/audio/`            | Audio assets grouped by use.                                                                                                                   |
| `assets/audio/music/`      | Music tracks.                                                                                                                                  |
| `assets/audio/ambient/`    | Environmental ambience and sound beds.                                                                                                         |
| `assets/audio/sfx/`        | Discrete sound effects.                                                                                                                        |
| `assets/audio/voices/`     | Recorded voice and dialogue audio.                                                                                                             |
| `assets/cinematics/`       | Video and cinematic media.                                                                                                                     |
| `assets/ui/`               | Interface images, icons, and other visual interface media.                                                                                     |
| `assets/source/`           | Editable originals and reference materials, kept separate from runtime exports.                                                                |
| `assets/source/blender/`   | Original Blender project files.                                                                                                                |
| `assets/source/substance/` | Original Substance authoring projects and related source materials.                                                                            |
| `assets/source/reference/` | Reference material used during authoring; do not ship automatically.                                                                           |

## Authored gameplay content: `content/`

Structured authored definitions, usually JSON. These folders are empty and do not establish lore or mechanics.

| Directory                | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `content/characters/`    | Character definitions.                                    |
| `content/creatures/`     | Creature definitions.                                     |
| `content/items/`         | Item definitions and authored parameters.                 |
| `content/abilities/`     | Ability definitions and authored parameters.              |
| `content/quests/`        | Quest definitions and objectives.                         |
| `content/dialogue/`      | Dialogue trees, lines, and conditions.                    |
| `content/factions/`      | Faction definitions.                                      |
| `content/civilizations/` | Civilization definitions.                                 |
| `content/biomes/`        | Biome definitions and authored environment parameters.    |
| `content/settlements/`   | Settlement definitions.                                   |
| `content/world/`         | World configuration and other authored world definitions. |

## Development tooling: `tools/`

Programs run by developers or automation, rather than by players.

| Directory                   | Purpose                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `tools/asset-pipeline/`     | Reserved for export, conversion, compression, and asset-manifest tools. No pipeline is implemented yet. |
| `tools/content-validation/` | Reserved for command-line content checks built on packages/data.                                        |
| `tools/scripts/`            | Repository maintenance scripts; currently contains the scoped clean command.                            |

## Tests: `tests/`

Tests spanning application or package boundaries; focused unit tests live alongside their implementation.

| Directory            | Purpose                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `tests/integration/` | Integration checks; currently constructs and renders the starter scene with Babylon NullEngine. |
| `tests/fixtures/`    | Reserved for small, controlled test inputs. Avoid copying production asset libraries here.      |

## Documentation: `docs/`

Human-readable project knowledge.

| Directory            | Purpose                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `docs/architecture/` | Package responsibilities, dependency direction, and this folder guide.             |
| `docs/development/`  | Setup and verification instructions, tooling notes, and the initialization report. |
| `docs/gameplay/`     | Reserved for approved gameplay designs and rules.                                  |
| `docs/world/`        | Reserved for approved world design and simulation documentation.                   |
| `docs/assets/`       | Asset authoring, export, import, and versioning workflow documentation.            |

## Repository automation: `.github/`

GitHub-specific repository automation.

| Directory            | Purpose                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/` | GitHub Actions definitions. ci.yml checks types, lint, formatting, tests, and build; no deployment is configured. |

## Generated and environment-managed folders

| Directory                                     | Purpose                                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node_modules/` and workspace `node_modules/` | Dependencies and pnpm workspace links. Generated by installation, ignored by Git, and never edited manually.                                                                                                     |
| `apps/game/dist/`                             | Production game output generated by `pnpm build`; ignored by Git.                                                                                                                                                |
| `coverage/`, `.vite/`, and nested Vite caches | Generated test coverage or development caches when the corresponding tooling creates them; ignored by Git.                                                                                                       |
| `.git/`                                       | Git history, configuration, and hooks, including local LFS setup. Managed by Git.                                                                                                                                |
| `.agents/`, `.codex/`, `.aws/`                | Environment-provided directories present in this workspace. They were not created as game modules; their contents and purpose are environment-specific. Do not place game code, media, or authored content here. |

The root also contains configuration files shared across workspaces: `package.json` defines commands, `pnpm-workspace.yaml` selects workspaces, and `pnpm-lock.yaml` records dependency resolution. TypeScript, ESLint, Prettier, Vitest, Git ignore rules, and LFS attributes are configured here so developers can work from the repository root.

For asset handling, read the [asset workflow](../assets/workflow.md). Only explicitly selected runtime assets should enter `apps/game/public/` or the Vite import graph. Source artwork and the entire `assets/` tree must not be copied into the game automatically.
