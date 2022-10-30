import * as THREE from 'three';

export class PageScene extends THREE.Group {
  constructor(materialCreator, extrudeSvgCreator, objectCreator, transformationGuiHelper) {
    super();

    this.extrudeSvgCreator = extrudeSvgCreator;
    this.materialCreator = materialCreator;
    this.objectCreator = objectCreator;
    this.transformationGuiHelper = transformationGuiHelper;
  }

  addObjectsMesh(...meshObjects) {
    meshObjects.forEach((config) => {
      this.objectCreator.create(config.name, (obj) => {
        this.transformationGuiHelper.addNewFolder(config.name, obj, config.transform);

        if (config.material) {
          this.applyMaterialToObject(obj, config.material);
        }

        this.setTransformParams(obj, config.transform);

        this.add(obj);
      });
    });
  }

  addExtrudedSvgMesh(...meshExtrudedObjects) {
    meshExtrudedObjects.forEach((config) => {
      this.extrudeSvgCreator.create(config.name, config.extrude, (obj) => {
        this.transformationGuiHelper.addNewFolder(config.name, obj, config.transform);

        this.setTransformParams(obj, config.transform);

        this.add(obj);
      });
    });
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
