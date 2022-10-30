import * as THREE from "three";
import { Snowman } from "../mesh-complex-objects/Snowman";
import { degreesToRadians } from "../utils/degreesToRadians";

export class SceneWithLantern extends THREE.Group {
  constructor(materialCreator) {
    super();

    this.materialCreator = materialCreator;
    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
  }


  addSnowman() {
    const snowman = new Snowman(this.materialCreator);
    snowman.rotateY(degreesToRadians(45));
    snowman.position.set(-400, 0, 0);

    this.add(snowman);
  }
}
