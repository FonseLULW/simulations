import { Vector2D, Vectors } from './objects/vector2D.js';
import { Collision } from './physics/collisions.js';
import { SimpleCollisionDetectionStrategy, SweepAndPruneCollisionDetectionStrategy } from './physics/collisionStrategies.js'

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
        this.#objects = new Array();
        this.#solvers = new Array();
        this.#properties = {
            "timeIsMoving": 1,
            "rateOfTime": 1,
            "gravity": 0
        };
    }

    /**
     * Resolves collisions found during collision detection.
     * 
     * @param {Number} deltaTime the time between frames in milliseconds 
     */
    resolveCollisions(deltaTime, canvas) {
        let collisions = new SimpleCollisionDetectionStrategy().execute(this.#objects);

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

        this.#objects.forEach(physObj => {
            if (physObj.lifetime >= 0) {
                if (physObj.isInView(canvas)) {
                    physObj.draw(canvas);
                } else { physObj.transport(canvas) }

                if (!physObj.static && !physObj.followingMouse) {
                    // // v+1 = v + F/m * t
                    physObj.velocityX = physObj.velocityX + physObj.forceX / physObj.mass * seconds;
                    physObj.velocityY = physObj.velocityY + physObj.forceY / physObj.mass * seconds;

                    // // s+1 = s + vt
                    physObj.x = physObj.x + physObj.velocityX * seconds;
                    physObj.y = physObj.y + physObj.velocityY * seconds;

                    physObj.forceY = this.#properties.gravity * physObj.mass;
                    physObj.forceX = 0;
                }
            }

            physObj.lifetime += seconds;
        })

        this.resolveCollisions(seconds, canvas);
    }

    /**
     * Adds a physObj to the World.
     * 
     * @param {Body} physObj a Body object
     */
    add(physObj) {
        this.#objects.push(physObj);
    }

    /**
     * Removes a physObj from the World.
     * 
     * @param {Body} physObj a Body object
     */
    remove(physObj) {
        let index = this.#objects.indexOf(physObj);

        if (index < 0) { return; }
        this.#objects.splice(index, 1);
    }

    /**
     * Removes all objects in the World.
     */
    clear() {
        this.#objects.splice(0);
    }

    /**
     * Finds a physics object in the World.
     * @param {Vector2D} pos the point where a physics object can be found
     * @returns 
     */
    findObject(pos) {
        return this.#objects.find(obj => obj.lifetime >= 0 && obj.collider.testCollision(pos));
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

    saveState() {
        return {
            worldProperties: this.#properties,
            objects: this.#objects,
            solvers: this.#solvers
        }
    }

    restoreState() {

    }
}

export { World };