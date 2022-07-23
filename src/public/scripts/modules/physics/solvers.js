/**
 * Physics Solver objects.
 * 
 * Solves attributes of Body objects on collision
 * @author FonseLULW
 */

import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from '../../utilities/errors.js';

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

export { SimpleSolver };