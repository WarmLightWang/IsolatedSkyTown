/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";

/**
 * Make buildings to the town and the shaders to move on the buildings
 */
export class GrBuilding extends GrObject {
  constructor() {
    let counter = 0;
    let light = new T.Color(0xffffff);
    let shadow = new T.Color(0x303050);
    let baseG = new T.BoxGeometry(1, 4.5, 1);
    let bm = new T.MeshLambertMaterial({ color: light });
    baseG.translate(2, 1.8, 3);
    let base = new T.Mesh(baseG, bm);
    base.position.set(-1, -1, -1);

    let floorG = new T.BoxGeometry(1.1, 3, 1.1);
    let fm = new T.MeshStandardMaterial({ color: shadow, metalness: 0, roughness: 88 });
    let floors = new T.Mesh(floorG, fm);
    floors.scale.set(1, 0.1, 1);
    floorG.translate(2, 2, 3);
    base.add(floors);

    let a = floors.clone();
    a.position.setY(0.5);
    base.add(a);

    let b = floors.clone();
    b.position.setY(1);
    base.add(b);

    let c = floors.clone();
    c.position.setY(1.5);
    base.add(c);

    let d = floors.clone();
    d.position.setY(2);
    base.add(d);

    let e = floors.clone();
    e.position.setY(2.5);
    base.add(e);

    let f = floors.clone();
    f.position.setY(3);
    f.scale.set(1, 0.25, 1);
    base.add(f);

    // the roof
    let geometry = new T.Geometry();
    geometry.vertices.push(new T.Vector3(0, -0, 0));
    geometry.vertices.push(new T.Vector3(1, 1, 1));
    geometry.vertices.push(new T.Vector3(1, 1, -1));
    geometry.vertices.push(new T.Vector3(-1, 1, 1));
    geometry.vertices.push(new T.Vector3(-1, 1, -1));
    geometry.vertices.push(new T.Vector3(0, 2, 0));

    let f1 = new T.Face3(5, 1, 2);
    f1.color.setStyle("lightblue");
    geometry.faces.push(f1);

    let f2 = new T.Face3(5, 2, 4);
    f2.color.setStyle("lightblue");
    geometry.faces.push(f2);

    let f3 = new T.Face3(5, 4, 3);
    f3.color.setStyle("lightblue");
    geometry.faces.push(f3);

    let f4 = new T.Face3(5, 3, 1);
    f4.color.setStyle("lightblue");
    geometry.faces.push(f4);
    geometry.computeFaceNormals();

    let material = new T.MeshStandardMaterial({ roughness: 0.75, vertexColors: T.VertexColors });
    let mesh = new T.Mesh(geometry, material);

    mesh.scale.set(0.5, 1, 0.5);
    mesh.position.set(2, 3, 3);

    base.add(mesh);
    base.position.set(5, 0.5, -18);
    base.scale.set(1, 3, 1);

    super(`building-${counter}`, base);
  }
}

export class GrBuilding1 extends GrObject {
  constructor() {
    let counter1 = 0;
    let building1 = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };
    let bodyCurve = new T.Shape();
    bodyCurve.moveTo(-1, 0);
    bodyCurve.lineTo(-0.8, 2.5);
    bodyCurve.lineTo(0, 2.8);
    bodyCurve.lineTo(0.8, 2.5);
    bodyCurve.lineTo(1, 0);
    bodyCurve.lineTo(-1, 0);
    let bodyG = new T.ExtrudeBufferGeometry(bodyCurve, exSettings);
    let bodyM = new T.MeshStandardMaterial({ color: "lightblue" });
    let body = new T.Mesh(bodyG, bodyM);
    body.scale.set(1, 3.6, 0.8);
    building1.add(body);

    let geom = new T.ExtrudeBufferGeometry(bodyCurve, exSettings);
    let mat = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.6, roughness: 1 });
    let body1 = new T.Mesh(geom, mat);
    body1.scale.set(0.4, 3.5, 0.85);
    building1.add(body1);

    let bg = new T.BoxBufferGeometry(1, 1, 1);
    let bm = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.6, roughness: 1 });
    let mesh = new T.Mesh(bg, bm);
    mesh.scale.set(2.2, 0.5, 1.4);
    mesh.position.set(0, -0.5, 0.5);
    building1.add(mesh);
    super(`building1-${counter1}`, building1);
  }
}

export class GrBuilding2 extends GrObject {
  constructor() {
    let counter2 = 0;
    let building2 = new T.Group();
    let exSettings = {
      steps: 2,
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };
    let bodyCurve = new T.Shape();
    bodyCurve.moveTo(-1, 0);
    bodyCurve.lineTo(-1, 2);
    bodyCurve.lineTo(-0.8, 2);
    bodyCurve.lineTo(-0.8, 4);
    bodyCurve.lineTo(-0.6, 4);
    bodyCurve.lineTo(-0.6, 6);
    bodyCurve.lineTo(-0.5, 6);
    bodyCurve.lineTo(-0.5, 7);
    bodyCurve.lineTo(-0.4, 7);
    bodyCurve.lineTo(-0.4, 8);
    bodyCurve.lineTo(-0.3, 8.1);
    bodyCurve.lineTo(-0.3, 9);
    bodyCurve.lineTo(-0.2, 9.1);
    bodyCurve.lineTo(-0.1, 10.5);
    bodyCurve.lineTo(-0.1, 10.5);
    bodyCurve.lineTo(-0.1, 9);
    bodyCurve.lineTo(-0.1, 0);
    bodyCurve.lineTo(-1, 0);
    let bodyG = new T.ExtrudeBufferGeometry(bodyCurve, exSettings);
    let bodyM = new T.MeshStandardMaterial({ color: "lightblue" });
    let body = new T.Mesh(bodyG, bodyM);
    body.scale.set(1.5, 1.5, 0.3);
    body.position.set(1, 0, 1);
    building2.add(body);

    let right = bodyG.clone();
    let rm = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.5 });
    let bodyR = new T.Mesh(right, rm);
    bodyR.scale.set(1.6, 1.33, 0.35);
    bodyR.position.set(0.7, 0, 1.3);
    bodyR.rotation.set(0.005, -3.2, 0.01);
    building2.add(bodyR);

    let bg = new T.BoxBufferGeometry(1, 1, 1);
    let bm = new T.MeshStandardMaterial({ color: "white", metalness: 0.1, roughness: 1 });
    let mesh = new T.Mesh(bg, bm);
    mesh.scale.set(2.6, 0.4, 0.7);
    mesh.position.set(0.9, 4, 1.18);
    building2.add(mesh);

    let m1 = mesh.clone();
    m1.scale.set(2.1, 0.4, 0.65);
    m1.position.set(0.9, 7, 1.15);
    building2.add(m1);

    let m2 = mesh.clone();
    m2.scale.set(1.6, 0.25, 0.65);
    m2.position.set(0.85, 9.7, 1.15);
    building2.add(m2);

    let m3 = mesh.clone();
    m3.scale.set(1.4, 0.2, 0.6);
    m3.position.set(0.85, 11.2, 1.17);
    building2.add(m3);

    super(`building2-${counter2}`, building2);
  }
}

export class GrBuilding3 extends GrObject {
  constructor() {
    let counter3 = 0;
    let building3 = new T.Group();
    //body parts
    let exSettings = {
      steps: 2,
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };
    let bodyCurve = new T.Shape();
    bodyCurve.moveTo(-1, 0);
    bodyCurve.lineTo(0, 3);
    bodyCurve.lineTo(1, 0);
    bodyCurve.lineTo(-1, 0);
    let bodyG = new T.ExtrudeBufferGeometry(bodyCurve, exSettings);
    let bodyM = new T.MeshStandardMaterial({ color: "skyblue", metalness: 0.4, roughness: 0.5 });
    let body = new T.Mesh(bodyG, bodyM);
    body.scale.set(0.88, 2.92, 0.98);
    body.position.set(0.5, 0.9, -0.6);
    building3.add(body);

    let bg = new T.BoxBufferGeometry(1, 1, 1);
    let bm = new T.MeshStandardMaterial({ color: "skyblue" });
    let box = new T.Mesh(bg, bm);
    box.scale.set(2, 10, 1.5);
    box.position.set(0.5, 5, 0);
    building3.add(box);

    let bg1 = bg.clone();
    let bm1 = new T.MeshStandardMaterial({ color: "skyblue", metalness: 0.6 });
    let bottom = new T.Mesh(bg1, bm1);
    bottom.scale.set(2.1, 1, 1.6);
    bottom.position.set(0.5, 0.5, -0.03);
    building3.add(bottom);

    // top part
    let tg = new T.TetrahedronBufferGeometry(0.5, 1);
    let tm = new T.MeshStandardMaterial({ color: "skyblue", metalness: 0.4 });
    let tetra = new T.Mesh(tg, tm);
    tetra.scale.set(0.6, 0.8, 0.6);
    tetra.position.set(0, 0.4, 0);
    box.add(tetra);

    let top = bottom.clone();
    top.position.set(0.5, 10, 0);
    top.scale.set(1.5, 1, 1);
    building3.add(top);

    super(`building3-${counter3}`, building3);
  }
}


export class GrBuilding4 extends GrObject {
  constructor() {
    let counter4 = 0;
    let building4 = new T.Group();
    let bg = new T.BoxBufferGeometry(1, 1, 1);
    let bm = new T.MeshStandardMaterial({ color: "skyblue" });
    let box = new T.Mesh(bg, bm);
    box.scale.set(2.5, 8, 1.5);
    box.position.set(0.5, 4, 0);
    building4.add(box);

    let fg = new T.BoxBufferGeometry(1, 1, 1);
    let fm = new T.MeshStandardMaterial({ color: "white", metalness: 0.3, roughness: 0 });
    let mesh = new T.Mesh(fg, fm);
    mesh.scale.set(0.2, 8, 0.1);
    mesh.position.set(0.5, 4, 0.8);
    building4.add(mesh);

    let f1 = mesh.clone();
    f1.position.set(1.1, 4, 0.8);
    building4.add(f1);
    let f2 = mesh.clone();
    f2.position.set(1.65, 4, 0.8);
    building4.add(f2);
    let f3 = mesh.clone();
    f3.position.set(-0.1, 4, 0.8);
    building4.add(f3);
    let f4 = mesh.clone();
    f4.position.set(-0.65, 4, 0.8);
    building4.add(f4);

    let f5 = mesh.clone();
    f5.scale.set(2.5, 0.5, 1.6);
    f5.position.set(0.5, 8, 0.04);
    building4.add(f5);
    let f6 = mesh.clone();
    f6.scale.set(2.5, 0.5, 1.6);
    f6.position.set(0.5, 0.2, 0.04);
    building4.add(f6);
    let f7 = box.clone();
    f7.scale.set(2, 0.3, 1);
    f7.position.set(0.5, 8.5, 0);

    super(`building4-${counter4}`, building4);
  }
}

export class GrBuilding5 extends GrObject {
  constructor() {
    let counter5 = 0;
    let building5 = new T.Group();
    let bg = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let bm = new T.MeshStandardMaterial({ color: "skyblue" });
    let box = new T.Mesh(bg, bm);
    box.scale.set(2, 7, 2);
    box.position.set(-4, 5.5, 3);
    building5.add(box);
    let fg = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let fm = new T.MeshStandardMaterial({ color: "white", metalness: 0.1 });
    let mesh = new T.Mesh(fg, fm);
    mesh.scale.set(2.05, 0.3, 2.05);
    mesh.position.set(-4, 10.5, 3);
    building5.add(mesh);

    let b1 = mesh.clone();
    b1.position.set(-4, 8.8, 3);
    building5.add(b1);
    let b2 = box.clone();
    b2.position.set(-4, 11, 3);
    b2.scale.set(1.8, 1.3, 1.8);
    building5.add(b2);
    let b3 = mesh.clone();
    b3.scale.set(1.85, 0.3, 1.85);
    b3.position.set(-4, 12, 3);
    building5.add(b3);
    let b4 = box.clone();
    b4.scale.set(1.5, 0.7, 1.5);
    b4.position.set(-4, 12.5, 3);
    building5.add(b4);
    let b5 = mesh.clone();
    b5.scale.set(1.55, 0.3, 1.55);
    b5.position.set(-4, 13.2, 3);
    building5.add(b5);
    let b6 = box.clone();
    b6.scale.set(1.2, 0.7, 1.2);
    b6.position.set(-4, 13.5, 3);
    building5.add(b6);

    let tg = new T.ConeBufferGeometry(1, 1, 10);
    let tm = new T.MeshStandardMaterial({ color: "skyblue" });
    let top = new T.Mesh(tg, tm);
    top.scale.set(1, 1.6, 1);
    top.position.set(-4, 14.8, 3);
    building5.add(top);

    let t1 = top.clone();
    t1.scale.set(0.8, 1.3, 0.8);
    t1.position.set(-4, 15.1, 3);
    building5.add(t1);
    let t2 = top.clone();
    t2.scale.set(0.3, 2, 0.3);
    t2.position.set(-4, 16.3, 3);
    building5.add(t2);
    super(`building5-${counter5}`, building5);
  }
}

export class GrBuilding6 extends GrObject {
  constructor(param = {}) {
    let counter6 = 0;
    let building6 = new T.Group();
    let bg = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let bm = new T.MeshStandardMaterial({ color: "skyblue" });
    let box = new T.Mesh(bg, bm);
    box.scale.set(2, 7, 1);
    box.position.set(-4, 5.5, 3);
    building6.add(box);
    let fg = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let fm = new T.MeshStandardMaterial({ color: "skyblue", metalness: 0.4 });
    let mesh = new T.Mesh(fg, fm);
    mesh.scale.set(2.05, 0.2, 1.05);
    mesh.position.set(-4, 10.8, 3);
    building6.add(mesh);

    let b1 = mesh.clone();
    b1.position.set(-4, 10.3, 3);
    building6.add(b1);
    let b2 = mesh.clone();
    b2.position.set(-4, 7.5, 3);
    building6.add(b2);
    let b3 = mesh.clone();
    b3.position.set(-4, 4, 3);
    building6.add(b3);
    let b4 = mesh.clone();
    b4.position.set(-4, 0.2, 3);
    building6.add(b4);

    super(`building6-${counter6}`, building6);
  }
}


export class bridge extends GrObject {
  constructor() {
    let counter11 = 0;
    let br = new T.Group();
    let fg = new T.BoxBufferGeometry(1.5, 1.5, 1.5);
    let fm = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.3 });
    let mesh = new T.Mesh(fg, fm);
    mesh.scale.set(5, 0.4, 0.4);
    mesh.position.set(0, 7, -13.5);
    br.add(mesh);
    let m1 = mesh.clone();
    m1.scale.set(0.1, 3, 0.1);
    m1.position.set(1.2, 5.1, -13.5);
    m1.rotation.set(0, 0, 0.7);
    br.add(m1);
    let m2 = mesh.clone();
    m2.scale.set(0.1, 3, 0.1);
    m2.position.set(-1.5, 5.1, -13.5);
    m2.rotation.set(0, 0, -0.7);
    br.add(m2);
    //br.position.set(1.2, 5, -13.5);

    super(`bridge-${counter11}`, br);
  }
}

export function building(world) {
  // add right building
  let b = [];
  let counter = 0;
  for (let i = 0; i < 2; i++) {
    let building = new GrBuilding();
    building.setScale(i + 1, 1.8, 1.2 + i);
    building.setPos(6, 1, -15);
    b[0] = building;
    world.add(b[0]);
    counter++;
  }

  let building1 = new GrBuilding1();
  building1.setPos(13, 0.8, -11);
  building1.setScale(1, 0.85, 1);
  world.add(building1);
  let building11 = new GrBuilding1();
  building11.setScale(1, 0.9, 1);
  building11.setPos(12, 0.8, -14.5);
  world.add(building11);

  let building2 = new GrBuilding2();
  building2.setPos(12, 0, -14);
  building2.setScale(1, 0.8, 1);
  world.add(building2);
  let building22 = new GrBuilding2();
  building22.setPos(6, 0, -15);
  building22.setScale(1, 0.9, 1);
  world.add(building22);

  let building3 = new GrBuilding3();
  building3.setPos(9, 0, -14);
  building3.setScale(1, 1, 1);
  world.add(building3);

  let building4 = new GrBuilding4();
  building4.setScale(1.4, 0.96, 1.5);
  building4.setPos(10.5, 0, -5);
  world.add(building4);

  // add left biuildings
  let left1 = new GrBuilding1();
  left1.setPos(-9, 0.8, -11);
  world.add(left1);

  let left2 = new GrBuilding2();
  left2.setPos(-13, 0, -13);
  left2.setScale(1, 0.85, 1);
  world.add(left2);

  let left3 = new GrBuilding3();
  left3.setPos(-7.5, 0, -13.5);
  left3.setScale(1, 1.1, 1);
  world.add(left3);

  let left = new GrBuilding();
  left.setPos(-15, 1, -17);
  left.setScale(2, 2.4, 1);
  world.add(left);

  let building6 = new GrBuilding6();
  building6.setPos(-6.5, 0, -13);
  building6.setScale(1.1, 0.75, 2);
  world.add(building6);

  // middle two buildings
  let building5 = new GrBuilding5();
  building5.setScale(0.8, 0.9, 0.8);
  building5.setPos(-1, 0, -16);
  world.add(building5);
  let middle2 = new GrBuilding5();
  middle2.setScale(0.8, 0.9, 0.8);
  middle2.setPos(7, 0, -16);
  world.add(middle2);

  let br = new bridge();
  world.add(br);

  // Making shaders move on the buildings 
  let shaderMat2 = shaderMaterial("shader.vs", "shader.fs");
  let s2 = new SimpleObjects.GrCube({ x: -1, y: 7, z: -13.5, size: 2.4, material: shaderMat2 });
  s2.setScale(0.7, 0.3, 0.5);
  let sh = 0;
  s2.tick = function (delta) { sh += delta; s2.objects[0].position.x = 2 * Math.sin(sh / 500) - 0.2; };
  world.add(s2);

  let s1 = new SimpleObjects.GrCube({ x: 11.2, y: 7, z: -4.9, size: 2.5, material: shaderMat2 });
  s1.setScale(1.3, 0.1, 0.9);
  let sh1 = 0;
  s1.tick = function (delta) { sh1 += delta; s1.objects[0].position.y = 3.99 * Math.sin(sh1 / 400) + 3.9; };
  world.add(s1);

  let s3 = new SimpleObjects.GrCube({ x: 11.2, y: 7, z: -4.9, size: 2.5, material: shaderMat2 });
  s3.setScale(1.3, 0.1, 0.9);
  let sh3 = 0;
  s3.tick = function (delta) { sh3 += delta; s3.objects[0].position.y = 3.99 * Math.sin(sh3 / 388) + 3.9; };
  world.add(s3);

}