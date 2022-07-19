import { ToolManager } from "./toolManager";

class Toolset {
    constructor(DOMElement) {
        this.element = DOMElement;
        this.buttons = DOMElement.querySelectorAll(".btn");
        this.selectedElement = null;
    }

    initButtons() {
        this.buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.select(btn);
                ToolManager.getInstance().handle(btn.id);
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

        selected.classList.add("selected");
    }
}

export { Toolset }