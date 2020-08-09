import { Vector } from "./math";


export type Ray = {
	origin: Vector,
	maxDistance: number,
}

export type Hit = {
	point: Vector,
	distance: number,
}

export type Region = Rectangle;

type Rectangle = {
	x: number,
	y: number,
	width: number,
	height: number,
}

export function raycast(ray: Ray, regions: Region[]): Hit | null {
	let closest: Hit | null = null;

	for (const region of regions.filter(region => ray.origin[1] < region.y)) {
		const verticalOverflow = (ray.origin[1] + ray.maxDistance) - region.y;
		const withinHorizontal = (ray.origin[0] >= region.x) && (ray.origin[0] <= region.x + region.width);

		if (verticalOverflow >= 0 && withinHorizontal) {
			closest = {
				point: [ray.origin[0], region.y],
				distance: ray.maxDistance - verticalOverflow,
			};
		}
	}

	return closest;
}
