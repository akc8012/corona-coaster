export type Vector = [number, number];

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

type Rectangle = {
	x: number,
	y: number,
	width: number,
	height: number,
}

export function raycast(ray: Ray, colliders: Colliders): Hit | null {
	let closest: Hit | null = null;

	for (const bounds of colliders) {
		if (closest !== null && bounds.y >= closest.point[1])
			continue;

		const verticalOverflow: number = (ray.origin[1] + ray.maxDistance) - bounds.y;
		const withinHorizontal: boolean = (ray.origin[0] >= bounds.x) && (ray.origin[0] <= bounds.x + bounds.width);

		if (verticalOverflow >= 0 && withinHorizontal) {
			closest = {
				point: [ray.origin[0], bounds.y],
				distance: ray.maxDistance - verticalOverflow,
			};
		}
	}

	return closest;
}
