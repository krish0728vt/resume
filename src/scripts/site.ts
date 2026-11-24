import Lenis from 'lenis';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

const zones = $('.zones');
if (zones) {
  let h = '';
  for (let i = 1; i <= 8; i++) {
    const x = ((i - 0.5) / 8 * 100).toFixed(2);
    h += `<span style="top:9px;left:${x}%">${i}</span><span style="bottom:9px;left:${x}%">${i}</span>`;
  }
  'ABCDEF'.split('').forEach((c, i) => {
    const y = ((i + 0.5) / 6 * 100).toFixed(2);
    h += `<span style="left:9px;top:${y}%">${c}</span><span style="right:9px;top:${y}%">${c}</span>`;
  });
  zones.innerHTML = h;
}

if (FINE && !RM) {
  const v = $('.xh.v'), h = $('.xh.h'), rx = $('#rx'), ry = $('#ry');
  if (v && h && rx && ry) {
    addEventListener('pointermove', e => {
      v.style.transform = `translateX(${e.clientX}px)`;
      h.style.transform = `translateY(${e.clientY}px)`;
      rx.textContent = (e.clientX / 3.78).toFixed(1).padStart(6, '0');
      ry.textContent = ((innerHeight - e.clientY) / 3.78).toFixed(1).padStart(6, '0');
      document.body.classList.add('xh-on');
    }, { passive: true });
    document.addEventListener('pointerleave', () => document.body.classList.remove('xh-on'));
  }
}

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.rv, .ruler, .bom').forEach(el => io.observe(el));
requestAnimationFrame(() => document.body.classList.add('ready'));

const nav = $('.nav');
const links = $$<HTMLAnchorElement>('.links a');
const sheetN = $('#sheet-n'), sheetT = $('#sheet-t');
const so = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const s = e.target as HTMLElement;
  if (sheetN && s.dataset.sheet) sheetN.textContent = s.dataset.sheet;
  if (sheetT && s.dataset.title) sheetT.textContent = s.dataset.title;
  links.forEach(a => a.classList.toggle('active', a.hash === '#' + s.id && a.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')));
}), { rootMargin: '-48% 0px -48% 0px' });
$$('[data-sheet]').forEach(s => so.observe(s));
const solid = () => nav?.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', solid, { passive: true });
solid();

let lenis: Lenis | null = null;
if (!RM) {
  lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  const raf = (t: number) => { lenis!.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  (window as any).__lenis = lenis;
}

document.addEventListener('click', e => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a || a.origin !== location.origin) return;
  if (a.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '')) return;
  const el = a.hash.length > 1 ? document.getElementById(decodeURIComponent(a.hash.slice(1))) : null;
  if (!el) return;
  e.preventDefault();
  closeOverlay();
  if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.6 });
  else el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  history.replaceState(null, '', a.hash);
});
if (location.hash.length > 1) {
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el) setTimeout(() => (lenis ? lenis.scrollTo(el, { offset: -40, immediate: true }) : el.scrollIntoView()), 60);
}

const overlay = $('#overlay'), idxBtn = $('.nav .index-btn');
function closeOverlay() {
  overlay?.classList.remove('open'); overlay?.setAttribute('aria-hidden', 'true'); idxBtn?.setAttribute('aria-expanded', 'false');
  lenis?.start();
}
idxBtn?.addEventListener('click', () => { overlay?.classList.add('open'); overlay?.setAttribute('aria-hidden', 'false'); idxBtn.setAttribute('aria-expanded', 'true'); lenis?.stop(); });
$('.overlay .close')?.addEventListener('click', closeOverlay);
addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

const filters = $$<HTMLButtonElement>('.filter');
filters.forEach(b => b.addEventListener('click', () => {
  filters.forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
  const f = b.dataset.f!;
  $$('.pcard').forEach(c => {
    const show = f === 'all' || (c.dataset.cat || '').split(' ').includes(f);
    c.classList.toggle('hide', !show);
    if (show) c.classList.add('in');
  });
  lenis?.resize();
}));

const toast = $('.toast');
let tt: number;
$('#copy')?.addEventListener('click', async () => {
  const email = $('#copy')!.dataset.email!;
  try { await navigator.clipboard.writeText(email); toast!.textContent = 'Email copied'; }
  catch { toast!.textContent = email; }
  toast!.classList.add('show'); clearTimeout(tt); tt = window.setTimeout(() => toast!.classList.remove('show'), 1800);
});

const lb = $('.lightbox');
if (lb) {
  const img = $<HTMLImageElement>('img', lb)!, cap = $('figcaption', lb)!;
  $$<HTMLAnchorElement>('.gallery a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    img.src = a.href; img.alt = a.dataset.caption || ''; cap.textContent = a.dataset.caption || '';
    lb.classList.add('open'); lenis?.stop();
  }));
  lb.addEventListener('click', () => { lb.classList.remove('open'); lenis?.start(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) { lb.classList.remove('open'); lenis?.start(); } });
}
