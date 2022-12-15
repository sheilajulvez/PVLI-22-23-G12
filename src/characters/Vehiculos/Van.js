import Vehicle from "./Vehicle.js";

var dir='r';												//dirección inicial de la furgoneta
var cotaDer=900;											//cota derecha inicial de la furgoneta
var cotaIzq=190	;											//cota izquierda inicial de la furgoneta

export default class Van extends Vehicle{ 					//exportamos la clase extendida de Phaser
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Van');

		this.body.setSize(80,150);							//modificamos el body de la furgoneta para que se ajuste al sprite
		this.body.setOffset(10,20);      
		this.play('idle_WhiteCar');		 					//activa la animación
	}

	move(dir)												//función mediante la cual se mueve la furgoneta 
	{
		super.move(100);									//usa la función del padre y le pasa el parámetro velocidad

		 if(dir==='r')this.body.setVelocityX(100);			//dependiendo de la dirección se moverá para un lado u otro
		 if(dir==='l')this.body.setVelocityX(-100);
	}

	changeDir(cotaDer, cotaIzq)								//función que cambia la dirección de movimiento de la furgoneta dependiendo de las cotas izquierda y derecha
	{
		if(this.x<549){cotaDer=490; cotaIzq=190;}			//si está de la mitad de la pantalla a la derecha las cotas serán diferentes que si está a la izquierda
		if(this.x>550){cotaDer=900; cotaIzq=570;}
		if(this.x>=cotaDer)								
		{	
			dir='l';
		}
		else if(this.x<=cotaIzq)
		{
			dir='r';
		}
	}
	
	preUpdate(t, dt){
        super.preUpdate(t,dt);
		this.changeDir(cotaDer,cotaIzq);
		this.move(dir);
		if(this.destroyNow==true)							//si el booleano está a true...
		{
			this.body.checkCollision.none=true;				//desactivamos la detección de colisión,
			this.scene.poolVan.release(this);				//sacamos la moto de la pool,
			this.destroyNow=false;							//seteamos el booleano a false.
		}

		if (this.y>800) 									//en todos los que tengan pool
		{		
			this.scene.poolVan.release(this);				//si supera esa cota en el ejeY llamamos a su método release
		}
	}

}
