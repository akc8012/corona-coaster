import * as createjs from 'createjs-module';

import { createStage, getStageSize } from '../stage/stage';
import { Player, IPlayer } from './Player';
import { ITrack, Track } from './Track';


export function createGame() {
	const stage = createStage();

	const disclaimerText = new createjs.Text(
		"this game isn't real yet\nplease don't hate me", '20px Arial', '#696969'
	);
	disclaimerText.x = getStageSize(stage).width / 2;
	disclaimerText.y = 100;
	disclaimerText.textAlign = 'center';
	stage.addChild(disclaimerText);

	const track: ITrack = new Track(stage);
	const player: IPlayer = new Player(stage);

	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener('tick', function () {
		track.update();
		player.update(track);

		stage.update();
	});

	console.log('my body is ready');
}
