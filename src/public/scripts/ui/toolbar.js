import { CanvasManipulator } from "../manipulator.js";

class Toolbar {
    constructor(DOMElement) {
        this.element = DOMElement;
        this.trigger = DOMElement.querySelector(".trigger");
        
        this.opened = false;
        this.hovering = false;
        this.triggerClicked = false;
    }

    initToolbar() {
        this.element.addEventListener("mouseout", () => {
            CanvasManipulator.inCanvasRange = true;
            this.hovering = false;

            this.toggleDisplay();
        })
    
        this.element.addEventListener("mouseover", () => {
            CanvasManipulator.inCanvasRange = false;
            this.hovering = true;

            this.toggleDisplay();
        })

        this.trigger.addEventListener("click", () => {
            this.triggerClicked = !this.triggerClicked;

            this.toggleDisplay();
        })
    }

    toggleDisplay() {
        if (this.triggerClicked) {
            if (this.opened) {
                this.element.classList.remove("show");
            } else {
                this.trigger.children[0].style["font-variation-settings"] = `'FILL' 1`;
                this.element.classList.add("show");
            }
            this.trigger.children[0].innerHTML = "push_pin";
        } else if (this.hovering) {
            this.trigger.children[0].style["font-variation-settings"] = `'FILL' 0`;
            this.trigger.children[0].innerHTML = "push_pin";
            this.element.classList.add("show");
        } else {
            this.trigger.children[0].innerHTML = this.trigger_default;
            this.element.classList.remove("show");
        }
    }
}