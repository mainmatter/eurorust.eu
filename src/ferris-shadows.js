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


export function createContactShadow(renderer, scene, platform, radius, height, modelHeight) {
  const resolution = 1024;
  const target = new WebGLRenderTarget(resolution, resolution);
  const intermediate = new WebGLRenderTarget(resolution, resolution);
  const depth = new MeshDepthMaterial({ side: DoubleSide, blending: NoBlending });
  depth.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      'gl_FragColor = vec4( vec3( 0.0 ), exp( -fragCoordZ * 9.0 ) );'
    );
  };
  const camera = new OrthographicCamera(-radius, radius, radius, -radius, 0, modelHeight * 1.1);
  camera.position.set(0, height + 0.001, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, height + 1, 0);

  const previousTarget = renderer.getRenderTarget();
  const previousOverride = scene.overrideMaterial;
  const previousShadows = renderer.shadowMap.enabled;
  platform.visible = false;
  renderer.shadowMap.enabled = false;
  scene.overrideMaterial = depth;
  renderer.setRenderTarget(target);
  renderer.clear();
  renderer.render(scene, camera);
  scene.overrideMaterial = previousOverride;
  platform.visible = true;
  renderer.shadowMap.enabled = previousShadows;

  const blurScene = new Scene();
  const blurCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 2);
  blurCamera.position.z = 1;
  const horizontal = new ShaderMaterial(HorizontalBlurShader);
  const vertical = new ShaderMaterial(VerticalBlurShader);
  horizontal.depthTest = vertical.depthTest = false;
  const quad = new Mesh(new PlaneGeometry(2, 2), horizontal);
  blurScene.add(quad);
  for (const spread of [2.5, 1.25]) {
    quad.material = horizontal;
    horizontal.uniforms.tDiffuse.value = target.texture;
    horizontal.uniforms.h.value = spread / resolution;
    renderer.setRenderTarget(intermediate);
    renderer.render(blurScene, blurCamera);
    quad.material = vertical;
    vertical.uniforms.tDiffuse.value = intermediate.texture;
    vertical.uniforms.v.value = spread / resolution;
    renderer.setRenderTarget(target);
    renderer.render(blurScene, blurCamera);
  }
  renderer.setRenderTarget(previousTarget);
  intermediate.dispose();
  depth.dispose();
  horizontal.dispose();
  vertical.dispose();
  quad.geometry.dispose();

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
  shadow.position.y = height + 0.002;
  shadow.renderOrder = 1;
  scene.add(shadow);
  return shadow;
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
