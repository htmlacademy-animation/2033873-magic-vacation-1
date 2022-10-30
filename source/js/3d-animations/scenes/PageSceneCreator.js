export class PageSceneCreator {
  constructor(
    materialCreator,
    extrudeSvgCreator,
    objectCreator,
    transformationGuiHelper
  ) {
    this.extrudeSvgCreator = extrudeSvgCreator;
    this.materialCreator = materialCreator;
    this.objectCreator = objectCreator;
    this.transformationGuiHelper = transformationGuiHelper;
  }

  createObjectMesh(config, onComplete) {
    this.objectCreator.create(config.name, (obj) => {
      if (config.material) {
        this.applyMaterialToObject(obj, config.material);
      }

      if (config.transform) {
        this.transformationGuiHelper.addNewFolder(
          config.name,
          obj,
          config.transform
        );

        this.setTransformParams(obj, config.transform);
      }

      onComplete(obj);
    });
  }

  createExtrudedSvgMesh(config, onComplete) {
    this.extrudeSvgCreator.create(config.name, config.extrude, (obj) => {
      if (config.transform) {
        this.transformationGuiHelper.addNewFolder(
          config.name,
          obj,
          config.transform
        );

        this.setTransformParams(obj, config.transform);
      }

      onComplete(obj);
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
