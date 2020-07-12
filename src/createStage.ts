const easeljs = require('@createjs/easeljs');


export function createStage() {
	const canvas = createCanvas();
	document.body.appendChild(canvas);
	return new easeljs.Stage(canvas);
}

function createCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');

	const { size: [width, height], needsBorder } = calculateCanvasSize([window.innerWidth, window.innerHeight]);
	canvas.width = width;
	canvas.height = height;

	if (needsBorder)
		// TODO: Do I *really* need to define border *here*? :(
		canvas.style.border = '1px solid #000';

	return canvas;
}

function calculateCanvasSize(windowSize: number[]): { size: number[], needsBorder: boolean } {
	let [width, height] = windowSize;
	console.log(width, height);

	let needsBorder = false;
	if (width >= 500) {
		width = 480;
		height = 854;
		needsBorder = true;
	}

	return { size: [width, height], needsBorder };
}
