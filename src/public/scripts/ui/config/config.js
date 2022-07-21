import { CanvasManipulator } from "../managers/canvasManipulator.js";
import { cursor } from "../tools/cursor.js";
import { eraser } from "../tools/eraser.js";
import { spawner } from "../tools/spawner.js";

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

function switchButtons(hideID, showID) {
    document.querySelector(`#${hideID}`).style.display = "none";
    document.querySelector(`#${showID}`).style.display = "flex";
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
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 0);
        switchButtons("pause", "play");
    },

    "play": (toolset) => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 1);
        switchButtons("play", "pause");
    },

    "slow": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1);
        switchButtons("slow", "normal");
    },

    "normal": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1.5);
        switchButtons("normal", "fast");
    },

    "fast": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 2);
        switchButtons("fast", "faster");
    },

    "faster": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 0.5);
        switchButtons("faster", "slow");
    },

    "reload": () => {
        CanvasManipulator.getInstance().canvas.world.clear();
    },

    "nextFrame": null,
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };