/**
 * A function that acts as a factory.
 * 
 * @author FonseLULW
 */

import { CircleCollider, SquareCollider } from './objects/colliders.js';
import { Circle, Square } from './objects/graphics.js';
import { Body, Rigidbody } from './objects/bodies.js';

/**
 * Configures the Body to spawn in the World.
 * 
 * @param {String} shape a String of [circle, square] 
 * @param {boolean} isStatic a bool specifying if the Body should not be a Rigidbody
 * @returns an Object with attributes graphic, collider, and body
 */
function getObject(shape, isStatic) {
    let newObject;
    if (shape == "circle") {
        newObject = {
            'graphic': Circle,
            'collider': CircleCollider
        }
    } else if (shape == "square") {
        newObject = {
            'graphic': Square,
            'collider': SquareCollider
        }
    } else {
        return false;
    }

    if (isStatic) {
        newObject.body = Body;
    } else {
        newObject.body = Rigidbody;
    }

    return newObject;
}

export { getObject };