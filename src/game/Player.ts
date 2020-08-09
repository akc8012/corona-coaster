import * as createjs from 'createjs-module';

import { Region, raycast, Ray } from '../physics/physics';
import { Vector, Size } from '../physics/math';
import { ITrack } from './Track';
import { getStageSize } from '~/stage/stage';

import minecartDude from '../assets/sprites/MinecartDude.png';


const GRAVITY = 2;
const JUMP_HEIGHT = 22;

const DRAW_REGION = false;

const REGION_SIZE = [55, 32];
const SPRITE_OFFSET = [-5, -30];
const SPRITE_SCALE = 0.5;

export interface IPlayer {
	update: (track: ITrack) => void;
}

export class Player implements IPlayer {
	// TODO: regions should be able to draw themselves?
	region: Region;
	regionRect: createjs.Shape;

	vel: Vector;
	sprite: createjs.Bitmap;
	grounded: boolean;
	stageSize: Size;

	constructor(stage: createjs.Stage) {
		this.vel = [0, 0];

		const canvas = stage.canvas as HTMLCanvasElement;
		this.createJumpEvents(canvas);
		this.stageSize = getStageSize(stage);

		this.region = {
			x: (canvas.width / 2) - (REGION_SIZE[0] / 2),
			y: 0,
			width: REGION_SIZE[0],
			height: REGION_SIZE[1]
		};

		this.regionRect = new createjs.Shape();
		this.regionRect.graphics.beginFill('DeepSkyBlue').drawRect(
			0, 0, this.region.width, this.region.height
		);

		if (DRAW_REGION)
			stage.addChild(this.regionRect);

		this.sprite = new createjs.Bitmap(minecartDude);
		this.sprite.scaleX = this.sprite.scaleY = SPRITE_SCALE;
		stage.addChild(this.sprite);
	}

	createJumpEvents(canvas: HTMLCanvasElement) {
		canvas.addEventListener('touchstart', () => this.jump());
		canvas.addEventListener('mousedown', () => this.jump());

		document.getElementById('body')!.addEventListener('keydown',
			(event) => this.handleJumpEvent(event)
		);
	}

	handleJumpEvent(event: KeyboardEvent) {
		const keys = ['Space', 'ArrowUp', 'KeyW'];

		if (keys.includes(event.code))
			this.jump();
	}

	jump() {
		if (this.grounded) {
			this.vel[1] -= JUMP_HEIGHT;
			this.grounded = false;
		}
	}

	update(track: ITrack) {
		this.fall();
		this.raycast(track);
		this.updatePosition();
	}

	fall() {
		this.vel[1] += GRAVITY;
		this.grounded = false;

		if (this.region.y > this.stageSize.height)
			this.spawnAtCeiling();
	}

	spawnAtCeiling() {
		this.region.y = -this.region.height;
		this.vel[1] = 0;
	}

	raycast(track: ITrack) {
		for (const ray of this.createRays()) {
			const hit = raycast(ray, track.getRegions());

			if (hit !== null) {
				this.vel[1] = 0;
				this.region.y = hit.point[1] - this.region.height;
				this.grounded = true;
			}
		}
	}

	createRays(): Ray[] {
		return [{
			origin: [
				this.region.x,
				this.region.y + (this.region.height / 2)
			],
			maxDistance: (this.region.height / 2) + this.vel[1],
		}, {
			origin: [
				this.region.x + this.region.width,
				this.region.y + (this.region.height / 2)
			],
			maxDistance: (this.region.height / 2) + this.vel[1],
		}];
	}

	updatePosition() {
		this.region.x += this.vel[0];
		this.region.y += this.vel[1];

		this.regionRect.x = this.region.x;
		this.regionRect.y = this.region.y;

		this.sprite.x = this.region.x + SPRITE_OFFSET[0];
		this.sprite.y = this.region.y + SPRITE_OFFSET[1];
	}
}
