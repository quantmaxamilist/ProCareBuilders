// Wow B: procedural 3D plot. Render on demand, stop off screen, dispose on page leave.
import * as THREE from 'three';

const C = {
  navy: 0x0c1a41, navy2: 0x16295c, deep: 0x070f27, stone: 0xe9e4da, sand: 0xdcb98a,
  render: 0xf4f2ee, roof: 0x1d2a4d, glass: 0x9fb4cf, block: 0x3a3f4a, block2: 0x4a4f59,
  porcelain: 0xd9d6cf, lawn: 0x6d8a52, timber: 0xa7774a, timber2: 0x8f6339, step: 0xcfc8bb, drain: 0x22262e,
};

export function createPlot({ root, stage, list, pinsWrap }) {
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);
  root.classList.add('has-gl');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 16 / 11, 0.1, 200);
  const target = new THREE.Vector3(0.7, 0.2, 0.5);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x223355, 1.6));
  const sun = new THREE.DirectionalLight(0xfff2e0, 2.4);
  sun.position.set(8, 14, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
  sun.shadow.bias = -0.0008;
  scene.add(sun);

  const mats = [];
  const mat = (color, rough = 0.85) => { const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 }); mats.push(m); return m; };
  const box = (w, h, d, m, x, y, z, parent) => {
    const g = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    g.position.set(x, y, z); g.castShadow = true; g.receiveShadow = true; parent.add(g); return g;
  };

  // Groups, in assembly order. Each has a key matching the list and a pin anchor.
  const groups = {};
  const mk = (key, anchor) => { const g = new THREE.Group(); g.userData = { key, anchor: new THREE.Vector3(...anchor), mats: [] }; groups[key] = g; scene.add(g); return g; };
  const own = (g, m) => { g.userData.mats.push(m); return m; };

  // Plinth (not a service)
  const base = new THREE.Group(); scene.add(base);
  box(14.4, 0.5, 10.4, mat(C.navy2, 0.9), 0, -0.25, 0, base);
  box(14, 0.06, 10, mat(C.stone, 0.95), 0, 0.03, 0, base);

  // House
  const house = mk('house', [-2.2, 4.6, -0.6]);
  const mRender = own(house, mat(C.render, 0.9)), mRoof = own(house, mat(C.roof, 0.7)), mGlass = own(house, mat(C.glass, 0.25)), mDoor = own(house, mat(C.navy, 0.5));
  box(4.2, 3, 3.4, mRender, -2.2, 1.56, -0.8, house);
  const tri = new THREE.Shape(); tri.moveTo(-2.45, 0); tri.lineTo(2.45, 0); tri.lineTo(0, 1.7); tri.closePath();
  const roofG = new THREE.ExtrudeGeometry(tri, { depth: 3.8, bevelEnabled: false });
  const roof = new THREE.Mesh(roofG, mRoof); roof.position.set(-2.2, 3.05, -2.7); roof.castShadow = true; roof.receiveShadow = true; house.add(roof);
  box(0.45, 1.1, 0.45, mRoof, -0.9, 4.1, -1.4, house);
  [[-3.4, 2.3], [-1.0, 2.3], [-3.4, 1.05]].forEach(([x, y]) => box(0.75, 0.75, 0.06, mGlass, x, y, 0.92, house));
  box(0.8, 1.45, 0.08, mDoor, -1.4, 0.78, 0.92, house);

  // Driveway: herringbone blocks (instanced)
  const drive = mk('driveways', [-2.4, 0.4, 3.0]);
  const mBlock = own(drive, mat(C.block, 0.95)), mBlock2 = own(drive, mat(C.block2, 0.95));
  {
    const u = 0.23, x0 = -4.3, x1 = -0.1, z0 = 1.15, z1 = 4.7;
    const geoH = new THREE.BoxGeometry(2 * u - 0.025, 0.08, u - 0.025), geoV = new THREE.BoxGeometry(u - 0.025, 0.08, 2 * u - 0.025);
    const pos = { H: [], V: [] };
    const n = 40;
    for (let c = -n; c <= n; c++) for (let k = -n; k <= n; k++) {
      const hx = (2 * k - c) * u, hz = (2 * k + c) * u;
      pos.H.push([hx + u, hz + u / 2]); pos.V.push([hx + u + u / 2, hz + u + u]);
    }
    const put = (arr, geo, m) => {
      const keep = arr.map(([x, z]) => [x0 + ((x % 8 + 8) % 8) * 0 + x, z0 + z]).filter(([x, z]) => x > x0 + 0.1 && x < x1 - 0.1 && z > z0 + 0.1 && z < z1 - 0.1);
      const im = new THREE.InstancedMesh(geo, m, keep.length);
      const o = new THREE.Object3D();
      keep.forEach(([x, z], i) => { o.position.set(x, 0.1, z); o.updateMatrix(); im.setMatrixAt(i, o.matrix); });
      im.castShadow = true; im.receiveShadow = true; drive.add(im);
    };
    put(pos.H, geoH, mBlock); put(pos.V, geoV, mBlock2);
    box(4.3, 0.12, 0.12, mat(C.step, 0.9), -2.2, 0.08, z1, drive).userData.edge = true;
    box(0.12, 0.12, 3.6, mat(C.step, 0.9), x1, 0.08, (z0 + z1) / 2, drive);
  }

  // Patio: porcelain slabs
  const patio = mk('patios', [2.4, 0.4, -0.8]);
  const mPorc = own(patio, mat(C.porcelain, 0.6));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) box(0.9, 0.08, 0.9, mPorc, 0.9 + i * 0.95, 0.1, -2.6 + j * 0.95, patio);

  // Lawn (part of the plot, not a list item)
  const lawn = new THREE.Group(); scene.add(lawn);
  box(5.6, 0.06, 2.6, mat(C.lawn, 1), 3.6, 0.08, 2.9, lawn);

  // Fencing along the back and right
  const fence = mk('fencing', [3.6, 1.7, -4.75]);
  const mT = own(fence, mat(C.timber, 0.9)), mT2 = own(fence, mat(C.timber2, 0.9));
  for (let i = 0; i < 8; i++) { box(1.62, 1.35, 0.06, mT, -5.85 + i * 1.67, 0.75, -4.8, fence); box(0.12, 1.5, 0.12, mT2, -6.7 + i * 1.67, 0.8, -4.8, fence); }
  for (let i = 0; i < 5; i++) { box(0.06, 1.35, 1.62, mT, 6.8, 0.75, -4.0 + i * 1.67, fence); box(0.12, 1.5, 0.12, mT2, 6.8, 0.8, -4.85 + i * 1.67, fence); }

  // Decking in the back-right corner
  const deck = mk('decking', [5.6, 0.7, -3.0]);
  const mDeck = own(deck, mat(0xb98756, 0.85));
  box(2.2, 0.3, 3.0, own(deck, mat(C.timber2, 0.9)), 5.6, 0.18, -3.1, deck);
  for (let i = 0; i < 14; i++) box(0.14, 0.05, 3.0, mDeck, 4.6 + i * 0.155, 0.36, -3.1, deck);

  // Garden steps down from a raised terrace (left of the driveway)
  const steps = mk('garden-steps', [-5.6, 1.3, 0.4]);
  const mStep = own(steps, mat(C.step, 0.85)), mWall = own(steps, mat(0xb9b1a3, 0.9));
  box(2.0, 0.9, 2.6, mWall, -5.6, 0.48, -0.1, steps);
  box(2.0, 0.06, 2.6, own(steps, mat(C.lawn, 1)), -5.6, 0.96, -0.1, steps);
  for (let i = 0; i < 3; i++) box(1.3, 0.9 * (3 - i) / 4 + 0.02, 0.42, mStep, -5.6, (0.9 * (3 - i) / 4) / 2 + 0.04, 1.4 + i * 0.42, steps);

  // Drainage: channel drain across the driveway mouth
  const drain = mk('drainage', [-2.2, 0.3, 4.95]);
  const mDrain = own(drain, mat(C.drain, 0.5));
  box(4.2, 0.1, 0.22, mDrain, -2.2, 0.08, 4.95, drain);
  for (let i = 0; i < 20; i++) box(0.06, 0.11, 0.18, own(drain, mat(0x8a8f99, 0.4)), -4.2 + i * 0.21, 0.09, 4.95, drain);

  const order = [base, house, drive, patio, lawn, fence, deck, steps, drain];
  const keys = ['house', 'driveways', 'patios', 'fencing', 'decking', 'garden-steps', 'drainage'];

  // Camera framing per aspect
  const frame = () => {
    const r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    const far = camera.aspect < 1.3 ? 1.12 : 0.97;
    camera.position.set(14 * far, 12.5 * far, 17 * far);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
  };
  frame();

  // Assembly: everything drops in together on a short stagger.
  const D = 1.15, STAG = 0.16;
  const total = (order.length - 1) * STAG + D;
  order.forEach((g) => { g.userData.home = g.position.clone(); });
  const ease = (x) => 1 - Math.pow(1 - x, 4);
  const pose = (t) => {
    order.forEach((g, i) => {
      const p = Math.min(1, Math.max(0, (t - i * STAG) / D)), e = ease(p);
      g.position.y = (1 - e) * (i === 0 ? -2 : 7);
      g.rotation.y = (1 - e) * (i % 2 ? 0.25 : -0.25);
      g.scale.setScalar(0.001 + 0.999 * Math.min(1, p * 2.2));
      g.visible = p > 0;
    });
  };

  // Pins + highlights
  const pins = Object.fromEntries([...pinsWrap.querySelectorAll('[data-pin]')].map((p) => [p.dataset.pin, p]));
  const links = Object.fromEntries([...list.querySelectorAll('[data-key]')].map((a) => [a.dataset.key, a]));
  const v = new THREE.Vector3();
  const placePins = () => {
    const r = stage.getBoundingClientRect();
    keys.forEach((k) => {
      v.copy(groups[k].userData.anchor).project(camera);
      pins[k].style.transform = `translate3d(${((v.x + 1) / 2) * r.width}px, ${((1 - v.y) / 2) * r.height}px, 0)`;
    });
  };
  let hot = null;
  const setHot = (k) => {
    if (k === hot) return;
    hot = k;
    keys.forEach((key) => {
      const on = key === k;
      groups[key].userData.mats.forEach((m) => { m.emissive.setHex(on ? C.sand : 0x000000); m.emissiveIntensity = on ? 0.35 : 0; });
      pins[key].classList.toggle('is-hot', on);
      links[key].classList.toggle('is-hot', on);
    });
    render();
  };
  list.addEventListener('pointerover', (e) => { const a = e.target.closest('[data-key]'); if (a && root.classList.contains('is-done')) setHot(a.dataset.key); });
  list.addEventListener('pointerleave', () => setHot(null));
  list.addEventListener('focusin', (e) => { const a = e.target.closest('[data-key]'); if (a) setHot(a.dataset.key); });

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const pickable = keys.map((k) => groups[k]);
  renderer.domElement.addEventListener('pointermove', (e) => {
    if (!root.classList.contains('is-done')) return;
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickable, true)[0];
    let k = null;
    if (hit) { let o = hit.object; while (o && !o.userData.key) o = o.parent; k = o?.userData.key ?? null; }
    renderer.domElement.style.cursor = k ? 'pointer' : '';
    setHot(k);
  });
  renderer.domElement.addEventListener('pointerleave', () => setHot(null));
  renderer.domElement.addEventListener('click', () => { if (hot && links[hot]) links[hot].click(); });

  const render = () => renderer.render(scene, camera);

  // Pre-compile shaders before the section arrives.
  pose(0);
  (window.requestIdleCallback || ((f) => setTimeout(f, 200)))(() => { try { renderer.compile(scene, camera); } catch (e) {} render(); });

  let t = 0, last = 0, raf = 0, playing = false, visible = false, played = false;
  const tick = (now) => {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
    pose(Math.min(t, total)); render();
    if (t >= total) { playing = false; root.classList.add('is-done'); placePins(); return; }
    if (visible) raf = requestAnimationFrame(tick);
  };
  const play = () => {
    root.classList.remove('is-done'); setHot(null);
    t = 0; playing = true; played = true; last = performance.now();
    if (!raf) raf = requestAnimationFrame(tick);
  };
  root.querySelector('[data-plot-replay]')?.addEventListener('click', play);

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !played) play();
    else if (visible && playing && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }, { threshold: 0.5 });
  io.observe(stage);

  const ro = new ResizeObserver(() => { frame(); render(); if (root.classList.contains('is-done')) placePins(); });
  ro.observe(stage);

  if (import.meta.env.DEV) window.__plotPoster = () => { pose(total); render(); return renderer.domElement.toDataURL('image/png'); };

  const dispose = () => {
    if (raf) cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect();
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
    mats.forEach((m) => m.dispose());
    renderer.dispose();
  };
  window.addEventListener('pagehide', dispose, { once: true });
}
