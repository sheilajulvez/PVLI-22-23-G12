import Vehicle from "./Vehicle.js";

export default class Car extends Vehicle { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Car');
		this.body.setSize(90,180);
		this.body.setOffset(10,35);
		this.play('idle_BlueCar'); //activa la animacion
		
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		super.move(200);
		if (this.y>800 && this.scene.poolCar!=null) 		//en todos los que tengan poool
		{		
			this.scene.poolCar.release(this);		
		}
		if(this.destroyNow==true)
		{
			this.body.checkCollision.none=true;
			this.scene.poolCar.release(this);
			this.destroyNow=false;
		}
		
		
	}
}
