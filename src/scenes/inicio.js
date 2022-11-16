
import Button from '../components/Buttom.js';
export default class inicio extends Phaser.Scene{
	constructor(){
		super({key:'inicio'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("fondoIni","assets/inicio.jpg");
		this.load.image("start_button","assets/start1.jpg");
	}
	create(){
		this.add.image(500,350,'fondoIni');
		this.Botones.push(new Button(this, 400,200, 'start_button', 'menu')) 
	}		
}