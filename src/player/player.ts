import { Bounds } from '../physics/raycast';

interface Player {
	bounds: Bounds;
}

export function Player() {
	this.bounds = { x: 0, y: 0, width: 32, height: 32 };
}
