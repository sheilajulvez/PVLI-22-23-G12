export default class NextLevelButtom{

	constructor(scene){
		this.relatedScene=scene;

	}

	preload(){

		this.relatedScene.load.image("next_level","assets/next_level.jpg");

	}

	create(){
		this.NextLevelButtom= this.relatedScene.add.image(500,200,'next_level').setInteractive();
		/*this.startButton.on('pointerover',() => {
			this.startButton.setFrame(1);
		});

		this.startButton.on('pointerout',() => {
			this.startButton.setFrame(0);
		
		});*/

		this.NextLevelButtom.on('pointerdown',() => {

			this.relatedScene.scene.start('tomatico');
		});

	}
}