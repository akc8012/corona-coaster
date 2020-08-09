import { Region } from '~/physics/physics';


export interface ITrackPiece {
	region: Region;
	update: () => void;
}

export interface ITrack {
	update: () => void;
	getRegions: () => Region[];
}

export class Track implements ITrack {
	pieces: ITrackPiece[];

	constructor(pieces: ITrackPiece[]) {
		this.pieces = pieces;
	}

	getRegions(): Region[] {
		return this.pieces.map(p => p.region);
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
