import NextLevelButtom from '../components/NextLevelButtom.js';
import QuitButtom from '../components/QuitButtom.js';
import ShopButtom from '../components/ShopButtom.js';

export default class menu extends Phaser.Scene{
	constructor(){
		super({key:'menu'});
		this.NextLevelButtom=new NextLevelButtom(this);
		this.QuitButtom=new QuitButtom(this);
		this.ShopButtom=new ShopButtom(this);
	}
	preload(){
		this.load.image("fondoMenu","assets/menu_fondo2.jpg");
		this.NextLevelButtom.preload();
		this.QuitButtom.preload();
		this.ShopButtom.preload();

	}
	create(){
		this.add.image(500,350,'fondoMenu');
		this.NextLevelButtom.create();
		this.QuitButtom.create();
		this.ShopButtom.create();
	}
}