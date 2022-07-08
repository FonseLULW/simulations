class Graphic {
    #position;

    constructor(position) {
        if (this.constructor === Graphic) {
            throw new Error("Cannot instantiate an Abstract class");
        }

        this.#position = position;
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
}

class Circle extends Graphic {
    #diameter;

    constructor(position, diameter) {
        super(position);

        this.#diameter = diameter;
    }

    render(canvas) {
        canvas.circle(super.position.x, super.position.y, this.#diameter);
    }
}

class Square extends Graphic {
    #side;

    constructor(position, side) {
        super(position);

        this.#side = side;
    }

    render(canvas) {
        canvas.square(super.position.x, super.position.y, this.#side);
    }
}

export { Square, Circle };