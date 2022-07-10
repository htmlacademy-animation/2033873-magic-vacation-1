import Scene2D from "../Animation/scene-2d";
import Animation from "../Animation/Animation";
import { easeInCubic, easeInOutSine, easeOutCubic } from "../../helpers/easing";

const IMAGES_URLS = Object.freeze({
  key: "key.png",
  crocodile: "crocodile.png",
  // drop: "drop.png",
  flamingo: "flamingo.png",
  leaf: "leaf.png",
  saturn: "saturn.png",
  snowFlake: "snowFlake.png",
  watermelon: "watermelon.png",
});

const OBJECTS = Object.freeze({
  key: {
    imageId: "key",
    x: 50,
    y: 58,
    size: 18,
    opacity: 0,
    transforms: { scaleX: 0.8, scaleY: 0.8 },
  },
  flamingo: {
    imageId: "flamingo",
    x: 50,
    y: 58,
    size: 16,
    opacity: 0,
    transforms: {},
  },
  watermelon: {
    imageId: "watermelon",
    x: 50,
    y: 58,
    size: 16,
    opacity: 0,
    transforms: {},
  },
  snowFlake: {
    imageId: "snowFlake",
    x: 50,
    y: 58,
    size: 12,
    opacity: 0,
    transforms: {},
  },
  saturn: {
    imageId: "saturn",
    x: 50,
    y: 58,
    size: 16,
    opacity: 0,
    transforms: {},
  },
  leaf: {
    imageId: "leaf",
    x: 50,
    y: 58,
    size: 20,
    opacity: 0,
    transforms: {},
  },
  crocodile: {
    imageId: "crocodile",
    x: 50,
    y: 58,
    size:80,
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

  initAnimations() {
    this.animations.push(
      new Animation({
        func: this.drawScene,
        duration: "infinite",
        fps: 60,
      })
    );

    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimation();
    this.initSnowFlakeAnimation();
    this.initSaturnAnimation();
    this.initLeafAnimation();
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

  initFlamingoAnimations() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.flamingo.opacity = progress;
          this.objects.flamingo.transforms.translateX = -25 * progress;
          this.objects.flamingo.transforms.translateY = -5 * progress;
          this.objects.flamingo.transforms.rotate = (1 - progress) * 60;
        },
        duration: 617,
        delay: 100,
        easing: easeOutCubic,
      }),
      new Animation({
        func: (progress) => {
          this.objects.flamingo.transforms.translateY = -5 + 80 * progress;
        },
        duration: 583,
        delay: 717,
        easing: easeInCubic,
      })
    );
  }

  initWatermelonAnimation() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.watermelon.opacity = progress;
          this.objects.watermelon.transforms.translateX = -40 * progress;
          this.objects.watermelon.transforms.translateY = 20 * progress;
          this.objects.watermelon.transforms.rotate = (1 - progress) * 60;
        },
        duration: 617,
        delay: 100,
        easing: easeOutCubic,
      }),
      new Animation({
        func: (progress) => {
          this.objects.watermelon.transforms.translateY = 20 + 80 * progress;
        },
        duration: 583,
        delay: 717,
        easing: easeInCubic,
      })
    );
  }

  initSnowFlakeAnimation() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.snowFlake.opacity = progress;
          this.objects.snowFlake.transforms.translateX = 22 * progress;
          this.objects.snowFlake.transforms.translateY = 6 * progress;
          this.objects.snowFlake.transforms.rotate = (1 - progress) * 60;
        },
        duration: 617,
        delay: 100,
        easing: easeOutCubic,
      }),
      new Animation({
        func: (progress) => {
          this.objects.snowFlake.transforms.translateY = 6 + 80 * progress;
        },
        duration: 583,
        delay: 717,
        easing: easeInCubic,
      })
    );
  }

  initSaturnAnimation() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.saturn.opacity = progress;
          this.objects.saturn.transforms.translateX = 36 * progress;
          this.objects.saturn.transforms.translateY = 22 * progress;
          this.objects.saturn.transforms.rotate = (1 - progress) * 60;
        },
        duration: 617,
        delay: 100,
        easing: easeOutCubic,
      }),
      new Animation({
        func: (progress) => {
          this.objects.saturn.transforms.translateY = 22 + 80 * progress;
        },
        duration: 583,
        delay: 717,
        easing: easeInCubic,
      })
    );
  }

  initLeafAnimation() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.objects.leaf.opacity = progress;
          this.objects.leaf.transforms.translateX = 40 * progress;
          this.objects.leaf.transforms.translateY = -10 * progress;
          this.objects.leaf.transforms.rotate = (1 - progress) * 60;
        },
        duration: 617,
        delay: 100,
        easing: easeOutCubic,
      }),
      new Animation({
        func: (progress) => {
          this.objects.leaf.transforms.translateY = -10 + 80 * progress;
        },
        duration: 583,
        delay: 717,
        easing: easeInCubic,
      })
    );
  }
}
