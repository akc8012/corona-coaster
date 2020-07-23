import * as createjs from 'createjs-module';

import './assets/style.scss';
import { createStage } from './stage/createStage';
import { initTween } from './animation/tween';


let stage: createjs.Stage;

// TODO: resize on windowSizeChange event?
document.getElementById('body').onload = function () {
	stage = createStage();
	initTween(stage);

	stage.addChild(createText());
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

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', function () {
	stage.getChildByName('text').x -= 0.8;

	stage.update();
});
