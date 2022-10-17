import * as THREE from "three";
import vertexShader from "../../../shader/roadMaterialShader/vertexShader.glsl";
import fragmentShader from "../../../shader/roadMaterialShader/fragmentShader.glsl";

export class RoadCustomMaterial extends THREE.ShaderMaterial {
  constructor(config) {
    super({ uniforms: {}, vertexShader, fragmentShader, ...config });
  }
}
