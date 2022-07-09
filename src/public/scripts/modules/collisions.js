class Collision {
    #colliderA;
    #colliderB;
    #collisionPoint;
}

class CollisionPoint {
    #pointA;
    #pointB;
    #depth;
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

        return ((bx <= ax && ax <= bx + bD) || (ax <= bx && bx <= ax + aD)) && ((by <= ay && ay <= by + bD) || (ay <= by && by <= ay + aD))
    }
}

export { CollisionTester };