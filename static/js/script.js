import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Canvas
const canvas = document.querySelector("canvas.canvas__hero");

// Scene
const scene = new THREE.Scene();

const material = new THREE.MeshNormalMaterial();

const sizes = {
  width: document.getElementById("hero").offsetWidth,
  height: document.getElementById("hero").offsetHeight,
};
/**
 * Models
 */
const objectsDistance = 4;

const gltfLoader = new GLTFLoader();
let model = new THREE.Object3D();
let ferris = new THREE.Object3D();

gltfLoader.load("/js/model/ferris.glb", (gltf) => {
  model = gltf.scene;
  ferris = gltf.scene.children[0];
  ferris.scale.set(1.5, 1.5, 1.5);
  ferris.position.x = -1.25;
  ferris.position.y = -1;
  ferris.rotation.set(0, 0, 0);
  ferris.material = material;
  ferris.children.forEach((element) => {
    element.material = material;
    model.name = model;
    ferris.name = ferris;
  });
  scene.add(gltf.scene.children[0]);
});

// Objects

const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

window.addEventListener("resize", () => {
  // Update sizes
  (sizes.width = document.getElementById("hero").offsetWidth),
    (sizes.height = document.getElementById("hero").offsetHeight);

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.round(scrollY / sizes.height);

  if (newSection != currentSection) {
    currentSection = newSection;
  }
});
/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Animate meshes

  camera.position.x = Math.cos(elapsedTime)
  camera.position.y = Math.sin(elapsedTime)

  camera.lookAt(model.position)

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
