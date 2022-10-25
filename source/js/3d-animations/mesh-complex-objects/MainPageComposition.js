import * as THREE from "three";
import { SVG_FORMS } from "../../constants";
import { degreesToRadians } from "../utils/degreesToRadians";
import { MaterialCreator } from "../creators/MaterialCreator";

export class MainPageComposition extends THREE.Group {
  constructor(materialCreator, extrudeSvgCreator) {
    super();

    this.extrudeSvgCreator = extrudeSvgCreator;
    this.materialCreator = materialCreator;
    this.constructChildren();
  }

  constructChildren() {
    this.addKeyHoleBackground();
    this.addExtrudedSvg();
  }

  async addKeyHoleBackground() {
    await this.extrudeSvgCreator.create(
      SVG_FORMS.keyhole,
      {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
      },
      (keyholeMesh) => {
        keyholeMesh.rotateZ(degreesToRadians(180));
        keyholeMesh.position.set(1000, 1000, 0);

        this.add(keyholeMesh);
      }
    );

    const meshBehindTheKeyHole = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400, 2, 2),
      this.materialCreator.create("BasicMaterial", {
        color: MaterialCreator.Colors.Purple,
      })
    );

    meshBehindTheKeyHole.position.set(0, 0, -10);

    this.add(meshBehindTheKeyHole);
  }

  async addExtrudedSvg() {
    await this.extrudeSvgCreator.create(
      SVG_FORMS.flamingo,
      {
        depth: 8,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.materialCreator.create("SoftMaterial", {
          color: MaterialCreator.Colors.LightDominantRed,
        }),
      },

      (flamingoMesh) => {
        flamingoMesh.position.set(-100, 62, 0);
        flamingoMesh.rotateX(Math.PI);

        this.add(flamingoMesh);
      }
    );

    await this.extrudeSvgCreator.create(
      SVG_FORMS.snowflake,
      {
        depth: 8,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.materialCreator.create("BasicMaterial", {
          color: MaterialCreator.Colors.Blue,
        }),
      },
      (snowflakeMesh) => {
        this.add(snowflakeMesh);
      }
    );

    await this.extrudeSvgCreator.create(
      SVG_FORMS.question,
      {
        depth: 8,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.materialCreator.create("BasicMaterial", {
          color: MaterialCreator.Colors.Blue,
        }),
      },
      (questionMesh) => {
        questionMesh.position.set(0, 200, 0);
        questionMesh.rotateZ(Math.PI);
        questionMesh.rotateY(Math.PI);

        this.add(questionMesh);
      }
    );

    await this.extrudeSvgCreator.create(
      SVG_FORMS.leaf,
      {
        depth: 8,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.materialCreator.create("BasicMaterial", {
          color: MaterialCreator.Colors.Green,
        }),
      },
      (leafMesh) => {
        leafMesh.position.set(120, 0, 0);

        this.add(leafMesh);
      }
    );

    await this.extrudeSvgCreator.create(
      SVG_FORMS.flower,
      {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
      },
      (flowerMesh) => {
        flowerMesh.rotateZ(Math.PI);
        flowerMesh.position.set(200, -200, 0);

        this.add(flowerMesh);
      }
    );
  }
}
