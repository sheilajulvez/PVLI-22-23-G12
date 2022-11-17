import Car from '../characters/Car.js';

export class Moto extends Car
{ //exportamos la clase extendida de Phaser
	constructor(scene,x,y,pool)
	{
		super(scene,x,y,'Bike');
		this.scene.add.existing(this);
		this.pool=pool;
		this.scene.anims.create({
			key:'idle_bike',
			frames: scene.anims.generateFrameNumbers('Bike',
			{
				start:0,
				end:0
			}),
			frameRate:10,
			repeat:-1	
		});
		this.play('idle_bike');
		this.setScale(1,1);
	}

	move()
	{
		console.log("un coche")
		this.body.setVelocityY(100);
	}
	respawn()
	{
		
		if (this.y>800) 
			{		
				this.scene.BikeisOut(this);		
			}
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.move();
		this.respawn();
	}
}

export class Camion
{
	move(dt)
	{
		this.y+=(10*dt)/100;
	
	}
}