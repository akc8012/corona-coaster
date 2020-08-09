import * as createjs from 'createjs-module';

import { Region, raycast, Ray } from '../physics/physics';
import { Vector } from '../physics/math';
import { ITrack } from './Track';

import cart from '../assets/sprites/cart.png';


export interface IPlayer {
	update: (track: ITrack) => void;
}

const GRAVITY = 2;
const JUMP_HEIGHT = 20;

export class Player implements IPlayer {
	region: Region;
	vel: Vector = [0, 0];
	sprite = new createjs.Bitmap(cart);
	grounded: boolean = false;

	constructor(stage: createjs.Stage) {
		const canvas = stage.canvas as HTMLCanvasElement;

		this.region = {
			x: (canvas.width / 2) - 16,
			y: 0,
			width: 32,
			height: 32
		};

		this.sprite.scaleX = this.region.width;
		this.sprite.scaleY = this.region.height;

		stage.addChild(this.sprite);

		canvas.addEventListener('touchstart', () => this.jump());
		canvas.addEventListener('mousedown', () => this.jump());
		document.getElementById('body')!.addEventListener('keydown', (event) => {
			const keys = ['Space', 'ArrowUp', 'KeyW'];
			if (keys.includes(event.code))
				this.jump()
		});
	}

	jump() {
		if (this.grounded) {
			this.vel[1] -= JUMP_HEIGHT;
			this.grounded = false;
		}
	}

	update(track: ITrack) {
		this.vel[1] += GRAVITY;
		this.grounded = false;

		const ray: Ray = {
			origin: [
				this.region.x + (this.region.width / 2),
				this.region.y + (this.region.height / 2)
			],
			maxDistance: (this.region.height / 2) + this.vel[1],
		};

		const hit = raycast(ray, track.getRegions());
		if (hit !== null) {
			this.vel[1] = 0;
			this.region.y = hit.point[1] - this.region.height;
			this.grounded = true;
		}

		this.updatePosition();
	}

	updatePosition() {
		this.region.x += this.vel[0];
		this.region.y += this.vel[1];

		this.sprite.x = this.region.x;
		this.sprite.y = this.region.y;
	}
}
