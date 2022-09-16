import * as THREE from "three";
import { Lantern } from "../mesh-complex-objects/Lantern";

export class SceneWithLantern extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = this.getDefaultMaterial();
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid() {
    const pyramid = new THREE.Mesh(
      new THREE.ConeGeometry(250 / Math.pow(2, 0.5), 280, 4),
      this.defaultMaterial
    );

    pyramid.position.set(0, 140, 0);

    this.add(pyramid);
  }

  addLantern() {
    const lantern = new Lantern(this.defaultMaterial);
    lantern.position.set(400, 0, 0);

    this.add(lantern);
  }

  getDefaultMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x0020d5,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5,
    });
  }
}
