import { Vector2D } from './vector2D.js';

class Body {
    #position;
    #collider; // physics
    #graphic; // graphics

    constructor(position, collider, graphic) {
        this.#position = position;
        this.#collider = collider;
        this.#graphic = graphic;
    }

    _createGraphic(canvas) {
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

    get collider() {
        return this.#collider;
    }

    isDynamic() {
        return false;
    }

    toString() {
        return `Body
        Position: ${this.#position}
        Collider: ${this.#collider}`;
    }
    
}

class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    constructor(position, velocity, force, mass, collider, graphic) {
        super(position, collider, graphic);
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
        Collider: ${this.collider}
        Velocity: ${this.velocity}
        Force: ${this.force}
        Mass: ${this.mass}`;
    }
}

export { Body, Rigidbody };