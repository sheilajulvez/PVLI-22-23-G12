
import Button from '../components/Buttom.js';
export default class menu extends Phaser.Scene{
	constructor(){
		super({key:'menu'});
		this.Botones =[ ];
	}
	preload(){
		this.load.image("fondoMenu","assets/menu_fondo2.jpg");
		this.load.image("next_level","assets/next_level.jpg");
		this.load.image('quit_buttom',"assets/exit1.jpg");
		this.load.image('shop_button','assets/shop.jpg');

	}
	create(){
		this.add.image(500,350,'fondoMenu');
		this.Botones.push(new Button(this, 400,200, 'next_level', 'MapNiveles')) 
        this.Botones.push(new Button(this, 400,600, 'quit_buttom', 'inicio')) 
        this.Botones.push(new Button(this, 400,400, 'shop_button', 'shop')) 
	}
}