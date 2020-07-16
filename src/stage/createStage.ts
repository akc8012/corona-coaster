import * as createjs from '@createjs/easeljs';
import { calculateCanvasSize } from "./calculateCanvasSize";


const borderStyle = '1px solid #000';

export function createStage() {
	const canvas = createCanvas();
	document.body.appendChild(canvas);
	return new createjs.Stage(canvas);
}

function createCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');

	const { size: [width, height], needsBorder } = calculateCanvasSize([window.innerWidth, window.innerHeight]);
	canvas.width = width;
	canvas.height = height;

	if (needsBorder)
		canvas.style.border = borderStyle;

	return canvas;
}
