import { CanvasManipulator } from "../manipulator.js";
import { Trigger } from "./trigger.js";

class Toolbar {
    constructor(DOMElement) {
        this.element = DOMElement;
        this.trigger = new Trigger(DOMElement.querySelector(".trigger"));
        
        this.opened = false;
        this.hovering = false;
    }

    init() {
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

        this.trigger.trigger.addEventListener("click", () => {
            this.trigger.clicked = !this.trigger.clicked;

            this.toggleDisplay();
        })
    }

    toggleDisplay() {
        if (this.trigger.clicked) {
            if (this.opened) {
                this.element.classList.remove("show");
            } else {
                this.trigger.mark();
                this.element.classList.add("show");
            }
        } else if (this.hovering) {
            this.trigger.unmark();
            this.element.classList.add("show");
        } else {
            this.trigger.default();
            this.element.classList.remove("show");
        }
    }

    closeSubs() {
        document.querySelectorAll(".sub").forEach(elem => {
            if (elem != this.element) {
                elem.classList.remove("show");
                elem.style.display = "none";
            }        
        })
    }
}

export { Toolbar };