/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

/**
 * Create a sphere barrier to protect the sky town
 */
export class transparencySphere extends GrObject {
    constructor() {
      let geom = new T.SphereBufferGeometry(14, 32, 32);
      let mat = new T.MeshPhongMaterial({ color: "skyblue", opacity: 0.2, transparent: true });
      let sphere = new T.Mesh(geom, mat);
      sphere.scale.set(2.1, 1, 2.1);
      sphere.position.set(0.2, 3, 0.2);
      super(`transparentSphere`, sphere);
    }
  }

export function protectiveBarrier(world){
    let protectiveBarrier = new transparencySphere();
    world.add(protectiveBarrier);
}