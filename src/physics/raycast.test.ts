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

test('ray with short maxDistance returns no hit', () => {
	const ray: Ray = {
		origin: [-1.5, 1],
		maxDistance: 0.5,
	};

	const bounds = new createjs.Rectangle(-3, 2, 4, 2);

	expect(raycast(ray, [bounds])).toBeNull();
});


// TODO: ray intersection returns hit from several colliders
