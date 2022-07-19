import { PrivateConstructorError } from "../modules/errors.js";

class ToolManager {
    static instance = null;
    static initializing = true;

    constructor() {
        if (ToolManager.initializing) {
            throw new PrivateConstructorError();
        }

        ToolManager.initializing = true;
        ToolManager.instance = this;
    }

    static getInstance() {
        if (!ToolManager.instance) {
            ToolManager.initializing = false;
            return new ToolManager();
        }

        return ToolManager.instance;
    }

    init(canvas, config) {
        this.canvas = canvas;
        this.tools = new Map(Object.entries(config));
    }

    handle(name) {
        let handler = this.tools.get(name);
        
        if (handler) { handler(); }
    }
}

export { ToolManager };