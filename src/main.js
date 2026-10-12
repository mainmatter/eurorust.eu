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
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createContactShadow, createGroundShadow } from './ferris-shadows';
import { initShapeDrift } from './shape-drift';
import { addRaisedPlatformLogo } from './platform-lettering';

initShapeDrift();

async function initFerris() {
  const canvas = document.querySelector('.hero__canvas canvas');
  if (!canvas) return;

  const model = await new GLTFLoader().loadAsync('/three/ferris.glb');
  const scene = new Scene();
  const ferris = model.scene.children[0];
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

  const bounds = new Box3().setFromObject(ferris);
  const size = bounds.getSize(new Vector3());
  const radius = Math.max(size.x, size.z) * 0.58;
  const height = radius * 0.4;
  const bevel = height * 0.06;
  // Enlarge Ferris independently of the pedestal and keep his feet seated.
  ferris.scale.multiplyScalar(1.12);
  bounds.setFromObject(ferris);
  bounds.getSize(size);
  const center = bounds.getCenter(new Vector3());
  ferris.position.set(-center.x, height - bounds.min.y, -center.z + radius * 0.1);

  // A rounded profile gives the blue pedestal a narrow, smooth rim.
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
  light.castShadow = true;
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

  const contactShadow = createContactShadow(renderer, scene, platform, radius, height, size.y);
  scene.add(createGroundShadow(radius));

  await addRaisedPlatformLogo(platform, radius, height);

  const framing = new Box3().setFromObject(ferris).union(new Box3().setFromObject(platform));
  const sphere = framing.getBoundingSphere(new Sphere());
  const display = new Group();
  display.position.copy(sphere.center);
  scene.add(display);
  display.attach(ferris);
  display.attach(platform);
  display.attach(contactShadow);
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  // Keep the camera fixed while Ferris and the platform rotate together.
  const render = () => {
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
      sphere.center.y + Math.sin(0.18) * distance,
      sphere.center.z + Math.cos(0.18) * distance
    );
    camera.lookAt(sphere.center);
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
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

  const animate = (time) => {
    const delta = previousTime === undefined ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    // Critically damped motion eases both speed and direction changes.
    const offset = display.rotation.y - targetRotation;
    const decay = Math.exp(-responsiveness * delta);
    const movement = (angularVelocity + responsiveness * offset) * delta;
    const rotation = targetRotation + (offset + movement) * decay;
    angularVelocity = (angularVelocity - responsiveness * movement) * decay;
    display.rotation.y = Math.max(-maxRotation, Math.min(maxRotation, rotation));
    if (display.rotation.y !== rotation) angularVelocity = 0;
    if (Math.abs(targetRotation - display.rotation.y) < 0.0001 && Math.abs(angularVelocity) < 0.001) {
      display.rotation.y = targetRotation;
      angularVelocity = 0;
      animationFrame = undefined;
      previousTime = undefined;
    } else {
      animationFrame = requestAnimationFrame(animate);
    }
    renderer.render(scene, camera);
  };

  const rotateTo = (angle) => {
    targetRotation = reducedMotion.matches ? 0 : angle;
    if (animationFrame === undefined) animationFrame = requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || reducedMotion.matches) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width) return;
    const position = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    rotateTo(position * maxRotation);
  });
  document.documentElement.addEventListener('pointerleave', () => rotateTo(0));
  window.addEventListener('blur', () => rotateTo(0));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      cancelAnimationFrame(animationFrame);
      animationFrame = undefined;
      previousTime = undefined;
      targetRotation = 0;
      angularVelocity = 0;
      display.rotation.y = 0;
      renderer.render(scene, camera);
    }
  });
}

initFerris().catch((error) => {
  console.error('Unable to display Ferris:', error);
});
