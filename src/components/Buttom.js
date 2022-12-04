export default class Button extends Phaser.GameObjects.Sprite{

	constructor(scene,x,y, name, scarga,nombre, stay, niv,wenge,dinero){
		super(scene, x, y,name);
		this.scene.add.existing(this);
		this.scarga = scarga;
		this.scene = scene;
		this.nombre=nombre;
        this.setInteractive();
		this.stay = stay;
		this.nivel = niv;
		this.wenge=wenge;
		this.dinero=dinero;
		
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

				console.log("fw");

					if (this.nivel<= this.stay){
						console.log(this.scarga);
						console.log("buton"+this.wenge+" "+this.dinero);
				this.scene.scene.start(this.scarga,{name:this.nombre,stay:this.nivel,wenge:this.wenge,dinero:this.dinero});
			}
			});
		
	}

}