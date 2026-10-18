import { startGame } from './bootstrap/start-game';
import './styles/main.css';
const canvas = document.querySelector<HTMLCanvasElement>('#game');
const status = document.querySelector<HTMLElement>('#status');
const fps = document.querySelector<HTMLElement>('#fps');
if (!canvas || !status || !fps)
  throw new Error('Game shell elements are missing.');
fps.hidden = !import.meta.env.DEV;
let shutdown: (() => void) | undefined;
let closed = false;
const close = () => {
  closed = true;
  shutdown?.();
};
window.addEventListener('pagehide', close);
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    close();
    window.removeEventListener('pagehide', close);
    window.removeEventListener('pageshow', restore);
  });
void startGame(canvas, fps)
  .then((dispose) => {
    if (closed) dispose();
    else shutdown = dispose;
    status.textContent = 'Drag to orbit · Scroll to zoom';
  })
  .catch((error: unknown) => {
    console.error(error);
    status.textContent =
      'Unable to initialize 3D graphics. Check browser GPU support and reload.';
  });
function restore(event: PageTransitionEvent): void {
  if (event.persisted) window.location.reload();
}
window.addEventListener('pageshow', restore);
