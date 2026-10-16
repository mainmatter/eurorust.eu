import { ExtrudeGeometry, Group, Mesh } from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { TessellateModifier } from 'three/addons/modifiers/TessellateModifier.js';

export async function addRaisedPlatformLogo(platform, radius, height) {
  const logo = await new SVGLoader().loadAsync('/images/EuroRust2027_logo_horizontal.svg');
  const logoScale = (radius * 1.35) / 529.33;
  const platformLogo = new Group();
  const tessellate = new TessellateModifier(8, 6);
  for (const path of logo.paths) {
    for (const shape of SVGLoader.createShapes(path)) {
      const extruded = new ExtrudeGeometry(shape, {
        depth: 3,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.8,
        bevelSegments: 3,
        curveSegments: 10,
        steps: 1,
      });
      const geometry = tessellate.modify(extruded);
      extruded.dispose();
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const angle = ((positions.getX(i) - 529.33 / 2) * logoScale) / radius;
        const distance = radius + (positions.getZ(i) + 0.4) * logoScale;
        const y = height * 0.5 - (positions.getY(i) - 90.06 / 2) * logoScale;
        positions.setXYZ(i, Math.sin(angle) * distance, y, Math.cos(angle) * distance);
      }

      for (let i = 0; i < positions.count; i += 3) {
        const x = positions.getX(i + 1);
        const y = positions.getY(i + 1);
        const z = positions.getZ(i + 1);
        positions.setXYZ(i + 1, positions.getX(i + 2), positions.getY(i + 2), positions.getZ(i + 2));
        positions.setXYZ(i + 2, x, y, z);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.computeBoundingSphere();
      const lettering = new Mesh(geometry, platform.material);
      lettering.castShadow = true;
      lettering.receiveShadow = true;
      platformLogo.add(lettering);
    }
  }
  platform.add(platformLogo);
}
