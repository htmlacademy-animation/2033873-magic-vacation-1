export class AnimationManager {
  constructor() {
    this.animations = {
      mainPage: [],
      roomsPage: [],
      suitcase: []
    }
  }

  addMainPageAnimations(...animations) {
    this.animations.mainPage.push(...animations);
  }

  addRoomsPageAnimations(key, ...animations) {
    this.animations.roomsPage.push(...animations);
  }

  addSuitcaseAnimations(...animations) {
    this.animations.suitcase.push(...animations);
  }

  startAnimations(key) {
    this.animations[key].forEach((animation) => {
      animation.start();
    });
  }

  clearAnimations(key) {
    this.animations[key].forEach((animation) => {
      animation.stop();
    });

    this.animations[key] = [];
  }
}
