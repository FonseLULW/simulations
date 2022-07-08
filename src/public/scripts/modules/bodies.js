import { Vector2D } from './vector2D.js';

class Body {
    #position;
    #color; // graphics
    #collider; // physics
    #graphic;

    constructor(position, collider, color, graphic) {
        this.#position = position;
        this.#collider = collider;
        this.#color = color;
        this.#graphic = graphic;
    }

    _createGraphic(canvas) {
        canvas.fill(this.#color);
        // canvas.circle(this.#position.x, this.#position.y, 50);
        this.#graphic.position = new Vector2D(this.#position.x, this.#position.y);
        this.#graphic.render(canvas);
    }

    draw(canvas) {
        this._createGraphic(canvas);
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

    get collider() {
        return this.#collider;
    }

    isDynamic() {
        return false;
    }

    toString() {
        return `Body
        Position: ${this.#position}
        Color: ${this.#color}
        Collider: ${this.#collider}`;
    }
    
}

class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    constructor(position, velocity, force, mass, collider, color, graphic) {
        super(position, collider, color, graphic);
        this.#velocity = velocity;
        this.#force = force;
        this.#mass = mass;
    }

    get velocity() {
        return this.#velocity;
    }

    get force() {
        return this.#force;
    }

    get mass() {
        return this.#mass;
    }

    set velocity(velocity) {
        this.#velocity = velocity;
    }

    set force(force) {
        this.#force = force;
    }

    isDynamic() {
        return true;
    }

    toString() {
        return `Rigidbody
        Position: ${this.position}
        Color: ${this.color}
        Collider: ${this.collider}
        Velocity: ${this.velocity}
        Force: ${this.force}
        Mass: ${this.mass}`;
    }
}

export { Body, Rigidbody };