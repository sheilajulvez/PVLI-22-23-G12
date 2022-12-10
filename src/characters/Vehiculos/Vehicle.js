
export default class Vehicle extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Vehicle');
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.destroyNow=false;
		

		//this.body.setSize(90,180);
		//this.body.setOffset(10,35);
	
		/*this.scene.anims.create({ //animación
			key: 'idle_BlueCar', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Car',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle

		});


		this.play('idle_BlueCar'); //activa la animavcion*/
	

		this.setScale(1,1);
	}

	move(velocity)
	{
		this.body.setVelocityY(velocity);
	}
	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			this.scene.player.life.RestaVida();
    		this.destroyNow=true;
		}

	}
	pipi()
	{
		if(this.y>400 && this.y<402)
		{
			//this.scene.pitido();
		}
	}
	respawn()
	{
		if(this.y>540)
		{
			if(this.body.checkCollision.none)
				this.body.checkCollision.none=false;
		}	
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.collision();
        this.respawn();
        //this.pipi();
		if(this.destroyNow==true)
		{
			
		}
		
	}
}
