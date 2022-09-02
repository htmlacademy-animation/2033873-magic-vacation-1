import * as THREE from "three";
import {scene} from "./initAnimationScreen";
import vertexShader from "../../shader/planeMeshShader/vertexShader.glsl";
import fragmentShader from "../../shader/planeMeshShader/fragmentShader.glsl";

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

        this.setMeshTransformations(mesh, index);

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
              `./img/module-5/scenes-textures/${img}.png`,
              (texture) => {
                const material = this.getEffectMaterial(texture);

                const planeMesh = new THREE.Mesh(planeGeometry, material);
                planeMesh.name = img;

                scene.addSceneObject(planeMesh);

                resolve();
              }
            );
          })
      )
    );

    return Promise.resolve();
  },

  getEffectMaterial(texture) {
    return new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: texture,
        },
        delta: {
          value: 0,
        },
      },
      vertexShader,
      fragmentShader,
    });
  },

  setMeshTransformations(mesh, index) {
    const transformations = [];

    scene.clearTransformationsLoop();

    if (index === 1) {
      const transformationCallback = () => {
        mesh.material.uniforms.delta.value = Math.cos(Date.now() / 1000) * 20;
      };

      transformations.push(transformationCallback);
    }

    scene.addTransformationsToLoop(transformations);
  },
};
