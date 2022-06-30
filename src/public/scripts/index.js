let sketch = p => {
    p.DEFAULT_FRAMERATE = 60;
    p.bg = [255, 204, 0];

    p.setup = () => {
        p.frameRate(p.DEFAULT_FRAMERATE);
        p.createCanvas(500, 500);
        p.background(p.bg[0], p.bg[1], p.bg[2]);
    }

    p.draw = () => {
        p.background(p.bg[0], p.bg[1], p.bg[2]);
        p.rect(p.frameCount, 100, 50, 50);
    }

    p.changeBackground = (r, g, b) => {
        console.log("CHANGE")
        p.bg = [r, g, b];
    }

    p.mousePressed = () => {
        console.log("PRESS")

        if (p.bg[0] == 51) {
            p.changeBackground(255, 204, 0);
        } else {
            p.changeBackground(51, 51, 255);
        }
    }

    
}

let myCanvas = new p5(sketch);