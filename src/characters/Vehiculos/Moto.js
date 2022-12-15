import Vehicle from "./Vehicle.js";

export default class Moto extends Vehicle { 				//exportamos la clase extendida de Phaser

	constructor(scene, x, y,anim) {
		super(scene, x, y, 'Moto');
		this.body.setSize(120,480);							//modificamos el body de la furgoneta para que se ajuste al sprite
		this.body.setOffset(20,15);
		this.anim=anim;										//pasamos la animación como parámetro para cambiar el color de las motos
		this.play(this.anim); 								//activa la animación
		this.setScale(0.5,0.5);								//cambiamos la escala
		
	}
	move(){
		super.move(200);									//llamamos al método del padre
		if (this.y>800) 									//en todos los que tengan poool
		{		
				this.scene.poolBike.release(this);		
		}
		if(this.destroyNow==true)							//si el booleano está a true...
		{
			this.body.checkCollision.none=true;				//desactivamos la detección de colisión,
			this.scene.poolBike.release(this);				//sacamos la moto de la pool,
			this.destroyNow=false;							//seteamos el booleano a false.
		}
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
		this.move();
	}
}
