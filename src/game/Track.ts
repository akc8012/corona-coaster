import { Region } from '~/physics/physics';
import { getStageSize } from '~/stage/stage';
import { TrackPiece, ITrackPiece } from './TrackPiece';
import { Vector } from '~/physics/math';
import { random } from 'mathjs';


const NUMBER_OF_PIECES = 5;

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
			let position: Vector = [
				random(0, stageSize.width),
				random(stageSize.height / 2, stageSize.height),
			];

			const speedModifier = random(0, 1);

			pieces.push(new TrackPiece(stage, position, speedModifier));

			position[0] += pieces[0].region.width; // HACK
			pieces.push(new TrackPiece(stage, position, speedModifier));
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
