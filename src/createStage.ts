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
		canvas.style.border = '1px solid #000';

	return canvas;
}

function calculateCanvasSize(windowSize: number[]): { size: number[], needsBorder: boolean } {
	if (isMobileScreen(windowSize[0]))
		return { size: [480, 854], needsBorder: true };

	return { size: windowSize, needsBorder: false };
}

function isMobileScreen(width: number): boolean {
	return width >= 500;
}
