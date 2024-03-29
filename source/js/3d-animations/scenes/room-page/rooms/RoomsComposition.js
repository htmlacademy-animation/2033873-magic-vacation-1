import * as THREE from "three";
import { RoomOneScene } from "./RoomOneScene";
import { RoomTwoScene } from "./RoomTwoScene";
import { RoomThreeScene } from "./RoomThreeScene";
import { RoomFourScene } from "./RoomFourScene";

export class RoomsComposition extends THREE.Group {
  constructor(pageSceneCreator, animationManager, diceLoader) {
    super();

    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;
    this.diceLoader = diceLoader;
  }

  async constructRooms() {
    await this.addRoomOne();
    this.diceLoader.increasePercentage(15);
    await this.addRoomTwo();
    this.diceLoader.increasePercentage(15);
    await this.addRoomThree();
    this.diceLoader.increasePercentage(15);
    await this.addRoomFour();
    this.diceLoader.increasePercentage(15);
  }

  async addRoomOne() {
    const roomOne = new RoomOneScene(
      this.pageSceneCreator,
      this.animationManager
    );

    await roomOne.constructChildren();

    this.add(roomOne);
  }

  async addRoomTwo() {
    const roomTwo = new RoomTwoScene(
      this.pageSceneCreator,
      this.animationManager
    );

    await roomTwo.constructChildren();

    roomTwo.rotateY(Math.PI / 2);

    this.add(roomTwo);
  }

  async addRoomThree() {
    const roomThree = new RoomThreeScene(
      this.pageSceneCreator,
      this.animationManager
    );

    await roomThree.constructChildren();

    roomThree.rotateY(Math.PI);

    this.add(roomThree);
  }

  async addRoomFour() {
    const roomFour = new RoomFourScene(
      this.pageSceneCreator,
      this.animationManager
    );

    await roomFour.constructChildren();

    roomFour.rotateY(-Math.PI / 2);

    this.add(roomFour);
  }
}
