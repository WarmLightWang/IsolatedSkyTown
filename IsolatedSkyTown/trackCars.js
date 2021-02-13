/*jshint esversion: 6 */

/*
 * Graphics Town Objects
 * A simple circular track and three cars goes around on it
 * 
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GrGroup } from "../libs/CS559-Framework/SimpleObjects.js";

/**
 * Create a simple circular track
 */
export class CircularTrack extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 6;
    let width = params.width || 1;
    let ring = new T.RingGeometry(radius - width, radius + width * 2, 20, 3);
    let material = new T.MeshStandardMaterial({
      side: T.DoubleSide,
      color: "#909090",
      roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    mesh.position.set(0, 0, -5);
    mesh.rotateX(Math.PI / 2);
    let group = new T.Group();
    group.add(mesh);
    group.translateX(params.x || 0);
    group.translateY(params.bias || 0.1); // raise track above ground to avoid z-fight
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.z = params.z || 0;
    this.y = params.bias || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

/**
 * Create a simple car object to go around the track
 */
export class TrackCar2 extends GrGroup {
  constructor(track, params = {}) {
    super({});
    this.track = track;
    this.u = 0;
    let length = 1, width = 1;

    let shape = new T.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    let extrudeSettings = {
      steps: 0,
      depth: 3,
      bevelEnabled: true,
      bevelThickness: 2.5,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1
    };
    let car2G = new T.ExtrudeBufferGeometry(shape, extrudeSettings);
    let car2M = new T.MeshStandardMaterial({ color: "orange", metalness: -0.5 });
    let car2 = new T.Mesh(car2G, car2M);
    car2.scale.set(0.4, 0.2, 0.4);

    let glassG = new T.Geometry();
    glassG.vertices.push(new T.Vector3(0, 0, 0));
    glassG.vertices.push(new T.Vector3(1, 1, 1));
    glassG.vertices.push(new T.Vector3(1, 1, -1));
    glassG.vertices.push(new T.Vector3(-1, 1, 1));
    glassG.vertices.push(new T.Vector3(-1, 1, -1));
    glassG.vertices.push(new T.Vector3(0, 2, 0));

    let f1 = new T.Face3(5, 1, 2);
    f1.color.setStyle("pink");
    glassG.faces.push(f1);

    let f2 = new T.Face3(5, 2, 4);
    f2.color.setStyle("pink");
    glassG.faces.push(f2);

    let f3 = new T.Face3(5, 4, 3);
    f3.color.setStyle("pink");
    glassG.faces.push(f3);

    let f4 = new T.Face3(5, 3, 1);
    f4.color.setStyle("skyblue");
    glassG.faces.push(f4);
    glassG.computeFaceNormals();

    let glassM = new T.MeshStandardMaterial({ roughness: 0.75, metalness: -0.01, vertexColors: T.VertexColors });
    let glass = new T.Mesh(glassG, glassM);
    glass.position.set(0.5, 0, 1);
    glass.scale.set(0.8, 1.5, 2.6);
    car2.add(glass);

    //draw the wheels
    let wheel1G = new T.TorusGeometry(0.5, 0.6, 3, 20);
    let wheel1M = new T.MeshStandardMaterial({ color: "gray", metalness: 0.5, roughness: 0.8 });
    let wheel1 = new T.Mesh(wheel1G, wheel1M);
    wheel1.position.set(1.8, 0, 3);
    wheel1.rotateY(1.5);
    wheel1.rotateZ(0.5);
    car2.add(wheel1);

    let wheel2 = new T.Mesh(wheel1G, wheel1M);
    wheel2.position.set(-0.9, 0, 3);
    wheel2.rotateY(1.7);
    wheel2.rotateZ(0.5);
    car2.add(wheel2);

    let wheel3 = new T.Mesh(wheel1G, wheel1M);
    wheel3.position.set(1.9, -0.3, -1.5);
    wheel3.rotateY(-1.4);
    wheel3.rotateZ(0.5);
    car2.add(wheel3);

    let wheel4 = new T.Mesh(wheel1G, wheel1M);
    wheel4.position.set(-0.9, -0.3, -1.5);
    wheel4.rotateY(-1.7);
    wheel4.rotateZ(0.5);
    car2.add(wheel4);

    this.objects[0].add(car2);
    this.rideable = this.objects[0];
  }
  tick(delta, timeOfDay) {
    this.u += delta / 3000;
    let pos = this.track.eval(this.u);
    // remember, the center of the cube needs to be above ground!
    this.objects[0].position.set(pos[0], 0.5 + pos[1], pos[2] - 5);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}

/**
 * Create a simple car object to go around the track
 */
export class TrackCar1 extends GrGroup {
  constructor(track, params = {}) {
    super({});
    this.track = track;
    this.u = 0;

    let car1G = new T.BoxGeometry(2, 0.5, 3);
    let car1M = new T.MeshStandardMaterial({ color: "red" });
    let car1Mesh = new T.BoxGeometry(2, 1, 2);
    car1G.translate(0, 0.25, 0);

    car1Mesh.vertices[2] = new T.Vector3(car1Mesh.vertices[2].x - 0.2, car1Mesh.vertices[2].y, car1Mesh.vertices[2].z - 0.2);
    car1Mesh.vertices[3] = new T.Vector3(car1Mesh.vertices[3].x - 0.2, car1Mesh.vertices[3].y, car1Mesh.vertices[3].z + 0.2);
    car1Mesh.vertices[6] = new T.Vector3(car1Mesh.vertices[6].x + 0.2, car1Mesh.vertices[6].y, car1Mesh.vertices[6].z + 0.2);
    car1Mesh.vertices[7] = new T.Vector3(car1Mesh.vertices[7].x + 0.2, car1Mesh.vertices[7].y, car1Mesh.vertices[7].z - 0.2);
    car1Mesh.translate(0, -0.5, 0);
    car1Mesh.rotateX(Math.PI);

    let cylinder = new T.CylinderGeometry(0.4, 0.4, 2.3, 6, 2);
    let wheelB = new T.Mesh(cylinder, new T.MeshStandardMaterial({ color: "gray" }));
    let wheelF = wheelB.clone(false);
    cylinder.computeFlatVertexNormals();
    cylinder.rotateZ(Math.PI / 2);

    let roof = new T.Mesh(car1Mesh, car1M);
    let glass = roof.clone();
    let base = new T.Mesh(car1G, car1M);
    base.add(roof);
    roof.position.y = 0.5;
    roof.position.z = -0.35;

    roof.add(glass);
    glass.material = new T.MeshStandardMaterial({ color: "skyblue" });
    glass.scale.set(0.9, 0.9, 1.1);
    wheelB.add(base);
    base.position.z = 1;

    wheelB.add(wheelF);
    wheelF.position.z = 2;
    wheelB.scale.set(0.6, 0.5, 0.6);


    this.objects[0].add(wheelB);
    this.rideable = this.objects[0];
  }
  tick(delta, timeOfDay) {
    this.u += delta / 3000;
    let pos = this.track.eval(this.u);
    // remember, the center of the cube needs to be above ground!
    this.objects[0].position.set(pos[0], 0.5 + pos[1], pos[2] - 5);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}

/**
 * Create a simple car object to go around the track
 */
export class TrackCar3 extends Loaders.FbxGrObject {
  constructor(track) {
    super({
      fbx: "../images/teeny_racecar.fbx",
      norm: 2.0,
      name: "Track Car",
    });
    this.track = track;
    this.u = 0;
    // the fbx loader puts the car on the ground - we need a ride point above the ground
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(0.5);
    this.objects[0].add(this.ridePoint);
    this.objects[0].scale.set(1.5, 1.5, 1.5);
    this.rideable = this.ridePoint;
  }
  tick(delta, timeOfDay) {
    this.u += delta / 3000;
    let pos = this.track.eval(this.u);
    this.objects[0].position.set(pos[0], pos[1], pos[2] - 5);
    let dir = this.track.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
}
