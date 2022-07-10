import Scene2D from "../Animation/scene-2d";

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
    y: 60,
    size: 30,
    opacity: 1,
    transforms: {},
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

  initAnimations() {}
}
