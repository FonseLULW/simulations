import { PrivateConstructorError } from "../../utilities/errors.js";

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

    handle(name, toolset) {
        let handler = this.tools.get(name);
        
        if (handler) { handler(toolset); }
    }
}

export { ToolManager };