
export default class Car extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,pool) {
		super(scene, x, y, 'Car');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.pool=pool;
		this.destroyNow=false;
		this.body.setSize(90,180);
		this.body.setOffset(10,35);
	
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
		this.body.setVelocityY(200);
	}
	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
    		this.destroyNow=true;
		}
	}
	shoutDetection()
	{
		
	
		if (this.scene.player.y<=this.y)
		{
			
			this.scene.gritoB=true;
		}
	}
	respawn()
	{
		
		if(this.y>540)
		{
			if(this.body.checkCollision.none)
				this.body.checkCollision.none=false;
		}

		if (this.y>800) 
			{		
				this.scene.CarisOut(this);		
				
			}
	
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.collision();
		this.move();
		this.respawn();
		this.shoutDetection();
		if(this.destroyNow==true)
		{
			this.destroyNow=false;
			this.body.checkCollision.none=true;
			this.scene.poolCar.release(this);
		}
		
	}
}
