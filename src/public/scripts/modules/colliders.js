class Collider {
    #origin;

    get x() {
        return this.#origin.x;
    }

    set x(x) {
        this.#origin.x = x;
    }

    get y() {
        return this.#origin.y;
    }

    set y(y) {
        this.#origin.y = y;
    }
}

class CircleCollider extends Collider {
    #diameter;

    get diameter() {
        return this.#diameter;
    }
}

class SquareCollider extends Collider {
    #side;

    get side() {
        return this.#side;
    }
}