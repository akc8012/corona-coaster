const easeljs = require('@createjs/easeljs');

let body = document.getElementById('body');
if (body !== null)
	console.log('my body is ready');

let stage = new easeljs.Stage('canvas');
var circle = new easeljs.Shape();

body.onload = function () {
	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.x = circle.y = 100;
	stage.addChild(circle);
}

easeljs.Ticker.addEventListener('tick', function () {
	circle.x += 10;
	if (circle.x > stage.canvas.width)
		circle.x = 0;

	stage.update();
});
