import { Region } from '~/physics/physics';
import { getStageSize } from '~/stage/stage';
import { TrackPiece } from './TrackPiece';


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

	constructor(stage: createjs.Stage) {
		this.pieces = this.createPieces(stage);
	}

	createPieces(stage: createjs.Stage): ITrackPiece[] {
		const stageSize = getStageSize(stage);

		const region = {
			x: 0,
			y: stageSize.height - 32,
			width: stageSize.width,
			height: 32
		};

		const piece: ITrackPiece = new TrackPiece(stage, region);
		return [piece];
	}

	getRegions(): Region[] {
		return this.pieces.map(p => p.region);
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
