import * as createjs from 'createjs-module';
import pow from '../assets/sprites/pow.png';


export function initTween(stage: any) {
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", stage);

	addAnimation(stage);
}

function addAnimation(stage: any) {
	const powBitmap = new createjs.Bitmap(pow);
	powBitmap.scaleX = 0.5;
	powBitmap.scaleY = 0.5;
	powBitmap.x = -185;
	powBitmap.y = 100;
	stage.addChild(powBitmap);

	createjs.Tween.get(powBitmap, { loop: true })
		.to({ x: 235, alpha: 1 }, 1000, createjs.Ease.getPowInOut(4))
		.to({ y: 250 }, 500, createjs.Ease.getPowInOut(2))
		.to({ x: 0, alpha: 0 }, 800, createjs.Ease.getPowInOut(2));
}
