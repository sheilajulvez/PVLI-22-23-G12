

export class Moto 
{ //exportamos la clase extendida de Phaser

	

	move(dt)
	{
		this.y+=(40*dt)/100;
	
	}
}

export class Camion
{
	move(dt)
	{
		this.y+=(10*dt)/100;
	
	}
}