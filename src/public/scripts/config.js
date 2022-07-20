import { CanvasManipulator } from "./manipulator.js";
import { Tool } from "./ui/tool.js";

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
    "shapes": (toolset) => {
        CanvasManipulator.mode = "SPAWN";
        closeSubToolbars(toolset.toolbar);
        openToolbar(document.querySelector("#objectSelect"));
    },

    "settings": (toolset) => {
        closeSubToolbars(toolset.toolbar);
        openToolbar(document.querySelector("#worldProperties"));
    }
};

const manipulatorTools = {

}

export { toolManagerConfig };