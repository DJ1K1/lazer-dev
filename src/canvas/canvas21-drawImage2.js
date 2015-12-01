import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import AddToDOM from 'dom/AddToDOM.js';
import Fill from 'canvas/graphics/Fill.js';
import DrawImage from 'canvas/DrawImage.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(800, 600);

        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('mushroom2').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        const ctx = GetContext(this.canvas);

        Fill(ctx, 120, 0, 120);

        //  Draw the image at 400x300
        // DrawImage(ctx, file.data, { x: 400, y: 300 });

        //  Draw the image at 400x300 centered (anchor 0.5)
        DrawImage(ctx, file.data, { x: 400, y: 300, anchorX: 0.5, anchorY: 0.5 });

    }

}

new CanvasTest();
