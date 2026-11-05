import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

/* ---------- Lenis smooth scroll ---------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
window.__pcb = { lenis, ScrollTrigger, gsap };
if (import.meta.env.DEV) window.__anp = { lenis, ScrollTrigger };

/* Refresh once fonts are in, only if the height changed. */
const h0 = document.body.scrollHeight;
document.fonts?.ready.then(() => { if (Math.abs(document.body.scrollHeight - h0) > 2) ScrollTrigger.refresh(); });

/* ---------- Reveals: transform + opacity only, with a sweep ---------- */
const revealEls = [...document.querySelectorAll('[data-reveal]')];
const show = (el) => el.classList.add('is-in');
if (reduce || !('IntersectionObserver' in window)) revealEls.forEach(show);
else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => io.observe(el));
  // Sweep: anything already scrolled past is revealed, so fast scrolls never leave gaps.
  const sweep = () => {
    const vh = window.innerHeight;
    for (const el of revealEls) if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < vh * 0.92) show(el);
  };
  window.addEventListener('scroll', sweep, { passive: true });
  sweep();
}

/* ---------- Header + mobile bar ---------- */
const header = document.querySelector('[data-header]');
const mbar = document.querySelector('[data-mbar]');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-solid', y > 24);
  if (header) header.classList.toggle('is-hidden', y > 400 && y > lastY + 2);
  if (header && y < lastY - 2) header.classList.remove('is-hidden');
  mbar?.classList.toggle('is-on', y > window.innerHeight * 0.6);
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Page transitions: ≤0.35s out, 0.4s in ---------- */
const panel = document.querySelector('.pt');
if (panel && root.classList.contains('pt-in')) {
  try { sessionStorage.removeItem('pcb-pt'); } catch (e) {}
  requestAnimationFrame(() => {
    panel.classList.add('is-leaving');
    root.classList.remove('pt-in');
    setTimeout(() => panel.classList.remove('is-leaving'), 450);
  });
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a || !panel || reduce) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || a.target === '_blank' || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.protocol.indexOf('http') !== 0) return;
  if (url.pathname === location.pathname && url.hash) return;
  e.preventDefault();
  try { sessionStorage.setItem('pcb-pt', '1'); } catch (err) {}
  panel.classList.add('is-out');
  setTimeout(() => { location.href = url.href; }, 300);
});
window.addEventListener('pageshow', (e) => { if (e.persisted && panel) { panel.classList.remove('is-out', 'is-leaving'); root.classList.remove('pt-in'); } });

/* ---------- Anchor links through Lenis ---------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || !lenis) return;
  const t = document.querySelector(a.getAttribute('href'));
  if (!t) return;
  e.preventDefault();
  lenis.scrollTo(t, { offset: -80 });
});
if (location.hash && lenis) {
  const t = document.querySelector(location.hash);
  if (t) setTimeout(() => lenis.scrollTo(t, { offset: -80, immediate: true }), 60);
}

/* ---------- Cursor: subtle ring + dot, fine pointers only ---------- */
const cursor = document.querySelector('.cursor');
if (cursor && fine && !reduce) {
  root.classList.add('has-cursor');
  const ring = cursor.querySelector('.cursor__ring');
  const dot = cursor.querySelector('.cursor__dot');
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; cursor.classList.remove('is-hidden'); }, { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('pointerover', (e) => cursor.classList.toggle('is-link', !!e.target.closest('a, button, [data-cursor]')));
  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.22; ry += (my - ry) * 0.22;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
  });
}

/* ---------- Magnetic buttons (small pull) ---------- */
if (fine && !reduce) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }));
  });
}

export { lenis, gsap, ScrollTrigger };
