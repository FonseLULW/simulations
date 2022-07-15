import { AbstractObjectInstantiationError, PrivateConstructorError } from './modules/errors.js';
import { Vector2D, collinear } from './modules/vector2D.js';

class CanvasManipulator {
    constructor() {
        if (this.constructor == CanvasManipulator) {
            throw new AbstractObjectInstantiationError();
        }
    }

    static getCanvasManipulator(name) {
        if (name == "SPAWN") { return Spawner.getInstance(); }
        if (name == "ERASE") { return Eraser.getInstance(); }
        if (name == "CURSOR") { return Cursor.getInstance(); }
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
        let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;
        let mouseDeltaTimeS = Math.abs(endTimeS - this.#startTimeS);

        let spawnVelocity = new Vector2D(
            (this.#startPosition.x - e.clientX) * mouseDeltaTimeS,
            (this.#startPosition.y - e.clientY) * mouseDeltaTimeS
        );

        console.log(this.#startPosition, spawnVelocity);
        canvas.spawn(this.#startPosition, spawnVelocity);

        this.#startPosition = 0;
        this.#startTimeS = 0;
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
    static _initializing = true;
    static _singleton = null;

    #selectedObject;

    #waypointA;
    #waypointB;
    #candidate;

    #startTimeS;
    
    constructor() {
        if (Cursor._initializing) {
            throw new PrivateConstructorError();
        }

        super();
        Cursor._singleton = this;
        Cursor._initializing = true;
    }

    static getInstance() {
        if (!Cursor._singleton) {
            Cursor._initializing = false;
            return new Cursor();
        }

        return Cursor._singleton;
    }

    onPress(canvas, e) {
        this.#selectedObject = canvas.world.findObject(new Vector2D(e.clientX, e.clientY));
        this.#startTimeS = canvas.frameCount * canvas.deltaTime / 1000;

        if (this.#selectedObject) {
            this.#selectedObject.followingMouse = true;
        }
    }

    onDrag(canvas, e) {
        this.#candidate = new Vector2D(e.clientX, e.clientY);

        if (!this.#waypointA) {
            this.#waypointA = this.#candidate;
        }
    
        if (!this.#waypointB && this.#candidate != this.#waypointA) {
            this.#waypointB = this.#candidate;
        }
    
        if (this.#waypointA && this.#waypointB) {
            if (!collinear(this.#waypointA, this.#waypointB, this.#candidate)) {
                this.#waypointA = this.#waypointB;
                this.#waypointB = this.#candidate;
            }
        }
    }

    onRelease(canvas, e) {
        let endTimeS = canvas.frameCount * canvas.deltaTime / 1000;
        let mouseDeltaTimeS = Math.abs(endTimeS - this.#startTimeS);

        if (this.#selectedObject && this.#candidate && this.#waypointA && this.#waypointB) {
            this.#selectedObject.followingMouse = false;

            this.#selectedObject.velocityX = (this.#candidate.x - this.#waypointA.x) * 20 / mouseDeltaTimeS;
            this.#selectedObject.velocityY = (this.#candidate.y - this.#waypointA.y) * 20 / mouseDeltaTimeS;
        }
    }
}

export { CanvasManipulator };