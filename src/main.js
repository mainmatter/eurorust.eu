import {
  Scene,
  AmbientLight,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  ShaderMaterial,
  Vector3,
  Color,
  DoubleSide,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { observeScroll } from "./scroll";
observeScroll();

import { btnPrimaryAnimation } from "./btn__primary-animation";
btnPrimaryAnimation();

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

  // Load model
  const meshLoader = new GLTFLoader();
  const mesh = await meshLoader.loadAsync('/three/ferris.glb');

  // -----------------------------
  // Shader Material (Gummy Jell-O)
  // -----------------------------
  const material = new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(0xfccc3a) }, // base yellow
      uLightPos: { value: new Vector3(0, 5, 5) },
      uInternalPos: { value: new Vector3(2, 0, 0) },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 vViewDir;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPos = (modelMatrix * vec4(position,1.0)).xyz;
      vViewDir = normalize(cameraPosition - vPos);
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos,1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uLightPos;
    uniform vec3 uInternalPos;

    varying vec3 vNormal;
    varying vec3 vPos;
    varying vec3 vViewDir;

    void main() {
      // Smooth color variation based on world position (x + y)
      float variation = 0.1 * sin(vPos.x * 3.0 + vPos.y * 2.0); // ±15%
      vec3 baseColor = uColor * (1.0 + variation);

      // Fresnel for edges
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), 1.0);
      vec3 edgeGlow = baseColor * fresnel * 0.8;

      // Directional light (external)
      vec3 lightDir = normalize(uLightPos - vPos);
      vec3 halfway = normalize(lightDir + vViewDir);
      float spec = pow(max(dot(vNormal, halfway),0.0),32.0);
      vec3 specular = vec3(1.0) * spec * 0.7;

      // Internal light (distance-based)
      float dist = length(vPos - uInternalPos);
      float internal = 0.5 / (dist*dist + 0.1);
      vec3 internalGlow = baseColor * internal;

      // Combine all
      vec3 color = baseColor*0.8 + edgeGlow + specular + internalGlow;

      gl_FragColor = vec4(color, 0.95);
    }
  `,
    transparent: true,
    side: DoubleSide,
  });

  // -----------------------------
  // Build scene
  // -----------------------------
  const scene = new Scene();
  const model = mesh.scene;
  const ferris = model.children[0];

  ferris.scale.set(2.8, 2.8, 2.8);
  ferris.position.set(0, -0.4, 0);
  ferris.rotation.set(0, 0, 0);

  ferris.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  scene.add(ferris);

  // -----------------------------
  // Lights
  // -----------------------------
  scene.add(new AmbientLight(0xffffff, 0.2));
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 5, 5);
  scene.add(directionalLight);

  // -----------------------------
  // Camera
  // -----------------------------
  const sizes = { width: canvas.offsetWidth, height: canvas.offsetHeight };
  const cameraGroup = new Group();
  scene.add(cameraGroup);

  const camera = new PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 6;
  cameraGroup.add(camera);

  // -----------------------------
  // Renderer
  // -----------------------------
  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener(
    'resize',
    debounce(() => {
      if (canvas.offsetWidth <= 0) return;
      sizes.width = canvas.parentNode.offsetWidth;
      sizes.height = canvas.parentNode.offsetWidth;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }, 100)
  );

  // -----------------------------
  // Animate
  // -----------------------------
  const clock = new Clock();
  const q = 1.5;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    camera.position.x = Math.cos(elapsedTime) * q;
    camera.position.y = Math.sin(elapsedTime) * q;
    camera.lookAt(model.position);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

ferris();
