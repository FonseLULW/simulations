import { Vector2D } from './modules/objects/vector2D.js';
import { World } from './modules/world.js';
import { SimpleSolver } from './modules/physics/solvers.js';
import { Toolbar } from './ui/toolContainers/toolbar.js';
import { CanvasManipulator } from './ui/managers/canvasManipulator.js';
import { ToolManager } from './ui/managers/toolManager.js';
import { toolManagerConfig, manipulatorTools } from './ui/config/config.js';
import { Toolset } from './ui/toolContainers/toolset.js';

let simulation = new p5((p) => {
    p.world = new World();

    p.setup = () => {
        p.frameRate(60);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.world.addSolver(new SimpleSolver());
        p.print("Created canvas: Width = ", p.width, " ; Height = ", p.height)
        setupUI(p);
    };

    p.draw = () => { p.world.draw(p); };

    p.windowResized = () => { console.log("RESIZED"); p.resizeCanvas(p.windowWidth, p.windowHeight); p.print("Created canvas: Width = ", p.width, " ; Height = ", p.height) }

    p.spawn = (spawnPoint, startingVelocity, factory) => {
        let mass = 1000;
        let size = 50;

        let shape = new factory.graphic(spawnPoint, p.color(104, 240, 237), size);
        let collider = new factory.collider(spawnPoint, size);

        let body = new factory.body(shape, collider, startingVelocity, new Vector2D(0 * mass, 0 * mass), mass);
        p.world.add(body)
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

function setupUI(canvas) {
    console.log("UI SETUP: ", canvas);

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