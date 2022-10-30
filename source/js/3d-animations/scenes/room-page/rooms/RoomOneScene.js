import { RoomScene } from "../RoomScene";
import * as THREE from "three";
import { MATERIAL_TYPE, OBJECT_ELEMENTS } from "../../../../constants";
import { MaterialCreator } from "../../../creators/MaterialCreator";

export class RoomOneScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.Purple,
          side: THREE.DoubleSide,
        }
      ),
    };
    this.floor = {
      name: OBJECT_ELEMENTS.floor,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.DarkPurple,
        }
      ),
    };

    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput1,
    }

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();
  }
}
