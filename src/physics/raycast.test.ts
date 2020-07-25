import * as createjs from 'createjs-module';
import { Ray, raycast, Hit } from './raycast';

test('zero colliders returns no hit', () => {
	const ray: Ray = {
		origin: [2, 4],
		maxDistance: 3,
	};

	expect(raycast(ray, [])).toBeNull();
});

test('ray intersection returns hit', () => {
	const ray: Ray = {
		origin: [1, 3],
		maxDistance: 3,
	};

	const bounds = new createjs.Rectangle(-2, 4, 6, 4);
	const expectedHit: Hit = { point: [1, 4], distance: 1 };

	expect(raycast(ray, [bounds])).toStrictEqual(expectedHit);
});
