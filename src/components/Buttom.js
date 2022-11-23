export default class Button extends Phaser.GameObjects.Sprite{

	constructor(scene,x,y, name, scarga,nombre, stay, niv){
		console.log(name);
		super(scene, x, y,name);
		this.scene.add.existing(this);
		this.scarga = scarga;
		this.scene = scene;
		this.nombre=nombre;
        this.setInteractive();
		this.stay = stay;
		this.nivel = niv;
		this.create();
	}

	create(){
		
		/*this.startButton.on('pointerover',() => {
			this.startButton.setFrame(1);
		});

		this.startButton.on('pointerout',() => {
			this.startButton.setFrame(0);
		
		});*/
		console.log(this.nivel);	
		console.log(this.stay);
		
		
			this.on('pointerdown',() => {

	

					if (this.nivel<= this.stay){
						
				this.scene.scene.start(this.scarga,{name:this.nombre,stay:this.nivel});
			}
			});
		
	}

}