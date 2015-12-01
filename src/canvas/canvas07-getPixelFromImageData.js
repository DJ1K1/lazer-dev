import Canvas from 'canvas/Canvas.js';
import GetContext from 'canvas/GetContext.js';
import BackgroundColor from 'canvas/BackgroundColor.js';
import AddToDOM from 'dom/AddToDOM.js';
import GetPixel from 'canvas/imagedata/GetPixel.js';
import Loader from 'loader/Loader.js';

export default class CanvasTest {

    constructor () {

        this.canvas = Canvas(320, 200);

        AddToDOM(this.canvas, 'game');

        this.loader = new Loader();

        this.loader.path = 'assets/';

        this.loader.image('agent-t-buggin-acf_logo').then((file) => this.loadComplete(file));

        this.loader.start();

    }

    loadComplete (file) {

        //  Draw the image

        const ctx = GetContext(this.canvas);

        ctx.drawImage(file.data, 0, 0);

        //  Get the ImageData
        const imageData = ctx.getImageData(0, 0, 320, 200);

        //  Get a pixel from the ImageData object
        const pixel = GetPixel(imageData, 113, 126);

        console.log(imageData);
        console.log(pixel);

        //  Now let's set the rgb value we got as the canvas background color
        const bgc = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${255 / pixel.a})`;

        BackgroundColor(this.canvas, bgc);

    }

}

new CanvasTest();
