/*jshint esversion: 6 */

import * as T from "../libs/CS559-THREE/build/three.module.js";

const envTextureBase = "../images/b1";
/**
 * Read in a set of textures from HDRI Heaven
 * 
 * @param {string} name 
 * @param {string} [ext="png"]
 * @param {boolean} [swapBottomFront=true]
 */
function cubeTextureHelp(name, ext = "png", swapBottomFront = true) {
    return new T.CubeTextureLoader().load([
        name + "_Right." + ext,
        name + "_Left." + ext,
        name + "_Top." + ext,
        name + (swapBottomFront ? "_Front." : "_Bottom.") + ext,
        name + "_Back." + ext,
        name + (swapBottomFront ? "_Bottom." : "_Front.") + ext
    ]);
}

export function background(world) {
    // add the background picture
    let cubeTexture = cubeTextureHelp(envTextureBase);
    world.scene.background = cubeTexture;
    let mat = new T.MeshStandardMaterial({ envMap: cubeTexture, metalness: 0.8, roughness: 0.1 });
}
