import Vehicle from "./Vehicle.js";

export default class Moto extends Vehicle { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Moto');
		this.body.setSize(120,480);
		this.body.setOffset(20,15);
		this.anim=anim;
		this.play(this.anim); //activa la animacion*/
		this.setScale(0.5,0.5);
		
	}
	move(t,dt){
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

	preUpdate(t, dt){
		super.preUpdate(t, dt,this.poolCar);
		super.move(200);
		this.move(t,dt);
		
		
	}
}
