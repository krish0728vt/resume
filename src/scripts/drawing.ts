import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

export const INK = 0x15213b;
export const RED = 0xc4422b;

export type PartDef = { match: string; name: string; desc: string; callout?: boolean };

export type DrawingPart = {
  name: string;
  grp: THREE.Group;
  vis: THREE.LineSegments;
  hid: THREE.LineSegments;
  mesh: THREE.Mesh;
  explode: THREE.Vector3;
  box: THREE.Box3;
  isRef: boolean;
};

export type Drawing = {
  root: THREE.Group;
  parts: DrawingPart[];
  ref: DrawingPart | undefined;
  size: number;
  setExplode: (e: number) => void;
  bounds: (e: number) => THREE.Box3;
  dimGroup: THREE.Group;
  dimMat: THREE.LineBasicMaterial;
  dims: { text: string; at: THREE.Vector3 }[];
  highlight: (re: RegExp | null) => void;
  focus: (re: RegExp | null) => void;
  setFocus: (k: number, dash: number) => void;
  dispose: () => void;
};

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const cache = new Map<string, Promise<THREE.Group>>();

function load(url: string) {
  if (!cache.has(url)) cache.set(url, loader.loadAsync(url).then(g => g.scene));
  return cache.get(url)!;
}

export function preload(url: string) { load(url).catch(() => {}); }

export async function buildDrawing(url: string): Promise<Drawing> {
  const src = await load(url);
  src.updateMatrixWorld(true);
  const meshes: THREE.Mesh[] = [];
  src.traverse(o => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });

  const all = new THREE.Box3();
  const geos = meshes.map(o => {
    const a = o.geometry.attributes.position, n = a.count, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { arr[i * 3] = a.getX(i); arr[i * 3 + 1] = a.getY(i); arr[i * 3 + 2] = a.getZ(i); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    g.setIndex(o.geometry.index);
    g.applyMatrix4(o.matrixWorld);
    g.computeBoundingBox();
    all.union(g.boundingBox!);
    return g;
  });
  const size = all.getSize(new THREE.Vector3()).length();

  const fill = new THREE.MeshLambertMaterial({ color: 0xf6f3ec, flatShading: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const refFill = fill.clone(); refFill.color.set(0xe2dbc9);
  const line = new THREE.LineBasicMaterial({ color: INK });
  const red = new THREE.LineBasicMaterial({ color: RED });
  const hidden = new THREE.LineDashedMaterial({ color: INK, dashSize: size * 0.006, gapSize: size * 0.005, transparent: true, opacity: 0.16, depthTest: false, depthWrite: false });

  const root = new THREE.Group();
  const parts: DrawingPart[] = meshes.map((o, i) => {
    const g = geos[i];
    const ex = (o.userData?.explode as number[]) || [0, 0, 0];
    const isRef = !!o.userData?.ref;
    const grp = new THREE.Group();
    const mesh = new THREE.Mesh(g, isRef ? refFill : fill);
    const edges = new THREE.EdgesGeometry(g, 26);
    const vis = new THREE.LineSegments(edges, line); vis.renderOrder = 2;
    const hid = new THREE.LineSegments(edges, hidden); hid.renderOrder = 1; hid.computeLineDistances();
    grp.add(mesh, hid, vis);
    root.add(grp);
    return { name: (o.userData?.name as string) || o.name, grp, vis, hid, mesh, explode: new THREE.Vector3(ex[0], ex[1], ex[2]), box: g.boundingBox!.clone(), isRef };
  });
  const ref = parts.find(p => p.isRef);

  const dimMat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.6 });
  const dimGroup = new THREE.Group();
  const dims: { text: string; at: THREE.Vector3 }[] = [];
  if (ref) {
    const B = ref.box, k = size * 0.045, y = B.min.y;
    const pts: THREE.Vector3[] = [];
    const L = (a: number[], b: number[]) => pts.push(new THREE.Vector3(...a), new THREE.Vector3(...b));
    const zD = B.max.z + k * 2.2, xD = B.max.x + k * 2.2, ah = k * 0.7, aw = k * 0.22;
    L([B.min.x, y, B.max.z + k * 0.4], [B.min.x, y, zD + k * 0.6]); L([B.max.x, y, B.max.z + k * 0.4], [B.max.x, y, zD + k * 0.6]);
    L([B.min.x, y, zD], [B.max.x, y, zD]);
    L([B.min.x, y, zD], [B.min.x + ah, y, zD - aw]); L([B.min.x, y, zD], [B.min.x + ah, y, zD + aw]);
    L([B.max.x, y, zD], [B.max.x - ah, y, zD - aw]); L([B.max.x, y, zD], [B.max.x - ah, y, zD + aw]);
    L([B.max.x + k * 0.4, y, B.min.z], [xD + k * 0.6, y, B.min.z]); L([B.max.x + k * 0.4, y, B.max.z], [xD + k * 0.6, y, B.max.z]);
    L([xD, y, B.min.z], [xD, y, B.max.z]);
    L([xD, y, B.min.z], [xD - aw, y, B.min.z + ah]); L([xD, y, B.min.z], [xD + aw, y, B.min.z + ah]);
    L([xD, y, B.max.z], [xD - aw, y, B.max.z - ah]); L([xD, y, B.max.z], [xD + aw, y, B.max.z - ah]);
    dimGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), dimMat));
    root.add(dimGroup);
    dims.push({ text: (B.max.x - B.min.x).toFixed(2), at: new THREE.Vector3((B.min.x + B.max.x) / 2, y, zD) });
    dims.push({ text: (B.max.z - B.min.z).toFixed(2), at: new THREE.Vector3(xD, y, (B.min.z + B.max.z) / 2) });
  }

  const ghost = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 1 });
  let hlRe: RegExp | null = null, fRe: RegExp | null = null, fk = 0;
  const apply = () => {
    parts.forEach(p => {
      const sel = !fRe || fRe.test(p.name);
      const hl = !!hlRe && hlRe.test(p.name);
      p.vis.material = hl ? red : sel ? line : ghost;
      p.mesh.visible = sel || fk < 0.2;
      p.hid.visible = sel || fk < 0.4;
    });
  };
  const tmp = new THREE.Box3();
  return {
    root, parts, ref, size, dimGroup, dimMat, dims,
    setExplode(e: number) { parts.forEach(p => p.grp.position.copy(p.explode).multiplyScalar(e)); },
    bounds(e: number) {
      const b = new THREE.Box3();
      parts.forEach(p => { tmp.copy(p.box).translate(p.explode.clone().multiplyScalar(e)); b.union(tmp); });
      return b;
    },
    highlight(re: RegExp | null) { hlRe = re; apply(); },
    focus(re: RegExp | null) { fRe = re; apply(); },
    setFocus(k: number, dash: number) {
      const was = [fk < 0.2, fk < 0.4];
      fk = k;
      ghost.opacity = 1 - 0.93 * k;
      hidden.scale = dash;
      if (was[0] !== fk < 0.2 || was[1] !== fk < 0.4) apply();
    },
    dispose() {
      root.traverse(o => { const m = o as THREE.Mesh; if (m.geometry) m.geometry.dispose(); });
      [fill, refFill, line, red, hidden, dimMat, ghost].forEach(m => m.dispose());
    }
  };
}

export function makeRenderer(host: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 1.55));
  const sun = new THREE.DirectionalLight(0xffffff, 1.35);
  sun.position.set(-0.6, 1, 0.45);
  scene.add(sun);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -5000, 5000);
  return { renderer, scene, cam };
}

const corners = (b: THREE.Box3) => [0, 1, 2, 3, 4, 5, 6, 7].map(i => new THREE.Vector3(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z));

/* aim the ortho camera so that `box` fills the rectangle `region` (pixels inside a W x H canvas) */
export function frame(cam: THREE.OrthographicCamera, box: THREE.Box3, az: number, el: number, W: number, H: number, region: { x: number; y: number; w: number; h: number }, pad = 1.08) {
  const c = box.getCenter(new THREE.Vector3());
  const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
  cam.position.copy(c).addScaledVector(dir, 1000);
  cam.up.set(0, 1, 0);
  cam.lookAt(c);
  cam.updateMatrixWorld();
  const right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0);
  const up = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  corners(box).forEach(p => { p.sub(c); const x = p.dot(right), y = p.dot(up); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
  const mm = Math.max((x1 - x0) / Math.max(1, region.w), (y1 - y0) / Math.max(1, region.h)) * pad;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  const rcx = region.x + region.w / 2, rcy = region.y + region.h / 2;
  cam.left = mx - rcx * mm; cam.right = mx + (W - rcx) * mm;
  cam.top = my + rcy * mm; cam.bottom = my - (H - rcy) * mm;
  cam.updateProjectionMatrix();
  return mm;
}

export const smooth = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
export const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
