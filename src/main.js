import {
  CubeTextureLoader,
  MeshStandardMaterial,
  Scene,
  AmbientLight,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function debounce(callback, wait) {
  let to = null;
  return (...args) => {
    clearTimeout(to);
    to = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

async function ferris() {
  // Canvas
  const canvas = document.querySelector('.hero__canvas canvas');

  // Loaders
  const textureLoader = new CubeTextureLoader();
  const meshLoader = new GLTFLoader();

  const meshPromise = meshLoader.loadAsync('/three/ferris.glb');
  const texturePromise = textureLoader.loadAsync([
    '/three/px.webp',
    '/three/nx.webp',
    '/three/py.webp',
    '/three/ny.webp',
    '/three/pz.webp',
    '/three/nz.webp',
  ]);

  const [envMap, mesh] = await Promise.all([texturePromise, meshPromise]);

  // Material
  const material = new MeshStandardMaterial({
    color: 0xcee7f5,
    roughness: 0,
    metalness: 1,
    envMap,
    envMapIntensity: 1,
  });

  // Build scene
  const scale = 2.8;
  const scene = new Scene();
  const model = mesh.scene;
  const ferris = mesh.scene.children[0];

  ferris.scale.set(scale, scale, scale);
  ferris.position.x = 0;
  ferris.position.y = -0.4;
  ferris.rotation.set(0, 0, 0);
  ferris.material = material;

  ferris.children.forEach((element) => {
    element.material = material;
    model.name = model;
    ferris.name = ferris;
  });

  scene.add(ferris);

  const sizes = {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
  };

  // Light
  const ambientLight = new AmbientLight(0xffffff, 1);

  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(0xffffff, 1);

  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  window.addEventListener(
    'resize',
    debounce(() => {
      if (canvas.offsetWidth <= 0) {
        return;
      }

      // Update sizes
      sizes.width = canvas.parentNode.offsetWidth;
      sizes.height = canvas.parentNode.offsetWidth;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }),
    100
  );

  // Base camera
  const cameraGroup = new Group();
  scene.add(cameraGroup);

  // Base camera
  const camera = new PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);

  camera.position.z = 6;
  cameraGroup.add(camera);

  /**
   * Renderer
   */
  const renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new Clock();
  const q = 1.5;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Animate meshes
    camera.position.x = Math.cos(elapsedTime) * q;
    camera.position.y = Math.sin(elapsedTime) * q;
    camera.lookAt(model.position);

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

ferris();
