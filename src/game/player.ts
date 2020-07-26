import * as createjs from 'createjs-module';
import { Bounds, Colliders, Vector, raycast, Ray } from '../physics/raycast';
import cart from '../assets/sprites/cart.png';


export interface IPlayer {
	bounds: Bounds;
	update: (track: Colliders) => void;
}

const GRAVITY = 2;

export class Player implements IPlayer {
	bounds: Bounds;
	vel: Vector = [0, 0];
	sprite = new createjs.Bitmap(cart);

	constructor(stage: createjs.Stage) {
		this.bounds = {
			x: ((stage.canvas as HTMLCanvasElement).width / 2) - 16,
			y: 0,
			width: 32,
			height: 32
		};

		this.sprite.scaleX = this.bounds.width;
		this.sprite.scaleY = this.bounds.height;

		stage.addChild(this.sprite);
	}

	update(track: Colliders) {
		this.vel[1] += GRAVITY;

		const ray: Ray = {
			origin: [this.bounds.x + (this.bounds.width / 2), this.bounds.y + (this.bounds.height / 2)],
			maxDistance: (this.bounds.height / 2) + this.vel[1],
		};

		const hit = raycast(ray, track);
		if (hit !== null) {
			this.vel[1] = 0;
			this.bounds.y = hit.point[1] - this.bounds.height;
		}

		this.updatePosition();
	}

	updatePosition() {
		this.bounds.x += this.vel[0];
		this.bounds.y += this.vel[1];

		this.sprite.x = this.bounds.x;
		this.sprite.y = this.bounds.y;
	}
}
