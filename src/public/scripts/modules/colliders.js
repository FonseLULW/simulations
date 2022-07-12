import { CollisionTester } from './collisions.js';
import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from './errors.js';

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
        }
    }

    testCollisionWithCircle(otherCollider) {
        throw new UnimplementedAbstractMethodError();
    }

    testCollisionWithSquare(otherCollider) {
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
    #center;

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

    get side() {
        return this.#side;
    }
}

export { Collider, CircleCollider, SquareCollider };