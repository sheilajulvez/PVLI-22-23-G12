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
		
		this.clickSound= this.scene.sound.add("click");	
			this.on('pointerdown',() => {

				this.clickSound.play();

					if (this.nivel<= this.stay){
						console.log(this.scarga);
						this.scene.scene.start(this.scarga,{name:this.nombre,stay:this.nivel,wenge:this.wenge,dinero:this.dinero});
			}
			});
			if(this.stay>=this.nivel){
				this.on("pointerover",()=>{
					this.scene.tweens.add(
						{
							targets: this,
							scaleX: 1.5,
							scaleY: 1.5,
							duration: 100,
							yoyo: true,
						}
					);
					
				})
			}
			
		
	}

}