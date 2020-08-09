import * as createjs from 'createjs-module';

import { Region } from '~/physics/physics';
import { ITrackPiece } from './Track';
import cart from '../assets/sprites/cart.png';


export class TrackPiece implements ITrackPiece {
	region: Region;
	sprite: createjs.Bitmap;

	constructor(stage: createjs.Stage, region: Region) {
		this.region = region;

		this.sprite = new createjs.Bitmap(cart);
		// TODO: Tint the sprite for debug purposes
		this.sprite.x = region.x;
		this.sprite.y = region.y;
		this.sprite.scaleX = region.width;
		this.sprite.scaleY = region.height;

		stage.addChild(this.sprite);
	}

	update() {
		const speed = 3;
		this.region.x -= speed;

		this.updatePosition();
	}

	// TODO: Extract this to component
	updatePosition() {
		this.sprite.x = this.region.x;
		this.sprite.y = this.region.y;
	}
}
