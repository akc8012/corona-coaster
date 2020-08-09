import { Ray, raycast, Hit } from './physics';


test('zero colliders returns no hit', () => {
	const ray: Ray = { origin: [2, 4], maxDistance: 3 };

	expect(raycast(ray, [])).toBeNull();
});

test('ray with short maxDistance returns no hit', () => {
	const ray: Ray = { origin: [-1.5, 1], maxDistance: 0.5 };
	const bounds = { x: -3, y: 2, width: 4, height: 2 };

	expect(raycast(ray, [bounds])).toBeNull();
});

test('ray outside x range returns no hit', () => {
	const ray: Ray = { origin: [-30, 0], maxDistance: 3 };
	const bounds = { x: -4, y: 1, width: 10, height: 10 };

	expect(raycast(ray, [bounds])).toBeNull();
});

test('ray intersection returns hit', () => {
	const ray: Ray = { origin: [1, 3], maxDistance: 3 };

	const bounds = { x: -2, y: 4, width: 6, height: 4 };
	const expectedHit: Hit = { point: [1, 4], distance: 1 };

	expect(raycast(ray, [bounds])).toStrictEqual(expectedHit);
});

test('ray intersection returns hit past collider bounds', () => {
	const ray: Ray = { origin: [0, 0], maxDistance: 5 };

	const bounds = { x: -4, y: 1, width: 8, height: 1 };
	const expectedHit: Hit = { point: [0, 1], distance: 1 };

	expect(raycast(ray, [bounds])).toStrictEqual(expectedHit);
});

test('ray intersection returns closest hit from several colliders', () => {
	const ray: Ray = { origin: [0, 0], maxDistance: 5 };

	const colliders = [
		{ x: -4, y: 2, width: 8, height: 1 },
		{ x: -4, y: 1, width: 8, height: 1 },
	];
	const expectedHit: Hit = { point: [0, 1], distance: 1 };

	expect(raycast(ray, colliders)).toStrictEqual(expectedHit);
});
