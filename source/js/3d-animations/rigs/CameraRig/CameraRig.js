import * as THREE from "three";
import { degreesToRadians } from "../../utils/degreesToRadians";
import Animation from "../../../Animation/Animation";
import { easeInOutSine } from "../../../helpers/easing";
import { AnimationController } from "./AnimationController";
import { BACKGROUND_AXIS_POSITION_Z } from "../../../constants";

export class CameraRig extends THREE.Group {
  static getCameraRigStageState(nextSceneIndex, prevRoomIndex = 1) {
    // переход из комнаты на главную
    if (nextSceneIndex === 0) {
      return {
        newStateParams: {
          index: nextSceneIndex,
          depth: CameraRig.getMaxDepth(),
          rotationAxisYAngle: ((prevRoomIndex - 1) * Math.PI) / 2,
          horizonIncline: 0,
          pitchRotation: 0,
          pitchDepth: 1405,
        },
        animationParams: {
          duration: 1500,
          easing: easeInOutSine,
        },
      };
    }

    // переход с главной к комнате
    if (typeof nextSceneIndex !== "number") {
      return {
        newStateParams: {
          index: prevRoomIndex,
          depth: CameraRig.getMinDepth(),
          rotationAxisYAngle: ((prevRoomIndex - 1) * Math.PI) / 2,
          horizonIncline: -degreesToRadians(15),
          pitchRotation: 0,
          pitchDepth: 2200,
        },
        animationParams: {
          duration: 1500,
          easing: easeInOutSine,
        },
      };
    }

    // переход между комнатами
    if ([1, 2, 3, 4].includes(nextSceneIndex)) {
      return {
        newStateParams: {
          index: nextSceneIndex,
          depth: CameraRig.getMinDepth(),
          rotationAxisYAngle: ((nextSceneIndex - 1) * Math.PI) / 2,
          horizonIncline: -degreesToRadians(15),
          pitchDepth: 2200,
        },
        animationParams: {
          duration: 700,
          easing: easeInOutSine,
        },
      };
    }

    return { newStateParams: {}, animationParams: {} };
  }

  static getMinDepth() {
    return 0;
  }

  static getMaxDepth() {
    return -BACKGROUND_AXIS_POSITION_Z;
  }

  constructor(stateParameters, sceneController) {
    super();

    this.stateParameters = stateParameters.newStateParams;

    this.keyholeCover = sceneController.mainPageScene.children[0].children.find(
      ({ name }) => name === "keyholeCover"
    );

    // Set internal parameters
    this._depth = this.stateParameters.depth || 0;
    this._rotationAxisYAngle = this.stateParameters.rotationAxisYAngle || 0;
    this._horizonIncline = this.stateParameters.horizonIncline || 0;
    this._pitchRotation = this.stateParameters.pitchRotation || 0;
    this._pitchDepth = this.stateParameters.pitchDepth || 0;

    this._depthChanged = true;
    this._rotationAxisYAngleChanged = true;
    this._horizonInclineChanged = true;
    this._pitchRotationChanged = true;
    this._pitchDepthChanged = true;

    this.animationController = new AnimationController();

    this.constructRigElements();

    this.position.z = CameraRig.getMaxDepth();

    // Set Rig to the initial state
    this.invalidate();
  }

  constructRigElements() {
    // Construct parts
    const depthTrack = new THREE.Group();
    const rotationAxis = new THREE.Group();
    const pitchAxis = new THREE.Group();
    const cameraNull = new THREE.Group();

    // Connect
    this.add(rotationAxis);
    rotationAxis.add(depthTrack);
    depthTrack.add(pitchAxis);
    depthTrack.add(pitchAxis);
    pitchAxis.add(cameraNull);

    this.depthTrack = depthTrack;
    this.rotationAxis = rotationAxis;
    this.pitchAxis = pitchAxis;
    this.cameraNull = cameraNull;

    this.pitchAxis.position.z = this.pitchDepth;
  }

  setState(newStateParameters) {
    this.stateParameters = newStateParameters;
  }

  set depth(value) {
    if (value === this._depth) return;

    this._depth = value;
    this._depthChanged = true;

    if (this.keyholeCover) {
      let opacity;

      const fullOpacityBreakpoint = -2200;
      const noOpacityBreakpoint = -1800;

      if (value < fullOpacityBreakpoint) {
        opacity = 1;
      } else if (value > noOpacityBreakpoint) {
        opacity = 0;
      } else {
        opacity =
          (value - noOpacityBreakpoint) /
          (fullOpacityBreakpoint - noOpacityBreakpoint);
      }

      this.keyholeCover.opacity = opacity;

      this.keyholeCover.invalidate();
    }
  }

  get depth() {
    return this._depth;
  }

  set horizonIncline(value) {
    if (value === this._horizonIncline) return;

    this._horizonIncline = value;
    this._horizonInclineChanged = true;
  }

  get horizonIncline() {
    return this._horizonIncline;
  }

  get rotationAxisYAngle() {
    return this._rotationAxisYAngle;
  }

  set rotationAxisYAngle(value) {
    if (value === this._rotationAxisYAngle) return;

    this._rotationAxisYAngle = value;
    this._rotationAxisYAngleChanged = true;
  }

  get pitchRotation() {
    return this._pitchRotation;
  }

  set pitchRotation(value) {
    if (value === this._pitchRotation) return;

    this._pitchRotation = value;
    this._pitchRotationChanged = true;
  }

  get pitchDepth() {
    return this._pitchDepth;
  }

  set pitchDepth(value) {
    if (value === this._pitchDepth) return;

    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }

  invalidate() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }

    if (this._horizonInclineChanged) {
      this.depthTrack.rotation.x = this._horizonIncline;
      this.pitchAxis.position.y =
        this._pitchDepth * Math.tan(this._horizonIncline);

      this._horizonInclineChanged = false;
    }

    if (this._rotationAxisYAngleChanged) {
      this.rotationAxis.rotation.y = this._rotationAxisYAngle;

      this._rotationAxisYAngleChanged = false;
    }

    if (this._pitchRotationChanged) {
      this.cameraNull.position.y =
        Math.tan(this._pitchRotation) * this._pitchDepth;
      this.cameraNull.rotation.x = -this._pitchRotation;

      this._pitchRotationChanged = false;
    }

    if (this._pitchDepthChanged) {
      this.pitchAxis.position.z = this._pitchDepth;

      this._pitchDepthChanged = false;
    }
  }

  addObjectToRotationAxis(object) {
    this.rotationAxis.add(object);
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  changeStateTo({ newStateParams, animationParams }, onComplete) {
    const initDepth = this._depth;
    const initHorizonIncline = this._horizonIncline;
    const initRotationAxisYAngle = this._rotationAxisYAngle;
    const initPitchRotation = this._pitchRotation;
    const initPitchDepth = this._pitchDepth;

    this.animationController.start(
      new Animation({
        func: (progress) => {
          if (typeof newStateParams.depth === "number") {
            this.depth =
              initDepth + (newStateParams.depth - initDepth) * progress;
          }

          if (typeof newStateParams.horizonIncline === "number") {
            this.horizonIncline =
              initHorizonIncline +
              (newStateParams.horizonIncline - initHorizonIncline) * progress;
          }

          if (typeof newStateParams.rotationAxisYAngle === "number") {
            this.rotationAxisYAngle =
              initRotationAxisYAngle +
              (newStateParams.rotationAxisYAngle - initRotationAxisYAngle) *
                progress;
          }

          if (typeof newStateParams.pitchRotation === "number") {
            this.pitchRotation =
              initPitchRotation +
              (newStateParams.pitchRotation - initPitchRotation) * progress;
          }

          if (typeof newStateParams.pitchDepth === "number") {
            this.pitchDepth =
              initPitchDepth +
              (newStateParams.pitchDepth - initPitchDepth) * progress;
          }

          this.invalidate();
        },
        duration: animationParams.duration,
        easing: animationParams.easing,
        callback: () => {
          this.setState(newStateParams);

          if (typeof onComplete === "function") {
            onComplete();
          }
        },
      })
    );
  }
}
