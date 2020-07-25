import * as mathjs from 'mathjs';
import { Rectangle } from 'createjs-module';

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
	for (const bounds of colliders) {
		const endPoint = mathjs.add(ray.origin, ray.maxDistance) as Vector;

		if (bounds.contains(endPoint[0], endPoint[1])) {
			const overflow: number = endPoint[1] - bounds.y;

			return {
				point: [ray.origin[0], bounds.y],
				distance: ray.maxDistance - overflow
			};
		}
	}

	return null;
}
