class CanvasManipulator {
    constructor(canvas, canvasElement, config) {
        this.canvas = canvas;
        this.canvasElement = canvasElement;

        this.tools = new Map(Object.entries(config));
        this.mode = null;
    }

    init() {
        this.canvasElement.addEventListener("click", (e) => {
            this.tools.get(this.mode).onClick(canvas, e);
        })
    }
}

export { CanvasManipulator };