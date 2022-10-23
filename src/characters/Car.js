export default class Car extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'Car');

		this.scene.add.existing(this);
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


		this.setScale(2,2);
	}
	
   
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de WENGE
       
            this.y+=(4*dt)/100;
      
        
	}

}