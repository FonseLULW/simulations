import { Collision } from './collisions.js';

class World {
    #objects;
    #solvers;
    #properties;

    constructor() {
        this.#objects = new Set();
        this.#solvers = new Array();
        this.#properties = {
            "gravity": 400
        };
    }

    resolveCollisions(deltaTime) {
        let collisions = new Set();

        for (let objA of this.#objects) {
            for (let objB of this.#objects) {
                if (objA === objB) { break; }

                let collided = objA.collider.testCollision(objB.collider);
                console.log(collided)
                if (collided) {
                    collisions.add(new Collision(objA, objB, collided));
                    console.log("HIT")
                }
            }
        }

        collisions.forEach(collision => {
            this.#solvers.forEach(solver => {
                solver.solve(collision, deltaTime);
            })
        })
    }

    draw(canvas) {
        canvas.background(247, 245, 246);

        canvas.stroke('blue');
        canvas.strokeWeight(10);
        canvas.point(canvas.mouseX, canvas.mouseY)

        canvas.strokeWeight(1);
        

        this.resolveCollisions(canvas.deltaTime);

        this.#objects.forEach(physObj => {
            physObj.draw(canvas);

            if (physObj.isDynamic()) {
                physObj.forceY = this.#properties.gravity * physObj.mass;

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
        this.#objects.delete(physObj);
    }

    findObject(pos) {
        for (let obj of this.#objects) {
            if (obj.collider.testCollision(pos)) {
                return obj;
            }
        }
    }

    addSolver(solver) {
        this.#solvers.push(solver);
    }

    get properties() {
        return this.#properties;
    }
}

export { World };