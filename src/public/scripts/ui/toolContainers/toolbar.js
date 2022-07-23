import { Trigger } from "./trigger.js";

/**
 * A Toolbar class.
 * 
 * @author FonseLULW
 */
class Toolbar {

    /**
     * Constructs a new instance of a Toolbar.
     * 
     * @param {Element} DOMElement the DOMElement of the toolbar 
     */
    constructor(DOMElement) {
        this.element = DOMElement;
        this.trigger = new Trigger(DOMElement.querySelector(".trigger"));
        
        this.opened = false;
        this.hovering = false;
    }

    /**
     * Initializes this toolbar's functionality.
     */
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

    /**
     * Opens or closes the toolbar.
     */
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