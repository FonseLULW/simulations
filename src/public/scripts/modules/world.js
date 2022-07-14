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
        let seconds = 1 * canvas.deltaTime / 1000;

        canvas.background(247, 245, 246);

        canvas.stroke('blue');
        canvas.strokeWeight(10);
        canvas.point(canvas.mouseX, canvas.mouseY)

        canvas.strokeWeight(1);
        

        this.resolveCollisions(seconds);

        this.#objects.forEach(physObj => {
            physObj.draw(canvas);

            if (physObj.isDynamic()) {
                physObj.forceY = this.#properties.gravity * physObj.mass;

                // v+1 = v + F/m * t
                physObj.velocityX = physObj.velocityX + physObj.forceX / physObj.mass * seconds;
                physObj.velocityY = physObj.velocityY + physObj.forceY / physObj.mass * seconds;

                // s+1 = s + vt
                physObj.x = physObj.x + physObj.velocityX * seconds;
                physObj.y = physObj.y + physObj.velocityY * seconds;
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