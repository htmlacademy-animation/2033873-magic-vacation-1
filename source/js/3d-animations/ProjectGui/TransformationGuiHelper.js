import { GUI } from "dat.gui";

export class TransformationGuiHelper extends GUI {
  addNewFolder(name, object, transformParams) {
    let folderName = name;
    let index = 1;

    while (this.__folders[folderName]) {
      index++;
      folderName = `${name} - ${index}`
    }

    const newFolder = this.addFolder(folderName);

    const objectTransform = newFolder.addFolder("transform");

    objectTransform
      .add(transformParams, "transformX", -1000, 1000, 10)
      .onChange((data) => {
        object.position.set(
          data,
          transformParams.transformY,
          transformParams.transformZ
        );
      });
    objectTransform
      .add(transformParams, "transformY", -1000, 1000, 10)
      .onChange((data) => {
        object.position.set(
          transformParams.transformX,
          data,
          transformParams.transformZ
        );
      });
    objectTransform
      .add(transformParams, "transformZ", 0, 300, 3)
      .onChange((data) => {
        object.position.set(
          transformParams.transformX,
          transformParams.transformY,
          data
        );
      });
    objectTransform.open();

    const objectRotation = newFolder.addFolder("rotation");
    objectRotation
      .add(transformParams, "rotateX", -Math.PI, Math.PI, 0.1)
      .onChange((data) => {
        object.rotation.set(
          data,
          transformParams.rotateY,
          transformParams.rotateZ
        );
      });
    objectRotation
      .add(transformParams, "rotateY", -Math.PI,  Math.PI, 0.1)
      .onChange((data) => {
        object.rotation.set(
          transformParams.rotateX,
          data,
          transformParams.rotateZ
        );
      });
    objectRotation
      .add(transformParams, "rotateZ", -Math.PI, Math.PI, 0.1)
      .onChange((data) => {
        object.rotation.set(
          transformParams.rotateX,
          transformParams.rotateY,
          data
        );
      });
    objectRotation.open();

    const objectScale = newFolder.addFolder("scale");
    objectScale.add(transformParams, "scale", 0, 5, 0.1).onChange((data) => {
      object.scale.set(data, data, data);
    });
    objectScale.open();
  }
}
