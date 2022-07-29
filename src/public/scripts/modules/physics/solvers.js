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

        let offset = collision.collisionPoint.depth / 2;
        let distance = Vectors.distance(collision.collisionPoint.pointA, collision.collisionPoint.pointB);
        let direction = Vectors.divideScalar(Vectors.subtractVect(collision.collisionPoint.pointA, collision.collisionPoint.pointB), distance);
        let offsetVector = Vectors.multiplyScalar(direction, offset)

        if (bodyA.isDynamic() || !bodyA.isDynamic()) {
            let newPosA = Vectors.addVect(bodyA, offsetVector);
            bodyA.x = newPosA.x;
            bodyA.y = newPosA.y;
        }
        
        if (bodyB.isDynamic() || !bodyA.isDynamic()) {
            let newPosB = Vectors.subtractVect(bodyB, offsetVector);
            bodyB.x = newPosB.x;
            bodyB.y = newPosB.y;
        }
    }
}

class VelocitySolver extends Solver {
    solve(collision, deltaTime) {
        let { objA, objB, collisionPoint } = collision; 

        let velInitialA = new Vector2D(objA.velocityX, objA.velocityY);
        let velInitialB = new Vector2D(objB.velocityX, objB.velocityY);
        let massA = objA.mass;
        let massB = objB.mass;

        if (!objA.isDynamic() && !objB.isDynamic()) {
            return;
        } else if (!objA.isDynamic()) {
            velInitialA = Vectors.multiplyScalar(velInitialB, -1);
            massA = massB;
        } else if (!objB.isDynamic()) {
            velInitialB = Vectors.multiplyScalar(velInitialA, -1);
            massB = massA;
        }

        let velFinalA = Vectors.addVect(
            Vectors.multiplyScalar(velInitialA, ((massA - massB) / (massA + massB))),
            Vectors.multiplyScalar(velInitialB, (2 * massB / (massA + massB)))
        );

        let velFinalB = Vectors.addVect(
            Vectors.multiplyScalar(velInitialB, ((massB - massA) / (massA + massB))),
            Vectors.multiplyScalar(velInitialA, (2 * massA / (massA + massB)))
        );

        if (objA.isDynamic()) {
            objA.velocityX = velFinalA.x;
            objA.velocityY = velFinalA.y;
        }
        
        if (objB.isDynamic()) {
            objB.velocityX = velFinalB.x;
            objB.velocityY = velFinalB.y;
        }

        console.log("BEFORE: ", velFinalA, velInitialB, massA, massB)
        console.log("AFTER: ", velFinalA, velFinalB)
    }
}

class ForceSolver extends Solver {
    solve(collision, deltaTime) {
        let { objA, objB, collisionPoint } = collision;
        let { pointA, pointB, depth } = collisionPoint;
        // let normalMagnitude = Vectors.distance(pointA, pointB);
        let normalVector = Vectors.divideScalar(new Vector2D(pointA.x - pointB.x, pointA.y - pointB.y), depth);
        normalVector = Vectors.multiplyScalar(normalVector, 2)

        // objA.forceX = -normalVector.x;
        // objA.forceY = -normalVector.y;
        // objB.forceX = normalVector.x;
        // objB.forceY = normalVector.y;

        let velA = Vectors.multiplyVect(new Vector2D(objA.velocityX, objA.velocityY), normalVector);
        let velB = Vectors.multiplyVect(new Vector2D(objB.velocityX, objB.velocityY), normalVector);
        objA.velocityX = velA.x;
        objA.velocityY = velA.y;
        objB.velocityX = -velB.x;
        objB.velocityY = -velB.y;

        console.log("NORMAL: ", normalVector);
        // objA.velocityX = normalVector.x / objA.mass / (deltaTime * 1000);
        // objA.velocityY = normalVector.y / objA.mass / (deltaTime * 1000);
        // objB.velocityX = -normalVector.x / objA.mass / (deltaTime * 1000);
        // objB.velocityY = -normalVector.y / objA.mass / (deltaTime * 1000);
    }
}

export { SimpleSolver, PositionSolver, VelocitySolver, ForceSolver };