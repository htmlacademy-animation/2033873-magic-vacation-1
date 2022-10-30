import * as THREE from "three";
import { SVG_ELEMENTS, OBJECT_ELEMENTS, MATERIAL_TYPE } from "../../constants";
import { MaterialCreator } from "../creators/MaterialCreator";
import { TransformationGuiHelper } from "../ProjectGui/TransformationGuiHelper";

export class RoomsPageScene extends THREE.Group {
  constructor(materialCreator, extrudeSvgCreator, objectCreator) {
    super();

    this.extrudeSvgCreator = extrudeSvgCreator;
    this.materialCreator = materialCreator;
    this.objectCreator = objectCreator;
    this.gui = new TransformationGuiHelper();

    this.meshExtrudedObjects = [
      {
        name: [SVG_ELEMENTS.flamingo],
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
    ];

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
          side: THREE.DoubleSide
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
          side: THREE.DoubleSide
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
          side: THREE.DoubleSide
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
          side: THREE.DoubleSide
        }),
      },
    ];

    this.constructChildren();
  }

  constructChildren() {
    // this.addExtrudedSvgMesh();
    this.addMeshObjects();
  }

  addMeshObjects() {
    this.meshObjects.forEach((config, index) => {
      this.objectCreator.create(config.name, (obj) => {
        this.gui.addNewFolder(
          `${index} - ${config.name}`,
          obj,
          config.transform
        );

        if (config.material) {
          this.applyMaterialToObject(obj, config.material);
        }

        this.setTransformParams(obj, config.transform);

        this.add(obj);
      });
    });
  }

  addExtrudedSvgMesh() {
    this.meshExtrudedObjects.forEach((config) => {
      this.extrudeSvgCreator.create(config.name, config.extrude, (obj) => {
        this.gui.addNewFolder(config.name, obj, config.transform);

        this.setTransformParams(obj, config.transform);

        this.add(obj);
      });
    });

    // this.extrudeSvgCreator.create(
    //   SVG_FORMS.flower,
    //   {
    //     depth: 4,
    //     bevelThickness: 2,
    //     bevelSize: 2,
    //   },
    //   (flowerMesh) => {
    //     flowerMesh.rotateZ(Math.PI);
    //     flowerMesh.position.set(200, -200, 100);
    //
    //     this.add(flowerMesh);
    //   }
    // );
  }

  setTransformParams(obj, params) {
    obj.position.set(params.transformX, params.transformY, params.transformZ);
    obj.rotation.set(params.rotateX, params.rotateY, params.rotateZ);
    obj.scale.set(params.scale, params.scale, params.scale);
  }

  applyMaterialToObject(obj3d, material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
}
