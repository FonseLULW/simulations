import { CollisionTester } from './collisions.js';

class Collider {
    #position;

    constructor(position) {
        if (this.constructor === Collider) {
            throw new Error("Abstract class cannot be instantiated");
        }
        this.#position = position;
    }

    showHitbox(canvas) {
        throw new Error("Abstract method is not implemented");
    }

    testCollision(otherCollider) {
        if (otherCollider.constructor === CircleCollider) {
            this.testCollisionWithCircle(otherCollider);
        } else if (otherCollider.constructor === SquareCollider) {
            this.testCollisionWithSquare(otherCollider);
        }
    }

    testCollisionWithCircle(otherCollider) {
        throw new Error("Abstract method is not implemented");
    }

    testCollisionWithSquare(otherCollider) {
        throw new Error("Abstract method is not implemented");
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
        console.log(`Testing Circle v Circle`);
        return CollisionTester.testCircleCircleCollision(this, otherCollider);
    }

    testCollisionWithSquare(otherCollider) {
        console.log(`Testing Circle v Square`);
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
        console.log(`Testing Square v Circle`);
    }

    testCollisionWithSquare(otherCollider) {
        CollisionTester.testSquareSquareCollision(this, otherCollider);
    }

    get side() {
        return this.#side;
    }
}

export { CircleCollider, SquareCollider };