
export default class Shop extends Phaser.Scene{
	constructor(){
		super({key:'shop'});
	}
	preload(){
		this.load.image("armario","assets/armario.jpg");

	}
	create(){
		this.add.image(500,350,'armario');

	}

}