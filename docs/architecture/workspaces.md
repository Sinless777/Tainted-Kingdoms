# Workspace architecture

See the [folder guide](folder-guide.md) for the responsibility of each application, package subfolder, asset category, and content directory.

Tainted Kingdoms uses composition and authored data. Babylon.js owns scenes, cameras, lighting, meshes, materials, animations, and GPU resources. Do not add a custom renderer, physics engine, or ECS framework.

| Workspace  | Responsibility                                         | Allowed dependency direction |
| ---------- | ------------------------------------------------------ | ---------------------------- |
| shared     | Portable math, constants, and shared types             | None                         |
| core       | Portable events, lifecycle contracts, utilities        | shared                       |
| data       | Content schemas, validation, registries, serialization | core, shared                 |
| gameplay   | Composed game rules and character systems              | data, core, shared           |
| world      | Generation, time, environments, and streaming policies | data, core, shared           |
| networking | Protocols, transport contracts, replication            | core, shared                 |
| engine     | Babylon rendering and future engine adapters           | core, shared, Babylon.js     |
| game       | Browser bootstrap, scene composition, input, UI        | All required workspaces      |

This table defines intended boundaries, not installed speculative dependencies. Only engine-to-core and game-to-engine dependencies currently exist, alongside explicit Babylon dependencies. Reserved packages export empty modules until real functionality is needed. Editor and server have no dependencies or runtime yet.

Use workspace imports for package boundaries; never import another package's source through relative paths. Tests may import application sources for integration verification. Keep portable packages free of DOM libraries. Application code composes systems; gameplay, world, data, and networking must not depend on the game or rendering implementation. Avoid cycles between domain packages; shared contracts belong in core or shared only when concrete consumers require them.

The game selects an engine asynchronously, creates its scene, attaches controls, starts rendering, and registers resize handling. Shutdown removes listeners, stops rendering, and disposes scene and engine. Failed WebGPU initialization disposes the partial engine before WebGL fallback. Startup errors appear in the shell. Page restoration reloads after resource disposal; Vite hot replacement also disposes resources.

Future Windows/Linux desktop shells should host the browser app, keeping platform integration outside portable packages. No shell, server, multiplayer, physics plugin, or speculative services are included.
