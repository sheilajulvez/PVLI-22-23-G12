export default class QuitButtom{

	constructor(scene){
		this.relatedScene=scene;
	}
	preload(){
		this.relatedScene.load.image('quit_buttom',"assets/exit1.jpg");

	}
	create(){
		this.QuitButtom=this.relatedScene.add.image(500,600,'quit_buttom').setInteractive();
		
		this.QuitButtom.on('pointerdown',()=>{
			this.relatedScene.scene.start('inicio');
		});

	}
}