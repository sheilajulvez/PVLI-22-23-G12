import Vehicle from "./Vehicle.js";
import Pool from "../Pool.js";


export default class Car extends Vehicle { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, this.scene.poolCar, 'Car');
		this.body.setSize(90,180);
		this.body.setOffset(10,35);
		
	
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


		this.play('idle_BlueCar'); //activa la animacion
		this.poolCar= new Pool(this,);
	}

	

	
	preUpdate(t, dt){
		super.preUpdate(t, dt,this.poolCar);
		
	}
}
