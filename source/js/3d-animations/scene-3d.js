import * as THREE from "three";

export class Scene3d {
  constructor() {
    this.meshObjects = new Set();
    this.transformationsLoop = new Set();

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initTextureLoader();

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.z = 5;
  }

  initRenderer() {
    const canvasAnimationScreen = document.getElementById(
      "canvas--animation-screen"
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasAnimationScreen,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x5f458c, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  initTextureLoader() {
    this.textureLoader = new THREE.TextureLoader();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.transformationsLoop.forEach((callback) => {
      callback();
    });

    this.render();
  }

  clearScene() {
    this.transformationsLoop = new Set();

    this.meshObjects.forEach((mesh) => {
      this.scene.remove(mesh);

      this.meshObjects.delete(mesh);
    });
  }

  addMainScreenAnimation() {
    const imageAspectRatio = 2;
    const imageHeight = window.innerHeight / 100;
    const imageWidth = imageHeight * imageAspectRatio;

    const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);

    this.textureLoader.load(
      "../../img/module-5/scenes-textures/scene-0.png",
      (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const planeImage = new THREE.Mesh(geometry, material);

        this.meshObjects.add(planeImage);

        this.scene.add(planeImage);
      }
    );
  }
}
