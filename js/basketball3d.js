function initBball() {
  const canvas = document.getElementById('bball-canvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const H = 340;
  const getW = () => Math.min(window.innerWidth - 48, 400);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const camera = new THREE.PerspectiveCamera(42, getW() / H, 0.1, 200);
  camera.position.set(0, 6, 22);
  camera.lookAt(0, 6, 0);

  const scene = new THREE.Scene();

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(6, 14, 10);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x88aaff, 0.25);
  fill.position.set(-6, 2, -8);
  scene.add(fill);

  // ── Palette ──────────────────────────────────────────
  const C = {
    skin:    0xFFBF86,
    hair:    0x1A0A00,
    eye:     0x1A0A00,
    black:   0x111111,
    silver:  0xAAAAAA,
    white:   0xEEEEEE,
    shoe:    0xDDDDDD,
    orange:  0xE8701A,
    seam:    0x7A2E00,
  };

  // ── Voxel helpers ────────────────────────────────────
  const mats = {};
  function mat(color) {
    if (!mats[color]) mats[color] = new THREE.MeshLambertMaterial({ color });
    return mats[color];
  }

  function box(group, x, y, z, w, h, d, color) {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.06, h - 0.06, d - 0.06),
      mat(color)
    );
    m.position.set(x, y, z);
    group.add(m);
  }

  // ── Character ────────────────────────────────────────
  const player = new THREE.Group();

  // Shoes
  box(player, -0.75, 0.55,  0.1, 1.5, 1.0, 1.4, C.shoe);
  box(player,  0.75, 0.55,  0.1, 1.5, 1.0, 1.4, C.shoe);
  // Shoe accents
  box(player, -0.75, 0.55,  0.72, 1.45, 0.9, 0.07, C.black);
  box(player,  0.75, 0.55,  0.72, 1.45, 0.9, 0.07, C.black);

  // Legs / shorts (black)
  box(player, -0.75, 3.5, 0, 1.1, 4.0, 1.1, C.black);
  box(player,  0.75, 3.5, 0, 1.1, 4.0, 1.1, C.black);

  // Torso / jersey
  box(player,  0,    8.0, 0, 3.1, 4.5, 1.6, C.black);
  // Jersey silver side stripes
  box(player, -1.6,  8.0, 0, 0.15, 4.0, 1.5, C.silver);
  box(player,  1.6,  8.0, 0, 0.15, 4.0, 1.5, C.silver);
  // Jersey number "21" (simplified as two silver bars)
  box(player, -0.35, 8.2, 0.82, 0.25, 1.8, 0.08, C.silver);
  box(player,  0.35, 8.2, 0.82, 0.25, 1.8, 0.08, C.silver);
  box(player,  0,    9.1, 0.82, 0.7,  0.2, 0.08, C.silver);
  box(player,  0,    8.2, 0.82, 0.7,  0.2, 0.08, C.silver);
  box(player,  0,    7.3, 0.82, 0.7,  0.2, 0.08, C.silver);

  // Left arm (relaxed, slightly out)
  box(player, -2.15, 8.4,  0, 1.1, 1.5, 1.1, C.black);  // shoulder cap
  box(player, -2.15, 6.8,  0, 1.0, 1.8, 1.0, C.skin);   // forearm
  box(player, -2.15, 5.7,  0, 0.9, 0.8, 0.9, C.skin);   // hand

  // Right arm (lowered, holding ball)
  box(player,  2.15, 7.5,  0, 1.1, 2.5, 1.1, C.black);  // shoulder/upper arm
  box(player,  2.15, 5.8,  0.3, 1.0, 1.8, 1.0, C.skin); // forearm angled
  box(player,  2.5,  4.6,  0.8, 0.9, 0.8, 0.9, C.skin); // hand near ball

  // Neck
  box(player,  0, 10.5, 0, 0.9, 0.9, 0.9, C.skin);

  // Head
  box(player,  0, 12.5, 0, 2.8, 3.0, 2.8, C.skin);
  // Hair
  box(player,  0, 14.1, 0, 2.8, 0.6, 2.8, C.hair);
  box(player,  0, 13.5,-1.1, 2.8, 1.2, 0.6, C.hair); // back hair
  // Eyes
  box(player, -0.7, 12.5, 1.42, 0.55, 0.45, 0.08, C.eye);
  box(player,  0.7, 12.5, 1.42, 0.55, 0.45, 0.08, C.eye);
  // Eyebrows
  box(player, -0.7, 13.0, 1.42, 0.7, 0.18, 0.08, C.hair);
  box(player,  0.7, 13.0, 1.42, 0.7, 0.18, 0.08, C.hair);
  // Mouth
  box(player,  0, 11.8, 1.42, 0.9, 0.18, 0.08, C.hair);

  // Ears
  box(player, -1.45, 12.3, 0, 0.22, 0.7, 0.7, C.skin);
  box(player,  1.45, 12.3, 0, 0.22, 0.7, 0.7, C.skin);

  // ── Basketball ───────────────────────────────────────
  const ball = new THREE.Group();
  ball.position.set(3.2, 3.2, 1.6);

  const ballMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 24, 24),
    new THREE.MeshLambertMaterial({ color: C.orange })
  );
  ball.add(ballMesh);

  // Seam lines on ball
  const seamMat = new THREE.LineBasicMaterial({ color: C.seam });
  function addSeam(rotY) {
    const pts = [];
    for (let i = 0; i <= 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(t) * 1.07,
        Math.sin(t) * 0.35,
        Math.sin(t) * 1.07
      ));
    }
    const seam = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      seamMat
    );
    seam.rotation.y = rotY;
    ball.add(seam);
  }
  addSeam(0);
  addSeam(Math.PI / 2);

  // Vertical seam (equator)
  const eqPts = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    eqPts.push(new THREE.Vector3(Math.cos(t) * 1.07, Math.sin(t) * 1.07, 0));
  }
  ball.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(eqPts), seamMat));

  player.add(ball);

  // Center player
  player.position.y = -6.5;
  scene.add(player);

  // ── Resize ───────────────────────────────────────────
  function resize() {
    const W = getW();
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Interaction ───────────────────────────────────────
  let dragging = false;
  let autoSpin = true;
  let rotY = 0.3, rotX = 0;
  let prev = { x: 0, y: 0 };
  let spinTimer;

  function resumeSpin() {
    clearTimeout(spinTimer);
    spinTimer = setTimeout(() => { autoSpin = true; }, 2500);
  }

  canvas.addEventListener('mousedown',  e => { dragging = true; autoSpin = false; prev = { x: e.clientX, y: e.clientY }; });
  window.addEventListener('mouseup',    () => { dragging = false; resumeSpin(); });
  window.addEventListener('mousemove',  e => {
    if (!dragging) return;
    rotY += (e.clientX - prev.x) * 0.012;
    rotX += (e.clientY - prev.y) * 0.012;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    prev = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('touchstart', e => {
    dragging = true; autoSpin = false;
    prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  window.addEventListener('touchend',   () => { dragging = false; resumeSpin(); });
  window.addEventListener('touchmove',  e => {
    if (!dragging) return;
    rotY += (e.touches[0].clientX - prev.x) * 0.012;
    rotX += (e.touches[0].clientY - prev.y) * 0.012;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // ── Animate ───────────────────────────────────────────
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.04;

    if (autoSpin) rotY += 0.006;

    player.rotation.y = rotY;
    player.rotation.x = rotX;

    // Basketball bounce in place
    ball.position.y = 3.2 + Math.abs(Math.sin(t)) * 0.4;
    ball.rotation.z = Math.sin(t * 0.5) * 0.15;

    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('three-ready', initBball);
window.addEventListener('load', function() {
  if (typeof THREE !== 'undefined') initBball();
});
