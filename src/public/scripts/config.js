import { CanvasManipulator } from "./ui/canvasManipulator.js";
import { Tool } from "./ui/tool.js";
import { cursor } from "./ui/tools/cursor.js";
import { eraser } from "./ui/tools/eraser.js";
import { spawner } from "./ui/tools/spawner.js";

function openToolbar(element) {
    element.style.display = "block";
    element.classList.add("show");
}

function closeSubToolbars(except) {
    document.querySelectorAll(".sub").forEach(elem => {
        if (elem != except) {
            elem.classList.remove("show");
            elem.style.display = "none";
        }        
    })
}

const toolManagerConfig = {
    // Main Toolbar
    "shapes": (toolset) => {
        CanvasManipulator.getInstance().mode = "SPAWN";
        closeSubToolbars(toolset.toolbar);
        openToolbar(document.querySelector("#objectSelect"));
    },

    "erase": () => {
        CanvasManipulator.getInstance().mode = "ERASE";
        closeSubToolbars();
    },

    "cursor": () => {
        CanvasManipulator.getInstance().mode = "CURSOR";
        closeSubToolbars();
    },

    "settings": (toolset) => {
        closeSubToolbars(toolset.toolbar);
        openToolbar(document.querySelector("#worldProperties"));
    },

    "gallery": () => {
        closeSubToolbars();
    },

    // Shapes Toolbar
    "toggleStaticSwitch": (toolset) => {
        CanvasManipulator.getInstance().tools.get("SPAWN").staticBody = toolset.element.querySelector("#static").checked;
    },

    "circle": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "circle";
    },
    
    "square": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "square";
    },

    // Properties Toolbar
    "gravity": (toolset) => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("gravity", parseInt(document.querySelector("#gravity").value));
    } 


    // if (!element.value) {
    //     element.value = simulation.world.properties[element.id];
    //     return;
    // }

    // simulation.setWorldProperty(element.id, parseInt(element.value));
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };