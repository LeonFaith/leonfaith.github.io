var _bballInited = false;

function initBball() {
  if (_bballInited) return;
  if (typeof THREE === 'undefined') return;
  var canvas = document.getElementById('bball-canvas');
  if (!canvas) return;
  _bballInited = true;

  var H = 360;
  var W = Math.min(window.innerWidth - 32, 380);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();

  // Camera shows full body including basketball
  var camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200);
  camera.position.set(0, 3, 22);
  camera.lookAt(0, 3, 0);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  var sun = new THREE.DirectionalLight(0xffffff, 0.75);
  sun.position.set(5, 12, 8);
  scene.add(sun);
  var fill = new THREE.DirectionalLight(0xffeedd, 0.4);
  fill.position.set(-4, 2, -5);
  scene.add(fill);

  // Colors
  var GOLD   = 0xE8B84B;
  var DGOLD  = 0xB8880A;
  var CREAM  = 0xF5DEB3;
  var BNOSE  = 0x181818;
  var PINK   = 0xFF9EB5;
  var BLACK  = 0x111111;
  var SILVER = 0xBBBBBB;
  var WHITE  = 0xFFFFFF;
  var ORANGE = 0xE8701A;
  var SEAM   = 0x7A2E00;

  var matCache = {};
  function mat(c) {
    if (!matCache[c]) matCache[c] = new THREE.MeshLambertMaterial({ color: c });
    return matCache[c];
  }

  // Box helper
  function b(group, x, y, z, w, h, d, color) {
    var mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.06, h - 0.06, d - 0.06),
      mat(color)
    );
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  }

  // Sphere helper (scaled)
  function sp(group, x, y, z, sx, sy, sz, color) {
    var mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 22, 22),
      mat(color)
    );
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    group.add(mesh);
    return mesh;
  }

  var dog = new THREE.Group();

  // ── Back legs (chubby) ──────────────────────────────
  b(dog, -1.0, 3.0, 0,   1.3, 3.2, 1.3, GOLD);
  b(dog,  1.0, 3.0, 0,   1.3, 3.2, 1.3, GOLD);
  // Paws
  b(dog, -1.1, 0.7, 0.5, 1.5, 0.9, 1.9, DGOLD);
  b(dog,  1.1, 0.7, 0.5, 1.5, 0.9, 1.9, DGOLD);

  // ── Body — round sphere, jersey black ───────────────
  sp(dog, 0, 7.0, 0,   2.2, 2.9, 1.65, BLACK);
  // Gold fur on sides
  b(dog, -2.1, 7.0, 0,  0.35, 4.2, 1.5, GOLD);
  b(dog,  2.1, 7.0, 0,  0.35, 4.2, 1.5, GOLD);
  // Jersey silver side trim
  b(dog, -1.88, 7.0, 1.55, 0.1, 3.8, 0.08, SILVER);
  b(dog,  1.88, 7.0, 1.55, 0.1, 3.8, 0.08, SILVER);
  // Star badge on jersey
  b(dog,  0, 7.6, 1.57, 0.85, 0.85, 0.08, SILVER);
  b(dog,  0, 7.6, 1.57, 0.18, 2.1,  0.08, SILVER);

  // ── Tail ────────────────────────────────────────────
  b(dog,  0.2, 10.0, -1.1, 0.85, 0.85, 1.0, GOLD);
  b(dog,  0.5, 10.8, -1.8, 0.75, 0.75, 0.75, GOLD);
  b(dog,  0.8, 11.4, -2.3, 0.65, 0.65, 0.65, DGOLD);

  // ── Front arms ──────────────────────────────────────
  // Left (relaxed down)
  b(dog, -2.5, 7.6, 0.1, 1.2, 2.0, 1.1, GOLD);
  b(dog, -2.6, 5.8, 0.4, 1.1, 1.6, 1.2, GOLD);
  b(dog, -2.7, 4.2, 0.6, 1.3, 1.0, 1.5, DGOLD);

  // Right (forward holding ball)
  b(dog,  2.5, 7.3, 0.3, 1.2, 2.0, 1.1, GOLD);
  b(dog,  2.8, 5.5, 1.1, 1.1, 1.7, 1.2, GOLD);
  b(dog,  3.0, 3.8, 1.9, 1.3, 1.0, 1.5, DGOLD);

  // ── Neck ────────────────────────────────────────────
  sp(dog, 0, 10.3, 0,   1.1, 1.0, 1.0, GOLD);

  // ── HEAD — big round sphere! ─────────────────────────
  sp(dog, 0, 12.6, 0.2,  2.25, 2.1, 2.0, GOLD);

  // Floppy ears (wide, hang down)
  b(dog, -2.55, 11.2, -0.2, 1.15, 3.8, 2.5, DGOLD);
  b(dog,  2.55, 11.2, -0.2, 1.15, 3.8, 2.5, DGOLD);

  // Muzzle — puffy cream sphere
  sp(dog, 0, 11.5, 2.2,  1.45, 1.1, 0.95, CREAM);

  // Nose — round sphere
  sp(dog, 0, 12.35, 2.95, 0.72, 0.52, 0.38, BNOSE);

  // Eyes — big whites
  sp(dog, -1.1, 13.1, 2.0,  0.65, 0.65, 0.32, WHITE);
  sp(dog,  1.1, 13.1, 2.0,  0.65, 0.65, 0.32, WHITE);
  // Dark pupils
  sp(dog, -1.1, 13.1, 2.2,  0.38, 0.38, 0.22, BNOSE);
  sp(dog,  1.1, 13.1, 2.2,  0.38, 0.38, 0.22, BNOSE);
  // Sparkle (cute!)
  b(dog, -0.88, 13.32, 2.32, 0.17, 0.17, 0.08, WHITE);
  b(dog,  1.32, 13.32, 2.32, 0.17, 0.17, 0.08, WHITE);

  // Eyebrows (angled = happy expression)
  b(dog, -1.1, 14.0, 2.02, 1.05, 0.22, 0.1, DGOLD);
  b(dog,  1.1, 14.0, 2.02, 1.05, 0.22, 0.1, DGOLD);

  // Tongue — sticking out!
  b(dog, -0.2, 10.9, 2.95, 0.95, 0.55, 0.14, PINK);
  b(dog, -0.2, 10.25, 2.82, 1.05, 0.82, 0.22, PINK);

  // ── Basketball ──────────────────────────────────────
  var ballGroup = new THREE.Group();
  ballGroup.position.set(3.6, 2.0, 2.5);

  var ball = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 26, 26),
    mat(ORANGE)
  );
  ballGroup.add(ball);

  var seamMat = new THREE.LineBasicMaterial({ color: SEAM });
  function seam(rotY) {
    var pts = [];
    for (var i = 0; i <= 48; i++) {
      var t = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * 1.17, Math.sin(t) * 0.4, Math.sin(t) * 1.17));
    }
    var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), seamMat);
    line.rotation.y = rotY;
    ballGroup.add(line);
  }
  seam(0); seam(Math.PI / 2);
  var eq = [];
  for (var i = 0; i <= 48; i++) {
    var t2 = (i / 48) * Math.PI * 2;
    eq.push(new THREE.Vector3(Math.cos(t2) * 1.17, Math.sin(t2) * 1.17, 0));
  }
  ballGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(eq), seamMat));

  dog.add(ballGroup);
  dog.position.y = -5;
  scene.add(dog);

  // ── Resize ──────────────────────────────────────────
  window.addEventListener('resize', function() {
    W = Math.min(window.innerWidth - 32, 380);
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });

  // ── Drag interaction ────────────────────────────────
  var dragging = false;
  var autoSpin = true;
  var rotY = 0.4, rotX = 0.1;
  var prev = { x: 0, y: 0 };
  var spinTimer;

  function stopSpin() { autoSpin = false; clearTimeout(spinTimer); }
  function startSpin() { spinTimer = setTimeout(function() { autoSpin = true; }, 2500); }

  canvas.addEventListener('mousedown', function(e) {
    dragging = true; stopSpin(); prev = { x: e.clientX, y: e.clientY }; e.preventDefault();
  });
  window.addEventListener('mouseup', function() { if (dragging) { dragging = false; startSpin(); } });
  window.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    rotY += (e.clientX - prev.x) * 0.013;
    rotX += (e.clientY - prev.y) * 0.013;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    prev = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('touchstart', function(e) {
    dragging = true; stopSpin(); prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  window.addEventListener('touchend', function() { if (dragging) { dragging = false; startSpin(); } });
  window.addEventListener('touchmove', function(e) {
    if (!dragging) return;
    rotY += (e.touches[0].clientX - prev.x) * 0.013;
    rotX += (e.touches[0].clientY - prev.y) * 0.013;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // ── Animate ─────────────────────────────────────────
  var tick = 0;

  function animate() {
    requestAnimationFrame(animate);
    tick += 0.04;

    if (autoSpin) rotY += 0.008;
    dog.rotation.y = rotY;
    dog.rotation.x = rotX;

    // Ball bounce
    ballGroup.position.y = 2.0 + Math.abs(Math.sin(tick * 1.2)) * 0.7;
    ball.rotation.z = tick * 0.4;

    // Subtle wag
    dog.rotation.z = Math.sin(tick * 3) * 0.022;

    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('three-ready', initBball);
window.addEventListener('load', function() {
  if (typeof THREE !== 'undefined') initBball();
});
