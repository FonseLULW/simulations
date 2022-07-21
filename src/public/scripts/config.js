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

    // Shapes Toolbar
    "toggleStaticSwitch": (toolset) => {
        CanvasManipulator.getInstance().tools.get("SPAWN").staticBody = toolset.element.querySelector("#static").checked;
    },

    "circle": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "circle";
    },
    
    "square": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "square";
    }
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };