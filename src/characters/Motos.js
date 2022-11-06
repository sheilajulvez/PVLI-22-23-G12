import Car from "./Car";


export default class Moto extends Car{ //exportamos la clase extendida de Phaser
     
	constructor(scene, x, y) {
		super(scene, x, y, 'Moto');

		this.scene.add.existing(this);
		this.scene.anims.create({ //animación
			key: 'idle_moto', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('Moto',
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:6 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			frameRate: 10, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
            
		});
      


		this.play('idle_moto'); //activa la animavcion
       

		this.setScale(1,1);
	}

	preUpdate(t, dt){
        super.preUpdate(t,dt);
		//movimiento de los coches
       

			
	}

}
