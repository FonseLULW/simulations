import { AbstractObjectInstantiationError, PrivateConstructorError, UnimplementedAbstractMethodError } from './modules/errors.js';
import { World } from './modules/world.js';
import { Vector2D } from './modules/vector2D.js';

class CanvasManipulator {
    constructor() {
        if (this.constructor == CanvasManipulator) {
            throw new AbstractObjectInstantiationError();
        }
    }

    static getCanvasManipulator(name) {
        if (name == "SPAWN") { return Spawner.getInstance(); }
        if (name == "ERASE") { return Eraser.getInstance(); }
        // if (name == "CURSOR") { return Cursor.getInstance(); }
        return false;
    }

    onPress(canvas, e) { return false; }

    onRelease(canvas, e) { return false; }

    onDrag(canvas, e) { return false; }

    onClick(canvas, e) { return false; }
}

class Spawner extends CanvasManipulator {
    static _initializing = true;
    static _singleton = null;

    #startPosition;
    #startTimeS;
    
    constructor() {
        if (Spawner._initializing) {
            throw new PrivateConstructorError();
        }

        super();
        Spawner._singleton = this;
        Spawner._initializing = true;
    }

    static getInstance() {
        if (!Spawner._singleton) {
            Spawner._initializing = false;
            return new Spawner();
        }

        return Spawner._singleton;
    }

    onPress(canvas, e) {
        this.#startPosition = new Vector2D(e.clientX, e.clientY);
        this.#startTimeS = canvas.frameCount * canvas.deltaTime / 1000;
    }

    onRelease(canvas, e) {
        let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;;
        let mouseDeltaTimeS = Math.abs(endTimeS - this.#startTimeS);

        let spawnPosition = new Vector2D(
            (this.#startPosition.x - e.clientX) * mouseDeltaTimeS,
            (this.#startPosition.y - e.clientY) * mouseDeltaTimeS
        );

        canvas.spawn(spawnPosition);
    }
}

class Eraser extends CanvasManipulator {
    static _initializing = true;
    static _singleton = null;
    
    constructor() {
        if (Eraser._initializing) {
            throw new PrivateConstructorError();
        }

        super();
        Eraser._singleton = this;
        Eraser._initializing = true;
    }

    static getInstance() {
        if (!Eraser._singleton) {
            Eraser._initializing = false;
            return new Eraser();
        }

        return Eraser._singleton;
    }

    onDrag(canvas, e) {
        canvas.despawn(new Vector2D(e.clientX, e.clientY));
    }

    onClick(canvas, e) {
        canvas.despawn(new Vector2D(e.clientX, e.clientY));
    }
}

class Cursor extends CanvasManipulator {
    #initializing = true;
    
    constructor() {
        if (this.#initializing) {
            throw new PrivateConstructorError();
        }

        this.#initializing = true;
    }

    static getInstance() {
        if (!this.instance) {
            this.#initializing = false;
            return new Cursor();
        }

        return this.instance;
    }

    onPress(canvas, e) {
        throw new UnimplementedAbstractMethodError();
    }

    onRelease(canvas, e) {
        throw new UnimplementedAbstractMethodError();
    }

    onDrag(canvas, e) {
        throw new UnimplementedAbstractMethodError();
    }

    onClick(canvas, e) {
        throw new UnimplementedAbstractMethodError();
    }
}

export { CanvasManipulator };