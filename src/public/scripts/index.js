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
        p.startMousePos = new Vector2D(e.clientX, e.clientY);
        p.startMouseTimeS = p.frameCount * p.deltaTime / 1000;
        console.log(p.frameCount, p.deltaTime / 1000);
    }

    p.mouseReleased = (e) => {
        if (!p.allowPlacing || !p.placing) {
            return;
        }
        console.log(p.frameCount, p.deltaTime / 1000);
        
        let endMouseTimeS = p.frameCount * p.deltaTime / 1000;
        let t = Math.abs(endMouseTimeS - p.startMouseTimeS);

        let velocity = new Vector2D((p.startMousePos.x - e.clientX) * t, (p.startMousePos.y - e.clientY) * t);
        console.log(`Time: ${endMouseTimeS} - ${p.startMouseTimeS} = ${t}`);
        console.log(`START: (${p.startMousePos.x}, ${p.startMousePos.y})   END: (${e.clientX}, ${e.clientY})`);
        console.log(`VEL: ${velocity}`);

        let mass = 1000;
        let size = 50;

        let shape;
        let collider;
        if (e.button == 0) {
            switch (p.placing) {
                case 'circle':
                    shape = new Circle(p.startMousePos, p.color(104, 240, 237), size);
                    collider = new CircleCollider(p.startMousePos, size);
                    break;
                case 'square':
                    shape = new Square(p.startMousePos, p.color(104, 240, 237), size);
                    collider = new SquareCollider(p.startMousePos, size);
                    break;
                case 'default':
                    return false;
            }

            p.world.add(new Rigidbody(
                shape, collider, velocity, new Vector2D(0 * mass, 0 * mass), mass 
            ));
        }
    };
});

document.querySelectorAll(".interface").forEach(elem => {
    elem.addEventListener("mouseout", () => {
        simulation.allowPlacing = true;
        elem.classList.remove("show");
    })

    elem.addEventListener("mouseover", () => {
        simulation.allowPlacing = false;
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
            simulation.placing = 'circle';
            break;
        case "square":
            simulation.placing = 'square';
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