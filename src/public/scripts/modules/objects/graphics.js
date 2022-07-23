/**
 * Graphics classes act as the visual components of a Body object.
 * 
 * @author FonseLULW
 */

import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';

/**
 * A Graphic class.
 * 
 * @abstract
 */
class Graphic {
    #position;
    #color;

    constructor(position, color) {
        if (this.constructor === Graphic) {
            throw new AbstractObjectInstantiationError();
        }

        this.#position = position;
        this.#color = color;
    }

    render(canvas) {
        throw new UnimplementedAbstractMethodError();
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

    toString() {
        return `${this.#position.toString()}
        Color: ${this.#color}`;
    }
}

/**
 * A Circle representing a circle shape.
 */
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

    toString() {
        return `${super.toString()}
        Diameter: ${this.#diameter}`;
    }
}

/**
 * A Square class representing a quadrilateral with 4 equal sides.
 */
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

    toString() {
        return `${super.toString()}
        Side: ${this.#side}`;
    }
}

export { Square, Circle };