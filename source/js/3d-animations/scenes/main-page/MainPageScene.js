import * as THREE from "three";
import {
  BACKGROUND_AXIS_POSITION_Z,
  MATERIAL_TYPE,
  MESH_NAMES,
  OBJECT_ELEMENTS,
  SVG_ELEMENTS,
} from "../../../constants";
import { MaterialCreator } from "../../creators/MaterialCreator";
import { Saturn } from "../../mesh-complex-objects/Saturn";
import {
  createBounceAnimation,
  createObjectTransformAnimation,
} from "../../creators/animationCreators";
import {
  easeInOutSine,
  easeOutCubic,
  easeOutExpo,
} from "../../../helpers/easing";
import Animation from "../../../Animation/Animation";
import { AirplaneRig } from "../../rigs/AirplaneRig/AirplaneRig";
import { KeyholeCover } from "../../mesh-complex-objects/KeyholeCover";

export class MainPageScene extends THREE.Group {
  constructor(pageSceneCreator, animationManager) {
    super();

    this.isPortraitMode = window.innerWidth < window.innerHeight;
    this.pageSceneCreator = pageSceneCreator;
    this.animationManager = animationManager;

    this.meshExtrudedObjects = [
      {
        name: SVG_ELEMENTS.keyhole,
        extrude: {
          depth: 4,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.SoftMaterial,
            {
              color: MaterialCreator.Colors.DarkPurple,
            }
          ),
        },
        transform: {
          position: {
            x: 1000,
            y: 1000,
          },
          rotation: {
            z: Math.PI,
          },
        },
      },
      {
        name: SVG_ELEMENTS.flamingo,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.SoftMaterial,
            {
              color: MaterialCreator.Colors.LightDominantRed,
            }
          ),
        },
        transform: {
          rotation: {
            x: 6.2,
            y: 0,
            z: 3,
          },
          scale: 0,
        },
        transformAppear: {
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.flamingo),
          rotation: {
            x: 6.2,
            y: 0.5,
            z: 3.6,
          },
          scale: 1,
        },
      },
      {
        name: SVG_ELEMENTS.snowflake,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.BasicMaterial,
            {
              color: MaterialCreator.Colors.Blue,
            }
          ),
        },
        transform: {
          rotation: {
            x: 6.1,
            y: -1,
            z: 0.3,
          },
          scale: 0,
        },
        transformAppear: {
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.snowflake),
          rotation: {
            y: 0.7,
          },
          scale: 1,
        },
      },
      {
        name: SVG_ELEMENTS.leaf,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.BasicMaterial,
            {
              color: MaterialCreator.Colors.Green,
            }
          ),
        },
        transform: {
          rotation: {
            x: -1,
            y: 1,
            z: 4.3,
          },
          scale: 0,
        },
        transformAppear: {
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.leaf),
          rotation: {
            x: -0.2,
            y: 2.5,
            z: 4.3,
          },
          scale: 1,
        },
      },
      {
        name: SVG_ELEMENTS.question,
        bounceAnimation: true,
        extrude: {
          depth: 8,
          bevelThickness: 2,
          bevelSize: 2,
          material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.BasicMaterial,
            {
              color: MaterialCreator.Colors.Blue,
            }
          ),
        },
        transform: {
          rotation: {
            x: -1.6,
            y: 2,
            z: 2.8,
          },
          scale: 0,
        },
        transformAppear: {
          position: this.getMeshTransformPositionByName(SVG_ELEMENTS.question),
          rotation: {
            x: -0.7,
            y: 3.2,
            z: 2.8,
          },
          scale: 1,
        },
      },
    ];

    this.meshObjects = [
      {
        name: OBJECT_ELEMENTS.watermelon,
        bounceAnimation: true,
        transform: {
          rotation: {
            x: 0,
            y: 3.3,
            z: 0,
          },
          scale: 0,
        },
        transformAppear: {
          position: this.getMeshTransformPositionByName(
            OBJECT_ELEMENTS.watermelon
          ),
          rotation: {
            x: 0.3,
            y: 3.3,
            z: 0.8,
          },
          scale: 1.8,
        },
      },
      {
        name: OBJECT_ELEMENTS.suitcase,
        transform: {
          scale: 0,
        },
      },
    ];

    this.mainPageGroup = new THREE.Group();

    this.onResize = this.onResize.bind(this);

    window.addEventListener("resize", this.onResize);
  }

  onResize() {
    const isPortraitMode = window.innerWidth < window.innerHeight;

    if (this.isPortraitMode === isPortraitMode) {
      return;
    }

    this.isPortraitMode = isPortraitMode;

    this.mainPageGroup.children.forEach((obj) => {
      const transformPosition = this.getMeshTransformPositionByName(obj.name);

      if (transformPosition) {
        obj.position.copy(transformPosition);
      }
    });
  }

  getMeshTransformPositionByName(name) {
    switch (name) {
      case SVG_ELEMENTS.flamingo:
        return this.isPortraitMode
          ? {
              x: -180,
              y: 370,
              z: 140,
            }
          : {
              x: -460,
              y: 370,
              z: 140,
            };

      case SVG_ELEMENTS.snowflake:
        return this.isPortraitMode
          ? { x: -160, y: 20, z: 90 }
          : { x: -320, y: -20, z: 90 };

      case SVG_ELEMENTS.leaf:
        return this.isPortraitMode
          ? { x: 250, y: 290, z: 100 }
          : { x: 600, y: 290, z: 100 };

      case SVG_ELEMENTS.question:
        return this.isPortraitMode
          ? { x: 30, y: -330, z: 50 }
          : { x: 140, y: -310, z: 50 };

      case OBJECT_ELEMENTS.watermelon:
        return this.isPortraitMode
          ? { x: -200, y: -240, z: 200 }
          : { x: -600, y: -240, z: 200 };

      case MESH_NAMES.Saturn:
        return this.isPortraitMode
          ? { x: 150, y: -150, z: 140 }
          : { x: 350, y: -120, z: 140 };
    }

    return undefined;
  }

  async constructChildren(diceLoader) {
    await this.addMeshObjects(diceLoader);
    await this.addExtrudedSvgObjects(diceLoader);
    this.addKeyholeCover();

    this.addSaturn();

    diceLoader.increasePercentage(5)

    await this.addAeroplaneRig();

    diceLoader.increasePercentage(5)

    this.add(this.mainPageGroup);
    this.mainPageGroup.position.z = BACKGROUND_AXIS_POSITION_Z;
  }

  setRotationYAxis(angle) {
    this.rotation.y = angle;
  }

  async addAeroplaneRig() {
    const airplaneRig = new AirplaneRig(this.pageSceneCreator);

    await airplaneRig.constructRig();

    airplaneRig.position.x = 100;

    const initialFightRadius = airplaneRig.flightRadius;
    const initialFightHeight = airplaneRig.flightHeight;
    const initialRigRotationY = airplaneRig.rigRotationY;
    const initialPlaneRotationZ = airplaneRig.planeRotationZ;
    const initialPlaneIncline = airplaneRig.planeIncline;

    this.animationManager.addMainPageAnimations(
      new Animation({
        func: (progress) => {
          airplaneRig.flightRadius =
            initialFightRadius +
            (airplaneRig.maxFlightRadius - initialFightRadius) * progress;

          airplaneRig.flightHeight =
            initialFightHeight +
            (airplaneRig.maxFlightHeight - initialFightHeight) * progress;

          airplaneRig.rigRotationY =
            initialRigRotationY + (progress * 5 * Math.PI) / 4;

          airplaneRig.planeRotationZ =
            progress < 0.5
              ? initialPlaneRotationZ - progress * Math.PI
              : initialPlaneRotationZ -
                0.5 * Math.PI +
                (progress - 0.5) * Math.PI;

          airplaneRig.planeIncline =
            initialPlaneIncline + (progress * Math.PI) / 4.5;

          airplaneRig.invalidate(progress);
        },
        duration: 2000,
        delay: 1400,
        easing: easeOutExpo,
      }),
      createBounceAnimation(airplaneRig)
    );

    this.addMesh(airplaneRig);
  }

  async addMeshObjects(diceLoader) {
    await Promise.all(
      this.meshObjects.map(async (config) => {
        const obj = await this.pageSceneCreator.createObjectMesh(config);

        diceLoader.increasePercentage(5)

        this.addObject(config)(obj);
      })
    );
  }

  async addExtrudedSvgObjects(diceLoader) {
    await Promise.all(
      this.meshExtrudedObjects.map(async (config) => {
        const obj = await this.pageSceneCreator.createExtrudedSvgMesh(config);

        diceLoader.increasePercentage(5)

        this.addObject(config)(obj);
      })
    );
  }

  addObject(config) {
    return (obj) => {
      if (config.name === OBJECT_ELEMENTS.suitcase) {
        const suitcase = this.addSuitCaseAnimation(obj);

        this.addMesh(suitcase);
        return;
      }

      if (config.transformAppear) {
        this.animationManager.addMainPageAnimations(
          createObjectTransformAnimation(obj, config.transformAppear, {
            duration: 1500,
            delay: 500,
            easing: easeOutCubic,
          })
        );
      }

      if (config.bounceAnimation) {
        this.animationManager.addMainPageAnimations(createBounceAnimation(obj));
      }

      this.addMesh(obj);
    };
  }

  addSaturn() {
    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: false,
      withRope: false,
    });

    this.pageSceneCreator.setTransformParams(saturn, {
      rotation: { y: 3.6, z: 1 },
      scale: 0,
    });

    this.animationManager.addMainPageAnimations(
      createObjectTransformAnimation(
        saturn,
        {
          position: this.getMeshTransformPositionByName(MESH_NAMES.Saturn),
          rotation: { y: 3.6, z: 0 },
          scale: 0.5,
        },
        {
          duration: 1500,
          delay: 500,
          easing: easeOutCubic,
        }
      )
    );

    this.animationManager.addMainPageAnimations(createBounceAnimation(saturn));

    this.addMesh(saturn);
  }

  addKeyholeCover() {
    const keyholeCover = new KeyholeCover(this.pageSceneCreator);

    keyholeCover.position.set(0, 0, -700);

    this.addMesh(keyholeCover);
  }

  addMesh(mesh) {
    this.mainPageGroup.add(mesh);
  }

  addSuitCaseAnimation(suitcase) {
    const suitcasePositionWrapper = new THREE.Group();
    const suitcaseRotateWrapper = new THREE.Group();

    suitcaseRotateWrapper.add(suitcase);
    suitcasePositionWrapper.add(suitcaseRotateWrapper);

    suitcaseRotateWrapper.rotation.set(0.2, -1.5, 1.3, "YZX");

    this.animationManager.addMainPageAnimations(
      new Animation({
        func: (progress) => {
          suitcaseRotateWrapper.rotation.set(
            0.2 - 0.6 * progress,
            -1.5,
            1.3,
            "YZX"
          );
        },
        duration: 500,
        delay: 500,
        easing: easeInOutSine,
      }),
      new Animation({
        func: (progress) => {
          suitcaseRotateWrapper.rotation.set(
            -0.4,
            -1.5 - progress,
            1.3 * (1 - progress),
            "YZX"
          );
        },
        duration: 500,
        delay: 1000,
        easing: easeInOutSine,
      })
    );

    this.animationManager.addMainPageAnimations(
      new Animation({
        func: (progress) => {
          suitcasePositionWrapper.position.y = progress * 70;
          suitcasePositionWrapper.position.z = progress * 60;
        },
        duration: 500,
        delay: 500,
        easing: easeInOutSine,
      }),
      new Animation({
        func: (progress) => {
          suitcasePositionWrapper.position.x = -60 * progress;
          suitcasePositionWrapper.position.y = 70 - 220 * progress;
          suitcasePositionWrapper.position.z = 60 + progress * 60;
        },
        duration: 600,
        delay: 1000,
        easing: easeInOutSine,
      })
    );

    this.animationManager.addMainPageAnimations(
      new Animation({
        func: (progress) => {
          const scale = 0.4 * progress;

          suitcase.scale.set(scale, scale, scale);
        },
        duration: 1000,
        delay: 500,
        easing: easeInOutSine,
      })
    );

    this.animationManager.addMainPageAnimations(
      createBounceAnimation(suitcasePositionWrapper)
    );

    return suitcasePositionWrapper;
  }
}
