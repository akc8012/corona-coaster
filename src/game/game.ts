import * as createjs from 'createjs-module';

import { createStage, getStageSize } from '../stage/stage';
import { Player, IPlayer } from './player';
import { Colliders } from '../physics/raycast';
import { ITrackPiece, TrackPiece } from './track';


export function createGame() {
	const stage = createStage();
	const stageSize = getStageSize(stage);

	const track: Colliders = [
		{ x: 0, y: 0, width: stageSize.width, height: 32 },
	];

	const player: IPlayer = new Player(stage);
	const twack: ITrackPiece = new TrackPiece({ x: 20, y: 20, width: 32, height: 32 }, stage);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		track[0].y += 0.6;
		player.update(track);

		stage.update();
	});
}
