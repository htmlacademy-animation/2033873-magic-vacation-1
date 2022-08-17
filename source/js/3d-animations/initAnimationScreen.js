import * as THREE from "three";

const loader = new THREE.TextureLoader();

const canvasAnimationScreen = document.getElementById(
  "canvas--animation-screen"
);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvasAnimationScreen,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x5f458c, 0);
renderer.setPixelRatio(window.devicePixelRatio);

// init
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

// PlaneGeometry - Image
const imageAspectRatio = 2;
const imageWidth = window.innerWidth / 100;
const imageHeight = imageWidth / imageAspectRatio;

const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
const sceneObjects = { plane: null };

loader.load("../../img/module-5/scenes-textures/scene-0.png", (texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const planeImage = new THREE.Mesh(geometry, material);

  scene.add(planeImage);

  sceneObjects.plane = planeImage;
});


// resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;

  camera.updateProjectionMatrix();

  if (sceneObjects.plane) {
    sceneObjects.plane.geometry.parameters.height =
      width / (100 * imageAspectRatio);
    sceneObjects.plane.geometry.parameters.width = width / 100;
  }

  renderer.setSize(width, height);
});
