/**
 * Collider classes act as the physics components of Body objects.
 * 
 * @author FonseLULW
 */

import { CollisionTester } from '../physics/collisions.js';
import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';
import { Vector2D } from './vector2D.js';

/**
 * A Collider class.
 * 
 * @abstract
 */
class Collider {
    #position;

    /**
     * Creates a new Collider object.
     * 
     * @abstract
     * @param {Vector2D} position the position of the Collider object 
     */
    constructor(position) {
        if (this.constructor === Collider) {
            throw new AbstractObjectInstantiationError();
        }
        this.#position = position;
    }

    /**
     * Shows an outline of the Collider object.
     * 
     * @abstract
     * @param {P5} canvas a P5 object 
     */
    showHitbox(canvas) {
        throw new UnimplementedAbstractMethodError();
    }

    /**
     * Tests for the collision of two objects.
     * 
     * @param {Collider} otherCollider a Collider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollision(otherCollider) {
        if (otherCollider.constructor === CircleCollider) {
            return this.testCollisionWithCircle(otherCollider);
        } else if (otherCollider.constructor === SquareCollider) {
            return this.testCollisionWithSquare(otherCollider);
        } else if (otherCollider.constructor === Vector2D) {
            return this.testCollisionWithPoint(otherCollider);
        }
    }

    /**
     * Tests for the collision between this Collider and a CircleCollider.
     * 
     * @param {CircleCollider} otherCollider a CircleCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithCircle(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    /**
     * Tests for the collision between this Collider and a SquareCollider.
     * 
     * @param {SquareCollider} otherCollider a SquareCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithSquare(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    /**
     * Tests for the collision between this Collider and a Vector2D.
     * 
     * @param {Vector2D} otherCollider a Vector2D object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithPoint(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    get position() {
        return this.#position;
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
}

/**
 * A CircleCollider for Circle objects.
 */
class CircleCollider extends Collider {
    #diameter;

    /**
     * Creates a new CircleCollider object.
     * 
     * @param {Vector2D} position the position of the CircleCollider object 
     * @param {Number} diameter the diameter of the CircleCollider object
     */
    constructor(position, diameter) {
        super(position);
        this.#diameter = diameter;
    }

    /**
     * Shows an outline of the CircleCollider object.
     * 
     * @param {P5} canvas a P5 object 
     */
    showHitbox(canvas) {
        canvas.stroke("red");
        canvas.noFill();
        canvas.circle(this.x, this.y, this.#diameter);
    }

    /**
     * Tests for the collision between this CircleCollider and a CircleCollider.
     * 
     * @param {CircleCollider} otherCollider a CircleCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithCircle(otherCollider) {
        return CollisionTester.testCircleCircleCollision(this, otherCollider);
    }

    /**
     * Tests for the collision between this CircleCollider and a SquareCollider.
     * 
     * @param {SquareCollider} otherCollider a SquareCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithSquare(otherCollider) {
    }

    /**
     * Tests for the collision between this CircleCollider and a Vector2D.
     * 
     * @param {Vector2D} otherCollider a Vector2D object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithPoint(otherCollider) {
        return CollisionTester.testCirclePointCollision(this, otherCollider);
    }

    get diameter() {
        return this.#diameter;
    }
}

/**
 * A SquareCollider class for Square objects.
 */
class SquareCollider extends Collider {
    #side;
    #center;

    /**
     * Creates a new SquareCollider object.
     * 
     * @param {Vector2D} position the position of the SquareCollider object 
     * @param {Number} side the length of one side of the SquareCollider object
     */
    constructor(position, side) {
        super(position);
        this.#side = side;
    }

    /**
     * Shows an outline of the SquareCollider object.
     * 
     * @param {P5} canvas a P5 object 
     */
    showHitbox(canvas) {
        canvas.stroke("red");
        canvas.noFill();
        canvas.square(this.x, this.y, this.#side);
    }

    /**
     * Tests for the collision between this SquareCollider and a CircleCollider.
     * 
     * @param {CircleCollider} otherCollider a CircleCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithCircle(otherCollider) {
    }

    /**
     * Tests for the collision between this SquareCollider and a SquareCollider.
     * 
     * @param {SquareCollider} otherCollider a SquareCollider object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithSquare(otherCollider) {
        CollisionTester.testSquareSquareCollision(this, otherCollider);
    }

    /**
     * Tests for the collision between this SquareCollider and a Vector2D.
     * 
     * @param {Vector2D} otherCollider a Vector2D object to test with
     * @returns a CollisionPoint or null if no collision happened.
     */
    testCollisionWithPoint(otherCollider) {
        return CollisionTester.testSquarePointCollision(this, otherCollider);
    }

    get side() {
        return this.#side;
    }
}

export { Collider, CircleCollider, SquareCollider };