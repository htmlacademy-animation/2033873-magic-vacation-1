import Scene2DSeaCalf from "./scenes/winning-scene/scene-2d-sea-calf.js";
import Scene2dCrocodile from "./scenes/losing-scene/scene-2d-crocodile";

export const runWinningScene = () => new Scene2DSeaCalf();
export const runLosingScene = () => new Scene2dCrocodile();
