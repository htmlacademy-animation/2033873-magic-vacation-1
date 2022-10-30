import { RoomScene } from "../RoomScene";
import * as THREE from "three";
import { MATERIAL_TYPE, OBJECT_ELEMENTS } from "../../../../constants";
import { MaterialCreator } from "../../../creators/MaterialCreator";

export class RoomFourScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.BasicMaterial,
        {
          color: MaterialCreator.Colors.ShadowedPurple,
          side: THREE.DoubleSide,
        }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.ShadowedDarkPurple,
        }
      ),
    };

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();
  }
}
