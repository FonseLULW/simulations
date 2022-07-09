class Solver {
    constructor() {
        if (this.constructor === Solver) {
            throw new Error("Cannot instantiate Abstract object");
        }
    }

    solve(collision, deltaTime) {
        throw new Error("This method has not been implemented");
    }
}

class SimpleSolver extends Solver {
    solve(collision, deltaTime) {
        collision.objA.velocityX = -collision.objA.velocityX;
        collision.objB.velocityX = -collision.objB.velocityX;
    }
}

export { SimpleSolver };