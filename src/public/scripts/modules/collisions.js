import { Vector2D } from "./vector2D.js";

class Collision {
    #objA;
    #objB;
    #collisionPoint;

    constructor(objA, objB, collisionPoint) {
        this.#objA = objA;
        this.#objB = objB;
        this.#collisionPoint = collisionPoint;
    }

    get objA() {
        return this.#objA;
    }

    get objB() {
        return this.#objB;
    }

    get collisionPoint() {
        return this.#collisionPoint;
    }
}

class CollisionPoint {
    #pointA;
    #pointB;
    #depth;

    constructor(pointA, pointB, depth) {
        this.#pointA = pointA;
        this.#pointB = pointB;
        this.#depth = depth;
    }

    get pointA() {
        return this.#pointA;
    }

    get pointB() {
        return this.#pointB;
    }

    get depth() {
        return this.#depth;
    }
}

class CollisionTester {
    static testSquareSquareCollision(colliderA, colliderB) {

        return false;
    }

    static testCircleCircleCollision(colliderA, colliderB) {
        let ax = colliderA.x;
        let ay = colliderA.y;
        let aD = colliderA.diameter;

        let bx = colliderB.x;
        let by = colliderB.y;
        let bD = colliderB.diameter;

        if (((bx <= ax && ax <= bx + bD) || (ax <= bx && bx <= ax + aD))
        && ((by <= ay && ay <= by + bD) || (ay <= by && by <= ay + aD))) {
            return new CollisionPoint(
                new Vector2D(ax, ay),
                new Vector2D(bx, by),
                Math.sqrt(((ax - bx) ** 2) + ((ay - by) ** 2))
            )
        } else {
            return false;
        }
    }

    static testCircleSquareCollision(colliderA, colliderB) {
        return false;
    }

    static testCirclePointCollision(circle, point) {
        let cx = circle.x;
        let cy = circle.y;
        let cR = circle.diameter / 2;

        let px = point.x;
        let py = point.y;

        if ((cx - cR <= px && px <= cx + cR) && (cy - cR <= py && py <= cy + cR)) {
            return new CollisionPoint(
                new Vector2D(px, py), new Vector2D(px, py), 0
            )
        }

        return false;
    }

    static testSquarePointCollision(square, point) {
        let sx = square.x;
        let sy = square.y;
        let sS = square.side;

        let px = point.x;
        let py = point.y;

        if ((sx <= px && px <= sx + sS) && (sy <= py && py <= sy + sS)) {
            return new CollisionPoint(
                new Vector2D(px, py), new Vector2D(px, py), 0
            )
        }

        return false;
    }
}

export { CollisionTester, Collision};