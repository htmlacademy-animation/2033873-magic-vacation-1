import { scene } from "./initAnimationScreen";
import { LatheGeometryCreator } from "./creators/LatheGeometryCreator";
import { MaterialCreator } from "./creators/MaterialCreator";
import { MainPageScene } from "./scenes/main-page/MainPageScene";
import { SvgPathsLoader } from "./loaders/SvgPathsLoader";
import { EXTRUDE_SETTINGS, SVG_ELEMENTS } from "../constants";
import { ExtrudeSvgCreator } from "./creators/ExtrudeSvgCreator";
import { ObjectsCreator } from "./creators/ObjectCreator";
import { RoomsPageScene } from "./scenes/room-page/RoomsPageScene";
import { degreesToRadians } from "./utils/degreesToRadians";
import { TransformationGuiHelper } from "./ProjectGui/TransformationGuiHelper";
import { PageSceneCreator } from "./scenes/PageSceneCreator";

const materialCreator = new MaterialCreator();
const latheGeometryCreator = new LatheGeometryCreator();
const svgShapeLoader = new SvgPathsLoader(SVG_ELEMENTS);
const extrudeSvgCreator = new ExtrudeSvgCreator(
  svgShapeLoader,
  EXTRUDE_SETTINGS
);
const objectCreator = new ObjectsCreator();
const transformationGuiHelper = new TransformationGuiHelper();
const pageSceneCreator = new PageSceneCreator(
  materialCreator,
  extrudeSvgCreator,
  objectCreator,
  latheGeometryCreator,
  transformationGuiHelper
);

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  addMainPageComposition() {
    const mainPageComposition = new MainPageScene(pageSceneCreator);

    scene.addSceneObject(mainPageComposition);
  },

  addRoomsPageComposition() {
    // согласно заданию должно быть 2550 / 800 - но получается слишком далеко
    const positionZ = 2150;
    const positionY = 700;

    scene.camera.position.set(0, positionY, positionZ);
    scene.light.position.set(0, positionY, positionZ);

    scene.controls.target.set(
      0,
      positionY - positionZ * Math.tan(degreesToRadians(15)),
      0
    );

    const roomsPageScene = new RoomsPageScene(pageSceneCreator, scene);

    scene.addSceneObject(roomsPageScene);
    // scene.addTransformationsToLoop([()=>{
    //   roomsComposition.rotateY(-0.003)
    // }])
  },

  addScreenMesh() {
    // this.addMainPageComposition();

    this.addRoomsPageComposition();
  },
};
