import Vehicle from "./Vehicle.js";

export default class Moto extends Vehicle { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Moto');
		this.body.setSize(90,180);
		this.body.setOffset(10,35);
		
		/*this.scene.anims.create({ //animación
			key: 'idle_Moto', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Car',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle

		});


		this.play('idle_Moto'); //activa la animacion*/
		
	}

	

	
	preUpdate(t, dt){
		super.preUpdate(t, dt,this.poolCar);
		super.move(200);
		if (this.y>800) 		//en todos los que tengan poool
		{		
				this.scene.poolMoto.release(this);		
		}
		if(this.destroyNow==true)
		{
			this.body.checkCollision.none=true;
			this.scene.poolMoto.release(this);
			this.destroyNow=false;
		}
		
		
	}
}