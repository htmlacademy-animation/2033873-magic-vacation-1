import Scene2DSeaCalf from "./winning-scene/scene-2d-sea-calf.js";
import Scene2dCrocodile from "./losing-scene/scene-2d-crocodile";

export const runWinningScene = () => new Scene2DSeaCalf();
export const runLosingScene = () => new Scene2dCrocodile();
