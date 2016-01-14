import Config from 'config/Config.js';
import Parent from 'config/settings/Parent.js';
import GameTitle from 'config/settings/GameTitle.js';
import Game from 'game/nano/Game.js';

let config = Config(
    Parent('game'),
    GameTitle('BobVaders')
);

let game = new Game(config);
