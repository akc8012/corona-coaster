import { Rectangle } from 'createjs-module';


type Vector = [number, number];

export type Ray = {
	origin: Vector,
	maxDistance: number,
}

export type Hit = {
	point: Vector,
	distance: number,
}

export type Colliders = Bounds[];
export type Bounds = Rectangle;

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	for (const bounds of colliders) {
		const overflow = (ray.origin[1] + ray.maxDistance) - bounds.y;

		if (overflow >= 0) {
			return {
				point: [ray.origin[0], bounds.y],
				distance: ray.maxDistance - overflow,
			};
		}
	}

	return null;
}
