export class AnimationManager {
  constructor(scene) {
    this.scene = scene;
  }

  addAnimations(...animations) {
    this.scene.addAnimations(...animations);
  }

  startAnimations() {
    this.scene.startAnimations();
  }

  clearAnimations() {
    this.scene.clearAnimations();
  }
}
