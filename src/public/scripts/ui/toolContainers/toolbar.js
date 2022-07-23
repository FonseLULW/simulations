/**
 * A Toolbar class.
 * 
 * @author FonseLULW
 */

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
            this.hovering = false;

            this.toggleDisplay();
        })
    
        this.element.addEventListener("mouseover", () => {
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
}

export { Toolbar };