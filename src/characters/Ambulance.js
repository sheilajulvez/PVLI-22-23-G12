import Car from '../characters/Car.js';//importamos a los Coches
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

var dir='r';
var cotaDer=900;
var cotaIzq=190	;
export default class Ambulance extends Car { //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y,pool) {
		super(scene, x, y, 'Ambulance');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.pool=pool;
		this.destroyNow=false;
		this.body.setSize(80,150);
		this.body.setOffset(10,20);
		this.scene.anims.create({ //animación
			key: 'idle_Ambulance', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Ambulance',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
		});
      


		this.play('idle_Ambulance'); //activa la animavcion
       

		this.setScale(1,1);
	}
	
	
	respawn()				//comprobación si la cota es la indicada para el respawn	
	{
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
		
	    this.respawn();
		
		   if(this.destroyNow==true)
		   {
			this.destroyNow=false;
			this.body.checkCollision.none=true;
			this.scene.poolVan.release(this);
		   }
	}

}
