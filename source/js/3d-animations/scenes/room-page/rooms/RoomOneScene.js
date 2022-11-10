import { RoomScene } from "../RoomScene";
import * as THREE from "three";
import {
  MATERIAL_TYPE, MESH_NAMES,
  OBJECT_ELEMENTS,
  SVG_ELEMENTS,
} from "../../../../constants";
import { MaterialCreator } from "../../../creators/MaterialCreator";
import { Saturn } from "../../../mesh-complex-objects/Saturn";
import { Carpet } from "../../../mesh-complex-objects/Carpet";
import { easeOutCubic } from "../../../../helpers/easing";
import Animation from "../../../../Animation/Animation";
import {degreesToRadians} from '../../../utils/degreesToRadians';

export class RoomOneScene extends RoomScene {
  constructor(pageSceneCreator, animationManager) {
    super(pageSceneCreator, animationManager);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.Purple,
          side: THREE.DoubleSide,
        }
      ),
    };
    this.floor = {
      name: OBJECT_ELEMENTS.floor,
      material: this.pageSceneCreator.materialCreator.create(
        MATERIAL_TYPE.SoftMaterial,
        {
          color: MaterialCreator.Colors.DarkPurple,
        }
      ),
    };

    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput1,
    };

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();

    this.addFlower();
    this.addSaturn();
    this.addCarpet();
    this.addDog();
  }

  addFlower() {
    const config = {
      name: SVG_ELEMENTS.flower,
      extrude: {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.ShadowedLightPurple,
          }
        ),
      },
      transform: {
        position: {
          x: 60,
          y: 410,
          z: 440,
        },
        rotation: {
          x: Math.PI,
          y: -Math.PI / 2,
        },
        scale: 1,
      },
    };

    this.pageSceneCreator.createExtrudedSvgMesh(config, (obj) => {
      this.addObject(obj);
    });
  }

  addSaturn() {
    const group = new THREE.Group();

    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: false,
      withRope: true,
    });

    const transform = {
      position: {
        x: 0,
        y: -1000,
        z: 0,
      },
      rotation: {
        y: -Math.PI / 2,
      },
      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(saturn, transform);

    group.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(20, 20),
        new THREE.MeshPhongMaterial()
      )
    );

    group.position.set(250, 1500, 280);

    group.add(saturn);

    const bounceAngle = 1

    this.animationManager.addAnimations(
      new Animation({
        func: (_, { startTime, currentTime }) => {
          group.rotation.z = degreesToRadians(bounceAngle) * Math.sin((currentTime - startTime) / 1000);
          group.rotation.x = degreesToRadians(bounceAngle) * Math.sin((currentTime - startTime) / 1000);
        },
        duration: "infinite",
        easing: easeOutCubic,
      })
    );

    saturn.traverse(obj => {
      if (obj.isMesh && obj.name === MESH_NAMES.SaturnRing) {
        this.animationManager.addAnimations(
          new Animation({
            func: (_, { startTime, currentTime }) => {
              obj.rotation.x = degreesToRadians(-5) * Math.sin( (currentTime - startTime) / 1000);
              obj.rotation.y = degreesToRadians(10) * Math.sin( (currentTime - startTime) / 1000);
              obj.rotation.z =  degreesToRadians(-18) + degreesToRadians(5) * Math.sin( (currentTime - startTime) / 1000);
            },
            duration: "infinite",
            easing: easeOutCubic,
          })
        );
      }
    })

    this.addObject(group);
  }

  addCarpet() {
    const carpet = new Carpet(this.pageSceneCreator);

    this.addObject(carpet);
  }

  addDog() {
    this.pageSceneCreator.createObjectMesh(
      {
        name: OBJECT_ELEMENTS.dog,
        transform: {
          position: {
            x: 480,
            z: 420,
          },
          rotation: {
            y: 1.1,
          },
          scale: 1,
        },
      },
      (obj) => {
        this.addObject(obj);
      }
    );
  }
}
