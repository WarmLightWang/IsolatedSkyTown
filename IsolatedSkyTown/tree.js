/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

/**
 * Create the tree object
 */
export class GrTree extends GrObject {
  constructor(x, y, z) {
    let counter0 = 0;
    let mat = new T.MeshStandardMaterial({ color: "brown", roughness: 1 });
    let points = [new T.Vector2(0.5, 0), new T.Vector2(0.2, 8)];
    let trunkG = new T.LatheGeometry(points, 4);
    trunkG.computeFlatVertexNormals();

    let branchG = new T.LatheGeometry(points, 4);
    branchG.computeFlatVertexNormals();
    branchG.rotateX(Math.PI / 2);
    let base = new T.Mesh(trunkG, mat);

    for (let i = 0; i < 20; i++) {
      let y = Math.random() * 6;
      let branch = new T.Mesh(branchG, mat);

      let theta = Math.random() * Math.PI * 2;
      let phi = Math.PI / 3 - Math.random() * Math.PI / 6;
      branch.lookAt(new T.Vector3(Math.cos(theta) * Math.sin(phi), Math.cos(phi), Math.sin(phi) * Math.sin(theta)));
      branch.position.y = y + 2;
      let s = (2 / branch.position.y + 1) * 0.25;
      branch.scale.set(s, s, s);
      base.add(branch);

      let sphereG = new T.SphereGeometry((6 / branch.position.y + 6) / 2, -2, 5);
      sphereG.computeFaceNormals();
      let sphere = new T.Mesh(sphereG, new T.MeshStandardMaterial({ color: "green", roughness: 1 }));
      branch.add(sphere);
      sphere.position.z = 8;
      sphereG.scale(0.5, 0.8, 0.7);
    }
    base.position.set(x, y, z);
    base.scale.set(0.15, 0.2, 0.15);

    super(`tree_${counter0}`, base);
  }
}

/**
 * Add trees and organize them
 */
export function tree(world) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 7; j++) {
      let tree = new GrTree(5.1 * j - 15.5, 0, i * 5 + 9);
      tree.setScale(0.4, 0.6, 0.4);
      world.add(tree);
    }
  }
}