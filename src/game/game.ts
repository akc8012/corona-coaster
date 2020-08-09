import * as createjs from 'createjs-module';

import { createStage } from '../stage/stage';
import { Player, IPlayer } from './Player';
import { ITrack, Track } from './Track';


export function createGame() {
	const stage = createStage();

	const player: IPlayer = new Player(stage);
	const track: ITrack = new Track(stage);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		track.update();
		player.update(track);

		stage.update();
	});

	console.log('my body is ready');
}
