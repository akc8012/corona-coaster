/// <reference path='./easel.d.ts' />
import 'easeljs';

import './assets/style.scss';
import { createStage } from './stage/createStage';
import { initTween } from './animation/tween';


let stage: any = undefined;
const text = new createjs.Text('I am the tweeeeeeeeener!! 🥳🥳🥳', '20px Arial', '#FFB6C1');

// TODO: resize on windowSizeChange event?
document.getElementById('body').onload = function () {
	stage = createStage();

	text.x = stage.canvas.width;
	text.y = 40;
	text.textBaseline = 'top';
	stage.addChild(text);

	initTween(stage);
	console.log('my body is ready');
}

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', function () {
	text.x -= 0.6;
	stage.update();
});
