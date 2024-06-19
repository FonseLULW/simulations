/**
 * Starting point of the program.
 * 
 * @author FonseLULW
 */

import { Vector2D } from './modules/objects/vector2D.js';
import { World } from './modules/world.js';
import { ForceSolver, PositionSolver } from './modules/physics/solvers.js';
import { Toolbar } from './ui/toolContainers/toolbar.js';
import { CanvasManipulator } from './ui/managers/canvasManipulator.js';
import { ToolManager } from './ui/managers/toolManager.js';
import { toolManagerConfig, manipulatorTools } from './ui/config/config.js';
import { Toolset } from './ui/toolContainers/toolset.js';
import { Rigidbody } from './modules/objects/bodies.js';

let simulation = new p5((p) => {
  p.world = new World();

  p.setup = () => {
    p.frameRate(60);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.world.addSolver(new PositionSolver());
    p.world.addSolver(new ForceSolver());
    setupUI(p);
  };

  p.draw = () => { p.world.draw(p); };

  p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); }

  p.spawn = (spawnPoint, startingVelocity, factory) => {
    let mass = 100;
    let size = 100;

    let shape = new factory.graphic(spawnPoint, p.color(104, 240, 237, 100), size);
    let collider = new factory.collider(spawnPoint, size);

    let body = new factory.body(shape, collider, mass, startingVelocity, new Vector2D(0, 0));
    p.world.add(body)
    console.log("Added to world: ", body);
  }

  p.despawn = (mousePosition) => {
    p.world.remove(p.world.findObject(mousePosition));
  }

  p.setWorldProperty = (property, value) => {
    p.world.properties[property] = value;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    document.activeElement.blur();
  }
})

/**
 * Sets up the UI.
 * @param {P5} canvas a P5 object 
 */
function setupUI(canvas) {
  // Managers and Manipulators
  const toolManager = ToolManager.getInstance();
  toolManager.init(canvas, toolManagerConfig);

  const canvasManipulator = CanvasManipulator.getInstance();
  canvasManipulator.init(canvas, canvas.canvas, manipulatorTools);

  // Toolbars
  const mainToolbar = new Toolbar(document.querySelector("#toolbar"));
  mainToolbar.init();

  const shapesToolbar = new Toolbar(document.querySelector("#objectSelect"));
  shapesToolbar.init();

  const propertiesToolbar = new Toolbar(document.querySelector("#worldProperties"));
  propertiesToolbar.init();

  // Toolsets
  let mainTools = new Toolset(mainToolbar.element.querySelector(".toolset"), mainToolbar.element);
  mainTools.initButtons();

  let shapeTools = new Toolset(shapesToolbar.element.querySelector(".toolbox"), shapesToolbar.element);
  shapeTools.initButtons();

  let propertiesTools = new Toolset(propertiesToolbar.element.querySelector(".toolbox"), propertiesToolbar.element);
  propertiesTools.initButtons("change");

  propertiesTools.buttons.forEach(btn => {
    btn.value = canvas.world.properties[btn.id];
  })

  propertiesTools.initButtons();

  let controlTools = new Toolset(mainToolbar.element.querySelector(".controls"), mainToolbar.element);
  controlTools.initButtons();
}