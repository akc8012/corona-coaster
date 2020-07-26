import './assets/style.scss';
import { createGame } from './game/game';


document.getElementById('body')!.onload = function () {
	createGame();
}
