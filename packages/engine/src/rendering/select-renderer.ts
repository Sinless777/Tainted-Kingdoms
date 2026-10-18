import type { Disposable } from '@tainted-kingdoms/core';
export interface RendererFactories<T extends Disposable> {
  supportsWebGPU(): Promise<boolean>;
  createWebGPU(): T;
  initializeWebGPU(engine: T): Promise<void>;
  createWebGL(): T;
}
export async function selectRenderer<T extends Disposable>(
  factories: RendererFactories<T>,
): Promise<T> {
  let candidate: T | undefined;
  try {
    if (await factories.supportsWebGPU()) {
      candidate = factories.createWebGPU();
      await factories.initializeWebGPU(candidate);
      return candidate;
    }
  } catch (error) {
    candidate?.dispose();
    console.warn('WebGPU initialization failed; falling back to WebGL.', error);
  }
  return factories.createWebGL();
}
