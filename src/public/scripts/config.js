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
    // Main Toolset
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

    // Shapes Toolset
    "toggleStaticSwitch": (toolset) => {
        CanvasManipulator.getInstance().tools.get("SPAWN").staticBody = toolset.element.querySelector("#static").checked;
    },

    "circle": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "circle";
    },
    
    "square": () => {
        CanvasManipulator.getInstance().tools.get("SPAWN").placing = "square";
    },

    // Properties Toolset
    "gravity": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("gravity", parseInt(document.querySelector("#gravity").value));
    },

    // Controls Toolset
    "pause": (toolset) => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 0);
        toolset.element.querySelector("#play").style.display = "flex";
        toolset.element.querySelector("#pause").style.display = "none";
    },
    "play": (toolset) => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1);
        toolset.element.querySelector("#play").style.display = "none";
        toolset.element.querySelector("#pause").style.display = "flex";
    },

    "slow": null,
    "fast": null,
    "reload": null,
    "nextFrame": null,
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };