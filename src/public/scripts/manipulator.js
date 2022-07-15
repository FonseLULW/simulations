import { AbstractObjectInstantiationError, UnimplementedAbstractMethodError } from './modules/errors.js';

class CanvasManipulator {
    constructor() {
        throw new AbstractObjectInstantiationError();
    }

    static getCanvasManipulator(name) {
        if (name == "SPAWNER") { return Spawner.getInstance(); }
        if (name == "ERASER") { return Eraser.getInstance(); }
        if (name == "CURSOR") { return Cursor.getInstance(); }

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
            return new Eraser();
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