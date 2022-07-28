/**
 * A Body class representing a physics object in the World.
 * 
 * @author FonseLULW
 */
class Body {
    #graphic; // graphics
    #collider; // physics
    
    /**
     * Creates a new Body object.
     * 
     * @param {Graphic} graphic a Graphic object
     * @param {Collider} collider a Collider object
     */
    constructor(graphic, collider) {
        this.#graphic = graphic;
        this.#collider = collider;
        this.lifetime = 0;
    }

    /**
     * Draws the Body in the canvas.
     * 
     * @param {P5} canvas a P5 object 
     */
    draw(canvas) {
        if (this.followingMouse) {
            this.x = canvas.mouseX;
            this.y = canvas.mouseY;
        }
        this.#graphic.render(canvas);
    }

    get x() {
        return this.#graphic.x;
    }

    set x(x) {
        this.#graphic.x = x;
        this.#collider.x = x;
    }

    get y() {
        return this.#graphic.y;
    }

    set y(y) {
        this.#graphic.y = y;
        this.#collider.y = y;
    }

    get collider() {
        return this.#collider;
    }

    /**
     * Returns false.
     * @returns false
     */
    isDynamic() {
        return false;
    }

    toString() {
        return `${this.constructor.name}
        ${this.#graphic.toString()}
        Collider: ${this.#collider}`;
    }
    
}

/**
 * A Rigidbody class representing a dynamic Body.
 */
class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    /**
     * Creates a new Rigidbody object.
     * 
     * @param {Graphic} graphic a Graphic object
     * @param {Collider} collider a Collider object
     */
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

    /**
     * Returns true.
     * @returns true
     */
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