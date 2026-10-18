import { expect, it } from 'vitest';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine';
import { createStartScene } from '../../apps/game/src/scenes/create-start-scene';
it('creates and renders the initial scene with Babylon resources', () => {
  const engine = new NullEngine();
  try {
    const scene = createStartScene(engine);
    expect(scene.activeCamera).toBeTruthy();
    expect(scene.lights).toHaveLength(2);
    expect(scene.getMeshByName('ground')).toBeTruthy();
    expect(scene.getMeshByName('placeholder')?.position.y).toBe(1);
    scene.render();
    scene.dispose();
    expect(scene.isDisposed).toBe(true);
  } finally {
    engine.dispose();
  }
});
