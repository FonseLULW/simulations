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
                    let col = new Collision(objA, objB, collided)
                    result.add(col);
                    console.log("Found collision: ", col);
                    console.log("Before col objA: ", objA.toString());
                    console.log("Before col objB: ", objB.toString());
                }
            }
        }

        return result;
    }
}

class SweepAndPruneCollisionDetectionStrategy extends CollisionDetectionStrategy {
    execute(physicsObjects) {
        let result = new Set();

        let activeIntervals = new Array();
        let activeIntervalBounds, elementBounds, distancesFromCenter;

        physicsObjects.sort((a, b) => {
            // sort left to right of x-axis
            return a.x - b.x;
        })
            .forEach(element => {
                distancesFromCenter = element.collider.distancesFromCenter;
                elementBounds = { left: element.x + distancesFromCenter.left, right: element.x + distancesFromCenter.right };

                if (!activeIntervalBounds || physicsObjects.at(-1) == element ||
                    elementBounds.right < activeIntervalBounds.left || elementBounds.left > activeIntervalBounds.right) {
                    if (activeIntervals.length > 0) {
                        // testCollision for every pair of activeIntervals
                        // console.log("ACTIVE INTERVAL: ", activeIntervals, "BOUNDS: ", activeIntervalBounds)
                        for (let objA of activeIntervals) {
                            for (let objB of activeIntervals) {
                                if (objA === objB) { break; }

                                let collided = objA.collider.testCollision(objB.collider);
                                if (collided) {
                                    result.add(new Collision(objA, objB, collided));
                                }
                            }
                        }

                        activeIntervals.splice(0);
                    }
                    activeIntervalBounds = { left: elementBounds.left, right: elementBounds.right };
                }
                activeIntervalBounds.right = elementBounds.right;
                activeIntervals.push(element);
            });

        return result;
    }
}

export { SimpleCollisionDetectionStrategy, SweepAndPruneCollisionDetectionStrategy };