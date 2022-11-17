export default class Button extends Phaser.GameObjects.Sprite{

	constructor(scene,x,y, name, scarga,nombre=null){
		console.log(name);
		super(scene, x, y,name);
		this.scene.add.existing(this);
		this.scarga = scarga;
		this.scene = scene;
		this.nombre=nombre;
        this.setInteractive();
		this.create();
	}

	create(){
		
		/*this.startButton.on('pointerover',() => {
			this.startButton.setFrame(1);
		});

		this.startButton.on('pointerout',() => {
			this.startButton.setFrame(0);
		
		});*/

		this.on('pointerdown',() => {
			this.scene.scene.start(this.scarga,{name:this.nombre});
			console.log("nombre"+this.nombre);
		});

	}


}