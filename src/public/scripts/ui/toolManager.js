import { PrivateConstructorError } from "../modules/errors";

class ToolManager {
    static instance;

    constructor() {
        throw new PrivateConstructorError();
    }

    getInstance() {
        if (!instance) {
            ToolManager.constructor = () => {};
            let newInstance = new ToolManager();
            ToolManager.constructor = () => {
                throw new PrivateConstructorError();
            }

            return newInstance;
        }

        return instance;
    }

    init(canvas, config) {
        this.canvas = canvas;
        this.tools = new Map(Object.entries(config));
    }

    handle(name) {
        this.tools.get(name)();
    }
}

export { ToolManager };