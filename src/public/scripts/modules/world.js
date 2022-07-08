import { Vector2D } from './vector2D.js';

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

export { World };