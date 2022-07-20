import { Vector2D } from './modules/vector2D.js';
import { World } from './modules/world.js';
import { SimpleSolver } from './modules/solvers.js';
import { Toolbar } from './ui/toolbar.js';
import { getObject } from './modules/objectFactory.js';
import { CanvasManipulator } from './manipulator.js';
import { ToolManager } from './ui/toolManager.js';
import { toolManagerConfig } from './config.js';
import { Toolset } from './ui/toolset.js';

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
        let manipulator = CanvasManipulator.getCanvasManipulator(e);
        if (manipulator) { manipulator.onPress(p, e) }
    }

    p.mouseDragged = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(e);
        if (manipulator) { manipulator.onDrag(p, e) }        
    }

    p.mouseReleased = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(e);
        if (manipulator) { manipulator.onRelease(p, e) }
    };

    p.mouseClicked = (e) => {
        let manipulator = CanvasManipulator.getCanvasManipulator(e);
        if (manipulator) { manipulator.onClick(p, e) }
    }
});


    // let selectedToolbar;

    // if (button.id == "slow") {
    //     simulation.world.properties["rateOfTime"] = 0.5;
    // } else if (button.id == "fast") {
    //     simulation.world.properties["rateOfTime"] = 2;
        
    // } else if (button.id == "reload") {
        
    // } else if (button.id == "nextFrame") {
        
    // } else if (button.id == "pause") {
    //     simulation.world.properties["rateOfTime"] = 0;

    //     mainToolbar.element.querySelector("#play").style.display = "flex";
    //     button.style.display = "none";
    // } else if (button.id == "play") {
    //     simulation.world.properties["rateOfTime"] = 1;

    //     mainToolbar.element.querySelector("#pause").style.display = "flex";
    //     button.style.display = "none";
    // } else if (button.id == "gallery") {
    //     mainToolbar.closeSubs()
    //     console.log("NOTHING YET")
    // } else if (button.id == "settings") {
        // mainToolbar.closeSubs()
        // selectedToolbar = document.querySelector("#worldProperties");
    // } else if (button.id == "shapes") {
    //     mainToolbar.closeSubs()
    //     CanvasManipulator.mode = "SPAWN";
    //     selectedToolbar = document.querySelector("#objectSelect");
    // } else {
    //     mainToolbar.closeSubs()
    //     CanvasManipulator.mode = button.id.toUpperCase();
    // }

    // if (selectedToolbar) {
    //     selectedToolbar.style.display = "block";
    //     selectedToolbar.classList.add("show");
    // }

    // mainToolbar.selectOption(button);

// const shapesToolbar = new Toolbar(document.querySelector("#objectSelect"), simulation, (button, e) => {
//     if (button.id == "toggleStaticSwitch") {
//         simulation.staticBody = button.querySelector("INPUT").checked;
//     } else {
//         simulation.placing = button.id;
//     }

//     shapesToolbar.selectOption(button);
// })

// const propertiesToolbar = new Toolbar(document.querySelector("#worldProperties"), simulation);

// propertiesToolbar.buttons.forEach(element => {
//     element.value = simulation.world.properties[element.id];

//     element.addEventListener("change", (e) => {
//         if (!element.value) {
//             element.value = simulation.world.properties[element.id];
//             return;
//         }

//         simulation.setWorldProperty(element.id, parseInt(element.value));
//     })
// });

document.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        document.activeElement.blur();
    }
})


function setupUI(canvas) {
    let toolManager = ToolManager.getInstance();
    toolManager.init(canvas, toolManagerConfig);

    // Toolbars
    const mainToolbar = new Toolbar(document.querySelector("#toolbar"));
    mainToolbar.init();

    // Toolsets
    let mainTools = new Toolset(document.querySelector("#toolbar").querySelector(".toolset"), mainToolbar.element);
    mainTools.initButtons();
}




export { simulation };