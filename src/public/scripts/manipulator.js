import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from './modules/errors.js';
import { World } from './modules/world.js';
import { Vector2D } from './modules/vector2D.js';

class CanvasManipulator {
    constructor() {
        if (this.constructor == CanvasManipulator) {
            throw new AbstractObjectInstantiationError();
        }
    }

    static getCanvasManipulator(name) {
        // if (name == "SPAWN") { return Spawner.getInstance(); }
        if (name == "ERASE") { return Eraser.getInstance(); }
        // if (name == "CURSOR") { return Cursor.getInstance(); }
        
        return false;
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

class Spawner extends CanvasManipulator {
    #initializing = true;
    
    constructor() {
        if (this.#initializing) {
            throw new Error("DO NOT USE CONSTRUCTOR DIRECTLY");
        }

        this.#initializing = true;
    }

    static getInstance() {
        if (!this.instance) {
            this.#initializing = false;
            return new Spawner();
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

class Eraser extends CanvasManipulator {
    static _initializing = true;
    static _singleton = null;
    
    constructor() {
        if (Eraser._initializing) {
            throw new Error("DO NOT USE CONSTRUCTOR DIRECTLY");
        }

        super();
        Eraser._singleton = this;
        Eraser._initializing = true;
        Eraser.count++;
    }

    static getInstance() {
        if (!Eraser._singleton) {
            Eraser._initializing = false;
            return new Eraser();
        }

        return Eraser._singleton;
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
        canvas.despawn(new Vector2D(e.clientX, e.clientY));
    }
}

class Cursor extends CanvasManipulator {
    #initializing = true;
    
    constructor() {
        if (this.#initializing) {
            throw new Error("DO NOT USE CONSTRUCTOR DIRECTLY");
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