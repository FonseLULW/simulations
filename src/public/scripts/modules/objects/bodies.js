import { Vector2D } from "./vector2D.js";

/**
 * A Body class representing a physics object in the World.
 * 
 * @author FonseLULW
 */
class Body {
    #graphic; // graphics
    #collider; // physics
    #mass;
    
    /**
     * Creates a new Body object.
     * 
     * @param {Graphic} graphic a Graphic object
     * @param {Collider} collider a Collider object
     */
    constructor(graphic, collider, mass) {
        this.#graphic = graphic;
        this.#collider = collider;
        this.#mass = mass;
        this.lifetime = 0;
        this.velocity = new Vector2D(0, 0);
        this.force = new Vector2D(0, 0);
        

        console.log(this)
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

    get velocityX() {
        return this.velocity.x;
    }

    get velocityY() {
        return this.velocity.y;
    }

    get forceX() {
        return this.force.x;
    }

    get forceY() {
        return this.force.y;
    }

    set velocityX(velocityX) {
        this.velocity.x = velocityX;
    }

    set velocityY(velocityY) {
        this.velocity.y = velocityY;
    }

    set forceX(forceX) {
        this.force.x = forceX;
    }

    set forceY(forceY) {
        this.force.y = forceY;
    }

    get mass() {
        return this.#mass;
    }

    set mass(mass) {
        this.#mass = mass;
    }

    get collider() {
        return this.#collider;
    }

    get velocity() {
        return this.velocity;
    }

    get force() {
        return this.force;
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
        Mass: ${this.#mass}
        Collider: ${this.#collider}`;
    }
    
}

/**
 * A Rigidbody class representing a dynamic Body.
 */
class Rigidbody extends Body {


    /**
     * Creates a new Rigidbody object.
     * 
     * @param {Graphic} graphic a Graphic object
     * @param {Collider} collider a Collider object
     */
    constructor(graphic, collider, mass, velocity, force) {
        super(graphic, collider, mass);
        this.velocity = velocity;
        this.force = force;
        this.mass = 1000;

        console.log(velocity);

        console.log(this.toString());
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
        Velocity: ${this.velocity.toString()}
        Force: ${this.force.toString()}`;
    }
}

export { Body, Rigidbody };