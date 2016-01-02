import { PALETTE_ARNE } from 'create/palettes/Arne16.js';
import RenderToCanvas from 'create/RenderToCanvas.js';
import Canvas from 'canvas/Canvas.js';
import AddToDOM from 'dom/AddToDOM.js';
import BackgroundColor from 'canvas/BackgroundColor.js';

export default class CanvasGraphics {

    constructor () {

        var data = [
            '...55.......',
            '.....5......',
            '...7888887..',
            '..788888887.',
            '..888088808.',
            '..888886666.',
            '..8888644444',
            '..8888645555',
            '888888644444',
            '88788776555.',
            '78788788876.',
            '56655677776.',
            '456777777654',
            '.4........4.'
        ];

        let canvas = RenderToCanvas(data, null, PALETTE_ARNE, 16, 16);

        AddToDOM(canvas, 'game');

    }

}

new CanvasGraphics();
