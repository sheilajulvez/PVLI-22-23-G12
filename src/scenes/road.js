export default class road extends Phaser.GameObjects.Sprite { //exportamos la clase extendida de Phaser

	constructor(scene, x, y) {
		super(scene, x, y, 'road');

		this.scene.add.existing(this);

		this.scene.anims.create({ //animación
			key: 'idle', //identificador de la animación
			frames: scene.anims.generateFrameNumbers('road', 
			{
				start:0, // primera imagen del Spritesheet que se ejecuta en la animación
				end:3 // última imagen del Spritesheet que se ejecuta en la animación
			}), 
			frameRate: 20, // imágenes/frames por segundo
			repeat: -1 //para que sea bucle
		});

		
		this.play('idle'); //activa la animavcion

		this.setScale(1.45,1.65);
		
	}
}