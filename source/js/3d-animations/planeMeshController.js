import * as THREE from "three";
import { scene } from "./initAnimationScreen";

const imageAspectRatio = 2;
const imageHeight = window.innerHeight / 100;
const imageWidth = imageHeight * imageAspectRatio;

const planeGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);

export const plainMeshController = {
  screen: "",
  prevStoryTheme: 0,
  textureScreenImages: {
    intro: ["scene-0"],
    story: ["scene-1", "scene-2", "scene-3", "scene-4"],
  },

  setStoryActiveMesh(index = this.prevStoryTheme) {
    if (this.screen !== "story") {
      return;
    }

    scene.scene.children.forEach((mesh) => {
      if (mesh.name === this.textureScreenImages.story[index]) {
        mesh.visible = true;
        return;
      }

      mesh.visible = false;
    });

    this.prevStoryTheme = index;
  },

  clearScene() {
    scene.clearScene();
  },

  async addScreenMesh(name) {
    this.screen = name;

    const images = this.textureScreenImages[name];

    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            scene.textureLoader.load(
              `../../img/module-5/scenes-textures/${img}.png`,
              (texture) => {
                const material = new THREE.MeshBasicMaterial({
                  map: texture,
                  side: THREE.DoubleSide,
                });
                const planeImage = new THREE.Mesh(planeGeometry, material);
                planeImage.name = img;

                scene.addSceneObject(planeImage);

                resolve();
              }
            );
          })
      )
    );

    return Promise.resolve();
  },
};
