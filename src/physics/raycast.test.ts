import * as createjs from 'createjs-module';
import { Ray, raycast, Hit } from "./raycast";

test('zero colliders returns no hit', () => {
	const ray: Ray = {
		origin: new createjs.Point(2, 4),
		direction: new createjs.Point(0, 1),
		maxDistance: 3,
	};

	expect(raycast(ray, [])).toBeNull();
});

test('ray intersection returns hit', () => {
	const ray: Ray = {
		origin: new createjs.Point(1, 3),
		direction: new createjs.Point(0, 1),
		maxDistance: 3,
	};

	const bounds = new createjs.Rectangle(-2, 4, 6, 4);
	const expectedHit: Hit = { point: new createjs.Point(1, 4), distance: 1 };

	expect(raycast(ray, [bounds])).toStrictEqual(expectedHit);
});
