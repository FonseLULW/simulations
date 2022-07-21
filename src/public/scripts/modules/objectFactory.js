import { CircleCollider, SquareCollider } from './objects/colliders.js';
import { Circle, Square } from './objects/graphics.js';
import { Body, Rigidbody } from './objects/bodies.js';

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