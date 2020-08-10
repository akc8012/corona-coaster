import * as createjs from 'createjs-module';

import { Region } from '~/physics/physics';
import { getStageSize } from '~/stage/stage';
import { Size, Vector } from '~/physics/math';

import minecartTrackDouble from '../assets/sprites/minecartTrackDouble.png';


const SPEED = 4;

export interface ITrackPiece {
	region: Region;
	update: () => void;
}

export class TrackPiece implements ITrackPiece {
	region: Region;
	sprite: createjs.Bitmap;
	stageSize: Size;
	speedModifier: number;

	constructor(stage: createjs.Stage, position: Vector, speedModifier: number) {
		this.speedModifier = speedModifier;

		this.region = {
			x: position[0],
			y: position[1],
			width: 68,
			height: 15
		};

		this.stageSize = getStageSize(stage);

		this.sprite = new createjs.Bitmap(minecartTrackDouble);
		this.sprite.x = this.region.x;
		this.sprite.y = this.region.y;

		stage.addChild(this.sprite);
	}

	update() {
		this.region.x -= (SPEED + this.speedModifier);

		this.loopAroundScreen();
		this.updatePosition();
	}

	loopAroundScreen() {
		if (this.region.x + this.region.width < 0)
			this.region.x = this.stageSize.width;
	}

	// TODO: Extract this to component
	updatePosition() {
		this.sprite.x = this.region.x;
		this.sprite.y = this.region.y;
	}
}
