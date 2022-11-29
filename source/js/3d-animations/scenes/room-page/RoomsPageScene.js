import * as THREE from "three";
import { OBJECT_ELEMENTS } from "../../../constants";
import { RoomsComposition } from "./rooms/RoomsComposition";
import { createObjectTransformAnimation } from "../../creators/animationCreators";
import {
  easeInCubic,
  easeInOutSine,
  easeOutCubic,
} from "../../../helpers/easing";

export class RoomsPageScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
  }

  async constructChildren() {
    await this.addRooms();

    await this.addSuitCase();
  }

  async addRooms() {
    const roomsComposition = new RoomsComposition(
      this.pageSceneCreator,
      this.animationManager
    );

    await roomsComposition.constructRooms();

    roomsComposition.rotateY(-Math.PI / 4);

    this.add(roomsComposition);
  }

  async addSuitCase() {
    const suitcase = await this.pageSceneCreator.createObjectMesh({
      name: OBJECT_ELEMENTS.suitcase,
      transform: {
        position: {
          x: -340,
          y: 150,
          z: 750,
        },
        rotation: {
          y: -0.4,
        },
      },
    });

    suitcase.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    this.animationManager.addSuitcaseAnimations(
      createObjectTransformAnimation(
        suitcase,
        {
          position: {
            y: 0,
          },
          scale: {
            x: 0.95,
            y: 1.1,
            z: 0.95,
          },
        },
        {
          duration: 300,
          easing: easeInCubic,
        }
      ),
      createObjectTransformAnimation(
        suitcase,
        {
          position: {
            y: 2,
          },
          scale: {
            x: 1.05,
            y: 0.93,
            z: 1.05,
          },
        },
        {
          duration: 150,
          delay: 300,
          easing: easeOutCubic,
        }
      ),
      createObjectTransformAnimation(
        suitcase,
        {
          position: {
            y: 1,
          },
          scale: {
            x: 0.98,
            y: 1.04,
            z: 0.98,
          },
        },
        {
          duration: 150,
          delay: 450,
          easing: easeInOutSine,
        }
      ),
      createObjectTransformAnimation(
        suitcase,
        {
          position: {
            y: 0,
          },
          scale: {
            x: 1,
            y: 1,
            z: 1,
          },
        },
        {
          duration: 150,
          delay: 600,
          easing: easeInCubic,
        }
      )
    );

    this.add(suitcase);
  }
}
