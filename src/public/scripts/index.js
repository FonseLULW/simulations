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

class AbstractPhysicsObject {
    constructor(x, y, velX, velY) {
        if (this.constructor == AbstractPhysicsObject) {
            throw new Error("Cannot instantiate Abstract Class Objects");
        }

        this.position = new Position(x, y);
        this.velocity = new Velocity(velX, velY);
    }

    draw(canvas) {
        throw new Error("Draw is not implemented");
    }
}

class Circle extends AbstractPhysicsObject {
    constructor(x, y, velX, velY, diameter) {
        super(x, y, velX, velY);
        this.diameter = diameter;

        console.log(`Created circle at (${this.position.x}, ${this.position.y})
        \nwith v0 = (${this.velocity.x}, ${this.velocity.y})`)
    }

    draw(canvas) {
        canvas.fill(65, 223, 250);
        canvas.circle(this.position.x, this.position.y, this.diameter);

        // px/s = px/s + px/s^2 * ms / 1000
        this.velocity.x = this.velocity.x + 0 * canvas.deltaTime / 1000;
        this.velocity.y = this.velocity.y + 415 * canvas.deltaTime / 1000;

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

            if (this.t >= 10000) {
                console.log(`Position: (${physObj.position.x}, ${physObj.position.y})
                \nVelocity: (${physObj.velocity.x}, ${physObj.velocity.y})
                \nAcceleration: (0, 9.87), at 10s`)
                this.t = 0;
            }
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
        p.world.add(new Circle(e.clientX, e.clientY, 500, -700, 50));
    };
});