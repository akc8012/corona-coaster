import { Bounds } from '~/physics/raycast';


export interface ITrackPiece {
	bounds: Bounds;
	update: () => void;
}

export interface ITrack {
	update: () => void;
	getColliders: () => Bounds[];
}

export class Track implements ITrack {
	pieces: ITrackPiece[];

	constructor(pieces: ITrackPiece[]) {
		this.pieces = pieces;
	}

	getColliders(): Bounds[] {
		return this.pieces.map(p => p.bounds);
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
