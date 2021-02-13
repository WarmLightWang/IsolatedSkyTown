/*jshint esversion: 6 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import { building } from "./building.js";
import { tree } from "./tree.js";
import { ufo } from "./ufo.js";
import { background } from "./background.js";
import { train } from "./train.js";
import { SimpleHouse } from "./house.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { character } from "./character.js";
import { protectiveBarrier } from "./protectiveBarrier.js";
import { CircularTrack, TrackCar1, TrackCar3, TrackCar2 } from "./trackCars.js";

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, 
 * populates it with objects and behaviors, and starts things running
 *
 * Extend this by defining new object types (in other files), 
 * then loading those files as modules, and using this file to instantiate those objects in the world.
 */
function grtown() {
  // make the world
  let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20 // make the ground plane big enough for a world of stuff
  });

  // put more stuffs into the world
  character(world);
  building(world);
  tree(world);
  train(world);
  ufo(world);
  background(world);
  protectiveBarrier(world);

  // make the rows of houses and add them to the world
  for (let i = -19; i < 20; i += 5) {
    world.add(new SimpleHouse({ x: i + 0.5, z: 10 }));
    world.add(new SimpleHouse({ x: i + 0.5, z: 15 }));
  }

  // Set the Helicopter and Helipad to the world
  world.add(new Helipad(-10.9, 8.3, -7));
  world.add(new Helipad(11.1, 8, -5));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  /**set the race track and three cars */
  let track = new CircularTrack();
  let tc1 = new TrackCar1(track);
  //let tc2 = new TrackCube(track);
  let tc2 = new TrackCar2(track);
  let tc3 = new TrackCar3(track);
  // place things are different points on the track
  tc2.u = 0.35;
  tc3.u = 0.2;
  //make sure they are in the world
  world.add(track);
  world.add(tc1);
  world.add(tc2);
  world.add(tc3);

  // Add the shiny sculpture to the world
  world.add(new ShinySculpture(world));

  // build and run the UI
  // only after all the objects exist can we build the UI
  // @ts-ignore       // we're sticking a new thing into the world
  world.ui = new WorldUI(world);
  
  // now make it go!
  world.go();
}
Helpers.onWindowOnload(grtown);
