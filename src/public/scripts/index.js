import { Vector2D } from './modules/vector2D.js';
import { Square, Circle } from './modules/graphics.js';
import { Body, Rigidbody } from './modules/bodies.js';
import { World } from './modules/world.js';

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
                new Square(new Vector2D(e.clientX, e.clientY), p.color(206, 100, 245), 35), null
                ))
        } else {
            let mass = 1000;
            p.world.add(new Rigidbody(
                new Circle(new Vector2D(e.clientX, e.clientY), p.color(104, 240, 237), 50),
                null,
                new Vector2D(533.4, -233.7),
                new Vector2D(400 * mass, 487 * mass), mass 
            ))

        }
    };
});