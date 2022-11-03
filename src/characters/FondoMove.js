import pool from '../Pool.js'; //importamos al caracter de Wenge
export default class FondoMove extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		console.log("d");
		super(scene, x, y, 'FondoMove');
		this.scene.add.existing(this);
		this.scene.anims.create({ //animación
			key: 'idle_FondoMove', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('FondoMove',
			{
				start:1, // primera imagen del Spritesheet que se ejecuta en la animación
				end:1 // última imagen del Spritesheet que se ejecuta en la animación
			}),
			repeat: 0 //para que sea bucle

		});
		this.play('idle_FondoMove'); //activa la animavcion

		//tamaño en el juego
		this.setScale(1,1);
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de las casas
		/*this.y+=(20*dt)/100;		
		if(this.y>800)
		{
			this.y=0;		
		}*/
		this.y += 2;
        if (this.y > this.scene.game.config.height) {
          this.scene.pool.release(this);
        }
         
	}
}

