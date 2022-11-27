import { infrastructure } from "./initAnimationScreen";
import { LatheGeometryCreator } from "./creators/LatheGeometryCreator";
import { MaterialCreator } from "./creators/MaterialCreator";
import { MainPageScene } from "./scenes/main-page/MainPageScene";
import { SvgPathsLoader } from "./loaders/SvgPathsLoader";
import { EXTRUDE_SETTINGS, SVG_ELEMENTS } from "../constants";
import { ExtrudeSvgCreator } from "./creators/ExtrudeSvgCreator";
import { ObjectsCreator } from "./creators/ObjectCreator";
import { RoomsPageScene } from "./scenes/room-page/RoomsPageScene";
// import { TransformationGuiHelper } from "./ProjectGui/TransformationGuiHelper";
import { PageSceneCreator } from "./scenes/PageSceneCreator";
import { AnimationManager } from "./controllers/AnimationManager";
import { CameraRig } from "./rigs/CameraRig/CameraRig";
import * as THREE from "three";

const materialCreator = new MaterialCreator();
const latheGeometryCreator = new LatheGeometryCreator();
const svgShapeLoader = new SvgPathsLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
  svgShapeLoader,
  EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator();
// const transformationGuiHelper = new TransformationGuiHelper();
const pageSceneCreator = new PageSceneCreator(
  materialCreator,
  extrudeSvgCreator,
  objectCreator,
  latheGeometryCreator,
  // transformationGuiHelper
);

const animationManager = new AnimationManager();

export const sceneController = {
  mainPageScene: null,
  roomsPageScene: null,

  clearScene() {
    infrastructure.clearScene();
    animationManager.clearAnimations();
  },

  addMainPageScene() {
    if (!this.mainPageScene) {
      this.mainPageScene = new MainPageScene(
        pageSceneCreator,
        animationManager
      );
    }

    infrastructure.addSceneObject(this.mainPageScene);
  },

  addRoomsPageScene() {
    // согласно заданию должно быть 2550 / 800 - но получается слишком далеко
    // const positionZ = 2150;
    // const positionY = 700;

    // scene.camera.position.set(0, positionY, positionZ);
    // scene.light.position.set(0, positionY, positionZ);
    //
    // scene.controls.target.set(
    //   0,
    //   positionY - positionZ * Math.tan(degreesToRadians(15)),
    //   0
    // );

    this.roomsPageScene = new RoomsPageScene(
      pageSceneCreator,
      animationManager
    );

    this.roomsPageScene.position.set(0, -700, -3270);

    infrastructure.addSceneObject(this.roomsPageScene);
  },

  addStagesListeners(buttons, cameraRig) {
    const listener = (event) => {
      if (!event) return;

      const target = event.currentTarget;

      if (!target) return;

      cameraRig.changeStateTo(
        CameraRig.getCameraRigStageState(Number(target.dataset.index))
      );
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", listener);
    });
  },

  addScene() {
    this.addMainPageScene();
    this.addRoomsPageScene();

    const cameraRig = new CameraRig(CameraRig.getCameraRigStageState(0));

    cameraRig.addObjectToCameraNull(infrastructure.camera);

    cameraRig.addObjectToCameraNull(
      new THREE.Mesh(
        new THREE.SphereGeometry(50, 32, 32),
        new THREE.MeshBasicMaterial({ color: "#ff0000" })
      )
    );
    cameraRig.addObjectToCameraNull(infrastructure.light);

    this.addStagesListeners(
      [...document.querySelectorAll(".stage-button")],
      cameraRig
    );

    infrastructure.scene.add(cameraRig);
  },
};
