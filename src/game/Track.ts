import { Region } from '~/physics/physics';
import { getStageSize } from '~/stage/stage';
import { TrackPiece } from './TrackPiece';
import { random } from 'mathjs';


const NUMBER_OF_PIECES = 8;

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

		let pieces: ITrackPiece[] = [];
		for (let i = 0; i < NUMBER_OF_PIECES; i++) {
			const region = {
				x: random(0, stageSize.width),
				y: random(stageSize.height / 2, stageSize.height),
				width: 128,
				height: 8
			};

			pieces.push(new TrackPiece(stage, region));
		}

		return pieces;
	}

	getRegions(): Region[] {
		return this.pieces.map(p => p.region);
	}

	update() {
		for (const piece of this.pieces)
			piece.update();
	}
}
