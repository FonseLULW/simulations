class Trigger {
    constructor(triggerElem) {
        this.trigger = triggerElem;
        this.icon = triggerElem.children[0].innerHTML;
        this.clicked = false;
    }

    mark() {
        this.trigger.children[0].style["font-variation-settings"] = `'FILL' 1`;
        this.trigger.children[0].innerHTML = "push_pin";
    }

    unmark() {
        this.trigger.children[0].style["font-variation-settings"] = `'FILL' 0`;
        this.trigger.children[0].innerHTML = "push_pin";
    }

    default() {
        this.trigger.children[0].innerHTML = this.icon;
    }
}

export { Trigger };