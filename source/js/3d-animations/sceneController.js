import { scene } from "./initAnimationScreen";
import { SceneWithLantern } from "./scenes/SceneWithLantern";
import { LatheGeometryCreator } from "./creators/LatheGeometryCreator";
import { Saturn } from "./mesh-complex-objects/Saturn";
import { MaterialCreator } from "./creators/MaterialCreator";
import { MainPageScene } from "./scenes/main-page/MainPageScene";
import { Road } from "./mesh-complex-objects/Road";
import { Carpet } from "./mesh-complex-objects/Carpet";
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
  transformationGuiHelper
);

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  addRoadAndCarpet() {
    const road = new Road(latheGeometryCreator, materialCreator);
    const carpet = new Carpet(latheGeometryCreator, materialCreator);

    road.position.set(0, 100, 0);

    scene.addSceneObject(road);
    scene.addSceneObject(carpet);
  },

  addSaturn() {
    const saturn = new Saturn(materialCreator, { darkMode: false });

    saturn.position.set(0, 500, 0);

    scene.addSceneObject(saturn);
  },

  addDarkSaturn() {
    const saturn = new Saturn(materialCreator, { darkMode: true });

    saturn.position.set(300, 500, 0);

    scene.addSceneObject(saturn);
  },

  addMainPageComposition() {
    const mainPageComposition = new MainPageScene(pageSceneCreator);

    scene.addSceneObject(mainPageComposition);
  },

  addRoomsPageComposition() {
    const positionZ = 2550;
    const positionY = 800;

    scene.camera.position.set(0, positionY, positionZ);

    scene.controls.target.set(
      0,
      positionY - positionZ * Math.tan(degreesToRadians(15)),
      0
    );

    const roomsComposition = new RoomsPageScene(pageSceneCreator);

    roomsComposition.rotateY(-Math.PI / 4);

    scene.addSceneObject(roomsComposition);
    // scene.addTransformationsToLoop([()=>{
    //   roomsComposition.rotateY(-0.005)
    // }])
  },

  addSceneWithLantern() {
    scene.addSceneObject(new SceneWithLantern(materialCreator));
  },

  addScreenMesh() {
    // this.addSceneWithLantern();
    //
    // this.addSaturn();
    // this.addDarkSaturn();
    //
    // this.addMainPageComposition();

    this.addRoomsPageComposition();

    // this.addRoadAndCarpet();

    // this.addAeroplane()
    //
    // this.addWatermelon()
    //
    // this.addSuitcase()
  },
};
