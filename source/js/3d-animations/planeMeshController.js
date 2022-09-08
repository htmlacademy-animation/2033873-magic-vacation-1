import * as THREE from "three";
import { scene } from "./initAnimationScreen";
import vertexShader from "../../shader/planeMeshShader/vertexShader.glsl";
import fragmentShader from "../../shader/planeMeshShader/fragmentShader.glsl";

const IMAGE_ASPECT_RATIO = 2;
const imageHeight = window.innerHeight / 100;
const imageWidth = imageHeight * IMAGE_ASPECT_RATIO;

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
        map: new THREE.Uniform(texture),
        timestamp: new THREE.Uniform(0),
        bubble1: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, 0),
          bubbleRadius: 0.07,
          bubbleSpeedY: 0.003,
        }),
        bubble2: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -0.2),
          bubbleRadius: 0.06,
          bubbleSpeedY: 0.002,
        }),
        bubble3: new THREE.Uniform({
          bubblePosition: new THREE.Vector2(0, -0.7),
          bubbleRadius: 0.04,
          bubbleSpeedY: 0.0025,
        }),
        hasBubbles: new THREE.Uniform(false),
      },
      defines: {
        IMAGE_ASPECT_RATIO,
        BUBBLE_LINE_WIDTH: 0.002,
      },
      vertexShader,
      fragmentShader,
    });
  },

  setMeshTransformations(mesh, index) {
    const transformations = [];

    scene.clearTransformationsLoop();

    if (index === 1) {
      const transformationCallback = (timestamp) => {
        // анимация эффекта hue
        mesh.material.uniforms.timestamp.value = timestamp;

        // анимация пузырьков
        mesh.material.uniforms.hasBubbles.value = true;

        const bubble1 = mesh.material.uniforms.bubble1.value;
        const bubble2 = mesh.material.uniforms.bubble2.value;
        const bubble3 = mesh.material.uniforms.bubble3.value;

        [bubble1, bubble2, bubble3].forEach((bubble) => {
          if (bubble.bubblePosition.y > 1.0 + 2 * bubble.bubbleRadius) {
            bubble.bubblePosition.y = -2 * bubble1.bubbleRadius;
          }

          bubble.bubblePosition.y += bubble.bubbleSpeedY;
        });

        bubble1.bubblePosition.x = Math.sin(timestamp / 300) * 0.05 + 0.4;
        bubble2.bubblePosition.x = Math.sin(timestamp / 350) * 0.06 + 0.5;
        bubble3.bubblePosition.x = Math.sin(timestamp / 400) * 0.07 + 0.6;
      };

      transformations.push(transformationCallback);
    }

    scene.addTransformationsToLoop(transformations);
  },
};
