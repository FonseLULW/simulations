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
    if (hideID) {
        document.querySelector(`#${hideID}`).style.display = "none";
    }

    if (showID) {
        document.querySelector(`#${showID}`).style.display = "flex";
    }
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
    "pause": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 0);
        switchButtons("pause", "play");
        switchButtons(null, "nextFrame");
    },

    "play": () => {
        CanvasManipulator.getInstance().canvas.setWorldProperty("timeIsMoving", 1);
        switchButtons("play", "pause");
        switchButtons("nextFrame", null);
    },

    "slow": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("slow", "normal");
    },

    "normal": () => {
        let canvas = CanvasManipulator.getInstance().canvas;

        CanvasManipulator.getInstance().canvas.setWorldProperty("rateOfTime", 1.5 * Math.sign(canvas.world.properties.rateOfTime));
        switchButtons("normal", "fast");
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
        let canvas = CanvasManipulator.getInstance().canvas;
        canvas.setWorldProperty("rateOfTime", -canvas.world.properties.rateOfTime);

        // let img = document.querySelector("#rewind").querySelector("img");
        // console.log(!img.style.transform)
        // img.style.transform = !img.style.transform ? "scaleX(-1)" : '';

        flipIcons(["rewind", "slow", "fast", "faster", "normal", "play", "nextFrame"]);
    },
};

const manipulatorTools = {
    "SPAWN": spawner,
    "ERASE": eraser,
    "CURSOR": cursor
}

export { toolManagerConfig, manipulatorTools };