import { ToolManager } from "../managers/toolManager.js";

/**
 * A Toolset class.
 * 
 * @author FonseLULW
 */
class Toolset {

    /**
     * Constructs a new instance of Toolset.
     * 
     * @param {Element} DOMElement the Toolset's DOMElement
     * @param {Element} toolbarElement the Toolset's parent toolbar DOMElement
     */
    constructor(DOMElement, toolbarElement) {
        this.element = DOMElement;
        this.toolbar = toolbarElement;
        this.buttons = DOMElement.querySelectorAll(".btn");
        this.selectedElement = null;
    }

    /**
     * Initializes the functionalities of the toolset's buttons.
     * 
     * @param {String} eventType the event to track 
     */
    initButtons(eventType) {
        let eventName = eventType ? eventType : "click";

        this.buttons.forEach(btn => {
            btn.addEventListener(eventName, (e) => {
                this.select(btn);
                ToolManager.getInstance().handle(btn.id, this);
            })
        });
    }

    /**
     * Toggles the select state of a single button in the toolset.
     * 
     * Makes sure that only one button can be selected
     * @param {DOMElement} element a DOMElement of a single button in the toolset 
     * @returns 
     */
    select(element) {
        if (element.classList.contains("nogradient")) {
            return;
        }

        this.selectedElement = element;
        this.buttons.forEach(btn => {
            btn.classList.remove("selected");
        })

        element.classList.add("selected");
    }
}

export { Toolset }