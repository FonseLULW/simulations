class World {
    #objects;

    constructor() {
        this.#objects = new Set();
    }

    resolveCollisions() {
        let collisions = new Set();

        for (let objA of this.#objects) {
            for (let objB of this.#objects) {
                if (objA === objB) { break; }

                collisions.add(new Collision(objA, objB, objA.collider.testCollision(objB.collider)));
            }
        }
    }

    draw(canvas) {
        canvas.background(247, 245, 246);

        this.resolveCollisions();

        this.#objects.forEach(physObj => {
            physObj.draw(canvas);

            if (physObj.isDynamic()) {
                // v+1 = v + F/m * t
                physObj.velocityX = physObj.velocityX + physObj.forceX / physObj.mass * canvas.deltaTime / 1000;
                physObj.velocityY = physObj.velocityY + physObj.forceY / physObj.mass * canvas.deltaTime / 1000;

                // s+1 = s + vt
                physObj.x = physObj.x + physObj.velocityX * canvas.deltaTime / 1000;
                physObj.y = physObj.y + physObj.velocityY * canvas.deltaTime / 1000
            }
        })
    }

    add(physObj) {
        this.#objects.add(physObj);
        console.log(`Created ${physObj}`)
    }

    remove(physObj) {
        this.#objects.remove(physObj);
    }
}

export { World };