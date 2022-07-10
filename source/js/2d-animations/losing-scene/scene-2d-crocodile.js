import Scene2D from "../Animation/scene-2d";
import Animation from "../Animation/Animation";
import {  easeInOutSine } from "../../helpers/easing";

const IMAGES_URLS = Object.freeze({
  key: "key.png",
  // crocodile: "crocodile.png",
  // drop: "drop.png",
  // flamingo: "flamingo.png",
  // leaf: "leaf.png",
  // saturn: "saturn.png",
  // snowFlake: "snowFlake.png",
  // watermelon: "watermelon.png",
});

const OBJECTS = Object.freeze({
  key: {
    imageId: "key",
    x: 50,
    y: 58,
    size: 22,
    opacity: 0,
    transforms: { scaleX: 0.8, scaleY: 0.8 },
  },
});

export default class Scene2dCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById("crocodile-scene");

    super({
      canvas,
      objects: OBJECTS,
      imagesUrls: IMAGES_URLS,
      imagePrefix: "./img/module-4/lose-images/",
    });

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.start();
    this.updateSize();
  }

  initEventListeners() {
    window.addEventListener("resize", this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(
      new Animation({
        func: this.drawScene,
        duration: "infinite",
        fps: 60,
      })
    );

    this.initKeyAnimations();
  }

  initKeyAnimations() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.key.opacity = progress;
          this.objects.key.transforms.scaleX = 0.8 + 0.2 * progress;
          this.objects.key.transforms.scaleY = 0.8 + 0.2 * progress;
        },
        duration: 187,
        delay: 0,
        easing: easeInOutSine,
      })
    );
  }
}
