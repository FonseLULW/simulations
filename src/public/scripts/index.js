class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Velocity {
    constructor(velX, velY) {
        this.x = velX;
        this.y = velY;
    }
}

class Acceleration {
    constructor(aX, aY) {
        this.x = aX;
        this.y = aY;
    }
}

class AbstractPhysicsObject {
    constructor(x, y, velX, velY, aX, aY) {
        if (this.constructor == AbstractPhysicsObject) {
            throw new Error("Cannot instantiate Abstract Class Objects");
        }

        this.position = new Position(x, y);
        this.velocity = new Velocity(velX, velY);
        this.acceleration = new Acceleration(aX, aY);
    }

    draw(canvas) {
        throw new Error("Draw is not implemented");
    }
}

class Circle extends AbstractPhysicsObject {
    constructor(x, y, velX, velY, aX, aY, diameter) {
        super(x, y, velX, velY, aX, aY);
        this.diameter = diameter;

        console.log(`Created circle at (${this.position.x}, ${this.position.y})
        with v0 = (${this.velocity.x}, ${this.velocity.y})
        with a = (${this.acceleration.x}, ${this.acceleration.y})`)
    }

    draw(canvas) {
        canvas.fill(65, 223, 250);
        canvas.circle(this.position.x, this.position.y, this.diameter);

        // px/s = px/s + px/s^2 * ms / 1000
        this.velocity.x = this.velocity.x + this.acceleration.x * canvas.deltaTime / 1000;
        this.velocity.y = this.velocity.y + this.acceleration.y * canvas.deltaTime / 1000;

        // m = mp + px/s * ms / 1000
        this.position.x = this.position.x + this.velocity.x * canvas.deltaTime / 1000;
        this.position.y = this.position.y + this.velocity.y * canvas.deltaTime / 1000;
    }
}

class World {
    constructor() {
        this.objects = new Set();

        this.t = 0;
    }

    draw(canvas) {
        canvas.background(247, 245, 246);

        this.objects.forEach((physObj) => {
            physObj.draw(canvas);
        })

        this.t += canvas.deltaTime
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
        p.world.add(new Circle(e.clientX, e.clientY, 500, -700, 0, 415, 50));
    };
});