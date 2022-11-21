
import Button from '../components/Buttom.js';
export default class inicio extends Phaser.Scene{
	constructor(){
		super({key:'inicio'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("fondoIni","assets/logo.png"  );
		this.load.image("start_button","assets/pixil-frame-0.png");
	}
	create(){
		this.add.image(500,350,'fondoIni');
		this.Botones.push(new Button(this, 700,600, 'start_button', 'menu',null, 0,0));
	}		
}