/**
 * Graphics classes act as the visual components of a Body object.
 * 
 * @author FonseLULW
 */

import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';
import { Vector2D } from './vector2D.js';

/**
 * A Graphic class.
 * 
 * @abstract
 */
class Graphic {
    #position;
    #color;

    /**
     * Creates a new Graphic object.
     * 
     * @abstract
     * @param {Vector2D} position the position of the Graphic
     * @param {p5.Color} color a p5 Color object.
     */
    constructor(position, color) {
        if (this.constructor === Graphic) {
            throw new AbstractObjectInstantiationError();
        }

        this.#position = position;
        this.#color = color;
    }

    /**
     * Renders the Graphic in the canvas.
     * 
     * @abstract
     * @param {P5} canvas a P5 object
     */
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

    toJSON() {
        return {
            x: this.#position.x,
            y: this.#position.y,
            color: this.#color
        }
    }
}

/**
 * A Circle representing a circle shape.
 */
class Circle extends Graphic {
    #diameter;

    /**
     * Creates a new Circle object.
     * 
     * @param {Vector2D} position the position of the Circle
     * @param {p5.Color} color a p5 Color object
     * @param {Number} diameter the Circle object's diameter 
     */
    constructor(position, color, diameter) {
        super(position, color);

        this.#diameter = diameter;
    }

    /**
     * Renders the Circle in the canvas.
     * 
     * @param {P5} canvas a P5 object
     */
    render(canvas) {
        canvas.fill(super.color);
        canvas.circle(this.x, this.y, this.#diameter);
    }

    toString() {
        return `${super.toString()}
        Diameter: ${this.#diameter}`;
    }

    toJSON() {
        return { ...super.toJSON(), diameter: this.#diameter };
    }
}

/**
 * A Square class representing a quadrilateral with 4 equal sides.
 */
class Square extends Graphic {
    #side;

    /**
     * Creates a new Square object.
     * 
     * @param {Vector2D} position the position of the Square
     * @param {p5.Color} color a p5 Color object
     * @param {Number} side the length of a single side of the Square object
     */
    constructor(position, color, side) {
        super(position, color);

        this.#side = side;
    }

    /**
     * Renders the Square in the canvas.
     * 
     * @param {P5} canvas a P5 object
     */
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