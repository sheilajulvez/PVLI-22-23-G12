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
		this.pool=pool;
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
	respawn()				//comprobación si la cota es la indicada para el respawn	
	{
	
		if (this.y>800) 
			{		
				this.scene.VanisOut(this);		
			}
		// if(this.y>8	00)
		// {

		// 	this.y=	0;
		// 	var pos=random(0,1);
		// 	switch(pos)
		// 	{
		// 		case 0:
		// 			this.x=350;
		// 			cotaIzq=190;
		// 			cotaDer=490;
		// 			break;
		// 		case 1:
		// 			this.x=740;
		// 			cotaIzq=570;
		// 			cotaDer=900;
		// 			break;
		// 	}
		// 	console.log(pos);
		// }
	}
	
	preUpdate(t, dt){
        super.preUpdate(t,dt);

		//movimiento de los coches
           this.move(dt,dir);
		   this.changeDir(cotaDer,cotaIzq);
		   this.respawn();
	}

}
