import * as createjs from 'createjs-module';

import { Bounds } from "~/physics/raycast";
import cart from '../assets/sprites/cart.png';


export interface ITrackPiece {
	update: () => void;
}

export class TrackPiece implements ITrackPiece {
	bounds: Bounds;
	sprite = new createjs.Bitmap(cart);

	constructor(bounds: Bounds, stage: createjs.Stage) {
		this.bounds = bounds;

		this.sprite.x = bounds.x;
		this.sprite.y = bounds.y;
		this.sprite.scaleX = bounds.width;
		this.sprite.scaleY = bounds.height;
		stage.addChild(this.sprite);
	}

	update() {

	}
}
