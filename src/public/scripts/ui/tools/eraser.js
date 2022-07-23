/**
 * An eraser Tool.
 * 
 * @author FonseLULW
 */

import { Tool } from './tool.js';
import { Vector2D } from '../../modules/objects/vector2D.js';

const eraser = new Tool();

/**
 * Runs when the mouse is being dragged.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
eraser.onDrag = (canvas, e) => {
    canvas.despawn(new Vector2D(e.clientX, e.clientY));
}

/**
 * Runs when the mouse is pressed then released.
 * 
 * @param {P5} canvas a P5 object
 * @param {Event} e an Event 
 */
eraser.onClick = (canvas, e) => {
    canvas.despawn(new Vector2D(e.clientX, e.clientY));
}

export { eraser };