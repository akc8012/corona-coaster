import * as createjs from 'createjs-module';
import { Ray, raycast } from "./raycast";

test('zero colliders returns no hit', () => {
	const ray: Ray = {
		origin: new createjs.Point(2, 4),
		direction: new createjs.Point(0, 1),
		maxDistance: 3,
	};

	expect(raycast(ray, [])).toBeNull();
});

// test('ray intersection returns hit', () => {

// });
