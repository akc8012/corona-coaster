import * as createjs from 'createjs-module';

import './assets/style.scss';
import { createStage } from './stage/createStage';
import { addAnimation } from './animation/tween';
import { Player, IPlayer } from './game/player';


document.getElementById('body')!.onload = function () {
	const stage = createStage();
	addAnimation(stage);

	const text = createText((stage.canvas as HTMLCanvasElement).width);
	stage.addChild(text);

	const player = new Player();
	console.log(player.bounds);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		text.x -= 0.8;
		stage.update();
	});
}

function createText(canvasWidth: number): createjs.Text {
	const text = new createjs.Text('no longer looping the tween DEAL WITH IT', '20px Arial', '#FFB6C1');
	text.name = 'text';

	text.x = canvasWidth;
	text.y = 50;
	text.textBaseline = 'top';

	return text;
}
