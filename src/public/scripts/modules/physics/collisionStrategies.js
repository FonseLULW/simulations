import { UnimplementedAbstractMethodError, AbstractObjectInstantiationError } from "../../utilities/errors.js";
import { Collision } from "./collisions.js";

class CollisionDetectionStrategy {
    constructor() {
        if (this.constructor == CollisionDetectionStrategy) {
            throw new AbstractObjectInstantiationError();
        }
    }

    execute(physicsObjects) {
        throw new UnimplementedAbstractMethodError();
    }
}

class SimpleCollisionDetectionStrategy extends CollisionDetectionStrategy {
    execute(physicsObjects) {
        let result = new Set();

        for (let objA of physicsObjects) {
            for (let objB of physicsObjects) {
                if (objA === objB) { break; }

                let collided = objA.collider.testCollision(objB.collider);
                if (collided) {
                    result.add(new Collision(objA, objB, collided));
                }
            }
        }

        return result;
    }
}

class SweepAndPruneCollisionDetectionStrategy extends CollisionDetectionStrategy {
    execute(physicsObjects) {
        let result = new Set();

        

        return result;
    }
}

export { SimpleCollisionDetectionStrategy, SweepAndPruneCollisionDetectionStrategy };