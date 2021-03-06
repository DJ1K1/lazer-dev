import UpdatePhysics from 'physics/arcade/system/PhysicsSystem.js'
import RectangleCollider from 'physics/arcade/collider/RectangleCollider.js'
import PolygonCollider from 'physics/arcade/collider/PolygonCollider.js'
import {
    Collide,
    Overlap,
    UpdateCollisions
} from 'physics/arcade/system/CollisionSystem.js'
import Body from 'physics/arcade/Body.js'
import Vec2 from 'math/vector/vec2/Vec2.js'
// Rendering
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import MainLoop from 'system/MainLoop.js';

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function drawPoly(ctx, pos, verticesX, verticesY) {
    if (verticesY.length > 2) {
        ctx.beginPath();
        ctx.moveTo(pos.x + verticesX[0], pos.y + verticesY[0]);
        for (var i = 1; i < verticesY.length; ++i) {
            ctx.lineTo(pos.x + verticesX[i], pos.y + verticesY[i]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#fff';
        for (var i = 0; i < verticesY.length; ++i) {
            ctx.fillRect(pos.x + verticesX[i] - 2, pos.y + verticesY[i] - 2, 4, 4);
        }
    }
}
export default class App {

    constructor() {
        let mouse = new Vec2(0, 0);
        let canvas = null;
        let ctx = null;
        let bodyA = null;
        let bodyB = null;

        canvas = Canvas(512, 512);
        AddToDOM(canvas, 'game');
        BackgroundColor(canvas, 'rgb(0, 0, 20)');
        ctx = canvas.getContext('2d');
        canvas.addEventListener('mousemove', function (evt) {
            mouse.x = evt.clientX - evt.target.offsetLeft;
            mouse.y = evt.clientY - evt.target.offsetTop;
        });
        ctx.strokeStyle = ctx.fillStyle = '#fff';
        bodyA = new Body(256, 450, new PolygonCollider([
            [-228, -50],
            [-228, -50 + 100],
            [-228 + 456, -50 + 100],
            [128, -90]
        ]));
        bodyB = new Body(256, 150, new RectangleCollider(0, 0, 25, 60));

        bodyA.acceleration.y = -0.05;
        bodyB.bounce.y = 1;
        bodyA.bounce.y = 0.5;
        bodyB.acceleration.y = 0.05;


        function begin() {
            ctx.clearRect(0, 0, 512, 512);
        }

        function BodiesCollided(a, b) {
            //console.log(a, b);
            //console.log('Collision detected');
            ctx.strokeStyle = ctx.fillStyle = '#ff0000';
        }

        function update() {
            ctx.strokeStyle = ctx.fillStyle = '#fff';
            UpdatePhysics(loop.physicsStep);
            Collide(bodyA, bodyB, BodiesCollided);

            // Run this after all collision request
            // have been done.
            UpdateCollisions();

            if (bodyA.position.y < 0) {
                bodyA.position.x = canvas.width / 2;
                bodyA.position.y = canvas.height;
                bodyA.velocity.x = 0;
                bodyA.velocity.y = 0;
            }
            if (bodyB.position.y > 512) {
                bodyB.position.x = canvas.width / 2;
                bodyB.position.y = -bodyB.collider.height;
                bodyB.velocity.x = 0;
                bodyB.velocity.y = 0;
            }
        }

        function draw() {
            drawPoly(ctx, bodyA.position, bodyA.collider.verticesX, bodyA.collider.verticesY);
            drawPoly(ctx, bodyB.position, bodyB.collider.verticesX, bodyB.collider.verticesY);
            ctx.fillText('fps: ' + loop.fps.toFixed(2), 16, 16);
        }


        let loop = new MainLoop(60);
        loop.begin = (t => begin(t));
        loop.update = (delta => update(delta));
        loop.draw = (t => draw(t));
        loop.start();
    }
}

new App();