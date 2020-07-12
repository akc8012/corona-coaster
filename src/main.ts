const easeljs = require('@createjs/easeljs');

import { createStage } from './stage/createStage';
import './style.scss';


let stage: any = undefined;
const circle = new easeljs.Shape();
const text = new easeljs.Text('benny is the bomb 💣💣💣', '20px Arial', '#FFB6C1');

document.getElementById('body').onload = function () {
	stage = createStage();

	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.y = 300;
	stage.addChild(circle);

	text.x = stage.canvas.width;
	text.y = 40;
	text.textBaseline = 'top';
	stage.addChild(text);

	stage.addChild(createIntroVideo());
	console.log('my body is ready');
}

function createIntroVideo(): any {
	const video = document.getElementById('introVideo');
	const videoBitmap = new easeljs.Bitmap(video);
	videoBitmap.x = -188;
	videoBitmap.scaleX = 1.186;
	videoBitmap.scaleY = 1.78;

	return videoBitmap;
}

easeljs.Ticker.framerate = 60;
easeljs.Ticker.addEventListener('tick', function () {
	text.x -= 0.5;

	circle.x += 5;
	if (circle.x > stage.canvas.width)
		circle.x = 0;

	stage.update();
});
