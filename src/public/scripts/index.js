import { Vector2D } from './modules/vector2D.js';
import { Square, Circle } from './modules/graphics.js';
import { CircleCollider, SquareCollider } from './modules/colliders.js';
import { Body, Rigidbody } from './modules/bodies.js';
import { World } from './modules/world.js';
import { SimpleSolver } from './modules/solvers.js';

let simulation = new p5((p) => {
    p.world = new World();

    p.setup = () => {
        p.frameRate(60);
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.world.addSolver(new SimpleSolver());
        p.print("Created canvas: Width = ", p.width, " ; Height = ", p.height)
    };

    p.draw = () => {
        p.world.draw(p);
    };

    p.mousePressed = (e) => {
        if (!p.allowPlacement) {
            return;
        }

        let pos = new Vector2D(e.clientX, e.clientY);
        if (e.button == 1) {
            let side = 35;
            p.world.add(new Body(
                new Circle(pos, p.color(206, 100, 245), side),
                new CircleCollider(pos, side)
                ))
        } else {
            let mass = 1000;
            let diameter = 50;
            p.world.add(new Rigidbody(
                new Circle(pos, p.color(104, 240, 237), diameter),
                new CircleCollider(pos, diameter),
                new Vector2D(533.4, -233.7),
                new Vector2D(400 * mass, 487 * mass), mass 
            ))

        }
    };
});

document.querySelectorAll(".interface").forEach(elem => {
    elem.addEventListener("mouseout", () => {
        simulation.allowPlacement = true;
        elem.classList.remove("show");
    })

    elem.addEventListener("mouseover", () => {
        simulation.allowPlacement = false;
        elem.classList.add("show");
    })
});

function closeSubs(except) {
    document.querySelectorAll(".sub").forEach(elem => {
        if (elem != except) {
            elem.classList.remove("show");
            elem.style.display = "none";
        }        
    })
}

function handleMainToolClick(button, event) {
    let selectedToolbar;
    switch (button.id) {
        case "cursor":
            closeSubs()
            break;
        case "shapes":
            selectedToolbar = document.querySelector("#objectSelect");
            closeSubs(selectedToolbar)
            selectedToolbar.style.display = "block";
            selectedToolbar.classList.add("show");
            break;
        case "eraser":
            closeSubs()
            break;
        case "settings":
            closeSubs()
            break;
        case "gallery":
            closeSubs()
            break;
        default:
            console.log("DEFAULT");
    }
}

function handleShapeToolClick(button, event) {
    switch (button.id) {
        case "circle":
            simulation.allowPlacement = true;
            break;
        default:
            console.log("DEFAULT");
    }
}

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (button.classList.contains("main-btn")) {
            handleMainToolClick(button, e);
        } else if (button.classList.contains("shapes-btn")) {
            handleShapeToolClick(button, e);
        }
       
    })
})