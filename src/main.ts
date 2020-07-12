const easeljs = require('@createjs/easeljs');
const tweenjs = require('@createjs/tweenjs');

import { createStage } from './stage/createStage';
import './style.scss';


let stage: any = undefined;
const circle = new easeljs.Shape();
const text = new easeljs.Text('I am the tweeeeeeeeener!! 🥳🥳🥳', '20px Arial', '#FFB6C1');

// TODO: resize on windowSizeChange event?
document.getElementById('body').onload = function () {
	stage = createStage();

	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.y = 100;
	stage.addChild(circle);

	tweenjs.Tween.get(circle, { loop: true })
		.to({ x: 400, alpha: 1 }, 1000, tweenjs.Ease.getPowInOut(4))
		.to({ y: 250 }, 500, tweenjs.Ease.getPowInOut(2))
		.to({ x: 100, alpha: 0 }, 800, tweenjs.Ease.getPowInOut(2));

	tweenjs.Ticker.framerate = 60;
	tweenjs.Ticker.addEventListener("tick", stage);

	text.x = stage.canvas.width;
	text.y = 40;
	text.textBaseline = 'top';
	stage.addChild(text);

	console.log('my body is ready');
}

easeljs.Ticker.framerate = 60;
easeljs.Ticker.addEventListener('tick', function () {
	text.x -= 0.6;

	circle.x += 5;
	if (circle.x > stage.canvas.width)
		circle.x = 0;

	stage.update();
});
