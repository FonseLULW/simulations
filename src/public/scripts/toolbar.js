import { CanvasManipulator } from "./manipulator.js";

class Toolbar {
    constructor(DOMelement, canvas, handlerCallback) {
        this.element = DOMelement;
        this.handleToolClick = handlerCallback;

        this.buttons = DOMelement.querySelectorAll(".btn");
        this.trigger = DOMelement.querySelector(".trigger");
        this.trigger_default = this.trigger.children[0].innerHTML;

        this.opened = false;
        this.hovering = false;
        this.triggerClicked = false;

        this.initToolbar(canvas);

        if (handlerCallback) {
            this.initControls();
        }
    }

    initToolbar(canvas) {
        this.element.addEventListener("mouseout", () => {
            CanvasManipulator.inCanvasRange = true;
            this.hovering = false;

            this.switchToolbar();
        })
    
        this.element.addEventListener("mouseover", () => {
            CanvasManipulator.inCanvasRange = false;
            this.hovering = true;

            this.switchToolbar();
        })

        // this.trigger.addEventListener("hover")

        this.trigger.addEventListener("click", () => {
            this.triggerClicked = !this.triggerClicked;

            this.switchToolbar();
        })
    }

    switchToolbar() {
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

    initControls() {
        this.buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.handleToolClick(btn, e);
            })
        });
    }

    closeSubs() {
        document.querySelectorAll(".sub").forEach(elem => {
            if (elem != this.element) {
                elem.classList.remove("show");
                elem.style.display = "none";
            }        
        })
    }

    selectOption(selected) {
        this.selected = selected;

        if (selected.classList.contains("nogradient")) {
            return;
        }

        this.buttons.forEach(btn => {
            btn.classList.remove("selected");
        })

        selected.classList.add("selected");
    }
}

class Trigger {
    constructor(triggerElem, direction) {
        this.trigger = triggerElem;

        this.icons = getIcons(direction);
    }
}

function getIcons(direction) {
    let icons = {
        "pinned": null,
        "hover": null
    }; // pinned, hover, default

    switch (direction) {
        case "up":
            icons.default = "expand_more";
            break;
        case "down":
            icons.default = "expand_less";
            break;
        case "left":
            icons.default = "chevron_left";
            break;
        case "right":
            icons.default = "chevron_right";
            break;
        default:
    }

    return icons;
}

export { Toolbar, Trigger };