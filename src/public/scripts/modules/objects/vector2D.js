/**
 * A Vector2D class representing a single point in a plane.
 */
class Vector2D {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }

    toString() {
        return `Vector2D(${this.#x}, ${this.#y})`
    }
}

/* Code taken from AmitDiwan of tutorialspoint.com
 *
 * Link: https://www.tutorialspoint.com/finding-if-three-points-are-collinear-javascript
 */
function slope(pointA, pointB) {
    return (pointB.y - pointA.y) / (pointB.x - pointA.y);
}

/* Code taken from AmitDiwan of tutorialspoint.com
 *
 * Link: https://www.tutorialspoint.com/finding-if-three-points-are-collinear-javascript
 */
function collinear(a, b, c) {
    return slope(a, b) == slope(b, c) && slope(b, c) == slope(c, a);
}

export { Vector2D, collinear };