import { CanvasManipulator } from "./manipulator.js";


const toolManagerConfig = {
    "shapes": () => {
        CanvasManipulator.mode = "SPAWN";

        let selectedToolbar = document.querySelector("#objectSelect");
        selectedToolbar.style.display = "block";
        selectedToolbar.classList.add("show");
    }
};

export { toolManagerConfig };