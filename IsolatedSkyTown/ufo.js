/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Group } from "../libs/CS559-THREE/build/three.module.js";

/**
 * Create the objects group together as an ufo
 */
export class Grufo extends GrObject {

  constructor(param = {}) {
    let counter8 = 0;

    let ufo = new Group();

    let image = new T.TextureLoader().load("../images/texture3.jpg");
    let matA = new T.MeshStandardMaterial({ map: image });

    let image1 = new T.TextureLoader().load("../images/texture7.jpg");
    let matB = new T.MeshStandardMaterial({ map: image1 });

    let sg = new T.SphereBufferGeometry(2.6, 32, 32);
    //let sm = new T.MeshStandardMaterial({ color: "skyblue" });
    let mesh = new T.Mesh(sg, matA);
    mesh.scale.set(1, 0.7, 1);

    let tg = new T.TorusBufferGeometry(2, 2.5, 3, 100);
    //let tm = new T.MeshStandardMaterial({ color: "blue" });
    let mesh1 = new T.Mesh(tg, matB);
    mesh1.rotateX(1.5);
    mesh.add(mesh1);
    mesh.position.set(-30, 8, -60);

    ufo.add(mesh);
    super(`ufo-${counter8}`, ufo);
  }
}

/**
 * Create the different movements of each ufo, and add them to the world
 */
export function ufo(world) {
  let ufo = new Grufo();
  world.add(ufo);

  let cb2t = 0;
  ufo.tick = function (delta) { cb2t += delta; ufo.objects[0].position.x = 2 * Math.sin(cb2t / 1000); };

  let ufa1 = new Grufo();
  ufa1.setPos(-20, 0, 20);
  world.add(ufa1);
  ufa1.tick = function (delta) { cb2t += delta; ufa1.objects[0].position.y = 2 * Math.sin(cb2t / 1000); };

  let ufa2 = new Grufo();
  ufa2.setPos(55, 0, -20);
  world.add(ufa2);
  ufa2.tick = function (delta) { cb2t += delta; ufa2.objects[0].position.z = 25 * Math.sin(cb2t / 2000); };

}
