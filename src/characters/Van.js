import Car from '../characters/Car.js';//importamos a los Coches
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

var dir='r';
var cotaDer=900;
var cotaIzq=190	;
export default class Van extends Car { //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y,pool) {
		super(scene, x, y, 'Van');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.pool=pool;
		this.destroyNow=false;
		this.body.setSize(80,150);
		this.body.setOffset(10,20);
		this.scene.anims.create({ //animación
			key: 'idle_WhiteCar', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Van',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
		});
      


		this.play('idle_WhiteCar'); //activa la animavcion
       

		this.setScale(1,1);
	}
	move(dt,dir)
	{
		this.body.setVelocityY(100);

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
	collision()
	{
		if(this.scene.physics.overlap(this.scene.player, this)) 
		{
			
    		this.destroyNow=true;
		}
	}
	respawn()				//comprobación si la cota es la indicada para el respawn	
	{
	
		if(this.y>540)
		{
			if(this.body.checkCollision.none)
				this.body.checkCollision.none=false;
		}
		if (this.y>800) 
			{		
				this.scene.VanisOut(this);		
			}
			
	}
	
	preUpdate(t, dt){
        super.preUpdate(t,dt);

		//movimiento de los coches
		this.collision();
           this.move(dt,dir);
		   this.changeDir(cotaDer,cotaIzq);
		   this.respawn();
		
		   if(this.destroyNow==true)
		   {
			this.destroyNow=false;
			this.body.checkCollision.none=true;
			this.scene.poolVan.release(this);
		   }
	}

}
