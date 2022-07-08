class Vector2D {
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

    toString() {
        return `Vector2D(${this.#x}, ${this.#y})`
    }
}

class Graphic {
    #position;

    constructor(position) {
        if (this.constructor === Graphic) {
            throw new Error("Cannot instantiate an Abstract class");
        }

        this.#position = position;
    }

    render(canvas) {
        throw new Error("This methods has not been implemented");
    }

    get position() {
        return this.#position;
    }

    set position(position) {
        this.#position = position;
    }
}

class Circle extends Graphic {
    #diameter;

    constructor(position, diameter) {
        super(position);

        this.#diameter = diameter;
    }

    render(canvas) {
        canvas.circle(super.position.x, super.position.y, this.#diameter);
    }
}

class Square extends Graphic {
    #side;

    constructor(position, side) {
        super(position);

        this.#side = side;
    }

    render(canvas) {
        canvas.square(super.position.x, super.position.y, this.#side);
    }
}

class Body {
    #position;
    #color; // graphics
    #collider; // physics
    #graphic;

    constructor(position, collider, color, graphic) {
        this.#position = position;
        this.#collider = collider;
        this.#color = color;
        this.#graphic = graphic;
    }

    _createGraphic(canvas) {
        canvas.fill(this.#color);
        // canvas.circle(this.#position.x, this.#position.y, 50);
        this.#graphic.position = new Vector2D(this.#position.x, this.#position.y);
        this.#graphic.render(canvas);
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

    get color() {
        return this.#color;
    }

    get collider() {
        return this.#collider;
    }

    isDynamic() {
        return false;
    }

    toString() {
        return `Body
        Position: ${this.#position}
        Color: ${this.#color}
        Collider: ${this.#collider}`;
    }
    
}

class Rigidbody extends Body {
    #velocity;
    #force;
    #mass;

    constructor(position, velocity, force, mass, collider, color, graphic) {
        super(position, collider, color, graphic);
        this.#velocity = velocity;
        this.#force = force;
        this.#mass = mass;
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

    isDynamic() {
        return true;
    }

    toString() {
        return `Rigidbody
        Position: ${this.position}
        Color: ${this.color}
        Collider: ${this.collider}
        Velocity: ${this.velocity}
        Force: ${this.force}
        Mass: ${this.mass}`;
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


            if (physObj.isDynamic()) {
                physObj.velocity = new Vector2D(
                    physObj.velocity.x + physObj.force.x / physObj.mass * canvas.deltaTime / 1000,
                    physObj.velocity.y + physObj.force.y / physObj.mass * canvas.deltaTime / 1000
                )

                physObj.position = new Vector2D(
                    physObj.position.x + physObj.velocity.x * canvas.deltaTime / 1000,
                    physObj.position.y + physObj.velocity.y * canvas.deltaTime / 1000
                )
            }
        })
    }

    add(physObj) {
        this.objects.add(physObj);
        console.log(`Created ${physObj}`)
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

    p.mousePressed = (e) => {
        if (e.button == 1) {
            p.world.add(new Body(
                new Vector2D(e.clientX, e.clientY), null, p.color(206, 100, 245),
                new Square(new Vector2D(e.clientX, e.clientY), 35)))
        } else {
            mass = 1000;
            p.world.add(new Rigidbody(
                new Vector2D(e.clientX, e.clientY),
                new Vector2D(533.4, -233.7),
                new Vector2D(400 * mass, 487 * mass),
                mass, null, p.color(104, 240, 237), new Circle(new Vector2D(e.clientX, e.clientY), 50)
            ))
        }
    };
});