// SAT modules
import CircleToPointTest from 'sat/collision/point/CircleToPointTest.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
    // Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 0.2;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 2, y - 2, 4, 4);
}

export default class CricleToPointGraphics {

    constructor() {

        let offset = new Vec2();
        let canvas;
        let ctx;
        let radius = 40;
        let circle2Pos = new Vec2(256, 256);

        offset.set(0, 0);;

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            offset.x = evt.clientX - evt.target.offsetLeft;
            offset.y = evt.clientY - evt.target.offsetTop;
        });
        canvas.style.cursor = 'none';

        function loop() {
            requestAnimationFrame(loop);
            ctx.clearRect(0, 0, 512, 512);
            ctx.fillStyle = '#00ff00';
            ctx.strokeStyle = '#00ff00';
            // *** This is what really matters. ***
            if (CircleToPointTest(offset, circle2Pos, radius)) {
                ctx.fillStyle = '#ff0000';
                ctx.strokeStyle = '#ff0000';
            }
            drawCircle(ctx, circle2Pos.x, circle2Pos.y, radius);
            ctx.fillStyle = '#fff';
            ctx.fillRect(offset.x, offset.y, 1, 1);
        }
        loop();
    }
}

new CricleToPointGraphics();