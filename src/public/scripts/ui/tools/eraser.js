import { Tool } from '../tool.js';
import { Vector2D } from '../../modules/vector2D.js';

const eraser = new Tool();

eraser.onDrag = (canvas, e) => {
    canvas.despawn(new Vector2D(e.clientX, e.clientY));
}

eraser.onClick = (canvas, e) => {
    canvas.despawn(new Vector2D(e.clientX, e.clientY));
}

export { eraser };