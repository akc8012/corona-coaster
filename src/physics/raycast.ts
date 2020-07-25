import * as createjs from 'createjs-module';
import * as mathjs from 'mathjs';
import { Rectangle } from 'createjs-module';

// direction is always down. will this ever change? no clue.
const DIRECTION = [0, 1];

type Vector = [number, number];

export type Ray = {
	origin: Vector;
	maxDistance: number;
}

export type Hit = {
	point: Vector;
	distance: number;
}

export type Colliders = Bounds[];
export type Bounds = Rectangle;

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	const distance = mathjs.multiply(DIRECTION, ray.maxDistance);

	for (const bounds of colliders) {
		const overflow = mathjs.subtract(mathjs.add(ray.origin, distance), [bounds.x, bounds.y]) as Vector;

		if (overflow[1] >= 0) {
			return {
				point: [ray.origin[0], bounds.y],
				distance: (mathjs.subtract(distance, overflow) as Vector)[1],
			};
		}
	}

	return null;
}
