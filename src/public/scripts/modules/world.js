import { Vector2D } from './objects/vector2D.js';
import { Collision } from './physics/collisions.js';

/**
 * A World class.
 * 
 * Manages the physics
 * @author FonseLULW
 */
class World {
    #objects;
    #solvers;
    #properties;

    /**
     * Creates a World object.
     */
    constructor() {
        this.#objects = new Set();
        this.#solvers = new Array();
        this.#properties = {
            "timeIsMoving": 1, 
            "rateOfTime": 1,
            "gravity": 400
        };
    }

    /**
     * Resolves collisions found during collision detection.
     * 
     * @param {Number} deltaTime the time between frames in milliseconds 
     */
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

    /**
     * Draws a single frame of the simulation.
     * @param {P5} canvas a P5 object. 
     */
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

    /**
     * Adds a physObj to the World.
     * 
     * @param {Body} physObj a Body object
     */
    add(physObj) {
        this.#objects.add(physObj);
    }

    /**
     * Removes a physObj from the World.
     * 
     * @param {Body} physObj a Body object
     */
    remove(physObj) {
        this.#objects.delete(physObj);
    }

    /**
     * Removes all objects in the World.
     */
    clear() {
        this.#objects.clear();
    }

    /**
     * Finds a physics object in the World.
     * @param {Vector2D} pos the point where a physics object can be found
     * @returns 
     */
    findObject(pos) {
        for (let obj of this.#objects) {
            if (obj.lifetime >= 0 && obj.collider.testCollision(pos)) {
                return obj;
            }
        }
    }

    /**
     * Adds a solver into the World.
     * @param {Solver} solver a Solver that resolves a collision
     */
    addSolver(solver) {
        this.#solvers.push(solver);
    }

    get properties() {
        return this.#properties;
    }
}

export { World };