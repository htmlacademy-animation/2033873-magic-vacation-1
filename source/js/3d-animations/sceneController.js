import { scene } from "./initAnimationScreen";
// import { SceneWithLantern } from "./scenes/SceneWithLantern";
import { SvgPathsLoader } from "./svg/SvgPathsLoader";
import { EXTRUDE_SETTINGS, SVG_FORMS } from "../constants";
import { ExtrudeSvgFactory } from "./svg/ExtrudeSvg";
import { LatheGeometryCreator } from "./creators/LatheGeometryCreator";
import {degreesToRadians} from './utils/degreesToRadians';

export const sceneController = {
  clearScene() {
    scene.clearScene();
  },

  async addSvgExtrudeImages() {
    const svgShapeLoader = new SvgPathsLoader(SVG_FORMS);
    const extrudeSvgFactory = new ExtrudeSvgFactory(
      svgShapeLoader,
      EXTRUDE_SETTINGS
    );

    const flamingoMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.flamingo,
      { depth: 8, bevelThickness: 2, bevelSize: 2 }
    );
    const snowflakeMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.snowflake,
      { depth: 8, bevelThickness: 2, bevelSize: 2 }
    );
    const questionMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.question,
      { depth: 8, bevelThickness: 2, bevelSize: 2 }
    );
    const leafMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.leaf,
      { depth: 8, bevelThickness: 2, bevelSize: 2 }
    );

    const flowerMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.flower,
      { depth: 4, bevelThickness: 2, bevelSize: 2 }
    );

    const keyholeMesh = await extrudeSvgFactory.createAndAddToTheScene(
      SVG_FORMS.keyhole,
      { depth: 4, bevelThickness: 2, bevelSize: 2 }
    );

    flamingoMesh.position.set(-100, 62, 0);
    flamingoMesh.rotateX(Math.PI);

    questionMesh.position.set(0, 200, 0);
    questionMesh.rotateZ(Math.PI);
    questionMesh.rotateY(Math.PI);

    leafMesh.position.set(120, 0, 0);

    flowerMesh.rotateZ(Math.PI);
    flowerMesh.position.set(200, -200, 0);

    keyholeMesh.position.set(-1000, -1000, -200);

    scene.addSceneObject(flamingoMesh);
    scene.addSceneObject(snowflakeMesh);
    scene.addSceneObject(questionMesh);
    scene.addSceneObject(leafMesh);
    scene.addSceneObject(flowerMesh);
    scene.addSceneObject(keyholeMesh);
  },

  async addScreenMesh() {
    // scene.addSceneObject(new SceneWithLantern());

    const road = new LatheGeometryCreator().createRoad();

    road.rotateY(degreesToRadians(90));

    scene.addSceneObject(road);
    scene.addSceneObject(new LatheGeometryCreator().createCarpet())
  },
};
