import * as THREE from 'three';
import { buildDrawing, makeRenderer, frame, preload, type Drawing } from './drawing';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

type Item = { model: string; title: string; href: string; num: string; discipline: string };

export async function mountShowcase(host: HTMLElement) {
  const items: Item[] = JSON.parse(host.dataset.items || '[]');
  if (!items.length) return;
  const stage = host.querySelector<HTMLElement>('.sc-stage')!;
  const fit = host.querySelector<HTMLAnchorElement>('.sc-fit')!;
  const cap = host.querySelector<HTMLAnchorElement>('.sc-cap')!;
  const capNum = cap.querySelector<HTMLElement>('.sc-num')!;
  const capTitle = cap.querySelector<HTMLElement>('.sc-title')!;
  const capDisc = cap.querySelector<HTMLElement>('.sc-disc')!;
  const dots = host.querySelector<HTMLElement>('.sc-dots')!;

  const ctx = makeRenderer(stage);
  if (!ctx) { host.classList.add('no-3d'); return; }
  const { renderer, scene, cam } = ctx;
  const canvas = renderer.domElement;
  canvas.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1)';

  dots.innerHTML = items.map((_, i) => `<button aria-label="Show ${items[i].title}" data-i="${i}"><i></i></button>`).join('');
  const dotEls = [...dots.querySelectorAll<HTMLButtonElement>('button')];
  const fills = dotEls.map(b => b.querySelector<HTMLElement>('i')!);

  let idx = 0, d: Drawing | null = null, shownAt = performance.now(), switching = false;
  const PERIOD = 6500;

  async function show(i: number) {
    if (switching) return;
    switching = true;
    idx = (i + items.length) % items.length;
    const it = items[idx];
    canvas.style.opacity = '0';
    cap.classList.add('out');
    await new Promise(r => setTimeout(r, 450));
    let next: Drawing;
    try { next = await buildDrawing(it.model); }
    catch { switching = false; return; }
    if (d) { scene.remove(d.root); d.dispose(); }
    d = next;
    d.dimGroup.visible = false;
    scene.add(d.root);
    cap.href = it.href;
    fit.href = it.href;
    fit.setAttribute('aria-label', `Open ${it.title}`);
    capNum.textContent = it.num;
    capTitle.textContent = it.title;
    capDisc.textContent = it.discipline;
    dotEls.forEach((b, k) => b.classList.toggle('on', k === idx));
    shownAt = performance.now();
    preload(items[(idx + 1) % items.length].model);
    requestAnimationFrame(() => { canvas.style.opacity = '1'; cap.classList.remove('out'); });
    switching = false;
  }

  dotEls.forEach(b => b.addEventListener('click', () => show(+b.dataset.i!)));

  let W = 1, H = 1;
  const resize = () => { W = stage.clientWidth; H = stage.clientHeight; renderer.setSize(W, H, false); };
  new ResizeObserver(resize).observe(stage);
  resize();

  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) requestAnimationFrame(loop); }).observe(host);
  fit.addEventListener('pointerenter', () => host.classList.add('sc-hot'));
  fit.addEventListener('pointerleave', () => host.classList.remove('sc-hot'));

  let az = 0.75;
  let last = performance.now();
  function loop(now: number) {
    if (!visible) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (d) {
      const t = (now - shownAt) / PERIOD;
      const e = RM ? 0 : 0.5 - 0.5 * Math.cos(Math.min(1, t) * Math.PI * 2);
      d.setExplode(e * 0.85);
      fills.forEach((f, k) => { f.style.transform = `scaleX(${k === idx ? Math.min(1, t) : 0})`; });
      if (!RM) az += dt * 0.12;
      const fr = fit.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      const box = d.bounds(0.85).union(d.bounds(0));
      frame(cam, box, 0.75 + Math.sin(az) * 0.45, 0.6, W, H, { x: fr.left - sr.left, y: fr.top - sr.top, w: fr.width, h: fr.height }, 1.04);
      d.root.updateMatrixWorld(true);
      renderer.render(scene, cam);
      if (t >= 1 && !switching) show(idx + 1);
    }
    requestAnimationFrame(loop);
  }
  await show(0);
  requestAnimationFrame(loop);
}
