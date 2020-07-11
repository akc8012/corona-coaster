const easeljs = require('@createjs/easeljs');

let body = document.getElementById('body');
if (body !== null)
	console.log('my body is ready');

body.onload = function () {
	let stage = new easeljs.Stage('canvas');
	console.log(stage);
}
