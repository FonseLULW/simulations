/**
 * Physics Solver objects.
 * 
 * Solves attributes of Body objects on collision
 * @author FonseLULW
 */

import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';
import { Vector2D, Vectors } from '../objects/vector2D.js';

/**
 * A Solver class.
 * 
 * @abstract
 */
class Solver {
    constructor() {
        if (this.constructor === Solver) {
            throw new AbstractObjectInstantiationError();
        }
    }

    solve(collision, deltaTime) {
        throw new UnimplementedAbstractMethodError();
    }
}

/**
 * A naive SimpleSolver class.
 */
class SimpleSolver extends Solver {
    solve(collision, deltaTime) {
        collision.objA.velocityX = -collision.objA.velocityX;
        collision.objB.velocityX = -collision.objB.velocityX;
    }
}

class PositionSolver extends Solver {
    solve(collision, deltaTime) {
        let bodyA = collision.objA
        let bodyB = collision.objB;

        let offset = (collision.collisionPoint.depth / 2) + 1;
        let distance = Vectors.distance(collision.collisionPoint.pointA, collision.collisionPoint.pointB);
        let direction = Vectors.divideScalar(Vectors.subtractVect(collision.collisionPoint.pointA, collision.collisionPoint.pointB), distance);


        // if (bodyA.isDynamic() || !bodyA.isDynamic()) {
        if (bodyA.isDynamic() && !bodyB.isDynamic()) {
            // Reposition only A
            let offsetVector = Vectors.multiplyScalar(direction, offset * 2)
            let newPosA = Vectors.addVect(bodyA, offsetVector);
            bodyA.x = newPosA.x;
            bodyA.y = newPosA.y;
        } else if (!bodyA.isDynamic() && bodyB.isDynamic()) {
            // Reposition only B
            let offsetVector = Vectors.multiplyScalar(direction, offset * 2)
            let newPosB = Vectors.subtractVect(bodyB, offsetVector);
            bodyB.x = newPosB.x;
            bodyB.y = newPosB.y;
        } else {
            // Reposition both objects (Both are static or dynamic)
            let offsetVector = Vectors.multiplyScalar(direction, offset)
            let newPosA = Vectors.addVect(bodyA, offsetVector);
            bodyA.x = newPosA.x;
            bodyA.y = newPosA.y;

            let newPosB = Vectors.subtractVect(bodyB, offsetVector);
            bodyB.x = newPosB.x;
            bodyB.y = newPosB.y;
        }

        console.log("Position solved objA: ", bodyA.toString());
        console.log("Position solved objB: ", bodyB.toString());
    }
}

class ForceSolver extends Solver {
    solve(collision, deltaTime) {
        let { objA, objB, collisionPoint } = collision;
        let { pointA, pointB, depth } = collisionPoint;
        let restitution = 1.0; // elastic

        let massA = objA.mass;
        let velocityA = objA.velocity;
        let massB = objB.mass;
        let velocityB = objB.velocity;

        let Normal = new Vector2D((pointA.x - pointB.x) / depth, (pointA.y - pointB.y) / depth);

        let velocityRelative = Vectors.dotProduct(Vectors.subtractVect(velocityA, velocityB), Normal);
        let impulseMag = -(1.0 + restitution) * velocityRelative / ((1 / massA) + (1 / massB));

        let impulseA = Vectors.multiplyScalar(Normal, impulseMag);
        let impulseB = Vectors.multiplyScalar(Normal, -impulseMag);

        objA.velocity = Vectors.addVect(objA.velocity, Vectors.divideScalar(impulseA, massA));
        objB.velocity = Vectors.addVect(objB.velocity, Vectors.divideScalar(impulseB, massB));

        console.log("Force solved objA: ", objA.toString());
        console.log("Force solved objB: ", objB.toString());
    }
}

export { SimpleSolver, PositionSolver, ForceSolver };