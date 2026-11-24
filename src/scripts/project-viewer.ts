import * as THREE from 'three';
import { buildDrawing, makeRenderer, frame, smooth, easeInOut, type PartDef } from './drawing';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export async function mountProjectViewer(section: HTMLElement) {
  const stage = section.querySelector<HTMLElement>('.pv-stage')!;
  const fit = section.querySelector<HTMLElement>('.pv-fit')!;
  const intro = section.querySelector<HTMLElement>('.pv-intro');
  const plist = section.querySelector<HTMLElement>('.pv-plist');
  const meter = section.querySelector<HTMLElement>('.pv-meter i');
  const pct = section.querySelector<HTMLElement>('.pv-pct');
  const cue = section.querySelector<HTMLElement>('.pv-cue');
  const svg = stage.querySelector<SVGSVGElement>('svg')!;
  const tags = stage.querySelector<HTMLElement>('.pv-tags')!;
  const card = section.querySelector<HTMLElement>('.pv-insp');
  const defs: PartDef[] = JSON.parse(section.dataset.parts || '[]');

  let progress = 0;
  const ui = () => {
    const r = section.getBoundingClientRect();
    progress = clamp(-r.top / Math.max(1, r.height - innerHeight));
    const a = smooth(0.12, 0.34, progress), b = smooth(0.36, 0.58, progress);
    if (intro) { intro.style.opacity = String(1 - a); intro.style.transform = `translateY(${-a * 40}px)`; intro.style.pointerEvents = a > 0.5 ? 'none' : ''; }
    if (plist) { plist.style.opacity = String(b); plist.style.transform = `translateY(${(1 - b) * 30}px)`; plist.classList.toggle('on', b > 0.5); }
    if (meter) meter.style.transform = `scaleX(${progress})`;
    if (pct) pct.textContent = String(Math.round(progress * 100)).padStart(3, '0') + '%';
    if (cue) cue.textContent = progress > 0.98 ? 'Disassembled — continue' : 'Scroll to disassemble';
  };
  addEventListener('scroll', ui, { passive: true });
  addEventListener('resize', ui);
  ui();

  const ctx = makeRenderer(stage);
  if (!ctx) { section.classList.add('no-3d'); return; }
  const { renderer, scene, cam } = ctx;
  let d;
  try { d = await buildDrawing(section.dataset.model!); }
  catch { section.classList.add('no-3d'); renderer.domElement.remove(); return; }
  scene.add(d.root);
  section.classList.add('ready-3d');

  const listed = defs.map((p, i) => ({ ...p, item: i + 1, re: new RegExp(p.match), qty: d.parts.filter(q => new RegExp(p.match).test(q.name)).length })).filter(p => p.qty > 0);
  const tbody = section.querySelector('.parts tbody');
  if (tbody) tbody.innerHTML = listed.map((p, i) => `<tr data-i="${i}"><td>${p.item}</td><td>${p.name}</td><td>${p.desc}</td><td>${p.qty}</td></tr>`).join('');
  const legend = section.querySelector('.pv-legend');
  if (legend) legend.innerHTML = listed.filter(p => p.callout !== false).map(p => `<span data-i="${listed.indexOf(p)}"><b>${p.item}</b>${p.name}</span>`).join(' ');

  const NS = 'http://www.w3.org/2000/svg';
  const callouts = listed.filter(p => p.callout !== false).map(p => {
    const part = d.parts.find(q => p.re.test(q.name))!;
    const el = document.createElement('button'); el.type = 'button'; el.className = 'balloon'; el.textContent = String(p.item); el.title = `Inspect ${p.name}`; el.setAttribute('aria-label', `Inspect item ${p.item}, ${p.name}`);
    tags.appendChild(el);
    const line = document.createElementNS(NS, 'path'); line.setAttribute('class', 'leader');
    const dot = document.createElementNS(NS, 'circle'); dot.setAttribute('r', '2.2'); dot.setAttribute('class', 'leader-dot');
    svg.append(line, dot);
    return { p, part, el, line, dot, sx: 0, sy: 0, bx: 0, by: 0, i: listed.indexOf(p) };
  });
  const dimEls = d.dims.map(x => { const el = document.createElement('div'); el.className = 'dim-label'; el.textContent = x.text; tags.appendChild(el); return { el, at: x.at }; });

  let dirty = true;
  const highlight = (i: number, on: boolean) => {
    d.highlight(on ? listed[i].re : null);
    callouts.forEach(c => c.el.classList.toggle('hl', on && c.i === i));
    tbody?.querySelectorAll('tr').forEach(r => r.classList.toggle('hl', on && +r.getAttribute('data-i')! === i));
    dirty = true;
  };
  tbody?.querySelectorAll('tr').forEach(r => {
    r.addEventListener('pointerenter', () => highlight(+r.getAttribute('data-i')!, true));
    r.addEventListener('pointerleave', () => highlight(+r.getAttribute('data-i')!, false));
  });
  callouts.forEach(c => {
    c.el.addEventListener('pointerenter', () => highlight(c.i, true));
    c.el.addEventListener('pointerleave', () => highlight(c.i, false));
    c.el.addEventListener('pointerdown', e => e.stopPropagation());
    c.el.addEventListener('click', () => inspect(c.i));
  });

  let focusIdx = -1, fk = 0, fTarget = 0;
  const fBox = new THREE.Box3(), pBox = new THREE.Box3(), tBox = new THREE.Box3();
  const fill = (i: number) => {
    if (!card) return;
    const p = listed[i];
    card.querySelector('.pi-item')!.textContent = `Item ${String(p.item).padStart(2, '0')} of ${String(listed.length).padStart(2, '0')}`;
    card.querySelector('.pi-name')!.textContent = p.name;
    card.querySelector('.pi-desc')!.textContent = p.desc;
    card.querySelector('.pi-qty')!.textContent = `Qty ${p.qty}`;
  };
  const markRows = () => {
    tbody?.querySelectorAll('tr').forEach(r => r.classList.toggle('sel', +r.getAttribute('data-i')! === focusIdx));
    legend?.querySelectorAll('span').forEach(r => r.classList.toggle('sel', +r.getAttribute('data-i')! === focusIdx));
  };
  function inspect(i: number) {
    focusIdx = (i + listed.length) % listed.length;
    fTarget = 1;
    d.focus(listed[focusIdx].re);
    fill(focusIdx);
    card?.classList.add('on');
    section.classList.add('inspecting');
    markRows();
    dirty = true;
  }
  function closeInspect() {
    if (focusIdx < 0) return;
    fTarget = 0;
    card?.classList.remove('on');
    section.classList.remove('inspecting');
    focusIdx = -1;
    markRows();
  }
  tbody?.querySelectorAll('tr').forEach(r => r.addEventListener('click', () => inspect(+r.getAttribute('data-i')!)));
  legend?.querySelectorAll('span').forEach(r => r.addEventListener('click', () => inspect(+r.getAttribute('data-i')!)));
  card?.querySelector('.pi-prev')?.addEventListener('click', () => inspect(focusIdx - 1));
  card?.querySelector('.pi-next')?.addEventListener('click', () => inspect(focusIdx + 1));
  card?.querySelector('.pi-close')?.addEventListener('click', closeInspect);
  addEventListener('keydown', e => {
    if (focusIdx < 0) return;
    if (e.key === 'Escape') closeInspect();
    else if (e.key === 'ArrowRight') inspect(focusIdx + 1);
    else if (e.key === 'ArrowLeft') inspect(focusIdx - 1);
  });

  let W = 1, H = 1, mobile = false;
  const resize = () => { W = stage.clientWidth; H = stage.clientHeight; mobile = W <= 980; renderer.setSize(W, H, false); dirty = true; };
  new ResizeObserver(resize).observe(stage);
  resize();

  let dragAz = 0, dragEl = 0, dragging = false, lx = 0, ly = 0;
  let downX = 0, downY = 0;
  stage.addEventListener('pointerdown', e => { downX = e.clientX; downY = e.clientY; if (e.pointerType !== 'mouse') return; dragging = true; lx = e.clientX; ly = e.clientY; stage.classList.add('drag'); stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', e => { if (!dragging) return; dragAz -= (e.clientX - lx) * 0.006; dragEl = clamp(dragEl + (e.clientY - ly) * 0.004, -0.5, 0.7); lx = e.clientX; ly = e.clientY; });
  const end = () => { dragging = false; stage.classList.remove('drag'); };
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  stage.addEventListener('pointerup', e => {
    end();
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 5 || progress < 0.3) return;
    const r = stage.getBoundingClientRect();
    ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, cam);
    const hit = ray.intersectObjects(d.parts.filter(p => p.mesh.visible).map(p => p.mesh), false)[0];
    const part = hit && d.parts.find(p => p.mesh === hit.object);
    const i = part ? listed.findIndex(l => l.re.test(part.name)) : -1;
    if (i >= 0 && i !== focusIdx) inspect(i);
    else if (!part && focusIdx >= 0) closeInspect();
  }); stage.addEventListener('pointercancel', end);

  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) requestAnimationFrame(loop); }).observe(section);

  const v = new THREE.Vector3(), c3 = new THREE.Vector3();
  const project = (p: THREE.Vector3) => { v.copy(p).project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; };
  const t0 = performance.now();

  function loop(now: number) {
    if (!visible) return;
    const t = (now - t0) / 1000;
    if (focusIdx >= 0 && progress < 0.28) closeInspect();
    fk += (fTarget - fk) * (RM ? 1 : 0.1);
    if (Math.abs(fTarget - fk) < 0.002) fk = fTarget;
    if (fk === 0 && fTarget === 0) d.focus(null);
    if (fk > 0.5 && !dragging && !RM && focusIdx >= 0) dragAz += 0.0025;
    const e = easeInOut(smooth(0.08, 0.82, progress));
    d.setExplode(e);
    const fade = 1 - smooth(0.05, 0.25, progress);
    d.dimMat.opacity = 0.6 * fade;
    const az = 0.72 + (RM ? 0 : Math.sin(t * 0.22) * 0.08) + dragAz - e * 0.38;
    const el = 0.62 - e * 0.2 + dragEl;
    const fr = fit.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    const box = d.bounds(e).union(d.bounds(0));
    if (fade > 0.01) box.expandByObject(d.dimGroup);
    let zoom = 1;
    if (fk > 0) {
      if (focusIdx >= 0) {
        pBox.makeEmpty();
        d.parts.forEach(p => { if (listed[focusIdx].re.test(p.name)) { tBox.copy(p.box).translate(p.grp.position); pBox.union(tBox); } });
        if (!fBox.isEmpty()) { fBox.min.lerp(pBox.min, 0.18); fBox.max.lerp(pBox.max, 0.18); } else fBox.copy(pBox);
      }
      const s0 = box.getSize(c3).length();
      box.min.lerp(fBox.min, fk); box.max.lerp(fBox.max, fk);
      zoom = Math.max(1, s0 / Math.max(1e-6, box.getSize(c3).length()));
    } else fBox.makeEmpty();
    d.setFocus(fk, zoom);
    frame(cam, box, az, el, W, H, { x: fr.left - sr.left, y: fr.top - sr.top, w: fr.width, h: fr.height }, 1.08 + 0.2 * fk);
    d.root.updateMatrixWorld(true);
    renderer.render(scene, cam);

    const show = smooth(0.3, 0.55, progress) * (1 - fk);
    const center = box.getCenter(new THREE.Vector3());
    const [cx, cy] = project(center);
    const R = mobile ? 46 : 80;
    callouts.forEach(c => {
      const b = c.part.box;
      c3.set((b.min.x + b.max.x) / 2, b.max.y, (b.min.z + b.max.z) / 2).add(c.part.grp.position);
      [c.sx, c.sy] = project(c3);
      const dx = c.sx - cx, dy = c.sy - cy - 30, m = Math.hypot(dx, dy) || 1;
      c.bx = c.sx + dx / m * R; c.by = c.sy + dy / m * R - 16;
    });
    const md = mobile ? 31 : 36;
    for (let k = 0; k < 10; k++) for (let i = 0; i < callouts.length; i++) for (let j = i + 1; j < callouts.length; j++) {
      const a = callouts[i], b = callouts[j];
      let dx = b.bx - a.bx, dy = b.by - a.by, dd = Math.hypot(dx, dy);
      if (dd < md) { if (dd < 0.01) { dx = 1; dy = 0; dd = 1; } const push = (md - dd) / 2; a.bx -= dx / dd * push; a.by -= dy / dd * push; b.bx += dx / dd * push; b.by += dy / dd * push; }
    }
    callouts.forEach(c => {
      c.bx = clamp(c.bx, 16, W - 16); c.by = clamp(c.by, 16, H - 16);
      c.el.style.transform = `translate(${c.bx.toFixed(1)}px,${c.by.toFixed(1)}px)`;
      c.el.style.opacity = String(show);
      c.el.style.pointerEvents = show > 0.5 ? 'auto' : 'none';
      const ang = Math.atan2(c.by - c.sy, c.bx - c.sx);
      c.line.setAttribute('d', `M${c.sx.toFixed(1)} ${c.sy.toFixed(1)} L${(c.bx - Math.cos(ang) * 14).toFixed(1)} ${(c.by - Math.sin(ang) * 14).toFixed(1)}`);
      c.line.setAttribute('opacity', String(show));
      c.dot.setAttribute('cx', c.sx.toFixed(1)); c.dot.setAttribute('cy', c.sy.toFixed(1)); c.dot.setAttribute('opacity', String(show));
    });
    dimEls.forEach(x => {
      const p = x.at.clone().add(d.root.position);
      const [px, py] = project(p);
      x.el.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px) translate(-50%,-50%)`;
      x.el.style.opacity = String(fade * (1 - fk));
    });
    dirty = false;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
