import Vehicle from "./Vehicle.js";

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

var dir='r';
var cotaDer=900;
var cotaIzq=190	;
export default class Van extends Vehicle{ //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Van');

		this.body.setSize(80,150);
		this.body.setOffset(10,20);      
		this.play('idle_WhiteCar'); //activa la animavcion
	}
	move(dir)
	{
		super.move(100);

		 if(dir==='r')this.body.setVelocityX(100);
		 if(dir==='l')this.body.setVelocityX(-100);
	}
	changeDir(cotaDer, cotaIzq)
	{
		if(this.x<549){cotaDer=490; cotaIzq=190;}	
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
	
		   if(this.destroyNow==true)
		   {
			this.body.checkCollision.none=true;
			this.scene.poolVan.release(this);
			this.destroyNow=false;
		   }
		   if (this.y>800) 		//en todos los que tengan poool
		   {		
				this.scene.poolVan.release(this);		
		   }
	}

}
