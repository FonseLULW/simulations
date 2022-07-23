import { CanvasManipulator } from "../managers/canvasManipulator.js";
import { cursor } from "../tools/cursor.js";
import { eraser } from "../tools/eraser.js";
import { spawner } from "../tools/spawner.js";

function openToolbar(element) {
    element.classList.remove("hide");
    element.classList.add("show");
}

function closeSubToolbars(except) {
    document.querySelectorAll(".sub").forEach(elem => {
        if (elem != except) {
            elem.classList.remove("show");
            elem.classList.add("hide");
        }        
    })
}

function switchButtons(hideID, showID) {
    if (hideID) {
        document.querySelector(`#${hideID}`).classList.add("hide");
    }

    if (showID) {
        document.querySelector(`#${showID}`).classList.remove("hide");
    }
}

function toggleIcons(iconIds) {
    iconIds.forEach(id => {
        document.querySelector(`#${id}`).classList.toggle("hide");
    })
}

function flipIcons(iconIds) {
    iconIds.forEach(icon => {
        let element = document.querySelector(`#${icon}`);
        element.classList.toggle("flipped");
    })
}

const toolManagerConfig = {
    // Main Toolset
    "shapes": (toolset) => {
        CanvasManipulator.getInstance().mode = "SPAWN";
        closeSubToolbars(toolset.toolbar);
        openToolbar(document.querySelector("#objectSelect"));
    },

    "eraser": () => {
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
        let input = document.querySelector("#gravity");

        if (!input.value || input.value == "") { 
            input.value = CanvasManipulator.getInstance().canvas.world.properties.gravity;
        }

        CanvasManipulator.getInstance().canvas.setWorldProperty("gravity", parseFloat(input.value));
        input.value = CanvasManipulator.getInstance().canvas.world.properties.gravity;
    },

    // Controls Toolset
    "stop": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 0);
        switchButtons("stop", "proceed");
        toggleIcons(["nextFrame"]);
    },

    "proceed": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 1);
        switchButtons("proceed", "stop");
        toggleIcons(["nextFrame"]);
    },

    "slow": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("slow", "stroll");
    },

    "stroll": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1.5 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("stroll", "fast");
    },

    "fast": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 2 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("fast", "faster");
    },

    "faster": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 0.5 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("faster", "slow");
    },

    "reload": () => {
        CanvasManipulator.getInstance().canvas.world.clear();
    },

    "nextFrame": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 1);

        setTimeout(() => {
            CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 0);
        }, 1000 / CanvasManipulator.getInstance().canvas.frameRate());
    },

    "rewind": () => {
        let manipulator = CanvasManipulator.getInstance();
        let canvas = manipulator.canvas;
        canvas.setWorldProperty("rateOfTime", -canvas.world.properties.rateOfTime);
        flipIcons(["rewind", "slow", "fast", "faster", "stroll", "proceed", "nextFrame"]);
        toggleIcons(["cursor", "shapes", "eraser", "settings"]);

        manipulator.mode = null;
        closeSubToolbars();

        let selected = document.querySelector("#toolbar").querySelector(".selected");
        if (selected) { selected.classList.remove("selected"); }
        document.querySelector("#rewind").id = "stopRewind";
    },

    "stopRewind": () => {
        let manipulator = CanvasManipulator.getInstance();
        let canvas = manipulator.canvas;
        canvas.setWorldProperty("rateOfTime", -canvas.world.properties.rateOfTime);
        flipIcons(["stopRewind", "slow", "fast", "faster", "stroll", "proceed", "nextFrame"]);
        toggleIcons(["cursor", "shapes", "eraser", "settings"]);

        document.querySelector("#stopRewind").id = "rewind";
    }
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };