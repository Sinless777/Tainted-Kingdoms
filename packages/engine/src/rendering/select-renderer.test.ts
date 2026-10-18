import { expect, it, vi } from 'vitest';
import { selectRenderer } from './select-renderer';
const setup = () => {
  const gpu = { dispose: vi.fn() };
  const gl = { dispose: vi.fn() };
  const factories = {
    supportsWebGPU: vi.fn(async () => true),
    createWebGPU: vi.fn(() => gpu),
    initializeWebGPU: vi.fn(async () => {}),
    createWebGL: vi.fn(() => gl),
  };
  return { gpu, gl, factories };
};
it('prefers initialized WebGPU', async () => {
  const { gpu, factories } = setup();
  expect(await selectRenderer(factories)).toBe(gpu);
  expect(factories.initializeWebGPU).toHaveBeenCalledWith(gpu);
  expect(factories.createWebGL).not.toHaveBeenCalled();
});
it('uses WebGL when WebGPU is unsupported', async () => {
  const { gl, factories } = setup();
  factories.supportsWebGPU.mockResolvedValue(false);
  expect(await selectRenderer(factories)).toBe(gl);
  expect(factories.createWebGPU).not.toHaveBeenCalled();
});
it('disposes a failed WebGPU engine before falling back', async () => {
  const { gpu, gl, factories } = setup();
  factories.initializeWebGPU.mockRejectedValue(new Error('GPU unavailable'));
  const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    expect(await selectRenderer(factories)).toBe(gl);
    expect(gpu.dispose).toHaveBeenCalledOnce();
  } finally {
    warning.mockRestore();
  }
});
it('propagates a WebGL failure to the application', async () => {
  const { factories } = setup();
  factories.supportsWebGPU.mockResolvedValue(false);
  factories.createWebGL.mockImplementation(() => {
    throw new Error('No renderer');
  });
  await expect(selectRenderer(factories)).rejects.toThrow('No renderer');
});
