import * as createjs from 'createjs-module';
import { calculateCanvasSize } from "./calculateCanvasSize";


// TODO: put this in the style.scss, my guy
const borderStyle = '1px solid #000';

export function createStage(): createjs.Stage {
	const canvas = createCanvas();
	document.body.appendChild(canvas);

	return new createjs.Stage(canvas);
}

// TODO: resize on windowSizeChange event?
function createCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');

	const { size: [width, height], needsBorder } = calculateCanvasSize([window.innerWidth, window.innerHeight]);
	canvas.width = width;
	canvas.height = height;

	if (needsBorder)
		canvas.style.border = borderStyle;

	return canvas;
}
