
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default class Car extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y,pool) {
		super(scene, x, y, 'Car');

		this.scene.add.existing(this);
		this.pool=pool;
		this.destroyNow=false;
		this.scene.anims.create({ //animación
			key: 'idle_BlueCar', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Car',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle

		});


		this.play('idle_BlueCar'); //activa la animavcion


		this.setScale(1,1);
	}



	preUpdate(t, dt){
		super.preUpdate(t, dt);

		
		//movimiento de los coches
            this.y+=(40*dt)/100;

			if(this.y>800)
			{
				this.destroyNow=true;
				}
			}
			if (destroyNow) 
			{
				this.y=0;
				var pos=random(0,5);
				//this.x= random(100, 1200);
				switch(pos)
				 {
				 	 case 0:
				 	 	this.x=210;
				 	 	break;
				 	  case 1:
				 	 	this.x=350;
				 	 	break;
				 	  case 2:
					  	this.x=480;
					  	break;
				 	  case 3:
				 	  	this.x=610;
				 	  	break;
				 	  case 4:
					  	this.x=740;
				 	  	break;
				 	  case 5:
				 	  	this.x=870;
				 	  	break;
			}
	}

}
