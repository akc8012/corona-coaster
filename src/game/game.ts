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
		track.getRegions()[0].x += 0.3;
		track.getRegions()[0].y -= 0.6;

		track.update();
		player.update(track);

		stage.update();
	});

	console.log('my body is ready');
}

// TODO: This should be Track constructor
function createTrack(stage: createjs.Stage): ITrack {
	const stageSize = getStageSize(stage);

	const region = {
		x: 0,
		y: stageSize.height - 32,
		width: stageSize.width,
		height: 32
	};
	const trackPiece: ITrackPiece = new TrackPiece(stage, region);

	return new Track([trackPiece]);
}
