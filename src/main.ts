import './style.scss';
const easeljs = require('@createjs/easeljs');

let body = document.getElementById('body');

let stage: any = null;
let circle = new easeljs.Shape();
let text = new easeljs.Text('benny is the bomb 💣💣💣', '20px Arial', '#FFB6C1');

body.onload = function () {
	console.log('my body is ready');

	let canvas = document.body.appendChild(createCanvas());
	stage = new easeljs.Stage(canvas);

	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.y = 300;
	stage.addChild(circle);

	text.x = stage.canvas.width;
	text.y = 40;
	text.textBaseline = 'top';
	stage.addChild(text);
}

function createCanvas(): HTMLCanvasElement {
	let canvas = document.createElement('canvas');

	let width = window.innerWidth;
	let height = window.innerHeight;

	if (width >= 500) {
		width = 480;
		height = 854;
		// TODO: Do I *really* need to define border *here*? :(
		canvas.style.border = '1px solid #000';
	}

	canvas.width = width;
	canvas.height = height;

	return canvas;
}

easeljs.Ticker.framerate = 60;
easeljs.Ticker.addEventListener('tick', function () {
	text.x -= 0.5;

	circle.x += 5;
	if (circle.x > stage.canvas.width)
		circle.x = 0;

	stage.update();
});
