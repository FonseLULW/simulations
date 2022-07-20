import { Tool } from '../tool.js';
import { Vector2D } from '../../modules/vector2D.js';
import { getObject } from '../../modules/objectFactory.js';

const spawner = new Tool();

spawner.onPress = (canvas, e) => {
    spawner.startPosition = new Vector2D(e.clientX, e.clientY);
    spawner.startTimeS = canvas.frameCount * canvas.deltaTime / 1000;
}

spawner.onRelease = (canvas, e) => {
    let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;
    let mouseDeltaTimeS = Math.abs(endTimeS - spawner.startTimeS);

    let spawnVelocity = new Vector2D(
        (spawner.startPosition.x - e.clientX) * mouseDeltaTimeS,
        (spawner.startPosition.y - e.clientY) * mouseDeltaTimeS
    );

    let factory = getObject(spawner.placing, spawner.staticBody)

    console.log(spawner.startPosition, spawnVelocity, factory);
    canvas.spawn(spawner.startPosition, spawnVelocity, factory);

    spawner.startPosition = 0;
    spawner.startTimeS = 0;
}

export { spawner };