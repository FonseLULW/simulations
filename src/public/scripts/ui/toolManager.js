class ToolManager {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.tools = new Map(Object.entries(config));
    }

    handle(name) {
        this.tools.get(name)();
    }
}

export { ToolManager };