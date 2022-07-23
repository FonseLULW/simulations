import { PrivateConstructorError } from "../../utilities/errors.js";

/**
 * A CanvasManipulator class.
 * 
 * Interacts with the canvas using subclasses of Tool
 * @author FonseLULW
 */
class CanvasManipulator {
    static instance = null;
    static initializing = true;

    /**
     * Creates a single instance of a CanvasManipulator.
     */
    constructor() {
        if (CanvasManipulator.initializing) {
            throw new PrivateConstructorError();
        }

        CanvasManipulator.instance = this;
        CanvasManipulator.initializing = true;
    }

    /**
     * Returns the single instance of CanvasManipulator.
     * 
     * Creates the instance if not yet existing
     * @returns a CanvasManipulator singleton
     */
    static getInstance() {
        if (!CanvasManipulator.instance) {
            CanvasManipulator.initializing = false;
            return new CanvasManipulator();
        }

        return CanvasManipulator.instance;
    }

    /**
     * Loads information into the CanvasManipulator singleton.
     * 
     * @param {P5} canvas a P5 object 
     * @param {Element} canvasElement the canvas element in the DOM
     * @param {Object} config an Object with a String identifier - Tool object pair
     */
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
            if (!this.mode) { return; }
            this.tools.get(this.mode).onDrag(this.canvas, e);
        })

        // PRESS
        this.canvasElement.addEventListener("mousedown", (e) => {
            this.dragentered = true;
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