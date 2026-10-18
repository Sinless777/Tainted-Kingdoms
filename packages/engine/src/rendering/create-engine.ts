import { AbstractEngine } from '@babylonjs/core/Engines/abstractEngine';
import { Engine } from '@babylonjs/core/Engines/engine';
import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine';
import { selectRenderer } from './select-renderer';
export function createEngine(
  canvas: HTMLCanvasElement,
): Promise<AbstractEngine> {
  return selectRenderer<AbstractEngine>({
    supportsWebGPU: () => WebGPUEngine.IsSupportedAsync,
    createWebGPU: () => new WebGPUEngine(canvas, { antialias: true }),
    initializeWebGPU: async (engine) => {
      if (engine instanceof WebGPUEngine) await engine.initAsync();
    },
    createWebGL: () => new Engine(canvas, true),
  });
}
