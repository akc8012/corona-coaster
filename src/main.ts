const easeljs = require('@createjs/easeljs');

let body = document.getElementById('body');
if (body !== null)
	console.log('my body is ready');

let stage = new easeljs.Stage('canvas');
let circle = new easeljs.Shape();
let text = new easeljs.Text('Tristan did the CoronaVirus!', '20px Arial', '#0000ff');

body.onload = function () {
	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.x = circle.y = 100;
	stage.addChild(circle);

	text.x = stage.canvas.width;
	text.textBaseline = 'top';
	stage.addChild(text);
}

easeljs.Ticker.addEventListener('tick', function () {
	circle.x += 10;
	if (circle.x > stage.canvas.width)
		circle.x = 0;

	text.x -= 1;

	stage.update();
});
