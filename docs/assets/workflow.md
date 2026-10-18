# Asset and content workflow

## Source, runtime, and content

- Source assets are editable originals in `assets/source/blender`, `assets/source/substance`, and `assets/source/reference`.
- Runtime assets are reviewed exports in category folders such as `assets/characters`, `assets/textures`, and `assets/audio`. GLB/glTF 2.0 is the preferred model format.
- Gameplay content is authored structured data in `content/`. Prefer JSON where suitable. Future validation, registries, and serialization belong in `packages/data`; balancing data must not be embedded in renderer classes.

## Blender to Babylon.js

1. Preserve the original `.blend` separately from exports. Use consistent meter-based scale, deliberate origins, clear names, and applied transforms where appropriate for the rig.
2. Check normals, UVs, topology, material assignments, and animation ranges. Use glTF-compatible metallic/roughness PBR materials. Bake procedural shader features into textures when needed.
3. Export selected runtime objects as GLB/glTF 2.0. Include only needed meshes, materials, skeletons, and animation clips. Review exported orientation and scale in Babylon.js.
4. Validate the exported model and inspect PBR textures, animation clips, skeletons, and bounds in a dedicated preview before integrating.
5. Keep reviewed exports in the relevant runtime asset category. Explicitly import only required assets through Vite URLs, or stage selected files into `apps/game/public` with documented names. No bulk repository asset copying is configured.
6. Before the first binary commit, commit `.gitattributes`. Confirm LFS tracking with `git check-attr filter -- path/to/asset.glb` and inspect `git lfs ls-files` after staging.

KTX2 texture compression, LOD generation, retargeting, resource caches, asset manifests, and streaming are future pipeline work. Measure quality, memory use, compatibility, and load time before choosing those implementations. Source assets must never be served accidentally by the game. Do not author new lore or balance definitions during repository initialization.
