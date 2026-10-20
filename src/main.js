import {
  Scene,
  Group,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  LatheGeometry,
  Vector2,
  Vector3,
  Box3,
  Sphere,
  PMREMGenerator,
  VSMShadowMap,
  ACESFilmicToneMapping,
  AnimationMixer,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createContactShadow, createGroundShadow } from './ferris-shadows';
import { initShapeDrift } from './shape-drift';
import { addRaisedPlatformLogo } from './platform-lettering';

initShapeDrift();

function showFerrisFallback() {
  const hero = document.querySelector('.hero__canvas');
  if (hero) hero.dataset.ferrisState = 'fallback';
}

async function initFerris() {
  const canvas = document.querySelector('.hero__canvas canvas');
  if (!canvas) return;
  const touchPointer = window.matchMedia('(hover: none) and (pointer: coarse)');
  const usingFallback = () => canvas.parentElement.dataset.ferrisState === 'fallback';
  canvas.addEventListener('webglcontextlost', showFerrisFallback, { once: true });

  const model = await new GLTFLoader().loadAsync('/three/ferris_joyful.glb');
  if (usingFallback()) return;
  const scene = new Scene();
  const ferris = model.scene;
  const material = new MeshPhysicalMaterial({
    color: 0xdd331d,
    metalness: 0,
    roughness: 0.32,
    clearcoat: 0.65,
    clearcoatRoughness: 0.25,
  });
  ferris.scale.setScalar(2.8);
  ferris.position.set(0, 0, 0);
  ferris.rotation.set(0, 0, 0);
  ferris.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(ferris);
  const mixer = new AnimationMixer(ferris);
  model.animations.forEach((clip) => mixer.clipAction(clip).play());
  mixer.setTime(0);

  // The exported leg rig has oversized bounds. Size the platform from visible body meshes.
  const visualBounds = new Box3();
  const measureBody = () => {
    ferris.updateWorldMatrix(true, true);
    visualBounds.makeEmpty();
    ferris.traverse((child) => {
      if (child.isMesh && !child.isSkinnedMesh) visualBounds.expandByObject(child, true);
    });
  };
  measureBody();
  const bounds = new Box3().setFromObject(ferris, true);
  const size = bounds.getSize(new Vector3());
  const bodySize = visualBounds.getSize(new Vector3());
  const radius = Math.max(bodySize.x, bodySize.z) * 0.58;
  const height = radius * 0.4;
  const bevel = height * 0.06;
  ferris.scale.multiplyScalar(1.12);
  bounds.setFromObject(ferris, true);
  bounds.getSize(size);
  const center = bounds.getCenter(new Vector3());
  ferris.position.set(-center.x, height - bounds.min.y + radius * 0.025, -center.z - radius * 0.1);

  const profile = [new Vector2(0, 0), new Vector2(radius - bevel, 0)];
  for (let i = 1; i <= 8; i++) {
    const angle = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
    profile.push(new Vector2(radius - bevel + Math.cos(angle) * bevel, bevel + Math.sin(angle) * bevel));
  }
  profile.push(new Vector2(radius, height - bevel));
  for (let i = 1; i <= 8; i++) {
    const angle = (i / 8) * (Math.PI / 2);
    profile.push(new Vector2(radius - bevel + Math.cos(angle) * bevel, height - bevel + Math.sin(angle) * bevel));
  }
  profile.push(new Vector2(0, height));
  const platform = new Mesh(
    new LatheGeometry(profile, 96),
    new MeshStandardMaterial({ color: 0x114b9a, roughness: 0.32, metalness: 0 })
  );
  platform.receiveShadow = true;
  scene.add(platform);

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;
  const room = new RoomEnvironment();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.1);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.5;
  room.dispose();
  pmrem.dispose();

  const light = new DirectionalLight(0xffffff, 0.8);
  light.position.set(-radius * 2, size.y * 2 + height, radius * 3);
  // The soft contact shadow is enough on touch devices; VSM flickers on some mobile GPUs.
  light.castShadow = !touchPointer.matches;
  light.shadow.mapSize.set(1024, 1024);
  light.shadow.radius = 24;
  light.shadow.blurSamples = 32;
  light.shadow.intensity = 0.4;
  light.shadow.camera.left = -radius * 2;
  light.shadow.camera.right = radius * 2;
  light.shadow.camera.top = size.y + height;
  light.shadow.camera.bottom = -size.y - height;
  light.shadow.camera.far = light.position.length() + size.y + radius * 2;
  light.shadow.normalBias = 0.015;
  scene.add(light);

  scene.add(createGroundShadow(radius));

  await addRaisedPlatformLogo(platform, radius, height);
  if (usingFallback()) {
    renderer.dispose();
    return;
  }

  measureBody();
  const framing = visualBounds.union(new Box3().setFromObject(platform));
  const sphere = framing.getBoundingSphere(new Sphere());
  const display = new Group();
  display.position.copy(sphere.center);
  scene.add(display);
  display.attach(ferris);
  display.attach(platform);
  const updateContactShadow = createContactShadow(renderer, scene, display, ferris, platform, radius, height, size.y);
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  const renderFrame = (time) => {
    if (usingFallback()) return;
    try {
      if (renderer.getContext().isContextLost()) throw new Error('WebGL context lost');
      updateContactShadow(time);
      renderer.render(scene, camera);
      canvas.parentElement.dataset.ferrisState = 'ready';
    } catch (error) {
      showFerrisFallback();
      console.error('Unable to render Ferris:', error);
    }
  };

  // Keep the camera fixed while Ferris and the platform rotate together.
  const render = () => {
    if (usingFallback()) return;
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    const verticalFov = (camera.fov * Math.PI) / 180;
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
    const distance = (sphere.radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2)) * 0.82;
    camera.far = distance + sphere.radius * 4;
    camera.position.set(
      sphere.center.x,
      sphere.center.y + Math.sin(0.1) * distance,
      sphere.center.z + Math.cos(0.1) * distance
    );
    camera.lookAt(sphere.center.x, sphere.center.y + sphere.radius * 0.08, sphere.center.z);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderFrame();
  };
  new ResizeObserver(render).observe(canvas.parentElement);
  render();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const maxRotation = (45 * Math.PI) / 180;
  const responsiveness = 12;
  let angularVelocity = 0;
  let targetRotation = 0;
  let previousTime;
  let animationFrame;
  let inView = true;
  let driftElapsed = 0;
  let driftDuration = 0;
  let driftFrom = 0;
  let driftTo = 0;
  let driftDirection = Math.random() < 0.5 ? -1 : 1;
  const autoRotate = () => touchPointer.matches && !reducedMotion.matches;

  const animate = (time) => {
    if (usingFallback() || document.hidden || !inView || reducedMotion.matches) {
      animationFrame = undefined;
      return;
    }
    const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    mixer.update(delta);
    if (autoRotate()) {
      if (driftElapsed >= driftDuration) {
        driftFrom = targetRotation;
        driftTo = driftDirection * (((12 + Math.random() * 14) * Math.PI) / 180);
        driftDirection *= -1;
        driftDuration = 3 + Math.random() * 2;
        driftElapsed = 0;
      }
      driftElapsed = Math.min(driftElapsed + delta, driftDuration);
      const progress = driftElapsed / driftDuration;
      // Ease each turn with zero velocity and acceleration at both ends.
      const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10);
      targetRotation = driftFrom + (driftTo - driftFrom) * eased;
    }
    const offset = display.rotation.y - targetRotation;
    const decay = Math.exp(-responsiveness * delta);
    const movement = (angularVelocity + responsiveness * offset) * delta;
    const rotation = targetRotation + (offset + movement) * decay;
    angularVelocity = (angularVelocity - responsiveness * movement) * decay;
    display.rotation.y = Math.max(-maxRotation, Math.min(maxRotation, rotation));
    if (display.rotation.y !== rotation) angularVelocity = 0;
    if (
      !autoRotate() &&
      !model.animations.length &&
      Math.abs(targetRotation - display.rotation.y) < 0.0001 &&
      Math.abs(angularVelocity) < 0.001
    ) {
      display.rotation.y = targetRotation;
      angularVelocity = 0;
      animationFrame = undefined;
      previousTime = undefined;
    } else {
      animationFrame = requestAnimationFrame(animate);
    }
    renderFrame(time);
  };

  const rotateTo = (angle) => {
    if (usingFallback() || document.hidden || !inView || autoRotate()) return;
    targetRotation = reducedMotion.matches ? 0 : angle;
    if (animationFrame === undefined) animationFrame = requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || touchPointer.matches || reducedMotion.matches) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width) return;
    const position = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    rotateTo(position * maxRotation);
  });
  document.documentElement.addEventListener('pointerleave', () => rotateTo(0));
  window.addEventListener('blur', () => rotateTo(0));
  const updateMotion = () => {
    light.castShadow = !touchPointer.matches;
    cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
    previousTime = undefined;
    angularVelocity = 0;
    targetRotation = display.rotation.y;
    driftDuration = 0;
    if (reducedMotion.matches) {
      mixer.setTime(0);
      targetRotation = 0;
      display.rotation.y = 0;
      renderFrame();
    } else if (!document.hidden && inView && !usingFallback()) {
      animationFrame = requestAnimationFrame(animate);
    }
  };
  reducedMotion.addEventListener('change', updateMotion);
  touchPointer.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateMotion();
  }).observe(canvas.parentElement);
  updateMotion();
}

function loadFerrisWhenIdle() {
  const load = () => {
    initFerris().catch((error) => {
      showFerrisFallback();
      console.error('Unable to display Ferris:', error);
    });
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(load, { timeout: 2000 });
  } else {
    window.setTimeout(load, 0);
  }
}

if (document.readyState === 'complete') {
  loadFerrisWhenIdle();
} else {
  window.addEventListener('load', loadFerrisWhenIdle, { once: true });
}
