import Car from '../characters/Car.js';

export class Moto extends Car
{ //exportamos la clase extendida de Phaser
	constructor(scene,x,y)
	{
		super(scene,x,y,'Bike');
	}

	move()
	{
		super.move();
	}
	collision()
	{
		super.collision();
	

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
				this.scene.BikeisOut(this);		
			}
	}


	preUpdate(t, dt){
		super.preUpdate(t, dt);

		if(this.destroyNow==true)
		{
			this.destroyNow=false;
			this.body.checkCollision.none=true;
			this.scene.poolBike.release(this);
		}
	}
	
}

export class Camion
{
	move(dt)
	{
		this.y+=(10*dt)/100;
	
	}
}