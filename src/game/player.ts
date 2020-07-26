import * as createjs from 'createjs-module';
import { Bounds } from '../physics/raycast';
import cart from '../assets/sprites/cart.png';


export interface IPlayer {
	bounds: Bounds;
	update: () => void;
}

export class Player implements IPlayer {
	bounds = { x: 0, y: 0, width: 32, height: 32 };
	sprite = new createjs.Bitmap(cart);

	constructor(stage: createjs.Stage) {
		this.sprite.scaleX = this.bounds.width;
		this.sprite.scaleY = this.bounds.height;
		this.sprite.rotation = 22;

		stage.addChild(this.sprite);
	}

	update() {
		this.bounds.x += 0.1;
		this.bounds.y += 0.05;

		this.sprite.x = this.bounds.x;
		this.sprite.y = this.bounds.y;
	}
}
