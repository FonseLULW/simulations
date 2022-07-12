class Body {
    #graphic; // graphics
    #collider; // physics
    
    constructor(graphic, collider) {
        this.#graphic = graphic;
        this.#collider = collider;
    }

    draw(canvas) {
        this.#graphic.render(canvas);
        // this.#collider.showHitbox(canvas);
    }

    get x() {
        return this.#graphic.x;
    }

    set x(x) {
        this.#graphic.x = x;
    }

    get y() {
        return this.#graphic.y;
    }

    set y(y) {
        this.#graphic.y = y;
    }

    get collider() {
        return this.#collider;
    }

    isDynamic() {
        return false;
    }

    toString() {
        return `${this.constructor.name}
        ${this.#graphic.toString()}
        Collider: ${this.#collider}`;
    }
    
}

class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    constructor(graphic, collider, velocity, force, mass) {
        super(graphic, collider);
        this.#velocity = velocity;
        this.#force = force;
        this.#mass = mass;
    }

    get velocityX() {
        return this.#velocity.x;
    }

    get velocityY() {
        return this.#velocity.y;
    }

    get forceX() {
        return this.#force.x;
    }

    get forceY() {
        return this.#force.y;
    }

    get mass() {
        return this.#mass;
    }

    set velocityX(velocityX) {
        this.#velocity.x = velocityX;
    }

    set velocityY(velocityY) {
        this.#velocity.y = velocityY;
    }

    set forceX(forceX) {
        this.#force.x = forceX;
    }

    set forceY(forceY) {
        this.#force.y = forceY;
    }

    isDynamic() {
        return true;
    }

    toString() {
        return `${super.toString()}
        Velocity: ${this.#velocity.toString()}
        Force: ${this.#force.toString()}
        Mass: ${this.#mass}`;
    }
}

export { Body, Rigidbody };