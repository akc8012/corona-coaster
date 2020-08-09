import * as createjs from 'createjs-module';

import { Region, raycast, Ray } from '../physics/physics';
import { Vector } from '../physics/math';
import { ITrack } from './Track';

import cart from '../assets/sprites/cart.png';


const GRAVITY = 2;
const JUMP_HEIGHT = 22;

export interface IPlayer {
	update: (track: ITrack) => void;
}

export class Player implements IPlayer {
	region: Region;
	vel: Vector = [0, 0];
	sprite = new createjs.Bitmap(cart);
	grounded = false;

	constructor(stage: createjs.Stage) {
		const canvas = stage.canvas as HTMLCanvasElement;

		const width = 32;
		this.region = {
			x: (canvas.width / 2) - (width / 2),
			y: 0,
			width,
			height: width
		};

		this.sprite.scaleX = this.region.width;
		this.sprite.scaleY = this.region.height;

		this.createJumpEvents(canvas);
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

		// TODO: get height from canvas
		if (this.region.y > 854)
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
				this.region.x + (this.region.width / 2),
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

		this.sprite.x = this.region.x;
		this.sprite.y = this.region.y;
	}
}
