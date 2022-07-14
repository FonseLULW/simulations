class Toolbar {
    constructor(DOMelement, canvas, handlerCallback) {
        this.element = DOMelement;
        this.handleToolClick = handlerCallback;

        this.buttons = DOMelement.querySelectorAll(".btn");
        this.trigger = DOMelement.querySelector(".trigger");

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
            canvas.inCanvasRange = true;
            this.hovering = false;

            this.switchToolbar();
        })
    
        this.element.addEventListener("mouseover", () => {
            canvas.inCanvasRange = false;
            this.hovering = true;

            this.switchToolbar();
        })

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
                this.element.classList.add("show");
            }
        } else if (this.hovering) {
            this.element.classList.add("show");
        } else {
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

export { Toolbar };