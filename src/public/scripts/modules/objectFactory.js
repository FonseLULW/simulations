import { CircleCollider, SquareCollider } from './colliders.js';
import { Circle, Square } from './graphics.js';
import { Body, Rigidbody } from './bodies.js';

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
    }

    if (isStatic) {
        newObject.body = Body;
    } else {
        newObject.body = Rigidbody;
    }

    return newObject;
}

export { getObject };