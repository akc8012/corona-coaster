import * as createjs from 'createjs-module';

import { createStage } from '../stage/createStage';
import { addAnimation } from '../animation/tween';
import { Player, IPlayer } from './player';
import { Colliders } from '../physics/raycast';


export function createGame() {
	const stage = createStage();
	addAnimation(stage);

	const canvas = stage.canvas as HTMLCanvasElement;
	const [width, height] = getCanvasSize(canvas);

	const text = createText(width);
	stage.addChild(text);

	const track: Colliders = [
		{ x: 0, y: 0, width, height: 32 },
	];

	const player: IPlayer = new Player(stage);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		text.x -= 0.8;
		track[0].y += 0.6;
		player.update(track);

		stage.update();
	});
}

function getCanvasSize(canvas: HTMLCanvasElement): [number, number] {
	return [canvas.width, canvas.height];
}

function createText(canvasWidth: number): createjs.Text {
	const text = new createjs.Text('no longer looping the tween DEAL WITH IT', '20px Arial', '#FFB6C1');
	text.name = 'text';

	text.x = canvasWidth;
	text.y = 50;
	text.textBaseline = 'top';

	return text;
}
