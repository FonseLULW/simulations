import { Vector2D } from "./vector2D.js";

class Collision {
    #colliderA;
    #colliderB;
    #collisionPoint;
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
    // static testSquareSquareCollision(colliderA, colliderB) {
    //     console.log(`Testing Square v Square`);

    //     let ax = colliderA.x;
    //     let ay = colliderA.y;
    //     let aD = colliderA.diameter;
    // }

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
        }
    }
}

export { CollisionTester };