import * as createjs from 'createjs-module';
import { Bounds } from '../physics/raycast';


export interface IPlayer {
	bounds: Bounds;
	update: () => void;
}

export class Player implements IPlayer {
	bounds = { x: 0, y: 0, width: 32, height: 32 };
	rectangle = new createjs.Shape();

	constructor(stage: createjs.Stage) {
		const bounds = this.bounds;
		this.rectangle.graphics.beginFill('Cyan').drawRect(
			bounds.x,
			bounds.y,
			bounds.width,
			bounds.height
		);

		stage.addChild(this.rectangle);
	}

	update() {
		this.bounds.x += 0.1;
		this.bounds.y += 0.05;

		this.rectangle.x = this.bounds.x;
		this.rectangle.y = this.bounds.y;
	}
}
