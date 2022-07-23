/**
 * A spawner Tool.
 * 
 * @author FonseLULW
 */

import { Tool } from './tool.js';
import { Vector2D } from '../../modules/objects/vector2D.js';
import { getObject } from '../../modules/objectFactory.js';

const spawner = new Tool();

/**
 * Runs when the mouse is pressed down.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
spawner.onPress = (canvas, e) => {
    spawner.startPosition = new Vector2D(e.clientX, e.clientY);
    spawner.startTimeS = canvas.frameCount * canvas.deltaTime / 1000;
}

/**
 * Runs when the mouse is released.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
spawner.onRelease = (canvas, e) => {
    let factory = getObject(spawner.placing, spawner.staticBody)
    if (!factory) { return; }

    let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;
    let mouseDeltaTimeS = Math.abs(endTimeS - spawner.startTimeS);

    let spawnVelocity = new Vector2D(
        (spawner.startPosition.x - e.clientX) * mouseDeltaTimeS,
        (spawner.startPosition.y - e.clientY) * mouseDeltaTimeS
    );

    canvas.spawn(spawner.startPosition, spawnVelocity, factory);

    spawner.startPosition = 0;
    spawner.startTimeS = 0;
}

export { spawner };