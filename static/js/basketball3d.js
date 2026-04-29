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

  var camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
  camera.position.set(0, 7, 26);
  camera.lookAt(0, 7, 0);

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  var sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(5, 12, 8);
  scene.add(sun);
  var fill = new THREE.DirectionalLight(0xffeedd, 0.3);
  fill.position.set(-4, 2, -5);
  scene.add(fill);

  // ── Colors ──────────────────────────────────────────
  var GOLD   = 0xE8B84B;  // lab golden
  var DGOLD  = 0xC49020;  // darker golden (ears, snout shade)
  var CREAM  = 0xF5DFA0;  // lighter chest / muzzle
  var BNOSE  = 0x1A1A1A;  // black nose / eyes
  var PINK   = 0xFF9999;  // tongue
  var BLACK  = 0x111111;  // jersey
  var SILVER = 0x999999;  // jersey trim
  var WHITE  = 0xEEEEEE;  // eye whites
  var ORANGE = 0xE8701A;  // basketball
  var SEAM   = 0x7A2E00;  // ball seams

  // ── Voxel helper ────────────────────────────────────
  var matCache = {};
  function mat(c) {
    if (!matCache[c]) matCache[c] = new THREE.MeshLambertMaterial({ color: c });
    return matCache[c];
  }
  function b(group, x, y, z, w, h, d, color) {
    var mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w - 0.07, h - 0.07, d - 0.07),
      mat(color)
    );
    mesh.position.set(x, y, z);
    group.add(mesh);
  }

  var dog = new THREE.Group();

  // ── Back legs ───────────────────────────────────────
  b(dog, -1.1, 2.2, 0,   1.3, 3.8, 1.3, GOLD);   // left rear leg
  b(dog,  1.1, 2.2, 0,   1.3, 3.8, 1.3, GOLD);   // right rear leg
  // Paws
  b(dog, -1.2, 0.4, 0.3, 1.5, 0.8, 1.8, DGOLD);
  b(dog,  1.2, 0.4, 0.3, 1.5, 0.8, 1.8, DGOLD);

  // ── Body / jersey ────────────────────────────────────
  b(dog,  0, 7.0, 0,   3.6, 5.5, 2.4, BLACK);    // main torso
  // Golden chest peeking out top & sides
  b(dog,  0, 9.0, 1.25, 2.0, 1.5, 0.1, CREAM);
  b(dog, -1.9, 7.0, 0,  0.2, 5.0, 2.2, GOLD);
  b(dog,  1.9, 7.0, 0,  0.2, 5.0, 2.2, GOLD);
  // Jersey silver trim lines
  b(dog, -1.7, 7.0, 1.22, 0.1, 4.5, 0.08, SILVER);
  b(dog,  1.7, 7.0, 1.22, 0.1, 4.5, 0.08, SILVER);
  // Star on jersey
  b(dog,  0, 7.8, 1.22, 0.9, 0.9, 0.08, SILVER);
  b(dog,  0, 7.8, 1.22, 0.2, 2.0, 0.08, SILVER);

  // ── Tail ────────────────────────────────────────────
  b(dog, -0.1, 9.6, -1.5, 0.9, 0.9, 1.2, GOLD);
  b(dog, -0.1, 10.4,-2.3, 0.8, 0.8, 0.8, GOLD);

  // ── Front arms ──────────────────────────────────────
  // Left arm (relaxed down)
  b(dog, -2.2, 7.5, 0,   1.3, 2.2, 1.2, GOLD);
  b(dog, -2.3, 5.5, 0.3, 1.2, 1.5, 1.3, GOLD);   // forearm
  b(dog, -2.4, 4.2, 0.5, 1.3, 1.0, 1.5, DGOLD);  // paw

  // Right arm (forward, holding ball)
  b(dog,  2.2, 7.0, 0,   1.3, 2.2, 1.2, GOLD);
  b(dog,  2.6, 5.2, 0.8, 1.2, 1.8, 1.3, GOLD);
  b(dog,  2.8, 3.6, 1.4, 1.3, 1.0, 1.5, DGOLD);  // paw near ball

  // ── Neck ────────────────────────────────────────────
  b(dog,  0, 10.0, 0,   2.0, 1.2, 1.8, GOLD);

  // ── Head ────────────────────────────────────────────
  b(dog,  0, 12.8, 0,   4.2, 3.6, 3.8, GOLD);    // main head

  // Floppy ears (hang on sides)
  b(dog, -2.4, 11.8,-0.2, 1.0, 3.5, 2.8, DGOLD); // left ear
  b(dog,  2.4, 11.8,-0.2, 1.0, 3.5, 2.8, DGOLD); // right ear

  // Muzzle / snout
  b(dog,  0, 11.6, 2.0,  2.6, 2.0, 1.2, CREAM);

  // Nose
  b(dog,  0, 12.5, 2.65, 1.3, 0.8, 0.2, BNOSE);

  // Eyes (whites + pupils)
  b(dog, -1.2, 13.4, 1.95, 0.9, 0.9, 0.2, WHITE);
  b(dog,  1.2, 13.4, 1.95, 0.9, 0.9, 0.2, WHITE);
  b(dog, -1.2, 13.4, 2.08, 0.5, 0.5, 0.1, BNOSE);
  b(dog,  1.2, 13.4, 2.08, 0.5, 0.5, 0.1, BNOSE);
  // Eye shine (cute!)
  b(dog, -1.0, 13.6, 2.12, 0.18, 0.18, 0.08, 0xffffff);
  b(dog,  1.4, 13.6, 2.12, 0.18, 0.18, 0.08, 0xffffff);

  // Eyebrows (tilted = happy face)
  b(dog, -1.2, 14.1, 1.96, 1.1, 0.22, 0.12, DGOLD);
  b(dog,  1.2, 14.1, 1.96, 1.1, 0.22, 0.12, DGOLD);

  // Tongue (sticking out, cute!)
  b(dog, -0.3, 11.0, 2.68, 1.0, 0.6, 0.2, PINK);
  b(dog, -0.3, 10.3, 2.60, 1.0, 0.8, 0.3, PINK);

  // ── Basketball ──────────────────────────────────────
  var ballGroup = new THREE.Group();
  ballGroup.position.set(3.4, 2.5, 2.2);

  var ball = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 24, 24),
    mat(ORANGE)
  );
  ballGroup.add(ball);

  // Seams
  var seamMat = new THREE.LineBasicMaterial({ color: SEAM });
  function seam(rotY) {
    var pts = [];
    for (var i = 0; i <= 48; i++) {
      var t = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * 1.12, Math.sin(t) * 0.38, Math.sin(t) * 1.12));
    }
    var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), seamMat);
    line.rotation.y = rotY;
    ballGroup.add(line);
  }
  seam(0); seam(Math.PI / 2);
  var eq = [];
  for (var i = 0; i <= 48; i++) {
    var t2 = (i / 48) * Math.PI * 2;
    eq.push(new THREE.Vector3(Math.cos(t2) * 1.12, Math.sin(t2) * 1.12, 0));
  }
  ballGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(eq), seamMat));

  dog.add(ballGroup);
  dog.position.y = -7;
  scene.add(dog);

  // ── Resize ──────────────────────────────────────────
  window.addEventListener('resize', function() {
    W = Math.min(window.innerWidth - 32, 380);
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  });

  // ── Drag interaction ─────────────────────────────────
  var dragging = false;
  var autoSpin = true;
  var rotY = 0.4, rotX = 0.1;
  var prev = { x: 0, y: 0 };
  var spinTimer;

  function stopSpin() { autoSpin = false; clearTimeout(spinTimer); }
  function startSpin() { spinTimer = setTimeout(function() { autoSpin = true; }, 2500); }

  canvas.addEventListener('mousedown',  function(e) { dragging = true; stopSpin(); prev = { x: e.clientX, y: e.clientY }; e.preventDefault(); });
  window.addEventListener('mouseup',    function() { if(dragging){ dragging = false; startSpin(); } });
  window.addEventListener('mousemove',  function(e) {
    if (!dragging) return;
    rotY += (e.clientX - prev.x) * 0.013;
    rotX += (e.clientY - prev.y) * 0.013;
    rotX = Math.max(-0.7, Math.min(0.7, rotX));
    prev = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('touchstart', function(e) { dragging = true; stopSpin(); prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
  window.addEventListener('touchend',   function() { if(dragging){ dragging = false; startSpin(); } });
  window.addEventListener('touchmove',  function(e) {
    if (!dragging) return;
    rotY += (e.touches[0].clientX - prev.x) * 0.013;
    rotX += (e.touches[0].clientY - prev.y) * 0.013;
    rotX = Math.max(-0.7, Math.min(0.7, rotX));
    prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // ── Animate ──────────────────────────────────────────
  var tick = 0;
  var tailAngle = 0;

  function animate() {
    requestAnimationFrame(animate);
    tick += 0.04;

    // Auto spin
    if (autoSpin) rotY += 0.008;
    dog.rotation.y = rotY;
    dog.rotation.x = rotX;

    // Ball bounce
    ballGroup.position.y = 2.5 + Math.abs(Math.sin(tick * 1.2)) * 0.6;
    ball.rotation.z = tick * 0.4;

    // Tail wag (find tail by index — the tail blocks are indices 3 & 4 in dog children)
    tailAngle = Math.sin(tick * 3) * 0.35;
    // wag the whole dog group slightly for cute effect
    dog.rotation.z = Math.sin(tick * 3) * 0.02;

    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('three-ready', initBball);
window.addEventListener('load', function() {
  if (typeof THREE !== 'undefined') initBball();
});
