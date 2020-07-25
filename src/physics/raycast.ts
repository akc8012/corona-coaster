import * as createjs from 'createjs-module';
import { Rectangle } from 'createjs-module';

export type Ray = {
	origin: [number, number];
	maxDistance: number;
}

export type Hit = {
	point: [number, number];
	distance: number;
}

export type Colliders = Bounds[];
export type Bounds = Rectangle;

// direction is always down. will this ever change? no clue.
const DIRECTION = new createjs.Point(0, 1);

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	for (const bounds of colliders) {
		return { point: [1, 4], distance: 1 };
	}

	return null;
}
