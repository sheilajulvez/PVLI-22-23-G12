
export default class Car extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,pool) {
		super(scene, x, y, 'Car');

		this.scene.add.existing(this);
		this.pool=pool;
	
		this.scene.anims.create({ //animación
			key: 'idle_BlueCar', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Car',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle

		});


		this.play('idle_BlueCar'); //activa la animavcion


		this.setScale(1,1);
	}

	move()
	{
		this.body.setVelocityY(100);
		//this.y+=(40*dt)/100;
	}
	respawn()
	{
		
		if (this.y>800) 
			{		
				this.scene.CarisOut(this);		
			}
	
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.move();
		this.respawn();
	}
}
