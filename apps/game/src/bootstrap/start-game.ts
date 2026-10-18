import { createEngine } from '@tainted-kingdoms/engine';
import { createStartScene } from '../scenes/create-start-scene';
export async function startGame(
  canvas: HTMLCanvasElement,
  fps: HTMLElement,
): Promise<() => void> {
  const engine = await createEngine(canvas);
  try {
    const scene = createStartScene(engine);
    scene.activeCamera?.attachControl(canvas, true);
    let lastUpdate = 0;
    engine.runRenderLoop(() => {
      scene.render();
      if (import.meta.env.DEV && performance.now() - lastUpdate > 500) {
        fps.textContent = `${Math.round(engine.getFps())} FPS`;
        lastUpdate = performance.now();
      }
    });
    const resize = () => engine.resize();
    window.addEventListener('resize', resize);
    let disposed = false;
    return () => {
      if (disposed) return;
      disposed = true;
      window.removeEventListener('resize', resize);
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    };
  } catch (error) {
    engine.dispose();
    throw error;
  }
}
