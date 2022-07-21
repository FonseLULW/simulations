import { ToolManager } from "./toolManager.js";

class Toolset {
    constructor(DOMElement, toolbarElement) {
        this.element = DOMElement;
        this.toolbar = toolbarElement;
        this.buttons = DOMElement.querySelectorAll(".btn");
        this.selectedElement = null;
    }

    initButtons(eventType) {
        let eventName = eventType ? eventType : "click";

        this.buttons.forEach(btn => {
            btn.addEventListener(eventName, (e) => {
                this.select(btn);
                ToolManager.getInstance().handle(btn.id, this);
            })
        });
    }

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