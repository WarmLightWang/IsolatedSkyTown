/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// set some global variables
let bezierC = [];
let points = [];
let arcTable = [];
let trackNum = 30;
let z = 0.5;
let u = 0.5;
let trackPoints = [[-0.7 * 22, z, -0.7 * 22],
[0.7 * 22, z, -0.7 * 22],
[0.65 * 22, z, 0.2 * 22],
[-0.65 * 22, z, 0.2 * 22]];

/**
 * Create the simple train that moves on the track
 */
export class GrTrain extends GrObject {
    constructor() {

        let train = new T.Group();

        let geom = new T.CylinderGeometry(0.8, 0.8, 2.6, 15);
        let mat = new T.MeshStandardMaterial({ color: "gray", metalness: 0.9, roughness: 0.7 });
        let wheel3 = new T.Mesh(geom, mat);
        wheel3.rotateX(Math.PI / 2);
        wheel3.position.set(-2.1, -0.9, 0);

        let wheel2 = new T.Mesh(geom, mat);
        wheel2.rotateX(Math.PI / 2);
        wheel2.scale.set(0.8, 1, 0.8);
        wheel2.position.set(0, -1, 0);

        let wheel1 = new T.Mesh(geom, mat);
        wheel1.rotateX(Math.PI / 2);
        wheel1.scale.set(0.8, 1, 0.8);
        wheel1.position.set(1.8, -1, 0);

        let geom1 = new T.BoxGeometry(8, 2, 2);
        let mat1 = new T.MeshStandardMaterial({ color: "red", metalness: 0.3 });
        let body1 = new T.Mesh(geom1, mat1);
        body1.translateY(-0.2);
        body1.translateX(-0.2);
        body1.scale.set(0.75, 1, 1);

        let body2 = new T.Mesh(geom1, mat1);
        body2.translateY(-0.2);
        body2.translateX(-0.7);
        body2.position.set(-2, 1.5, 0);
        body2.scale.set(0.3, 1, 1);

        train.add(body2, body1, wheel3, wheel2, wheel1);

        let hornG = new T.CylinderGeometry(1, 0.5, 2);
        let hornM = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.6, roughness: 0.7 });
        let horn = new T.Mesh(hornG, hornM);
        horn.scale.set(0.7, 0.8, 0.7);
        horn.position.set(1.5, 1.2, 0);
        train.add(horn);
        train.position.y = 2;
        train.translateY(1.5);
        train.scale.set(0.85, 0.85, 0.85);

        super(`Train`, train);
        this.train = train;

        this.tick = function (delta, timeOfDay) {
            let body = [];
            body.push(this.train);
            for (let k = 0; k < body.length; k++) {
                let x1, z1, angle;
                u += delta * 0.0006;
                let part = body[k];
                let param = (u) % (trackPoints.length);
                let param1 = Math.floor(param) % bezierC.length;
                let distance = 0.05;
                [x1, z1, angle] = arc(param1, param + distance * k, param + distance * k - param1);
                part.position.x = x1;
                part.position.z = z1;
                if (k == 1 || k == 0) {
                    part.rotation.set(0, angle - Math.PI / 2, 0, "XYZ");
                } else {
                    part.rotation.set(0, angle, 0, "XYZ");
                }
            }
        };
    }
}

/**
 * Return the valus to the train's motion
 */
function arc(i, u, u2) { //u is total time

    let angle, flag = 0, tempk = -1, tempj = -1, percent2 = 0, temp3x, temp3z;
    let [x, z, xd, zd] = xNz(i, u2);
    let percent = u / bezierC.length;
    let temp0 = arcTable[arcTable.length - 1].ten_segs[trackNum - 1];
    let maxlen = temp0[2], x00 = trackPoints[0][0], z00 = trackPoints[0][2];
    let cur_len = percent * maxlen;

    if (cur_len > maxlen) {
        flag = 1;
        tempk = arcTable.length - 1;
        tempj = trackNum - 1;
        percent2 = (cur_len - maxlen) / Math.sqrt((temp0[0] - x00) * (temp0[0] - x00) + (temp0[1] - z00) * (temp0[1] - z00));
        temp3x = x00;
        temp3z = z00;
    }

    for (let k = 0; k < arcTable.length && flag == 0; k++) {

        let temp = arcTable[k].ten_segs;
        for (let j = 0; j < trackNum; j++) {

            let low = temp[j][2], high;
            if (j < trackNum - 1) {
                high = temp[j + 1];
            } else {
                high = arcTable[(k + 1) % arcTable.length].ten_segs[0];
            }

            if (Math.floor(low) <= Math.floor(cur_len) && Math.floor(high[2]) >= Math.floor(cur_len)) {

                percent2 = (cur_len - low) / (high[2] - low);
                flag = 12;
                tempk = k;
                tempj = j;
                temp3x = high[0];
                temp3z = high[1];
                break;
            }
        }
    }

    let temp2 = arcTable[tempk].ten_segs[tempj];
    angle = Math.atan2(xd, zd);
    return [x, z, angle];
}

/**
 * Create beams of the track
 */
function drawBeams(world) {
    arcTable.forEach(function (pt) {
        let j;
        let segs1 = pt.ten_segs;
        let railgeom = new T.BoxGeometry(0.3, 0.3, 1.5);
        let railmesh = new T.MeshStandardMaterial({ color: "olive", metalness: 0.5, roughness: 0.5 });

        for (j = 0; j < trackNum; j++) {
            let rail = new T.Mesh(railgeom, railmesh);
            rail.translateX(segs1[j][0]);
            rail.translateZ(segs1[j][1]);
            rail.rotation.set(0, segs1[j][3] + Math.PI / 2, 0);
            world.scene.add(rail);
        }
    });
}

/**
 * Set up beams
 */
function xNz(i, u) {
    let x, z, xd, zd;
    let p = points[i];
    x = p[0][0] + p[2][0] * u + (-3 * p[0][0] - 2 * p[2][0] + 3 * p[1][0] - p[3][0]) * u * u + (2 * p[0][0] + p[2][0] - 2 * p[1][0] + p[3][0]) * u * u * u;
    z = p[0][2] + p[2][2] * u + (-3 * p[0][2] - 2 * p[2][2] + 3 * p[1][2] - p[3][2]) * u * u + (2 * p[0][2] + p[2][2] - 2 * p[1][2] + p[3][2]) * u * u * u;
    xd = p[2][0] + (-3 * p[0][0] - 2 * p[2][0] + 3 * p[1][0] - p[3][0]) * u * 2 + (2 * p[0][0] + p[2][0] - 2 * p[1][0] + p[3][0]) * u * u * 3;
    zd = p[2][2] + (-3 * p[0][2] - 2 * p[2][2] + 3 * p[1][2] - p[3][2]) * u * 2 + (2 * p[0][2] + p[2][2] - 2 * p[1][2] + p[3][2]) * u * u * 3;
    return [x, z, xd, zd];
}

/**
 * Set up the curve line and beams together as a track
 */
function toBezier() {
    bezierC = [];
    points = [];
    arcTable = [];
    let i, s = 0.5, u = 1 / 3;
    for (i = 0; i < trackPoints.length; i++) {
        let p0 = trackPoints[i];
        let x, y;
        x = trackPoints[(i + 1) % trackPoints.length][0] - trackPoints[(i - 1 + trackPoints.length) % trackPoints.length][0];
        y = trackPoints[(i + 1) % trackPoints.length][2] - trackPoints[(i - 1 + trackPoints.length) % trackPoints.length][2];
        let p0d = [s * x, 0.2, s * y];
        let p1 = [p0[0] + u * p0d[0], 0.2, p0[2] + u * p0d[2]];
        let p3 = trackPoints[(i + 1) % trackPoints.length];
        x = trackPoints[(i + 2) % trackPoints.length][0] - trackPoints[i][0];
        z = trackPoints[(i + 2) % trackPoints.length][2] - trackPoints[i][2];
        let p3d = [s * x, 0.2, s * z];
        let p2 = [p3[0] - u * p3d[0], 0.2, p3[2] - u * p3d[2]];
        bezierC.push([p0, p1, p2, p3]);
        points.push([p0, p3, p0d, p3d]);

        let j, angle1, xd, zd;
        let segs = [];

        for (j = 0; j < 1; j += 1 / trackNum) {
            [x, z, xd, zd] = xNz(i, j);
            angle1 = Math.atan2(xd, zd);
            if (i == 0 && j == 0) {
                segs.push([p0[0], p0[2], 0, angle1]);
                continue;
            }
            let temp;
            if (j == 0) {
                temp = arcTable[(i - 1 + arcTable.length) % arcTable.length].ten_segs[9];
            } else {
                temp = segs.pop();
                segs.push(temp);
            }
            let dist = temp[2] + Math.sqrt((temp[0] - x) * (temp[0] - x) + (temp[1] - z) * (temp[1] - z));
            segs.push([x, z, dist, angle1]);
        }
        arcTable.push({
            "ten_segs": segs,
        });
    }
}

/**
 * Create the control points of the curve along the track
 */
function createPoint(P, radius, material) {
    radius = radius || 0.1;
    material = material || new T.MeshNormalMaterial();
    let mesh = new T.Mesh(new T.SphereGeometry(radius), material);
    mesh.position.set(P[0], P[1], P[2]);
    return mesh;
}

/**
 * Using the list of control points, returns a THREE.Geometry comprising 'steps' vertices, 
 * suitable for combining with a material and creating a THREE.Line out of. 
 */
function bezierCurve(cotrolList, steps) {

    let num = Math.round(steps) + 1 || 20; // number of vertices              
    let geometry = new T.Geometry();

    let controlPoints = cotrolList[0];
    let v0 = new T.Vector3(controlPoints[0], controlPoints[1], controlPoints[2]);
    controlPoints = cotrolList[1];
    let v1 = new T.Vector3(controlPoints[0], controlPoints[1], controlPoints[2]);
    controlPoints = cotrolList[2];
    let v2 = new T.Vector3(controlPoints[0], controlPoints[1], controlPoints[2]);
    controlPoints = cotrolList[3];
    let v3 = new T.Vector3(controlPoints[0], controlPoints[1], controlPoints[2]);

    let curve = new T.CubicBezierCurve3(v0, v1, v2, v3);

    let j, stepSize = 1 / (num - 1);
    for (j = 0; j < num; j++) {
        geometry.vertices.push(curve.getPoint(j * stepSize));
    }
    return geometry;
}

/**
 * Set the train to move along the track, and add to the world
 */
export function train(world) {
    toBezier();
    drawBeams(world);

    let tr = new GrTrain();
    tr.setPos(1, 1.5, 1);
    world.add(tr);

    // set the curve of the track
    bezierC.forEach(function (curves) {
        let curve = [curves[0], curves[1], curves[2], curves[3]]; // four control points
        let curveGeom = bezierCurve(curve, 20);
        let curveMat = new T.LineBasicMaterial({ color: "blue", linewidth: 15 });
        let curve1 = new T.Line(curveGeom, curveMat);
        curve1.position.set(0, -0.2, 0);
        world.scene.add(curve1);
    });

    for (let i = 0; i < bezierC[0].length; i++) {
        world.scene.add(createPoint(bezierC[0][i]));
    }
}