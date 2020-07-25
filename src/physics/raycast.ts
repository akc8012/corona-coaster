import { Point, Rectangle } from 'createjs-module';

export type Ray = {
	origin: Point;
	direction: Point;
	maxDistance: number;
}

type Hit = {
	point: Point;
	distance: Point;
}

type Colliders = Bounds[];

// TODO: This should be more dynamic - Could also be a Cirlce
type Bounds = Rectangle;

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	return null;
	// return {
	// 	point: new createjs.Point(2, 4),
	// 	distance: new createjs.Point(0, 100)
	// };
}
