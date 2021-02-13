/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";

/**
 * Add a character object to the town
 */
export class char extends Loaders.FbxGrObject {
    constructor() {
      super({
        fbx: "../images/character.fbx",
        norm: 2.0,
        name: "A Man",
        metalness: 22
      });
  
      // the fbx loader puts the character on the ground - we need a ride point above the ground
      this.ridePoint = new T.Object3D();
      this.ridePoint.translateY(2);
      this.objects[0].add(this.ridePoint);
      this.objects[0].scale.set(2, 2, 2);
      this.objects[0].position.set(-11, 0, 1);
      this.objects[0].rotateY(2);
      this.rideable = this.ridePoint;
    }
  }

  export function character(world) {
        let character = new char();
        character.setScale(2, 2.5, 2);
        world.add(character);
  }