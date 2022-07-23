/**
 * A Trigger class.
 * 
 * @author FonseLULW
 */

class Trigger {

    /**
     * Creates a new Trigger object.
     * 
     * @param {Element} triggerElem a DOM Element
     */
    constructor(triggerElem) {
        this.trigger = triggerElem;
        this.icon = triggerElem.children[0].innerHTML;
        this.clicked = false;
    }

    /**
     * Changes the trigger icon into its selected/marked state.
     */
    mark() {
        this.trigger.children[0].style["font-variation-settings"] = `'FILL' 1`;
        this.trigger.children[0].innerHTML = "push_pin";
    }

    /**
     * Changes the trigger icon into its deselected/unmarked state.
     */
    unmark() {
        this.trigger.children[0].style["font-variation-settings"] = `'FILL' 0`;
        this.trigger.children[0].innerHTML = "push_pin";
    }

    /**
     * Changes the trigger icon into its default state.
     */
    default() {
        this.trigger.children[0].innerHTML = this.icon;
    }
}

export { Trigger };