import Vehicle from "./Vehicle.js";

export default class Car extends Vehicle { 						//exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Car');
		this.body.setSize(90,180);								//modificamos el body de la furgoneta para que se ajuste al sprite
		this.body.setOffset(10,35);
		this.play('idle_BlueCar'); 								//activa la animacion
		
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		super.move(200);
		if (this.y>800) 										//en todos los que tengan poool
		{	
			this.scene.poolCar.release(this);		
		}
		if(this.destroyNow==true)								//si el booleano está a true...
		{
			this.body.checkCollision.none=true;					//desactivamos la detección de colisión,
			this.scene.poolCar.release(this);					//sacamos la moto de la pool,
			this.destroyNow=false;								//seteamos el booleano a false.
		}
		
		
	}
}
