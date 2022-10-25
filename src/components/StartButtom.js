export default class StartButton{

	constructor(scene){
		this.relatedScene=scene;

	}

	preload(){

		this.relatedScene.load.image("start_button","assets/start1.jpg");

	}

	create(){
		this.startButton= this.relatedScene.add.image(500,200,'start_button').setInteractive();
		/*this.startButton.on('pointerover',() => {
			this.startButton.setFrame(1);
		});

		this.startButton.on('pointerout',() => {
			this.startButton.setFrame(0);
		
		});*/

		this.startButton.on('pointerdown',() => {

			this.relatedScene.scene.start('tomatico');
		});

	}


}