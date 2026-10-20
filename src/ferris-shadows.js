import {
  CircleGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  NoBlending,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderTarget,
} from 'three';
import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/addons/shaders/VerticalBlurShader.js';

export function createContactShadow(renderer, scene, display, ferris, platform, radius, height, modelHeight) {
  const resolution = 512;
  const target = new WebGLRenderTarget(resolution, resolution);
  const intermediate = new WebGLRenderTarget(resolution, resolution);
  const depth = new MeshDepthMaterial({ side: DoubleSide, blending: NoBlending });
  depth.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      'gl_FragColor = vec4( vec3( 0.0 ), exp( -fragCoordZ * 9.0 ) );'
    );
  };

  // Render only Ferris. The camera and shadow rotate with the platform.
  ferris.traverse((child) => child.layers.enable(1));
  const camera = new OrthographicCamera(-radius, radius, radius, -radius, 0, modelHeight * 1.1);
  camera.layers.set(1);
  camera.position.set(platform.position.x, platform.position.y + height + 0.001, platform.position.z);
  camera.rotation.x = Math.PI / 2;
  display.add(camera);

  const blurScene = new Scene();
  const blurCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 2);
  blurCamera.position.z = 1;
  const horizontal = new ShaderMaterial(HorizontalBlurShader);
  const vertical = new ShaderMaterial(VerticalBlurShader);
  horizontal.depthTest = vertical.depthTest = false;
  const quad = new Mesh(new PlaneGeometry(2, 2), horizontal);
  blurScene.add(quad);

  const shadow = new Mesh(
    new CircleGeometry(radius - height * 0.06, 96),
    new MeshBasicMaterial({
      map: target.texture,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      side: DoubleSide,
      toneMapped: false,
    })
  );
  shadow.rotation.x = Math.PI / 2;
  shadow.position.set(platform.position.x, platform.position.y + height + 0.002, platform.position.z);
  shadow.renderOrder = 1;
  display.add(shadow);

  let lastUpdate = -Infinity;
  const update = (time) => {
    if (time !== undefined && time - lastUpdate < 1000 / 30) return;
    const previousTarget = renderer.getRenderTarget();
    const previousOverride = scene.overrideMaterial;
    const previousShadows = renderer.shadowMap.enabled;
    try {
      renderer.shadowMap.enabled = false;
      scene.overrideMaterial = depth;
      renderer.setRenderTarget(target);
      renderer.clear();
      renderer.render(scene, camera);
      scene.overrideMaterial = previousOverride;

      // One blur pair at half resolution matches the old two-pass softness.
      quad.material = horizontal;
      horizontal.uniforms.tDiffuse.value = target.texture;
      horizontal.uniforms.h.value = 1.4 / resolution;
      renderer.setRenderTarget(intermediate);
      renderer.render(blurScene, blurCamera);
      quad.material = vertical;
      vertical.uniforms.tDiffuse.value = intermediate.texture;
      vertical.uniforms.v.value = 1.4 / resolution;
      renderer.setRenderTarget(target);
      renderer.render(blurScene, blurCamera);
      lastUpdate = time ?? performance.now();
    } finally {
      scene.overrideMaterial = previousOverride;
      renderer.shadowMap.enabled = previousShadows;
      renderer.setRenderTarget(previousTarget);
    }
  };

  return update;
}

export function createGroundShadow(radius) {
  const shadow = new Mesh(
    new PlaneGeometry(radius * 2.4, radius * 2.4),
    new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float distance = length((vUv - 0.5) * 2.0);
          float contact = 1.0 - smoothstep(0.7, 0.9, distance);
          float ambient = 1.0 - smoothstep(0.72, 1.0, distance);
          gl_FragColor = vec4(0.0, 0.0, 0.0, contact * 0.15 + ambient * 0.1);
        }
      `,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.008;
  return shadow;
}
