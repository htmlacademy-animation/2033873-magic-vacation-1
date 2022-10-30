import * as THREE from "three";

export class RoomScene extends THREE.Group {
  constructor(pageSceneCreator) {
    super();

    this.pageSceneCreator = pageSceneCreator;
  }

  constructChildren() {
    this.addWall();
    this.addFloor();
  }

  addObject(object) {
    this.add(object)
  }

  addWall() {
    this.pageSceneCreator.createObjectMesh(this.wall, (obj) => {
      this.add(obj);
    });
  }

  addFloor() {
    const geometry = new THREE.CircleGeometry(1350, 32, 0, Math.PI / 2);

    const floor = new THREE.Mesh(geometry, this.floor.material);

    floor.rotation.set(0, -Math.PI / 2, -Math.PI / 2, 'ZYX');

    this.add(floor);
  }
}
