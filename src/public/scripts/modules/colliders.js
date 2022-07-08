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

    testCollision()

    get side() {
        return this.#side;
    }
}

export { CircleCollider, SquareCollider };