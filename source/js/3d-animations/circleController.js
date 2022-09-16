import { scene } from "./initAnimationScreen";
import {SceneWithLantern} from './scenes/SceneWithLantern';

export const circleController = {
  clearScene() {
    scene.clearScene();
  },

  addScreenMesh() {
    scene.addSceneObject(new SceneWithLantern());
  },
};
