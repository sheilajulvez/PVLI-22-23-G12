
import Button from '../components/Buttom.js';
export default class GameOver extends Phaser.Scene{
	constructor(){
		super({key:'gameover'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("GameOverImage","assets/gameOver.png" );
	}
	create(){
		this.add.image(500,350,'GameOverImage');
	}		
}