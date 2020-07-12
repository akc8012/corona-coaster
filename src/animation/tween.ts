// TODO: VS Code shows an error even though *its fine*
import pow from '../assets/sprites/pow.png';

const easeljs = require('@createjs/easeljs');
const tweenjs = require('@createjs/tweenjs');


export function initTween(stage: any) {
	tweenjs.Ticker.framerate = 60;
	tweenjs.Ticker.addEventListener("tick", stage);

	addAnimation(stage);
}

function addAnimation(stage: any) {
	let powBitmap = new easeljs.Bitmap(pow);
	powBitmap.scale = 0.5;
	powBitmap.x = -185;
	powBitmap.y = 100;
	stage.addChild(powBitmap);

	tweenjs.Tween.get(powBitmap, { loop: true })
		.to({ x: 235, alpha: 1 }, 1000, tweenjs.Ease.getPowInOut(4))
		.to({ y: 250 }, 500, tweenjs.Ease.getPowInOut(2))
		.to({ x: 0, alpha: 0 }, 800, tweenjs.Ease.getPowInOut(2));
}
