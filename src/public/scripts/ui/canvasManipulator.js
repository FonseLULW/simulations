import { PrivateConstructorError } from "../modules/errors.js";

class CanvasManipulator {
    static instance = null;
    static initializing = true;

    constructor() {
        if (CanvasManipulator.initializing) {
            throw new PrivateConstructorError();
        }

        CanvasManipulator.instance = this;
        CanvasManipulator.initializing = true;
    }

    static getInstance() {
        if (!CanvasManipulator.instance) {
            CanvasManipulator.initializing = false;
            return new CanvasManipulator();
        }

        return CanvasManipulator.instance;
    }

    init(canvas, canvasElement, config) {
        this.canvas = canvas;
        this.canvasElement = canvasElement;

        this.tools = new Map(Object.entries(config));
        this.mode = null;

        console.log(this.mode);

        this.canvasElement.addEventListener("click", (e) => {
            this.tools.get(this.mode).onClick(this.canvas, e);
        })
        this.canvasElement.addEventListener("drag", (e) => {
            this.tools.get(this.mode).onDrag(this.canvas, e);
        })
        this.canvasElement.addEventListener("mousedown", (e) => {
            console.log("down")
            this.tools.get(this.mode).onPress(this.canvas, e);
        })
        this.canvasElement.addEventListener("mouseup", (e) => {
            this.tools.get(this.mode).onRelease(this.canvas, e);
        })
    }
}

export { CanvasManipulator };