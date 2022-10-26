export default class ShopButtom{

	constructor(scene){
		this.relatedScene=scene;

	}
	preload(){
		this.relatedScene.load.image('shop_button','assets/shop.jpg');

	}
	create(){
		this.ShopButtom=this.relatedScene.add.image(500,300,'shop_button').setInteractive();

		this.ShopButtom.on('pointerdown',()=>{
			this.relatedScene.scene.start('shop');
		});


	}
}