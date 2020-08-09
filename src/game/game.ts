import * as createjs from 'createjs-module';

import { createStage, getStageSize } from '../stage/stage';
import { Player, IPlayer } from './Player';
import { ITrackPiece, ITrack, Track } from './Track';
import { TrackPiece } from "./TrackPiece";


export function createGame() {
	const stage = createStage();

	const player: IPlayer = new Player(stage);
	const track: ITrack = createTrack(stage);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		const trackPieces = track.getPieces();

		trackPieces[0].bounds.x += 0.3;
		trackPieces[0].bounds.y -= 0.6;

		track.update();
		player.update(trackPieces.map(p => p.bounds));

		stage.update();
	});

	console.log('my body is ready');
}

function createTrack(stage: createjs.Stage): ITrack {
	const stageSize = getStageSize(stage);

	const bounds = {
		x: 0,
		y: stageSize.height - 32,
		width: stageSize.width,
		height: 32
	};

	const trackPiece: ITrackPiece = new TrackPiece(stage, bounds);
	return new Track([trackPiece]);
}
