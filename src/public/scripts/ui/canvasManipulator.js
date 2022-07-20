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

        // CLICK
        this.canvasElement.addEventListener("click", (e) => {
            if (!this.mode) { return; }
            this.tools.get(this.mode).onClick(this.canvas, e);
        })

        // DRAG (depends on PRESS and RELEASE)
        this.canvasElement.addEventListener("mousemove", (e) => {
            if (!this.dragentered) { return; }

            console.log("DRAGGN", e.mousedown)
            if (!this.mode) { return; }
            this.tools.get(this.mode).onDrag(this.canvas, e);
        })

        // PRESS
        this.canvasElement.addEventListener("mousedown", (e) => {
            this.dragentered = true;
            console.log("DRAGENETER", this.mode)
            if (!this.mode) { return; }
            this.tools.get(this.mode).onPress(this.canvas, e);
        })

        // RELEASE
        this.canvasElement.addEventListener("mouseup", (e) => {
            this.dragentered = false;

            if (!this.mode) { return; }
            this.tools.get(this.mode).onRelease(this.canvas, e);
        })
    }
}

export { CanvasManipulator };