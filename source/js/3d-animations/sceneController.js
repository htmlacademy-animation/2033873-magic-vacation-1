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
    roomsComposition.rotateY(-Math.PI / 2);
    roomsComposition.rotateY(-Math.PI / 2);
    roomsComposition.rotateY(-Math.PI / 2);

    scene.addSceneObject(roomsComposition);
    // scene.addTransformationsToLoop([()=>{
    //   roomsComposition.rotateY(-0.005)
    // }])
  },

  addScreenMesh() {
    // this.addSceneWithLantern();
    //
    // this.addMainPageComposition();

    this.addRoomsPageComposition();

    // this.addAeroplane()
    //
    // this.addWatermelon()
    //
    // this.addSuitcase()
  },
};
