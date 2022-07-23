/**
 * A World class.
 * 
 * Manages the physics
 * @author FonseLULW
 */

import { Collision } from './physics/collisions.js';

class World {
    #objects;
    #solvers;
    #properties;

    constructor() {
        this.#objects = new Set();
        this.#solvers = new Array();
        this.#properties = {
            "timeIsMoving": 1, 
            "rateOfTime": 1,
            "gravity": 400
        };
    }

    resolveCollisions(deltaTime) {
        let collisions = new Set();

        for (let objA of this.#objects) {
            for (let objB of this.#objects) {
                if (objA === objB) { break; }

                let collided = objA.collider.testCollision(objB.collider);
                if (collided) {
                    collisions.add(new Collision(objA, objB, collided));
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
        let seconds = this.#properties["timeIsMoving"] * this.#properties["rateOfTime"] * canvas.deltaTime / 1000;

        canvas.background(247, 245, 246);

        canvas.stroke('blue');
        canvas.strokeWeight(10);
        canvas.point(canvas.mouseX, canvas.mouseY)

        canvas.strokeWeight(1);
        canvas.stroke('black');
        

        this.resolveCollisions(seconds);

        this.#objects.forEach(physObj => {
            if (physObj.lifetime >= 0) {
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
            }

            physObj.lifetime += seconds;
        })
    }

    add(physObj) {
        this.#objects.add(physObj);
    }

    remove(physObj) {
        this.#objects.delete(physObj);
    }

    clear() {
        this.#objects.clear();
    }

    findObject(pos) {
        for (let obj of this.#objects) {
            if (obj.lifetime >= 0 && obj.collider.testCollision(pos)) {
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