const easeljs = require('@createjs/easeljs');
const tweenjs = require('@createjs/tweenjs');

import { createStage } from './stage/createStage';
import './assets/style.scss';
// TODO: VS Code shows an error even though *its fine*
import pow from './assets/sprites/pow.png';

let stage: any = undefined;
const text = new easeljs.Text('I am the tweeeeeeeeener!! 🥳🥳🥳', '20px Arial', '#FFB6C1');

// TODO: resize on windowSizeChange event?
document.getElementById('body').onload = function () {
	stage = createStage();

	let powBitmap = new easeljs.Bitmap(pow);
	powBitmap.scale = 0.5;
	powBitmap.x = -185;
	powBitmap.y = 100;
	stage.addChild(powBitmap);

	tweenjs.Tween.get(powBitmap, { loop: true })
		.to({ x: 235, alpha: 1 }, 1000, tweenjs.Ease.getPowInOut(4))
		.to({ y: 250 }, 500, tweenjs.Ease.getPowInOut(2))
		.to({ x: 0, alpha: 0 }, 800, tweenjs.Ease.getPowInOut(2));

	text.x = stage.canvas.width;
	text.y = 40;
	text.textBaseline = 'top';
	stage.addChild(text);

	tweenjs.Ticker.framerate = 60;
	tweenjs.Ticker.addEventListener("tick", stage);
	console.log('my body is ready');
}

easeljs.Ticker.framerate = 60;
easeljs.Ticker.addEventListener('tick', function () {
	text.x -= 0.6;
	stage.update();
});
