import * as THREE from "three";

export class RoomsScene extends THREE.Group {
  constructor({ wall, floor }) {
    super();

    // this.wall = {
    //   name: OBJECT_ELEMENTS.wallCorner,
    //   transform: {
    //     transformX: 0,
    //     transformY: 0,
    //     transformZ: 0,
    //
    //     rotateX: 0,
    //     rotateY: 0,
    //     rotateZ: 0,
    //
    //     scale: 1,
    //   },
    //   material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
    //     color: MaterialCreator.Colors.Purple,
    //     side: THREE.DoubleSide,
    //   }),
    // };
    //
    // this.floor = {
    //   name: "floor",
    //   transform: {
    //     transformX: 0,
    //     transformY: 0,
    //     transformZ: 0,
    //
    //     rotateX: -Math.PI / 2,
    //     rotateY: 0,
    //     rotateZ: -Math.PI / 2,
    //
    //     scale: 1,
    //   },
    //   material: this.materialCreator.create(MATERIAL_TYPE.SoftMaterial, {
    //     color: MaterialCreator.Colors.DarkPurple,
    //   }),
    // };

    this.wall = wall;
    this.floor = floor;

    this.constructChildren();
  }

  constructChildren() {
    this.addWall();
    this.addFloor();
  }

  addWall() {

  }

  addFloor() {
    const geometry = new THREE.CircleGeometry(1350, 32, 0, Math.PI / 2);

    const mesh = new THREE.Mesh(geometry, this.floor.material);

    this.transformationGuiHelper.addNewFolder(
      this.floor.name,
      mesh,
      this.floor.transform
    );

    this.setTransformParams(mesh, this.floor.transform);

    this.add(mesh);
  }
}
