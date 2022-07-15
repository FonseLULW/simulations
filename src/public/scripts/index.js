import { Vector2D } from './modules/vector2D.js';
import { World } from './modules/world.js';
import { SimpleSolver } from './modules/solvers.js';
import { Toolbar } from './toolbar.js';
import { getObject } from './modules/objectFactory.js';
import { CanvasManipulator } from './manipulator.js';

let simulation = new p5((p) => {
    p.world = new World();

    p.setup = () => {
        p.frameRate(60);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.world.addSolver(new SimpleSolver());
        p.print("Created canvas: Width = ", p.width, " ; Height = ", p.height)
    };

    p.draw = () => { p.world.draw(p); };

    p.spawn = (spawnPoint, startingVelocity) => {
        let mass = 1000;
        let size = 50;

        let factory = getObject(p.placing, p.staticBody);

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

    p.mousePressed = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(p.mode, e);
        if (manipulator) { manipulator.onPress(p, e) }
    }

    p.mouseDragged = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(p.mode, e);
        if (manipulator) { manipulator.onDrag(p, e) }        
    }

    p.mouseReleased = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(p.mode, e);
        if (manipulator) { manipulator.onRelease(p, e) }
    };

    p.mouseClicked = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(p.mode, e);
        if (manipulator) { manipulator.onClick(p, e) }
    }
});

const mainToolbar = new Toolbar(document.querySelector("#toolbar"), simulation, (button, e) => {
    let selectedToolbar;

    mainToolbar.closeSubs();
    switch (button.id) {
        case "cursor":
            simulation.mode = "CURSOR";
            break;
        case "shapes":
            simulation.mode = "SPAWN";
            selectedToolbar = document.querySelector("#objectSelect");
            selectedToolbar.style.display = "block";
            selectedToolbar.classList.add("show");
            break;
        case "eraser":
            simulation.mode = "ERASE";
            break;
        case "settings":
            selectedToolbar = document.querySelector("#worldProperties");
            selectedToolbar.style.display = "block";
            selectedToolbar.classList.add("show");
            break;
        case "gallery":
            break;
        default:
    }

    mainToolbar.selectOption(button);
});

const shapesToolbar = new Toolbar(document.querySelector("#objectSelect"), simulation, (button, e) => {
    switch (button.id) {
        case "toggleStaticSwitch":
            simulation.staticBody = button.querySelector("INPUT").checked;
            break;
        case "circle":
            simulation.placing = 'circle';
            break;
        case "square":
            simulation.placing = 'square';
            break;
        default:
    }

    shapesToolbar.selectOption(button);
})

const propertiesToolbar = new Toolbar(document.querySelector("#worldProperties"), simulation);

propertiesToolbar.buttons.forEach(element => {
    element.value = simulation.world.properties[element.id];

    element.addEventListener("change", (e) => {
        if (!element.value) {
            element.value = simulation.world.properties[element.id];
            return;
        }

        simulation.setWorldProperty(element.id, parseInt(element.value));
    })
});

document.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        document.activeElement.blur();
    }
})