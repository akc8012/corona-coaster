import { Bounds } from '~/physics/raycast';


export interface ITrackPiece {
	bounds: Bounds;
	update: () => void;
}

export interface ITrack {
	update: () => void;
	getPieces: () => ITrackPiece[];
}

export class Track implements ITrack {
	pieces: ITrackPiece[];

	constructor(pieces: ITrackPiece[]) {
		this.pieces = pieces;
	}

	getPieces(): ITrackPiece[] {
		return this.pieces;
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
