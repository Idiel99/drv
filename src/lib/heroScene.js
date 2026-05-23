import * as THREE from "three";

// Three.js wireframe building scene. Returns a cleanup fn.
export function initHeroScene(canvas) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a1628, 18, 80);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
  camera.position.set(14, 9, 22);
  camera.lookAt(6, 5, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  group.position.x = 4;
  scene.add(group);

  const blueEdge = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.95 });
  const silverEdge = new THREE.LineBasicMaterial({ color: 0x9ca3af, transparent: true, opacity: 0.55 });
  const ghostEdge = new THREE.LineBasicMaterial({ color: 0x4b5563, transparent: true, opacity: 0.32 });

  function addBuilding(x, z, w, d, h, mat, withFloors = true) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const edges = new THREE.EdgesGeometry(geo);
    const lines = new THREE.LineSegments(edges, mat);
    lines.position.set(x, h / 2, z);
    group.add(lines);

    if (withFloors) {
      const floors = Math.max(2, Math.round(h / 1.2));
      for (let i = 1; i < floors; i++) {
        const y = (i / floors) * h;
        const ring = new THREE.BufferGeometry();
        const v = new Float32Array([
          -w/2, y - h/2, -d/2,   w/2, y - h/2, -d/2,
           w/2, y - h/2, -d/2,   w/2, y - h/2,  d/2,
           w/2, y - h/2,  d/2,  -w/2, y - h/2,  d/2,
          -w/2, y - h/2,  d/2,  -w/2, y - h/2, -d/2
        ]);
        ring.setAttribute("position", new THREE.BufferAttribute(v, 3));
        const l = new THREE.LineSegments(ring, mat === blueEdge ? silverEdge : ghostEdge);
        l.position.set(x, h/2, z);
        group.add(l);
      }
    }
  }

  addBuilding(0, 0, 4, 4, 14, blueEdge);
  addBuilding(-5.5, -1.5, 3, 3, 9, silverEdge);
  addBuilding(4.5, 1.5, 3.5, 3.5, 6, silverEdge);
  addBuilding(-2.5, 5, 2.2, 2.2, 7.5, ghostEdge, false);
  addBuilding(6, -3, 2.4, 2.4, 5, ghostEdge, false);
  addBuilding(-7.5, 3.5, 2, 2, 6, ghostEdge, false);

  const grid = new THREE.GridHelper(40, 40, 0x1f2937, 0x1f2937);
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  scene.add(grid);

  const fadeGeo = new THREE.PlaneGeometry(40, 40);
  const fadeMat = new THREE.MeshBasicMaterial({ color: 0x0a1628, transparent: true, opacity: 0.4 });
  const fade = new THREE.Mesh(fadeGeo, fadeMat);
  fade.rotation.x = -Math.PI / 2;
  fade.position.y = -0.01;
  scene.add(fade);

  const partCount = reduced ? 0 : 80;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount; i++) {
    partPos[i * 3] = (Math.random() - 0.5) * 30;
    partPos[i * 3 + 1] = Math.random() * 14;
    partPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  partGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
  const partMat = new THREE.PointsMaterial({ color: 0x9ca3af, size: 0.04, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(partGeo, partMat);
  scene.add(particles);

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }
  window.addEventListener("mousemove", onMove);

  function resize() {
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;

    if (!reduced) {
      group.rotation.y = t * 0.08 + mx * 0.25;
      group.rotation.x = -0.02 + my * 0.05;
      particles.rotation.y = t * 0.02;
    } else {
      group.rotation.y = -0.35;
    }

    camera.position.x = 14 + mx * 1.5;
    camera.position.y = 9 - my * 1.5;
    camera.lookAt(6, 5, 0);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMove);
    ro.disconnect();
    renderer.dispose();
  };
}
