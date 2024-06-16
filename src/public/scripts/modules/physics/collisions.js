/**
 * Handles things related to collisions.
 * 
 * @author FonseLULW
 */

import { Vector2D, Vectors } from "../objects/vector2D.js";

/**
 * A Collision class describing a collision between two Body objects.
 */
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

/**
 * A CollisionPoint class describing a single point of collision.
 */
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

/**
 * A CollisionTester class for testing for the collision between two Body objects.
 * 
 * @namespace 
 */
class CollisionTester {
    static testSquareSquareCollision(colliderA, colliderB) {

        return false;
    }

    static testCircleCircleCollision(colliderA, colliderB) {
        let radiusA, radiusB, maxCollisionDistance, actualDistance;
        radiusA = colliderA.diameter / 2;
        radiusB = colliderB.diameter / 2;
        maxCollisionDistance = radiusA + radiusB;
        actualDistance = Vectors.distance(colliderA.position, colliderB.position);

        if (actualDistance <= maxCollisionDistance) {
            let depth, apexA, apexB;
            depth = maxCollisionDistance - actualDistance;

            let direction = Vectors.divideScalar(new Vector2D(colliderA.x - colliderB.x, colliderA.y - colliderB.y), actualDistance);
            apexA = Vectors.subtractVect(colliderA.position, Vectors.multiplyScalar(direction, radiusA - depth))
            apexB = Vectors.addVect(colliderB.position, Vectors.multiplyScalar(direction, radiusB - depth))

            let result = new CollisionPoint(apexA, apexB, depth);
            return result;
        }


        return false;
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

export { CollisionTester, Collision };