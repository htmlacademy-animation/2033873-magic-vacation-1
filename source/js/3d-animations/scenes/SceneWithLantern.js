import * as THREE from "three";
import { Lantern } from "../mesh-complex-objects/Lantern";

export class SceneWithLantern extends THREE.Group {
  constructor() {
    super();

    this.defaultMaterial = this.getDefaultMaterial();
    this.constructChildren();
  }

  constructChildren() {
    this.addLantern();
  }

  addLantern() {
    const lantern = new Lantern(this.defaultMaterial);
    // lantern.position.set(395, 190, -90);
    this.add(lantern);
  }

  getDefaultMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x0020D5,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5,
    });
  }
}
