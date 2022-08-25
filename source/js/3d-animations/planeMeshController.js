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
              `./img/module-5/scenes-textures/${img}.png`,
              (texture) => {
                const material = this.getEffectMaterial(texture);

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

  getEffectMaterial(texture) {
    return new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: texture,
        },
      },
      vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;

    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {

      vUv = uv;

      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

    }`,

      fragmentShader: `
    precision mediump float;

    uniform sampler2D map;

    varying vec2 vUv;

    void main() {

      vec4 texel = texture2D( map, vUv );

      gl_FragColor = texel;

    }`,
    });
  },
};
