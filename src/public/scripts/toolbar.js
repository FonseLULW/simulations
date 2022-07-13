class Toolbar {
    constructor(DOMelement, canvas, handlerCallback) {
        this.element = DOMelement;
        this.handleToolClick = handlerCallback;

        this.buttons = DOMelement.querySelectorAll(".btn");
        this.trigger = DOMelement.querySelector(".trigger");
        this.initToolbar(canvas);
        this.initControls();
    }

    initToolbar(canvas) {
        this.element.addEventListener("mouseout", () => {
            canvas.allowPlacing = true;
            this.element.classList.remove("show");
        })
    
        this.element.addEventListener("mouseover", () => {
            canvas.allowPlacing = false;
            this.element.classList.add("show");
        })
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
}

export { Toolbar };