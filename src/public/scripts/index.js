class Point {
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

class Body {
    #position;
    #color; // graphics
    #collider; // physics

    constructor(position, collider, color) {
        this.#position = position;
        this.#collider = collider;
        this.#color = color;
    }

    _createGraphic(canvas) {
        canvas.fill(this.#color);
        canvas.circle(this.#position.x, this.#position.y, 50);
    }

    draw(canvas) {
        this._createGraphic(canvas);
    }

    get position() {
        return this.#position;
    }

    set position(position) {
        this.#position = position;
    }
    
}

class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    constructor(position, velocity, force, mass, collider, color) {
        super(position, collider, color);
        this.#velocity = velocity;
        this.#force = force;
        this.#mass = mass;
    }

    #update() {

    }

    draw(canvas) {
        this._createGraphic(canvas);
        this.#update();
    }

    get velocity() {
        return this.#velocity;
    }

    get force() {
        return this.#force;
    }

    get mass() {
        return this.#mass;
    }

    set velocity(velocity) {
        this.#velocity = velocity;
    }

    set force(force) {
        this.#force = force;
    }
}

// class Body {
//     constructor(x, y, velX, velY, aX, aY) {
//         if (this.constructor == Body) {
//             throw new Error("Cannot instantiate Abstract Class Objects");
//         }

//         this.position = new Position(x, y);
//         this.dynamics = new Dynamics(velX, velY, aX, aY);
//     }

//     draw(canvas) {
//         throw new Error("Draw is not implemented");
//     }
// }

// class Circle extends Body {
//     #diameter;

//     constructor(x, y, velX, velY, aX, aY, diameter) {
//         super(x, y, velX, velY, aX, aY);
//         this.#diameter = diameter;

//         console.log(`Created circle at (${this.position.x}, ${this.position.y})
//         with v0 = (${this.dynamics.velX}, ${this.dynamics.velY})
//         with a = (${this.dynamics.accelerationX}, ${this.dynamics.accelerationY})`)
//     }

//     draw(canvas) {
//         canvas.fill(65, 223, 250);
//         canvas.circle(this.position.x, this.position.y, this.#diameter);

//         this.update(canvas.deltaTime)
//     }

//     update(deltaTimeMS) {
//         this.dynamics.update(deltaTimeMS);

//         // m = mp + px/s * ms / 1000
//         this.position.x += this.dynamics.velX * deltaTimeMS / 1000;
//         this.position.y += this.dynamics.velY * deltaTimeMS / 1000;
//     }
// }

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
        p.world.add(new Body(new Point(e.clientX, e.clientY), null, p.color(50, 55, 100)));
    };
});