import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from './errors.js';

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

class SimpleSolver extends Solver {
    solve(collision, deltaTime) {
        collision.objA.velocityX = -collision.objA.velocityX;
        collision.objB.velocityX = -collision.objB.velocityX;
    }
}

export { SimpleSolver };