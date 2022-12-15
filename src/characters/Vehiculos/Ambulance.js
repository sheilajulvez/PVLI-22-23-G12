import Vehicle from "./Vehicle.js";
export default class Ambulance extends Vehicle { 
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Ambulance');	
		this.body.setSize(80,150);										//modificamos el body de la furgoneta para que se ajuste al sprite
		this.body.setOffset(10,20);
		this.play('idle_Ambulance'); 									//activa la animacion				
	}
	

	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 		//función que detecta las colisiones y gestiona el hacerle daño a Wenge 
		{
			this.scene.player.life.RestaVida();
		}
	}
	setX(x)																//función para setear la posición de la ambulancia en el eje X
	{
		this.x=x;
	}
	setY(y)
	{
		this.y=y;														//función para setear la posición de la ambulancia en el eje X
	}
	
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		super.move(400);												//llamamos al move del padre y le damos un valor
	}


}
