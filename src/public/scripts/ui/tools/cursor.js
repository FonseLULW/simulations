/**
 * A cursor Tool.
 * 
 * @author FonseLULW
 */

import { Tool } from './tool.js';
import { Vector2D, collinear } from '../../modules/objects/vector2D.js';

const cursor = new Tool();

/**
 * Runs when the mouse is pressed down.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
cursor.onPress = (canvas, e) => {
    cursor.selectedObject = canvas.world.findObject(new Vector2D(e.clientX, e.clientY));
    cursor.startTimeS = canvas.frameCount * canvas.deltaTime / 1000;

    if (cursor.selectedObject) {
        cursor.selectedObject.followingMouse = true;
    }
}

/**
 * Runs when the mouse is being dragged.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
cursor.onDrag = (canvas, e) => {
    cursor.candidate = new Vector2D(e.clientX, e.clientY);

    if (!cursor.waypointA) {
        cursor.waypointA = cursor.candidate;
    }

    if (!cursor.waypointB && cursor.candidate != cursor.waypointA) {
        cursor.waypointB = cursor.candidate;
    }

    if (cursor.waypointA && cursor.waypointB) {
        if (!collinear(cursor.waypointA, cursor.waypointB, cursor.candidate)) {
            cursor.waypointA = cursor.waypointB;
            cursor.waypointB = cursor.candidate;
        }
    }
}

/**
 * Runs when the mouse is released.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
cursor.onRelease = (canvas, e) => {
    let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;
    let mouseDeltaTimeS = Math.abs(endTimeS - cursor.startTimeS);

    if (cursor.selectedObject && cursor.candidate && cursor.waypointA && cursor.waypointB) {
        cursor.selectedObject.followingMouse = false;

        cursor.selectedObject.velocityX = (cursor.candidate.x - cursor.waypointA.x) * 20 / mouseDeltaTimeS;
        cursor.selectedObject.velocityY = (cursor.candidate.y - cursor.waypointA.y) * 20 / mouseDeltaTimeS;
    }
}

export { cursor };