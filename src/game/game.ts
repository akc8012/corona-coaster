import * as createjs from 'createjs-module';

import { createStage } from '../stage/createStage';
import { addAnimation } from '../animation/tween';
import { Player, IPlayer } from './player';


export function createGame() {
	const stage = createStage();
	addAnimation(stage);

	const text = createText((stage.canvas as HTMLCanvasElement).width);
	stage.addChild(text);

	const player: IPlayer = new Player(stage);
	player.bounds.x = 20;
	console.log(player.bounds);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		text.x -= 0.8;
		player.update();

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
