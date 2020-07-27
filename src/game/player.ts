import * as createjs from 'createjs-module';
import { Bounds, Colliders, Vector, raycast, Ray } from '../physics/raycast';
import cart from '../assets/sprites/cart.png';


export interface IPlayer {
	update: (track: Colliders) => void;
}

const GRAVITY = 2;
const JUMP_HEIGHT = 20;

export class Player implements IPlayer {
	bounds: Bounds;
	vel: Vector = [0, 0];
	sprite = new createjs.Bitmap(cart);
	grounded: boolean = false;

	constructor(stage: createjs.Stage) {
		const canvas = stage.canvas as HTMLCanvasElement;

		this.bounds = {
			x: (canvas.width / 2) - 16,
			y: 0,
			width: 32,
			height: 32
		};

		this.sprite.scaleX = this.bounds.width;
		this.sprite.scaleY = this.bounds.height;

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

	update(track: Colliders) {
		this.vel[1] += GRAVITY;
		this.grounded = false;

		const ray: Ray = {
			origin: [this.bounds.x + (this.bounds.width / 2), this.bounds.y + (this.bounds.height / 2)],
			maxDistance: (this.bounds.height / 2) + this.vel[1],
		};

		const hit = raycast(ray, track);
		if (hit !== null) {
			this.vel[1] = 0;
			this.bounds.y = hit.point[1] - this.bounds.height;
			this.grounded = true;
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
