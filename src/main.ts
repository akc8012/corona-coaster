const easeljs = require('@createjs/easeljs');

let body = document.getElementById('body');
if (body !== null)
	console.log('my body is ready');

body.onload = function () {
	let stage = new easeljs.Stage('canvas');

	var circle = new easeljs.Shape();
	circle.graphics.beginFill('Cyan').drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle);

	stage.update();
}
