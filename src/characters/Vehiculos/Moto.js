import Vehicle from "./Vehicle.js";

export default class Moto extends Vehicle { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Moto');
		this.body.setSize(90,180);
		this.body.setOffset(10,35);
		this.play('idle_Moto'); //activa la animacion*/
		this.setScale(0.5,0.5);
	}


	preUpdate(t, dt){
		super.preUpdate(t, dt,this.poolCar);
		super.move(200);
		if (this.y>800) 		//en todos los que tengan poool
		{		
				this.scene.poolBike.release(this);		
		}
		if(this.destroyNow==true)
		{
			this.body.checkCollision.none=true;
			this.scene.poolBike.release(this);
			this.destroyNow=false;
		}
		
		
	}
}
