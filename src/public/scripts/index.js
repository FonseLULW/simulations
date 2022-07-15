import { Vector2D, collinear } from './modules/vector2D.js';
import { Square, Circle } from './modules/graphics.js';
import { CircleCollider, SquareCollider } from './modules/colliders.js';
import { Body, Rigidbody } from './modules/bodies.js';
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

    p.draw = () => {
        p.world.draw(p);
    };

    p.mousePressed = (e) => {
        if (!p.inCanvasRange) {
            return;
        }

        let m = CanvasManipulator.getCanvasManipulator(p.mode);

        if (m) { m.onPress(p, e) }

        // let pressedAt = new Vector2D(e.clientX, e.clientY);
        // if (e.button == 0) {
        //     switch (p.mode) {
        //         case "CURSOR":
                    // p.draggingObject = p.world.findObject(pressedAt);

                    // if (p.draggingObject) {
                    //     p.draggingObject.followingMouse = true;
                    // }
        //             break;
        //         case "SPAWN":
        //             p.startMousePos = pressedAt;
        //             p.startMouseTimeS = p.frameCount * p.deltaTime / 1000;
        //             break;
        //         case "ERASE":
        //             break;
        //         default:
        //     }
        // }
    }

    p.mouseDragged = (e) => {
        if (!p.inCanvasRange) {
            return;
        }

        let m = CanvasManipulator.getCanvasManipulator(p.mode);

        if (m) { m.onDrag(p, e) }

        // switch (p.mode) {
        //     case "CURSOR":
                // p.candidate = new Vector2D(e.clientX, e.clientY);

                // if (!p.waypointA) {
                //     p.waypointA = p.candidate;
                // }
            
                // if (!p.waypointB && p.candidate != p.waypointA) {
                //     p.waypointB = p.candidate;
                // }
            
                // if (p.waypointA && p.waypointB) {
                //     if (!collinear(p.waypointA, p.waypointB, p.candidate)) {
                //         p.waypointA = p.waypointB;
                //         p.waypointB = p.candidate;
                //     }
                // }
        //         break;
        //     case "ERASE":
        //         p.despawn(new Vector2D(e.clientX, e.clientY));
        //         break;
        //     default:
        // }

        
    }

    p.mouseReleased = (e) => {
        if (!p.inCanvasRange) {
            return;
        }

        let m = CanvasManipulator.getCanvasManipulator(p.mode);

        if (m) { m.onRelease(p, e) }

        // let endMouseTimeS = p.frameCount * p.deltaTime / 1000;
        // let t = Math.abs(endMouseTimeS - p.startMouseTimeS);
        // if (e.button == 0) {
        //     switch (p.mode) {
        //         case "CURSOR":
                    // if (p.draggingObject && p.candidate && p.waypointA && p.waypointB) {
                    //     p.draggingObject.followingMouse = false;

                    //     p.draggingObject.velocityX = (p.candidate.x - p.waypointA.x) * 20 / t;
                    //     p.draggingObject.velocityY = (p.candidate.y - p.waypointA.y) * 20 / t;
                    // }
        //             break;
        //         case "SPAWN":
        //             p.spawn(new Vector2D((p.startMousePos.x - e.clientX) * t, (p.startMousePos.y - e.clientY) * t));
        //             break;
        //         case "ERASE":
        //             break;
        //         default:
        //     }
        // }
    };

    p.mouseClicked = (e) => {
        if (!p.inCanvasRange) {
            return;
        }

        let m = CanvasManipulator.getCanvasManipulator(p.mode);

        if (m) { m.onClick(p, e) }
        // switch (p.mode) {
        //     case "ERASE":
        //         p.despawn(new Vector2D(e.clientX, e.clientY));
        //         break;
        //     default:
        // }
    }

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
});

const mainToolbar = new Toolbar(document.querySelector("#toolbar"), simulation, (button, e) => {
    let selectedToolbar;

    switch (button.id) {
        case "cursor":
            simulation.mode = "CURSOR";
            break;
        case "shapes":
            simulation.mode = "SPAWN";
            selectedToolbar = document.querySelector("#objectSelect");
            mainToolbar.closeSubs();
            selectedToolbar.style.display = "block";
            selectedToolbar.classList.add("show");
            break;
        case "eraser":
            simulation.mode = "ERASE";
            break;
        case "settings":
            selectedToolbar = document.querySelector("#worldProperties");
            mainToolbar.closeSubs();
            selectedToolbar.style.display = "block";
            selectedToolbar.classList.add("show");
            break;
        case "gallery":
            mainToolbar.closeSubs();
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