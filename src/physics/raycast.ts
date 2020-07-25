import * as createjs from 'createjs-module';
import { Point, Rectangle } from 'createjs-module';

export type Ray = {
	// TODO: Should we use simpler custom types instead of EaselJS classes?
	origin: Point;
	direction: Point;
	maxDistance: number;
}

export type Hit = {
	point: Point;
	distance: number;
}

export type Colliders = Bounds[];

// TODO: This should be more dynamic - Could also be a Cirlce
export type Bounds = Rectangle;

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	for (const bounds of colliders) {
		return { point: new createjs.Point(1, 4), distance: 1 };
	}

	return null;
}
