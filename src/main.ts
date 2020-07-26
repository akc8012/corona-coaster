import * as createjs from 'createjs-module';

import './assets/style.scss';
import { createStage } from './stage/createStage';
import { addAnimation } from './animation/tween';
import { Player, IPlayer } from './game/player';


let stage: createjs.Stage;

// TODO: resize on windowSizeChange event?
document.getElementById('body')!.onload = function () {
	stage = createStage();

	addAnimation(stage);
	stage.addChild(createText());

	const player = createPlayer();
	console.log(player.bounds);

	console.log('my body is ready');
}

function createText(): createjs.Text {
	const text = new createjs.Text('no longer looping the tween DEAL WITH IT', '20px Arial', '#FFB6C1');
	text.name = 'text';

	text.x = (stage.canvas as HTMLCanvasElement).width;
	text.y = 50;
	text.textBaseline = 'top';

	return text;
}

function createPlayer(): IPlayer {
	const player = new Player();
	return player;
}

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', function () {
	stage.getChildByName('text').x -= 0.8;

	stage.update();
});
