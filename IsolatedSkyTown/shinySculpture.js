/*jshint esversion: 6 */

/*
 * Graphics Town  Objects
 * The shiny sculpture sets at the center of the town, and is around by the circular track
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class ShinySculpture extends GrObject {
  /**
   * @param {GrWorld} world
   */
  constructor(world, radius=2) {
    let group = new T.Group();
    super("ShinySculpture", group);
    this.world = world;
    this.cubecam = new T.CubeCamera(radius*1.05, 1000, 128);
    this.sculptureGeom = new T.SphereBufferGeometry(radius, 20, 10);
    this.sculptureMaterial = new T.MeshStandardMaterial({
      color: "white",
      roughness: 0.2,
      metalness: 0.7,
      // @ts-ignore   // envMap has the wrong type
      envMap: this.cubecam.renderTarget.texture,
    });
    this.sculpture = new T.Mesh(this.sculptureGeom, this.sculptureMaterial);
    group.add(this.cubecam);
    group.add(this.sculpture);
    group.position.set(0, 2, -10);
    group.translateY(radius*1.1);

    let image = new T.TextureLoader().load("../images/texture3.jpg");
    let matA = new T.MeshStandardMaterial({ map: image });
    let geom = new T.ConeBufferGeometry(1, 2, 3);
    let mat = new T.MeshStandardMaterial({color: "pink", roughness: 50});
    let mesh = new T.Mesh(geom, matA);
    mesh.position.set(0, -2.8, -0.1);
    mesh.rotateX(3.15);
    group.add(mesh);

    let cg = new T.CylinderBufferGeometry(2, 3, 1, 20);
    let cm = new T.MeshStandardMaterial({color: "pink", roughness: 50});
    let bottom = new T.Mesh(cg, matA);
    bottom.position.set(0, -3.8, 0);
    group.add(bottom);
    group.position.set(0, 4.5, -5);

  }
  tick(delta, timeOfDay) {
    this.cubecam.update(this.world.renderer, this.world.scene);
  }
}
