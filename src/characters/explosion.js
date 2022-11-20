export default class explosion extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Explosion');
		this.scene.add.existing(this); //lo añades a la escene
		this.scene.physics.add.existing(this);// lo haces objeto físico
		//this.body.setSize(200,220);
		//this.body.setOffset(360,140);
		
		this.scene.anims.create({ //animación
			key: 'idle_Explosion', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Explosion', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:2 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 10, // imágenes/frames por segundo
			repeat: 0 //para que sea bucle
		});

		
		this.play('idle_Explosion'); //activa la animavcion

		this.setScale(0.35,0.35);
	}


	
   
	update(t, dt)
	{
		this.timePassed=+dt;
		if(this.timePassed>3000)
		{
			delete this;
		}
	}


	

}