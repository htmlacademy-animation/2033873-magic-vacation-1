import * as THREE from "three";
import { SVG_ELEMENTS, OBJECT_ELEMENTS, MATERIAL_TYPE } from "../../constants";
import { degreesToRadians } from "../utils/degreesToRadians";
import { MaterialCreator } from "../creators/MaterialCreator";
import { Saturn } from "../mesh-complex-objects/Saturn";
import {PageScene} from './PageScene';

export class MainPageScene extends PageScene {
  constructor(materialCreator, extrudeSvgCreator, objectCreator) {
    super(materialCreator, extrudeSvgCreator, objectCreator);

    this.meshExtrudedObjects = [
      {
        name: SVG_ELEMENTS.flamingo,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
            color: MaterialCreator.Colors.LightDominantRed,
          }),
        },
        transform: {
          transformX: -460,
          transformY: 270,
          transformZ: 140,

          rotateX: 6.2,
          rotateY: 0.5,
          rotateZ: 3.6,

          scale: 1,
        },
      },

      {
        name: SVG_ELEMENTS.snowflake,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
            color: MaterialCreator.Colors.Blue,
          }),
        },
        transform: {
          transformX: -320,
          transformY: -20,
          transformZ: 90,

          rotateX: 6.1,
          rotateY: 0.5,
          rotateZ: 0.3,

          scale: 1,
        },
      },
      {
        name: SVG_ELEMENTS.leaf,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
            color: MaterialCreator.Colors.Green,
          }),
        },
        transform: {
          transformX: 500,
          transformY: 290,
          transformZ: 100,

          rotateX: 6.1,
          rotateY: 2.5,
          rotateZ: 4.3,

          scale: 1,
        },
      },
      {
        name: SVG_ELEMENTS.question,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
            color: MaterialCreator.Colors.Blue,
          }),
        },
        transform: {
          transformX: 140,
          transformY: -260,
          transformZ: 50,

          rotateX: 5.7,
          rotateY: 3.2,
          rotateZ: 2.8,

          scale: 1,
        },
      },
    ];

    this.meshObjects = [
      {
        name: OBJECT_ELEMENTS.watermelon,
        transform: {
          transformX: -600,
          transformY: -240,
          transformZ: 200,

          rotateX: 0.3,
          rotateY: 3.3,
          rotateZ: 0.8,

          scale: 1.8,
        },
      },
      {
        name: OBJECT_ELEMENTS.airplane,
        transform: {
          transformX: 190,
          transformY: 120,
          transformZ: 70,

          rotateX: 0.7,
          rotateY: 2.4,
          rotateZ: 0,

          scale: 1,
        },
        material: this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
          color: MaterialCreator.Colors.White,
        }),
      },
      {
        name: OBJECT_ELEMENTS.suitcase,
        transform: {
          transformX: -60,
          transformY: -120,
          transformZ: 120,

          rotateX: 0.5,
          rotateY: 3.8,
          rotateZ: 0.2,

          scale: 0.4,
        },
      },
    ];

    this.constructChildren();
  }

  constructChildren() {
    this.addKeyHoleBackground();

    this.addObjectsMesh(this.meshObjects);
    this.addExtrudedSvgMesh(this.meshExtrudedObjects);

    this.addSaturn();
  }

  addSaturn() {
    const saturn = new Saturn(this.materialCreator, {
      darkMode: false,
      withRope: false,
    });

    const transform = {
      transformX: 350,
      transformY: -120,
      transformZ: 140,

      rotateX: 0,
      rotateY: 3.6,
      rotateZ: 3,

      scale: 0.5,
    };

    this.gui.addNewFolder("saturn", saturn, transform);
    this.setTransformParams(saturn, transform);

    this.add(saturn);
  }

  async addKeyHoleBackground() {
    await this.extrudeSvgCreator.create(
      SVG_ELEMENTS.keyhole,
      {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
          color: MaterialCreator.Colors.DarkPurple,
        }),
      },
      (keyholeMesh) => {
        keyholeMesh.rotateZ(degreesToRadians(180));
        keyholeMesh.position.set(1000, 1000, 0);

        this.add(keyholeMesh);
      }
    );

    const meshBehindTheKeyHole = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400, 2, 2),
      this.materialCreator.create(MATERIAL_TYPE.BasicMaterial, {
        color: MaterialCreator.Colors.Purple,
      })
    );

    meshBehindTheKeyHole.position.set(0, 0, -10);

    this.add(meshBehindTheKeyHole);
  }
}
