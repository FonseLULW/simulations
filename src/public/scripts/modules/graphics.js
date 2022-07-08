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

    get x() {
        return this.#position.x;
    }

    set x(x) {
        this.#position.x = x;
    }

    get y() {
        return this.#position.y;
    }

    set y(y) {
        this.#position.y = y;
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
        canvas.circle(this.x, this.y, this.#diameter);
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
        canvas.square(this.x, this.y, this.#side);
    }
}

export { Square, Circle };