/**
 * A Vector2D class representing a single point in a plane.
 */
class Vector2D {
    #x;
    #y;

    /**
     * Creates a new Vector2D object.
     * 
     * @param {Number} x the x coordinate 
     * @param {Number} y the y coordinate
     */
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

const Vectors = {
    /**
     * Calculates the slope of a line connecting two points.
     * 
     * @param {Vector2D} pointA a Vector2D object 
     * @param {Vector2D} pointB a Vector2D object 
     * @returns a Number representing the slope of the line segment connecting the two points
     * 
     * Code attributed to AmitDiwan of tutorialspoint.com
     * Link: https://www.tutorialspoint.com/finding-if-three-points-are-collinear-javascript
     */
    slope: (pointA, pointB) => {
        return (pointB.y - pointA.y) / (pointB.x - pointA.y);
    },

    /**
     * Returns true if points a, b, and c are collinear.
     * 
     * @param {Vector2D} a a Vector2D object 
     * @param {Vector2D} b a Vector2D object
     * @param {Vector2D} c a Vector2D object
     * @returns a boolean true if all three points are collinear, else false
     * 
     * Code attributed to AmitDiwan of tutorialspoint.com
     * Link: https://www.tutorialspoint.com/finding-if-three-points-are-collinear-javascript
     */
    collinear: (a, b, c) => {
        return slope(a, b) == slope(b, c) && slope(b, c) == slope(c, a);
    }
}

export { Vector2D, Vectors };