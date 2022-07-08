class Graphic {
    #position;
    #color;

    constructor(position, color) {
        if (this.constructor === Graphic) {
            throw new Error("Cannot instantiate an Abstract class");
        }

        this.#position = position;
        this.#color = color;
    }

    render(canvas) {
        throw new Error("This methods has not been implemented");
    }

    get position() {
        return this.#position;
    }

    set position(position) {
        this.#position = position;
    }

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
    }
}

class Circle extends Graphic {
    #diameter;

    constructor(position, color, diameter) {
        super(position, color);

        this.#diameter = diameter;
    }

    render(canvas) {
        canvas.fill(super.color);
        canvas.circle(super.position.x, super.position.y, this.#diameter);
    }
}

class Square extends Graphic {
    #side;

    constructor(position, color, side) {
        super(position, color);

        this.#side = side;
    }

    render(canvas) {
        canvas.fill(this.color);
        canvas.square(this.position.x, this.position.y, this.#side);
    }
}

export { Square, Circle };