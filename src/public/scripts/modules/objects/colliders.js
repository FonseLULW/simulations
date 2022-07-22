import { CollisionTester } from '../physics/collisions.js';
import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';
import { Vector2D } from './vector2D.js';

class Collider {
    #position;

    constructor(position) {
        if (this.constructor === Collider) {
            throw new AbstractObjectInstantiationError();
        }
        this.#position = position;
    }

    showHitbox(canvas) {
        throw new UnimplementedAbstractMethodError();
    }

    testCollision(otherCollider) {
        if (otherCollider.constructor === CircleCollider) {
            return this.testCollisionWithCircle(otherCollider);
        } else if (otherCollider.constructor === SquareCollider) {
            return this.testCollisionWithSquare(otherCollider);
        } else if (otherCollider.constructor === Vector2D) {
            return this.testCollisionWithPoint(otherCollider);
        }
    }

    testCollisionWithCircle(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    testCollisionWithSquare(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    testCollisionWithPoint(otherCollider) {
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
}

class CircleCollider extends Collider {
    #diameter;

    constructor(position, diameter) {
        super(position);
        this.#diameter = diameter;
    }

    showHitbox(canvas) {
        canvas.stroke("red");
        canvas.noFill();
        canvas.circle(this.x, this.y, this.#diameter);
    }

    testCollisionWithCircle(otherCollider) {
        return CollisionTester.testCircleCircleCollision(this, otherCollider);
    }

    testCollisionWithSquare(otherCollider) {
    }

    testCollisionWithPoint(otherCollider) {
        return CollisionTester.testCirclePointCollision(this, otherCollider);
    }

    get diameter() {
        return this.#diameter;
    }
}

class SquareCollider extends Collider {
    #side;
    #center;

    constructor(position, side) {
        super(position);
        this.#side = side;
    }

    showHitbox(canvas) {
        canvas.stroke("red");
        canvas.noFill();
        canvas.square(this.x, this.y, this.#side);
    }

    testCollisionWithCircle(otherCollider) {
    }

    testCollisionWithSquare(otherCollider) {
        CollisionTester.testSquareSquareCollision(this, otherCollider);
    }

    testCollisionWithPoint(otherCollider) {
        return CollisionTester.testSquarePointCollision(this, otherCollider);
    }

    get side() {
        return this.#side;
    }
}

export { Collider, CircleCollider, SquareCollider };