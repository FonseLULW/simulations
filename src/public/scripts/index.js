class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }
}

class Dynamics {
    #velX;
    #velY;
    #accelerationX;
    #accelerationY;

    constructor(velX, velY, accelerationX, accelerationY) {
        this.#velX = velX;
        this.#velY = velY;
        this.#accelerationX = accelerationX;
        this.#accelerationY = accelerationY;
    }

    get velX() {
        return this.#velX;
    }

    get velY() {
        return this.#velY;
    }

    get accelerationX() {
        return this.#accelerationX;
    }
    
    get accelerationY() {
        return this.#accelerationY;
    }

    set velX(velX) {
        this.#velX = velX;
    }

    set velY(velY) {
        this.#velY = velY;
    }

    set accelerationX(accelerationX) {
        this.#accelerationX = accelerationX;
    }
    
    set accelerationY(accelerationY) {
        this.#accelerationY = accelerationY;
    }

    update(deltaTimeMS) {
        // px/s = px/s + px/s^2 * ms / 1000
        this.velX += this.accelerationX * deltaTimeMS / 1000;
        this.velY += this.accelerationY * deltaTimeMS / 1000;
    }
}

class Velocity {
    #x;
    #y;

    constructor(velX, velY) {
        this.#x = velX;
        this.#y = velY;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }
}

class Acceleration {
    #x;
    #y;

    constructor(aX, aY) {
        this.#x = aX;
        this.#y = aY;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(x) {
        this.#x = x;
    }

    set y(y) {
        this.#y = y;
    }
}

class AbstractPhysicsObject {
    constructor(x, y, velX, velY, aX, aY) {
        if (this.constructor == AbstractPhysicsObject) {
            throw new Error("Cannot instantiate Abstract Class Objects");
        }

        this.position = new Position(x, y);
        this.dynamics = new Dynamics(velX, velY, aX, aY);
    }

    draw(canvas) {
        throw new Error("Draw is not implemented");
    }
}

class Circle extends AbstractPhysicsObject {
    #diameter;

    constructor(x, y, velX, velY, aX, aY, diameter) {
        super(x, y, velX, velY, aX, aY);
        this.#diameter = diameter;

        console.log(`Created circle at (${this.position.x}, ${this.position.y})
        with v0 = (${this.dynamics.velX}, ${this.dynamics.velY})
        with a = (${this.dynamics.accelerationX}, ${this.dynamics.accelerationY})`)
    }

    draw(canvas) {
        canvas.fill(65, 223, 250);
        canvas.circle(this.position.x, this.position.y, this.#diameter);

        this.update(canvas.deltaTime)
    }

    update(deltaTimeMS) {
        this.dynamics.update(deltaTimeMS);

        // m = mp + px/s * ms / 1000
        this.position.x += this.dynamics.velX * deltaTimeMS / 1000;
        this.position.y += this.dynamics.velY * deltaTimeMS / 1000;
    }
}

class World {
    constructor() {
        this.objects = new Set();
    }

    draw(canvas) {
        canvas.background(247, 245, 246);

        this.objects.forEach((physObj) => {
            physObj.draw(canvas);
        })
    }

    add(physObj) {
        this.objects.add(physObj);
    }

    remove(physObj) {
        this.objects.remove(physObj);
    }
}

let simulation = new p5((p) => {
    p.world = new World();
    p.t = 0;

    p.setup = () => {
        p.frameRate(60);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.print("Created canvas: Width = ", p.width, " ; Height = ", p.height)
    };

    p.draw = () => {
        p.world.draw(p);
    };

    p.mouseClicked = (e) => {
        p.world.add(new Circle(e.clientX, e.clientY, 500, -700, 0, 415, 50.4));
    };
});