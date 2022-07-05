class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class AbstractPhysicsObject {
    constructor(x, y) {
        if (this.constructor == AbstractPhysicsObject) {
            throw new Error("Cannot instantiate Abstract Class Objects");
        }

        this.position = new Position(x, y);
    }

    draw(canvas) {
        throw new Error("Draw is not implemented");
    }
}

class Circle extends AbstractPhysicsObject {
    constructor(x, y, diameter) {
        super(x, y);
        this.diameter = diameter;
    }

    draw(canvas) {
        canvas.fill(65, 223, 250);
        canvas.circle(this.position.x, this.position.y, this.diameter);
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

    p.setup = () => {
        p.frameRate(60);
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.world.draw(p);
    };

    p.mouseClicked = () => {
        p.world.add(new Circle(p.random(0, p.windowWidth), p.random(0, p.windowHeight), 35));
    };
});