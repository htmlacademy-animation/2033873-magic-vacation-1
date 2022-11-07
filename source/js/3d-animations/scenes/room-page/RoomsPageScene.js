import * as THREE from "three";
import { OBJECT_ELEMENTS } from "../../../constants";
import { RoomsComposition } from "./rooms/RoomsComposition";

export class RoomsPageScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;

    this.constructChildren();
  }

  constructChildren() {
    this.addRooms();

    this.addSuitCase();
  }

  addRooms() {
    const roomsComposition = new RoomsComposition(
      this.pageSceneCreator,
      this.animationManager
    );

    roomsComposition.rotateY(-Math.PI / 4);

    this.add(roomsComposition);
  }

  addSuitCase() {
    this.pageSceneCreator.createObjectMesh(
      {
        name: OBJECT_ELEMENTS.suitcase,
        enableGui: true,
        transform: {
          from: {
            transformX: -340,
            transformY: 150,
            transformZ: 750,

            rotateY: -0.4,
          },
        },
      },
      (obj) => {
        obj.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });
        //
        // this.animationManager.addAnimations(
        //   new Animation({
        //     duration: 1000,
        //     delay: 1000,
        //     func: (progress) => {
        //       obj.scale.y = 1 - 0.5 * progress;
        //     },
        //   })
        // );
        //
        // this.animationManager.startAnimations();

        this.add(obj);
      }
    );
  }
}
