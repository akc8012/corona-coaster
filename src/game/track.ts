import * as createjs from 'createjs-module';

import { Bounds } from '~/physics/raycast';
import cart from '../assets/sprites/cart.png';


export interface ITrackPiece {
	bounds: Bounds;
	update: () => void;
}

export class TrackPiece implements ITrackPiece {
	bounds: Bounds;
	sprite: createjs.Bitmap;

	constructor(stage: createjs.Stage, bounds: Bounds) {
		this.bounds = bounds;

		this.sprite = new createjs.Bitmap(cart);
		// TODO: Tint the sprite for debug purposes
		this.sprite.x = bounds.x;
		this.sprite.y = bounds.y;
		this.sprite.scaleX = bounds.width;
		this.sprite.scaleY = bounds.height;

		stage.addChild(this.sprite);
	}

	update() {
		this.updatePosition();
	}

	// TODO: Extract this to component
	updatePosition() {
		this.sprite.x = this.bounds.x;
		this.sprite.y = this.bounds.y;
	}
}

export interface ITrack {
	update: () => void;
	getPieces: () => ITrackPiece[];
}

export class Track implements ITrack {
	pieces: ITrackPiece[];

	constructor(pieces: ITrackPiece[]) {
		this.pieces = pieces;
	}

	getPieces(): ITrackPiece[] {
		return this.pieces;
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
