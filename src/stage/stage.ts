import * as createjs from 'createjs-module';
import { calculateCanvasSize } from "./calculateCanvasSize";
import { createAnimations } from '~/animation/tween';
import { Size } from '~/physics/math';


export function createStage(): createjs.Stage {
	const canvas = createCanvas();
	document.body.appendChild(canvas);

	const stage = new createjs.Stage(canvas);
	for (const animation of createAnimations())
		stage.addChild(animation);

	return stage;
}

// TODO: resize on windowSizeChange event?
function createCanvas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas');

	const sizeInfo = calculateCanvasSize({
		width: window.innerWidth, height: window.innerHeight
	});

	canvas.width = sizeInfo.size.width;
	canvas.height = sizeInfo.size.height;
	canvas.style.backgroundColor = '#d5b9b2';

	// if (sizeInfo.needsBorder)
	// 	canvas.style.border = '1px solid #000';

	return canvas;
}

export function getStageSize(stage: createjs.Stage): Size {
	const canvas = stage.canvas as HTMLCanvasElement;
	return { width: canvas.width, height: canvas.height };
}
