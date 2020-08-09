import * as createjs from 'createjs-module';

import { createStage, getStageSize } from '../stage/stage';
import { Player, IPlayer } from './player';
import { Colliders } from '../physics/raycast';
import { ITrackPiece, TrackPiece } from './track';


export function createGame() {
	const stage = createStage();
	const stageSize = getStageSize(stage);

	const player: IPlayer = new Player(stage);

	const trackBounds = {
		x: 0,
		y: stageSize.height - 32,
		width: stageSize.width,
		height: 32
	};
	const trackPiece: ITrackPiece = new TrackPiece(stage, trackBounds);
	const track: Colliders = [trackPiece.bounds];

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		track[0].x += 0.3;
		track[0].y -= 0.6;
		trackPiece.update();

		player.update(track);

		stage.update();
	});
}
