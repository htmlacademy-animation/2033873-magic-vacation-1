import * as THREE from "three";
import {  OBJECT_ELEMENTS, MATERIAL_TYPE } from "../../../constants";
import { MaterialCreator } from "../../creators/MaterialCreator";
import { PageScene } from "../PageScene";
import {RoomsScene} from './RoomScene';

export class RoomsPageScene extends PageScene {
  constructor(materialCreator, extrudeSvgCreator, objectCreator, transformationGuiHelper) {
    super(materialCreator, extrudeSvgCreator, objectCreator, transformationGuiHelper);

    this.meshObjects = [
      {
        name: OBJECT_ELEMENTS.wallCorner,
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.Purple,
          side: THREE.DoubleSide,
        }),
      },
      {
        name: OBJECT_ELEMENTS.wallCorner,
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: 0,
          rotateY: Math.PI / 2,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
          color: MaterialCreator.Colors.Blue,
          side: THREE.DoubleSide,
        }),
      },
      {
        name: OBJECT_ELEMENTS.wallCorner,
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: 0,
          rotateY: Math.PI,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.SkyLightBlue,
          side: THREE.DoubleSide,
        }),
      },
      {
        name: OBJECT_ELEMENTS.wallCorner,
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: 0,
          rotateY: (Math.PI * 3) / 2,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
          color: MaterialCreator.Colors.ShadowedPurple,
          side: THREE.DoubleSide,
        }),
      },
    ];

    this.floors = [
      {
        name: "floor - 1",
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: -Math.PI / 2,
          rotateY: 0,
          rotateZ: -Math.PI / 2,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.DarkPurple,
        }),
      },
      {
        name: "floor - 2",
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: -Math.PI / 2,
          rotateY: 0,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.BrightBlue,
        }),
      },
      {
        name: "floor - 3",
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: -Math.PI / 2,
          rotateY: 0,
          rotateZ: Math.PI / 2,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.MountainBlue,
        }),
      },
      {
        name: "floor - 4",
        transform: {
          transformX: 0,
          transformY: 0,
          transformZ: 0,

          rotateX: -Math.PI / 2,
          rotateY: 0,
          rotateZ: Math.PI,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.ShadowedDarkPurple,
        }),
      },
    ];

    this.constructChildren();
  }

  constructChildren() {
    this.add(new RoomsScene())

    // this.addObjectsMesh(...this.meshObjects);
    // this.addFloors();
  }

  addFloors() {
    const geometry = new THREE.CircleGeometry(1350, 32, 0, Math.PI / 2);

    this.floors.forEach((floor) => {
      const mesh = new THREE.Mesh(geometry, floor.material);

      this.transformationGuiHelper.addNewFolder(floor.name, mesh, floor.transform);

      this.setTransformParams(mesh, floor.transform);

      this.add(mesh);
    });
  }
}
