import { Bounds } from '../physics/raycast';


export interface IPlayer {
	bounds: Bounds;
}

export class Player implements IPlayer {
	bounds: Bounds = { x: 0, y: 0, width: 32, height: 32 };
}
