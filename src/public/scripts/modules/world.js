class World {
    constructor() {
        this.objects = new Set();
    }

    draw(canvas) {
        canvas.background(247, 245, 246);

        this.objects.forEach((physObj) => {
            physObj.draw(canvas);


            if (physObj.isDynamic()) {
                // v+1 = v + F/m * t
                physObj.velocityX = physObj.velocityX + physObj.forceX / physObj.mass * canvas.deltaTime / 1000;
                physObj.velocityY = physObj.velocityY + physObj.forceY / physObj.mass * canvas.deltaTime / 1000;

                // s+1 = s + vt
                physObj.x = physObj.x + physObj.velocityX * canvas.deltaTime / 1000;
                physObj.y = physObj.y + physObj.velocityY * canvas.deltaTime / 1000
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