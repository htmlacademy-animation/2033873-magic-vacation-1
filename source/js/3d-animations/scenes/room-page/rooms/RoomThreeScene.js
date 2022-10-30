import { RoomScene } from "../RoomScene";
import * as THREE from "three";
import { MATERIAL_TYPE, OBJECT_ELEMENTS } from "../../../../constants";
import { MaterialCreator } from "../../../creators/MaterialCreator";
import {Snowman} from '../../../mesh-complex-objects/Snowman';
import {Road} from '../../../mesh-complex-objects/Road';

export class RoomThreeScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.SkyLightBlue,
          side: THREE.DoubleSide,
        }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.MountainBlue,
        }
      ),
    };
    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput3,
    }

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();

    this.addSnowman();
    this.addRoad();
  }

  addSnowman() {
    const snowman = new Snowman(this.pageSceneCreator.materialCreator);
    const transform = {
      transformX: 210,
      transformY: 60,
      transformZ: 400,

      rotateX: 0,
      rotateY: Math.PI / 2,
      rotateZ: 0,

      scale: 1,
    };

    this.pageSceneCreator.transformationGuiHelper.addNewFolder(
      "snowman",
      snowman,
      transform
    );
    this.pageSceneCreator.setTransformParams(snowman, transform);

    this.addObject(snowman);
  }

  addRoad() {
    const road = new Road(this.pageSceneCreator);

    this.addObject(road);
  }
}
