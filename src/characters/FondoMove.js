export default class FondoMove extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'FondoMove',Math.floor(Math.random() *20));
		this.scene.add.existing(this);
		//this.id = 
		console.log(this.id);
		/*this.scene.anims.create({ //animación
			key: 'idle_FondoMove', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('FondoMove',
			{
				start:this.id, // primera imagen del Spritesheet que se ejecuta en la animación
				end:this.id // última imagen del Spritesheet que se ejecuta en la animación
			}),
			repeat: 0 //para que sea bucle

		});
		this.play('idle_FondoMove'); //activa la animavcion
*/
		//this.frame = this.id;
		//tamaño en el juego
		this.setScale(1,1);
	}
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//movimiento de las casas
		this.y+=(20*dt)/100;		
		if(this.y>800)
		{
			this.y=0;		
		}
		this.y += 2;

         
	}
}

