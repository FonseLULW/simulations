/**
 * A ToolManager class.
 * 
 * Manages all UI buttons and their implementation
 * @author FonseLULW
 */

import { PrivateConstructorError } from "../../utilities/errors.js";

class ToolManager {
    static instance = null;
    static initializing = true;

    /**
     * Creates a single instance of a ToolManager.
     */
    constructor() {
        if (ToolManager.initializing) {
            throw new PrivateConstructorError();
        }

        ToolManager.initializing = true;
        ToolManager.instance = this;
    }

    /**
     * Returns the single instance of ToolManager.
     * 
     * Creates the instance if not yet existing
     * @returns a ToolManager singleton
     */
    static getInstance() {
        if (!ToolManager.instance) {
            ToolManager.initializing = false;
            return new ToolManager();
        }

        return ToolManager.instance;
    }

    /**
     * Loads information into the ToolManager singleton.
     * 
     * @param {P5} canvas a P5 object 
     * @param {Object} config an Object with a String Id - callback function pair
     */
    init(canvas, config) {
        this.canvas = canvas;
        this.tools = new Map(Object.entries(config));
    }

    /**
     * Calls the button's callback using its id.
     * 
     * @param {String} name the id of the 
     * @param {Toolset} toolset the Toolset object containing the button 
     */
    handle(name, toolset) {
        let handler = this.tools.get(name);
        
        if (handler) { handler(toolset); }
    }
}

export { ToolManager };