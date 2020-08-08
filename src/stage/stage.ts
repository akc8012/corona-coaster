import * as createjs from 'createjs-module';
import { calculateCanvasSize } from "./calculateCanvasSize";
import { addAnimation } from '~/animation/tween';


export function createStage(): createjs.Stage {
	const canvas = createCanvas();
	document.body.appendChild(canvas);

	const stage = new createjs.Stage(canvas);
	addAnimation(stage);

	return stage;
}

// TODO: resize on windowSizeChange event?
function createCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');

	const { size: [width, height], needsBorder } = calculateCanvasSize([window.innerWidth, window.innerHeight]);
	canvas.width = width;
	canvas.height = height;

	if (needsBorder)
		canvas.style.border = '1px solid #000';

	return canvas;
}

export function getCanvasSize(canvas: HTMLCanvasElement): [number, number] {
	return [canvas.width, canvas.height];
}
